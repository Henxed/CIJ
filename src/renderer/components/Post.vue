<template>
  <div id="wrapper">

    <main class="content">
      <a href="#/">На главную</a>
      <div class="doc">

        <div class="card">
          <h3>{{post.title}}</h3>
          <div class="contacts">{{post.contacts}}</div><div class="boss">{{post.boss}}</div>

        </div>

        <div class="special"><span v-html="post.special"></span></div>

      </div>

    </main>

  </div>
</template>

<script>
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const store = low(adapter)



  export default {
    props: ['id'],
    data: function() {
         return  {
         	 post: store.get('posts').find({ id: parseInt(this.$route.params.id) }).value()
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
