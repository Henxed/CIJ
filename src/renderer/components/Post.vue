<template>
  <div id="wrapper">

    <main class="content">
      <div>
        <a href="#/" class="btn">На главную</a>
        <button type="button" class="btn" v-show='admin' v-on:click="delPost">Удалить</button>
        <router-link :to="{ name: 'post-edit', params: { id: post.id } }" class="btn" v-show='admin'> изменить </router-link>
        <input type="hidden" v-shortkey="['ctrl', 'alt', 'insert']" @shortkey="isAdmin()">
      </div>


      <div class="doc">


        <h2>{{post.title}}</h2>
        <div class="card">

          <div class="contacts">{{post.contacts}}</div><div class="boss">{{post.boss}}</div>

        </div>

        <div class="special"><span v-html="post.special"></span></div>

      </div>

    </main>

  </div>
</template>

<script>
import Vue from 'vue'
import VueSnackbar from 'vue-snack'
import 'vue-snack/dist/vue-snack.min.css'
const ipcRenderer = require("electron").ipcRenderer;

Vue.use(VueSnackbar)

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const store = low(adapter)

  export default {
    props: ['id'],
    data: function() {
         return  {
         	 post: store.get('posts').find({ id: parseInt(this.$route.params.id) }).value(),
           admin: false
         }
    },
    methods: {
      del () {
        this.$snack.success({
          text: 'Запись была удалена',
          button: 'закрыть',
          action: this.clickAction
        })
      },
      delPost() {
        store.get('posts').remove({ id: parseInt(this.$route.params.id) }).write()
        document.location.href = '/';
      },
      isAdmin() {
        this.admin = !this.admin
      },
      print(){
        ipcRenderer.send("getPrinterList");
        ipcRenderer.once("getPrinterList", (event, data) => {
        console.log(data);
        });
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

td {
    vertical-align: middle;
    padding: 10px;
    border: 1px solid #d4d4d4;
    border-left: 0;
    border-bottom: 0;
}

table {
    border: 1px solid #d4d4d4;
    border-top: 0;
    border-right: 0;
}
table pre {
    font-size: 16px;
    font-family: 'Segoe UI', sans-serif;
}
</style>
