// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  },

  onShow(){
   const userInfo= wx.getStorageSync("userinfo");
   this.setData({
     userInfo
   })
  }
})