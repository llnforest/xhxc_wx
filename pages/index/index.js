//index.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#5eb95e' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#5eb95e' }
    ],
    dateshow:false,
    empty:false,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  },

  //给点击的日期设置一个背景颜色
  dayClick: function (event) {
    console.log();
    console.log();
    console.log(new Date().getMonth()+1);

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
    console.log(event.detail);
    this.setData({
      year:event.detail.year,
      month:event.detail.month,
      day:event.detail.day,
      dateshow: false
    })
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
    wx.navigateTo({
      url: '/pages/index/reserve',
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.data.url + '/index/index/index',
      method: 'post',
      data: {
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        var _data = res.data.data;
        if(res.data.code == 0){
          
        }else{
          console.log('error')
        }


        

        

      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  }
})
