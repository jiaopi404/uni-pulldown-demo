import other from './interface-v2/other'
import person from '@/http/interface-v2/person'
const apis = {
	...other,
	...person
}
export default {
	apis,
	person
}