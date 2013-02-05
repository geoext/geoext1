/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/data/WCSDescribeCoverageReader.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = WCSDescribeCoverageStore
 *  base_link = `Ext.data.Store <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.Store>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: WCSDescribeCoverageStore
 *  
 *      Small helper class to make creating stores for remote WCS metadata
 *      easier.  The store is pre-configured with a built-in
 *      ``Ext.data.HttpProxy`` and :class:`GeoExt.data.WCSDescribeCoverageReader`.
 *      The proxy is configured to allow caching and issues requests via GET.
 */

/** api: config[format]
 *  ``OpenLayers.Format``
 *  A parser for transforming the XHR response into an array of objects
 *  representing attributes.  Defaults to an ``OpenLayers.Format.WCSDescribeCoverage``
 *  parser.
 */

/** api: config[fields]
 *  ``Array | Function``
 *  Either an Array of field definition objects as passed to
 *  ``Ext.data.Record.create``, or a record constructor created using
 *  ``Ext.data.Record.create``.  Defaults to ``["name", "type"]``. 
 */

GeoExt.data.WCSDescribeCoverageStore = function(c) {
    c = c || {};
    GeoExt.data.WCSDescribeCoverageStore.superclass.constructor.call(
        this,
        Ext.apply(c, {
            proxy: c.proxy || (!c.data ?
                new Ext.data.HttpProxy({url: c.url, disableCaching: false, method: "GET"}) :
                undefined
            ),
            reader: new GeoExt.data.WCSDescribeCoverageReader(
                c, c.fields
            )
        })
    );
};
Ext.extend(GeoExt.data.WCSDescribeCoverageStore, Ext.data.Store);
