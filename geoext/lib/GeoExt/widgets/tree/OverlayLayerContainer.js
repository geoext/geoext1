/**
 * Copyright (c) 2008 The Open Planning Project
 */

/**
 * @requires GeoExt/widgets/tree/LayerContainer.js
 */
Ext.namespace("GeoExt.tree");

/**
 * Class: GeoExt.tree.OverlayLayerContainer
 * 
 * A layer container that will collect all overlay layers of an OpenLayers map.
 * Only layers that have displayInLayerSwitcher set to true will be included.
 * 
 * To use this node type in JSON config, set nodeType to
 * "olOverlayLayerContainer".
 * 
 * Inherits from:
 * - <GeoExt.tree.LayerContainer>
 */
GeoExt.tree.OverlayLayerContainer = Ext.extend(GeoExt.tree.LayerContainer, {

    /**
     * Constructor: GeoExt.tree.OverlayLayerContainer
     * 
     * Parameters:
     * config - {Object}
     */
    constructor: function(config) {
        config.text = config.text || "Overlays";
        GeoExt.tree.OverlayLayerContainer.superclass.constructor.apply(this,
            arguments);
    },

    /**
     * Method: addLayerNode
     * Adds a child node representing a overlay layer of the map
     * 
     * Parameters:
     * layerRecord - {Ext.data.Record} the layer record to add a node for
     */
    addLayerNode: function(layerRecord) {
        var layer = layerRecord.get("layer");
        if (layer.isBaseLayer == false) {
            GeoExt.tree.OverlayLayerContainer.superclass.addLayerNode.call(this,
                layerRecord);
        }
    },
    
    /**
     * Method: removeLayerNode
     * Removes a child node representing an overlay layer of the map
     * 
     * Parameters:
     * layerRecord - {Ext.data.Record} the layer record to remove the node for
     */
    removeLayerNode: function(layerRecord) {
        var layer = layerRecord.get("layer");
        if (layer.isBaseLayer == false) {
            GeoExt.tree.OverlayLayerContainer.superclass.removeLayerNode.call(
                this, layerRecord);
    	}
    }
});

/**
 * NodeType: gx_overlaylayercontainer
 */
Ext.tree.TreePanel.nodeTypes.gx_overlaylayercontainer = GeoExt.tree.OverlayLayerContainer;
