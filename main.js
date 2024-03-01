export {
    txflow
}
import { getOptions } from "./getOptions.js"
import { parser } from "./parser.js"
import { LineScanner } from "./LineScanner.js"
import { interpreter } from "./interpreter.js"
import { bug } from "/home/kdog3682/2024-javascript/js-toolkit/bug.js"
import { createVisitor } from "/home/kdog3682/2024-javascript/js-toolkit/createCompiler.js"
"/home/kdog3682/2024-javascript/txflow/blocks.js"

// flavor: markdown | vue | typst
// mode  : str | json
function txflow(s, flavor = 'typst', mode = 'str') {
    const options = getOptions(flavor)
    const scanner = new LineScanner(options)
    console.log('---------')
    console.log(s)
    console.log('---------')
    const tokens = scanner.scan(s)
    const root = parser(tokens)
    root.type = 'Root'
    if (mode == 'ast') {
        return root
    }
    if (mode == 'json') {
        return root.toJSON()
    }

    const visitor = createVisitor(options.blocks, mode)
    if (options.state) {
        visitor.state = new options.state()
    }
    return visitor.visit(root)
}

// /home/kdog3682/2024-javascript/txflow/tests/vue.a.js
// /home/kdog3682/2024-javascript/txflow/tests/typst.a.js
