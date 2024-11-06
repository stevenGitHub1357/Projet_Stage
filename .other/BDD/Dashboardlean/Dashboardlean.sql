-- DROP SCHEMA risque_enjeux_op;

CREATE SCHEMA risque_enjeux_op ;

-- risque_enjeux_op.analyse_des_risques definition

-- Drop table

-- DROP TABLE risque_enjeux_op.analyse_des_risques;

CREATE TABLE risque_enjeux_op.analyse_des_risques (
	id_analyse serial4 NOT NULL,
	id_identification varchar NULL,
	effet_potentiel varchar NULL,
	causes_potentielles varchar NULL,
	controles_actuels varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT analyse_des_risques_pkey PRIMARY KEY (id_analyse)
);


-- risque_enjeux_op.enjeux definition

-- Drop table

-- DROP TABLE risque_enjeux_op.enjeux;

CREATE TABLE risque_enjeux_op.enjeux (
	id serial4 NOT NULL,
	id_processus varchar NULL,
	lib_enjeux varchar NULL,
	num_ticket varchar NULL,
	"action" varchar NULL,
	pilote varchar NULL,
	delai varchar NULL,
	avancement varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT enjeux_pkey PRIMARY KEY (id)
);


-- risque_enjeux_op.evaluation_des_risques definition

-- Drop table

-- DROP TABLE risque_enjeux_op.evaluation_des_risques;

CREATE TABLE risque_enjeux_op.evaluation_des_risques (
	id_evaluation serial4 NOT NULL,
	id_identification varchar NULL,
	id_impact_a varchar NULL,
	impact_a varchar NULL,
	id_probabilite_b varchar NULL,
	probabilite_b varchar NULL,
	niveau_de_risque varchar NULL,
	appreciation varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT evaluation_des_risques_pkey PRIMARY KEY (id_evaluation)
);


-- risque_enjeux_op.famille_risque definition

-- Drop table

-- DROP TABLE risque_enjeux_op.famille_risque;

CREATE TABLE risque_enjeux_op.famille_risque (
	id serial4 NOT NULL,
	risque varchar NULL,
	date_create timestamp NULL,
	CONSTRAINT famille_risque_pkey PRIMARY KEY (id)
);


-- risque_enjeux_op.identification_risque definition

-- Drop table

-- DROP TABLE risque_enjeux_op.identification_risque;

CREATE TABLE risque_enjeux_op.identification_risque (
	id serial4 NOT NULL,
	id_processus varchar NULL,
	numero varchar NULL,
	id_norme varchar NULL,
	norme varchar NULL,
	etape_de_processus varchar NULL,
	description_des_risques varchar NULL,
	les_concernes varchar NULL,
	id_famille_risque varchar NULL,
	famille_du_risque varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT identification_risque_pkey PRIMARY KEY (id)
);


-- risque_enjeux_op.impact definition

-- Drop table

-- DROP TABLE risque_enjeux_op.impact;

CREATE TABLE risque_enjeux_op.impact (
	id serial4 NOT NULL,
	lib_impact varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT impact_pkey PRIMARY KEY (id)
);


-- risque_enjeux_op.niveau_de_risque definition

-- Drop table

-- DROP TABLE risque_enjeux_op.niveau_de_risque;

CREATE TABLE risque_enjeux_op.niveau_de_risque (
	id serial4 NOT NULL,
	id_probabilite varchar NULL,
	id_impact varchar NULL,
	niveau_de_risque varchar NULL,
	appreciation varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT niveau_de_risque_pkey PRIMARY KEY (id)
);


-- risque_enjeux_op.opportunite definition

-- Drop table

-- DROP TABLE risque_enjeux_op.opportunite;

CREATE TABLE risque_enjeux_op.opportunite (
	id serial4 NOT NULL,
	lib_oppo varchar NULL,
	id_processus varchar NULL,
	num_ticket varchar NULL,
	"action" varchar NULL,
	pilote varchar NULL,
	delai varchar NULL,
	avancement varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT opportunite_pkey PRIMARY KEY (id)
);


-- risque_enjeux_op.probabilite definition

-- Drop table

-- DROP TABLE risque_enjeux_op.probabilite;

CREATE TABLE risque_enjeux_op.probabilite (
	id serial4 NOT NULL,
	lib_probabilite varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT probabilite_pkey PRIMARY KEY (id)
);


-- risque_enjeux_op.risque_cloture definition

-- Drop table

-- DROP TABLE risque_enjeux_op.risque_cloture;

CREATE TABLE risque_enjeux_op.risque_cloture (
	id serial4 NOT NULL,
	lib_risque varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT risque_cloture_pkey PRIMARY KEY (id)
);


-- risque_enjeux_op.suivi_des_risques definition

-- Drop table

-- DROP TABLE risque_enjeux_op.suivi_des_risques;

CREATE TABLE risque_enjeux_op.suivi_des_risques (
	id_suivi serial4 NOT NULL,
	id_identification varchar NULL,
	id_probabilite_d varchar NULL,
	probabilite_d varchar NULL,
	niveau_de_risque_d varchar NULL,
	appreciation_d varchar NULL,
	qui varchar NULL,
	quand varchar NULL,
	id_risque_cloture varchar NULL,
	risque_clotures varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT suivi_des_risques_pkey PRIMARY KEY (id_suivi)
);


-- risque_enjeux_op.traitement_des_risques definition

-- Drop table

-- DROP TABLE risque_enjeux_op.traitement_des_risques;

CREATE TABLE risque_enjeux_op.traitement_des_risques (
	id_traitement serial4 NOT NULL,
	id_identification varchar NULL,
	actions_recommandees varchar NULL,
	id_probabilite_c varchar NULL,
	probabilite_c varchar NULL,
	nouveau_niveau varchar NULL,
	ecart_niveau varchar NULL,
	num_ticket varchar NULL,
	"action" varchar NULL,
	pilote varchar NULL,
	delai varchar NULL,
	avancement varchar NULL,
	date_create timestamp DEFAULT now() NULL,
	CONSTRAINT traitement_des_risques_pkey PRIMARY KEY (id_traitement)
);