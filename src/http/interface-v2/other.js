/**其他接口，获取图片，协议等 */
import minRequest from '../min-req-instance.js'
/**
 * 用户协议
 */
function getAboutProtocols(data) {
	return minRequest.get('/goods/protocols', data)
}
export default {
  getAboutProtocols
}