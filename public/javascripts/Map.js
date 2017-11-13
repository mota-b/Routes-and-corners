/**
 * Map manager
 */
let mm = {
    createmap: function (){
        let mymap = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibW91a2h0YXIiLCJhIjoiY2o5cHdlOXo3NTNneDMzcHlrZDFnOXBoZSJ9.8jEQud_83lrwdz5tomQ_jw'
        }).addTo(mymap);
        return mymap    
    },
    add_marker : function(map, markers, arcs, location, name){
        
        //Create the marker
        let marker = new L.marker(location,
            {title: name}
        ).addTo(map);
        
        //Set marker events
        marker.on('drag', function(e){
            arcs.forEach(function(arc){
                let arc_name = arc.name.split("/");
                let index = arc_name.indexOf(marker.options.title);
            
                if ( index == 0 )
                    arc.line.setLatLngs([marker._latlng, arc.line._latlngs[1]]);
                else
                    if ( index == 1 )
                        arc.line.setLatLngs([arc.line._latlngs[0], marker._latlng]); 
            });
        });
        marker.on('remove', function(e){
            for (let i = arcs.length-1; i >= 0; i--) {
                let arc_name = arcs[i].name.split("/");
                let index = arc_name.indexOf(marker.options.title);
                if ( index != -1 ){
                    marker.unbindPopup()
                    map.removeLayer(arcs[i].line);
                    arcs.splice(i, 1);
                }
            }       
        });


        //Bind popup to the marker 
        var popup = L.popup()
        .setLatLng(marker._latlng)
        .setContent('<p>'+ marker.options.title +'</p>');
        marker.bindPopup(popup)

        //Add ref to the markers list
        markers.push(marker);
    },
    dell_marker: function(map, marker, markers, arcs){
        map.removeLayer(marker);
        markers.splice(markers.indexOf(marker), 1);
    },
    add_arc: function(map, arcs, m1, m2){ 
        let arc = new L.polyline([m1._latlng, m2._latlng]).addTo(map);
        arcs.push({
            "name": m1.options.title + "/" + m2.options.title,
            "line": arc
        })
    },
    dell_arc: function(map, arc){
        map.removeLayer(arc.line);
        arcs.splice(arcs.indexOf(arc), 1);
    },
    set_all_dragable: function(markers, bool){
        if (bool)
            markers.forEach(function (marker) { marker.dragging.enable()});
        else
            markers.forEach(function (marker) {marker.dragging.disable()});
    },
    set_dragable: function(marker, bool){
        
        if (bool &&  !marker.dragging.enabled())
            marker.dragging.enable()
        else
            if (!bool &&  marker.dragging.enabled())
                marker.dragging.disable()
    },
    over_watch: function(map, markers){
        if (markers && markers.length>0){
            bounds = [];
            markers.forEach(function(marker) {
                bounds.push(marker._latlng)
            });
            map.flyToBounds(bounds, {})
        }
    },
    fly_to: function(map, marker, zoomLvl){
        if (marker)
            map.flyTo(marker._latlng, zoomLvl)
    }
}//Map manager



/**
 * Map init
 */
map= mm.createmap()
markers= []
arcs= []

//routers
/* router_api = [
    [[51.5, -0.09], "R0"],
    [[51.5, -0.10], "R1"],
    [[51.505, -0.095], "R2"]
]
router_api.forEach(function(router){
    mm.add_marker(map, markers, arcs, router[0], router[1]);
}) */

// arcs
/* arcs_api = [
    [markers[0], markers[1]],
    [markers[1], markers[2]],
    [markers[2], markers[0]]
];
arcs_api.forEach(function(arc){
    mm.add_arc(map, arcs, arc[0], arc[1]);
}) */
//Map init





