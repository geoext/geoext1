/* Copyright (C) 2008-2009 The Open Source Geospatial Foundation ¹
 * Published under the BSD license.
 * See http://geoext.org/svn/geoext/core/trunk/license.txt for the full text
 * of the license.
 * 
 * ¹ pending approval */

Ext.namespace("GeoExt.data");

/**
 * Class: GeoExt.data.LayerRecord
 * A subclass of {Ext.data.Record} which provides a special record that
 * represents an {OpenLayers.Layer}. This record will always have at least a
 * layer and a title field in its data. The id of this record will be the same
 * as the id of the layer it represents.
 * 
 * Inherits from
 * - {Ext.data.Record}
 */
GeoExt.data.LayerRecord = Ext.extend(Ext.data.Record, {
    
    /**
     * Constructor: GeoExt.data.LayerRecord
     * This constructor should not be used directly. Instead, the create method of
     * this class should be used to create a constructor. The parameters are the
     * same.
     * 
     * Parameters:
     * layer - {OpenLayers.Layer}
     * data - {Object} additional values, keyed by field name
     */
    constructor: function(layer, data) {
        this.data = Ext.applyIf({
            title: layer.name,
            layer: layer
        }, data);
        this.id = layer.id;
    }
});

/**
 * APIFunction: GeoExt.data.LayerRecord.create
 * Creates a constructor for a LayerRecord, optionally with additional
 * fields.
 * 
 * Parameters:
 * fieldDefinition - {Array} Field definition as in {Ext.data.Record.create}.
 *     Can be omitted if no additional fields are required (records will
 *     always have a {OpenLayers.Layer} layer and a {String} title field).
 */
GeoExt.data.LayerRecord.create = function(fieldDefinition) {
    var o = [
        {name: "layer"},
        {name: "title"}
    ].concat(fieldDefinition);

    var f = Ext.extend(GeoExt.data.LayerRecord, {});
    var p = f.prototype;
    p.fields = new Ext.util.MixedCollection(false, function(field){
        return field.name;
    });
    for(var i = 0, len = o.length; i < len; i++){
        p.fields.add(new Ext.data.Field(o[i]));
    }
    f.getField = function(name){
        return p.fields.get(name);
    };
    return f;
}
