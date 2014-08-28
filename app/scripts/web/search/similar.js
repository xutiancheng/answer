var numPerPage2 = 15, iTimer = null;
function Search() {
  this.init();
}
Search.prototype = {
  init: function() {
    this.sameList();
    this.similarList();
    this.getSameProducts();
    this.pagerEvent();
  },
  checkTab: function(elem, i) {
    tab.removeClass("current");
    elem.addClass("current");
    wrap.hide();
    wrap.eq(i).show();
  },
  sameList: function() {
    var self = this;
    tab.eq(0).on("click", function() {
      if(e == "0") return;
      self.checkTab($(this), 0);
    });
  },
  similarList: function() {
    var self = this,
        param = "&sourceId=" + sourceId + "&website=" + website + "&pageSize=40";
    tab.eq(1).on("click", function() {
      self.checkTab($(this), 1);
      if (similarflag == false) {
        self.request(searchApi[1] + param, self.similarCallBack, self);   
      }  
    });
    if(e == "0") { 
      tab.eq(1).trigger('click');
    }
    $(document).on({
      click:function(ev) {
        tab.eq(1).trigger('click');
      }
    }, ".J_MO")
  },
  similarCallBack: function(_self){
    if (data.tkList.length < 1) {
      $(".bj-no").show();
      return;
    }
    $(".like-item").prepend(_.template($("#tpl-similar").html(), data));
    similarflag = true;
    _self.setimgsrc("data-similar-listpic");
    if (data.tkList.length > numPerPage2) {
      _self.pager(1);
    }
  },
  request: function(_url, cb, node, website, sourceId) {
    var _self = this;
    $.ajax({ 
      url: _url,
      cache: false,
      dataType: "jsonp",
      jsonp: "callback",
      success: function(data) {
        window.data = data;
        cb(_self, node, website, sourceId);
      }
    });
  },
  request2: function(_url, cb, node, website, sourceId) {
    var _self = this;
    $.ajax({ 
      url: _url,
      cache: false,
      dataType: "jsonp",
      jsonp: "callback",
      success: function(data) {
        cb(_self, node, website, sourceId, data);
      }
    });
  },
  getSameProducts: function() {
    var self = this;
    $(document).on({
      mouseenter: function() {
        var vi = $(this),
            website = $(this).data("website"),
            sourceId = $(this).data("tbid"),
        param = "&sourceId=" + sourceId + "&website=" + website + "&pageSize=3";
        clearTimeout(iTimer);
        $(this).addClass("on");
        if($(this).data("show") == true) {return false;}
        iTimer = setTimeout(function() {
          self.request2(searchApi[0] + param, self.loadSameProducts, vi, website, sourceId);
        },300);
      },
      mouseleave: function() {
        $(this).removeClass("on");
      }
    }, ".likeli");
  },
  loadSameProducts: function(_self, node, website, sourceId, data) {
    var tbid = [], rul, price = [], sales = [], ir = [];;
    /*
    **当返回同款不为空时,取淘宝折扣价
    */
    if(data.tkList.length) {
      data.tkList["website"] = website;
      data.tkList["sourceId"] = sourceId;
      $.each(data.tkList, function(i, item) {
        tbid.push(item.sourceId);
      });
      rul = searchApi[2] + "&auction_ids=" + tbid.join(",") + "&feature_names=promoPrice&from=taobao_search";
      $.getJSON(rul,function(tbprice){
        node.data("show", true);
        $.each(data.tkList, function(n, item) {
          for(var i = 0; i < tbprice.length; i +=1) {
            if(tbprice[i].auction_id == item.sourceId) {
              if(tbprice[i].promoPrice != "") {
                price.push(tbprice[i].promoPrice);
              } else {
                price.push(item.price);
              }
            }
          }
          item["cprice"] = price[n];
          if(Number(item["cprice"]) > 1000){
            item["cprice"] = Number(item["cprice"]).toFixed(0);
          }
          sales.push(item["salesOri"]);
        });
        $.each(data.tkList, function(i, item) {
          if(item.cprice == Math.min.apply(this,price)) {
            ir.push(Number(item.salesOri));
            if(item.salesOri == Math.max.apply(this,ir)){
              item["priceFlag"] = 1;
            }
          }
        });
        _self.showSameProducts(node, data);
      });
    }
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
  showSameProducts: function(node, data) {
    var arrNew = this.getSort(data.tkList, "cprice", false);
    window.data = arrNew;
    node.find(".sameprd").html(_.template($("#tpl-getInfo").html(), data));
  },
  setimgsrc: function(proto) {
    $("["+ proto +"]").each(function(i, item) {
      $(item).attr("src", $(item).attr(proto));
      $(item).removeAttr(proto);
    });
  },
  pager: function(a) {
    var currentPage = a, //当前页数
        itemList = $(".likelist").find(".likeli"),
        numRows = itemList.length,
        numPages = Math.ceil(numRows / numPerPage2);
        itemList.hide().slice((currentPage - 1) * numPerPage2, currentPage * numPerPage2).show();
    new Pager(".page2",{
      current: currentPage,
      total: numPages
    })
  },
  pagerEvent: function() {
    var self = this;
    $(document).on({click: function(ev) {
      var currentPage = $(ev.target).data("v");
      self.pager(currentPage);
    }},".page2 a");
  }
};
var instance = null;
Search.getInstance = function () {
  if(instance ==  null) {
    return instance = new Search();
  }
}
Search.getInstance();
