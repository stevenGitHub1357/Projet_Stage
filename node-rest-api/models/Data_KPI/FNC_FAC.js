const { Sequelize } = require("sequelize");
const defautl_db = require("../../config/default.config")

const fnc_fac_consultation = defautl_db.defaultSequelize.define('fnc_fac', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        titre: {
            type: Sequelize.STRING(1000)
        },
        objectif: {
            type: Sequelize.STRING(1000)
        },
        realise: {
            type: Sequelize.DECIMAL(10,5)
        },
        date_demande: {
            type: Sequelize.DATE,
        },
        date_cloture: {
            type: Sequelize.DATE,
        },
        statut: {
            type: Sequelize.STRING(300),
        }
    },{
        tableName: "fnc_fac",
        schema: "data_kpi",
        freezeTableName: true,
        createdAt: "createat",
        updatedAt: "updateat",
  });


  const fnc_fac_synthese = defautl_db.defaultSequelize.define('fnc_fac_synthese', {
    annee: {
        type: Sequelize.INTEGER
    },
    type_demande: {
        type: Sequelize.STRING(1000)
    },
    declarer: {
        type: Sequelize.INTEGER
    },
    realise_cloture: {
        type: Sequelize.INTEGER,
    },
    taux: {
        type: Sequelize.DECIMAL(10,5),
    },
    fac_efficace: {
        type: Sequelize.INTEGER,
    },
    commentaire: {
        type: Sequelize.STRING(1000)
    },
},{
    tableName: "fnc_fac_synthese",
    schema: "data_kpi",
    freezeTableName: true,
    timestamps: false,
});

const fnc_fac_commentaire = defautl_db.defaultSequelize.define('fnc_fac_commentaire', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    annee: {
        type: Sequelize.INTEGER
    },
    type_demande: {
        type: Sequelize.STRING(1000)
    },
    commentaire: {
        type: Sequelize.STRING(1000)
    },
},{
    tableName: "fnc_fac_commentaire",
    schema: "data_kpi",
    freezeTableName: true,
    createdAt: "createat",
    updatedAt: "updateat",
});

fnc_fac_synthese.removeAttribute('id');

module.exports = {fnc_fac_consultation, fnc_fac_synthese, fnc_fac_commentaire}  
  
