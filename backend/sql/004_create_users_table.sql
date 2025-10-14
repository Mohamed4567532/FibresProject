-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Création d'un utilisateur administrateur par défaut
-- Mot de passe: admin123 (hashé avec bcrypt)
INSERT INTO users (username, email, password, role, active) VALUES 
('admin', 'admin@fibreoptique.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', TRUE)
ON DUPLICATE KEY UPDATE username = username;

-- Création d'un utilisateur de test
-- Mot de passe: test123 (hashé avec bcrypt)
INSERT INTO users (username, email, password, role, active) VALUES 
('test', 'test@fibreoptique.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', TRUE)
ON DUPLICATE KEY UPDATE username = username;
