import * as txflow from "../main.js"

const opts = {
    lang: 'vuemd',
    mode: 'json',
    // mode: 'str',
    xstyles: {
        Root: {
            margins: {
                type: 'smart',
                handler(child, i) {
                    if (i == 0) {
                        return 
                    }
                    return '1em'
                },
            }
        },
        flex: {
            margins: {
                type: 'smart',
                handler(child, i) {
                    if (i == 0) {
                        return 
                    }
                    return '1em'
                },
            }
        }
    },
    // mode: 'str',
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
