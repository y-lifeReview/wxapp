export const  request=(params)=>{
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"

    return new Promise((resolve,reject)=>{
        //定义公共url
        wx.request({
           ...params,
           url:baseUrl+params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}