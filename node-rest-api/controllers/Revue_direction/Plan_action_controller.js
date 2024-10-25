const bd_pool = require("../../config/default.config")
const pool = bd_pool.pool
const {kanboard} = require("../../config/dbRevueDirection.config")
const { Sequelize } = require("sequelize");
const { Plan_action } = require("../../models/Revue_direction/Plan_action");
const { Revue_processus } = require("../../models/Revue_direction/Revue_processus")

const getTicketById = (req,res,next) =>{
    const ticket = req.body.item
    console.log(ticket)
    if(ticket!==""){
      kanboard.query(
        `
          SELECT t.id as id,t.title as action,us.name as pilote,c.title as pdca, t.date_due as delai from tasks t 
                  inner join projects p on t.project_id = p.id 
                  left join project_has_categories pc on t.category_id = pc.id 
                  inner join swimlanes sw on t.swimlane_id = sw.id 
                  inner join columns c on t.column_id = c.id 
                  left join users u on t.creator_id = u.id 
                  left join users us on t.owner_id = us.id 
            WHERE t.id = ${ticket}  
        `,
        {
          replacements: { ticket },
          type: Sequelize.QueryTypes.SELECT
        }
        ,
        function(err,result){
            if (err) {
              res.status(400).send(err);
            }
            if (Object.keys(result).length > 0) {
              res.status(200).send(result);
            } else {
                res.status(200).send();
            }
        })
      }
  };

  const getTicketByManyId = (req,res,next) =>{
    const ticket = req.body.item
    console.log(ticket)
    kanboard.query(
      `
        SELECT t.id as id,t.title as action,us.name as pilote,c.title as pdca, t.date_due as delai from tasks t 
                inner join projects p on t.project_id = p.id 
                left join project_has_categories pc on t.category_id = pc.id 
                inner join swimlanes sw on t.swimlane_id = sw.id 
                inner join columns c on t.column_id = c.id 
                left join users u on t.creator_id = u.id 
                left join users us on t.owner_id = us.id 
          WHERE t.id in (${ticket})  
      `,
      {
        replacements: { ticket },
        type: Sequelize.QueryTypes.SELECT
      },
      function(err,result){
          if (err) {
            res.status(400).send(err);
          }
          if (Object.keys(result).length > 0) {
            res.status(200).send(result);
          } else {
              res.status(200).send();
          }
      })
    // kanboard.close()
    
  };

  const getPlanAction = (req,res,next) =>{
    Plan_action.findAll({
      // include: [
      //   Plan_action_commentaire
      // ]
    })
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


  const insertPlanAction = (req,res,next) =>{
    const {id_revue_processus,sujet,nb_ticket,commentaire} = req.body.item
    // console.log()
    Plan_action.create(
      { 
        id_revue_processus : id_revue_processus,
        sujet : sujet,
        nb_ticket : nb_ticket,
        commentaire : commentaire
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

  const insertManyPlanAction = (req,res,next) =>{
    // console.log()
    const all = [];
    const plan = req.body.item;
    const revue = req.body.newRevue;
    console.log("Plan ",plan)
    console.log("Revue ",revue)
    if(plan.length>0){
      plan.map(plan=>{
        const newPlan = {}
        newPlan.id_revue_processus = revue.id
        newPlan.sujet = plan.sujet
        newPlan.nb_ticket = plan.ticket
        newPlan.commentaire = plan.commentaire
        all.push(newPlan)
      })
      console.log(all)
      Plan_action.bulkCreate(all,
        {
          ignoreDuplicates:true,
          validate:true,
          returning:true
        }
      )
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.error(error);
        res.status(400).json({ error });
      })
    }
  };

  const updatePlanAction = (req,res,next) =>{
    const {id,sujet,nb_ticket,commentaire} = req.body.item
    // console.log()
    Plan_action.update(
      {
        sujet : sujet,
        nb_ticket : nb_ticket,
        commentaire : commentaire
      },
      {
        where : 
        {
          id : id
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


  // const insertPlanActionCommentaire = (req,res,next) =>{
  //   const {id_plan_action,commentaire} = req.body.item
  //   // console.log()
  //   Plan_action_commentaire.create(
  //     { 
  //       id_plan_action : id_plan_action,
  //       commentaire: commentaire
  //     }
  //   )
  //   .then(function(results) {
  //     res.status(200).send(results);
  //   })
  //   .catch(function(error) {
  //     console.error(error);
  //     res.status(400).json({ error });
  //   })
  // };


  const getPlanActionByRevueProcessus = (req,res,next) =>{
    const {id_processus, id_revue_processus} = req.body.item
    Revue_processus.findAll(
      {
        where : 
        {
          id_processus : id_processus,
          id : id_revue_processus
        },
        include : 
        [
          {
            model: Plan_action,
            // include: [{
            //   model: Plan_action_commentaire,
            // }]
          }
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


  const desactivePlanAction = (req,res,next) =>{
    const id = req.body.item
    Plan_action.update(
      { 
        activate : 0
      },
      {
        where : 
        {
          id : id
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
  }


  

  



module.exports = {getTicketById, getTicketByManyId, getPlanAction, getPlanActionByRevueProcessus, 
                  insertPlanAction, insertManyPlanAction,
                  updatePlanAction, desactivePlanAction}