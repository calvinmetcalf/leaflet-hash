L.Hash = (map) ->
  @map = map
  @map._hash = @
  @map.on "moveend", @update, @
  if @lastHash != location.hash
  	parsed = @parseHash location.hash
  	@map.setView parsed.center, parsed.zoom if parsed
  @makeState @getHash(), true
  window.onpopstate=(e)=>
  	if "state" of e and e.state
      @map.setZoom e.state.zoom
      @map.panTo e.state.center
  true
	

L.Hash::map = null
L.Hash::lastHash = null
L.Hash::getHash = ->
  center = @map.getCenter()
  zoom = @map.getZoom()
  precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2))
  hash = 
  	zoom: zoom 
  	center:[
      center.lat.toFixed(precision) 
  	  center.lng.toFixed(precision)
  	]
  hash
L.Hash::makeState = (hash, replace)->
  return false unless history.pushState
  mhash = [hash.zoom, hash.center[0], hash.center[1]]
  history.pushState hash, "", "#" + mhash.join("/") unless replace
  history.replaceState hash, "", "#" + mhash.join("/") if replace
  @lastHash=hash
L.Hash::parseHash = (hash) ->
  hash = hash.substr(1)  if hash.indexOf("#") is 0
  args = hash.split("/")
  if args.length = 3
    zoom = parseInt(args[0], 10)
    lat = parseFloat(args[1])
    lon = parseFloat(args[2])
    if isNaN(zoom) or isNaN(lat) or isNaN(lon)
      false
    else
      center: new L.LatLng(lat, lon)
      zoom: zoom
  else
    false
L.Hash::update = ->
	@makeState @getHash()
L.Hash::remove = ->
  @map.off "moveend", @update
  window.onpopstate = null
  location.hash = null
L.hash = (map)->
	new L.Hash(map)
L.Map::addHash = ->
  L.hash @
L.Map::removeHash = ->
	@_hash.remove()