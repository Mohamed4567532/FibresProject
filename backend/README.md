FibreProject Backend (Node.js + Express + MSSQL)

Prérequis
- Node.js 18+
- SQL Server (local ou distant)

Installation
```bash
cd backend
npm install
# créez un fichier .env à partir de l'exemple ci-dessous
```

Exemple .env
```env
PORT=4000
DB_SERVER=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=YourStrong!Passw0rd
DB_DATABASE=fibre_db
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

Scripts SQL (ordre)
1. sql/001_create_database.sql
2. sql/002_create_tables.sql
3. sql/003_seed_products.sql (optionnel)

Lancer l'API
```bash
npm run start
# ou
npm run dev
```

Endpoints
- GET /api/health
- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

Notes
- `features` et `specifications` sont stockés comme JSON (NVARCHAR) dans SQL Server.


