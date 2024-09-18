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
	(1,'D0001','RATOVOSON','Lanja Steven','0000','lum123'),
	(2,'A0001','Admin','user','0000','lum123'),
	(3,'Di0001','Direction','user','0000','lum123'),
	(4,'R0001','Responsable','user','0000','lum123'),
	(5,'MQ0001','MQ','user','0000','lum123'),
	(6,'M0001','Manager','user','0000','lum123');


-- menus
INSERT INTO public.menus (id_menu,labelle_menu,icon,route,position,"rang",base) VALUES
	(10,'Accueil','bi bi-bookmark-heart-fill','accueil',1,0,0),
	(1,'Parametrage','bi bi-bookmark-heart-fill','parametrage',3,0,0),
		(111,'Utilisateur','bi bi-person-circle','utilisateur',3,2,1),	
			(1111,'Ajout','bi bi-file-earmark-plus','ajoutU',3,2,111),
			(1112,'Liste','bi bi-list','listeU',3,2,111),	
		(112,'Menu','bi bi-list','menu',3,2,1),
			(1121,'Ajout','bi bi-file-earmark-plus','ajoutU',3,2,112),
			(1122,'Liste','bi bi-list','listeU',3,2,112),	
	(2,'Vue global','bi bi-file-earmark-plus','global',2,2,0),
	(3,'Profils','bi bi-person-circle','profils',3,1,0),
	(4,'Graphique','bi bi-calendar2-range','graphe',2,2,0),
	(5,'Parametrage objectifs','bi bi-calendar2-range','objectif?page=1',1,1,0),
		(151,'Liste','bi bi-calendar2-range','objectif?page=1',1,2,5),
		(152,'Ajout','bi bi-calendar2-range','objectif?page=2',1,2,5);


-- role
INSERT INTO public."role" (id_role,type_role,date_create) VALUES
	(0,'All','2024-04-11 13:32:58.054'),
	(1,'Developpeur','2024-04-11 13:32:58.054'),
	(2,'Administrateur','2024-04-11 13:32:58.054'),
	(3,'Direction','2024-04-08 16:18:04.678'),
	(4,'Responsable processus','2024-04-08 16:18:15.356'),
	(5,'MQ','2024-04-08 16:18:20.589'),
	(6,'Manager','2024-04-08 16:18:20.589');


-- processus
INSERT INTO public.processus (id,libelle_processus,num_processus,abbrv, excel) VALUES
	(0,'All','0','ALL',NULL),
	(1,'Production','1','PRO', 'PRODUCTION'),
	(2,'Méthode et qualité','2','MET', 'METHODES ET QUALITE'),
	(3,'Développement','3','DEV', 'DEVELOPPEMENT'),
	(4,'Infra-tech','4','INF', 'INFRA-TECH'),
	(5,'Service généraux','5','SER', 'SERVICES GENERAUX'),
	(6,'Ressources humaines','6','RES', 'RESSOURCES HUMAINES'),
	(7,'Administration','7','ADM', 'ADMINISTRATION'),
	(8,'Approvisionnement','8','APPRO', 'APPROVISIONNEMENT'),
	(9,'Facturation', '9','FACT', 'FACTURATION'),
	(100,'Generale','8','GEN',NULL);


-- user_role
INSERT INTO public.user_role (id_user, id_role) VALUES
	(1, 1),
	(2, 2), (2, 3),
	(3, 3),
	(4, 4),
	(5, 5),
	(6, 6);

-- user_process
INSERT INTO public.user_processus (id_user, id_processus) VALUES
	(1, 0),
	(2, 0), 
	(3, 0),
	(4, 4), (4, 5), (4, 6),
	(5, 5),
	(6, 6);


-- menu_role
INSERT INTO public.menu_role (id_menu, id_role) VALUES
	(10, 0),
	(1, 0),
		(111,0),
			(1111,1),(1111,2),(1111,3),(1111,4),
			(1111,1),(1111,2),
		(112,0),
			(1121,1), (1121,2),
			(1122,1), (1122,2),
	(2, 1),
	(3, 0),
	(4, 0),
	(5, 0),
		(151, 0),
		(152, 0);

-- menu_process
INSERT INTO public.menu_processus (id_menu, id_processus) VALUES
	(10, 0),
	(1, 0),
		(111,0),
			(1111,0),
			(1112,0),
		(112,0),
			(1121,0), 
			(1122,0),
	(2, 0),
	(3, 0),
	(4, 0),
	(5, 0),
		(151, 0),
		(152, 0);


INSERT INTO objectif.unite VALUES
	(1,'aucun',''),
	(2,'pourcentage','%');

INSERT INTO objectif.recuperation VALUES
	(0,''),
	(1,'Auto'),
	(2,'Manuel'),
	(3,'Excel à importer');

INSERT INTO objectif.parametrage VALUES
	(1, 1,	'Prospect de nouveaux clients',	0.1, 1, 1, 1,'a', 1,null,null),
	(2, 1,	'Seuil de sous-activité à 1%',	0.05, 1, 1, 2,'e', 1,null,null),
	(3, 1,	'97% des projets respectent le taux qualité en interne', 0.25, 97, 1, 2,'f', 1,null,null),
	(4, 1,	'10% de gains minimum pour les nouveaux projets', 0.25, 10, 1, 2,'g', 1,null,null),
	(5, 1,	'5% de gains minimum par rapport à l ''année dernières', 0.25, 5, 1, 2,'g', 1,null,null),
	(6, 1,	'KHD à 91%', 0.1, 91, 1, 2,'j', 1,null,null);
