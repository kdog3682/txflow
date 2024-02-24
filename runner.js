import {
    isArray,
    bool,
} from "/home/kdog3682/2023/utils.js"

export {
    runner,
}

function runner(line) {
    const finder = (block) => {
        if (block.match) {
            const match = block.match(line)
            if (match) {
                this.matches = isArray(match) ? match : [match]
                return bool(match)
            }
            return
        }
        return block.check(line)
    }

    this.startInd = line.ind
    const block = this.blocks.find(finder)
    const startIndent = this.indentTracker.onStart(block, line)

    if (startIndent === false) {
        return
    }

    this.token = this.createToken()
    this.token.set("type", block.type, true)
    this.token.set("startIndent", startIndent)
    this.token.set("startIndex", line.index)

    if (block.advanceOnMatch) {
        this.eat()
    }
    if (block.attributable) {
        this.maybeGetProperties()
    }
    this.maybeGetAttributes()

    if (this.notDone()) {
        const status = block.run.call(this)
        if (status === false) {
            return
        }
    }

    if (this.token.touched()) {
        // console.log(this.token)
        this.store.push(this.token)
    } else {
        this.untouchedTokenError()
    }
    // console.log({block})
    this.indentTracker.onEnd(block)
}

