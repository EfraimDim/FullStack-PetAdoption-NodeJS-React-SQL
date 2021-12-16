CREATE TABLE IF NOT EXISTS enquiry (
        id INT(200) AUTO_INCREMENT,
        user_ID VARCHAR(50) NOT NULL,
        enquiry_ID VARCHAR(50) NOT NULL,
        admin_ID VARCHAR(50) DEFAULT NULL,
        admin_Email VARCHAR(50) DEFAULT NULL,
        user_Email VARCHAR(50) NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        phone INT(10) NOT NULL,
        date_created DATE DEFAULT (CURRENT_DATE),
        status VARCHAR(11) DEFAULT "unresolved",
        enquiry VARCHAR(300) NOT NULL,
        PRIMARY KEY (id))