const {Client} = require('pg')

// database.js
 const client = new Client({
  user: 'postgres',
  host: '192.168.12.232',
  database: 'dashboardlean2024',
  password: 'postgres',
  port: 5432,
});

async function connect() {
  try {
    await client.connect();
    console.log('Connecté à la base de données PostgreSQL');
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
  }
}

async function query(sql, values) {
  try {
    const result = await client.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête :', error);
    throw error;
  }
}

async function disconnect() {
  try {
    await client.end();
    console.log('Déconnexion de la base de données PostgreSQL');
  } catch (error) {
    console.error('Erreur lors de la déconnexion de la base de données :', error);
  }
}

module.exports = {
  connect,
  query,
  disconnect,
};
