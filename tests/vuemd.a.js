// VMarkdownPagetExtension()

import * as txflow from "../main.js"
import { clip, read } from "/home/kdog3682/2023/node-utils.js"
const opts = {
    lang: 'vuemd',
    mode: 'json',
    mode: 'str',
}
const vueMarkdown = txflow.factory(opts)

// vueMarkdown(read(file))
// /home/kdog3682/2024-javascript/txflow/vuemdBlocks.js
const file = '/home/kdog3682/bkl/website/student-teaching-advice.txf'

const s = `


flex
    function foo() {

    }

    hi

`
console.loggg(vueMarkdown(s))
// console.log(vueMarkdown(read(file)))
// some of my ideas were just wrong ...
// ...


vuemd is working ... 
