<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities">
          <div class="city" @click="cityClick(city)">
            {{ city.cityName }}
          </div>
        </template>
      </div>

      <template v-for="(item, index) in groupData.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <van-cell :title="city.cityName" v-for="(city, cIndex) in item.cities" @click="cityClick(city)"/>
      </template>
    </van-index-bar>
    <!-- <template v-for="(item, index) in groupData.cities" :key="index">
      <div class="group-item">
        <h2 class="title">标题：{{ item.group }}</h2>
        <div class="list">
          <template v-for="(city, cIndex) in item.cities" :key="cIndex">
            <div class="city">{{ city.cityName }}</div>
          </template>
        </div>
      </div>
    </template> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
// 定义props
const props = defineProps({
  groupData: {
    type: Object,
    default: {}
  }
})

// 动态索引
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift("热门")
  return list
})

const router = useRouter()
const cityStore = useCityStore()
// 获取热门城市
const cityClick = (city) => {
  console.log(city);
  cityStore.currentCity = city
  // 返回上一层
  router.back()
}

</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 30px;

  .city {
    width: 70px;
    margin: 4px 0;
    height: 28px;
    line-height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    background-color: #fff4ec;
  }
}
</style>