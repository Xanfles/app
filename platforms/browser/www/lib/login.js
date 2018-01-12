$(document).ready(function(){
  sendData();
});

function sendData(){
  $('#loginform').submit(function(e) {
    e.preventDefault();
  }).validate({
    debug: false,
    rules: {
      "txtUsuario": {
        required: true
      },
      "txtClave": {
        required: true
      }
    },
    messages: {
      "txtUsuario": {
        required: "*"
      },
      "txtClave": {
        required: "*"
      }
    },
    submitHandler: function(form) {
      dataString = "user="+$('#txtUsuario').val()+"&pass="+$('#txtClave').val();
      //alert(dataString);
      $.ajax({
        url: "http://ws.masmargen.cl/login.php",
        data: dataString,
        type: "post",
        success: function(data){
          //alert(data);
          data = jQuery.parseJSON(data);
          if(data == '1'){
            window.plugins.toast.showShortTop('Bienvenido Doctor', function(a){console.log('toast success: ' + a)});
            setTimeout(function(){
              window.location.replace("main.html");
            }, 1000);
          }else if (data == ''){
            alert("Usuario o contraseña invalidos");
            toastr.error(data[0].message);
          }
        },
        error: function(data){
          toastr.error(data);
        }
      });
    }
    });
}

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
