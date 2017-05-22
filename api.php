<?php
header('Content-Type: application/json');
include "db.php";

$countPerPage = 5;
$req = $db->real_escape_string(@$_GET['req']);

$searchReq = $db->real_escape_string(@$_GET['search']);

if ($req == 'getCount') {
    $query = 'SELECT COUNT(*) as total FROM `email`';
    $result = $db->query($query)->fetch_assoc();

    echo json_encode(['status' => 'success', 'req' => $req, 'count' => $result['total']]);
}


if ($req == 'getPage') {
    $pageNum = (@$_GET['pageNum'] ? (int)@$_GET['pageNum'] : 1);

    $from = $countPerPage * $pageNum - $countPerPage;
    $to = $from + $countPerPage;

    $search = '';

    if ($searchReq) {
        $search = "WHERE `email` LIKE '%" . $searchReq . "%'";
    }

    $query = "SELECT * FROM `email` " . $search . " ORDER BY `id` DESC LIMIT " . $from . ',' . $to;


    if ($result = $db->query($query)) {
        $jsonResult = array();
        while ($row = $result->fetch_assoc()) {
            $jsonResult[] = $row;
        }
        echo json_encode([
            'status' => 'success',
            'req' => $req,
            'rows' => count($jsonResult),
            'page' => $pageNum,
            'data' => $jsonResult
        ]);

    } else echo json_encode(['status' => 'error', 'req' => $req]);
}