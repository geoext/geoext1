
.. currentmodule:: GeoExt

:class:`GeoExt.MapPanel2`
=================================


.. cssclass:: meta


Extends
    * `Ext.Panel <http://extjs.com/deploy/dev/docs/?class=Ext.Panel>`_
    * :class:`GeoExt.MapPanel`



xtype
    ``gx_mappanel2``



.. class:: MapPanel2(config)

    This is the content for 2.



Example Use
-----------

Pretend some example goes here.

    


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

.. describe:: foo

    This foo comes from MapPanel2

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


.. attribute:: MapPanel2.layers

    :class:`GeoExt.data.LayerStore`  A store containing
    :class:`GeoExt.data.LayerRecord` objects.

.. attribute:: MapPanel2.map

    ``OpenLayers.Map``  A configured map object.






Events
------

Events in addition to those
listed for `Ext.Panel <http://extjs.com/deploy/dev/docs/?class=Ext.Panel>`_.


.. describe:: bar

    This class might have some custom events.

