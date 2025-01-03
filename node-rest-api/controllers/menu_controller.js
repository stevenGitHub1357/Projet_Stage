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
  .then(function(result) {
    res.status(200).json({ id_menu: result.id_menu, ...result.dataValues });
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
  ids_role.push(0)
  const ids_processus = processus.map(obj => obj.id)
  ids_processus.push(0)
  Menu_role_processus.findAll(
    {
      attributes : [
        "id_menu", "labelle_menu", "icon", "route", "position", "rang", "base", "etat"
      ],
      where : {
        id_processus:{
          [Op.in] : ids_processus
        },
        id_role:{
          [Op.in] : ids_role
        }, 
      },
      group : 
      [
        "id_menu", "labelle_menu", "icon", "route", "position", "rang", "base", "etat"
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


const insertMenuRole = (req,res,next) =>{
  const body = req.body
  const id_menu = body.id_menu
  const role = body.role
  const item = []
  for(let id_role of role){
    const object = {};
    object.id_menu = id_menu;
    object.id_role = Number(id_role);
    item.push(object)
  }
  console.log(item)
  menuModel.MenuRole.bulkCreate(item,
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

const insertMenuProcessus = (req,res,next) =>{
  const body = req.body
  const id_menu = body.id_menu
  const processus = body.processus
  const item = []
  for(let id_processus of processus){
    const object = {};
    object.id_menu = id_menu;
    object.id_processus = Number(id_processus);
    item.push(object)
  }
  console.log(item)
  menuModel.MenuProcessus.bulkCreate(item,
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

const deleteMenuRole = (req,res) => {
  let id = req.body.id_menu
  menuModel.MenuRole.destroy(
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

const deleteMenuProcessus = (req,res) => {
  let id = req.body.id_menu
  menuModel.MenuProcessus.destroy(
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

const getMenuRole= (req,res,next) =>{
  let id_menu = req.body.id_menu;
  console.log(id_menu)
  menuModel.MenuRole.findAll(
    {
      
      where : {
        id_menu : id_menu
      },
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

const getMenuProcessus= (req,res,next) =>{
  let id_menu = req.body.id_menu;
  menuModel.MenuProcessus.findAll(
    {
      
      where : {
        id_menu : id_menu
      },
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

module.exports = 
                {
                  getMenu,insertMenu,deleteMenu,updateMenu,
                  getMenuByUser, 
                  insertMenuProcessus, deleteMenuProcessus, getMenuProcessus,
                  insertMenuRole, deleteMenuRole, getMenuRole
                };
