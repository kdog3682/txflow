import { txflow } from "../main.js"

const sa = `

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
// show
// debug:abc
const s = `

name: v-child

data:
    student:
        name: sam
        age: 10
            
p {student.name}
p {student.age}
p hi from {student.name}
    click() {
        console.log(this.student.name)
    }

`

console.log(txflow(s, 'vue', ''))
// ../vueBlocks.js
