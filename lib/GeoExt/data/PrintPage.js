/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */
Ext.namespace("GeoExt.data");

/** api: (define)
 *  module = GeoExt.data
 *  class = PrintPage
 *  base_link = `Ext.util.Observable <http://extjs.com/deploy/dev/docs/?class=Ext.util.Observable>`_
 */

/** api: constructor
 *  .. class:: PrintPage
 * 
 *  Provides a representation of a print page for
 *  :class:`GeoExt.data.PrintProvider`. The extent of the page is stored as
 *  ``OpenLayers.Feature.Vector``. Widgets can use this to display the print
 *  extent on the map. In addition, a handle feature is also provided, which
 *  controls can use to modify the print extent's scale and rotation.
 */
GeoExt.data.PrintPage = Ext.extend(Ext.util.Observable, {
    
    /** api:config[printProvider]
     * :class:`GeoExt.data.PrintProvider` The print provider to use with
     * this page.
     */
    
    /** private: property[printProvider]
     *  :class:`GeoExt.data.PrintProvider`
     */
    printProvider: null,
    
    /** api: property[feature]
     *  ``OpenLayers.Feature.Vector`` Feature representing the page extent.
     *  Read-only.
     */
    feature: null,
    
    /** private: property[handles]
     *  Array(``OpenLayers.Feature.Vector``) Features providing the four
     *  scale/rotation handles for the page.
     */
    handles: null,
    
    /** api: property[scale]
     *  ``Ext.data.Record`` The current scale record of the page. Read-only.
     */
    scale: null,
    
    /** api: property[rotation]
     *  ``Float`` The current rotation of the page. Read-only.
     */
    rotation: 0,
    
    /** api:config[customParams]
     *  ``Object`` Key-value pairs of additional parameters that the
     *  printProvider will send to the print service for this page.
     */

    /** api: property[customParams]
     *  ``Object`` Key-value pairs of additional parameters that the
     *  printProvider will send to the print service for this page.
     */
    customParams: null,
    
    /** private: method[constructor]
     *  Private constructor override.
     */
    constructor: function(config) {
        this.initialConfig = config;
        Ext.apply(this, config);
        
        if(!this.customParams) {
            this.customParams = {};
        }
        
        this.addEvents(
            /** api: events[change]
             *  Triggered when any of the page properties have changed
             *  
             *  Listener arguments:
             *  * printPage - :class:`GeoExt.data.PrintPage` this printPage
             */
            "change"
        );

        GeoExt.data.PrintPage.superclass.constructor.apply(this, arguments);

        this.feature = new OpenLayers.Feature.Vector(
            OpenLayers.Geometry.fromWKT("POLYGON((-1 -1,1 -1,1 1,-1 1,-1 -1))"));
        this.handles = [
            new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(-1,-1)
            ),
            new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(1,-1)
            ),
            new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(1,1)
            ),
            new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(-1,1)
            )
        ];
        
        this.printProvider.on({
            "layoutchange": this.onLayoutChange,
            scope: this
        });
    },

    /** api: method[getCenter]
     *  :return: ``OpenLayers.LonLat``
     *  
     *  Returns the current page center.
     */
    getCenter: function() {
        return this.feature.geometry.getBounds().getCenterLonLat();
    },
    
    /** api: method[setScale]
     *  :param scale: ``Ext.data.Record`` The new scale record.
     *  :param units: ``String`` map units to use for the scale calculation.
     *      Optional if a ``layer`` that is added to a map was configured.
     *      If neither is provided, "dd" will be assumed.
     * 
     *  Updates the page geometry to match a given scale. Since this takes the
     *  current layout of the printProvider into account, this can be used to
     *  update the page geometry feature when the layout has changed.
     */
    setScale: function(scale, units) {
        var bounds = this.calculatePageBounds(scale, units);
        var geom = bounds.toGeometry();
        var rotation = this.rotation;
        if(rotation != 0) {
            geom.rotate(-rotation, geom.getCentroid());
        }
        this.scale = scale;
        this.updateFeature(geom);
    },
    
    /** api: method[setCenter]
     *  :param center: ``OpenLayers.LonLat`` The new center.
     * 
     *  Moves the page extent to a new center.
     */
    setCenter: function(center) {
        var geom = this.feature.geometry;
        var oldCenter = geom.getBounds().getCenterLonLat();
        var dx = center.lon - oldCenter.lon;
        var dy = center.lat - oldCenter.lat;
        geom.move(dx, dy);
        this.updateFeature(geom);
    },
    
    /** api: method[setRotation]
     *  :param rotation: ``Float`` The new rotation.
     *  
     *  Sets a new rotation for the page geometry.
     */
    setRotation: function(rotation) {
        if(this.printProvider.layout.get("rotation") === true) {
            var geom = this.feature.geometry;
            geom.rotate(this.rotation - rotation, geom.getCentroid());
            this.rotation = rotation;
            this.updateFeature(geom);
        }
    },
    
    /** api: method[fit]
     *  :param map: :class:`GeoExt.MapPanel`|``OpenLayers.Map`` The map to fit
     *      the page to.
     *  :param loose: ``Boolean`` If true, the closest matching print extent
     *      will be chosen. If set to false, the chosen print extent will
     *      be the closest one that entirely fits into the visible map extent.
     *      Default is false.
     * 
     *  Fits the page layout to the current map extent. If the map has not
     *  been centered yet, this will do nothing.
     */
    fit: function(map, loose) {
        if(map instanceof GeoExt.MapPanel) {
            map = map.map;
        }
        var center = map.getCenter();
        if(!center) {
            return;
        }
        this.suspendEvents();
        this.setCenter(center);
        this.resumeEvents();
        var extent = map.getExtent();
        var units = map.getUnits();
        var scale, looseScale, contains;
        this.printProvider.scales.each(function(rec) {
            looseScale = scale || rec;
            scale = rec;
            contains = extent.containsBounds(
                this.calculatePageBounds(scale, units));
            return !contains
        }, this);
        this.setScale(loose && contains ? looseScale : scale, units);
    },

    /** private: method[updateByHandle]
     *  :param handle: ``OpenLayers.Feature.Vector`` the handle to use.
     *  :param updateHandles: ``Boolean`` If set to false, only the feature
     *      will be updated, but the handles will not be aligned. Defaults to
     *      false.
     *  :param rotationIncrement: ``Float`` Optional rotation increment.
     *      Defaults to 1.
     *  
     *  Updates scale and rotation based on the current handle location. This
     *  method is useful for drag handlers on the handle geometry, when
     *  displayed on a layer.
     */
    updateByHandle: function(handle, updateHandles, rotationIncrement) {
        rotationIncrement = rotationIncrement || 1;
        var handles = this.handles;
        handle = handle || handles[0];
        var handleIndex = handles.indexOf(handle);
        if(handleIndex === -1) {
            return;
        }

        var rotate = this.printProvider.layout.get("rotation");
        var vertices = this.feature.geometry.components[0].components;
        var fGeom = this.feature.geometry;
        var hGeom = handle.geometry;
        var origin = fGeom.getCentroid();

        // resize handles
        var resizeBy = origin.distanceTo(handle.geometry) /
            origin.distanceTo(vertices[handleIndex]);
        var handleRect = fGeom.clone();
        handleRect.resize(resizeBy, origin);

        // rotate handles
        if(rotate) {
            var dxH = hGeom.x - origin.x;
            var dyH = hGeom.y - origin.y;
            var dxRef = vertices[handleIndex].x - origin.x;
            var dyRef = vertices[handleIndex].y - origin.y;
            var handleRot = Math.round(Math.atan2(dxH, dyH) * 180 / Math.PI) -
                Math.round(Math.atan2(dxRef, dyRef) * 180 / Math.PI);
            handleRot && handleRect.rotate(-handleRot, origin);
        }
        
        this.updateHandles(handleRect, handle);

        // fit scale of the page to the handle rectangle
        var top = new OpenLayers.Geometry.LineString([
            handles[2].geometry, handles[3].geometry]);
        var topCenter = top.getBounds().getCenterLonLat();
        var dist = new OpenLayers.Geometry.Point(
            topCenter.lon, topCenter.lat).distanceTo(origin);
        var scaleFits = [], distHash = {};
        this.printProvider.scales.each(function(rec){
            var bounds = this.calculatePageBounds(rec);
            var d = Math.abs((bounds.getHeight() / 2) - dist);
            scaleFits.push(d);
            distHash[d.toPrecision(8)] = rec;
        }, this);
        var min = scaleFits.concat().sort(function(a,b){return a<b?-1:1;})[0];
        var scale = distHash[min.toPrecision(8)];
        var bounds = this.calculatePageBounds(scale);
        var geom = bounds.toGeometry();

        // fit rotation of the page to the handle rectangle
        var rotation = 0;
        if(rotate) {
            var dx = topCenter.lon - origin.x;
            var dy = topCenter.lat - origin.y;
            rotation = Math.round(
                Math.atan2(dx, dy) * 180 / Math.PI / rotationIncrement) *
                rotationIncrement;
            geom.rotate(-rotation, geom.getCentroid());
        }
        
        this.scale = scale;
        this.rotation = rotation;
        this.updateFeature(geom, updateHandles === true);
    },

    /** private: method[updateFeature]
     *  :param geometry: ``OpenLayers.Geometry`` New geometry for the feature.
     *      If not provided, the existing geometry will be left unchanged.
     *  :param updateHandles: ``Boolean`` If set to false, only the feature
     *      will be updated, but the handles will not be aligned. Defaults to
     *      true.
     *      
     *  Updates the page feature with a new geometry and aligns the handle
     *  with it.
     */
    updateFeature: function(geometry, updateHandles) {
        var f = this.feature;
        geometry.id = f.geometry.id;
        f.geometry = geometry;
        f.layer && f.layer.drawFeature(f);
        
        if(updateHandles !== false) {
            this.updateHandles();
        }
        this.fireEvent("change", this);
    },
    
    /** private: method[updateHandles]
     *  :param geometry: ``OpenLayers.Geometry.Polygon`` Optional. If provided,
     *      handle geometries will be taken from the vertices of the provided
     *      polygon instead of this page's feature's geometry.
     *  :param excludeHandle: ``OpenLayers.Feature``. Optional. If one of the
     *      features of the handles array is provided, its geometry will not be
     *      updated.
     */
    updateHandles: function(geometry, excludeHandle) {
        var f = this.feature;
        var h = this.handles;
        var c = (geometry || f.geometry).components[0].components;
        var layer = h[0].layer;
        var id, handle, hGeom;
        for(var i=0; i<4; ++i) {
            handle = h[i];
            if(handle !== excludeHandle) {
                hGeom = handle.geometry;
                id = hGeom.id;
                hGeom = c[i].clone();
                hGeom.id = id;
                handle.geometry = hGeom;
                layer && layer.drawFeature(handle);
            }
        }
    },
    
    /** private: method[calculatePageBounds]
     *  :param scale: ``Ext.data.Record`` Scale record to calculate the page
     *      bounds for.
     *  :param units: ``String`` Map units to use for the scale calculation.
     *      Optional if ``feature`` is added to layer which is added to a
     *      map. If not provided, "dd" will be assumed.
     *  :return: ``OpenLayers.Bounds``
     *  
     *  Calculates the page bounds for a given scale.
     */
    calculatePageBounds: function(scale, units) {
        var s = scale.get("value");
        var f = this.feature;
        var geom = this.feature.geometry;
        var center = geom.getBounds().getCenterLonLat();

        var size = this.printProvider.layout.get("size");
        var units = units ||
            (f.layer && f.layer.map && f.layer.map.getUnits()) ||
            "dd";
        var unitsRatio = OpenLayers.INCHES_PER_UNIT[units];
        var w = size.width / 72 / unitsRatio * s / 2;
        var h = size.height / 72 / unitsRatio * s / 2;
        
        return new OpenLayers.Bounds(center.lon - w, center.lat - h,
            center.lon + w, center.lat + h);
    },
    
    /** private: method[onLayoutChange]
     *  Handler for the printProvider's layoutchange event.
     */
    onLayoutChange: function() {
        this.updateByHandle(this.handles[0], true);
    },
    
    /** private: method[destroy]
     */
    destroy: function() {
        this.printProvider.un("layoutchange", this.onLayoutChange, this);
    }

});
