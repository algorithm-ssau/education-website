-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE public."user"
(
    id uuid,
    name character varying(100) NOT NULL,
    description character varying(200),
    email character varying(50) NOT NULL,
    password character varying(30) NOT NULL,
    refresh_token_id uuid,
    profile_image_id uuid,
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE public.refresh_token
(
    id uuid,
    token character(24) NOT NULL,
    valid_until date NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (token)
);

CREATE TABLE public.file
(
    id uuid,
    path character varying(250) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (path)
);

CREATE TABLE public.course
(
    id uuid,
    name text NOT NULL,
    description text NOT NULL,
    moderation_status character varying(10),
    price numeric NOT NULL DEFAULT 0,
    image_id uuid,
    owner_id uuid NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.student
(
    course_id uuid,
    user_id uuid,
	review_content text,
	review_score numeric,
    PRIMARY KEY (course_id, user_id)
);

CREATE TABLE public.course_block
(
    id uuid,
    type character varying(10) NOT NULL CHECK(type in ('theory', 'info', 'task')),
    title text NOT NULL,
    content text NOT NULL,
    course_id uuid NOT NULL,
    pin_priority numeric NOT NULL DEFAULT 0 CHECK(pin_priority >= 0),
    test_id uuid,
    max_score numeric CHECK(max_score IS NULL OR max_score > 0),
    PRIMARY KEY (id)
);

CREATE TABLE public.tag
(
    id uuid NOT NULL,
    name character varying(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.tag_course
(
    tag_id uuid NOT NULL,
    course_id uuid,
    PRIMARY KEY (tag_id, course_id)
);

CREATE TABLE public.course_admin
(
	id uuid NOT NULL,
    course_id uuid,
    user_id uuid,
    PRIMARY KEY (id)
);

CREATE TABLE public.task_answer_file
(
    task_answer_id uuid,
    file_id uuid,
    PRIMARY KEY (task_answer_id, file_id)
);

CREATE TABLE public.notification
(
    id uuid,
    title character varying(20) NOT NULL,
    description character varying(40) NOT NULL,
    creation_date date NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.test
(
    id uuid,
    questions text[] NOT NULL,
    correct_answers text[] NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.student_course_block
(
    student_course_id uuid,
    student_user_id uuid,
    course_block_id uuid,
    is_completed boolean NOT NULL,
    score numeric CHECK (score >= 0),
    task_answer_id uuid,
    PRIMARY KEY (course_block_id, student_user_id, student_course_id)
);

CREATE TABLE public.task_answer
(
    id uuid,
    content text NOT NULL,
    score numeric NOT NULL,
    teacher_comment text NOT NULL,
    check_date date NOT NULL,
    teacher_id uuid,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."user"
     ADD CONSTRAINT refresh_token_constraint FOREIGN KEY (refresh_token_id)
     REFERENCES public.refresh_token (id) MATCH SIMPLE
     ON UPDATE NO ACTION
     ON DELETE NO ACTION
     NOT VALID;


ALTER TABLE IF EXISTS public."user"
     ADD CONSTRAINT profile_image_constraint FOREIGN KEY (profile_image_id)
     REFERENCES public.file (id) MATCH SIMPLE
     ON UPDATE NO ACTION
     ON DELETE NO ACTION
     NOT VALID;


ALTER TABLE IF EXISTS public.course
     ADD CONSTRAINT image_constraint FOREIGN KEY (image_id)
     REFERENCES public.file (id) MATCH SIMPLE
     ON UPDATE NO ACTION
     ON DELETE NO ACTION
     NOT VALID;


ALTER TABLE IF EXISTS public.course
     ADD CONSTRAINT owner_constraint FOREIGN KEY (owner_id)
     REFERENCES public."user" (id) MATCH SIMPLE
     ON UPDATE NO ACTION
     ON DELETE NO ACTION
     NOT VALID;


ALTER TABLE IF EXISTS public.student
     ADD FOREIGN KEY (course_id)
     REFERENCES public.course (id) MATCH SIMPLE
     ON UPDATE NO ACTION
     ON DELETE NO ACTION
     NOT VALID;


ALTER TABLE IF EXISTS public.student
     ADD FOREIGN KEY (user_id)
     REFERENCES public."user" (id) MATCH SIMPLE
     ON UPDATE NO ACTION
     ON DELETE NO ACTION
     NOT VALID;

ALTER TABLE IF EXISTS public.course_block
     ADD FOREIGN KEY (course_id)
     REFERENCES public.course (id) MATCH SIMPLE
     ON UPDATE NO ACTION
     ON DELETE NO ACTION
     NOT VALID;


ALTER TABLE IF EXISTS public.course_block
    ADD FOREIGN KEY (test_id)
	REFERENCES public.test (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.tag_course
    ADD FOREIGN KEY (tag_id)
    REFERENCES public.tag (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.tag_course
    ADD FOREIGN KEY (course_id)
    REFERENCES public.course (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.course_admin
    ADD FOREIGN KEY (course_id)
    REFERENCES public.course (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.course_admin
    ADD FOREIGN KEY (user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.task_answer_file
    ADD FOREIGN KEY (file_id)
    REFERENCES public.file (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.task_answer_file
    ADD FOREIGN KEY (task_answer_id)
    REFERENCES public.task_answer (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.notification
    ADD FOREIGN KEY (user_id)
    REFERENCES public."user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.student_course_block
    ADD FOREIGN KEY (student_user_id, student_course_id)
    REFERENCES public.student (user_id, course_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.student_course_block
    ADD FOREIGN KEY (course_block_id)
    REFERENCES public.course_block (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.student_course_block
    ADD FOREIGN KEY (task_answer_id)
    REFERENCES public.task_answer (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.task_answer
    ADD FOREIGN KEY (teacher_id)
    REFERENCES public.course_admin (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

CREATE OR REPLACE FUNCTION check_score_max_score()
RETURNS TRIGGER AS
$$
BEGIN
    IF NEW.score > (SELECT max_score FROM course_block WHERE id = NEW.course_block_id) THEN
            RAISE EXCEPTION 'Score cannot be greater than max_score';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_score_max_score_trigger
BEFORE INSERT OR UPDATE ON student_course_block
FOR EACH ROW
EXECUTE FUNCTION check_score_max_score();
END;