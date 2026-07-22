CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    day VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    modality VARCHAR(20) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    credits INTEGER NOT NULL
);

CREATE TABLE prerequisites (
    course_id INTEGER NOT NULL,
    prerequisite_course_id INTEGER NOT NULL,

    PRIMARY KEY (course_id, prerequisite_course_id),

    CONSTRAINT fk_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_prerequisite
        FOREIGN KEY (prerequisite_course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
);

select * from courses
select * from prerequisites