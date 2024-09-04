SELECT "paremetrage_objectif"."id", "paremetrage_objectif"."id_processus", 
"paremetrage_objectif"."objectifs", "paremetrage_objectif"."poids", 
"paremetrage_objectif"."cible", "paremetrage_objectif"."id_unite", 
"paremetrage_objectif"."recuperation", "paremetrage_objectif"."uniteId", 
"unite"."id" AS "unite.id", "unite"."type_unite" AS "unite.type_unite", 
"unite"."abbrv" AS "unite.abbrv" 
FROM "param_obj"."parametrage_objectif" 
AS "paremetrage_objectif" 
LEFT OUTER JOIN "param_obj"."unite" AS "unite" ON "paremetrage_objectif"."id_unite" = "unite"."id"