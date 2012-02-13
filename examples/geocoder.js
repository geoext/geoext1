/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: example[geocoder]
 *  GeocoderComboBox
 *  ----------------
 *  MapPanel with a OSM Nominatim search field.
 */

var mapPanel;

Ext.onReady(function() {
    var locationLayer = new OpenLayers.Layer.Vector("Location", {
        styleMap: new OpenLayers.Style({
            externalGraphic: "http://openlayers.org/api/img/marker.png",
            graphicYOffset: -25,
            graphicHeight: 25,
            graphicTitle: "${display_name}"
        })
    });
    mapPanel = new GeoExt.MapPanel({
        renderTo: "mappanel",
        height: 400,
        width: 500,
        layers: [new OpenLayers.Layer.OSM(), locationLayer],
        zoom: 1,
        tbar: [{
            xtype: "gx_geocodercombo",
            width: 250,
            layer: locationLayer
        }]
    });
});
