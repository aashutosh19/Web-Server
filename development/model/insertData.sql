
-- insert user_role table
Insert into user_role(role_id, role) values (1, 'user');
Insert into user_role(role_id, role) values (2, 'admin');

-- insert status table
Insert into status(status_id, status) values(1, 'Open');
Insert into status(status_id, status) values(2, 'Work in Progress');
Insert into status(status_id, status) values(3, 'Closed');
Insert into status(status_id, status) values(4, 'Resolved');


-- insert user table
set @user_id = last_insert_id();
Insert into user(user_id, username, password, role_id, disable) values (@user_id, 'kirby104', '123', 1, 1);
Insert into user(user_id, username, password, role_id, disable) values (@user_id, 'user', '123', 1, 0);
Insert into user(user_id, username, password, role_id, disable) values (@user_id, 'admin', '123', 2, 0);
-- set @user_id = 1;


-- insert issue table
set @issue_id = last_insert_id();
INSERT INTO issue(issue_id, title, description, user_id, status_id, date) values (@issue_id, "test title name", "This is a test", 1, 1, "2019-01-16");

-- delete from user where id = 1;

-- select * from user where username = "kirby104" and password = 123 and disable = 1
/*
ALTER TABLE issue AUTO_INCREMENT = 0; 
ALTER TABLE status AUTO_INCREMENT = 0; 
ALTER TABLE user AUTO_INCREMENT = 0; 
ALTER TABLE user_role AUTO_INCREMENT = 0; 
 
TRUNCATE TABLE issue;
TRUNCATE TABLE status;
TRUNCATE TABLE user;
TRUNCATE TABLE user_role;
*/

 