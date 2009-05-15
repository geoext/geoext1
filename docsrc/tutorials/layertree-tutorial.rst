============================
Layer Tree Tutorial
============================

Often when presenting users with an interactive map, it is useful to allow them to control the visible layers.  In this tutorial, we examine the use of :class:`GeoExt.tree.LayerContainer` with the stock ``Ext.tree.TreePanel`` class to accommodate toggling visibility of layers and rearranging their drawing order.

.. note:: Before starting this tutorial, you should have a working :class:`GeoExt.MapPanel` in your page.   The :doc:`mappanel-tutorial` will help you set one up if you don't already have one.

Start With a Map
================

Let's assume you already have a :class:`GeoExt.MapPanel` on your page with some layers.  In the :doc:`mappanel-tutorial`\ , we discussed how you can use the ``layers`` property of the ``MapPanel`` to add, remove, and modify the layers of the map as well as monitor the layer list for changes.  This is more than sufficient to display a 'live' list of layers in an ``Ext.grid.GridPanel``\ .  The :class:`GeoExt.tree.LayerContainer` is another component that can listen to changes to the map's layer list.  However, rather than an independent panel, the ``LayerContainer`` is a node that must be contained in an ``Ext.tree.TreePanel`` to be displayed.  Here's an example rendering a layer tree to a ``div``:

    .. code-block::
       javascript
       :linenos:
       
       var mapPanel = new GeoExt.MapPanel({
          /* Your configuration here */
       });

       var layerList = new GeoExt.tree.LayerContainer({
           text: 'All Layers',
           layerStore: mapPanel.layers,
           leaf: false, 
           expanded: true
       });

       var layerTree = new Ext.tree.TreePanel({
           title: 'Map Layers',
           renderTo: 'layerTree',
           root: layerList
       });

``LayerContainer``\ s automatically add checkboxes that can be used to toggle the visibility of layers.  You can also enable drag-n-drop layer reordering by simply setting the ``enableDD`` property of the ``TreePanel``. 

Filtering
=========
Currently, the ``LayerContainer`` automatically pulls in all layers from the store and displays those with the ``displayInLayerSwitcher`` property set to true.  In the future (but before the robots take over) you will be able to filter out some layers by providing a filter function.  By adding multiple named and filtered ``LayerContainer``\ s to a ``TreePanel`` you will be able to provide logical organization to your layer trees.  In the meantime, you can directly instantiate :class:`GeoExt.LayerNode` to create tree nodes that can be added anywhere in a tree.  Keep in mind, however, that this approach does not allow for automatic drag-n-drop support.

.. seealso:: The ExtJS TreePanel `documentation <http://extjs.com/deploy/dev/docs/?class=Ext.tree.TreePanel>`_ and `examples <http://extjs.com/deploy/dev/examples/samples.html#sample-4>`_ for more information about customizing tree panels.
