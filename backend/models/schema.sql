CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role VARCHAR
);

CREATE TABLE permissions (
    permissions_id SERIAL PRIMARY KEY,
    permission VARCHAR
);

CREATE TABLE role_permissions (
    role_permissions_id SERIAL PRIMARY KEY,
    role_id INTEGER,
    permissions_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles (role_id),
    FOREIGN KEY (permissions_id) REFERENCES permissions (permissions_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    userName VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR(255),
    is_deleted SMALLINT,
    role INT,
    created_at TIMESTAMP
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event VARCHAR,
    title VARCHAR,
    image VARCHAR
);

CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    service_name VARCHAR,
    details VARCHAR,
    price INT,
    image VARCHAR,
    status VARCHAR,
    provider INTEGER,
    FOREIGN KEY (provider) REFERENCES users (user_id)
);

CREATE TABLE service_event (
    id SERIAL PRIMARY KEY,
    service_id INTEGER,
    event_id INTEGER,
    FOREIGN KEY (service_id) REFERENCES services (service_id),
    FOREIGN KEY (event_id) REFERENCES events (event_id)
);

CREATE TABLE package (
    package_id SERIAL PRIMARY KEY,
    package_Name VARCHAR,
    price INTEGER,
    Description VARCHAR,
    image VARCHAR,
    event INTEGER,
    services INTEGER,
    FOREIGN KEY (event) REFERENCES events (event_id),
    FOREIGN KEY (services) REFERENCES services (service_id)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_price INTEGER,
    user_id INTEGER,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE orders_services (
    orders_services_id SERIAL PRIMARY KEY,
    order_id INTEGER,
    service_id INTEGER,
    created_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (service_id) REFERENCES services (service_id)
);

