DROP VIEW IF EXISTS data_kpi.fnc_fac_synthese;
DROP VIEW IF EXISTS data_kpi.fnc_fac_commentaire_final;
DROP VIEW IF EXISTS data_kpi.fac_efficace;
DROP VIEW IF EXISTS data_kpi.fnc_fac_realise_cloture;
DROP VIEW IF EXISTS data_kpi.fnc_fac_declare;


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
	mp.id_processus as id_processus , mr.id_role as id_role 
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



---MQ
	---FNC_FAC_declarer
	CREATE OR replace VIEW data_kpi.fnc_fac_declare as
select count(*) as declarer, type_demande, EXTRACT(year from date_demande) as annee 
	from data_kpi.fnc_fac ff  
	group by annee, type_demande, annee;

	--FNC_FAC_realise_cloture
	CREATE OR replace VIEW data_kpi.fnc_fac_realise_cloture as 
select count(*) as realise_cloture, type_demande, EXTRACT(year from date_demande) as annee 
	from data_kpi.fnc_fac ff 
where id_statut=0 
	group by annee, type_demande, annee;

		--FAC_efficace
	CREATE OR replace VIEW data_kpi.fac_efficace as 
select count(*) as efficace, type_demande, EXTRACT(year from date_demande) as annee 
	from data_kpi.fnc_fac ff 
where id_statut=0 and realise>=90
	group by annee, type_demande, annee;

	--FNC_FAC_commentaire
	CREATE OR replace VIEW data_kpi.fnc_fac_commentaire_final as 
SELECT DISTINCT ON (annee,type_demande) *
	FROM data_kpi.fnc_fac_commentaire ffc
ORDER BY annee,type_demande,createat desc 

	--FNC_FAC_synthese
	CREATE OR replace VIEW data_kpi.fnc_fac_synthese as
select ffd.annee as annee, ffd.type_demande as type_demande, 
	    ffd.declarer as declarer,
		CASE 
	        WHEN ffrc.realise_cloture is null  THEN 0
	        ELSE ffrc.realise_cloture
	    END as realise_cloture,
	    CASE 
	        WHEN ffrc.realise_cloture is null  THEN 0
	        ELSE ffrc.realise_cloture*100/ffd.declarer
	    END as taux,
	    CASE 
	        WHEN face.efficace is null THEN 0
	        ELSE face.efficace
	    END as fac_efficace,
		commentaire 
	from data_kpi.fnc_fac_declare ffd 
left join data_kpi.fnc_fac_realise_cloture as ffrc on ffrc.annee = ffd.annee and ffrc.type_demande = ffd.type_demande
left join data_kpi.fac_efficace as face on face.annee = ffd.annee and face.type_demande = ffd.type_demande
left join data_kpi.fnc_fac_commentaire_final as ffcf on ffcf.annee = ffd.annee and ffcf.type_demande = ffd.type_demande