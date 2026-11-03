# Contact Manager (MERN)

Add, view, edit, delete and search contacts. MongoDB + Express + React (Vite) + Node.

## Structure
```
contact-manager/
├── server/
│   ├── config/db.js              # MongoDB connection
│   ├── models/Contact.js         # Schema + validation
│   ├── controllers/              # CRUD logic
│   ├── routes/                   # REST endpoints
│   ├── middleware/errorHandler.js
│   └── server.js
└── client/src/
    ├── api/contacts.js           # fetch wrapper
    ├── components/               # Avatar, ContactList, ContactDetail, ContactForm, ConfirmDialog
    ├── styles/app.css
    └── App.jsx                   # state + layout
```

## Run
Make sure MongoDB is running locally (or put an Atlas URI in `server/.env`).

```bash
# terminal 1
cd server && npm install && npm run dev

# terminal 2
cd client && npm install && npm run dev
```
Open http://localhost:5173

## API
| Method | Route | Purpose |
|---|---|---|
| GET | /api/contacts?q=text | List / search |
| GET | /api/contacts/:id | One contact |
| POST | /api/contacts | Create |
| PUT | /api/contacts/:id | Update |
| DELETE | /api/contacts/:id | Delete |
