CREATE TABLE IF NOT EXISTS newsfeed (
        id INT(200) AUTO_INCREMENT,
        news VARCHAR(200) NOT NULL,
        date_created DATE DEFAULT (CURRENT_DATE),
        PRIMARY KEY (id))