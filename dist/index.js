"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _streamUtil = require("./streamUtil");

Object.keys(_streamUtil).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _streamUtil[key];
    }
  });
});
//# sourceMappingURL=index.js.map