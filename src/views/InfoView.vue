<template>
  <div class="info-view">
    <div class="info-view__data" v-if="info">
      <h1>IP: {{info.ip}}</h1>
      <div class="info-view__block">
        <div class="info-view__icon">
          <flag-image :country="info.country" style="transform: scale(5)"/>
        </div>
        <div class="info-view__text">
          <p><b>Country</b>: {{info.country}}</p>
          <p><b>City</b>: {{info.city}}</p>
        </div>
      </div>

    </div>
    <div class="info-view__empty" v-else>
      <h1>422</h1>
      <p>Please check IP you've entered</p>
    </div>

    <div class="info-view__buttons">
      <el-button class="info-view__button" @click="$router.back()">Go back</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IpInfo, useIpStore} from "@/store";
  import {ref} from "vue";
  import {useRoute} from "vue-router";
import FlagImage from "@/components/FlagImage.vue";

  const store = useIpStore();

  const route = useRoute();
  const ip: string = route.query?.ip as string || '';
  const info = ref<IpInfo>(store.getIpInfo(ip) as IpInfo)
</script>

<style>
.info-view__block {
  display: flex;
  gap: 24px;
  width: 100%;
}
.info-view__icon {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info-view__buttons {
  margin-top: 64px;
}
.info-view__button {
  background: #F2F0F0;
  padding: 24px;
  border: none;
  font-family: Poppins, Arial, sans-serif;
}
</style>
