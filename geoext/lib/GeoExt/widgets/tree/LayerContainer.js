/**
 * Copyright (c) 2008 The Open Planning Project
 */

/**
 * @include GeoExt/widgets/tree/LayerNode.js
 */
Ext.namespace("GeoExt.tree");

/**
 * Class: GeoExt.tree.LayerContainer
 * 
 * A subclass of {Ext.tree.TreeNode} that will collect all layers of an
 * OpenLayers map. Only layers that have displayInLayerSwitcher set to true
 * will be included. The childrens' iconCls will be set to "baselayer-icon"
 * for base layers, and to "layer-icon" for overlay layers.
 * 
 * To use this node type in JSON config, set nodeType to "olLayerContainer".
 * 
 * Inherits from:
 * - <Ext.tree.TreeNode>
 */
GeoExt.tree.LayerContainer = Ext.extend(Ext.tree.TreeNode, {
    
    /**
     * APIProperty: layerStore
     * {<GeoExt.data.LayerStore>} The layer store containing layers to be
     *     displayed in the container.
     */
    layerStore: null,
    
    /**
     * APIProperty: defaults
     * {Object} a configuration object passed to all nodes that this
     *     LayerContainer creates.
     */
    defaults: null,

    /**
     * Constructor: GeoExt.tree.LayerContainer
     * 
     * Parameters:
     * config - {Object}
     */
    constructor: function(config) {
        this.layerStore = config.layerStore;
        this.defaults = config.defaults;
        GeoExt.tree.LayerContainer.superclass.constructor.apply(this, arguments);
    },

    /**
     * Method: render
     * 
     * Parameters:
     * bulkRender - {Boolean}
     */
    render: function(bulkRender) {
        if (!this.rendered) {
            if(!this.layerStore) {
                this.layerStore = GeoExt.MapPanel.guess().layers;
            }
            this.layerStore.each(function(record) {
                this.addLayerNode(record);
            }, this);
            this.layerStore.on({
                "add": this.onStoreAdd,
                "remove": this.onStoreRemove,
                scope: this
            });
        }
        GeoExt.tree.LayerContainer.superclass.render.call(this, bulkRender);
    },
    
    /**
     * Method: onStoreAdd
     * Listener for the store's add event.
     *
     * Parameters:
     * store - {Ext.data.Store}
     * records - {Array(Ext.data.Record)}
     * index - {Number}
     */
    onStoreAdd: function(store, records, index) {
        if(!this._reordering) {
            var nodeIndex = this.recordIndexToNodeIndex(index);
            for(var i=0; i<records.length; ++i) {
                this.addLayerNode(records[i], nodeIndex);
            }
        }
    },
    
    /**
     * Method: onStoreRemove
     * Listener for the store's remove event.
     *
     * Parameters:
     * store - {Ext.data.Store}
     * record - {Ext.data.Record}
     * index - {Number}
     */
    onStoreRemove: function(store, record, index) {
        if(!this._reordering) {
            this.removeLayerNode(record);
        }
    },

    /**
     * Method: onDestroy
     */
    onDestroy: function() {
        if(this.layerStore) {
            this.layerStore.un("add", this.onStoreAdd, this);
            this.layerStore.un("remove", this.onStoreRemove, this);
        }
        GeoExt.tree.LayerContainer.superclass.onDestroy.apply(this, arguments);
    },
    
    /**
     * Method: recordIndexToNodeIndex
     * Convert a record index into a child node index.
     *
     * Parameters:
     * index - {Number} The record index in the layer store.
     *
     * Returns:
     * {Number} The appropriate child node index for the record.
     */
    recordIndexToNodeIndex: function(index) {
        var store = this.layerStore;
        var count = store.getCount();
        var nodeIndex = -1;
        for(var i=count-1; i>=0; --i) {
            if(store.getAt(i).get("layer").displayInLayerSwitcher) {
                ++nodeIndex;
                if(index === i) {
                    break;
                }
            }
        };
        return nodeIndex;
    },
    
    /**
     * Method: nodeIndexToRecordIndex
     * Convert a child node index to a record index.
     *
     * Parameters:
     * index - {Number} The child node index.
     *
     * Returns:
     * {Number} The appropriate record index for the node.
     */
    nodeIndexToRecordIndex: function(index) {
        var store = this.layerStore;
        var count = store.getCount();
        var nodeIndex = -1;
        for(var i=count-1; i>=0; --i) {
            if(store.getAt(i).get("layer").displayInLayerSwitcher) {
                ++nodeIndex;
                if(index === nodeIndex) {
                    break;
                }
            }
        }
        return i;
    },
    
    /**
     * Method: addLayerNode
     * Adds a child node representing a layer of the map
     * 
     * Parameters:
     * layerRecord - {Ext.data.Record} the layer record to add the layer for
     * index - {Number} Optional index for the new layer.  Default is 0.
     */
    addLayerNode: function(layerRecord, index) {
        index = index || 0;
        var layer = layerRecord.get("layer");
        if (layer.displayInLayerSwitcher === true) {
            var node = new GeoExt.tree.LayerNode(Ext.applyIf({
                iconCls: layer.isBayeLayer ? 'baselayer-icon' : 'layer-icon',
                layer: layer,
                layerStore: this.layerStore
            }, this.defaults));
            var sibling = this.item(index);
            if(sibling) {
                this.insertBefore(node, sibling);
            } else {
                this.appendChild(node);
            }
            node.on("move", this.onChildMove, this);
        }
    },
    
    /**
     * Method: removeLayerNode
     * Removes a child node representing a layer of the map
     * 
     * Parameters:
     * layerRecord - {Ext.data.Record} the layer record to remove the node for
     */
    removeLayerNode: function(layerRecord) {
        var layer = layerRecord.get("layer");
        if (layer.displayInLayerSwitcher == true) {
            var node = this.findChildBy(function(node) {
                return node.layer == layer;
            });
            if(node) {
                node.un("move", this.onChildMove, this);
                node.remove();
            }
    	}
    },
    
    /**
     * Method: onChildMove
     * Listener for child node "move" events.  This updates the order of
     *     records in the store based on new node order if the node has not
     *     changed parents.
     *
     * Parameters:
     * tree - {Ext.data.Tree}
     * node - {Ext.tree.TreeNode}
     * oldParent - {Ext.tree.TreeNode}
     * newParent - {Ext.tree.TreeNode}
     * index {Number}
     */
    onChildMove: function(tree, node, oldParent, newParent, index) {
        if(oldParent === newParent) {
            var newRecordIndex = this.nodeIndexToRecordIndex(index);
            var oldRecordIndex = this.layerStore.findBy(function(record) {
                return record.get("layer") === node.layer;
            });
            // remove the record and re-insert it at the correct index
            var record = this.layerStore.getAt(oldRecordIndex);
            this._reordering = true;
            this.layerStore.remove(record);
            this.layerStore.insert(newRecordIndex, [record]);
            delete this._reordering;
        }
    }
    
});

/**
 * NodeType: gx_layercontainer
 */
Ext.tree.TreePanel.nodeTypes.gx_layercontainer = GeoExt.tree.LayerContainer;
