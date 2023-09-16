
<template>
  <div class="detail top-page">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart">
      <detail-swiper :swipe-data="mainPart.topModule.housePicture.housePics"/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from '@/services/index.js'
import DetailSwiper from './components/detail-swipe.vue'
import { showDialog } from 'vant';

const route = useRoute()
const router = useRouter()

const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(route.params.id).then(res => {
  if(!res) {
    showDialog({
      message: '该内容暂无数据',
    }).then(() => {
      router.back()
    });
  } else {
    detailInfos.value = res.data
  }
})

const onClickLeft = () => {
  router.back()
}
</script>

<style scoped>

</style>