import axios from "@/util/axios"

var ajaxList = window.ajaxList;

// 请求数据
export function getData(url, query) {
  return axios({
    url: `${ajaxList.common}${url}`,
    method: "get",
    params: query
  });
}

// 微信配置
export function getWXConfig(query) {
  return axios({
    url: ajaxList.wx,
    method: "post",
    data: query
  });
}


