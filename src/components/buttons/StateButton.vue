<template>

  <el-tooltip placement="top"
              effect="light"
              raw-content
              :content="tooltipContent"
  >
    <div class="state-button" :class="buttonClass">
      <img :src="actionSrc[state].url" alt="">
    </div>
  </el-tooltip>

</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {IpState} from "@/store";

const actionSrc = {
  'success': {url: '/assets/success.svg', label: 'Успешно'},
  'busy': {url: '/assets/busy.svg', label: 'В процессе'},
  'fail': {url: '/assets/fail.svg', label: 'Не успешно'},
}

const props = defineProps<{
  state: IpState;
}>()

type ClassType = {
  [key: string]: boolean;
}
const buttonClass = computed(() => {
  const result: ClassType = {};
  result[props.state] = true;
  return result;
})

const tooltipContent = computed(() =>
    `<div class="custom-tooltip">${actionSrc[props.state].label}</div>`
)
</script>


<style>
.custom-tooltip {
  font-family: 'Inter', Arial, sans-serif;
  padding: 8px;
}

.state-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 2px;
  cursor: pointer;
}

.state-button.success:hover {
  background: #E9F8E8;
}

.state-button.busy:hover {
  background: #F8F3E8;
}

.state-button.fail:hover {
  background: #F8E8E8;
}
</style>
