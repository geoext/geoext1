.. currentmodule:: GeoExt.data

:class:`GeoExt.data.LayerStore`
===============================

.. class:: LayerStore

    A store that synchronizes the layers array of an ``OpenLayers.Map``
    with a store holding :class:`GeoExt.data.LayerRecord` entries.

    .. rubric:: Extends
    
    * `Ext.data.Store`_

.. _`Ext.data.Store`: http://extjs.com/deploy/dev/docs/?class=Ext.data.Store
    

Example Use
-----------

Sample code to create a store that synchronizes layers with a map.

.. code-block:: javascript

    var store = new GeoExt.data.LayerStore({
        map: myMap,
        layers: myLayers
    });

Config Options
--------------

Configuration properties in addition to those listed for `Ext.data.Store`_.
    
.. describe:: map

    ``OpenLayers.Map``  Map to synchronize the store with.

.. describe:: layers

    ``Array(OpenLayers.Layer)``  Layers that will be added to the
    store (and the map if provided).

.. describe:: recordType

    ``Ext.data.Record``  Custom record type to use.  If not provided, the
    :class:`GeoExt.data.LayerRecord` constructor will be used to create records.
    
.. describe:: initDir

    ``Number``  Bitfields specifying the direction to use for the
    initial sync between the map and the store, if set to 0 then no
    initial sync is done. Defaults to
    ``GeoExt.data.LayerStore.MAP_TO_STORE|GeoExt.data.LayerStore.STORE_TO_MAP``.
    
