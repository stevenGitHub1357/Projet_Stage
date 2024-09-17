----Data Definition Language

CREATE SCHEMA IF NOT EXISTS objectif;


DROP VIEW IF EXISTS detail_user_processus;
DROP VIEW IF EXISTS detail_user_role;
DROP VIEW IF EXISTS menu_role_processus;


DROP TABLE IF EXISTS objectif.parametrage;
DROP TABLE IF EXISTS objectif.unite;
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

CREATE TABLE IF NOT EXISTS objectif.parametrage(
  id SERIAL PRIMARY KEY,
  id_processus INTEGER REFERENCES public.processus(id) default 1,
  objectifs VARCHAR(2000),
  poids DOUBLE precision default 0,
  cible VARCHAR(100) default 0,
  id_unite INTEGER REFERENCES objectif.unite(id) default 1,
  recuperation INTEGER default 1,
  activate INTEGER default 1,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

