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

drop table if exists user_gears;

create table user_gears(
    id int auto_increment,
    user_id int not null,
    title varchar(255),
    description varchar(255),
    skill1 varchar(50) default 'Unknown',
    skill2 varchar(50) default 'Unknown',
    skill3 varchar(50) default 'Unknown',
    skill4 varchar(50) default 'Unknown',
    gear varchar(50) not null,
    weapon varchar(50) not null,
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
    weapon varchar(50) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);


drop table if exists skills;

create table skills(
    id int auto_increment,
    name varchar(50) not null,
    is_main tinyint default 0,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);

drop table if exists subs;

create table subs(
    id int auto_increment,
    name varchar(50) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);

drop table if exists specials;

create table specials(
    id int auto_increment,
    name varchar(50) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);

drop table if exists weapons;

create table weapons(
    id int auto_increment,
    name varchar(50) not null,
    weapon_class varchar(50) not null,
    sub_id int not null,
    special_id int not null,
    special_point int not null,
    season int not null,
    price int not null,
    shop_unlock_rank int not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);

drop table if exists gears;

create table gears(
    id int auto_increment,
    name varchar(50) not null,
    name_en varchar(50),
    skill_id int not null,
    brand_id int not null,
    gear_type varchar(1),
    price int,
    season int not null,
    rarity int not null,
    how_to_get varchar(50),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);

drop table if exists brands;

create table brands(
    id int auto_increment,
    name varchar(10) not null,
    primary_skill_id int,
    secondary_skill_id int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(id)
);
