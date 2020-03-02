const appGlobalData = getApp().globalData;

/**
 * routerFillter --全局路由拦截器
 * @function
 * @param{Object} pageObj 当前页面的page对象
 * @param{Boolean} flag 是否开启权限判断
 */
exports.routerFillter = function (pageObj, flag = false) {
  if (flag) {
    let _onLoad = pageObj.onLoad
    pageObj.onLoad = function (options) {
      let that = this
      if (appGlobalData.token == "" && appGlobalData.openid == "") {
        //判断获取token是否完成
        getApp().userLogin().then((res) => {
          if(res.data.token == ""){
            wx.reLaunch({
              url: '/pages/user/login',
            })
          }else{
            _onLoad.call(that);
          }
        })
        
      } else {
        if (appGlobalData.token == ""){
          wx.reLaunch({
            url: '/pages/user/login',
          })
        }
        _onLoad.call(that,options);
      }
    }
  }
  return Page(pageObj)
}
