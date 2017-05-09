<template>
  <div>
    <router-link class="page-back" v-if="visible" :to="'/'">
      <i class="mintui mintui-back"></i>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:"app",
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    startHacking () {
      this.$toast('It Works!')
    }
  }
}
</script>

