var app = getApp()
Page({
  data:{
    value:'',
    claaName:'',

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
    var val = '!' + this.data.value
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
  },
  addList:function(e){
    var _openid = app.globalData.openId
    var new_id = e.currentTarget.id
    console.log(_openid,new_id)
    //判断是否重复添加
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('userInfo').where({
      openId: _openid,
      new_id: new_id
    }).get({
      success:function(res){
        console.log(res)
        var res = res.data
        
        if(res.length==0){
          //core code
          wx.cloud.callFunction({
            name: 'access',
            data: {
              openId: _openid,
              new_id: new_id
            }
          })
        }else{
          wx.showModal({
            title: '已经存在请勿重复添加',
            showCancel: false
          })
        }
      }

      
    })


   
    

  }
})