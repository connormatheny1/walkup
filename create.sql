create table users (
    id serial primary key,
    name text unique not null,
    discord_id varchar(40) unique not null
);

create table songs (
    id serial primary key,
    user_id int references users(id),
    sound text
);