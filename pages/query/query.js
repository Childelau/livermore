Page({
  data:{
    value:''
  },
  onLoad:function(){
    




  },
  onblur:function(e){
    this.setData({
      value:e.detail.value
    })
  },
  search:function(){
    var val = this.data.value
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('search_list').where({
      
    }).get({

    })


  }
})