/**
 * Copyright (c) 2008 The Open Planning Project
 */

/**
 * @requires GeoExt/widgets/tree/LayerContainer.js
 */
Ext.namespace("GeoExt.tree");

/**
 * Class: GeoExt.tree.BaseLayerContainer
 * 
 * A layer container that will collect all base layers of an OpenLayers map.
 * Only layers that have displayInLayerSwitcher set to true will be included.
 * 
 * To use this node type in JSON config, set nodeType to
 * "olBaseLayerContainer".
 * 
 * Inherits from:
 * - <GeoExt.tree.LayerContainer>
 */
GeoExt.tree.BaseLayerContainer = Ext.extend(GeoExt.tree.LayerContainer, {

    /**
     * Constructor: GeoExt.tree.BaseLayerContainer
     * 
     * Parameters:
     * config - {Object}
     */
    constructor: function(config) {
        config.text = config.text || "Base Layer";
        GeoExt.tree.BaseLayerContainer.superclass.constructor.apply(this, arguments);
    },

    /**
     * Method: addLayerNode
     * Adds a child node representing a base layer of the map
     * 
     * Parameters:
     * layerRecord - {Ext.data.Record} the layer record to add a node for
     */
    addLayerNode: function(layerRecord) {
        var layer = layerRecord.get("layer");
        if (layer.isBaseLayer == true) {
            GeoExt.tree.BaseLayerContainer.superclass.addLayerNode.call(this,
                layerRecord);
        }
    },
    
    /**
     * Method: removeLayerNode
     * Removes a child node representing a base layer of the map
     * 
     * Parameters:
     * layerRecord - {Ext.data.Record} the layer record to remove the node for
     */
    removeLayerNode: function(layer) {
        var layer = layerRecord.get("layer");
        if (layer.isBaseLayer == true) {
            GeoExt.tree.BaseLayerContainer.superclass.removeLayerNode.call(this,
                layerRecord);
    	}
    }
});

/**
 * NodeType: gx_baselayercontainer
 */
Ext.tree.TreePanel.nodeTypes.gx_baselayercontainer = GeoExt.tree.BaseLayerContainer;
