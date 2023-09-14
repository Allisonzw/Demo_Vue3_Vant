import useCityStore from "@/stores/modules/city";

const cityStore = useCityStore()
export function getCurrentPosition() {
  AMap.plugin('AMap.CitySearch', function () {
    var citySearch = new AMap.CitySearch()
    citySearch.getLocalCity(function (status, result) {
      console.log(result);
      if (status === 'complete' && result.info === 'OK') {
        // 查询成功，result即为当前所在城市信息
        cityStore.currentCity.cityName = result.city
      }
    })
  })
}
