const request = require('request');
const iconv = require('iconv-lite');
// const fs = require('fs');
const cheerio = require('cheerio');
// var nodeExcel = require('excel-export');
const xlsx = require('xlsx');

const fetchIt = (url, method, encoding, callback)=> {
  request({
    url: url,
    method: method,
    encoding: null,
    // proxy: 'http://127.0.0.1:1087',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    }
  }, function(err, res, body) {
    body = iconv.decode(body, encoding);
    if (err) {
      console.log(err);
    } else {
      callback(body);
    }
  })
}

const main =() =>{
  let result = []
  fetchIt('https://cnodejs.org/', 'get', 'utf-8', function(body) {
    var $ = cheerio.load(body);
    $('#topic_list').find('.cell').each(function(i, v) {
      var title = $(v).find('.topic_title').text();
      var href = 'https://cnodejs.org' + $(v).find('.topic_title').attr('href');
      result.push([title,href]);
    });
    let re = exportExcel(result)
    // writeFile(re)
    console.log('finish')
  })
}

// const writeFile = (datas) =>{
//   fs.writeFile(__dirname + '/test.xls', datas, {flag: 'a'}, function (err) {
//      if(err) {
//       console.error(err);
//       } else {
//          console.log('写入成功');
//       }
//   });
// }

const exportExcel = (datas) => {
  let arr = [];
  arr.push(['title','href'])
  arr = arr.concat(datas);
  let arrayWorkSheet = xlsx.utils.aoa_to_sheet(arr);
  let workBook = {
    SheetNames: ['arrayWorkSheet'],
    Sheets: {
      'arrayWorkSheet': arrayWorkSheet,
    }
  };
  // 将workBook写入文件
  xlsx.writeFile(workBook, "./aa.xlsx");
}


main();

