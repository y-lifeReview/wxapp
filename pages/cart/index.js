// pages/cart/index.js
import {
  getSetting,
  chooseAddress,
  openSetting
} from "../../utils/asyncWX.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data:{
    address:{},
    cart:[]
  },
  onShow(){
    const address=wx.getStorageSync("address");
    //获取缓存中商品
    const cart=wx.getStorageSync("cart");
    this.setData({
      address,
      cart
    })
  },
  //收获地址
  async handleChooseAddress() {
    // console.log("地址")
    //获取用户地址权限状态
    try {

      //获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"]
      //判断权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
      // console.log(res2)
      //存入到缓存
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error)
    }
  },
})