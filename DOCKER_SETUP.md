# Docker Setup untuk Biologi Backend

## Environment Variables
Buat file `.env` di root project dengan isi:
```
PORT=3009
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=biologi_db
NODE_ENV=development
```

## Menjalankan dengan Docker Compose

1. **Build dan jalankan semua services:**
```bash
docker-compose up -d
```

2. **Melihat logs:**
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

3. **Stop semua services:**
```bash
docker-compose down
```

4. **Rebuild jika ada perubahan code:**
```bash
docker-compose down
docker-compose up --build -d
```

## Setup Nginx Global

1. **Copy konfigurasi nginx ke sistem:**
```bash
sudo cp nginx/biologi.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/biologi.conf /etc/nginx/sites-enabled/
```

2. **Setup SSL Certificate (gunakan Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d biologi.zyuna646.tech
```

3. **Test dan reload nginx:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Akses Aplikasi

- **Backend API:** https://biologi.zyuna646.tech/
- **API Documentation:** https://biologi.zyuna646.tech/api-docs
- **Local Development:** http://localhost:3009

## Database

PostgreSQL akan berjalan di:
- **Host:** localhost (atau postgres dalam docker network)
- **Port:** 5432
- **Database:** biologi_db
- **Username:** postgres
- **Password:** postgres

## Troubleshooting

1. **Jika port 3009 sudah digunakan:**
```bash
sudo lsof -i :3009
sudo kill -9 <PID>
```

2. **Jika database connection error:**
```bash
docker-compose logs postgres
docker-compose restart postgres
```

3. **Reset database:**
```bash
docker-compose down -v
docker-compose up -d
``` 