<template>
  <el-input type="text"
            v-model="tableSearch"
            autofocus
            class="multi-search__input"
            placeholder="Введите IP адреса"
  ></el-input>
  {{ sortBy }} {{ sortOrder }}
  <el-table
    :data="sortedList"
    style="width: 100%;"
    row-class-name="ip-table__row"
    border
    class="custom-border"
    @selection-change="onSelectRow"
  >
    <el-table-column type="selection" width="48"/>
    <el-table-column prop="ip" label="IP">
      <template #header="scope">
        <div class="custom-row header">
          {{ scope.column.label }}
          <el-button size="small" type="danger"
                     plain
                     class="header-button danger"
                     v-show="rowsSelected"
          >
            Удалить выбранные
          </el-button>
        </div>
      </template>

      <template #default="scope">
        <div class="custom-row">
          <flag-image :country="scope.row.country" />
          {{ scope.row.ip }}
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="country" label="Country">
      <template #header="scope">
        <div class="custom-row header">
          {{ scope.column.label }}
          <sort-button field="country" />
        </div>
      </template>

      <template #default="scope">
        <div class="custom-row">{{ scope.row.country }}</div>
      </template>
    </el-table-column>

    <el-table-column prop="city" label="City/Town">
      <template #default="scope">
        <div class="custom-row">{{ scope.row.city }}</div>
      </template>
    </el-table-column>

    <el-table-column type="default">
      <template #default="scope">
        <div class="custom-row">
          <state-button>{{ scope.row.ip }}</state-button>
        </div>
      </template>
    </el-table-column>

  </el-table>
</template>

<script setup lang="ts">
import {useIpStore} from "@/store";
import {storeToRefs} from "pinia";
import FlagImage from "@/components/FlagImage.vue";
import "@fontsource/inter";
import StateButton from "@/components/StateButton.vue";
import SortButton from "@/components/SortButton.vue";
import {ref} from "vue";

const store = useIpStore()
const { sortedList, sortBy, sortOrder } = storeToRefs(store);

const tableSearch = ref('');
const onSelectRow = (params) => {
  console.log(params)
}
</script>

<style>

.ip-table__row {
  font-family: "Inter";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;

}
.ip-table__row:nth-child(odd) {
  background: #f7f7f7;
}
.custom-border {
  border: 1px solid #cccccc;
  border-radius: 8px;
}
.custom-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.custom-row.header {
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  justify-content: space-between;
  padding: 4px 4px;
  color: #2C2C2C;
}
.header-button {
  font-family: 'Inter';
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  border-radius: 4px;
}
.header-button.danger {
  border: none;
  background: #F8E8E8;
  color: #791919;
}
</style>