<?php 
include"../config/koneksi.php";
$no = 0;
$data = array();
$pilih = $jeje->query("SELECT * FROM tb_user");
while($u = $pilih->fetch_assoc()){
		$no++; 
		$row_data = array(
			'no' => $no,
			'username' => $u['username'],
			'id' => $u['id']
		);
	   array_push($data, $row_data);
	
}
echo json_encode($data);
?>