let ajaxTimes=0;//发送异步代码的次数
export const  request=(params)=>{
    ajaxTimes++;
    //设置加载中样式
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"

    return new Promise((resolve,reject)=>{
        //定义公共url
        wx.request({
           ...params,
           url:baseUrl+params.url,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    wx.hideLoading();//关闭加载中样式
                }
                
            }
        })
    })
}