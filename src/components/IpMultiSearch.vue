<template>
  <el-input type="textarea"
            v-model="search"
            autofocus
            class="multi-search__input"
            placeholder="Введите IP адреса"
  ></el-input>
  <div class="multi-search__buttons">
    <el-button class="multi-search__button" @click="doSearch">Отправить</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useIpStore} from "@/store";

const search = ref('')
const ipStore = useIpStore();


const doSearch = async () => {
  const re = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/gm
  const found = [...search.value.matchAll(re)].map(el => el.shift())

  if (found.length) await ipStore.search(found as string[]);
}
</script>

<style >
.multi-search__input textarea {
  width: 620px;
  height: 112px;
  color: #8A8A8A;
  padding: 12px;
  font-family: Poppins, Arial, sans-serif;
}

.el-button.multi-search__button {
  background: #F2F0F0;
  padding: 24px;
  border: none;
  font-family: Poppins, Arial, sans-serif;
}
</style>