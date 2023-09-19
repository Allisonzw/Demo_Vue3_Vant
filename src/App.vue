<template>
  <div class="app">
    <!-- name属性 -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component" />
      </keep-alive>
    </router-view>
    <tab-bar v-show="!route.meta.hideTabBar"/>
    <!-- <tab-bar /> -->
    <loading />
  </div>
</template>

<script setup>
import TabBar from "@/components/tab-bar/index.vue"
import Loading from '@/components/loading/index.vue'
import { useRoute } from "vue-router";

const route = useRoute()
</script>

<style scoped>

</style>