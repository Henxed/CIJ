<template>
  <div id="wrapper">

    <main class="content">
        <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
      <div class="doc">
        <div class="search"><input type="search" name="search" v-model="filter" placeholder="Что вы хотите найти?" v-touppercase></div>
        <router-link to="/new"> Новый </router-link>
        <div class="grid">
  				<router-link :to="{ name: 'post', params: { id: post.id } }" class="card" v-for="post in filterdPosts" >
  					<h3>{{post.title}}</h3>
  					<div class="contacts">{{post.contacts}}</div><div class="boss">{{post.boss}}</div>
  				</router-link>
        </div>

      </div>

    </main>
  </div>
</template>

<script>
import Vue from 'vue'
const low = require('lowdb')
const _ = require('lodash')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const store = low(adapter)

Vue.directive( 'touppercase', {
    update (el) {
        el.value = el.value.toLowerCase()
    },
})

  store.posts = store.get('posts')

  export default {
    data: function() {
         return  {
            filter: '',
         		posts: store.get('posts').value(),
         }
    },
  	computed: {
  		filterdPosts () {
  			if (!this.filter) return this.posts

  			return _.filter(this.posts, post => {
  				const haystack = Object.values(post).join(',')
  				return haystack.toLowerCase().indexOf(this.filter) != -1
  			})
  		}
  	}
  }
</script>

<style>


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Segoe UI', 'Arial', sans-serif; }

  #wrapper {
    position: relative;

    padding: 60px 80px;
  }

  #wrapper::after{
    content: '';
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    width: 100vw;
    margin: 0 -80px;
    position: fixed;
    top: 0;
    z-index: -1;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
    margin: auto;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }
  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
  .search {
      text-align: center;
  }

  input[type="search"] {
      padding: 1rem;
      min-width: 500px;
      border-radius: 44px;
      border: 1px solid #d6d6d6;
      box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
  }

  input[type="search"]:focus {
      outline: none;
      border-color: red;
  }

  main.content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 2rem auto;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    grid-gap: 20px;
    align-items: stretch;
  }
  .card {
    box-shadow: 0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16);
    background: #fff;
    border-radius: 3px;
    color: #616161;
    display: block;
    font-size: 13px;
    margin: 15px 0;
    overflow: hidden;
    vertical-align: top;
    width: 340px;
    z-index: 1;
    padding: 16px 20px 12px;
    text-decoration: none;
}
</style>
