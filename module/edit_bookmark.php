<div style="padding:30px;text-align:center">
	<h2>Edit Data Bookmark</h2>
	<div style="width:400px; margin:0 auto"> 

	<form action="<?php echo base_url().'index.php/home/ubah_bookmark_aksi';?>" method="POST">
	  <?php foreach($user as $u){ ?>
		<input type="hidden" name="id" value="<?php echo $u->id ?>">
		<div class="form-group">
			<label>TITLE</label>
		</div>
		<div class="form-group">
			<input type="text" class="form-control" required="" name="title" value="<?php echo $u->title ?>">
		</div>
		<div class="form-group">
			<label>URL</label>
		</div>
		<div class="form-group">
			<input type="text" class="form-control" required="" name="url" value="<?php echo $u->url ?>">
		</div>
		<div class="form-group">
			Deskripsi
		</div>
		<div class="form-group">
			<textarea name="description" class="form-control" style="height:100px"><?php echo $u->description ?></textarea>
		</div>
		<div class="form-group">
			<button type="submit" class="btn btn-primary">UBAH</button>
			<button type="reset" class="btn btn-default">RESET</button>
		</div>
	</form>
	  <?php } ?>
</div>
</div>