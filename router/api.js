var express = require('express');
var app = express();
var getweb = require('../modules/getweb.js');
const routes = require('express').Router();
var request = require("request");
var http = require("http");
var rp = require('request-promise');
var cheerio = require("cheerio");

routes.get("/",function(req,res,next){
    var data=[];
        //canthoinfo
        rp("http://www.canthoinfo.com/index.asp")
            .then(function (html) {
                var $ = cheerio.load(html);
                $('table[background="nen-khungtron.jpg"] tr td table tr td table').each(function (i,item) {
                    var title = $(this).find('tr:first-child td font[face="Times New Roman"]').text();
                    var more_chitiet = $(this).find('tr:nth-child(2) td').text();
                    var link = $(this).find("a").attr('href');
                    var chuthich = title;
                    var date = "";
                    var page = "canthoinfo";
                    var url = "canthoinfo.com";
                    var classCss="badge badge-danger";
                    var domhtml = { "title": title, "link": link, "chuthich": chuthich, "more_chitiet": more_chitiet, "date": date, "page": page, "url": url,"class":classCss };
                    data.push(domhtml);
                });
               // res.json(data);
               //console.log(html);

            })
            .catch(function (err) {
               console.error(err)
            });

        //end canthoinfo

        //tuyendungplus
        rp("http://tuyendungplus.com/")
            .then(function (html) {
                   var $ = cheerio.load(html);
                    $('div.diventry>div.item>table>tbody>tr').each(function (i,item) {
                    var title = $(this).find("a span").text();
                    var link = $(this).find("a").attr("href");
                    var chuthich = $(this).find("div:nth-child(2) h2 a span").text();
                    var more_chitiet = $(this).find(".item-chitiet").text();
                    var date = $(this).find("span[itemprop='datePosted']").text();
                    var page = "tuyendungplus";
                    var url = "tuyendungplus.com";
                    var classCss="badge badge-success";
                    var domhtml = { "title": title, "link": link, "chuthich": chuthich, "more_chitiet": more_chitiet, "date": date, "page": page, "url": url,"class":classCss };
                    data.push(domhtml);
                 }); 
               //console.log(html);

            })
            .catch(function (err) {
               console.error(err)
            });


            rp("http://tuyendungplus.com/?p=2")
            .then(function (html) {
                   var $ = cheerio.load(html);
                    $('div.diventry>div.item>table>tbody>tr').each(function (i,item) {
                    var title = $(this).find("a span").text();
                    var link = $(this).find("a").attr("href");
                    var chuthich = $(this).find("div:nth-child(2) h2 a span").text();
                    var more_chitiet = $(this).find(".item-chitiet").text();
                    var date = $(this).find("span[itemprop='datePosted']").text();
                    var page = "tuyendungplus";
                    var url = "tuyendungplus.com";
                    var classCss="badge badge-success";
                    var domhtml = { "title": title, "link": link, "chuthich": chuthich, "more_chitiet": more_chitiet, "date": date, "page": page, "url": url,"class":classCss };
                    data.push(domhtml);
                 }); 
            

            })
            .catch(function (err) {
               console.error(err)
            });

            rp("http://tuyendungplus.com/?p=3")
            .then(function (html) {
                   var $ = cheerio.load(html);
                    $('div.diventry>div.item>table>tbody>tr').each(function (i,item) {
                    var title = $(this).find("a span").text();
                    var link = $(this).find("a").attr("href");
                    var chuthich = $(this).find("div:nth-child(2) h2 a span").text();
                    var more_chitiet = $(this).find(".item-chitiet").text();
                    var date = $(this).find("span[itemprop='datePosted']").text();
                    var page = "tuyendungplus";
                    var url = "tuyendungplus.com";
                    var classCss="badge badge-success";
                    var domhtml = { "title": title, "link": link, "chuthich": chuthich, "more_chitiet": more_chitiet, "date": date, "page": page, "url": url,"class":classCss };
                    data.push(domhtml);
                 }); 
             

            })
            .catch(function (err) {
               console.error(err)
            });

            //end tuyendungplus

            //livecantho

             rp("http://livecantho.com")
            .then(function (html) {
                   var $ = cheerio.load(html);
                     $("div.jazin-jobs .jazin-box").each(function (i, item) {
                        var title = $(this).find('h4.jazin-title').text();
                        var link = $(this).find("h4.jazin-title a").attr('href');
                        var more_chitiet = $(this).find("div.article-content").text();
                        var chuthich=title;
                        var date = $(this).find("div.article-content p:last-child").text();
                        var page = "livecantho";
                        var url = "livecantho.com";
                        var classCss="badge badge-warning";
                        var domhtml = { "title": title, "link":"live"+link, "chuthich": chuthich, "more_chitiet": more_chitiet, "date": date, "page": page, "url": url,"class":classCss };
                        data.push(domhtml);
                    });
              res.render("pages/index",{"title":"Tuyển dụng",datas:data});
            //  res.json(data);

            })
            .catch(function (err) {
               console.error(err)
            });

            //end livecantho

});



//canthoinfo
routes.get("/canthoinfo/:link", function (req, res) {
    var link = "http://canthoinfo.com/" + req.params.link;
    request(link, function (err, response, body) {

        if (!err && response.statusCode == 200) {
            var $ = cheerio.load(body);
            
            var data = $('table[cellpadding="3"]').html();
            if(data!=null){
                //replace logo
                var jquery2 = cheerio.load(data);
                var logo = jquery2("img").attr("src");//lay logo

                data = data.replace(logo, "http://canthoinfo.com/" + logo);

                // res.render("chitiet",{chitiet:data});
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
          	    res.write('<title>Thông tin tuyển dụng</title>');
                res.write(data);
                res.end();
            }
            else{
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write('<title>Thông tin tuyển dụng</title>');
                res.write("Bạn có thể đến đường dẫn sao: <a href="+link+">Xem chi tiết</a>");
                res.end();
            }
            
        }
        else {
            console.log("error");
        }

    });
});

//tuyendungplus
routes.get("/tuyendungplus/:link", function (req, res) {
    var link_url = "http://tuyendungplus.com/" + req.params.link;
        request(link_url, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                var $ = cheerio.load(body);
                var chuoi = '<div class="box">';
                chuoi += $("div.titlepageview").html();
                if(chuoi!=null){
                    var css = "<style>.box{width:1000px;margin:0px auto;padding:20px;line-height:30px;" +
                        "box-sizing:border-box;box-shadow:0px 0px 3px #5d5d5d;} h1{text-align:center;color:#000;padding:10px 0px;font-size:25px;border-bottom:2px solid rgba(0,145,234,1)}" +
                        " span.color-view{position:relative;width:100%;}span.color-view:before{content:'';background:red;width:10px;height:10px;display:block;position:absolute;top:4px;left:-16px;}";

                    $("div.divview").each(function (i, item) {
                        chuoi += $(this).html() + "<br/>";
                    });

                    chuoi += "</div>" + css;

                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write('<title>Thông tin tuyển dụng</title>');
                    res.write(chuoi);
                    res.end();
                }
                else{
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write('<title>Thông tin tuyển dụng</title>');
                    res.write("Bạn có thể đến đường dẫn sao: <a href="+link_url+">Xem chi tiết</a>");
                    res.end();
                }
            }
            else {
                console.log("error");
            }

        });
});

//livecantho
routes.get("/livecantho/:live/:link",function(req,res){
    ///index.php?option=com_jobs&view=detailjob&id=6554
       var link = "http:/"+req.originalUrl;
       var link2 = link.replace("livecantho","livecantho.com");
    request(link2, function (err, response, body) {

        if (!err && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var data = $("div.right-c-m-jobs").html();
            if(data!=null){
                //replace logo
                    var jquery2 = cheerio.load(data);
                    var logo = jquery2("img").attr("src");//lay logo
                    var css ="<style>div.jazin-box-jobs{display:none;}</script>";
                    
                    data = data.replace(logo, "http://livecantho.com/" + logo);
                
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write('<title>Thông tin tuyển dụng</title>');
                res.write(data+css);
                res.end();
            }
            else{
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write('<title>Thông tin tuyển dụng</title>');
                    res.write("Bạn có thể đến đường dẫn sao: <a href="+link2+">Xem chi tiết</a>");
                    res.end();
            }
        
            
        }
        else {
            console.log("error");
        }

    });
});


//careerlink
routes.get("/careerlink/tv/:link/:link2/:link3",function(req,res){
    
      var link = "http://www.careerlink.vn/"+req.params.link+"/"+req.params.link2+"/"+req.params.link3;
      //console.log(link);
     ;
      request(link, function (err, response, body) {

        if (!err && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var title = $("div.page-header h1").text();
            var title2="<h1 style='color:red;'>"+title+"</h1>";
            var data = $("div.row").html();
            if(data!=null){
                    var css="<style>div.col-sm-5{display:none;} .job-data>h2:nth-child(3){display:none;}p>a.tag-lg{display:none;}</style>";
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write('<title>Thông tin tuyển dụng</title>');
                    res.write(title2+data+css);
                     res.end();
            }
            else{
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write('<title>Thông tin tuyển dụng</title>');
                    res.write("Bạn có thể đến đường dẫn sao: <a href="+link+">Xem chi tiết</a>");
                    res.end();
            }
           // console.log(data);
            
        }
        else {
            console.log("error");
        }

    });
});



module.exports = routes;