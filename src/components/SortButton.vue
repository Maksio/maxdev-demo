<template>
  <div class="sort-button">
    <el-dropdown trigger="click">
      <el-button class="sort-button">
        {{ activeState.label }}
        <el-icon class="el-icon--right custom-drop-icon">
          <arrow-down/>
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu class="dropdown__menu">
          <div class="dropdown__title">Сортировка</div>
          <el-dropdown-item
              v-for="state in states" :key="state.direction"
              class="dropdown__item"
              :class="{active: activeState.direction == state.direction}"
              @click="activeState = state"
          >
            {{ state.label }}
            <el-icon v-if="activeState.direction == state.direction" class="el-icon--right1">
              <Select/>
            </el-icon>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults, ref, watch} from 'vue'
import {ArrowDown, Select} from '@element-plus/icons-vue'
import {useIpStore} from "@/store";

const props = withDefaults(defineProps<{
  field: string;
}>(), {
  field: 'country',
})


const states = [
  {direction: 'desc', label: 'A-Z'},
  {direction: 'asc', label: 'Z-A'},
]

const activeState = ref(states[0])
const store = useIpStore();

watch(activeState, (v) => {
  const sorter = { field: props.field, direction: activeState.value.direction };
  store.sort(sorter);
})

</script>

<style>
.sort-button {
  font-family: 'Inter';
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  border-radius: 4px;
  border: none;
  max-height: 24px;
  height: 24px;
}
.sort-button .el-dropdown button {
  padding: 4px 8px;
  color: #403CF7;
  border: 1px solid #403CF7;
}
.dropdown__title {
  font-family: 'Inter';
  font-size: 13px;
  line-height: 13px;
  padding: 3px 6px;
  color: #929496;
}

.dropdown__menu {
  padding: 2px;
}

.custom-drop-icon {
  color: #929496;
}
.el-dropdown-menu__item.dropdown__item {
  padding: 2px 2px 2px 6px;
  margin: 2px;
}

.dropdown__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  gap: 4px;

  border-radius: 2px;
}

.dropdown__item.active {
  background: #E2E2FE;
  color: #403CF7;
}
</style>