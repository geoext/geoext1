/**
 * Copyright (c) 2008-2015 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require GeoExt/data/PrintProviderBase.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = PrintProvider
 *  base_link = `Ext.util.Observable <http://dev.sencha.com/deploy/dev/docs/?class=Ext.util.Observable>`_
 */
Ext.namespace("GeoExt.data");

/** api: example
 *  Minimal code to print as much of the current map extent as possible as
 *  soon as the print service capabilities are loaded, using the first layout
 *  reported by the print service:
 *
 *  .. code-block:: javascript
 *
 *      var mapPanel = new GeoExt.MapPanel({
 *          renderTo: "mappanel",
 *          layers: [new OpenLayers.Layer.WMS("wms", "/geoserver/wms",
 *              {layers: "topp:tasmania_state_boundaries"})],
 *          center: [146.56, -41.56],
 *          zoom: 7
 *      });
 *      var printProvider = new GeoExt.data.PrintProvider({
 *          url: "/geoserver/pdf",
 *          listeners: {
 *              "loadcapabilities": function() {
 *                  var printPage = new GeoExt.data.PrintPage({
 *                      printProvider: printProvider
 *                  });
 *                  printPage.fit(mapPanel, true);
 *                  printProvider.print(mapPanel, printPage);
 *              }
 *          }
 *      });
 */

/** api: constructor
 *  .. class:: PrintProvider
 *
 *  Provides an interface to a Mapfish or GeoServer print module. For printing,
 *  one or more instances of :class:`GeoExt.data.PrintPage` are also required
 *  to tell the PrintProvider about the scale and extent (and optionally
 *  rotation) of the page(s) we want to print.
 */
GeoExt.data.PrintProvider = Ext.extend(GeoExt.data.PrintProviderBase, {
    /** private:  method[constructor]
     *  Private constructor override.
     */
    constructor: function(config) {
        GeoExt.data.PrintProvider.superclass.constructor.apply(this, arguments);

        if (config.attributes) {
            this.setAttributes(config.attributes);
        }
    },

    /** private: method[buildStores]
     *
     *  Build the JSON stores
     */
    buildStores: function() {
        this.scales = new Ext.data.JsonStore({
            root: "scales",
            sortInfo: {field: "value", direction: "DESC"},
            fields: ["name", {name: "value", type: "float"}]
        });

        this.dpis = new Ext.data.JsonStore({
            root: "dpis",
            fields: ["name", {name: "value", type: "float"}]
        });

        // Optional outputformats
        if (this.outputFormatsEnabled === true) {
            this.outputFormats = new Ext.data.JsonStore({
                root: "outputFormats",
                sortInfo: {field: "name", direction: "ASC"},
                fields: ["name"]
            });
        }

        this.layouts = new Ext.data.JsonStore({
            root: "layouts",
            fields: [
                "name",
                {name: "size", mapping: "map"},
                {name: "rotation", type: "boolean"}
            ]
        });

        this.attributes = new Ext.data.JsonStore({
            root: "attributes",
            fields: ["name", "type"]
        });
    },

    /** private: method[getCapabilitiesURL]
     *
     *  Get capabilities URL.
     */
    getCapabilitiesURL: function() {
        return this.url + "info.json";
    },

    /** private: method[loadStores]
     */
    loadStores: function() {
        this.scales.loadData(this.capabilities);
        this.dpis.loadData(this.capabilities);
        this.layouts.loadData(this.capabilities);

        this.setLayout(this.layouts.getAt(0));
        this.setDpi(this.dpis.getAt(0));

        // In rare cases (YAML+MFP-dependent) no Output Formats are returned
        if (this.outputFormatsEnabled && this.capabilities.outputFormats) {
            this.outputFormats.loadData(this.capabilities);
            var defaultOutputIndex = this.outputFormats.find('name', this.defaultOutputFormatName);
            this.setOutputFormat(defaultOutputIndex > -1 ? this.outputFormats.getAt(defaultOutputIndex) : this.outputFormats.getAt(0));
        }
        this.fireEvent("loadcapabilities", this, this.capabilities);
    },

    /** api: method[requestPrint]
     *
     *  :param map: ``GeoExt.MapPanel`` or ``OpenLayers.Map`` The map to print.
     *  :param pages: ``Array`` of :class:`GeoExt.data.PrintPage` or
     *      :class:`GeoExt.data.PrintPage` page(s) to print.
     *  :param encodedLayers: ``Object`` used to describe the layers
     *  :param encodedOverviewLayers: ``Object`` used to describe the layers
     *  :param encodedLegends: ``Object``used to describe the legends
     *  :param callback: ``Function`` called then the print is done
     */
    requestPrint: function(map, pages, encodedLayers, encodedOverviewLayers, encodedLegends) {

        var jsonData = Ext.apply({
            units: map.getUnits(),
            srs: map.baseLayer.projection.getCode(),
            layout: this.layout.get("name"),
            dpi: this.dpi.get("value"),
            outputFormat: this.outputFormat ? this.outputFormat.get("name") : this.defaultOutputFormatName
        }, this.customParams);

        jsonData.layers = encodedLayers;
        if (encodedOverviewLayers) {
            jsonData.overviewLayers = encodedOverviewLayers;
        }

        var encodedPages = [];
        Ext.each(pages, function(page) {
            encodedPages.push(Ext.apply({
                center: [page.center.lon, page.center.lat],
                scale: page.scale.get("value"),
                rotation: page.rotation
            }, page.customParams));
        }, this);
        jsonData.pages = encodedPages;

        if (encodedLegends) {
            jsonData.legends = encodedLegends;
        }

        if (this.method === "GET") {
            var url = Ext.urlAppend(this.capabilities.printURL,
                "spec=" + encodeURIComponent(Ext.encode(jsonData)));
            this.download(url);
        } else {
            Ext.Ajax.request({
                url: this.capabilities.createURL,
                timeout: this.timeout,
                jsonData: jsonData,
                headers: { "Content-Type": "application/json; charset=" + this.encoding },
                success: function(response) {
                    var url = Ext.decode(response.responseText).getURL;
                    this.download(url);
                },
                failure: function(response) {
                    this.fireEvent("printexception", this, response);
                },
                params: this.baseParams,
                scope: this
            });
        }
    },

    /** private: property[encodersOverride]
     *  ``Object`` Encoders override for all print content
     */
    encodersOverride: {
        "layers": {
            "WMS": function(layer) {
                var enc = this.encoders.layers._HTTPRequest.call(this, layer);
                enc.singleTile = layer.singleTile;
                Ext.apply(enc, {
                    type: 'WMS',
                    layers: [layer.params.LAYERS].join(",").split(","),
                    format: layer.params.FORMAT,
                    styles: [layer.params.STYLES].join(",").split(","),
                    singleTile: layer.singleTile
                });
                var param;
                for (var p in layer.params) {
                    param = p.toLowerCase();
                    if (layer.params[p] != null && !layer.DEFAULT_PARAMS[param] &&
                    "layers,styles,width,height,srs".indexOf(param) == -1) {
                        if (!enc.customParams) {
                            enc.customParams = {};
                        }
                        enc.customParams[p] = layer.params[p];
                    }
                }
                return enc;
            },
            "OSM": function(layer) {
                var enc = this.encoders.layers.TileCache.call(this, layer);
                return Ext.apply(enc, {
                    type: 'OSM',
                    baseURL: enc.baseURL.substr(0, enc.baseURL.indexOf("$")),
                    extension: "png"
                });
            },
            "TMS": function(layer) {
                var enc = this.encoders.layers.TileCache.call(this, layer);
                return Ext.apply(enc, {
                    type: 'TMS',
                    format: layer.type
                });
            },
            "TileCache": function(layer) {
                var enc = this.encoders.layers._HTTPRequest.call(this, layer);
                return Ext.apply(enc, {
                    type: 'TileCache',
                    layer: layer.layername,
                    maxExtent: layer.maxExtent.toArray(),
                    tileSize: [layer.tileSize.w, layer.tileSize.h],
                    extension: layer.extension,
                    resolutions: layer.serverResolutions || layer.resolutions
                });
            },
            "WMTS": function(layer) {
                var enc = this.encoders.layers._HTTPRequest.call(this, layer);
                enc.baseURL = encodeURI(enc.baseURL);
                enc = Ext.apply(enc, {
                    type: 'WMTS',
                    layer: layer.layer,
                    version: layer.version,
                    requestEncoding: layer.requestEncoding,
                    style: layer.style,
                    dimensions: layer.dimensions,
                    params: layer.params,
                    matrixSet: layer.matrixSet
                });
                if (layer.matrixIds) {
                    if (layer.requestEncoding == "KVP") {
                        enc.format = layer.format;
                    }
                    enc.matrixIds = []
                    Ext.each(layer.matrixIds, function(matrixId) {
                        enc.matrixIds.push({
                            identifier: matrixId.identifier,
                            matrixSize: [matrixId.matrixWidth,
                                    matrixId.matrixHeight],
                            resolution: matrixId.scaleDenominator * 0.28E-3
                                    / OpenLayers.METERS_PER_INCH
                                    / OpenLayers.INCHES_PER_UNIT[layer.units],
                            tileSize: [matrixId.tileWidth, matrixId.tileHeight],
                            topLeftCorner: [matrixId.topLeftCorner.lon,
                                    matrixId.topLeftCorner.lat]
                        });
                    })
                    return enc;
                }
                else {
                    return Ext.apply(enc, {
                        formatSuffix: layer.formatSuffix,
                        tileOrigin: [layer.tileOrigin.lon, layer.tileOrigin.lat],
                        tileSize: [layer.tileSize.w, layer.tileSize.h],
                        maxExtent: layer.maxExtent.toArray(),
                        zoomOffset: layer.zoomOffset,
                        resolutions: layer.serverResolutions || layer.resolutions
                    });
                }
            },
            "KaMapCache": function(layer) {
                var enc = this.encoders.layers.KaMap.call(this, layer);
                return Ext.apply(enc, {
                    type: 'KaMapCache',
                    // group param is mandatory when using KaMapCache
                    group: layer.params['g'],
                    metaTileWidth: layer.params['metaTileSize']['w'],
                    metaTileHeight: layer.params['metaTileSize']['h']
                });
            },
            "KaMap": function(layer) {
                var enc = this.encoders.layers._HTTPRequest.call(this, layer);
                return Ext.apply(enc, {
                    type: 'KaMap',
                    map: layer.params['map'],
                    extension: layer.params['i'],
                    // group param is optional when using KaMap
                    group: layer.params['g'] || "",
                    maxExtent: layer.maxExtent.toArray(),
                    tileSize: [layer.tileSize.w, layer.tileSize.h],
                    resolutions: layer.serverResolutions || layer.resolutions
                });
            },
            "Markers": function(layer, bounds) {
                var features = [];
                for (var i=0, len=layer.markers.length; i<len; i++) {
                    var marker = layer.markers[i];
                    var geometry = new OpenLayers.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat);
                    var style = {
                        externalGraphic: marker.icon.url,
                        graphicWidth: marker.icon.size.w,
                        graphicHeight: marker.icon.size.h,
                        graphicXOffset: marker.icon.offset.x,
                        graphicYOffset: marker.icon.offset.y
                    };
                    var feature = new OpenLayers.Feature.Vector(geometry, {}, style);
                    features.push(feature);
                }
                var vector = new OpenLayers.Layer.Vector(layer.name);
                vector.addFeatures(features);
                var output = this.encoders.layers.Vector.call(this, vector, bounds);
                vector.destroy();
                return output;
            },
            "Image": function(layer) {
                var enc = this.encoders.layers._Layer.call(this, layer);
                return Ext.apply(enc, {
                    type: 'Image',
                    baseURL: this.getAbsoluteUrl(layer.getURL(layer.extent)),
                    opacity: (layer.opacity != null) ? layer.opacity : 1.0,
                    extent: layer.extent.toArray(),
                    pixelSize: [layer.size.w, layer.size.h],
                    name: layer.name
                });
            },
            "Vector": function(layer, bounds) {
                var enc = this.encoders.features.GeoJsonWithStyle.call(this, layer, bounds);

                // don't send empty layer
                if (!enc.geoJson.features.length === 0) {
                    return;
                }

                Ext.apply(enc, this.encoders.layers._Layer.call(this, layer));
                return Ext.apply(enc, {
                    type: 'Vector',
                    styleProperty: '_gx_style',
                    name: layer.name,
                    opacity: (layer.opacity != null) ? layer.opacity : 1.0
                });
            }
        },
        "legends": {}
    }
});
