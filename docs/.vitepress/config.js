import { defineConfig } from "vitepress"

export default defineConfig({
    title: "《日常哈萨克语会话》",
    description: "视频与笔记结合的零基础日常哈萨克语会话电子书",
    base: "/daily-kazakh-conversation/",
    lang: "zh-CN",
    lastUpdated: true,
    markdown: {
        typographer: true,
        theme: "material-palenight",
        lineNumbers: true,
        quotes: true,
    },

    themeConfig: {
        nav: [
            {
                text: "项目生态",
                items: [
                    {
                        text: "哈萨克语翻译小组 Kazakh Language Translate Team(KzLTT)",
                        link: "https://github.com/kzltt",
                    },
                    {
                        text: "哈拼 Hapin",
                        link: "https://ha-pin.github.io",
                    },
                ],
            },
        ],
        // sidebar: [
        //     {
        //         text: "项目简介",
        //         link: "/",
        //     },
        // ],
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/kzltt/daily-kazakh-conversation",
            },
        ],
        editLink: {
            pattern:
                "https://github.com/kzltt/daily-kazakh-conversation/edit/main/docs/:path",
            text: "在 GitHub 上编辑此页",
        },
        // docFooter: {
        //     prev: "上一篇",
        //     next: "下一篇",
        // },
        footer: {
            message:
                "本项目内容基于 <a href='http://creativecommons.org/licenses/by-nc-nd/4.0/'>知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a> 进行许可",
            copyright: "版权所有 © 2022~ 《日常哈萨克语会话》项目组",
        },
    },
})
