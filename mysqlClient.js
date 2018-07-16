var fs = require('fs')
var tunnel = require('tunnel-ssh');
var mysql = require('mysql')
var xlsx = require('node-xlsx');
var config = require('./config/mysqlConfig')
var sendEmail = require('./mailClient')


var writeExcelFile = (headers,data,name) => {
    fs.writeFileSync('./output/'+name+'.xlsx',xlsx.build([{ name:'sheet1', data:[headers.map(f => f.title)]
            .concat(data).concat([headers.map(n => n.sum)])}]),{'flag':'w'});
    console.log("....build excel success!")
}

var tl = tunnel(config.ssh,(err,server) => {
    if(err) console.log(err);

    var connection = mysql.createConnection(config.mysql);
    var count = require('./config/query').config.length;
    require('./config/query').config.map(conf => connection.query(conf.query,(error, results, fields) => {
        if (error) throw error;
        var headers = fields.map(f =>{return {title:f.name, sum:"",sign:conf.sum.includes(f.name)}});
        writeExcelFile(headers,results.map(elem => headers.map(column => {
            if(column.sign) column.sum = Number(column.sum) + Number(elem[column.title])
            return elem[column.title]
        })),conf.fileName);
        count = count -1;
        if(count === 0) sendEmail({attachments:require('./config/query').config
                .map(elem => {return {filename:elem.fileName+".xlsx", path:'./output/'+elem.fileName+'.xlsx'}})});
    }))
})
