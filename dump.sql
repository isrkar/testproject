create table email
(
	id int auto_increment
		primary key,
	email varchar(42) null,
	constraint email_email_uindex
		unique (email)
)
;

