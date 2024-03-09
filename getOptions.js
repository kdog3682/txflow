import {xmlString} from "/home/kdog3682/2024-javascript/js-toolkit/xmlString.js"
export {
    getOptions,
}
import { getBlocks } from "./blocks.js"
import { ComponentState } from "../vuekit/ComponentState.js"

const typstOptions = {
    combineDefaults: true,
    combineDefaultsBreakOnNewlines: false,
    implicitlyGetAttributes: true,
}

const vuemdOptions = {
    combineDefaults: true,
    combineDefaultsBreakOnNewlines: true,
    implicitlyGetAttributes: false,
}

const vueOptions = {
    combineDefaults: false,
    implicitlyGetAttributes: false,
}


const optionsRef = {
    typst: typstOptions,
    vue: vueOptions,
    vuemd: vuemdOptions,
}
const stateRef = {
    vue: ComponentState,
    vuemd: ComponentState,
}
const visitorRef = {
    vuemd: {
        // transform: xmlString,
    }
}

function getOptions(flavor) {
    const blocks = getBlocks(flavor)
    const options = optionsRef[flavor]
    const state = stateRef[flavor]
    const visitorOptions = visitorRef[flavor]
    return {
        blocks, options, state, visitorOptions
    }
}
