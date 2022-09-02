<script lang="ts" setup>
import { ref } from "vue"
import type { Ref } from "vue"

import { transformCyrillicToArabic, transformCyrillicToHapin } from "hapin-utils"
import { langType } from "./types";

const props = defineProps<{
	cyrillic: string,
	arabic?: string,
	hapin?: string
}>()

const langs = ref<[langType, string][]>([
	["cyrillic", "西里尔文字"],
	["arabic", "老文字"],
	["hapin", "哈拼"],
])

const preferLang = localStorage.getItem("prefer-lang")
const lang: Ref<langType> = ref("cyrillic")
const showContent: Ref<string> = ref(props.cyrillic)

function displayContent(la: langType) {
	const { cyrillic, arabic, hapin } = props
	if (la === "cyrillic") {
		showContent.value = cyrillic
	} else if (la === "arabic") {
		showContent.value = !!arabic ? arabic : transformCyrillicToArabic(cyrillic)
	} else {
		showContent.value = !!hapin ? hapin : transformCyrillicToHapin(cyrillic)
	}
}

if (!!preferLang) {
	lang.value = preferLang as langType
	displayContent(preferLang as langType)
}

function changeLang(la: langType) {
	lang.value = la
	localStorage.setItem("prefer-lang", la)
	displayContent(la)
}
</script>

<style lang="less">
.hapin-box-inline {
	ul {
		list-style: none;
		margin: 0;
		margin-right: 10px;
		padding: 0;
		width: 4px;
		display: none;

		li {
			cursor: pointer;
			margin: 10px 0;

			&>span:nth-child(1) {
				width: 8px;
				height: 6px;
				border-radius: 3px;
				display: block;
				background-color: #8c8c8c;
			}

			&>span[class="active"] {
				background-color: rgba(16, 139, 150, 1);
			}
		}
	}

	.rtl {
		direction: rtl;
		font-size: medium;
		font-weight: 400;
		font-family: "Scheherazade New", Arial, Helvetica, sans-serif;
	}

	&:hover {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		vertical-align: middle;
		margin: 0;
		padding: 0 10px;
		background-color: rgba(16, 139, 150, 0.1);
		box-shadow: 0 0 2px rgba(16, 139, 150, 0.7);
		border-radius: 5px;

		ul {
			display: block;
		}
	}
}
</style>

<template>
	<span class="hapin-box-inline">
		<ul>
			<li v-for="[la, ll] in langs" @click="changeLang(la)" :title="`选择${ll}`">
				<span :class="la === lang ? 'active' : ''"></span>
			</li>
		</ul>
		<span :class="lang === 'arabic' ? 'rtl' : ''" :innerHTML="showContent"></span>
	</span>
</template>