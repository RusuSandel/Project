<?php
/**
 * Created by PhpStorm.
 * User: Mattia John
 * Date: 04/04/2019
 * Time: 17:09
 */

class Prestiti
{
    public $IdUtente;
    public $IdLibro;
    public $DataInizioPrestito;
    public $DataFinePrestito;


    public function __construct($IdUtente,$IdLibro,$DataInizioPrestito, $DataFinePrestito)
    {
        $this-> IdUtente = $IdUtente;
        $this-> IdLibro = $IdLibro;
        $this-> DataInizioPrestito = $DataInizioPrestito;
        $this-> DataFinePrestito = $DataFinePrestito;


    }




}