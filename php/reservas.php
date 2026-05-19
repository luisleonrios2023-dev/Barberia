<?php

require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../reserva.html?status=error");
    exit;
}

$nombre = trim($_POST["nombre"]);
$telefono = trim($_POST["telefono"]);
$servicio = trim($_POST["servicio"]);
$fecha = trim($_POST["fecha"]);
$hora = trim($_POST["hora"]);
$comentarios = trim($_POST["comentarios"]);

try {

    $sql = "INSERT INTO reservas_barberia 
    (nombre, telefono, servicio, fecha, hora, comentarios)
    VALUES
    (:nombre, :telefono, :servicio, :fecha, :hora, :comentarios)";

    $stmt = $conexion->prepare($sql);

    $stmt->execute([
        ":nombre" => $nombre,
        ":telefono" => $telefono,
        ":servicio" => $servicio,
        ":fecha" => $fecha,
        ":hora" => $hora,
        ":comentarios" => $comentarios
    ]);

    header("Location: ../reserva.html?status=ok");
    exit;

} catch (PDOException $e) {

    header("Location: ../reserva.html?status=error");
    exit;
}