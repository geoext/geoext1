.. currentmodule:: GeoExt.data

:class:`GeoExt.data.FeatureStore`
=================================

.. class:: FeatureStore

    A store containing :class:`GeoExt.data.FeatureRecord` entries that
    optionally synchronizes with an ``OpenLayers.Layer.Vector``.

    .. rubric:: Extends
    
    * `Ext.data.Store`_

.. _`Ext.data.Store`: http://extjs.com/deploy/dev/docs/?class=Ext.data.Store


Example Use
-----------

Sample code to create a store with features from a vector layer:

.. code-block:: javascript

    var store = new GeoExt.data.FeatureStore({
        layer: myLayer,
        features: myFeatures
    });


Config Options
--------------

Configuration properties in addition to those listed for `Ext.data.Store`_.
    
.. describe:: layer

    ``OpenLayers.Layer.Vector``  Layer to synchronize the store with.

.. describe:: features

    ``Array(OpenLayers.Feature.Vector)``  Features that will be added to the
    store (and the layer if provided).

.. describe:: fields

    ``Array``  If provided, a custom feature record type with additional fields
    will be used. Default fields for every feature record are
    feature (``OpenLayers.Feature.Vector``), state (``String``) and
    fid (``Number or String``). The value of this option is either an array of
    field definition objects as passed to the :func:`GeoExt.data.FeatureRecord.create`
    function or a :class:`GeoExt.data.FeatureRecord` constructor created using
    :func:`GeoExt.data.FeatureRecord.create`.
    
.. describe:: initDir

    ``Number``  Bitfields specifying the direction to use for the
    initial sync between the layer and the store, if set to 0 then no
    initial sync is done. Defaults to
    ``GeoExt.data.FeatureStore.LAYER_TO_STORE|GeoExt.data.FeatureStore.STORE_TO_LAYER``.
    
