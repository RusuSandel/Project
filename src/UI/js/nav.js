//test 20/02/20
$(document).ready(

  function() {
    $(".navlinks").click(
      function() {
        var cliccato = $(this).attr('pagina');
        $(".selected").attr("class", "");
        $(this).parent().attr("class", "selected");
        switch (cliccato) {

//CODICI VECCHIO PROGETTO
          case "Autori":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(cercaAutori);
            $("#autorisubmit").click(
              function() {
                var autore = {};
                autore.Id = $("#AutoreId").val();
                autore.Nome = $("#AutoreNome").val();
                autore.Cognome = $("#AutoreCognome").val();
                autore.NascitaDa = $("#AutoreNascitaDa").val();
                autore.NascitaA = $("#AutoreNascitaA").val();
                autore.MorteDa = $("#AutoreMorteDa").val();
                autore.MorteA = $("#AutoreMorteA").val();
                if ($("#AutoreNascitaDa").val() == "") {
                  autore.NascitaDa = "0001-01-01"
                }
                if ($("#AutoreNascitaA").val() == "") {
                  autore.NascitaA = "9999-01-01"
                }
                if ($("#AutoreMorteDa").val() == "") {
                  autore.MorteDa = "0001-01-01"
                }
                if ($("#AutoreMorteA").val() == "") {
                  autore.MorteA = "9999-01-01"
                }
                console.log(JSON.stringify(autore));
                $.ajax({
                  type: "GET",
                  url: "../WebAPI/Autori/controller.php",
                  dataType: "json",
                  data: {
                    id: autore.Id,
                    nome: autore.Nome,
                    cognome: autore.Cognome,
                    dataNDA: autore.NascitaDa,
                    dataNA: autore.NascitaA,
                    dataMDA: autore.MorteDa,
                    dataMA: autore.MorteA
                  },
                  success: function(data) {
                    console.log(data);
                    $("main").html("<table></table>");
                    $.each(data, function(index, element) {
                      $("table").append("<tr id=\"" + element.Id + "\">" + "<td>" + element.Id + "</td>" + "<td>" + element.Nome + "</td>" + "<td>" + element.Cognome + "</td>" + "<td>" + element.DataNascita + "</td>" + "<td>" + element.DataMorte + "</td>" + "<td>" + "<i class=\"fas fa-hand-holding prestito\" numero=\"" + element.Id + "\"></i>" + "<td>" + "<i class=\"fas fa-edit modifica\" numero=\"" + element.Id + "\"></i>" + "<td>" + "<i class=\"fas fa-times elimina\" numero=\"" + element.Id + "\"></i>" + "</tr>");
                    });
                    $(".modifica").click(
                      function() {
                        console.log("modifica: " + $(this).attr('numero'));
                        var idmod = $(this).attr('numero');
                        $("main").html("<div id=\"content\"></div>");
                        $("#content").append(editAutori);
                        $("button").html("Modifica Autore ID: " + idmod);
                        var autore = {};
                        autore.Id = idmod;
                        autore.Nome = "";
                        autore.Cognome = "";
                        autore.NascitaDa = "";
                        autore.NascitaA = "";
                        autore.MorteDa = "";
                        autore.MorteA = "";
                        console.log(JSON.stringify(autore));
                        $.ajax({
                          type: "GET",
                          url: "../WebAPI/Autori/controller.php",
                          dataType: "json",
                          data: {
                            id: autore.Id,
                            nome: autore.Nome,
                            cognome: autore.Cognome,
                            dataNDA: autore.NascitaDa,
                            dataNA: autore.NascitaA,
                            dataMDA: autore.MorteDa,
                            dataMA: autore.MorteA
                          },
                          success: function(data) {
                            console.log(data);
                            $("#AutoreNome").val(data[0].Nome);
                            $("#AutoreCognome").val(data[0].Cognome);
                            $("#AutoreNascita").val(data[0].DataNascita.split(" ")[0]);
                            $("#AutoreMorte").val(data[0].DataMorte.split(" ")[0]);
                          },
                          error: function(xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(thrownError);
                          }
                        });
                        $(".submitsearch").click(
                          function() {
                            var autore = {};
                            autore.Id = idmod;
                            autore.Nome = $("#AutoreNome").val();
                            autore.Cognome = $("#AutoreCognome").val();
                            autore.DataDiNascita = $("#AutoreNascita").val();
                            autore.DataDiMorte = $("#AutoreNascita").val();
                            console.log(JSON.stringify(autore));
                            var token=localStorage.getItem("token");
                            $.ajax({
                              type: "POST",
                              url: "../WebAPI/Autori/controller.php",
                              data: JSON.stringify(autore),
                              dataType: "text",
                              contentType: "application/json",
                                headers: { 'Authorization': `Bearer ${token}` },
                              success: function(data) {
                                  alert("Autore inserito correttamente");//alert per validare l'operazione
                                console.log(data);
                              },
                              error: function(xhr, ajaxOptions, thrownError) {
                                console.log(xhr.status);
                                console.log(thrownError);
                              }
                            });
                          }
                        );
                      }
                    );
                    $(".elimina").click(
                      function() {
                        $(this).parent().parent().remove();
                        console.log($(this).attr('numero'));
                        var token = localStorage.getItem("token");
                        $.ajax({
                          type: "DELETE",
                          headers: { 'Authorization': `Bearer ${token}` },
                          url: "../WebAPI/Autori/controller.php?id=" + $(this).attr('numero'),
                          success: function() {
                              alert()
                            console.log("eliminato");
                          }
                        });
                      }
                    );
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
                });
              }
            );
            break;
          case "Generi":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(cercaGeneri);
            $("#generisubmit").click(
              function() {
                console.log("ok");
                var genere = {};
                genere.Id = $("#GenereId").val();
                $.ajax({
                  type: "GET",
                  url: "../WebAPI/Generi/controller.php",
                  dataType: "json",
                  data: {
                    id: genere.Id
                  },
                  success: function(data) {
                    $("main").html("<table></table>");
                    $.each(data, function(index, element) {
                      $("table").append("<tr>" + "<td>" + element.Id + "</td>" + "<td>" + "<i class=\"fas fa-times elimina\" numero=\"" + element.Id + "\"></i>" + "</tr>");
                    });
                    $(".elimina").click(
                      function() {
                        $(this).parent().parent().remove();
                        console.log($(this).attr('numero'));
                        var token= localStorage.getItem("token");
                        $.ajax({
                          type: "DELETE",
                          headers: { 'Authorization': `Bearer ${token}` },
                          url: "../WebAPI/Generi/controller.php?id=" + $(this).attr('numero'),
                          success: function() {
                            console.log("eliminato");
                          }
                        });
                      }
                    );
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
                });

              }
            );
            break;
          case "Libri":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(cercaLibri);
            //TODO case GETLIBRI
            break;
          case "Case Editrici":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(cercaCase);
            $("#casesubmit").click(
              function() {
                var casa = {};
                casa.Id = $("#CasaId").val();
                casa.Nome = $("#CasaNome").val();
                casa.Luogo = $("#CasaLuogo").val();
                console.log(JSON.stringify(casa));
                $.ajax({
                  type: "GET",
                  url: "../WebAPI/CaseEditrici/controller.php",
                  dataType: "text",
                  data: {
                    id: JSON.stringify(casa.Id),
                    nome: JSON.stringify(casa.Nome),
                    luogoSede: JSON.stringify(casa.Luogo)
                  },
                  success: function(data) {
                    console.log(data);
                    $("main").html("<table class=\"casetable\"></table>");
                    $.each(data, function(index, element) {
                      $("table").append("<tr>" + "<td>" + element.Id + "</td>" + "<td>" + element.Nome + "</td>" + "<td>" + element.LuogoSede + "</td>" + "<td>" + "<i class=\"fas fa-edit modifica\" numero=\"" + element.Id + "\"></i>" + "<td>" + "<i class=\"fas fa-times elimina\" numero=\"" + element.Id + "\"></i>" + "</tr>");
                    });
                    $(".modifica").click(
                      function() {
                        console.log("modifica: " + $(this).attr('numero'));
                        var idmod = $(this).attr('numero');
                        $("main").html("<div id=\"content\"></div>");
                        $("#content").append(editCase);
                        $("button").html("Modifica Casa ID: " + idmod);
                        var casa = {};
                        casa.Id = idmod;
                        casa.Nome = "";
                        casa.Luogo = "";
                        console.log(JSON.stringify(casa));
                        $.ajax({
                          type: "GET",
                          url: "../WebAPI/CaseEditrici/controller.php",
                          dataType: "json",
                          data: {
                            casaEditrice: JSON.stringify(casa)
                          },
                          success: function(data) {
                            console.log(data);
                            $("#CasaNome").val(data[0].Nome);
                            $("#CasaLuogo").val(data[0].LuogoSede);
                          },
                          error: function(xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(thrownError);
                          }
                        });
                        $(".submitsearch").click(
                          function() {
                            var casa = {};
                            casa.Id = idmod;
                            casa.Nome = $("#CasaNome").val();
                            casa.Luogo = $("#CasaLuogo").val();
                            console.log(JSON.stringify(casa));
                            var token = localStorage.getItem("token");
                            $.ajax({
                              type: "POST",
                              url: "../WebAPI/CaseEditrici/controller.php",
                              data: JSON.stringify(casa),
                              dataType: "text",
                              contentType: "application/json",
                              headers: { 'Authorization': `Bearer ${token}` },
                              success: function(data) {
                                  alert("operazione completata");
                                console.log(data);
                              },
                              error: function(xhr, ajaxOptions, thrownError) {
                                console.log(xhr.status);
                                console.log(thrownError);
                              }
                            });
                          }
                        );
                      }
                    );
                    $(".elimina").click(
                      function() {
                        $(this).parent().parent().remove();
                        console.log($(this).attr('numero'));
                        var token = localStorage.getItem("token");
                        $.ajax({
                          type: "DELETE",
                          headers: { 'Authorization': `Bearer ${token}` },
                          url: "../WebAPI/CaseEditrici/controller.php?id=" + $(this).attr('numero'),
                          success: function() {
                              alert("operazione completata")
                              console.log("eliminato");
                          }
                        });
                      }
                    );
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
                });
              }
            );
            break;
          default:

        }
      }
    );

    $(".navlinke").click(
      function() {
        var cliccato = $(this).attr('pagina');
        $(".selected").attr("class", "");
        $(this).parent().attr("class", "selected");
        switch (cliccato) {
          case "Autori":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(editAutori);
            $(".submitsearch").click(
              function() {
                var autore = {};
                autore.Id = "";
                autore.Nome = $("#AutoreNome").val();
                autore.Cognome = $("#AutoreCognome").val();
                autore.DataDiNascita = $("#AutoreNascita").val();
                autore.DataDiMorte = $("#AutoreNascita").val();
                console.log(JSON.stringify(autore));
                var token = localStorage.getItem("token");
                $.ajax({
                  type: "PUT",
                  url: "../WebAPI/Autori/controller.php",
                  data: JSON.stringify(autore),
                  dataType: "text",
                  contentType: "application/json",
                  headers: { 'Authorization': `Bearer ${token}` },
                  success: function(data) {
                      alert("Operazione Completata");
                    console.log(data);
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
                });
              }
            );
            break;
          case "Generi":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(editGeneri);
            $(".submitsearch").click(
              function() {
                var genere = {};
                genere.Id = $("#GenereId").val();
                console.log(JSON.stringify(genere));
                var token = localStorage.getItem("Token");
                $.ajax({
                  type: "PUT",
                  url: "../WebAPI/Generi/controller.php",
                  data: JSON.stringify(genere),
                  dataType: "text",
                  contentType: "application/json",
                  headers: { 'Authorization': `Bearer ${token}` },
                  success: function(data) {
                    console.log(data);
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
                });
              }
            );
            break;
            //BELLETZ NOW
          case "PrestitiLibri" :
                $("main").html("<div id=\"content\"></div>");
                $("#content").append(libriprestiti);
                $("#Prestiti_libri_Button").click(
                    function () {
                        var libro = {};
                        libro.Id = $("#LibroId").val();
                        libro.ISBN = $("#LibroISBN").val();
                        libro.Codice = $("#LibroCodice").val();
                        libro.Titolo = $("#LibroTitolo").val();
                        libro.CognomeAutore= $("#LibroAutore").val().split(" ")[0];
                        libro.NomeAutore= $("#LibroAutore").val().split(" ");
                        libro.IdGenere = $("#LibroGenere").val();
                        libro.AnnoDa = $("#LibroAnnoDa").val();
                        libro.AnnoA = $("#LibroAnnoA").val();
                        console.log(JSON.stringify(libro));
                        $.ajax({
                            type: "GET",
                            url: "../WebAPI/Prestiti/ricercaPrestiti.php",
                            data:{id:libro.Id,ISBN:libro.ISBN,Codice:libro.Codice,Titolo:libro.Titolo,CognomeAutore:libro.CognomeAutore,
                                  NomeAutore:libro.NomeAutore,IdGenere:libro.IdGenere,AnnoDa:libro.AnnoDa,AnnoA:libro.AnnoA},
                            dataType: "json",
                            success: function(data) {
                                console.log(data);
                                $("main").html("<table></table>");
                                $.each(data, function(index, element) {
                                    $("table").append("<tr><td>Titolo: "+ element.Titolo + "</td><td>ISBN: " + element.ISBN+ "</td><td>Autore: " + element.Cognome+' '+element.Nome+ "</td><td>STATO: " + element.Stato + "</td><td>Data Fine Prestito: " + element.DataFinePrestitoPrevista + "</td></tr>");
                                });
                                alert("Operazione Completata");
                            },
                            error: function(xhr, ajaxOptions, thrownError) {
                                console.log(xhr.status);
                                console.log(thrownError);
                            }
                        });
                    }
                );
                $("#Prestiti_Storico_libri_Button").click(
                    function () {

                    }
                );
                break;

          case "PrestitiUtenti" :
                    $("main").html("<div id=\"content\"></div>");
                    $("#content").append(utentiprestiti);
                    $("#Prestiti_Utenti_Button").click(
                        function () {

                        }
                    );
                    break;

          case "PrestitiAttivi" :
                    $("main").html("<div id=\"content\"></div>");
                    $("#content").append(prestitiattivi);
                    $("#Prestiti_Attivi_Button").click(
                        function () {
                            $.ajax({
                                type: "GET",
                                url:"../WebAPI/Prestiti/controller.php",
                                dataType:"json",
                                success:function (data) {
                                    console.log(data);
                                    $("main").html("<table></table>");
                                    $.each(data, function(index, element) {
                                        $("table").append("<tr> <td>IdUtente: "+ element.IdUtente + "</td><td>IdLibro: " + element.IdLibro + "</td><td>DataInizio: " + element.DataInizioPrestito + "</td><td>DataFine: " + element.DataFinePrestito + "</td></tr>");
                                    });
                                },

                            }
                            );
                        }
                    );
                              break;

            case "AttivaPrestito" :
                $("main").html("<div id=\"content\"></div>");
                $("#content").append(attivaprestito);

                break;


            case "Libri":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(editLibriDebug);
            $("#LibroAutore").keyup(
              function() {
                var val = $("#LibroAutore").val();
                console.clear();
                $.ajax({
                  type: "GET",
                  url: "../WebAPI/Autori/autocomplete.php?text=" + encodeURI(val),
                  dataType: "json",
                  success: function(data) {
                    var opzioni = new Array();
                    for (var i in data) {
                      var opzione = {};
                      opzione.label = data[i].text;
                      opzione.value = data[i].value;
                      opzioni.push(opzione);
                    }
                    $('#LibroAutore').autocomplete({
                      source: opzioni,
                      select: function(event, ui) {
                        $("#LibroAutore").val(ui.item.label);
                        $("#LibroAutoreHidden").val(ui.item.value);
                        return false;
                      },
                      focus: function(event, ui) {
                        event.preventDefault();
                        $("#LibroAutore").val(ui.item.label);
                        $("#LibroAutoreHidden").val(ui.item.value);
                      }
                    });

                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR + " " + textStatus + " " + errorThrown);
                  }
                });
              }
            );

            $("#LibroAutore").focusout(
              function() {
                console.log("aaa");
                var autore = {};
                autore.Id = "a";
                autore.Nome = $("#LibroAutore").val().split(" ")[1];
                autore.Cognome = $("#LibroAutore").val().split(" ")[0];
                autore.NascitaDa = "0001-01-01";
                autore.NascitaA = "9999-01-01";
                autore.MorteDa = "0001-01-01";
                autore.MorteA = "9999-01-01";
                console.log(JSON.stringify(autore));
                $.ajax({
                  type: "GET",
                  url: "../WebAPI/Autori/controller.php",
                  dataType: "json",
                  data: {
                    id: autore.Id,
                    nome: autore.Nome,
                    cognome: autore.Cognome,
                    dataNDA: autore.NascitaDa,
                    dataNA: autore.NascitaA,
                    dataMDA: autore.MorteDa,
                    dataMA: autore.MorteA
                  },
                  success: function(data) {
                    console.log(data);
                    if (data.length < 1) {
                      $("#LibroAutore").val("");
                      $("#LibroAutoreHidden").val("");
                    }
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
                });
              }
            );

            $(".websearch").click(
              function(){
                var isbn = $("#LibroISBN").val();
                $.ajax({
                  type: "GET",
                  url: "../WebAPI/isbnGoogleAPI.php",
                  data: {isbn: isbn},
                  dataType: "json",
                  contentType: "text",
                  success: function(data) {
                    console.log(data);
                    $("#LibroTitolo").val(data.title);
                    $("#LibroAutore").val(data.authors[0]);
                    $("#LibroGenere").val(data.categories[0]);
                    $("#LibroAnno").val(data.publishedDate + "-01-01");
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
                });
              }
            );

            $("#LibroCasaEditrice").keyup(
              function() {
                var val = $("#LibroCasaEditrice").val();
                console.clear();
                $.ajax({
                  type: "GET",
                  url: "../WebAPI/CaseEditrici/autocomplete.php/?text=" + encodeURI(val),
                  dataType: "json",
                  success: function(data) {
                    var opzioni = new Array();
                    for (var i in data) {
                      var opzione = {};
                      opzione.label = data[i].text;
                      opzione.value = data[i].value;
                      opzioni.push(opzione);
                    }
                    $('#LibroCasaEditrice').autocomplete({
                      source: opzioni,
                      select: function(event, ui) {
                        $("#LibroCasaEditrice").val(ui.item.label);
                        $("#LibroCasaEditriceHidden").val(ui.item.value);
                        return false;
                      },
                      focus: function(event, ui) {
                        event.preventDefault();
                        $("#LibroCasaEditrice").val(ui.item.label);
                        $("#LibroCasaEditriceHidden").val(ui.item.value);
                      }
                    });

                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR + " " + textStatus + " " + errorThrown);
                  }
                });
              }
            );

            break;
          case "Case Editrici":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(editCase);
            $(".submitsearch").click(
              function() {
                var casa = {};
                casa.Id = "";
                casa.Nome = $("#CasaNome").val();
                casa.Luogo = $("#CasaLuogo").val();
                console.log(JSON.stringify(casa));
                var token = localStorage.getItem("token");
                $.ajax({
                  type: "PUT",
                  url: "../WebAPI/CaseEditrici/controller.php",
                  data: JSON.stringify(casa),
                  dataType: "text",
                  contentType: "application/json",
                  headers: { 'Authorization': `Bearer ${token}` },
                  success: function(data) {
                    console.log(data);
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
                });
              }
            );
            break;
            case "User":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(cercaUser);
            break;
            case "AddUser":
            $("main").html("<div id=\"content\"></div>");
            $("#content").append(editUser);
            $(".submitsearch").click(
              function() {
                var user = {};
                user.Id = "";
                user.Nome = $("#UserNome").val();
                user.Cognome = $("#UserCognome").val();
                user.Telefono = $("#UserTelefono").val();
                user.Mail = $("#UserMail").val();
                user.DataDiNascita = $("#UserData").val();
                user.Documento = $("#UserDocumento").val();
                user.NumeroDocumento = $("#UserCarta").val();
                user.CodiceFiscale = $("#UserCF").val();
                user.Indirizzo = $("#UserIndirizzo").val();
                user.Localita = $("#UserLocalita").val();
                user.Indirizzo = $("#UserIndirizzo").val();
                user.Provincia = $("#UserProvincia").val();
                user.CAP = $("#UserCap").val();
                user.LivelloUtente = $("#UserLevel").val();
                user.Username = $("#UserUsername").val();
                user.Password = $("#UserPassword").val();
                console.log(JSON.stringify(user));
                var token = localStorage.getItem("token");
                $.ajax({
                  type: "PUT",
                  url: "../WebAPI/Utenti/controller.php",
                  data: JSON.stringify(user),
                  dataType: "text",
                  contentType: "application/json",
                  headers: { 'Authorization': `Bearer ${token}` },
                  success: function(data) {
                    console.log(data);
                  },
                  error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
                });
              }
            );
            break;
            case "Autori":
                $("main").html("<div id=\"content\"></div>");
                $("#content").append(cercaAutori);
                $("#autorisubmit").click(
                    function() {
                        var autore = {};
                        autore.Id = $("#AutoreId").val();
                        autore.Nome = $("#AutoreNome").val();
                        autore.Cognome = $("#AutoreCognome").val();
                        autore.NascitaDa = $("#AutoreNascitaDa").val();
                        autore.NascitaA = $("#AutoreNascitaA").val();
                        autore.MorteDa = $("#AutoreMorteDa").val();
                        autore.MorteA = $("#AutoreMorteA").val();
                        if ($("#AutoreNascitaDa").val() == "") {
                            autore.NascitaDa = "0001-01-01"
                        }
                        if ($("#AutoreNascitaA").val() == "") {
                            autore.NascitaA = "9999-01-01"
                        }
                        if ($("#AutoreMorteDa").val() == "") {
                            autore.MorteDa = "0001-01-01"
                        }
                        if ($("#AutoreMorteA").val() == "") {
                            autore.MorteA = "9999-01-01"
                        }
                        console.log(JSON.stringify(autore));
                        $.ajax({
                            type: "GET",
                            url: "../WebAPI/Autori/controller.php",
                            dataType: "json",
                            data: {
                                id: autore.Id,
                                nome: autore.Nome,
                                cognome: autore.Cognome,
                                dataNDA: autore.NascitaDa,
                                dataNA: autore.NascitaA,
                                dataMDA: autore.MorteDa,
                                dataMA: autore.MorteA
                            },
                            success: function(data) {
                                console.log(data);
                                $("main").html("<table></table>");
                                $.each(data, function(index, element) {
                                    $("table").append("<tr id=\"" + element.Id + "\">" + "<td>" + element.Id + "</td>" + "<td>" + element.Nome + "</td>" + "<td>" + element.Cognome + "</td>" + "<td>" + element.DataNascita + "</td>" + "<td>" + element.DataMorte + "</td>" + "<td>" + "<i class=\"fas fa-hand-holding prestito\" numero=\"" + element.Id + "\"></i>" + "<td>" + "<i class=\"fas fa-edit modifica\" numero=\"" + element.Id + "\"></i>" + "<td>" + "<i class=\"fas fa-times elimina\" numero=\"" + element.Id + "\"></i>" + "</tr>");
                                });
                                $(".modifica").click(
                                    function() {
                                        console.log("modifica: " + $(this).attr('numero'));
                                        var idmod = $(this).attr('numero');
                                        $("main").html("<div id=\"content\"></div>");
                                        $("#content").append(editAutori);
                                        $("button").html("Modifica Autore ID: " + idmod);
                                        var autore = {};
                                        autore.Id = idmod;
                                        autore.Nome = "";
                                        autore.Cognome = "";
                                        autore.NascitaDa = "";
                                        autore.NascitaA = "";
                                        autore.MorteDa = "";
                                        autore.MorteA = "";
                                        console.log(JSON.stringify(autore));
                                        $.ajax({
                                            type: "GET",
                                            url: "../WebAPI/Autori/controller.php",
                                            dataType: "json",
                                            data: {
                                                id: autore.Id,
                                                nome: autore.Nome,
                                                cognome: autore.Cognome,
                                                dataNDA: autore.NascitaDa,
                                                dataNA: autore.NascitaA,
                                                dataMDA: autore.MorteDa,
                                                dataMA: autore.MorteA
                                            },
                                            success: function(data) {
                                                console.log(data);
                                                $("#AutoreNome").val(data[0].Nome);
                                                $("#AutoreCognome").val(data[0].Cognome);
                                                $("#AutoreNascita").val(data[0].DataNascita.split(" ")[0]);
                                                $("#AutoreMorte").val(data[0].DataMorte.split(" ")[0]);
                                            },
                                            error: function(xhr, ajaxOptions, thrownError) {
                                                console.log(xhr.status);
                                                console.log(thrownError);
                                            }
                                        });
                                        $(".submitsearch").click(
                                            function() {
                                                var autore = {};
                                                autore.Id = idmod;
                                                autore.Nome = $("#AutoreNome").val();
                                                autore.Cognome = $("#AutoreCognome").val();
                                                autore.DataDiNascita = $("#AutoreNascita").val();
                                                autore.DataDiMorte = $("#AutoreNascita").val();
                                                console.log(JSON.stringify(autore));
                                                var token = localStorage.getItem("token");
                                                $.ajax({
                                                    type: "POST",
                                                    url: "../WebAPI/Autori/controller.php",
                                                    data: JSON.stringify(autore),
                                                    dataType: "text",
                                                    contentType: "application/json",
                                                    headers: { 'Authorization': `Bearer ${token}` },
                                                    success: function(data) {
                                                        console.log(data);
                                                    },
                                                    error: function(xhr, ajaxOptions, thrownError) {
                                                        console.log(xhr.status);
                                                        console.log(thrownError);
                                                    }
                                                });
                                            }
                                        );
                                    }
                                );
                                $(".elimina").click(
                                    function() {
                                        $(this).parent().parent().remove();
                                        console.log($(this).attr('numero'));
                                        var token = localStorage.getItem("token");
                                        $.ajax({
                                            type: "DELETE",
                                            headers: { 'Authorization': `Bearer ${token}` },
                                            url: "../WebAPI/Autori/controller.php?id=" + $(this).attr('numero'),
                                            success: function() {
                                                console.log("eliminato");
                                            }
                                        });
                                    }
                                );
                            },
                            error: function(xhr, ajaxOptions, thrownError) {
                                console.log(xhr.status);
                                console.log(thrownError);
                            }
                        });
                    }
                );

            default:

        }
      }
    );

  }
);
