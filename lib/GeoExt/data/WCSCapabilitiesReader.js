/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Format/WCSCapabilities.js
 * @require OpenLayers/Format/WCSCapabilities/v1_0_0.js
 * @require OpenLayers/Format/WCSCapabilities/v1_1_0.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = WCSSCapabilitiesReader
 *  base_link = `Ext.data.DataReader <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.DataReader>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: WCSCapabilitiesReader(meta, recordType)
 *  
 *      :param meta: ``Object`` Reader configuration from which:
 *          ``fields`` is a list of fields to be extracted from the WCS GetCapabilities request.
 *      :param recordType: ``Array | Ext.data.Record`` An array of field
 *          configuration objects or a record object.  Default is
 *          :class:`GeoExt.data.LayerRecord`.
 *   
 *      Data reader class to create an array of
 *      :class:`Ext.data.Record` objects from a WCS GetCapabilities
 *      response.
 */
GeoExt.data.WCSCapabilitiesReader = function(meta, recordType) {
    meta = meta || {};
    if(!meta.format) {
        meta.format = new OpenLayers.Format.WCSCapabilities();
    } 
    // Create some default items if recordType is not specified
    if(!(typeof recordType === "function")) {
        fields = recordType || meta.fields || [
                {name: "title", type: "string"},
                {name: "abstract", type: "string"}
            ];

        // Make sure we always have an name attribute;
        // this will be needed by readRecords.
        fields.push({name: "name", type: "string", mapping: "identifier"}); 
        recordType = Ext.data.Record.create(fields);
    }

    GeoExt.data.WCSCapabilitiesReader.superclass.constructor.call(
        this, meta, recordType
    );
};

Ext.extend(GeoExt.data.WCSCapabilitiesReader, Ext.data.DataReader, {

    /** private: method[read]
     *  :param request: ``Object`` The XHR object which contains the parsed XML
     *      document.
     *  :return: ``Object`` A data block which is used by an ``Ext.data.Store``
     *      as a cache of ``Ext.data.Record`` objects.
     */
    read: function(request) {
        var data = request.responseXML;
        if(!data || !data.documentElement) {
            data = request.responseText;
        }
        return this.readRecords(data);
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
        if(typeof data === "string" || data.nodeType) {
            data = this.meta.format.read(data);
        }

        var contents = data.contentMetadata;
        var fields = this.recordType.prototype.fields;

        var coverageSummary, values, field, v;

        var records = [];

        for(var i=0, lenI=contents.length; i<lenI; i++) {
            coverageSummary = contents[i];
            var name = coverageSummary.identifier;

            if(name) {
                values = {};

                for(var j=0, lenJ=fields.length; j<lenJ; j++) {
                    field = fields.items[j];
                    v = coverageSummary[field.mapping || field.name] ||
                        field.defaultValue;
                    v = field.convert(v);
                    values[field.name] = v;
                }

                records.push(new this.recordType(values, name));
            }
        }
        return {
            totalRecords: records.length,
            success: true,
            records: records
        };
    }
});