 /**
 * Copyright (c) 2015 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: example[print-extent]
 *  Interactive Print Extent
 *  ------------------------
 *  Change print scale, center and rotation with the PrintExtent plugin.
 */

var mapPanel, printProvider;

Ext.onReady(function() {
    // The printProvider that connects us to the print service
    printProvider = new GeoExt.data.MapFishPrintv3Provider({
        method: "POST",
        url: "http://geomapfish.demo-camptocamp.com/sbrunner/wsgi/printproxy/",
        customParams: {
            title: "Printing Demo",
            comments: "This is a map printed from GeoExt.",
            datasource: []
        }
    });

    var printExtent = new GeoExt.plugins.PrintExtent({
        printProvider: printProvider
    });

    // The map we want to print, with the PrintExtent added as item.
    mapPanel = new GeoExt.MapPanel({
        renderTo: "content",
        width: 450,
        height: 320,
        layers: [new OpenLayers.Layer.WMS("OSM", "http://geomapfish.demo-camptocamp.com/sbrunner/wsgi/mapserv_proxy",
            {layers: "osm"}, {singleTile: true})],
        center: [537635, 152640],
        map: {
            projection: "EPSG:21781",
            units: "m",
            maxExtent: new OpenLayers.Bounds([420000, 30000, 900000, 350000]),
            resolutions: [50, 20, 10, 5, 2.5, 2, 1]
        },
        zoom: 3,
        plugins: [printExtent],
        bbar: [{
            text: "Create PDF",
            handler: function() {
                var interval = null;
                var statusCallback = function(ref, succes, currentStatus) {
                    if (!succes) {
                        clearInterval(interval);
                        window.alert("Print error");
                        return;
                    }
                    if (currentStatus.done) {
                        clearInterval(interval);
                        if (currentStatus.error) {
                            window.alert(currentStatus.error);
                            return;
                        }
                        printProvider.download(printProvider.getDownloadURL(ref));
                    }
                    else {
                        if (interval === null) {
                            interval = setInterval(function() {
                                printProvider.getStatus(ref, statusCallback);
                            }, Math.max(500, currentStatus.time * 0.6));
                        }
                        if (console) {
                            printStatusTemplate = new Ext.XTemplate(
                                '<tpl for=".">Queue position: {count}<br />Mean time per print: {timeS} [s]</tpl>');
                            printStatusTemplate.compile();
                            currentStatus.timeS = currentStatus.time / 1000.0;
                            printStatusTemplate.apply(currentStatus);
                        }
                    }
                };
                var printCallback = function(ref) {
                    printProvider.getStatus(ref, statusCallback);
                };
                printExtent.print({}, printCallback);
            }
        }]
    });

    printProvider.on({
        'loadcapabilities': function() {
            printExtent.addPage();
        }
    });
    printProvider.loadCapabilities();
});
