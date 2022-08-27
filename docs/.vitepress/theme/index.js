import DefaultTheme from "vitepress/theme"
import HapinBox from "../../components/HapinBox.vue"
import HapinBoxInline from "../../components/HapinBoxInline.vue"

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.component("HapinBox", HapinBox)
		app.component("HapinBoxInline", HapinBoxInline)
	}
}