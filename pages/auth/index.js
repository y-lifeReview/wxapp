// pages/auth/index.js

import {
  login
} from "../../utils/asyncWX.js";
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  //获取用户信息
  async handleGetUserInfo(e){
    try {
      // console.log(e)
    const {encryptedData,rawData,iv,singnature}=e.detail;
    //获取小程序登录成功的code值
    const {code}=await login();
    const loginParmas={encryptedData,rawData,iv,singnature,code}
    //发送请求获取用户token
    const {token} = request({url:"/users/wxlogin",data:loginParmas,method:"post"})
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
    } catch (error) {
      console.log(error)
    }
  }
})