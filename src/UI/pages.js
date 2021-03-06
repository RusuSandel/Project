var editAutori = "<p class=\"inputdesc\">Nome</p>" +
    "<input type=\"text\" class=\"input\" id=\"AutoreNome\"><br>" +
    "<p class=\"inputdesc\">Cognome</p>" +
    "<input type=\"text\" class=\"input\" id=\"AutoreCognome\"><br>" +
    "<p class=\"inputdesc\">Data nascita/ Data morte:</p>" +
    "<input type=\"date\" class=\"input\" id=\"AutoreNascita\">" +
    "<input type=\"date\" class=\"input\" id=\"AutoreMorte\"><br>" +
    "<button class=\"submitsearch\" type=\"submit\" name=\"librisubmit\">Aggiungi Autore</button>";

var editCase = "<p class=\"inputdesc\">Nome</p>" +
    "<input type=\"text\" class=\"input\" id=\"CasaNome\"><br>" +
    "<p class=\"inputdesc\">Luogo</p> <input type=\"text\" class=\"input\" id=\"CasaLuogo\">" +
    "<br><button class=\"submitsearch\" type=\"submit\" name=\"librisubmit\">Aggiungi Case</button>";

var editGeneri = "<p class=\"inputdesc\">Genere</p>" +
    "<input type=\"text\" class=\"input\" id=\"GenereId\"><br>" +
    "<button class=\"submitsearch\" type=\"submit\" name=\"librisubmit\">Aggiungi Genere</button>";

var editLibri = "<p class=\"inputdesc\">ISBN</p><input type=\"text\" class=\"input\" id=\"LibroISBN\"><br>" +
    "<p class=\"inputdesc\">Codice</p>" +
    "<input type=\"text\" class=\"input\" id=\"LibroCodice\"><br>" +
    "<p class=\"inputdesc\">Titolo</p><input type=\"text\" class=\"input\" id=\"LibroTitolo\"><br>" +
    "<p class=\"inputdesc\">Autore</p><input type=\"text\" placeholder=\"Cognome Nome\" class=\"input\" id=\"LibroAutore\"><br>" +
    "<p class=\"inputdesc\">Genere</p><input type=\"text\" class=\"input\" id=\"LibroGenere\"><br>" +
    "<p class=\"inputdesc\">Anno Pubblicazione da / a:</p><input type=\"date\" class=\"input\" id=\"LibroAnnoDa\">" +
        "<input type=\"date\" class=\"input\" id=\"LibroAnnoA\"><br>" +
    "<p class=\"inputdesc\">Casa Editrice</p><input type=\"text\" class=\"input\" id=\"LibroCasaEditrice\"><br>" +
    "<p class=\"inputdesc\">Scaffale</p><input type=\"text\" class=\"input\" id=\"LibroScaffale\"><br>" +
    "<p class=\"inputdesc\">Armadio</p><input type=\"text\" class=\"input\" id=\"LibroArmadio\"><br>" +
    "<input type=\"text\" style=\"display: none\" id=\"LibroAutoreHidden\">" +
        "<input type=\"text\" style=\"display: none\" id=\"LibroGenereHidden\">" +
        "<input type=\"text\" style=\"display: none\" id=\"LibroCasaEditriceHidden\">" +
    "<button class=\"submitsearch\" type=\"submit\" name=\"librisubmit\">Aggiungi Libro</button>" +
    "<button class=\"websearch\" type=\"submit\" name=\"librisubmit\">Importa Libro dal Web</button>";

var cercaAutori = "<p class=\"inputdesc\">Id</p><input type=\"text\" class=\"input\" id=\"AutoreId\"><br>" +
    "<p class=\"inputdesc\">Nome</p><input type=\"text\" class=\"input\" id=\"AutoreNome\"><br>" +
    "<p class=\"inputdesc\">Cognome</p><input type=\"text\" class=\"input\" id=\"AutoreCognome\"><br>" +
    "<p class=\"inputdesc\">Data nascita da / a:</p><input type=\"date\" class=\"input\" id=\"AutoreNascitaDa\">" +
        "<input type=\"date\" class=\"input\" id=\"AutoreNascitaA\"><br>" +
        "<p class=\"inputdesc\">Data morte da / a:</p><input type=\"date\" class=\"input\" id=\"AutoreMorteDa\">" +
        "<input type=\"date\" class=\"input\" id=\"AutoreMorteA\"><br>" +
        "<button id=\"autorisubmit\" class=\"submitsearch\" type=\"submit\" name=\"autorisubmit\">Ricerca</button>";

var cercaGeneri = "<p class=\"inputdesc\">Genere</p><input type=\"text\" class=\"input\" id=\"GenereId\"><br>" +
    "<button id=\"generisubmit\" class=\"submitsearch\" type=\"submit\" name=\"generisubmit\">Ricerca</button>";

var cercaCase = "<p class=\"inputdesc\">Id</p><input type=\"text\" class=\"input\" id=\"CasaId\"><br>" +
    "<p class=\"inputdesc\">Nome</p><input type=\"text\" class=\"input\" id=\"CasaNome\"><br>" +
    "<p class=\"inputdesc\">Luogo</p><input type=\"text\" class=\"input\" id=\"CasaLuogo\"><br>" +
    "<button id=\"casesubmit\" class=\"submitsearch\" type=\"submit\" name=\"casesubmit\">Ricerca</button>";

var cercaLibri = "<p class=\"inputdesc\">Id</p><input type=\"text\" class=\"input\" id=\"LibroId\"><br>" +
    "<p class=\"inputdesc\">ISBN</p><input type=\"text\" class=\"input\" id=\"LibroISBN\"><br>" +
    "<p class=\"inputdesc\">Codice</p><input type=\"text\" class=\"input\" id=\"LibroCodice\"><br>" +
    "<p class=\"inputdesc\">Titolo</p><input type=\"text\" class=\"input\" id=\"LibroTitolo\"><br>" +
    "<p class=\"inputdesc\">Autore</p><input type=\"text\" placeholder=\"Cognome Nome\" class=\"input\" id=\"LibroAutore\"><br>" +
    "<p class=\"inputdesc\">Genere</p><input type=\"text\" class=\"input\" id=\"LibroGenere\"><br>" +
    "<p class=\"inputdesc\">Anno Pubblicazione da / a:</p><input type=\"date\" class=\"input\" id=\"LibroAnnoDa\">" +
        "<input type=\"date\" class=\"input\" id=\"LibroAnnoA\"><br>" +
    "<p class=\"inputdesc\">Casa Editrice</p><input type=\"text\" class=\"input\" id=\"LibroCasaEditrice\"><br>" +
    "<p class=\"inputdesc\">Scaffale</p><input type=\"text\" class=\"input\" id=\"LibroScaffale\"><br>" +
    "<p class=\"inputdesc\">Armadio</p>" +
        "<input type=\"text\" class=\"input\" id=\"LibroArmadio\"><br>" +
    "<input type=\"text\" style=\"display: none\" id=\"LibroAutoreHidden\">" +
    "<input type=\"text\" style=\"display: none\" id=\"LibroGenereHidden\">" +
    "<input type=\"text\" style=\"display: none\" id=\"LibroCasaEditriceHidden\">" +
    "<button id=\"librisubmit\" class=\"submitsearch\" type=\"submit\" name=\"librisubmit\">Ricerca</button>";

var editLibriDebug = "<p class=\"inputdesc\">ISBN</p><input type=\"text\" class=\"input\" id=\"LibroISBN\"><br>" +
    "<p class=\"inputdesc\">Codice</p><input type=\"text\" class=\"input\" id=\"LibroCodice\"><br>" +
    "<p class=\"inputdesc\">Titolo</p><input type=\"text\" class=\"input\" id=\"LibroTitolo\"><br>" +
    "<p class=\"inputdesc\">Autore</p><input type=\"text\" placeholder=\"Cognome Nome\" class=\"input\" id=\"LibroAutore\"><br>" +
    "<p class=\"inputdesc\">Genere</p><input type=\"text\" class=\"input\" id=\"LibroGenere\"><br>" +
    "<p class=\"inputdesc\">Anno Pubblicazione:</p><input type=\"date\" class=\"input\" id=\"LibroAnno\"><br>" +
    "<p class=\"inputdesc\">Casa Editrice</p><input type=\"text\" class=\"input\" id=\"LibroCasaEditrice\"><br>" +
    "<p class=\"inputdesc\">Scaffale</p><input type=\"text\" class=\"input\" id=\"LibroScaffale\"><br>" +
    "<p class=\"inputdesc\">Armadio</p><input type=\"text\" class=\"input\" id=\"LibroArmadio\"><br>" +
    "<input type=\"text\" style=\"\" id=\"LibroAutoreHidden\">" +
        "<input type=\"text\" style=\"\" id=\"LibroGenereHidden\">" +
        "<input type=\"text\" style=\"\" id=\"LibroCasaEditriceHidden\">" +
    "<button class=\"submitsearch\" type=\"submit\" name=\"librisubmit\">Aggiungi Libro</button>" +
    "<button class=\"websearch\" type=\"submit\" name=\"librisubmit\">Importa Libro dal Web</button>";

var editUser = "<p class=\"inputdesc\">Nome</p><input type=\"text\" class=\"input\" id=\"UserNome\"><br>" +
    "<p class=\"inputdesc\">Cognome</p><input type=\"text\" class=\"input\" id=\"UserCognome\"><br>" +
    "<p class=\"inputdesc\">Telefono</p><input type=\"text\" class=\"input\" id=\"UserTelefono\"><br>" +
    "<p class=\"inputdesc\">Codice Fiscale</p><input type=\"text\" class=\"input\" id=\"UserCF\"><br>" +
    "<p class=\"inputdesc\">Data di Nascita</p><input type=\"date\" class=\"input\" id=\"UserData\"><br>" +
    "<p class=\"inputdesc\">E-Mail</p><input type=\"text\" class=\"input\" id=\"UserMail\"><br>" +
    "<p class=\"inputdesc\">Livello Utente</p><input type=\"text\" class=\"input\" id=\"UserLevel\"><br>" +
    "<p class=\"inputdesc\">CAP</p><input type=\"text\" class=\"input\" id=\"UserCap\"><br>" +
    "<p class=\"inputdesc\">Indirizzo</p><input type=\"text\" class=\"input\" id=\"UserIndirizzo\"><br>" +
    "<p class=\"inputdesc\">Località</p><input type=\"text\" class=\"input\" id=\"UserLocalita\"><br>" +
    "<p class=\"inputdesc\">Provincia</p><input type=\"text\" class=\"input\" id=\"UserProvincia\"><br>" +
    "<p class=\"inputdesc\">Tipo Documento</p><input type=\"text\" class=\"input\" id=\"UserDocumento\"><br>" +
    "<p class=\"inputdesc\">Numero Carta</p><input type=\"text\" class=\"input\" id=\"UserCarta\"><br>" +
    "<p class=\"inputdesc\">Username</p><input type=\"text\" class=\"input\" id=\"UserUsername\"><br>" +
    "<p class=\"inputdesc\">Password</p><input type=\"password\" class=\"input\" id=\"UserPassword\"><br>" +
    "<p class=\"inputdesc\">Disabilitato</p><input type=\"checkbox\" class=\"input\" id=\"UserDisabilitato\"><br>" +
    "<button class=\"submitsearch\" type=\"submit\" name=\"usersubmit\">Aggiungi Utente</button>";

var cercaUser = "<p class=\"inputdesc\">Id</p><input type=\"text\" class=\"input\" id=\"UserId\"><br>" +
    "<p class=\"inputdesc\">Nome</p><input type=\"text\" class=\"input\" id=\"UserNome\"><br>" +
    "<p class=\"inputdesc\">Cognome</p><input type=\"text\" class=\"input\" id=\"UserCognome\"><br>" +
    "<p class=\"inputdesc\">Telefono</p><input type=\"text\" class=\"input\" id=\"UserTelefono\"><br>" +
    "<p class=\"inputdesc\">Codice Fiscale</p><input type=\"text\" class=\"input\" id=\"UserCF\"><br>" +
    "<p class=\"inputdesc\">Data di Nascita</p><input type=\"date\" class=\"input\" id=\"UserData\"><br>" +
    "<p class=\"inputdesc\">E-Mail</p><input type=\"text\" class=\"input\" id=\"UserMail\"><br>" +
    "<p class=\"inputdesc\">Livello Utente</p><input type=\"text\" class=\"input\" id=\"UserLevel\"><br>" +
    "<p class=\"inputdesc\">CAP</p><input type=\"text\" class=\"input\" id=\"UserCap\"><br>" +
    "<p class=\"inputdesc\">Indirizzo</p><input type=\"text\" class=\"input\" id=\"UserIndirizzo\"><br>" +
    "<p class=\"inputdesc\">Località</p><input type=\"text\" class=\"input\" id=\"UserLocalita\"><br>" +
    "<p class=\"inputdesc\">Provincia</p><input type=\"text\" class=\"input\" id=\"UserProvincia\"><br>" +
    "<p class=\"inputdesc\">Tipo Documento</p><input type=\"text\" class=\"input\" id=\"UserDocumento\"><br>" +
    "<p class=\"inputdesc\">Numero Carta</p><input type=\"text\" class=\"input\" id=\"UserCarta\"><br>" +
    "<p class=\"inputdesc\">Username</p><input type=\"text\" class=\"input\" id=\"UserUsername\"><br>" +
    "<p class=\"inputdesc\">Password</p><input type=\"password\" class=\"input\" id=\"UserPassword\"><br>" +
    "<p class=\"inputdesc\">Disabilitato</p><input type=\"checkbox\" class=\"input\" id=\"UserDisabilitato\"><br>" +
    "<button class=\"submitsearch\" type=\"submit\" name=\"usersubmit\">Cerca Utente</button>";


//codici RUSU
  var libriprestiti = "<p>INSERISCI ALMENO UN VALORE</p></br><p class=\"inputdesc\">Id</p><input type=\"text\" class=\"input\" id=\"LibroId\"><br>" +
        "<p class=\"inputdesc\">ISBN</p><input type=\"text\" class=\"input\" id=\"LibroISBN\"><br>" +
        "<p class=\"inputdesc\">Codice</p><input type=\"text\" class=\"input\" id=\"LibroCodice\"><br>" +
        "<p class=\"inputdesc\">Titolo</p><input type=\"text\" class=\"input\" id=\"LibroTitolo\"><br>" +
        "<p style='display: none' class=\"inputdesc\">Autore</p><input style='display: none' type=\"text\" placeholder=\"Cognome Nome\" class=\"input\" id=\"LibroAutore\">" +
        "<p class=\"inputdesc\">Genere</p><input type=\"text\" class=\"input\" id=\"LibroGenere\"><br>" +
        "<p class=\"inputdesc\">Anno Pubblicazione da / a:</p><input type=\"date\" class=\"input\" id=\"LibroAnnoDa\">" +
        "<input type=\"date\" class=\"input\" id=\"LibroAnnoA\"><br>" +
        "<p class=\"inputdesc\">Casa Editrice</p><input type=\"text\" class=\"input\" id=\"LibroCasaEditrice\"><br>" +
        //"<input type=\"text\" class=\"input\" id=\"LibroArmadio\"><br>" +
        //"<input type=\"text\" style=\"display: none\" id=\"LibroAutoreHidden\">" +
        //"<input type=\"text\" style=\"display: none\" id=\"LibroGenereHidden\">" +
        //"<input type=\"text\" style=\"display: none\" id=\"LibroCasaEditriceHidden\">" +
        "<button id=\"Prestiti_libri_Button\" type=\"submit\" name=\"Prestiti_Libri_Button\">Ricerca</button>"+
        "<button id=\"Prestiti_Storico_libri_Button\" type=\"submit\" name=\"Prestiti_Storico_Libri_Button\">Ricerca Storico</button>";

        var utentiprestiti = "<p class=\"inputdesc\">Id</p><input type=\"text\" class=\"input\" id=\"UserId\"><br>" +
            "<p class=\"inputdesc\">Nome</p><input type=\"text\" class=\"input\" id=\"UserNome\"><br>" +
            "<p class=\"inputdesc\">Cognome</p><input type=\"text\" class=\"input\" id=\"UserCognome\"><br>" +
            "<p class=\"inputdesc\">Telefono</p><input type=\"text\" class=\"input\" id=\"UserTelefono\"><br>" +
            "<p class=\"inputdesc\">Codice Fiscale</p><input type=\"text\" class=\"input\" id=\"UserCF\"><br>" +
            "<p class=\"inputdesc\">E-Mail</p><input type=\"text\" class=\"input\" id=\"UserMail\"><br>" +
            "<button class=\"submitsearch\" type=\"submit\" name=\"Prestiti_Utenti_Button\">Ricerca Utente</button>";

      var prestitiattivi =  
      "<button class=\"submitsearch\" type=\"submit\" id=\"Prestiti_Attivi_Button\" name=\"Prestiti_Attivi_Button\">Prestiti Attivi</button>";


     var attivaprestito = "<p>CAMPI OBBLIGATORI</p></br>" +
    "<p class=\"inputdesc\">Id Libro</p><input type=\"text\" class=\"input\" id=\"LibroIdPrestito\">" +
    "<p class=\"inputdesc\">Id Persona</p><input type=\"text\" class=\"input\" id=\"PersonaIdPrestito\">  <br>" +
    "Data Inizio Prestito"+"<br>"+"<input type=\"date\" class=\"input\" id=\"DataInzioPrestito\"><br>"+
    "Data Fine Prestito"+"<br>"+"<input type=\"date\" class=\"input\" id=\"DataFinePrestito\"><br>"+
    "<button id=\"Attiva_Prestiti_Button\" type=\"submit\" class=\"submitsearch\" name=\Attiva_Prestiti_Button\">Attiva Prestito</button>"


     var chiudiprestito = "<p>CAMPI OBBLIGATORI</p></br>" +
         "<p class=\"inputdesc\">Id Libro</p><input type=\"text\" class=\"input\" id=\"CHIUSURA_LibroIdPrestito\">" +
         "<p class=\"inputdesc\">Id Persona</p><input type=\"text\" class=\"input\" id=\"CHIUSURA_PersonaIdPrestito\">  <br>" +
         "Data Inizio Prestito"+"<br>"+"<input type=\"date\" class=\"input\" id=\"CHIUSURA_DataInzioPrestito\"><br>"+
         "Data Fine Prestito"+"<br>"+"<input type=\"date\" class=\"input\" id=\"CHIUSURA_DataFinePrestito\"><br>"+
         "<button id=\"Chiusura_Prestiti_Button\" type=\"submit\" class=\"submitsearch\" name=\Chiudi_Prestiti_Button\">Chiudi Prestito</button>"