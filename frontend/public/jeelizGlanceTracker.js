/**
 * Jeeliz Glance Tracker - https://github.com/jeeliz/jeelizGlanceTracker
 *
 * Copyright 2020 WebAR.rocks ( https://webar.rocks )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var JEELIZGLANCETRACKER = (function () {
  function ia(b, e, g) {
    var h = new XMLHttpRequest();
    h.open("GET", b, !0);
    h.withCredentials = !1;
    h.onreadystatechange = function () {
      4 === h.readyState &&
        (200 === h.status || 0 === h.status
          ? e(h.responseText)
          : "undefined" !== typeof g && g(h.status));
    };
    h.send();
  }
  function ja(b) {
    return new Promise(function (e, g) {
      ia(b, e, g);
    });
  }
  function ma(b, e) {
    if (0 === e || "object" !== typeof b) return b;
    b = Object.assign({}, b);
    e = void 0 === e || -1 === e ? -1 : e - 1;
    for (var g in b) b[g] = ma(b[g], e);
    return b;
  }
  function sa(b) {
    switch (b) {
      case "relu":
        return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";
      case "elu":
        return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";
      case "elu01":
        return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";
      case "arctan":
        return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
      case "copy":
        return "";
      default:
        return !1;
    }
  }
  function ua(b, e) {
    var g = e % 8;
    return (b[(e - g) / 8] >> (7 - g)) & 1;
  }
  function Aa(b) {
    var e = JSON.parse(b);
    b = e.ne;
    var g = e.nf,
      h = e.n;
    var v =
      "undefined" === typeof btoa
        ? Buffer.from(e.data, "base64").toString("latin1")
        : atob(e.data);
    var p = v.length;
    e = new Uint8Array(p);
    for (var x = 0; x < p; ++x) e[x] = v.charCodeAt(x);
    v = new Float32Array(h);
    p = new Float32Array(g);
    x = b + g + 1;
    for (var l = 0; l < h; ++l) {
      for (
        var t = x * l,
          m = 0 === ua(e, t) ? 1 : -1,
          E = t + 1,
          B = 1,
          k = 0,
          q = E + b - 1;
        q >= E;
        --q
      )
        (k += B * ua(e, q)), (B *= 2);
      E = k;
      t = t + 1 + b;
      B = p.length;
      k = 0;
      for (q = t; q < t + B; ++q) (p[k] = ua(e, q)), ++k;
      for (B = t = 0; B < g; ++B) t += p[B] * Math.pow(2, -B - 1);
      v[l] =
        0 === t && 0 === E
          ? 0
          : m * (1 + t) * Math.pow(2, 1 + E - Math.pow(2, b - 1));
    }
    return v;
  }
  var H = (function () {
      function b(u, d, n) {
        d = u.createShader(d);
        u.shaderSource(d, n);
        u.compileShader(d);
        return u.getShaderParameter(d, u.COMPILE_STATUS) ? d : !1;
      }
      function e(u, d, n) {
        d = b(u, u.VERTEX_SHADER, d);
        n = b(u, u.FRAGMENT_SHADER, n);
        u === a && l.push(d, n);
        var C = u.createProgram();
        u.attachShader(C, d);
        u.attachShader(C, n);
        u.linkProgram(C);
        return C;
      }
      function g(u) {
        return ["float", "sampler2D", "int"]
          .map(function (d) {
            return "precision " + u + " " + d + ";\n";
          })
          .join("");
      }
      function h(u, d) {
        d.v = d.v ? !0 : !1;
        if (!d.v) {
          void 0 === d.wa &&
            (d.wa =
              "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
          void 0 === d.ya && (d.ya = ["a0"]);
          void 0 === d.pa && (d.pa = [2]);
          if (void 0 === d.precision || "highp" === d.precision)
            d.precision = k;
          d.id = E++;
          void 0 !== d.Mc &&
            (d.Mc.forEach(function (z, F) {
              d.h = d.h.replace(z, d.Ra[F]);
            }),
            d.Mc.splice(0));
          d.Nb = 0;
          d.pa.forEach(function (z) {
            d.Nb += 4 * z;
          });
          var n = g(d.precision) + d.wa,
            C = g(d.precision) + d.h;
          d.ca = e(u, n, C);
          d.u = {};
          d.i.forEach(function (z) {
            d.u[z] = u.getUniformLocation(d.ca, z);
          });
          d.attributes = {};
          d.qa = [];
          d.ya.forEach(function (z) {
            var F = u.getAttribLocation(d.ca, z);
            d.attributes[z] = F;
            d.qa.push(F);
          });
          if (d.j) {
            u.useProgram(d.ca);
            m = d;
            t = d.id;
            for (var f in d.j) u.uniform1i(d.u[f], d.j[f]);
          }
          d.ba = !0;
        }
      }
      function v(u) {
        Ea.ue(K);
        t !== u.id &&
          (K.I(),
          (t = u.id),
          (m = u),
          a.useProgram(u.ca),
          u.qa.forEach(function (d) {
            0 !== d && a.enableVertexAttribArray(d);
          }));
      }
      function p(u, d, n) {
        h(u, d, n);
        u.useProgram(d.ca);
        u.enableVertexAttribArray(0);
        t = -1;
        return (m = d);
      }
      function x() {
        return {
          h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
          i: ["u1"],
          j: { u1: 0 },
        };
      }
      var l = [],
        t = -1,
        m = null,
        E = 0,
        B = !1,
        k = "highp",
        q = ["u1"],
        G = ["u0"],
        w = { u1: 0 },
        c = { u0: 0 },
        A = { u1: 0, u2: 1 },
        J = { u3: 0 },
        I = {
          s0: x(),
          s1: {
            h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
            i: q,
            j: w,
            precision: "lowp",
          },
          s2: {
            h: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
            i: ["u1", "u2"],
            j: A,
          },
          s3: {
            h: "uniform sampler2D u1;uniform vec2 u4,u5;varying vec2 vv0;void main(){vec2 a=vv0*u4+u5;gl_FragColor=texture2D(u1,a);}",
            i: ["u1", "u4", "u5"],
            j: w,
            v: !0,
          },
          s4: {
            h: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
            i: q,
            j: w,
          },
          s5: {
            h: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
            i: ["u1", "u2"],
            j: A,
          },
          s6: {
            h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
            i: q,
            j: w,
          },
          s7: {
            h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
            i: q,
            j: w,
          },
          s8: {
            h: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",
            i: ["u0", "u4"],
            j: c,
          },
          s9: {
            h: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 f=vec4(.25,.25,.25,.25),g=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,f);gl_FragColor=b*g;}",
            i: ["u0", "u4"],
            j: c,
          },
          s10: {
            h: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
            i: q,
            j: w,
          },
          s11: {
            h: "uniform sampler2D u1,u6;uniform float u7;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u6,vv0);gl_FragColor=mix(b,a,u7*f);}",
            i: ["u1", "u6", "u7"],
            j: { u1: 0, u6: 1 },
          },
          s12: {
            h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u8)+texture2D(u1,vv0+u8*vec2(1.,-1.))+texture2D(u1,vv0+u8*vec2(-1.,-1.))+texture2D(u1,vv0+u8*vec2(-1.,1.)));}",
            i: ["u1", "u8"],
            j: w,
          },
          s13: {
            h: "uniform sampler2D u1;uniform vec4 u9;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u9);gl_FragColor=j(a);}",
            i: ["u1", "u9"],
            j: w,
          },
          s14: {
            h: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
            i: G,
            j: c,
            v: !0,
          },
          s15: {
            h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}",
            i: G,
            j: c,
          },
          s16: {
            h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}",
            i: G,
            j: c,
          },
          s17: {
            h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-f;gl_FragColor=mix(.1*b,a,step(0.,a));}",
            i: G,
            j: c,
          },
          s18: {
            h: "uniform sampler2D u0,u7,u10;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u7,vv0),d=texture2D(u10,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
            i: ["u0", "u7", "u10"],
            j: { u0: 0, u7: 1, u10: 2 },
            v: !0,
          },
          s19: {
            h: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
            i: G,
            j: c,
          },
          s20: {
            h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=log(f+a);gl_FragColor=b;}",
            i: G,
            j: c,
            v: !0,
          },
          s21: {
            h: "uniform sampler2D u0,u11;uniform float u12;const vec2 e=vec2(.5,.5);const float f=1e-5;const vec4 g=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,e);float b=u12*u12;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}",
            i: ["u0", "u11", "u12"],
            j: { u0: 0, u11: 1 },
            v: !0,
          },
          s22: {
            h: "uniform sampler2D u1;uniform vec2 u13;varying vec2 vv0;void main(){float a=u13.x*u13.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u13.y),f=floor(u13.x*fract(b*u13.y)),g=(f*u13.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}",
            i: ["u1", "u13"],
            j: w,
          },
          s23: {
            h: "uniform sampler2D u14,u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u16,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u14,b),f=texture2D(u15,c);gl_FragColor=d*f;}",
            i: ["u14", "u15", "u16"],
            j: { u15: 0, u14: 1, u16: 2 },
            v: !0,
          },
          s24: {
            h: "uniform float u17;uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec2 a=fract(vv0*u17);vec4 b=texture2D(u14,vv0),c=texture2D(u15,a);gl_FragColor=b*c;}",
            i: ["u15", "u14", "u17"],
            j: { u15: 0, u14: 1 },
          },
          s25: {
            h: "uniform float u17;uniform sampler2D u14,u15,u18,u19,u20,u21;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 h=vv0*u17,l=floor(h),c=h-l;vec4 m=texture2D(u14,vv0),d=texture2D(u15,c),a=texture2D(u21,vv0);a=a*255.;vec4 n=texture2D(u18,c),o=texture2D(u19,c),p=texture2D(u20,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b;d=i*d+j*n+k*o+q*p,gl_FragColor=m*d;}",
            i: "u14 u15 u17 u21 u18 u19 u20".split(" "),
            j: { u15: 0, u14: 1, u21: 3, u18: 4, u19: 5, u20: 6 },
            v: !0,
          },
          s26: {
            h: "uniform sampler2D u14,u15,u22;uniform float u17,u23,u24,u25;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u23*vv0),b=u23*vv0-a;float c=u17/u23;vec2 d=floor(b*c),f=b*c-d,g=(a+f)/u23;float k=u23*u25/u17;vec2 l=k*d,h=(l+f*u24)/u25,i=step(h,j);vec4 m=texture2D(u14,g),n=texture2D(u15,h),o=m*n*i.x*i.y,p=texture2D(u22,g);gl_FragColor=o*u24*u24+p;}",
            i: "u14 u15 u17 u23 u24 u25 u22".split(" "),
            j: { u15: 0, u14: 1, u22: 2 },
          },
          s27: {
            h: "uniform sampler2D u14,u15;varying vec2 vv0;void main(){vec4 a=texture2D(u14,vv0),b=texture2D(u15,vv0);gl_FragColor=a*b;}",
            i: ["u14", "u15"],
            j: { u15: 0, u14: 1 },
            v: !0,
          },
          s28: {
            h: "uniform sampler2D u1,u22;uniform float u26;varying vec2 vv0;void main(){gl_FragColor=texture2D(u22,vv0)+u26*texture2D(u1,vv0);}",
            i: ["u1", "u22", "u26"],
            j: { u1: 0, u22: 1 },
          },
          s29: {
            h: "varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}",
            i: q,
            j: w,
            precision: "lowp",
          },
          s30: {
            h: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}",
            i: ["u1", "u27"],
            j: w,
            precision: "lowp",
          },
          s31: {
            h: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
            i: ["u1", "u27"],
            j: w,
            precision: "lowp",
          },
          s32: {
            h: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}",
            i: ["u1", "u2", "u28"],
            j: A,
            v: !0,
          },
          s33: {
            h: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u28,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}",
            i: ["u1", "u2", "u28"],
            j: A,
            v: !0,
          },
          s34: {
            h: "uniform sampler2D u3;uniform vec2 u8;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 g=vec2(.5,.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=vv0-u8*g;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u8*h),d=texture2D(u3,a+u8*i),j=texture2D(u3,a+u8),k=e(b,c),l=e(d,j);gl_FragColor=e(k,l);}",
            i: ["u3", "u8"],
            j: J,
          },
          s35: {
            h: "uniform sampler2D u3;uniform vec2 u8;varying vec2 vv0;const vec2 k=vec2(1.,0.),l=vec2(0.,1.),m=vec2(2.,0.),n=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u8*k),d=texture2D(u3,a+u8*l),g=texture2D(u3,a+u8),h=e(b,c),i=e(d,g);return e(h,i);}void main(){vec2 a=vv0+u8*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u8*m),d=f(a+u8*2.),g=f(a+u8*n),h=e(b,c),i=e(d,g);gl_FragColor=e(h,i);}",
            i: ["u3", "u8"],
            j: J,
            v: !0,
          },
          s36: {
            h: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
            i: ["u1"],
            j: w,
            precision: "lowp",
            v: !0,
          },
          s37: {
            h: "uniform sampler2D u1;uniform vec2 u8;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u8)+2002./e*texture2D(u1,vv0-2.*u8)+3003./e*texture2D(u1,vv0-u8)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u8)+2002./e*texture2D(u1,vv0+2.*u8)+1001./e*texture2D(u1,vv0+3.*u8);gl_FragColor=a;}",
            i: ["u8", "u1"],
            j: w,
            precision: "lowp",
            v: !0,
          },
          s38: {
            h: "uniform sampler2D u1,u11,u29;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u11,vv0),b=texture2D(u29,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}",
            i: ["u1", "u11", "u29"],
            j: { u1: 0, u11: 1, u29: 2 },
            v: !0,
          },
        },
        N = {
          s39: {
            h: "uniform float u17,u30;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u22,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u17,xyTo=floor(vv0*u17+eps2);float weightSize=toSparsity*u17;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u30*(xyPatch-halfFromSparsity))/u17,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
            i: ["u17", "u14", "u15", "u22", "u30"],
            Ra: ["1.1111", "gl_FragColor\\*=2.2222;"],
          },
          s40: {
            h: "uniform float u17,u30,u25;uniform sampler2D u14,u15,u22;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u22,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u25,xyTo=floor(vv0*u17+eps2);float weightSize=fromSparsity*u25;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u17;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u30*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u25,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u14,uvWeight)*texture2D(u15,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
            i: "u17 u25 u14 u15 u22 u30".split(" "),
            Ra: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"],
          },
        },
        r = null,
        L = null,
        K = {
          Ja: function () {
            return B;
          },
          s: function () {
            if (!B) {
              r = ma(I, 2);
              L = ma(N, 2);
              k = "highp";
              for (var u in r) h(a, r[u], u);
              H.set("s0");
              a.enableVertexAttribArray(0);
              B = !0;
            }
          },
          Vb: function (u) {
            u.forEach(function (d) {
              K.Ub(d);
            });
          },
          Ub: function (u) {
            r[u.id] = u;
            h(a, u, u.id);
          },
          qc: function (u, d, n) {
            d || (d = u);
            r[d] = Object.create(L[u]);
            r[d].Qd = !0;
            L[u].Ra &&
              L[u].Ra.forEach(function (C, f) {
                r[d].h = r[d].h.replace(new RegExp(C, "g"), n[f]);
              });
            h(a, r[d], d);
          },
          set: function (u) {
            var d = r[u];
            d.v && ((d.v = !1), h(a, d, u));
            v(d);
          },
          ua: function (u) {
            return p(u, x(), "s41");
          },
          Eb: function (u) {
            return p(
              u,
              {
                h: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                i: [],
                precision: "highp",
              },
              "s42"
            );
          },
          yd: function (u) {
            return "undefined" === typeof r[u] ? !1 : r[u].ba;
          },
          I: function () {
            -1 !== t &&
              ((t = -1),
              m.qa.forEach(function (u) {
                0 !== u && a.disableVertexAttribArray(u);
              }));
          },
          Fb: function () {
            var u = 0;
            m.qa.forEach(function (d, n) {
              n = m.pa[n];
              a.vertexAttribPointer(d, n, a.FLOAT, !1, m.Nb, u);
              u += 4 * n;
            });
          },
          Ye: function () {
            a.enableVertexAttribArray(0);
          },
          Sa: function () {
            K.Ta(a);
          },
          Ta: function (u) {
            u.vertexAttribPointer(m.qa[0], 2, u.FLOAT, !1, 8, 0);
          },
          Kf: function (u, d) {
            a.uniform1i(m.u[u], d);
          },
          P: function (u, d) {
            a.uniform1f(m.u[u], d);
          },
          da: function (u, d, n) {
            a.uniform2f(m.u[u], d, n);
          },
          Lf: function (u, d) {
            a.uniform2fv(m.u[u], d);
          },
          ve: function (u, d) {
            a.uniform3fv(m.u[u], d);
          },
          Mf: function (u, d, n, C) {
            a.uniform3f(m.u[u], d, n, C);
          },
          we: function (u, d, n, C, f) {
            a.uniform4f(m.u[u], d, n, C, f);
          },
          Rc: function (u, d) {
            a.uniform4fv(m.u[u], d);
          },
          Nf: function (u, d) {
            a.uniformMatrix2fv(m.u[u], !1, d);
          },
          Of: function (u, d) {
            a.uniformMatrix3fv(m.u[u], !1, d);
          },
          Pf: function (u, d) {
            a.uniformMatrix4fv(m.u[u], !1, d);
          },
          R: function (u, d) {
            K.set(u);
            d.forEach(function (n) {
              switch (n.type) {
                case "4f":
                  a.uniform4fv(m.u[n.name], n.value);
                  break;
                case "3f":
                  a.uniform3fv(m.u[n.name], n.value);
                  break;
                case "2f":
                  a.uniform2fv(m.u[n.name], n.value);
                  break;
                case "1f":
                  a.uniform1f(m.u[n.name], n.value);
                  break;
                case "1i":
                  a.uniform1i(m.u[n.name], n.value);
                  break;
                case "mat2":
                  a.uniformMatrix2fv(m.u[n.name], !1, n.value);
                  break;
                case "mat3":
                  a.uniformMatrix3fv(m.u[n.name], !1, n.value);
                  break;
                case "mat4":
                  a.uniformMatrix4fv(m.u[n.name], !1, n.value);
              }
            });
          },
          kf: function () {
            return "lowp";
          },
          m: function () {
            a.disableVertexAttribArray(0);
            K.I();
            for (var u in r) {
              var d = r[u];
              d.ba && ((d.ba = !1), a.deleteProgram(d.ca));
              d.Qd && delete r[u];
            }
            l.forEach(function (n) {
              a.deleteShader(n);
            });
            l.splice(0);
            E = 0;
            B = !1;
            m = null;
            t = -1;
          },
        };
      return K;
    })(),
    a = null,
    Ga = (function () {
      function b(k) {
        console.log("ERROR in ContextFF: ", k);
        return !1;
      }
      function e(k) {
        function q() {
          Fa.m();
          M.reset();
          w.getExtension("WEBGL_lose_context").loseContext();
        }
        if (
          navigator.userAgent &&
          -1 !== navigator.userAgent.indexOf("forceWebGL1")
        )
          return !1;
        var G = document.createElement("canvas");
        G.setAttribute("width", 5);
        G.setAttribute("height", 5);
        var w = null;
        try {
          w = G.getContext("webgl2", k);
        } catch (c) {
          return !1;
        }
        if (!w) return !1;
        g(w);
        M.cc(w);
        k = M.hb(w);
        if (!k.T && !k.V) return q(), !1;
        k = Fa.Zb(w, k);
        q();
        return k ? !0 : !1;
      }
      function g(k) {
        k.clearColor(0, 0, 0, 0);
        k.disable(k.DEPTH_TEST);
        k.disable(k.BLEND);
        k.disable(k.DITHER);
        k.disable(k.STENCIL_TEST);
        k.disable(k.CULL_FACE);
        k.GENERATE_MIPMAP_HINT && k.hint(k.GENERATE_MIPMAP_HINT, k.FASTEST);
        k.disable(k.SAMPLE_ALPHA_TO_COVERAGE);
        k.disable(k.SAMPLE_COVERAGE);
        k.depthFunc(k.LEQUAL);
        k.clearDepth(1);
      }
      var h = null,
        v = null,
        p = null,
        x = null,
        l = !0,
        t = null,
        m = null,
        E = [],
        B = {
          C: function () {
            return h.width;
          },
          J: function () {
            return h.height;
          },
          bf: function () {
            return h;
          },
          af: function () {
            return a;
          },
          W: function () {
            return l;
          },
          flush: function () {
            a.flush();
          },
          Bd: function () {
            t || (t = new Uint8Array(h.width * h.height * 4));
            a.readPixels(0, 0, h.width, h.height, a.RGBA, a.UNSIGNED_BYTE, t);
            return t;
          },
          df: function () {
            return h.toDataURL("image/jpeg");
          },
          ef: function () {
            S.G();
            v ||
              ((v = document.createElement("canvas")),
              (p = v.getContext("2d")));
            v.width = h.width;
            v.height = h.height;
            for (
              var k = B.Bd(),
                q = p.createImageData(v.width, v.height),
                G = v.width,
                w = v.height,
                c = q.data,
                A = 0;
              A < w;
              ++A
            )
              for (var J = w - A - 1, I = 0; I < G; ++I) {
                var N = 4 * (A * G + I),
                  r = 4 * (J * G + I);
                c[N] = k[r];
                c[N + 1] = k[r + 1];
                c[N + 2] = k[r + 2];
                c[N + 3] = k[r + 3];
              }
            p.putImageData(q, 0, 0);
            return v.toDataURL("image/png");
          },
          cf: function (k) {
            !v &&
              k &&
              ((v = document.createElement("canvas")),
              (p = v.getContext("2d")));
            var q = k ? v : document.createElement("canvas");
            q.width = h.width;
            q.height = h.height;
            (k ? p : q.getContext("2d")).drawImage(h, 0, 0);
            return q;
          },
          s: function (k) {
            k = Object.assign(
              {
                U: null,
                Dc: null,
                eb: null,
                fb: null,
                width: 512,
                height: 512,
                premultipliedAlpha: !1,
                uc: !0,
                antialias: !1,
                debug: !1,
                Ue: !1,
              },
              k
            );
            k.U
              ? ((a = k.U), (h = k.U.canvas))
              : k.fb && !k.eb
              ? (h = document.getElementById(k.fb))
              : k.eb && (h = k.eb);
            h || (h = document.createElement("canvas"));
            h.width = k.width;
            h.height = k.height;
            if (a) l = a instanceof WebGL2RenderingContext;
            else {
              l = !0;
              var q = {
                antialias: k.antialias,
                alpha: !0,
                preserveDrawingBuffer: !0,
                premultipliedAlpha: k.premultipliedAlpha,
                stencil: !1,
                depth: k.uc,
              };
              navigator &&
                navigator.userAgent &&
                -1 !== navigator.userAgent.indexOf("noAntialiasing") &&
                (q.antialias = !1);
              var G = e(q);
              !G && q.antialias && ((q.antialias = !1), (G = e(q)));
              G && (a = h.getContext("webgl2", q));
              a
                ? (l = !0)
                : ((a = h.getContext("webgl", q)) ||
                    (a = h.getContext("experimental-webgl", q)),
                  (l = !1));
            }
            if (!a) return b("WebGL1 and 2 are not enabled");
            (x = a.getExtension("WEBGL_lose_context")) &&
              k.Dc &&
              ((m = k.Dc), h.addEventListener("webglcontextlost", m, !1));
            if (!M.s()) return b("Not enough GL capabilities");
            g(a);
            H.s();
            U.s();
            if (!Fa.Zb(a, M.Ad())) return b("Cannot filter float textures");
            E.forEach(function (w) {
              w(a);
            });
            E.splice(0);
            return !0;
          },
          Oe: function () {
            return new Promise(function (k) {
              a ? k(a) : E.push(k);
            });
          },
          m: function () {
            a && (M.m(), H.m(), Fa.m());
            x &&
              m &&
              (h.removeEventListener("webglcontextlost", m, !1),
              (x = m = null));
            a = t = p = v = h = null;
            E.splice(0);
          },
        };
      return B;
    })(),
    Ea = (function () {
      function b() {
        null === e &&
          ("undefined" !== typeof H
            ? (e = H)
            : "undefined" !== typeof JEShaders && (e = JEShaders));
      }
      var e = null;
      b();
      return {
        reset: function () {
          e = null;
        },
        ue: function (g) {
          e !== g && (e && e.I(), (e = g));
        },
        Ja: function () {
          return e.Ja();
        },
        Sa: function () {
          return e.Sa();
        },
        Ta: function (g) {
          return e.Ta(g);
        },
        Fb: function () {
          return e.Fb();
        },
        I: function () {
          return e.I();
        },
        set: function (g) {
          return e.set(g);
        },
        ua: function (g) {
          b();
          return e.ua(g);
        },
        Eb: function (g) {
          b();
          return e.Eb(g);
        },
      };
    })(),
    V = (function () {
      function b(f) {
        a.bindTexture(a.TEXTURE_2D, f);
      }
      function e(f) {
        u[0] = f;
        f = d[0];
        var z = (f >> 16) & 32768,
          F = (f >> 12) & 2047,
          O = (f >> 23) & 255;
        return 103 > O
          ? z
          : 142 < O
          ? z | 31744 | ((255 == O ? 0 : 1) && f & 8388607)
          : 113 > O
          ? ((F |= 2048), z | ((F >> (114 - O)) + ((F >> (113 - O)) & 1)))
          : (z = (z | ((O - 112) << 10) | (F >> 1)) + (F & 1));
      }
      function g(f) {
        var z = new Uint16Array(f.length);
        f.forEach(function (F, O) {
          z[O] = e(F);
        });
        return z;
      }
      function h() {
        if (null !== n.pb) return n.pb;
        var f = p(g([0.5, 0.5, 0.5, 0.5]));
        return null === f ? !0 : (n.pb = f);
      }
      function v() {
        if (null !== n.qb) return n.qb;
        var f = p(new Uint8Array([127, 127, 127, 127]));
        return null === f ? !0 : (n.qb = f);
      }
      function p(f) {
        if (!Ea.Ja() || !w) return null;
        var z = null,
          F = Math.sqrt(f.length / 4);
        try {
          var O = a.getError();
          if ("FUCKING_BIG_ERROR" === O) return !1;
          z = C.instance({ isFloat: !1, F: !0, array: f, width: F });
          O = a.getError();
          if (O !== a.NO_ERROR) return !1;
        } catch (da) {
          return !1;
        }
        S.G();
        a.viewport(0, 0, F, F);
        a.clearColor(0, 0, 0, 0);
        a.clear(a.COLOR_BUFFER_BIT);
        Ea.set("s0");
        z.Wb(0);
        U.l(!0, !0);
        f = 4 * F * F;
        O = new Uint8Array(f);
        a.readPixels(0, 0, F, F, a.RGBA, a.UNSIGNED_BYTE, O);
        F = !0;
        for (var W = 0; W < f; ++W) F = F && 3 > Math.abs(O[W] - 127);
        z.remove();
        S.$();
        return F;
      }
      var x = 0,
        l = null,
        t = 0,
        m = null,
        E = null,
        B = null,
        k = null,
        q = null,
        G = null,
        w = !1,
        c = [],
        A = {
          isFloat: !1,
          isPot: !0,
          isLinear: !1,
          isMipmap: !1,
          isAnisotropicFiltering: !1,
          isMirrorX: !1,
          isMirrorY: !1,
          isSrgb: !1,
          isKeepArray: !1,
          isFlipY: null,
          width: 0,
          height: 0,
          url: null,
          array: null,
          data: null,
          A: null,
          oc: null,
          Pd: !1,
          F: !1,
          aa: null,
          Ma: 4,
          xb: 0,
        },
        J = !1,
        I = null,
        N = null,
        r = [
          [1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1],
        ],
        L = !1,
        K = !1,
        u = new Float32Array(1),
        d = new Int32Array(u.buffer),
        n = { pb: null, qb: null },
        C = {
          s: function () {
            w ||
              ((q = [a.RGBA, null, a.RGBA, a.RGBA]),
              (G = [a.RGBA, null, a.RGBA, a.RGBA]),
              (l = [
                a.TEXTURE0,
                a.TEXTURE1,
                a.TEXTURE2,
                a.TEXTURE3,
                a.TEXTURE4,
                a.TEXTURE5,
                a.TEXTURE6,
                a.TEXTURE7,
              ]),
              (L = "undefined" !== typeof JEContext),
              (K = "undefined" !== typeof M),
              L && JEContext.Bf() && l.push(a.TEXTURE8, a.TEXTURE9),
              (m = [-1, -1, -1, -1, -1, -1, -1, -1]),
              (k = [a.UNSIGNED_BYTE, a.FLOAT, a.FLOAT]),
              (w = !0));
          },
          Jd: function () {
            if (!E) {
              for (var f = new Float32Array(16384), z = 0; 16384 > z; ++z)
                f[z] = 2 * Math.random() - 1;
              E = {
                random: C.instance({
                  isFloat: !0,
                  isPot: !0,
                  array: f,
                  width: 64,
                }),
                Wc: C.instance({
                  isFloat: !1,
                  isPot: !0,
                  width: 1,
                  array: new Uint8Array([0, 0, 0, 0]),
                }),
              };
            }
            C.Ie();
          },
          sf: function () {
            return E.Wc;
          },
          Ie: function () {
            k[1] = M.kb(a);
          },
          re: function () {
            G = q = [a.RGBA, a.RGBA, a.RGBA, a.RGBA];
          },
          Jc: function (f) {
            H.set("s1");
            S.G();
            var z = f.C(),
              F = f.J();
            a.viewport(0, 0, z, F);
            f.g(0);
            U.l(!1, !1);
          },
          Ef: function (f, z) {
            C.Jc(f);
            a.readPixels(0, 0, f.C(), f.J(), a.RGBA, a.UNSIGNED_BYTE, z);
          },
          Ff: function (f, z) {
            C.Jc(f);
            return M.Qa(0, 0, f.C(), f.J(), z);
          },
          kc: function (f, z, F, O, W, da, ea) {
            f.activeTexture(f.TEXTURE0);
            var na = f.createTexture();
            f.bindTexture(f.TEXTURE_2D, na);
            W = W instanceof Float32Array ? W : new Float32Array(W);
            f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE);
            f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE);
            f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST);
            f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST);
            f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, da);
            f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, F, O, 0, f.RGBA, f.FLOAT, W);
            f.bindTexture(f.TEXTURE_2D, null);
            f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !1);
            ea && (S.$(), H.ua(f));
            f.viewport(0, 0, F, O);
            f.framebufferTexture2D(
              f.FRAMEBUFFER,
              f.COLOR_ATTACHMENT0,
              f.TEXTURE_2D,
              z,
              0
            );
            f.bindTexture(f.TEXTURE_2D, na);
            ea ? U.l(!0, !0) : U.Da(f);
            f.deleteTexture(na);
            w && ((m[0] = -1), (B = null), (x = 0));
          },
          Za: function (f) {
            f !== x && (a.activeTexture(l[f]), (x = f));
          },
          instance: function (f) {
            var z;
            function F() {
              P = void 0 !== y.A.videoWidth ? y.A.videoWidth : y.A.width;
              R = void 0 !== y.A.videoHeight ? y.A.videoHeight : y.A.height;
            }
            function O(D) {
              var Q = a.getError();
              if ("FUCKING_BIG_ERROR" === Q) return !1;
              a.texImage2D(a.TEXTURE_2D, 0, ba, Z, aa, D);
              Q = a.getError();
              Q !== a.NO_ERROR &&
                Z !== a.RGBA &&
                ((Z = a.RGBA), a.texImage2D(a.TEXTURE_2D, 0, ba, Z, aa, D));
              return !0;
            }
            function W() {
              if (!La) {
                b(fa);
                la && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, la);
                y.isPot
                  ? (a.texParameteri(
                      a.TEXTURE_2D,
                      a.TEXTURE_WRAP_S,
                      y.isMirrorX ? a.MIRRORED_REPEAT : a.REPEAT
                    ),
                    a.texParameteri(
                      a.TEXTURE_2D,
                      a.TEXTURE_WRAP_T,
                      y.isMirrorY ? a.MIRRORED_REPEAT : a.REPEAT
                    ))
                  : (a.texParameteri(
                      a.TEXTURE_2D,
                      a.TEXTURE_WRAP_S,
                      a.CLAMP_TO_EDGE
                    ),
                    a.texParameteri(
                      a.TEXTURE_2D,
                      a.TEXTURE_WRAP_T,
                      a.CLAMP_TO_EDGE
                    ));
                y.isAnisotropicFiltering &&
                  "undefined" !== typeof JESETTINGS &&
                  a.texParameterf(
                    a.TEXTURE_2D,
                    JEContext.ff().TEXTURE_MAX_ANISOTROPY_EXT,
                    JESETTINGS.Ke
                  );
                a.texParameteri(
                  a.TEXTURE_2D,
                  a.TEXTURE_MAG_FILTER,
                  y.isLinear ? a.LINEAR : a.NEAREST
                );
                y.isLinear
                  ? a.texParameteri(
                      a.TEXTURE_2D,
                      a.TEXTURE_MIN_FILTER,
                      y.isMipmap && !qa ? a.NEAREST_MIPMAP_LINEAR : a.LINEAR
                    )
                  : a.texParameteri(
                      a.TEXTURE_2D,
                      a.TEXTURE_MIN_FILTER,
                      y.isMipmap && !qa ? a.NEAREST_MIPMAP_NEAREST : a.NEAREST
                    );
                Z = q[y.Ma - 1];
                ba = G[y.Ma - 1];
                aa = k[Ha];
                if (M.W()) {
                  var D = M.Cd();
                  Z === a.RGBA && aa === a.FLOAT
                    ? y.isMipmap || y.isLinear
                      ? (ba = Fa.Ed(a))
                      : M.$b()
                      ? D && (ba = D)
                      : (ba = a.RGBA16F || a.RGBA)
                    : Z === a.RGB &&
                      aa === a.FLOAT &&
                      D &&
                      ((ba = D), (Z = a.RGBA));
                }
                if ((y.F && !y.isFloat) || (y.isFloat && y.isMipmap && Fa.Td()))
                  (ba = M.Dd()), (aa = M.kb(a));
                y.xb && (Ba = y.xb);
                y.isSrgb && 4 === y.Ma && (Z = JEContext.qf());
                if (y.A) O(y.A);
                else if (y.url) O(pa);
                else if (ha) {
                  D = ha;
                  try {
                    "FUCKING_BIG_ERROR" !== a.getError() &&
                      (a.texImage2D(a.TEXTURE_2D, 0, ba, P, R, 0, Z, aa, D),
                      a.getError() !== a.NO_ERROR &&
                        (a.texImage2D(
                          a.TEXTURE_2D,
                          0,
                          ba,
                          P,
                          R,
                          0,
                          Z,
                          aa,
                          null
                        ),
                        a.getError() !== a.NO_ERROR &&
                          a.texImage2D(
                            a.TEXTURE_2D,
                            0,
                            a.RGBA,
                            P,
                            R,
                            0,
                            a.RGBA,
                            a.UNSIGNED_BYTE,
                            null
                          )));
                  } catch (ub) {
                    a.texImage2D(a.TEXTURE_2D, 0, ba, P, R, 0, Z, aa, null);
                  }
                  y.isKeepArray || (ha = null);
                } else
                  (D = a.getError()),
                    "FUCKING_BIG_ERROR" !== D &&
                      (a.texImage2D(a.TEXTURE_2D, 0, ba, P, R, 0, Z, aa, null),
                      (D = a.getError()),
                      D !== a.NO_ERROR &&
                        ((Z = a.RGBA),
                        y.F &&
                          aa !== a.FLOAT &&
                          ((aa = a.FLOAT),
                          a.texImage2D(
                            a.TEXTURE_2D,
                            0,
                            ba,
                            P,
                            R,
                            0,
                            Z,
                            aa,
                            null
                          ))));
                if (y.isMipmap)
                  if (!qa && Y) Y.jb(), (Ca = !0);
                  else if (qa) {
                    D = Math.log2(Math.min(P, R));
                    ta = Array(1 + D);
                    ta[0] = fa;
                    for (var Q = 1; Q <= D; ++Q) {
                      var ca = Math.pow(2, Q),
                        T = P / ca;
                      ca = R / ca;
                      var ra = a.createTexture();
                      b(ra);
                      a.texParameteri(
                        a.TEXTURE_2D,
                        a.TEXTURE_MIN_FILTER,
                        a.NEAREST
                      );
                      a.texParameteri(
                        a.TEXTURE_2D,
                        a.TEXTURE_MAG_FILTER,
                        a.NEAREST
                      );
                      a.texImage2D(a.TEXTURE_2D, 0, ba, T, ca, 0, Z, aa, null);
                      b(null);
                      ta[Q] = ra;
                    }
                    Ca = !0;
                  }
                b(null);
                m[x] = -1;
                la && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
                va = !0;
                y.aa && Y && (y.aa(Y), (y.aa = null));
              }
            }
            function da() {
              for (var D = P * R, Q = 2 * D, ca = 3 * D, T = 0; T < D; ++T)
                (ka[0][T] = wa[T]),
                  (ka[1][T] = wa[T + D]),
                  (ka[2][T] = wa[T + Q]),
                  (ka[3][T] = wa[T + ca]);
            }
            function ea() {
              var D = P * R * 4;
              oa = [
                new Uint8Array(D),
                new Uint8Array(D),
                new Uint8Array(D),
                new Uint8Array(D),
              ];
              ka = [
                new Float32Array(oa[0].buffer),
                new Float32Array(oa[1].buffer),
                new Float32Array(oa[2].buffer),
                new Float32Array(oa[3].buffer),
              ];
              Da = new Uint8Array(4 * D);
              wa = new Float32Array(Da.buffer);
              xa = !0;
            }
            function na() {
              z = new Uint8Array(P * R * 4);
              Ma = new Float32Array(z.buffer);
              Ia = !0;
            }
            var y = Object.assign({}, A, f),
              ya = t++;
            null === y.isFlipY && (y.isFlipY = y.url || y.array ? !0 : !1);
            y.data &&
              ((y.array =
                "string" === typeof y.data
                  ? Aa(y.data)
                  : y.isFloat
                  ? new Float32Array(y.data)
                  : new Uint8Array(y.data)),
              (y.isFlipY = !1));
            var Ha = 0,
              Na = y.A ? !0 : !1,
              za = null,
              Ja = null,
              Oa = !1,
              Ka = null;
            y.F = y.F || y.isFloat;
            y.F && (Ha = 1);
            !y.Pd && y.isFloat && K && !M.$b() && (y.isFloat = !1);
            y.isFloat && (Ha = 2);
            y.isAnisotropicFiltering &&
              L &&
              !JEContext.vf() &&
              (y.isAnisotropicFiltering = !1);
            var fa = y.oc || a.createTexture(),
              pa = null,
              ha = !1,
              P = 0,
              R = 0,
              va = !1,
              La = !1,
              xa = !1,
              ka = null,
              oa = null,
              Da = null,
              wa = null,
              ba = null,
              Z = null,
              aa = null,
              la = y.isFlipY,
              cb = (f = y.F && y.isMipmap) && Fa.kd(),
              qa = f && cb ? !0 : !1,
              ta = null,
              Ba = -1,
              Ca = !1;
            var Ia = !1;
            var Ma = (z = null);
            y.width && ((P = y.width), (R = y.height ? y.height : P));
            var Y = {
              get: function () {
                return fa;
              },
              C: function () {
                return P;
              },
              J: function () {
                return R;
              },
              tf: function () {
                return y.url;
              },
              wf: function () {
                return y.isFloat;
              },
              yf: function () {
                return y.F;
              },
              zf: function () {
                return y.isLinear;
              },
              jb: function () {
                a.generateMipmap(a.TEXTURE_2D);
              },
              gd: function (D, Q) {
                qa
                  ? (D || (D = Y.nc()), C.Za(Q), b(ta[D]), (m[Q] = -1))
                  : Y.g(Q);
              },
              nc: function () {
                -1 === Ba && (Ba = Math.log(P) / Math.log(2));
                return Ba;
              },
              zd: function (D) {
                if (qa) {
                  D || (D = Y.nc());
                  H.set("s12");
                  C.Za(0);
                  for (var Q = P, ca = R, T = 1; T <= D; ++T)
                    (Q /= 2),
                      (ca /= 2),
                      H.da("u8", 0.25 / Q, 0.25 / ca),
                      a.viewport(0, 0, Q, ca),
                      b(ta[T - 1]),
                      a.framebufferTexture2D(
                        S.Fa(),
                        a.COLOR_ATTACHMENT0,
                        a.TEXTURE_2D,
                        ta[T],
                        0
                      ),
                      U.l(!1, 1 === T);
                  m[0] = -1;
                } else Y.jb();
              },
              Jf: function (D) {
                (Na = !(
                  Array.isArray(D) ||
                  D.constructor === Float32Array ||
                  D.constructor === Uint8Array
                ))
                  ? ((ha = null), (y.A = D), F())
                  : (ha = D);
              },
              g: function (D) {
                if (!va) return !1;
                C.Za(D);
                if (m[D] === ya) return !1;
                b(fa);
                m[D] = ya;
                return !0;
              },
              Wb: function (D) {
                a.activeTexture(l[D]);
                x = D;
                b(fa);
                m[D] = ya;
              },
              o: function () {
                B = Y;
                a.framebufferTexture2D(
                  S.Fa(),
                  a.COLOR_ATTACHMENT0,
                  a.TEXTURE_2D,
                  fa,
                  0
                );
              },
              K: function () {
                B = Y;
                a.viewport(0, 0, P, R);
                a.framebufferTexture2D(
                  S.Fa(),
                  a.COLOR_ATTACHMENT0,
                  a.TEXTURE_2D,
                  fa,
                  0
                );
              },
              Lb: C.Lb,
              resize: function (D, Q) {
                P = D;
                R = Q;
                W();
              },
              clone: function (D) {
                D = C.instance({
                  width: P,
                  height: R,
                  F: y.F,
                  isFloat: y.isFloat,
                  isLinear: y.isLinear,
                  isMirrorY: y.isMirrorY,
                  isFlipY: D ? !la : la,
                  isPot: y.isPot,
                });
                Ea.set("s0");
                S.$();
                D.o();
                a.viewport(0, 0, P, R);
                Y.g(0);
                U.l(!0, !0);
                return D;
              },
              ye: function () {
                a.viewport(0, 0, P, R);
              },
              remove: function () {
                a.deleteTexture(fa);
                La = !0;
                c.splice(c.indexOf(Y), 1);
                Y = null;
              },
              refresh: function () {
                Y.Wb(0);
                la && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
                Na
                  ? a.texImage2D(a.TEXTURE_2D, 0, ba, Z, aa, y.A)
                  : a.texImage2D(a.TEXTURE_2D, 0, ba, P, R, 0, Z, aa, ha);
                la && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
              },
              Ic: function () {
                xa || ea();
                a.readPixels(0, 0, P, 4 * R, a.RGBA, a.UNSIGNED_BYTE, Da);
                da();
                return ka;
              },
              ee: function () {
                xa || ea();
                return M.Qa(0, 0, P, 4 * R, Da).then(function () {
                  da();
                  return ka;
                });
              },
              ge: function () {
                Ia || na();
                a.readPixels(0, 0, P, R, a.RGBA, a.UNSIGNED_BYTE, z);
                return Ma;
              },
              fe: function () {
                Ia || na();
                return M.Qa(0, 0, P, R, z);
              },
              ac: function (D) {
                S.G();
                H.set("s13");
                Y.g(0);
                if (D)
                  a.viewport(0, 0, P, R),
                    H.we("u9", 0.25, 0.25, 0.25, 0.25),
                    U.l(!1, !0);
                else
                  for (D = 0; 4 > D; ++D)
                    a.viewport(0, R * D, P, R),
                      H.Rc("u9", r[D]),
                      U.l(!1, 0 === D);
              },
              Mb: function (D) {
                var Q = aa === k[0] && !v();
                b(fa);
                la && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
                Q
                  ? (Oa ||
                      ((za = document.createElement("canvas")),
                      (za.width = P),
                      (za.height = R),
                      (Ja = za.getContext("2d")),
                      (Ka = Ja.createImageData(P, R)),
                      (Oa = !0)),
                    Ka.data.set(D),
                    Ja.putImageData(Ka, 0, 0),
                    a.texImage2D(a.TEXTURE_2D, 0, ba, Z, aa, za))
                  : a.texImage2D(a.TEXTURE_2D, 0, ba, P, R, 0, Z, aa, D);
                m[x] = ya;
                la && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
              },
              Tf: function (D, Q) {
                b(fa);
                Q && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
                a.texImage2D(a.TEXTURE_2D, 0, ba, Z, aa, D);
                m[x] = ya;
                Q && a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1);
              },
              Hf: function (D, Q) {
                var ca = P * R,
                  T = 4 * ca;
                D = y.F ? (D ? "RGBE" : "JSON") : "RGBA";
                Q && (D = Q);
                Q = M.W() && !1;
                var ra = null;
                switch (D) {
                  case "RGBE":
                    ra = "s43";
                    break;
                  case "JSON":
                    ra = Q ? "s0" : "s13";
                    break;
                  case "RGBA":
                  case "RGBAARRAY":
                    ra = "s7";
                }
                xa ||
                  ("RGBA" === D || "RGBE" === D || "RGBAARRAY" === D
                    ? ((oa = new Uint8Array(T)), (xa = !0))
                    : "JSON" !== D || Q || ea());
                S.G();
                H.set(ra);
                Y.g(0);
                T = null;
                if ("RGBA" === D || "RGBE" === D || "RGBAARRAY" === D) {
                  a.viewport(0, 0, P, R);
                  U.l(!0, !0);
                  a.readPixels(0, 0, P, R, a.RGBA, a.UNSIGNED_BYTE, oa);
                  if ("RGBAARRAY" === D) return { data: oa };
                  J ||
                    ((I = document.createElement("canvas")),
                    (N = I.getContext("2d")),
                    (J = !0));
                  I.width = P;
                  I.height = R;
                  ca = N.createImageData(P, R);
                  ca.data.set(oa);
                  N.putImageData(ca, 0, 0);
                  T = I.toDataURL("image/png");
                } else if ("JSON" === D)
                  if (Q)
                    (T = new Float32Array(ca)),
                      a.viewport(0, 0, P, R),
                      U.l(!0, !0),
                      a.readPixels(0, 0, P, R, a.RGBA, a.FLOAT, T);
                  else {
                    for (T = 0; 4 > T; ++T)
                      a.viewport(0, R * T, P, R), H.Rc("u9", r[T]), U.l(!T, !T);
                    Y.Ic();
                    T = Array(ca);
                    for (Q = 0; Q < ca; ++Q)
                      (T[4 * Q] = ka[0][Q]),
                        (T[4 * Q + 1] = ka[1][Q]),
                        (T[4 * Q + 2] = ka[2][Q]),
                        (T[4 * Q + 3] = ka[3][Q]);
                  }
                return {
                  format: D,
                  data: T,
                  width: P,
                  height: R,
                  isMirrorY: y.isMirrorY,
                  isFlipY: "RGBA" === D ? y.isFlipY : !y.isFlipY,
                };
              },
            };
            y.isMipmap && !qa && va && !Ca && (Y.jb(), (Ca = !0));
            if (y.url)
              b(fa),
                a.texImage2D(
                  a.TEXTURE_2D,
                  0,
                  a.RGBA,
                  1,
                  1,
                  0,
                  a.RGBA,
                  a.UNSIGNED_BYTE,
                  null
                ),
                (pa = new Image()),
                (pa.Te = "Anonymous"),
                (pa.crossOrigin = "Anonymous"),
                (pa.src = y.url),
                (pa.onload = function () {
                  P = pa.width;
                  R = pa.height;
                  W();
                });
            else if (y.A) {
              var Pa = function () {
                F();
                P ? W() : setTimeout(Pa, 1);
              };
              Pa();
            } else
              y.array
                ? (y.F && !y.isFloat
                    ? y.array instanceof Uint16Array
                      ? ((ha = y.array), W())
                      : h()
                      ? ((ha = g(y.array)), W())
                      : (W(), C.kc(a, fa, Y.C(), Y.J(), y.array, la, !0))
                    : ((ha = y.isFloat
                        ? y.array instanceof Float32Array
                          ? y.array
                          : new Float32Array(y.array)
                        : y.array instanceof Uint8Array
                        ? y.array
                        : new Uint8Array(y.array)),
                      W()),
                  y.isKeepArray ||
                    (ha && ha !== y.array && (ha = null), delete y.array))
                : y.oc
                ? (va = !0)
                : W();
            Y.pf = Y.C;
            y.aa && va && (y.aa(Y), (y.aa = null));
            c.push(Y);
            return Y;
          },
          G: function (f) {
            f !== x && (a.activeTexture(l[f]), (x = f));
            m[f] = -1;
            b(null);
          },
          Ne: function (f) {
            E.random.g(f);
          },
          Lb: function () {
            B = null;
            a.framebufferTexture2D(
              S.Fa(),
              a.COLOR_ATTACHMENT0,
              a.TEXTURE_2D,
              null,
              0
            );
          },
          reset: function () {
            0 !== x && a.activeTexture(l[0]);
            for (var f = 0; f < l.length; ++f) m[f] = -1;
            x = -1;
          },
          Gf: function () {
            x = -1;
          },
          Ge: function () {
            for (var f = 0; f < l.length; ++f) C.G(f);
          },
          lc: function () {
            E && (E.random.remove(), E.Wc.remove());
          },
          Rf: function (f, z) {
            if ("RGBA" === f.format || "RGBE" === f.format) {
              var F = new Image();
              F.src = f.data;
              F.onload = function () {
                C.instance({
                  isMirrorY: f.isMirrorY,
                  isFlipY: f.isFlipY,
                  isFloat: !1,
                  A: F,
                  aa: function (O) {
                    if ("RGBA" === f.format) z(O);
                    else {
                      var W = f.width,
                        da = f.height,
                        ea = C.instance({
                          isMirrorY: f.isMirrorY,
                          isFloat: !0,
                          width: W,
                          height: da,
                          isFlipY: f.isFlipY,
                        });
                      S.$();
                      a.viewport(0, 0, W, da);
                      H.set("s44");
                      ea.o();
                      O.g(0);
                      U.l(!0, !0);
                      C.G(0);
                      z(ea);
                      M.flush();
                      setTimeout(O.remove, 50);
                    }
                  },
                });
              };
            } else
              "JSON" === f.format
                ? z(
                    C.instance({
                      isFloat: !0,
                      isFlipY: f.isFlipY,
                      width: f.width,
                      height: f.height,
                      array: new Float32Array(f.data),
                    })
                  )
                : z(!1);
          },
          nd: g,
          m: function () {
            B && (S.$(), C.Lb(), S.G());
            C.Ge();
            c.slice(0).forEach(function (f) {
              f.remove();
            });
            c.splice(0);
            w = !1;
            t = 0;
            "undefined" !== typeof Fa && Fa.m();
            E = null;
          },
        };
      return C;
    })(),
    Qa = {
      instance: function (b) {
        var e = [V.instance(b), V.instance(b)],
          g = [e[1], e[0]],
          h = g,
          v = {
            pe: function (p) {
              h[1].o();
              h[0].g(p);
              v.Tc();
            },
            Qc: function (p) {
              h[1].K();
              h[0].g(p);
              v.Tc();
            },
            Tc: function () {
              h = h === e ? g : e;
            },
            refresh: function () {
              h[0].refresh();
              h[1].refresh();
            },
            g: function (p) {
              h[0].g(p);
            },
            Me: function (p) {
              h[1].g(p);
            },
            jf: function () {
              return h[0];
            },
            lf: function () {
              return h[1];
            },
            Mb: function (p) {
              h[0].Mb(p);
              h[1].Mb(p);
            },
            remove: function () {
              h[0].remove();
              h[1].remove();
              h = null;
            },
            sync: function () {
              v.Qc(0);
              H.set("s0");
              U.l(!1, !1);
            },
          };
        return v;
      },
    },
    U = (function () {
      function b(t) {
        var m = { S: null, D: null };
        m.S = t.createBuffer();
        t.bindBuffer(t.ARRAY_BUFFER, m.S);
        t.bufferData(
          t.ARRAY_BUFFER,
          new Float32Array([-1, -1, 3, -1, -1, 3]),
          t.STATIC_DRAW
        );
        m.D = t.createBuffer();
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, m.D);
        t.bufferData(
          t.ELEMENT_ARRAY_BUFFER,
          new Uint16Array([0, 1, 2]),
          t.STATIC_DRAW
        );
        return m;
      }
      var e = null,
        g = 0,
        h = !1,
        v = [],
        p = -2,
        x = -2,
        l = {
          reset: function () {
            x = p = -2;
          },
          s: function () {
            h || ((e = b(a)), l.$a(), (h = !0));
          },
          instance: function (t) {
            var m = g++,
              E = t.D ? t.D.length : 0,
              B = "undefined" === typeof t.mode ? a.STATIC_DRAW : t.mode,
              k = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, k);
            a.bufferData(
              a.ARRAY_BUFFER,
              t.S instanceof Float32Array ? t.S : new Float32Array(t.S),
              B
            );
            p = m;
            var q = null,
              G = null,
              w = null;
            if (t.D) {
              q = a.createBuffer();
              a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, q);
              var c = null;
              65536 > t.D.length
                ? ((c = Uint16Array), (G = a.UNSIGNED_SHORT), (w = 2))
                : ((c = Uint32Array), (G = a.UNSIGNED_INT), (w = 4));
              c = t.D instanceof c ? t.D : new c(t.D);
              a.bufferData(a.ELEMENT_ARRAY_BUFFER, c, B);
              x = m;
            }
            var A = {
              hd: function (J) {
                p !== m && (a.bindBuffer(a.ARRAY_BUFFER, k), (p = m));
                J && Ea.Fb();
              },
              ed: function () {
                x !== m && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, q), (x = m));
              },
              bind: function (J) {
                A.hd(J);
                A.ed();
              },
              We: function () {
                a.drawElements(a.TRIANGLES, E, G, 0);
              },
              Xe: function (J, I) {
                a.drawElements(a.TRIANGLES, J, G, I * w);
              },
              remove: function () {
                a.deleteBuffer(k);
                t.D && a.deleteBuffer(q);
                A = null;
              },
            };
            v.push(A);
            return A;
          },
          $a: function () {
            -1 !== p && (a.bindBuffer(a.ARRAY_BUFFER, e.S), (p = -1));
            -1 !== x && (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, e.D), (x = -1));
          },
          l: function (t, m) {
            t && U.$a();
            m && Ea.Sa();
            a.drawElements(a.TRIANGLES, 3, a.UNSIGNED_SHORT, 0);
          },
          Da: function (t) {
            t = t || a;
            var m = b(t);
            t.bindBuffer(t.ARRAY_BUFFER, m.S);
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, m.D);
            Ea.Ta(t);
            t.clear(t.COLOR_BUFFER_BIT);
            t.drawElements(t.TRIANGLES, 3, t.UNSIGNED_SHORT, 0);
            t.flush();
            t.bindBuffer(t.ARRAY_BUFFER, null);
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
            t.deleteBuffer(m.S);
            t.deleteBuffer(m.D);
            l.reset();
            h && (l.$a(), Ea.Sa());
          },
          lc: function () {
            var t = a,
              m = e;
            t.deleteBuffer(m.S);
            t.deleteBuffer(m.D);
          },
          m: function () {
            l.lc();
            v.forEach(function (t) {
              t.remove();
            });
            a.bindBuffer(a.ARRAY_BUFFER, null);
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
            l.reset();
            h = !1;
            v.splice(0);
            g = 0;
          },
        };
      return l;
    })(),
    S = (function () {
      var b = null,
        e = null,
        g = null,
        h = !1,
        v = [],
        p = { B: -2, jc: 1 },
        x = {
          Ja: function () {
            return h;
          },
          s: function () {
            if (!h) {
              b = a.createFramebuffer();
              var l = M.W();
              e = l && a.DRAW_FRAMEBUFFER ? a.DRAW_FRAMEBUFFER : a.FRAMEBUFFER;
              g = l && a.READ_FRAMEBUFFER ? a.READ_FRAMEBUFFER : a.FRAMEBUFFER;
              h = !0;
            }
          },
          gf: function () {
            return e;
          },
          Fd: function () {
            return g;
          },
          Fa: function () {
            return a.FRAMEBUFFER;
          },
          mf: function () {
            return p;
          },
          $e: function () {
            return b;
          },
          instance: function (l) {
            void 0 === l.tc && (l.tc = !1);
            var t = l.ma ? l.ma : null,
              m = l.width,
              E = void 0 !== l.height ? l.height : l.width,
              B = b,
              k = null,
              q = !1,
              G = !1,
              w = 0;
            t && ((m = m ? m : t.C()), (E = E ? E : t.J()));
            var c = {
              Pc: function () {
                q || ((B = a.createFramebuffer()), (q = !0), (w = p.jc++));
              },
              cd: function () {
                c.Pc();
                c.o();
                k = a.createRenderbuffer();
                a.bindRenderbuffer(a.RENDERBUFFER, k);
                a.renderbufferStorage(
                  a.RENDERBUFFER,
                  a.DEPTH_COMPONENT16,
                  m,
                  E
                );
                a.framebufferRenderbuffer(
                  e,
                  a.DEPTH_ATTACHMENT,
                  a.RENDERBUFFER,
                  k
                );
                a.clearDepth(1);
              },
              bind: function (A, J) {
                w !== p.B && (a.bindFramebuffer(e, B), (p.B = w));
                t && t.o();
                J && a.viewport(0, 0, m, E);
                A && a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
              },
              Le: function () {
                w !== p.B && (a.bindFramebuffer(e, B), (p.B = w));
              },
              clear: function () {
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
              },
              Re: function () {
                a.clear(a.COLOR_BUFFER_BIT);
              },
              Se: function () {
                a.clear(a.DEPTH_BUFFER_BIT);
              },
              ye: function () {
                a.viewport(0, 0, m, E);
              },
              o: function () {
                w !== p.B && (a.bindFramebuffer(e, B), (p.B = w));
              },
              rtt: function (A) {
                t = A;
                p.B !== w && (a.bindFramebuffer(a.FRAMEBUFFER, B), (p.B = w));
                A.o();
              },
              G: function () {
                a.bindFramebuffer(e, null);
                p.B = -1;
              },
              resize: function (A, J) {
                m = A;
                E = J;
                k &&
                  (a.bindRenderbuffer(a.RENDERBUFFER, k),
                  a.renderbufferStorage(
                    a.RENDERBUFFER,
                    a.DEPTH_COMPONENT16,
                    m,
                    E
                  ));
              },
              remove: function () {
                B === b ||
                  G ||
                  (a.bindFramebuffer(e, B),
                  a.framebufferTexture2D(
                    e,
                    a.COLOR_ATTACHMENT0,
                    a.TEXTURE_2D,
                    null,
                    0
                  ),
                  k &&
                    a.framebufferRenderbuffer(
                      e,
                      a.DEPTH_ATTACHMENT,
                      a.RENDERBUFFER,
                      null
                    ),
                  a.bindFramebuffer(e, null),
                  a.deleteFramebuffer(B),
                  k && a.deleteRenderbuffer(k));
                G = !0;
              },
            };
            l.tc && c.cd();
            v.push(c);
            return c;
          },
          G: function () {
            a.bindFramebuffer(e, null);
            p.B = -1;
          },
          He: function () {
            a.bindFramebuffer(e, null);
            a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
            M.Sc();
            p.B = -1;
          },
          reset: function () {
            p.B = -2;
          },
          $: function () {
            0 !== p.B && (a.bindFramebuffer(e, b), (p.B = 0));
          },
          clear: function () {
            M.Sc();
            a.clear(a.COLOR_BUFFER_BIT);
          },
          m: function () {
            x.G();
            v.forEach(function (l) {
              l.remove();
            });
            null !== b && (a.deleteFramebuffer(b), (b = null));
            x.reset();
            h = !1;
            v.splice(0);
            p.jc = 1;
          },
        };
      return x;
    })(),
    M = (function () {
      function b() {
        v = "undefined" === typeof Ga ? JEContext : Ga;
        p = !0;
      }
      function e(c, A) {
        for (var J = 0; J < c.length; ++J) {
          var I = A.getExtension(c[J]);
          if (I) return I;
        }
        return null;
      }
      function g() {
        null !== q.Xa && (clearInterval(q.Xa), (q.Xa = null));
        q.ha = !1;
      }
      function h() {
        q.ra && (a.deleteSync(q.ra), (q.ra = null));
      }
      var v = null,
        p = !1,
        x = {
          vc: !1,
          Gb: null,
          Hb: null,
          yc: !1,
          Sd: !1,
          Ib: null,
          zc: !1,
          Jb: null,
          wc: !1,
          ab: null,
          Md: !1,
          bb: null,
          Nd: !1,
        },
        l = null,
        t = { T: !0, V: !0, ib: !0, Hc: !1 },
        m = null,
        E = !0,
        B = null,
        k = null,
        q = { ha: !1, ga: null, ra: null, nb: -1, M: null, Xa: null },
        G = "undefined" === typeof window ? {} : window,
        w = {
          s: function () {
            if (p) return !0;
            w.reset();
            p || b();
            var c = a;
            if (!l.vc) {
              l.Gb = w.fc(c);
              G.GL_EXT_FLOAT = l.Gb;
              l.yc = l.Gb ? !0 : !1;
              if (l.yc || w.W())
                (l.Hb = w.hc(c)),
                  (l.Sd = l.Hb ? !0 : !1),
                  (G.GL_EXT_FLOATLINEAR = l.Hb);
              l.vc = !0;
            }
            if (!l.wc) {
              l.Ib = w.Ba(c);
              l.Ib && ((l.zc = !0), (G.GL_EXT_HALFFLOAT = l.Ib));
              if (l.zc || w.W())
                (l.Jb = w.ic(c)), (G.GL_EXT_HALFFLOATLINEAR = l.Jb);
              l.uf = l.Jb ? !0 : !1;
              l.wc = !0;
            }
            l.ab = w.dc(c);
            l.Md = l.ab ? !0 : !1;
            G.GL_EXT_COLORBUFFERFLOAT = l.ab;
            l.bb = w.ec(c);
            l.Nd = l.bb ? !0 : !1;
            G.GL_EXT_COLORBUFFERHALFFLOAT = l.bb;
            S.s();
            V.s();
            if (!w.td()) return !1;
            U.s();
            V.Jd();
            return !0;
          },
          reset: function () {
            l = Object.assign({}, x);
            m = Object.assign({}, t);
          },
          C: function () {
            p || b();
            return v.C();
          },
          J: function () {
            p || b();
            return v.J();
          },
          W: function () {
            p || b();
            return v.W();
          },
          cc: function (c) {
            w.dc(c);
            w.ec(c);
            w.fc(c);
            w.hc(c);
            w.Ba(c);
            w.ic(c);
          },
          dc: e.bind(null, [
            "EXT_color_buffer_float",
            "WEBGL_color_buffer_float",
            "OES_color_buffer_float",
          ]),
          ec: e.bind(null, [
            "EXT_color_buffer_half_float",
            "WEBGL_color_buffer_half_float",
            "OES_color_buffer_half_float",
          ]),
          fc: e.bind(null, [
            "OES_texture_float",
            "MOZ_OES_texture_float",
            "WEBKIT_OES_texture_float",
          ]),
          hc: e.bind(null, [
            "OES_texture_float_linear",
            "MOZ_OES_texture_float_linear",
            "WEBKIT_OES_texture_float_linear",
          ]),
          Ba: e.bind(null, [
            "OES_texture_half_float",
            "MOZ_OES_texture_half_float",
            "WEBKIT_OES_texture_half_float",
          ]),
          ic: e.bind(null, [
            "OES_texture_half_float_linear",
            "MOZ_OES_texture_half_float_linear",
            "WEBKIT_OES_texture_half_float_linear",
          ]),
          kb: function (c) {
            var A = w.Ba(c);
            return A && A.HALF_FLOAT_OES
              ? A.HALF_FLOAT_OES
              : c.HALF_FLOAT || c.FLOAT;
          },
          Cd: function () {
            return k || a.RGBA32F || a.RGBA;
          },
          Dd: function () {
            return B || a.RGBA16F || a.RGBA;
          },
          Ad: function () {
            return m;
          },
          $b: function () {
            return m.T;
          },
          Qe: function () {
            return m.V;
          },
          Pe: function () {
            return m.ib;
          },
          ld: function () {
            return m.Hc && E;
          },
          Vc: function (c) {
            E = c;
            !c && q.ha && (h(), a.bindBuffer(q.M, null), (q.ha = !1));
          },
          Af: function () {
            return q.ha;
          },
          Ua: function (c, A, J) {
            function I() {
              c.bindTexture(c.TEXTURE_2D, null);
              c.bindFramebuffer(N, null);
              c.deleteTexture(K);
              c.deleteFramebuffer(L);
            }
            var N = c.FRAMEBUFFER,
              r = c.NEAREST,
              L = c.createFramebuffer();
            c.bindFramebuffer(N, L);
            var K = c.createTexture();
            c.activeTexture(c.TEXTURE0);
            c.bindTexture(c.TEXTURE_2D, K);
            c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, r);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, r);
            c.texImage2D(c.TEXTURE_2D, 0, A, 3, 3, 0, c.RGBA, J, null);
            c.framebufferTexture2D(
              c.FRAMEBUFFER,
              c.COLOR_ATTACHMENT0,
              c.TEXTURE_2D,
              K,
              0
            );
            if (
              c.checkFramebufferStatus(c.READ_FRAMEBUFFER || c.FRAMEBUFFER) !==
              c.FRAMEBUFFER_COMPLETE
            )
              return I(), !1;
            Ea.Eb(c);
            c.clearColor(0, 0, 0, 0);
            c.viewport(0, 0, 3, 3);
            c.disable(c.DEPTH_TEST);
            c.clear(c.COLOR_BUFFER_BIT);
            U.Da(c);
            c.bindFramebuffer(N, null);
            Ea.ua(c);
            c.activeTexture(c.TEXTURE0);
            c.bindTexture(c.TEXTURE_2D, K);
            U.Da(c);
            A = new Uint8Array(36);
            c.readPixels(0, 0, 3, 3, c.RGBA, c.UNSIGNED_BYTE, A);
            I();
            for (J = 0; 36 > J; ++J)
              if (3 !== J % 4 && 3 < Math.abs(A[J] - 127)) return !1;
            return !0;
          },
          hb: function (c) {
            var A = { T: !1, V: !1 };
            c.disable(c.BLEND);
            c.clearColor(0, 0, 0, 0);
            c.clear(c.COLOR_BUFFER_BIT);
            c.RGBA32F &&
              w.Ua(c, c.RGBA32F, c.FLOAT) &&
              ((A.T = !0), (k = c.RGBA32F));
            !A.T && w.Ua(c, c.RGBA, c.FLOAT) && ((A.T = !0), (k = c.RGBA));
            var J = w.kb(c);
            B = null;
            c.RGBA16F && w.Ua(c, c.RGBA16F, J) && ((A.V = !0), (B = c.RGBA16F));
            !A.V && w.Ua(c, c.RGBA, J) && ((A.V = !0), (B = c.RGBA));
            return A;
          },
          ud: function () {
            var c = S.instance({ width: 2 });
            c.Pc();
            var A = V.instance({ width: 2, isFloat: !0, Ma: 3 });
            c.o();
            A.o();
            w.flush();
            a.checkFramebufferStatus(S.Fd()) !== a.FRAMEBUFFER_COMPLETE
              ? (V.re(), (m.ib = !1))
              : (m.ib = !0);
            c.remove();
            A.remove();
          },
          vd: function () {
            var c = !1;
            w.W() &&
              (c =
                "PIXEL_PACK_BUFFER STREAM_READ SYNC_GPU_COMMANDS_COMPLETE WAIT_FAILED fenceSync deleteSync createBuffer"
                  .split(" ")
                  .every(function (A) {
                    return "undefined" !== typeof a[A];
                  }));
            m.Hc = c;
          },
          td: function () {
            var c = w.hb(a);
            Object.assign(m, c);
            if (!m.T && !m.V) return !1;
            w.ud();
            w.vd();
            return !0;
          },
          he: function (c, A, J, I, N) {
            a.readPixels(c, A, J, I, a.RGBA, a.UNSIGNED_BYTE, N);
            return Promise.resolve(N, !1);
          },
          Qa: function (c, A, J, I, N, r) {
            if (!w.ld()) return w.he(c, A, J, I, N);
            null === q.ga &&
              ((q.M = a.PIXEL_PACK_BUFFER),
              (q.ga = a.createBuffer()),
              (q.nb = -1));
            a.bindBuffer(q.M, q.ga);
            N.byteLength !== q.nb &&
              (a.bufferData(q.M, N.byteLength, a.STREAM_READ),
              (q.nb = N.byteLength));
            a.readPixels(c, A, J, I, a.RGBA, a.UNSIGNED_BYTE, 0);
            q.ra = a.fenceSync(a.SYNC_GPU_COMMANDS_COMPLETE, 0);
            w.flush();
            var L = !1;
            return new Promise(function (K, u) {
              function d() {
                if (!q.ha) return g(), u(), !1;
                switch (a.clientWaitSync(q.ra, 0, 0)) {
                  case a.TIMEOUT_EXPIRED:
                  case a.WAIT_FAILED:
                    return !1;
                  default:
                    return (
                      g(),
                      h(),
                      a.getBufferSubData(q.M, 0, N),
                      a.bindBuffer(q.M, null),
                      K(N, L),
                      !0
                    );
                }
              }
              g();
              q.ha = !0;
              d() || (r && !L && ((L = !0), r()), (q.Xa = setInterval(d, 0)));
            });
          },
          Sc: function () {
            a.viewport(0, 0, w.C(), w.J());
          },
          flush: function () {
            a.flush();
          },
          m: function () {
            g();
            h();
            V.m();
            S.m();
            U.m();
            null !== q.ga && (a.deleteBuffer(q.ga), (q.ga = null));
            Ea.reset();
            p = !1;
          },
        };
      return w;
    })(),
    Fa = (function () {
      function b(r, L, K, u) {
        c.texParameteri(
          c.TEXTURE_2D,
          c.TEXTURE_MIN_FILTER,
          u ? c.NEAREST_MIPMAP_NEAREST : c.LINEAR
        );
        var d = null;
        if (null !== K)
          try {
            d = c.getError();
            if ("FUCKING_BIG_ERROR" === d) return !1;
            c.texImage2D(c.TEXTURE_2D, 0, r, 4, 4, 0, c.RGBA, L, K);
            d = c.getError();
            if (d !== c.NO_ERROR) return !1;
          } catch (n) {
            return !1;
          }
        u && c.generateMipmap(c.TEXTURE_2D);
        c.clear(c.COLOR_BUFFER_BIT);
        U.Da(c);
        d = c.getError();
        if ("FUCKING_BIG_ERROR" === d) return !1;
        c.readPixels(0, 0, 2, 2, c.RGBA, c.UNSIGNED_BYTE, E);
        d = c.getError();
        d === c.INVALID_OPERATION &&
          "undefined" !== typeof c.PIXEL_PACK_BUFFER &&
          (c.bindBuffer(c.PIXEL_PACK_BUFFER, null),
          c.readPixels(0, 0, 2, 2, c.RGBA, c.UNSIGNED_BYTE, E),
          (d = c.getError()));
        if (d !== c.NO_ERROR) return !1;
        K = !0;
        for (u = 0; 16 > u; ++u) K = K && 4 > Math.abs(E[u] - 127);
        K && ((t.Fc = L), (t.sc = r));
        return K;
      }
      function e(r, L) {
        return A.T && b(r, c.FLOAT, new Float32Array(B), L)
          ? ((l = x.Tb), !0)
          : !1;
      }
      function g(r, L, K) {
        if (!A.V) return !1;
        var u = V.nd(B),
          d = M.Ba(c);
        if (
          (d && d.HALF_FLOAT_OES && b(r, d.HALF_FLOAT_OES, u, L)) ||
          (c.HALF_FLOAT && b(r, c.HALF_FLOAT, u, L))
        )
          return (l = x.oa), !0;
        u = new Float32Array(B);
        if (b(r, c.FLOAT, u, L)) return (l = x.oa), !0;
        c.bindTexture(c.TEXTURE_2D, K);
        c.texImage2D(
          c.TEXTURE_2D,
          0,
          c.RGBA,
          2,
          2,
          0,
          c.RGBA,
          c.UNSIGNED_BYTE,
          null
        );
        c.bindFramebuffer(t.Aa, N);
        V.kc(c, K, 2, 2, u, !1, !1);
        c.bindFramebuffer(t.Aa, null);
        c.bindTexture(c.TEXTURE_2D, K);
        return b(r, null, null, L) ? ((l = x.oa), !0) : !1;
      }
      function h(r, L, K) {
        m = !0;
        if (g(r, !0, K) || e(L, !0)) return !0;
        m = !1;
        return g(r, !1, K) || e(L, !1) ? !0 : !1;
      }
      function v(r) {
        if (l === x.I) {
          c = r || a;
          l = x.RGBA8;
          m = !0;
          M.cc(c);
          A || (A = M.hb(c));
          S.reset();
          N = c.createFramebuffer();
          t.Aa = c.DRAW_FRAMEBUFFER || c.FRAMEBUFFER;
          c.bindFramebuffer(t.Aa, null);
          c.clearColor(0, 0, 0, 0);
          c.viewport(0, 0, 2, 2);
          H.I();
          J = H.ua(c);
          r = c.createTexture();
          c.activeTexture(c.TEXTURE0);
          c.bindTexture(c.TEXTURE_2D, r);
          c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.REPEAT);
          c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.REPEAT);
          c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
          I = r;
          var L = (r = c.RGBA),
            K = c.RGBA16F,
            u = c.RGBA32F;
          u && (r = u);
          K && (L = K);
          if ((K || u) && h(L, r, I)) return p(), !0;
          r = L = c.RGBA;
          if (h(L, r, I)) return p(), !0;
          l = x.RGBA8;
          p();
          return !1;
        }
      }
      function p() {
        c.deleteProgram(J.ca);
        c.deleteTexture(I);
        I = J = null;
      }
      for (
        var x = { I: -1, Tb: 3, oa: 2, RGBA8: 0 },
          l = x.I,
          t = { Fc: null, sc: null, Aa: null },
          m = !0,
          E = new Uint8Array(16),
          B = Array(64),
          k = 0;
        4 > k;
        ++k
      )
        for (var q = 0; 4 > q; ++q) {
          var G = 0 === (q + k) % 2 ? 1 : 0,
            w = 4 * k + q;
          B[4 * w] = G;
          B[4 * w + 1] = G;
          B[4 * w + 2] = G;
          B[4 * w + 3] = G;
        }
      var c = null,
        A = null,
        J = null,
        I = null,
        N = null;
      return {
        kd: function (r) {
          v(r);
          return m;
        },
        Zb: function (r, L) {
          l === x.I && (typeof ("undefined" !== L) && (A = L), v(r));
          return l !== x.RGBA8;
        },
        xf: function (r) {
          v(r);
          return l === x.Tb;
        },
        Td: function (r) {
          v(r);
          return l === x.oa;
        },
        hf: function (r) {
          v(r);
          return t.Fc;
        },
        Ed: function (r) {
          v(r);
          return t.sc;
        },
        m: function () {
          c = null;
          m = !0;
          l = x.I;
          A = null;
        },
      };
    })(),
    Ra = {
      instance: function (b) {
        var e = V.instance(b.alpha),
          g = V.instance(b.beta);
        return {
          wd: function () {
            e.g(1);
            g.g(2);
          },
        };
      },
    },
    Ua = {
      instance: function (b) {
        var e = null,
          g = !1,
          h = !1,
          v = null,
          p = !1,
          x = !1,
          l = null,
          t = "undefined" === typeof b.preprocessing ? !1 : b.preprocessing,
          m =
            "undefined" === typeof b.preprocessingSize
              ? b.size
              : b.preprocessingSize;
        b.mask &&
          ((g = !0),
          X && void 0 !== X.dd && (b.mask = X.dd + b.mask),
          (e = V.instance({ isFloat: !1, url: b.mask })));
        var E = !1;
        b.customInputShader &&
          ((E = "s45"),
          H.Ub({
            name: "_",
            id: E,
            h: b.customInputShader,
            Qf: ["uSource"],
            precision: "lowp",
          }),
          H.R(E, [{ type: "1i", name: "_", value: 0 }]));
        switch (t) {
          case "sobel":
            l = "s32";
            p = !0;
            break;
          case "meanNormalization":
            l = "s33";
            p = !0;
            break;
          case "grayScale":
            l = "s29";
            p = !1;
            break;
          case "grayScaleTilt":
            l = "s30";
            x = !0;
            p = !1;
            break;
          case "rgbGrayTilt":
            l = "s31";
            x = !0;
            p = !1;
            break;
          case "copy":
            l = E ? E : "s0";
            break;
          case "inputLightRegulation":
            l = E ? E : "s29";
            v = Sa.instance({ rc: m, Ec: b.size, Bc: b.nBlurPass, Ia: !1 });
            h = !0;
            break;
          case "inputMix0":
            l = "none";
            v = Ta.instance({
              ea: m,
              Xc: b.varianceMin,
              Xb: b.blurKernelSizePx,
              Ia: !1,
            });
            h = !0;
            break;
          case "direct":
          case "none":
            l = "abort";
            break;
          default:
            l = "s4";
        }
        x && H.R(l, [{ name: "u27", type: "1f", value: b.tilt }]);
        g && (l += "Mask");
        var B = V.instance({ isFloat: !1, isPot: !1, width: b.size }),
          k = {
            C: function () {
              return m;
            },
            lb: function () {
              return k.C();
            },
            Hd: function () {
              return h ? v.mb() : B;
            },
            H: function (q) {
              S.$();
              "abort" !== l &&
                ("none" !== l &&
                  (H.set(l),
                  p && H.P("u28", 1 / b.size),
                  B.K(),
                  g && e.g(1),
                  U.l(!1, !1),
                  B.g(0),
                  (q = B)),
                h && v.process(q));
            },
            m: function () {
              B.remove();
              g && e.remove();
            },
          };
        return k;
      },
    },
    $a = {
      instance: function (b) {
        function e(f) {
          v.forEach(function (z, F) {
            p[F][0] = f[0][z];
            p[F][1] = f[1][z];
            p[F][2] = f[2][z];
            p[F][3] = f[3][z];
          });
          return p;
        }
        "undefined" === typeof b.normalize && (b.normalize = !1);
        var g = {
            input: null,
            za: null,
            rb: null,
            O: null,
            Na: null,
            Bb: null,
            Cb: null,
          },
          h = null,
          v = [],
          p = [],
          x = !1,
          l = null,
          t = !0,
          m = -1,
          E = b.isReorganize ? b.isReorganize : !1,
          B = b.kernelsCount ? !0 : !1,
          k = b.dynPelu ? Ra.instance(b.dynPelu) : !1,
          q = k ? !0 : !1,
          G = { isEnabled: !1 };
        b.Rd
          ? ((b.sparsity =
              "undefined" !== typeof b.sparsity ? b.sparsity : b.Pa.lb()),
            (t = !1))
          : "full" === b.connectivityUp && (b.sparsity = b.Pa.lb());
        var w = {
            elu: "s16",
            elu01: "s17",
            relu: "s15",
            arctan: "s19",
            sigmoid: "s14",
            copy: "s0",
            softplus: "s20",
            dynPelu: "s18",
          }[b.activation],
          c = b.sparsity * b.sparsity,
          A = !1,
          J = b.size,
          I = "";
        if (b.maxPooling) {
          switch (b.maxPooling.size) {
            case 2:
              I = "s34";
              break;
            case 4:
              I = "s35";
          }
          A = !0;
          J /= b.maxPooling.size;
          g.Bb = V.instance({ isFloat: !0, isPot: !1, width: J });
        }
        var N = void 0 !== b.Yd && b.Yd ? !0 : !1,
          r = null,
          L = null,
          K = null;
        if (N) {
          r = "s46" + b.index.toString();
          H.qc("s46", r, [((b.normalization.n - 1) / 2).toFixed(1)]);
          H.R(r, [
            { type: "1i", name: "u1", value: 0 },
            { type: "2f", name: "u8", value: [1 / b.size, 1 / b.size] },
            { type: "1f", name: "u7", value: b.normalization.alpha },
            { type: "1f", name: "u10", value: b.normalization.beta },
            { type: "1f", name: "u31", value: b.normalization.k },
          ]);
          var u = { isFloat: !0, isPot: !0, width: b.size };
          L = V.instance(u);
          K = V.instance(u);
        }
        var d = -1,
          n = null;
        t && (g.O = V.instance({ isFloat: !0, isPot: !1, width: b.size }));
        g.za = V.instance(b.bias);
        var C = {
          C: function () {
            return b.size;
          },
          lb: function () {
            return J;
          },
          mc: function () {
            return b.classesCount;
          },
          fd: function (f) {
            h.g(f);
          },
          ae: function () {
            b.remap &&
              b.remap.isEnabled &&
              (G = {
                isEnabled: !0,
                Wd: V.instance({
                  isFloat: !1,
                  isFlipY: !1,
                  array: new Uint8Array(b.remap.maskTexture.data),
                  width: b.remap.maskTexture.width,
                  isPot: !1,
                }),
                La: b.remap.layers.map(function (f) {
                  return b.parent.Gd(f);
                }),
                depth: b.remap.depth,
              });
          },
          se: function () {
            switch (b.connectivityUp) {
              case "direct":
                n = Va.instance(b.connectivity);
                break;
              case "square":
                n = Wa.instance(b.connectivity);
                break;
              case "squareFast":
                n = Xa.instance(b.connectivity, b.activation);
                break;
              case "full":
                n = Ya.instance(b.connectivity);
                break;
              case "conv":
                (m = b.kernelsCount),
                  (n = Za.instance(b.connectivity)),
                  E &&
                    (g.Na = V.instance({
                      width: J,
                      isFloat: !0,
                      isFlipY: !1,
                      isPot: !1,
                    }));
            }
            if (n.la) {
              var f = b.size * b.sparsity;
              d = Math.log(f / b.size) / Math.log(2);
              g.input = V.instance({
                isMipmap: !0,
                isFloat: !0,
                isPot: !0,
                width: f,
                xb: d,
              });
              g.rb = V.instance({ isFloat: !0, isPot: !0, width: b.size });
            }
          },
          H: function (f, z) {
            h = f;
            n.la
              ? (g.input.K(),
                B && g.za.g(2),
                n.H(G),
                g.input.g(0),
                g.input.zd(d),
                g.rb.K(),
                B ? H.set("s0") : (H.set("s28"), H.P("u26", c), g.za.g(1)),
                g.input.gd(d, 0),
                U.l(!1, !1),
                H.set(w),
                N ? L.o() : g.O.o(),
                g.rb.g(0),
                q && k.wd(),
                U.l(!1, !1))
              : (g.O.K(), g.za.g(1), n.H());
            N &&
              (H.set(r),
              K.o(),
              L.g(0),
              U.l(!1, !1),
              H.set("s47"),
              H.P("u7", 1),
              g.O.o(),
              K.g(1),
              U.l(!1, !1));
            if (t)
              return (
                A
                  ? (g.Bb.K(),
                    g.O.g(0),
                    H.set(I),
                    H.da("u8", 1 / b.size, 1 / b.size),
                    U.l(!1, !1),
                    (z = g.Bb))
                  : (z = g.O),
                z.g(0),
                E &&
                  (g.Na.o(),
                  H.set("s22"),
                  H.da("u13", m, J / m),
                  U.l(!1, !1),
                  (z = g.Na),
                  g.Na.g(0)),
                z
              );
            var F = g.O;
            b.normalize &&
              (H.set("gpuRawAvg" === x ? "s9" : "s8"),
              H.P("u4", 1 / b.size),
              g.Cb.K(),
              g.O.g(0),
              U.l(!1, !1),
              (F = g.Cb));
            f = null;
            switch (x) {
              case "cpuRGBA2Float":
                F.ac(!1);
                z ? (f = C.ce(F).then(l)) : ((F = C.de(F)), l(F));
                break;
              case "cpuMeanFloat":
                F.ac(!0);
                if (z) f = F.fe().then(l);
                else {
                  F = F.ge();
                  for (var O = 0; O < F.length; ++O);
                  l(F);
                }
                break;
              case "gpuRawAvg":
              case "gpuRaw":
                F.g(0);
              case "none":
                null !== l && l(F);
            }
            z && null === f && (f = Promise.resolve());
            return f;
          },
          od: function (f) {
            f && ((x = f.Db || "none"), (l = f.Ab || null));
            g.O = V.instance({
              isFloat: !0,
              isPot: !0,
              isMipmap: !1,
              width: b.size,
            });
            f =
              "undefined" !== typeof b.classesCount && b.classesCount
                ? b.classesCount
                : b.size * b.size;
            for (var z = 0, F = 0, O = 0; z < f; ++z)
              v.push(F + (b.size - 1 - O) * b.size),
                p.push([-1, -1, -1, -1]),
                ++F,
                F === b.size && ((F = 0), ++O);
            b.normalize &&
              (g.Cb = V.instance({ isFloat: !0, isPot: !0, width: b.size }));
          },
          ce: function (f) {
            return f.ee().then(e);
          },
          de: function (f) {
            f = f.Ic();
            e(f);
            return p;
          },
          m: function () {
            for (var f in g) {
              var z = g[f];
              z && z.remove();
            }
            n && (n.m(), (n = null));
          },
        };
        b.Pa && C.se(b.Pa);
        return C;
      },
    };
  function ab(b) {
    var e = null,
      g = null,
      h = 0;
    this.s = function (v) {
      this.qe(v.La);
      g.od({ Db: v.Db, Ab: v.Ab });
    };
    this.Gd = function (v) {
      return e[v];
    };
    this.qe = function (v) {
      var p = null;
      h = v.length;
      e = v.map(function (x, l) {
        x = Object.assign({}, x, {
          index: l,
          parent: this,
          Pa: p,
          Rd: l === h - 1,
        });
        return (p = l = 0 === l ? Ua.instance(x) : $a.instance(x));
      });
      g = e[h - 1];
      e.forEach(function (x, l) {
        0 !== l && x.ae();
      });
    };
    this.H = function (v) {
      var p = v;
      e.forEach(function (x) {
        p = x.H(p, !1);
      });
      return p;
    };
    this.mb = function () {
      return g.Hd();
    };
    this.mc = function () {
      return g.mc();
    };
    this.m = function () {
      e &&
        (e.forEach(function (v) {
          v.m();
        }),
        (g = e = null),
        (h = 0));
    };
    "undefined" !== typeof b && this.s(b);
  }
  var Va = {
      instance: function (b) {
        var e = V.instance(b.weights);
        return {
          la: !0,
          Ea: function () {
            return 1;
          },
          m: function () {
            e.remove();
          },
          Id: function () {
            return e;
          },
          H: function () {
            H.set("s27");
            e.g(1);
            U.l(!1, !1);
          },
        };
      },
    },
    Ya = {
      instance: function (b) {
        var e = b.fromLayerSize,
          g = V.instance(b.weights);
        return {
          la: !0,
          Ea: function () {
            return e;
          },
          m: function () {
            g.remove();
          },
          H: function (h) {
            if (h.isEnabled) {
              H.set("s25");
              h.Wd.g(3);
              var v,
                p = Math.min(h.La.length, h.depth);
              for (v = 0; v < p; ++v) h.La[v].fd(4 + v);
            } else H.set("s24");
            H.P("u17", b.toLayerSize);
            g.g(1);
            U.l(!1, !1);
          },
        };
      },
    },
    Wa = {
      instance: function (b) {
        for (
          var e = b.fromLayerSize,
            g = b.toLayerSize,
            h = b.toSparsity,
            v = h * g,
            p = v / e,
            x = e / g,
            l = 0,
            t = 0,
            m = 0,
            E = Array(h * g * h * g * 4),
            B = Array(h * g * h * g * 4),
            k = Array(e * e),
            q = 0;
          q < k.length;
          ++q
        )
          k[q] = 0;
        q = Math.floor(h / 2);
        for (var G = 0.5 / g, w = 0.5 / e, c = 0.5 / v, A = 0; A < g; ++A)
          for (var J = Math.round(A * x), I = 0; I < g; ++I) {
            var N = Math.round(I * x),
              r = A / g,
              L = I / g;
            r += G;
            L += G;
            for (var K = 0; K < h; ++K) {
              var u = J + K - q;
              0 > u && (u += e);
              u >= e && (u -= e);
              for (var d = 0; d < h; ++d) {
                var n = l / v,
                  C = t / v,
                  f = N + d - q;
                0 > f && (f += e);
                f >= e && (f -= e);
                var z = u / e,
                  F = f / e;
                C = 1 - C - 1 / v;
                z += w;
                F += w;
                n += c;
                C += c;
                var O = A * h + K,
                  W = I * h + d;
                W = g * h - W - 1;
                O = W * g * h + O;
                E[4 * O] = n;
                E[4 * O + 1] = C;
                E[4 * O + 2] = z;
                E[4 * O + 3] = F;
                F = k[f * e + u]++;
                O = F % p;
                z = u * p + O;
                f = f * p + (F - O) / p;
                f = e * p - 1 - f;
                f = f * e * p + z;
                B[4 * f] = n;
                B[4 * f + 1] = C;
                B[4 * f + 2] = r;
                B[4 * f + 3] = L;
                ++l >= v && ((l = 0), ++t);
                ++m;
              }
            }
          }
        k = null;
        var da = V.instance(b.weights);
        delete b.weights.data;
        var ea = V.instance({
          width: v,
          isFloat: !0,
          array: new Float32Array(B),
          isPot: !0,
        });
        B = null;
        var na = V.instance({
          width: v,
          isFloat: !0,
          array: new Float32Array(E),
          isPot: !0,
        });
        E = null;
        return {
          la: !0,
          Ea: function () {
            return p;
          },
          m: function () {
            ea.remove();
            na.remove();
            da.remove();
          },
          H: function () {
            H.set("s23");
            da.g(1);
            na.g(2);
            U.l(!1, !1);
          },
        };
      },
    },
    Za = {
      instance: function (b) {
        var e = b.kernelsCount,
          g = b.toSparsity,
          h = (g * b.toLayerSize) / b.fromLayerSize,
          v = V.instance(b.weights);
        return {
          la: !0,
          Ea: function () {
            return h;
          },
          rf: function () {
            return g;
          },
          Id: function () {
            return v;
          },
          m: function () {
            v.remove();
          },
          H: function () {
            H.set("s26");
            H.P("u23", e);
            H.P("u24", g);
            H.P("u17", b.toLayerSize);
            H.P("u25", b.fromLayerSize);
            v.g(1);
            U.l(!1, !1);
          },
        };
      },
    },
    Xa = {
      instance: function (b, e) {
        var g = b.fromLayerSize,
          h = b.toLayerSize,
          v = b.toSparsity,
          p = b.stride ? b.stride : 1,
          x = (v * h) / g,
          l = h < g,
          t = g / h,
          m = V.instance(b.weights),
          E =
            "s48" +
            [g.toString(), h.toString(), v.toString(), p.toString(), e].join(
              "_"
            );
        H.yd(E) ||
          ((b = sa(e)),
          (h = [
            { type: "1f", name: "u17", value: h },
            { type: "1f", name: "u30", value: p },
          ]),
          l && h.push({ type: "1f", name: "u25", value: g }),
          (g = [(l ? x : v).toFixed(1), b]),
          l && g.push(t.toFixed(1)),
          H.qc(l ? "s40" : "s39", E, g),
          H.R(
            E,
            h.concat([
              { type: "1i", name: "u15", value: 0 },
              { type: "1i", name: "u22", value: 1 },
              { type: "1i", name: "u14", value: 3 },
            ])
          ));
        return {
          la: !1,
          Ea: function () {
            return x;
          },
          m: function () {
            m.remove();
          },
          H: function () {
            H.set(E);
            m.g(3);
            U.l(!1, !1);
          },
        };
      },
    },
    Sa = {
      instance: function (b) {
        var e = b.Bc ? b.Bc : 3,
          g = b.rc ? b.rc : 64,
          h = b.Ec ? b.Ec : 64,
          v = b.Ia ? !0 : !1;
        b = { isFloat: !1, width: g, isPot: !1, isFlipY: !1 };
        var p = V.instance(b),
          x = V.instance(b),
          l = V.instance(b),
          t = V.instance(b),
          m = V.instance({ isFloat: !0, width: h, isPot: !1, isFlipY: !1 }),
          E = 1 / g;
        return {
          process: function (B) {
            H.set("s36");
            t.o();
            U.l(v, !1);
            H.set("s37");
            for (var k = 0; k < e; ++k)
              p.o(),
                H.da("u8", E, 0),
                U.l(v, !1),
                l.o(),
                t.g(0),
                U.l(v, !1),
                x.o(),
                p.g(0),
                H.da("u8", 0, E),
                U.l(v, !1),
                t.o(),
                l.g(0),
                U.l(v, !1),
                k !== e - 1 && x.g(0);
            H.set("s38");
            m.o();
            B.g(0);
            x.g(1);
            t.g(2);
            U.l(v, !1);
            m.g(0);
          },
          mb: function () {
            return m;
          },
        };
      },
    },
    Ta = {
      instance: function (b) {
        function e(m) {
          return V.instance({
            isFloat: m,
            width: g.ea,
            isPot: !1,
            isFlipY: !1,
          });
        }
        var g = Object.assign({ Xc: 0.1, Xb: 9, ea: 128, Ia: !1 }, b),
          h = e(!1),
          v = [e(!1), e(!1), e(!1)],
          p = [e(!1), e(!1), e(!1)],
          x = e(!0),
          l = [h, p[0], p[1]];
        b =
          "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u32;varying vec2 vv0;void main(){float b=0.,c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u32*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).r,c+=f;}b/=c,gl_FragColor=vec4(b,0.,0.,1.);}"
            .replace("1.1111", Math.round((g.Xb - 1) / 2).toFixed(2))
            .replace("2.2222", (1 / g.ea).toFixed(6));
        var t = { u1: 0 };
        H.Vb([
          {
            id: "s50",
            name: "_",
            h: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.,1.,1.);void main(){vec3 b=texture2D(u1,vv0).rgb;float a=dot(b,f);gl_FragColor=vec4(a,a,a,a);}",
            j: t,
            i: ["u1"],
            precision: "lowp",
          },
          {
            id: "s51",
            name: "_",
            h: b,
            j: t,
            i: ["u1", "u32"],
            precision: "lowp",
          },
          {
            id: "s52",
            name: "_",
            h: "uniform sampler2D u33,u34,u35,u36;const float f=1.1111;const vec3 g=vec3(1.,1.,1.);varying vec2 vv0;void main(){vec3 a=texture2D(u33,vv0).rgb;float c=texture2D(u34,vv0).r,d=texture2D(u35,vv0).r,h=texture2D(u36,vv0).r,i=a.r*a.r;vec3 b=vec3(c,d,h),j=max(g*f,abs(i-b*b)),k=sqrt(j);gl_FragColor=vec4(a.r,(a-b)/k);}".replace(
              "1.1111",
              g.Xc.toFixed(4)
            ),
            j: { u33: 0, u34: 1, u35: 2, u36: 3 },
            i: ["u33", "u34", "u35", "u36"],
            precision: "highp",
          },
        ]);
        return {
          process: function () {
            H.set("s50");
            h.K();
            U.l(g.Ia, !1);
            H.set("s51");
            for (var m = 0; 3 > m; ++m)
              H.da("u32", 1, 0),
                v[m].o(),
                l[m].g(0),
                U.l(!1, !1),
                H.da("u32", 0, 1),
                p[m].o(),
                v[m].g(0),
                U.l(!1, !1);
            H.set("s52");
            x.o();
            h.g(0);
            p[0].g(1);
            p[1].g(2);
            p[2].g(3);
            U.l(!1, !1);
            x.g(0);
          },
          mb: function () {
            return x;
          },
        };
      },
    };
  function bb(b, e) {
    b[e] = !0;
    b.setAttribute(e, "true");
  }
  function db() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  function eb() {
    var b = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return b && b.length && 2 < b.length
      ? [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3] || 0, 10)]
      : [0, 0, 0];
  }
  function fb() {
    var b = navigator.userAgent.toLowerCase();
    return -1 !== b.indexOf("safari") && -1 === b.indexOf("chrome") ? !0 : !1;
  }
  function gb() {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      ? !0
      : !1;
  }
  function hb(b) {
    if (!b) return b;
    var e = null;
    if (b.video) {
      var g = function (h) {
        return h && "object" === typeof h ? Object.assign({}, h) : h;
      };
      e = {};
      "undefined" !== typeof b.video.width && (e.width = g(b.video.width));
      "undefined" !== typeof b.video.height && (e.height = g(b.video.height));
      "undefined" !== typeof b.video.facingMode &&
        (e.facingMode = g(b.video.facingMode));
    }
    e = { audio: b.audio, video: e };
    "undefined" !== typeof b.deviceId && ib(e, b.deviceId);
    return e;
  }
  function ib(b, e) {
    e &&
      ((b.video = b.video || {}),
      (b.video.deviceId = { exact: e }),
      b.video.facingMode && delete b.video.facingMode);
  }
  function jb(b) {
    var e = b.video.width;
    b.video.width = b.video.height;
    b.video.height = e;
    return b;
  }
  function kb(b) {
    function e(k) {
      return [
        480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920,
      ].sort(function (q, G) {
        return Math.abs(q - k) - Math.abs(G - k);
      });
    }
    function g(k) {
      var q = hb(b);
      k = k(q);
      v.push(k);
      h(k);
    }
    function h(k) {
      if (k.video && k.video.facingMode && k.video.facingMode.exact) {
        var q = k.video.facingMode.exact;
        k = hb(k);
        delete k.video.facingMode.exact;
        k.video.facingMode.ideal = q;
        v.push(k);
      }
    }
    var v = [];
    if (!b || !b.video) return v;
    h(b);
    if (b.video.width && b.video.height) {
      if (b.video.width.ideal && b.video.height.ideal) {
        var p = e(b.video.width.ideal).slice(0, 3),
          x = e(b.video.height.ideal).slice(0, 3),
          l = {},
          t = 0;
        for (l.Z = void 0; t < p.length; l = { Z: l.Z }, ++t) {
          l.Z = p[t];
          var m = {},
            E = 0;
          for (m.Y = void 0; E < x.length; m = { Y: m.Y }, ++E)
            if (
              ((m.Y = x[E]),
              l.Z !== b.video.width.ideal || m.Y !== b.video.height.ideal)
            ) {
              var B = Math.max(l.Z, m.Y) / Math.min(l.Z, m.Y);
              B < 4 / 3 - 0.1 ||
                B > 16 / 9 + 0.1 ||
                g(
                  (function (k, q) {
                    return function (G) {
                      G.video.width.ideal = k.Z;
                      G.video.height.ideal = q.Y;
                      return G;
                    };
                  })(l, m)
                );
            }
        }
      }
      g(function (k) {
        return jb(k);
      });
    }
    b.video.width &&
      b.video.height &&
      (b.video.width.ideal &&
        b.video.height.ideal &&
        g(function (k) {
          delete k.video.width.ideal;
          delete k.video.height.ideal;
          return k;
        }),
      g(function (k) {
        delete k.video.width;
        delete k.video.height;
        return k;
      }));
    b.video.facingMode &&
      (g(function (k) {
        delete k.video.facingMode;
        return k;
      }),
      b.video.width &&
        b.video.height &&
        g(function (k) {
          jb(k);
          delete k.video.facingMode;
          return k;
        }));
    v.push({ audio: b.audio, video: !0 });
    return v;
  }
  function lb(b) {
    try {
      var e = window.matchMedia("(orientation: portrait)").matches ? !0 : !1;
    } catch (h) {
      e = window.innerHeight > window.innerWidth;
    }
    if (e && b && b.video) {
      e = b.video.width;
      var g = b.video.height;
      e &&
        g &&
        e.ideal &&
        g.ideal &&
        e.ideal > g.ideal &&
        ((b.video.height = e), (b.video.width = g));
    }
  }
  function mb(b) {
    b.volume = 0;
    bb(b, "muted");
    if (fb()) {
      if (1 === b.volume) {
        var e = function () {
          b.volume = 0;
          window.removeEventListener("mousemove", e, !1);
          window.removeEventListener("touchstart", e, !1);
        };
        window.addEventListener("mousemove", e, !1);
        window.addEventListener("touchstart", e, !1);
      }
      setTimeout(function () {
        b.volume = 0;
        bb(b, "muted");
      }, 5);
    }
  }
  function nb(b, e, g) {
    return null === b
      ? Promise.resolve()
      : new Promise(function (h, v) {
          if (b.srcObject && b.srcObject.getVideoTracks) {
            var p = b.srcObject.getVideoTracks();
            1 !== p.length
              ? v("INVALID_TRACKNUMBER")
              : ((p = p[0]), e ? ob(b, h, v, g) : (p.stop(), h()));
          } else v("BAD_IMPLEMENTATION");
        });
  }
  function pb(b, e, g, h) {
    function v(x) {
      p || ((p = !0), g(x));
    }
    var p = !1;
    navigator.mediaDevices
      .getUserMedia(h)
      .then(function (x) {
        function l() {
          setTimeout(function () {
            if (b.currentTime) {
              var m = b.videoWidth,
                E = b.videoHeight;
              if (0 === m || 0 === E) v("VIDEO_NULLSIZE");
              else {
                m && (b.style.width = m.toString() + "px");
                E && (b.style.height = E.toString() + "px");
                m = { md: null, ze: null, Xd: null };
                try {
                  var B = x.getVideoTracks()[0];
                  B &&
                    ((m.Xd = B),
                    (m.md = B.getCapabilities()),
                    (m.ze = B.getSettings()));
                } catch (k) {}
                fb() || db()
                  ? b.parentNode && null !== b.parentNode
                    ? (p || e(b, x, m),
                      setTimeout(function () {
                        b.play();
                      }, 100))
                    : (document.body.appendChild(b),
                      mb(b),
                      p || e(b, x, m),
                      setTimeout(function () {
                        b.style.transform = "scale(0.0001,0.0001)";
                        b.style.position = "fixed";
                        b.style.bottom = "0px";
                        b.style.right = "0px";
                        mb(b);
                        setTimeout(function () {
                          b.play();
                        }, 100);
                      }, 80))
                  : p || e(b, x, m);
              }
            } else v("VIDEO_NOTSTARTED");
          }, 700);
        }
        function t() {
          b.removeEventListener("loadeddata", t, !1);
          var m = b.play();
          mb(b);
          "undefined" === typeof m
            ? l()
            : m
                .then(function () {
                  l();
                })
                .catch(function () {
                  v("VIDEO_PLAYPROMISEREJECTED");
                });
        }
        "undefined" !== typeof b.srcObject
          ? (b.srcObject = x)
          : ((b.src = window.URL.createObjectURL(x)), (b.videoStream = x));
        mb(b);
        b.addEventListener("loadeddata", t, !1);
      })
      .catch(function (x) {
        v(x);
      });
  }
  function ob(b, e, g, h) {
    if (b)
      if (gb()) {
        if (h && h.video) {
          if (db()) {
            var v = eb();
            0 !== v[0] && (12 > v[0] || (12 === v[0] && 2 > v[1])) && lb(h);
          }
          h.video.width &&
            h.video.width.ideal &&
            (b.style.width = h.video.width.ideal + "px");
          h.video.height &&
            h.video.height.ideal &&
            (b.style.height = h.video.height.ideal + "px");
        }
        bb(b, "autoplay");
        bb(b, "playsinline");
        h && h.audio ? (b.volume = 0) : bb(b, "muted");
        pb(
          b,
          e,
          function () {
            function p(l) {
              if (0 === l.length) g("INVALID_FALLBACKCONSTRAINTS");
              else {
                var t = l.shift();
                pb(
                  b,
                  e,
                  function () {
                    p(l);
                  },
                  t
                );
              }
            }
            var x = kb(h);
            p(x);
          },
          h
        );
      } else g && g("MEDIASTREAMAPI_NOTFOUND");
    else g && g("VIDEO_NOTPROVIDED");
  }
  var qb = (function () {
      function b() {
        g(w + q.zb);
        c.port.postMessage("DONE");
      }
      function e() {
        var d = q.L;
        r.isEnabled && (d = Math.max(d, r.L));
        N.xa = 0 === d ? J(g) : J(h);
      }
      function g(d) {
        I.ia &&
          null !== G &&
          ((d -= w),
          (d = Math.min(Math.max(d, q.bc[0]), q.bc[1])),
          (w += d),
          p(),
          r.isEnabled && r.ta && I.N && w - r.vb > q.Rb && (m(), (r.vb = w)),
          G(w));
      }
      function h(d) {
        I.ia && (N.timeout = window.setTimeout(g.bind(null, d), q.L));
      }
      function v() {
        G = null;
        I.ia = !1;
        p();
      }
      function p() {
        N.xa && (window.cancelAnimationFrame(N.xa), (N.xa = null));
        N.timeout && (window.clearTimeout(N.timeout), (N.timeout = null));
      }
      function x(d) {
        d && !I.N
          ? ((I.N = !0),
            A && PerformanceManager.Sf(),
            c.port.postMessage("STOP"),
            M.Vc(!0),
            e())
          : !d &&
            I.N &&
            ((I.N = !1),
            A && PerformanceManager.If(1),
            M.Vc(!1),
            c.port.postMessage("START"));
      }
      function l(d) {
        d.target.hidden ? K() : L();
      }
      function t(d, n, C) {
        n = d.createShader(n);
        d.shaderSource(n, C);
        d.compileShader(n);
        return n;
      }
      function m() {
        r.ta = !1;
        var d = r.U,
          n = r.Ga,
          C = r.Ha,
          f = r.M;
        d.uniform1f(r.pc, Math.random());
        r.ja ? n.beginQueryEXT(f, C) : d.beginQuery(f, C);
        d.drawElements(d.POINTS, 1, d.UNSIGNED_SHORT, 0);
        r.ja ? n.endQueryEXT(f) : d.endQuery(f);
        M.flush();
        B()
          .then(function (z) {
            z = (q.Zc * q.Pb * 1e3) / z;
            r.Ya = (r.Ya + 1) % q.na;
            r.wb[r.Ya] = z;
            if (++r.Ac > q.na) {
              r.Ka.set(r.wb);
              r.Ka.sort(function (O, W) {
                return O - W;
              });
              z = r.Ka[Math.floor(q.na / 2)];
              r.Ca = Math.max(r.Ca, z);
              var F = 0;
              for (
                F = 0;
                F < r.Kb &&
                !(z > r.Ca * (1 - (q.Qb[F] + q.$c * (F >= r.Wa ? 1 : -1))));
                ++F
              )
                F === r.Kb - 1 && ++F;
              F !== r.Wa &&
                (console.log("THERMAL THROTTLING LEVEL = " + F.toString()),
                (r.Wa = F),
                (r.L = 0 === F ? 0 : q.Yc[F - 1]),
                q.Ob && q.Ob(F));
            }
            r.ta = !0;
          })
          .catch(function () {
            r.ta = !0;
          });
      }
      function E(d) {
        var n = r.U,
          C = r.Ga,
          f = r.Ha;
        f = r.ja
          ? C.Ze(f, C.QUERY_RESULT_AVAILABLE_EXT)
          : n.getQueryParameter(f, n.QUERY_RESULT_AVAILABLE);
        n = n.getParameter(C.GPU_DISJOINT_EXT);
        f ? d(!n) : setTimeout(E.bind(null, d), 0.1);
      }
      function B() {
        return new Promise(function (d, n) {
          E(function (C) {
            if (C) {
              C = r.U;
              var f = r.Ga,
                z = r.Ha;
              C = r.ja
                ? f.getQueryObjectEXT(z, f.QUERY_RESULT_EXT)
                : C.getQueryParameter(z, C.QUERY_RESULT);
              d(C);
            } else n();
          });
        });
      }
      var k = {
          xc: !0,
          bc: [1, 200],
          zb: 20,
          L: 0,
          ad: !1,
          Pb: 50,
          Zc: 240,
          Rb: 3e3,
          na: 3,
          Qb: [0.2, 0.35, 0.5],
          $c: 0.05,
          Yc: [8, 20, 40],
          Ob: null,
        },
        q = null,
        G = null,
        w = 0,
        c = null,
        A = !1,
        J = null,
        I = { ba: !1, N: !0, ub: !1, tb: !1, sb: !1, ia: !1 },
        N = { xa: null, timeout: null },
        r = {
          isEnabled: !1,
          ta: !1,
          U: null,
          Ga: null,
          Ha: null,
          M: null,
          pc: null,
          ja: !0,
          Wa: 0,
          Kb: 0,
          L: 0,
          vb: 0,
          Ac: 0,
          wb: null,
          Ka: null,
          Ya: 0,
          Ca: 0,
        },
        L = x.bind(null, !0),
        K = x.bind(null, !1),
        u = {
          s: function (d) {
            q = Object.assign(k, d);
            Object.assign(I, { N: !0, ba: !0, ia: !1 });
            J =
              window.requestPostAnimationFrame || window.requestAnimationFrame;
            if (q.ad) {
              d = document.createElement("canvas");
              d.setAttribute("width", "1");
              d.setAttribute("height", "1");
              var n = { antialias: !1 };
              d = d.getContext("webgl2", n) || d.getContext("webgl", n);
              if (
                (n =
                  d.getExtension("EXT_disjoint_timer_query") ||
                  d.getExtension("EXT_disjoint_timer_query_webgl2"))
              ) {
                r.U = d;
                r.Ga = n;
                r.isEnabled = !0;
                r.ja = n.beginQueryEXT ? !0 : !1;
                var C = t(
                    d,
                    d.VERTEX_SHADER,
                    "attribute vec4 a0;void main(){gl_Position=a0;}"
                  ),
                  f = t(
                    d,
                    d.FRAGMENT_SHADER,
                    "precision lowp float;uniform float u37;void main(){vec4 a=u37*vec4(1.,2.,3.,4.);for(int b=0;b<666;b+=1)a=cos(a);gl_FragColor=a;}".replace(
                      "666",
                      q.Pb.toString()
                    )
                  ),
                  z = d.createProgram();
                d.attachShader(z, C);
                d.attachShader(z, f);
                d.linkProgram(z);
                C = d.getAttribLocation(z, "a0");
                r.pc = d.getUniformLocation(z, "u37");
                d.useProgram(z);
                d.enableVertexAttribArray(C);
                z = d.createBuffer();
                d.bindBuffer(d.ARRAY_BUFFER, z);
                d.bufferData(
                  d.ARRAY_BUFFER,
                  new Float32Array([0.5, 0.5, 0, 1]),
                  d.STATIC_DRAW
                );
                d.vertexAttribPointer(C, 4, d.FLOAT, !1, 16, 0);
                z = d.createBuffer();
                d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, z);
                d.bufferData(
                  d.ELEMENT_ARRAY_BUFFER,
                  new Uint16Array([0]),
                  d.STATIC_DRAW
                );
                d.disable(d.DEPTH_TEST);
                d.disable(d.DITHER);
                d.disable(d.STENCIL_TEST);
                d.viewport(0, 0, 1, 1);
                z = r.ja ? n.createQueryEXT() : d.createQuery();
                r.Ha = z;
                r.M = n.TIME_ELAPSED_EXT || d.TIME_ELAPSED;
                r.Wa = 0;
                r.Kb = q.Qb.length;
                r.L = 0;
                r.vb = -q.Rb;
                r.wb = new Float32Array(q.na);
                r.Ka = new Float32Array(q.na);
                r.Ca = 0;
                r.Ya = 0;
                r.Ac = 0;
                r.ta = !0;
              }
            }
            if (q.xc) {
              d = !1;
              try {
                if ("undefined" === typeof SharedWorker) {
                  var F = URL.createObjectURL(
                      new Blob(
                        [
                          "let handler = null;\n      self.addEventListener('message', function(e){\n        if (handler !== null){\n          clearTimeout(handler);\n          handler = null;\n        }\n        switch (e.data) {\n          case 'START':\n          case 'DONE':\n            handler = setTimeout(function(){\n              self.postMessage('TICK');\n            }, " +
                            q.zb.toString() +
                            ");\n            break;\n          case 'STOP':\n            break;\n        };\n      }, false);",
                        ],
                        { type: "text/javascript" }
                      )
                    ),
                    O = new Worker(F);
                  O.addEventListener("message", b);
                  c = { Gc: O, port: O };
                  I.ub = !0;
                } else {
                  var W = URL.createObjectURL(
                      new Blob(
                        [
                          "let handler = null;\n      onconnect = function(e) {\n        const port = e.ports[0];\n        port.addEventListener('message', function(e) {\n          \n          if (handler !== null){\n            clearTimeout(handler);\n            handler = null;\n          }\n          switch (e.data) {\n            case 'START':\n            case 'DONE':\n              handler = setTimeout(function(){\n                port.postMessage('TICK');\n              }, " +
                            q.zb.toString() +
                            ");\n              break;\n            case 'STOP':\n              break;\n          };\n          \n        });\n        \n        port.start();\n      } // end onconnect()",
                        ],
                        { type: "text/javascript" }
                      )
                    ),
                    da = new SharedWorker(W);
                  da.port.start();
                  da.port.addEventListener("message", b);
                  c = { Gc: da, port: da.port };
                  I.tb = !0;
                }
                d = !0;
              } catch (ea) {}
              d &&
                ("onvisibilitychange" in document
                  ? document.addEventListener("visibilitychange", l)
                  : (window.addEventListener("blur", K),
                    window.addEventListener("focus", L)),
                (I.sb = !0));
            }
            A = "undefined" !== typeof PerformanceManager;
          },
          m: function () {
            v();
            I.sb &&
              ("onvisibilitychange" in document
                ? document.removeEventListener("visibilitychange", l)
                : (window.removeEventListener("blur", K),
                  window.removeEventListener("focus", L)),
              (I.sb = !1));
            I.tb
              ? (c.port.close(), (I.tb = !1))
              : I.ub && (c.Gc.terminate(), (I.ub = !1));
            Object.assign(I, { N: !0, ba: !1, ia: !1 });
            G = null;
          },
          Cf: function () {
            return I.N;
          },
          update: function (d) {
            Object.assign(q, d);
          },
          ie: function (d) {
            I.ba || u.s({});
            p();
            I.ia = !0;
            G = d;
            I.N && e();
          },
          stop: v,
        };
      return u;
    })(),
    rb = (function () {
      var b = {
          Cc: 4,
          Oa: [1.5, 1.5, 2],
          X: [0.1, 0.1, 0.1],
          Kc: 1,
          ea: -1,
          ob: -1,
          Be: 2,
          $d: 1,
          Lc: !0,
          xd: 0.8,
        },
        e = null,
        g = [],
        h = 0,
        v = [0.5, 0.5, 1];
      return {
        s: function (p) {
          e = Object.assign({}, b, p);
          g.splice(0);
          p = e.Oa[0] * e.X[0];
          var x = e.Oa[1] * e.X[1],
            l = 1 / (1 + e.Oa[2] * e.X[2]),
            t = e.Kc * Math.min(e.ea, e.ob),
            m = t / e.ea;
          t /= e.ob;
          var E = 0.5 * e.xd;
          E *= E;
          for (var B = 0; B < e.Cc; ++B) {
            var k = Math.pow(l, B),
              q = m * k,
              G = t * k;
            k = q * e.$d;
            var w = q * p,
              c = G * x;
            q /= 2;
            G /= 2;
            for (
              var A = 1 + (1 - q - q) / w, J = 1 + (1 - G - G) / c, I = 0;
              I < J;
              ++I
            )
              for (var N = G + I * c, r = N - 0.5, L = 0; L < A; ++L) {
                var K = q + L * w,
                  u = K - 0.5;
                u * u + r * r > E || g.push([K, N, k]);
              }
          }
          e.Lc &&
            g.sort(function (d, n) {
              var C = d[0] - 0.5;
              d = d[1] - 0.5;
              var f = n[0] - 0.5;
              n = n[1] - 0.5;
              return C * C + d * d - (f * f + n * n);
            });
        },
        get: function () {
          var p = g.length;
          if (0 === p) return v;
          h >= p && (h = 0);
          var x = g[Math.floor(h)];
          h = (h + 1 / e.Be) % p;
          return x;
        },
        reset: function () {
          h = 0;
        },
      };
    })(),
    X = {
      neuralNetworkPath: "NNC.json",
      L: 10,
      Ld: 64,
      width: 400,
      height: 400,
      le: [2, 2, 3],
      ke: 3,
      me: 0.7,
      Fe: [0.2, 0.2, 0.3],
      X: [0.7, 0.7, 1],
      Ee: 55,
      je: [0.1, 1.1],
      bd: 1,
      Ae: 0.9,
      be: 100,
      ka: [0.2, 0.8],
      Oc: 0.1,
      oe: 0.55,
      sd: 1,
      Je: 20,
      qd: !0,
    };
  function sb(b) {
    function e() {
      ++r;
      1 === r &&
        (rb.s({ Oa: X.le, Cc: X.ke, ea: t, ob: m, Kc: X.me, X: k, Lc: !0 }),
        d.Ce(),
        (tb.ready = !0),
        b.jd(!1, {
          video: w.element,
          GL: a,
          videoTexture: w.ma.get(),
          videoTextureCut: G.sa.get(),
        }),
        J !== A.pause && (qb.stop(), (J = A.play), g(0)),
        (r = 0));
    }
    function g() {
      J !== A.pause &&
        (X.qd
          ? v().then(function () {
              h();
              x();
            })
          : (h(), v().then(x)));
    }
    function h() {
      S.reset();
      S.$();
      var n = w.element.currentTime - u;
      0 > n && (u = w.element.currentTime);
      1e3 * n < X.Je ||
        (w.ma.refresh(),
        (u += n),
        H.set("s54"),
        w.Va.K(),
        w.ma.g(0),
        U.l(!1, !0));
      for (n = 0; n < X.bd; ++n)
        H.set("s55"),
          G.sa.K(),
          w.Va.g(0),
          G.va.g(1),
          U.l(!1, !1),
          G.sa.g(0),
          B.H(G.sa);
    }
    function v() {
      var n = Date.now();
      if (n - E < X.be) return Promise.resolve();
      E = n;
      H.set("s1");
      S.G();
      a.viewport(0, 0, 1, 1);
      G.yb.g(0);
      U.l(!1, !1);
      return M.Qa(0, 0, 1, 1, c).then(p);
    }
    function p() {
      var n = X.ka[0] + K * (X.ka[1] - X.ka[0]),
        C = Math.abs((c[1] / 255) * 2 - 1),
        f = 128 < c[0],
        z = f && C < n + X.Oc;
      n = f && C < n - X.Oc;
      J === A.play && n
        ? (b.Yb(!0), (J = A.gb))
        : J !== A.gb || z || (b.Yb(!1), (J = A.play));
    }
    function x() {
      N === I.visible &&
        (S.He(), H.set("s53"), w.Va.g(1), G.va.g(0), U.l(!1, !1));
      a.flush();
      qb.ie(g);
    }
    function l() {
      G.va.Qc(1);
      H.set("s56");
      H.ve("u38", rb.get());
      U.l(!1, !1);
      H.set("s57");
      G.yb.pe(1);
      G.va.g(0);
      U.l(!1, !1);
    }
    var t = Math.round(X.width),
      m = Math.round(X.height),
      E = Date.now(),
      B = null,
      k = null,
      q = [1, t / m],
      G = { sa: null, va: null, yb: null, Ve: null },
      w = { element: null, ma: null, Va: null, cb: null },
      c = new Uint8Array([0, 0, 0, 0]),
      A = { Zd: -1, Vd: 0, play: 1, gb: 2, pause: 3 },
      J = A.Vd,
      I = { hidden: 0, visible: 1 },
      N = b.Od ? I.visible : I.hidden,
      r = 0,
      L = "undefined" !== typeof b.Sb ? b.Sb : "../../",
      K =
        (("undefined" !== typeof b.Nc ? b.Nc : X.oe) - X.ka[0]) /
        (X.ka[1] - X.ka[0]),
      u = 0,
      d = {
        VERSION: "2.0.1",
        te: function (n) {
          K = n;
        },
        De: function (n) {
          N = n ? I.visible : I.hidden;
        },
        Uc: function (n, C) {
          if ((n && J === A.pause) || (!n && J !== A.pause))
            return Promise.resolve();
          C = C ? nb(w.element, !n, w.cb) : Promise.resolve();
          n
            ? ((J = A.pause), qb.stop())
            : ((J = A.gb), qb.stop(), (J = A.play), g(0));
          return C;
        },
        rd: function () {
          B && (B.m(), (B = null));
          Ga.m();
          J = A.Zd;
        },
        s: function () {
          w.cb = {
            video: {
              facingMode: { ideal: "user" },
              width: { min: 480, max: 1280, ideal: 800 },
              height: { min: 480, max: 1280, ideal: 600 },
            },
            audio: !1,
          };
          ob(
            gb() ? document.createElement("video") : !1,
            function (n) {
              d.start(n);
            },
            function () {
              errorCallback("NO_WEBCAM");
            },
            w.cb
          );
        },
        start: function (n) {
          w.element = n;
          d.Kd();
          d.pd();
          d.xe();
          ja(L + X.neuralNetworkPath)
            .then(d.Ud)
            .then(e);
        },
        Kd: function () {
          H.Vb([
            {
              id: "s54",
              name: "_",
              wa: "attribute vec2 a0;uniform vec2 u39,u40;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=u40+u39*a0;}",
              ya: ["a0"],
              pa: [2],
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
              i: ["u1", "u39", "u40"],
              precision: "lowp",
            },
            {
              id: "s55",
              name: "_",
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
              wa: "attribute vec2 a0;uniform sampler2D u41;uniform vec2 u42;const vec2 f=vec2(.25,.5),g=vec2(.75,.5),e=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u41,f);vec2 d=a.gb,b=a.a*u42;vec4 c=texture2D(u41,g);float l=c.a,i=c.y;vec2 j=vec2(1./cos(i),1.);b*=j;vec2 k=a0*.5+e;vv0=d+(k-e)*b,gl_Position=vec4(a0,0.,1.);}",
              ya: ["a0"],
              pa: [2],
              i: ["u1", "u41", "u42"],
              precision: "lowp",
            },
            {
              id: "s56",
              name: "_",
              wa: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
              h: "uniform sampler2D u43,u41;uniform vec3 u38,u44;uniform vec2 u45;uniform float u46,u47;const vec4 e=vec4(.25,.25,.25,.25);const float f=1e-3;void main(){vec4 b=texture2D(u41,vec2(.25,.5));float a=floor(b.r+f),c=0.;vec4 d=texture2D(u43,vec2(.125,.625)),g=texture2D(u43,vec2(.375,.625));bool h=dot(d-g,e)>u47;h?a=2.:a>u46?a=0.:a>1.9&&(b.a>u45.y||b.a<u45.x)?a=0.:a>1.9?a+=1.:0.;if(a<.9)b.gba=u38,a=1.;else{float i=dot(e,texture2D(u43,vec2(.375,.875))),j=dot(e,texture2D(u43,vec2(.625,.875))),k=dot(e,texture2D(u43,vec2(.875,.875))),l=dot(e,texture2D(u43,vec2(.125,.875)));c=clamp(l,-1.+f,1.-f);float m=step(1.5,a);a*=m;float n=b.a;b.gba+=vec3(i,j,k)*u44*n;}b.r=a+c*.5+.5,gl_FragColor=b;}",
              i: "u43 u41 u38 u45 u46 u47 u44".split(" "),
            },
            {
              id: "s57",
              name: "_",
              h: "uniform sampler2D u41,u48;uniform float u49;varying vec2 vv0;const vec2 e=vec2(.5,.5);void main(){vec4 a=texture2D(u41,e),b=texture2D(u48,e);float c=step(2.,a.r),d=fract(a.r);vec4 f=vec4(c,d,0.,1.);gl_FragColor=mix(f,b,u49);}",
              i: ["u41", "u48", "u49"],
            },
            {
              id: "s53",
              name: "_",
              h: "uniform sampler2D u41,u50;uniform vec2 u42;varying vec2 vv0;const vec2 j=vec2(1.,1.);const vec3 k=vec3(0.,.7,1.);void main(){vec4 f=texture2D(u41,vec2(.5,.5));vec3 l=texture2D(u50,vv0).rgb;vec2 g=f.gb;float m=f.a;vec2 a=m*u42,c=g+a,d=g;d-=a/2.,c-=a/2.;vec2 n=.5*(d+c),h=step(d,vv0)*step(vv0,c);float o=h.x*h.y;vec2 b=2.*abs(n-vv0)/a;b=pow(b,3.*j);float i=max(b.x,b.y);i*=o,gl_FragColor=vec4(mix(l,k,i),1.);}",
              i: ["u41", "u50", "u42"],
            },
          ]);
        },
        Ce: function () {
          H.R("s55", [
            { type: "1i", name: "u1", value: 0 },
            { type: "1i", name: "u41", value: 1 },
            { type: "2f", name: "u42", value: q },
          ]);
          H.R("s57", [
            { type: "1i", name: "u41", value: 0 },
            { type: "1i", name: "u48", value: 1 },
            { type: "1f", name: "u49", value: X.Ae },
          ]);
          H.R("s53", [
            { type: "1i", name: "u41", value: 0 },
            { type: "1i", name: "u50", value: 1 },
            { type: "2f", name: "u42", value: q },
          ]);
          H.R("s56", [
            { type: "1i", name: "u43", value: 0 },
            { type: "1i", name: "u41", value: 1 },
            { type: "2f", name: "u45", value: X.je },
            { type: "1f", name: "u46", value: X.Ee },
            { type: "1f", name: "u47", value: X.sd },
            {
              type: "3f",
              name: "u44",
              value: [k[0] * q[0], k[1] * q[1], k[2]],
            },
          ]);
        },
        pd: function () {
          w.ma = V.instance({
            A: w.element,
            isPot: !1,
            isFloat: !1,
            isFlipY: !0,
          });
          w.Va = V.instance({
            isPot: !1,
            Df: !0,
            isFloat: !1,
            width: t,
            height: m,
          });
          G.sa = V.instance({ isPot: !0, isFloat: !1, width: X.Ld });
          var n = {
            width: 1,
            height: 1,
            isFloat: !0,
            isPot: !1,
            array: new Float32Array([0, 0.5, 0.5, 0]),
          };
          G.va = Qa.instance(n);
          n = {
            width: 1,
            height: 1,
            isFloat: !0,
            isPot: !1,
            array: new Float32Array([0, 0.5, 0, 1]),
          };
          G.yb = Qa.instance(n);
        },
        xe: function () {
          var n = [0.5, 0.5],
            C = w.element.videoHeight / w.element.videoWidth,
            f = Ga.J() / Ga.C();
          C > f
            ? 1 >= C
              ? (n[0] *= C)
              : (n[1] /= C)
            : ((n[0] *= C), (C = 1 / f), (n[0] *= C), (n[1] *= C));
          n[1] *= f;
          H.R("s54", [
            { type: "1i", name: "u1", value: 0 },
            { type: "2f", name: "u39", value: n },
            { type: "2f", name: "u40", value: [0.5, 0.5] },
          ]);
        },
        Ud: function (n) {
          return new Promise(function (C) {
            var f = "object" === typeof n ? n : JSON.parse(n);
            k = X.Fe.slice(0);
            f.exportData && (k = f.exportData.translationScalingFactors || k);
            k[0] *= X.X[0];
            k[1] *= X.X[1];
            k[2] *= X.X[2];
            B = new ab({ La: f.layers, Db: "gpuRawAvg", Ab: l });
            C();
          });
        },
      };
    return d;
  }
  var tb = {
    ready: !1,
    set_sensibility: function (b) {
      tb.ready && tb.fa.te(b);
    },
    toggle_pause: function (b, e) {
      return tb.ready ? tb.fa.Uc(b, e) : Promise.reject();
    },
    destroy: function () {
      qb.m();
      return new Promise(function (b) {
        tb.fa
          .Uc(!0, !0)
          .catch(function () {})
          .finally(function () {
            tb.fa.rd();
            b();
          });
      });
    },
    toggle_display: function (b) {
      tb.ready && tb.fa.De(b);
    },
    init: function (b) {
      function e(g) {
        b.callbackReady && b.callbackReady(g ? g : "UNKNOW_ERROR");
      }
      tb.fa = sb({
        Od: "undefined" === typeof b.isDisplayVideo ? !0 : b.isDisplayVideo,
        jd: function (g, h) {
          b.callbackReady && b.callbackReady(g, h);
        },
        Yb: b.callbackTrack,
        Nc: b.sensibility,
        Sb: b.NNCPath,
      });
      qb.s({ xc: !1, L: X.L });
      if (
        !Ga.s({
          fb: b.canvasId,
          width: X.width,
          height: X.height,
          debug: !1,
          uc: !1,
          premultipliedAlpha: !0,
        })
      )
        return e && e("COMPAT_FAIL"), !1;
      H.s();
      tb.fa.s();
      return !0;
    },
  };
  window.JEELIZGLANCETRACKER = tb;
  return JEELIZGLANCETRACKER || window.JEELIZGLANCETRACKER;
})();
