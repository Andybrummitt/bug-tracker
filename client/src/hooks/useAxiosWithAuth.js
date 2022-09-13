//  CREATE AXIOS INSTANCE
//  NAVIGATE TO ROUTE
//  IF 403 ERROR - CALL REFRESH FROM USEREFRESHTOKEN
//  TRY AGAIN

import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useRefreshToken from "./useRefreshToken";

const axios = require("axios");
const { useState } = require("react");

const useAxiosWithAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const refresh = useRefreshToken();

  let apiCalls = 0;
  let token = auth.userAccessToken;
  let config = {};

  const apiCall = ({ url, method, data = null }) => {
    config = {
      url,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    if (data) config.data = data;
    return new Promise((resolve, reject) => {
      return axios(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          if (apiCalls < 1 && err.response.status === 403) {
            refresh().then((userAccessToken) => {
              apiCalls += 1;
              setAuth((auth) => ({ ...auth, userAccessToken }));
              token = userAccessToken;
              resolve(apiCall(config));
            });
          } else {
            reject(err);
          }
        });
    });
  };
  return apiCall;
};

export default useAxiosWithAuth;
