USE fibre_db;
GO

INSERT INTO dbo.Products (name, description, price, category, image, features, specifications, inStock, rating, reviews)
VALUES
('Câble Fibre OS2', 'Câble monomode longue distance', 2.50, 'Câbles', 'assets/images/products/cable-os2.svg',
 N'["Monomode OS2","Faible atténuation"]', N'{"speed":"1-100 Gbps","distance":"40-80 km","wavelength":"1310/1550 nm","connector":"LC/UPC"}', 1, 4.5, 120),
('Switch 24 ports', 'Switch manageable 24 ports', 450.00, 'Équipements', 'assets/images/products/switch-24p.svg',
 N'["Gigabit","QoS"]', N'{"speed":"1 Gbps","distance":"-","wavelength":"-","connector":"RJ45"}', 1, 4.2, 56);


