CREATE DATABASE ediappdatabase;

CREATE TABLE ediapp(
    edi_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    context_path TEXT,
    service VARCHAR(255),
    direction VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
)