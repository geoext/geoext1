    var mapwin, mapPanel, pop;
    Ext.onReady(function() {

        /* 
         * Set up the vector layer.
         *
         * Will need a reference to the layer later when
         * giving it to a SelectFeature control to trigger
         * the popups.
         *
         */
        var vector = new OpenLayers.Layer.Vector("Vector Layer",{
            styleMap: new OpenLayers.StyleMap()
        });

        x = -45;
        y = 5;

        var point = new OpenLayers.Geometry.Point(x,y);
        var feature = new OpenLayers.Feature.Vector(point, {
            name : "MyFeature",
            id : "42"
        });
        vector.addFeatures(feature);

        mapwin = new Ext.Window({
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
                        "http://labs.metacarta.com/wms/vmap0",
                        {layers: 'basic'} ),
                    vector
                ]
            }
        });

        mapwin.show();

        mapPanel = mapwin.items.get(0);

        var select = new OpenLayers.Control.SelectFeature(vector, {
            onSelect : function(feature){
                openPopup(feature);
            }
        });
        
        mapPanel.map.addControl(select);
        select.activate();

    });


    function openPopup(feature){
      pop = new GeoExt.Popup({
        title: 'My Popup',
        feature: feature,
        width:200,
        html: bogusMarkup,
        collapsible: true
      });
      
      pop.addToMapPanel(mapPanel);
    }

    var bogusMarkup = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."


