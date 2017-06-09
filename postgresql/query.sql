SELECT
  c.tin,
  to_char(SUM(CASE WHEN c.id=lt.customer_id AND (lt.type='loan' or lt.type='interest') THEN lt.amount ELSE 0 END)+SUM(CASE WHEN c.id=lt.customer_id AND (lt.type='loan_repayment' or lt.type='interest_repayment') THEN lt.amount*-1 ELSE 0 END),'FM999999.90') portfolio,
  CONCAT(ROUND((SUM(CASE WHEN c.id=lt.customer_id AND (lt.type='loan' or lt.type='interest') THEN lt.amount ELSE 0 END)+SUM(CASE WHEN c.id=lt.customer_id AND (lt.type='loan_repayment' or lt.type='interest_repayment') THEN lt.amount*-1 ELSE 0 END))*100/SUM(lt.amount*(CASE WHEN (lt.type='loan' or lt.type='interest') THEN 1 ELSE -1 END)),2),'%') AS "%"

FROM tbl_loan_transaction AS lt, tbl_customer AS c
GROUP BY c.tin
HAVING (SUM(CASE WHEN c.id=lt.customer_id AND (lt.type='loan' or lt.type='interest') THEN lt.amount ELSE 0 END)+SUM(CASE WHEN c.id=lt.customer_id AND (lt.type='loan_repayment' or lt.type='interest_repayment') THEN lt.amount*-1 ELSE 0 END))>0
ORDER BY (SUM(CASE WHEN c.id=lt.customer_id AND (lt.type='loan' or lt.type='interest') THEN lt.amount ELSE 0 END)+SUM(CASE WHEN c.id=lt.customer_id AND (lt.type='loan_repayment' or lt.type='interest_repayment') THEN lt.amount*-1 ELSE 0 END)) DESC;