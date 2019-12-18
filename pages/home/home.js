Page({
  // data: {
  //   Array: null
  // },
 
  onLoad:function(){
    var that = this
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('homeList').get({
        success:function(res){
            console.log(res)
            console.log(res.data)
            that.setData({
              Array:res.data
            }) 
 
        }
    })

  
    
  }





























})

