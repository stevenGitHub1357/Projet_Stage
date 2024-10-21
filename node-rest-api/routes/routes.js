const express = require('express')
const router = express.Router()

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


//-Data KPI-//

//--MET/MQ--//

//---FNC---//
const fnc_fac = require("../controllers/Data_KPI/fnc_fac_controller.js")
router.get("/getFNCConsultation", fnc_fac.getConsultation_FNC)
router.get("/getFACConsultation", fnc_fac.getConsultation_FAC)

router.get("/getFNCSynthese", fnc_fac.getSynthese_FNC)
router.get("/getFACSynthese", fnc_fac.getSynthese_FAC)

router.post("/insertFNCFACCommentaire", fnc_fac.insertCommentaire_FAC_FNC)


//-Revue direction-//
//--Revue processus--//
const revue_processus = require("../controllers/Revue_direction/Revue_processus_controller.js")
router.get("/getRevueProcessus", revue_processus.getRevueProcessus)
router.post("/getRevueProcessusById", revue_processus.getRevueProcessusById)
router.post("/createRevueProcessus", revue_processus.createRevueProcessus)
router.post("/clotureRevueProcessus", revue_processus.clotureRevueProcessus)
router.post("/getLastRevueProcessusById", revue_processus.getLastRevueProcessusById)

//--Plan d'action--//
const plan_action = require("../controllers/Revue_direction/Plan_action_controller.js")
router.post("/getTicketById", plan_action.getTicketById)
router.post("/getTicketByManyId", plan_action.getTicketByManyId)
router.get("/getPlanAction", plan_action.getPlanAction)
router.post("/getPlanActionByRevueProcessus", plan_action.getPlanActionByRevueProcessus)
router.post("/insertPlanAction", plan_action.insertPlanAction)
router.post("/insertPlanActionCommentaire", plan_action.insertPlanActionCommentaire)
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
router.post("/getPerformanceCommentaire", performance.getPerformanceCommentaire)





module.exports = router

