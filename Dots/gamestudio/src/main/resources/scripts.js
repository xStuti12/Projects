$(document).keypress(function(event) {
    if (event.which === 13) { // Enter key
        event.preventDefault();
        var dotsToRemove = [];

        $("a.clicked").each(function() {
            var row = $(this).data("row");
            var column = $(this).data("column");
            var dot = {row: row, column: column};
            dotsToRemove.push(dot);
        });

        $.ajax({
            url: "/dots/remove",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(dotsToRemove),
            success: function() {
                // Refresh the page to update the board
                location.reload();
            }
        });
    }
});

$("a").click(function(event) {
    event.preventDefault();
    $(this).toggleClass("clicked");
});
