$(document).ready(function() {
  if (GBrowserIsCompatible()) {
    var map;
    var gx;

    gx = new GGeoXml(Drupal.settings.aicmaps.kml, function() {
      gx.gotoDefaultViewport(map);
    });
    
    map = new GMap2(document.getElementById(Drupal.settings.aicmaps.map));

    // We have to set a center to begin with, or the map malfunctions.
    // I think this is Google HQ.  It will get reset as soon as the KML file loads.
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
  
    map.setMapType(G_SATELLITE_MAP);
    map.enableScrollWheelZoom();
    map.enableContinuousZoom();
    map.addControl(new GLargeMapControl());
    map.addOverlay(gx);
  }
});

$(document).unload(function() {
  GUnload();
});