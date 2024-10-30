const { Sequelize } = require("sequelize");
const defautl_db = require("../config/default.config")

const Menu = defautl_db.defaultSequelize.define('menus', {
      id_menu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      labelle_menu: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      icon: {
        type: Sequelize.STRING(500),
        defaultValue: 'bi bi-file-earmark-plus',
      },
      route: {
        type: Sequelize.STRING(200),
        defaultValue: 'global',
      },
      position: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      rang: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      base: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      etat: {
        type: Sequelize.INTEGER,
        defaultValue: 10,
      },
    },{
      createdAt: false,
      updatedAt: false,
  });


  const Menu_role_processus = defautl_db.defaultSequelize.define('menu_role_processus', {
    id_menu: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    labelle_menu: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    icon: {
      type: Sequelize.STRING(500),
      defaultValue: 'bi bi-file-earmark-plus',
    },
    route: {
      type: Sequelize.STRING(200),
      defaultValue: 'global',
    },
    position: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    rang: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    base: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    etat: {
      type: Sequelize.INTEGER,
      defaultValue: 10,
    },
    id_processus: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    id_role: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },{
    tableName: "menu_role_processus",
    freezeTableName: true,
    timestamps: false,
    noPrimaryKey: true, 
  });


  const MenuRole = defautl_db.defaultSequelize.define('menu_role', {
    id_m_role: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_menu: {
        type: Sequelize.INTEGER,
    },
    id_role: {
        type: Sequelize.INTEGER,
    },
},{
    tableName: "menu_role",
    createdAt: false,
    updatedAt: false,
});

const MenuProcessus = defautl_db.defaultSequelize.define('menu_processus', {
    id_m_processus: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_menu: {
        type: Sequelize.INTEGER,
    },
    id_processus: {
        type: Sequelize.INTEGER,
    },
},{
    tableName: "menu_processus",
    createdAt: false,
    updatedAt: false,
});
  
module.exports = { Menu, Menu_role_processus, MenuProcessus, MenuRole}  
  
