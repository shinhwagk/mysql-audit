CREATE DATABASE ttt
CREATE TABLE ttt.commit_file(
    sha varchar(30) primary key,
    file varchar(111),
    a_name,
    a_email,
    timestamp date
)
CREATE TABLE ttt.sql(
    id int,
    sha varchar(30)
    sqltext text
)
CREATE TABLE ttt.sql_status(
    id int,
    sha varchar(30)
    sqltext text
)
