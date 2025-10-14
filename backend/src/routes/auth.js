import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from '../db/mysql.js';

const router = express.Router();

// Configuration JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Middleware pour vérifier le token JWT
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token d\'accès requis' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Token invalide ou expiré' 
      });
    }
    req.user = user;
    next();
  });
};

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { username, password, rememberMe } = req.body;

    // Validation des données
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nom d\'utilisateur et mot de passe requis'
      });
    }

    // Rechercher l'utilisateur dans la base de données
    const [users] = await query(
      'SELECT id, username, email, password, role FROM users WHERE username = ? AND active = 1',
      [username]
    );
console.log('User lookup result:', users);
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Nom d\'utilisateur ou mot de passe incorrect'
      });
    }

    const user = users[0];

    // Vérifier le mot de passe
    //const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password == user.password; // Pour simplifier, à changer en prod
    console.log('Comparing passwords:', { provided: password, stored: user.password, isValid: isPasswordValid });
    //if (!isPasswordValid) {
    //  return res.status(401).json({
      //  success: false,
      //  message: 'Nom d\'utilisateur ou mot de passe incorrect'
     // });
    //}

    // Créer le token JWT
    const tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: rememberMe ? '7d' : JWT_EXPIRES_IN
    });

    // Mettre à jour la dernière connexion
    await query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Retourner la réponse (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Connexion réussie',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
});

// Route de déconnexion
router.post('/logout', authenticateToken, (req, res) => {
  // Dans une implémentation plus avancée, on pourrait ajouter le token à une blacklist
  res.json({
    success: true,
    message: 'Déconnexion réussie'
  });
});

// Route pour rafraîchir le token
router.post('/refresh', authenticateToken, (req, res) => {
  try {
    const user = req.user;
    
    // Créer un nouveau token
    const newToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Token rafraîchi',
      token: newToken
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du rafraîchissement du token'
    });
  }
});

// Route pour vérifier le token actuel
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token valide',
    user: req.user
  });
});

// Route pour obtenir le profil de l'utilisateur connecté
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [users] = await query(
      'SELECT id, username, email, role, created_at, last_login FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      user: users[0]
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil'
    });
  }
});

export default router;
