const roleModel = require("../models/Role")
const Role = roleModel.Role;
const View = roleModel.Detail_user_role;


const getRole = (req,res) => {
    Role.findAll()
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


const insertRole = (req,res) => {
  const {type_Role} = req.body
  Role.create(
    { 
      type_Role : type_Role,
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


const deleteRole = (req,res) => {
  let id_role = req.body.id_role
  Role.destroy(
    {
      where: {
        id_role : id_role,
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


const updateRole = (req,res) => {
  const {id_role,type_Role} = req.body
  Role.update(
    { 
      type_Role : type_Role
    },
    {
      where : 
      {
        id_role : id_role
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

const getRoleByUser = (req,res) => {
  View.findAll(
    {
      attributes: ['id_role', 'type_role', 'date_create'],
      where : 
        {
          id_user : req.body.id_user
        },
      order :
        [
          ['id_role','ASC']
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
  



 module.exports = {getRole,insertRole,deleteRole,updateRole,getRoleByUser};



