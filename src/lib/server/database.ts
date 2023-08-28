import { DB_DATABASE, DB_HOST, DB_PW, DB_USER } from '$env/static/private';
import mysql from 'mysql2';

// create the connection to database
export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PW,
    database: DB_DATABASE,
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

export async function getUserGears(userId: number) {
    const [row] = await pool.execute(
        'select * from user_gears where user_id = ? order by id desc',
        [userId],
    );

    // workaround to add iterable methods to RowDataPacket objects
    return JSON.parse(JSON.stringify(row));
}

export async function createUserGear(userId: number, title: string, description: string, skill1: string, skill2: string, skill3: string, skill4: string, gear: string, weapon: string) {
    const [row] = await pool.execute(
        `insert into user_gears (user_id, title, description, skill1, skill2, skill3, skill4, gear, weapon)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, title, description, skill1, skill2, skill3, skill4, gear, weapon]
    );

    return row.insertId;
}

export async function createLoadout(userId: number, title: string, description: string, rm: boolean, cb: boolean, sz: boolean, tc: boolean, hGearId: number | null, cGearId: number| null, sGearId: number| null, weapon: string) {
    const [row] = await pool.execute(
        `insert into loadouts (user_id, title, description, rm, cb, sz, tc, h_gear_id, c_gear_id, s_gear_id, weapon)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, title, description, rm, cb, sz, tc, hGearId, cGearId, sGearId, weapon]
    );

    return row.insertId;
}

export async function getUserLoadouts(userId: number) {
    const [row] = await pool.execute({
        sql: `select l.*,
        h.skill1, h.skill2, h.skill3, h.skill4, h.gear,
        c.skill1, c.skill2, c.skill3, c.skill4, c.gear,
        s.skill1, s.skill2, s.skill3, s.skill4, s.gear
        from loadouts l
        left join user_gears h on h.id = l.h_gear_id
        left join user_gears c on c.id = l.c_gear_id
        left join user_gears s on s.id = l.s_gear_id
        where l.user_id = ? 
        order by l.id desc`,
        nestTables: '_'
    },
        [userId],
    );

    return JSON.parse(JSON.stringify(row));;
}
