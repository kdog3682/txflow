


function getBlocks(flavor) {

    assert(flavor, `
        a flavor is required to access the relevant blockset.
        there is no default blockset.

        blockset choices are: 
        - vue
        - markdown
        - typst
        - robots
        - svg
    `)

    const get = (key) => {
        switch(key) {
            case 'vue': return vueBlocks
            case 'markdown': return markdownBlocks
            case 'typst': return typstBlocks
            case 'robots': return robotsBlocks
            case 'svg': return svgBlocks
        }
    }

    const base = get(flavor)

    const filter = (x) => {
        return !x.skip
    }

    const ls_matchf = (x)=> {
        return isRegExp(x) ? (o) => match(o.text, x) : x
    }

    const ls_testf = (x)=> {
        return isRegExp(x) ? (o) => x.test(o.text) : x
    }

    const mapper = editf(match: ls_matchf, check: ls_testf})

    return sort(base.filter(filter).map(mapper), {priority})
}

function priorityValue(key) {

    const ref = {
        'A': 10,
        'B': 20,
    }

    if (key in ref) {
        return ref[key]
    }
    if (isNumber(key)) {
        return key
    }
    return Infinity
}

const items = [
  { name: "Item1", priority: "B" },
  { name: "Item2", priority: "urgent" },
  { name: "Item3", priority: 5 },
  { name: "Item4", priority: "A" },
  { name: "Item5", priority: "top-level" },
];

