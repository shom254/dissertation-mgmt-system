CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    password TEXT NOT NULL,
    role TEXT
);

CREATE TABLE student (
    id INTEGER PRIMARY KEY REFERENCES user (id),
    first_name TEXT NOT NULL,
    last_name text not null,
    assigned_teacher int references teacher (id)
);

CREATE TABLE teacher (
    id INTEGER PRIMARY KEY REFERENCES user (id),
    first_name TEXT NOT NULL,
    last_name text not null
);

create table progress_report (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER REFERENCES student (id),
    "name" text,
    filepath text,
    grade int
);

create table final_report (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER REFERENCES student (id),
    "name" text,
    filepath text,
    grade int
);

INSERT INTO user (password, role)
VALUES 
('u111111', 'student'),
('u222222', 'student'),
('u333333', 'student'),
('u444444', 'student'),
('u555555', 'student'),
('u666666', 'student'),
('u777777', 'student'),
('Wong', 'student'),
('Chan', 'teacher'),
('Lam', 'teacher'),
('Lee', 'teacher');

insert into teacher (id, first_name, last_name)
VALUES
(8, 'Wing Kee', 'Wong'),
(9, 'E.S.', 'Chan'),
(10, 'Percy', 'Lam'),
(11, 'Mary', 'Lee');

insert into student (id, first_name, last_name, assigned_teacher)
VALUES
(1, 'John', 'Doe', NULL),
(2, 'Tom', 'Jerry', 10),
(3, 'Jane', 'Doe', 11),
(4, 'Bat', 'Man', 8),
(5, 'Super', 'Man', 9),
(6, 'The', 'Flash', 8),
(7, 'Harry', 'Potter', NULL);

insert into progress_report (student_id, "name", filepath, grade)
VALUES
(4, 'GEOG: Global Transformations', 'Global Transformations', NULL),
(2, 'My Progress Report', 'Globalization and Inequality', NULL),
(5, 'progress report', 'Hume''s Skepticism', NULL),
(6, 'CCHU Liberalism Progress', 'Individualism in Politics', NULL),
(3, 'Locke (Progress)', 'Locke on the State of Nature', NULL);