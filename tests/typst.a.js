import * as txflow from "../main.js"

const s = `
// hi guys
// hi guys
// hi guys

flex asdf = adsfasdf aa  = aaaaa
    dddasdas: 111111
    sdf: sdfsdf
        adf: 111

    flex asdf = adf

        adfadsf
        adfadsf


        yyadfadsf
        yyadfadsf

        flex
            abc
            bye
            hi
            bye


    // b
    // c
    // c
    // c
    // c

    // this is a codeblock but the hash will be stripped away
    // because we are inside of a hash block
    // in general, will always need to perform this check
    // in geneal, we only do spellchecks inside of prose

    #{
        asdf

        asdfasdf
                asdfasdf
            asdfasdf
    }
`
const typstFlow = txflow.factory({lang: 'typst', mode: 'str'})
console.log(typstFlow(s, 'typst'))
