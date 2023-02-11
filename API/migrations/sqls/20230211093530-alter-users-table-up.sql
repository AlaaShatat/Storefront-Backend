/* Replace with your SQL commands */
ALTER TABLE users ADD COLUMN email VARCHAR UNIQUE;

ALTER TABLE users ADD COLUMN isAdmin INTEGER;

ALTER TABLE users
    ADD CONSTRAINT validate_email CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');
