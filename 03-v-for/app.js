window.addEventListener('load', () => {
    window.vue = new Vue({
        el: '#app',
        name: 'Cart',
        data: {
            isLoading: true,
            cart: [],
            saved: [],
        },
        methods: {
            deleteItemFromCart(index) {
                this.cart.splice(index, 1)
            },
            deleteItemFromSaved(index) {
                this.saved.splice(index, 1)
            },
            saveForLater(index) {
                const item = this.cart.splice(index, 1)
                this.saved.push(item[0])
            },
            moveToCart(index) {
                const item = this.saved.splice(index, 1)
                this.cart.push(item[0])
            }
        },
        created() {
            fetch('./data.json')
                .then((res) => { return res.json() })
                .then((res) => {
                    this.isLoading = false
                    this.cart = res.cart
                    this.saved = res.saved
                })
        },
        computed: {
            textChanger: function () {
                if (this.saved.length > 1) {
                    return 'items'
                }
                else {
                    return 'item'
                }
            }
        },
    })
})