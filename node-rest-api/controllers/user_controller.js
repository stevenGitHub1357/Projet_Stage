const pool = require("../config/default.config")
const gpao = require("../config/dbGpao.config")

const getUserFromGpao = (req,res,next) =>{
  const {matricule} = req.body
  gpao.query("SELECT * FROM operateur WHERE matricule= $1",[matricule],function(err,result){
    if (err) {
      res.status(400).send(err);
    }
    if (Object.keys(result).length > 0) {
      res.status(200).send(result.rows);
  } else {
      res.status(200).send();
  }
    
  })
}



const getUsers = (req,res,next) =>{
    pool.query("SELECT * FROM reactjs.users",[],function(err,result){
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


const insertUsers = (req,res,next) =>{
  const {matricule,nom,prenom,mot_de_passe,id_role} = req.body
    pool.query("INSERT INTO reactjs.users (matricule,nom,prenom,mot_de_passe,id_role,default_mdp) VALUES ($1,$2,$3,$4,$5,'lum123')",[matricule,nom,prenom,mot_de_passe,id_role],function(err,result){
      if (err) {
        res.status(400).send(err);
      }
      
      })

};

const getLog = (req,res,next) =>{
  const {matricule,mot_de_passe} = req.body
  pool.query("SELECT COUNT(*) FROM reactjs.users WHERE matricule=$1 AND mot_de_passe = $2 OR default_mdp = $3",[matricule,mot_de_passe,mot_de_passe],function(err,Result){
    if (err) {
      res.status(400).send(err);
    }
    if (Result.rows.length > 0) {
      console.log("countlog",Result.rows)
      res.status(200).send(Result.rows);
    } 
  })
}

const getInfoLog = (req,res,next) =>{
  let matricule = req.body.matricule;
  pool.query("SELECT * FROM reactjs.users WHERE matricule=$1",[matricule],function(err,Result){
    if (err) {
      res.status(400).send(err);
    }
    if (Result.rows.length > 0) {
      res.status(200).send(Result.rows);
    } 
    
  })
}

const deleteUser = (req,res,next) =>{
  let id = req.body.id_user;
  pool.query("DELETE FROM reactjs.users WHERE id_user = $1",[id],function(err){
    if (err) {
      res.status(400).send(err);
    }
  })
}

const UpdateUser = (req,res,next) =>{
  let {id_user,matricule,nom,prenom,id_role,mot_de_passe} = req.body;
  pool.query("Update reactjs.users SET matricule=$1 , nom=$2, prenom=$3,id_role=$4,mot_de_passe=$5 WHERE id_user = $6",[matricule,nom,prenom,id_role,mot_de_passe,id_user],function(err){
    if (err) {
      res.status(400).send(err);
    }
  
  })
}

const getNb_echec = (req,res,next)=>{
  let matricule = req.body.matricule
  gpao.query("SELECT nb_echec FROM operateur_securiter WHERE matricule = $1",[matricule],function(er,result){
    // console.log(result.rows)
      res.status(200).send(result.rows)
  })
}

const VerificationOperateurSecuriter = (req,res,next)=>{
  let matricule = req.body.matricule
  let countVerif
  gpao.query("SELECT COUNT(*) FROM operateur_securiter WHERE matricule = $1",[matricule],function(er,result){
    if(result.rows.length >0){
      countVerif = result.rows[0].count
      // console.log(countVerif.length)
      if(countVerif > '0'){
        gpao.query("SELECT nb_echec FROM operateur_securiter WHERE matricule = $1",[matricule],function(er,result){
          if(result.rows.length > 0){
            let nb_echec = result.rows[0].nb_echec + 1
            if(result.rows[0].nb_echec >= 3){
              res.status(200).send(result.rows)
            }else{
              gpao.query("UPDATE operateur_securiter SET datetentative = NOW(), nb_echec = $1 WHERE matricule = $2",[nb_echec,matricule],function(er,result){})
            }
          }
        })
      }else{
        // console.log("mbola tsy ao")
        gpao.query("INSERT INTO operateur_securiter (matricule) VALUES ($1)",[matricule],function(er,result){})
      }
    }
  })
}


 module.exports = {getUsers,insertUsers,getLog,deleteUser,getInfoLog,UpdateUser,getUserFromGpao,VerificationOperateurSecuriter,getNb_echec};



