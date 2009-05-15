.. highlight:: javascript

================
Extending GeoExt
================

.. note:: This section of the site is still under construction.  For more information on this topic, please contact the GeoExt team.  Information on getting in touch is available from :doc:`/developer/community`.

Extensions to GeoExt fall generally into two categories, **Ext components**\ , such as customized widgets or data access classes, and **OpenLayers tools**\ , such as custom ``Layer`` types or new ``Controls`` for interacting with maps.  In either case, the GeoExt team recommends namespacing such classes to ensure that they do not interfere with the existing libraries. 

For Ext components::
    
    Ext.namespace("GeoExt.ext");
    GeoExt.ext.MyCustomWidget = Ext.extend(...);


For OpenLayers classes::
    
    OpenLayers.ext = OpenLayers.ext || {};
    OpenLayers.ext.MyClass = OpenLayers.extend(...);

