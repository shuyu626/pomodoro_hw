<template>
  <v-container class="">
    <v-row class="text-center my-8">
      <v-col cols="12" style="color: #212121;" >
        <h1 style="font-size: 2.5rem;">目前事項 : {{ currentText }}</h1>
        <h1 class="my-5">剩餘時間 </h1>
        <div style="font-size: 5em;font-family:Comic Sans MS;width: 30%;border-radius: 15px;margin: auto;border: 8px solid black" class="bg-grey-darken-3 opacity-60 my-5">{{ currentTime }}</div>
      </v-col>
      <v-col cols="12" >
        <v-btn
          icon="mdi-play"
          @click="startTimer"
          :disabled="status === STATUS.COUNTING || (currentItem.length === 0 && items.length === 0)"
          class="bg-grey-darken-2 mx-2" variant="elevated"
          style="width: 60px;height: 60px;font-size: 2rem;border: 5px solid #727372"
        ></v-btn>
        <v-btn
          icon="mdi-pause"
          :disabled="status !== STATUS.COUNTING"
          @click="pauseTimer"
          class="bg-grey-darken-2 mx-2 " variant="elevated"
          style="width: 60px;height: 60px;font-size: 2rem;border: 5px solid #727372"
        ></v-btn>
        <v-btn
          icon="mdi-skip-next"
          :disabled="currentItem.length === 0"
          @click="finishTimer"
          class="bg-grey-darken-2 mx-2 " variant="elevated"
          style="width: 60px;height: 60px;font-size: 2rem;border: 5px solid #727372"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useWebNotification } from '@vueuse/core'

definePage({
  meta: {
    title: '番茄鐘'
  }
})

const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2
}
const status = ref(STATUS.STOP)

const list = useListStore()
const { currentItem, items, timeleft } = storeToRefs(list)
const { setCurrentItem, countdown, setFinishItem } = list

const settings = useSettingsStore()
const { selectedAlarmFile } = storeToRefs(settings)

let timer = 0
const startTimer = () => {
  if (status.value === STATUS.STOP && items.value.length > 0) {
    setCurrentItem()
  }

  status.value = STATUS.COUNTING

  timer = setInterval(() => {
    countdown()
    if (timeleft.value === 0) {
      finishTimer()
    }
  }, 1000)
}

const pauseTimer = () => {
  status.value = STATUS.PAUSE
  clearInterval(timer)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = STATUS.STOP

  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()

  // 推播通知
  const { show, isSupported } = useWebNotification({
    //  設定網頁通知的標題為 '事項完成'
    title: '事項完成',
    // 網頁通知的內容(目前倒數的值)
    body: currentItem.value,
    // 設定網頁通知的圖示
    icon: new URL('@/assets/tomato.png', import.meta.url).href
  })
  // 檢查瀏覽器是否支援網頁通知功能
  if (isSupported.value) {
    // 如果瀏覽器支援網頁通知，則顯示通知
    // show() 用來觸發顯示網頁通知的動作
    show()
  }

  setFinishItem()

  if (items.value.length > 0) {
    startTimer()
  }
}

const currentText = computed(() => {
  if (currentItem.value.length > 0) {
    return currentItem.value
  } else if (items.value.length > 0) {
    return '點擊開始'
  } else {
    return '無'
  }
})

const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>
