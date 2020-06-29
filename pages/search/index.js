// pages/search/index.js
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inpValue:""
  },
  Timeid:-1,
  //输入框值改变事件
  handleInput(e){
    //获取输入框的值
    const {value}=e.detail
    //检查合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      return
    }
    this.setData({
      isFocus:true
    })
    //发送请求获取数据
    clearTimeout(this.Timeid)
    this.Timeid=setTimeout(()=>{
      this.qsearch(value)
    },1000)
    
  },
  async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}})
    // console.log(res)
    this.setData({
      goods:res,
    })
  },
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})