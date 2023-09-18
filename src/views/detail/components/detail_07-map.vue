<template>
  <div class="map">
    <detail-section title="位置周边" more-text="查看更多周边">
      <!-- <div class="gaode">
        <img :src="link" alt="" class="showMapContainer">
      </div> -->
      <div id="container"></div>
    </detail-section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import DetailSection from "@/components/detail-section/index.vue"
import AMapLoader from '@amap/amap-jsapi-loader';
import { ref } from 'vue';

const props = defineProps({
  position: {
    type: Object,
    default: () => {}
  }
})

const link = ref('')
let map = null
onMounted(() => {
  // link.value = `https://restapi.amap.com/v3/staticmap?zoom=17&scale=2&size=600*300&scale=2&location=${props.position.longitude},${props.position.latitude}&markers=mid,,A:${props.position.longitude},${props.position.latitude}&key=2cd1bc695de9e1ad13c012f89679c698`

  AMapLoader.load({
    key: "5b0916dd4e89809cec07978c8c3d99a2", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 15, // 初始化地图级别
        center: [props.position.longitude, props.position.latitude], // 初始化地图中心点位置
      });
      const marker = new AMap.Marker({
        position: new AMap.LngLat(props.position.longitude, props.position.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '位置'
      });
      map.add(marker)
    })
    .catch((e) => {
      console.log(e);
    });

})

onUnmounted(() => {
  map?.destroy();
});
</script>

<style scoped>
.showMapContainer {
  width: 100%;
  height: 175px;
}
#container{
  padding:0px;
  margin: 0px;
  width: 100%;
  height: 300px;
}
</style>