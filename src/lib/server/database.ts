import { DB_DATABASE, DB_HOST, DB_PW, DB_USER } from '$env/static/private';
import mysql from 'mysql2';

// create the connection to database
export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PW,
    database: DB_DATABASE
}).promise();

export async function createUser(username: string, email: string, pw: string, token: string) {
    const [row] = await pool.execute(
        'insert into users (username, email, password, token) values (?, ?, ?, ?)',
        [username, email, pw, token]
    );

    return row.insertId;
}

export async function getUserByUsername(username: string) {
    const [row] = await pool.execute(
        'select * from users where username = ?',
        [username]
    );

    return row[0];
}

export async function getUserByToken(token: string) {
    const [row] = await pool.execute(
        'select * from users where token = ?',
        [token]
    );

    return row[0];
}

export async function updateToken(userId: number, token: string) {
    const [row] = await pool.execute(
        'update users set token = ? where id = ?',
        [token, userId]
    );

    return row.affectedRows;
}
