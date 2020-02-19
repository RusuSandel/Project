function Show_Tendina() {
    document.getElementById("Tendina").classList.toggle("show");
}


    $(document).ready(

  function(){

    $(".websearch").click(
      function(){
        var isbn = $("#LibroISBN").val();
        $.ajax({
          type: "POST",
          url: "../WebAPI/isbnGoogleAPI.php",
          data: JSON.stringify(isbn),
          dataType: "text",
          contentType: "application/json",
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
