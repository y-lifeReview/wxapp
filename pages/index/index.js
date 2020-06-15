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
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    })
    .then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  //获取分类
  getCatesList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    })
    .then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  },
  //获取楼层
  getFloorList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
    })
    .then(result => {
      this.setData({
        floorList: result.data.message
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