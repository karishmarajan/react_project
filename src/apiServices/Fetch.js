import axios from "axios";
import React from "react";
import URL from "../constants/Urls";

export function commonPost(url, values) {
  return axios
    .post(url, values)
    .then((res) => {
      if (res.status == 200) {
        // console.log("Res " + JSON.stringify(res));
        return res;
      } else {
        console.log("Res in else " + JSON.stringify(res));
      }
    })
    .catch((error) => {
      console.log(
        "Resonse Error code " + JSON.stringify(error.response.data.status)
      );
    });
}

export function authorizedCommonPost(url, values) {
  let access_token = localStorage.getItem("accessToken");
  return axios
    .post(url,values,{
        headers: { 
          Authorization: "Contacts " + access_token,
          "Content-Type":"application/json"
        },
      },
      
    )
    .then((res) => {
      if (res.status == 200) {
        // console.log("Res " + JSON.stringify(res));
        return res;
      } else {
        console.log("Res in else " + JSON.stringify(res));
      }
    })
    .catch((error) => {
      console.log(
        "Resonse Error code " + JSON.stringify(error.response.data.status)
      );
    });
}
export function commonGet(url) {
  let access_token = localStorage.getItem("accessToken");
  return axios
    .get(url, {
      headers: {
        Authorization: "Contacts " + access_token,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        // console.log("Res " + JSON.stringify(res));
        return res;
      } else {
        console.log("Res in else " + JSON.stringify(res));
      }
    })
    .catch((error) => {
      console.log("Resonse Error " + error);
      // return error;
    });
}

export function commonDelete(url) {
  let access_token = localStorage.getItem("accessToken");
  return axios
    .delete(url, {
      headers: {
        Authorization: "Contacts " + access_token,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        // console.log("Res " + JSON.stringify(res));
        return res;
      } else {
        console.log("Res in else " + JSON.stringify(res));
      }
    })
    .catch((error) => {
      console.log("Resonse Error " + error);
      // return error;
    });
}

export function authorizedCommonPut(url, values) {
  let access_token = localStorage.getItem("accessToken");
  return axios
    .put(url,values,{
        headers: { 
          Authorization: "Contacts " + access_token,
          "Content-Type":"application/json"
        },
      },
      
    )
    .then((res) => {
      if (res.status == 200) {
        // console.log("Res " + JSON.stringify(res));
        return res;
      } else {
        console.log("Res in else " + JSON.stringify(res));
      }
    })
    .catch((error) => {
      console.log(
        "Resonse Error code " + JSON.stringify(error.response.data.status)
      );
    });
}

export function getNewAccessToken() {
  let refreash_token = localStorage.getItem("refreshToken");
  return axios
    .put(URL.login, refreash_token, {
      headers: {
        "Content-Type": "",
      },
    })
    .then((res) => {
      console.log("Res " + JSON.stringify(res));
      localStorage.setItem("refreshToken", res.data.refreshToken.value);
      localStorage.setItem("accessToken", res.data.accessToken.value);
      return res;
    })
    .catch((error) => {
      console.log("Resonse Error bn " + error);
      // return error;
    });
}
