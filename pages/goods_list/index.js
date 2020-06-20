// pages/goodsList/index.js
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
      value:"综合",
      isActive:true
    },
    {
      id:1,
      value:"销量",
      isActive:false
    },{
      id:2,
      value:"价格",
      isActive:false
    }],
    goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList()
  },
  //获取商品列表
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    //获取总条数
    // console.log(res)
    const total=res.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    // console.log(this.totalPages)
    this.setData({
      //拼接
      goodsList:[...this.data.goodsList,...res.goods]
    })
    //关闭加载动画
    wx.stopPullDownRefresh()
  },
  //标题点击事件 从子组件传递
  handleTabsItemChange(e){
    //获取被点击的标题索引
    const {index}=e.detail;
    //修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>{
      i===index?v.isActive=true:v.isActive=false
    })
    //赋值到tabs
    this.setData({
      tabs
    })
  },
  //页面上滑滚动条触底事件
  /*上滑页面 滚动条触底 加载下一页数据
    1找到滚动条触底事件 
    2判断是否还有下一页数据
      1获取到总页数 只有总条数
      总页数=Math.ceil(总条数/页容量pagesize)  
      2获取当前页码pagenum
      3判断当前页码是否大于等于总页数
    3加入没有下页数据弹出提示
    4假如有下页数据加载下一页数据
      1当前页码++
      2重新发送请求
      3数据请求回来要对data中的数组进行拼接 而不是直接替换
  */
  onReachBottom(){
    // console.log("页面触底")
    if(this.QueryParams.pagenum>=this.totalPages){
      // console.log('没有下一页数据')
      wx.showToast({
        title: '没有更多了哟！',
      });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },
  /**
   下拉刷新页面
    1触发下拉刷新事件 需要在json文件中配置
      找到触发下拉刷新事件 onPullDownRefresh
    2重置数据 数组
    3重置页码
    4数据回来后关闭加载动画 wx-stopPullDownRefresh
   */
  onPullDownRefresh(){
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1;
    //发送请求
    this.getGoodsList()
  }



  
})