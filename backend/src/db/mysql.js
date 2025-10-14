import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'fibre_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function getPool() {
  return pool;
}

// Fonction helper pour exécuter des requêtes
export async function query(sql, params = []) {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, params);
    return [results];
  } finally {
    connection.release();
  }
}


