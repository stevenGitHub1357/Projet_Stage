--Detaile_user_role
CREATE or replace VIEW detail_user_role as
    select ur.id_u_role as id_u_role, ur.id_user as id_user,
	r.id_role as id_role , r.type_role  as type_role , r.date_create as date_create 
	from user_role as ur
join role as r on ur.id_role = r.id_role;

--Detail_user_processus
CREATE or replace VIEW detail_user_processus as
    select ur.id_u_processus as id_u_processus, ur.id_user as id_user,
	p.id as id_processus , p.libelle_processus as libelle_processus , p.num_processus as num_processus, p.abbrv as abbrv , p.date_create as date_create 
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
	order by m.rang ASC
		
--Detaile