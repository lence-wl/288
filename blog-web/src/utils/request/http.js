import axios from 'axios'
import qs from 'qs'
const baseURL = 'http://localhost:8000'

axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
})

function apiAxios(method, url, params) {
    // qs.stringify(params) 可以把对象转换成查询字符串形式，axios params 参数可以自动转换
    let httpDefault = {
        method: method,
        baseURL: baseURL,
        url: url,
        // `params` 是即将与请求一起发送的 URL 参数
        // `data` 是作为请求主体被发送的数据
        params: method === 'GET' || method === 'DELETE' ? params : null,
        data: method === 'POST' || method === 'PUT' ? params : null,
        timeout: 10000,
        headers: {
            'content-type' : 'application/json',
        }
    }
    console.log(httpDefault)
    return new Promise((resolve, reject) => {
        axios(httpDefault)
            .then((res) => {
                resolve(res)
            }).catch((err) => {
                console.log(err)
            reject(err)
        })
    })
}

export default {
    install: function (Vue) {
        Vue.prototype.get = (url, params) => apiAxios('GET', url, params)
        Vue.prototype.post = (url, params) => apiAxios('POST', url, params)
    },

}
