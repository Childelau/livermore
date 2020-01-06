var app = getApp()
Page({
  data:{
    nickname: '',
    photoUrl: '',
    isShow:'',
    myList:'',
    isScrollShow:'',
  },
  onLoad(){ 
    var that = this
    //判断app.js是否登陆成功
    wx.getStorage({
      key: 'success',
      success: function(res) {
        if(res.data == 'y'){
          var timer, isShow, photoUrl, myList, isScrollShow,nickname = null
          function test(){
            nickname = app.globalData.nickname
            isShow = app.globalData.isShow
            photoUrl = app.globalData.photoUrl
            myList = app.globalData.myList
            isScrollShow = app.globalData.isScrollShow
            console.log(isShow, photoUrl, myList, isScrollShow)
            if (myList!=''){
              clear()
            }
         
          }
          timer = setInterval(test,800)
          timer()
          function clear(){
            clearInterval(timer)
            console.log(isShow)
            if(myList=='x'){
              myList = ''
            }
            that.setData({
              isShow: isShow,
              photoUrl: photoUrl,
              nickname: nickname,
              myList: myList,
              isScrollShow: isScrollShow
            })

          }
        }else{
          //===================================================
        }
      }
    })
  },
  del:function(e){
    console.log(e)
    //删除数据库中相应的数据
    let dbId = e.target.id

    wx.cloud.callFunction({
      name: 'delUserInfo',
      data: {
        new_id: dbId
      }
    })
    


    //删除相应的view组建
    let that = this
    let index = e.target.dataset.index
    let oldArray = that.data.myList
    let length = oldArray.length
    if(length > 1){
      let newArray = oldArray.splice(index, 1)
      that.setData({
        myList: newArray
      })
    }else{
      that.setData({
        myList: ''
      })
    }
  }


  // login:function(){
  //   var openId = null;
  //   wx.cloud.callFunction({
  //     name:'add'
  //   }).then(res=>{
  //     openId = res.result.OPENID
  //     console.log(openId)
  //   })


  //   var that = this
  //   var js_code = ''
  //   wx.login({
  //     success(res){
  //       console.log(res.code)
  //       js_code = res.code
  //     }
  //   })
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             that.setData({
  //               nickname: res.userInfo.nickName,
  //               photoUrl: res.userInfo.avatarUrl,
  //               isShow: 'hide',
  //               isScrollShow:'show',

  //             })
  //             getApp().globalData.openId = openId
  //             //此时根据openid在userInfo表中查出用户所关注的信息
  //             wx.cloud.init()
  //             const db = wx.cloud.database()
  //             db.collection('userInfo').where({
  //               openId: openId
  //             }).get({
  //               success: function (res) {
  //                 console.log(res.data)
  //                 var res = res.data.map(function (value, index, array) {
  //                   return value.new_id
  //                 })
  //                 console.log(res)
  //                 wx.cloud.init()
  //                 const db = wx.cloud.database()
  //                 const _ = db.command
  //                 db.collection('search_list').where({
  //                   _id: _.or(res)
  //                 }).get({
  //                   success: function (res) {
  //                     console.log(res.data)
  //                     that.data.myList = res.data
  //                   }
  //                 })

  //               }
  //             })





  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // }



})