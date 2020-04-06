<?php
class UserInfo
{//`Id`, `Nome`, `Cognome`, `Telefono`, `Mail`, `DataDiNascita`, `Documento`, `NumeroDocumento`, `CodiceFiscale`, `Indirizzo`, `Località`, `Provincia`, `CAP`, `LivelloUtente`
    public $Id;
    public $Nome;
    public $Cognome;
    public $LivelloUtente;


    public function __construct($id, $nome, $cognome, $livelloUtente)
    {
        //added by Bonantini
        $this-> Id = $id;
        $this-> Nome = $nome;
        $this-> Cognome = $cognome;
        $this-> LivelloUtente= $livelloUtente;
    }
}