(function(){
  var searchfun={
    url:{
      searchlist:"http://bijia.taotaosou.com/tkList.html",
      find:"http://bijia.taotaosou.com/recom.html"
      //searchlist:"http://172.16.31.110:8080/tkList.html",
      //find:"http://172.16.31.110:8080/recom.html"
    },
    getdata : function(name){
      return $("#J_datainfo").data(name);
    },
    carousel:function(){
      //var data = {"resultType":1,"recomList":[{"ttsid":1975742394,"sourceId":"35986364227","sellerId":0,"promoPrice":"35.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://detail.tmall.com/item.htm?id\u003d35986364227\u0026rn\u003df5cc7d8496f2775ec6e66c9f462f1d5a","commissionNum":"546","itemLocation":"广东省 广州市","nick":"水晶伊人十七坊服饰旗舰店","picUrl":"http://img01.taobaocdn.com/bao/uploaded/i3/11893030642006904/T1TAITFcxcXXXXXXXX_!!0-item_pic.jpg","price":"98.00","title":"春夏时尚休闲新款衫长袖甜美圆领修身型泡泡袖蕾丝衬衣 女装 黑白"},{"ttsid":2226799488,"sourceId":"37530807190","sellerId":0,"promoPrice":"29.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d37530807190","commissionNum":"155","itemLocation":"其它","nick":"酷美童鞋","picUrl":"http://img03.taobaocdn.com/bao/uploaded/i3/T1HltqFbVcXXXXXXXX_!!0-item_pic.jpg","price":"98.00","title":"【vip购优汇】OL韩版职业衬衫性价比超高 质量保证 不好包退换"},{"ttsid":2179238544,"sourceId":"37278649978","sellerId":0,"promoPrice":"728.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d37278649978","commissionNum":"27","itemLocation":"浙江 杭州","nick":"索菲丝尔旗舰店","picUrl":"http://img01.taobaocdn.com/bao/uploaded/i4/T1PEOxFC4XXXXXXXXX_!!0-item_pic.jpg","price":"728.00","title":"索菲丝尔2014春季新款真丝花衬衫女长袖桑蚕丝长袖衬衣女韩版翻领"},{"ttsid":1364011025,"sourceId":"17414265628","sellerId":0,"promoPrice":"20.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d17414265628\u0026","commissionNum":"0","itemLocation":"上海市","nick":"紫竹清翎","picUrl":"http://img02.taobaocdn.com/bao/uploaded/i4/10763024317369949/T1UUlpFmXgXXXXXXXX_!!0-item_pic.jpg","price":"40.00","title":"2013新款韩版女装短袖时尚修身衬衫女士泡泡袖衬衫职业女衬衣特价"},{"ttsid":2220369379,"sourceId":"37522808583","sellerId":0,"promoPrice":"69.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d37522808583","commissionNum":"256","itemLocation":"江苏省 苏州市","nick":"英伦凤旗舰店","picUrl":"http://img02.taobaocdn.com/bao/uploaded/i1/T1tMTlFzhXXXXXXXXX_!!0-item_pic.jpg","price":"418.00","title":"2014春季韩版新款薄款小清新森女纯色雪纺衬衫长袖甜美休闲女修身"},{"ttsid":1118914088,"sourceId":"14985103640","sellerId":0,"promoPrice":"35.90","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d14985103640\u0026spm\u003d2014.12313082.0.0","commissionNum":"428","itemLocation":"福建 泉州","nick":"韩思菲旗舰店","picUrl":"http://img03.taobaocdn.com/bao/uploaded/i2/T1vUfjFrNcXXXXXXXX_!!0-item_pic.jpg","price":"59.00","title":"春装新款2014韩版大码女装职业衬衣长袖荷叶边修身打底衬衫女上衣"},{"ttsid":1126933993,"sourceId":"14808858338","sellerId":0,"promoPrice":"48.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d14808858338\u0026spm\u003d2014.12313082.0.0","commissionNum":"183","itemLocation":"浙江 金华","nick":"龙鼎服饰专营店","picUrl":"http://img01.taobaocdn.com/bao/uploaded/i4/T15FqZFANaXXXXXXXX_!!0-item_pic.jpg","price":"116.00","title":"【VIP购优汇】旗顿 春装新款衬衫女短袖V领修身职业工装韩版衬衣"},{"ttsid":2027555186,"sourceId":"36417540513","sellerId":0,"promoPrice":"74.50","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://detail.tmall.com/item.htm?id\u003d36417540513\u0026rn\u003d6f3f7bf6fadc9053738cbf38d7d76af3","commissionNum":"215","itemLocation":"广州市","nick":"洛纯旗舰店","picUrl":"http://img03.taobaocdn.com/bao/uploaded/i3/T1EZlrFCNfXXXXXXXX_!!0-item_pic.jpg","price":"149.00","title":"LOSPUE\\/洛纯 2014新款纯色衬衫女长袖韩版修身衬衫 女装打底衣服"},{"ttsid":2060607973,"sourceId":"36702916494","sellerId":0,"promoPrice":"22.50","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d36702916494","commissionNum":"1754","itemLocation":"其它","nick":"小夏米92","picUrl":"http://img04.taobaocdn.com/bao/uploaded/i2/T1M_CsFtxcXXXXXXXX_!!0-item_pic.jpg","price":"59.00","title":"韩版麻棉小清新翻领长袖衬衫 波点船锚小图案衬衣打底衫女春装"},{"ttsid":2214854737,"sourceId":"37465289448","sellerId":0,"promoPrice":"78.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d37465289448","commissionNum":"313","itemLocation":"浙江 杭州","nick":"国内正品鞋服批发","picUrl":"http://img04.taobaocdn.com/bao/uploaded/i4/T1EHOHFDpaXXXXXXXX_!!0-item_pic.jpg","price":"115.00","title":"长袖女士衬衫2014春装新款条纹上衣 韩版雪纺蕾丝花边拼接衬衣女"},{"ttsid":1697018129,"sourceId":"27207024426","sellerId":0,"promoPrice":"48.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d27207024426\u0026","commissionNum":"102","itemLocation":"江苏 无锡","nick":"金金和亚军","picUrl":"http://img03.taobaocdn.com/bao/uploaded/i4/T1Zg8TFslkXXXXXXXX_!!0-item_pic.jpg","price":"48.00","title":"2014春款女装欧美中长款立体花镂空蝙蝠衬衫白色棉麻女士衬衫女"},{"ttsid":2216809537,"sourceId":"37470910407","sellerId":0,"promoPrice":"69.00","onSale":true,"isAd":false,"maxSale":false,"maxScore":false,"minPrice":false,"creditGrade":0,"salesOri":0,"priceCompare":0,"similarity":0,"feedbackCount":0,"clickUrl":"http://item.taobao.com/item.htm?id\u003d37470910407","commissionNum":"6","itemLocation":"山东省 青岛市","nick":"乐唯尔旗舰店","picUrl":"http://img04.taobaocdn.com/bao/uploaded/i4/T1k1SHFv4bXXXXXXXX_!!0-item_pic.jpg","price":"158.00","title":"乐唯尔 2014春装新款韩版烫钻 牛仔翻领长袖衬衫 打底衫女衬衣"}]};
      $.getJSON(searchfun.url.find+"?callback=?&sourceId="
        +searchfun.getdata("sourceid")
        +"&cid="+ searchfun.getdata("cid")
        +"&num=12&website="+searchfun.getdata("website")
        ,function(data){
          var htmlli = '';

          $.each(data.recomList, function(i, n){
            htmlli+='<li><a href="/product-'+ n.ttsid +'.html" target="_blank"><img src="'+ n.picUrl  +'_120x120.jpg" /></a></li>';
          });


          $(".search_side .list_ul").append(htmlli);


          var obj = {
            that : $('.side_list .list_ul'),
            height : 120,
            width : 120,
            margin : 20,
            margin_index :0,
            indexcount : 0,
            indextabhtml:'',
            top : false,
            left : true,
            autofun :null
          },linum = obj.that.find("li").size(),emptyli="<li></li>";

          obj.indexcount = Math.ceil(linum/3);

          if(obj.indexcount*3 - linum ===2){
            $(".search_side .list_ul li").eq(obj.indexcount*2-1).before(emptyli);
          }

          for(var i=0;i<obj.indexcount;i++){
            obj.indextabhtml+='<span></span>';
          }
          $(".search_side .list_ul").css("width",obj.indexcount*120+"px");
          $('.search_side .list_tab').html(obj.indextabhtml).find('span').eq(0).addClass("on");

          $('.search_side .list_tab span').click(function(){
            if(!$(this).hasClass("on")){
              obj.margin_index = $('.search_side .list_tab span').index($(this));
              ani();
            }
          });

          function ani(){
            obj.that.stop().animate({
              left: "-" + (obj.margin_index * 120)
            },450, function() {
              $('.search_side .list_tab span').removeClass("on").eq(obj.margin_index).addClass("on");
              if(obj.margin_index === (obj.indexcount-1))
              {
                obj.margin_index=0;
                //console.log(obj.margin_tab);
              }
              else
              {
                obj.margin_index+=1;
                //console.log(obj.margin_tab);
              }
            });
          }

          function settime(){
            obj.autofun = setInterval(function(){ani()},2200);
          }

          $(".side_border").hover(function(){
            clearInterval(obj.autofun);
          },function(){
            obj.autofun = setInterval(function(){ani()},2200);
          });

          $('.search_side').show();
          settime();

        });
    }
  };
  searchfun.carousel();
})();