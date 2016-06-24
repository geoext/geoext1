/**
 * Copyright (c) 2008-2015 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Layer.js
 * @require OpenLayers/BaseTypes/Bounds.js
 * @require OpenLayers/Format/JSON.js
 * @require OpenLayers/Format/GeoJSON.js
 * @require OpenLayers/BaseTypes/Class.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = PrintProvider
 *  base_link = `Ext.util.Observable <http://dev.sencha.com/deploy/dev/docs/?class=Ext.util.Observable>`_
 */
Ext.namespace("GeoExt.data");

/** api: constructor
 *  .. class:: PrintProviderBase
 *
 *  Provides an interface to a Mapfish or GeoServer print module. For printing,
 *  one or more instances of :class:`GeoExt.data.PrintPage` are also required
 *  to tell the PrintProvider about the scale and extent (and optionally
 *  rotation) of the page(s) we want to print.
 */
GeoExt.data.PrintProviderBase = Ext.extend(Ext.util.Observable, {

    /** api: config[url]
     *  ``String`` Base url of the print service. Only required if
     *  ``capabilities`` is not provided. This
     *  is usually something like http://path/to/mapfish/print for Mapfish,
     *  and http://path/to/geoserver/pdf for GeoServer with the printing
     *  extension installed. This property requires that the print service is
     *  at the same origin as the application (or accessible via proxy).
     */

    /** private:  property[url]
     *  ``String`` Base url of the print service. Will always have a trailing
     *  "/".
     */
    url: null,

    /** api: config[autoLoad]
     *  ``Boolean`` If set to true, the capabilities will be loaded upon
     *  instance creation, and ``loadCapabilities`` does not need to be called
     *  manually. Setting this when ``capabilities`` and no ``url`` is provided
     *  has no effect. Default is false.
     */

    /** api: config[capabilities]
     *  ``Object`` Capabilities of the print service. Only required if ``url``
     *  is not provided. This is the object returned by the ``info.json``
     *  endpoint of the print service, and is usually obtained by including a
     *  script tag pointing to
     *  http://path/to/printservice/info.json?var=myvar in the head of the
     *  html document, making the capabilities accessible as ``window.myvar``.
     *  This property should be used when no local print service or proxy is
     *  available, or when you do not listen for the ``loadcapabilities``
     *  events before creating components that require the PrintProvider's
     *  capabilities to be available.
     */

    /** private: property[capabilities]
     *  ``Object`` Capabilities as returned from the print service.
     */
    capabilities: null,

    /** api: config[method]
     *  ``String`` Either ``POST`` or ``GET`` (case-sensitive). Method to use
     *  when sending print requests to the servlet. If the print service is at
     *  the same origin as the application (or accessible via proxy), then
     *  ``POST`` is recommended. Use ``GET`` when accessing a remote print
     *  service with no proxy available, but expect issues with character
     *  encoding and URLs exceeding the maximum length. Default is ``POST``.
     */

    /** private: property[method]
     *  ``String`` Either ``POST`` or ``GET`` (case-sensitive). Method to use
     *  when sending print requests to the servlet.
     */
    method: "POST",

    /** api: config[encoding]
     * ``String`` The encoding to set in the headers when requesting the print
     * service. Prevent character encoding issues, especially when using IE.
     * Default is retrieved from document charset or characterSet if existing
     * or ``UTF-8`` if not.
     */
    encoding: document.charset || document.characterSet || "UTF-8",

    /** api: config[timeout]
     *  ``Number`` Timeout of the POST Ajax request used for the print request
     *  (in milliseconds). Default of 30 seconds. Has no effect if ``method``
     *  is set to ``GET``.
     */
    timeout: 30000,

    /** api: property[customParams]
     *  ``Object`` Key-value pairs of custom data to be sent to the print
     *  service. Optional. This is e.g. useful for complex layout definitions
     *  on the server side that require additional parameters.
     */
    customParams: null,

    /** api: config[baseParams]
     *  ``Object`` Key-value pairs of base params to be add to every
     *  request to the service. Optional.
     */

    /** api: property[scales]
     *  ``Ext.data.JsonStore`` read-only. A store representing the scales
     *  available.
     *
     *  Fields of records in this store:
     *
     *  * name - ``String`` the name of the scale
     *  * value - ``Float`` the scale denominator
     */
    scales: null,

    /** api: property[dpis]
     *  ``Ext.data.JsonStore`` read-only. A store representing the dpis
     *  available.
     *
     *  Fields of records in this store:
     *
     *  * name - ``String`` the name of the dpi
     *  * value - ``Float`` the dots per inch
     */
    dpis: null,

    /** api: property[outputFormats]
     *  ``Ext.data.JsonStore`` read-only. A store representing the output formats
     *  available.
     *
     *  Fields of the output formats in this store:
     *
     *  * name - ``String`` the name of the output format
     */
    outputFormats: null,

    /** api: property[outputFormatsEnabled]
     *  ``Boolean`` read-only. Should outputFormats be populated and used?
     *  Default value is 'False'
     */
    outputFormatsEnabled: false,

    /** api: property[layouts]
     *  ``Ext.data.JsonStore`` read-only. A store representing the layouts
     *  available.
     *
     *  Fields of records in this store:
     *
     *  * name - ``String`` the name of the layout
     *  * size - ``Object`` width and height of the map in points
     *  * rotation - ``Boolean`` indicates if rotation is supported
     */
    layouts: null,

    /** api: property[dpi]
     *  ``Ext.data.Record`` the record for the currently used resolution.
     *  Read-only, use ``setDpi`` to set the value.
     */
    dpi: null,

    /** api: property[layout]
     *  ``Ext.data.Record`` the record of the currently used layout. Read-only,
     *  use ``setLayout`` to set the value.
     */
    layout: null,

    /** api: property[outputFormat]
     *  ``Ext.data.Record`` the record of the currently used output format. Read-only,
     *  use ``setOutputFormat`` to set the value.
     */
    outputFormat: null,

    /** api: property[defaultOutputFormatName]
     *  ``String`` the name of the default output format.
     */
    defaultOutputFormatName: 'pdf',

    /** private: attribute[attributes]
     *  ``Array`` all the current attributes
     */
    attributes: null,

    /** private: attribute[typesAttributes]
     *  ``Object`` the attributes by type
     */
    typesAttributes: null,

    /** private:  method[constructor]
     *  Private constructor override.
     */
    constructor: function(config) {
        this.initialConfig = config;
        Ext.apply(this, config);
        Ext.apply(this.encoders.layers, this.encodersOverride.layers);
        Ext.apply(this.encoders.legends, this.encodersOverride.legends);

        Ext.applyIf(this, {
            attributes: [],
            typesAttributes: {}
        });

        if (!this.customParams) {
            this.customParams = {};
        }

        this.addEvents(
            /** api: event[loadcapabilities]
             *  Triggered when the capabilities have finished loading. This
             *  event will only fire when ``capabilities`` is not  configured.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * capabilities - ``Object`` the capabilities
             */
            "loadcapabilities",

            /** api: event[layoutchange]
             *  Triggered when the layout is changed.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * layout - ``Ext.data.Record`` the new layout
             */
            "layoutchange",

            /** api: event[dpichange]
             *  Triggered when the dpi value is changed.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * dpi - ``Ext.data.Record`` the new dpi record
             */
            "dpichange",

            /** api: event[outputformatchange]
             *  Triggered when the outputFormat  value is changed.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * outputFormat - ``Ext.data.Record`` the new output format record
             */
            "outputformatchange",

            /** api: event[beforeprint]
             *  Triggered when the print method is called.
             *  TODO: rename this event to beforeencode
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * map - ``OpenLayers.Map`` the map being printed
             *  * pages - Array of :class:`GeoExt.data.PrintPage` the print
             *    pages being printed
             *  * options - ``Object`` the options to the print command
             */
            "beforeprint",

            /** api: event[print]
             *  Triggered when the print document is opened.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * url - ``String`` the url of the print document
             */
            "print",

            /** api: event[printexception]
             *  Triggered when using the ``POST`` method, when the print
             *  backend returns an exception.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * response - ``Object`` the response object of the XHR
             */
            "printexception",

            /** api: event[invalidspec]
             *  Triggered when the generated specs are invalid.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             */
            "invalidspec",

            /** api: event[beforeencodelayer]
             *  Triggered before a layer is encoded. This can be used to
             *  exclude layers from the printing, by having the listener
             *  return false.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * layer - ``OpenLayers.Layer`` the layer which is about to be
             *    encoded.
             */
            "beforeencodelayer",

            /** api: event[encodelayer]
             *  Triggered when a layer is encoded. This can be used to modify
             *  the encoded low-level layer object that will be sent to the
             *  print service.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * layer - ``OpenLayers.Layer`` the layer which is about to be
             *    encoded.
             *  * encodedLayer - ``Object`` the encoded layer that will be
             *    sent to the print service.
             */
            "encodelayer",

            /** api: events[beforedownload]
             *  Triggered before the PDF is downloaded. By returning false from
             *  a listener, the default handling of the PDF can be cancelled
             *  and applications can take control over downloading the PDF.
             *  TODO: rename to beforeprint after the current beforeprint event
             *  has been renamed to beforeencode.
             *
             *  Listener arguments:
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * url - ``String`` the url of the print document
             */
            "beforedownload",

            /** api: event[beforeencodelegend]
             *  Triggered before the legend is encoded. If the listener
             *  returns false, the default encoding based on GeoExt.LegendPanel
             *  will not be executed. This provides an option for application
             *  to get legend info from a custom component other than
             *  GeoExt.LegendPanel.
             *
             *  Listener arguments:
             *
             *  * printProvider - :class:`GeoExt.data.PrintProviderBase` this
             *    PrintProvider
             *  * legend - ``Object`` The legend supplied in the options which were
             *    sent to the print function.
             */
            "beforeencodelegend"

        );

        GeoExt.data.PrintProviderBase.superclass.constructor.apply(this, arguments);

        this.buildStores();

        if (config.capabilities) {
            this.loadStores();
        } else {
            if (this.url.split("/").pop()) {
                this.url += "/";
            }
            if (this.autoLoad) {
                this.loadCapabilities();
            }
        }
    },

    /** private: method[buildStores]
     *
     *  Build the JSON stores
     */

    /** api: method[setLayout]
     *  :param layout: ``Ext.data.Record`` the record of the layout.
     *
     *  Sets the layout for this printProvider.
     */
    setLayout: function(layout) {
        this.layout = layout;
        this.fireEvent("layoutchange", this, layout);
    },

    /** api: method[setDpi]
     *  :param dpi: ``Ext.data.Record`` the dpi record.
     *
     *  Sets the dpi for this printProvider.
     */
    setDpi: function(dpi) {
        this.dpi = dpi;
        this.fireEvent("dpichange", this, dpi);
    },

    /** api: method[setOutputFormat]
     *  :param outputFormat: ``Ext.data.Record`` the format record.
     *
     *  Sets the output print format for this printProvider.
     */
    setOutputFormat: function (outputFormat) {
        this.outputFormat = outputFormat;
        this.fireEvent("outputformatchange", this, outputFormat);
    },

    /** private: method[download]
     *  :param url: ``String``
     */
    download: function(url) {
        if (this.fireEvent("beforedownload", this, url) !== false) {
            if (Ext.isOpera) {
                // Make sure that Opera don't replace the content tab with
                // the pdf
                window.open(url);
            } else {
                // This avoids popup blockers for all other browsers
                window.location.href = url;
            }
        }
        this.fireEvent("print", this, url);
    },

    /** api: method[loadCapabilities]
     *
     *  Loads the capabilities from the print service. If this instance is
     *  configured with either ``capabilities`` or a ``url`` and ``autoLoad``
     *  set to true, then this method does not need to be called from the
     *  application.
     */
    loadCapabilities: function() {
        if (!this.url) {
            return;
        }
        var url = this.getCapabilitiesURL();
        Ext.Ajax.request({
            url: url,
            method: "GET",
            disableCaching: false,
            success: function(response) {
                this.capabilities = Ext.decode(response.responseText);
                this.loadStores();
            },
            params: this.baseParams,
            scope: this
        });
    },

    /** private: method[loadStores]
     */

    /** private: method[encodeLayer]
     *  :param layer: ``OpenLayers.Layer`` The layer to encode
     *  :param bounds: ``OpenLayers.Bounds`` The bound to print, used to don't
     *  include features outside the bounds
     *  :return: ``Object`` The spec used in the print
     *
     *  Encodes a layer for the print service.
     */
    encodeLayer: function(layer, bounds) {
        var encLayer;
        for (var c in this.encoders.layers) {
            if (OpenLayers.Layer[c] && layer instanceof OpenLayers.Layer[c]) {
                if (this.fireEvent("beforeencodelayer", this, layer) === false) {
                    return;
                }
                encLayer = this.encoders.layers[c].call(this, layer, bounds);
                this.fireEvent("encodelayer", this, layer, encLayer);
                break;
            }
        }
        // only return the encLayer object when we have a type. Prevents a
        // fallback on base encoders like HTTPRequest.
        return (encLayer && encLayer.type) ? encLayer : null;
    },

    /** private: method[validatePrintOptions]
     */
    validatePrintOptions: function(pages) {
        return true;
    },

    /** api: method[print]
     *  :param map: ``GeoExt.MapPanel`` or ``OpenLayers.Map`` The map to print.
     *  :param pages: ``Array`` of :class:`GeoExt.data.PrintPage` or
     *      :class:`GeoExt.data.PrintPage` page(s) to print.
     *  :param options: ``Object`` of additional options, see below.
     *  :param callback: ``Function`` called then the print is done
     *
     *  Sends the print command to the print service and opens a new window
     *  with the resulting PDF.
     *
     *  Valid properties for the ``options`` argument:
     *
     *      * ``legend`` - :class:`GeoExt.LegendPanel` If provided, the legend
     *        will be added to the print document. For the printed result to
     *        look like the LegendPanel, the following ``!legends`` block
     *        should be included in the ``items`` of your page layout in the
     *        print module's configuration file:
     *
     *        .. code-block:: none
     *
     *          - !legends
     *              maxIconWidth: 0
     *              maxIconHeight: 0
     *              classIndentation: 0
     *              layerSpace: 5
     *              layerFontSize: 10
     *
     *      * ``overview`` - :class:`OpenLayers.Control.OverviewMap` If provided,
     *        the layers for the overview map in the printout will be taken from
     *        the OverviewMap control. If not provided, the print service will
     *        use the main map's layers for the overview map. Applies only for
     *        layouts configured to print an overview map.
     */
    print: function(map, pages, options, callback) {
        if (map instanceof GeoExt.MapPanel) {
            map = map.map;
        }
        pages = pages instanceof Array ? pages : [pages];
        options = options || {};

        if (this.fireEvent("beforeprint", this, map, pages, options) === false) {
            return;
        }

        if (!this.validatePrintOptions(pages)) {
            return;
        }

        var bounds = new OpenLayers.Bounds();
        Ext.each(pages, function(page) {
            bounds.extend(page.calculateEnclosingPageBounds(page.scale, map.getUnits()));
        });

        var pagesLayer = pages[0].feature.layer;

        // ensure that the baseLayer is the first one in the encoded list
        var layers = map.layers.concat();
        layers.remove(map.baseLayer);
        layers.unshift(map.baseLayer);

        var encodedLayers = [];
        Ext.each(layers, function(layer){
            if (layer !== pagesLayer && layer.getVisibility() === true) {
                var enc = this.encodeLayer(layer, bounds);
                if (enc) {
                    encodedLayers.push(enc);
                }
            }
        }, this);
        var reverseLayers = GeoExt.data.MapFishPrintv3Provider && this instanceof GeoExt.data.MapFishPrintv3Provider;
        if (reverseLayers) {
            encodedLayers.reverse()
        }

        var encodedOverviewLayers = null;
        if (options.overview) {
            encodedOverviewLayers = [];
            Ext.each(options.overview.layers, function(layer) {
                var enc = this.encodeLayer(layer, bounds);
                if (enc) {
                    encodedOverviewLayers.push(enc);
                }
            }, this);
            if (reverseLayers) {
                encodedOverviewLayers.reverse()
            }
        }

        var encodedLegends = undefined;
        if (options.legend && (this.fireEvent("beforeencodelegend", this, options.legend) === true)) {
            encodedLegends = [];
            var legend = options.legend;
            var rendered = legend.rendered;
            if (!rendered) {
                legend = legend.cloneConfig({
                    renderTo: document.body,
                    hidden: true
                });
            }
            if (legend.items) {
                legend.items.each(function(cmp) {
                    if (!cmp.hidden) {
                        var encFn = this.encoders.legends[cmp.getXType()];
                        encodedLegends = encodedLegends.concat(
                            encFn.call(this, cmp, pages[0].scale.get("value"))
                        );
                    }
                }, this);
            }
            if (!rendered) {
                legend.destroy();
            }
        }
        this.requestPrint(map, pages, encodedLayers, encodedOverviewLayers, encodedLegends, callback);
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

    /** private: method[getAbsoluteUrl]
     *  :param url: ``String``
     *  :return: ``String``
     *
     *  Converts the provided url to an absolute url.
     */
    getAbsoluteUrl: function(url) {
        url = encodeURI(url);
        var a;
        if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
            a = document.createElement("<a href='" + url + "'/>");
            a.style.display = "none";
            document.body.appendChild(a);
            a.href = a.href;
            document.body.removeChild(a);
        } else {
            a = document.createElement("a");
            a.href = url;
        }
        return decodeURI(a.href);
    },

    /** private: property[encoders]
     *  ``Object`` Encoders for all print content
     */
    encoders: {
        "features": {
            "GeoJsonWithStyle": function(layer, bounds) {
                var encStyles = {}
                var encFeatures = [];
                var styleFormat = new OpenLayers.Format.JSON();
                var featureFormat = new OpenLayers.Format.GeoJSON();
                var nextId = 1;
                var styleDict = {};
                Ext.each(layer.features, function(feature) {
                    var style = feature.style || layer.style ||
                        layer.styleMap.createSymbolizer(feature,
                        feature.renderIntent);

                    // don't send invisible features
                    if (style.display == 'none') {
                        return;
                    }

                    // don't send out of bounds features
                    if (!feature.geometry) {
                        return;
                    }
                    if (feature.geometry instanceof OpenLayers.Geometry.Point) {
                        if (!bounds.contains(feature.geometry.x, feature.geometry.y)) {
                            return;
                        }
                    }
                    else {
                        if (!feature.geometry.bounds ||
                                !bounds.toGeometry().intersects(
                                    feature.geometry.bounds.toGeometry())) {
                            return;
                        }
                    }

                    var dictKey = styleFormat.write(style);
                    var dictItem = styleDict[dictKey];
                    var styleName = dictItem;
                    if (!dictItem) {
                        // new style
                        styleDict[dictKey] = styleName = nextId++;
                        if (style.externalGraphic) {
                            encStyles[styleName] = Ext.applyIf({
                                externalGraphic: this.getAbsoluteUrl(style.externalGraphic)
                            }, style);
                        } else {
                            encStyles[styleName] = style;
                        }
                    }

                    var featureGeoJson = featureFormat.extract.feature.call(
                        featureFormat, feature);
                    featureGeoJson.properties = OpenLayers.Util.extend({
                        _gx_style: styleName
                    }, featureGeoJson.properties);
                    encFeatures.push(featureGeoJson);
                }, this);

                return {
                    styles: encStyles,
                    geoJson: {
                        type: "FeatureCollection",
                        features: encFeatures
                    }
                }
            }
        },
        "layers": {
            "_Layer": function(layer) {
                var enc = {};
                if (layer.options && layer.options.maxScale) {
                    enc.minScaleDenominator = layer.options.maxScale;
                }
                if (layer.options && layer.options.minScale) {
                    enc.maxScaleDenominator = layer.options.minScale;
                }
                return enc;
            },
            "_HTTPRequest": function(layer) {
                var enc = this.encoders.layers._Layer.call(this, layer);
                return Ext.apply(enc, {
                    baseURL: this.getAbsoluteUrl(layer.url instanceof Array ?
                        layer.url[0] : layer.url),
                    opacity: (layer.opacity != null) ? layer.opacity : 1.0
                });
            }
        },
        "legends": {
            "gx_wmslegend": function(legend, scale) {
                var enc = this.encoders.legends.base.call(this, legend);
                var icons = [];
                for (var i=1, len=legend.items.getCount(); i<len; ++i) {
                    var url = legend.items.get(i).url;
                    if (legend.useScaleParameter === true &&
                       url.toLowerCase().indexOf(
                           'request=getlegendgraphic') != -1) {
                        var split = url.split("?");
                        var params = Ext.urlDecode(split[1]);
                        params['SCALE'] = scale;
                        url = split[0] + "?" + Ext.urlEncode(params);
                    }
                    icons.push(this.getAbsoluteUrl(url));
                }
                enc[0].classes[0] = {
                    name: "",
                    icons: icons
                };
                return enc;
            },
            "gx_wmtslegend": function(legend, scale) {
                return this.encoders.legends.gx_urllegend.call(this, legend);
            },
            "gx_urllegend": function(legend) {
                var enc = this.encoders.legends.base.call(this, legend);
                enc[0].classes.push({
                    name: "",
                    icon: this.getAbsoluteUrl(legend.items.get(1).url)
                });
                return enc;
            },
            "base": function(legend){
                return [{
                    name: legend.getLabel(),
                    classes: []
                }];
            }
        }
    },

    /** private: property[encodersOverride]
     *  ``Object`` Encoders override for all print content
     */
    encodersOverride: {
        "layers": {
        },
        "legends": {
        }
    },

    /** api: method[supportProgress]
     *  Return true if it support progress (Print job queue with status)
     */
    supportProgress: function() {
        return false;
    },

    /** private: method[setAttributes]
     */
    setAttributes: function(attributes) {
        this.attributes = attributes;
        this.typesAttributes = {};
        Ext.each(attributes, function(attribute) {
            if (!this.typesAttributes[attribute.type]) {
                this.typesAttributes[attribute.type] = [];
            }
            this.typesAttributes[attribute.type].push(attribute);
        }, this);
    },

    /** api: method[getAttributes]
     *  Get the current attributes.
     */
    getAttributes: function() {
        return this.attributes;
    },

    /** api: method[getAttributesByType]
     *  Get the current attributes.
     */
    getAttributesByType: function(type) {
        return this.typesAttributes[type];
    }
});
