<template>
  <div id="wrapper">

    <main class="content">
      <a href="#/">На главную</a>
      <div class="doc">
          <form class="" action="index.html" method="post">
            <p v-if="errors.length">
              <b>Пожалуйста исправьте указанные ошибки:</b>
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </p>
            <div class="input">
              <label for="title">Название учреждения</label>
              <input type="text" name="title" id="title" v-model="post.title" >
            </div>
            <div class="input">
              <label for="boss">Руководитель</label>
              <input type="text" name="boss" id="boss" v-model="post.boss">
            </div>
            <div class="input">
              <label for="contacts">Контактые данные и адрес</label>
              <textarea name="name" id="contacts" rows="8" cols="80" v-model="post.contacts"></textarea>
            </div>
            <div class="input">
              <label for="special">Специальности</label>
              <textarea name="name" id="special" rows="8" cols="80" v-model="post.special"></textarea>
            </div>
            <button type="button" v-on:click="addPost">Добавить</button>
          </form>
      </div>

    </main>

  </div>
</template>

<script>
import Vue from 'vue'
import VueSnackbar from 'vue-snack'
import 'vue-snack/dist/vue-snack.min.css'

Vue.use(VueSnackbar)

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
	}
})

store.posts = store.get('posts') //вытаскиваем данные, чтобы узнать ID и добавить новую запись

export default {
  data: function() {
       return  {
         post: {},
         errors: [],
         title: null,
         contacts: null,
         boss: null
       }
  },
  methods: {
    ok () {
      this.$snack.success({
        text: 'Запись была добавлена',
        button: 'закрыть',
        action: this.clickAction
      })
    },
    addPost: function (e) {
      if (this.post.title && this.post.contacts && this.post.boss) {
        store.posts.insert(this.post).write()
        this.post = {}
        this.ok()
        this.errors = []
        return true;
      }

      this.errors = [];

      if (!this.post.title) {
        this.errors.push('Требуется указать название.');
      }
      if (!this.post.contacts) {
        this.errors.push('Требуется указать контакты.');
      }
      if (!this.post.boss) {
        this.errors.push('Требуется указать руководителя.');
      }

      e.preventDefault();

    }
  }
}
</script>

<style media="screen">
.input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input input, .input textarea {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 5px;
}
</style>
