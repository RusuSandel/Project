<?php

$A = $_GET["token"];
// include our OAuth2 Server object
require_once __DIR__ . '/server.php';

// Handle a request to a resource and authenticate the access token
if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
    $server->getResponse()->send();
    die;
}
echo json_encode(array('success' => true, 'message' => 'You accessed my APIs!'));
/*$access_token= $_GET['token'];
try {
    $hostname = "localhost";
    $dbname = "biblioteca";
    $user = "root";
    $pass = "";

    $db = new PDO ("mysql:host=$hostname;dbname=$dbname", $user, $pass);
}
catch (PDOException $e) {
    echo "Errore: " . $e->getMessage();
    die();
}

$sql = "SELECT `utenti`.Nome,`utenti`.Cognome,`utenti`.Mail,`utenti`.LivelloUtente FROM `oauth_access_tokens` JOIN `utenti` ON `utenti`.Id = `oauth_access_tokens`.user_id  WHERE `oauth_access_tokens`.access_token=:token";

$stmt = $db->prepare($sql);
$stmt->execute(['token' => $access_token]);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows[0]);
*/

