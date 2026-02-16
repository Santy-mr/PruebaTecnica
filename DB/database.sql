CREATE DATABASE test;
USE test;

CREATE TABLE roles(
    idRole INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    roleName VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE users(
    idUser INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user VARCHAR(50) NOT NULL UNIQUE,
    passw VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    idRole INT NOT NULL,
    status ENUM('Activo', 'Baja', 'Suspensión') NOT NULL,
    CONSTRAINT user_role FOREIGN KEY (idRole) REFERENCES roles(idRole) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO roles (roleName) VALUES
('Administrador'),
('Usuario'),
('Supervisor'),
('Gerente'),
('Soporte');


INSERT INTO users (user, passw, name, lastName, idRole, status) VALUES
('admin', 'admin123', 'Administrador', 'Sistema', 1, 'Activo'),
('root', 'root123', 'Super', 'Usuario', 1, 'Activo'),

('juan.perez', 'password123', 'Juan', 'Pérez García', 2, 'Activo'),
('maria.lopez', 'password123', 'María', 'López Hernández', 2, 'Activo'),
('pedro.sanchez', 'password123', 'Pedro', 'Sánchez Ruiz', 2, 'Activo'),
('ana.martinez', 'password123', 'Ana', 'Martínez Torres', 2, 'Baja'),

('carlos.gomez', 'password123', 'Carlos', 'Gómez Díaz', 3, 'Activo'),
('lucia.fernandez', 'password123', 'Lucía', 'Fernández Morales', 3, 'Activo'),

('roberto.diaz', 'password123', 'Roberto', 'Díaz Castillo', 4, 'Activo'),
('sofia.ramirez', 'password123', 'Sofía', 'Ramírez Fuentes', 4, 'Suspensión'),

('diego.torres', 'password123', 'Diego', 'Torres Vega', 5, 'Activo'),
('carmen.ruiz', 'password123', 'Carmen', 'Ruiz Ortega', 5, 'Activo');