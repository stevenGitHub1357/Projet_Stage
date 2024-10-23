const {Pool,Client} = require('pg')
const { Sequelize } = require('sequelize');
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

const dashboardlean = new Pool({
  host: '192.168.12.232',
  user: 'postgres',
  password: 'postgres',
  database: "dashboardlean2024",
  port:5432,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // Optionnel: pour éviter les erreurs SSL
    }
  }
})
dashboardlean.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!: dashboardlean');
  }
});


module.exports = {kanboard,dashboardlean};

