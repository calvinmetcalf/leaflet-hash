L.Hash = (map, layerControl) ->
  @map = map
  @layerControl = layerControl if layerControl
  @map.on "moveend layeradd layerremove", @makeState, @
  if @lastHash != location.hash
  	parsed = @parseHash location.hash
  	@map.setView parsed.center, parsed.zoom if parsed
  @makeState()
  window.onpopstate=(e)=>
  	if "state" of e and e.state
  		hash = @makeHash(e.state)
  		parsed = @parseHash hash
  		@map.setView parsed.center, parsed.zoom if parsed
  true
	

L.Hash:: =
  map: null
  lastHash: null
  layerControl: null
  getLayers : ->
    base = undefined
    cLayers = undefined
    key = undefined
    overlay = undefined
    cLayers = @layerControl._layers
    overlay = []
    base = undefined
    for key of cLayers
      if cLayers[key].layer._leaflet_id and cLayers[key].layer._leaflet_id of @map._layers
        if cLayers[key].overlay
          overlay.push encodeURIComponent(cLayers[key].name)
          console.log "over " + encodeURIComponent(cLayers[key].name)
        else
          base = encodeURIComponent(cLayers[key].name)
          console.log "base "+ encodeURIComponent(cLayers[key].name)
    out = 
      base: base
      overlay: overlay
    console.log JSON.stringify(out)
    out
  getMapHash: ->
    center = @map.getCenter()
    zoom = @map.getZoom()
    precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2))
    hashArray = [zoom, center.lat.toFixed(precision), center.lng.toFixed(precision)]
  getHash: ->
  	mhash = @getMapHash()
  	layers = @getLayers() if @layerControl
  	layers = {} unless @layerControl
  	layers.zoom = mhash.shift()
  	layers.center = mhash
  	layers
  makeHash: (hashObj)->
  	hashParts = [hashObj.zoom,hashObj.center[0],hashObj.center[1],hashObj.base]
  	if "overlay" of hashObj
  		hashParts.push hashObj.overlay[0] if hashObj.overlay.length = 1
  		hashParts.push hashObj.overlay.join("-") if hashObj.overlay.lengh > 1
  	"#" + hashParts.join "/"
  makeState: ()->
  	return false unless history.pushState
  	mhash = @getMapHash()
  	layers = @getLayers() if @layerControl
  	layers = {} unless @layerControl
  	layers.zoom = mhash.shift()
  	layers.center = mhash
  	hash = layers
  	history.pushState hash, "", @makeHash(hash)
  	@lastHash=hash
  	console.log(@lastHash)
  parseHash: (hash) ->
    hash = hash.substr(1)  if hash.indexOf("#") is 0
    args = hash.split("/")
    if args.length >= 3
      zoom = parseInt(args[0], 10)
      lat = parseFloat(args[1])
      lon = parseFloat(args[2])
      if isNaN(zoom) or isNaN(lat) or isNaN(lon)
        false
      else if args.length is 3
        center: new L.LatLng(lat, lon)
        zoom: zoom
      else
        if args.length is 4
          @setBase args[3]
        else
          @setBase args[3]
          @parseOver args[4]
        center: new L.LatLng(lat, lon)
        zoom: zoom
    else
      false
  setBase: (base)->
    baseName = decodeURIComponent base
    len = @layerControl._baseLayersList.childNodes.length
    i = 0

    while i < len
      parts = @layerControl._baseLayersList.childNodes[i].childNodes
      name = parts[1].innerHTML.slice(1)
      parts[0].setAttribute "checked", "checked"  if baseName is name
      i++
    @layerControl._onInputClick()
    true
  parseOver: (over) ->
    if over.indexOf("-") >= 0
      oArray = over.split("-")
    else
      oArray = [over]
    layerControl = @layerControl
    oArray.forEach (oPart) ->
      eachNode = (v) ->
        parts = v.childNodes
        name = parts[1].innerHTML.slice(1)
        if bName is name
          parts[0].checked = true
        else
          parts[0].checked = false
      bName = decodeURIComponent(oPart)
      len = layerControl._overlaysList.childNodes.length
      i = 0

      while i < len
        eachNode layerControl._overlaysList.childNodes[i]
        i++

    @layerControl._onInputClick()

L.hash = (map, layerControl)->
	layerControl = layerControl or undefined
	new L.Hash(map, layerControl)