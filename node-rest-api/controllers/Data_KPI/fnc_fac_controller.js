const pool = require("../../config/default.config");
const {Op} = require("sequelize");
const { fnc_fac_consultation, fnc_fac_synthese, fnc_fac_commentaire } = require("../../models/Data_KPI/FNC_FAC");


const getConsultation_FNC = (req,res,next) =>{
  fnc_fac_consultation.findAll(
    {
      where : 
        {
          type_demande : "FNC" 
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
    res.status(400).json({ error });
  })
};


const getConsultation_FAC = (req,res,next) =>{
  fnc_fac_consultation.findAll(
    {
      where : 
        {
          type_demande : "FAC" 
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
    res.status(400).json({ error });
  })
};


const getSynthese_FNC = (req,res,next) =>{
  fnc_fac_synthese.findAll(
    {
      where : 
        {
          type_demande : "FNC" 
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
    res.status(400).json({ error });
  })
};


const getSynthese_FAC = (req,res,next) =>{
  fnc_fac_synthese.findAll(
    {
      where : 
        {
          type_demande : "FAC" 
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
    res.status(400).json({ error });
  })
};

const getCommentaire_FAC_FNC = (req,res,next) =>{
  fnc_fac_synthese.findAll()
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

const insertCommentaire_FAC_FNC = (req,res,next) =>{
  const body = req.body
  console.log(body)
  const {annee,type_demande,commentaire} = body.item
  fnc_fac_commentaire.create(
    { 
      annee : annee,
      type_demande : type_demande,
      commentaire : commentaire,  
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


module.exports = {getConsultation_FNC, getConsultation_FAC, getSynthese_FAC, getSynthese_FNC, getCommentaire_FAC_FNC, insertCommentaire_FAC_FNC};
