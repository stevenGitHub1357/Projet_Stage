-- DROP TABLE IF EXISTS menu_processus;
-- DROP TABLE IF EXISTS menu_role;
-- DROP TABLE IF EXISTS user_processus;
-- DROP TABLE IF EXISTS user_role;
-- DROP TABLE IF EXISTS processus;
-- DROP TABLE IF EXISTS role;
-- DROP TABLE IF EXISTS menus;
-- DROP TABLE IF EXISTS users;

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
  rang INTEGER NOT NULL,
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
  date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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