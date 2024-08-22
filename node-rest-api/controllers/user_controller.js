const bd_pool = require("../config/default.config")
const pool = bd_pool.pool
const gpao = require("../config/dbGpao.config")
const userModel = require("../models/Users");
const { id } = require("date-fns/locale");
const User = userModel.User;


const getUsers = (req,res) => {
    User.findAll()
    .then(function(results) {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(200).json();
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(400).json({ error });
    })
};

const getUserByMatricule = (req,res) => {
  User.findAll(
    { 
      where :
      {
        matricule : req.body.matricule
      } 
    }
  )
  .then(function(results) {
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(200).json();
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(411).json({ error });
  })
};


const insertUsers = (req,res) => {
  const {matricule,nom,prenom,mot_de_passe} = req.body
  User.create(
    { 
      matricule : matricule,
      nom : nom,  
      prenom : prenom,
      mot_de_passe : mot_de_passe,
    }
  )
  .then(function(results) {
    res.status(200).send(results);
  })
  .catch(function(error) {
    console.error(error);
    res.status(400).json({ error });
  })
};


const deleteUser = (req,res) => {
  let id = req.body.id_user
  User.destroy(
    {
      where: {
        id_user: id,
      },
    }
  )
  .then(function(deleted) {
    res.status(200).send(deleted[0]);
  })
  .catch(function(error) {
    console.error(error);
    res.status(400).json({ error });
  })
};


const UpdateUser = (req,res) => {
  const {id_user,matricule,nom,prenom,mot_de_passe} = req.body
  User.update(
    { 
      matricule : matricule,
      nom : nom,  
      prenom : prenom,
      mot_de_passe : mot_de_passe,
    },
    {
      where : 
      {
        id_user : id_user
      }
    }
  )
  .then(function(results) {
    res.status(200).send(results);
  })
  .catch(function(error) {
    console.error(error);
    res.status(400).json({ error });
  })
};
  




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
};

const getLog = (req,res,next) =>{
  const {matricule,mot_de_passe} = req.body
  pool.query("SELECT COUNT(*) FROM public.users WHERE matricule=$1 AND mot_de_passe = $2 OR default_mdp = $3",[matricule,mot_de_passe,mot_de_passe],function(err,Result){
    if (err) {
      res.status(400).send(err);
    }
    if (Result.rows.length > 0) {
      console.log("countlog",Result.rows)
      res.status(200).send(Result.rows);
    } 
  })
};

const getInfoLog = (req,res,next) =>{
  let matricule = req.body.matricule;
  pool.query("SELECT * FROM public.users WHERE matricule=$1",[matricule],function(err,Result){
    if (err) {
      res.status(400).send(err);
    }
    if (Result.rows.length > 0) {
      res.status(200).send(Result.rows);
    } 
    
  })
};

const getNb_echec = (req,res,next)=>{
  let matricule = req.body.matricule
  gpao.query("SELECT nb_echec FROM operateur_securiter WHERE matricule = $1",[matricule],function(er,result){
    // console.log(result.rows)
      res.status(200).send(result.rows)
  })
};

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
};


 module.exports = {getUsers,getUserByMatricule,insertUsers,getLog,deleteUser,getInfoLog,UpdateUser,getUserFromGpao,VerificationOperateurSecuriter,getNb_echec};



