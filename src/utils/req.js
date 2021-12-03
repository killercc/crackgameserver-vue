import axios from 'axios';
import {ElMessageBox} from "element-plus";
import router from "../router";
axios.defaults.withCredentials = true //跨域
axios.defaults.headers.post['Content-Type'] = 'application/json'

const service = axios.create({
    timeout: 5000,
});

axios.interceptors.request.use(


    config => {
        if(localStorage.getItem("auth")){
            config.headers.auth = localStorage.getItem("auth")
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
axios.interceptors.response.use( response => {
    const code = response.data.code
    // console.log("code--"+code)
    switch (code){
        case 2001:
            router.push('/login');
            localStorage.removeItem('auth');
            return response
        default:
            return response
    }

},  error => {
    let errorMsg = ''
    if (error.toString().indexOf('timeout') !== -1) {
        errorMsg = '连接服务器超时'
    } else {
        const errorStatus = error.response.status
        const resErrorMsg = error.response.data.message
        switch (errorStatus) {
            case 400:
                errorMsg = '错误'
                break
            case 401:
                router.push('/login')
                localStorage.removeItem('auth');
                // console.log('match', router.currentRoute)
                return
            case 403:
                errorMsg = '没有权限'
                break
            case 404:
                errorMsg = '请求路径找不到'
                break
            case 422:
                errorMsg = JSON.stringify(error.response.data.data)
                break
            default:
                // console.log('.api..baseURL.......', resErrorMsg)
                errorMsg = resErrorMsg
        }
    }
        ElMessageBox({
        message: errorMsg,
        type: 'error',

    })
    return Promise.reject(error)
}

)
//get请求
service.requestGet = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
};
//get请求不带参数
service.requestQuickGet = function (url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
//get导出excel
service.requestExportGet = function (url) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/vnd.ms-excel',
            },
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
};

//post请求
service.requestPost = function (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
};


//用于下载的post请求
service.requestDownloadPost = function (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json; application/octet-stream'
            }
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
//post请求
    service.requestPostForm =function(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/x-www.form-urlencoded',
                },
            }).then(res => {
                resolve(res)//注意res是axios封装的对象，res.data才是服务端返回的信息
            }).catch(error => {
                reject(error)
            })
        })
    };
//put请求
service.requestPut = function (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
};
//delete请求
service.requestDelete = function (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
};

//上传excel文件
// uploadExcel(file) {
//   let formData = new FormData();
//   formData.append('file', file.file);
//   axios({
//     method: "post",
//     url: "/api/orderMaster/excel",
//     data: formData,
//     headers: {'Content-Type': 'multipart/form-data'}
//   }).then(res => {
//     console.log(res);
//     let status = res.status;
//     this.$refs.upload.clearFiles()
//   }).catch(error=>{
//     console.log(error)
//     this.$refs.upload.clearFiles()
//   })
// }


//export const xxxx= (page, size,query) => {
//    return request.requestPost('/xxx/' + page + '/' + size,query)
//}


export default service;
