import { txflow } from "../main.js"

const s = `

props: abc, def
foobar: 123
name: sammy
data:
    foo
        boo: 123

booga jhi
    class = booga
container foo = bar
    stroke:
        fill: blue

    click() {
        console.log('hixxxxxxxxxxxxxxxxx')
    }
    template #abc = {asdasd}
    p howdy
    p howdy
        v-asd.123:fooo = asd
        click(e) {
            console.log('hp')
            this.foo += 1
            this.av += 1
            // can d
            hola(this.abcde)
        }
        asdf = aaa
`

console.log(txflow(s, 'vue', ''))
// ../vueBlocks.js
