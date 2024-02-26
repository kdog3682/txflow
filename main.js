import { getBlocks } from "./blocks.js"
import { parser } from "./parser.js"
import { LineScanner } from "./LineScanner.js"
import { interpreter } from "./interpreter.js"
import { bug } from "/home/kdog3682/2024-javascript/js-toolkit/bug.js"
import { createVisitor } from "/home/kdog3682/2024-javascript/js-toolkit/createCompiler.js"
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
    // console.log()
    root.type = 'Root'
    const visitor = createVisitor(blocks)
    return visitor.visit(root)
// ./typstBlocks.js
}

const s = `
// hi guys
// hi guys
// hi guys

flex asdf = adsfasdf aa  = aaaaa
    // dddasdas: 111111
    // sdf: sdfsdf
        // adf: 111

    flex asdf = adf

        adfadsf
        adfadsf


        yyadfadsf
        yyadfadsf

        flex
            abc
            bye
            hi
            bye


    // b
    // c
    // c
    // c
    // c

    // this is a codeblock but the hash will be stripped away
    // because we are inside of a hash block
    // in general, will always need to perform this check
    // in geneal, we only do spellchecks inside of prose

    #{
        asdf

        asdfasdf
                asdfasdf
            asdfasdf
    }
`
bug(txflow, s, 'typst')
// run bug to see previous results
// ./typstBlocks.js
