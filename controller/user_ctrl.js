app.controller('userCtrl', user);

function user($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.message = '';
    vm.ubahData = ubahData;
    vm.delete = deleteRow;
    vm.reloadData = reloadData;
    vm.simpanData = simpanData;
    vm.dtInstance = {};
    vm.persons = {};
    vm.dtOptions = DTOptionsBuilder.fromSource('module/tampil_user.php')
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('no').withTitle('No'),
        DTColumnBuilder.newColumn('username').withTitle('Username'),
        DTColumnBuilder.newColumn(null).withTitle('Aksi').notSortable()
            .renderWith(actionsHtml)
    ];

    $scope.userText = {};
    // aksi menambah ke database
    function simpanData(){
        $('.simpan_data').attr('disabled','true');
        $http.post(
            'http://localhost/tugas-crud-ci/index.php/home/tambah_user_aksi2/',
            {
                username: $scope.userText.username,
                password: $scope.userText.password
            }
        ).success(function(response){
            if(response=="ok"){    
                reloadData();
                $('.progress-bar-striped').animate({width:'100%'}, 0);
                $('.simpan_data').removeAttr('disabled');
                setTimeout( function() { 
                    $('#tbh_user').modal('hide');
                    $('#username, #password').val(''); 
                    $('.progress-bar-striped').animate({width:'0%'}, 0);
                }, 1000 );
            }else{
                $(".alert-euy").html("<div class='form-group'><div class='alert alert-danger' role='alert'><i class='fa fa-remove'></i> "+response+"</div></div>");
                setTimeout( function() { 
                    $('#username, #password').val(''); 
                    $(".alert-euy").empty();
                    $('.simpan_data').removeAttr('disabled');
                }, 2000 );
            }
        })
        .error(function(){
            alert('Gagal menyimpan!');
        });
    };

    // aksi ubah ke database
    function ubahData(){
        $('.ubah_data').attr('disabled','true');
        $scope.userText.id = $('#id').val();
        $http.post(
            'http://localhost/tugas-crud-ci/index.php/home/ubah_user_aksi2/',
            {
                id: $scope.userText.id,
                password_lm: $scope.userText.password_lm,
                password: $scope.userText.password
            }
        )
        .success(function(response){
            if(response=="ok"){    
                reloadData();
                $('.progress-bar-striped').animate({width:'100%'}, 0);
                $('.ubah_data').removeAttr('disabled');
                setTimeout( function() { 
                    $('#ubh').modal('hide');
                    $('#password_lm, #password').val(''); 
                    $('.progress-bar-striped').animate({width:'0%'}, 0);
                }, 1000 );
            }else{
                $(".alert-euy").html("<div class='form-group'><div class='alert alert-danger' role='alert'><i class='fa fa-remove'></i> Password Lama Salah!</div></div>");
                setTimeout( function() { 
                    $('#password_lm, #password').val(''); 
                    $(".alert-euy").empty();
                    $('.ubah_data').removeAttr('disabled');
                }, 2000 );
            }
        })
        .error(function(){
            alert('Gagal menyimpan!');
        });
    };


    function deleteRow(person) {
        $http.delete(
            'http://localhost/tugas-crud-ci/index.php/home/hapus_user/'+person.id
            )
        .success(function(){
            reloadData();
            alert('Data berhasil dihapus!');
            //vm.message = 'Data Berhasil Dihapus!';

        })
        .error(function(){
            alert('Gagal hapus data!');
        })
    }
    
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }



    function reloadData() {
        var resetPaging = false;
        vm.dtInstance.reloadData(callback, resetPaging);
    }

    function callback(json) {
        console.log(json);
    }

    function actionsHtml(data, type, full, meta) {
        vm.persons[data.id] = data;
        return '<button class="btn btn-warning" data-toggle="modal" data-id="'+data.id+'" data-username="'+data.username+'" data-target="#ubh">'+
            '<i class="fa fa-edit"></i> Ubah</i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-danger" ng-click="showCase.delete(showCase.persons[' + data.id + '])" )"="">' +
            '   <i class="fa fa-remove"> Hapus</i>' +
            '</button>';
    }
}