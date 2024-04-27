<template>
  <ip-search v-model="tableSearch"
             placeholder="Поиск по таблице"
             map-query
             :debounce=2000
  />
  <div style="display: none;" data-comment="Fixing el-table refreshing bug">{{ sortedList }}</div>
  <el-table
    :data="sortedList"
    style="width: 100%;"
    row-class-name="ip-table__row"
    border
    class="custom-border"
    @selection-change="onSelectRow"
  >
    <el-table-column type="selection" width="48"/>

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
        <div class="custom-row space-between"
             @mouseenter="hoveredIp = scope.row.ip"
             @mouseleave="hoveredIp = null"
        >
          <div>
            <flag-image :country="scope.row.country" />
            {{ scope.row.ip }}
          </div>
          <cell-button action="copy"
                       v-show="isHovered(scope.row.ip)"
                       v-clipboard="scope.row.ip"
          />
          <cell-button action="delete"
                       v-show="isSelected(scope.row.ip)"
                       @click="deleteRow(scope.row.ip)"/>
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

    <el-table-column type="default"  width="44" class-name="no-paddings">
      <template #default="scope">
        <div class="custom-row">
          <state-button :state="'success'">{{ scope.row.ip }}</state-button>
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
import {ref, watch} from "vue";
import CellButton from "@/components/buttons/CellButton.vue";
import IpSearch from "@/components/IpSearch.vue";

const store = useIpStore()
const { sortedList } = storeToRefs(store);

const tableSearch = ref('');
const hoveredIp = ref();

const selectedRows = ref<IpInfo[]>([])
const onSelectRow = (rows?: IpInfo[]) => {
  selectedRows.value = rows as IpInfo[];
}

const deleteRow = (ip: string) => {
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
.custom-border {
  border: 1px solid #cccccc;
  border-radius: 8px;
}
.custom-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.custom-row.space-between {
  display: flex;
  justify-content: space-between;
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
td.el-table__cell.hoverable:hover,
td.el-table__cell.hoverable:hover .cell
{
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
.no-paddings,
.el-table__cell.no-paddings,
.no-paddings .cell
{
  padding: 0;
  margin: 0;
}
</style>