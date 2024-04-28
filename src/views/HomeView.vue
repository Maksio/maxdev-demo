<template>
  <div class="home-view">
    <div class="view" v-if="listEmpty">
      <ip-multi-search />
    </div>
    <div class="view" v-else>
      <ip-table/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useIpStore} from "@/store";
import {storeToRefs} from "pinia";
import IpMultiSearch from "@/components/IpMultiSearch.vue";
import IpTable from "@/components/IpTable.vue";

const ipStore = useIpStore();
const {listEmpty} = storeToRefs(ipStore);
</script>

<style>
.view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
