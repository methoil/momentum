<template>
<div>
  <form>
    <input type="text" v-model="newChain">
    <button :on-press="addLink()">Add Link</button>
  </form>

  <div>
    <div v-for="link in links" :key="link.name">
      <Link name="link.name">
    </div>
  <div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Link from './habit-link.vue';

export default Vue.extend({
  components: {
    Link,
  },
  data: {
    newChain: '',
    links: [] as {name: string} [],
  },
  methods: {
    addLink: function() {
      this.links.push({
        name: this.newChain,
      });
    }
  }
})

</script>


<style>


</style>