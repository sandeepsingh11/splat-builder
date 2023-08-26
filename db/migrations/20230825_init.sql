drop table if exists users;

create table users(
    id int auto_increment,
    username varchar(255) not null,
    email varchar(255),
    password varchar(255) not null,
    token varchar(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);

drop table if exists gears;

create table gears(
    id int auto_increment,
    user_id int not null,
    title varchar(255),
    description varchar(255),
    skill1 varchar(255) default 'Unknown',
    skill2 varchar(255) default 'Unknown',
    skill3 varchar(255) default 'Unknown',
    skill4 varchar(255) default 'Unknown',
    gear varchar(255) not null,
    weapon varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);

drop table if exists loadouts;

create table loadouts(
    id int auto_increment,
    user_id int not null,
    title varchar(255),
    description varchar(255),
    rm tinyint default 0,
    cb tinyint default 0,
    sz tinyint default 0,
    tc tinyint default 0,
    h_gear_id int,
    c_gear_id int,
    s_gear_id int,
    weapon varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);
