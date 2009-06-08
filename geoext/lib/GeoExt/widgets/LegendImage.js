/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt
 *  class = LegendImage
 */

Ext.namespace('GeoExt');

/** api: constructor
 *  .. class:: LegendImage(config)
 *
 *  Show a legend image in a BoxComponent and make sure load errors are dealt
 *  with.
 */
GeoExt.LegendImage = Ext.extend(Ext.BoxComponent, {

    /** api: config[url]
     *  ``String``  The url of the image to load
     */
    url: null,

    /** api: config[imgCls]
     *  ``String``  Optional css class to apply to img tag
     */
    imgCls: null,

    /** private: method[initComponent]
     *  Initializes the legend image component. 
     */
    initComponent: function() {
        GeoExt.LegendImage.superclass.initComponent.call(this);
        this.autoEl = {tag: 'img',
            'class': (this.imgCls ? this.imgCls : ''), src: this.url};
    },

    /** api: method[setUrl]
     *  :param url: ``String`` The new url of the image.
     *  
     *  Sets the url of the image.
     */
    setUrl: function(url) {
        var el = this.getEl();
        if (el) {
            el.dom.src = url;
        }
    },

    /** private: method[onRender]
     *  Private method called when the legend image component is being
     *  rendered.
     */
    onRender: function(ct, position) {
        GeoExt.LegendImage.superclass.onRender.call(this, ct, position);
        this.getEl().on('error', this.onImageLoadError, this);
    },

    /** private: method[onDestroy]
     *  Private method called during the destroy sequence.
     */
    onDestroy: function() {
        this.getEl().un('error', this.onImageLoadError, this);
        GeoExt.LegendImage.superclass.onDestroy.apply(this, arguments);
    },
    
    /** private: method[onImageLoadError]
     *  Private method called if the legend image fails loading.
     */
    onImageLoadError: function() {
        this.getEl().dom.src = Ext.BLANK_IMAGE_URL;
    }

});

Ext.reg('gx_legendimage', GeoExt.LegendImage);
