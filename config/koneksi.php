<?php
$hostname = "localhost";
$username = "root";
$password = "";
$database = "db_crudci";

$jeje = new mysqli($hostname,$username,$password,$database);

if(mysqli_connect_errno()){
	echo"Gagal konek database kaka";
	exit;
}
?>