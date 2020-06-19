// pages/category/index.js
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧数据
    leftMenuList:[],
    //右侧数据
    rightContent:[],
    //当前选中左侧的菜单
    currentIndex:0,
    //右侧滚动条距离顶部的位置
    scroolTop:0
  },
  //获得接口数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    0 web中的本地存储和小程序中的本地存储的区别
      1 写代码的方式不一样
      web : localStorage.setItem("key","value") localStorage.getItem("key")
      小程序中: wx.setStorageSync("key","value") wx.getStorageSync("key")
      2 存的时候有没有做类型转换
      web: 不管存入什么类型的数据 都会先调用toString()把数据变成字符串 再存入
      小程序：不会类型转换 存什么类型数据 就获取什么类型数据

      为分类页面设置缓存
      1 先判断本地存储中有没有旧的数据{time:Date.now(),data:[...]}
      2 没有旧数据 直接发送新请求
      3 有旧数据 同时旧的数据也没有过期 就使用本地存储的旧数据即可
    */
   //获取本地的数据
   const Cates=wx.getStorageSync("cates");
   //判断 是否存在本地数据
   if(!Cates){
     //没有则重新发送请求获取数据
     this.getCates()
   }else{
     //有本地数据 判断是否过期 设过期时间为5分钟
     if(Date.now()-Cates.time>1000*300){
       //过期 重新发送请求
       this.getCates();
     }else{
      //  console.log("旧数据")
       //没有过期 使用本地数据渲染
       this.Cates=Cates.data;
       //左侧数据
       let leftMenuList=this.Cates.map(v=>v.cat_name);
       //构造右侧数据
       let rightContent=this.Cates[0].children;
       
       this.setData({
         leftMenuList,
         rightContent
       })
     }
   }

  },
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then((res)=>{
    //   //获得接口数据
    //   this.Cates=res.data.message;
    //   //将数据存入本地
    //   wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
    //   //构造左侧数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   //构造右侧数据
    //   let rightContent=this.Cates[0].children;
      
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    // 1 使用es7的 async await语法
    const res=await request({url:"/categories"});
    this.Cates=res;
      //将数据存入本地
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
      //构造左侧数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      //构造右侧数据
      let rightContent=this.Cates[0].children;
      
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  //左侧菜单的点击事件
  handleItemTap(e){
    /*
    1 获取被点击的菜单的索引
    2 给data中的currentIndex赋值
    3 根据不同的索引渲染右侧商品内容 */
    const {index}=e.currentTarget.dataset;//获取当前点击事件的索引

    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //设置右侧滚动条在左侧切换时回到顶部
      scroolTop:0
    })
  }

  
})