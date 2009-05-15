JavaScript Toolkit for Rich Web Mapping Applications
====================================================

GeoExt brings together the geospatial know how of
`OpenLayers <http://openlayers.org>`_ with the user interface savvy of `Ext JS
<http://extjs.com>`_ to help you build powerful desktop style GIS apps on
the web with JavaScript.

`Documentation <./docs.html>`_ | 
`Demos <./examples/index.html>`_ | 
`Download <./downloads.html>`_ | 
`Development <http://www.geoext.org/trac/geoext/>`_

Using GeoExt
------------

See GeoExt in action.

.. code-block:: javascript

    new Ext.Window({
        title: "GeoExt",
        height: 400, width: 600,
        items: [{
            xtype: "gx_mappanel",
            layers: [new OpenLayers.Layer.WMS(
                "bluemarble", "http://sigma.openplans.org/geoserver/wms",
                {layers: 'bluemarble'}
            )],
            extent: [-5, 35, 15, 55]
        }]
    }).show();

Learn more about using GeoExt in your application by reading the
:doc:`documentation <docs>`.


GeoExt is Open Source
---------------------

GeoExt is available under the BSD license and is supported by a growing
community of individuals, businesses and organizations.


.. toctree::
    :hidden:

    docs
    tutorials/index
    primers/index
    developer/index
    lib/index
    examples/index
    downloads
