const pool = require("../config/default.config");
const {Op} = require("sequelize");
const {ParametrageObjectif, Unite}= require("../models/ParametrageObjectif");
const { Processus } = require("../models/Processus");

const getUnite = (req,res,next) =>{
  Unite.findAll()
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

const getParametrageObjectif = (req,res,next) =>{
  ParametrageObjectif.findAll({
    include: [
      Unite,
      {
        model: Processus,
        as: "processus"
      }
    ]
  })
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


const insertParametrageObjectif = (req,res,next) =>{
  const {id_processus,objectifs,poids,cible,id_unite,recuperation} = req.body
  ParametrageObjectif.create(
    { 
      id_processus : id_processus,
      objectifs : objectifs,
      poids : poids,  
      cible : cible,
      id_unite : id_unite,
      recuperation : recuperation,
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

const insertManyParametrageObjectif = (req,res,next) =>{
  const items = req.body
  console.log(items)
  ParametrageObjectif.bulkCreate(items.items,
    {
      ignoreDuplicates:true,
      validate:true,
      returning:true
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


const deleteParametrageObjectif = (req,res,next) =>{
  let id = req.body.id
  ParametrageObjectif.destroy(
    {
      where: {
        id: id,
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


const updateParametrageObjectif = (req,res,next) =>{
  const {id,id_pocessus,objectifs,poids,cible,id_unite,recuperation} = req.body
  ParametrageObjectif.update(
    { 
        id_pocessus : id_pocessus,
        objectifs : objectifs,
        poids : poids,  
        cible : cible,
        id_unite : id_unite,
        recuperation : recuperation,
      
    },
    {
      where : 
      {
        id : id
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
}




module.exports = {getUnite,getParametrageObjectif,insertParametrageObjectif,deleteParametrageObjectif,updateParametrageObjectif,insertManyParametrageObjectif};
