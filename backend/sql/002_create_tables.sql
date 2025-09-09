USE fibre_db;
GO

IF OBJECT_ID('dbo.Products', 'U') IS NULL
BEGIN
  CREATE TABLE dbo.Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NULL,
    price DECIMAL(18,2) NOT NULL,
    category NVARCHAR(100) NOT NULL,
    image NVARCHAR(500) NULL,
    features NVARCHAR(MAX) NULL,           -- JSON array string
    specifications NVARCHAR(MAX) NULL,     -- JSON object string
    inStock BIT NOT NULL DEFAULT(1),
    rating FLOAT NULL,
    reviews INT NOT NULL DEFAULT(0),
    createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    updatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
  );
END
GO

-- Trigger to auto-update updatedAt
IF OBJECT_ID('dbo.trg_Products_UpdateTimestamp', 'TR') IS NOT NULL
  DROP TRIGGER dbo.trg_Products_UpdateTimestamp;
GO
CREATE TRIGGER dbo.trg_Products_UpdateTimestamp ON dbo.Products
AFTER UPDATE AS
BEGIN
  SET NOCOUNT ON;
  UPDATE p SET updatedAt = SYSUTCDATETIME()
  FROM dbo.Products p
  INNER JOIN inserted i ON p.id = i.id;
END
GO


