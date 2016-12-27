jQuery(function ($) {
    var myTable =
        $('#dynamic-table')
            .DataTable({
                "serverSide": true,
                //dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",


                columnDefs: [
                    {
                        "targets": 0, //从第0列开始
                        "visible": true,
                        "class": "center",
                        "data": "id",
                        "bSortable": false,
                        "render": function (data, type, full, meta) {
                            return '<label class="pos-rel"><input type="checkbox" class="ace"/><span class="lbl"></span></label>'

                        }

                    },
                    {
                        "targets": 1,
                        "class": "center",
                        "data": "domainName"
                    },
                    {
                        "targets": 2,
                        "class": "center",
                        "data": "price"
                    },
                    {
                        "targets": 3,
                        "class": "center",
                        "data": "clicks"
                    },
                    {
                        "targets": 4,
                        "class": "center",
                        "data": "updateTime"
                    },
                    {
                        "targets": 5,
                        "class": "center",
                        "data": "status"
                    },
                    {
                        "targets": 6, //从第0列开始
                        "visible": true,
                        "class": "center",
                        "data": "domainName",
                        "render": function (data, type, full, meta) {
                            return 'kuan_' + data

                        }

                    }
                ],
                "bAutoWidth":false,
                "aaSorting": [],
                "oLanguage": {
                    "sProcessing": "正在加载中......",
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "正在加载中......",
                    "sEmptyTable": "查询无数据！",
                    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                    "sInfoEmpty": "显示0到0条记录",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
                    "sSearch": "当前数据搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "末页"
                    }
                },
                ajax: {
                    url: 'table/data',
                    dataSrc: 'data'
                }
            });
    new $.fn.dataTable.Buttons(myTable, {
        buttons: [
            {
                "extend": "colvis",
                "text": " <i class='fa fa-search  blue'></i> <span class='hidden'>Show/hide columns</span>",
                "className": "btn btn-white btn-primary btn-bold btn-sm",
                columns: ':not(:first):not(:last)'
            },
            {
                "extend": "copy",
                "text": "<i class='fa fa-copy pink'></i> <span class='hidden'>Copy to clipboard</span>",
                "className": "btn btn-white btn-primary btn-bold btn-sm"
            },
            {
                "extend": "csv",
                "text": "<i class='fa fa-database orange'></i> <span class='hidden'>Export to CSV</span>",
                "className": "btn btn-white btn-primary btn-bold btn-sm"
            },
            {
                "extend": "excel",
                "text": "<i class='fa fa-file-excel-o green'></i> <span class='hidden'>Export to Excel</span>",
                "className": "btn btn-white btn-primary btn-bold btn-sm"
            },
            {
                "extend": "pdf",
                "text": "<i class='fa fa-file-pdf-o red'></i> <span class='hidden'>Export to PDF</span>",
                "className": "btn btn-white btn-primary btn-bold btn-sm"
            },
            {
                "extend": "print",
                "text": "<i class='fa fa-print bigger-110 grey'></i> <span class='hidden'>Print</span>",
                "className": "btn btn-white btn-primary btn-bold btn-sm",
                autoPrint: false,
                message: 'This print was produced using the Print button for DataTables'
            }
        ]
    });
    myTable.buttons().container().appendTo($('#table-tools'));

    //style the message box
    var defaultCopyAction = myTable.button(1).action();
    myTable.button(1).action(function (e, dt, button, config) {
        defaultCopyAction(e, dt, button, config);
        $('.dt-button-info').addClass('gritter-item-wrapper gritter-info gritter-center white');
    });


    var defaultColvisAction = myTable.button(0).action();
    myTable.button(0).action(function (e, dt, button, config) {

        defaultColvisAction(e, dt, button, config);


        if ($('.dt-button-collection > .dropdown-menu').length == 0) {
            $('.dt-button-collection')
                .wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
                .find('a').attr('href', '#').wrap("<li />")
        }
        $('.dt-button-collection').appendTo('#table-tools .dt-buttons')
    });


    myTable.on('select', function (e, dt, type, index) {
        if (type === 'row') {
            $(myTable.row(index).node()).find('input:checkbox').prop('checked', true);
        }
    });
    myTable.on('deselect', function (e, dt, type, index) {
        if (type === 'row') {
            $(myTable.row(index).node()).find('input:checkbox').prop('checked', false);
        }
    });


    /////////////////////////////////
    //table checkboxes
    $('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);

    //select/deselect all rows according to table header checkbox
    $('#dynamic-table > thead > tr > th input[type=checkbox], #dynamic-table_wrapper input[type=checkbox]').eq(0).on('click', function () {
        var th_checked = this.checked;//checkbox inside "TH" table header

        $('#dynamic-table').find('tbody > tr').each(function () {
            var row = this;
            if (th_checked) myTable.row(row).select();
            else  myTable.row(row).deselect();
        });
    });

    //select/deselect a row when the checkbox is checked/unchecked
    $('#dynamic-table').on('click', 'td input[type=checkbox]', function () {
        var row = $(this).closest('tr').get(0);
        if (this.checked) myTable.row(row).deselect();
        else myTable.row(row).select();
    });


    $(document).on('click', '#dynamic-table .dropdown-toggle', function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    });
})