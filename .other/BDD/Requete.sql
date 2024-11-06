SELECT 
	p.id as id, p.id_processus as id_processus, p.objectifs as objectifs, p.poids as poids, p.cible as cible, 
	p.id_unite as id_unite, u.type_unite as type_unite, u.abbrv as abbrv,
	p.recuperation as id_recuperation, r.type_recuperation as type_recuperation,
	p.support as support, p.activate as activate,
    po.type_demande as type_demande, po.libelle as libelle,
	CASE 
		WHEN por.id_revue_processus IS NULL  
			THEN 0
			ELSE por.id_revue_processus
	END AS id_revue_processus,
	CASE 
		WHEN por.realise IS NULL  
			THEN 0
			ELSE por.realise
	END AS realise,
	CASE 
		WHEN por.taux IS NULL  
			THEN 0
			ELSE por.taux
	END AS taux,
	CASE 
		WHEN por.commentaire IS NULL  
			THEN '-'
			ELSE por.commentaire
	END AS commentaire,
	CASE 
		WHEN por.commentaire IS NULL and por.taux IS NULL and por.realise IS NULL 
			THEN 0
			ELSE 1
	END AS existe

    from objectif.parametrage as p
left JOIN revue_direction.performance_objectif as po on p.id = po.id_parametrage
left join revue_direction.performance_objectif_revue as por on  p.id = por.id_parametrage	
JOIN objectif.unite as u on u.id = p.id_unite
JOIN objectif.recuperation as r on r.id = p.recuperation;


-- 	--Performance_commentaire_objectif_final
-- CREATE or replace VIEW revue_direction.performance_objectif_commentaire_final AS
-- SELECT DISTINCT ON (id_revue_processus,id_objectif) *
-- 	FROM revue_direction.performance_objectif_commentaire pc 
-- ORDER BY id_revue_processus,id_objectif,createdat desc;

	--Performance_objectif_processus
CREATE or replace VIEW revue_direction.performance_objectif_processus_only as
	select 	
		pod.id as id,
		rp.id as id_revue_processus,
		pod.id_revue_processus as id_revue_processus_detail,
		rp.id_processus as id_processus,
		rp.date_cloture as date_cloture_revue_processus, rp.createdat as date_create_revue_processus,
		pod.objectifs as objectifs, pod.poids as poids, pod.cible as cible, pod.abbrv as abbrv,
		pod.type_demande as type_demande, pod.libelle as libelle ,pod.activate as activate,
		pod.id_recuperation as id_recuperation, pod.type_recuperation as type_recuperation,
		CASE 
	        WHEN sum(p.realise)/count(p.realise) IS NOT NULL
	        	THEN sum(p.realise)/count(p.realise)
	       	 	ELSE pod.realise
	    END AS realise,
		CASE 
	        WHEN pod.cible SIMILAR TO '[-+]?[0-9]*\.?[0-9]+' and (cast(pod.cible as decimal(10,2))*(sum(p.realise)/count(p.realise)))/100 is not null
	        	THEN (cast(pod.cible as decimal(10,2))*(sum(p.realise)/count(p.realise)))/100
	       	 	ELSE pod.taux 
	    END AS taux,
		pod.commentaire as commentaire,
		pod.existe as existe
    from revue_direction.performance_objectif_detail pod 
left join revue_direction.revue_processus rp on pod.id_processus = rp.id_processus  
left join revue_direction.performance p on p.type_demande = pod.type_demande and p.date_demande >= rp.createdat and p.date_demande < COALESCE(rp.date_cloture, CURRENT_DATE)
-- left join revue_direction.performance_objectif_commentaire_final as pcf on pcf.id_revue_processus = rp.id and pcf.id_objectif = pod.id 
	group by 
		rp.id,rp.id_processus ,rp.date_cloture ,rp.createdat,
		pod.id, pod.objectifs ,pod.poids ,pod.cible ,pod.abbrv ,pod.type_demande ,pod.libelle, pod.activate,
		pod.commentaire, pod.realise, pod.taux, pod.id_recuperation, pod.type_recuperation, pod.existe, pod.id_revue_processus 
;

	CREATE or replace VIEW revue_direction.performance_objectif_processus as
select 	
		id as id,
		CASE 
			WHEN id_revue_processus = id_revue_processus_detail
	        	THEN id_revue_processus_detail
	       	 	ELSE id_revue_processus 
	    END AS id_revue_processus,

		id_processus as id_processus,
		date_cloture_revue_processus as date_cloture_revue_processus, date_create_revue_processus as date_create_revue_processus,
		objectifs as objectifs, poids as poids, cible as cible, abbrv as abbrv,
		type_demande as type_demande, libelle as libelle ,activate as activate,
		id_recuperation as id_recuperation, type_recuperation as type_recuperation,
		CASE 
	        WHEN id_revue_processus = id_revue_processus_detail
	        	THEN realise
	       	 	ELSE 0
	    END AS realise,
		CASE 
	        WHEN id_revue_processus = id_revue_processus_detail
	        	THEN taux
	       	 	ELSE 0 
	    END AS taux,
		CASE 
	        WHEN id_revue_processus = id_revue_processus_detail
	        	THEN commentaire
	       	 	ELSE '-' 
	    END AS commentaire,
		CASE 
	        WHEN id_revue_processus = id_revue_processus_detail
	        	THEN 1
	       	 	ELSE 0 
	    END AS existe
    from revue_direction.performance_objectif_processus_only
;


select * from revue_direction.revue_processus;