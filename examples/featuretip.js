/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: example[featuretip]
 *  Feature Tip
 *  -------------
 *  Display a tip tied to the location of a feature.
 */

var mapPanel, featureTip;

Ext.onReady(function() {

    // create a vector layer, add a feature into it
    var vectorLayer = new OpenLayers.Layer.Vector("vector");
    var feature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point(-45, 5)
    );
    vectorLayer.addFeatures(feature);

    // create Ext window including a map panel
    var mapwin = new Ext.Window({
        layout: "fit",
        title: "Map",
        closeAction: "hide",
        width: 650,
        height: 356,
        x: 50,
        y: 100,
        items: {
            xtype: "gx_mappanel",
            region: "center",
            layers: [
                new OpenLayers.Layer.WMS( 
                    "OpenLayers WMS",
                    "http://vmap0.tiles.osgeo.org/wms/vmap0",
                    {layers: 'basic'} ),
                vectorLayer
            ]
        }
    });
    mapwin.show();
    mapPanel = mapwin.items.get(0);
    var bogusMarkup = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.";
    featureTip = new GeoExt.FeatureTip({
        location: feature,
        width: 100,
        map: mapPanel.map,
        html: bogusMarkup
    });
    featureTip.show();
});
