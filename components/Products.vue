<template>
    <div>
      <div class="products">
          <div v-if="loading">
              Učitava se...
          </div>
          <div class="search-results" v-else>
              Nađeno {{ items.length }} rezultata za naziv {{ lastSearch }}.
          </div>
          <div class="product" v-for="(item, index) in items">
              <div class="product-image">
                <img v-bind:src="item.pictures[0]" />
              </div>
              <div class="">
                  <h4 class="product-title">
                      {{ item.name }}
                  </h4>
                  <p>Price: <strong>{{ item.price | currency }}</strong></p>
                  <button class="add-to-cart btn" v-on:click="addItem(index)">Dodaj u korpu</button>
              </div>
          </div>
      </div>
      <div class="cart">
          <h2>Potrošačka korpa</h2>
          <ul v-for="item in cart">
              <li class="cart-item">
                  <div class="item-title">{{ item.name }}</div>
                  <span class="item-qty">{{ item.price | currency }} x {{ item.qty }}</span>
                  <button class="btn" v-on:click="inc(item)">+</button>
                  <button class="btn" v-on:click="dec(item)">-</button>
              </li>
          </ul>
          <div v-if="cart.length">
              <div>Ukupno: {{ total | currency }}</div>
          </div>
          <div class="empty-cart" v-else>
              Nema proizvoda u korpi.
          </div>
      </div>
    </div>
</template>

<script>
    export default Products;
</script>
