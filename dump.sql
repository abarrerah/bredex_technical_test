create table team
(
    champions       int          null,
    foundation_year int          null,
    id              int          not null
        primary key,
    paid_entry_fee  bit          null,
    name            varchar(255) not null,
    constraint UKg2l9qqsoeuynt4r5ofdt1x2td
        unique (name)
);

create table team_seq
(
    next_val bigint null
);

create table user
(
    id        int                    not null
        primary key,
    country   varchar(255)           null,
    firstname varchar(255)           null,
    lastname  varchar(255)           not null,
    password  varchar(255)           null,
    username  varchar(255)           not null,
    role      enum ('ADMIN', 'USER') null,
    constraint UKsb8bbouer5wak8vyiiy4pf2bx
        unique (username)
);

create table user_seq
(
    next_val bigint null
);

INSERT INTO `user` (`id`, `country`, `firstname`, `lastname`, `password`, `username`, `role`)
VALUES
(1, 'UK', 'formula1', 'admin', '$2a$10$ipUKfSQvP9TJtzn8FVV5DuKQgqPQdYuQCvwXaAKovGaett3yEOHYO', 'admin@admin.com', 'USER');

INSERT INTO `team` (`champions`, `foundation_year`, `id`, `paid_entry_fee`, `name`)
VALUES
(1, 8, 2010, 1, 'Mercedes'),
(2, 4, 2005, 1, 'Red Bull'),
(3, 16, 1950, 1, 'Ferrari'),
(4, 8, 1966, 1, 'McLaren'),
(5, 0, 2021, 1, 'Aston Martin'),
(6, 2, 1977, 1, 'Alpine'),
(7, 0, 2006, 1, 'AlphaTauri'),
(8, 2, 1950, 1, 'Alfa Romeo'),
(9, 0, 2016, 1, 'Haas'),
(10, 9, 1977, 1, 'Williams');


