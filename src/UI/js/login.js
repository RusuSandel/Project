$(document).ready(
    function(){
        $("#ricercamenu").show();
        $("main").html("<div id=\"content\"></div>");
        $("#btn_logout").hide();
        var utente;
        var logged = false;
        console.log(localStorage);
        if (localStorage.getItem("token") !== null) {
            $("#utenza").val("Benvenuto, " + localStorage.getItem('username'));
            $("#username").html(" ");
            $("#password").html(" ");
            logged = true;
            $.ajax(
                {
                    type:"GET",
                    url:"../WebApi/OAuth2/Resource.php",
                    data: {token: localStorage.getItem("token")},
                    dataType: "json",
                    success: function(user){
                        utente = user;
                        switch (utente.LivelloUtente) {
                            case "0":
                                $("#ricercamenu").show();
                                $("#editmenu").show();
                                break;

                            case "1":
                                $("#ricercamenu").show();
                                $("#editmenu").hide();
                                break;

                            default:
                                break;
                        }
                    }
                }
            );
            console.log(localStorage.getItem("token"));
        }


        $("#accedi").click(
            function(){
                if (logged == false) {
                    logged = true;
                    var user = $("#username").val();
                    var pass = $("#password").val();

                    $.ajax({
                        type:"POST",
                        url:"../WebApi/OAuth2/Token.php",
                        data: {"grant_type":"client_credentials","client_id":user,"client_secret":pass},
                        dataType: "json",
                        success: function(ris) {
                            var token = ris.access_token;
                            console.log(token);
                            localStorage.setItem('token', token);
                            localStorage.setItem('username', $("#username").val());
                            console.log(localStorage);
                            $("#username").hide();
                            $("#password").hide();
                            $("#accedi").hide();
                            $(".button_login").hide();
                            $("#btn_logout").show();
                            $("#Tendina").html("<ul><input type=\"text\" id=\"utenza\" disabled=\"disabled\" value=\"Accesso come: OSPITE \"></ul>");
                            $("main").html("<div id=\"content\"></div>");
                            $.ajax(
                                {
                                    type:"GET",
                                    url:"../WebApi/OAuth2/Resource.php",
                                    data: {token: token},
                                    dataType: "json",
                                    success: function(user){
                                        utente = user;
                                        $("#utenza").val("Benvenuto, " + localStorage.getItem('username'));
                                        switch (utente.LivelloUtente) {
                                            case "0":
                                                $("#ricercamenu").show();
                                                $("#editmenu").show();
                                                break;

                                            case "1":
                                                $("#ricercamenu").show();
                                                $("#editmenu").hide();
                                                break;

                                            default:
                                                break;
                                        }
                                    }
                                }
                            );
                        },
                        error: function(ris){
                            var error = ris.responseJSON.error_description;
                            console.log(error);
                        }
                    });
                }
                else {
                    utente = null;
                    $("#ricercamenu").show();
                    $("#editmenu").hide();
                    $("main").html("<div id=\"content\"></div>");
                    logged = false;
                    localStorage.clear();
                    $("#usernametext").html("");
                    $("#username").html("<input type=\"text\" id=\"username\" placeholder=\"username\"></input>");
                    $("#password").html("<input type=\"password\" id=\"password\" placeholder=\"password\"></input>");
                }
            }
        );
        $("#btn_logout").click(
            function () {
                logged=false;
                utente=null;
                localStorage.clear();
                window.open("../UI/index.html","_self");
            }
        );
    }
);
