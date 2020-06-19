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