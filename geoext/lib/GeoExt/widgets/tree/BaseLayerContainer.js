/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @requires GeoExt/widgets/tree/LayerContainer.js
 */
Ext.namespace("GeoExt.tree");

/** api: (define)
 *  module = GeoExt.tree
 *  class = BaseLayerContainer
 */

/** api: (extends)
 * GeoExt/widgets/tree/LayerContainer.js
 */

/** api: constructor
 *  .. class:: BaseLayerContainer
 * 
 *     A layer container that will collect all base layers of an OpenLayers
 *     map. Only layers that have displayInLayerSwitcher set to true will be
 *     included.
 * 
 *     To use this node type in ``TreePanel`` config, set nodeType to
 *     "gx_baselayercontainer".
 */
GeoExt.tree.BaseLayerContainer = Ext.extend(GeoExt.tree.LayerContainer, {

    /** private: method[constructor]
     *  Private constructor override.
     */
    constructor: function(config) {
        config.text = config.text || "Base Layer";
        GeoExt.tree.BaseLayerContainer.superclass.constructor.apply(this, arguments);
    },

    /** private: method[addLayerNode]
     *  :param layerRecord: ``Ext.data.Record`` the layer record to add a node
     *      for
     * 
     *  Adds a child node representing a base layer of the map.
     */
    addLayerNode: function(layerRecord) {
        var layer = layerRecord.get("layer");
        if (layer.isBaseLayer == true) {
            GeoExt.tree.BaseLayerContainer.superclass.addLayerNode.call(this,
                layerRecord);
        }
    },
    
    /** private: method[removeLayerNode]
     *  :param layerRecord: ``Ext.data.Record`` the layer record to remove the
     *      node for
     *
     *  Removes a child node representing a base layer of the map.
     */
    removeLayerNode: function(layerRecord) {
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
