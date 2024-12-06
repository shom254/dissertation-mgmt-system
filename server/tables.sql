CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    password TEXT NOT NULL,
    role TEXT
);

CREATE TABLE student (
    id INTEGER PRIMARY KEY AUTOINCREMENT REFERENCES user (id),
    first_name TEXT NOT NULL,
    last_name text not null,
    assigned_teacher int references teacher (id)
);

CREATE TABLE teacher (
    id INTEGER PRIMARY KEY AUTOINCREMENT REFERENCES user (id),
    first_name TEXT NOT NULL,
    last_name text not null,
);

create table progress_report (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER REFERENCES student (id),
    "name" text
    filepath text
    grade int
)

create table progress_report (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER REFERENCES student (id),
    "name" text
    filepath text
    grade int
)

-- INSERT INTO user (password, role)
-- VALUES 
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- 7 student 3 teachers
-- (),
-- (),
-- (),

INSERT INTO