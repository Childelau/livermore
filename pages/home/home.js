Page({

  onLoad:function(){
    var that = this
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('home_list').get({
        success:function(res){
          // res.data.code = res.data.code.slice(1)
          console.log(res.data)


          that.setData({
            Array:res.data
        })

      }
    })



  },
  join:function(e){
    var msg = e.currentTarget.id;
    var msg_url = '../join/join?key='+msg
    wx.navigateTo({
      url:msg_url,
     

    })
  }





























})
