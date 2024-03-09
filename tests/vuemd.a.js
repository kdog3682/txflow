
import * as txflow from "../main.js"
import { clip, read } from "/home/kdog3682/2023/node-utils.js"
const opts = {
    lang: 'vuemd',
    mode: 'html',
}
const vueMarkdown = txflow.factory(opts)

// vueMarkdown(read(file))
// /home/kdog3682/2024-javascript/txflow/vuemdBlocks.js
const file = '/home/kdog3682/bkl/website/student-teaching-advice.txf'

// inoremap <buffer> e1 <space>=<space>
const s = `

flex
    let a = 123
    function foo() {
        console.log("hi")
    }

    hi


    const a = 123
    const b = 12

    function foo() {

    }

    bye
    


`
console.log(vueMarkdown(s))
// console.log(vueMarkdown(read(file)))
