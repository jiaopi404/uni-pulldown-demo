import Vue from 'vue'
class ErrorHandler {
    msg;
    error;
    constructor (msg, error) {
        this.msg = msg
        this.error = error
    }
}
function printError (msg, error) {
    console.log(new ErrorHandler(msg, error))
}
export default function install () {
    Object.defineProperty(Vue.prototype, '$printError', {
        get () {
            return printError()
        }
    })
}
