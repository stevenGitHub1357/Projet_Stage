const express = require('express')
const router = express.Router()

const users = require("../controllers/user_controller.js")
router.get("/getUsers", users.getUsers)
router.post("/insertUser", users.insertUsers)
router.post("/deleteUser",users.deleteUser)
router.post("/updateUser",users.UpdateUser)

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

router.post("/getMenuByUser",menus.getMenuByUser)



const role = require("../controllers/role_controller.js")
router.get("/getRole",role.getRole);
router.post("/getRoleByUser",role.getRoleByUser);



const processus = require("../controllers/processus_controller.js")
router.get("/getProcessus",processus.getProcessus);
router.post("/getProcessusByUser",processus.getProcessusByUser);



const parametrageObjectif = require("../controllers/parametrage_objectif_controller.js")
router.get("/getParametrageObjectif", parametrageObjectif.getParametrageObjectif)
router.post("/insertParametrageObjectif", parametrageObjectif.insertParametrageObjectif)
router.post("/deleteParametrageObjectif",parametrageObjectif.deleteParametrageObjectif)
router.post("/updateParametrageObjectif",parametrageObjectif.updateParametrageObjectif)
router.get("/getParamObjUnite",parametrageObjectif.getUnite)
router.post("/insertManyParametrageObjectif", parametrageObjectif.insertManyParametrageObjectif)

module.exports = router

