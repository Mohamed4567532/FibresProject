-- MySQL full schema and seed for XAMPP (phpMyAdmin)
-- Run this file in phpMyAdmin or via mysql CLI

-- 1) Create database (change charset/collation if needed)
CREATE DATABASE IF NOT EXISTS `fibre_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `fibre_db`;

-- 2) Drop existing tables (order matters due to FKs)
DROP TABLE IF EXISTS `products`;

-- 3) Tables
CREATE TABLE `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `category` VARCHAR(100) NOT NULL,
  `image` VARCHAR(500) NULL,
  `features` JSON NULL,
  `specifications` JSON NULL,
  `inStock` TINYINT(1) NOT NULL DEFAULT 1,
  `rating` FLOAT NOT NULL DEFAULT 0,
  `reviews` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4) Seed data (sample items)
INSERT INTO `products` (`name`, `description`, `price`, `category`, `image`, `features`, `specifications`, `inStock`, `rating`, `reviews`) VALUES
('SFP-1G', 'Module SFP 1G', 49.99, 'Modules', '/assets/images/products/sfp-1g.svg', JSON_ARRAY('1Gbps', 'LC'), JSON_OBJECT('wavelength', '1310nm'), 1, 4.5, 12),
('SFP-10G', 'Module SFP+ 10G', 199.99, 'Modules', '/assets/images/products/sfp-10g.svg', JSON_ARRAY('10Gbps', 'LC'), JSON_OBJECT('wavelength', '850nm'), 1, 4.7, 18),
('QSFP-40G', 'Module QSFP 40G', 399.90, 'Modules', '/assets/images/products/qsfp-40g.svg', JSON_ARRAY('40Gbps'), JSON_OBJECT('formFactor', 'QSFP'), 1, 4.6, 9),
('Switch 24P', 'Switch manageable 24 ports', 899.00, 'Commutateurs', '/assets/images/products/switch-24p.svg', JSON_ARRAY('24x1G', 'SFP'), JSON_OBJECT('poe', false), 1, 4.4, 22),
('Switch 48P', 'Switch manageable 48 ports', 1599.00, 'Commutateurs', '/assets/images/products/switch-48p.svg', JSON_ARRAY('48x1G', 'SFP+'), JSON_OBJECT('poe', true), 1, 4.2, 8),
('Routeur Fibre', 'Routeur pour connexion fibre', 299.00, 'Routeurs', '/assets/images/products/router-fibre.svg', JSON_ARRAY('WAN Fibre'), JSON_OBJECT('ports', 4), 1, 4.0, 5),
('Coffret 12P', 'Coffret optique 12 ports', 129.00, 'Accessoires', '/assets/images/products/coffret-12p.svg', JSON_ARRAY('12 ports'), JSON_OBJECT('mount', 'rack'), 1, 4.3, 6),
('Kit Soudure', 'Kit de soudure fibre optique', 2499.00, 'Outils', '/assets/images/products/kit-soudure.svg', JSON_ARRAY('Fusion'), JSON_OBJECT('battery', 'Li-ion'), 1, 4.8, 3),
('Testeur Fibre', 'Testeur de liaison fibre', 799.00, 'Outils', '/assets/images/products/testeur-fibre.svg', JSON_ARRAY('OTDR'), JSON_OBJECT('range', '10km'), 1, 4.1, 4),
('Pigtail LC', 'Pigtail LC monomode', 4.90, 'Câbles', '/assets/images/products/pigtail-lc.svg', JSON_ARRAY('OS2'), JSON_OBJECT('length', '1m'), 1, 4.9, 30),
('Câble OM3', 'Câble fibre OM3', 1.90, 'Câbles', '/assets/images/products/cable-om3.svg', JSON_ARRAY('OM3'), JSON_OBJECT('core', '50/125'), 1, 4.6, 14),
('Câble OM4', 'Câble fibre OM4', 2.40, 'Câbles', '/assets/images/products/cable-om4.svg', JSON_ARRAY('OM4'), JSON_OBJECT('core', '50/125'), 1, 4.7, 16),
('Câble OS2', 'Câble fibre OS2', 1.50, 'Câbles', '/assets/images/products/cable-os2.svg', JSON_ARRAY('OS2'), JSON_OBJECT('core', '9/125'), 1, 4.5, 11),
('Câble Armé', 'Câble fibre armé', 3.90, 'Câbles', '/assets/images/products/cable-arme.svg', JSON_ARRAY('Armored'), JSON_OBJECT('outdoor', true), 1, 4.2, 7),
('Câble SC-SC', 'Jarretière SC-SC', 3.20, 'Câbles', '/assets/images/products/cable-sc-sc.svg', JSON_ARRAY('Duplex'), JSON_OBJECT('length', '2m'), 1, 4.3, 10);


