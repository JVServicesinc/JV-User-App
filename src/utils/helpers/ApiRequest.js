import axios from "axios";
import constants from "./constants";

export async function getApi(url, header) {
  const api_url = `${constants.BASE_URL}/${url}`;
  // console.log("API URL ---", api_url);
  return await axios.get(api_url, {
    headers: {
      Accept: header.Accept,
      "Content-type": header.contenttype,
      // 'x-access-token': header.accesstoken,
      Authorization: "Bearer" + " " + header.accesstoken,
    },
  });
}

export async function getApiWithParam(url, param, header) {
  return await axios({
    method: "GET",
    baseURL: constants.BASE_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      "Content-type": header.contenttype,
    },
  });
}

export async function postApi(url, payload, header) {
  return await axios.post(`${constants.BASE_URL}/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      "Content-Type": header.contenttype,
      // 'x-access-token': header.accesstoken,
      Authorization: "Bearer" + " " + header.accesstoken,
    },
  });
}

export async function providerSearchPostApi(url, payload, header) {
  return await axios.post(`http://104.129.128.44:3000/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      "Content-Type": header.contenttype,
      // 'x-access-token': header.accesstoken,
      Authorization: "Bearer" + " " + header.accesstoken,
    },
  });
}

export async function deleteApi(url, header) {
  return await axios.delete(`${constants.BASE_URL}/${url}`, {
    headers: {
      Authorization: "Bearer" + " " + header?.accesstoken,
    },
  });
}
