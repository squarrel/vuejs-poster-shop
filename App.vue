<template>
    <div id="app">
        <div class="header">
            <h1>Prodavnica</h1>
            <p>
                <router-link to="/">Home</router-link>
                <router-link to="/products">Shop</router-link>
                <router-link to="/about">About Us</router-link>
                <router-link to="/contact">Contact</router-link>
            </p>
            <form class="searchbar" v-on:submit.prevent="onSubmit">
                <input placeholder="Tragaj za proizvodima" v-model="newSearch"></input>
                <input type="submit" value="Tragaj" class="btn"></input>
            </form>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Products from './components/Products';

const Home = {template: '<div>Home page</div>'}
const Products = {template: Products}
const Product = {template: '<div>Product no. 1</div>'}
const About = {template: '<div>About</div>'}
const Contact = {template: '<div>Contact</div>'}

const routes = [
    {path: '/', component: Home},
    {path: '/products', component: Products},
    {path: '/product', component: Product},
    {path: '/about', component: About},
    {path: '/contact', component: Contact}
]

const router = new VueRouter({
    routes
})


export default {
    router: router,
    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: '',
        lastSearch: '',
        loading: false,
    },
    methods: {
        onSubmit: function() {
            this.items = [];
            this.loading = true;
            this.$http.get('http://localhost:8550/api/products/'.concat('?'+this.newSearch))
                .then(function(response) {
                    this.lastSearch = this.newSearch;
                    this.items = response.data;
                    this.loading = false;
                }
            );
        },
        addItem: function(index) {
            var item = this.items[index];
            price = parseInt(item.price);

            this.total += price;
            var found = false;

            for (var i=0; i<this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    found = true;
                    this.cart[i].qty++;
                    break;
                }
            }

            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price: price
                });
            }
        },
        inc: function(item) {
            item.qty++;
            price = parseInt(item.price);
            this.total += price;
        },
        dec: function(item) {
            item.qty--;
            price = parseInt(item.price);
            this.total -= price;
            if (item.qty <= 0) {
                for (var i=0; i<this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },
    filters: {
        currency: function(value) {
            return '$'.concat(parseInt(value).toFixed(2));
        }
    },
    mounted: function() {
        this.onSubmit();
    }
}
</script>
