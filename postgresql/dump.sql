create table tbl_customer
(
  id bigint not null
    primary key,
  tin varchar(12) not null unique
);

create table tbl_loan_transaction
(
  customer_id bigint not null,
  type varchar(120) not null,
  amount decimal(10,2) not null,
  constraint tbl_loan_transaction_tbl_customer_id_fk
    foreign key (customer_id) references tbl_customer (id)
)
;


INSERT INTO tbl_customer (id, tin) VALUES('3435','1113435');
INSERT INTO tbl_customer (id, tin) VALUES('4456','2224456');
INSERT INTO tbl_customer (id, tin) VALUES('6666','3336666');

INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (3435, 'loan', 1000.51);
INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (3435, 'interest', 1.50);
INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (3435, 'interest_repayment', 1.50);
INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (3435, 'loan', 7800.00);

INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (4456, 'loan_repayment', 5200.30);
INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (4456, 'loan', 17200.30);
INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (4456, 'interest_repayment', 200.30);
INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (4456, 'interest', 700.30);

INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (6666, 'loan_repayment', 5200.30);
INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (6666, 'loan', 9200.30);
INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (6666, 'interest_repayment', 200.30);
INSERT INTO tbl_loan_transaction (customer_id, type, amount) VALUES (6666, 'interest', 700.30);
