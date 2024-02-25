export {
    getBlock,
}

function getBlock({
    includeEndpoint = false,
    includeStartpoint = true,
    to = null
} = {}) {

    const push = () => {
        const cur = this.eat()
        this.token.push(cur)
    }

    const startIndent = this.startInd

    let count = 0
    while (this.notDone()) {
        if (count++ == 0) {
             if (includeStartpoint) {
                push()
             } else {
                this.eat()
             }
        } else {
            push()
        }
        // console.log(this.index, startIndent)
        const next = this.peek()
        if (to) {
            if (to.test(next.text)) {
                push()
                break
            }
            continue
        }
        // console.log({cur, next, startIndent, break: next == null || (next.ind <= startIndent)})
        // throw ''
        if (next == null) {
            break
        }
        if (next.ind <= startIndent) {
            if (includeEndpoint) {
                push()
            }
            break
        }
    }
}
