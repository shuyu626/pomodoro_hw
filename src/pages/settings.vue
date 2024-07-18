<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center mt-16 " style="color:#262626;">鈴聲設定</h1>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-table style="border: 30px solid #F5F5F5;">
          <thead class="bg-secondary">
            <tr>
              <th style="color:#262626;" class="text-h5 font-weight-bold text-center">名稱</th>
              <th style="color:#262626;" class="text-h5 font-weight-bold text-center">試聽</th>
              <th style="color:#262626;" class="text-h5 font-weight-bold text-center">選擇</th>
            </tr>
          </thead>
          <tbody class="bg-light-blue-lighten-5 text-center">
            <tr v-for="alarm in alarms" :key="alarm.id">
              <td style="color:#262626;" class="font-weight-bold text-h6">{{ alarm.name }}</td>
              <td >
                <audio :src="alarm.file"  style="height: 40px;margin: 5px auto;border: 4px solid #aeb0af;border-radius: 20px;" controls></audio>
              </td>
              <td>
                <v-radio-group v-model="selectedAlarm">
                  <v-radio :value="alarm.id" ></v-radio>
                </v-radio-group>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

definePage({
  meta: {
    title: '番茄鐘 | 設定'
  }
})

const settings = useSettingsStore()
const { alarms, selectedAlarm } = storeToRefs(settings)
</script>

<style scoped lang="scss">
:deep(.v-input__details) {
  display: none;
}
:deep(.v-selection-control){
  display: block;
}
audio::-webkit-media-controls-panel {
    background-color: #666968; /* 背景顏色 */
    color: #333; /* 文字顏色 */
}
</style>
