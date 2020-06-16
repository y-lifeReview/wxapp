// pages/category/index.js
import {
  request
} from "../../request/index"
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
    currentIndex:0
  },
  //获得接口数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates()
  },
  getCates(){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    })
    .then((res)=>{
      //获得接口数据
      this.Cates=res.data.message;
      //构造左侧数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      //构造右侧数据
      let rightContent=this.Cates[0].children;
      
      this.setData({
        leftMenuList,
        rightContent
      })
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
      rightContent
    })
  }

  
})