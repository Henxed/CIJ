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
  				<tr v-for="user in filterdUsers">
  					<td>{{user.id}}</td>
  					<td>{{user.username}}</td>
  					<td>{{user.firstName}}</td>
  					<td>{{user.lastName}}</td>
  					<td>{{user.email}}</td>
  				</tr>
  			</tbody>

        <input type="text" name="username" id="username" v-model="user.username" placeholder="username">
    		<input type="text" name="firstName" id="firstName" v-model="user.firstName" placeholder="firstName">
    		<input type="text" name="lastName" id="lastName" v-model="user.lastName" placeholder="lastName">
    		<input type="text" name="email" id="email" v-model="user.email" placeholder="email">
    		<button class="button" v-on:click="addUser">Submit</button>
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
  store.users = store.get('users')

  export default {
    data: function() {
         return  {
            filter: '',
         		users: store.get('users').value(),
         		user: {}
         }
    },
  	computed: {
  		filterdUsers () {
  			if (!this.filter) return this.users

  			return _.filter(this.users, user => {
  				const haystack = Object.values(user).join(',')
  				return haystack.indexOf(this.filter) != -1
  			})
  		}
  	},
  	methods: {
  		addUser: function () {
  			store.users.insert(this.user).write()
  			this.user = {}
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
