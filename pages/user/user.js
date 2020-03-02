// pages/user/user.js
const app = getApp()
import { routerFillter } from '../../utils/router.js';
routerFillter({
  /**
   * 页面的初始数据
   */
  data: {
    headImg: '',
    info: {}
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
    this.renderUser();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  renderUser: function () {
    let that = this;
    app.requestFunc('v4/wx/userinfo', {}, function sucFunc(d) {
      let _data = d.data;
      // console.log(app.globalData);
      that.setData({
        info: _data.info,
        // headImg: app.globalData.userInfo.avatarUrl
      });
    });
  },
  goReserve: function () {
    wx.navigateTo({
      url: '/pages/user/myreserve',
    })
  }
}, true);