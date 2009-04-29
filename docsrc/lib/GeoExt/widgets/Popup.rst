.. currentmodule:: GeoExt

``GeoExt.Popup``
================

.. class:: Popup(config)

    Create a specialized ``Ext.Window`` that supports anchoring to a particular
    location in a :class:`GeoExt.MapPanel`.  When a popup is anchored to a location,
    the popup will visibly point to the location on the map, and move when the
    map is panned or zoomed.

    .. describe:: xtype
    
        gx_mappanel

    .. rubric:: Extends
    
    * `Ext.Window`_ 

.. _`Ext.Window`: http://extjs.com/deploy/dev/docs/?class=Ext.Window

Example Use
-----------

    Sample code to create a panel with a new map:

    .. code-block:: javascript
        
        var popup = new GeoExt.Popup({
            title: 'My Popup',
            feature: feature,
            width: 200,
            html: "<div>Popup content</div>",
            collapsible: true
        });


Config Options
--------------

Configuration properties in addition to those listed for `Ext.Window`_.

.. describe:: anchored

    ``Boolean``  The popup begins anchored to a feature.
    
.. describe:: panIn

    ``Boolean``  The map should pan so the popup is fully in view when it is
    rendered.

.. describe:: unpinnable

    ``Boolean``  Render an `unpin` tool on the popup that unanchors it from
    the feature.

.. describe:: feature

    ``OpenLayers.Feature.Vector``  A feature that serves as the popup's
    anchor.

.. describe:: lonlat

    ``OpenLayers.LonLat``  A location for the anchor (assuming no feature is
    given).
    
