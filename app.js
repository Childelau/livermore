//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //++++++
    // wx.removeStorage({
    //   key: 'success',
    //   success(res) {
    //     console.log(res)
    //   }
    // })


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

          console.log('登陆成功')
          that.globalData.isShow = 'hide'
          that.globalData.isScrollShow = 'show'
          that.globalData.openId = openId
          wx.setStorage({
            key: 'success',
            data: 'y',
          })
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    
                    that.globalData.nickname = res.userInfo.nickName
                    that.globalData.photoUrl = res.userInfo.avatarUrl
                    if (that.userInfoReadyCallback) {
                      that.userInfoReadyCallback(res)
                    }
                    //此时根据openid在userInfo表中查出用户所关注的信息
                    wx.cloud.init()
                    const db = wx.cloud.database()
                    db.collection('userInfo').where({
                      openId: openId
                    }).get({
                      success: function (res) {
                        console.log(res.data)
                        var res = res.data.map(function (value, index, array) {
                          return value.new_id
                        })

                        wx.cloud.init()
                        const db = wx.cloud.database()
                        const _ = db.command
                        db.collection('search_list').where({
                          _id: _.or(res)
                        }).get({
                          success: function (res) {
                            console.log(res.data)
                            if (res.data.length == 0){
                              res.data = 'x'
                            }
                            that.globalData.myList = res.data
                          }
                        })

                      }
                    })


                  }
                })
              }
            }
          })
        })
      },
      fail() {
        wx.setStorage({
          key: 'success',
          data: 'n',
        })
        console.log('登录失败')
        wx.switchTab({
          url: '/pages/person/person',
        })
      }
    })
  },
  globalData: {
    isShow:'show',
    nickname:'未登陆请先登录',
    photoUrl: '../../image/touxiang.png',
    openId:'',
    accessToken:'',
    myList:'',
    isScrollShow:'hide',
  }
})