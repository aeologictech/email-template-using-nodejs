const express = require('express');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const viewPath =  path.resolve(__dirname, './templates/views/');
const partialsPath = path.resolve(__dirname, './templates/partials');

app.use(express.static(path.join(__dirname, './public')))
app.post('/send-mail', (req, res) => {
  res.status(200).send({
    status: "200",
    message: 'Mail Sent!'
  })
  sendMail();
})
const sendMail = () => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'purtiaggarwal1997@gmail.com',
      pass: 'purti@@22'
    }
  });
  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.handlebars',
      // partialsDir: viewPath,
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: partialsPath,
      express
    },
    viewPath: viewPath,
    extName: '.handlebars',
  }))

  var mailOptions = {
    from: 'purtiaggarwal1997@gmail.com',
    to: 'purtiaggarwal1997@gmail.com',
    subject: 'Sending Email using Node.js',
    template: 'index',
    attachments: [
      { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg')}
    ]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

app.listen(port , () => {
    console.log(`server up to ${port}`)
}) 