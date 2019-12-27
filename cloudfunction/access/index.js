// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
//云函数入口
exports.main = async(event, context) => {
  try{
    return await db.collection('search_list').doc(event.id).update({
      data:{
        openid:event.openId
      }
    })
  }catch(e){
    console.error(e)
  }
}
















