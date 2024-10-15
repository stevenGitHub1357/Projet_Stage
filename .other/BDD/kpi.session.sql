
SELECT revue_processus.id, revue_processus.id_processus, revue_processus.date_cloture, revue_processus.statut, revue_processus.createdat, 
plan_actions.id AS plan_actions.id, 
plan_actions.id_revue_processus AS plan_actions.id_revue_processus, 
plan_actions.sujet AS plan_actions.sujet, 
plan_actions.nb_ticket AS plan_actions.nb_ticket, 
plan_actions.createdat AS plan_actions.createdat, 
plan_actions->plan_action_commentaires.id AS plan_actions.plan_action_commentaires.id, 
plan_actions->plan_action_commentaires.id_plan_action AS plan_actions.plan_action_commentaires.id_plan_action, 
plan_actions->plan_action_commentaires.commentaire AS plan_actions.plan_action_commentaires.commentaire 
FROM revue_direction.revue_processus AS revue_processus 
LEFT OUTER JOIN revue_direction.plan_action AS plan_actions ON revue_processus.id = plan_actions.id_revue_processus 
LEFT OUTER JOIN revue_direction.plan_action_commentaire AS plan_actions->plan_action_commentaires ON plan_actions.id = plan_actions->plan_action_commentaires.id_plan_action