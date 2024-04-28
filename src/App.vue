<template>
  <div class="layout-container">
    <div class="layout">
      <top-navigation></top-navigation>
      <div class="page-content">
        <router-view/>
      </div>
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
  font-family: 'Poppins', Arial, sans-serif;
  background: black;
}
.layout-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  justify-content: center;
}
.layout {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 1440px;
  background: white;
}

.page-content
{
  display: block;
  padding: 80px 100px;
}
</style>
