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
    const [row] = await pool.execute({
        sql: `
            select 
            ug.*,
            g.name,
            g.name_en,
            s1.name,
            s2.name,
            s3.name,
            s4.name
            from user_gears ug
            join gears g on ug.gear_id = g.id
            join skills s1 on s1.id = ug.skill1_id
            join skills s2 on s2.id = ug.skill2_id
            join skills s3 on s3.id = ug.skill3_id
            join skills s4 on s4.id = ug.skill4_id
            where ug.user_id = ? 
            order by ug.id desc
        `,
        nestTables: '_'
    },
        [userId],
    );

    // workaround to add iterable methods to RowDataPacket objects
    return JSON.parse(JSON.stringify(row));
}

export async function createUserGear(userId: number, title: string, description: string, skill1_id: number, skill2_id: number, skill3_id: number, skill4_id: number, gear_id: number, weapon_id: number) {
    const [row] = await pool.execute(
        `insert into user_gears (user_id, title, description, skill1_id, skill2_id, skill3_id, skill4_id, gear_id, weapon_id)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, title, description, skill1_id, skill2_id, skill3_id, skill4_id, gear_id, weapon_id]
    );

    return row.insertId;
}

export async function getGearByName(gearName: string) {
    const [row] = await pool.execute(
        'select * from gears where name = ?',
        [gearName],
    );

    return row[0];
}

export async function createLoadout(userId: number, title: string, description: string, rm: boolean, cb: boolean, sz: boolean, tc: boolean, hGearId: number | null, cGearId: number| null, sGearId: number | null, weaponId: number) {
    const [row] = await pool.execute(
        `insert into loadouts (user_id, title, description, rm, cb, sz, tc, h_gear_id, c_gear_id, s_gear_id, weapon_id)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, title, description, rm, cb, sz, tc, hGearId, cGearId, sGearId, weaponId]
    );

    return row.insertId;
}

export async function getUserLoadouts(userId: number) {
    const [row] = await pool.execute({
        sql: `select l.*,
        h_s1.name, h_s2.name, h_s3.name, h_s4.name, h_g.name,
        c_s1.name, c_s2.name, c_s3.name, c_s4.name, c_g.name,
        s_s1.name, s_s2.name, s_s3.name, s_s4.name, s_g.name,
        w.name, sub.name, spe.name
        from loadouts l
        left join user_gears h on h.id = l.h_gear_id
        left join gears h_g on h_g.id = h.gear_id
        left join skills h_s1 on h_s1.id = h.skill1_id
        left join skills h_s2 on h_s2.id = h.skill2_id
        left join skills h_s3 on h_s3.id = h.skill3_id
        left join skills h_s4 on h_s4.id = h.skill4_id
        left join user_gears c on c.id = l.c_gear_id
        left join gears c_g on c_g.id = c.gear_id
        left join skills c_s1 on c_s1.id = c.skill1_id
        left join skills c_s2 on c_s2.id = c.skill2_id
        left join skills c_s3 on c_s3.id = c.skill3_id
        left join skills c_s4 on c_s4.id = c.skill4_id
        left join user_gears s on s.id = l.s_gear_id
        left join gears s_g on s_g.id = s.gear_id
        left join skills s_s1 on s_s1.id = s.skill1_id
        left join skills s_s2 on s_s2.id = s.skill2_id
        left join skills s_s3 on s_s3.id = s.skill3_id
        left join skills s_s4 on s_s4.id = s.skill4_id
        join weapons w on w.id = l.weapon_id
        join subs sub on sub.id = w.sub_id
        join specials spe on spe.id = w.special_id
        where l.user_id = ? 
        order by l.id desc`,
        nestTables: '_'
    },
        [userId],
    );

    return JSON.parse(JSON.stringify(row));;
}

export async function getSkillByName(skillName: string) {
    const [row] = await pool.execute(
        'select * from skills where name = ?',
        [skillName],
    );

    return row[0];
}

export async function getWeaponByName(weaponName: string) {
    const [row] = await pool.execute(
        'select * from weapons where name = ?',
        [weaponName],
    );

    return row[0];
}
