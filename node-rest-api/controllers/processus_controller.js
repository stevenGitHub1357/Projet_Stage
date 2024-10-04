const processModel = require("../models/Processus")
const {Op} = require("sequelize");
const Processus = processModel.Processus;
const Detail_user_processus = processModel.Detail_user_processus;

const getProcessus = (req,res) => {
    Processus.findAll()
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


const insertProcessus = (req,res) => {
  const {libelle_processus,num_processus,abbrv,excel} = req.body.processus
  Processus.create(
    { 
      libelle_processus : libelle_processus,
      num_processus : num_processus,  
      abbrv : abbrv,
      excel: excel
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


const deleteProcessus = (req,res) => {
  let id = req.body.id
  Processus.destroy(
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


const updateProcessus = (req,res) => {
  const {id,libelle_processus,num_processus,abbrv} = req.body
  Processus.update(
    { 
      libelle_processus : libelle_processus,
      num_processus : num_processus,  
      abbrv : abbrv,
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

const getProcessusByUser = (req,res) => {
  Detail_user_processus.findAll(
    {
      attributes : [
        ['id_processus','id'],
        'libelle_processus',
        'num_processus', 'abbrv', 'date_create', 'excel'],
      where : 
        {
          id_user : req.body.id_user
        },
      order :
        [
          ['id_processus','ASC']
        ]
        
    }
  )
  .then(function(results) {
    if (results.length > 0) {
      if(results[0].id === 0){
        console.log(results)
        getProcessus(req,res)
      }
      else{
        res.status(200).json(results);
      }
    } else {
      res.status(200).json();
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(400).json({ error });
  })
};

const getAllProcessusUser = (req,res) => {
  Detail_user_processus.findAll()
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
  



 module.exports = {getProcessus,insertProcessus,deleteProcessus,updateProcessus,getProcessusByUser,getAllProcessusUser};



