CREATE TABLE IF NOT EXISTS users (
        id INT(200) AUTO_INCREMENT,
        user_ID VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        phone VARCHAR(12) NOT NULL,
        admin_status BOOLEAN NOT NULL,
        date_created DATE DEFAULT (CURRENT_DATE),
        bio VARCHAR(200) NULL,
        last_seen_pet_IDs TEXT NULL,
        PRIMARY KEY (id))