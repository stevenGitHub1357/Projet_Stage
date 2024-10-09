SELECT dblink_connect('dbname=facturation host=192.168.12.232 port=5432 user=postgres password=postgres');


CREATE TABLE test_link AS
SELECT *
FROM dblink('dbname=facturation', 'select * from facturation.taux_horaire')
AS ("type" VARCHAR(200), taux DOUBLE PRECISION);
