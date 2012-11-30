(function() {

  L.Hash = function(map, layerControl) {
    var parsed,
      _this = this;
    this.map = map;
    if (layerControl) {
      this.layerControl = layerControl;
    }
    this.map.on("moveend layeradd layerremove", this.makeState, this);
    if (this.lastHash !== location.hash) {
      parsed = this.parseHash(location.hash);
      if (parsed) {
        this.map.setView(parsed.center, parsed.zoom);
      }
    }
    this.makeState();
    window.onpopstate = function(e) {
      var hash;
      if ("state" in e && e.state) {
        hash = _this.makeHash(e.state);
        parsed = _this.parseHash(hash);
        if (parsed) {
          return _this.map.setView(parsed.center, parsed.zoom);
        }
      }
    };
    return true;
  };

  L.Hash.prototype = {
    map: null,
    lastHash: null,
    layerControl: null,
    getLayers: function() {
      var base, cLayers, key, out, overlay;
      base = void 0;
      cLayers = void 0;
      key = void 0;
      overlay = void 0;
      cLayers = this.layerControl._layers;
      overlay = [];
      base = void 0;
      for (key in cLayers) {
        if (cLayers[key].layer._leaflet_id && cLayers[key].layer._leaflet_id in this.map._layers) {
          if (cLayers[key].overlay) {
            overlay.push(encodeURIComponent(cLayers[key].name));
            console.log("over " + encodeURIComponent(cLayers[key].name));
          } else {
            base = encodeURIComponent(cLayers[key].name);
            console.log("base " + encodeURIComponent(cLayers[key].name));
          }
        }
      }
      out = {
        base: base,
        overlay: overlay
      };
      console.log(JSON.stringify(out));
      return out;
    },
    getMapHash: function() {
      var center, hashArray, precision, zoom;
      center = this.map.getCenter();
      zoom = this.map.getZoom();
      precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
      return hashArray = [zoom, center.lat.toFixed(precision), center.lng.toFixed(precision)];
    },
    getHash: function() {
      var layers, mhash;
      mhash = this.getMapHash();
      if (this.layerControl) {
        layers = this.getLayers();
      }
      if (!this.layerControl) {
        layers = {};
      }
      layers.zoom = mhash.shift();
      layers.center = mhash;
      return layers;
    },
    makeHash: function(hashObj) {
      var hashParts;
      hashParts = [hashObj.zoom, hashObj.center[0], hashObj.center[1], hashObj.base];
      if ("overlay" in hashObj) {
        if (hashObj.overlay.length = 1) {
          hashParts.push(hashObj.overlay[0]);
        }
        if (hashObj.overlay.lengh > 1) {
          hashParts.push(hashObj.overlay.join("-"));
        }
      }
      return "#" + hashParts.join("/");
    },
    makeState: function() {
      var hash, layers, mhash;
      if (!history.pushState) {
        return false;
      }
      mhash = this.getMapHash();
      if (this.layerControl) {
        layers = this.getLayers();
      }
      if (!this.layerControl) {
        layers = {};
      }
      layers.zoom = mhash.shift();
      layers.center = mhash;
      hash = layers;
      history.pushState(hash, "", this.makeHash(hash));
      this.lastHash = hash;
      return console.log(this.lastHash);
    },
    parseHash: function(hash) {
      var args, lat, lon, zoom;
      if (hash.indexOf("#") === 0) {
        hash = hash.substr(1);
      }
      args = hash.split("/");
      if (args.length >= 3) {
        zoom = parseInt(args[0], 10);
        lat = parseFloat(args[1]);
        lon = parseFloat(args[2]);
        if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
          return false;
        } else if (args.length === 3) {
          return {
            center: new L.LatLng(lat, lon),
            zoom: zoom
          };
        } else {
          if (args.length === 4) {
            this.setBase(args[3]);
          } else {
            this.setBase(args[3]);
            this.parseOver(args[4]);
          }
          return {
            center: new L.LatLng(lat, lon),
            zoom: zoom
          };
        }
      } else {
        return false;
      }
    },
    setBase: function(base) {
      var baseName, i, len, name, parts;
      baseName = decodeURIComponent(base);
      len = this.layerControl._baseLayersList.childNodes.length;
      i = 0;
      while (i < len) {
        parts = this.layerControl._baseLayersList.childNodes[i].childNodes;
        name = parts[1].innerHTML.slice(1);
        if (baseName === name) {
          parts[0].setAttribute("checked", "checked");
        }
        i++;
      }
      this.layerControl._onInputClick();
      return true;
    },
    parseOver: function(over) {
      var layerControl, oArray;
      if (over.indexOf("-") >= 0) {
        oArray = over.split("-");
      } else {
        oArray = [over];
      }
      layerControl = this.layerControl;
      oArray.forEach(function(oPart) {
        var bName, eachNode, i, len, _results;
        eachNode = function(v) {
          var name, parts;
          parts = v.childNodes;
          name = parts[1].innerHTML.slice(1);
          if (bName === name) {
            return parts[0].checked = true;
          } else {
            return parts[0].checked = false;
          }
        };
        bName = decodeURIComponent(oPart);
        len = layerControl._overlaysList.childNodes.length;
        i = 0;
        _results = [];
        while (i < len) {
          eachNode(layerControl._overlaysList.childNodes[i]);
          _results.push(i++);
        }
        return _results;
      });
      return this.layerControl._onInputClick();
    }
  };

  L.hash = function(map, layerControl) {
    layerControl = layerControl || void 0;
    return new L.Hash(map, layerControl);
  };

}).call(this);
