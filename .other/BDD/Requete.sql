--FNC_FAC
    --Declare
    select count(*) as declarer, type_demande, EXTRACT(year from date_demande) as annee from data_kpi.fnc_fac ff  group by annee, type_demande, annee
    --Realise_Cloture
    select count(*) as realise_cloture, type_demande, EXTRACT(year from date_demande) as annee from data_kpi.fnc_fac ff where id_statut=0 group by annee, type_demande, annee
