//index.js
//获取应用实例
const app = getApp()
import { routerFillter } from '../../utils/router.js';
routerFillter({
  /**
   * 页面的初始数据
   */
  data: {
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#5eb95e' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#5eb95e' }
    ],
    reserveList:[],
    dateshow:false,
    empty:false,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    nowDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
  },
  onLoad: function () {
    this.renderReserve();
  },
  onShow: function () {
    
  },
  //给点击的日期设置一个背景颜色
  dayClick: function (event) {
    // console.log(new Date().getMonth()+1);
    if(!this.compareDate(this.data.nowDate, event.detail.year + '-' + event.detail.month + '-' + event.detail.day)){
      app.toast('不能选择今日之前的日期');
      return false;
    }
    let clickDay = event.detail.day;
    let changeBgColor = `dayStyle[0].color`;
    let changeBg = `dayStyle[0].background`;
    let changeDay = `dayStyle[1].day`;
    let changeEndBg = `dayStyle[1].background`;

    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "rgba(255,255,255,0)",
      [changeBgColor]: "black",
      [changeEndBg]: "#5eb95e"
    })
    this.setData({
      year:event.detail.year,
      month:event.detail.month,
      day:event.detail.day,
      dateshow: false
    })
    this.renderReserve();
  },
  changeDate:function(event){
    if(this.data.dateshow){
      this.setData({
        dateshow: false
      })
    }else{
      this.setData({
        dateshow: true
      })
    }
    
  },
  goReserve:function(e){
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/index/reserve?bus_id=' + data.id + '&reserve_date=' + this.data.year + '-' + this.data.month + '-' + this.data.day,
    })
  },
  /**
   * 渲染预约列表
   */
  renderReserve:function(){
    let that = this;
    let date = this.data.year + '-' + this.data.month + '-' + this.data.day
    app.requestFunc('v4/wx/reservelist', {date:date}, function sucFunc(d) {
      let _data = d.data;
      let empty = false;
      if (_data.reserveList.length == 0){
        empty = true;
      }
      that.setData({
        reserveList: _data.reserveList,
        empty:empty
      });
    },false,function errFunc(d){
      if(app.globalData.token != "") app.toast(d.msg);
      that.setData({
        reserveList:[],
        empty:true
      })
    });
  },
  //比较日期大小
  compareDate:function(nowDate, compareDate) {
    var arys1 = new Array();
    var arys2 = new Array();
    if (nowDate != null && compareDate != null) {
      arys1 = nowDate.split('-');
      var nowDate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
      arys2 = compareDate.split('-');
      var compareDate = new Date(arys2[0], parseInt(arys2[1] - 1), arys2[2]);
      if (nowDate > compareDate) {
        return false;
      } else {
        return true;
      }
    }
  }
},true)
