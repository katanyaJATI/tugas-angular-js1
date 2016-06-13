var app = angular.module('myModule', ['datatables','ngRoute','ngResource'])
.controller('table_user', user)
.controller('table_bookmark', bookmark)

function user($scope, $compile, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.message = '';
    vm.edit = edit;
    vm.delete = deleteRow;
    vm.dtInstance = {};
    vm.persons = {};
    vm.dtOptions = DTOptionsBuilder.fromSource('data.json')
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('no').withTitle('No'),
        DTColumnBuilder.newColumn('username').withTitle('Username'),
        DTColumnBuilder.newColumn(null).withTitle('Aksi').notSortable()
            .renderWith(actionsHtml)
    ];

    function edit(person) {
        vm.message = 'You are trying to edit the row: ' + JSON.stringify(person);
        // Edit some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        vm.dtInstance.reloadData();
    }
    function deleteRow(person) {
        vm.message = 'You are trying to remove the row: ' + JSON.stringify(person);
        // Delete some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        vm.dtInstance.reloadData();
    }
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }
    function actionsHtml(data, type, full, meta) {
        vm.persons[data.no] = data;
        return '<button class="btn btn-warning" ng-click="showCase.edit(showCase.persons[' + data.no + '])">' +
            '   <i class="fa fa-edit"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-danger" ng-click="showCase.delete(showCase.persons[' + data.no + '])" )"="">' +
            '   <i class="fa fa-trash-o"></i>' +
            '</button>';
    }
}

function bookmark($resource, DTOptionsBuilder, DTColumnDefBuilder) {
    var vm = this;
    vm.persons = [];
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];
    $resource('data.json').query().$promise.then(function(persons) {
        vm.persons = persons;
    });
}