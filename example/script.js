var m = L.map('map');

m.setView([42.2, -71], 8);
var url = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg';

var attributionText = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

var mapquestSubdomains = '1234';

var optionsObject = {
    attribution : attributionText,
    subdomains : mapquestSubdomains
}

var mq=L.tileLayer(url, optionsObject);

mq.addTo(m);
var gj = {"type": "FeatureCollection", "features":[
{"type":"Point","coordinates":[82.880859375,5.178482088522876]},
{"type":"Point","coordinates":[55.1953125,-37.16031654673676]},
{"type":"Point","coordinates":[64.86328125,7.885147283424331]},
{"type":"Point","coordinates":[105.29296874999999,5.090944175033399]},
{"type":"Point","coordinates":[-14.414062499999998,33.063924198120645]},
{"type":"Point","coordinates":[3.724193572998047,51.07893956484693]},
{"type":"Polygon","coordinates":[[[3.6539840698242188,51.05056734544155],[3.6539840698242188,51.07786109126113],[3.7118339538574223,51.07786109126113],[3.7118339538574223,51.05056734544155],[3.6539840698242188,51.05056734544155]]]},
{"type":"Polygon","coordinates":[[[3.7538909912109375,51.0740862357415],[3.7363815307617188,51.07850817842925],[3.7508010864257817,51.082390511391196],[3.7647056579589844,51.07840033119636],[3.8089942932128906,51.056070541830934],[3.768138885498047,51.0415018315969],[3.7825584411621094,51.056070541830934],[3.7653923034667964,51.05682583147111],[3.772430419921875,51.06836943969855]]]},
{"type":"LineString","coordinates":[[3.6994743347167964,51.07419409303002],[3.752002716064453,51.062975588514966],[3.706512451171875,51.04754570462776],[3.7001609802246094,51.07246834624617]]},
{"type":"Point","coordinates":[-68.32895278930664,-54.81087537966006]},
{"type":"Point","coordinates":[-68.3245325088501,-54.81109795925766]},
{"type":"Point","coordinates":[-68.31281661987305,-54.8086742487297]},
{"type":"LineString","coordinates":[[-68.30303192138672,-54.80726447266791],[-68.30358982086182,-54.80798173330205],[-68.31672191619873,-54.81094957299551],[-68.31397533416748,-54.81277963213982],[-68.30955505371094,-54.81443650607485],[-68.31075668334961,-54.815425652147844],[-68.31989765167236,-54.81967870427068],[-68.32281589508057,-54.819011103627126],[-68.32045555114746,-54.81747805297809],[-68.3190393447876,-54.814659066053025],[-68.31981182098389,-54.81228502973511],[-68.31933975219725,-54.81141946095602],[-68.3031177520752,-54.807091338883126]]},
{"type":"LineString","coordinates":[[-69.1754150390625,-54.857639595549],[-68.0548095703125,-55.08779989547406],[-67.2637939453125,-54.737307568657506],[-68.038330078125,-54.303704439898084],[-69.136962890625,-54.835500081451656]]},
{"type":"Point","coordinates":[-68.30749511718749,-54.797518359658994]},
{"type":"Point","coordinates":[-81.73828125,35.31736632923788]},
{"type":"Polygon","coordinates":[[[-84.638671875,42.682435398386204],[-79.189453125,42.48830197960227],[-81.2109375,37.16031654673677],[-82.96875,37.16031654673677]]]},
{"type":"Polygon","coordinates":[[[-98.61328125,43.004647127794435],[-91.0546875,42.94033923363183],[-91.0546875,41.44272637767212],[-93.1640625,41.37680856570233],[-93.251953125,37.64903402157866],[-91.40625,37.64903402157866],[-98.4375,35.17380831799959],[-98.26171875,37.16031654673677],[-96.328125,37.23032838760387],[-96.328125,41.11246878918086],[-98.0859375,41.11246878918086]]]},
{"type":"LineString","coordinates":[[-111.97265625,44.15068115978094],[-111.97265625,35.817813158696616],[-111.4453125,40.58058466412761],[-104.94140625,40.38002840251183],[-104.853515625,43.70759350405294],[-104.853515625,36.87962060502676]]},
{"type":"Polygon","coordinates":[[[-72.60452270507812,42.83972354764084],[-72.82424926757812,42.62587560259137],[-72.44110107421875,42.679406713370305]]]},
{"type":"Point","coordinates":[-72.3504638671875,42.17154633452751]},
{"type":"Point","coordinates":[-71.9219970703125,42.66628070564928]},
{"type":"Point","coordinates":[-71.7022705078125,42.26917949243506]},
{"type":"Point","coordinates":[-43.06640625,34.52466147177172]},
{"type":"Polygon","coordinates":[[[-103.0078125,49.66762782262194],[-86.1328125,42.74701217318067],[-86.044921875,48.86471476180277]]]},
{"type":"Point","coordinates":[-110.654296875,41.83682786072714]},
{"type":"Polygon","coordinates":[[[-169.716796875,-39.87601941962115],[-169.716796875,-38.30718056188315],[-168.3544921875,-38.30718056188315],[-168.3544921875,-39.87601941962115],[-169.716796875,-39.87601941962115]]]},
{"type":"Polygon","coordinates":[[[-113.115234375,50.064191736659104],[-106.171875,42.35854391749705],[-98.26171875,49.32512199104001],[-105.8203125,52.482780222078226]]]},
{"type":"Point","coordinates":[-120.32226562500001,53.69670647530323]},
{"type":"Point","coordinates":[-120.41015624999999,44.5278427984555]},
{"type":"Point","coordinates":[-40.078125,53.33087298301704]}]};

var geoJSON = L.geoJson(gj).addTo(m);
var roads =L.tileLayer("//services.massdot.state.ma.us/ArcGIS/rest/services/RoadInventory/Roads/MapServer/tile/{z}/{y}/{x}",{attribution: 'Road Tiles from <a href="http://www.massdot.state.ma.us/planning/Main.aspx" target="_blank">MassDOT Planning</a>'});
var osmDE = L.tileLayer(
    'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{
        attribution: '&copy <a href=" http://www.openstreetmap.org/" title="OpenStreetMap">OpenStreetMap</a>  and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" title="CC-BY-SA">CC-BY-SA</a>',
        maxZoom: 18,
        subdomains: 'abc'
    }
);
var lc=L.control.layers({"Map Quest":mq, "OSM DE": osmDE},{geoJson: geoJSON, roads: roads}).addTo(m);
var h = L.hash(m,lc);