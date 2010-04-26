/**
 * Copyright (c) 2008-2010 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/AttributeReader.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = AttributeStore
 *  base_link = `Ext.data.Store <http://extjs.com/deploy/dev/docs/?class=Ext.data.Store>`_
 */
Ext.namespace("GeoExt.data");

/**
 * Function: GeoExt.data.AttributeStoreMixin
 *
 * This function generates a mixin object to be used when extending an Ext.data.Store
 * to create an attribute store.
 *
 * (start code)
 * var AttrStore = Ext.extend(Ext.data.Store, GeoExt.data.AttributeStoreMixin);
 * var store = new AttrStore();
 * (end)
 *
 * For convenience, a GeoExt.data.AttributeStore class is available as a
 * shortcut to the Ext.extend sequence in the above code snippet. The above
 * is equivalent to:
 * (start code)
 * var store = new GeoExt.data.AttributeStore();
 * (end)
 */
GeoExt.data.AttributeStoreMixin = function() {
    return {
        /** private */
        constructor: function(c) {
            c = c || {};
            arguments.callee.superclass.constructor.call(
                this,
                Ext.apply(c, {
                    proxy: c.proxy || (!c.data ?
                        new Ext.data.HttpProxy({url: c.url, disableCaching: false, method: "GET"}) :
                        undefined
                    ),
                    reader: new GeoExt.data.AttributeReader(
                        c, c.fields || ["name", "type", "restriction"]
                    )
                })
            );
        }
    };
};

/** api: constructor
 *  .. class:: AttributeStore(config)
 *  
 *      Small helper class to make creating stores for remotely-loaded attributes
 *      data easier. AttributeStore is pre-configured with a built-in
 *      ``Ext.data.HttpProxy`` and :class:`GeoExt.data.AttributeReader`.  The
 *      HttpProxy is configured to allow caching (disableCaching: false) and
 *      uses GET. If you require some other proxy/reader combination then you'll
 *      have to configure this with your own proxy or create a basic
 *      ``Ext.data.Store`` and configure as needed.
 */

/** api: config[format]
 *  ``OpenLayers.Format``
 *  A parser for transforming the XHR response into an array of objects
 *  representing attributes.  Defaults to an
 *  ``OpenLayers.Format.WFSDescribeFeatureType`` parser.
 */

/** api: config[fields]
 *  ``Array or Function``
 *  Either an array of field definition objects as passed to
 *  ``Ext.data.Record.create``, or a record constructor created using
 *  ``Ext.data.Record.create``.  Defaults to ``["name", "type", "restriction"]``.
 */
GeoExt.data.AttributeStore = Ext.extend(
    Ext.data.Store,
    GeoExt.data.AttributeStoreMixin()
);
