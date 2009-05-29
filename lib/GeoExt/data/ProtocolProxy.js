/*
 * Copyright (C) 2008 Eric Lemoine, Camptocamp France SAS
 *
 * This file is part of GeoExt
 *
 * GeoExt is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * GeoExt is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GeoExt.  If not, see <http://www.gnu.org/licenses/>.
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = ProtocolProxy
 *  base_link = `Ext.data.DataProxy <http://extjs.com/deploy/dev/docs/?class=Ext.data.DataProxy>`_
 */
Ext.namespace('GeoExt', 'GeoExt.data');

GeoExt.data.ProtocolProxy = function(config) {
    GeoExt.data.ProtocolProxy.superclass.constructor.call(this);
    Ext.apply(this, config);
};

/** api: constructor
 *  .. class:: ProtocolProxy
 *   
 *      A data proxy for use with ``OpenLayers.Proxy`` objects.
 */
Ext.extend(GeoExt.data.ProtocolProxy, Ext.data.DataProxy, {

    /** api: config[protocol]
     *  ``OpenLayers.Protocol``
     *  The protocol used to fetch features.
     */
    protocol: null,

    /** api: config[abortPrevious]
     *  ``Boolean``
     *  Abort any previous request before issuing another.  Default is ``true``.
     */
    abortPrevious: true,

    /** private: property[response]
     *  ``OpenLayers.Protocol.Response``
     *  The response returned by the read call on the protocol.
     */
    response: null,

    /** private: method[load]
     *  :param params: ``Object`` An object containing properties which are to
     *      be used as HTTP parameters for the request to the remote server.
     *  :param reader: ``Ext.data.DataReader`` The Reader object which converts
     *      the data object into a block of ``Ext.data.Records``.
     *  :param callback: ``Function`` The function into which to pass the block
     *      of ``Ext.data.Records``. The function is passed the Record block
     *      object, the ``args`` argument passed to the load function, and a
     *      boolean success indicator.
     *  :param scope: ``Object`` The scope in which to call the callback.
     *  :param arg: ``Object`` An optional argument which is passed to the
     *      callback as its second parameter.
     *
     *  Calls ``read`` on the protocol.
     */
    load: function(params, reader, callback, scope, arg) {
        if (this.fireEvent("beforeload", this, params) !== false) {
            var o = {
                params: params || {},
                request: {
                    callback: callback,
                    scope: scope,
                    arg: arg
                },
                reader: reader
            };
            var cb = OpenLayers.Function.bind(this.loadResponse, this, o);
            if (this.abortPrevious) {
                this.abortRequest();
            }
            var options = {
                params: params,
                callback: cb,
                scope: this
            };
            Ext.applyIf(options, arg);
            this.response = this.protocol.read(options);
        } else {
           callback.call(scope || this, null, arg, false);
        }
    },

    /** private: method[abortRequest]
     *  Called to abort any ongoing request.
     */
    abortRequest: function() {
        // FIXME really we should rely on the protocol itself to
        // cancel the request, the Protocol class in OpenLayers
        // 2.7 does not expose a cancel() method
        if (this.response) {
            var response = this.response;
            if (response.priv &&
                typeof response.priv.abort == "function") {
                response.priv.abort();
                this.response = null;
            }
        }
    },

    /** private: method[loadResponse]
     *  :param o: ``Object``
     *  :param response: ``OpenLayers.Protocol.Response``
     *  
     *  Handle response from the protocol
     */
    loadResponse: function(o, response) {
        if (response.success()) {
            var result = o.reader.read(response);
            this.fireEvent("load", this, o, o.request.arg);
            o.request.callback.call(
               o.request.scope, result, o.request.arg, true);
        } else {
            this.fireEvent("loadexception", this, o, response);
            o.request.callback.call(
                o.request.scope, null, o.request.arg, false);
        }
    }
});
