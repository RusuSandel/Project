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

function Create($jsonPrestito, $connector)
{
    $decode = json_decode($jsonPrestito);
    $prestito = new Prestiti(
                            $decode["IdUtente"]->IdUtente,
                            $decode["IdLibro"]->IdLibro,
                            $decode["DataInizioPrestito"]->DataInizioPrestito,
                            $decode["DataFinePrestito"]->DataFinePrestito);
    
    $query ="INSERT INTO libriutenti (IdUtente,IdLibro,DataInizioPrestito,DataFinePrestito) 
             VALUE (:IdUtente,:IdLibro,:DataInizioPrestito,:DataFinePrestito)";
    $stmt = $connector->prepare($query);
    $stmt->bindParam(':IdUtente',$prestito->IdUtente,PDO::PARAM_STR);
    $stmt->bindParam(':IdLibro',$prestito->IdLibro,PDO::PARAM_STR);
    $stmt->bindParam(':DataInizioPrestito',$prestito->DataInizioPrestito,PDO::PARAM_STR);
    $stmt->bindParam(':DataFinePrestito',$prestito->DataFinePrestito,PDO::PARAM_STR);
    if($stmt->execute()){
        $returnIdquery ="SELECT IdUtente from libriutenti WHERE IdUtente=:IdUtente LIMIT 1";
        $stmt = $connector->prepare($returnIdquery);
        $stmt->bindParam(':IdUtente',$prestito->IdUtente,PDO::PARAM_STR);
        $stmt->execute();
        $element = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(201);
        echo json_encode($element);
        return true;
    }
    http_response_code(503);
    echo json_encode(array("message" => "Impossibile creare un prestito."));
    return false;
}

function Read($connector)
{
    $query ="SELECT * FROM libriutenti ";
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

function Update($jsonPrestiti, $connector)
{
    $decode = json_decode($jsonPrestiti);
    $prestito = new Prestiti(
        $decode["IdUtente"]->IdUtente,
        $decode["IdLibro"]->IdLibro,
        $decode["DataInizioPrestito"]->DataInizioPrestito,
        $decode["DataFinePrestito"]->DataFinePrestito);
    $query ="UPDATE libriutenti SET IdUtente=:id WHERE IdUtente=:id";
    $stmt = $connector->prepare($query);
    $stmt->bindParam(':id',$prestito->IdUtente,PDO::PARAM_INT);

    if($stmt->execute()){
        $returnIdquery ="SELECT IdLibro from libriutenti WHERE IdLibro=:id LIMIT 1";
        $stmt = $connector->prepare($returnIdquery);
        $stmt->bindParam(':id',$prestito->IdLibro,PDO::PARAM_STR);
        $stmt->execute();
        $element = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($element);
        return true;
    }

    http_response_code(503);
    echo json_encode(array("message" => "Impossibile aggiornare il prestito."));
    return false;
}

function Delete($id , $connector)
{
    $query ="DELETE FROM libriutenti WHERE IdUtente=:id";
    $stmt = $connector->prepare($query);
    $stmt->bindParam(':id',$id);
    if($stmt->execute()){
        http_response_code(200);
        echo $id;
        return true;
    }
    
    http_response_code(503);
    echo json_encode(array("message" => "Impossibile cancellare il prestito."));
    return false;
}

