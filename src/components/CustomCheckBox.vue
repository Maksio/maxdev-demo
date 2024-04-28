<template>
  <div class="custom-checkbox">
    <img :src="stateImgSrc" alt=""/>
  </div>
</template>

<script setup lang="ts">
import {withDefaults, defineProps, computed} from 'vue';

const props = withDefaults(defineProps<{
  checked: boolean;
}>(), {checked: false});

const stateImgSrc = computed(() => {
  const state = props.checked ? 'on' : 'off';
  return `/assets/check_${state}.svg`
})
</script>


<style>
.custom-checkbox {
  display: flex;
  width: 24px;
  height: 24px;
}
</style>
