// MapServer, v1.0.0
var doc100 = (new OpenLayers.Format.XML).read(
'<?xml version="1.0" encoding="UTF-8"?>' +
'<CoverageDescription xmlns="http://www.opengis.net/wcs" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" updateSequence="0" xsi:schemaLocation="http://www.opengis.net/wcs http://schemas.opengis.net/wcs/1.0.0/describeCoverage.xsd">' +
   '<CoverageOffering>' +
      '<name>ro_dsm</name>' +
      '<label>RO DSM</label>' +
      '<lonLatEnvelope srsName="urn:ogc:def:crs:OGC:1.3:CRS84">' +
         '<gml:pos>4.471333734139 51.912813427383</gml:pos>' +
         '<gml:pos>4.4808508475645 51.9248713705576</gml:pos>' +
      '</lonLatEnvelope>' +
      '<domainSet>' +
         '<spatialDomain>' +
            '<gml:Envelope srsName="EPSG:4326">' +
               '<gml:pos>4.471333734139 51.912813427383</gml:pos>' +
               '<gml:pos>4.4808508475645 51.9248713705576</gml:pos>' +
            '</gml:Envelope>' +
            '<gml:Envelope srsName="EPSG:28992">' +
               '<gml:pos>91979 437659.5</gml:pos>' +
               '<gml:pos>92617 436326</gml:pos>' +
            '</gml:Envelope>' +
            '<gml:RectifiedGrid dimension="2">' +
               '<gml:limits>' +
                  '<gml:GridEnvelope>' +
                     '<gml:low>0 0</gml:low>' +
                     '<gml:high>1275 2666</gml:high>' +
                  '</gml:GridEnvelope>' +
               '</gml:limits>' +
               '<gml:axisName>x</gml:axisName>' +
               '<gml:axisName>y</gml:axisName>' +
               '<gml:origin>' +
                  '<gml:pos>91979 437659.5</gml:pos>' +
               '</gml:origin>' +
               '<gml:offsetVector>0.5 0</gml:offsetVector>' +
               '<gml:offsetVector>0 -0.5</gml:offsetVector>' +
            '</gml:RectifiedGrid>' +
         '</spatialDomain>' +
      '</domainSet>' +
      '<rangeSet>' +
         '<RangeSet>' +
            '<name>Range 1</name>' +
            '<label>My Label</label>' +
         '</RangeSet>' +
      '</rangeSet>' +
      '<supportedCRSs>' +
         '<requestResponseCRSs>EPSG:28992</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:900913</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:3857</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:4326</requestResponseCRSs>' +
         '<nativeCRSs>EPSG:28992</nativeCRSs>' +
      '</supportedCRSs>' +
      '<supportedFormats>' +
         '<formats>GTiff</formats>' +
      '</supportedFormats>' +
      '<supportedInterpolations default="nearest neighbor">' +
         '<interpolationMethod>nearest neighbor</interpolationMethod>' +
         '<interpolationMethod>bilinear</interpolationMethod>' +
      '</supportedInterpolations>' +
   '</CoverageOffering>' +
   '<CoverageOffering>' +
      '<name>ro_dsm_mini</name>' +
      '<label>ro_dsm_mini</label>' +
      '<lonLatEnvelope srsName="urn:ogc:def:crs:OGC:1.3:CRS84">' +
         '<gml:pos>4.47489346945755 51.9159453786927</gml:pos>' +
         '<gml:pos>4.47687824892444 51.9170706688033</gml:pos>' +
      '</lonLatEnvelope>' +
      '<domainSet>' +
         '<spatialDomain>' +
            '<gml:Envelope srsName="EPSG:4326">' +
               '<gml:pos>4.47489346945755 51.9159453786927</gml:pos>' +
               '<gml:pos>4.47687824892444 51.9170706688033</gml:pos>' +
            '</gml:Envelope>' +
            '<gml:Envelope srsName="EPSG:28992">' +
               '<gml:pos>92213 436671.5</gml:pos>' +
               '<gml:pos>92348 436795</gml:pos>' +
            '</gml:Envelope>' +
            '<gml:RectifiedGrid dimension="2">' +
               '<gml:limits>' +
                  '<gml:GridEnvelope>' +
                     '<gml:low>0 0</gml:low>' +
                     '<gml:high>269 246</gml:high>' +
                  '</gml:GridEnvelope>' +
               '</gml:limits>' +
               '<gml:axisName>x</gml:axisName>' +
               '<gml:axisName>y</gml:axisName>' +
               '<gml:origin>' +
                  '<gml:pos>92213 436795</gml:pos>' +
               '</gml:origin>' +
               '<gml:offsetVector>0.5 0</gml:offsetVector>' +
               '<gml:offsetVector>0 -0.5</gml:offsetVector>' +
            '</gml:RectifiedGrid>' +
         '</spatialDomain>' +
      '</domainSet>' +
      '<rangeSet>' +
         '<RangeSet>' +
            '<name>Range 1</name>' +
            '<label>My Label</label>' +
         '</RangeSet>' +
      '</rangeSet>' +
      '<supportedCRSs>' +
         '<requestResponseCRSs>EPSG:28992</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:900913</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:3857</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:4326</requestResponseCRSs>' +
         '<nativeCRSs>EPSG:28992</nativeCRSs>' +
      '</supportedCRSs>' +
      '<supportedFormats>' +
         '<formats>GTiff</formats>' +
      '</supportedFormats>' +
      '<supportedInterpolations default="nearest neighbor">' +
         '<interpolationMethod>nearest neighbor</interpolationMethod>' +
         '<interpolationMethod>bilinear</interpolationMethod>' +
      '</supportedInterpolations>' +
   '</CoverageOffering>' +
   '<CoverageOffering>' +
      '<name>ro_irra</name>' +
      '<label>ro_irra</label>' +
      '<lonLatEnvelope srsName="urn:ogc:def:crs:OGC:1.3:CRS84">' +
         '<gml:pos>4.471333734139 51.912813427383</gml:pos>' +
         '<gml:pos>4.4808508475645 51.9248713705576</gml:pos>' +
      '</lonLatEnvelope>' +
      '<domainSet>' +
         '<spatialDomain>' +
            '<gml:Envelope srsName="EPSG:4326">' +
               '<gml:pos>4.471333734139 51.912813427383</gml:pos>' +
               '<gml:pos>4.4808508475645 51.9248713705576</gml:pos>' +
            '</gml:Envelope>' +
            '<gml:Envelope srsName="EPSG:28992">' +
               '<gml:pos>91979 437659.5</gml:pos>' +
               '<gml:pos>92617 436326</gml:pos>' +
            '</gml:Envelope>' +
            '<gml:RectifiedGrid dimension="2">' +
               '<gml:limits>' +
                  '<gml:GridEnvelope>' +
                     '<gml:low>0 0</gml:low>' +
                     '<gml:high>1275 2666</gml:high>' +
                  '</gml:GridEnvelope>' +
               '</gml:limits>' +
               '<gml:axisName>x</gml:axisName>' +
               '<gml:axisName>y</gml:axisName>' +
               '<gml:origin>' +
                  '<gml:pos>91979 437659.5</gml:pos>' +
               '</gml:origin>' +
               '<gml:offsetVector>0.5 0</gml:offsetVector>' +
               '<gml:offsetVector>0 -0.5</gml:offsetVector>' +
            '</gml:RectifiedGrid>' +
         '</spatialDomain>' +
      '</domainSet>' +
      '<rangeSet>' +
         '<RangeSet>' +
            '<name>Range 1</name>' +
            '<label>My Label</label>' +
         '</RangeSet>' +
      '</rangeSet>' +
      '<supportedCRSs>' +
         '<requestResponseCRSs>EPSG:28992</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:900913</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:3857</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:4326</requestResponseCRSs>' +
         '<nativeCRSs>EPSG:28992</nativeCRSs>' +
      '</supportedCRSs>' +
      '<supportedFormats>' +
         '<formats>GTiff</formats>' +
      '</supportedFormats>' +
      '<supportedInterpolations default="nearest neighbor">' +
         '<interpolationMethod>nearest neighbor</interpolationMethod>' +
         '<interpolationMethod>bilinear</interpolationMethod>' +
      '</supportedInterpolations>' +
   '</CoverageOffering>' +
   '<CoverageOffering>' +
      '<name>ro_irra_ext</name>' +
      '<label>ro_irra_ext</label>' +
      '<lonLatEnvelope srsName="urn:ogc:def:crs:OGC:1.3:CRS84">' +
         '<gml:pos>4.10024171314823 51.9359764992844</gml:pos>' +
         '<gml:pos>4.21909054278063 52.001415228243</gml:pos>' +
      '</lonLatEnvelope>' +
      '<domainSet>' +
         '<spatialDomain>' +
            '<gml:Envelope srsName="EPSG:4326">' +
               '<gml:pos>4.10024171314823 51.9359764992844</gml:pos>' +
               '<gml:pos>4.21909054278063 52.001415228243</gml:pos>' +
            '</gml:Envelope>' +
            '<gml:Envelope srsName="EPSG:28992">' +
               '<gml:pos>66606.5 439287.5</gml:pos>' +
               '<gml:pos>74653.5 446432.5</gml:pos>' +
            '</gml:Envelope>' +
            '<gml:RectifiedGrid dimension="2">' +
               '<gml:limits>' +
                  '<gml:GridEnvelope>' +
                     '<gml:low>0 0</gml:low>' +
                     '<gml:high>16093 14289</gml:high>' +
                  '</gml:GridEnvelope>' +
               '</gml:limits>' +
               '<gml:axisName>x</gml:axisName>' +
               '<gml:axisName>y</gml:axisName>' +
               '<gml:origin>' +
                  '<gml:pos>66606.5 446432.5</gml:pos>' +
               '</gml:origin>' +
               '<gml:offsetVector>0.5 0</gml:offsetVector>' +
               '<gml:offsetVector>0 -0.5</gml:offsetVector>' +
            '</gml:RectifiedGrid>' +
         '</spatialDomain>' +
      '</domainSet>' +
      '<rangeSet>' +
         '<RangeSet>' +
            '<name>Range 1</name>' +
            '<label>My Label</label>' +
         '</RangeSet>' +
      '</rangeSet>' +
      '<supportedCRSs>' +
         '<requestResponseCRSs>EPSG:28992</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:900913</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:3857</requestResponseCRSs>' +
         '<requestResponseCRSs>EPSG:4326</requestResponseCRSs>' +
         '<nativeCRSs>EPSG:28992</nativeCRSs>' +
      '</supportedCRSs>' +
      '<supportedFormats>' +
         '<formats>GTiff</formats>' +
      '</supportedFormats>' +
      '<supportedInterpolations default="nearest neighbor">' +
         '<interpolationMethod>nearest neighbor</interpolationMethod>' +
         '<interpolationMethod>bilinear</interpolationMethod>' +
      '</supportedInterpolations>' +
   '</CoverageOffering>' +
'</CoverageDescription>');


var doc110 = (new OpenLayers.Format.XML).read(
'<?xml version="1.0" encoding="UTF-8"?>' +
'<CoverageDescriptions xmlns="http://www.opengis.net/wcs/1.1" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogc="http://www.opengis.net/ogc" xsi:schemaLocation="http://www.opengis.net/wcs/1.1 http://schemas.opengis.net/wcs/1.1/wcsDescribeCoverage.xsd http://www.opengis.net/ows/1.1 http://schemas.opengis.net/ows/1.1.0/owsAll.xsd">' +
   '<CoverageDescription>' +
      '<ows:Title>RO DSM</ows:Title>' +
      '<ows:Abstract>Digital Surface Model (DSM) raster data set of inner city Rotterdam</ows:Abstract>' +
      '<Identifier>ro_dsm</Identifier>' +
      '<Domain>' +
         '<SpatialDomain>' +
            '<ows:BoundingBox crs="urn:ogc:def:crs:OGC::imageCRS" dimensions="2">' +
               '<ows:LowerCorner>0 0</ows:LowerCorner>' +
               '<ows:UpperCorner>1275 2666</ows:UpperCorner>' +
            '</ows:BoundingBox>' +
            '<ows:BoundingBox crs="urn:ogc:def:crs:EPSG::28992" dimensions="2">' +
               '<ows:LowerCorner>91979 437659.5</ows:LowerCorner>' +
               '<ows:UpperCorner>92617 436326</ows:UpperCorner>' +
            '</ows:BoundingBox>' +
            '<ows:WGS84BoundingBox dimensions="2">' +
               '<ows:LowerCorner>4.471333734139 51.912813427383</ows:LowerCorner>' +
               '<ows:UpperCorner>4.4808508475645 51.9248713705576</ows:UpperCorner>' +
            '</ows:WGS84BoundingBox>' +
            '<GridCRS>' +
               '<GridBaseCRS>urn:ogc:def:crs:EPSG::28992</GridBaseCRS>' +
               '<GridType>urn:ogc:def:method:WCS:1.1:2dSimpleGrid</GridType>' +
               '<GridOrigin>91979.25 437659.25</GridOrigin>' +
               '<GridOffsets>0.5 -0.5</GridOffsets>' +
               '<GridCS>urn:ogc:def:cs:OGC:0.0:Grid2dSquareCS</GridCS>' +
            '</GridCRS>' +
         '</SpatialDomain>' +
      '</Domain>' +
      '<Range>' +
         '<Field>' +
            '<ows:Title>My Label</ows:Title>' +
            '<Identifier>Range 1</Identifier>' +
            '<Definition>' +
               '<ows:AnyValue />' +
            '</Definition>' +
            '<InterpolationMethods>' +
               '<InterpolationMethod>bilinear</InterpolationMethod>' +
               '<Default>nearest neighbor</Default>' +
            '</InterpolationMethods>' +
            '<Axis identifier="bands">' +
               '<AvailableKeys>' +
                  '<Key>1</Key>' +
               '</AvailableKeys>' +
            '</Axis>' +
         '</Field>' +
      '</Range>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::28992</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::900913</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::3857</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::4326</SupportedCRS>' +
      '<SupportedFormat>image/tiff</SupportedFormat>' +
   '</CoverageDescription>' +
   '<CoverageDescription>' +
      '<ows:Title>ro_dsm_mini</ows:Title>' +
      '<ows:Abstract>This a test data set of Rotterdams DSM subset</ows:Abstract>' +
      '<Identifier>ro_dsm_mini</Identifier>' +
      '<Domain>' +
         '<SpatialDomain>' +
            '<ows:BoundingBox crs="urn:ogc:def:crs:OGC::imageCRS" dimensions="2">' +
               '<ows:LowerCorner>0 0</ows:LowerCorner>' +
               '<ows:UpperCorner>269 246</ows:UpperCorner>' +
            '</ows:BoundingBox>' +
            '<ows:BoundingBox crs="urn:ogc:def:crs:EPSG::28992" dimensions="2">' +
               '<ows:LowerCorner>92213 436671.5</ows:LowerCorner>' +
               '<ows:UpperCorner>92348 436795</ows:UpperCorner>' +
            '</ows:BoundingBox>' +
            '<ows:WGS84BoundingBox dimensions="2">' +
               '<ows:LowerCorner>4.47489346945755 51.9159453786927</ows:LowerCorner>' +
               '<ows:UpperCorner>4.47687824892444 51.9170706688033</ows:UpperCorner>' +
            '</ows:WGS84BoundingBox>' +
            '<GridCRS>' +
               '<GridBaseCRS>urn:ogc:def:crs:EPSG::28992</GridBaseCRS>' +
               '<GridType>urn:ogc:def:method:WCS:1.1:2dSimpleGrid</GridType>' +
               '<GridOrigin>92213.25 436794.75</GridOrigin>' +
               '<GridOffsets>0.5 -0.5</GridOffsets>' +
               '<GridCS>urn:ogc:def:cs:OGC:0.0:Grid2dSquareCS</GridCS>' +
            '</GridCRS>' +
         '</SpatialDomain>' +
      '</Domain>' +
      '<Range>' +
         '<Field>' +
            '<ows:Title>My Label</ows:Title>' +
            '<Identifier>Range 1</Identifier>' +
            '<Definition>' +
               '<ows:AnyValue />' +
            '</Definition>' +
            '<InterpolationMethods>' +
               '<InterpolationMethod>bilinear</InterpolationMethod>' +
               '<Default>nearest neighbor</Default>' +
            '</InterpolationMethods>' +
            '<Axis identifier="bands">' +
               '<AvailableKeys>' +
                  '<Key>1</Key>' +
               '</AvailableKeys>' +
            '</Axis>' +
         '</Field>' +
      '</Range>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::28992</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::900913</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::3857</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::4326</SupportedCRS>' +
      '<SupportedFormat>image/tiff</SupportedFormat>' +
   '</CoverageDescription>' +
   '<CoverageDescription>' +
      '<ows:Title>ro_irra</ows:Title>' +
      '<ows:Abstract>This a result data set of a solar computation of Ljinbaan area. It shows the sum of kWh/a per sqmeter for 2010</ows:Abstract>' +
      '<Identifier>ro_irra</Identifier>' +
      '<Domain>' +
         '<SpatialDomain>' +
            '<ows:BoundingBox crs="urn:ogc:def:crs:OGC::imageCRS" dimensions="2">' +
               '<ows:LowerCorner>0 0</ows:LowerCorner>' +
               '<ows:UpperCorner>1275 2666</ows:UpperCorner>' +
            '</ows:BoundingBox>' +
            '<ows:BoundingBox crs="urn:ogc:def:crs:EPSG::28992" dimensions="2">' +
               '<ows:LowerCorner>91979 437659.5</ows:LowerCorner>' +
               '<ows:UpperCorner>92617 436326</ows:UpperCorner>' +
            '</ows:BoundingBox>' +
            '<ows:WGS84BoundingBox dimensions="2">' +
               '<ows:LowerCorner>4.471333734139 51.912813427383</ows:LowerCorner>' +
               '<ows:UpperCorner>4.4808508475645 51.9248713705576</ows:UpperCorner>' +
            '</ows:WGS84BoundingBox>' +
            '<GridCRS>' +
               '<GridBaseCRS>urn:ogc:def:crs:EPSG::28992</GridBaseCRS>' +
               '<GridType>urn:ogc:def:method:WCS:1.1:2dSimpleGrid</GridType>' +
               '<GridOrigin>91979.25 437659.25</GridOrigin>' +
               '<GridOffsets>0.5 -0.5</GridOffsets>' +
               '<GridCS>urn:ogc:def:cs:OGC:0.0:Grid2dSquareCS</GridCS>' +
            '</GridCRS>' +
         '</SpatialDomain>' +
      '</Domain>' +
      '<Range>' +
         '<Field>' +
            '<ows:Title>My Label</ows:Title>' +
            '<Identifier>Range 1</Identifier>' +
            '<Definition>' +
               '<ows:AnyValue />' +
            '</Definition>' +
            '<InterpolationMethods>' +
               '<InterpolationMethod>bilinear</InterpolationMethod>' +
               '<Default>nearest neighbor</Default>' +
            '</InterpolationMethods>' +
            '<Axis identifier="bands">' +
               '<AvailableKeys>' +
                  '<Key>1</Key>' +
               '</AvailableKeys>' +
            '</Axis>' +
         '</Field>' +
      '</Range>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::28992</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::900913</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::3857</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::4326</SupportedCRS>' +
      '<SupportedFormat>image/tiff</SupportedFormat>' +
   '</CoverageDescription>' +
   '<CoverageDescription>' +
      '<ows:Title>ro_irra_ext</ows:Title>' +
      '<ows:Abstract>This a result data set of a solar computation of extended Rotterdam area. It shows the sum of kWh/a per sqmeter for 2010</ows:Abstract>' +
      '<Identifier>ro_irra_ext</Identifier>' +
      '<Domain>' +
         '<SpatialDomain>' +
            '<ows:BoundingBox crs="urn:ogc:def:crs:OGC::imageCRS" dimensions="2">' +
               '<ows:LowerCorner>0 0</ows:LowerCorner>' +
               '<ows:UpperCorner>16093 14289</ows:UpperCorner>' +
            '</ows:BoundingBox>' +
            '<ows:BoundingBox crs="urn:ogc:def:crs:EPSG::28992" dimensions="2">' +
               '<ows:LowerCorner>66606.5 439287.5</ows:LowerCorner>' +
               '<ows:UpperCorner>74653.5 446432.5</ows:UpperCorner>' +
            '</ows:BoundingBox>' +
            '<ows:WGS84BoundingBox dimensions="2">' +
               '<ows:LowerCorner>4.10024171314823 51.9359764992844</ows:LowerCorner>' +
               '<ows:UpperCorner>4.21909054278063 52.001415228243</ows:UpperCorner>' +
            '</ows:WGS84BoundingBox>' +
            '<GridCRS>' +
               '<GridBaseCRS>urn:ogc:def:crs:EPSG::28992</GridBaseCRS>' +
               '<GridType>urn:ogc:def:method:WCS:1.1:2dSimpleGrid</GridType>' +
               '<GridOrigin>66606.75 446432.25</GridOrigin>' +
               '<GridOffsets>0.5 -0.5</GridOffsets>' +
               '<GridCS>urn:ogc:def:cs:OGC:0.0:Grid2dSquareCS</GridCS>' +
            '</GridCRS>' +
         '</SpatialDomain>' +
      '</Domain>' +
      '<Range>' +
         '<Field>' +
            '<ows:Title>My Label</ows:Title>' +
            '<Identifier>Range 1</Identifier>' +
            '<Definition>' +
               '<ows:AnyValue />' +
            '</Definition>' +
            '<InterpolationMethods>' +
               '<InterpolationMethod>bilinear</InterpolationMethod>' +
               '<Default>nearest neighbor</Default>' +
            '</InterpolationMethods>' +
            '<Axis identifier="bands">' +
               '<AvailableKeys>' +
                  '<Key>1</Key>' +
               '</AvailableKeys>' +
            '</Axis>' +
         '</Field>' +
      '</Range>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::28992</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::900913</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::3857</SupportedCRS>' +
      '<SupportedCRS>urn:ogc:def:crs:EPSG::4326</SupportedCRS>' +
      '<SupportedFormat>image/tiff</SupportedFormat>' +
   '</CoverageDescription>' +
'</CoverageDescriptions>');
