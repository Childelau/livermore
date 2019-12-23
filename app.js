//app.js
App({
  onLaunch: function () {




    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    


  },
  onShow: function(){
    var that = this
    //检测是否已经登陆
    var js_code = null
    wx.checkSession({
      success() {

        wx.login({
          success(res) {
            console.log(res.code)
            js_code = res.code
          }
        })


        console.log('登陆成功')
        that.globalData.isShow = 'hide'
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  console.log(res.userInfo)
                  that.globalData.nickname = res.userInfo.nickName
                  that.globalData.photoUrl = res.userInfo.avatarUrl
                  //
                  wx.request({
                    // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxcd981428b721e6d3&secret=c1cc21eeaaf44beea4dcf57df50267f1&' + js_code + '=JSCODE&grant_type=authorization_code',
                    // success(res){
                    //   console.log(res.data)
                    // }
                  })


                  //
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })
      },
      fail() {
        // wx.switchTab({
        //   url: '/pages/help/help',
        // })


        console.log(222)
      }
    })
  },
  globalData: {
    isShow:'show',
    nickname:'未登陆请先登录',
    photoUrl: '../../image/touxiang.png',
  }
})