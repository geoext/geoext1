.. currentmodule:: GeoExt.data

:class:`GeoExt.data.ProtocolProxy`
==================================

.. class:: ProtocolProxy

    Create an ``Ext.data.DataProxy`` with an ``OpenLayers.Protocol`` for
    requesting remote feature data.

    .. rubric:: Extends
    
    * `Ext.data.DataProxy`_

.. _`Ext.data.DataProxy`: http://extjs.com/deploy/dev/docs/?class=Ext.data.DataProxy
    

Config Options
--------------

Configuration properties in addition to those listed for `Ext.data.DataProxy`_.

.. describe:: protocol

    ``OpenLayers.Protocol``  The protocol used to fetch features.

.. describe:: abortPrevious

    ``Boolean``  Abort the previous request, defaults to ``true``.


Public Methods
--------------

Public methods in addition to those for `Ext.data.DataProxy`_.

.. method:: ProtocolProxy.load(params, reader, callback, scope, arg)

    :param params: ``Object`` An object containing properties which are to be
        used as HTTP parameters for the request to the remote server.

    :param reader: ``Ext.data.DataReader`` The Reader object which converts the
        data object into a block of ``Ext.data.Record`` objects.

    :param callback: ``Function``  The function into which to pass the block of
        ``Ext.data.Record`` objects. The function is passed the Record block
        object, the ``arg`` argument passed to the :meth:`load` function,
        and a boolean success indicator.

    :param scope: ``Object`` The scope in which to call the callback.

    :param arg: ``Object`` An optional argument which is passed to the callback
        as its second parameter.
