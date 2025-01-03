----Data Manipulation Language

DELETE FROM objectif.parametrage;
DELETE FROM objectif.unite;
DELETE FROM objectif.recuperation;
DELETE FROM menu_processus;
DELETE FROM menu_role;
DELETE FROM user_processus;
DELETE FROM user_role;
DELETE FROM processus;
DELETE FROM role;
DELETE FROM menus;
DELETE FROM users;

-- user
INSERT INTO public.users (id_user,matricule,nom,prenom,mot_de_passe,default_mdp) VALUES
	(1000,'T9000','DEV','MLE COMPARAISON ACTE','mis123','lum123'),
	(2000,'A0001','Admin','user','0000','lum123'),
	(3000,'Di0001','Direction','user','0000','lum123'),
	(4000,'R0001','Responsable','user','0000','lum123'),
	(5000,'MQ0001','MQ','user','0000','lum123'),
	(6000,'M0001','Manager','user','0000','lum123'),
	(7000,'00923','RAKOTONIAINA','Miandrisoa Haingonirina','rMh00923','lum123');


-- menus
INSERT INTO public.menus (id_menu,labelle_menu,icon,route,position,rang,base,etat) VALUES
	(1000,'Accueil','bi bi-bookmark-heart-fill','accueil',1,0,0,10),

	(1100,'Parametrage','bi bi-bookmark-heart-fill','parametrage',3,0,0,10),
		(1110,'Utilisateur','bi bi-person-circle','utilisateur',3,2,1100,10),	
			(1111,'Ajout','bi bi-file-earmark-plus','ajoutU',3,2,1110,10),
			(1112,'Liste','bi bi-list','listeU',3,2,1110,10),	
		(1120,'Menu','bi bi-list','menu',3,2,1100,10),
			(1121,'Ajout','bi bi-file-earmark-plus','ajoutU',3,2,1120,10),
			(1122,'Liste','bi bi-list','listeU',3,2,1120,10),	
	(1200,'Vue global','bi bi-file-earmark-plus','global',2,2,0,0),
	(1300,'Profils','bi bi-person-circle','profils',3,1,0,0),
	(1400,'Graphique','bi bi-calendar2-range','graphe',2,2,0,0),
	(1600,'Revue de direction','bi bi-easel','revueDirection',1,3,0,0),

	(1500,'Objectifs','bi bi-calendar2-range','gestionObjectifs',1,1,0,10),
		(1510,'Liste des objectifs','bi bi-calendar2-range','gestionObjectifs',1,1,1500,10),
		(1520,'Parametrage','bi bi-calendar2-range','multiParametrageObjectifs',1,2,1500,10),

	(2000,'Planning','bi bi-calendar3','planning',1,2,0,10),
	(2100,'Revue du plan','bi bi-inboxes','revue',1,3,0,10),
	(2200,'Efficacitée','bi bi-journal-check','efficacite',1,4,0,10),
	(2300, 'Revue performance', 'bi bi-graph-up-arrow', 'performance',1,5,0,10),
	(2400, 'Résultats des audits', 'bi bi-list-check', 'resultat',1,6,0,0),
	(2500, 'Plan d''action', 'bi bi-layers', 'plan',1,7,0,10)
;

	


-- role
INSERT INTO public.role (id_role, type_role,date_create) VALUES
	(0,'All','2024-04-11 13:32:58.054');
INSERT INTO public.role (type_role,date_create) VALUES
	('Developpeur','2024-04-11 13:32:58.054'),
	('Administrateur','2024-04-11 13:32:58.054'),
	('Direction','2024-04-08 16:18:04.678'),
	('Responsable processus','2024-04-08 16:18:15.356'),
	('MQ','2024-04-08 16:18:20.589'),
	('Manager','2024-04-08 16:18:20.589');


-- processus
INSERT INTO public.processus (id,libelle_processus,num_processus,abbrv, excel) VALUES
	(0,'All','0','ALL','ALL');
INSERT INTO public.processus (libelle_processus,num_processus,abbrv, excel) VALUES
	('Production','1','PRO', 'PRODUCTION'),
	('Méthode et qualité','2','MQ', 'METHODES ET QUALITE'),
	('Développement','6','DEV', 'DEVELOPPEMENT'),
	('Infra-tech','7','INF', 'INFRA-TECH'),
	('Service généraux','5','SER', 'SERVICES GENERAUX'),
	('Ressources humaines','3','RES', 'RESSOURCES HUMAINES'),
	('Administration','4','ADM', 'ADMINISTRATION'),
	('Approvisionnement','8','APPRO', 'APPROVISIONNEMENT'),
	('Facturation', '9','FACT', 'FACTURATION'),
	('Generale','8','GEN','GENERALE');


-- user_role
INSERT INTO public.user_role (id_user, id_role) VALUES
	(1000, 0),
	(2000, 2), (2000, 3),
	(3000, 3),
	(4000, 4),
	(5000, 5),
	(6000, 6),
	(7000, 2);

-- user_process
INSERT INTO public.user_processus (id_user, id_processus) VALUES
	(1000, 0),
	(2000, 0), 
	(3000, 0),
	(4000, 4), (4000, 5), (4000, 6),
	(5000, 5),
	(6000, 6),
	(7000, 0);


-- menu_role
INSERT INTO public.menu_role (id_menu, id_role) VALUES
	(1000, 0),
	(1100, 0),
		(1110,0),
			(1111,1),(1111,2),(1111,3),(1111,4),
			(1111,1),(1111,2),
		(1120,0),
			(1121,1), (1121,2),
			(1122,1), (1122,2),
	(1200, 1),
	(1300, 0),
	(1400, 0),
	(1500, 0),
		(1510, 0),
		(1520, 0),
	(1600, 0),
	(2000, 0),
	(2100, 0),
	(2200, 0),
	(2300, 0),
	(2400, 0),
	(2500, 0);

-- menu_process
INSERT INTO public.menu_processus (id_menu, id_processus) VALUES
	(1000, 0),
	(1100, 0),
		(1110,0),
			(1111,0),
			(1112,0),
		(1120,0),
			(1121,0), 
			(1122,0),
	(1200, 0),
	(1300, 0),
	(1400, 0),
	(1500, 0),
		(1510, 0),
		(1520, 0),
	(1600, 0),
	(2000, 0),
	(2100, 0),
	(2200, 0),
	(2300, 0),
	(2400, 0),
	(2500, 0);


INSERT INTO objectif.unite (type_unite,abbrv) VALUES
	('aucun',''),
	('pourcentage','%');

INSERT INTO objectif.recuperation (type_recuperation) VALUES
	(''),
	('Auto'),
	('Manuel'),
	('Excel à importer');


---Planning
INSERT INTO planning.planning_categorie VALUES
	(1, 'Revue de direction', 'RD'),
	(2, 'Audite', 'default')
;
INSERT INTO planning.planning VALUES
	(1, 1,'planning test','2024-04-28 11:37:45.946',null,'2024-04-28 11:37:45.946','2024-12-28 11:37:45.946',now(),'B')
;


---Revue_processus
INSERT INTO revue_direction.revue_processus VALUES
	(1,2,1,null,'2024-04-28 11:37:45.946',1);

-- ---Performance
INSERT INTO revue_direction.performance_objectif (id_parametrage,type_demande, libelle) VALUES
	(39, 'FAC', 'Fiche d''amelioration continue'),
	(40, 'FNC', 'Fiche non conformitée')
;
