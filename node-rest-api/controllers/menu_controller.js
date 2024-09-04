const pool = require("../config/default.config");
const menuModel = require("../models/Menus");
const {Op} = require("sequelize");
const Menu = menuModel.Menu;
const Menu_role_processus = menuModel.Menu_role_processus;

const getMenu = (req,res,next) =>{
  Menu.findAll()
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


const insertMenu = (req,res,next) =>{
  const {labelle_menu,icon,route,position,rang,base} = req.body
  Menu.create(
    { 
      labelle_menu : labelle_menu,
      icon : icon,  
      route : route,
      position : position,
      rang : rang,
      base : base,
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


const deleteMenu = (req,res,next) =>{
  let id = req.body.id_menu
  Menu.destroy(
    {
      where: {
        id_menu: id,
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


const updateMenu = (req,res,next) =>{
  const {id_menu,labelle_menu,icon,route,position,rang,base} = req.body
  Menu.update(
    { 
      labelle_menu : labelle_menu,
      icon : icon,  
      route : route,
      position : position,
      rang : rang,
      base : base,
    },
    {
      where : 
      {
        id_menu : id_menu
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


const getMenuByUser = (req,res,next) =>{
  let roles = req.body.role;
  let processus = req.body.processus;
  const ids_role = roles.map(obj => obj.id_role)
  const ids_processus = processus.map(obj => obj.id)
  Menu_role_processus.findAll(
    {
      attributes : [
        "id_menu", "labelle_menu", "icon", "route", "position", "rang", "base"
      ],
      where : {
        id_processus:{
          [Op.in] : ids_processus
        },
        id_role:{
          [Op.in] : ids_role
        }
      },
      group : 
      [
        "id_menu", "labelle_menu", "icon", "route", "position", "rang", "base"
      ],
      order :
      [
        ["rang", "ASC"]
      ]
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


module.exports = {getMenu,insertMenu,deleteMenu,updateMenu,getMenuByUser};
