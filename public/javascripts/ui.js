
/**
 * Map main
 */





/**
 * Ui main
 */
$("#option #edit").click(function () { 
    if ($(this).hasClass("btn-success")){
        $(this).removeClass("btn-success")
        $(this).addClass("btn-warning")
        $(this).text("UnEditabble")
        markers.forEach(function (marker) {  
            marker.dragging.disable();
        })
    }
    else{
        $(this).removeClass("btn-warning")
        $(this).addClass("btn-success")
        $(this).text("Editabble")
        markers.forEach(function (marker) {  
            marker.dragging.enable();
        })
    }
})
$("#ad button").click(function () {
    if($(this).hasClass("selected")){
        console.log("unselect")
        $(this).removeClass("selected")
    }
    else{
        console.log("select")
        $("#ad button").removeClass("selected")
        $(this).addClass("selected")
    }
}) 
//Ui main
