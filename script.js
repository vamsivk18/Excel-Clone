$(document).ready(function () {
    for (var i = 1; i <= 100; i++) {
        var n = i;
        var s = "";
        while (n != 0) {
            n = n - 1;
            s = String.fromCharCode(65 + n % 26) + s;
            n = Math.floor(n / 26);
        }
        let column = $(`<div class="column-name colId-${i}" id="colCod-${s}">${s}</div>`);
        $(".column-name-container").append(column);
        let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
        $(".row-name-container").append(row);
    }
    for(var i=1;i<=100;i++){
        var row = $(`<div class="row-cell">`);
        for(var j=1;j<=100;j++){
            let colId = $(`.colId-${j}`).attr("id").split("-")[1];
            let col = $(`<div class="input-cell col-${colId}" id="row-${i}-col-${j}"></div>`);
            $(row).append(col);
        }
        $(".input-cell-container").append(row);
    }
    $(".align-icon").click(function() { 
        $(".align-icon.selected").removeClass("selected");
        $(this).addClass("selected");
    });
    $(".menu-icon.style-icon").click(function(){
        $(this).toggleClass("selected");
    });
    $(".input-cell").click(function() { 
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
    });
});
