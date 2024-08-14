const pool = require("../config/default.config");
const getRole = (req,res,next) =>{
    pool.query("SELECT * FROM public.role",[],function(err,result){
      if (err) {
        res.status(400).send(err);
      }
      if (Object.keys(result).length > 0) {
          res.status(200).send(result.rows);
      } else {
          res.status(200).send();
      }
      })
};
module.exports = {getRole};



