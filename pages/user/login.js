// pages/user/login.js

const app = getApp();
const md5 = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    code: '',
    sec: 0,
    isAble: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  //input获取
  phoneinput: function (e) {
    this.data.phone = e.detail.value.replace(/(^\s)|(\s$)/g, "");
    return this.data.phone;
  },
  //input获取
  codeinput: function (e) {
    this.data.code = e.detail.value.replace(/(^\s)|(\s$)/g, "");
    return this.data.code;
  },
  /**
   * 发送验证码
   */
  sendCode: function (e) {
    var that = this;
    if(that.data.phone == ""){
      app.toast('请填写手机号')
      return false;
    }
    var randNum = new Date().getTime();//产生一个随机数
    var secret = md5.hexMD5('phone=' + that.data.phone + '&timestamp=' + randNum + '&token=' + app.globalData.token+'&key='+ app.globalData.sms_key).toUpperCase();
    app.requestFunc('v3/student/ucenter/smscode/student/login', { phone: that.data.phone, timestamp: randNum, sign: secret }, function sucFunc(d) {
      that.setData({
        sec: 60
      })
      //定时器
      var timer = setInterval(function () {
        that.setData({
          sec: that.data.sec - 1
        })
        if (that.data.sec <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    }, true);
  },
  //确认保存
  sureSubmit: function (e) {
    var that = this;
    if (that.data.phone == "") {
      app.toast('请填写手机号')
      return false;
    }
    if (that.data.code == "") {
      app.toast('请填写验证码')
      return false;
    }
    app.requestFunc('v3/student/ucenter/verification_code_login', { phone: that.data.phone,code: that.data.code,login_type:'wx',openid:app.globalData.openid}, function sucFunc(d) {
      app.globalData.token = d.data.token;
      //2s后回退
      setTimeout(function () {
        // wx.navigateBack();
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }, 2000);

    }, true);
  }
})