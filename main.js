import { getBlocks } from "./blocks.js"
import { parser } from "./parser.js"
import { interpreter } from "./interpreter.js"
import { bug } from "../js-toolkit/bug.js"
"/home/kdog3682/2024-javascript/txflow/blocks.js"

// takes an indented string and produces various flavors of text
// flavor: markdown
// flavor: vue
// flavor: typst

function txflow(s, flavor) {
    const blocks = getBlocks(flavor)
    const scanner = new LineScanner(blocks)
    const tokens = scanner.scan(s)
    const root = parser(tokens)
    return interpreter(root, blocks)
}

bug(txflow, 'typst') 
// run bug to see previous results
