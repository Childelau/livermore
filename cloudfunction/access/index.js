// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
//云函数入口
exports.main = async(event, context) => {
  try{
    return await db.collection('userInfo').add({
      data:{
        openId: event.openId,
        new_id: event.new_id,
      }
    })
  }catch(e){
    console.error(e)
  }
}
















