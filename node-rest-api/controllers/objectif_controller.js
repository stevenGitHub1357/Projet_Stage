const pool = require("../config/default.config");
const {Op} = require("sequelize");
const {ParametrageObjectif, Unite, Synthese, Recuperation, RevueDirection}= require("../models/Objectif");
const { Processus } = require("../models/Processus");
const { getProcessus } = require("./processus_controller");


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

const insertUnite = (req,res,next) =>{
  const body = req.body
  console.log(body)
  const {type_unite,abbrv} = body.unite
  Unite.create(
    { 
      type_unite : type_unite,
      abbrv : abbrv,  
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


const getRecuperation = (req,res,next) =>{
  Recuperation.findAll()
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

const insertRecuperation = (req,res,next) =>{
  const body = req.body
  console.log(body)
  const {id,type_recuperation} = body.recuperation
  Recuperation.create(
    { 
      id : id,
      type_recuperation : type_recuperation,
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
    ],
    where: {
      activate: {
        [Op.ne] : 0
      }
    },
    
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

const getAllParametrageObjectif = (req,res,next) =>{
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

async function getParametrageObjectifUser(req,res,next){
  const processus = req.body.processus;
  console.log(processus)
  let ids_processus = processus.map(obj => obj.id)
  // const verif = ids_processus.includes(0);
  // if(verif){
  //   let allProc= []
  //   await axios.get(Url+"/getProcessus").then(res=>{
  //     allProc = res.data
  //   })
  //   ids_processus = allProc.map(obj=> obj.id)  
  // }
  // console.log(ids_processus)
  ParametrageObjectif.findAll({
    // include: [
    //   Unite,
    //   {
    //     model: Processus,
    //     as: "processus"
    //   }
    // ],
    where: {
      id_processus:{
        [Op.in] : ids_processus
      },
      activate: {
        [Op.ne] : 0
      },

    },
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
  const {id_processus,objectifs,poids,cible,id_unite,recuperation,support} = body.objectif
  ParametrageObjectif.create(
    { 
      id_processus : id_processus,
      objectifs : objectifs,
      poids : poids,  
      cible : cible,
      id_unite : id_unite,
      recuperation : recuperation,
      support : support
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
  const {id,id_processus,objectifs,poids,cible,id_unite,recuperation, support} = body.objectif
  ParametrageObjectif.update(
    { 
        id_processus : id_processus,
        objectifs : objectifs,
        poids : poids,  
        cible : cible,
        id_unite : id_unite,
        recuperation : recuperation,
        support : support      
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


const getAllRevueDirection = (req,res,next) =>{
  RevueDirection.findAll({
    include: [
      ParametrageObjectif
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



module.exports = {getUnite, insertUnite, getRecuperation, insertRecuperation, getSynthese, getAllParametrageObjectif, getParametrageObjectifUser, getAllRevueDirection,
                  getParametrageObjectif,insertParametrageObjectif,deleteParametrageObjectif,updateParametrageObjectif,insertManyParametrageObjectif, desactiveParametrageObjectif};
