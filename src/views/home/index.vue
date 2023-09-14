<template>
  <div class="home">
    <van-nav-bar title="牛马旅途" />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <homeSearchBox :hot-suggests="homeStore.hotSuggests"/>
    <homeCategories />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>
    <homeContent />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import useHomeStore from '@/stores/modules/home';
import homeSearchBox from './components/home-search-box.vue';
import homeCategories from './components/home-categories.vue';
import homeContent from './components/home-content.vue'
import searchBar from '@/components/search-bar/index.vue'
import useScroll from '@/hooks/useScroll'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchGetHouseListData()

// 监听window创建的滚动
// 1、当我们离开页面，需要移除监听
// 2、如果别的页面也进行类似的监听，会编写重复代码
// const scrollListenerHandler = () => {
//   const clientHeight = document.documentElement.clientHeight // 视口高度
//   const scrollTop = document.documentElement.scrollTop // 已经滚动的距离
//   const scrollHeight = document.documentElement.scrollHeight // 可以滚动的距离
//   // console.log(clientHeight, scrollTop, scrollHeight);
//   if (clientHeight + scrollTop >= scrollHeight) {
//     homeStore.fetchGetHouseListData()
//   }
// }

// onMounted(() => {
//   window.addEventListener("scroll", scrollListenerHandler)
// })

// onUnmounted(() => {
//   window.removeEventListener('scroll', scrollListenerHandler)
// })

// useScroll(() => {
//   homeStore.fetchGetHouseListData()
// })

const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchGetHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 控制搜索框是否显示
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   console.log(newTop);
//   isShowSearchBar.value = newTop > 100
// })

const isShowSearchBar = computed(() => {
  return scrollTop.value > 350
})

</script>

<style lang="less" scoped>
.home {
  --van-nav-bar-title-text-color: #ff9854;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}

</style>