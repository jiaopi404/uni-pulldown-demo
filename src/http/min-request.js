const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')
// import $store from '@/store/index.js'

class MinRequest {
	[config] = {
		baseURL: '',
		header: {
			// 'content-type': 'application/x-www-form-urlencoded'
			'content-type': 'application/json'
		},
		method: 'GET',
		dataType: 'json',
		responseType: 'text'
	}

	interceptors = {
		request: (func) => {
			if (func) {
				MinRequest[requestBefore] = func
			} else {
				MinRequest[requestBefore] = (request) => request
			}
		},
		response: (func) => {
			if (func) {
				MinRequest[requestAfter] = func
			} else {
				MinRequest[requestAfter] = (response) => response
			}
		}
	}

	static [requestBefore] (config) {
		return config
	}

	static [requestAfter] (response) {
		return response
	}

	static [isCompleteURL] (url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	setConfig (func) {
		this[config] = func(this[config])
	}

	request (options = {}) {
		options.baseURL = options.baseURL || this[config].baseURL
		options.dataType = options.dataType || this[config].dataType
		options.url = MinRequest[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
		options.data = options.data
		options.header = {...options.header, ...this[config].header}
		options.method = options.method || this[config].method

		// config token for api
		let _token = uni.getStorageSync('key-auth-token') // $store.getters.token
		if (_token) {
			options.header['Authorization'] = 'Bearer ' + _token
		}

		options = {...options, ...MinRequest[requestBefore](options)}

		return new Promise((resolve, reject) => {
			options.success = (res) => {
				if (res.statusCode === 200) {
					if (res.data.code === 0 || res.data.code === 200) {
						resolve(MinRequest[requestAfter](res))
					} else {
						reject({code: res.data.code, msg: res.data.msg})
					}
				} else {
					if (res.statusCode === 408) {
						// $store.commit('setToken', '')
						// $store.commit('setUserInfo', {})
					}
					reject({code: res.statusCode, msg: this.getErrMsg(res.statusCode)})
				}
			}
			options.fail= function (err) {
				reject(MinRequest[requestAfter](err))
			}
			uni.request(options)
		})
	}

	get (url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	}

	post (url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	}

	delete (url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
	
	getErrMsg (status) {
		let msg = ''
		switch (status) {
			case 400:
				msg = '????????????'
				break
			case 401:
				msg = '?????????????????????'
				break
			case 403:
				msg = '????????????'
				break
			case 404:
				msg = `??????????????????`
				break
			case 408:
				msg = '????????????'
				break
			case 500:
				msg = '?????????????????????'
				break
			case 501:
				msg = '???????????????'
				break
			case 502:
				msg = '????????????'
				break
			case 503:
				msg = '???????????????'
				break
			case 504:
				msg = '????????????'
				break
			case 505:
				msg = 'HTTP??????????????????'
				break
			default:
				msg = '?????????????????????'
				break
		}
		return msg
	}
}

MinRequest.install = function (Vue) {
	Vue.mixin({
		beforeCreate: function () {
			if (this.$options.api) {
				// console.log(this.$options.api)
				Vue._minRequest = this.$options.api
			}
		}
	})
	Object.defineProperty(Vue.prototype, '$api', {
		get: function () {
			return Vue._minRequest.apis
		}
  })
}

export default MinRequest