SELECT  
        p.id as id, p.id_processus as id_processus, p.objectifs as objectifs, p.poids as poids, p.cible as cible, p.id_unite as unite, p.recuperation as recuperation, p.support as support, p.activate as activate,
        po.performance as performance, po.libelle as libelle
    from objectif.parametrage as p
JOIN revue_direction.performance_objectif as po on p.id = po.id_parametrage