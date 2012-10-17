/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: example[legendpanel]
 *  Legend Panel
 *  ------------
 *  Display a layer legend in a panel.
 */


var mapPanel, legendPanel;

Ext.onReady(function() {
    var map = new OpenLayers.Map({allOverlays: true});
    map.addLayers([
        new OpenLayers.Layer.WMS(
            "Blue Marble",
            "http://demo.opengeo.org/geoserver/wms?",
            {layers: 'topp:bluemarble', format: 'image/jpeg'},
            {singleTile: true}),
        new OpenLayers.Layer.WMS(
            "Vegetation and Natural Landmarks",
            "http://demo.opengeo.org/geoserver/wms?",
            {layers: 'za_vegetation,za_natural', format: 'image/png', transparent: true},
            {singleTile: true}),
        new OpenLayers.Layer.Vector('Polygons', {styleMap: new OpenLayers.StyleMap({
                "default": new OpenLayers.Style({
                    pointRadius: 8,
                    fillColor: "#00ffee",
                    strokeColor: "#000000",
                    strokeWidth: 2
                }) }) })
    ]);
    map.layers[2].addFeatures([
        new OpenLayers.Feature.Vector(OpenLayers.Geometry.fromWKT(
            "POLYGON(29 -30, 29.5 -30, 29.5 -31, 28.5 -31.5, 29 -30)"))
    ]);
    map.addControl(new OpenLayers.Control.LayerSwitcher());

    var addRemoveLayer = function() {
        if(mapPanel.map.layers.indexOf(water) == -1) {
            mapPanel.map.addLayer(water);
        } else {
            mapPanel.map.removeLayer(water);
        }
    };

    var moveLayer = function(idx) {
        var layer = layerRec0.getLayer();
        var idx = mapPanel.map.layers.indexOf(layer) == 0 ?
            mapPanel.map.layers.length : 0;
        mapPanel.map.setLayerIndex(layerRec0.getLayer(), idx);
    };

    var toggleVisibility = function() {
        var layer = layerRec1.getLayer();
        layer.setVisibility(!layer.getVisibility());
    };

    var updateHideInLegend = function() {
        layerRec0.set("hideInLegend", !layerRec0.get("hideInLegend"));
    };

    var updateLegendUrl = function() {
        var url = layerRec0.get("legendURL");
        layerRec0.set("legendURL", otherUrl);
        otherUrl = url;
    };

    mapPanel = new GeoExt.MapPanel({
        region: 'center',
        height: 400,
        width: 600,
        map: map,
        center: new OpenLayers.LonLat(29, -30),
        zoom: 7
    });

    // give the record of the 1st layer a legendURL, which will cause
    // UrlLegend instead of WMSLegend to be used
    var layerRec0 = mapPanel.layers.getAt(0);
    layerRec0.set("legendURL", "http://demo.opengeo.org/geoserver/wms?request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=bluemarble");

    // store the layer that we will modify in toggleVis()
    var layerRec1 = mapPanel.layers.getAt(1);

    // stores another legendURL for the legendurl button action
    var otherUrl = "http://www.geoext.org/trac/geoext/chrome/site/img/GeoExt.png";

    // create another layer for the add/remove button action
    var water = new OpenLayers.Layer.WMS("Roads",
        "http://demo.opengeo.org/geoserver/wms?",
        {layers: 'za_roads', format: 'image/png', transparent: true},
        {singleTile: true});

    legendPanel = new GeoExt.LegendPanel({
        defaults: {
            labelCls: 'mylabel',
            style: 'padding:5px',
            itemXType: 'custom_legendimage'
        },
        cls: "legendpanel",
        bodyStyle: 'padding:5px',
        width: 350,
        autoScroll: true,
        region: 'west'
    });

    new Ext.Panel({
        title: "GeoExt LegendPanel Demo",
        layout: 'border',
        renderTo: 'view',
        height: 400,
        width: 800,
        tbar: new Ext.Toolbar({
            items: [
                {text: 'add/remove', handler: addRemoveLayer},
                {text: 'movetop/bottom', handler: moveLayer },
                {text: 'togglevis', handler: toggleVisibility},
                {text: 'hide/show', handler: updateHideInLegend},
                {text: 'legendurl', handler: updateLegendUrl}
            ]
        }),
        items: [legendPanel, mapPanel]
    });
});

// here we create a customized LegendImage component. Our goal is to add a label
// for each layer.PARAMS.LAYERS' item.
CustomLegendImage = Ext.extend(GeoExt.LegendImage, {
    initComponent: function() {
        CustomLegendImage.superclass.initComponent.call(this);
        this.autoEl = {
            tag: "div",
            children: [{
                tag: 'label',
                html: OpenLayers.i18n(this.itemId)
            },{
                tag: "img",
                "class": (this.imgCls ? this.imgCls + " " + this.noImgCls : this.noImgCls),
                src: this.defaultImgSrc
            }]
        };
    },

    getImgEl: function() {
        return Ext.select('img', false, this.getEl().dom).first();
    }
});
Ext.reg('custom_legendimage', CustomLegendImage);

OpenLayers.Lang.en = {
    'za_vegetation': 'Vegetation',
    'za_natural': 'Natural Landmarks',
    'za_roads': 'Roads'
};
OpenLayers.Lang.setCode('en');
