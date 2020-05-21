import axios from '../config/axiosConfig'
function api(obj) {
 return  axios({
      method: obj.method || 'GET',
      // url: `/admin/${obj.url}`,
      url: `apis/admin/${obj.url}`,
      data: obj.data||{},
      headers:obj.headers
    })
}
export default{
  api
}
