import { forEach, push2, stateGetter, getLast, exists, findall, dict, toArgument, getCaller, xassert, getLineTokens } from "/home/kdog3682/2023/utils.js"
import { lazyObjectParser } from "/home/kdog3682/2023/lazyObjectParser2.js"
import { IndentTracker } from "./IndentTracker.js"

import { getBlock } from "./getBlock.js"
import { runner } from "./runner.js"

export {
    LineScanner,
}

class LineToken {
    constructor() {
        this.contents = []
        this.keys = []
    }
    touched(touched) {
        if (touched != null) {
            this._touched = touched
        }
        return this.contents.length || this._touched
    }
    push(s) {
        push2(this.contents, s)
    }
    toJSON() {
        return {
            contents: this.contents,
            ...stateGetter(this, this.keys)
        }
    }
    assign(payload) {
        const ref = getLast(this.contents)
        if (ref) {
            Object.assign(ref, payload)
        }
    }
    set(k, v, save) {
        xassert(
            v, 'v must have a value', {k, v}
        )
        this[k] = v

        if (save) {
            this.keys.push(k)
            this.touched(true)
        }
    }
}

class LineScanner {
    createToken(o) {
        const token = new LineToken()
        forEach(o, ([k,v]) => token.set(k, v, true))
        return token
    }
    constructor(blocks = []) {
        const filter = (block) => {
            return block.check || block.match
        }

        this.blocks = blocks.filter(filter)
        // throw blocks
        this.indentTracker = new IndentTracker(this)
    }
    scan(s) {
        this.lines = getLineTokens(s)
        // throw this.lines
        this.size = this.lines.length
        this.store = []
        this.index = 0
        this._count = 0
        this.run()
        return this.store
    }
    notDone() {
        xassert(
            this._count++ < 1000,
            "breaking infinite loop: " +
                this._count +
                " --index: " +
                this.index +
                ": " +
                JSON.stringify(this.peek())
        )
        return this.index < this.size
    }
    eat() {
        return this.lines[this.index++]
    }
    get currentInd() {
        const line = this.peek()
        const ind = line.ind
        return ind
        // currnetInd
    }
    peek(n = 0) {
        return this.lines[this.index + n]
    }
    run() {
        while (this.notDone()) {
            this.runner(this.peek())
        }
    }
    maybeGetAttributes() {
        const attrStore = []
        const labelRE = /^([a-zA-Z][$\w-_.]*) *:/
        while (this.notDone()) {
            const maybeAttrLine = this.peek()
            if (labelRE.test(maybeAttrLine.text)) {
                this.eat()
                attrStore.push(maybeAttrLine)
            } else {
                break
            }
        }
        if (exists(attrStore)) {
            const attributes = lazyObjectParser(attrStore)
            this.token.set("attributes", attributes, true)
            return true
        } else {
            return false
        }
    }
    maybeGetProperties() {
        const line = this.peek()
        const regex = /(\w\S*) += +(".*?"|\$?(?:\w\S.*|\d+))/g
        const topAttrs = findall(regex, line.text)
        const properties = topAttrs.length && dict(topAttrs, toArgument)

        if (properties) {
            this.eat()
            this.token.set("properties", properties, true)
            return true
        } else {
            // necessary to bypass the line ... ?
            return false
        }
    }

    untouchedTokenError() {
        // console.log(this.token)
        // console.log(this.eat())
        // throw this.token
        // if
        console.log(this.token)
        console.log(line)
        console.log(
            "the token always needs to be touched. ie ... something needs to be pushed into its store. aggregation of newlines occurs after touching. so there should never be a case where this becomes active"
        )
        console.log(block)
        console.log(getCaller())
        throw ""
    }
}


LineScanner.prototype.getBlock = getBlock
LineScanner.prototype.runner = runner
