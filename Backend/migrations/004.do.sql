CREATE TABLE IF NOT EXISTS adoptedPets (
        id INT(200) AUTO_INCREMENT,
        user_ID VARCHAR(50) NOT NULL,
        pet_ID VARCHAR(50) NOT NULL,
        PRIMARY KEY (id))