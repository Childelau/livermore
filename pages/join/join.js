var app = getApp()

Page({
  data:{
    code:'',
    name:'',
    tCode:'',
    value1:'',
    value2:''
  },
  onLoad:function(){
    var that = this
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1]
    console.log(currentPage.options.key)
    var title = currentPage.options.key
    // 建立云连接，筛选数据
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('home_list').where({
      code: title
    }).get({
      success:function(res){
        var tCode = res.data[0].code
        var code = tCode.slice(1, 7)
        that.setData({
          name:res.data[0].name,
          code:code,
          tCode:tCode
        })
      }
    })


  },
  onblur1:function(e){
    this.setData({
      value1: e.detail.value1
    })
  },
  onblur2:function(e){
    this.setData({
      value2:e.detail.value2
    })
  },
  ref:function(){
    wx.cloud.init()
    const db = wx.cloud.database()
    var openId = app.global.openId
    //验证输入
    if(value1=''){
      wx.showModal({
        title: '请输入姓名',
        showCancel:false
      })
      return false
    }
    var telReg = /^0?1[3|4|5|8][0-9]\d{8}$/
    if(!telReg.test(value2)){
      wx.showModal({
        title: '请输入正确的手机号码',
        showCancel: false
      })
      return false
    }
    //上传信息
    





  }














  // ===============
})