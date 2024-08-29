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
	(1,'Parametrage','bi bi-bookmark-heart-fill','parametrage2',1,0,0),
		(111,'Utilisateur','bi bi-person-circle','utilisateurP',1,2,1),	
			(112,'Ajout Utilisateur','bi bi-person-circle','AjoutP',1,2,111),
	(2,'Vue global','bi bi-file-earmark-plus','global',2,2,0),
		(122,'Utilisateur','bi bi-person-circle','utilisateurV',2,2,2),	
			(123,'Ajout Utilisateur','bi bi-person-circle','AjoutV',2,2,122),
	(3,'Profils','bi bi-person-circle','Profils',3,1,0),
		(133,'Utilisateur','bi bi-person-circle','utilisateurProf',3,2,3),	
			(134,'Ajout Utilisateur','bi bi-person-circle','AjoutProf',3,2,133),
	(4,'Only developpement','bi bi-file-earmark-plus','Only',1,3,0),
	(5,'Menu','bi bi-list','menu',3,3,0);


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
INSERT INTO public.processus (id,libelle_processus,num_processus,abbrv) VALUES
	(0,'All','0','ALL'),
	(1,'Production','1','PRO'),
	(2,'Méthode et qualité','2','MET'),
	(3,'Développement','3','DEV'),
	(4,'Infra-tech','4','INF'),
	(5,'Service généraux','5','SER'),
	(6,'Ressources humaines','6','RES'),
	(7,'Administration','7','ADM'),
	(8,'Generale','8','GEN');


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
	(1, 1), (1, 2), (1, 3), (1, 4),
	(111,1),
	(112,1),
	(2, 0),
	(122,0),
	(123,0),
	(3, 0),
	(133,0), 
	(134,1), (134, 2), (134, 3),
	(4, 1),
	(5, 1);

-- menu_process
INSERT INTO public.menu_processus (id_menu, id_processus) VALUES
	(1, 8), (1, 3),
	(111,1),
	(112,1),
	(2, 0),
	(122,0),
	(123,0),
	(3, 0),
	(133,0), 
	(134,0), (134, 0), (134, 0),
	(4, 0),
	(5, 8), (5, 2), (5, 3);