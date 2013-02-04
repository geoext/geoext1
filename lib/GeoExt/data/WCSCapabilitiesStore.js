/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/WCSCapabilitiesReader.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = WCSCapabilitiesStore
 *  base_link = `Ext.data.Store <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.Store>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: WCSCapabilitiesStore
 *  
 *      Small helper class to make creating stores for remote WCS metadata
 *      easier.  The store is pre-configured with a built-in
 *      ``Ext.data.HttpProxy`` and :class:`GeoExt.data.WCSCapabilitiesReader`.
 *      The proxy is configured to allow caching and issues requests via GET.
 */

/** api: config[format]
 *  ``OpenLayers.Format``
 *  A parser for transforming the XHR response into an array of objects
 *  representing attributes.  Defaults to an ``OpenLayers.Format.WCSCapabilities``
 *  parser.
 */

/** api: config[fields]
 *  ``Array | Function``
 *  Either an Array of field definition objects as passed to
 *  ``Ext.data.Record.create``, or a record constructor created using
 *  ``Ext.data.Record.create``.  Defaults to ``["name", "type"]``. 
 */

GeoExt.data.WCSCapabilitiesStore = function(c) {
    c = c || {};
    GeoExt.data.WCSCapabilitiesStore.superclass.constructor.call(
        this,
        Ext.apply(c, {
            proxy: c.proxy || (!c.data ?
                new Ext.data.HttpProxy({url: c.url, disableCaching: false, method: "GET"}) :
                undefined
            ),
            reader: new GeoExt.data.WCSCapabilitiesReader(
                c, c.fields
            )
        })
    );
};
Ext.extend(GeoExt.data.WCSCapabilitiesStore, Ext.data.Store);
