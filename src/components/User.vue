<template>
  <div v-if="user" class="hello">Hello {{ user.id }} 👋</div>
</template>

<script>

export default {
  name: 'User',
  props: {
    user: Object
  }
}

</script>


<style>

.hello {
  padding-bottom: 20px;
}

</style>