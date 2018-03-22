//index.js
//获取应用实例
const app = getApp()
var wxDraw = require("../../util/wxdraw.min.js").wxDraw;
var Shape = require("../../util/wxdraw.min.js").Shape;
var AnimationFrame = require("../../util/wxdraw.min.js").AnimationFrame;

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    wxCanvas: null


  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindtouchstart: function (e) {
    // 检测手指点击事件
    // console.log(e);
    this.wxCanvas.touchstartDetect(e);

  },
  bindtouchmove: function (e) {
    // 检测手指点击 之后的移动事件
    this.wxCanvas.touchmoveDetect(e);
  },
  bindtouchend: function () {
    //检测手指点击 移出事件
    this.wxCanvas.touchendDetect();
  },
  bindtap: function (e) {
    this.wxCanvas.tapDetect(e);
  },
  bindlongpress: function (e) {
    // console.log(e);
    this.wxCanvas.longpressDetect(e);
  },
  onLoad: function () {
    /** 
     * 
     */
    // console.log(requestAnimationFrame);
    var context = wx.createCanvasContext('textA')

    this.wxCanvas = new wxDraw(context, 0, 0, 400, 750);//创建画布

    var stars = new Array();//存储对象
    var stars_count = 30;//星星个数
    for (var i = 0; i < stars_count; i++) {
      var random = this.rand_number(30, 375);//随机产生位置
      var _w = this.rand_number(10, 70);//随机产生大小
      stars[i] = new Shape('image', { x: random, y: -50, w: _w, h: _w, file: "../img/1.png" }, 'fill', false)//创建星星
      this.wxCanvas.add(stars[i]);//将星星添加到画布
    }

    for (var i = 0; i < stars_count; i++) {//为每个星星创建动画
      var img = stars[i];
      var random = this.rand_number(1000, 2000);//随机动画时长
      img.animate({ y: "+750", rotate: Math.PI / 1 }, { duration: random, easing: "easeInQuint" }).start(1)
    }

  },
  onUnload: function () {
    this.wxCanvas.clear();
  },
  rand_number: function (m, n) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
  }

})
