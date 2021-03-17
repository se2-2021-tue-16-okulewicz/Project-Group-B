--hibernate will start sequence with id = 1, so use high ids to make sure, that hibernate won't break unique id

insert into lost_dog (id, age, breed, color, ears_type, hair_length, name, size, special_marks, tail_length, date_lost, city, owner_id, is_is_found, district, picture_id) values (10001, 12, 'unknown', 'blue', 'long', 'long', 'Pinky', 'big', 'none', 'long', '2021-3-4', 'Lublin', 10001, 0, 'Bronowice', 10001);
insert into lost_dog (id, age, breed, color, ears_type, hair_length, name, size, special_marks, tail_length, date_lost, city, owner_id, is_is_found, district, picture_id) values (10002, 13, 'random', 'brown', 'long', 'short', 'Borys', 'big', 'none', 'short', '2021-3-5', 'Lublin', 10001, 1, 'Bronowice', 10002);
insert into lost_dog (id, age, breed, color, ears_type, hair_length, name, size, special_marks, tail_length, date_lost, city, owner_id, is_is_found, district, picture_id) values (10003, 14, 'bulldog', 'blonde', 'long', 'short', 'Warus', 'small', 'gray ears', 'long', '2021-3-6', 'Lublin', 10002, 0, 'LSM', 10003);
insert into lost_dog (id, age, breed, color, ears_type, hair_length, name, size, special_marks, tail_length, date_lost, city, owner_id, is_is_found, district, picture_id) values (10004, 15, 'unknown', 'pink', 'short', 'long', 'Pimpek', 'small', 'none', 'long', '2021-3-7', 'Warsaw', 10003, 1, 'Ursynów', 10004);

insert into picture (id, file_name, file_type, data) values (10001, 'example1', 'text/plain', RAWTOHEX('example_data1'));
insert into picture (id, file_name, file_type, data) values (10002, 'example2', 'text/plain', RAWTOHEX('example_data2'));
insert into picture (id, file_name, file_type, data) values (10003, 'example3', 'text/plain', RAWTOHEX('example_data3'));
insert into picture (id, file_name, file_type, data) values (10004, 'example4', 'text/plain', RAWTOHEX('example_data4'));


insert into dog_behavior (id, dog_id, behavior) values (10001, 10001, 'Barks');
insert into dog_behavior (id, dog_id, behavior) values (10002, 10001, 'Wags tail');
insert into dog_behavior (id, dog_id, behavior) values (10003, 10001, 'Eats');
insert into dog_behavior (id, dog_id, behavior) values (10004, 10002, 'Wants to conquer the world');
insert into dog_behavior (id, dog_id, behavior) values (10005, 10003, 'Drinks milk');
insert into dog_behavior (id, dog_id, behavior) values (10006, 10003, 'Sprints very fast');
insert into dog_behavior (id, dog_id, behavior) values (10007, 10004, 'Barks');
insert into dog_behavior (id, dog_id, behavior) values (10008, 10004, 'Drinks milk');
insert into dog_behavior (id, dog_id, behavior) values (10009, 10004, 'Eats');

insert into user_account (id, username, password, name, phone_number) values (10001, 'e.musk@mail.com', 'xea-12Musk', 'Elon Musk', '+9123456789');
insert into user_account (id, username, password, name, phone_number) values (10002, 'b.gates@mail.com', 'MicrosoftTheBest', 'Bill Gates', '+9123456780');

insert into shelter (id, name, country, town, street, house_number) values (10001, 'Hope', 'Poland', 'Warsaw', 'Koszykowa', '75');
insert into dog_shelter_account (id, username, password, shelter_id) values (10001, 'hopeShelter', '12345678', 10001);
insert into shelter (id, name, country, town, street, house_number) values (10002, 'Green Peace', 'Poland', 'Warsaw', 'plac Politechniki', '1B');
insert into dog_shelter_account (id, username, password, shelter_id) values (10002, 'greenPeace', '12345678', 10002);

insert into admin_account (id, username, password) values (10001, 'admin007', 'admin007123');
insert into admin_account (id, username, password) values (10002, 'admin008', 'admin008123');