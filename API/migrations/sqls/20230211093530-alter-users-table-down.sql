/* Replace with your SQL commands */
ALTER TABLE users DROP COLUMN  email;

ALTER TABLE users DROP COLUMN  isAdmin;

ALTER TABLE users DROP CONSTRAINT validate_email;