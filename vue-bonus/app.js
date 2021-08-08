window.addEventListener('load', () => {
    setTimeout(() => { }, 3000)

    new Vue({
        el: '#nextTick',
        data: {
            emir: 'emir'
        },
        methods: {
            getAction() {
                this.emir = "developer emir"
                console.log(document.getElementById('emir').innerText)
                this.$nextTick(() => {
                    console.log(document.getElementById('emir').innerText)
                })
            }
        }
    })

    Vue.config.keyCodes.a = 65
    new Vue({
        el: '#modifiers',
        data: {
            message: ''
        },
        methods: {
            click() {
                console.log(this.message)
            }
        }
    })

    new Vue({
        el: '#filters',
        data: {
            name: 'logitech camera',
            price: 30
        },
        filters: {
            toUpper(text) {
                return `${text.toUpperCase()}`
            },
            withTax(price) {
                return `${(price * 1.18).toFixed(2)} tl`
            }
        }
    })
})