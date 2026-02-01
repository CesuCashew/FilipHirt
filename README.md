# Portfolio Website - Netlify + Neon + Resend Integration

✅ **Status**: Ready to deploy!

## 🚀 Deployment Instructions

### 1️⃣ Instalace Dependencies
```bash
npm install
```

### 2️⃣ Nastavení Databáze
```bash
npm run setup-db
```
**Výstup**: `✅ Table created successfully!`

### 3️⃣ Lokální Test (Volitelné)
```bash
# Nainstaluj Netlify CLI globálně
npm install -g netlify-cli

# Spusť lokální dev server
netlify dev
```
**Otevři**: http://localhost:8888

### 4️⃣ Nastavení Environment Variables v Netlify

1. Přihlas se na [Netlify](https://app.netlify.com)
2. Jdi do svého projektu
3. **Site settings → Environment variables**
4. Přidej tyto 3 proměnné:

| Key | Value |
|-----|-------|
| `NEON_DATABASE_URL` | `postgresql://neondb_owner:npg_DJKyo1mzhHk8@ep-polished-tooth-aezm2l1c-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `RESEND_API_KEY` | `re_FhZYvgJn_24ggig9yDVnEsSnqdKV36Tuk` |
| `RECIPIENT_EMAIL` | `f.hirt@seznam.cz` |

### 5️⃣ Deploy
```bash
git add .
git commit -m "Added contact form with database and email"
git push
```

Netlify automaticky deployuje! 🎉

---

## 📧 Testování

### Lokální Test
1. Spusť `netlify dev`
2. Otevři http://localhost:8888
3. Vyplň formulář v sekci "Kontakt"
4. Klikni "Odeslat Zprávu"
5. ✅ Zkontroluj email na f.hirt@seznam.cz

### Production Test
1. Po deployi na Netlify
2. Otevři tvou production URL
3. Vyplň a odešli formulář
4. ✅ Zkontroluj email

---

## 🗃️ Správa Databáze

### Zobrazit všechny submisse
```bash
# Připoj se přes psql (pokud máš nainstalovaný psql)
psql 'postgresql://neondb_owner:npg_DJKyo1mzhHk8@ep-polished-tooth-aezm2l1c-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require'

# SQL dotazy
SELECT * FROM contact_submissions ORDER BY created_at DESC;
SELECT COUNT(*) FROM contact_submissions;
```

Nebo použij [Neon Console](https://console.neon.tech) → SQL Editor

---

## 🔧 Troubleshooting

### ❌ "Database connection failed"
- Zkontroluj, že `NEON_DATABASE_URL` je správně nastavená v Netlify
- Zkontroluj, že tabulka existuje (`npm run setup-db`)

### ❌ "Email not sent"
- Zkontroluj `RESEND_API_KEY` v Netlify
- Pro produkci doporuduji nastavit vlastní doménu v Resend (místo `onboarding@resend.dev`)

### ❌ "Function not found"
- Ujisti se, že složka `netlify/functions` existuje
- Redeploy z Netlify dashboardu

---

## 📁 Struktura Projektu

```
Portfolio/
├── netlify/
│   └── functions/
│       ├── submit-contact.js      # Hlavní serverless funkce
│       ├── setup-database.js      # DB setup script
│       └── templates/
│           └── contact-email.js   # Email template
├── js/
│   └── main.js                    # Frontend (aktualizováno)
├── netlify.toml                   # Netlify konfigurace
├── package.json                   # Dependencies
├── .env                          # Lokální env vars (NEGITOVAT!)
└── .env.example                  # Template pro env vars
```

---

## 🎯 Co Funguje

✅ Kontaktní formulář odesílá data  
✅ Data se ukládají do Neon PostgreSQL  
✅ Email notifikace na f.hirt@seznam.cz  
✅ Loading states a toast notifikace  
✅ Error handling  
✅ CORS podpora  
✅ Responsive design  

---

**Připraven deployovat?** Následuj kroky výše! 🚀
