const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const deploy = require("../controllers/deploy_controller.js")
router.get("/getDeploy", deploy.deploy)


const users = require("../controllers/user_controller.js")
router.get("/getUsers", users.getUsers)
router.get("/getAllUsers", users.getAllUsers)
router.post("/insertUser", users.insertUsers)
router.post("/deleteUserProcessus",users.deleteUserProcessus)
router.post("/updateUser",users.UpdateUser)
router.post("/desactiveUser",users.desactiveUser)

router.post("/deleteUser",users.deleteUser)
router.post("/deleteUserRole",users.deleteUserRole)
router.post("/insertUserRole",users.insertUserRole)
router.post("/insertUserProcessus",users.insertUserProcessus)
router.post("/getUserProcessus",users.getUserProcessus)
router.post("/getUserRole",users.getUserRole)

router.post("/getLog",users.getLog)
router.post("/get-info-log",users.getInfoLog)
router.post("/get-user-gpao",users.getUserFromGpao)
router.post("/verif-matricule-security",users.VerificationOperateurSecuriter)
router.post("/getNb-echec",users.getNb_echec)

router.post("/getUserByMatricule",users.getUserByMatricule)



const menus = require("../controllers/menu_controller.js")
router.get("/getMenus",menus.getMenu)
router.post("/insertMenu",menus.insertMenu)
router.post("/deleteMenu",menus.deleteMenu)
router.post("/updateMenu",menus.updateMenu)

router.post("/deleteMenuRole",menus.deleteMenuRole)
router.post("/deleteMenuProcessus",menus.deleteMenuProcessus)
router.post("/insertMenuRole",menus.insertMenuRole)
router.post("/insertMenuProcessus",menus.insertMenuProcessus)

router.post("/getMenuProcessus",menus.getMenuProcessus)
router.post("/getMenuRole",menus.getMenuRole)

router.post("/getMenuByUser",menus.getMenuByUser)



const role = require("../controllers/role_controller.js")
router.get("/getRole",role.getRole);
router.post("/getRoleByUser",role.getRoleByUser);



const processus = require("../controllers/processus_controller.js")
router.get("/getProcessus",processus.getProcessus);
router.post("/getProcessusByUser",processus.getProcessusByUser);
router.post("/insertProcessus",processus.insertProcessus);



const parametrageObjectif = require("../controllers/objectif_controller.js")
router.get("/getParametrageObjectif", parametrageObjectif.getParametrageObjectif)
router.get("/getAllParametrageObjectif", parametrageObjectif.getParametrageObjectif)
router.post("/getParametrageObjectifUser", parametrageObjectif.getParametrageObjectifUser)

router.post("/insertParametrageObjectif", parametrageObjectif.insertParametrageObjectif)
router.post("/deleteParametrageObjectif",parametrageObjectif.deleteParametrageObjectif)
router.post("/updateParametrageObjectif",parametrageObjectif.updateParametrageObjectif)
router.post("/insertManyParametrageObjectif", parametrageObjectif.insertManyParametrageObjectif)
router.post("/desactiveParametrageObjectif",parametrageObjectif.desactiveParametrageObjectif)

router.get("/getParamObjUnite",parametrageObjectif.getUnite)
router.post("/insertParamObjUnite", parametrageObjectif.insertUnite)

router.get("/getParamObjRecuperation",parametrageObjectif.getRecuperation)
router.post("/insertParamObjRecuperation", parametrageObjectif.insertRecuperation)

router.get("/getParamObjSynthese",parametrageObjectif.getSynthese)

router.get("/getRevueDirection",parametrageObjectif.getAllRevueDirection)


//-Revue direction-//
//--Revue processus--//
const revue_processus = require("../controllers/Revue_direction/Revue_processus_controller.js")
router.get("/getRevueProcessus", revue_processus.getRevueProcessus)
router.post("/getRevueProcessusById", revue_processus.getRevueProcessusById)
router.post("/createRevueProcessus", revue_processus.createRevueProcessus)
router.post("/clotureRevueProcessus", revue_processus.clotureRevueProcessus)
router.post("/updateRevueProcessusByPlanning", revue_processus.updateRevueProcessusByPlanning)
router.post("/updateRevueProcessus", revue_processus.updateRevueProcessus)
router.post("/getLastRevueProcessusById", revue_processus.getLastRevueProcessusById)

//--Plan d'action--//
const plan_action = require("../controllers/Revue_direction/Plan_action_controller.js")
router.post("/getTicketById", plan_action.getTicketById)
router.post("/getTicketByManyId", plan_action.getTicketByManyId)
router.get("/getPlanAction", plan_action.getPlanAction)
router.post("/getPlanActionByRevueProcessus", plan_action.getPlanActionByRevueProcessus)
router.post("/insertPlanAction", plan_action.insertPlanAction)
router.post("/insertManyPlanAction", plan_action.insertManyPlanAction)
// router.post("/insertPlanActionCommentaire", plan_action.insertPlanActionCommentaire)
router.post("/updatePlanAction", plan_action.updatePlanAction)
router.post("/desactivePlanAction", plan_action.desactivePlanAction)


//--Performance--//
const performance = require("../controllers/Revue_direction/Performance_controller.js")
router.get("/getPerformanceObjectifDetail", performance.getPerformanceObjectifDetail)
router.post("/getPerformanceObjectifDetailByProcessus", performance.getPerformanceObjectifDetailByProcessus)
router.post("/getPerformanceObjectifByRevueProcessus", performance.getPerformanceObjectifByRevueProcessus)
router.post("/getPerformanceCommentaireByRevuePerformance", performance.getPerformanceCommentaireByRevuePerformance)
router.post("/insertPerformanceObjectifCommentaire", performance.insertPerformanceObjectifCommentaire)
router.post("/getPerformanceObjectifCommentaireByRevue", performance.getPerformanceObjectifCommentaireByRevue)
router.post("/getPerformanceByDemande", performance.getPerformanceByDemande)
router.post("/getPerformanceSyntheseByDemande", performance.getPerformanceSyntheseByDemande)
router.post("/insertPerformanceCommentaire", performance.insertPerformanceCommentaire)
router.post("/updatePerformanceCommentaire", performance.updatePerformanceCommentaire)
router.post("/getPerformanceCommentaire", performance.getPerformanceCommentaire)
router.post("/getPerformanceByDemandeRevue", performance.getPerformanceByDemandeRevue)
router.post("/insertPerformanceObjectifRevue", performance.insertPerformanceObjectifRevue)
router.post("/updatePerformanceObjectifRevue", performance.updatePerformanceObjectifRevue)
router.post("/insertPerformanceObjectifRevueFichier", performance.insertPerformanceObjectifRevueFichier)
router.post("/getPerformanceObjectifRevueFichierByObjectif", performance.getPerformanceObjectifRevueFichierByObjectif)


//--Efficaciter--//
const efficacite = require("../controllers/Revue_direction/Efficacite_controller.js")
router.post("/insertEfficacite", efficacite.insertEfficacite)
router.post("/updateEfficacite", efficacite.updateEfficacite)
router.post("/getEfficaciteByRevue", efficacite.getEfficaciteByRevue)
router.post("/getRisqueByProcessus", efficacite.getRisqueByProcessus)
router.post("/getEnjeuxByProcessus", efficacite.getEnjeuxByProcessus)
router.post("/getOpportuniterByProcessus", efficacite.getOpportuniterByProcessus)


//--Planning--//
const planning = require("../controllers/planning_controller.js");
router.post("/insertPlanning", planning.insertPlanning)
router.post("/updatePlanning", planning.updatePlanning)
router.get("/getPlanning", planning.getPlanning)
router.get("/getPlanningNotCloturer", planning.getPlanningNotCloturer)
router.get("/getPlanningCategorie", planning.getPlanningCategorie)
router.post("/insertPlanningCategorie", planning.insertPlanningCategorie)
router.post("/insertDomaine", planning.insertDomaine)



//--Upload--//
const upload_download = require("../controllers/file_controller.js");

// Configuration de multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsKPI/default');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Définir une route POST pour uploader un fichier
router.post('/uploadFile', upload.single('file'), upload_download.uploadFile);
router.post('/moveFile', upload_download.moveFile);
router.post('/downloadFile', upload_download.downloadFile);
module.exports = router;





module.exports = router

