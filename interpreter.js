export {
    interpreter,
}
import { traverse, Traversal, inAndOut } from "/home/kdog3682/2024-javascript/js-toolkit/traverse.js"


const onEnter = {
    // is: {
        // default:
    // }
}

const onBranchExit = {
    is: {
        list(node) {
            throw 'hi'
        },
        listItem(node) {
            // node.parent.type = 'list'
            // return
            const config = {
                from: {
                    type: 'self',
                },
                while: {
                    type: 'self',
                }
            }
            const siblings = node.findSiblings(config)
            // throw siblings.length
            const intermediate = node.create({type: 'list'})
            node.parent.insertNodeAfter(node, intermediate, true)
            intermediate.append(siblings, true)
             
            // console.log(siblings.length)
            console.log(siblings.length)
            node.parent.deleteSilently(siblings)
            // throw node.parent.children
            // throw node.parent.deletions.length
            // throw node.parent.size
            // node.parent.remove(siblings)
            // node.parent.append(intermediate)
            // throw node.parent.children
            // throw intermediate.children
        },
        dialogueDelimiter(node) {
            if (node.break && node.count > 1) {
                // console.log('aa')
                return 
            }
            const config = {
                from: 'self', to: {type: 'dialogueDelimiter', offset: -1}
            }
            const siblings = node.findSiblings(config)
            if (siblings.length == 0) {
                node.remove()
            } else {
                node.parent.remove(siblings)
                node.append(siblings)
            }
        }
    }
}
function interpreter(node, blocks) {
    const onEnd = (node) => {
        // throw node.firstChild
        //  
        console.log(node.toString())
    }
    const traversal = new Traversal({
        // onEnter,
        // onExit: onBranchExit,
        blocks,
        onEnd,
    })
    // throw traversal.traversalConfig
    return traversal.traverse(node)
}
