<template >
  <v-app >
    <v-app-bar :elevation="8" class=" border-e-lg border-t-lg border-s-lg "  style="background-color:#FFA000;">
      <v-container class="d-flex align-center ">
        <v-app-bar-title class="font-weight-black text-h5 " style="color:#262626;">番茄鐘</v-app-bar-title>
        <v-btn class="mx-1" variant="outlined" prepend-icon="mdi-home" to="/">首頁</v-btn>
        <v-btn class="mx-1" variant="outlined" prepend-icon="mdi-format-list-bulleted" to="/list">事項</v-btn>
        <v-btn class="mx-1" variant="outlined" prepend-icon="mdi-cog" to="/settings">設定</v-btn>
      </v-container>
    </v-app-bar>
    <v-main class="border-lg" style="background-color:#FFE0B2;">
      <!-- Component = 目前路由應該顯示的元件 -->
      <router-view v-slot="{ Component }" >
        <!-- keep-alive 保持被包住的元件不被銷毀 -->
        <!-- 使用 include 指定只有 index 這個元件不被銷毀 -->
        <!--
          component 動態元件
          is = 要使用的元件
        -->
        <keep-alive include="index">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
