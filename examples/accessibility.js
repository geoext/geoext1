/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: example[accessibility]
 *  Accessibility
 *  -------------
 */

var mapPanel, tree;
Ext.onReady(function() {
    // create a map panel with some layers that we will show in our layer tree
    // below.
    mapPanel = new GeoExt.MapPanel({
        border: true,
        region: "center",
        // we do not want all overlays, to try the OverlayLayerContainer
        map: new OpenLayers.Map({allOverlays: false}),
        center: [146.1569825, -41.6109735],
        zoom: 6,
        layers: [
            new OpenLayers.Layer.WMS("Global Imagery",
                "http://maps.opengeo.org/geowebcache/service/wms", {
                    layers: "bluemarble"
                }, {
                    buffer: 0,
                    visibility: false
                }
            ),
            new OpenLayers.Layer.WMS("Tasmania State Boundaries",
                "http://demo.opengeo.org/geoserver/wms", {
                    layers: "topp:tasmania_state_boundaries"
                }, {
                    buffer: 0
                }
            ),
            new OpenLayers.Layer.WMS("Water",
                "http://demo.opengeo.org/geoserver/wms", {
                    layers: "topp:tasmania_water_bodies",
                    transparent: true,
                    format: "image/gif"
                }, {
                    isBaseLayer: false,
                    buffer: 0
                }
            ),
            new OpenLayers.Layer.WMS("Cities",
                "http://demo.opengeo.org/geoserver/wms", {
                    layers: "topp:tasmania_cities",
                    transparent: true,
                    format: "image/gif"
                }, {
                    isBaseLayer: false,
                    buffer: 0
                }
            ),
            new OpenLayers.Layer.WMS("Tasmania Roads",
                "http://demo.opengeo.org/geoserver/wms", {
                    layers: "topp:tasmania_roads",
                    transparent: true,
                    format: "image/gif"
                }, {
                    isBaseLayer: false,
                    buffer: 0
                }
            )
        ]
    });
    mapPanel.on({
        render: function() {
            // activate the keyboard control
            var map = mapPanel.map;
            var kbCtrl = new OpenLayers.Control.KeyboardDefaults({
                observeElement: mapPanel.body.dom
            });
            map.addControls([kbCtrl]);
            kbCtrl.activate();
            // make the map div focusable
            mapPanel.body.dom.tabIndex = '1';
        }
    });
        
    // using OpenLayers.Format.JSON to create a nice formatted string of the
    // configuration for editing it in the UI
    var treeConfig = [{
        nodeType: "gx_baselayercontainer"
    }, {
        nodeType: "gx_overlaylayercontainer",
        expanded: true
    }];

    // create the tree with the configuration from above
    tree = new Ext.tree.TreePanel({
        border: true,
        region: "west",
        title: "Layers",
        width: 250,
        autoScroll: true,
        loader: new Ext.tree.TreeLoader({
            // applyLoader has to be set to false to not interfer with loaders
            // of nodes further down the tree hierarchy
            applyLoader: false
        }),
        root: {
            nodeType: "async",
            // the children property of an Ext.tree.AsyncTreeNode is used to
            // provide an initial set of layer nodes.
            children: treeConfig
        },
        rootVisible: false,
        lines: false
    });
    
    new Ext.Viewport({
        layout: "fit",
        hideBorders: true,
        items: {
            layout: "border",
            deferredRender: false,
            items: [mapPanel, tree, {
                contentEl: "desc",
                region: "north",
                bodyStyle: {"padding": "5px"},
                title: "Description"
            }]
        }
    });

    Ext.get('tree_direct_link').on({
        click: function() {
            var node = tree.getSelectionModel().getSelectedNode() ||                                                                                                                                                                                                                                                      
                tree.getRootNode().firstChild;
            var path = node.getPath();
            tree.selectPath(path);
        }
    });
    Ext.get('map_direct_link').on({
        click: function() {
            mapPanel.map.div.focus();
        }
    });
});

