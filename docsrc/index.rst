JavaScript Toolkit for Rich Web Mapping Applications
====================================================

GeoExt brings together the geospatial know how of
`OpenLayers <http://openlayers.org>`_ with the user interface savvy of `Ext JS
<http://extjs.com>`_ to help you build powerful desktop style GIS apps on
the web with JavaScript.

`Documentation <./docs.html>`_ | 
`Examples <./examples/index.html>`_ | 
`Download <./downloads.html>`_ | 
`Development <http://www.geoext.org/trac/geoext/>`_

Using GeoExt
------------

See GeoExt in action.

.. cssclass:: execute

.. code-block:: javascript

    new Ext.Window({
        title: "GeoExt in Action",
        height: 280, width: 450, layout: "fit",
        items: [{
            xtype: "gx_mappanel",
            layers: [new OpenLayers.Layer.WMS(
                "Global Imagery", "http://demo.opengeo.org/geoserver/wms",
                {layers: 'bluemarble'}
            )],
            zoom: 1
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
