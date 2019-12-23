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
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              that.setData({
                nickname: res.userInfo.nickName,
                photoUrl: res.userInfo.avatarUrl,
                isShow: 'hide'
              })
              // 可以将 res 发送给后台解码出 unionId
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxcd981428b721e6d3&secret=c1cc21eeaaf44beea4dcf57df50267f1&'+js_code+'=JSCODE&grant_type=authorization_code',
                success(res){
                  console.log(res.data)
                }
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