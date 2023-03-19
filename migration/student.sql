CREATE TABLE IF NOT EXISTS students (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO
    students (first_name, last_name, phone, email)
VALUES
    ("john", "Doe", "62339099", "john_doe@email.com");