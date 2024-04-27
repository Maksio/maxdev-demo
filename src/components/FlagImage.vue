<script setup lang="ts">
import {computed, defineProps} from 'vue';

const props = defineProps<{
  country: string;
}>();

const imgSrc = computed(() => `/assets/Flags/${props.country}/Flag/Off.svg`)
</script>

<template>
  <img alt="🏁" :src="imgSrc" class="flag-image"/>
</template>

<style>
.flag-image {
  width: 21px;
  height: 15px;
}
</style>