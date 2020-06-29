//Page Object
import {
  request
} from "../../request/index"
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航条数组
    catesList:[],
    //楼层数据
    floorList:[],
  },
  //options(Object)
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    this.getSwiperList();
    this.getCatesList()
    this.getFloorList()
  },
  //获取轮播图
  getSwiperList(){
    request({
      url: '/home/swiperdata'
    })
    .then(result => {
      // console.log(result)
    for(let i=0;i<result.length;i++){
      result[i].navigator_url=result[i].navigator_url.replace(/main/g,'index')
    }
      this.setData({
        swiperList: result
      })
    })
  },
  //获取分类
  getCatesList(){
    request({
      url: '/home/catitems'
    })
    .then(result => {
        result[0].navigator_url=result[0].navigator_url.replace(/main/g,'index')
        // console.log(result)
      this.setData({
        catesList: result
      })
    })
  },
  //获取楼层
  getFloorList(){
    request({
      url: '/home/floordata'
    })
    .then(result => {
      for(let i=0;i<result.length;i++){
        for(let j=0;j<result[i].product_list.length;j++){
          result[i].product_list[j].navigator_url=result[i].product_list[j].navigator_url.replace(/goods_list/,'goods_list/index')
        }
      }
      console.log(result)
      this.setData({
        floorList: result
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});