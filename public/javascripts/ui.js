
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

$("#search_bar").submit(function(){
        markers = []
        arcs = []
        $.ajax( {
            url:'/trace/traceroute',
            type:"POST",
            data:{
                "searchUrl": $("#search_val").val()
            },
            
            success: function(message) { 
                if(message.v == true){   
                    console.log(message)
                    
                    message.data.forEach(function(tr_elem){
                        mm.add_marker(map, markers, arcs, tr_elem.latLng, tr_elem.country_name);    
                    })
                    
                    let m_init = markers[0];
                    for (var i = 1; i < markers.length; i++) {
                        mm.add_arc(map, arcs, markers[i-1], markers[i])
                    }

                    mm.over_watch(map, markers)
                }
                else    
                    console.log("not found")       
            }  
        });
    
        return false;
    });
//Ui main
