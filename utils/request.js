// 封装uni-app请求方法
const BASEURL = 'http://10.15.91.238:8081'
// 封装uni-app请求方法
// utils/request.js
export const request = (url, data = {}, method = 'GET', header = {}) => {
  return new Promise((resolve, reject) => {
    // 设置默认的请求头
    const defaultHeader = {
      'content-type': 'application/json',
      ...header
    };

    // 如果是POST请求，设置请求体为JSON格式
    if (method === 'POST') {
      defaultHeader['content-type'] = 'application/json';
    }

    uni.request({
      url: BASEURL+url,
      method: method,
      data: data,
      header: defaultHeader,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

// 封装GET请求
export const get = (url, data = {}, header = {}) => {
  return request(url, data, 'GET', header);
};

// 封装POST请求
export const post = (url, data = {}, header = {}) => {
  return request(url, data, 'POST', header);
};

// 封装PUT请求
export const put = (url, data = {}, header = {}) => {
  return request(url, data, 'PUT', header);
};

// 封装DELETE请求
export const del = (url, data = {}, header = {}) => {
  return request(url, data, 'DELETE', header);
};