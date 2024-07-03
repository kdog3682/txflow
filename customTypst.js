import {customFactory} from "/home/kdog3682/2024-javascript/txflow/main.js"

const options = {
    combineDefaults: true,
    combineDefaultsBreakOnNewlines: false,
    implicitlyGetAttributes: true,
}

const blocks = [
    {
        match: /./,
        type: 'abc',
        ignorable: false,
        run() {
            throw 'h'
            this.token.push(this.eat())
        },
        visit(node) {
            throw node
        }
    }
]

// const customTypst = customFactory(blocks, options)
// console.log(customTypst('asdf: hi'))
