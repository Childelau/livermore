// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command



// 云函数入口函数
exports.main = async(event, context)=> {
  try{
    return await db.collection('caoncactInfo').add({
      data:{
        name: event.name,
        code: event.code,
        userName: event.userName,
        userTel: event.userTel,
        openId: event.openId
      },
      success:function(res){
        console.log(res)
      },
      fail: console.error
      
        
    })

  }catch(e){
    console.error(e)
  }
}