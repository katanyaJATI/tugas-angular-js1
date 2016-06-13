<!DOCTYPE html>
<html lang="en">
  <head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<title>Login Form</title>
		<meta name="generator" content="Bootply" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link href="<?php echo base_url(); ?>assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>assets/fonts/css/font-awesome.min.css" rel="stylesheet">
		<!--[if lt IE 9]>
			<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<link href="<?php echo base_url(); ?>assets/css/styles.css" rel="stylesheet">
	</head>
	<body>
<!--login modal-->
<div id="loginModal" class="modal show" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
  <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h1 class="text-center">Login</h1>
      </div>
      <div class="modal-body">
          <form class="form col-md-12 center-block login-form" method="POST">
            <div class="alert-euy"></div>
            <div class="form-group">
              <input type="text" name="username" id="username" class="form-control input-lg" placeholder="Username">
            </div>
            <div class="form-group">
              <input type="password" name="password" id="password" class="form-control input-lg" placeholder="Password">
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-lg btn-block login">Sign In</button>
            </div>
          </form>
      </div>
      <div class="modal-footer">
      </div>	
      </div>
  </div>
  </div>
</div>
	<!-- script references -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
    <!-- jQuery -->
    <script src="<?php echo base_url(); ?>assets/js/jquery.js"></script>
	</body>
</html>

<script type="text/javascript">
  $(document).ready(function(){
    /* -------- LOGIN AJAX JQUERY -------- */
        $(".login").click(function(){
          var data = $('.login-form').serialize();
          $.ajax({
              type: 'POST',
              url: "<?php echo base_url('index.php/login/aksi_login'); ?>",
              data: data,
              beforeSend: function(){
                $('.login').attr('disabled','true');
                $('#username').attr('disabled','true');
                $('#password').attr('disabled','true');
                $(".alert-euy").html("<div class='form-group'><div class='alert alert-info' role='alert'><i class='fa fa-refresh fa-spin fa-fw'></i><span class='sr-only'>Loading...</span> Pengecekan...</div></div>");
              },
              success: function(response) {
                if(response=="Login berhasil!"){
                  $(".alert-euy").html("<div class='form-group'><div class='alert alert-success' role='alert'><i class='fa fa-check'></i> "+response+"</div></div>");
                  // $('.login').removeAttr('disabled');
                  setTimeout( function() { window.location = 'index.php/home'; }, 1500);
                }else{
                  $(".alert-euy").html("<div class='form-group'><div class='alert alert-danger' role='alert'><i class='fa fa-remove'></i> "+response+"</div></div>");
                  $('.login').removeAttr('disabled');
                  $('#username').removeAttr('disabled','true');
                  $('#password').removeAttr('disabled','true');
                }
              }
          });
        });
    /* -------- LOGIN DATA AJAX JQUERY -------- */ 
  });
</script>