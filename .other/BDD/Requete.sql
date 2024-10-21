select DISTINCT ON (id_revue_processus, id_performance) *
	from revue_direction.performance_commentaire c
ORDER BY id_revue_processus, id_performance, createdat DESC