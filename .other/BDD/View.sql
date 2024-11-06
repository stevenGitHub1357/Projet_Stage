
DROP VIEW IF EXISTS revue_direction.perf_synthese;
DROP VIEW IF EXISTS revue_direction.perf_commentaire_final;
DROP VIEW IF EXISTS revue_direction.perf_efficace;
DROP VIEW IF EXISTS revue_direction.perf_cloture;
DROP VIEW IF EXISTS revue_direction.perf_declare;


DROP VIEW IF EXISTS revue_direction.performance_objectif_processus;
DROP VIEW IF EXISTS revue_direction.performance_objectif_processus_only;
DROP VIEW IF EXISTS revue_direction.performance_commentaire_final;
DROP VIEW IF EXISTS revue_direction.performance_objectif_detail;
DROP VIEW IF EXISTS revue_direction.performance_cloture;


DROP VIEW IF EXISTS objectif.parametrage_objectif_synthese;
DROP VIEW IF EXISTS detail_user_processus;
DROP VIEW IF EXISTS detail_user_role;
DROP VIEW IF EXISTS menu_role_processus;


--Detaile_user_role
CREATE or replace VIEW detail_user_role as
    select ur.id_u_role as id_u_role, ur.id_user as id_user,
	r.id_role as id_role , r.type_role  as type_role , r.date_create as date_create 
	from user_role as ur
join role as r on ur.id_role = r.id_role;

--Detail_user_processus
CREATE or replace VIEW detail_user_processus as
    select ur.id_u_processus as id_u_processus, ur.id_user as id_user,
	p.id as id_processus , p.libelle_processus as libelle_processus , p.num_processus as num_processus, p.abbrv as abbrv , p.excel as excel, p.date_create as date_create 
	from user_processus as ur
join processus as p on ur.id_processus = p.id;

--Menu_role_processus
CREATE or replace VIEW menu_role_processus as
select 
	m.id_menu as id_menu , m.labelle_menu as labelle_menu, m.icon as icon , 
	m.route as route , m."position" as position , m.rang as rang , m.base as base,
	mp.id_processus as id_processus , mr.id_role as id_role, m.etat as etat 
	from menus as m
join menu_processus mp on m.id_menu = mp.id_menu  
join menu_role mr on m.id_menu = mp.id_menu 
	group by m.id_menu , m.labelle_menu , m.icon ,
		m.route , m."position" , m.rang ,m.base ,
		mp.id_processus , mr.id_role 
	order by m.rang ASC;
		
--Parametrage_objectif_synthese
CREATE or replace VIEW objectif.parametrage_objectif_synthese as
select 	
	id_processus as id_processus, proc.libelle_processus as libelle_processus ,
	count(*) as nb_objectif,sum(poids) as poids  
	from objectif.parametrage p
join processus as proc on proc.id = p.id_processus 
Where p.activate != 0
	group by id_processus , libelle_processus
	ORDER BY poids DESC;





--Performance
	--Perfromance_objectif_detail
CREATE or replace VIEW revue_direction.performance_objectif_detail as
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
	CREATE or replace VIEW revue_direction.performance_objectif_processus as
select param.id as id,
		rp.id as id_revue_processus,
		rp.id_processus as id_processus,
		rp.date_cloture as date_cloture_revue_processus, rp.createdat as date_create_revue_processus,
		param.objectifs as objectifs, param.poids as poids, param.cible as cible, u.abbrv as abbrv, param.activate as activate,
		p.type_demande as type_demande, po.libelle as libelle ,
		r.id as id_recuperation, r.type_recuperation as type_recuperation,
		CASE 
	        WHEN r.id = 2
	        	THEN COALESCE(sum(p.realise)/count(p.realise),0)
	       	 	ELSE COALESCE(pop.realise,0)
	    END AS realise,
		CASE 
	        WHEN r.id = 2
	        	THEN COALESCE(((cast(param.cible as decimal(10,2))*(sum(p.realise)/count(p.realise)))/100),0)
	       	 	ELSE COALESCE(pop.taux,0) 
	    END AS taux,
		CASE 
	        WHEN pop.id is null
	        	THEN 0
	       	 	ELSE 1
	    END AS existe,
		COALESCE(pop.commentaire,'-') as commentaire
from revue_direction.revue_processus rp 
join objectif.parametrage param on param.id_processus =  rp.id_processus
join objectif.unite u on u.id = param.id_unite 
join objectif.recuperation r on r.id = param.recuperation 
left join revue_direction.performance_objectif po on po.id_parametrage = param.id
left join revue_direction.performance_objectif_revue pop on pop.id_revue_processus = rp.id and pop.id_parametrage = param.id 
left join revue_direction.performance p on p.type_demande = po.type_demande and p.date_demande >= rp.createdat and p.date_demande < COALESCE(rp.date_cloture, CURRENT_DATE)

group by param.id, rp.id, rp.id_processus, rp.date_cloture, rp.createdat, 
			param.objectifs, param.poids, param.cible, u.abbrv, param.activate,
			p.type_demande, po.libelle, r.id, r.type_recuperation, 
			pop.realise, pop.taux, pop.commentaire, pop.id
;
	
	---Performance_declarer
	CREATE OR replace VIEW revue_direction.perf_declare as
select 
	count(*) as declarer, p.type_demande as type_demande, 
	pop.id_revue_processus as id_revue_processus,
    pop.date_create_revue_processus as date_create_revue,
    EXTRACT(year from pop.date_create_revue_processus) as annee, 
    TO_CHAR(pop.date_create_revue_processus, 'Month') as mois,
	pop.abbrv as abbrv, pop.cible as cible
	from revue_direction.performance p 
join revue_direction.performance_objectif_processus as pop on pop.type_demande = p.type_demande
GROUP BY p.type_demande,  pop.date_create_revue_processus, pop.id_revue_processus, pop.abbrv, pop.cible;

	---Performance_cloturer
	CREATE OR replace VIEW revue_direction.perf_cloture as
select 
	count(*) as cloture, p.type_demande as type_demande, 
    pop.date_create_revue_processus as date_create_revue,
	pop.id_revue_processus as id_revue_processus,
    EXTRACT(year from pop.date_create_revue_processus) as annee, 
    TO_CHAR(pop.date_create_revue_processus, 'Month') as mois
	from revue_direction.performance p 
join revue_direction.performance_objectif_processus as pop on pop.type_demande = p.type_demande
WHERE id_statut=0
GROUP BY p.type_demande,  pop.date_create_revue_processus, pop.id_revue_processus;

	---Performance_efficace
	CREATE OR replace VIEW revue_direction.perf_efficace as
select 
	count(*) as efficace, p.type_demande as type_demande, 
	pop.id_revue_processus as id_revue_processus,
    pop.date_create_revue_processus as date_create_revue,
    EXTRACT(year from pop.date_create_revue_processus) as annee, 
    TO_CHAR(pop.date_create_revue_processus, 'Month') as mois,
    pop.cible as cible, pop.abbrv as abbrv
	from revue_direction.performance p 
join revue_direction.performance_objectif_processus as pop on pop.type_demande = p.type_demande
WHERE id_statut=0 and p.realise >= cast(pop.cible as decimal(10,2))
GROUP BY p.type_demande,  pop.date_create_revue_processus, pop.cible, pop.abbrv, pop.id_revue_processus;

	---Perfromance_commentaire
	CREATE OR replace VIEW revue_direction.perf_commentaire_final as 
select DISTINCT ON (id_revue_processus, type_demande) *
	from revue_direction.performance_commentaire c
ORDER BY id_revue_processus, type_demande, createdat DESC;

	---Performance_synthese
	CREATE OR replace VIEW revue_direction.perf_synthese as
select pd.type_demande as type_demande, pd.id_revue_processus as id_revue_processus,
		pd.mois as mois, pd.annee as annee,
	    pd.declarer as declarer,
		CASE 
	        WHEN pc.cloture is null  THEN 0
	        ELSE pc.cloture
	    END as cloture,
	    CASE 
	        WHEN pc.cloture is null  THEN 0
	        ELSE pc.cloture*100/pd.declarer
	    END as taux,
	    CASE 
	        WHEN pe.efficace is null THEN 0
	        ELSE pe.efficace
	    END as efficace,
		pd.abbrv as abbrv, pd.cible as cible,
		pcf.commentaire as commentaire
	from revue_direction.perf_declare pd 
left join revue_direction.perf_cloture as pc on pc.id_revue_processus = pd.id_revue_processus and pc.type_demande = pd.type_demande
left join revue_direction.perf_efficace as pe on pe.id_revue_processus = pd.id_revue_processus and pe.type_demande = pd.type_demande
left join revue_direction.perf_commentaire_final as pcf on pcf.id_revue_processus = pd.id_revue_processus and pcf.type_demande = pd.type_demande;








