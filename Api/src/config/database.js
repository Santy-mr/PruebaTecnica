import dotenv from 'dotenv'
dotenv.config();

import mysql from 'mysql2'

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
}).promise();

async function getAllUsers() {
    try {
        const [rows] = await pool.query(`
            SELECT u.idUser, u.user, u.name, u.lastName, r.roleName, u.status 
            FROM users u
            INNER JOIN roles r ON u.idRole = r.idRole; `);
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function getUserById(id) {
    try {
        const [rows] = await pool.query(`
            SELECT u.idUser, u.user, u.name, u.lastName, r.roleName, u.status
            FROM users u
            INNER JOIN roles r ON u.idRole = r.idRole
            WHERE u.idUser = ?`, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

async function createUser(userData) {
    const { user, passw, name, lastName, idRole, status } = userData;   
    try{

        const [existingUser] = await pool.query(`SELECT idUser FROM users WHERE user = ?`, [user]);
        if (existingUser.length > 0) {
            throw new Error('Username already exists');
        }

        const [result] = await pool.query(`
            INSERT INTO users (user, passw, name, lastName, idRole, status) 
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [user, passw, name, lastName, idRole, status]
        );
        return { idUser: result.insertId, ...userData };
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export { getAllUsers, getUserById, createUser };