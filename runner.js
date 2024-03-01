import {
    isArray,
    getLast,
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
        // block.check ... should be renamed
        return block.check(line)
    }

    this.startInd = line.ind
    const block = this.blocks.find(finder)
    if (block.ignorable) {
        this.eat()
        return 
    }
    const startIndent = this.indentTracker.onStart(block, line)

    if (startIndent === false) {
        return
    }

    this.token = this.createToken()
    this.token.set("type", block.type, true)
    this.token.set("startIndent", startIndent, true)
    this.token.set("startIndex", line.index, true)

    if (block.advanceOnMatch) {
        this.eat()
    }
    if (this.options.implicitlyGetAttributes) {
        let res1
        if (block.attributable) {
            res1 = this.maybeGetProperties()
        }
        let res2 = this.maybeGetAttributes()
        if (res1 === false && res2 === false && block.needsToAdvance) {
            this.eat()
        }
    }

    if (this.notDone()) {
        const status = block.run.call(this)
        if (status === false) {
            return
        }
    }

    if (this.token.touched()) {
        const last = getLast(this.store)
        if (this.options.combineDefaults && this.token.type == 'default' && last?.type == 'default') {
            // console.log(this.token)
            last.contents.push(...this.token.contents)
        } else {
            this.store.push(this.token)
        }
    } else {
        this.untouchedTokenError()
    }
    // console.log({block})
    this.indentTracker.onEnd(block)
}

