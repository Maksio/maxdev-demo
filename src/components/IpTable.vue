<template>
  <ip-search v-model="tableSearch"
             placeholder="Поиск по таблице..."
             map-query
             :debounce=2000
  />
  <div style="display: none;" data-comment="Fixing el-table refreshing bug">{{ sortedList }}</div>
  <el-table
      :data="sortedList"
      style="width: 100%; height: 336px; max-height: 336px;"
      cell-class-name="ip-table__cell"
      row-class-name="ip-table__row"
      border
      class="custom-border"
      @selection-change="onSelectRow"
  >
    <el-table-column width="48">
      <template #header>
        <div class="custom-row checkbox">
          <custom-check-box :checked="allChecked" @click="toggleAll"/>
        </div>
      </template>
      <template #default="scope">
        <div class="custom-row checkbox">
          <custom-check-box :checked="isSelected(scope.row.ip)" @click="toggleRow(scope.row)"/>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="ip" label="IP" class-name="hoverable">
      <template #header="scope">
        <div class="custom-row header">
          {{ scope.column.label }}
          <el-button size="small" type="danger"
                     plain
                     class="header-button danger"
                     v-show="selectedRows.length > 1"
                     @click="deleteSelectedRows"
          >
            Удалить выбранные
          </el-button>
        </div>
      </template>

      <template #default="scope">
        <div class="custom-row space-between with-buttons"
             @mouseenter="hoveredIp = scope.row.ip"
             @mouseleave="hoveredIp = null"
        >
          <div class="flex center clickable" @click="$router.push({ name: 'info', query: { ip: scope.row.ip}})">
            <flag-image :country="scope.row.country"/>
            {{ scope.row.ip }}
          </div>
          <cell-button action="copy"
                       v-show="isHovered(scope.row.ip)"
                       v-clipboard="scope.row.ip"
          />
          <cell-button action="delete"
                       v-show="isSelected(scope.row.ip) && selectedRows.length === 1"
                       @click="deleteRow(scope.row.ip)"/>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="country" label="Country">
      <template #header="scope">
        <div class="custom-row header">
          {{ scope.column.label }}
          <sort-button field="country"/>
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

    <el-table-column type="default" width="48" class-name="no-paddings">
      <template #default="scope">
        <div class="custom-row flex center justify-center">
          <state-button :state="scope.row.state">{{ scope.row.ip }}</state-button>
        </div>
      </template>
    </el-table-column>

  </el-table>
</template>

<script setup lang="ts">
import {IpInfo, useIpStore} from "@/store";
import {storeToRefs} from "pinia";
import FlagImage from "@/components/FlagImage.vue";
import "@fontsource/inter";
import StateButton from "@/components/buttons/StateButton.vue";
import SortButton from "@/components/buttons/SortButton.vue";
import {computed, ref, watch} from "vue";
import CellButton from "@/components/buttons/CellButton.vue";
import IpSearch from "@/components/IpSearch.vue";
import CustomCheckBox from "@/components/CustomCheckBox.vue";

const store = useIpStore()
const {sortedList} = storeToRefs(store);

const tableSearch = ref('');
const hoveredIp = ref();

const selectedRows = ref<IpInfo[]>([])
const onSelectRow = (rows?: IpInfo[]) => {
  selectedRows.value = rows as IpInfo[];
}

const deleteRow = (ip: string) => {
  if (isSelected(ip)) {
    const found = selectedRows.value.filter((row: IpInfo) => row.ip === ip).pop();
    if (found) {
      const index = selectedRows.value.indexOf(found);
      selectedRows.value.splice(index, 1);
    }
  }
  store.deleteIp(ip)
}

const deleteSelectedRows = () => {
  selectedRows.value.map((row: IpInfo) => row.ip).forEach((ip: string) => deleteRow(ip))

  selectedRows.value = [];
}

const isSelected = (ip: string) => selectedRows.value.filter((row: IpInfo) => row.ip === ip).length > 0;

const isHovered = (ip: string) => {
  return hoveredIp.value === ip && !isSelected(ip);
}

const allChecked = computed((): boolean => sortedList.value.length > 0
    && selectedRows.value.length >= sortedList.value.length)

const toggleAll = () => {
  if (!allChecked.value) {
    selectedRows.value = sortedList.value;
  } else {
    selectedRows.value = [];
  }
}

const toggleRow = (row: IpInfo) => {
  const index = selectedRows.value.indexOf(row);
  if (index >= 0) {
    selectedRows.value.splice(index, 1)
  } else {
    selectedRows.value.push(row)
  }
}

watch(tableSearch, () => {
  store.filter(tableSearch.value)
})
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

.clickable {
  cursor: pointer;
}
.flex {
  display: flex;
}

.flex.center {
  align-items: center;
  gap: 8px;
}

.flex.justify-center {
  justify-content: center;
}

.custom-border1 {
  border: 1px solid #cccccc;
  border-radius: 8px;
}
.el-table--fit .el-table--border {
  border: 1px solid red;
  border-radius: 8px;
}

.custom-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-row .cell {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 16px;
  left: 16px;
}

.custom-row.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-row.with-buttons {
  height: 48px;
  display: flex;
  align-items: center;
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

.custom-row.checkbox {
  transform: translateX(-4px);
}

.el-table td .cell,
.el-table th .cell {
  padding: 0 16px;
}

.el-table .el-table__cell.ip-table__cell {
  padding: 0;
}

.el-table .el-table__cell.ip-table__cell.hoverable:hover {
  background: #EBEEF4;
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

.el-table .el-table__cell.ip-table__cell.no-paddings,
.el-table .el-table__cell.ip-table__cell.no-paddings .cell {
  padding: 0;
  margin: 0;
}

.el-table input[type=checkbox] {
  transform: scale(1.715);
}
</style>
