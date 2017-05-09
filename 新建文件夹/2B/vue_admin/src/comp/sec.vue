<template>
  <div id="gamestore">
    <h1 class="f20 tal">{{msg}}</h1> 
  </div>
</template>

<script>
export default {
  name: 'sec',
  data(){
    return {
      msg: '拼命开发中。。。'
    }
  }
}
</script>

<style>
	#gamestore h1{
		color:red;
		font-size: 24px;
	}
</style>
