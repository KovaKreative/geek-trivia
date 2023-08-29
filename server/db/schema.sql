DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS keywords CASCADE;
DROP TABLE IF EXISTS questions_categories CASCADE;
DROP TABLE IF EXISTS questions_keywords CASCADE;

CREATE TABLE "questions" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "question" text,
  "correct_answer" varchar,
  "wrong_answers" varchar[3]
);

CREATE TABLE "categories" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "category" varchar UNIQUE
);

CREATE TABLE "keywords" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "keyword" varchar UNIQUE
);

CREATE TABLE "questions_categories" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "question_id" integer,
  "category_id" integer
);

CREATE TABLE "questions_keywords" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "question_id" integer,
  "keyword_id" integer
);

ALTER TABLE "questions_categories" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "questions_categories" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "questions_keywords" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "questions_keywords" ADD FOREIGN KEY ("keyword_id") REFERENCES "keywords" ("id");
