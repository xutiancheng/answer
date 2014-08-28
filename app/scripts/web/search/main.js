(function(){
  var searchfun={
        url:{
          searchlist:"http://bijia.taotaosou.com/tkList.html",
          find:"http://bijia.taotaosou.com/recom.html"
          //searchlist:"http://172.16.31.110:8089/tkList.html",
          //find:"http://172.16.31.110:8089/recom.html"
        },
        getdata : function(name){
          return $(".list_tab").data(name);
        },
        templist : {
          showcont : "#showcont",
          ajaxload : ".ajaxload",
          page : ".page",
          listattr :".search_list .list_tab",
          ajaxflag : true
        },
        webSiteMap : {
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
        },
        samehtml : function(data,pagenum){

         var htmlul = '<ul class="samelist">',htmlli = "",website="",link ="";

          $.each(data.tkList, function(i, n){
            if(n.webSite === undefined)
            {
              website = 'taobao';
            }
            else
            {
              website = n.webSite;
            }
            if(n.webSite === undefined || n.webSite === 'taobao' || n.webSite === 'tmall' )
            {
              link = "/product-"+ n.ttsid +".html";
            }
            else
            {
              link = n.clickUrl;
            }
            htmlli+='<li data-tbid="'+ n.sourceId +'" data-price="'+ n.price +'">'+
                '<div class="list_img"><a href="'+ link +'" target="_blank"><img src="http://img.taotaosou.cn/tts-shop/images/ajax_load.gif" data-listpic="'+ n.picUrl +'_160x160.jpg" /></a></div>'+
                '<div class="list_title"><a href="'+ link +'" target="_blank">'+ n.title +'</a></div>'+
                '<div class="list_num">销量：<span>'+ n.commissionNum +'</span>笔</div>'+
                '<div class="list_form"><img src="http://img.taotaosou.cn/tts-shop/images/shoplogo/'+ website +'.png" title="'+ searchfun.webSiteMap[website] +'" /></div>'+
                //'<div class="list_form"><img src="/images/s_logo_1.png" /></div>'+
                '<div class="list_price"><span><i>&yen;</i>'+ n.price +'</span></div>'+
                '<div class="list_btn hide"><a target="_blank" data-type="0" biz-itemid="'+ n.sourceId +'" data-rd="2" data-style="2" data-border="0"  href="'+ n.clickUrl +'"></a></div>'+
              '</li>';
          });

          htmlul += htmlli+'</ul>';
          $(searchfun.templist.ajaxload).hide();
	         $(searchfun.templist.page).html('');
          new Pager(searchfun.templist.page,{total: data.totalPageNum, current:pagenum});
          $(searchfun.templist.showcont).html(htmlul);
          searchfun.setimgsrc('data-listpic',140,140);
          searchfun.getprice();
          searchfun.templist.ajaxflag = true;
          searchfun.pageevents();
        },
       similarhtml : function(data,pagenum){

          var htmlul = '<ul class="likelist">',htmlli = "",thisurl = "",wetsite = "";

          $.each(data.tkList, function(i, n){
            wetsite = "";
            if(n.webSite !== undefined){
              wetsite = n.webSite;
            }
            if(n.ttsid === 0){
              thisurl = n.clickUrl;
            }
            else
            {
              thisurl ="/product-"+ n.ttsid +".html" ;
            }
            htmlli+='<li class="likeli" data-website="'+ wetsite +'"  data-tbid="'+ n.sourceId +'">'+
              '<div class="like_img"><a href="'+ thisurl +'" target="_blank"><img src="http://img.taotaosou.cn/tts-shop/images/ajax_load.gif" data-listpic="'+ n.picUrl +'_250x250.jpg" /></a></div>'+
              '<div class="like_title"><a href="'+ thisurl +'" target="_blank">'+ n.title +'</a></div>'+
              '<div class="like_num">销量：<span>'+ n.commissionNum +'</span>笔</div>'+
              '<div class="like_price"><i>&yen;</i>'+ n.price +'</div>'+
              '<div class="like_btn"><a href="/tk.html?website='+ wetsite +'&sourceid='+ n.sourceId +'" target="_blank">同款比价</a></div>'+
            '</li>';
          });

          htmlul += htmlli+'</ul>';
          $(searchfun.templist.ajaxload).hide();
	         $(searchfun.templist.page).html('');
          new Pager(searchfun.templist.page,{total: data.totalPageNum, current:pagenum});
          $(searchfun.templist.showcont).html(htmlul);
          searchfun.setimgsrc('data-listpic',244,244);
          searchfun.templist.ajaxflag = true;
          searchfun.pageevents();
          searchfun.getinfo();
        },
        setimg : function (i, w, h) {
        var ih = i.height();
        var iw = i.width();

        if (iw > w && iw > h) {
          if (ih > iw) {
            i.height(h);
            i.width((h / ih) * iw);
          }
          else {
            i.width(w);
            i.height((w / iw) * ih);
          }
        }
        else if (iw > w || iw > h) {
          if (ih > iw) {
            i.height(h);
          }
          else {
            i.width(w);
          }
        }
        },
        setimgsrc : function (a,w,h) {
          $.each($("[" + a + "]"), function (i, n) {
            $(this).on('load', function () {
              searchfun.setimg($(this), w, h);
            });
            $(this).attr('src', $(this).attr(a));
            $(this).removeAttr(a);
          });
        },
        getprice : function(){
          var arr = [];
          $("[data-tbid]").each(function() {
            arr.push($(this).data("tbid"));
          });

          $.getJSON("http://show.re.taobao.com/feature.htm?cb=?&auction_ids=" + arr.join(",") + "&feature_names=promoPrice&from=taobao_search", function(data){
           
              $(".sort_tab").show();
              $.each(data, function (i, n) {

                  for(var m=0;m<$("[data-tbid]").size();m++){
                    if($("[data-tbid]").eq(m).data("tbid") == n.auction_id)
                    {
                  var that = $("[data-tbid]").eq(m);
                  if(n.promoPrice * 1 < that.data("price") * 1 && n.promoPrice != ""){
                                        that.find('.list_price').html('<span><i>&yen;</i>'+ n.promoPrice +'</span><s><i>&yen;</i>'+ that.data("price") +'</s>');
                                        that.find('.list_btn a').html('去购买').addClass("nofree").parent().show();
                                        that.find('.list_btn a').attr("data-tmplid", "2638");
                                        that.find('.list_btn a').attr("data-tmpl", "80x27");
                  }
                  else
                  {
                    that.find('.list_btn a').html('去购买').addClass("nofree").parent().show();
                    that.find('.list_btn a').attr("data-tmplid", "2638");
                    that.find('.list_btn a').attr("data-tmpl", "80x27");
                  }
                    }
                  }
              });
             searchfun.getCookie();
          });
        },
        sortevents : function(){
          $(".btn_tab li").click(function(){
           if(searchfun.templist.ajaxflag === false){return false}
           if(!$(this).hasClass('on')){
             searchfun.listhtml(1,12,"salesFirst",$(this).data("tktype"));
             $("[data-tktype]").removeClass("on");
             $(this).addClass("on");
             $(searchfun.templist.listattr).data("tabtype",$(this).data("tktype"));
             $(searchfun.templist.listattr).data("sort","salesFirst");
             $(".sort_tab li").removeClass("on");
             $(".sort_tab li").eq(0).addClass("on");
           }
          });
          $(".sort_tab li").click(function(){
            if(searchfun.templist.ajaxflag === false){return false}
            if(!$(this).hasClass('on')){
            searchfun.listhtml(1,12,$(this).data("sorttype"),$(searchfun.templist.listattr).data("tabtype"));
            $(".sort_tab li").removeClass("on");
            $(this).addClass("on");
            $(searchfun.templist.listattr).data("sort",$(this).data("sorttype"));
            }
          });
        },
        pageevents : function(){
          $(".page a").click(function(){
            searchfun.listhtml($(this).data("v"),12,$(searchfun.templist.listattr).data("sort"),$(searchfun.templist.listattr).data("tabtype"));
            return false;
          });
        },
        listhtml : function(pagenum,pagesize,sort,tktype){
            if(searchfun.templist.ajaxflag === false){return}
            searchfun.templist.ajaxflag = false;
            $(searchfun.templist.ajaxload).show();
            $(searchfun.templist.showcont).html("");
            //var data = {"totalItem":5,"totalPageNum":2,"pageSize":10,"tkList":[{"ttsid":1678901369,"sourceId":"22099967053","sellerId":0,"promoPrice":"0","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":8,"salesOri":2,"priceCompare":4200,"similarity":71,"dimension":"TV","feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d22099967053","commissionNum":"2","itemLocation":"上海","nick":"徐徐168151","numIid":22099967053,"picUrl":"http://img01.taobaocdn.com/bao/uploaded/i1/T1LquSFsBaXXXXXXXX_!!0-item_pic.jpg","price":"42.00","title":"2014春装大码女士白衬衫衬衣女长袖韩版修身显瘦职业女装工装"},{"ttsid":1364011025,"sourceId":"17414265628","sellerId":0,"promoPrice":"20.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":10,"salesOri":0,"priceCompare":2000,"similarity":74,"dimension":"TV","feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d17414265628\u0026","commissionNum":"0","itemLocation":"上海 上海市","nick":"紫竹清翎","numIid":17414265628,"picUrl":"http://img01.taobaocdn.com/bao/uploaded/i4/10763024317369949/T1UUlpFmXgXXXXXXXX_!!0-item_pic.jpg","price":"40.00","title":"2013新款韩版女装短袖时尚修身衬衫女士泡泡袖衬衫职业女衬衣特价"},{"ttsid":1994156470,"sourceId":"35768150721","sellerId":0,"promoPrice":"0","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":2,"salesOri":0,"priceCompare":3800,"similarity":88,"dimension":"TV","feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d35768150721","commissionNum":"0","itemLocation":"0","nick":"天天职业装","numIid":35768150721,"picUrl":"http://img01.taobaocdn.com/bao/uploaded/i3/11525030235767027/T1TPUvFXFcXXXXXXXX_!!0-item_pic.jpg","price":"38.00","title":"白色衬衫 女长袖工作服衬衫 OL通勤衬衣 百搭衬衫 服务员工作衬衣"},{"ttsid":1957273492,"sourceId":"36013006411","sellerId":0,"promoPrice":"0","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":3,"salesOri":0,"priceCompare":3990,"similarity":72,"dimension":"TV","feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d36013006411","commissionNum":"0","itemLocation":"0","nick":"维纳丝女装","numIid":36013006411,"picUrl":"http://img01.taobaocdn.com/bao/uploaded/i2/14609030365016899/T1JBERFedeXXXXXXXX_!!0-item_pic.jpg","price":"39.90","title":"新品 ol通勤衬衫修身显瘦白色职业装 正装长袖女士衬衣"},{"ttsid":2191761265,"sourceId":"35508003147","sellerId":0,"promoPrice":"0","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":3,"salesOri":0,"priceCompare":4001,"similarity":74,"dimension":"TV","feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d35508003147","commissionNum":"0","itemLocation":"0","nick":"淘碑百货","numIid":35508003147,"picUrl":"http://img04.taobaocdn.com/bao/uploaded/i4/14329029287286456/T15.0kFeXcXXXXXXXX_!!0-item_pic.jpg","price":"40.01","title":"夏季新款女装全棉时尚修身泡泡袖ol通勤白色短袖衬衫401"}]};
            $.getJSON(searchfun.url.searchlist+"?callback=?&sourceId="
             +searchfun.getdata("sourceid")
             +"&website="+searchfun.getdata("website")
             +"&pageNum="+pagenum
             +"&pageSize="+pagesize
             +"&sort="+sort
             +"&tkType="+tktype
             ,function(data){
              if(data.tkList.length) {
                if(tktype === "same" || tktype === ""){
                  searchfun.samehtml(data,pagenum);
                }
                else if(tktype === "similar"){
                  searchfun.similarhtml(data,pagenum);
                }

                if (data.length) {
                  $(".sort_tab").show();
                }
              } else {
                $(searchfun.templist.ajaxload).hide();
                $(searchfun.templist.showcont).html("<div class='showcont_Noresult'></div>");
              }
              

            });

        },
        setside : function(){
          var that=$(".search_side"),offsettop=155;

          $(window).bind('scroll', function() {
            if(($(window).scrollTop() >= offsettop) && !that.hasClass("side_stop") ){
              that.addClass("side_stop");
            }else if(($(window).scrollTop() < offsettop) && that.hasClass("side_stop") ){
              that.removeClass("side_stop");
            }
          });
        },
        getinfo : function(){
          $(".likeli").hover(function(){
            if(searchfun.getdata("like") !== true ){return false;}
            var that =$(this),website ="",tbid = [];
            that.addClass("on");
            if(that.data("show")==="ok"){return false}
            that.data("show","ok");
           // var  data = {"totalItem":5,"totalPageNum":2,"pageSize":10,"tkList":[{"ttsid":1994156470,"sourceId":"35768150721","sellerId":0,"promoPrice":"0","onSale":true,"isAd":false,"maxSale":true,"maxScore":false,"minPrice":false,"creditGrade":2,"salesOri":0,"priceCompare":3800,"similarity":88,"dimension":"TV","feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d35768150721","commissionNum":"0","itemLocation":"0","nick":"天天职业装","numIid":35768150721,"picUrl":"http://img01.taobaocdn.com/bao/uploaded/i3/11525030235767027/T1TPUvFXFcXXXXXXXX_!!0-item_pic.jpg","price":"38.00","title":"白色衬衫 女长袖工作服衬衫 OL通勤衬衣 百搭衬衫 服务员工作衬衣"},{"ttsid":1957273492,"sourceId":"36013006411","sellerId":0,"promoPrice":"0","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":3,"salesOri":0,"priceCompare":3990,"similarity":72,"dimension":"TV","feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d36013006411","commissionNum":"0","itemLocation":"0","nick":"维纳丝女装","numIid":36013006411,"picUrl":"http://img01.taobaocdn.com/bao/uploaded/i2/14609030365016899/T1JBERFedeXXXXXXXX_!!0-item_pic.jpg","price":"39.90","title":"新品 ol通勤衬衫修身显瘦白色职业装 正装长袖女士衬衣"},{"ttsid":2191761265,"sourceId":"35508003147","sellerId":0,"promoPrice":"0","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":3,"salesOri":0,"priceCompare":4001,"similarity":74,"dimension":"TV","feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d35508003147","commissionNum":"0","itemLocation":"0","nick":"淘碑百货","numIid":35508003147,"picUrl":"http://img04.taobaocdn.com/bao/uploaded/i4/14329029287286456/T15.0kFeXcXXXXXXXX_!!0-item_pic.jpg","price":"40.01","title":"夏季新款女装全棉时尚修身泡泡袖ol通勤白色短袖衬衫401"}]};
            if($(this).data("website") != undefined)
            {
              website = $(this).data("website");
            }
            $.getJSON(searchfun.url.searchlist+"?callback=?&sourceId="
             +that.data("tbid")
             +"&website="+website
             +"&pageNum=1"
             +"&pageSize=3"
             +"&sort="
             +"&tkType=same"
             ,function(data){

                if(data.tkList.length === 0){return false;}

                $.each(data.tkList,function(i,n) {
                  tbid.push(n.sourceId);
                });

                $.getJSON("http://show.re.taobao.com/feature.htm?cb=?&auction_ids=" +  tbid.join(",") + "&feature_names=promoPrice&from=taobao_search",function(pricedata){

                  var infohtml = '<ul class="sameprd">',infohtmlli='',tempprice = '';
                  $.each(data.tkList, function(i, n){
                    tempprice = '';

	                   for(var i=0;i<pricedata.length;i++){
																					if(pricedata[i].auction_id == n.sourceId){
																								if(pricedata[i].promoPrice != "")
																							{
																								tempprice = pricedata[i].promoPrice;
																							}
																							else
																							{
																								tempprice = n.price;
																							}
																					}
	                   }


                    infohtmlli+='<li><a href="/product-'+ n.ttsid +'.html" target="_blank" tbid='+ n.sourceId +'><span class="samenum">销量： <i>'+ n.commissionNum +'</i></span>';
                    if(n.maxScore){
                      infohtmlli+='<span class="sameicon s1">信</span>';
                    }
                    if(n.maxSale){
                      infohtmlli+='<span class="sameicon s2">热</span>';
                    }
                    if(n.minPrice){
                      infohtmlli+='<span class="sameicon s3">省</span>';
                    }

                    infohtmlli+='<span class="samearrow">&gt;</span><span class="sameprice"><i>&yen;</i>'+ tempprice +'</span></a></li>';
                  });

                  infohtmlli += '<li><span class="samearrow">&gt;</span><a href="/tk.html?website='+ website +'&sourceid='+ that.data("tbid") +'" class="more" target="_blank">更多同款</a></li>';
                  infohtml += infohtmlli + '</ul>';
                  that.append(infohtml);

                });

            });
          },function(){$(this).removeClass("on")});
        },
        alimama: function() {
        (function(win,doc){ var s = doc.createElement("script"), h = doc.getElementsByTagName("head")[0]; if (!win.alimamatk_show) { s.charset = "gbk"; s.async = true; s.src = "http://a.alimama.cn/tkapi.js"; h.insertBefore(s, h.firstChild); }; var o = { pid: "mm_51696538_6132628_21414269",/*推广单元ID，用于区分不同的推广渠道*/ appkey: "",/*通过TOP平台申请的appkey，设置后引导成交会关联appkey*/ unid: ""/*自定义统计字段*/ }; win.alimamatk_onload = win.alimamatk_onload || []; win.alimamatk_onload.push(o); })(window,document);
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

  searchfun.setimgsrc('data-prdsrc',140,140);

  searchfun.listhtml(1,12,"salesFirst",$(".btn_tab li").eq(0).data("tktype"));

  searchfun.sortevents();
  searchfun.setside();
  searchfun.getCookie();
})();