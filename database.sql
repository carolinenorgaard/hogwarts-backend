-- 1. Slet gamle tabeller (hvis de findes)
DROP TABLE IF EXISTS course_students, courses, students, teachers, houses CASCADE;

-- 2. Opret tabellerne
CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  colors TEXT,
  founder TEXT
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  house_id INTEGER REFERENCES houses(id)
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  year INTEGER,
  house_id INTEGER REFERENCES houses(id)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL
);

CREATE TABLE course_students (
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, student_id)
);

-- 3. Indsæt testdata
INSERT INTO houses (name, colors, founder) VALUES
('Gryffindor', 'Red and gold', 'Godric Gryffindor'),
('Hufflepuff', 'Yellow and black', 'Helga Hufflepuff'),
('Ravenclaw', 'Blue and bronze', 'Rowena Ravenclaw'),
('Slytherin', 'Green and silver', 'Salazar Slytherin');

INSERT INTO teachers (name, house_id) VALUES
('Minerva McGonagall', 1), ('Severus Snape', 4), ('Filius Flitwick', 3);

INSERT INTO students (name, year, house_id) VALUES
('Harry Potter', 1, 1), ('Hermione Granger', 1, 1),
('Draco Malfoy', 1, 4), ('Luna Lovegood', 1, 3);

INSERT INTO courses (name, teacher_id) VALUES
('Transfiguration', 1), ('Potions', 2), ('Charms', 3);

INSERT INTO course_students (course_id, student_id) VALUES
(1, 1), (1, 2), (2, 1), (2, 3);