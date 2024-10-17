const {Pool,Client} = require('pg')
const mysql = require('mysql')

// MQ
  //Ticket
const kanboard = mysql.createPool({
  host: '192.168.12.235',
  user: 'jouve',
  password: 'xtr57ec',
  database: "kanboard",
  port:3306
});
kanboard.getConnection(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!: kanboard');
  }
});


module.exports = {kanboard};

