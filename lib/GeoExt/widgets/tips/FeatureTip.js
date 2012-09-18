/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt
 *  class = FeatureTip
 *  base_link = `Ext.Tip <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Tip>`_
 */
Ext.namespace("GeoExt");

/** api: example
 *  Sample code to create a feature tip:
 *
 *  .. code-block:: javascript
 *
 *      var bogusMarkup = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.";
 *      var featureTip = new GeoExt.FeatureTip({
 *          location: feature,
 *          width: 100,
 *          map: mapPanel.map,
 *          html: bogusMarkup
 *      });
 *      featureTip.show();
 */

/** api: constructor
 *  .. class:: FeatureTip(config)
 *
 *      Create a tip displaying at the location of a feature.
 */
GeoExt.FeatureTip = Ext.extend(Ext.Tip, {

    /** api: config[map]
     *  ``OpenLayers.Map``
     */
    map: null,

    /** api: config[location]
     *  ``OpenLayers.Feature.Vector``
     */
    location: null,

    /** private: method[initComponent]
     *  Initializes the feature tip.
     */
    initComponent: function() {
        var centroid = this.location.geometry.getCentroid();
        this.location = new OpenLayers.LonLat(centroid.x, centroid.y);
        this.map.events.on({
            "move" : this.show,
            scope : this
        });
        GeoExt.FeatureTip.superclass.initComponent.call(this);
    },  

    /** private: method[beforeDestroy]
     *  Cleanup events before destroying the feature tip.
     */
    beforeDestroy: function() {
        this.map.events.un({
            "move" : this.show,
            scope : this
        });
        GeoExt.FeatureTip.superclass.beforeDestroy.call(this);
    },
    
    /** private: method[getPosition]
     *  Get the position of the feature in pixel space.
     *
     *  :returns: ``Array`` The position of the feature in pixel space or
     *  null if the feature is not visible in the map.
     */
    getPosition: function() {
        if (this.map.getExtent().containsLonLat(this.location)) {
            var locationPx = this.map.getPixelFromLonLat(this.location),
                mapBox = Ext.fly(this.map.div).getBox(true),
                y = locationPx.y + mapBox.y,
                x = locationPx.x + mapBox.x;
            return [x, y];
        } else {
            return null;
        }
    },

    /** api: method[show]
     *  Show the feature tip.
     */
    show: function() {
        var position = this.getPosition();
        if (position !== null) {
            this.showAt(position);
        } else {
            this.hide();
        }
    }

});
