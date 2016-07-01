app.controller('bookmarkCtrl', bookmark);

function bookmark($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {

    $http.get("http://localhost/tugas-crud-ci/index.php/login/aksi_login2")
    .success(function(response){
        if(!response){
            window.location="http://localhost/tugas-angular/login.html";
        };
    });

    var vm = this;
    vm.message = '';
    vm.ubahData = ubahData;
    vm.delete = deleteRow;
    vm.reloadData = reloadData;
    vm.simpanData = simpanData;
    vm.dtInstance = {};
    vm.persons = {};
    vm.dtOptions = DTOptionsBuilder.fromSource('module/tampil_bookmark.php')
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('no').withTitle('No'),
        DTColumnBuilder.newColumn('title').withTitle('Title'),
        DTColumnBuilder.newColumn(null).withTitle('Url').renderWith(link),
        DTColumnBuilder.newColumn(null).withTitle('Aksi').notSortable().renderWith(actionsHtml)
    ];

    $scope.bmForm = {};
    // aksi menambah ke database
    function simpanData(){
        $('.simpan_data').attr('disabled','true');
        $http.post(
            'http://localhost/tugas-crud-ci/index.php/home/tambah_bookmark_aksi2/',
            {
                title: $scope.bmForm.title,
                url: $scope.bmForm.url,
                description: $scope.bmForm.description
            }
        ).success(function(response){
            if(response){    
                reloadData();
                $('.progress-bar-striped').animate({width:'100%'}, 0);
                $('.simpan_data').removeAttr('disabled');
                setTimeout( function() { 
                    $('#tbh_bookmark').modal('hide');
                    $('#title, #url, #description').val(''); 
                    $('.progress-bar-striped').animate({width:'0%'}, 0);
                }, 1000 );
            }else{
                $(".alert-euy").html("<div class='form-group'><div class='alert alert-danger' role='alert'><i class='fa fa-remove'></i> "+response+"</div></div>");
                setTimeout( function() { 
                    $('#title, #url, #description').val(''); 
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
        $scope.bmForm.id = $('#ubah > div > input.id').val();
        $scope.bmForm.title = $('#ubah > div > input.title').val();
        $scope.bmForm.url = $('#ubah > div > input.url').val();
        $scope.bmForm.description = $('#ubah > div > textarea.description').val();
        $http.post(
            'http://localhost/tugas-crud-ci/index.php/home/ubah_bookmark_aksi2/',
            {
                id: $scope.bmForm.id,
                title: $scope.bmForm.title,
                url: $scope.bmForm.url,
                description: $scope.bmForm.description
            }
        )
        .success(function(response){
            if(response=="ok"){    
                reloadData();
                $('.progress-bar-striped').animate({width:'100%'}, 0);
                $('.ubah_data').removeAttr('disabled');
                setTimeout( function() { 
                    $('#ubh').modal('hide');
                    $('#title, #url, #description').val(''); 
                    $('.progress-bar-striped').animate({width:'0%'}, 0);
                }, 1000 );
            }else{
                $(".alert-euy").html("<div class='form-group'><div class='alert alert-danger' role='alert'><i class='fa fa-remove'></i> Gagal Menyimpan data!</div></div>");
                setTimeout( function() { 
                    $('#title, #url, #description').val(''); 
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
            'http://localhost/tugas-crud-ci/index.php/home/hapus_bookmark/'+person.id
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
        return '<button class="btn btn-default" data-toggle="modal" data-id="'+data.id+'"'+
                    'data-title="'+data.title+'" data-url="'+data.url+'"'+
                    'data-description="'+data.description+'" data-target="#detail">'+
                    '<i class="fa fa-eye"></i> Detail</button> '+
                '<button class="btn btn-warning" data-toggle="modal" data-id="'+data.id+'"'+
                    'data-title="'+data.title+'" data-url="'+data.url+'"'+
                    'data-description="'+data.description+'" data-target="#ubh">'+
                    '<i class="fa fa-edit"></i> Ubah</button> '+
               '<button class="btn btn-danger" ng-click="showCase.delete(showCase.persons[' + data.id + '])" )"="">' +
                    '<i class="fa fa-remove"> Hapus</i>' +
                    '</button>'
    }

    function link(data, type, full, meta) {
        vm.persons[data.id] = data;     
        return '<a target="_blank" href="'+data.url+'">'+data.url+'</a>'
    }
}