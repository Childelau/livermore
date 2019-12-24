var app = getApp()
Page({
  data:{
    nickname: '',
    photoUrl: '',
    isShow:''
  },
  onReady(){ 
    var that = this
    setTimeout(function(){
      console.log(app.globalData.photoUrl)
      that.setData({
        isShow: app.globalData.isShow,
        photoUrl: app.globalData.photoUrl,
        nickname : app.globalData.nickname
        
      })
    },1000)


  },
  login:function(){
    var openId = null;
    wx.cloud.callFunction({
      name:'add'
    }).then(res=>{
      console.log(res.result)
      openId = res.result.OPENID
      console.log(openId)
    })


    var that = this
    var js_code = ''
    wx.login({
      success(res){
        console.log(res.code)
        js_code = res.code
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.setData({
                nickname: res.userInfo.nickName,
                photoUrl: res.userInfo.avatarUrl,
                isShow: 'hide'
              })

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }



})