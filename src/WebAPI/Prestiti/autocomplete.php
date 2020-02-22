
<?php

include '../Common/connection.php';
$partName= $_GET["text"];
    //da modificare per ricerca prestiti con nome utente
    $query = "SELECT Id AS value, CONCAT(Cognome,' ',Nome) AS text FROM Utenti WHERE CONCAT(Cognome,' ',Nome) LIKE :part LIMIT 50";
    $stmt = $conn->prepare($query);
    $stmt->execute(['part' => "%".$partName."%"]);
    $element = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($element);


?>
