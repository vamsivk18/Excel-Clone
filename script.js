var cellData = {
    "Sheet1" : {}
}
var defaultProperties = {
    "text" : "",
    "font-weight":"",
    "font-style":"",
    "text-decoration":"",
    "text-align":"left",
    "background-color":"white",
    "color":"black",
    "font-family":"Noto Sans",
    "font-size":14
}

var sheet = "Sheet1";

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
        var val = $(this).attr("id");
        $(this).addClass("selected");
        findAndSetProperty(this,val);
    });
    $(".menu-icon.style-icon").click(function(){
        var val = $(this).hasClass("selected");
        findAndSetProperty(this,val);
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
            $(".input-cell").removeClass("top-cell-selected");
            $(".input-cell").removeClass("bottom-cell-selected");
            $(".input-cell").removeClass("left-cell-selected");
            $(".input-cell").removeClass("right-cell-selected");
        }
        $(this).addClass("selected");
        $('.input-cell').attr("contenteditable","false");
        let [r,c] = getRowCol(this);
        var data = defaultProperties;
        if(cellData[sheet][r] && cellData[sheet][r][c]){
            data = cellData[sheet][r][c];
        }
        setIcons(data);
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

    function findAndSetProperty(ele,val) {
        var property = "";
        var value = "";
        if($(ele).hasClass("align-icon")){
            property = "text-align";
            value = val;
        }else if($(ele).hasClass("icon-bold")){
            if(val==false) value = "bold";
            property = "font-weight";
        }else if($(ele).hasClass("icon-italic")){
            if(val==false) value = "italic";
            property = "font-style";
        }else if($(ele).hasClass("icon-underline")){
            if(val==false) value = "underline";
            property = "text-decoration";
        }
        setProperty(property,value);
    }

    function setProperty(property,value) {
        $(".input-cell.selected").each(function () {
            let [row,col] = getRowCol(this);
            if(cellData[sheet][row] && cellData[sheet][row][col]){
                cellData[sheet][row][col][property] = value;
            }else if(cellData[sheet][row]){
                cellData[sheet][row][col] = {...defaultProperties};
                cellData[sheet][row][col][property] = value;
            }else{
                cellData[sheet][row] = {};
                cellData[sheet][row][col] = {...defaultProperties};
                cellData[sheet][row][col][property] = value;
            }
            if(JSON.stringify(cellData[sheet][row][col])==JSON.stringify(defaultProperties)){
                delete cellData[sheet][row][col];
                if(Object.keys(cellData[sheet][row]).length==0)
                    delete cellData[sheet][row];
            }
            $(this).css(property,value);
            console.log(cellData[sheet][row]);
        });
    }    

    function setIcons(data) {
        $(".align-icon").removeClass("selected");
        $(`.align-icon#${data["text-align"]}`).addClass("selected");
        if(data["text-decoration"]=="underline") $(".icon-underline").addClass("selected");
        else $(".icon-underline").removeClass("selected");
        if(data["font-style"]=="italic") $(".icon-italic").addClass("selected");
        else $(".icon-italic").removeClass("selected");
        if(data["font-weight"]=="bold") $(".icon-bold").addClass("selected");
        else $(".icon-bold").removeClass("selected");
    }
});
