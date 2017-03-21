/**
 * @typedef {Object} Grid
 * @property {number} x width of the Grid
 * @property {number} y height of the Grid
 * @param {Grid} grid 
 * @param {number} number_grids number of grids shown to the user
 * @param {number} choices the number of choices per grid
 * @param {boolean} order_matters if the order of input matters
 * @returns {number} the number of bits of entropy for the given set of grids
 */
function entropy_calc(grid, number_grids, choices, order_matters) {
    math.config({
        number: 'BigNumber',
        precision: 10
    });
    return math.chain(grid.x * grid.y)
        .combinations(choices)
        .multiply(function() {
            if (order_matters) {
                return math.factorial(choices);
            }
            return 1;
        }())
        .pow(3)
        .log(2)
        .floor()
        .done();
}

/**
 * @param {Grid} grid 
 */
function make_grid(grid) {
    var new_table = $('<table></table>').addClass('grid');

    for (i = 0; i<grid.y; i++) {
        current_row = $('<tr></tr>');
        for (j=0; j<grid.x; j++) {
            current_row.append('<td></td> ');
        }
        new_table.append(current_row);
    }
    return new_table;
}

$(document).ready(function(){
    // $('body').append(make_grid({x: 7, y: 7}));
    // $('body').append(make_grid({x: 7, y: 10}));
    // $('body').append(make_grid({x: 7, y: 2}));

    $('#gridform').submit(function(e) {
        results = $('<div id="results"></div>')
        g = {x: $('#gridx').val(), y: $('#gridy').val()}
        checked = $('#ordermatters').is(':checked');
        console.log(checked);
        results.append("&ge; ", entropy_calc(g, $('#numgrids').val(), $('#numchoices').val(), checked), " bits of entropy");

        grid = make_grid(g);
        for (i=0; i<$('#numgrids').val(); i++) {
            results.append(grid.clone());
        }
        $('#results').replaceWith(results);
        e.preventDefault();
    }) 
});