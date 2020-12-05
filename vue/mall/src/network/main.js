import {request} from "@/network/request";

export function getMainMultiData(){
  return request({
    url:'/home/multidata'
  })
}
