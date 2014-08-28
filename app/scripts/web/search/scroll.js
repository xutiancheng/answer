/*global define: true , alert, window*/
function ScrollFollow() {
  this.init.apply(this, arguments);
}
ScrollFollow.prototype = {
  init: function (el, config) {
    var defalut = {
        followEl: "",
        distance: "",
        direction: "top"
      };
    this.fixs = $.extend({}, defalut, config);
    this.followEl = el;
    this.followEl = $(this.followEl);
    if (!this.followEl) {
      return;
    }
    if (!this.top) {
      this.top = this.followEl.offset().top;
    }
    this.cssPosition = this.followEl.css("position");
    this.cssWidth = this.followEl.css("width");
    this._bind();
    this.winReset();
  },
  _bind: function () {
    var self = this;
    $(window).on("scroll", function () {
      self.resetPosition();
    });
  },
  resetPosition: function () {
    var winTop = parseInt($(window).scrollTop(), 10),
      followEl = this.followEl,
      top = this.top,
      distance = parseInt(this.fixs.distance, 10),
      direction = this.fixs.direction,
      viewheight = parseInt($(window).height(), 10),
      height = followEl.height();
    switch (direction) {
      case "top":
        if (top - winTop < distance) {
          this.fixtop(winTop);
        } else if (top - winTop > distance) {
          this.clearcss();
        }
        break;
      case "bottom":
        if (top - winTop > distance) {
          this.clearcss();
        }
        if(top < winTop + viewheight - distance - height) {
          this.fixbom(winTop);
        }
        /*if (top < winTop + viewheight - distance - height) {
          this.fixbom(winTop);

        } else if (top - winTop > distance) {
          this.clearcss();
          console.log(5);
        }*/
        break;
    }
  },
  clearcss: function () {
    var followEl = this.followEl;
    followEl.css({
      position: this.cssPosition,
      top: "",
      width: "",
      bottom: ""
    });
  },
  fixtop: function (winTop) {
    var followEl = this.followEl,
        distance = parseInt(this.fixs.distance, 10);
    if ($("html").hasClass("lt-ie7")) {
        followEl.css({
        "position": "absolute",
        "top": winTop + distance,
        "marginTop": "0",
        "width": this.cssWidth,
        "z-index": 99999
        });
      } else {
        followEl.css({
        position: "fixed",
        top: distance,
        marginTop: "0",
        width: this.cssWidth
        });
      }
  },
  fixbom: function (winTop) {
    var followEl = this.followEl,
        distance = parseInt(this.fixs.distance, 10),
        height = parseInt(followEl.height(), 10);
    if ($("html").hasClass("lt-ie8")) {
        this.clearcss();
      } else {
        followEl.css({
        position: "fixed",
        marginTop: "0",
        width: this.cssWidth,
        bottom: distance
        });
      }
  },
  winReset: function() {
    var self = this;
    $(window).resize(function() {
      self.resetPosition();
    });
  }
};
ScrollFollow.instance = null;
ScrollFollow.getInitalize = function (el, config) {
  if (ScrollFollow.instance) {
    return ScrollFollow.instance;
  }
  return ScrollFollow.instance = new ScrollFollow(el, config);
}

ScrollFollow.getInitalize(".bj-item-info",{
  distance: "0"
});

