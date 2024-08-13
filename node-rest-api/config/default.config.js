const {Pool,Client} = require('pg')
const pool = new Pool({
  host: '192.168.12.232',
  user: 'postgres',
  password: 'postgres',
  database: "framework_js",
  port:5432
})
pool.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});

module.exports = pool;

