import { getBlocks } from "./blocks.js"
// ./typstBlocks.js
import { parser } from "./parser.js"
import { LineScanner } from "./LineScanner.js"
import { interpreter } from "./interpreter.js"
import { bug } from "/home/kdog3682/2024-javascript/js-toolkit/bug.js"
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
    // the interpreter currently produces a sample string
}

const s = `
hi guys
hi guys
hi guys
flex asdf = adsfasdf aa  = aaaaa
    sdf: sdfsdf
    sdsss: 123
    vvv:
        asdf: sadfa
        asdf: 
            adf: 111
    asdf

    #{
        asdf
        asdfasdf
    }
$afsdfasd fasdf$
#{
    asdf
    asdfasdf
}
`
bug(txflow, s, 'typst')
// run bug to see previous results
