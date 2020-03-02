// pages/index/reserve.js
const app = getApp();
import { routerFillter } from '../../utils/router.js';
routerFillter({

  /**
   * 页面的初始数据
   */
  data: {
    busInfo:{},
    stationList:[],
    station_id:0,
    bus_id:0,
    reserve_date:'',
    line_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.bus_id = options.bus_id;
    this.data.reserve_date = options.reserve_date;
    this.renderReserve()

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  /**
     * 渲染预约列表
     */
  renderReserve: function () { 
    let that = this;
    app.requestFunc('v4/wx/reserveinfo', { bus_id: that.data.bus_id,reserve_date:that.data.reserve_date,line_id:that.data.line_id}, function sucFunc(d) {
      let _data = d.data;
      let empty = false;
      that.setData({
        busInfo: _data.busInfo,
        line_id:_data.busInfo.line_id,
        stationList: _data.stationList,
        reserve_date:_data.reserve_date
      });
    });
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
  clickStation:function(e){
    let data = e.currentTarget.dataset;
    this.setData({
      station_id:data.id
    })
  },
  sureSubmit:function(){
    let that = this;
    if(this.data.station_id == 0){
      app.toast('请选择站点');
      return false;
    }
    app.requestFunc('v4/wx/reserve', { bus_id: that.data.bus_id,station_id:that.data.station_id,reserve_date:that.data.reserve_date,line_id:that.data.line_id}, function sucFunc(d) {
      
      wx.navigateTo({
        url: '/pages/user/myreserve',
      })
    },true);
  },
  callPhone:function(e){
    wx.makePhoneCall({
      phoneNumber:e.currentTarget.dataset.phone
    });

  }

},true)