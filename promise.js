var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rp = require('request-promise');
var cheerio = require("cheerio");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static(__dirname + '/public'));


app.get("/home",function(req,res){
    var data=[];
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
              res.json(data);

            })
            .catch(function (err) {
               console.error(err)
            });

});






app.use('*',function(req,res){
				res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
				res.write('<title>Không tồn tại</title>');
                res.write("Không tồn tại đường dẫn này!");
                res.end();
});
app.listen(process.env.PORT || 8888, function () {
	console.log("dang lắng nghe kết nối");
});

