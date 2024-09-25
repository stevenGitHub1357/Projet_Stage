const { Sequelize } = require("sequelize");
const defautl_db = require("../config/default.config")

const Processus = defautl_db.defaultSequelize.define('processus', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        libelle_processus: Sequelize.STRING(200),
        num_processus: Sequelize.STRING(300),
        abbrv: Sequelize.STRING(300),
        date_create: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        excel: Sequelize.STRING(300),
        
    },{
        tableName: "processus",
        createdAt: false,
        updatedAt: false,
    });


const Detail_user_processus = defautl_db.defaultSequelize.define('detai_user_processus', {
        id_u_processus: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
          },
        id_user: Sequelize.INTEGER,
        id: {
              type: Sequelize.INTEGER,
              field: 'id_processus'
            },
        libelle_processus: Sequelize.STRING(200),
        num_processus: Sequelize.STRING(200),
        abbrv: Sequelize.STRING(200),
        date_create: Sequelize.DATE,
        excel: Sequelize.STRING(300),
      
        },{
          tableName: "detail_user_processus",
          freezeTableName: true,
          timestamps: false,
          noPrimaryKey: true, 
          id:false
        });

module.exports = {Processus, Detail_user_processus};