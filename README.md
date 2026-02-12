# HOAX Detector 🔍

Aplikasi web untuk mendeteksi dan menganalisis informasi hoax/berita palsu menggunakan teknologi AI dan machine learning.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
- [Cara Menjalankan](#cara-menjalankan)
- [Struktur Folder](#struktur-folder)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Database](#database)
- [Deployment](#deployment)

## ✨ Fitur Utama

- 🎯 Deteksi hoax secara real-time
- 📊 Analisis sentiment dan kredibilitas konten
- 👤 Sistem autentikasi user (login/register)
- 💾 Riwayat pemeriksaan hoax
- 📈 Dashboard analitik
- 🔐 Keamanan data dengan enkripsi
- 🌙 Dark mode support
- 📱 Responsive design

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool & dev server
- **React Hook Form** - Form management
- **TanStack Query** - Data fetching & caching
- **Wouter** - Routing
- **Framer Motion** - Animations
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL 16** - Database
- **Drizzle ORM** - Database ORM
- **Passport.js** - Authentication

### DevOps & Tools
- **Docker** (via Replit) - Containerization
- **Drizzle Kit** - Database migrations

## 📦 Instalasi

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL 16
- npm atau yarn

### Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/Raisyaauliya/HOAX-Detector.git
   cd HOAX-Detector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env dengan konfigurasi Anda
   ```

4. **Setup database**
   ```bash
   npm run db:push
   ```

## 🚀 Cara Menjalankan

### Development Mode
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5000`

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run check
```

## 📁 Struktur Folder

```
HOAX-Detector/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── index.css      # Global styles
│   └── index.html
├── server/                # Backend Express
│   ├── index.ts          # Server entry point
│   ├── routes/           # API routes
│   ├── db/               # Database setup
│   └── middleware/       # Express middleware
├── shared/               # Shared code
│   └���─ schema.ts         # Database schema
├── migrations/           # Database migrations (auto-generated)
├── script/              # Build scripts
├── .replit              # Replit configuration
├── vite.config.ts       # Vite configuration
├── drizzle.config.ts    # Drizzle configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies & scripts
```

## 🔐 Konfigurasi Environment

Buat file `.env` di root directory dengan isi:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/hoax_detector

# Server
PORT=5000
NODE_ENV=development

# Session
SESSION_SECRET=your-secret-key-here-change-this

# API Keys (jika ada)
# OPENAI_API_KEY=your-api-key
# HUGGINGFACE_API_KEY=your-api-key
```

## 🗄️ Database

### Schema Overview
Database menggunakan PostgreSQL dengan Drizzle ORM. Schema ada di `shared/schema.ts`

### Migrasi Database
```bash
# Push schema ke database
npm run db:push

# Generate migration files
npx drizzle-kit generate:pg
```

## 📤 Deployment

### Deploy ke Replit
Proyek ini sudah dikonfigurasi untuk Replit:

1. Push ke GitHub
2. Import ke Replit
3. Database akan auto-setup (PostgreSQL 16)
4. Run: `npm run dev`

**File konfigurasi Replit:** `.replit`

### Deploy ke Vercel/Netlify (Frontend only)
```bash
npm run build
# Pilih folder 'dist' sebagai output
```

### Deploy ke Heroku/Railway (Full Stack)
```bash
# Setup environment variables
heroku config:set DATABASE_URL=your-db-url

# Deploy
git push heroku main
```

## 🔄 API Endpoints

### Auth
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Detection
- `POST /api/detect` - Detect hoax dari teks/URL
- `GET /api/detections` - Riwayat deteksi
- `GET /api/detections/:id` - Detail deteksi

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile

## 🧪 Testing

```bash
# Run tests (jika ada)
npm test
```

## 📝 Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Start development server |
| `npm run build` | Build untuk production |
| `npm start` | Start production server |
| `npm run check` | Type checking dengan TypeScript |
| `npm run db:push` | Push schema ke database |

## 🤝 Kontribusi

1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail

## 👨‍💻 Author

**Raisya Auliya**
- GitHub: [@Raisyaauliya](https://github.com/Raisyaauliya)

## 🆘 Support

Butuh bantuan? Buka issue di GitHub atau hubungi:
- Email: [raisyaauliya20@gmail.com]
- Issues: [GitHub Issues](https://github.com/Raisyaauliya/HOAX-Detector/issues)

## 📚 Dokumentasi Lebih Lanjut

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Express Documentation](https://expressjs.com)

---

**Happy Coding! 🎉**
