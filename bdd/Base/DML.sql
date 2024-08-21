-- menus
INSERT INTO public.menus (labelle_menu,icon,route,"range",sous_menus,"role") VALUES
	('Menu','bi bi-list','menu',5,'[]','["1"]'),
	('Utilisateur','bi bi-person-circle','utilisateur',6,'[]','["1","2"]'),
	('Parametrage','bi bi-bookmark-heart-fill','parametrage2',0,'[]','["1","2","3"]'),
	('vue global','bi bi-file-earmark-plus','global',4,'[]','["1","2","3","4"]')
	 ;


-- role
INSERT INTO public."role" (id_role,type_role,date_create) VALUES
	(1,'Developpeur','2024-04-11 13:32:58.054'),
	(2,'Administrateur','2024-04-11 13:32:58.054'),
	(3,'Direction','2024-04-08 16:18:04.678'),
	(4,'Responsable processus','2024-04-08 16:18:15.356'),
	(5,'MQ','2024-04-08 16:18:20.589'),
	(6,'Manager','2024-04-08 16:18:20.589');
	 

-- user
INSERT INTO public.users (matricule,nom,prenom,mot_de_passe,id_role,default_mdp) VALUES
	('0001','RATOVOSON','Lanja Steven','0000','1','lum123'),
	('0002','Admin','user','0000','2','lum123'),
	('0003','Direction','user','0000','3','lum123'),
	('0004','Responsable','user','0000','4','lum123'),
	('0005','MQ','user','0000','5','lum123'),
	('0006','Manager','0000','m123','6','lum123');