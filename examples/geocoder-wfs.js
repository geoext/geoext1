/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: example[geocoder-wfs]
 *  GeocoderComboBox WFS
 *  -------------------------
 *  MapPanel with a WFS Geocoder search field.
 */

var mapPanel;

OpenLayers.ProxyHost = '/cgi-bin/proxy.cgi?url=';

Ext.onReady(function() {
    mapPanel = new GeoExt.MapPanel({
        renderTo: "mappanel",
        height: 400,
        width: 500,
        layers: [
            new OpenLayers.Layer.OSM()
        ],
        zoom: 1,
        tbar: [{
            xtype: "gx_geocodercombo",
            srs: "EPSG:900913",
            width: 250,
            zoom: 15,
            store: new Ext.data.Store({
                reader: new GeoExt.data.FeatureReader({}, [
                    {name: 'name', mapping: 'ADDRESS'},
                    {name: 'bounds', convert: function(v, feature) {
                        return [feature.geometry.x, feature.geometry.y];
                    }}
                ]),
                proxy: new (Ext.extend(GeoExt.data.ProtocolProxy, {
                    doRequest: function(action, records, params, reader, callback, scope, arg) {
                        if (params.q) {
                            params.filter = new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.LIKE,
                                matchCase: false,
                                property: this.protocol.propertyNames[0],
                                 value: '*' + params.q + '*'
                            });
                            delete params.q;
                        }
                        GeoExt.data.ProtocolProxy.prototype.doRequest.apply(this, arguments);
                    }
                }))({
                    protocol: new OpenLayers.Protocol.WFS({
                        version: "1.1.0",
                        url: "http://sfmta.demo.opengeo.org/geoserver/wfs",
                        featureType: "SFADDRESSPOINTS",
                        featurePrefix: "asbuilt",
                        srsName: "EPSG:900913",
                        propertyNames: ['ADDRESS', 'GEOM'],
                        maxFeatures: 20
                    }),
                    setParamsAsOptions: true
                })
            })
        }]
    });
});
