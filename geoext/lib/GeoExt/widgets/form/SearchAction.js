/* Copyright (C) 2008-2009 The Open Source Geospatial Foundation
 * Published under the BSD license.
 * See http://geoext.org/svn/geoext/core/trunk/license.txt for the full text
 * of the license.
 * 
 * pending approval */

/** api: (define)
 *  module = GeoExt.form
 *  class = SearchAction
 *  base_link = `Ext.form.Action <http://extjs.com/deploy/dev/docs/?class=Ext.form.Action>`_
 */

Ext.namespace("GeoExt.form");
 
/** api: example
 *  Sample code showing how to use a GeoExt SearchAction with an Ext form panel:
 *  
 *  .. code-block:: javascript
 *
 *      var formPanel = new Ext.form.Panel({
 *          renderTo: "formpanel",
 *          items: [{
 *              xtype: "textfield",
 *              name: "name__like",
 *              value: "mont"
 *          }, {
 *              xtype: "textfield",
 *              name: "elevation__ge",
 *              value: "2000"
 *          }]
 *      });
 *
 *      var searchAction = new GeoExt.form.SearchAction(formPanel.getForm(), {
 *          protocol: new OpenLayers.Protocol.WFS({
 *              url: "http://publicus.opengeo.org/geoserver/wfs",
 *              featureType: "tasmania_roads",
 *              featureNS: "http://www.openplans.org/topp"
 *          })
 *      });
 *
 *      formPanel.getForm().doAction(searchAction, {
 *          callback: function(response) {
 *              // response.features includes the features read
 *              // from the server through the protocol
 *          }
 *      });
 */

/**
 * Function: GeoExt.form.filterFromForm
 * Create an {OpenLayers.Filter} object from a {Ext.form.BasicForm}
 *     instance or a {Ext.form.FormPanel}.
 *
 * Parameters:
 * form - {Ext.form.BasicForm|Ext.form.FormPanel}
 * logicalOp - {String} Either {OpenLayers.Filter.Logical.AND}
 *     or {OpenLayers.Filter.Logical.OR}, set to
 *     {OpenLayers.Filter.Logical.AND} if null or
 *     undefined.
 *
 * Returns:
 * {OpenLayers.Filter}
 */
GeoExt.form.filterFromForm = function(form, logicalOp) {
    if(form instanceof Ext.form.FormPanel) {
        form = form.getForm();
    }
    var filters = [], values = form.getValues(false);
    for(var prop in values) {
        var s = prop.split("__");

        var value = values[prop], type;

        if(s.length > 1 && 
           (type = GeoExt.form.filterFromForm.FILTER_MAP[s[1]]) !== undefined) {
            prop = s[0];
        } else {
            type = OpenLayers.Filter.Comparison.EQUAL_TO;
        }

        filters.push(
            new OpenLayers.Filter.Comparison({
                type: type,
                value: value,
                property: prop
            })
        );
    }

    return new OpenLayers.Filter.Logical({
        type: logicalOp || OpenLayers.Filter.Logical.AND,
        filters: filters
    });
};

/**
 * Constant: GeoExt.form.filterFromForm.FILTER_MAP
 * An object mapping operator strings as found in field names to
 *     {OpenLayers.Filter.Comparison} types.
 */
GeoExt.form.filterFromForm.FILTER_MAP = {
    "eq": OpenLayers.Filter.Comparison.EQUAL_TO,
    "ne": OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
    "lt": OpenLayers.Filter.Comparison.LESS_THAN,
    "le": OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
    "gt": OpenLayers.Filter.Comparison.GREATER_THAN,
    "ge": OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
    "like": OpenLayers.Filter.Comparison.LIKE
};

/** api: constructor
 *  .. class:: SearchAction(form, options)
 *
 *      A specific ``Ext.form.Action`` to be used when using a form to do
 *      trigger search requests througn an ``OpenLayers.Protocol``.
 *
 *      Arguments:
 *
 *      * form ``Ext.form.BasicForm`` A basic form instance.
 *      * options ``Object`` Options passed to the protocol'read method
 *
 *      When run this action builds an ``OpenLayers.Filter`` from the form
 *      and passes this filter to its protocol's read method. The form fields
 *      must be named after a specific convention, so that an appropriate 
 *      ``OpenLayers.Filter.Comparison`` filter is created for each
 *      field.
 *
 *      For example a field with the name ``foo__like`` would result in an
 *      ``OpenLayers.Filter.Comparison`` of type
 *      ``OpenLayers.Filter.Comparison.LIKE`` being created.
 *
 *      Here is the convention:
 *
 *      * ``<name>__eq: OpenLayers.Filter.Comparison.EQUAL_TO``
 *      * ``<name>__ne: OpenLayers.Filter.Comparison.NOT_EQUAL_TO``
 *      * ``<name>__lt: OpenLayers.Filter.Comparison.LESS_THAN``
 *      * ``<name>__le: OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO``
 *      * ``<name>__gt: OpenLayers.Filter.Comparison.GREATER_THAN``
 *      * ``<name>__ge: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO``
 *      * ``<name>__like: OpenLayers.Filter.Comparison.LIKE``
 *
 *      In most cases your would not directly create ``GeoExt.form.SearchAction``
 *      objects, but use :class:`GeoExt.form.FormPanel` instead.
 */
GeoExt.form.SearchAction = Ext.extend(Ext.form.Action, {
    /** private: property[type]
     *  ``String`` The action type string.
     */
    type: "search",

    /** api: property[response]
     *  ``OpenLayers.Protocol.Response`` A reference to the response
     *  resulting from the search request. Read-only.
     */
    response: null,

    /** private */
    constructor: function(form, options) {
        GeoExt.form.SearchAction.superclass.constructor.call(this, form, options);
    },

    /** private: method[run]
     *  Run the action.
     */
    run: function() {
        var o = this.options;
        var f = GeoExt.form.filterFromForm(this.form);
        if(o.clientValidation === false || this.form.isValid()){
            this.response = o.protocol.read(
                Ext.applyIf({
                    filter: f,
                    callback: this.handleResponse,
                    scope: this
                }, o)
            );
        } else if(o.clientValidation !== false){
            // client validation failed
            this.failureType = Ext.form.Action.CLIENT_INVALID;
            this.form.afterAction(this, false);
        }
    },

    /** private: method[handleResponse]
     *  :param response: ``OpenLayers.Protocol.Response`` The response
     *  object.
     *
     *  Handle the response to the search query.
     */
    handleResponse: function(response) {
        this.response = response;
        if(response.success()) {
            this.form.afterAction(this, true);
        } else {
            this.form.afterAction(this, false);
        }
        var o = this.options;
        if(o.callback) {
            o.callback.call(o.scope, response);
        }
    }
});
