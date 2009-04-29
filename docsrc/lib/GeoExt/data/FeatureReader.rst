.. currentmodule:: GeoExt.data

:class:`GeoExt.data.FeatureReader`
==================================

.. class:: FeatureReader

    Data reader class to create an array of :class:`GeoExt.data.FeatureRecord`
    objects from an ``OpenLayers.Protocol.Response`` object for use in a
    :class:`GeoExt.data.FeatureStore` object.

    .. rubric:: Extends
    
    * `Ext.data.DataReader`_

.. _`Ext.data.DataReader`: http://extjs.com/deploy/dev/docs/?class=Ext.data.DataReader
    
    
Example Use
-----------

Sample code to create a store that uses a feature reader:

.. code-block:: javascript

    var store = new Ext.data.Store({
        reader: new GeoExt.data.FeatureReader({}, [
            {name: 'name', type: 'string'},
            {name: 'elevation', type: 'float'}
        ])
    });


Public Methods
--------------

Public methods in addition to those listed for `Ext.data.DataReader`_.

.. method:: FeatureReader.readRecords(features)

    :param features: ``Array(OpenLayers.Feature.Vector)`` List of features for
        creating records

    :return: ``Object``  An object with ``records`` and ``totalRecords`` properties.
    
    Create a data block containing :class:`GeoExt.data.FeatureRecord` objects
    from an array of features.


