<script lang="ts" setup>
import { ref } from "vue"
import type { Ref } from "vue"
import type { langType } from "./types"

import { transformCyrillicToArabic, transformCyrillicToHapin, transformCyrillicToIPA_CNA } from "hapin-utils"

const props = defineProps<{
	cyrillic: string,
	arabic?: string,
	hapin?: string
}>()

const langs = ref<[langType, string][]>([
	["cyrillic", "西里尔文字"],
	["arabic", "老文字"],
	["hapin", "哈拼"],
	["ipa-cna", "国际音标（国内学术版）"]
])

const preferLang = localStorage.getItem("prefer-lang")
const lang: Ref<langType> = ref("cyrillic")
const showContent: Ref<string> = ref(renormal(props.cyrillic))

function renormal(t: string, fn?: (o: string) => string) {
	if (fn === undefined) {
		return t.replace(/\\n/g, "<br>")
	} else {
		return t.split(/\\n/g).map(x => {
			if (!!x) {
				return fn.call(null, x)
			} else {
				return ""
			}
		}).join("<br>")
	}
}

function displayContent(la: langType) {
	const { cyrillic, arabic, hapin } = props
	if (la === "cyrillic") {
		showContent.value = renormal(cyrillic)
		return
	} else if (la === "arabic") {
		showContent.value = !!arabic ? renormal(arabic) : renormal(cyrillic, transformCyrillicToArabic)
		return
	} else if (la === 'hapin') {
		showContent.value = !!hapin ? renormal(hapin) : renormal(cyrillic, transformCyrillicToHapin)
		return
	} else {
		showContent.value = renormal(cyrillic, transformCyrillicToIPA_CNA)
	}
}

if (!!preferLang) {
	lang.value = preferLang as langType
	displayContent(preferLang as langType)
}

function changeLang(la: langType) {
	lang.value = la
	if (la !== "ipa-cna") {
		localStorage.setItem("prefer-lang", la)
	}
	displayContent(la)
}
</script>

<style lang="less">
.hapin-box {
	margin: 20px 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	border-radius: 10px;
	box-shadow: 0 0 2px rgba(16, 139, 150, 0.7);
	background-color: rgba(16, 139, 150, 0.1);

	ul {
		margin: 0;
		padding: 10px;
		list-style: none;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		user-select: none;
		flex-wrap: wrap;

		li {
			margin: 0 5px;
			padding: 10px;
			border-radius: 5px;
			background-color: transparent;
			position: relative;
			cursor: pointer;
		}

		li>span[class="active"] {
			height: 4px;
			width: 20px;
			position: absolute;
			bottom: 0;
			left: 50%;
			right: 50%;
			transform: translateX(-50%);
			background-color: rgb(16, 139, 150);
			border-radius: 2px;
		}
	}

	.show {
		width: calc(100% - 40px);
		box-sizing: border-box;
		margin: 5px 20px;
		padding: 10px 20px;
		color: white;
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 5px;
	}

	.rtl {
		direction: rtl;
		font-size: larger;
		font-weight: 400;
		font-family: "Scheherazade New", Arial, Helvetica, sans-serif;
	}

	.intro {
		padding: 10px 20px;
		font-size: x-small;
		font-weight: 300;
		align-self: flex-end;
		user-select: none;
	}
}
</style>

<template>
	<div class="hapin-box">
		<ul>
			<li v-for="[la, ll] in langs" @click="changeLang(la)">
				<span :title="`选择${ll}`">{{ ll }}</span>
				<span v-if="la === lang" class="active"></span>
			</li>
		</ul>

		<div :class="lang === 'arabic' ? 'show rtl' : 'show'" :innerHTML="showContent"></div>

		<div class="intro">
			本组件由哈拼开源项目提供技术支持
		</div>
	</div>
</template>