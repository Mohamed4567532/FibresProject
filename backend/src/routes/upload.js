import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Configuration de multer pour sauvegarder dans backend/uploads/products
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Chemin vers le dossier uploads/products dans le backend
    const uploadPath = path.join(__dirname, '../uploads/products');
    
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique avec timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-');
    cb(null, `product-${baseName}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  },
  fileFilter: (req, file, cb) => {
    // Accepter seulement les images
    const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées (jpeg, jpg, png, gif, svg, webp)'));
    }
  }
});

router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier uploadé' });
    }
    
    // Construire l'URL complète pour accéder à l'image via l'API
    const baseUrl = req.protocol + '://' + req.get('host');
    const imageUrl = `${baseUrl}/api/uploads/products/${req.file.filename}`;
    
    // Pour compatibilité, retourner aussi le chemin relatif
    const imagePath = `/api/uploads/products/${req.file.filename}`;
    
    res.json({
      success: true,
      path: imagePath,
      url: imageUrl, // URL complète
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image', details: error.message });
  }
});

export default router;

