import DefaultTheme from "vitepress/theme"
import HapinBox from "../../components/HapinBox.vue"

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.component("HapinBox", HapinBox)
	}
}