/* PostgreSQL 14.5 (Debian 14.5-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit */
CREATE TABLE PC(
    id integer PRIMARY KEY,
    cpu integer NOT NULL,
    memory integer NOT NULL,
    hdd integer NOT NULL
);

CREATE TABLE Departaments(
    id integer PRIMARY KEY,
    Name text NOT NULL
);

CREATE TABLE Users(
    id integer PRIMARY KEY,
    UserName text NOT NULL,
    Salary integer NOT NULL,
    DepartamentId integer REFERENCES Departaments(id),
    PCId integer REFERENCES PC(id) UNIQUE
);

CREATE TABLE AddressParts(
    AddrPartId integer PRIMARY KEY,
    ParentID integer REFERENCES AddressParts(AddrPartId),
    AddrPartTypeId integer NOT NULL,
    Name text NOT NULL
);


INSERT INTO Departaments(id, Name) VALUES (1, 'HR');
INSERT INTO Departaments(id, Name) VALUES (2, 'IT');
INSERT INTO Departaments(id, Name) VALUES (3, 'Accounting');
INSERT INTO Departaments(id, Name) VALUES (4, 'Empty department');

INSERT INTO PC(id,cpu,memory,hdd) VALUES (1, 2000, 8000, 500);
INSERT INTO PC(id,cpu,memory,hdd) VALUES (2, 3000, 6000, 1000);
INSERT INTO PC(id,cpu,memory,hdd) VALUES (3, 4000, 16000, 2000);
INSERT INTO PC(id,cpu,memory,hdd) VALUES (4, 1000, 3000, 300);
INSERT INTO PC(id,cpu,memory,hdd) VALUES (5, 500, 500, 100);

INSERT INTO Users(id, UserName, Salary, DepartamentId, PCId) VALUES (1, 'Andrey', 300000, 2, 3);
INSERT INTO Users(id, UserName, Salary, DepartamentId, PCId) VALUES (2, 'Maria', 200000, 2, 2);
INSERT INTO Users(id, UserName, Salary, DepartamentId, PCId) VALUES (3, 'Evgeniya', 60000, 1, 1);
INSERT INTO Users(id, UserName, Salary, DepartamentId, PCId) VALUES (4, 'Artem', 80000, 3, 4);
INSERT INTO Users(id, UserName, Salary, DepartamentId, PCId) VALUES (5, 'Pavel', 120000, 1, NULL);

INSERT INTO AddressParts(AddrPartId, ParentID, AddrPartTypeId, Name) VALUES(1, NULL,1,'api');
INSERT INTO AddressParts(AddrPartId, ParentID, AddrPartTypeId, Name) VALUES(2, 1,0,'v1');
INSERT INTO AddressParts(AddrPartId, ParentID, AddrPartTypeId, Name) VALUES(3, 1,0,'v2');
INSERT INTO AddressParts(AddrPartId, ParentID, AddrPartTypeId, Name) VALUES(4, 2,0,'users');
INSERT INTO AddressParts(AddrPartId, ParentID, AddrPartTypeId, Name) VALUES(5, 3,0,'users');


/* Task 1.1 */
SELECT cpu FROM PC WHERE memory=3000;

/* Task 1.2 */
WITH desiredUsers as (
    SELECT u.* 
    FROM Users u 
        JOIN PC p ON u.PCId=p.id 
    WHERE p.hdd>500
)
SELECT desiredUsers.*, Departaments.Name as department
FROM desiredUsers
    JOIN Departaments ON desiredUsers.DepartamentId=Departaments.id;

/* Task 1.3 */
SELECT  Departaments.Name as department, count(users.id)
FROM Departaments
    LEFT JOIN Users ON Users.DepartamentId=Departaments.id
GROUP BY Departaments.id;


/* Task 1.4 */
WITH over100kUsers as (
    SELECT *
    FROM Users
    WHERE Salary>100000    
)
SELECT  Departaments.Name as department, count(over100kUsers.id), coalesce(sum(over100kUsers.Salary),0) as over100kSalarySum
FROM Departaments
    LEFT JOIN over100kUsers ON over100kUsers.DepartamentId=Departaments.id
GROUP BY Departaments.id;

/* Task 1.5 */
SELECT PC.*
FROM PC
    JOIN Users ON Users.PCId=PC.id
WHERE Users.DepartamentId=(
    SELECT Departaments.id
    FROM Departaments
        LEFT JOIN Users ON Users.DepartamentId=Departaments.id
    GROUP BY Departaments.id
    ORDER BY coalesce(sum(Users.Salary),0) DESC
    LIMIT 1
);

/* Task 1.6 */
CREATE OR REPLACE FUNCTION getFullAdress(id integer) RETURNS text as $$
DECLARE
parent integer;
name text;
BEGIN
    SELECT AddressParts.Name,AddressParts.ParentID INTO name, parent
    FROM AddressParts
    WHERE AddressParts.AddrPartId=id;

    IF name is NULL THEN
        return NULL;
    END IF;

    IF parent is NULL THEN
        return concat('/',name);
    ELSE
        return concat(getFullAdress(parent),'/',name);
    END IF;
END; $$
LANGUAGE PLPGSQL;
select getFullAdress(5);
select getFullAdress(4);
select getFullAdress(3);
select getFullAdress(2);
select getFullAdress(1);


