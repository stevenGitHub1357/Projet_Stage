const {Pool,Client} = require('pg')
const pool = new Pool({
  host: '192.168.12.245',
  user: 'postgres',
  password: 'postgres',
  database: "gpao",
  port:5432
})
pool.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!: gpao');
  }
});

module.exports = pool;

