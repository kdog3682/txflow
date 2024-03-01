export {
    getOptions,
}
import { getBlocks } from "./blocks.js"
import { ComponentState } from "../vuekit/ComponentState.js"

const typstOptions = {
    combineDefaults: true,
    implicitlyGetAttributes: true,
}

const vueOptions = {
    combineDefaults: false,
    implicitlyGetAttributes: false,
}


const optionsRef = {
    typst: typstOptions,
    vue: vueOptions,
}
const stateRef = {
    vue: ComponentState,
}

function getOptions(flavor) {
    const blocks = getBlocks(flavor)
    const options = optionsRef[flavor]
    const state = stateRef[flavor]
    return {
        blocks, options, state
    }
}
