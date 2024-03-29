DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE IF NOT EXISTS company(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255),
    address VARCHAR(300),
    location_city VARCHAR(50),
    location_state VARCHAR(50),
    contact_person VARCHAR(100),
    company_website_url VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS job(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(255),
    company_details TEXT,
    experience VARCHAR(50),
    run_until INT NOT NULL,
    description TEXT,
    responsibility TEXT,
    skills TEXT,
    salary_min FLOAT,
    salary_max FLOAT,
    benefits TEXT,
    location_city VARCHAR(50),
    location_state VARCHAR(50),
    job_type VARCHAR(50),
    company_id INT,
    FOREIGN KEY(company_id)
    REFERENCES company(id)
    ON DELETE SET NULL,
    application_received INT DEFAULT 0 NOT NULL,
    job_status VARCHAR(30)   
);

CREATE UNIQUE INDEX un_job ON job (company_id, job_title, location_city, location_state);

CREATE TABLE candidate(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL
)

CREATE TABLE IF NOT EXISTS skill(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL
)