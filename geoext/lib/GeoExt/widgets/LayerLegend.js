/**
 * Copyright (c) 2008-2010 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt
 *  class = LayerLegend
 *  base_link = `Ext.Container <http://extjs.com/deploy/dev/docs/?class=Ext.Container>`_
 */

Ext.namespace('GeoExt');

/** api: constructor
 *  .. class:: LayerLegend(config)
 *
 *      Base class for components of :class:`GeoExt.LegendPanel`.
 */
GeoExt.LayerLegend = Ext.extend(Ext.Container, {

    /** api: config[layerRecord]
     *  :class:`GeoExt.data.LayerRecord`  The layer record for the legend
     */
    layerRecord: null,

    /** api: config[showTitle]
     *  ``Boolean``
     *  Whether or not to show the title of a layer. This can be overridden
     *  on the LayerStore record using the hideTitle property.
     */
    showTitle: true,

    /** api: config[labelCls]
     *  ``String``
     *  Optional css class to use for the layer title labels.
     */
    labelCls: null,

    /** private: method[initComponent]
     */
    initComponent: function() {
        GeoExt.LayerLegend.superclass.initComponent.call(this);
        this.autoEl = {};
        this.add({
            xtype: "label",
            text: this.getLayerTitle(this.layerRecord),
            cls: 'x-form-item x-form-item-label' +
                (this.labelCls ? ' ' + this.labelCls : '')
        });
    },

    /** private: method[update]
     *  Updates the legend.
     */
    update: function() {
        var title = this.getLayerTitle(this.layerRecord);
        if (this.items.get(0).text !== title) {
            // we need to update the title
            this.items.get(0).setText(title);
        }
    },
    
    /** private: method[getLayerTitle]
     *  :arg record: :class:GeoExt.data.LayerRecord
     *  :returns: ``String``
     *
     *  Get a title for the layer.  If the record doesn't have a title, use the 
     *  name.
     */
    getLayerTitle: function(record) {
        var title = "";
        if (this.showTitle && !record.get("hideTitle")) {
            title = record.get("title") || record.get("name") || record.get("layer").name || "";
        }
        return title;
    }

});

/** class: method[getTypes]
 *  :param layerRecord: class:`GeoExt.data.LayerRecord` A layer record to get
 *      legend types for. If not provided, all registered types will be
 *      returned.
 *  :param preferredTypes: ``Array(String)`` Types that should be considered.
 *      first. If not provided, all legend types will be returned in the order
 *      they were registered.
 *  :return: ``Array(String)`` xtypes of legend types that can be used with
 *      the provided ``layerRecord``.
 *  
 *  Gets an array of legend xtypes that support the provided layer record,
 *  with optionally provided preferred types listed first.
 */
GeoExt.LayerLegend.getTypes = function(layerRecord, preferredTypes) {
    var types = (preferredTypes || []).concat();
    var goodTypes = [];
    for(var type in GeoExt.LayerLegend.types) {
        if(GeoExt.LayerLegend.types[type].supports(layerRecord)) {
            // add to goodTypes if not preferred
            types.indexOf(type) == -1 && goodTypes.push(type);
        } else {
            // preferred, but not supported
            types.remove(type);
        }
    }
    // take the remaining preferred types, and add other good types 
    return types.concat(goodTypes);
};
    
/** private: method[supports]
 *  :param layerRecord: :class:`GeoExt.data.LayerRecord` The layer record
 *      to check support for.
 *  :return: ``Boolean`` true if this legend type supports the layer
 *      record.
 *  
 *  Checks whether this legend type supports the provided layerRecord.
 */
GeoExt.LayerLegend.supports = function(layerRecord) {
    // to be implemented by subclasses
};

/** class: constant[GeoExt.LayerLegend.types]
 *  An object containing a name-class mapping of LayerLegend subclasses.
 *  To register as LayerLegend, a subclass should add itself to this object:
 *  
 *  .. code-block:: javascript
 *  
 *      GeoExt.GetLegendGraphicLegend = Ext.extend(GeoExt.LayerLegend, {
 *      });
 *      
 *      GeoExt.LayerLegend.types["getlegendgraphic"] =
 *          GeoExt.GetLegendGraphicLegend;
 */
GeoExt.LayerLegend.types = {};
