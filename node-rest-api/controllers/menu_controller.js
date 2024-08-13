const pool = require("../config/default.config");

const getMenu = (req,res,next) =>{
    pool.query("SELECT * FROM reactjs.menus ORDER BY range ASC",[],function(err,result){
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

const getMenuByRole = (req,res,next) =>{
  let role = req.body.role_react
  console.log(req.body)
  pool.query("SELECT * FROM reactjs.menus WHERE role = $1 ORDER BY range ASC",[role],function(err,result){
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

const insertMenu = (req,res,next) =>{
  console.log(req.body);
  let {icon,labelle_menu,route,role} = req.body

  pool.query("INSERT INTO reactjs.menus (icon,labelle_menu,route,sous_menus,role) VALUES ($1,$2,$3,$4,$5)",[icon,labelle_menu,route,'[]',JSON.stringify(role)],function(err,result){
    if (err) {
      res.status(400).send(err);
    }
  })
};

const deleteMenu = (req,res,next) =>{
  let id = req.body.id_menu;
  pool.query("DELETE FROM reactjs.menus WHERE id_menu = $1",[id],function(err){
    if (err) {
      res.status(400).send(err);
    }
  })
}

const updateMenu = (req,res,next) =>{
  let {id_menu,icon,labelle_menu,route,role} = req.body
  pool.query("UPDATE reactjs.menus SET  icon = $1, labelle_menu = $2, route = $3, role = $4  WHERE id_menu = $5",[icon,labelle_menu,route,JSON.stringify(role),id_menu],function(err){
    if (err) {
      res.status(400).send(err);
    }
   
  })
}

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
