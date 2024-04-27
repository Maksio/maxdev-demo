<template>
  <div class="cell-button">
    <img :src="actionSrc[action]">
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';

const actionSrc = {
  'delete': '/assets/delete.svg',
  'copy': '/assets/copy.svg',
}

defineProps<{
  action: 'copy' | 'delete';
}>()
</script>


<style>
.cell-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>