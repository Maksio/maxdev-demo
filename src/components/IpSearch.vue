<template>

  <el-input
      :model-value="search"
      @input="inputSearch"
      @change="updateSearch"
      :prefix-icon="Search"
      class="search-input"
      placeholder="Type IP address here..."></el-input>

</template>

<script setup lang="ts">
import {ref, defineProps, withDefaults, defineEmits, watch} from "vue";
import {Search} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import debounce from 'lodash.debounce';

const router = useRouter();

const props = withDefaults(defineProps<{
  confirm?: boolean;
  mapQuery?: boolean;
  modelValue: string;
  debounce?: number;
}>(), {confirm: false, modelValue: '', debounce: 0});

const search = ref<string>(props.modelValue)
const confirmValue = ref<string>(search.value)

const inputSearch = (value: string) => {
  search.value = value;
  if (!props.confirm) {
    confirmValue.value = value;
  }
}
const updateSearch = (value: string) => {
  search.value = value;
  if (props.confirm) {
    confirmValue.value = value;
  }
}

const emit = defineEmits(['update:modelValue'])

type QueryType = {
  query: {
    search?: string;
  }
}
watch(confirmValue, debounce(() => {
  if (props.mapQuery) {
    const query: QueryType = {query: {}};
    if (confirmValue.value) {
      query.query.search = confirmValue.value
    }
    router.replace(query)
  }
  emit('update:modelValue', confirmValue.value);
}, props.debounce))

</script>

<style>
.search-input {
  max-width: 460px;
  height: 44px;
}

.search-input .el-input__inner {
  margin: 9px 12px 7px 4px;
  color: #8A8A8A;
}

.search-input .el-input__wrapper {
  padding-left: 16px;
}

.search-input input.el-input__inner,
.search-input input.el-input__inner::-webkit-input-placeholder {
  font-family: 'Poppins', 'Arial', sans-serif;
}

.search-input .el-icon svg {
  transform: scale(1.43);
  color: #494949;
}
</style>
