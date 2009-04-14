Ext.BLANK_IMAGE_URL = "../../../../ext/resources/images/default/s.gif"

var map, store, grid;

Ext.onReady(function() {
    map = new OpenLayers.Map("map");
    var wmsLayer = new OpenLayers.Layer.WMS(
        "vmap0",
        "http://labs.metacarta.com/wms/vmap0",
        {layers: 'basic'}
    );
    var vecLayer = new OpenLayers.Layer.Vector("vector");
    map.addLayers([wmsLayer, vecLayer]);
    map.zoomToExtent(
        OpenLayers.Bounds.fromString(
            "3.131104,43.445435,9.7229,47.839966"
        )
    );
    
    store = new GeoExt.data.FeatureStore({
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
        layer: vecLayer,
        autoLoad: true
    });

    grid = new Ext.grid.GridPanel({
        store: store,
        height: 260,
        width: 320,
        columns: [{
            header: "Name",
            width: 200,
            dataIndex: "name"
        }, {
            header: "Elevation",
            width: 100,
            dataIndex: "elevation"
        }],
        renderTo: "grid"
    });
});

