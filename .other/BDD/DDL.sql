----Data Definition Language

CREATE SCHEMA IF NOT EXISTS objectif;
CREATE SCHEMA IF NOT EXISTS data_kpi;
CREATE SCHEMA IF NOT EXISTS revue_direction;

DROP VIEW IF EXISTS revue_direction.performance_objectif_processus;
DROP VIEW IF EXISTS revue_direction.performance_commentaire_final;
DROP VIEW IF EXISTS revue_direction.performance_objectif_detail;

DROP VIEW IF EXISTS revue_direction.performance_synthese;
DROP VIEW IF EXISTS revue_direction.performance_commentaire_final;
DROP VIEW IF EXISTS revue_direction.cloture;
DROP VIEW IF EXISTS revue_direction.performance_declare;
DROP VIEW IF EXISTS revue_direction.performance_objectif_detail;

DROP VIEW IF EXISTS data_kpi.fnc_fac_synthese;
DROP VIEW IF EXISTS data_kpi.fnc_fac_commentaire_final;
DROP VIEW IF EXISTS data_kpi.fac_efficace;
DROP VIEW IF EXISTS data_kpi.fnc_fac_realise_cloture;
DROP VIEW IF EXISTS data_kpi.fnc_fac_declare;

DROP VIEW IF EXISTS objectif.parametrage_objectif_synthese;
DROP VIEW IF EXISTS detail_user_processus;
DROP VIEW IF EXISTS detail_user_role;
DROP VIEW IF EXISTS menu_role_processus;


DROP TABLE IF EXISTS revue_direction.performance_objectif_commentaire;
DROP TABLE IF EXISTS revue_direction.performance_commentaire;
DROP TABLE IF EXISTS revue_direction.performance_objectif;
DROP TABLE IF EXISTS revue_direction.performance;
DROP TABLE IF EXISTS revue_direction.plan_action_commentaire;
DROP TABLE IF EXISTS revue_direction.plan_action;
DROP TABLE IF EXISTS revue_direction.revue_processus;
DROP TABLE IF EXISTS objectif.revue_direction;
DROP TABLE IF EXISTS data_kpi.fnc_fac_commentaire;
DROP TABLE IF EXISTS data_kpi.fnc_fac;
DROP TABLE IF EXISTS objectif.parametrage;
DROP TABLE IF EXISTS objectif.unite;
DROP TABLE IF EXISTS objectif.recuperation;
DROP TABLE IF EXISTS menu_processus;
DROP TABLE IF EXISTS menu_role;
DROP TABLE IF EXISTS user_processus;
DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS processus;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS users;



CREATE TABLE IF NOT EXISTS users(
  id_user SERIAL PRIMARY KEY,
  matricule VARCHAR(200) NOT NULL UNIQUE, 
  nom VARCHAR(300),
  prenom VARCHAR(300),
  mot_de_passe VARCHAR(200) DEFAULT 0000,
  default_mdp VARCHAR(200) DEFAULT 'lum123',
  activate INTEGER DEFAULT 1, 
  date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menus(
  id_menu SERIAL PRIMARY KEY,
  labelle_menu VARCHAR(200) NOT NULL,
  icon VARCHAR(500) NOT NULL DEFAULT 'bi bi-file-earmark-plus',
  route VARCHAR(200) NOT NULL DEFAULT 'global',
  position INTEGER DEFAULT 1,
  rang INTEGER DEFAULT 1,
  base INTEGER DEFAULT 0
);



CREATE TABLE IF NOT EXISTS role(
  id_role SERIAL PRIMARY KEY,
  type_role VARCHAR(300),
  date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_role(
  id_u_role SERIAL PRIMARY KEY,
  id_user INTEGER REFERENCES users(id_user),
  id_role INTEGER REFERENCES role(id_role)
);

CREATE TABLE IF NOT EXISTS menu_role(
  id_m_role SERIAL PRIMARY KEY,
  id_menu INTEGER REFERENCES menus(id_menu),
  id_role INTEGER REFERENCES role(id_role)
);



CREATE TABLE IF NOT EXISTS processus(
  id SERIAL PRIMARY KEY,
  libelle_processus VARCHAR(200),
  num_processus VARCHAR(100) DEFAULT 0,
  abbrv VARCHAR(100), 
  date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  excel VARCHAR(200) DEFAULT null
);

CREATE TABLE IF NOT EXISTS user_processus(
  id_u_processus SERIAL PRIMARY KEY,
  id_user INTEGER REFERENCES users(id_user),
  id_processus INTEGER REFERENCES processus(id)
);

CREATE TABLE IF NOT EXISTS menu_processus(
  id_m_processus SERIAL PRIMARY KEY,
  id_menu INTEGER REFERENCES menus(id_menu),
  id_processus INTEGER REFERENCES processus(id)
);





---Parametrage objectif---

CREATE TABLE IF NOT EXISTS objectif.unite(
  id SERIAL PRIMARY KEY,
  type_unite VARCHAR(200) not null,
  abbrv VARCHAR(100) not null
);

CREATE TABLE IF NOT EXISTS objectif.recuperation(
  id SERIAL PRIMARY KEY,
  type_recuperation VARCHAR(200) not null
);

CREATE TABLE IF NOT EXISTS objectif.parametrage(
  id SERIAL PRIMARY KEY,
  id_processus INTEGER REFERENCES public.processus(id) default 1,
  objectifs VARCHAR(2000),
  poids DOUBLE precision default 0,
  cible VARCHAR(100) default 0,
  id_unite INTEGER REFERENCES objectif.unite(id) default 1,
  recuperation INTEGER REFERENCES objectif.recuperation(id) default 1,
  support VARCHAR(300),
  activate INTEGER default 1,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--objectif_revue_direction
CREATE TABLE IF NOT EXISTS objectif.revue_direction(
  id SERIAL PRIMARY KEY,
  id_parametrage INTEGER REFERENCES objectif.parametrage(id),
  revue_direction VARCHAR(500),
  libelle VARCHAR(500)
);

---data_kpi

  ---fnc_fac---

CREATE TABLE IF NOT EXISTS data_kpi.fnc_fac(
  id SERIAL PRIMARY KEY,
  type_demande VARCHAR(100) DEFAULT 'FAC',
  titre VARCHAR(1000),
  objectif VARCHAR(1000),
  realise DOUBLE precision,
  date_demande DATE,
  date_cloture DATE,
  statut VARCHAR(1000),
  id_statut INTEGER default 0,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_kpi.fnc_fac_commentaire(
  id SERIAL PRIMARY KEY,
  annee INTEGER,
  type_demande VARCHAR(100),
  commentaire VARCHAR(300),
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--revue_direction
-- DROP TABLE IF EXISTS revue_direction.plan_action_commentaire;
-- DROP TABLE IF EXISTS revue_direction.plan_action;
-- DROP TABLE IF EXISTS revue_direction.revue_processus;
  --revue_processus
CREATE TABLE IF NOT EXISTS revue_direction.revue_processus(
  id SERIAL PRIMARY KEY,
  id_processus INTEGER REFERENCES public.processus(id),
  date_cloture TIMESTAMP DEFAULT (NOW() + INTERVAL '1 year'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  statut VARCHAR(200)
);

  --plan_action
CREATE TABLE IF NOT EXISTS revue_direction.plan_action(
  id SERIAL PRIMARY KEY,
  id_revue_processus INTEGER REFERENCES revue_direction.revue_processus(id),
  sujet VARCHAR(2000),
  nb_ticket VARCHAR(200),
  activate INTEGER DEFAULT 1,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS revue_direction.plan_action_commentaire(
  id SERIAL PRIMARY KEY,
  id_plan_action INTEGER REFERENCES revue_direction.plan_action(id),
  commentaire VARCHAR(200),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


  --performance
-- DROP VIEW IF EXISTS revue_direction.performance_objectif_processus;
-- DROP VIEW IF EXISTS revue_direction.performance_commentaire_final;
-- DROP VIEW IF EXISTS revue_direction.performance_objectif_detail;

-- DROP TABLE IF EXISTS revue_direction.performance_commentaire;
-- DROP TABLE IF EXISTS revue_direction.performance_objectif;
-- DROP TABLE IF EXISTS revue_direction.performance;

CREATE TABLE IF NOT EXISTS revue_direction.performance_objectif(
  id SERIAL PRIMARY KEY,
  id_parametrage INTEGER REFERENCES objectif.parametrage(id),
  type_demande VARCHAR(500),
  libelle VARCHAR(500)
);


CREATE TABLE IF NOT EXISTS revue_direction.performance(
  id SERIAL PRIMARY KEY,
  id_base INTEGER,
  type_demande VARCHAR(100) DEFAULT 'Default',
  titre VARCHAR(1000),
  objectif VARCHAR(1000),
  realise DOUBLE precision,
  date_demande DATE,
  date_cloture DATE,
  statut VARCHAR(1000),
  id_statut INTEGER default 0,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS revue_direction.performance_objectif_commentaire(
  id SERIAL PRIMARY KEY,
  id_revue_processus INTEGER REFERENCES revue_direction.revue_processus(id),
  id_objectif INTEGER REFERENCES objectif.parametrage(id),
  commentaire VARCHAR(200),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS revue_direction.performance_commentaire(
  id SERIAL PRIMARY KEY,
  id_revue_processus INTEGER REFERENCES revue_direction.revue_processus(id),
  type_demande VARCHAR(200),
  commentaire VARCHAR(200),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);











