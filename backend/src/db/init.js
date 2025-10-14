import mysql from 'mysql2/promise';

export async function initializeDatabase() {
  const host = process.env.MYSQL_HOST || 'localhost';
  const port = Number(process.env.MYSQL_PORT || 3306);
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const database = process.env.MYSQL_DATABASE || 'fibre_db';

  // Connect without database to ensure DB exists
  const rootConn = await mysql.createConnection({ host, port, user, password });
  try {
    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  } finally {
    await rootConn.end();
  }

  // Connect to target database and ensure required tables exist
  const dbConn = await mysql.createConnection({ host, port, user, password, database });
  try {
    // Créer la table des produits
    await dbConn.query(`
      CREATE TABLE IF NOT EXISTS \`products\` (
        \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(255) NOT NULL,
        \`description\` TEXT NULL,
        \`price\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        \`category\` VARCHAR(100) NOT NULL,
        \`image\` VARCHAR(500) NULL,
        \`features\` JSON NULL,
        \`specifications\` JSON NULL,
        \`inStock\` TINYINT(1) NOT NULL DEFAULT 1,
        \`rating\` FLOAT NOT NULL DEFAULT 0,
        \`reviews\` INT NOT NULL DEFAULT 0,
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Créer la table des utilisateurs
    await dbConn.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`username\` VARCHAR(50) UNIQUE NOT NULL,
        \`email\` VARCHAR(100) UNIQUE NOT NULL,
        \`password\` VARCHAR(255) NOT NULL,
        \`role\` ENUM('admin', 'user') DEFAULT 'user',
        \`active\` BOOLEAN DEFAULT TRUE,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`last_login\` TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Créer un utilisateur administrateur par défaut si il n'existe pas
    const [existingAdmin] = await dbConn.query('SELECT id FROM users WHERE username = ?', ['admin']);
    if (existingAdmin.length === 0) {
      // Mot de passe: admin123 (hashé avec bcrypt)
      await dbConn.query(`
        INSERT INTO users (username, email, password, role, active) VALUES 
        ('admin', 'admin@fibreoptique.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', TRUE)
      `);
      console.log('Utilisateur administrateur créé: admin / admin123');
    }

  } finally {
    await dbConn.end();
  }
}


