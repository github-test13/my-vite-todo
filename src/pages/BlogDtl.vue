<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id); // routesで設定した「:id」と同じ名前

const dtl = ref({});
const fetchData = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts/' + id.value
  );
  dtl.value = await response.json();
};
fetchData();
</script>

<template>
  <div>
    <h1 class="title">{{ dtl.title }}</h1>
    <div class="dtl">{{ dtl.body }}</div>
  </div>
</template>

<style scoped>
.title {
  margin: 12px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.dtl {
  line-height: 1.5;
}
</style>
