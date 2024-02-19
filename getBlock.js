export {
    getBlock,
}

function getBlock({
    includeEndpoint = false,
    includeStartpoint = null,
    to = null
} = {}) {
    const push = () => {
        const cur = this.eat()
        this.token.push(cur)
    }

    const startIndent = this.token.startIndent

    while (this.notDone()) {
        push()
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
