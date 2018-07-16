var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport(require("./config/emailConfig"));

module.exports = (body) => {

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"邮件发送测试" <daqo_gitlab@163.com>', // sender address
        to: 'suewangyihe0@163.com', // list of receivers
        subject: '数据分析周报', // Subject line
        text: '请查看附件', // plain text body
        html: '' ,// html body
        attachments:body.attachments
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};