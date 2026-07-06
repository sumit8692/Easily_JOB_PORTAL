# Easily — Job Portal

> A full-stack job portal connecting recruiters with top talent. Recruiters can post and manage listings; candidates can search, explore, and apply — all in one place.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-3.x-B4CA65?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✨ Features

### For Recruiters
- **Register & Login** — Secure session-based authentication
- **Post Jobs** — Publish listings with role, location, salary, skills, and deadline
- **Edit & Delete Listings** — Full control over posted jobs
- **View Applicants** — See all candidates who applied, with resume access

### For Candidates
- **Browse Jobs** — Paginated job listing with card-based layout
- **Search** — Filter jobs by company, role, location, skills, or salary
- **Apply** — Submit name, email, phone, and resume in under a minute
- **Email Confirmation** — Automated confirmation email on application

---

## 🗂 Project Structure

```
Easily_JOB_PORTAL/
├── index.js                    # Express app setup, middleware, routes
├── server.js                   # Server entry point (port 3000)
├── package.json
├── public/
│   ├── css/
│   │   └── style.css           # Modern glassmorphism design system
│   └── images/                 # Uploaded resumes / static assets
└── src/
    ├── controller/
    │   └── controller.js       # All route handlers
    ├── middlewares/
    │   ├── auth.js             # Session-based auth guards
    │   ├── fileupload.middleware.js  # Multer config for resume uploads
    │   └── form.validation.js  # express-validator rules
    ├── model/
    │   ├── jobs.model.js       # In-memory jobs data + CRUD
    │   ├── jobspplied.js       # In-memory applications data
    │   └── recruiter.model.js  # In-memory recruiter accounts
    ├── service/
    │   └── utils/
    │       └── sendMail.js     # Nodemailer email utility
    └── views/
        ├── layout.ejs          # Shared navbar + HTML shell
        ├── index.ejs           # Homepage / hero
        ├── jobs.ejs            # Job listings grid
        ├── applyJobs.ejs       # Job detail + application modal
        ├── login.ejs           # Recruiter login
        ├── newjob.ejs          # Post / update job form
        ├── applicants.ejs      # Applicants table for a job
        └── 404error.ejs        # Error / not-found page
```

---

## 🚀 Running Locally

### Prerequisites

| Tool | Version |
|------|---------|
| [Node.js](https://nodejs.org/) | v18 or higher |
| npm | v9 or higher (bundled with Node) |

### 1 — Clone the repo

```bash
git clone https://github.com/sumit8692/Easily_JOB_PORTAL.git
cd Easily_JOB_PORTAL
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Configure email (optional)

Open `src/service/utils/sendMail.js` and replace the credentials with your own Gmail App Password:

```js
auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'   // Generate at myaccount.google.com/apppasswords
}
```

> **Note:** Email sending is optional. If credentials are wrong the app will still run — it just logs the error and continues.

### 4 — Start the server

```bash
npm start
```

Open **http://localhost:3000** in your browser.

---

## 🧭 Usage Guide

### As a Recruiter
1. Go to **http://localhost:3000**
2. Click **"I'm a Recruiter"** → fill in name, email, password → **Register**
3. You'll be redirected to **Login** → sign in with your credentials
4. Use the **navbar → Post New Job** to create a listing
5. Browse your listings via **Jobs** → click **View Details** to edit, delete, or see applicants

### As a Candidate
1. Go to **http://localhost:3000** → click **Browse Jobs**
2. Use the **search bar** to filter by keyword
3. Click **View Details** on any job → click **Apply Now**
4. Fill in your name, email, phone, and upload your resume → **Submit**
5. A confirmation email will be sent to your inbox

---

## 🛣 Routes

| Method | Route | Description | Auth Required |
|--------|-------|-------------|:---:|
| GET | `/` | Homepage | — |
| GET | `/jobs` | All jobs (paginated) | — |
| GET | `/jobs/:id` | Job detail + apply | — |
| GET | `/search` | Search jobs | — |
| GET | `/login` | Login page | — |
| POST | `/login` | Submit login | — |
| POST | `/registerRecruiter` | Register recruiter | — |
| GET | `/logout` | End session | — |
| GET | `/newjob` | Post new job form | ✅ |
| POST | `/newjob` | Create new job | ✅ |
| GET | `/update/:id` | Edit job form | ✅ |
| POST | `/update/:id` | Save job edits | ✅ |
| GET | `/delete/:id` | Delete a job | ✅ |
| POST | `/applyJobs/:id` | Submit application | — |
| GET | `/applicants/:id` | View applicants | ✅ |

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | EJS + express-ejs-layouts |
| Styling | Vanilla CSS (glassmorphism design system) + Bootstrap 5 |
| File Uploads | Multer |
| Validation | express-validator |
| Sessions | express-session + cookie-parser |
| Email | Nodemailer (Gmail SMTP) |
| Icons | Font Awesome 6 |
| Fonts | Inter + Syne (Google Fonts) |

> **Data persistence:** This project uses **in-memory arrays** — data resets on every server restart. There is no database.

---

## ⚠️ Known Limitations

- **No database** — all jobs, recruiters, and applications are stored in memory and lost on restart
- **No password hashing** — recruiter passwords are stored in plain text (not suitable for production)
- **Gmail SMTP** — uses a hardcoded app password; rotate or remove before sharing publicly

---

## 📄 License

MIT © [Sumit Shah](https://github.com/sumit8692)
