CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO
    subjects (name, description, created_at, updated_at)
VALUES
    (
        'Mathematics',
        'The study of numbers, quantities, and shapes, including topics such as algebra, geometry, calculus, and statistics.',
        NOW(),
        NOW()
    ),
    (
        'Physics',
        'The study of matter, energy, and the interactions between them, including topics such as mechanics, thermodynamics, electromagnetism, and quantum mechanics.',
        NOW(),
        NOW()
    ),
    (
        'Chemistry',
        'The study of the composition, properties, and behavior of matter, including topics such as organic chemistry, inorganic chemistry, physical chemistry, and analytical chemistry.',
        NOW(),
        NOW()
    );