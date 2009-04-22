.. currentmodule:: GeoExt.data

:class:`GeoExt.data.LayerReader`
================================

.. class:: LayerReader

    Data reader class to create an array of :class:`GeoExt.data.LayerRecord`
    objects from an array of ``OpenLayers.Layer`` objects for use in a
    :class:`GeoExt.data.LayerStore`.

    .. rubric:: Extends
    
    * `Ext.data.DataReader`_

.. _`Ext.data.DataReader`: http://extjs.com/deploy/dev/docs/?class=Ext.data.DataReader
    

Example Use
-----------

Sample code to create a layer reader and access records:

.. code-block:: javascript

    var reader = new GeoExt.data.LayerReader();
    var data = reader.readRecords(map.layers);
    var numRecords = layerData.totalRecords;
    var records = layerData.records;
