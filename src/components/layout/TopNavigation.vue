<template>
  <div class="top-navigation">
    <div class="top-navigation__logo" @click="$router.push('/')">IP-PN.COM</div>
    <div class="top-navigation__search">
      <div class="ip-search">
        <ip-search v-model="ipSearch" confirm></ip-search>
      </div>
    </div>
    <div class="top-navigation__menu">
      <top-menu/>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopMenu from "@/components/layout/TopMenu.vue";
import IpSearch from "@/components/IpSearch.vue";
import {ref, watch} from 'vue';
import {useIpStore} from "@/store";

const ipSearch = ref('')
const store = useIpStore();

watch(ipSearch, () => {
  const re = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/gm
  const found = ipSearch.value.match(re);

  if (Array.isArray(found) && found.length > 0) {
    store.search(found);
  }
})
</script>

<style>
.top-navigation {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  cursor: pointer;
}

.top-navigation__menu {
  display: flex;
  justify-content: flex-end;
  color: #494949;
}

.ip-search {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
