Page({
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
        var code = res.data[0].code.slice(1, 7)
        that.setData({
          name:res.data[0].name,
          code:code
        })
      }
    })


  }














  // ===============
})