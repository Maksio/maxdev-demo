<template>
  <div class="ip-search">
    <el-input
        v-model="search"
        :formatter="inputFormatter"
        :prefix-icon="Search"
        class="search-input"
        placeholder="Type IP address here..."></el-input>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { Search } from '@element-plus/icons-vue'

const search = ref<string>('')

function inputFormatter(value: string) {
  return `${value}`
}

</script>

<style>
.ip-search {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.search-input {
  max-width: 460px;
}
.search-input .el-input__inner {
  margin: 8px 12px 8px 4px;
}
.search-input .el-icon svg{
  transform: scale(1.43);
  color: #494949;
}
</style>