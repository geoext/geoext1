/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = ColorMapStore
 *  base_link = `Ext.data.Store <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.Store>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: StyleReader
 *
 *  A smart reader that creates records for client-side rendered legends. If
 *  its store is configured with an ``OpenLayers.Style2`` instance as ``data``,
 *  each record will represent a Rule of the Style, and the store will be
 *  configured with ``symbolizers`` (Array of ``OpenLayers.Symbolizer``),
 *  ``filter`` (``OpenLayers.Filter``), ``label`` (String, the rule's title),
 *  ``name`` (String), ``description`` (String), ``elseFilter`` (Boolean),
 *  ``minScaleDenominator`` (Number) and ``maxScaleDenominator`` (Number)
 *  fields. If the store's ``data`` is an ``OpenLayers.Symbolizer.Raster``
 *  instance, records will represent its ColorMap entries, and the available
 *  fields will only be ``symbolizers`` (object literal with ``color`` and
 *  ``opacity`` properties from the ColorMapEntry, and stroke set to false),
 *  ``filter`` (String, the ColorMapEntry's quantity) and ``label`` (String).
 *
 *  The store populated by this reader is synchronized with the underlying data
 *  object. To write back changes to the Style or Symbolizer object, call
 *  ``commitChanges``on the store.
 */

/** api: example
 *  Sample code to create a store that reads from an ``OpenLayers.Style2``
 *  object:
 *  
 *  .. code-block:: javascript
 *
 *      var store = new Ext.data.Store({
 *          reader: new GeoExt.data.StyleReader(),
 *          data: myStyle // OpenLayers.Style2 instance
 *      });
 */
GeoExt.data.StyleReader = Ext.extend(Ext.data.JsonReader, {
    
    /** private: property[raw]
     *  ``Object`` The ``data`` object that the store was configured with. Will
     *  be updated with changes when ``commitChanges`` is called on the store.
     */
    
    /** private: method[metaChange]
     *  Override to intercept the commit method of the record prototype used
     *  by the reader, so it triggers the ``storeToData`` method that writes
     *  changes back to the underlying raw data.
     */
    onMetaChange: function() {
        GeoExt.data.StyleReader.superclass.onMetaChange.apply(this, arguments);
        this.recordType.prototype.commit = Ext.createInterceptor(this.recordType.prototype.commit, function() {
            var reader = this.store.reader;
            reader.raw[reader.meta.root] = reader.meta.storeToData(this.store);
        });
    },
    
    /** private: method[readRecords]
     */
    readRecords: function(o) {
        var type, rows;
        if (o instanceof OpenLayers.Symbolizer.Raster) {
            type = "colorMap";
        } else {
            type = "rules";
        }
        this.raw = o;
        var data = {metaData: GeoExt.data.StyleReader.metaData[type]};
        data[type] = o[type];
        return GeoExt.data.StyleReader.superclass.readRecords.call(this, data);
    }
});

/** private: constant[metaData]
 *  ``Object`` MetaData configurations for raster and vector styles.
 */
GeoExt.data.StyleReader.metaData = {
    colorMap: {
        root: "colorMap",
        idProperty: "filter",
        fields: [
            {name: "symbolizers", mapping: function(v) {
                return {
                    fillColor: v.color,
                    fillOpacity: v.opacity,
                    stroke: false
                };
            }},
            {name: "filter", mapping: "quantity"},
            {name: "label", mapping: function(v) {
                // fill label with quantity if empty
                return v.label || v.quantity;
            }}
        ],
        storeToData: function(store) {
            // ColorMap entries always need to be sorted in ascending order
            store.sort("filter");
            var colorMap = [];
            store.each(function(rec) {
                var symbolizer = rec.get("symbolizers"),
                    quantity = rec.get("filter"),
                    label = rec.get("label"),
                    labelModified = rec.isModified("label");
                if ((!rec.json.label && !labelModified && rec.isModified("filter")) || (labelModified && !label)) {
                    // fill label with quanity if empty
                    rec.set("label", quantity);
                }
                colorMap.push(Ext.apply(rec.json, {
                    color: symbolizer.fillColor,
                    label: typeof label == "string" ? label : undefined,
                    opacity: symbolizer.opacity,
                    quantity: quantity
                }));
            });
            return colorMap;
        }
    },
    rules: {
        root: "rules",
        fields: [
            "symbolizers",
            "filter",
            {name: "label", mapping: "title"},
            "name", "description", "elseFilter",
            "minScaleDenominator", "maxScaleDenominator"
        ],
        storeToData: function(store) {
            var rules = [];
            store.each(function(rec) {
                var filter = rec.get("filter");
                if (typeof filter === "string") {
                    filter = filter ? OpenLayers.Format.CQL.prototype.read(filter) : null;
                }
                rules.push(Ext.apply(rec.json, {
                    symbolizers: rec.get("symbolizers"),
                    filter: filter,
                    title: rec.get("label"),
                    name: rec.get("name"),
                    description: rec.get("description"),
                    elseFilter: rec.get("elseFilter"),
                    minScaleDenominator: rec.get("minScaleDenominator"),
                    maxScaleDenominator: rec.get("maxScaleDenominator")
                }));
            });
            return rules;
        }
    }
};