<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id); // routesで設定した「:id」と同じ名前

console.log('watch 外:', id);

watch(route, () => {
  id.value = route.params.id;
  console.log('watch 内:', id.value);
});
</script>

<template>
  <h1>Blog Page</h1>
  <p>Blog Id = {{ id }}</p>
</template>
