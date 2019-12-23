Page({
  data:{
    checkBoxClass: 'hide',
    inputValue:''
  },
  onLoad:function(){
    var that = this
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('home_list').get({
        success:function(res){
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
  },
  
  test:function(e){
    var msg_url = '../join/join'
    wx.navigateTo({
      url: msg_url,

    })
  },
  listSearch:function(e){
    var that = this
    console.log(e)
    var val = '"'+e.detail.value+'"'
    wx.cloud.init
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('home_list').where({
      code: val
    }).get({
      success:function(res){
        var data = res.data
        if(!data.length){
          wx.showModal({
            title: '未检索到该与该股票相关信息',
          })
        }else{
          // 显示检索结果
          console.log('pass')
          that.setData({
            checkArray: data,
            listBoxClass:'hide',
            checkBoxClass:'show',
          })

        }

      }
    })
  },
  backFunc:function(){
    this.setData({
      checkBoxClass:'hide',
      listBoxClass:'show',
      value:''
    })
  }





























})
