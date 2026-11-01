# Hogwarts Course Management System

Backend til Hogwarts-projektet lavet med Node.js, Express og PostgreSQL.
REST API til at håndtere houses, teachers, students og courses på Hogwarts.

## Sådan kører man projektet

1. `npm install`
2. Lav en `.env` fil ud fra `.env.example` og skriv dit eget database-password
3. Lav en database i pgAdmin og kør `database.sql`
4. `npm run dev` (kører på http://localhost:3000)

## Endpoints

### Houses

| Method | Route       | Beskrivelse      |
| ------ | ----------- | ---------------- |
| GET    | /houses     | hent alle houses |
| GET    | /houses/:id | hent ét house    |

### Teachers

| Method | Route         | Beskrivelse        |
| ------ | ------------- | ------------------ |
| GET    | /teachers     | hent alle teachers |
| GET    | /teachers/:id | hent én teacher    |
| POST   | /teachers     | opret teacher      |
| PUT    | /teachers/:id | opdater teacher    |
| DELETE | /teachers/:id | slet teacher       |

### Students

| Method | Route         | Beskrivelse        |
| ------ | ------------- | ------------------ |
| GET    | /students     | hent alle students |
| GET    | /students/:id | hent én student    |
| POST   | /students     | opret student      |
| PUT    | /students/:id | opdater student    |
| DELETE | /students/:id | slet student       |

### Courses

| Method | Route                            | Beskrivelse                      |
| ------ | -------------------------------- | -------------------------------- |
| GET    | /courses                         | hent alle courses                |
| GET    | /courses/:id                     | hent ét course med dets students |
| POST   | /courses                         | opret course                     |
| PUT    | /courses/:id                     | ændr navn på course              |
| DELETE | /courses/:id                     | slet course                      |
| PUT    | /courses/:id/teacher             | skift teacher på course          |
| POST   | /courses/:id/students            | tilføj student til course        |
| DELETE | /courses/:id/students/:studentId | fjern student fra course         |

## Tests

Jeg har lavet tests til alle endpoints i Bruno. De ligger i mappen `hogwarts-api`.

- Åbn Bruno og vælg "Open Collection", og vælg mappen `hogwarts-api`
- Husk at serveren skal køre
- Kør create før update og delete i hver mappe, fordi de bruger det id der bliver oprettet
- Hvis id'erne ikke passer, så kør `database.sql` igen
