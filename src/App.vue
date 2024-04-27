<template>
  <div class="common-layout">
    <top-navigation></top-navigation>
    <div class="page-content">
      <router-view/>
    </div>
  </div>
</template>


<script setup lang="ts">

import TopNavigation from "@/components/layout/TopNavigation.vue";
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Poppins';
}

.common-layout {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100vw;
}

.page-content
{
  display: block;
  padding: 80px 100px;
}
</style>