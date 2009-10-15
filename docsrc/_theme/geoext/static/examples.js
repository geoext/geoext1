Ext.onReady(function() {
    var blocks = Ext.select("div.exampleblock");
    var exbase = "http://dev.geoext.org/trunk/geoext/examples/";
    blocks.each(function(el) {
        el.wrap({
            tag: "a", 
            href: el.first().id.replace(
                /^example-(.*)/, 
                exbase + "$1.html"
            ),
            cls: "examplelink",
            target: "_blank"
        });
    });
});