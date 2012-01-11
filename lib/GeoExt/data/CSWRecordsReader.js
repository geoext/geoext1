/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Format/CSWGetRecords/v2_0_2.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = CSWRecordsReader
 *  base_link = `Ext.data.JsonReader <http://extjs.com/deploy/dev/docs/?class=Ext.data.JsonReader>`_
 */

Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: CSWRecordsReader(meta, recordType)
 *  
 *      :param meta: ``Object`` Reader configuration.
 *      :param recordType: ``Array | Ext.data.Record`` An array of field
 *          configuration objects or a record object.  Default is
 *          :class:`Ext.data.Record`.
 *   
 *      Data reader class to create an array of records from a CSW
 *      GetRecords response.
 */
GeoExt.data.CSWRecordsReader = function(meta, recordType) {
    meta = meta || {};
    if(!meta.format) {
        meta.format = new OpenLayers.Format.CSWGetRecords();
    }
    if(!meta.root) {
        meta.root = 'records';
    }
    GeoExt.data.CSWRecordsReader.superclass.constructor.call(
        this, meta, recordType
    );
};

Ext.extend(GeoExt.data.CSWRecordsReader, Ext.data.JsonReader, {

    /** private: property[raw]
     *  ``Object`` The raw response from the OpenLayers GetRecords parser.
     */

    /** private: method[read]
     *  :param response: ``OpenLayers.Protocol.Response`` The OpenLayers protocol 
     *      response as returned by the protocol read method. 
     *  :return: ``Object`` A data block which is used by an
     *      ``Ext.data.Store`` as a cache of ``Ext.data.Record``
     *      objects.
     */
    read: function(response) {
        // if we use a ProtocolProxy configured with OpenLayers.Protocol.CSW
        // response.data will already contain the parsed result
        var data = response.data;
        if (!data) {
            data = response.responseXML;
            if(!data || !data.documentElement) {
                data = response.responseText;
            }
        }
        return this.readRecords(data);
    },

    /** private: method[readRecords]
     *  :param data: ``DOMElement | String | Object`` A document
     *      element or XHR response string.
     *  :return: ``Object`` A data block which is used by an
     *      ``Ext.data.Store`` as a cache of ``Ext.data.Record``
     *      objects.
     */
    readRecords: function(data) {
        if(typeof data === "string" || data.nodeType) {
            data = this.meta.format.read(data);
        }
        this.raw = data;
        var result = GeoExt.data.CSWRecordsReader.superclass.readRecords.call(
            this, data
        );
        result.totalRecords = data.SearchResults.numberOfRecordsMatched;
        return result;
    }
});
