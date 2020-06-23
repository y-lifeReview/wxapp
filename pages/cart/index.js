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
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0

  },
  onShow(){
    const address=wx.getStorageSync("address");
    //获取缓存中商品
    const cart=wx.getStorageSync("cart")||[];
    this.setData({
      address
    })
    this.setCart(cart)
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
  //商品的选中
  handleItemChange(e){
    //获取被修改商品的id;
    const goods_id=e.currentTarget.dataset.id;
    // console.log(goods_id)
    //获取购物车数组
    let {cart}=this.data;
    //找到被修改的商品对象
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    //选中状态取反
    cart[index].checked=!cart[index].checked;
   
    this.setCart(cart)
  },
  //封装方法 设置 购物车状态同时计算全选 价格数量
  setCart(cart){
    //重新计算价格 数量 全选
    let allChecked=true;
    //总价格 总数量
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    })
    //数组为空时
    allChecked=cart.length!=0?allChecked:false;
     //重新将数据放回缓存和购物车数组
     this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },
  //商品的全选功能
  handleItemAllCheck(){
    //获取data中的数据
    let {cart,allChecked}=this.data;
    //全选取反
    allChecked=!allChecked;
    //修改商品选中状态与全选状态一致
    cart.forEach(v=>v.checked=allChecked);
    //将数据重新放回data和缓存中
    this.setCart(cart);
  },
  //商品数量编辑
 async handleItemNumEdit(e){
    //获取传递过来的参数
    const {operation,id}=e.currentTarget.dataset;
    // console.log(operation,id)
    //获取购物车数组
    const {cart}=this.data;
    //找到修改的商品
    let index=cart.findIndex(v=>v.goods_id===id);
    //判断是否执行删除
    if(cart[index].num===1&&operation===-1){
      const result=await showModal({content:"是否删除该商品？"})
      if(result.confirm){
        //点击确认删除
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      //修改商品数量
    cart[index].num+=operation;
    this.setCart(cart);
    }
    
  },
  //点击结算功能
  async handlePay(){
    //判断是否有收货地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      await showToast({title:"你还没有选择收货地址！"});
      return;
    };
    //判断是否选购了商品
    if(totalNum===0){
      await showToast({title:"你还没有选购商品！"});
      return;
    }
    //跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    });
    
  }
})