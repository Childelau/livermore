Page({
  onLoad:function(){
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('test').get({
        success:function(res){
            console.log(res)
            console.log(res.data)
        }
    })


    
  }






























})

