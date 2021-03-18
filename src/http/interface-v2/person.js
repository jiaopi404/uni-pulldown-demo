/**其他接口，获取图片，协议等 */
import minRequest from '../min-req-instance.js'
/**
 * 用户协议
 */
function findAllUser (data) {
    return minRequest.get('/user')
}
function addUser (user) {
    return minRequest.post('/user/add', user)
}

/**
 * 微信登录
 */
function wxLogin (apiKey, jsCode) {
    return minRequest.post('/wx/login', { apiKey, jsCode })
}
export default {
    findAllUser,
    addUser,
    wxLogin
}
