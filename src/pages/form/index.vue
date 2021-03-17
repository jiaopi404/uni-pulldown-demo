<template>
  <view class="page-form">
    <u-form :model="form" ref="uForm">
      <u-form-item label="姓名" prop="userName">
        <u-input v-model="form.userName" />
      </u-form-item>
      <u-form-item label="课程名" prop="curriculumName">
        <u-input v-model="form.curriculumName" />
      </u-form-item>
    </u-form>
    <u-button @click="userSubmit">提交</u-button>
  </view>
</template>

<script>
export default {
  name: 'index.vue',
  data () {
    return {
      form: {
        userName: '',
        curriculumName: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: ['change'] }
        ],
        curriculumName: [
          { required: true, message: '请输入课程', trigger: ['change'] }
        ]
      }
    }
  },
  onReady () {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    userSubmit () {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          const user = {
            name: this.form.userName,
            curriculum: {
              name: this.form.curriculumName
            }
          }
          this.$api.addUser(user).then(res => {
            uni.showToast({
              title: 'success'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
