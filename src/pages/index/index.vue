<template xmlns="">
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
		<view class="operation-list">
      <u-table>
        <u-tr>
          <u-th>操作</u-th>
          <u-th>操作</u-th>
        </u-tr>
<!--        <u-tr>-->
<!--          <u-td>-->
<!--            <u-button size="mini" @click="showPopup">点击打开 rick popup</u-button>-->
<!--          </u-td>-->
<!--          <u-td>-->
<!--            <u-button @click="getUsers">点击获取 users</u-button>-->
<!--          </u-td>-->
<!--          <u-td>-->
<!--            <u-button @click="toForm">to Form</u-button>-->
<!--          </u-td>-->
<!--        </u-tr>-->
        <u-tr
          v-for="(btnGroup, btnGroupIndex) in buttonListGroup"
          :key="btnGroupIndex"
        >
          <u-td
            v-for="btn in btnGroup"
            :key="btn.label"
          >
            <u-button
              size="mini"
              v-if="btn !== 'placeholder'"
              @click="buttonClickHandler(btn.action, $event)"
            >{{ btn.label }}</u-button>
            <text v-else>-</text>
          </u-td>
        </u-tr>
      </u-table>
    </view>
    <view class="users-list" v-if="users.length">
      <u-table>
        <u-tr>
          <u-th>序号</u-th>
          <u-th>姓名</u-th>
          <u-th>课程</u-th>
        </u-tr>
        <u-tr
          v-for="(item, index) in users"
          :key="item.id"
        >
          <u-td>{{ index }}</u-td>
          <u-td>{{ item.name }}</u-td>
          <u-td>{{ item.curriculum.name }}</u-td>
        </u-tr>
      </u-table>
    </view>
		<comp-rich-popup
			ref="compRichPopup"
		></comp-rich-popup>
    <u-card></u-card>
	</view>
</template>

<script>
	import CompRichPopup from './components/comp-rich-popup'
	export default {
		components: {
			CompRichPopup
		},
		data() {
			return {
				title: 'Hello',
        users: [],
        buttonList: [
          { label: 'show popup', action: 'showPopup' },
          { label: 'get users', action: 'getUsers' },
          { label: 'to form', action: 'toForm' },
          { label: 'wx login', action: 'wxLogin' }
        ],
        code: ''
			}
		},
    computed: {
		  buttonListGroup () {
		    const lenOfButtonList = this.buttonList.length
        const tmpList = []
        for (let i = 0; i < lenOfButtonList; i++) {
          if (i % 2 === 1) {
            continue
          }
          tmpList.push(this.buttonList.slice(i, i + 2))
        }
        if (tmpList[tmpList.length - 1].length % 2 !== 0) {
          tmpList[tmpList.length - 1].push('placeholder')
        }
        console.log('computed btn list: ', tmpList)
        return tmpList
      }
    },
		onLoad() {
		},
		onPullDownRefresh () {
			console.log('下拉刷新 is: ')
			setTimeout(() => {
				uni.stopPullDownRefresh()
			})
		},
		methods: {
		  buttonClickHandler (action, $event) {
		    this[action]($event)
        this.showEvent($event)
      },
			showPopup () {
				this.$refs.compRichPopup.showModal()
			},
      async getUsers () {
        const res = await this.$api.findAllUser()
        this.users = res.data
      },
      toForm () {
			  uni.navigateTo({
          url: '/pages/form/index'
        })
      },
      showEvent (event) {
		    console.log(event)
      },
      /**
       * 微信登录
       */
      wxLogin () {
        uni.login({
          success: res => {
            console.log('res is: ', res)
            this.code = res.code
            this.login(res.code)
          }
        })
      },
      /**
       * 服务端登录
       */
      async login (jsCode) {
        const apiKey = '12345678'
        try {
          const res = await this.$api.wxLogin(apiKey, jsCode)
          console.log('res of wx login', res)
        } catch (e) {
          this.$printError('wx login', e)
        }
      }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

<style lang="scss">
.some-test {
  font-size: 40px;
}
.users-list,
.operation-list {
  padding: 20px 0;
  width: 90vw;
}
</style>
