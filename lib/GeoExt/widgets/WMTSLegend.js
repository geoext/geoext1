/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/LegendImage.js
 * @requires GeoExt/widgets/LayerLegend.js
 */
GeoExt.WMTSLegend = Ext.extend(GeoExt.LayerLegend, {

    /** private: method[initComponent]
     *  Initializes the WMTS legend. 
     */
    initComponent: function() {
        GeoExt.WMTSLegend.superclass.initComponent.call(this);
        var layer = this.layerRecord.getLayer();
        this._noMap = !layer.map;
        layer.events.register("moveend", this, this.onLayerMoveend);
        this.update();
    },
    
    /** private: method[onLayerMoveend]
     *  :param e: ``Object``
     */
    onLayerMoveend: function(e) {
        if (e.zoomChanged === true || this._noMap) {
            delete this._noMap;
            this.update();
        }
    },

    /** private: method[getLegendUrl]

     *  :return: ``String`` The legend URL.
     *
     *  Get the legend URL of a layer.
     */
    getLegendUrl: function() {
        var rec = this.layerRecord,
            layer = rec.getLayer();

        var mapDenominator = layer.map && layer.map.getScale();
        if (!mapDenominator) {
            return;
        }

        var styles = rec.get("styles"),
            url, style, legends, legend;

        for (var i=0, l=styles.length; i<l; i++) {
            style = styles[i];
            if (style.identifier === layer.style) {
                legends = style.legends;
                if (!legends) {
                    return;
                }
                // get the legend for the current layer scale
                for (var j=0, ll=legends.length; j<ll; j++) {
                    legend = legends[j];
                    if (!legend.href) {
                        continue;
                    }
                    var hasMin = legend.hasOwnProperty("minScaleDenominator"),
                        hasMax = legend.hasOwnProperty("maxScaleDenominator");
                    if (!hasMin && !hasMax) {
                        return legend.href;
                    }
                    if (!hasMin && mapDenominator<legend.maxScaleDenominator) {
                        return legend.href;
                    }
                    if (!hasMax && mapDenominator>=legend.minScaleDenominator){
                        return legend.href;
                    }
                    if (mapDenominator < legend.maxScaleDenominator && 
                        mapDenominator >= legend.minScaleDenominator) {

                        return legend.href;
                    }
                }
                break;
            }
        }
        return url;
    },

    /** private: method[update]
     *  Update the legend, adding, removing or updating
     *  the box component.
     */
    update: function() {
        var layer = this.layerRecord.getLayer();
        // In some cases, this update function is called on a layer
        // that has just been removed, see ticket #238.
        // The following check bypass the update if map is not set.
        if(!(layer && layer.map)) {
            return;
        }
        GeoExt.WMTSLegend.superclass.update.apply(this, arguments);

        var newURL = this.getLegendUrl();
        if (this.items.getCount() == 2) {
            var cmp = this.items.itemAt(1);
            if (cmp.url !== newURL) {
                this.remove(cmp);
                cmp.destroy();
                if (newURL) {
                    this.add({
                        xtype: "gx_legendimage",
                        url: newURL
                    });
                }
            }
        } else if (newURL) {
            this.add({
                xtype: "gx_legendimage",
                url: newURL
            });
        }
        this.doLayout();
    },

    /** private: method[beforeDestroy]
     */
    beforeDestroy: function() {
        var layer = this.layerRecord.getLayer();
        layer && layer.events &&
            layer.events.unregister("moveend", this, this.onLayerMoveend);

        GeoExt.WMTSLegend.superclass.beforeDestroy.apply(this, arguments);
    }

});

/** private: method[supports]
 *  Private override
 */
GeoExt.WMTSLegend.supports = function(layerRecord) {
    return layerRecord.getLayer() instanceof OpenLayers.Layer.WMTS ? 1 : 0;
};

/** api: legendtype = gx_wmtslegend */
GeoExt.LayerLegend.types["gx_wmtslegend"] = GeoExt.WMTSLegend;

/** api: xtype = gx_wmtslegend */
Ext.reg('gx_wmtslegend', GeoExt.WMTSLegend);