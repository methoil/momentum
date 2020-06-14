<template>
  <div>
    <div class='habit-link'>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  components: {
    
  },
  props: ['name']
})

</script>


<style>
  .habit-link {
    background-color: cyan;
    border-radius: 50px;
    width: 100px;
  }
</style>