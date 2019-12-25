//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    


  },
  onShow: function(){
    wx.cloud.init()
    var that = this
    //检测是否已经登陆
    wx.checkSession({
      success() {
        var openId = null
       
        wx.cloud.callFunction({
          name: 'add'
        }).then(res => {
          openId = res.result.OPENID
          console.log(openId)
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
                  that.globalData.nickname = res.userInfo.nickName
                  that.globalData.photoUrl = res.userInfo.avatarUrl
                  that.globalData.openId = openId
               
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
        //   url: '/pages/person/person',
        // })
      

        console.log('登录失败')
      }
    })
  },
  globalData: {
    isShow:'show',
    nickname:'未登陆请先登录',
    photoUrl: '../../image/touxiang.png',
    openId:''
  }
})