// Vue logic

new Vue({
    el: '#app',
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
});
