<template>
  <div class="content">
    <h2 class="title">热门推荐</h2>
    <div class="list">
      <template v-for="(item, index) in homeList" :key="item.data.houseId">
        <HouseItemV9 v-if="item.discoveryContentType === 9" :item-data="item.data"/>
        <HouseItemV3 v-else-if="item.discoveryContentType === 3" :item-data="item.data"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import HouseItemV9 from '@/components/house-item-v9/index.vue'
import HouseItemV3 from '@/components/house-item-v3/index.vue'
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { homeList } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;
  .title {
    font-size: 22px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>