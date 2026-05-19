<?php

// =========================
// DATOS DE CONEXIÓN
// =========================
$host = "PMYSQL201.dns-servicio.com:3306";

$dbname = "11370167_mf0952";

$user = "alumno";

$pass = "Qsp317^o1";

$mensaje = "";


// =========================
// CONEXIÓN PDO
// =========================
try {

    $conexion = new PDO(

        "mysql:host=$host;dbname=$dbname;charset=utf8",

        $user,

        $pass

    );

    // Mostrar errores SQL
    $conexion->setAttribute(

        PDO::ATTR_ERRMODE,

        PDO::ERRMODE_EXCEPTION

    );

    // Mensaje opcional
    $mensaje = "Conexión realizada correctamente.";

} catch (PDOException $error) {

    die(

        "Error de conexión: " . $error->getMessage()

    );

}