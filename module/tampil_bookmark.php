<?php 
include"../config/koneksi.php";
$no = 0;
$data = array();
$pilih = $jeje->query("SELECT * FROM tb_bookmark");
while($u = $pilih->fetch_assoc()){
		$no++; 
		$row_data = array(
			'no' => $no,
			'title' => $u['title'],
			'url' => $u['url'],
			'description' => $u['description'],
			'id' => $u['id']
		);
	   array_push($data, $row_data);
	
}
echo json_encode($data);
?>