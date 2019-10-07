import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: []}).write()

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/new',
      name: 'new-data',
      component: require('@/components/NewData').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
