/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/LayerRecord.js
 * @require OpenLayers/Format/WMTSCapabilities.js
 * @require OpenLayers/Format/WMTSCapabilities/v1_0_0.js
 * @require OpenLayers/Util.js
 * @require OpenLayers/Layer/WMTS.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = WMTSCapabilitiesReader
 *  base_link = `Ext.data.DataReader <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.DataReader>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: WMTSCapabilitiesReader(meta, recordType)
 *  
 *      :param meta: ``Object`` Reader configuration from which:
 *          ``layerOptions`` is an optional object passed as default options
 *          to the ``OpenLayers.Layer.WMTS`` constructor.
 *          ``layerParams`` is an optional set of parameters to pass into the
 *          ``OpenLayers.Layer.WMTS`` constructor.
 *      :param recordType: ``Array | Ext.data.Record`` An array of field
 *          configuration objects or a record object.  Default is
 *          :class:`GeoExt.data.LayerRecord` with the following fields:
 *          name, title, abstract, queryable, opaque, noSubsets, cascaded,
 *          fixedWidth, fixedHeight, minScale, maxScale, prefix, formats,
 *          styles, srs, dimensions, bbox, llbbox, attribution, keywords,
 *          identifiers, authorityURLs, metadataURLs, infoFormats.
 *          The type of these fields is the same as for the matching fields in
 *          the object returned from
 *          ``OpenLayers.Format.WMTSCapabilities::read()``.
 *   
 *      Data reader class to create an array of
 *      :class:`GeoExt.data.LayerRecord` objects from a WMTS GetCapabilities
 *      response.
 */
GeoExt.data.WMTSCapabilitiesReader = function(meta, recordType) {
    meta = meta || {};
    if (!meta.format) {
        meta.format = new OpenLayers.Format.WMTSCapabilities();
    }
    if (typeof recordType !== "function") {
        recordType = GeoExt.data.LayerRecord.create(
            recordType || meta.fields || [
                {name: "name", type: "string", mapping: "identifier"},
                {name: "title", type: "string"},
                {name: "abstract", type: "string"},
                {name: "queryable", type: "boolean"},
                {name: "llbbox", mapping: "bounds", convert: function(v){
                    return [v.left, v.bottom, v.right, v.top];
                }},
                {name: "formats"}, // array
                {name: "infoFormats"}, // array
                {name: "styles"}, // array
                {name: "keywords"} // object
            ]
        );
    }
    GeoExt.data.WMTSCapabilitiesReader.superclass.constructor.call(
        this, meta, recordType
    );
};

Ext.extend(GeoExt.data.WMTSCapabilitiesReader, Ext.data.DataReader, {


    /** private: method[read]
     *  :param request: ``Object`` The XHR object which contains the parsed XML
     *      document.
     *  :return: ``Object`` A data block which is used by an ``Ext.data.Store``
     *      as a cache of ``Ext.data.Record`` objects.
     */
    read: function(request) {
        var data = request.responseXML;
        if (!data || !data.documentElement) {
            data = request.responseText;
        }
        return this.readRecords(data);
    },
    
    /** private: method[imageFormat]
     *  :param layer: ``Object`` The layer's capabilities object.
     *  :return: ``String`` The (supposedly) best mime type for requesting 
     *      tiles.
     */
    imageFormat: function(layer) {
        var formats = layer.formats;
        if (OpenLayers.Util.indexOf(formats, "image/png")>-1) {
            return "image/png";
        }
        if (OpenLayers.Util.indexOf(formats, "image/jpeg")>-1) {
            return "image/jpeg";
        }
        if (OpenLayers.Util.indexOf(formats, "image/png8")>-1) {
            return "image/png8";
        }
        if (OpenLayers.Util.indexOf(formats, "image/gif")>-1) {
            return "image/gif";
        }
        return formats[0];
    },

    /** private: method[readRecords]
     *  :param data: ``DOMElement | String | Object`` A document element or XHR
     *      response string.  As an alternative to fetching capabilities data
     *      from a remote source, an object representing the capabilities can
     *      be provided given that the structure mirrors that returned from the
     *      capabilities parser.
     *  :return: ``Object`` A data block which is used by an ``Ext.data.Store``
     *      as a cache of ``Ext.data.Record`` objects.
     *  
     *  Create a data block containing Ext.data.Records from an XML document.
     */
    readRecords: function(data) {
        if (typeof data === "string" || data.nodeType) {
            data = this.meta.format.read(data);
        }
        if (!!data.error) {
            throw new Ext.data.DataReader.Error("invalid-response", data.error);
        }
        var operationsMetadata = data.operationsMetadata,
            layers = data.contents && data.contents.layers;
        
        var records = [];

        if (layers) {
            var fields = this.recordType.prototype.fields; 
            var layer, values, options, params, field, v, matrixSet;

            for (var i=0, lenI=layers.length; i<lenI; i++){
                layer = layers[i];
                if (layer.identifier) {
                    values = {};
                    for (var j=0, lenJ=fields.length; j<lenJ; j++) {
                        field = fields.items[j];
                        v = layer[field.mapping || field.name] ||
                        field.defaultValue;
                        v = field.convert(v);
                        values[field.name] = v;
                    }
                    values.queryable = !!layer.infoFormats;

                    try {
                        values.layer = this.meta.format.createLayer(data, Ext.apply({
                            layer: layer.identifier,
                            name: layer.title || layer.identifier,
                            format: this.imageFormat(layer)
                        }, this.meta.layerOptions || {}));

                        records.push(new this.recordType(values, values.layer.id));
                    } catch (e) {
                        // ignore silently (eg: no matching CRS)
                    }
                }
            }
        }

        return {
            totalRecords: records.length,
            success: true,
            records: records
        };

    }
});