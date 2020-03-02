// pages/user/myreserve.js
const app = getApp();
import { routerFillter } from '../../utils/router.js';
routerFillter({
  /**
   * 页面的初始数据
   */
  data: {
    reserveList: [],
    empty: false,
  },

  
  onLoad: function () {
    this.renderReserve();
  },
  onShow:function(){

  },
  /**
   * 渲染预约列表
   */
  renderReserve: function () {
    let that = this;
    app.requestFunc('v4/wx/myreserve', {  }, function sucFunc(d) {
      let _data = d.data;
      let empty = false;
      if (_data.reserveList.length == 0) {
        empty = true;
      }
      that.setData({
        reserveList: _data.reserveList,
        empty: empty
      });
    }, false, function errFunc(d) {
      app.toast(d.msg);
      that.setData({
        reserveList: [],
        empty: true
      })
    });
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    });

  }
},true)