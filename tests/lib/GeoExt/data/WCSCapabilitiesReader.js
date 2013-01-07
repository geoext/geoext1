var doc = (new OpenLayers.Format.XML).read(
'<?xml version="1.0" encoding="UTF-8"?>' +
'<Capabilities xmlns="http://www.opengis.net/wcs/1.1" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" version="1.1.0" xsi:schemaLocation="http://www.opengis.net/wcs/1.1 http://schemas.opengis.net/wcs/1.1/wcsGetCapabilities.xsd http://www.opengis.net/ows/1.1 http://schemas.opengis.net/ows/1.1.0/owsAll.xsd">' +
  '<ows:ServiceIdentification>' +
    '<ows:Title>Web-Service Demo with data stored at TUDOR site</ows:Title>' +
    '<ows:Abstract>This installation serves different Web-Service types (WMS, WFS) for testing</ows:Abstract>' +
    '<ows:Keywords>' +
      '<ows:Keyword>Geospatial WebServices</ows:Keyword>' +
      '<ows:Keyword>Keyword One</ows:Keyword>' +
      '<ows:Keyword>Keyword Two!!</ows:Keyword>' +
    '</ows:Keywords>' +
    '<ows:ServiceType codeSpace="OGC">OGC WCS</ows:ServiceType>' +
    '<ows:ServiceTypeVersion>1.1.0</ows:ServiceTypeVersion>' +
    '<ows:Fees>No fee!</ows:Fees>' +
    '<ows:AccessConstraints>Unconstrained!</ows:AccessConstraints>' +
  '</ows:ServiceIdentification>' +
  '<ows:ServiceProvider>' +
    '<ows:ProviderName>CRP Henri Tudor</ows:ProviderName>' +
    '<ows:ProviderSite xlink:type="simple" xlink:href="http://services.testorama.lu/cgi-bin/mapserv?map=/var/www/MapFiles/RO_localOWS_test.map&amp;"/>' +
    '<ows:ServiceContact>' +
      '<ows:IndividualName>Roy Dumerde</ows:IndividualName>' +
      '<ows:PositionName>R+D engineer</ows:PositionName>' +
      '<ows:ContactInfo>' +
        '<ows:Phone>' +
          '<ows:Voice>6463320</ows:Voice>' +
          '<ows:Facsimile>6465955</ows:Facsimile>' +
        '</ows:Phone>' +
        '<ows:Address>' +
          '<ows:DeliveryPoint>66, rue de Luxembourg</ows:DeliveryPoint>' +
          '<ows:City>Esch-sur-Alzette</ows:City>' +
          '<ows:AdministrativeArea/>' +
          '<ows:PostalCode>97202</ows:PostalCode>' +
          '<ows:Country>Luxembourg</ows:Country>' +
          '<ows:ElectronicMailAddress>flappy@tutones.com</ows:ElectronicMailAddress>' +
        '</ows:Address>' +
        '<ows:OnlineResource xlink:type="simple" xlink:href="http://services.testorama.lu/cgi-bin/mapserv?map=/var/www/MapFiles/RO_localOWS_test.map&amp;"/>' +
        '<ows:HoursOfService>24/7</ows:HoursOfService>' +
        '<ows:ContactInstructions>by phone</ows:ContactInstructions>' +
      '</ows:ContactInfo>' +
      '<ows:Role>GIS-Analyst</ows:Role>' +
    '</ows:ServiceContact>' +
  '</ows:ServiceProvider>' +
  '<ows:OperationsMetadata>' +
    '<ows:Operation name="GetCapabilities">' +
      '<ows:DCP>' +
        '<ows:HTTP>' +
          '<ows:Get xlink:type="simple" xlink:href="http://services.testorama.lu/cgi-bin/mapserv?map=/var/www/MapFiles/RO_localOWS_test.map&amp;"/>' +
          '<ows:Post xlink:type="simple" xlink:href="http://services.testorama.lu/cgi-bin/mapserv?map=/var/www/MapFiles/RO_localOWS_test.map&amp;"/>' +
        '</ows:HTTP>' +
      '</ows:DCP>' +
      '<ows:Parameter name="service">' +
        '<ows:AllowedValues>' +
          '<ows:Value>WCS</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
      '<ows:Parameter name="version">' +
        '<ows:AllowedValues>' +
          '<ows:Value>1.1.0</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
    '</ows:Operation>' +
    '<ows:Operation name="DescribeCoverage">' +
      '<ows:DCP>' +
        '<ows:HTTP>' +
          '<ows:Get xlink:type="simple" xlink:href="http://services.testorama.lu/cgi-bin/mapserv?map=/var/www/MapFiles/RO_localOWS_test.map&amp;"/>' +
          '<ows:Post xlink:type="simple" xlink:href="http://services.testorama.lu/cgi-bin/mapserv?map=/var/www/MapFiles/RO_localOWS_test.map&amp;"/>' +
        '</ows:HTTP>' +
      '</ows:DCP>' +
      '<ows:Parameter name="service">' +
        '<ows:AllowedValues>' +
          '<ows:Value>WCS</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
      '<ows:Parameter name="version">' +
        '<ows:AllowedValues>' +
          '<ows:Value>1.1.0</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
      '<ows:Parameter name="identifiers">' +
        '<ows:AllowedValues>' +
          '<ows:Value>ro_dsm</ows:Value>' +
          '<ows:Value>ro_dsm_mini</ows:Value>' +
          '<ows:Value>ro_irra</ows:Value>' +
          '<ows:Value>ro_irra_ext</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
    '</ows:Operation>' +
    '<ows:Operation name="GetCoverage">' +
      '<ows:DCP>' +
        '<ows:HTTP>' +
          '<ows:Get xlink:type="simple" xlink:href="http://services.testorama.lu/cgi-bin/mapserv?map=/var/www/MapFiles/RO_localOWS_test.map&amp;"/>' +
          '<ows:Post xlink:type="simple" xlink:href="http://services.testorama.lu/cgi-bin/mapserv?map=/var/www/MapFiles/RO_localOWS_test.map&amp;"/>' +
        '</ows:HTTP>' +
      '</ows:DCP>' +
      '<ows:Parameter name="service">' +
        '<ows:AllowedValues>' +
          '<ows:Value>WCS</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
      '<ows:Parameter name="version">' +
        '<ows:AllowedValues>' +
          '<ows:Value>1.1.0</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
      '<ows:Parameter name="Identifier">' +
        '<ows:AllowedValues>' +
          '<ows:Value>ro_dsm</ows:Value>' +
          '<ows:Value>ro_dsm_mini</ows:Value>' +
          '<ows:Value>ro_irra</ows:Value>' +
          '<ows:Value>ro_irra_ext</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
      '<ows:Parameter name="InterpolationType">' +
        '<ows:AllowedValues>' +
          '<ows:Value>NEAREST_NEIGHBOUR</ows:Value>' +
          '<ows:Value>BILINEAR</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
      '<ows:Parameter name="format">' +
        '<ows:AllowedValues>' +
          '<ows:Value>image/tiff</ows:Value>' +
          '<ows:Value>image/png</ows:Value>' +
          '<ows:Value>image/jpeg</ows:Value>' +
          '<ows:Value>image/gif</ows:Value>' +
          '<ows:Value>image/png; mode=8bit</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
      '<ows:Parameter name="store">' +
        '<ows:AllowedValues>' +
          '<ows:Value>false</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
      '<ows:Parameter name="GridBaseCRS">' +
        '<ows:AllowedValues>' +
          '<ows:Value>urn:ogc:def:crs:epsg::4326</ows:Value>' +
        '</ows:AllowedValues>' +
      '</ows:Parameter>' +
    '</ows:Operation>' +
  '</ows:OperationsMetadata>' +
  '<Contents>' +
    '<CoverageSummary>' +
      '<ows:Title>Rotterdam DSM</ows:Title>' +
      '<ows:Abstract>Digital Surface Model (DSM) raster data set of inner city Rotterdam</ows:Abstract>' +
      '<ows:WGS84BoundingBox dimensions="2">' +
        '<ows:LowerCorner>4.471333734139 51.912813427383</ows:LowerCorner>' +
        '<ows:UpperCorner>4.4808508475645 51.9248713705576</ows:UpperCorner>' +
      '</ows:WGS84BoundingBox>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::28992</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::900913</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::3857</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::4326</SupportedCRS>' +
      '<SupportedFormat>image/tiff</SupportedFormat>' +
      '<Identifier>ro_dsm</Identifier>' +
    '</CoverageSummary>' +
    '<CoverageSummary>' +
      '<ows:Title>Rotterdam sample DSM subset</ows:Title>' +
      '<ows:Abstract>This a test data set of Rotterdams DSM subset</ows:Abstract>' +
      '<ows:WGS84BoundingBox dimensions="2">' +
        '<ows:LowerCorner>4.47489346945755 51.9159453786927</ows:LowerCorner>' +
        '<ows:UpperCorner>4.47687824892444 51.9170706688033</ows:UpperCorner>' +
      '</ows:WGS84BoundingBox>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::28992</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::900913</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::3857</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::4326</SupportedCRS>' +
      '<SupportedFormat>image/tiff</SupportedFormat>' +
      '<Identifier>ro_dsm_mini</Identifier>' +
    '</CoverageSummary>' +
    '<CoverageSummary>' +
      '<ows:Title>Rotterdam (Ljinbaan) solar irradiation data 2010</ows:Title>' +
      '<ows:Abstract>This a result data set of a solar computation of Ljinbaan area. It shows the sum of kWh/a per sqmeter for 2010</ows:Abstract>' +
      '<ows:WGS84BoundingBox dimensions="2">' +
        '<ows:LowerCorner>4.471333734139 51.912813427383</ows:LowerCorner>' +
        '<ows:UpperCorner>4.4808508475645 51.9248713705576</ows:UpperCorner>' +
      '</ows:WGS84BoundingBox>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::28992</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::900913</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::3857</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::4326</SupportedCRS>' +
      '<SupportedFormat>image/tiff</SupportedFormat>' +
      '<Identifier>ro_irra</Identifier>' +
    '</CoverageSummary>' +
    '<CoverageSummary>' +
      '<ows:Title>Rotterdam (extended) solar irradiation data 2010</ows:Title>' +
      '<ows:Abstract>This a result data set of a solar computation of extended Rotterdam area. It shows the sum of kWh/a per sqmeter for 2010</ows:Abstract>' +
      '<ows:WGS84BoundingBox dimensions="2">' +
        '<ows:LowerCorner>4.10024171314823 51.9359764992844</ows:LowerCorner>' +
        '<ows:UpperCorner>4.21909054278063 52.001415228243</ows:UpperCorner>' +
      '</ows:WGS84BoundingBox>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::28992</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::900913</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::3857</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::4326</SupportedCRS>' +
      '<SupportedFormat>image/tiff</SupportedFormat>' +
      '<Identifier>ro_irra_ext</Identifier>' +
    '</CoverageSummary>' +
  '</Contents>' +
'</Capabilities>' );
