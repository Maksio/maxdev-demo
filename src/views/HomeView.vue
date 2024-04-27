<template>
  <div class="home-view">
    <el-input type="textarea"
              v-model="search"
              class="input__ip-list"
              placeholder="Введите IP адреса"
    ></el-input>
    <div class="home-view__buttons">
      <el-button class="home-view__button" @click="doSearch">Отправить</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const search = ref('')

const doSearch = () => {
  const re = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/gm
  const found = [...search.value.matchAll(re)].map(el => el.shift())

  console.log(found)
}

</script>

<style>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.home-view__buttons {

}
.input__ip-list textarea {
  width: 620px;
  height: 112px;
  color: #8A8A8A;
  padding: 12px;
  font-family: Poppins, Arial, sans-serif;

}
.home-view__button {
  background: #F2F0F0;
  padding: 24px;
  border: none;
  font-family: Poppins, Arial, sans-serif;
}

</style>