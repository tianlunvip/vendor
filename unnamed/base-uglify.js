var base2 = {
  name: "base2",
  version: "1.0",
  exports: "Base,Package,Abstract,Module,Enumerable,Map,Collection,RegGrp,Undefined,Null,This,True,False,assignID,detect,global",
  namespace: ""
};
new
function(_y) {
  var Undefined = K(),
  Null = K(null),
  True = K(true),
  False = K(false),
  This = function() {
    return this
  };
  var global = This();
  var base2 = global.base2;
  var _z = /%([1-9])/g;
  var _g = /^\s\s*/;
  var _h = /\s\s*$/;
  var _i = /([\/()[\]{}|*+-.,^$?\\])/g;
  var _9 = /try/.test(detect) ? /\bbase\b/: /.*/;
  var _a = ["constructor", "toString", "valueOf"];
  var _j = detect("(jscript)") ? new RegExp("^" + rescape(isNaN).replace(/isNaN/, "\\w+") + "$") : {
    test: False
  };
  var _k = 1;
  var _2 = Array.prototype.slice;
  _5();
  function assignID(a) {
    if (!a.base2ID) a.base2ID = "b2_" + _k++;
    return a.base2ID
  };
  var _b = function(a, b) {
    base2.__prototyping = this.prototype;
    var c = new this;
    if (a) extend(c, a);
    delete base2.__prototyping;
    var e = c.constructor;
    function d() {
      if (!base2.__prototyping) {
        if (this.constructor == arguments.callee || this.__constructing) {
          this.__constructing = true;
          e.apply(this, arguments);
          delete this.__constructing
        } else {
          return extend(arguments[0], c)
        }
      }
      return this
    };
    c.constructor = d;
    for (var f in Base) d[f] = this[f];
    d.ancestor = this;
    d.base = Undefined;
    if (b) extend(d, b);
    d.prototype = c;
    if (d.init) d.init();
    return d
  };
  var Base = _b.call(Object, {
    constructor: function() {
      if (arguments.length > 0) {
        this.extend(arguments[0])
      }
    },
    base: function() {},
    extend: delegate(extend)
  },
  Base = {
    ancestorOf: function(a) {
      return _7(this, a)
    },
    extend: _b,
    forEach: function(a, b, c) {
      _5(this, a, b, c)
    },
    implement: function(a) {
      if (typeof a == "function") {
        a = a.prototype
      }
      extend(this.prototype, a);
      return this
    }
  });
  var Package = Base.extend({
    constructor: function(e, d) {
      this.extend(d);
      if (this.init) this.init();
      if (this.name && this.name != "base2") {
        if (!this.parent) this.parent = base2;
        this.parent.addName(this.name, this);
        this.namespace = format("var %1=%2;", this.name, String2.slice(this, 1, -1))
      }
      if (e) {
        var f = base2.JavaScript ? base2.JavaScript.namespace: "";
        e.imports = Array2.reduce(csv(this.imports),
        function(a, b) {
          var c = h(b) || h("JavaScript." + b);
          return a += c.namespace
        },
        "var base2=(function(){return this.base2})();" + base2.namespace + f) + lang.namespace;
        e.exports = Array2.reduce(csv(this.exports),
        function(a, b) {
          var c = this.name + "." + b;
          this.namespace += "var " + b + "=" + c + ";";
          return a += "if(!" + c + ")" + c + "=" + b + ";"
        },
        "", this) + "this._l" + this.name + "();";
        var g = this;
        var i = String2.slice(this, 1, -1);
        e["_l" + this.name] = function() {
          Package.forEach(g,
          function(a, b) {
            if (a && a.ancestorOf == Base.ancestorOf) {
              a.toString = K(format("[%1.%2]", i, b));
              if (a.prototype.toString == Base.prototype.toString) {
                a.prototype.toString = K(format("[object %1.%2]", i, b))
              }
            }
          })
        }
      }
      function h(a) {
        a = a.split(".");
        var b = base2,
        c = 0;
        while (b && a[c] != null) {
          b = b[a[c++]]
        }
        return b
      }
    },
    exports: "",
    imports: "",
    name: "",
    namespace: "",
    parent: null,
    addName: function(a, b) {
      if (!this[a]) {
        this[a] = b;
        this.exports += "," + a;
        this.namespace += format("var %1=%2.%1;", a, this.name)
      }
    },
    addPackage: function(a) {
      this.addName(a, new Package(null, {
        name: a,
        parent: this
      }))
    },
    toString: function() {
      return format("[%1]", this.parent ? String2.slice(this.parent, 1, -1) + "." + this.name: this.name)
    }
  });
  var Abstract = Base.extend({
    constructor: function() {
      throw new TypeError("Abstract class cannot be instantiated.");
    }
  });
  var _m = 0;
  var Module = Abstract.extend(null, {
    namespace: "",
    extend: function(a, b) {
      var c = this.base();
      var e = _m++;
      c.namespace = "";
      c.partial = this.partial;
      c.toString = K("[base2.Module[" + e + "]]");
      Module[e] = c;
      c.implement(this);
      if (a) c.implement(a);
      if (b) {
        extend(c, b);
        if (c.init) c.init()
      }
      return c
    },
    forEach: function(c, e) {
      _5(Module, this.prototype,
      function(a, b) {
        if (typeOf(a) == "function") {
          c.call(e, this[b], b, this)
        }
      },
      this)
    },
    implement: function(a) {
      var b = this;
      var c = b.toString().slice(1, -1);
      if (typeof a == "function") {
        if (!_7(a, b)) {
          this.base(a)
        }
        if (_7(Module, a)) {
          for (var e in a) {
            if (b[e] === undefined) {
              var d = a[e];
              if (typeof d == "function" && d.call && a.prototype[e]) {
                d = _n(a, e)
              }
              b[e] = d
            }
          }
          b.namespace += a.namespace.replace(/base2\.Module\[\d+\]/g, c)
        }
      } else {
        extend(b, a);
        _c(b, a)
      }
      return b
    },
    partial: function() {
      var c = Module.extend();
      var e = c.toString().slice(1, -1);
      c.namespace = this.namespace.replace(/(\w+)=b[^\)]+\)/g, "$1=" + e + ".$1");
      this.forEach(function(a, b) {
        c[b] = partial(bind(a, c))
      });
      return c
    }
  });
  function _c(a, b) {
    var c = a.prototype;
    var e = a.toString().slice(1, -1);
    for (var d in b) {
      var f = b[d],
      g = "";
      if (d.charAt(0) == "@") {
        if (detect(d.slice(1))) _c(a, f)
      } else if (!c[d]) {
        if (d == d.toUpperCase()) {
          g = "var " + d + "=" + e + "." + d + ";"
        } else if (typeof f == "function" && f.call) {
          g = "var " + d + "=base2.lang.bind('" + d + "'," + e + ");";
          c[d] = _o(a, d)
        }
        if (a.namespace.indexOf(g) == -1) {
          a.namespace += g
        }
      }
    }
  };
  function _n(a, b) {
    return function() {
      return a[b].apply(a, arguments)
    }
  };
  function _o(b, c) {
    return function() {
      var a = _2.call(arguments);
      a.unshift(this);
      return b[c].apply(b, a)
    }
  };
  var Enumerable = Module.extend({
    every: function(c, e, d) {
      var f = true;
      try {
        forEach(c,
        function(a, b) {
          f = e.call(d, a, b, c);
          if (!f) throw StopIteration;
        })
      } catch(error) {
        if (error != StopIteration) throw error;
      }
      return !! f
    },
    filter: function(e, d, f) {
      var g = 0;
      return this.reduce(e,
      function(a, b, c) {
        if (d.call(f, b, c, e)) {
          a[g++] = b
        }
        return a
      },
      [])
    },
    invoke: function(b, c) {
      var e = _2.call(arguments, 2);
      return this.map(b, (typeof c == "function") ?
      function(a) {
        return a == null ? undefined: c.apply(a, e)
      }: function(a) {
        return a == null ? undefined: a[c].apply(a, e)
      })
    },
    map: function(c, e, d) {
      var f = [],
      g = 0;
      forEach(c,
      function(a, b) {
        f[g++] = e.call(d, a, b, c)
      });
      return f
    },
    pluck: function(b, c) {
      return this.map(b,
      function(a) {
        return a == null ? undefined: a[c]
      })
    },
    reduce: function(c, e, d, f) {
      var g = arguments.length > 2;
      forEach(c,
      function(a, b) {
        if (g) {
          d = e.call(f, d, a, b, c)
        } else {
          d = a;
          g = true
        }
      });
      return d
    },
    some: function(a, b, c) {
      return ! this.every(a, not(b), c)
    }
  });
  var _1 = "#";
  var Map = Base.extend({
    constructor: function(a) {
      if (a) this.merge(a)
    },
    clear: function() {
      for (var a in this) if (a.indexOf(_1) == 0) {
        delete this[a]
      }
    },
    copy: function() {
      base2.__prototyping = true;
      var a = new this.constructor;
      delete base2.__prototyping;
      for (var b in this) if (this[b] !== a[b]) {
        a[b] = this[b]
      }
      return a
    },
    forEach: function(a, b) {
      for (var c in this) if (c.indexOf(_1) == 0) {
        a.call(b, this[c], c.slice(1), this)
      }
    },
    get: function(a) {
      return this[_1 + a]
    },
    getKeys: function() {
      return this.map(II)
    },
    getValues: function() {
      return this.map(I)
    },
    has: function(a) {
      /*@cc_on @*/
      /*@if(@_jscript_version<5.5)return $Legacy.has(this,_1+a);@else @*/
      return _1 + a in this;
      /*@end @*/
    },
    merge: function(b) {
      var c = flip(this.put);
      forEach(arguments,
      function(a) {
        forEach(a, c, this)
      },
      this);
      return this
    },
    put: function(a, b) {
      this[_1 + a] = b
    },
    remove: function(a) {
      delete this[_1 + a]
    },
    size: function() {
      var a = 0;
      for (var b in this) if (b.indexOf(_1) == 0) a++;
      return a
    },
    union: function(a) {
      return this.merge.apply(this.copy(), arguments)
    }
  });
  Map.implement(Enumerable);
  Map.prototype.filter = function(e, d) {
    return this.reduce(function(a, b, c) {
      if (!e.call(d, b, c, this)) {
        a.remove(c)
      }
      return a
    },
    this.copy(), this)
  };
  var _0 = "~";
  var Collection = Map.extend({
    constructor: function(a) {
      this[_0] = new Array2;
      this.base(a)
    },
    add: function(a, b) {
      assert(!this.has(a), "Duplicate key '" + a + "'.");
      this.put.apply(this, arguments)
    },
    clear: function() {
      this.base();
      this[_0].length = 0
    },
    copy: function() {
      var a = this.base();
      a[_0] = this[_0].copy();
      return a
    },
    forEach: function(a, b) {
      var c = this[_0];
      var e = c.length;
      for (var d = 0; d < e; d++) {
        a.call(b, this[_1 + c[d]], c[d], this)
      }
    },
    getAt: function(a) {
      var b = this[_0].item(a);
      return (b === undefined) ? undefined: this[_1 + b]
    },
    getKeys: function() {
      return this[_0].copy()
    },
    indexOf: function(a) {
      return this[_0].indexOf(String(a))
    },
    insertAt: function(a, b, c) {
      assert(this[_0].item(a) !== undefined, "Index out of bounds.");
      assert(!this.has(b), "Duplicate key '" + b + "'.");
      this[_0].insertAt(a, String(b));
      this[_1 + b] = null;
      this.put.apply(this, _2.call(arguments, 1))
    },
    item: function(a) {
      return this[typeof a == "number" ? "getAt": "get"](a)
    },
    put: function(a, b) {
      if (!this.has(a)) {
        this[_0].push(String(a))
      }
      var c = this.constructor;
      if (c.Item && !instanceOf(b, c.Item)) {
        b = c.create.apply(c, arguments)
      }
      this[_1 + a] = b
    },
    putAt: function(a, b) {
      arguments[0] = this[_0].item(a);
      assert(arguments[0] !== undefined, "Index out of bounds.");
      this.put.apply(this, arguments)
    },
    remove: function(a) {
      if (this.has(a)) {
        this[_0].remove(String(a));
        delete this[_1 + a]
      }
    },
    removeAt: function(a) {
      var b = this[_0].item(a);
      if (b !== undefined) {
        this[_0].removeAt(a);
        delete this[_1 + b]
      }
    },
    reverse: function() {
      this[_0].reverse();
      return this
    },
    size: function() {
      return this[_0].length
    },
    slice: function(a, b) {
      var c = this.copy();
      if (arguments.length > 0) {
        var e = this[_0],
        d = e;
        c[_0] = Array2(_2.apply(e, arguments));
        if (c[_0].length) {
          d = d.slice(0, a);
          if (arguments.length > 1) {
            d = d.concat(e.slice(b))
          }
        }
        for (var f = 0; f < d.length; f++) {
          delete c[_1 + d[f]]
        }
      }
      return c
    },
    sort: function(c) {
      if (c) {
        this[_0].sort(bind(function(a, b) {
          return c(this[_1 + a], this[_1 + b], a, b)
        },
        this))
      } else this[_0].sort();
      return this
    },
    toString: function() {
      return "(" + (this[_0] || "") + ")"
    }
  },
  {
    Item: null,
    create: function(a, b) {
      return this.Item ? new this.Item(a, b) : b
    },
    extend: function(a, b) {
      var c = this.base(a);
      c.create = this.create;
      if (b) extend(c, b);
      if (!c.Item) {
        c.Item = this.Item
      } else if (typeof c.Item != "function") {
        c.Item = (this.Item || Base).extend(c.Item)
      }
      if (c.init) c.init();
      return c
    }
  });
  var _p = /\\(\d+)/g,
  _q = /\\./g,
  _r = /\(\?[:=!]|\[[^\]]+\]/g,
  _s = /\(/g,
  _t = /\$(\d+)/,
  _u = /^\$\d+$/;
  var RegGrp = Collection.extend({
    constructor: function(a, b) {
      this.base(a);
      this.ignoreCase = !!b
    },
    ignoreCase: false,
    exec: function(g, i) {
      g += "";
      var h = this,
      j = this[_0];
      if (!j.length) return g;
      if (i == RegGrp.IGNORE) i = 0;
      return g.replace(new RegExp(this, this.ignoreCase ? "gi": "g"),
      function(a) {
        var b, c = 1,
        e = 0;
        while ((b = h[_1 + j[e++]])) {
          var d = c + b.length + 1;
          if (arguments[c]) {
            var f = i == null ? b.replacement: i;
            switch (typeof f) {
            case "function":
              return f.apply(h, _2.call(arguments, c, d));
            case "number":
              return arguments[c + f];
            default:
              return f
            }
          }
          c = d
        }
        return a
      })
    },
    insertAt: function(a, b, c) {
      if (instanceOf(b, RegExp)) {
        arguments[1] = b.source
      }
      return base(this, arguments)
    },
    test: function(a) {
      return this.exec(a) != a
    },
    toString: function() {
      var d = 1;
      return "(" + this.map(function(c) {
        var e = (c + "").replace(_p,
        function(a, b) {
          return "\\" + (d + Number(b))
        });
        d += c.length + 1;
        return e
      }).join(")|(") + ")"
    }
  },
  {
    IGNORE: "$0",
    init: function() {
      forEach("add,get,has,put,remove".split(","),
      function(b) {
        _8(this, b,
        function(a) {
          if (instanceOf(a, RegExp)) {
            arguments[0] = a.source
          }
          return base(this, arguments)
        })
      },
      this.prototype)
    },
    Item: {
      constructor: function(a, b) {
        if (b == null) b = RegGrp.IGNORE;
        else if (b.replacement != null) b = b.replacement;
        else if (typeof b != "function") b = String(b);
        if (typeof b == "string" && _t.test(b)) {
          if (_u.test(b)) {
            b = parseInt(b.slice(1))
          } else {
            var c = '"';
            b = b.replace(/\\/g, "\\\\").replace(/"/g, "\\x22").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\$(\d+)/g, c + "+(arguments[$1]||" + c + c + ")+" + c).replace(/(['"])\1\+(.*)\+\1\1$/, "$1");
            b = new Function("return " + c + b + c)
          }
        }
        this.length = RegGrp.count(a);
        this.replacement = b;
        this.toString = K(a + "")
      },
      length: 0,
      replacement: ""
    },
    count: function(a) {
      a = (a + "").replace(_q, "").replace(_r, "");
      return match(a, _s).length
    }
  });
  var lang = {
    name: "lang",
    version: base2.version,
    exports: "assert,assertArity,assertType,base,bind,copy,extend,forEach,format,instanceOf,match,pcopy,rescape,trim,typeOf",
    namespace: ""
  };
  function assert(a, b, c) {
    if (!a) {
      throw new(c || Error)(b || "Assertion failed.");
    }
  };
  function assertArity(a, b, c) {
    if (b == null) b = a.callee.length;
    if (a.length < b) {
      throw new SyntaxError(c || "Not enough arguments.");
    }
  };
  function assertType(a, b, c) {
    if (b && (typeof b == "function" ? !instanceOf(a, b) : typeOf(a) != b)) {
      throw new TypeError(c || "Invalid type.");
    }
  };
  function copy(a) {
    var b = {};
    for (var c in a) {
      b[c] = a[c]
    }
    return b
  };
  function pcopy(a) {
    _d.prototype = a;
    return new _d
  };
  function _d() {};
  function base(a, b) {
    return a.base.apply(a, b)
  };
  function extend(a, b) {
    if (a && b) {
      if (arguments.length > 2) {
        var c = b;
        b = {};
        b[c] = arguments[2]
      }
      var e = global[(typeof b == "function" ? "Function": "Object")].prototype;
      if (base2.__prototyping) {
        var d = _a.length,
        c;
        while ((c = _a[--d])) {
          var f = b[c];
          if (f != e[c]) {
            if (_9.test(f)) {
              _8(a, c, f)
            } else {
              a[c] = f
            }
          }
        }
      }
      for (c in b) {
        if (e[c] === undefined) {
          var f = b[c];
          if (c.charAt(0) == "@") {
            if (detect(c.slice(1))) extend(a, f)
          } else {
            var g = a[c];
            if (g && typeof f == "function") {
              if (f != g) {
                if (_9.test(f)) {
                  _8(a, c, f)
                } else {
                  f.ancestor = g;
                  a[c] = f
                }
              }
            } else {
              a[c] = f
            }
          }
        }
      }
    }
    return a
  };
  function _7(a, b) {
    while (b) {
      if (!b.ancestor) return false;
      b = b.ancestor;
      if (b == a) return true
    }
    return false
  };
  function _8(c, e, d) {
    var f = c[e];
    var g = base2.__prototyping;
    if (g && f != g[e]) g = null;
    function i() {
      var a = this.base;
      this.base = g ? g[e] : f;
      var b = d.apply(this, arguments);
      this.base = a;
      return b
    };
    i.method = d;
    i.ancestor = f;
    c[e] = i
  };
  if (typeof StopIteration == "undefined") {
    StopIteration = new Error("StopIteration")
  }
  function forEach(a, b, c, e) {
    if (a == null) return;
    if (!e) {
      if (typeof a == "function" && a.call) {
        e = Function
      } else if (typeof a.forEach == "function" && a.forEach != arguments.callee) {
        a.forEach(b, c);
        return
      } else if (typeof a.length == "number") {
        _e(a, b, c);
        return
      }
    }
    _5(e || Object, a, b, c)
  };
  forEach.csv = function(a, b, c) {
    forEach(csv(a), b, c)
  };
  forEach.detect = function(c, e, d) {
    forEach(c,
    function(a, b) {
      if (b.charAt(0) == "@") {
        if (detect(b.slice(1))) forEach(a, arguments.callee)
      } else e.call(d, a, b, c)
    })
  };
  function _e(a, b, c) {
    if (a == null) a = global;
    var e = a.length || 0,
    d;
    if (typeof a == "string") {
      for (d = 0; d < e; d++) {
        b.call(c, a.charAt(d), d, a)
      }
    } else {
      for (d = 0; d < e; d++) {
        /*@cc_on @*/
        /*@if(@_jscript_version<5.2)if($Legacy.has(a,d))@else @*/
        if (d in a)
        /*@end @*/
        b.call(c, a[d], d, a)
      }
    }
  };
  function _5(g, i, h, j) {
    var k = function() {
      this.i = 1
    };
    k.prototype = {
      i: 1
    };
    var l = 0;
    for (var m in new k) l++;
    _5 = (l > 1) ?
    function(a, b, c, e) {
      var d = {};
      for (var f in b) {
        if (!d[f] && a.prototype[f] === undefined) {
          d[f] = true;
          c.call(e, b[f], f, b)
        }
      }
    }: function(a, b, c, e) {
      for (var d in b) {
        if (a.prototype[d] === undefined) {
          c.call(e, b[d], d, b)
        }
      }
    };
    _5(g, i, h, j)
  };
  function instanceOf(a, b) {
    if (typeof b != "function") {
      throw new TypeError("Invalid 'instanceOf' operand.");
    }
    if (a == null) return false;
    /*@cc_on if(typeof a.constructor!="function"){return typeOf(a)==typeof b.prototype.valueOf()}@*/
    if (a.constructor == b) return true;
    if (b.ancestorOf) return b.ancestorOf(a.constructor);
    /*@if(@_jscript_version<5.1)@else @*/
    if (a instanceof b) return true;
    /*@end @*/
    if (Base.ancestorOf == b.ancestorOf) return false;
    if (Base.ancestorOf == a.constructor.ancestorOf) return b == Object;
    switch (b) {
    case Array:
      return !! (typeof a == "object" && a.join && a.splice);
    case Function:
      return typeOf(a) == "function";
    case RegExp:
      return typeof a.constructor.$1 == "string";
    case Date:
      return !! a.getTimezoneOffset;
    case String:
    case Number:
    case Boolean:
      return typeOf(a) == typeof b.prototype.valueOf();
    case Object:
      return true
    }
    return false
  };
  function typeOf(a) {
    var b = typeof a;
    switch (b) {
    case "object":
      return a == null ? "null": typeof a.constructor == "undefined" ? _j.test(a) ? "function": b: typeof a.constructor.prototype.valueOf();
    case "function":
      return typeof a.call == "function" ? b: "object";
    default:
      return b
    }
  };
  var JavaScript = {
    name: "JavaScript",
    version: base2.version,
    exports: "Array2,Date2,Function2,String2",
    namespace: "",
    bind: function(c) {
      var e = global;
      global = c;
      forEach.csv(this.exports,
      function(a) {
        var b = a.slice(0, -1);
        extend(c[b], this[a]);
        this[a](c[b].prototype)
      },
      this);
      global = e;
      return c
    }
  };
  function _6(b, c, e, d) {
    var f = Module.extend();
    var g = f.toString().slice(1, -1);
    forEach.csv(e,
    function(a) {
      f[a] = unbind(b.prototype[a]);
      f.namespace += format("var %1=%2.%1;", a, g)
    });
    forEach(_2.call(arguments, 3), f.implement, f);
    var i = function() {
      return f(this.constructor == f ? c.apply(null, arguments) : arguments[0])
    };
    i.prototype = f.prototype;
    for (var h in f) {
      if (h != "prototype" && b[h]) {
        f[h] = b[h];
        delete f.prototype[h]
      }
      i[h] = f[h]
    }
    i.ancestor = Object;
    delete i.extend;
    i.namespace = i.namespace.replace(/(var (\w+)=)[^,;]+,([^\)]+)\)/g, "$1$3.$2");
    return i
  };
  if ((new Date).getYear() > 1900) {
    Date.prototype.getYear = function() {
      return this.getFullYear() - 1900
    };
    Date.prototype.setYear = function(a) {
      return this.setFullYear(a + 1900)
    }
  }
  var _f = new Date(Date.UTC(2006, 1, 20));
  _f.setUTCDate(15);
  if (_f.getUTCHours() != 0) {
    forEach.csv("FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds",
    function(b) {
      extend(Date.prototype, "setUTC" + b,
      function() {
        var a = base(this, arguments);
        if (a >= 57722401000) {
          a -= 3600000;
          this.setTime(a)
        }
        return a
      })
    })
  }
  Function.prototype.prototype = {};
  if ("".replace(/^/, K("$$")) == "$") {
    extend(String.prototype, "replace",
    function(a, b) {
      if (typeof b == "function") {
        var c = b;
        b = function() {
          return String(c.apply(null, arguments)).split("$").join("$$")
        }
      }
      return this.base(a, b)
    })
  }
  var Array2 = _6(Array, Array, "concat,join,pop,push,reverse,shift,slice,sort,splice,unshift", Enumerable, {
    combine: function(e, d) {
      if (!d) d = e;
      return Array2.reduce(e,
      function(a, b, c) {
        a[b] = d[c];
        return a
      },
      {})
    },
    contains: function(a, b) {
      return Array2.indexOf(a, b) != -1
    },
    copy: function(a) {
      var b = _2.call(a);
      if (!b.swap) Array2(b);
      return b
    },
    flatten: function(c) {
      var e = 0;
      return Array2.reduce(c,
      function(a, b) {
        if (Array2.like(b)) {
          Array2.reduce(b, arguments.callee, a)
        } else {
          a[e++] = b
        }
        return a
      },
      [])
    },
    forEach: _e,
    indexOf: function(a, b, c) {
      var e = a.length;
      if (c == null) {
        c = 0
      } else if (c < 0) {
        c = Math.max(0, e + c)
      }
      for (var d = c; d < e; d++) {
        if (a[d] === b) return d
      }
      return - 1
    },
    insertAt: function(a, b, c) {
      Array2.splice(a, b, 0, c);
      return c
    },
    item: function(a, b) {
      if (b < 0) b += a.length;
      return a[b]
    },
    lastIndexOf: function(a, b, c) {
      var e = a.length;
      if (c == null) {
        c = e - 1
      } else if (c < 0) {
        c = Math.max(0, e + c)
      }
      for (var d = c; d >= 0; d--) {
        if (a[d] === b) return d
      }
      return - 1
    },
    map: function(c, e, d) {
      var f = [];
      Array2.forEach(c,
      function(a, b) {
        f[b] = e.call(d, a, b, c)
      });
      return f
    },
    remove: function(a, b) {
      var c = Array2.indexOf(a, b);
      if (c != -1) Array2.removeAt(a, c)
    },
    removeAt: function(a, b) {
      Array2.splice(a, b, 1)
    },
    swap: function(a, b, c) {
      if (b < 0) b += a.length;
      if (c < 0) c += a.length;
      var e = a[b];
      a[b] = a[c];
      a[c] = e;
      return a
    }
  });
  Array2.reduce = Enumerable.reduce;
  Array2.like = function(a) {
    return typeOf(a) == "object" && typeof a.length == "number"
  };
  var _v = /^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})(:(\d{2}))?|Z)?$/;
  var _4 = {
    FullYear: 2,
    Month: 4,
    Date: 6,
    Hours: 8,
    Minutes: 10,
    Seconds: 12,
    Milliseconds: 14
  };
  var _3 = {
    Hectomicroseconds: 15,
    UTC: 16,
    Sign: 17,
    Hours: 18,
    Minutes: 20
  };
  var _w = /(((00)?:0+)?:0+)?\.0+$/;
  var _x = /(T[0-9:.]+)$/;
  var Date2 = _6(Date,
  function(a, b, c, e, d, f, g) {
    switch (arguments.length) {
    case 0:
      return new Date;
    case 1:
      return typeof a == "number" ? new Date(a) : Date2.parse(a);
    default:
      return new Date(a, b, arguments.length == 2 ? 1 : c, e || 0, d || 0, f || 0, g || 0)
    }
  },
  "", {
    toISOString: function(c) {
      var e = "####-##-##T##:##:##.###";
      for (var d in _4) {
        e = e.replace(/#+/,
        function(a) {
          var b = c["getUTC" + d]();
          if (d == "Month") b++;
          return ("000" + b).slice( - a.length)
        })
      }
      return e.replace(_w, "").replace(_x, "$1Z")
    }
  });
  delete Date2.forEach;
  Date2.now = function() {
    return (new Date).valueOf()
  };
  Date2.parse = function(a, b) {
    if (arguments.length > 1) {
      assertType(b, "number", "default date should be of type 'number'.")
    }
    var c = match(a, _v);
    if (c.length) {
      if (c[_4.Month]) c[_4.Month]--;
      if (c[_3.Hectomicroseconds] >= 5) c[_4.Milliseconds]++;
      var e = new Date(b || 0);
      var d = c[_3.UTC] || c[_3.Hours] ? "UTC": "";
      for (var f in _4) {
        var g = c[_4[f]];
        if (!g) continue;
        e["set" + d + f](g);
        if (e["get" + d + f]() != c[_4[f]]) {
          return NaN
        }
      }
      if (c[_3.Hours]) {
        var i = Number(c[_3.Sign] + c[_3.Hours]);
        var h = Number(c[_3.Sign] + (c[_3.Minutes] || 0));
        e.setUTCMinutes(e.getUTCMinutes() + (i * 60) + h)
      }
      return e.valueOf()
    } else {
      return Date.parse(a)
    }
  };
  var String2 = _6(String,
  function(a) {
    return new String(arguments.length == 0 ? "": a)
  },
  "charAt,charCodeAt,concat,indexOf,lastIndexOf,match,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase", {
    csv: csv,
    format: format,
    rescape: rescape,
    trim: trim
  });
  delete String2.forEach;
  function trim(a) {
    return String(a).replace(_g, "").replace(_h, "")
  };
  function csv(a) {
    return a ? (a + "").split(/\s*,\s*/) : []
  };
  function format(c) {
    var e = arguments;
    var d = new RegExp("%([1-" + (arguments.length - 1) + "])", "g");
    return (c + "").replace(d,
    function(a, b) {
      return e[b]
    })
  };
  function match(a, b) {
    return (a + "").match(b) || []
  };
  function rescape(a) {
    return (a + "").replace(_i, "\\$1")
  };
  var Function2 = _6(Function, Function, "", {
    I: I,
    II: II,
    K: K,
    bind: bind,
    compose: compose,
    delegate: delegate,
    flip: flip,
    not: not,
    partial: partial,
    unbind: unbind
  });
  function I(a) {
    return a
  };
  function II(a, b) {
    return b
  };
  function K(a) {
    return function() {
      return a
    }
  };
  function bind(a, b) {
    var c = typeof a != "function";
    if (arguments.length > 2) {
      var e = _2.call(arguments, 2);
      return function() {
        return (c ? b[a] : a).apply(b, e.concat.apply(e, arguments))
      }
    } else {
      return function() {
        return (c ? b[a] : a).apply(b, arguments)
      }
    }
  };
  function compose() {
    var c = _2.call(arguments);
    return function() {
      var a = c.length,
      b = c[--a].apply(this, arguments);
      while (a--) b = c[a].call(this, b);
      return b
    }
  };
  function delegate(b, c) {
    return function() {
      var a = _2.call(arguments);
      a.unshift(this);
      return b.apply(c, a)
    }
  };
  function flip(a) {
    return function() {
      return a.apply(this, Array2.swap(arguments, 0, 1))
    }
  };
  function not(a) {
    return function() {
      return ! a.apply(this, arguments)
    }
  };
  function partial(e) {
    var d = _2.call(arguments, 1);
    return function() {
      var a = d.concat(),
      b = 0,
      c = 0;
      while (b < d.length && c < arguments.length) {
        if (a[b] === undefined) a[b] = arguments[c++];
        b++
      }
      while (c < arguments.length) {
        a[b++] = arguments[c++]
      }
      if (Array2.contains(a, undefined)) {
        a.unshift(e);
        return partial.apply(null, a)
      }
      return e.apply(this, a)
    }
  };
  function unbind(b) {
    return function(a) {
      return b.apply(a, _2.call(arguments, 1))
    }
  };
  function detect() {
    var d = NaN
    /*@cc_on||@_jscript_version@*/
    ;
    var f = global.java ? true: false;
    if (global.navigator) {
      var g = /MSIE[\d.]+/g;
      var i = document.createElement("span");
      var h = navigator.userAgent.replace(/([a-z])[\s\/](\d)/gi, "$1$2");
      if (!d) h = h.replace(g, "");
      if (g.test(h)) h = h.match(g)[0] + " " + h.replace(g, "");
      base2.userAgent = navigator.platform + " " + h.replace(/like \w+/gi, "");
      f &= navigator.javaEnabled()
    }
    var j = {};
    detect = function(a) {
      if (j[a] == null) {
        var b = false,
        c = a;
        var e = c.charAt(0) == "!";
        if (e) c = c.slice(1);
        if (c.charAt(0) == "(") {
          try {
            b = new Function("element,jscript,java,global", "return !!" + c)(i, d, f, global)
          } catch(ex) {}
        } else {
          b = new RegExp("(" + c + ")", "i").test(base2.userAgent)
        }
        j[a] = !!(e ^ b)
      }
      return j[a]
    };
    return detect(arguments[0])
  };
  base2 = global.base2 = new Package(this, base2);
  var exports = this.exports;
  lang = new Package(this, lang);
  exports += this.exports;
  JavaScript = new Package(this, JavaScript);
  eval(exports + this.exports);
  lang.base = base;
  lang.extend = extend
};

new
function() {
  new base2.Package(this, {
    imports: "Function2,Enumerable"
  });
  eval(this.imports);
  var i = RegGrp.IGNORE;
  var S = "~";
  var A = "";
  var F = " ";
  var p = RegGrp.extend({
    put: function(a, c) {
      if (typeOf(a) == "string") {
        a = p.dictionary.exec(a)
      }
      this.base(a, c)
    }
  },
  {
    dictionary: new RegGrp({
      OPERATOR: /return|typeof|[\[(\^=,{}:;&|!*?]/.source,
      CONDITIONAL: /\/\*@\w*|\w*@\*\/|\/\/@\w*|@\w+/.source,
      COMMENT1: /\/\/[^\n]*/.source,
      COMMENT2: /\/\*[^*]*\*+([^\/][^*]*\*+)*\//.source,
      REGEXP: /\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*/.source,
      STRING1: /'(\\.|[^'\\])*'/.source,
      STRING2: /"(\\.|[^"\\])*"/.source
    })
  });
  var B = Collection.extend({
    add: function(a) {
      if (!this.has(a)) this.base(a);
      a = this.get(a);
      if (!a.index) {
        a.index = this.size()
      }
      a.count++;
      return a
    },
    sort: function(d) {
      return this.base(d ||
      function(a, c) {
        return (c.count - a.count) || (a.index - c.index)
      })
    }
  },
  {
    Item: {
      constructor: function(a) {
        this.toString = K(a)
      },
      index: 0,
      count: 0,
      encoded: ""
    }
  });
  var v = Base.extend({
    constructor: function(a, c, d) {
      this.parser = new p(d);
      if (a) this.parser.put(a, "");
      this.encoder = c
    },
    parser: null,
    encoder: Undefined,
    search: function(c) {
      var d = new B;
      this.parser.putAt( - 1,
      function(a) {
        d.add(a)
      });
      this.parser.exec(c);
      return d
    },
    encode: function(c) {
      var d = this.search(c);
      d.sort();
      var b = 0;
      forEach(d,
      function(a) {
        a.encoded = this.encoder(b++)
      },
      this);
      this.parser.putAt( - 1,
      function(a) {
        return d.get(a).encoded
      });
      return this.parser.exec(c)
    }
  });
  var w = v.extend({
    constructor: function() {
      return this.base(w.PATTERN,
      function(a) {
        return "_" + Packer.encode62(a)
      },
      w.IGNORE)
    }
  },
  {
    IGNORE: {
      CONDITIONAL: i,
      "(OPERATOR)(REGEXP)": i
    },
    PATTERN: /\b_[\da-zA-Z$][\w$]*\b/g
  });
  var q = v.extend({
    encode: function(d) {
      var b = this.search(d);
      b.sort();
      var f = new Collection;
      var e = b.size();
      for (var h = 0; h < e; h++) {
        f.put(Packer.encode62(h), h)
      }
      function C(a) {
        return b["#" + a].replacement
      };
      var k = K("");
      var l = 0;
      forEach(b,
      function(a) {
        if (f.has(a)) {
          a.index = f.get(a);
          a.toString = k
        } else {
          while (b.has(Packer.encode62(l))) l++;
          a.index = l++;
          if (a.count == 1) {
            a.toString = k
          }
        }
        a.replacement = Packer.encode62(a.index);
        if (a.replacement.length == a.toString().length) {
          a.toString = k
        }
      });
      b.sort(function(a, c) {
        return a.index - c.index
      });
      b = b.slice(0, this.getKeyWords(b).split("|").length);
      d = d.replace(this.getPattern(b), C);
      var r = this.escape(d);
      var m = "[]";
      var t = this.getCount(b);
      var g = this.getKeyWords(b);
      var n = this.getEncoder(b);
      var u = this.getDecoder(b);
      return format(q.UNPACK, r, m, t, g, n, u)
    },
    search: function(a) {
      var c = new B;
      forEach(a.match(q.WORDS), c.add, c);
      return c
    },
    escape: function(a) {
      return a.replace(/([\\'])/g, "\\$1").replace(/[\r\n]+/g, "\\n")
    },
    getCount: function(a) {
      return a.size() || 1
    },
    getDecoder: function(c) {
      var d = new RegGrp({
        "(\\d)(\\|\\d)+\\|(\\d)": "$1-$3",
        "([a-z])(\\|[a-z])+\\|([a-z])": "$1-$3",
        "([A-Z])(\\|[A-Z])+\\|([A-Z])": "$1-$3",
        "\\|": ""
      });
      var b = d.exec(c.map(function(a) {
        if (a.toString()) return a.replacement;
        return ""
      }).slice(0, 62).join("|"));
      if (!b) return "^$";
      b = "[" + b + "]";
      var f = c.size();
      if (f > 62) {
        b = "(" + b + "|";
        var e = Packer.encode62(f).charAt(0);
        if (e > "9") {
          b += "[\\\\d";
          if (e >= "a") {
            b += "a";
            if (e >= "z") {
              b += "-z";
              if (e >= "A") {
                b += "A";
                if (e > "A") b += "-" + e
              }
            } else if (e == "b") {
              b += "-" + e
            }
          }
          b += "]"
        } else if (e == 9) {
          b += "\\\\d"
        } else if (e == 2) {
          b += "[12]"
        } else if (e == 1) {
          b += "1"
        } else {
          b += "[1-" + e + "]"
        }
        b += "\\\\w)"
      }
      return b
    },
    getEncoder: function(a) {
      var c = a.size();
      return q["ENCODE" + (c > 10 ? c > 36 ? 62 : 36 : 10)]
    },
    getKeyWords: function(a) {
      return a.map(String).join("|").replace(/\|+$/, "")
    },
    getPattern: function(a) {
      var a = a.map(String).join("|").replace(/\|{2,}/g, "|").replace(/^\|+|\|+$/g, "") || "\\x0";
      return new RegExp("\\b(" + a + ")\\b", "g")
    }
  },
  {
    WORDS: /\b[\da-zA-Z]\b|\w{2,}/g,
    ENCODE10: "String",
    ENCODE36: "function(c){return c.toString(36)}",
    ENCODE62: "function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))}",
    UNPACK: "eval(function(p,a,c,k,e,r){e=%5;if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'%6'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('%1',%2,%3,'%4'.split('|'),0,{}))"
  });
  global.Packer = Base.extend({
    constructor: function() {
      this.minifier = new j;
      this.shrinker = new o;
      this.privates = new w;
      this.base62 = new q
    },
    minifier: null,
    shrinker: null,
    privates: null,
    base62: null,
    pack: function(a, c, d, b) {
      a = this.minifier.minify(a);
      if (d) a = this.shrinker.shrink(a);
      if (b) a = this.privates.encode(a);
      if (c) a = this.base62.encode(a);
      return a
    }
  },
  {
    version: "3.1",
    init: function() {
      eval("var e=this.encode62=" + q.ENCODE62)
    },
    data: new p({
      "STRING1": i,
      'STRING2': i,
      "CONDITIONAL": i,
      "(OPERATOR)\\s*(REGEXP)": "$1$2"
    }),
    encode52: function(c) {
      function d(a) {
        return (a < 52 ? '': d(parseInt(a / 52))) + ((a = a % 52) > 25 ? String.fromCharCode(a + 39) : String.fromCharCode(a + 97))
      };
      var b = d(c);
      if (/^(do|if|in)$/.test(b)) b = b.slice(1) + 0;
      return b
    }
  });
  var j = Base.extend({
    minify: function(a) {
      a += "\n";
      a = a.replace(j.CONTINUE, "");
      a = j.comments.exec(a);
      a = j.clean.exec(a);
      a = j.whitespace.exec(a);
      a = j.concat.exec(a);
      return a
    }
  },
  {
    CONTINUE: /\\\r?\n/g,
    init: function() {
      this.concat = new p(this.concat).merge(Packer.data);
      extend(this.concat, "exec",
      function(a) {
        var c = this.base(a);
        while (c != a) {
          a = c;
          c = this.base(a)
        }
        return c
      });
      forEach.csv("comments,clean,whitespace",
      function(a) {
        this[a] = Packer.data.union(new p(this[a]))
      },
      this);
      this.conditionalComments = this.comments.copy();
      this.conditionalComments.putAt( - 1, " $3");
      this.whitespace.removeAt(2);
      this.comments.removeAt(2)
    },
    clean: {
      "\\(\\s*([^;)]*)\\s*;\\s*([^;)]*)\\s*;\\s*([^;)]*)\\)": "($1;$2;$3)",
      "throw[^};]+[};]": i,
      ";+\\s*([};])": "$1"
    },
    comments: {
      ";;;[^\\n]*\\n": A,
      "(COMMENT1)\\n\\s*(REGEXP)?": "\n$3",
      "(COMMENT2)\\s*(REGEXP)?": function(a, c, d, b) {
        if (/^\/\*@/.test(c) && /@\*\/$/.test(c)) {
          c = j.conditionalComments.exec(c)
        } else {
          c = ""
        }
        return c + " " + (b || "")
      }
    },
    concat: {
      "(STRING1)\\+(STRING1)": function(a, c, d, b) {
        return c.slice(0, -1) + b.slice(1)
      },
      "(STRING2)\\+(STRING2)": function(a, c, d, b) {
        return c.slice(0, -1) + b.slice(1)
      }
    },
    whitespace: {
      "\\/\\/@[^\\n]*\\n": i,
      "@\\s+\\b": "@ ",
      "\\b\\s+@": " @",
      "(\\d)\\s+(\\.\\s*[a-z\\$_\\[(])": "$1 $2",
      "([+-])\\s+([+-])": "$1 $2",
      "\\b\\s+\\$\\s+\\b": " $ ",
      "\\$\\s+\\b": "$ ",
      "\\b\\s+\\$": " $",
      "\\b\\s+\\b": F,
      "\\s+": A
    }
  });
  var o = Base.extend({
    decodeData: function(d) {
      var b = this._data;
      delete this._data;
      return d.replace(o.ENCODED_DATA,
      function(a, c) {
        return b[c]
      })
    },
    encodeData: function(f) {
      var e = this._data = [];
      return Packer.data.exec(f,
      function(a, c, d) {
        var b = "\x01" + e.length + "\x01";
        if (d) {
          b = c + b;
          a = d
        }
        e.push(a);
        return b
      })
    },
    shrink: function(g) {
      g = this.encodeData(g);
      function n(a) {
        return new RegExp(a.source, "g")
      };
      var u = /((catch|do|if|while|with|function)\b[^~{};]*(\(\s*[^{};]*\s*\))\s*)?(\{[^{}]*\})/;
      var G = n(u);
      var x = /\{[^{}]*\}|\[[^\[\]]*\]|\([^\(\)]*\)|~[^~]+~/;
      var H = n(x);
      var D = /~#?(\d+)~/;
      var I = /[a-zA-Z_$][\w\$]*/g;
      var J = /~#(\d+)~/;
      var L = /\bvar\b/g;
      var M = /\bvar\s+[\w$]+[^;#]*|\bfunction\s+[\w$]+/g;
      var N = /\b(var|function)\b|\sin\s+[^;]+/g;
      var O = /\s*=[^,;]*/g;
      var s = [];
      var E = 0;
      function P(a, c, d, b, f) {
        if (!c) c = "";
        if (d == "function") {
          f = b + y(f, J);
          c = c.replace(x, "");
          b = b.slice(1, -1);
          if (b != "_no_shrink_") {
            var e = match(f, M).join(";").replace(L, ";var");
            while (x.test(e)) {
              e = e.replace(H, "")
            }
            e = e.replace(N, "").replace(O, "")
          }
          f = y(f, D);
          if (b != "_no_shrink_") {
            var h = 0,
            C;
            var k = match([b, e], I);
            var l = {};
            for (var r = 0; r < k.length; r++) {
              id = k[r];
              if (!l["#" + id]) {
                l["#" + id] = true;
                id = rescape(id);
                while (new RegExp(o.PREFIX + h + "\\b").test(f)) h++;
                var m = new RegExp("([^\\w$.])" + id + "([^\\w$:])");
                while (m.test(f)) {
                  f = f.replace(n(m), "$1" + o.PREFIX + h + "$2")
                }
                var m = new RegExp("([^{,\\w$.])" + id + ":", "g");
                f = f.replace(m, "$1" + o.PREFIX + h + ":");
                h++
              }
            }
            E = Math.max(E, h)
          }
          var t = c + "~" + s.length + "~";
          s.push(f)
        } else {
          var t = "~#" + s.length + "~";
          s.push(c + f)
        }
        return t
      };
      function y(d, b) {
        while (b.test(d)) {
          d = d.replace(n(b),
          function(a, c) {
            return s[c]
          })
        }
        return d
      };
      while (u.test(g)) {
        g = g.replace(G, P)
      }
      g = y(g, D);
      var z, Q = 0;
      var R = new v(o.SHRUNK,
      function() {
        do z = Packer.encode52(Q++);
        while (new RegExp("[^\\w$.]" + z + "[^\\w$:]").test(g));
        return z
      });
      g = R.encode(g);
      return this.decodeData(g)
    }
  },
  {
    ENCODED_DATA: /\x01(\d+)\x01/g,
    PREFIX: "\x02",
    SHRUNK: /\x02\d+\b/g
  })
};


function js_beautify(js_source_text, indent_size, indent_character, indent_level)
{
    var input, output, token_text, last_type, last_text, last_word, current_mode, modes, indent_string;
    var whitespace, wordchar, punct, parser_pos, line_starters, in_case;
    var prefix, token_type, do_block_just_closed, var_line, var_line_tainted;
    function trim_output()
    {
        while (output.length && (output[output.length - 1] === ' ' || output[output.length - 1] === indent_string)) {
            output.pop();
        }
    }
    function print_newline(ignore_repeated)
    {
        ignore_repeated = typeof ignore_repeated === 'undefined' ? true: ignore_repeated;
        trim_output();
        if (!output.length) {
            return; // no newline on start of file
        }
        if (output[output.length - 1] !== "\n" || !ignore_repeated) {
            output.push("\n");
        }
        for (var i = 0; i < indent_level; i++) {
            output.push(indent_string);
        }
    }
    function print_space()
    {
        var last_output = output.length ? output[output.length - 1] : ' ';
        if (last_output !== ' ' && last_output !== '\n' && last_output !== indent_string) { // prevent occassional duplicate space
            output.push(' ');
        }
    }
    function print_token()
    {
        output.push(token_text);
    }
    function indent()
    {
        indent_level++;
    }
    function unindent()
    {
        if (indent_level) {
            indent_level--;
        }
    }
    function remove_indent()
    {
        if (output.length && output[output.length - 1] === indent_string) {
            output.pop();
        }
    }
    function set_mode(mode)
    {
        modes.push(current_mode);
        current_mode = mode;
    }
    function restore_mode()
    {
        do_block_just_closed = current_mode === 'DO_BLOCK';
        current_mode = modes.pop();
    }
    function in_array(what, arr)
    {
        for (var i = 0; i < arr.length; i++)
        {
            if (arr[i] === what) {
                return true;
            }
        }
        return false;
    }
    function get_next_token()
    {
        var n_newlines = 0;
        var c = '';
        do {
            if (parser_pos >= input.length) {
                return ['', 'TK_EOF'];
            }
            c = input.charAt(parser_pos);
            parser_pos += 1;
            if (c === "\n") {
                n_newlines += 1;
            }
        }
        while (in_array(c, whitespace));
        if (n_newlines > 1) {
            for (var i = 0; i < 2; i++) {
                print_newline(i === 0);
            }
        }
        var wanted_newline = (n_newlines === 1);
        if (in_array(c, wordchar)) {
            if (parser_pos < input.length) {
                while (in_array(input.charAt(parser_pos), wordchar)) {
                    c += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos === input.length) {
                        break;
                    }
                }
            }
            // small and surprisingly unugly hack for 1E-10 representation
            if (parser_pos !== input.length && c.match(/^[0-9]+[Ee]$/) && input.charAt(parser_pos) === '-') {
                parser_pos += 1;
                var t = get_next_token(parser_pos);
                c += '-' + t[0];
                return [c, 'TK_WORD'];
            }
            if (c === 'in') { // hack for 'in' operator
                return [c, 'TK_OPERATOR'];
            }
            return [c, 'TK_WORD'];
        }
        if (c === '(' || c === '[') {
            return [c, 'TK_START_EXPR'];
        }
        if (c === ')' || c === ']') {
            return [c, 'TK_END_EXPR'];
        }
        if (c === '{') {
            return [c, 'TK_START_BLOCK'];
        }
        if (c === '}') {
            return [c, 'TK_END_BLOCK'];
        }
        if (c === ';') {
            return [c, 'TK_END_COMMAND'];
        }
        if (c === '/') {
            var comment = '';
            // peek for comment /* ... */
            if (input.charAt(parser_pos) === '*') {
                parser_pos += 1;
                if (parser_pos < input.length) {
                    while (! (input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/') && parser_pos < input.length) {
                        comment += input.charAt(parser_pos);
                        parser_pos += 1;
                        if (parser_pos >= input.length) {
                            break;
                        }
                    }
                }
                parser_pos += 2;
                return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
            }
            // peek for comment // ...
            if (input.charAt(parser_pos) === '/') {
                comment = c;
                while (input.charAt(parser_pos) !== "\x0d" && input.charAt(parser_pos) !== "\x0a") {
                    comment += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos >= input.length) {
                        break;
                    }
                }
                parser_pos += 1;
                if (wanted_newline) {
                    print_newline();
                }
                return [comment, 'TK_COMMENT'];
            }
        }
        if (c === "'" || // string
        c === '"' || // string
        (c === '/' &&
        ((last_type === 'TK_WORD' && last_text === 'return') || (last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || last_type === 'TK_OPERATOR' || last_type === 'TK_EOF' || last_type === 'TK_END_COMMAND')))) { // regexp
            var sep = c;
            var esc = false;
            c = '';
            if (parser_pos < input.length) {
                while (esc || input.charAt(parser_pos) !== sep) {
                    c += input.charAt(parser_pos);
                    if (!esc) {
                        esc = input.charAt(parser_pos) === '\\';
                    } else {
                        esc = false;
                    }
                    parser_pos += 1;
                    if (parser_pos >= input.length) {
                        break;
                    }
                }
            }
            parser_pos += 1;
            if (last_type === 'TK_END_COMMAND') {
                print_newline();
            }
            return [sep + c + sep, 'TK_STRING'];
        }
        if (in_array(c, punct)) {
            while (parser_pos < input.length && in_array(c + input.charAt(parser_pos), punct)) {
                c += input.charAt(parser_pos);
                parser_pos += 1;
                if (parser_pos >= input.length) {
                    break;
                }
            }
            return [c, 'TK_OPERATOR'];
        }
        return [c, 'TK_UNKNOWN'];
    }
    //----------------------------------
    indent_character = indent_character || ' ';
    indent_size = indent_size || 4;
    indent_string = '';
    while (indent_size--) {
        indent_string += indent_character;
    }
    input = js_source_text;
    last_word = ''; // last 'TK_WORD' passed
    last_type = 'TK_START_EXPR'; // last token type
    last_text = ''; // last token text
    output = [];
    do_block_just_closed = false;
    var_line = false;
    var_line_tainted = false;
    whitespace = "\n\r\t ".split('');
    wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
    punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |='.split(' ');
    // words which should always start on new line.
    line_starters = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');
    // states showing if we are currently in expression (i.e. "if" case) - 'EXPRESSION', or in usual block (like, procedure), 'BLOCK'.
    // some formatting depends on that.
    current_mode = 'BLOCK';
    modes = [current_mode];
    indent_level = indent_level || 0;
    parser_pos = 0; // parser position
    in_case = false; // flag for parser that case/default has been processed, and next colon needs special attention
    while (true) {
        var t = get_next_token(parser_pos);
        token_text = t[0];
        token_type = t[1];
        if (token_type === 'TK_EOF') {
            break;
        }
        switch (token_type) {
        case 'TK_START_EXPR':
            var_line = false;
            set_mode('EXPRESSION');
            if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR') {
                // do nothing on (( and )( and ][ and ]( ..
            } else if (last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
                print_space();
            } else if (in_array(last_word, line_starters) && last_word !== 'function') {
                print_space();
            }
            print_token();
            break;
        case 'TK_END_EXPR':
            print_token();
            restore_mode();
            break;
        case 'TK_START_BLOCK':
            if (last_word === 'do') {
                set_mode('DO_BLOCK');
            } else {
                set_mode('BLOCK');
            }
            if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                if (last_type === 'TK_START_BLOCK') {
                    print_newline();
                } else {
                    print_space();
                }
            }
            print_token();
            indent();
            break;
        case 'TK_END_BLOCK':
            if (last_type === 'TK_START_BLOCK') {
                // nothing
                trim_output();
                unindent();
            } else {
                unindent();
                print_newline();
            }
            print_token();
            restore_mode();
            break;
        case 'TK_WORD':
            if (do_block_just_closed) {
                print_space();
                print_token();
                print_space();
                break;
            }
            if (token_text === 'case' || token_text === 'default') {
                if (last_text === ':') {
                    // switch cases following one another
                    remove_indent();
                } else {
                    // case statement starts in the same line where switch
                    unindent();
                    print_newline();
                    indent();
                }
                print_token();
                in_case = true;
                break;
            }
            prefix = 'NONE';
            if (last_type === 'TK_END_BLOCK') {
                if (!in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                    prefix = 'NEWLINE';
                } else {
                    prefix = 'SPACE';
                    print_space();
                }
            } else if (last_type === 'TK_END_COMMAND' && (current_mode === 'BLOCK' || current_mode === 'DO_BLOCK')) {
                prefix = 'NEWLINE';
            } else if (last_type === 'TK_END_COMMAND' && current_mode === 'EXPRESSION') {
                prefix = 'SPACE';
            } else if (last_type === 'TK_WORD') {
                prefix = 'SPACE';
            } else if (last_type === 'TK_START_BLOCK') {
                prefix = 'NEWLINE';
            } else if (last_type === 'TK_END_EXPR') {
                print_space();
                prefix = 'NEWLINE';
            }
            if (last_type !== 'TK_END_BLOCK' && in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                print_newline();
            } else if (in_array(token_text, line_starters) || prefix === 'NEWLINE') {
                if (last_text === 'else') {
                    // no need to force newline on else break
                    print_space();
                } else if ((last_type === 'TK_START_EXPR' || last_text === '=') && token_text === 'function') {
                    // no need to force newline on 'function': (function
                    // DONOTHING
                } else if (last_type === 'TK_WORD' && (last_text === 'return' || last_text === 'throw')) {
                    // no newline between 'return nnn'
                    print_space();
                } else if (last_type !== 'TK_END_EXPR') {
                    if ((last_type !== 'TK_START_EXPR' || token_text !== 'var') && last_text !== ':') {
                        // no need to force newline on 'var': for (var x = 0...)
                        if (token_text === 'if' && last_type === 'TK_WORD' && last_word === 'else') {
                            // no newline for } else if {
                            print_space();
                        } else {
                            print_newline();
                        }
                    }
                } else {
                    if (in_array(token_text, line_starters) && last_text !== ')') {
                        print_newline();
                    }
                }
            } else if (prefix === 'SPACE') {
                print_space();
            }
            print_token();
            last_word = token_text;
            if (token_text === 'var') {
                var_line = true;
                var_line_tainted = false;
            }
            break;
        case 'TK_END_COMMAND':
            print_token();
            var_line = false;
            break;
        case 'TK_STRING':
            if (last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK') {
                print_newline();
            } else if (last_type === 'TK_WORD') {
                print_space();
            }
            print_token();
            break;
        case 'TK_OPERATOR':
            var start_delim = true;
            var end_delim = true;
            if (var_line && token_text !== ',') {
                var_line_tainted = true;
                if (token_text === ':') {
                    var_line = false;
                }
            }
            if (token_text === ':' && in_case) {
                print_token(); // colon really asks for separate treatment
                print_newline();
                break;
            }
            in_case = false;
            if (token_text === ',') {
                if (var_line) {
                    if (var_line_tainted) {
                        print_token();
                        print_newline();
                        var_line_tainted = false;
                    } else {
                        print_token();
                        print_space();
                    }
                } else if (last_type === 'TK_END_BLOCK') {
                    print_token();
                    print_newline();
                } else {
                    if (current_mode === 'BLOCK') {
                        print_token();
                        print_newline();
                    } else {
                        // EXPR od DO_BLOCK
                        print_token();
                        print_space();
                    }
                }
                break;
            } else if (token_text === '--' || token_text === '++') { // unary operators special case
                if (last_text === ';') {
                    // space for (;; ++i)
                    start_delim = true;
                    end_delim = false;
                } else {
                    start_delim = false;
                    end_delim = false;
                }
            } else if (token_text === '!' && last_type === 'TK_START_EXPR') {
                // special case handling: if (!a)
                start_delim = false;
                end_delim = false;
            } else if (last_type === 'TK_OPERATOR') {
                start_delim = false;
                end_delim = false;
            } else if (last_type === 'TK_END_EXPR') {
                start_delim = true;
                end_delim = true;
            } else if (token_text === '.') {
                // decimal digits or object.property
                start_delim = false;
                end_delim = false;
            } else if (token_text === ':') {
                // zz: xx
                // can't differentiate ternary op, so for now it's a ? b: c; without space before colon
                if (last_text.match(/^\d+$/)) {
                    // a little help for ternary a ? 1 : 0;
                    start_delim = true;
                } else {
                    start_delim = false;
                }
            }
            if (start_delim) {
                print_space();
            }
            print_token();
            if (end_delim) {
                print_space();
            }
            break;
        case 'TK_BLOCK_COMMENT':
            print_newline();
            print_token();
            print_newline();
            break;
        case 'TK_COMMENT':
            // print_newline();
            print_space();
            print_token();
            print_newline();
            break;
        case 'TK_UNKNOWN':
            print_token();
            break;
        }
        last_type = token_type;
        last_text = token_text;
    }
    return output.join('');
}


function style_html(html_source, indent_size, indent_character, max_char) {
//Wrapper function to invoke all the necessary constructors and deal with the output.
  var Parser, multi_parser;
  function Parser() {
    this.pos = 0; //Parser position
    this.token = '';
    this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
    this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
      parent: 'parent1',
      parentcount: 1,
      parent1: ''
    };
    this.tag_type = '';
    this.token_text = this.last_token = this.last_text = this.token_type = '';
    this.Utils = { //Uilities made available to the various functions
      whitespace: "\n\r\t ".split(''),
      single_token: 'br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed'.split(','), //all the single tags for HTML
      extra_liners: 'head,body,/html'.split(','), //for tags that need a line of whitespace before them
      in_array: function (what, arr) {
        for (var i=0; i<arr.length; i++) {
          if (what === arr[i]) {
            return true;
          }
        }
        return false;
      }
    }
    this.get_content = function () { //function to capture regular content between tags
      var char = '';
      var content = [];
      var space = false; //if a space is needed
      while (this.input.charAt(this.pos) !== '<') {
        if (this.pos >= this.input.length) {
          return content.length?content.join(''):['', 'TK_EOF'];
        }
        char = this.input.charAt(this.pos);
        this.pos++;
        this.line_char_count++;
        if (this.Utils.in_array(char, this.Utils.whitespace)) {
          if (content.length) {
            space = true;
          }
          this.line_char_count--;
          continue; //don't want to insert unnecessary space
        }
        else if (space) {
          if (this.line_char_count >= this.max_char) { //insert a line when the max_char is reached
            content.push('\n');
            for (var i=0; i<this.indent_level; i++) {
              content.push(this.indent_string);
            }
            this.line_char_count = 0;
          }
          else{
            content.push(' ');
            this.line_char_count++;
          }
          space = false;
        }
        content.push(char); //letter at-a-time (or string) inserted to an array
      }
      return content.length?content.join(''):'';
    }
    this.get_script = function () { //get the full content of a script to pass to js_beautify
      var char = '';
      var content = [];
      var reg_match = new RegExp('\<\/script' + '\>', 'igm');
      reg_match.lastIndex = this.pos;
      var reg_array = reg_match.exec(this.input);
      var end_script = reg_array?reg_array.index:this.input.length; //absolute end of script
      while(this.pos < end_script) { //get everything in between the script tags
        if (this.pos >= this.input.length) {
          return content.length?content.join(''):['', 'TK_EOF'];
        }
        char = this.input.charAt(this.pos);
        this.pos++;
        content.push(char);
      }
      return content.length?content.join(''):''; //we might not have any content at all
    }
    this.record_tag = function (tag){ //function to record a tag and its parent in this.tags Object
      if (this.tags[tag + 'count']) { //check for the existence of this tag type
        this.tags[tag + 'count']++;
        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
      }
      else { //otherwise initialize this tag type
        this.tags[tag + 'count'] = 1;
        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
      }
      this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
      this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
    }
    this.retrieve_tag = function (tag) { //function to retrieve the opening tag to the corresponding closer
      if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
        var temp_parent = this.tags.parent; //check to see if it's a closable tag.
        while (temp_parent) { //till we reach '' (the initial value);
          if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
            break;
          }
          temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
        }
        if (temp_parent) { //if we caught something
          this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
          this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
        }
        delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
        delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
        if (this.tags[tag + 'count'] == 1) {
          delete this.tags[tag + 'count'];
        }
        else {
          this.tags[tag + 'count']--;
        }
      }
    }
    this.get_tag = function () { //function to get a full tag and parse its type
      var char = '';
      var content = [];
      var space = false;
      do {
        if (this.pos >= this.input.length) {
          return content.length?content.join(''):['', 'TK_EOF'];
        }
        char = this.input.charAt(this.pos);
        this.pos++;
        this.line_char_count++;
        if (this.Utils.in_array(char, this.Utils.whitespace)) { //don't want to insert unnecessary space
          space = true;
          this.line_char_count--;
          continue;
        }
        if (char === "'" || char === '"') {
          if (!content[1] || content[1] !== '!') { //if we're in a comment strings don't get treated specially
            char += this.get_unformatted(char);
            space = true;
          }
        }
        if (char === '=') { //no space before =
          space = false;
        }
        if (content.length && content[content.length-1] !== '=' && char !== '>'
            && space) { //no space after = or before >
          if (this.line_char_count >= this.max_char) {
            this.print_newline(false, content);
            this.line_char_count = 0;
          }
          else {
            content.push(' ');
            this.line_char_count++;
          }
          space = false;
        }
        content.push(char); //inserts character at-a-time (or string)
      } while (char !== '>');
      var tag_complete = content.join('');
      var tag_index;
      if (tag_complete.indexOf(' ') != -1) { //if there's whitespace, thats where the tag name ends
        tag_index = tag_complete.indexOf(' ');
      }
      else { //otherwise go with the tag ending
        tag_index = tag_complete.indexOf('>');
      }
      var tag_check = tag_complete.substring(1, tag_index).toLowerCase();
      if (tag_complete.charAt(tag_complete.length-2) === '/' ||
          this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
        this.tag_type = 'SINGLE';
      }
      else if (tag_check === 'script') { //for later script handling
        this.record_tag(tag_check);
        this.tag_type = 'SCRIPT';
      }
      else if (tag_check === 'style') { //for future style handling (for now it justs uses get_content)
        this.record_tag(tag_check);
        this.tag_type = 'STYLE';
      }
      else if (tag_check.charAt(0) === '!') { //peek for <!-- comment
        if (tag_check.indexOf('[if') != -1) { //peek for <!--[if conditional comment
          if (tag_complete.indexOf('!IE') != -1) { //this type needs a closing --> so...
            var comment = this.get_unformatted('-->', tag_complete); //...delegate to get_unformatted
            content.push(comment);
          }
          this.tag_type = 'START';
        }
        else if (tag_check.indexOf('[endif') != -1) {//peek for <!--[endif end conditional comment
          this.tag_type = 'END';
          this.unindent();
        }
        else if (tag_check.indexOf('[cdata[') != -1) { //if it's a <[cdata[ comment...
          var comment = this.get_unformatted(']]>', tag_complete); //...delegate to get_unformatted function
          content.push(comment);
          this.tag_type = 'SINGLE'; //<![CDATA[ comments are treated like single tags
        }
        else {
          var comment = this.get_unformatted('-->', tag_complete);
          content.push(comment);
          this.tag_type = 'SINGLE';
        }
      }
      else {
        if (tag_check.charAt(0) === '/') { //this tag is a double tag so check for tag-ending
          this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
          this.tag_type = 'END';
        }
        else { //otherwise it's a start-tag
          this.record_tag(tag_check); //push it on the tag stack
          this.tag_type = 'START';
        }
        if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
          this.print_newline(true, this.output);
        }
      }
      return content.join(''); //returns fully formatted tag
    }
    this.get_unformatted = function (delimiter, orig_tag) { //function to return unformatted content in its entirety
      if (orig_tag && orig_tag.indexOf(delimiter) != -1) {
        return '';
      }
      var char = '';
      var content = '';
      var space = true;
      do {
        char = this.input.charAt(this.pos);
        this.pos++
        if (this.Utils.in_array(char, this.Utils.whitespace)) {
          if (!space) {
            this.line_char_count--;
            continue;
          }
          if (char === '\n' || char === '\r') {
            content += '\n';
            for (var i=0; i<this.indent_level; i++) {
              content += this.indent_string;
            }
            space = false; //...and make sure other indentation is erased
            this.line_char_count = 0;
            continue;
          }
        }
        content += char;
        this.line_char_count++;
        space = true;
      } while (content.indexOf(delimiter) == -1);
      return content;
    }
    this.get_token = function () { //initial handler for token-retrieval
      var token;
      if (this.last_token === 'TK_TAG_SCRIPT') { //check if we need to format javascript
        var temp_token = this.get_script();
        if (typeof temp_token !== 'string') {
          return temp_token;
        }
        token = js_beautify(temp_token, this.indent_size, this.indent_character, this.indent_level); //call the JS Beautifier
        return [token, 'TK_CONTENT'];
      }
      if (this.current_mode === 'CONTENT') {
        token = this.get_content();
        if (typeof token !== 'string') {
          return token;
        }
        else {
          return [token, 'TK_CONTENT'];
        }
      }
      if(this.current_mode === 'TAG') {
        token = this.get_tag();
        if (typeof token !== 'string') {
          return token;
        }
        else {
          var tag_name_type = 'TK_TAG_' + this.tag_type;
          return [token, tag_name_type];
        }
      }
    }
    this.printer = function (js_source, indent_character, indent_size, max_char) { //handles input/output and some other printing functions
      this.input = js_source || ''; //gets the input for the Parser
      this.output = [];
      this.indent_character = indent_character || ' ';
      this.indent_string = '';
      this.indent_size = indent_size || 2;
      this.indent_level = 0;
      this.max_char = max_char || 70; //maximum amount of characters per line
      this.line_char_count = 0; //count to see if max_char was exceeded
      for (var i=0; i<this.indent_size; i++) {
        this.indent_string += this.indent_character;
      }
      this.print_newline = function (ignore, arr) {
        this.line_char_count = 0;
        if (!arr || !arr.length) {
          return;
        }
        if (!ignore) { //we might want the extra line
          while (this.Utils.in_array(arr[arr.length-1], this.Utils.whitespace)) {
            arr.pop();
          }
        }
        arr.push('\n');
        for (var i=0; i<this.indent_level; i++) {
          arr.push(this.indent_string);
        }
      }
      this.print_token = function (text) {
        this.output.push(text);
      }
      this.indent = function () {
        this.indent_level++;
      }
      this.unindent = function () {
        if (this.indent_level > 0) {
          this.indent_level--;
        }
      }
    }
    return this;
  }
  /*_____________________--------------------_____________________*/
  multi_parser = new Parser(); //wrapping functions Parser
  multi_parser.printer(html_source, indent_character, indent_size); //initialize starting values
  while (true) {
      var t = multi_parser.get_token();
      multi_parser.token_text = t[0];
      multi_parser.token_type = t[1];
    if (multi_parser.token_type === 'TK_EOF') {
      break;
    }
    switch (multi_parser.token_type) {
      case 'TK_TAG_START': case 'TK_TAG_SCRIPT': case 'TK_TAG_STYLE':
        multi_parser.print_newline(false, multi_parser.output);
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.indent();
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_TAG_END':
        multi_parser.print_newline(true, multi_parser.output);
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_TAG_SINGLE':
        multi_parser.print_newline(false, multi_parser.output);
        multi_parser.print_token(multi_parser.token_text);
        multi_parser.current_mode = 'CONTENT';
        break;
      case 'TK_CONTENT':
        if (multi_parser.token_text !== '') {
          multi_parser.print_newline(false, multi_parser.output);
          multi_parser.print_token(multi_parser.token_text);
        }
        multi_parser.current_mode = 'TAG';
        break;
    }
    multi_parser.last_token = multi_parser.token_type;
    multi_parser.last_text = multi_parser.token_text;
  }
  return multi_parser.output.join('');
}
var CSSPacker = {
    format: function (s) {//格式化代码
        s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
        s = s.replace(/;\s*;/g, ";"); 
        s = s.replace(/\,[\s\.\#\d]*{/g, "{");
        s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
        s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
        s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
        return s;
    },
    pack: function (s) {//高级
        s = s.replace(/\/\*(.|\n)*?\*\//g, ""); 
        s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
        s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); 
        s = s.replace(/;\s*;/g, ";");
        s = s.replace(/;\s*}/g, "}"); 
        s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
        return (s == null) ? "" : s[1];
    },
    packNor: function (s) {//普通
        s = s.replace(/\/\*(.|\n)*?\*\//g, ""); 
        s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
        s = s.replace(/\,[\s\.\#\d]*\{/g, "{");
        s = s.replace(/;\s*;/g, ";"); 
        s = s.replace(/;\s*}/g, "}"); 
        s = s.replace(/([^\s])\{([^\s])/g, "$1{$2");
        s = s.replace(/([^\s])\}([^\n]s*)/g, "$1}\n$2");
        return s;
    }
}