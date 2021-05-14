--hibernate will start sequence with id = 1, so use high ids to make sure, that hibernate won't break unique id

insert into lost_dog (id, age, breed, color, ears_type, hair_length, name, size, special_mark, tail_length, date_lost, city, owner_id, is_is_found, district, picture_id) values (10001, 12, 'unknown', 'blue', 'long', 'long', 'Pinky', 'big', 'none', 'long', '2021-3-4', 'Lublin', 10001, 0, 'Bronowice', 10001);
insert into lost_dog (id, age, breed, color, ears_type, hair_length, name, size, special_mark, tail_length, date_lost, city, owner_id, is_is_found, district, picture_id) values (10002, 13, 'random', 'brown', 'long', 'short', 'Borys', 'big', 'none', 'short', '2021-3-5', 'Lublin', 10001, 1, 'Bronowice', 10002);
insert into lost_dog (id, age, breed, color, ears_type, hair_length, name, size, special_mark, tail_length, date_lost, city, owner_id, is_is_found, district, picture_id) values (10003, 14, 'bulldog', 'blonde', 'long', 'short', 'Warus', 'small', 'gray ears', 'long', '2021-3-6', 'Lublin', 10002, 0, 'LSM', 10003);
insert into lost_dog (id, age, breed, color, ears_type, hair_length, name, size, special_mark, tail_length, date_lost, city, owner_id, is_is_found, district, picture_id) values (10004, 15, 'unknown', 'pink', 'short', 'long', 'Pimpek', 'small', 'none', 'long', '2021-3-7', 'Warsaw', 10003, 1, 'Ursynów', 10004);

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

--Password: 'xea-12Musk'
insert into user_account (id, email, password, name, phone_number) values (10001, 'e.musk@mail.com', '8732009E6F33A857CFA2F12DEA60BBC979D97C15F0BD56C05B2A4171BC75BA3F', 'Elon Musk', '+9123456789');
--Password: 'MicrosoftTheBest'
insert into user_account (id, email, password, name, phone_number) values (10002, 'b.gates@mail.com', 'F6D578996134B79D95998C8CA649A89F709A478B5FF04599A8D5A281B7969DE4', 'Bill Gates', '+9123456780');

--Password: '12345678'
insert into shelter_account (id, email, password, active, phone_number, name, street, building_number, additional_address_line, post_code, city) values (
    10001,  'hopeshelter@mail.com', 'EF797C8118F02DFB649607DD5D3F8C7623048C9C063D532CC95C5ED7A898A64F', 1, '789468327', 'Hope', 'Koszykowa', '75', '', '20-777', 'Warsaw');
--Password: 'ImATest'
insert into shelter_account (id, email, password, active, phone_number, name, street, building_number, additional_address_line, post_code, city) values (
    10002,  'greenpeace@mail.com', '289C6E0E9B6468807D4810AEBB5F02C14F17970FF3DD6D2075E765C2648ACF36', 0, '678121500', 'Green Peace', 'Plac Politechniki', '1B', '', '20-777', 'Warsaw');

--Password: 'admin007123'
insert into admin_account (id, email, password) values (10001, 'admin007@mail.com', '011A39F456F0C8E6CE47DEB012257A56BE34C52606FAA25D5F32399D6A50036D');
insert into admin_account (id, email, password) values (10002, 'admin008@mail.com', 'admin008123');