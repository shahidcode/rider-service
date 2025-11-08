USE rider_service_db;

LOAD DATA INFILE '/var/lib/mysql-files/rhfd_riders.csv'
INTO TABLE rhfd_riders
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(rider_id, name, email, phone, created_at);