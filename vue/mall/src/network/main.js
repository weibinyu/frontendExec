import {request} from "@/network/request";

export function getMainMultiData(){
  return request({
    url:'/home/multidata'
  })
}

export function getMainGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
