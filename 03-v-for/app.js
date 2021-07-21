Vue.component('VueCart', {
    props: {
        cart: { type: Array, required: true },
        title: { type: String, required: true },
        type: { type: String, required: true }
    },
    methods: {
        deleteItemFromCart(index) {
            return this.cart.splice(index, 1)
        },
        changeCart(index) {
            const item = this.deleteItemFromCart(index)
            this.$emit('itemchangedoncart', item[0], this.type)
        }
    },
    computed: {
        cartTotal() {
            let total = 0
            this.cart.forEach((item) => {
                total += parseFloat(item.price, 10)
            });
            return total.toFixed(2)
        },
        cartText() {
            if (this.cart.length > 1) {
                return 'items'
            }
            else {
                return 'item'
            }
        },
        isShoppingCart() {
            return this.type == "shoppingCart"
        },
        isSavedCart() {
            return this.type == "savedCart"
        }
    },
    template: `
        <div class="cart-wrapper">
            <h2>{{title}}</h2>
            <p v-if="!cart.length">No item in cart.</p>
            <div class="cart">
                <div class="item" v-for="(item, index) in cart">
                    <div class="image">
                        <a :href="item.url" target="_blank">
                            <img :src="item.image" />
                        </a>
                    </div>
                    <div class="info">
                        <h4>{{item.name}}</h4>
                        <p class="seller">by {{item.seller}}</p>
                        <p class="status available" v-if="item.isAvailable">In Stock</p>
                        <p class="shipping" v-if="item.isEligible">Eligible for FREE Shipping & FREE Returns</p>
                        <a href="#" @click="deleteItemFromCart(index)">Delete</a>
                        <a href="#" class="secondary" @click="changeCart(index)" v-if="isShoppingCart">Save for later</a>
                        <a href="#" class="secondary" @click="changeCart(index)" v-if="isSavedCart">Move to cart</a>
                    </div>
                    <p class="price">\${{ item.price }}</p>
                </div>
                <div class="subtotal" v-if="cart.length">
                    Subtotal ({{cart.length}} {{cartText}}): <span class="price">\${{ cartTotal }}</span>
                </div>
            </div>
        </div>
    `
})

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
            handleItemChange(item, cartType) {
                if (cartType === "shoppingCart") {
                    this.saved.push(item)
                }
                else {
                    this.cart.push(item)
                }
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
    })
})