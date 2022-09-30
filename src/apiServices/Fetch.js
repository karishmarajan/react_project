import axios from 'axios';
import React from 'react';

export function commonPost(url,values) {
    // let refreash_token= localStorage.getItem("refreshToken");
    console.log(JSON.stringify(url))
    console.log(JSON.stringify(values))
   return axios.post(url,values)
    .then((res)=>{
        console.log("Res "+JSON.stringify(res))
        return res;
    })
    .catch((error)=>{
        console.log("Resonse Error "+error)
        // return error;
    })
}
export function commonGet(url) {
    let refreash_token= localStorage.getItem("refreshToken");
    let access_token= localStorage.getItem("accessToken");
    console.log(JSON.stringify(url)+"  "+access_token)
   return axios.get(url,{
    headers:{
        Authorization:"Contacts "+ access_token
    } 
   })
    .then((res)=>{
        if(res.status == 200){
            console.log("Res "+JSON.stringify(res))
            return res;
        }else if(res.status == 403){
            console.log("Res in 403 "+JSON.stringify(res))
        }else{
            console.log("Res in else "+JSON.stringify(res))
        }
      
    })
    .catch((error)=>{
        console.log("Resonse Error "+error)
        // return error;
    })
}

export function commonDelete(url) {
    let refreash_token= localStorage.getItem("refreshToken");
    let access_token= localStorage.getItem("accessToken");
    console.log(JSON.stringify(url)+"  "+access_token)
   return axios.delete(url,{
    headers:{
        Authorization:"Contacts "+ access_token
    } 
   })
    .then((res)=>{
        console.log("Res "+JSON.stringify(res))
        return res;
    })
    .catch((error)=>{
        console.log("Resonse Error "+error)
        // return error;
    })
}

export function getNewAccessToken(url) {
    let refreash_token= localStorage.getItem("refreshToken");
    let access_token= localStorage.getItem("accessToken");
    console.log(JSON.stringify(url))
   return axios.get(url,{
    headers:{
        Authorization:"Contacts "+ access_token
    } 
   })
    .then((res)=>{
        console.log("Res "+JSON.stringify(res))
        return res;
    })
    .catch((error)=>{
        console.log("Resonse Error "+error)
        // return error;
    })
}