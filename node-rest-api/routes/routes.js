const express = require('express')
const router = express.Router()

const users = require("../controllers/user_controller.js")
router.get("/getUsers", users.getUsers)
router.post("/insertUsers", users.insertUsers)
router.post("/getLog",users.getLog)
router.post("/get-info-log",users.getInfoLog)
router.post("/deleteUser",users.deleteUser)
router.post("/Update-User",users.UpdateUser)
router.post("/get-user-gpao",users.getUserFromGpao)
router.post("/verif-matricule-security",users.VerificationOperateurSecuriter)
router.post("/getNb-echec",users.getNb_echec)



const menus = require("../controllers/menu_controller.js")
router.get("/getMenus",menus.getMenu)
router.post("/insertMenu",menus.insertMenu)
router.post("/deleteMenu",menus.deleteMenu)
router.post("/Update-Menu",menus.updateMenu)

router.post("/updateRange",menus.updateRange)
router.post("/update-sous-menus",menus.updateSousMenu)
router.post("/get-Menu-Role",menus.getMenuByRole)


const role = require("../controllers/role_controller.js")
router.get("/getRole",role.getRole)

module.exports = router

