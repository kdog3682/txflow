import * as chalk from "/home/kdog3682/2024-javascript/js-toolkit/chalk.js"
import {read} from "/home/kdog3682/2024-javascript/nodekit/deno.js"
import * as txflow from "./main.js"

function tildaToNewlines(s) {
    return s.replace(/^~/gm, '\n')
}

function abc(vim) {
    const typstFlow = txflow.factory({lang: 'typst', mode: 'str'})
    const text = read(vim.file)
    const r = /\n{2,}(?=[a-zA-Z$#])/
    const items = text.trim().split(r)
        .map(tildaToNewlines)
        .map((x) => typstFlow(x))
    
    items.forEach((item, i) => {
        console.log(chalk.blue(i + 1), item)
        if (i < items.length) {
            console.log('-'.repeat(50))
        }
    })
}
export default abc
