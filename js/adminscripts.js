function generate_table(table_data) {
    var table = $('<table></table>').addClass('table table-responsive table-hover');
    var thead = $('<thead></thead>');
    thead = generate_table_header(thead, ['id', 'email']);
    table.append(thead);

    var tbody = $('<tbody></tbody>');
    tbody = generate_table_rows(tbody, table_data);
    table.append(tbody);

    $('#table').append(table);
}

function generate_table_header(parent, data) {
    row = $('<tr></tr>');

    data.forEach(function (table_col, i, cols) {
        var col = $('<td></td>').text(table_col);
        row.append(col);
    });
    row.append('<td></td>');
    parent.append(row);
    return parent;
}

function generate_table_rows(parent, data) {
    var i;
    for (i = 0; i < data.length; i++) {
        var table_row = data[i];
        var row = $('<tr></tr>');

        $.each(table_row, function (index, table_col) {
            var col = $('<td></td>');

            col.text(table_col);
            row.append(col);
        });
        parent.append(row);
    }
    return parent;
}

$(document).ready(function () {


    $('#table').empty();

    $.ajax({
        type: "GET",
        url: "api.php",
        dataType: 'json',
        data: "&req=getPage"
    }).done(function (data) {
        generate_table(data['data']);
    });


});