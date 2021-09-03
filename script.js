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
    $(".input-cell").click(function(e) { 
        let [row,col] = getRowCol(this);
        if(e.ctrlKey==true){
            if($(`#row-${row-1}-col-${col}`).hasClass("selected")){
                $(`#row-${row-1}-col-${col}`).addClass("bottom-cell-selected");
                $(this).addClass("top-cell-selected");
            }
            if($(`#row-${row+1}-col-${col}`).hasClass("selected")){
                $(`#row-${row+1}-col-${col}`).addClass("top-cell-selected");
                $(this).addClass("bottom-cell-selected");
            }
            if($(`#row-${row}-col-${col-1}`).hasClass("selected")){
                $(`#row-${row}-col-${col-1}`).addClass("right-cell-selected");
                $(this).addClass("left-cell-selected");
            }
            if($(`#row-${row}-col-${col+1}`).hasClass("selected")){
                $(`#row-${row}-col-${col+1}`).addClass("left-cell-selected");
                $(this).addClass("right-cell-selected");
            }
        }else{
            $(".input-cell.selected").removeClass("selected");
            $(this).removeClass("top-cell-selected");
            $(this).removeClass("bottom-cell-selected");
            $(this).removeClass("left-cell-selected");
            $(this).removeClass("right-cell-selected");
        }
        $(this).addClass("selected");
    });
    $(".input-cell").dblclick(function () {
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable","true");
        $(this).focus();
    });
    $(".input-cell-container").scroll(function () { 
        $(".column-name-container").scrollLeft(this.scrollLeft);
        $(".row-name-container").scrollTop(this.scrollTop);
    });

    function getRowCol(ele){
        var array = $(ele).attr("id").split("-");
        let row = parseInt(array[1]);
        let col = parseInt(array[3]);
        return [row,col];
    }
});
