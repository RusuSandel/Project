<?php

include 'BindingPrestiti.php';
include '../Libri/LIbro.php';
include '../Autori/ViewAutore.php';
require_once '../Common/connection.php';

$method = $_SERVER['REQUEST_METHOD'];
$body = file_get_contents('php://input');

switch ($method) {
    case "GET":
        Read($_GET["id"],$_GET["ISBN"],$_GET["Codice"],$_GET["Titolo"],$_GET["CognomeAutore"],
            $_GET["NomeAutore"],$_GET["IdGenere"],$_GET["AnnoDa"],$_GET["AnnoA"],$conn);
        break;
    case "POST":
        Update($body, $conn);
        break;
    case "PUT":
        Create($body, $conn);
        break;
    case "DELETE":
        Delete($_GET["id"], $conn);
        break;
    default:
        echo "Not Method Found";
        break;
}

function Bind($connector, $query, $json)
{
    $decode = json_decode($json);
    $prestito = new Prestiti(
        $decode["IdUtente"]->IdUtente,
        $decode["IdLibro"]->IdLibro,
        $decode["DataInizioPrestito"]->DataInizioPrestito,
        $decode["DataFinePrestito"]->DataFinePrestito);
    $stmt = $connector->prepare($query);
    $stmt->bindParam(':IdUtente', $prestito->IdUtente, PDO::PARAM_STR);
    $stmt->bindParam(':IdLibro', $prestito->IdLibro, PDO::PARAM_STR);
    $stmt->bindParam(':DataInizioPrestito', $prestito->DataInizioPrestito, PDO::PARAM_STR);
    $stmt->bindParam(':DataFinePrestito', $prestito->DataFinePrestito, PDO::PARAM_STR);
    $stmt = $connector->prepare($query);
    if ($stmt->execute()) {
        $returnIdquery = "SELECT IdUtente from LibriUtenti WHERE IdUtente=:IdUtente LIMIT 1";
        $stmt = $connector->prepare($returnIdquery);
        $stmt->bindParam(':IdUtente', $prestito->IdUtente, PDO::PARAM_STR);
        $stmt->execute();
        $element = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($element);
        return true;
    }
}

function Create($jsonPrestito, $connector)
{
    $query = "INSERT INTO LibriUtenti (IdUtente,IdLibro,DataInizioPrestito,DataFinePrestito) 
             VALUE (:IdUtente,:IdLibro,:DataInizioPrestito,:DataFinePrestito)";

    $queryLibri = "UPDATE Libri SET IdUtentePrestito=:IdUtente,Stato='P', DataInizioPrestito=:DataInizioPrestito, 
                  DataFinePrestitoPrevista=:DataFinePrestito WHERE Id=:IdLibro";
    $resultQuery = Bind($connector, $query, $jsonPrestito);
    $resultQueryLibri = Bind($connector, $queryLibri, $jsonPrestito);
    if ($resultQuery == true && $resultQueryLibri == true) {
        http_response_code(200);
        return true;
    }
    http_response_code(503);
    echo json_encode(array("message" => "Impossibile creare un prestito."));
    return false;
}

function Read($Id,$ISBN,$Codice,$Titolo,$CognomeAutore, $NomeAutore,$IdGenere,$AnnoDa,$AnnoA,$connector)
{
    $libro= new Libro($Id,$Titolo,$ISBN,$Codice,null,$AnnoDa,null,null,null,null,null,null,null,$IdGenere);
    $autore = new viewAutore(Null,$NomeAutore,$CognomeAutore,null,null);
    $query = "SELECT Libri.*,Autori.*
    FROM Libri
    JOIN Autori ON Autori.Id=Libri.IdAutore 
    WHERE libri.Stato = 'P'
    AND (Libri.id LIKE :id
    OR Libri.Titolo LIKE :titolo
    OR Libri.ISBN LIKE :isbn
    OR Libri.Codice LIKE :codice
    OR Libri.AnnoPubblicazione BETWEEN :annoDa AND :annoA
    OR Libri.IdGenere LIKE :idGenere)";
    $stmt = $connector->prepare($query);
    $stmt->bindParam(':id',$libro->Id,PDO::PARAM_INT);
    $stmt->bindParam(':titolo',$libro->Titolo,PDO::PARAM_STR);
    $stmt->bindParam(':isbn',$libro->ISBN,PDO::PARAM_STR);
    $stmt->bindParam(':codice',$libro->Codice,PDO::PARAM_INT);
    $stmt->bindParam(':annoDa',$AnnoDa,PDO::PARAM_INT);
    $stmt->bindParam(':annoA',$AnnoA,PDO::PARAM_INT);
    $stmt->bindParam(':idGenere',$libro->IdGenere,PDO::PARAM_STR);

    if ($stmt->execute()) {
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
    $query = "UPDATE LibriUtenti SET IdUtente=:id,IdLibro=:IdLibro,DataInizioPrestito=:DataInizioPrestito,
             DataFinePrestito=:DataFinePrestito WHERE IdUtente=:IdUtente";
    $resultQuery = Bind($connector, $query, $jsonPrestito);
    if ($resultQuery == true) {
        http_response_code(200);
        return true;
    }
    http_response_code(503);
    echo json_encode(array("message" => "Impossibile aggiornare il prestito."));
    return false;
}

function Delete($jsonPrestito, $connector)
{
    $query = "DELETE FROM LibriUtenti WHERE IdUtente=:IdUtente";
    $queryLibri = "UPDATE Libri SET IdUtentePrestito=:NULL,Stato='N', DataInizioPrestito=:NULL, 
                  DataFinePrestitoPrevista=:NULL WHERE Id=:IdLibro";
    $resultQuery = Bind($connector, $query, $jsonPrestito);
    $resultQueryLibri = Bind($connector, $queryLibri, $jsonPrestito);
    if ($resultQuery == true && $resultQueryLibri == true) {
        http_response_code(200);
        return true;
    }
    http_response_code(503);
    echo json_encode(array("message" => "Impossibile cancellare il prestito."));
    return false;
}