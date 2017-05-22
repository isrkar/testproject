function generate_table(object, table_data) {
    var table = $('<table></table>').addClass('table table-responsive table-hover');
    var thead = $('<thead></thead>');
    thead = generate_table_header(thead, ['id', 'email']);
    table.append(thead);

    var tbody = $('<tbody></tbody>');
    tbody = generate_table_rows(tbody, table_data);
    table.append(tbody);

    object.append(table);
}

function generate_table_header(object, data) {
    row = $('<tr></tr>');

    data.forEach(function (table_col, i, cols) {
        var col = $('<td></td>').text(table_col);
        row.append(col);
    });
    row.append('<td></td>');
    object.append(row);
    return object;
}

function generate_table_rows(object, data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var table_row = data[i];
        var row = $('<tr></tr>');

        $.each(table_row, function (index, table_col) {
            var col = $('<td></td>');

            col.text(table_col);
            row.append(col);
        });
        object.append(row);
    }
    return object;
}

function generate_pagination(object, page, total) {
    var ul = $('<ul></ul>').addClass('pagination');
    var all_pages = Math.ceil(total / 5);

    for (i = 1; i <= all_pages; i++) {
        var li = $('<li><a href="#" class="pgbt" data-page="' + i + '">' + i + '</a></li>');
        if (i == page) li.addClass('active');
        ul.append(li);
    }

    object.append(ul);
}

var total_pages;
var wto;


$(document).ready(function () {


    $.ajax({
        type: "GET",
        url: "api.php",
        dataType: 'json',
        data: "&req=getCount"
    }).done(function (data) {
        $('#table').empty();
        total_pages = data['count'];
        $('#totalPages').text(total_pages);

        $.ajax({
            type: "GET",
            url: "api.php",
            dataType: 'json',
            data: "&req=getPage"
        }).done(function (data) {
            generate_table($('#table'), data['data']);
            generate_pagination($('#table'), data['page'], total_pages);
        });
    });


    $(document).on('click', '.pgbt', function () {

        var btn = $(this);
        $.ajax({
            type: "GET",
            url: "api.php",
            dataType: 'json',
            data: "&req=getPage&pageNum=" + btn.data('page') + "&search=" + $('#searchQuery').val()
        }).done(function (data) {
            $('#table').empty();
            generate_table($('#table'), data['data']);
            generate_pagination($('#table'), data['page'], total_pages);
        });
    });

    $(document).on('change', $('#searchQuery'), function () {
        clearTimeout(wto);
        wto = setTimeout(function () {
            $.ajax({
                type: "GET",
                url: "api.php",
                dataType: 'json',
                data: "&req=getCount&search=" + $('#searchQuery').val()
            }).done(function (data) {
                $('#table').empty();
                total_pages = data['count'];
                $('#totalQuery').text('Найдено по запросу:' + total_pages);
                $.ajax({
                    type: "GET",
                    url: "api.php",
                    dataType: 'json',
                    data: "&req=getPage&search=" + $('#searchQuery').val()
                }).done(function (data) {
                    $('#table').empty();
                    generate_table($('#table'), data['data']);
                    generate_pagination($('#table'), data['page'], total_pages);
                });
            });
        }, 400);
    });

});