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
        allowNull: false,
      },
      base: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    },{
      createdAt: false,
      updatedAt: false,
  });
  
module.exports = { Menu }  
  
