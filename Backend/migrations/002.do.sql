CREATE TABLE IF NOT EXISTS pets (
        id INT(200) AUTO_INCREMENT,
        pet_ID VARCHAR(50) NOT NULL,
        type VARCHAR(15) NOT NULL,
        name VARCHAR(15) NOT NULL,
        adoption_status VARCHAR(10) NOT NULL,
        picture_path VARCHAR(100) NOT NULL,
        height INT(3) NOT NULL,
        weight INT(3) NOT NULL,
        color VARCHAR(30) NOT NULL,
        bio VARCHAR(200) NOT NULL,
        hypoallergenic BOOLEAN NOT NULL,
        availability BOOLEAN NOT NULL DEFAULT TRUE,
        dietry_restrictions VARCHAR(100) NOT NULL,
        breed VARCHAR(20) NOT NULL,
        date_created DATE DEFAULT (CURRENT_DATE),
        PRIMARY KEY (id))