
.. currentmodule:: GeoExt

:class:`GeoExt.MapPanel`
=================================


.. cssclass:: meta


Extends
    * `Ext.Panel <http://extjs.com/deploy/dev/docs/?class=Ext.Panel>`_
    



xtype
    ``gx_mappanel``



.. class:: MapPanel(config)

    Create a panel container for a map.



Example Use
-----------

Sample code to create a panel with a new map:

.. code-block:: javascript

    var mapPanel = new GeoExt.MapPanel({
        border: false,
        renderTo: "div-id",
        map: {
            maxExtent: new OpenLayers.Bounds(-90, -45, 90, 45)
        }
    });

Sample code to create a map panel with a bottom toolbar in a Window:

.. code-block:: javascript

    var win = new Ext.Window({
        title: "My Map",
        items: [{
            xtype: "gx_mappanel",
            bbar: new Ext.Toolbar()
        }]
    });

    


Config Options
--------------

Configuration properties in addition to
those listed for `Ext.Panel <http://extjs.com/deploy/dev/docs/?class=Ext.Panel>`_.


.. describe:: center

    ``OpenLayers.LonLat or Array(Number)``  A location for the map center.  If
    an array is provided, the first two items should represent x & y coordinates.

.. describe:: extent

    ``OpenLayers.Bounds or Array(Number)``  An initial extent for the map (used
    if center and zoom are not provided.  If an array, the first four items
    should be minx, miny, maxx, maxy.

.. describe:: layers

    ``GeoExt.data.LayerStore or GeoExt.data.GroupingStore or Array(OpenLayers.Layer)``
    A store holding records. If not provided, an empty
    :class:`GeoExt.data.LayerStore` will be created.

.. describe:: map

    ``OpenLayers.Map or Object``  A configured map or a configuration object
    for the map constructor.  A configured map will be available after
    construction through the :attr:`map` property.

.. describe:: zoom

    ``Number``  An initial zoom level for the map.




Public Properties
-----------------

Public properties in addition to those
listed for `Ext.Panel <http://extjs.com/deploy/dev/docs/?class=Ext.Panel>`_.


.. attribute:: MapPanel.layers

    :class:`GeoExt.data.LayerStore`  A store containing
    :class:`GeoExt.data.LayerRecord` objects.

.. attribute:: MapPanel.map

    ``OpenLayers.Map``  A configured map object.





