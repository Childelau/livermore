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
    var that = this
    var val = parseInt(this.data.value) 
    console.log(val)
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('search_list').where({
      idCode: val
    }).get({
      success:function(res){
        var res = res.data
        console.log(res)
        if(!res.length){
          wx.showModal({
            title: '未检索到该股票索赔进度',
            showCancel: false,
            complete:function(){
              that.setData({
                value:''
              })
            }
          })
        }else{
          that.setData({
            Array:res
          })
        }
      }
      
    })


  }
})