// pages/cart/index.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWX.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0

  },
  onShow() {
    const address = wx.getStorageSync("address");
    //获取缓存中商品
    let cart = wx.getStorageSync("cart") || [];
    //过滤后的商品数据
    cart = cart.filter(v => v.checked);
    this.setData({
      address
    })
    //重新计算价格 数量 全选
    //总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {

      totalPrice += v.num * v.goods_price;
      totalNum += v.num;

    })

    //重新将数据放回缓存和购物车数组
    this.setData({
      cart,

      totalPrice,
      totalNum,
      address
    })

  },
  //点击支付
  handleOrderPay(){
    //1 判断缓存中是否有token值
    const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    console.log('已经存在')
  }


})