$(document).ready(function(){
	sendData();
});

function sendData(){
	alert("Entrando");
	$('#addForm').submit(function(e) {
		e.preventDefault();
	}).validate({
		debug: false,
		rules: {
			"txtNombre": {
				required: true
			},
			"txtApellido": {
				required: true
			},
			"txtPass": {
				required: true
			},
			"txtRut": {
				required: true
			},
			"txtFono": {
				required: true
			},
			"txtMail": {
				required: true
			}
		},
		messages: {
			"txtNombre": {
				required: "*"
			},
			"txtApellido": {
				required: "*"
			},
			"txtPass": {
				required: "*"
			},
			"txtRut": {
				required: "*"
			},
			"txtFono": {
				required: "*"
			},
			"txtMail": {
				required: "*"
			}
		},
		submitHandler: function(form) {
			if($('#txtPass').val()===$('#txtRpass').val()){
				dataString = "nombre="+$('#txtNombre').val()+"&apellido="+$('#txtApellido').val()+"&pass="+$('#txtPass').val()+"&rut="+$('#txtRut').val()+"&fono="+$('#txtFono').val()+"&mail="+$('#txtMail').val()+"&user="+$('#txtRut').val();
				alert("Enviando");
				$.ajax({
					url: "http://ws.masmargen.cl/agregar_usuario.php",
					data: dataString,
					type: "post",
					success: function(data){
			          //alert(data);
			          data = jQuery.parseJSON(data);
			          if(data == "3"){
			          	alert("creado");
			          	window.plugins.toast.showShortCenter('Usuario Agregado', function(a){console.log('toast success: ' + a)});
			          	setTimeout(function(){
			          		window.location.replace("medio.html");
			          	}, 2000);
			          }else if (data == "1"){
			          	alert("1");
			          	window.plugins.toast.showShortCenter('Usted no es miembro', function(a){console.log('toast error: ' + a)});
			          }else if (data == "2"){
			          	alert("2");
			          	window.plugins.toast.showShortCenter('Ya posee una cuenta', function(a){console.log('toast error: ' + a)});
			          }else{
			          	alert("nada");
			          	window.plugins.toast.showShortCenter('Problemas al agregar usuario', function(a){console.log('toast error: ' + a)});
			          }
			      },
			      error: function(data){
			      	alert("error");
			      	toastr.error(data);
			      }
			  });
			}else{
				alert("nada");
				window.plugins.toast.showShortCenter('Las contraseñas deben coincidir', function(a){console.log('toast error: ' + a)});
			}	
		}
	});
}
