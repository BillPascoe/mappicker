
/* 
TLCMap Coordinate Picker Widget
A simple map picker adapted for TLCMap by Bill Pascoe and Kaine Usher from the free ArcGIS js api.

You can type coordinates in, or use the map picker.

*/

var latval = document.getElementById("Latitude").value;
var lngval = document.getElementById("Longitude").value;


if (!latval) {
	latval = -25.894349;
}
if (!lngval) {
	lngval = 134.723336;
}

      var map;
      require([
        "esri/map",
        "esri/graphic", "esri/InfoTemplate", "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/geometry/Point", "esri/toolbars/navigation", "dojo/dom", "dojo/domReady!"
      ], function(
        Map,
        Graphic, InfoTemplate, SimpleMarkerSymbol,
        SimpleLineSymbol, Color, Point, Navigation, dom
      ) {


        map = new Map("mapDiv", {
          basemap: "hybrid",
          center: [lngval, latval],
          zoom: 3,
          slider: true
        }
		);
		var navToolbar = new Navigation(map);


        // selection symbol
        var symbol = new SimpleMarkerSymbol(
          SimpleMarkerSymbol.STYLE_CIRCLE,
          12,
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_NULL,
            new Color([247, 34, 101, 0.9]),
            1
          ),
          new Color([207, 34, 171, 0.5])
        );


        //when the map is clicked create a buffer around the click point of the specified distance.
        map.on("click", function(evt){
          map.graphics.clear();
          map.graphics.add(new Graphic(evt.mapPoint, symbol));
          map.infoWindow.setContent("Lat: " + evt.mapPoint.getLatitude().toString() + ", <br>Long: " + evt.mapPoint.getLongitude().toString() + "<br /><button type=\"button\" onclick='setCoords(" + evt.mapPoint.getLatitude().toFixed(3) + "," + evt.mapPoint.getLongitude().toFixed(3) + ")'>APPLY THESE COORDINATES</button>");
          map.infoWindow.show(evt.mapPoint);
        });
		map.on("load", function(evt){
			// if there are already coords, eg if editing, then add the marker.
			if (lngval) {
				var alreadypoint = new Point(lngval,latval);
				//map.graphics.clear();
				map.graphics.add(new Graphic(alreadypoint, symbol));
			}
		});

      });

	  function setCoords(Lat, Long){
			document.getElementById("Latitude").value = Lat;
			document.getElementById("Longitude").value = Long;
	  }