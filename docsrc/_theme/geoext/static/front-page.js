Ext.onReady(function() {
    var win;
    Ext.DomQuery.select("p.execute")[0].onclick = function() {
        if(!win) {
            win = new Ext.Window({
                title: "GeoExt in Action",
                height: 280,
                width: 400,
                layout: "fit",
                closeAction: "hide",
                items: [{
                    xtype: "gx_mappanel",
                    layers: [new OpenLayers.Layer.WMS(
                        "bluemarble", "http://demo.opengeo.org/geoserver/wms",
                        {layers: 'bluemarble'}
                    )]
                }]
            });
        }
        win.show();
    }
});