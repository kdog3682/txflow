export {
    _getBlock,
    getBlock,
}
function getBlock(o) {
    const block = this._getBlock(o)
    this.token.push(block)
}

function _getBlock({
    includeEndpoint = false,
    includeStartpoint = true,
    to = null,
} = {}) {

    const store = []
    const push = () => {
        const val = this.eat()
        store.push(val)
    }

    // let startIndent = this.startInd
    let startIndent

    let count = 0
    while (this.notDone()) {
        if (count++ == 0) {
            startIndent = this.peek().ind
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

    return store
}
