<template>
  <div id="wrapper" :key="$route.fullPath">

    <main class="content">
      <img id="logo" src="~@/assets/logo.png" alt="electron-vue">

      <div class="doc">
        <div class="search"><input type="search" name="search" v-model="filter" placeholder="Что вы хотите найти?" v-touppercase></div>

        <router-link to="/new" class="btn" v-show='admin'> Добавить </router-link>
        <button type="button" class="btn" v-show='admin' v-on:click="fetchData">Обновить данные</button>
        <input type="hidden" v-shortkey="['ctrl', 'alt', 'insert']" @shortkey="isAdmin()">

        <div class="grid">
  				<router-link :to="{ name: 'post', params: { id: post.id } }" class="card" v-for="post in filterdPosts" >
  					<h3>{{post.title}}</h3>
  					<div class="contacts">{{post.contacts}}</div>
            <div class="boss"><strong>Руководитель: </strong>{{post.boss}}</div>
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

Vue.use(require('vue-shortkey'))

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
            admin: false
         }
    },
    beforeRouteUpdate (to, from, next) {
      this.fetchData()
      next()
    },
  	computed: {
  		filterdPosts() {
  			if (!this.filter) return this.posts

  			return _.filter(this.posts, post => {
  				const haystack = Object.values(post).join(',')
  				return haystack.toLowerCase().indexOf(this.filter) != -1
  			})
  		}
  	},
    watch: {
       // при изменениях маршрута запрашиваем данные снова
       '$route': 'fetchData'
    },
    methods: {
      isAdmin() {
        this.admin = !this.admin
      },
      block() {
        return false;
      },
      fetchData () {
        window.location.reload()
      }
    }
  }
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', 'Arial', sans-serif;
}

#wrapper {
  position: relative;
  padding: 60px 80px;

  &::after {
    content: '';
    background: radial-gradient(ellipse at top left, rgba(255, 255, 255, 1) 40%, rgba(229, 229, 229, 0.9) 100%);
    height: 100vh;
    width: 100vw;
    margin: 0 -80px;
    position: fixed;
    top: 0;
    z-index: -1;
  }
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
  margin: auto;
  margin-bottom: 2rem;
}

main {
  display: flex;
  justify-content: space-between;

  > div {
    flex-basis: 50%;
  }
}

.left-side {
  display: flex;
  flex-direction: column;
}

.right-side {
  display: flex;

  .btn{
    margin: 0 5px;
  }
}

.flex {
  flex: 1 auto;
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

  &.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.btn {
  cursor: pointer;
  outline: none;
  border-radius: 2em;
  color: #fff;
  background-color: #3f51b5;
  transition: all 0.15s ease;
  box-sizing: border-box;
  text-decoration: none;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 14px;
  line-height: 1.6;
  text-transform: uppercase;

  &.alt {
    color: #3f51b5;
    background-color: transparent;
    box-shadow: inset 0 0 0 1px #3F51B5;
    border-radius: 4px;
    line-height: 1.2;
    &:hover{
      color: #fff;
      background-color: #3f51b5;
    }
  }
}

.search {
  text-align: center;
}

.contacts {
  margin-bottom: 1rem;
}

input[type="search"] {
  padding: 1rem;
  min-width: 500px;
  border-radius: 44px;
  border: 1px solid #d6d6d6;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);

  &:focus {
    outline: none;
    border-color: #000080;
  }
}

main.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  grid-gap: 20px;
  align-items: stretch;
}

.card {
  box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.08), 0 1px 3px 1px rgba(60, 64, 67, 0.16);
  background: #fff;
  border-radius: 3px;
  color: #616161;
  display: block;
  font-size: 13px;
  margin: 15px 0;
  overflow: hidden;
  vertical-align: top;
  width: 380px;
  z-index: 1;
  padding: 16px 20px 12px;
  text-decoration: none;
  transition: box-shadow 0.08s linear, min-width 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  h3{
    margin-bottom: 1rem;
  }

  &:hover {
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.19), 0 4px 8px 3px rgba(60, 64, 67, 0.149);
  }
}
</style>
