// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    // 被收藏的商品的数量
    collectNums:0
  },

  onShow(){
   const userInfo= wx.getStorageSync("userinfo");
   const collect=wx.getStorageSync("collect")||[];
   let collectNums=collect.length;
   this.setData({
     userInfo,
     collectNums
   })
  }
})