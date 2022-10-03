import axios from 'axios';
import React from 'react';
import URL from '../constants/Urls';


export function commonPost(url,values) {
    // let refreash_token= localStorage.getItem("refreshToken");
    console.log(JSON.stringify(url))
    console.log(JSON.stringify(values))
   return axios.post(url,values)
    .then((res)=>{
        if(res.status == 200){
            console.log("Res "+JSON.stringify(res))
            return res;
        }else{
            console.log("Res in else "+JSON.stringify(res))
        }
    })
    .catch((error)=>{
        console.log("Resonse Error code "+ JSON.stringify(error.response.data.status))
       if(error.response.data.status){
       getNewAccessToken((res)=>{
            console.log("get replay "+ res.status)
        });
       
       }
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
        }else{
            console.log("Res in else "+JSON.stringify(res))
        }
      
    })
    .catch((error)=>{
        console.log("Resonse Error "+error)
        if(error.response.data.status){
            const getToken = getNewAccessToken();
           }
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
        if(res.status == 200){
            console.log("Res "+JSON.stringify(res))
            return res;
        }else{
            console.log("Res in else "+JSON.stringify(res))
        }
    })
    .catch((error)=>{
        console.log("Resonse Error "+error)
        if(error.response.data.status){
            const getToken = getNewAccessToken();
            console.log("get replay "+ getToken.status)
           }
        // return error;
    })
}

export function getNewAccessToken(cb) {
    let refreash_token= localStorage.getItem("refreshToken");
    let access_token= localStorage.getItem("accessToken");
   return axios.put(URL.login,refreash_token ,{
    headers:{
        "Content-Type":""
    } 
   } )
    .then((res)=>{
        console.log("Res "+JSON.stringify(res))
        localStorage.setItem("refreshToken", res.data.refreshToken.value);
        localStorage.setItem("accessToken", res.data.accessToken.value);
        cb();
        return res;
    })
    .catch((error)=>{
        console.log("Resonse Error bn "+error)
        // return error;
    })
}