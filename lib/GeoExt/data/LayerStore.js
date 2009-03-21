/* Copyright (C) 2008-2009 The Open Source Geospatial Foundation ¹
 * Published under the BSD license.
 * See http://geoext.org/svn/geoext/core/trunk/license.txt for the full text
 * of the license.
 * 
 * ¹ pending approval */

Ext.namespace("GeoExt.data");

/**
 * Class: LayerStoreMixin
 * A store that synchronizes a layers array of an {OpenLayers.Map} with a
 * layer store holding {<GeoExt.data.LayerRecord>} entries.
 * 
 * This class can not be instantiated directly. Instead, it is meant to extend
 * {Ext.data.Store} or a subclass of it:
 * (start code)
 * var store = new (Ext.extend(Ext.data.Store, GeoExt.data.LayerStoreMixin))({
 *     map: myMap,
 *     layers: myLayers
 * });
 * (end)
 * 
 * For convenience, a {GeoExt.data.LayerStore} class is available as a
 * shortcut to the Ext.extend sequence in the above code snippet. The above
 * is equivalent to:
 * (start code)
 * var store = new GeoExt.data.LayerStore({
 *     map: myMap,
 *     layers: myLayers
 * })
 * (end)
 */
GeoExt.data.LayerStoreMixin = {
    /**
     * APIProperty: map
     * {OpenLayers.Map} Map that this store will be in sync with.
     */
    map: null,
    
    /**
     * APIProperty: recordType
     * {<GeoExt.data.LayerRecord>} type of the layer records used by this
     *     store.
     */
    recordType: null,

    /**
     * Constructor: GeoExt.LayerStore
     * 
     * Parameters:
     * config - {Object}
     * 
     * Valid config options:
     * map - {OpenLayers.Map|<GeoExt.MapPanel>} map to sync the layer store
     *     with.
     * layers - {Array(OpenLayers.Layer)} Layers that will be added to the
     *     layer store (and the map, because we are already syncing).
     * recordType - {<GeoExt.data.LayerRecord>} If provided, a custom layer
     *     record type with additional fields will be used. Default fields for
     *     every layer record are {OpenLayers.Layer} layer and {String} title.
     */
    constructor: function(config) {
        arguments.callee.superclass.constructor.apply(this, arguments);
        config = config || {};
        this.recordType = config.recordType || GeoExt.data.LayerRecord.create();
        var map = config.map instanceof GeoExt.MapPanel ?
            config.map.map : config.map;
        if(map) {
            // create a snapshop of the map's layers
            var layers = map.layers;
            var layer;
            // walk through the layers snapshot and add layers to the store
            for(var i=0; i<layers.length; ++i) {
                layer = layers[i];
                this.add(new this.recordType(layer));
            }

            this.setMap(map);
            config.layers && map.addLayers(config.layers);
        }
    },
    
    /**
     * APIMethod: setMap
     * 
     * Parameters:
     * map - {OpenLayers.Map}
     */
    setMap: function(map) {
        this.map = map;
        map.events.on({
            "addlayer": this.onAddLayer,
            "removelayer": this.onRemoveLayer,
            scope: this
        });
        this.on({
            "add": this.onAdd,
            "remove": this.onRemove,
            scope: this
        });
    },
    
    /**
     * Method: onAddLayer
     * Handler for a map's addlayer event
     * 
     * Parameters:
     * evt - {Object}
     */
    onAddLayer: function(evt) {
        var layer = evt.layer;
        this._adding = true;
        this.add(new this.recordType(layer));
        delete this._adding;
    },
    
    /**
     * Method: onRemoveLayer
     * Handler for a map's removelayer event
     * 
     * Parameters:
     * evt - {Object}
     */
    onRemoveLayer: function(evt){
        var layer = evt.layer;
        this._removing = true;
        this.remove(this.getById(layer.id));
        delete this._removing;
    },
    
    /**
     * Method: onAdd
     * Handler for a store's add event
     * 
     * Parameters:
     * store - {<Ext.data.Store>}
     * records - {Array(Ext.data.Record)}
     * index - {Number}
     */
    onAdd: function(store, records, index) {
        if(!this._adding) {
            for(var i=0; i<records.length; ++i) {
                this.map.addLayer(records[i].get("layer"));
            }
        }
    },
    
    /**
     * Method: onRemove
     * Handler for a store's remove event
     * 
     * Parameters:
     * store - {<Ext.data.Store>}
     * records - {Array(Ext.data.Record)}
     * index - {Number}
     */
    onRemove: function(store, record, index){
        if(!this._removing) {
            this.map.removeLayer(record.get("layer"));
        }
    }
};

/**
 * Class: GeoExt.data.LayerStore
 * Default implementation of an {Ext.data.Store} enhanced with
 * {<GeoExt.data.LayerStoreMixin>}
 */
GeoExt.data.LayerStore = Ext.extend(
    Ext.data.Store,
    GeoExt.data.LayerStoreMixin
);
