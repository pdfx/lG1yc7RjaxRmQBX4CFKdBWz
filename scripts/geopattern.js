(function (a) {
  if (typeof exports == "object") {
    module.exports = a();
  } else if (typeof define == "function" && define.amd) {
    define(a);
  } else {
    var b;
    if (typeof window != "undefined") {
      b = window;
    } else if (typeof global != "undefined") {
      b = global;
    } else if (typeof self != "undefined") {
      b = self;
    }
    b.GeoPattern = a();
  }
})(function () {
  return function e(b, c, d) {
    function a(g, i) {
      if (!c[g]) {
        if (!b[g]) {
          var j = typeof require == "function" && require;
          if (!i && j) {
            return j(g, true);
          }
          if (f) {
            return f(g, true);
          }
          throw new Error("Cannot find module '" + g + "'");
        }
        var h = c[g] = {
          exports: {}
        };
        b[g][0].call(h.exports, function (c) {
          var d = b[g][1][c];
          return a(d ? d : c);
        }, h, h.exports, e, b, c, d);
      }
      return c[g].exports;
    }
    var f = typeof require == "function" && require;
    for (var g = 0; g < d.length; g++) {
      a(d[g]);
    }
    return a;
  }({
    1: [function (a, b) {
      (function (c) {
        "use strict";

        function d(a) {
          return function (b, c) {
            if (typeof b == "object") {
              c = b;
              b = null;
            }
            if (b === null || b === undefined) {
              b = new Date().toString();
            }
            c ||= {};
            return a.call(this, b, c);
          };
        }
        var e = a("./lib/pattern");
        var f = b.exports = {
          generate: d(function (a, b) {
            return new e(a, b);
          })
        };
        if (c) {
          c.fn.geopattern = d(function (a, b) {
            return this.each(function () {
              var d = c(this).attr("data-title-sha");
              if (d) {
                b = c.extend({
                  hash: d
                }, b);
              }
              var e = f.generate(a, b);
              c(this).css("background-image", e.toDataUrl());
            });
          });
        }
      })(typeof jQuery != "undefined" ? jQuery : null);
    }, {
      "./lib/pattern": 3
    }],
    2: [function (a, b) {
      "use strict";

      function c(a) {
        var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        a = a.replace(b, function (a, b, c, d) {
          return b + b + c + c + d + d;
        });
        var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
        if (c) {
          return {
            r: parseInt(c[1], 16),
            g: parseInt(c[2], 16),
            b: parseInt(c[3], 16)
          };
        } else {
          return null;
        }
      }
      function d(a) {
        return "#" + ["r", "g", "b"].map(function (b) {
          return ("0" + a[b].toString(16)).slice(-2);
        }).join("");
      }
      function e(b) {
        var c = b.r;
        var d = b.g;
        var f = b.b;
        c /= 255;
        d /= 255;
        f /= 255;
        var g;
        var j;
        var k = Math.max(c, d, f);
        var m = Math.min(c, d, f);
        var a = (k + m) / 2;
        if (k === m) {
          g = j = 0;
        } else {
          var h = k - m;
          j = a > 0.5 ? h / (2 - k - m) : h / (k + m);
          switch (k) {
            case c:
              g = (d - f) / h + (f > d ? 6 : 0);
              break;
            case d:
              g = (f - c) / h + 2;
              break;
            case f:
              g = (c - d) / h + 4;
          }
          g /= 6;
        }
        return {
          h: g,
          s: j,
          l: a
        };
      }
      function f(b) {
        function c(a, b, c) {
          if (c < 0) {
            c += 1;
          }
          if (c > 1) {
            c -= 1;
          }
          if (1 / 6 > c) {
            return a + (b - a) * 6 * c;
          } else if (c < 0.5) {
            return b;
          } else if (2 / 3 > c) {
            return a + (b - a) * (2 / 3 - c) * 6;
          } else {
            return a;
          }
        }
        var d;
        var f;
        var g;
        var j = b.h;
        var k = b.s;
        var m = b.l;
        if (k === 0) {
          d = f = g = m;
        } else {
          var a = m < 0.5 ? m * (1 + k) : m + k - m * k;
          var h = m * 2 - a;
          d = c(h, a, j + 1 / 3);
          f = c(h, a, j);
          g = c(h, a, j - 1 / 3);
        }
        return {
          r: Math.round(d * 255),
          g: Math.round(f * 255),
          b: Math.round(g * 255)
        };
      }
      b.exports = {
        hex2rgb: c,
        rgb2hex: d,
        rgb2hsl: e,
        hsl2rgb: f,
        rgb2rgbString: function (a) {
          return "rgb(" + [a.r, a.g, a.b].join(",") + ")";
        }
      };
    }, {}],
    3: [function (q, t) {
      (function (z) {
        "use strict";

        function B(a, b, c) {
          return parseInt(a.substr(b, c || 1), 16);
        }
        function e(b, c, d, f, e) {
          var g = parseFloat(b);
          var h = d - c;
          var i = e - f;
          return (g - c) * i / h + f;
        }
        function D(a) {
          if (a % 2 === 0) {
            return j;
          } else {
            return m;
          }
        }
        function o(a) {
          return e(a, 0, 15, p, r);
        }
        function i(a) {
          var b = a;
          var c = b / 2;
          var d = Math.sin(Math.PI * 60 / 180) * b;
          return [0, d, c, 0, c + b, 0, b * 2, d, c + b, d * 2, c, d * 2, 0, d].join(",");
        }
        function n(a, b) {
          var c = b * 0.66;
          return [[0, 0, a / 2, b - c, a / 2, b, 0, c, 0, 0], [a / 2, b - c, a, 0, a, c, a / 2, b, a / 2, b - c]].map(function (a) {
            return a.join(",");
          });
        }
        function E(a) {
          return [[a, 0, a, a * 3], [0, a, a * 3, a]];
        }
        function F(a) {
          var b = a;
          var c = b * 0.33;
          return [c, 0, b - c, 0, b, c, b, b - c, b - c, b, c, b, 0, b - c, 0, c, c, 0].join(",");
        }
        function G(a, b) {
          var c = a / 2;
          return [c, 0, a, b, 0, b, c, 0].join(",");
        }
        function I(a, b) {
          return [a / 2, 0, a, b / 2, a / 2, b, 0, b / 2].join(",");
        }
        function f(a) {
          return [0, 0, a, a, 0, a, 0, 0].join(",");
        }
        function a(b, d, g, j, e) {
          var i = f(j);
          var a = o(e[0]);
          var k = D(e[0]);
          var m = {
            stroke: w,
            "stroke-opacity": x,
            "fill-opacity": a,
            fill: k
          };
          b.polyline(i, m).transform({
            translate: [d + j, g],
            scale: [-1, 1]
          });
          b.polyline(i, m).transform({
            translate: [d + j, g + j * 2],
            scale: [1, -1]
          });
          a = o(e[1]);
          k = D(e[1]);
          m = {
            stroke: w,
            "stroke-opacity": x,
            "fill-opacity": a,
            fill: k
          };
          b.polyline(i, m).transform({
            translate: [d + j, g + j * 2],
            scale: [-1, -1]
          });
          b.polyline(i, m).transform({
            translate: [d + j, g],
            scale: [1, 1]
          });
        }
        function c(b, d, g, j, e) {
          var i = o(e);
          var a = D(e);
          var h = f(j);
          var k = {
            stroke: w,
            "stroke-opacity": x,
            "fill-opacity": i,
            fill: a
          };
          b.polyline(h, k).transform({
            translate: [d, g + j],
            scale: [1, -1]
          });
          b.polyline(h, k).transform({
            translate: [d + j * 2, g + j],
            scale: [-1, -1]
          });
          b.polyline(h, k).transform({
            translate: [d, g + j],
            scale: [1, 1]
          });
          b.polyline(h, k).transform({
            translate: [d + j * 2, g + j],
            scale: [-1, 1]
          });
        }
        function J(a, b) {
          var c = a / 2;
          return [0, 0, b, c, 0, a, 0, 0].join(",");
        }
        var g = q("extend");
        var d = q("./color");
        var b = q("./sha1");
        var h = q("./svg");
        var k = {
          baseColor: "#933c3c"
        };
        var l = ["octogons", "overlappingCircles", "plusSigns", "xes", "sineWaves", "hexagons", "overlappingRings", "plaid", "triangles", "squares", "concentricCircles", "diamonds", "tessellation", "nestedSquares", "mosaicSquares", "chevrons"];
        var m = "#222";
        var j = "#ddd";
        var w = "#000";
        var x = 0.02;
        var p = 0.02;
        var r = 0.15;
        var s = t.exports = function (a, c) {
          this.opts = g({}, k, c);
          this.hash = c.hash || b(a);
          this.svg = new h();
          this.generateBackground();
          this.generatePattern();
          return this;
        };
        s.prototype.toSvg = function () {
          return this.svg.toString();
        };
        s.prototype.toString = function () {
          return this.toSvg();
        };
        s.prototype.toBase64 = function () {
          var a;
          var b = this.toSvg();
          return a = typeof window != "undefined" && typeof window.btoa == "function" ? window.btoa(b) : new z(b).toString("base64");
        };
        s.prototype.toDataUri = function () {
          return "data:image/svg+xml;base64," + this.toBase64();
        };
        s.prototype.toDataUrl = function () {
          return "url(\"" + this.toDataUri() + "\")";
        };
        s.prototype.generateBackground = function () {
          var a;
          var b;
          var c;
          var f;
          if (this.opts.color) {
            c = d.hex2rgb(this.opts.color);
          } else {
            b = e(B(this.hash, 14, 3), 0, 4095, 0, 359);
            f = B(this.hash, 17);
            a = d.rgb2hsl(d.hex2rgb(this.opts.baseColor));
            a.h = (a.h * 360 - b + 360) % 360 / 360;
            a.s = f % 2 === 0 ? Math.min(1, (a.s * 100 + f) / 100) : Math.max(0, (a.s * 100 - f) / 100);
            c = d.hsl2rgb(a);
          }
          this.color = d.rgb2hex(c);
          this.svg.rect(0, 0, "100%", "100%", {
            fill: d.rgb2rgbString(c)
          });
        };
        s.prototype.generatePattern = function () {
          var a = this.opts.generator;
          if (a) {
            if (l.indexOf(a) < 0) {
              throw new Error("The generator " + a + " does not exist.");
            }
          } else {
            a = l[B(this.hash, 20)];
          }
          return this["geo" + a.slice(0, 1).toUpperCase() + a.slice(1)]();
        };
        s.prototype.geoHexagons = function () {
          var a;
          var b;
          var j;
          var k;
          var m;
          var n;
          var q;
          var z;
          var A = B(this.hash, 0);
          var p = e(A, 0, 15, 8, 60);
          var g = p * Math.sqrt(3);
          var v = p * 2;
          var y = i(p);
          this.svg.setWidth(v * 3 + p * 3);
          this.svg.setHeight(g * 6);
          j = 0;
          z = 0;
          for (; z < 6; z++) {
            for (q = 0; q < 6; q++) {
              n = B(this.hash, j);
              a = q % 2 === 0 ? z * g : z * g + g / 2;
              k = o(n);
              b = D(n);
              m = {
                fill: b,
                "fill-opacity": k,
                stroke: w,
                "stroke-opacity": x
              };
              this.svg.polyline(y, m).transform({
                translate: [q * p * 1.5 - v / 2, a - g / 2]
              });
              if (q === 0) {
                this.svg.polyline(y, m).transform({
                  translate: [p * 6 * 1.5 - v / 2, a - g / 2]
                });
              }
              if (z === 0) {
                a = q % 2 === 0 ? g * 6 : g * 6 + g / 2;
                this.svg.polyline(y, m).transform({
                  translate: [q * p * 1.5 - v / 2, a - g / 2]
                });
              }
              if (q === 0 && z === 0) {
                this.svg.polyline(y, m).transform({
                  translate: [p * 6 * 1.5 - v / 2, g * 5 + g / 2]
                });
              }
              j++;
            }
          }
        };
        s.prototype.geoSineWaves = function () {
          var b;
          var d;
          var g;
          var i;
          var j;
          var k;
          var m;
          var n = Math.floor(e(B(this.hash, 0), 0, 15, 100, 400));
          var f = Math.floor(e(B(this.hash, 1), 0, 15, 30, 100));
          var q = Math.floor(e(B(this.hash, 2), 0, 15, 3, 30));
          this.svg.setWidth(n);
          this.svg.setHeight(q * 36);
          d = 0;
          for (; d < 36; d++) {
            k = B(this.hash, d);
            g = o(k);
            b = D(k);
            m = n / 4 * 0.7;
            j = {
              fill: "none",
              stroke: b,
              opacity: g,
              "stroke-width": "" + q + "px"
            };
            i = "M0 " + f + " C " + m + " 0, " + (n / 2 - m) + " 0, " + n / 2 + " " + f + " S " + (n - m) + " " + f * 2 + ", " + n + " " + f + " S " + (n * 1.5 - m) + " 0, " + n * 1.5 + ", " + f;
            this.svg.path(i, j).transform({
              translate: [-n / 4, q * d - f * 1.5]
            });
            this.svg.path(i, j).transform({
              translate: [-n / 4, q * d - f * 1.5 + q * 36]
            });
          }
        };
        s.prototype.geoChevrons = function () {
          var b;
          var d;
          var h;
          var i;
          var j;
          var k;
          var m;
          var q = e(B(this.hash, 0), 0, 15, 30, 80);
          var u = e(B(this.hash, 0), 0, 15, 30, 80);
          var p = n(q, u);
          this.svg.setWidth(q * 6);
          this.svg.setHeight(u * 6 * 0.66);
          d = 0;
          m = 0;
          for (; m < 6; m++) {
            for (k = 0; k < 6; k++) {
              j = B(this.hash, d);
              h = o(j);
              b = D(j);
              i = {
                stroke: w,
                "stroke-opacity": x,
                fill: b,
                "fill-opacity": h,
                "stroke-width": 1
              };
              this.svg.group(i).transform({
                translate: [k * q, m * u * 0.66 - u / 2]
              }).polyline(p).end();
              if (m === 0) {
                this.svg.group(i).transform({
                  translate: [k * q, u * 6 * 0.66 - u / 2]
                }).polyline(p).end();
              }
              d += 1;
            }
          }
        };
        s.prototype.geoPlusSigns = function () {
          var b;
          var d;
          var i;
          var j;
          var k;
          var l;
          var m;
          var n;
          var q = e(B(this.hash, 0), 0, 15, 10, 25);
          var p = q * 3;
          var g = E(q);
          this.svg.setWidth(q * 12);
          this.svg.setHeight(q * 12);
          i = 0;
          n = 0;
          for (; n < 6; n++) {
            for (m = 0; m < 6; m++) {
              l = B(this.hash, i);
              j = o(l);
              d = D(l);
              b = n % 2 === 0 ? 0 : 1;
              k = {
                fill: d,
                stroke: w,
                "stroke-opacity": x,
                "fill-opacity": j
              };
              this.svg.group(k).transform({
                translate: [m * p - m * q + b * q - q, n * p - n * q - p / 2]
              }).rect(g).end();
              if (m === 0) {
                this.svg.group(k).transform({
                  translate: [p * 4 - m * q + b * q - q, n * p - n * q - p / 2]
                }).rect(g).end();
              }
              if (n === 0) {
                this.svg.group(k).transform({
                  translate: [m * p - m * q + b * q - q, p * 4 - n * q - p / 2]
                }).rect(g).end();
              }
              if (m === 0 && n === 0) {
                this.svg.group(k).transform({
                  translate: [p * 4 - m * q + b * q - q, p * 4 - n * q - p / 2]
                }).rect(g).end();
              }
              i++;
            }
          }
        };
        s.prototype.geoXes = function () {
          var b;
          var d;
          var i;
          var j;
          var k;
          var l;
          var m;
          var n;
          var q = e(B(this.hash, 0), 0, 15, 10, 25);
          var p = E(q);
          var g = q * 3 * 0.943;
          this.svg.setWidth(g * 3);
          this.svg.setHeight(g * 3);
          i = 0;
          n = 0;
          for (; n < 6; n++) {
            for (m = 0; m < 6; m++) {
              l = B(this.hash, i);
              j = o(l);
              b = m % 2 === 0 ? n * g - g * 0.5 : n * g - g * 0.5 + g / 4;
              d = D(l);
              k = {
                fill: d,
                opacity: j
              };
              this.svg.group(k).transform({
                translate: [m * g / 2 - g / 2, b - n * g / 2],
                rotate: [45, g / 2, g / 2]
              }).rect(p).end();
              if (m === 0) {
                this.svg.group(k).transform({
                  translate: [g * 6 / 2 - g / 2, b - n * g / 2],
                  rotate: [45, g / 2, g / 2]
                }).rect(p).end();
              }
              if (n === 0) {
                b = m % 2 === 0 ? g * 6 - g / 2 : g * 6 - g / 2 + g / 4;
                this.svg.group(k).transform({
                  translate: [m * g / 2 - g / 2, b - g * 6 / 2],
                  rotate: [45, g / 2, g / 2]
                }).rect(p).end();
              }
              if (n === 5) {
                this.svg.group(k).transform({
                  translate: [m * g / 2 - g / 2, b - g * 11 / 2],
                  rotate: [45, g / 2, g / 2]
                }).rect(p).end();
              }
              if (m === 0 && n === 0) {
                this.svg.group(k).transform({
                  translate: [g * 6 / 2 - g / 2, b - g * 6 / 2],
                  rotate: [45, g / 2, g / 2]
                }).rect(p).end();
              }
              i++;
            }
          }
        };
        s.prototype.geoOverlappingCircles = function () {
          var b;
          var d;
          var g;
          var i;
          var j;
          var k;
          var m;
          var n = B(this.hash, 0);
          var f = e(n, 0, 15, 25, 200);
          var q = f / 2;
          this.svg.setWidth(q * 6);
          this.svg.setHeight(q * 6);
          d = 0;
          m = 0;
          for (; m < 6; m++) {
            for (k = 0; k < 6; k++) {
              j = B(this.hash, d);
              g = o(j);
              b = D(j);
              i = {
                fill: b,
                opacity: g
              };
              this.svg.circle(k * q, m * q, q, i);
              if (k === 0) {
                this.svg.circle(q * 6, m * q, q, i);
              }
              if (m === 0) {
                this.svg.circle(k * q, q * 6, q, i);
              }
              if (k === 0 && m === 0) {
                this.svg.circle(q * 6, q * 6, q, i);
              }
              d++;
            }
          }
        };
        s.prototype.geoOctogons = function () {
          var b;
          var c;
          var d;
          var g;
          var i;
          var j;
          var k = e(B(this.hash, 0), 0, 15, 10, 60);
          var f = F(k);
          this.svg.setWidth(k * 6);
          this.svg.setHeight(k * 6);
          c = 0;
          j = 0;
          for (; j < 6; j++) {
            for (i = 0; i < 6; i++) {
              g = B(this.hash, c);
              d = o(g);
              b = D(g);
              this.svg.polyline(f, {
                fill: b,
                "fill-opacity": d,
                stroke: w,
                "stroke-opacity": x
              }).transform({
                translate: [i * k, j * k]
              });
              c += 1;
            }
          }
        };
        s.prototype.geoSquares = function () {
          var b;
          var d;
          var f;
          var g;
          var i;
          var j;
          var k = e(B(this.hash, 0), 0, 15, 10, 60);
          this.svg.setWidth(k * 6);
          this.svg.setHeight(k * 6);
          d = 0;
          j = 0;
          for (; j < 6; j++) {
            for (i = 0; i < 6; i++) {
              g = B(this.hash, d);
              f = o(g);
              b = D(g);
              this.svg.rect(i * k, j * k, k, k, {
                fill: b,
                "fill-opacity": f,
                stroke: w,
                "stroke-opacity": x
              });
              d += 1;
            }
          }
        };
        s.prototype.geoConcentricCircles = function () {
          var b;
          var d;
          var g;
          var i;
          var j;
          var k;
          var m = B(this.hash, 0);
          var c = e(m, 0, 15, 10, 60);
          var f = c / 5;
          this.svg.setWidth((c + f) * 6);
          this.svg.setHeight((c + f) * 6);
          d = 0;
          k = 0;
          for (; k < 6; k++) {
            for (j = 0; j < 6; j++) {
              i = B(this.hash, d);
              g = o(i);
              b = D(i);
              this.svg.circle(j * c + j * f + (c + f) / 2, k * c + k * f + (c + f) / 2, c / 2, {
                fill: "none",
                stroke: b,
                opacity: g,
                "stroke-width": f + "px"
              });
              i = B(this.hash, 39 - d);
              g = o(i);
              b = D(i);
              this.svg.circle(j * c + j * f + (c + f) / 2, k * c + k * f + (c + f) / 2, c / 4, {
                fill: b,
                "fill-opacity": g
              });
              d += 1;
            }
          }
        };
        s.prototype.geoOverlappingRings = function () {
          var b;
          var d;
          var g;
          var i;
          var j;
          var k;
          var m;
          var n = B(this.hash, 0);
          var f = e(n, 0, 15, 10, 60);
          var q = f / 4;
          this.svg.setWidth(f * 6);
          this.svg.setHeight(f * 6);
          d = 0;
          m = 0;
          for (; m < 6; m++) {
            for (k = 0; k < 6; k++) {
              j = B(this.hash, d);
              g = o(j);
              b = D(j);
              i = {
                fill: "none",
                stroke: b,
                opacity: g,
                "stroke-width": q + "px"
              };
              this.svg.circle(k * f, m * f, f - q / 2, i);
              if (k === 0) {
                this.svg.circle(f * 6, m * f, f - q / 2, i);
              }
              if (m === 0) {
                this.svg.circle(k * f, f * 6, f - q / 2, i);
              }
              if (k === 0 && m === 0) {
                this.svg.circle(f * 6, f * 6, f - q / 2, i);
              }
              d += 1;
            }
          }
        };
        s.prototype.geoTriangles = function () {
          var b;
          var d;
          var f;
          var i;
          var j;
          var k;
          var m;
          var n;
          var q = B(this.hash, 0);
          var p = e(q, 0, 15, 15, 80);
          var g = p / 2 * Math.sqrt(3);
          var v = G(p, g);
          this.svg.setWidth(p * 3);
          this.svg.setHeight(g * 6);
          d = 0;
          n = 0;
          for (; n < 6; n++) {
            for (m = 0; m < 6; m++) {
              k = B(this.hash, d);
              f = o(k);
              b = D(k);
              j = {
                fill: b,
                "fill-opacity": f,
                stroke: w,
                "stroke-opacity": x
              };
              i = n % 2 === 0 ? m % 2 === 0 ? 180 : 0 : m % 2 !== 0 ? 180 : 0;
              this.svg.polyline(v, j).transform({
                translate: [m * p * 0.5 - p / 2, g * n],
                rotate: [i, p / 2, g / 2]
              });
              if (m === 0) {
                this.svg.polyline(v, j).transform({
                  translate: [p * 6 * 0.5 - p / 2, g * n],
                  rotate: [i, p / 2, g / 2]
                });
              }
              d += 1;
            }
          }
        };
        s.prototype.geoDiamonds = function () {
          var b;
          var d;
          var i;
          var j;
          var k;
          var m;
          var n;
          var q;
          var u = e(B(this.hash, 0), 0, 15, 10, 50);
          var p = e(B(this.hash, 1), 0, 15, 10, 50);
          var g = I(u, p);
          this.svg.setWidth(u * 6);
          this.svg.setHeight(p * 3);
          i = 0;
          q = 0;
          for (; q < 6; q++) {
            for (n = 0; n < 6; n++) {
              m = B(this.hash, i);
              j = o(m);
              d = D(m);
              k = {
                fill: d,
                "fill-opacity": j,
                stroke: w,
                "stroke-opacity": x
              };
              b = q % 2 === 0 ? 0 : u / 2;
              this.svg.polyline(g, k).transform({
                translate: [n * u - u / 2 + b, p / 2 * q - p / 2]
              });
              if (n === 0) {
                this.svg.polyline(g, k).transform({
                  translate: [u * 6 - u / 2 + b, p / 2 * q - p / 2]
                });
              }
              if (q === 0) {
                this.svg.polyline(g, k).transform({
                  translate: [n * u - u / 2 + b, p / 2 * 6 - p / 2]
                });
              }
              if (n === 0 && q === 0) {
                this.svg.polyline(g, k).transform({
                  translate: [u * 6 - u / 2 + b, p / 2 * 6 - p / 2]
                });
              }
              i += 1;
            }
          }
        };
        s.prototype.geoNestedSquares = function () {
          var b;
          var d;
          var g;
          var i;
          var j;
          var k;
          var m;
          var n = e(B(this.hash, 0), 0, 15, 4, 12);
          var f = n * 7;
          this.svg.setWidth((f + n) * 6 + n * 6);
          this.svg.setHeight((f + n) * 6 + n * 6);
          d = 0;
          m = 0;
          for (; m < 6; m++) {
            for (k = 0; k < 6; k++) {
              j = B(this.hash, d);
              g = o(j);
              b = D(j);
              i = {
                fill: "none",
                stroke: b,
                opacity: g,
                "stroke-width": n + "px"
              };
              this.svg.rect(k * f + k * n * 2 + n / 2, m * f + m * n * 2 + n / 2, f, f, i);
              j = B(this.hash, 39 - d);
              g = o(j);
              b = D(j);
              i = {
                fill: "none",
                stroke: b,
                opacity: g,
                "stroke-width": n + "px"
              };
              this.svg.rect(k * f + k * n * 2 + n / 2 + n * 2, m * f + m * n * 2 + n / 2 + n * 2, n * 3, n * 3, i);
              d += 1;
            }
          }
        };
        s.prototype.geoMosaicSquares = function () {
          var b;
          var d;
          var f;
          var g = e(B(this.hash, 0), 0, 15, 15, 50);
          this.svg.setWidth(g * 8);
          this.svg.setHeight(g * 8);
          b = 0;
          f = 0;
          for (; f < 4; f++) {
            for (d = 0; d < 4; d++) {
              if (d % 2 === 0) {
                if (f % 2 === 0) {
                  c(this.svg, d * g * 2, f * g * 2, g, B(this.hash, b));
                } else {
                  a(this.svg, d * g * 2, f * g * 2, g, [B(this.hash, b), B(this.hash, b + 1)]);
                }
              } else if (f % 2 === 0) {
                a(this.svg, d * g * 2, f * g * 2, g, [B(this.hash, b), B(this.hash, b + 1)]);
              } else {
                c(this.svg, d * g * 2, f * g * 2, g, B(this.hash, b));
              }
              b += 1;
            }
          }
        };
        s.prototype.geoPlaid = function () {
          var b;
          var d;
          var e;
          var g;
          var j;
          var k;
          var m;
          var n = 0;
          var p = 0;
          for (d = 0; d < 36;) {
            g = B(this.hash, d);
            n += g + 5;
            m = B(this.hash, d + 1);
            e = o(m);
            b = D(m);
            j = m + 5;
            this.svg.rect(0, n, "100%", j, {
              opacity: e,
              fill: b
            });
            n += j;
            d += 2;
          }
          for (d = 0; d < 36;) {
            g = B(this.hash, d);
            p += g + 5;
            m = B(this.hash, d + 1);
            e = o(m);
            b = D(m);
            k = m + 5;
            this.svg.rect(p, 0, k, "100%", {
              opacity: e,
              fill: b
            });
            p += k;
            d += 2;
          }
          this.svg.setWidth(p);
          this.svg.setHeight(n);
        };
        s.prototype.geoTessellation = function () {
          var b;
          var d;
          var i;
          var j;
          var k;
          var m = e(B(this.hash, 0), 0, 15, 5, 40);
          var l = m * Math.sqrt(3);
          var c = m * 2;
          var f = m / 2 * Math.sqrt(3);
          var n = J(m, f);
          var p = m * 3 + f * 2;
          var g = l * 2 + m * 2;
          this.svg.setWidth(p);
          this.svg.setHeight(g);
          d = 0;
          for (; d < 20; d++) {
            k = B(this.hash, d);
            i = o(k);
            b = D(k);
            j = {
              stroke: w,
              "stroke-opacity": x,
              fill: b,
              "fill-opacity": i,
              "stroke-width": 1
            };
            switch (d) {
              case 0:
                this.svg.rect(-m / 2, -m / 2, m, m, j);
                this.svg.rect(p - m / 2, -m / 2, m, m, j);
                this.svg.rect(-m / 2, g - m / 2, m, m, j);
                this.svg.rect(p - m / 2, g - m / 2, m, m, j);
                break;
              case 1:
                this.svg.rect(c / 2 + f, l / 2, m, m, j);
                break;
              case 2:
                this.svg.rect(-m / 2, g / 2 - m / 2, m, m, j);
                this.svg.rect(p - m / 2, g / 2 - m / 2, m, m, j);
                break;
              case 3:
                this.svg.rect(c / 2 + f, l * 1.5 + m, m, m, j);
                break;
              case 4:
                this.svg.polyline(n, j).transform({
                  translate: [m / 2, -m / 2],
                  rotate: [0, m / 2, f / 2]
                });
                this.svg.polyline(n, j).transform({
                  translate: [m / 2, g - -m / 2],
                  rotate: [0, m / 2, f / 2],
                  scale: [1, -1]
                });
                break;
              case 5:
                this.svg.polyline(n, j).transform({
                  translate: [p - m / 2, -m / 2],
                  rotate: [0, m / 2, f / 2],
                  scale: [-1, 1]
                });
                this.svg.polyline(n, j).transform({
                  translate: [p - m / 2, g + m / 2],
                  rotate: [0, m / 2, f / 2],
                  scale: [-1, -1]
                });
                break;
              case 6:
                this.svg.polyline(n, j).transform({
                  translate: [p / 2 + m / 2, l / 2]
                });
                break;
              case 7:
                this.svg.polyline(n, j).transform({
                  translate: [p - p / 2 - m / 2, l / 2],
                  scale: [-1, 1]
                });
                break;
              case 8:
                this.svg.polyline(n, j).transform({
                  translate: [p / 2 + m / 2, g - l / 2],
                  scale: [1, -1]
                });
                break;
              case 9:
                this.svg.polyline(n, j).transform({
                  translate: [p - p / 2 - m / 2, g - l / 2],
                  scale: [-1, -1]
                });
                break;
              case 10:
                this.svg.polyline(n, j).transform({
                  translate: [m / 2, g / 2 - m / 2]
                });
                break;
              case 11:
                this.svg.polyline(n, j).transform({
                  translate: [p - m / 2, g / 2 - m / 2],
                  scale: [-1, 1]
                });
                break;
              case 12:
                this.svg.rect(0, 0, m, m, j).transform({
                  translate: [m / 2, m / 2],
                  rotate: [-30, 0, 0]
                });
                break;
              case 13:
                this.svg.rect(0, 0, m, m, j).transform({
                  scale: [-1, 1],
                  translate: [-p + m / 2, m / 2],
                  rotate: [-30, 0, 0]
                });
                break;
              case 14:
                this.svg.rect(0, 0, m, m, j).transform({
                  translate: [m / 2, g / 2 - m / 2 - m],
                  rotate: [30, 0, m]
                });
                break;
              case 15:
                this.svg.rect(0, 0, m, m, j).transform({
                  scale: [-1, 1],
                  translate: [-p + m / 2, g / 2 - m / 2 - m],
                  rotate: [30, 0, m]
                });
                break;
              case 16:
                this.svg.rect(0, 0, m, m, j).transform({
                  scale: [1, -1],
                  translate: [m / 2, -g + g / 2 - m / 2 - m],
                  rotate: [30, 0, m]
                });
                break;
              case 17:
                this.svg.rect(0, 0, m, m, j).transform({
                  scale: [-1, -1],
                  translate: [-p + m / 2, -g + g / 2 - m / 2 - m],
                  rotate: [30, 0, m]
                });
                break;
              case 18:
                this.svg.rect(0, 0, m, m, j).transform({
                  scale: [1, -1],
                  translate: [m / 2, -g + m / 2],
                  rotate: [-30, 0, 0]
                });
                break;
              case 19:
                this.svg.rect(0, 0, m, m, j).transform({
                  scale: [-1, -1],
                  translate: [-p + m / 2, -g + m / 2],
                  rotate: [-30, 0, 0]
                });
            }
          }
        };
      }).call(this, q("buffer").Buffer);
    }, {
      "./color": 2,
      "./sha1": 4,
      "./svg": 5,
      buffer: 7,
      extend: 8
    }],
    4: [function (a, b) {
      "use strict";

      function c() {
        function b() {
          for (var a = 16; a < 80; a++) {
            var b = A[a - 3] ^ A[a - 8] ^ A[a - 14] ^ A[a - 16];
            A[a] = b << 1 | b >>> 31;
          }
          var c;
          var d;
          var h = m;
          var j = q;
          var k = w;
          var l = x;
          var n = z;
          for (a = 0; a < 80; a++) {
            if (a < 20) {
              c = l ^ j & (k ^ l);
              d = 1518500249;
            } else if (a < 40) {
              c = j ^ k ^ l;
              d = 1859775393;
            } else if (a < 60) {
              c = j & k | l & (j | k);
              d = 2400959708;
            } else {
              c = j ^ k ^ l;
              d = 3395469782;
            }
            var u = (h << 5 | h >>> 27) + c + n + d + (A[a] | 0);
            n = l;
            l = k;
            k = j << 30 | j >>> 2;
            j = h;
            h = u;
          }
          m = m + h | 0;
          q = q + j | 0;
          w = w + k | 0;
          x = x + l | 0;
          z = z + n | 0;
          f = 0;
          a = 0;
          for (; a < 16; a++) {
            A[a] = 0;
          }
        }
        function d(a) {
          A[f] |= (a & 255) << o;
          if (o) {
            o -= 8;
          } else {
            f++;
            o = 24;
          }
          if (f === 16) {
            b();
          }
        }
        function j(a) {
          var b = a.length;
          r += b * 8;
          for (var c = 0; b > c; c++) {
            d(a.charCodeAt(c));
          }
        }
        function k(a) {
          if (typeof a == "string") {
            return j(a);
          }
          var b = a.length;
          r += b * 8;
          for (var c = 0; b > c; c++) {
            d(a[c]);
          }
        }
        function e(a) {
          var b = "";
          for (var c = 28; c >= 0; c -= 4) {
            b += (a >> c & 15).toString(16);
          }
          return b;
        }
        function i() {
          d(128);
          if (f > 14 || f === 14 && o < 24) {
            b();
          }
          f = 14;
          o = 24;
          d(0);
          d(0);
          d(r > 1099511627775 ? r / 1099511627776 : 0);
          d(r > 4294967295 ? r / 4294967296 : 0);
          for (var a = 24; a >= 0; a -= 8) {
            d(r >> a);
          }
          return e(m) + e(q) + e(w) + e(x) + e(z);
        }
        var m = 1732584193;
        var q = 4023233417;
        var w = 2562383102;
        var x = 271733878;
        var z = 3285377520;
        var A = new Uint32Array(80);
        var f = 0;
        var o = 24;
        var r = 0;
        return {
          update: k,
          digest: i
        };
      }
      b.exports = function (a) {
        if (a === undefined) {
          return c();
        }
        var b = c();
        b.update(a);
        return b.digest();
      };
    }, {}],
    5: [function (a, b) {
      "use strict";

      function c() {
        this.width = 100;
        this.height = 100;
        this.svg = e("svg");
        this.context = [];
        this.setAttributes(this.svg, {
          xmlns: "http://www.w3.org/2000/svg",
          width: this.width,
          height: this.height
        });
        return this;
      }
      var d = a("extend");
      var e = a("./xml");
      b.exports = c;
      c.prototype.currentContext = function () {
        return this.context[this.context.length - 1] || this.svg;
      };
      c.prototype.end = function () {
        this.context.pop();
        return this;
      };
      c.prototype.currentNode = function () {
        var a = this.currentContext();
        return a.lastChild || a;
      };
      c.prototype.transform = function (a) {
        this.currentNode().setAttribute("transform", Object.keys(a).map(function (b) {
          return b + "(" + a[b].join(",") + ")";
        }).join(" "));
        return this;
      };
      c.prototype.setAttributes = function (a, b) {
        Object.keys(b).forEach(function (c) {
          a.setAttribute(c, b[c]);
        });
      };
      c.prototype.setWidth = function (a) {
        this.svg.setAttribute("width", Math.floor(a));
      };
      c.prototype.setHeight = function (a) {
        this.svg.setAttribute("height", Math.floor(a));
      };
      c.prototype.toString = function () {
        return this.svg.toString();
      };
      c.prototype.rect = function (b, c, f, g, i) {
        var j = this;
        if (Array.isArray(b)) {
          b.forEach(function (a) {
            j.rect.apply(j, a.concat(i));
          });
          return this;
        }
        var a = e("rect");
        this.currentContext().appendChild(a);
        this.setAttributes(a, d({
          x: b,
          y: c,
          width: f,
          height: g
        }, i));
        return this;
      };
      c.prototype.circle = function (a, b, c, f) {
        var g = e("circle");
        this.currentContext().appendChild(g);
        this.setAttributes(g, d({
          cx: a,
          cy: b,
          r: c
        }, f));
        return this;
      };
      c.prototype.path = function (a, b) {
        var c = e("path");
        this.currentContext().appendChild(c);
        this.setAttributes(c, d({
          d: a
        }, b));
        return this;
      };
      c.prototype.polyline = function (a, b) {
        var c = this;
        if (Array.isArray(a)) {
          a.forEach(function (a) {
            c.polyline(a, b);
          });
          return this;
        }
        var f = e("polyline");
        this.currentContext().appendChild(f);
        this.setAttributes(f, d({
          points: a
        }, b));
        return this;
      };
      c.prototype.group = function (a) {
        var b = e("g");
        this.currentContext().appendChild(b);
        this.context.push(b);
        this.setAttributes(b, d({}, a));
        return this;
      };
    }, {
      "./xml": 6,
      extend: 8
    }],
    6: [function (a, b) {
      "use strict";

      var c = b.exports = function (a) {
        if (this instanceof c) {
          this.tagName = a;
          this.attributes = Object.create(null);
          this.children = [];
          this.lastChild = null;
          return this;
        } else {
          return new c(a);
        }
      };
      c.prototype.appendChild = function (a) {
        this.children.push(a);
        this.lastChild = a;
        return this;
      };
      c.prototype.setAttribute = function (a, b) {
        this.attributes[a] = b;
        return this;
      };
      c.prototype.toString = function () {
        var a = this;
        return ["<", a.tagName, Object.keys(a.attributes).map(function (b) {
          return [" ", b, "=\"", a.attributes[b], "\""].join("");
        }).join(""), ">", a.children.map(function (a) {
          return a.toString();
        }).join(""), "</", a.tagName, ">"].join("");
      };
    }, {}],
    7: [function () {}, {}],
    8: [function (a, b) {
      function c(a) {
        if (!a || e.call(a) !== "[object Object]" || a.nodeType || a.setInterval) {
          return false;
        }
        var b = d.call(a, "constructor");
        var c = d.call(a.constructor.prototype, "isPrototypeOf");
        if (a.constructor && !b && !c) {
          return false;
        }
        var f;
        for (f in a);
        return f === undefined || d.call(a, f);
      }
      var d = Object.prototype.hasOwnProperty;
      var e = Object.prototype.toString;
      b.exports = function b() {
        var d;
        var g;
        var j;
        var k;
        var m;
        var o;
        var p = arguments[0] || {};
        var q = 1;
        var s = arguments.length;
        var u = false;
        if (typeof p == "boolean") {
          u = p;
          p = arguments[1] || {};
          q = 2;
        }
        if (typeof p != "object" && typeof p != "function") {
          p = {};
        }
        for (; s > q; q++) {
          if ((d = arguments[q]) != null) {
            for (g in d) {
              j = p[g];
              k = d[g];
              if (p !== k) {
                if (u && k && (c(k) || (m = Array.isArray(k)))) {
                  if (m) {
                    m = false;
                    o = j && Array.isArray(j) ? j : [];
                  } else {
                    o = j && c(j) ? j : {};
                  }
                  p[g] = b(u, o, k);
                } else if (k !== undefined) {
                  p[g] = k;
                }
              }
            }
          }
        }
        return p;
      };
    }, {}]
  }, {}, [1])(1);
});