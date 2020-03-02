//app.js
App({
  data:{
    url:'https://wxapi2.xihaxueche.com/',

    // url:'http://192.168.100.62/php/api2/public/'
    isCanClick:true,
  },
  /**
   * 
   * url:地址
   * data：传递数据
   * sucFunc:成功回调函数
   * is_toast:操作成功是否弹框
   */
  requestFunc: function(url,data = {},sucFunc,is_suc_toast = false,errFunc = false){
    var that = this;
    if(!that.data.isCanClick) return false;
    that.data.isCanClick = false;
    data.token = that.globalData.token;
    wx.request({
      url: that.data.url + url,
      method: 'post',
      'data': data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var _data = res.data;
        console.log(_data);
        if (res.data.code == 200) {
          if(is_suc_toast){
            that.toast(_data.msg);
          }
          sucFunc(_data);
        } else {
          if(errFunc){
            errFunc(_data);
          }else{
            that.toast(_data.msg);
          }   
        }
      },
      fail: function (e) {
        that.toast('网络异常！');
      },
      complete:function(){
        that.data.isCanClick = true;
      }
    });
  },
  toast: function (msg, timelong = 2000) {
    let duration = timelong || 2000;
    wx.showToast({
      title: msg,
      duration: duration,
      icon: 'none'
    });
  },
  //自动登录
  userLogin: function () {
    //定义promise方法
    var that = this;
    console.log(4);
    return new Promise(function (resolve, reject) {
      wx.login({
        success: res => {
          console.log(res);
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: that.data.url + 'v4/wx/gettoken',
            method: 'post',
            'data': { code: res.code },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.code == 200) {
                that.globalData.token = res.data.data.token;
                that.globalData.openid = res.data.data.openid;
                resolve(res.data);
              }else{
                reject('error');
              }
            }
          });
        }
      });
    });
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;

    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  globalData: {
    userInfo: [],
    user:[],
    token:"",
    openid:'',
    sms_key:'0f3c5b5bff12a5c8adbba5c17652eaf3',
  },
  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})