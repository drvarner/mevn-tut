# Vue Todo

A simple todo list full-stack web app using MogoDB, Express, and Vue js.

## Why?
I'm an Angular/Flask/PostgreSQL developer and wanted to try something new. This is just part of the learning process.

## Installation
Pretty cut & dry. 

Server/API:
```bash
cd backend
npm install
```

UI:
```bash
cd frontend
npm install
```

## Usage
You will need to add a `.env` file in both `frontend` and `backend` directories with the following:

`frontend/.env`:
```
VITE_API_URL=<the url to your api>
```

`backend/.env`
```
MONGO_URI=<your mongodb connection string
```

In both `frontend` and `backend` directories:
```bash
npm run dev
```

### Roadmap
- [x] ~~Ability to mark items completed without deleting.~~
- [x] ~~Get rid of Axios. No real point using it here~~. It's easier and I'm lazy.
- [ ] Add form validation.
- [ ] Authentication. I should probably figure that out w/ Express and Vue.