<?php
//Se hace el inicio de la sesion
session_start();
$conn = mysql_connect("localhost","casahunt_mobile","casa1305") or die ("No se pudo conectar a la BD");
mysql_select_db("casahunt_casahunterhybrid");
mysql_query("SET NAMES 'utf8';",$conn);
$user = $_POST['nickname']; //Se recibe el campo user del formulario login en index.php
$pass = $_POST['clave']; //Se recibe el campo pass del formulario login en index.php
$clave_encriptada = hash_hmac("gost-crypto",$pass,"casa1305"); //Se realiza la encriptacion con gost-crypto con la clave compartida "tniopyekamor"
$sql = "select * from login, usuario, activo_usuario where login.user = usuario.login_user and
        usuario.rut = activo_usuario.rut and activo_usuario.activo_cuenta = 1 and
        login.user = '$user' and login.pass = '$clave_encriptada'"; //Modificar la query de la tabla de usuarios
$result = mysql_query($sql,$conn); //Se ejecuta la query, el resultado en bruto esta en $result
$count = mysql_num_rows($result); //Se cuentan el numero de filas de la query, se almacena en $count como variable numerica
if ($count == 1) { //Como el usuario es único, deberia solamente retornar 1 fila, esta es la condición, que verifica si hay usuario
  $sql = "select usuario.rut as rut, usuario.nombre as nombre, usuario.apellido as apellido from usuario where login_user = '$user'";
  $result = mysql_query($sql,$conn);
  if(mysql_num_rows($result)==1){
      while($row = mysql_fetch_array($result)){
        $_SESSION["id"] = session_id();
        $_SESSION["user"] = $user;
        $_SESSION["rut"] = $row["rut"];
        $_SESSION["nombre"] = $row["nombre"];
        $_SESSION["apellido"] = $row["apellido"];
      }
      $data[] = [
        'status' => 'ok',
        'message' => 'Bienvenido '.$_SESSION["nombre"].' '.$_SESSION["apellido"]
      ];
  }else{//Aqui son los procesos si no hay datos o hay replicados
    //echo 'No hay datos para las sesiones';
    $data[] = [
      'status' => 'fail',
      'message' => 'Hubo problemas, pongase en contacto con el Administrador'
    ];
  }
} else { //Aqui son los procesos si la autenticación esta mala
    //echo'Usuario Incorrecto';
    $data[] = [
      'status' => 'fail',
      'message' => 'Usuario o Contraseña invalidos '
    ];
}
header("Content_Type: application/json");
echo json_encode($data);
?>
