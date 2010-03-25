/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/LegendImage.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = LegendWMS
 *  base_link = `Ext.Panel <http://extjs.com/deploy/dev/docs/?class=Ext.Panel>`_
 */
Ext.namespace('GeoExt');

/** api: constructor
 *  .. class:: LegendWMS(config)
 *
 *  Show a legend image for a WMS layer.
 */
GeoExt.LegendWMS = Ext.extend(Ext.Panel, {

    /** api: config[imageFormat]
     *  ``String``  
     *  The image format to request the legend image in.
     *  Defaults to image/png.
     */
    imageFormat: "image/gif",

    /** api: config[layer]
     *  ``OpenLayers.Layer.WMS``
     *  The WMS layer to request the legend for.
     */
    layer: null,

    /** api: config[bodyBorder]
     *  ``Boolean``
     *  Show a border around the legend image or not. Default is false.
     */
    bodyBorder: false,

    /** private: method[initComponent]
     *  Initializes the WMS legend. For group layers it will create multiple
     *  image box components.
     */
    initComponent: function() {
        GeoExt.LegendWMS.superclass.initComponent.call(this);
        this.createLegend();
    },

    /** private: method[getLegendUrl]
     *  :param layer: ``OpenLayers.Layer.WMS`` The OpenLayers WMS layer object
     *  :param layerName: ``String`` The name of the layer 
     *      (used in the LAYERS parameter)
     *  :return: ``String`` The url of the SLD WMS GetLegendGraphic request.
     *
     *  Get the url for the SLD WMS GetLegendGraphic request.
     */
    getLegendUrl: function(layerName) {
        return this.layer.getFullRequestString({
            REQUEST: "GetLegendGraphic",
            WIDTH: null,
            HEIGHT: null,
            EXCEPTIONS: "application/vnd.ogc.se_xml",
            LAYER: layerName,
            LAYERS: null,
            SRS: null,
            FORMAT: this.imageFormat
        });
    },

    /** private: method[createLegend]
     *  Add one BoxComponent per sublayer to this panel.
     */
    createLegend: function() {
        var layers = this.layer.params.LAYERS.split(",");
        for (var i = 0, len = layers.length; i < len; i++){
            var layerName = layers[i];
            var legend = new GeoExt.LegendImage({url:
                this.getLegendUrl(layerName)});
            this.add(legend);
        }
    }

});