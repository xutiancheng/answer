var sameflag = false,
    similarflag = false,
    showflag = false,
    numPerPage1 = 8, //每页个数
    tab = $(".sec-condition-tab").find("li"),
    wrap = $(".sec-condition-cn"),
    node = $("#J_datainfo"),
    sourceId = node.data("sourceid"),
    cid = node.data("cid"),
    website = node.data("website"),
    checked = false,
    e = $(".J_same_num").html(),
    searchApi = [
      "http://bijia.taotaosou.com/tkList.html?pageNum=1&tkType=same",
      "http://bijia.taotaosou.com/tkList.html?pageNum=1&tkType=similar",
      "http://show.re.taobao.com/feature.htm?cb=?"
    ],
    webSiteMap = {
      'taobao':'淘宝网',
      'tmall':'天猫商城',
      'jd.com':'京东商城',
      'amazon':'亚马逊',
      'yihaodian':'1号店',
      'dangdang':'当当网',
      'suning':'苏宁易购',
      '51buy':'易迅',
      'vipshop':'唯品会',
      'wanggou':'QQ网购',
      'vjia':'凡客V+',
      'vancl':'凡客诚品',
      'moonbasa':'梦芭莎',
      'coo8':'库巴',
      'm18':'麦考林',
      'xiu':'走秀',
      'mbaobao':'卖包包',
      'justyle':'justyle',
      'hstyle':'韩都衣舍',
      'liebo':'裂帛',
      'ochirly':'欧时力官网',
      'hg-daigou':'韩购社官网',
      'htjz':'核桃夹子'
    };
function SameList() {
  this.init();
}
SameList.prototype = {
  init: function() {
    var rul = searchApi[0] + "&sort=salesFirst&sourceId=" + sourceId + "&website=" + website + "&pageSize=40";
    if(e == "0") return;
    this.request(rul, this.showSelectlist, this);
    this.pagerEvent();
    this.changRule();
    this.changeOrder();
    this.checkBox();
    this.gloabClick();
  },
  request: function(_url, cb1, _self) {
    var self = this;
    $.ajax({ 
      url: _url,
      cache: false,
      dataType: "jsonp",
      jsonp: "callback",
      success: function(data) {
        window.data1 = data;
        cb1(_self);
        self.getTBprice();
        if(data.tkList.length <= 2) {
          self.getRecommend();
        }
      }
    });
  },
  showSelectlist: function(_self) {
    $(".sub-list1").show();
    $(".prices-area").show();
    $(".sub-list-result").show();
    $("#wbsite").html(_.template($("#tpl-wbsite").html(), data1));
  },
  getRecommend: function() {
    $(".recommend").show();
    this.gettbPrice();
  },
  tplRecomme: function() {
    window.recomme = data1.recomList;
    $(".recommelist").html(_.template($("#tpl-recomme").html(), recomme));
    this.setimgsrc("data-recomme-listpic");
  },
  getPricearea: function(_self, price){
    var minNum = 0, maxNum = 0;
    minNum = Number(Math.min.apply(window, price));
    maxNum = Number(Math.max.apply(window, price));
    /*if(maxNum - minNum <= 50) {
      _self.lessThan();
    } else {*/
      _self.moreThan(minNum, maxNum);
    //}
  },
  lessThan: function() {
    var a1 = 0, a2 = 0, a3 = 0, areapeice = [];
    $.each(data1.tkList, function(i, item) {
      var mum = Number(item["cprice"]);
      if(mum <= 50) {
        a1 += 1;
        item["pricearea"] = "area1";
      }
      if(50 < mum && mum <= 100) {
        a2 += 1;
        item["pricearea"] = "area2";
      }
      if(mum > 100) {
        a3 += 1;
        item["pricearea"] = "area3";
      }
    });
    if(a1 > 0) {
      areapeice.push({
        area: 50 + "元以下",
        num : a1,
        pricearea: "area1"
      });
    }
    if(a2 > 0) {
      areapeice.push({
        area: "50 - 100元",
        num : a2,
        pricearea: "area2"
      });
    }
    if(a3 > 0) {
      areapeice.push({
        area: "100元以上",
        num : a3,
        pricearea: "area3"
      });
    }
    window.pricees = areapeice
    $(".prices-list").html(_.template($("#tpl-price").html(), pricees));
  },
  moreThan: function(minNum, maxNum) {
    var b1 = 0; b2 = 0, b3 = 0, b4 = 0, b5 = 0, areapeice = [];
    num = (maxNum - minNum) / 5;
    n = num % 50;
    m = Math.floor(num / 50);
    if(m == 0) {
      m = 1;
    }
    if (n > 25) {
      price0 = (m +1) * 50;
    } else {
      price0 = (m) * 50;//第一次取整
    }
    price00 = price0 + minNum;
    m2 = Math.floor(price00 / 50);
    zprice1 = Math.floor(m2 * 50);//第二次取整
    zprice2 = Math.floor(m2 * 50 + price0);
    zprice3 = Math.floor(m2 * 50 + 2 * price0);
    zprice4 = Math.floor(m2 * 50 + 3 * price0);
    zprice5 = Math.floor(m2 * 50 + 3 * price0);
    $.each(data1.tkList, function(i, item) {
      var mum = Number(item["cprice"]);
      if(mum <= zprice1) {
        b1 += 1;
        item["pricearea"] = "area1";
      }
      if(zprice1 < mum && mum <= zprice2) {
        b2 += 1;
        item["pricearea"] = "area2";
      }
      if(zprice2 < mum && mum <= zprice3) {
        b3 += 1;
        item["pricearea"] = "area3";
      }
      if(zprice3 < mum && mum <= zprice4) {
        b4 += 1;
        item["pricearea"] = "area4";
      }
      if(mum > zprice5) {
        b5 += 1;
        item["pricearea"] = "area5";
      }
    });
    if(b1 > 0) {
      areapeice.push({
        area: zprice1 + "元以下",
        num : b1,
        pricearea: "area1"
      });
    }
    if(b2 > 0) {
      areapeice.push({
        area: zprice1 + " - " + zprice2 + "元",
        num : b2,
        pricearea: "area2"
      });
    }
    if(b3 > 0) {
      areapeice.push({
        area: zprice2 + " - " + zprice3 + "元",
        num : b3,
        pricearea: "area3"
      });
    }
    if(b4 > 0) {
      areapeice.push({
        area: zprice3 + " - " + zprice4 + "元",
        num : b4,
        pricearea: "area4"
      });
    }
    if(b5 > 0) {
      areapeice.push({
        area: zprice4 + "元以上",
        num : b5,
        pricearea: "area5"
      });
    }
    window.pricees = areapeice;
    $(".prices-list").html(_.template($("#tpl-price").html(), pricees));
  },
  tplSame: function() {//渲染同款数据
    $(".samelist").html(_.template($("#tpl-same").html(), newData));
    this.setimgsrc("data-same-listpic");
    this.defaultPage();
    //this.getParam();
  },
  setimgsrc: function(proto) {
    $("["+ proto +"]").each(function(i, item) {
      $(item).attr("src", $(item).attr(proto));
      $(item).removeAttr(proto);
    });
  },
  gettbPrice: function() { //推荐款
    var _self = this, tbid = [], _url, price = [], discuss = [];
    $.each(data1.recomList, function(i, item) {
      tbid.push(item.sourceId);
    });
    _url = searchApi[2] + "&auction_ids=" + tbid.join(",") + "&feature_names=feedbackCount,promoPrice&from=taobao_search";
    $.getJSON(_url, function(tbprice) {
      $.each(data1.recomList, function(n, item) {
        for(var i = 0; i < tbprice.length; i +=1) {
          if(tbprice[i].auction_id == item.sourceId) {
            if(tbprice[i].promoPrice != "") {
              price.push(tbprice[i].promoPrice);
            } else {
              price.push(item.price);
            }
            if(tbprice[i].feedbackCount != "") {
              discuss.push(tbprice[i].feedbackCount);
            } else {
              discuss.push(item.feedbackCount);
            }
          }
        }
        item["Discuss"] = discuss[n];
        item["cprice"] = price[n];
      });
      _self.tplRecomme()
    }).error(function() {
      $.each(data1.tkList, function(i, item) {
        item["Discuss"] = item.feedbackCount;
        item["cprice"] = item.price;
      });
      _self.tplRecomme()
    });
  },
  getTBprice: function() {
    var _self = this, tbid = [], _url, price = [], discuss = [];
    $.each(data1.tkList, function(i, item) {
      tbid.push(item.sourceId);
      if(item.salesOri > 0) {
        item["hassales"] = "yes";
      }
    });
    _url = searchApi[2] + "&auction_ids=" + tbid.join(",") + "&feature_names=feedbackCount,promoPrice&from=taobao_search";
    $.getJSON(_url, function(tbprice) {
      $.each(data1.tkList, function(n, item) {
        for(var i = 0; i < tbprice.length; i +=1) {
          if(tbprice[i].auction_id == item.sourceId) {
            if(tbprice[i].promoPrice != "") {
              price.push(tbprice[i].promoPrice);
            } else {
              price.push(item.price);
            }
            if(tbprice[i].feedbackCount != "") {
              discuss.push(tbprice[i].feedbackCount);
            } else {
              discuss.push(item.feedbackCount);
            }
          }
        }
        item["Discuss"] = discuss[n];
        item["cprice"] = price[n];
      });
      _self.getPricearea(_self, price);//计算价格区间
      _self.findRule();

    }).error(function() {
      $.each(data1.tkList, function(i, item) {
        item["Discuss"] = item.feedbackCount;
        item["cprice"] = item.price;
      });
      _self.getPricearea(_self, price);
      _self.findRule();
    });
  },
  defaultPage: function() {
    var len;
    $(".page1").html("");
    len = $(".samelist [data-tbid]").length;
    $(".J_num").html(len);
    if(len > numPerPage1) {
      this.pager(1);//分页
    }
    if (len < 1) {
      $(".samelist").html('<p class="wh"></p>');
    }
  },
  pager: function(a) {
    var currentPage = a, //当前页数
        itemList = $(".samelist").find(".sameli"),
        numRows = itemList.length,
        numPages = Math.ceil(numRows / numPerPage1);
        itemList.hide().slice((currentPage - 1) * numPerPage1, currentPage * numPerPage1).show();
    new Pager(".page1",{
      current: currentPage,
      total: numPages
    })
  },
  pagerEvent: function() {
    var self = this;
    $(document).on({click: function(ev) {
      ev.preventDefault();
      var currentPage = $(ev.target).data("v");
      window.scrollTo(0,0);
      self.pager(currentPage);
    }},".page1 a");
  },
  changeOrder: function() {
    var _self = this,
        sortlist = $(".sort_tab [data-sorttype]");
    sortlist.on("click", function(ev) {
      sortlist.removeClass("on");
      $(this).addClass("on");
      _self.findRule();
    });
  },
  findRule: function() {//复合查询
    var newArr = [],
        rule1 = $(".sub-list").find(".red").data("rule"),
        rule2 = $(".jq_search").attr("data-find"),
        newArr = data1.tkList.concat(newArr);
    this.getRule(rule1, newArr);
    this.getRule(rule2, newArr);
    this.sortType(newArr);
  },
  getSort: function(arr, prop, desc) {
    var len = arr.length,self = this;
    for(i = 0; i < len; i += 1) {
      for (j = len - 1; j >= 1; j--) {
        var pre_val = parseFloat(arr[j - 1][prop]),
            cur_val = parseFloat(arr[j][prop]),
            change = (desc && pre_val < cur_val) || (!desc && pre_val > cur_val);
        if (change) {
          var temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  },
  sortType: function(newArr) {
    var self = this,arrs = [],
        order = $(".sort_tab").find("li.on").data("sorttype");
    if(order == "salesOri") {
      var sArr1 =  self.getSort(newArr, order, true),
          sArr1_sales = _.groupBy(sArr1, 'salesOri'); //找出销量相同

      for (n in sArr1_sales){
        var arrPrice = self.getSort(sArr1_sales[n], "cprice", false);//销量相同按价格降序
        var sArr1_prices = _.groupBy(arrPrice, 'cprice');
        /*for(k in sArr1_prices){
          cprice_creditGrade = self.getSort(sArr1_prices[k], "creditGrade", true).concat(sArr1_sales[n])
        }*/
        /*var sArr1_prices = _.groupBy(sArr1_sales[n], 'cprice');
        for(k in sArr1_prices){
          sArr1_sales[n] = self.getSort(sArr1_prices[k], "creditGrade", true).concat(sArr1_sales[n])
        }*/
        //arrs = cprice_creditGrade.concat(arrs);
        arrs = arrPrice.concat(arrs);
      }
      window.newData = arrs;
      this.tplSame();
    }
    if(order == "creditGrade") {
      var sArr1 =  self.getSort(newArr, order, true),
          sArr1_creditGrade = _.groupBy(sArr1, 'creditGrade');
      for (n in sArr1_creditGrade){
        arrs = self.getSort(sArr1_creditGrade[n], "cprice", false).concat(arrs);
      }
      window.newData = arrs;
      this.tplSame();
    }
    if(order == "cprice") {
      var sArr1 =  self.getSort(newArr, order, true),
          sArr1_prices = _.groupBy(sArr1, 'cprice');
      for (n in sArr1_prices){
        arrs = self.getSort(sArr1_prices[n], "salesOri", true).concat(arrs);
      }
      window.newData = arrs;
      this.tplSame();
    }
  },
  getRule: function(rule, newArr) {
    var x = 0, delid = [];
    if(rule) {
      $.each(newArr, function(i, item) {
        var flag = true;        
        for (n in item) {
          if (item[n] === rule) {
            flag = false;
          }
        }      
        if(flag){
          x += 1;
          delid[x] = item["sourceId"];
        } 
      });
      $.each(delid, function(i, item) {
        for (n = 0; n < newArr.length; n += 1) {
          if(newArr[n]["sourceId"] === delid[i])
          {
            newArr.splice(n,1);
          }
        }
      });
    }
  },
  checkBox: function() {
    var self = this;
    $(".custom input:checkbox").on({
      change: function() {
        checked = !checked;
        $(this).attr("checked", checked);
        if(checked) {
          $(".jq_search").attr("data-find","yes");
          $(this).parents(".x-checkbox-wrapper").addClass("checked");
        } else {
          $(".jq_search").attr("data-find","");
          $(this).parents(".x-checkbox-wrapper").removeClass("checked");
        }
        self.findRule();
      }
    });
  },
  gloabClick: function() {
    $(document).on({
      click: function(ev) {
        ev.preventDefault();
        $(".bj_bt").hide();
        $(".sub-list span").removeClass("red");
        $(".jq_search").attr("data-find", "");
        checked = false;
        $(".x-checkbox-wrapper").removeClass("checked");
        $(".sort_tab li").eq(0).trigger('click');
      }
    }, ".J_gloab");
  },
  changRule: function() {
    var self = this;
    $(document).on({
      click: function(ev) {
        var el = $(ev.currentTarget);
        $(".sub-list span").removeClass("red");
        $(this).addClass("red");
        $(".bj_bt").show();
        $(".J-find-list").html($(this).data("id"));
        self.findRule()
      }
    },".sub-list span");
  },
  alimama: function() {
    (function(win,doc){ 
      var o = { 
        pid: "mm_51696538_6132628_21414269",/*推广单元ID，用于区分不同的推广渠道*///finding
        appkey: "",/*通过TOP平台申请的appkey，设置后引导成交会关联appkey*/ 
        unid: ""/*自定义统计字段*/ 
      }; 
      win.alimamatk_onload = win.alimamatk_onload || []; 
      win.alimamatk_onload.push(o); 
    })(window,document);
  },
  getParam: function () {
    var _href = location.href;
    if (_href.search("isauto=1") != -1) {
      this.setCookie();
    } else {
      this.alimama();
    }
  },
  setCookie: function() {
    var date = new Date(),
        expiresDays = 1; 
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); 
    document.cookie = "isauto=1;expires=" + date.toGMTString();
  },
  getCookie: function() {
    var self = this;
        strCookie = document.cookie,
        arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){ 
      var arr = arrCookie[i].split("="); 
      if(arr[0] == "isauto") {
        return;
      }
    }
    self.getParam();
  }
};
var instance = null;
SameList.getInstance = function() {
  if(instance == null) {
    return instance = new SameList();
  }
  return instance;
}
SameList.getInstance();