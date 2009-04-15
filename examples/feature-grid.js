Ext.BLANK_IMAGE_URL = "../../../../ext/resources/images/default/s.gif"

var mapPanel, store, gridPanel, mainPanel;

Ext.onReady(function() {
    var map = new OpenLayers.Map();
    var wmsLayer = new OpenLayers.Layer.WMS(
        "vmap0",
        "http://labs.metacarta.com/wms/vmap0",
        {layers: 'basic'}
    );
    var vecLayer = new OpenLayers.Layer.Vector("vector");
    map.addLayers([wmsLayer, vecLayer]);

    mapPanel = new GeoExt.MapPanel({
        title: "Map",
        region: "center",
        height: 400,
        width: 600,
        map: map,
        center: new OpenLayers.LonLat(5, 45),
        zoom: 6
    });
    
    store = new GeoExt.data.FeatureStore({
        layer: vecLayer,
        fields: [
            {name: 'name', type: 'string'},
            {name: 'elevation', type: 'float'}
        ],
        proxy: new GeoExt.data.ProtocolProxy({
            protocol: new OpenLayers.Protocol.HTTP({
                url: "data/summits.json",
                format: new OpenLayers.Format.GeoJSON()
            })
        }),
        autoLoad: true
    });

    gridPanel = new Ext.grid.GridPanel({
        title: "Feature Grid",
        region: "east",
        store: store,
        width: 320,
        columns: [{
            header: "Name",
            width: 200,
            dataIndex: "name"
        }, {
            header: "Elevation",
            width: 100,
            dataIndex: "elevation"
        }]
    });

    mainPanel = new Ext.Panel({
        renderTo: "mainpanel",
        layout: "border",
        height: 400,
        width: 920,
        items: [mapPanel, gridPanel]
    });
});

