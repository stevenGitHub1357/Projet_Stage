const pool = require("../config/default.config");
const menuModel = require("../models/Menus")
const Menu = menuModel.Menu;

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


const getMenuByRole = (req,res,next) =>{
  let role = req.body.role_react
  console.log(req.body)
  pool.query("SELECT * FROM public.menus WHERE role = $1 ORDER BY range ASC",[role],function(err,result){
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


const updateSousMenu = (req,res,next) =>{
  let {id_menu,sous_menus} = req.body
  pool.query("UPDATE reactjs.menus SET  sous_menus = $1  WHERE id_menu = $2",[sous_menus,id_menu],function(err){
    if (err) {
      res.status(400).send(err);
    }
   
  })
}

const updateRange = (req,res,next) =>{
  console.log(req.body)
  let resultArray = req.body
  for(let i = 0; i < resultArray.length; i++){
    let id = resultArray[i].id_menu
    let range = i
    pool.query("UPDATE reactjs.menus SET range = $1 WHERE id_menu = $2",[range,id],function(err){
      if (err) {
        res.status(400).send(err);
      } 
      
    })
  }
}


module.exports = {getMenu,insertMenu,deleteMenu,updateMenu,updateRange,updateSousMenu,getMenuByRole};
