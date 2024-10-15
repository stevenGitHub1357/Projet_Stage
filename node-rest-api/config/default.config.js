const {Pool,Client} = require('pg')
const { Sequelize } = require('sequelize');

const pool = new Pool({
  host: '192.168.12.232',
  user: 'postgres',
  password: 'postgres',
  database: "kpi",
  port:5432,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // Optionnel: pour éviter les erreurs SSL
    }
  }
})
pool.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!: kpi');
  }
});


const defaultSequelize = new Sequelize('kpi', 'postgres', 'postgres', {
  host: '192.168.12.232',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
  },
});

module.exports = {defaultSequelize, pool};

