<?php
include 'BindingPrestiti.php';
require_once '../Common/connection.php';


$method= $_SERVER['REQUEST_METHOD'];
$body= file_get_contents('php://input');

switch ($method) {
    case "GET":
        Read($conn);
        break;
    case "POST":
        Update($body,$conn);
        break;
    case "PUT":
        Create($body,$conn);
        break;
    case "DELETE":
        Delete($_GET["id"], $conn);
        break;
    default:
        echo "Not Method Found";
        break;
}

function Bind($connector,$query,$json)
{
    $decode = json_decode($json);
    $prestito = new Prestiti(
        $decode["IdUtente"]->IdUtente,
        $decode["IdLibro"]->IdLibro,
        $decode["DataInizioPrestito"]->DataInizioPrestito,
        $decode["DataFinePrestito"]->DataFinePrestito);
    $stmt = $connector->prepare($query);
    $stmt->bindParam(':IdUtente',$prestito->IdUtente,PDO::PARAM_STR);
    $stmt->bindParam(':IdLibro',$prestito->IdLibro,PDO::PARAM_STR);
    $stmt->bindParam(':DataInizioPrestito',$prestito->DataInizioPrestito,PDO::PARAM_STR);
    $stmt->bindParam(':DataFinePrestito',$prestito->DataFinePrestito,PDO::PARAM_STR);
    $stmt = $connector->prepare($query);
    if($stmt->execute()){
        $returnIdquery ="SELECT IdUtente from LibriUtenti WHERE IdUtente=:IdUtente LIMIT 1";
        $stmt = $connector->prepare($returnIdquery);
        $stmt->bindParam(':IdUtente',$prestito->IdUtente,PDO::PARAM_STR);
        $stmt->execute();
        $element = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($element);
        return true;
    }
}

function Create($jsonPrestito, $connector)
{
    $query ="INSERT INTO LibriUtenti (IdUtente,IdLibro,DataInizioPrestito,DataFinePrestito) 
             VALUE (:IdUtente,:IdLibro,:DataInizioPrestito,:DataFinePrestito)";

    $queryLibri ="UPDATE Libri SET IdUtentePrestito=:IdUtente,Stato='P', DataInizioPrestito=:DataInizioPrestito, 
                  DataFinePrestitoPrevista=:DataFinePrestito WHERE Id=:IdLibro";
    $resultQuery = Bind($connector,$query,$jsonPrestito);
    $resultQueryLibri = Bind($connector,$queryLibri,$jsonPrestito);
    if($resultQuery  == true && $resultQueryLibri == true) {
        http_response_code(200);
        return true;
    }
    http_response_code(503);
    echo json_encode(array("message" => "Impossibile creare un prestito."));
    return false;
}

function Read($connector)
{
    $query ="SELECT * FROM LibriUtenti ORDER BY IdLibro";
    $stmt = $connector->prepare($query);
    if($stmt->execute()){
        $element = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($element);
        return true;
    }
    http_response_code(404);
    echo json_encode(
        array("message" => "Nessun prestito nello storico")
    );
    return false;
}

function Update($jsonPrestito, $connector)
{
    $query ="UPDATE LibriUtenti SET IdUtente=:id,IdLibro=:IdLibro,DataInizioPrestito=:DataInizioPrestito,
             DataFinePrestito=:DataFinePrestito WHERE IdUtente=:IdUtente";
    $resultQuery = Bind($connector,$query,$jsonPrestito);
    if($resultQuery  == true) {
        http_response_code(200);
        return true;
    }
    http_response_code(503);
    echo json_encode(array("message" => "Impossibile aggiornare il prestito."));
    return false;
}

function Delete($jsonPrestito, $connector)
{
    $query ="DELETE FROM LibriUtenti WHERE IdUtente=:IdUtente";
    $queryLibri ="UPDATE Libri SET IdUtentePrestito=:NULL,Stato='N', DataInizioPrestito=:NULL, 
                  DataFinePrestitoPrevista=:NULL WHERE Id=:IdLibro";
    $resultQuery = Bind($connector,$query,$jsonPrestito);
    $resultQueryLibri = Bind($connector,$queryLibri,$jsonPrestito);
    if($resultQuery  == true && $resultQueryLibri == true){
        http_response_code(200);
        return true;
    }
    http_response_code(503);
    echo json_encode(array("message" => "Impossibile cancellare il prestito."));
    return false;
}

