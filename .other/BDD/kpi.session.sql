SELECT "revue_direction"."id", 
    "revue_direction"."id_parametrage", 
    "revue_direction"."revue_direction", 
    "revue_direction"."libelle", 
    "paremetrage"."id" AS "paremetrage.id", 
    "paremetrage"."id_processus" AS "paremetrage.id_processus", 
    "paremetrage"."objectifs" AS "paremetrage.objectifs", 
    "paremetrage"."poids" AS "paremetrage.poids", 
    "paremetrage"."cible" AS "paremetrage.cible", 
    "paremetrage"."id_unite" AS "paremetrage.id_unite", 
    "paremetrage"."recuperation" AS "paremetrage.recuperation", 
    "paremetrage"."activate" AS "paremetrage.activate", 
    "paremetrage"."support" AS "paremetrage.support", 
    "paremetrage"."createat" AS "paremetrage.createat", 
    "paremetrage"."updateat" AS "paremetrage.updateat" 
    FROM "objectif"."revue_direction" AS "revue_direction" 
    LEFT OUTER JOIN "objectif"."parametrage" AS "paremetrage" ON "revue_direction"."id" = "paremetrage"."id";