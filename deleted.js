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
            // console.log(siblings.length)
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


function toContentString({ startIndent, contents }) {
    if (empty(contents)) {
        return ""
    }
    let offset = getShortest(contents, (x) => x.ind).ind
    const k = 4
    const normalize = ({ text, ind, newlines }, i, a) => {
        let spaces = ind - offset
        const nl = newlines && !isLast(i, a) ? newlines : 0
        return " ".repeat(spaces * k) + text + "\n".repeat(nl)
    }
    return contents.map(normalize).join("\n")
}

class TypstRenderer {
    constructor() {
        this.s = ''
    }
    run(node, children) {
        const data = node.toJSON()
        const type = node.type
        // const {type, contents, name, attributes, properties} = node
        const ref = typeRef[type]

        const s = ref.fn(contents)
    }
}
