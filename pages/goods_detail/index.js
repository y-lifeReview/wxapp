// pages/goods_detail/index.js
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    //商品是否被收藏
    isCollect:false
  },
  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage=pages[pages.length-1]
    let options=currentPage.options;
    const {goods_id}=options
    this.getGoodsDetail(goods_id)
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}})
    this.GoodsInfo=goodsObj;
    //获取缓存中商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    //判断当前商品是否被收藏
    let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    console.log(isCollect)
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //部分iphone不支持.webp图片 替换成.jpg 确保后台有.jpg图片
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
      ,isCollect
    })
  },
  handelPreviewImage(e){
    //先构造要预览的图片数组
      const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
      const current=e.currentTarget.dataset.url
    wx.previewImage({
      current:current,
      urls: urls
    });
  },
  //点击加入购物车
  handleCartAdd(){
// console.log("加入")
    //获取缓存中的购物车数组
    let cart=wx.getStorageSync("cart")||[];
    //判断当前商品是否存在购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index===-1){
      //不存在 第一次添加
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo)
    }else{
      //已经存在购物车数据num++
      cart[index].num++;
    }
    //把购物车数据重新添加会缓存中
    wx.setStorageSync("cart", cart);
    //弹出提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  },
  // 点击收藏图标
  handleCollect(){
    let isCollect=false
    //获取缓存中的商品数组
    let collect=wx.getStorageSync("collect")||[];
    //判断该商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index!==-1){
      //已经收藏了 删除该商品
     
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true,
      });
    }else{
      collect.push(this.GoodsInfo)
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})