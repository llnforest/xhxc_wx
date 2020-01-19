var app = getApp();
var MD5Encode = require("md5.js");

/**
 * 图片长宽同比展示
 */
function imageLoad(e, that) {
  var $width = e.detail.width,    //获取图片真实宽度
    $height = e.detail.height,
    ratio = $width / $height;    //图片的真实宽高比例
  var viewWidth = 750,           //设置图片显示宽度，左右留有16rpx边距
    viewHeight = 750 / ratio;    //计算的高度值
  var image = that.data.images;
  //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
  image[e.target.dataset.index] = {
    width: viewWidth,
    height: viewHeight
  }
  that.setData({
    images: image
  })
}

/**
 * 对字符串判空
 */
function isStringEmpty(data) {
    if (null == data || "" == data) {
        return true;
    }
    return false;
}

/**
 * 封装网络请求
 */
function sentHttpRequestToServer(uri, data, method, successCallback, failCallback, completeCallback) {
    wx.request({
        url: app.d.hostUrl + uri,
        data: data,
        method: method,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: successCallback,
        fail: failCallback,
        complete: completeCallback
    })
}

/**
 * 将map对象转换为json字符串
 */
function mapToJson(map) {
    if (null == map) {
        return null;
    }
    var jsonString = "{";
    for (var key in map) {
        jsonString = jsonString + key + ":" + map[key] + ",";
    }
    if ("," == jsonString.charAt(jsonString.length - 1)) {
        jsonString = jsonString.substring(0, jsonString.length - 1);
    }
    jsonString += "}";
    return jsonString;
}

/**
 * 弹窗提示成功
 */
function toastSuccess() {
    wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
    })
}

/**
 * 调用微信支付
 */
function doWechatPay(prepayId, successCallback, failCallback, completeCallback) {
    var nonceString = getRandomString();
    var currentTimeStamp = getCurrentTimeStamp();
    var packageName = "prepay_id=" + prepayId;
    var dataMap = {
        timeStamp : currentTimeStamp,
        nonceStr : nonceString,
        package : packageName,
        signType : "MD5",
        paySign : getWechatPaySign(nonceString, packageName, currentTimeStamp),
        success : successCallback,
        fail : failCallback,
        complete : completeCallback
    }
    console.log(dataMap);
    wx.requestPayment(dataMap);
}

/**
 * 获取微信支付签名字符串
 */
function getWechatPaySign(nonceStr, packageName, timeStamp){
    var beforMD5 = "appid=" + app.d.appId + "&nonceStr=" + nonceStr + "&package=" + packageName + "&signType=MD5" + "&timeStamp=" + timeStamp + "&key=" + app.d.appKey;
    return doMD5Encode(beforMD5).toUpperCase();
}

/**
 * 获取当前时间戳
 */
function getCurrentTimeStamp() {
    var timestamp = Date.parse(new Date());
    return timestamp + "";
}

/**
 * 获取随机字符串，32位以下
 */
function getRandomString() {
    return Math.random().toString(36).substring(3, 8);
}

/**
 * MD5加密
 */
function doMD5Encode(toEncode){
    return MD5Encode.hexMD5(toEncode);
}

module.exports = {
    isStringEmpty: isStringEmpty,
    sentHttpRequestToServer: sentHttpRequestToServer,
    mapToJson: mapToJson,
    toastSuccess: toastSuccess,
    doWechatPay: doWechatPay,
    imageLoad:imageLoad
}