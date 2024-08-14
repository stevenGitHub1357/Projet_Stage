-- menus
CREATE TABLE public.menus (
  id_menu SERIAL,
  labelle_menu VARCHAR(50),
  icon VARCHAR(50),
  route VARCHAR(50),
  range INTEGER,
  sous_menus TEXT,
  role TEXT,
  CONSTRAINT menus_pkey PRIMARY KEY(id_menu)
) 
WITH (oids = false);

ALTER TABLE public.menus
  ALTER COLUMN labelle_menu SET STATISTICS 0;

ALTER TABLE public.menus
  ALTER COLUMN icon SET STATISTICS 0;

ALTER TABLE public.menus
  ALTER COLUMN route SET STATISTICS 0;

ALTER TABLE public.menus
  OWNER TO postgres;

-- role
CREATE TABLE public.role (
  id_role SERIAL,
  type_role VARCHAR,
  date_create TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  CONSTRAINT role1_pkey PRIMARY KEY(id_role)
) 
WITH (oids = false);

ALTER TABLE public.role
  ALTER COLUMN id_role SET STATISTICS 0;

ALTER TABLE public.role
  ALTER COLUMN type_role SET STATISTICS 0;

ALTER TABLE public.role
  ALTER COLUMN date_create SET STATISTICS 0;

ALTER TABLE public.role
  OWNER TO postgres; 

-- user
CREATE TABLE public.users (
  id_user SERIAL,
  matricule VARCHAR(20),
  nom VARCHAR(20),
  prenom VARCHAR(20),
  mot_de_passe VARCHAR,
  id_role VARCHAR,
  default_mdp VARCHAR,
  CONSTRAINT users_pkey PRIMARY KEY(id_user)
) 
WITH (oids = false);

ALTER TABLE public.users
  ALTER COLUMN id_user SET STATISTICS 0;

ALTER TABLE public.users
  ALTER COLUMN matricule SET STATISTICS 0;

ALTER TABLE public.users
  ALTER COLUMN nom SET STATISTICS 0;

ALTER TABLE public.users
  ALTER COLUMN prenom SET STATISTICS 0;

ALTER TABLE public.users
  ALTER COLUMN mot_de_passe SET STATISTICS 0;

ALTER TABLE public.users
  OWNER TO postgres;