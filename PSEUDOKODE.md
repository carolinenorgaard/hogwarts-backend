# Pseudokode for endpoints

Alle endpoints går fra route → controller → repository.
Mange af dem er ens, så jeg har kun skrevet hvert mønster én gang.

## GET /houses

- hent alle houses fra databasen
- send dem tilbage som JSON med 200

Samme for GET /teachers, /students og /courses

## GET /houses/:id

- tag id fra url'en
- find house med det id i databasen
- hvis det ikke findes: send 404
- ellers send det med 200

Samme for /teachers/:id og /students/:id

## POST /teachers

- tag name og houseId fra body
- hvis name mangler: send 400
- indsæt teacher i databasen
- send den nye teacher tilbage med 201
- hvis houset ikke findes: send 400

Samme for POST /students (har også year) og POST /courses (har teacherId)

## PUT /teachers/:id

- tag id fra url'en og name og houseId fra body
- hvis name mangler: send 400
- opdater teacher i databasen
- hvis den ikke findes: send 404
- ellers send den opdaterede teacher med 200

Samme for /students/:id. PUT /courses/:id ændrer kun navnet

## DELETE /teachers/:id

- tag id fra url'en
- slet teacher i databasen
- hvis den ikke fandtes: send 404
- ellers send 204

Samme for /students/:id og /courses/:id

## GET /courses/:id

- find course med id
- hvis det ikke findes: send 404
- hent alle students der er på courset (JOIN med course_students)
- læg students ind i course-objektet
- send det hele med 200

## PUT /courses/:id/teacher

- tag teacherId fra body
- hvis den mangler: send 400
- opdater teacher_id på courset
- hvis courset ikke findes: send 404
- hvis teacheren ikke findes: send 400
- ellers send courset med 200

## POST /courses/:id/students

- tag studentId fra body
- hvis den mangler: send 400
- tjek at courset findes, ellers 404
- indsæt en række i course_students
- send 201
- hvis studenten ikke findes: 400
- hvis studenten allerede er på courset: 409

## DELETE /courses/:id/students/:studentId

- tag course id og student id fra url'en
- slet rækken i course_students
- hvis der blev slettet noget: 204
- ellers 404
