<template>
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="城市/区域/位置"
        shape="round"
        @cancel="cancelClick"
      />
      <van-tabs v-model:active="active" color="#ff9854" @click-tab="onClickTab">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <city-group-item v-show="active === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useCityStore from '@/stores/modules/city'
import { useRouter } from 'vue-router'

import cityGroupItem from './components/city-group-item.vue'

const router = useRouter()

const searchValue = ref('')
const cancelClick = () => {
  router.back()
}

const active = ref(0)
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 获取选中标签后的数据
const currentGroup = computed(() => allCities.value[active.value])
const onClickTab = (item) => {
  
}
</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>