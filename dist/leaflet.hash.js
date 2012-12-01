(function() {

  L.Hash = function(map) {
    var parsed,
      _this = this;
    this.map = map;
    this.map._hash = this;
    this.map.on("moveend", this.update, this);
    if (this.lastHash !== location.hash) {
      parsed = this.parseHash(location.hash);
      if (parsed) {
        this.map.setView(parsed.center, parsed.zoom);
      }
    }
    this.makeState(this.getHash(), true);
    window.onpopstate = function(e) {
      if ("state" in e && e.state) {
        _this.map.setZoom(e.state.zoom);
        return _this.map.panTo(e.state.center);
      }
    };
    return true;
  };

  L.Hash.prototype.map = null;

  L.Hash.prototype.lastHash = null;

  L.Hash.prototype.getHash = function() {
    var center, hash, precision, zoom;
    center = this.map.getCenter();
    zoom = this.map.getZoom();
    precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
    hash = {
      zoom: zoom,
      center: [center.lat.toFixed(precision), center.lng.toFixed(precision)]
    };
    return hash;
  };

  L.Hash.prototype.makeState = function(hash, replace) {
    var mhash;
    if (!history.pushState) {
      return false;
    }
    mhash = [hash.zoom, hash.center[0], hash.center[1]];
    if (!replace) {
      history.pushState(hash, "", "#" + mhash.join("/"));
    }
    if (replace) {
      history.replaceState(hash, "", "#" + mhash.join("/"));
    }
    return this.lastHash = hash;
  };

  L.Hash.prototype.parseHash = function(hash) {
    var args, lat, lon, zoom;
    if (hash.indexOf("#") === 0) {
      hash = hash.substr(1);
    }
    args = hash.split("/");
    if (args.length = 3) {
      zoom = parseInt(args[0], 10);
      lat = parseFloat(args[1]);
      lon = parseFloat(args[2]);
      if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
        return false;
      } else {
        return {
          center: new L.LatLng(lat, lon),
          zoom: zoom
        };
      }
    } else {
      return false;
    }
  };

  L.Hash.prototype.update = function() {
    return this.makeState(this.getHash());
  };

  L.Hash.prototype.remove = function() {
    this.map.off("moveend", this.update);
    window.onpopstate = null;
    return location.hash = null;
  };

  L.hash = function(map) {
    return new L.Hash(map);
  };

  L.Map.prototype.addHash = function() {
    return L.hash(this);
  };

  L.Map.prototype.removeHash = function() {
    return this._hash.remove();
  };

}).call(this);
