const { Sequelize } = require("sequelize");
const defautl_db = require("../config/default.config")

const Role = defautl_db.defaultSequelize.define('role', {
        id_role: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        type_role: Sequelize.STRING(200),
        date_create: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        
    },{
        tableName: "role",
        createdAt: false,
        updatedAt: false,
    });


    const Detail_user_role = defautl_db.defaultSequelize.define('detai_user_role', {
        id_u_role: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
          },
        id_user: Sequelize.INTEGER,
        id_role: Sequelize.INTEGER,
        type_role: Sequelize.STRING(200),
        date_create: Sequelize.DATE,
          
      
        },{
          tableName: "detail_user_role",
          freezeTableName: true,
          timestamps: false,
          noPrimaryKey: true, 
        });

module.exports = {Role, Detail_user_role};