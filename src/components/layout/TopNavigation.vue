<script setup lang="ts">

import TopMenu from "@/components/layout/TopMenu.vue";
import IpSearch from "@/components/IpSearch.vue";
</script>

<template>
  <div class="top-navigation">
        <div class="top-navigation__logo">IP-PN.COM</div>
        <div class="top-navigation__search"><ip-search></ip-search></div>
        <div class="top-navigation__menu"><top-menu/></div>
  </div>
</template>

<style>
.debug {
  border: 1px dashed red;
}
.top-navigation {
  display: grid;
  grid-template-columns: 1fr 4fr 3fr;
  align-items: center;
  gap: 16px;
  padding: 10px 100px;
  margin: 0;
  height: 100px;
  background: #F2F0F0;
}
.top-navigation__logo {
  font-size: 24px;
  color: #0E2E3B;
}
.top-navigation__menu {
  color: #494949;
}
</style>