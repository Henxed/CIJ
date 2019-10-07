<template>
  <div id="wrapper">

    <main class="content">
        <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
      <div class="doc">
        <div class="search"><input type="search" name="search" v-model="filter" placeholder="Что вы хотите найти?" id="JSsearch"></div>
        <router-link to="/new">
          новый
        </router-link>
        <tbody>
  				<tr v-for="post in filterdPosts">
  					<td>{{post.id}}</td>
  					<td>{{post.title}}</td>
  					<td>{{post.contacts}}</td>
  				</tr>
  			</tbody>

      </div>

    </main>
  </div>
</template>

<script>
const low = require('lowdb')
const _ = require('lodash')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const store = low(adapter)

  store._.mixin({
  	// insert with inrementing id
  	insert: function(col, doc) {
  		let id = col.length > 0 ? _.maxBy(col, 'id')['id'] : 0
  		doc.id = ++id
  		col.push(doc)
  		return col
  	},
  	findById: function(col, id) {
  		return _.find(col, ['id', id])
  	},
  	fuzzyFind (col, needle) {
  		if (!needle) return col
  		return _.filter(col, obj => {
  			const haystack = Object.values(obj).join(',')
  			return haystack.indexOf(needle) != -1
  		})
  	}
  })
  store.posts = store.get('posts')

  export default {
    data: function() {
         return  {
            filter: '',
         		posts: store.get('posts').value(),
            post: {}
         }
    },
  	computed: {
  		filterdPosts () {
  			if (!this.filter) return this.users

  			return _.filter(this.posts, post => {
  				const haystack = Object.values(post).join(',')
  				return haystack.indexOf(this.filter) != -1
  			})
  		}
  	}
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
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
      box-shadow: 0 5px 9px 0px rgba(0, 0, 0, 0.06);
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
</style>
