const pool = require("../config/default.config");
const {Op} = require("sequelize");
const {ParametrageObjectif, Unite, Synthese}= require("../models/Objectif");
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

const getSynthese = (req,res,next) =>{
  Synthese.findAll()
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
  const body = req.body
  console.log(body)
  const {id_processus,objectifs,poids,cible,id_unite,recuperation} = body.objectif
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
  const body = req.body
  console.log(body)
  ParametrageObjectif.bulkCreate(body.objectifs,
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

const desactiveParametrageObjectif = (req,res,next) =>{
  let id = req.body.id
  console.log(id)
  ParametrageObjectif.update(
    { 
        activate : 0
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
};


const updateParametrageObjectif = (req,res,next) =>{
  const body = req.body
  console.log(body)
  const {id,id_processus,objectifs,poids,cible,id_unite,recuperation} = body.objectif
  ParametrageObjectif.update(
    { 
        id_processus : id_processus,
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




module.exports = {getUnite, getSynthese,getParametrageObjectif,insertParametrageObjectif,deleteParametrageObjectif,updateParametrageObjectif,insertManyParametrageObjectif, desactiveParametrageObjectif};
