/*!
 * @license
 *
 * Scandit Barcode Scanner SDK for the Web
 * v. 4.6.1
 *
 * Copyright © 2019 Scandit AG. All Rights Reserved.
 *
 * The use of this software is governed by the Scandit Terms and Conditions.
 * https://ssl.scandit.com/terms/test.pdf
 *
 * The following sets forth attribution notices for third party software that may be contained in portions of the product.
 * https://docs.scandit.com/stable/web/LICENSE
 */
function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === "undefined") {
    return;
  }

  var style = document.createElement("style");

  style.setAttribute("type", "text/css");
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it) {
  return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function(TO_STRING) {
  return function(that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING
        ? s.charAt(i)
        : a
      : TO_STRING
      ? s.slice(i, i + 2)
      : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var commonjsGlobal =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : typeof self !== "undefined"
    ? self
    : {};

function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs");
}

function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

function createCommonjsModule(fn, module) {
  return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function(module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = (module.exports =
    typeof window != "undefined" && window.Math == Math
      ? window
      : typeof self != "undefined" && self.Math == Math
      ? self
      : // eslint-disable-next-line no-new-func
        Function("return this")());
  if (typeof __g == "number") __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function(module) {
  var core = (module.exports = { version: "2.6.10" });
  if (typeof __e == "number") __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _aFunction = function(it) {
  if (typeof it != "function") throw TypeError(it + " is not a function!");
  return it;
};

// optional / simple context binding

var _ctx = function(fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function(a) {
        return fn.call(that, a);
      };
    case 2:
      return function(a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function(a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function(/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function(it) {
  return typeof it === "object" ? it !== null : typeof it === "function";
};

var _anObject = function(it) {
  if (!_isObject(it)) throw TypeError(it + " is not an object!");
  return it;
};

var _fails = function(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function() {
  return (
    Object.defineProperty({}, "a", {
      get: function() {
        return 7;
      }
    }).a != 7
  );
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function(it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine =
  !_descriptors &&
  !_fails(function() {
    return (
      Object.defineProperty(_domCreate("div"), "a", {
        get: function() {
          return 7;
        }
      }).a != 7
    );
  });

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == "function" && !_isObject((val = fn.call(it)))) return val;
  if (typeof (fn = it.valueOf) == "function" && !_isObject((val = fn.call(it)))) return val;
  if (!S && typeof (fn = it.toString) == "function" && !_isObject((val = fn.call(it)))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors
  ? Object.defineProperty
  : function defineProperty(O, P, Attributes) {
      _anObject(O);
      P = _toPrimitive(P, true);
      _anObject(Attributes);
      if (_ie8DomDefine)
        try {
          return dP(O, P, Attributes);
        } catch (e) {
          /* empty */
        }
      if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
      if ("value" in Attributes) O[P] = Attributes.value;
      return O;
    };

var _objectDp = {
  f: f
};

var _propertyDesc = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors
  ? function(object, key, value) {
      return _objectDp.f(object, key, _propertyDesc(1, value));
    }
  : function(object, key, value) {
      object[key] = value;
      return object;
    };

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key) {
  return hasOwnProperty.call(it, key);
};

var PROTOTYPE = "prototype";

var $export = function(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] =
      IS_GLOBAL && typeof target[key] != "function"
        ? source[key]
        : // bind timers to global for call from export context
        IS_BIND && own
        ? _ctx(out, _global)
        : // wrap global constructors for prevent change them in library
        IS_WRAP && target[key] == out
        ? (function(C) {
            var F = function(a, b, c) {
              if (this instanceof C) {
                switch (arguments.length) {
                  case 0:
                    return new C();
                  case 1:
                    return new C(a);
                  case 2:
                    return new C(a, b);
                }
                return new C(a, b, c);
              }
              return C.apply(this, arguments);
            };
            F[PROTOTYPE] = C[PROTOTYPE];
            return F;
            // make static versions for prototype methods
          })(out)
        : IS_PROTO && typeof out == "function"
        ? _ctx(Function.call, out)
        : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var _redefine = _hide;

var _iterators = {};

var toString = {}.toString;

var _cof = function(it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object("z").propertyIsEnumerable(0)
  ? Object
  : function(it) {
      return _cof(it) == "String" ? it.split("") : Object(it);
    };

// to indexed object, toObject with fallback for non-array-like ES3 strings

var _toIobject = function(it) {
  return _iobject(_defined(it));
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function(it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function(index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes

var _arrayIncludes = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      }
    else
      for (; length > index; index++)
        if (IS_INCLUDES || index in O) {
          if (O[index] === el) return IS_INCLUDES || index || 0;
        }
    return !IS_INCLUDES && -1;
  };
};

var _shared = createCommonjsModule(function(module) {
  var SHARED = "__core-js_shared__";
  var store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function(key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })("versions", []).push({
    version: _core.version,
    mode: "pure",
    copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
  });
});

var id = 0;
var px = Math.random();
var _uid = function(key) {
  return "Symbol(".concat(key === undefined ? "" : key, ")_", (++id + px).toString(36));
};

var shared = _shared("keys");

var _sharedKey = function(key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey("IE_PROTO");

var _objectKeysInternal = function(object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i)
    if (_has(O, (key = names[i++]))) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
  ","
);

// 19.1.2.14 / 15.2.3.14 Object.keys(O)

var _objectKeys =
  Object.keys ||
  function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

var _objectDps = _descriptors
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
      _anObject(O);
      var keys = _objectKeys(Properties);
      var length = keys.length;
      var i = 0;
      var P;
      while (length > i) _objectDp.f(O, (P = keys[i++]), Properties[P]);
      return O;
    };

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])

var IE_PROTO$1 = _sharedKey("IE_PROTO");
var Empty = function() {
  /* empty */
};
var PROTOTYPE$1 = "prototype";

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate("iframe");
  var i = _enumBugKeys.length;
  var lt = "<";
  var gt = ">";
  var iframeDocument;
  iframe.style.display = "none";
  _html.appendChild(iframe);
  iframe.src = "javascript:"; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
  };

var _wks = createCommonjsModule(function(module) {
  var store = _shared("wks");

  var Symbol = _global.Symbol;
  var USE_SYMBOL = typeof Symbol == "function";

  var $exports = (module.exports = function(name) {
    return (
      store[name] || (store[name] = (USE_SYMBOL && Symbol[name]) || (USE_SYMBOL ? Symbol : _uid)("Symbol." + name))
    );
  });

  $exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks("toStringTag");

var _setToStringTag = function(it, tag, stat) {
  if (it && !_has((it = stat ? it : it.prototype), TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks("iterator"), function() {
  return this;
});

var _iterCreate = function(Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + " Iterator");
};

// 7.1.13 ToObject(argument)

var _toObject = function(it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)

var IE_PROTO$2 = _sharedKey("IE_PROTO");
var ObjectProto = Object.prototype;

var _objectGpo =
  Object.getPrototypeOf ||
  function(O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
    if (typeof O.constructor == "function" && O instanceof O.constructor) {
      return O.constructor.prototype;
    }
    return O instanceof Object ? ObjectProto : null;
  };

var ITERATOR = _wks("iterator");
var BUGGY = !([].keys && "next" in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = "@@iterator";
var KEYS = "keys";
var VALUES = "values";

var returnThis = function() {
  return this;
};

var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }
    return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + " Iterator";
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT]);
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? (!DEF_VALUES ? $default : getMethod("entries")) : undefined;
  var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if (FORCED && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED)
      for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      }
    else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(
  String,
  "String",
  function(iterated) {
    this._t = String(iterated); // target
    this._i = 0; // next index
    // 21.1.5.2.1 %StringIteratorPrototype%.next()
  },
  function() {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return { value: undefined, done: true };
    point = $at(O, index);
    this._i += point.length;
    return { value: point, done: false };
  }
);

var _iterStep = function(done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(
  Array,
  "Array",
  function(iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0; // next index
    this._k = kind; // kind
    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  },
  function() {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }
    if (kind == "keys") return _iterStep(0, index);
    if (kind == "values") return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  },
  "values"
);

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks("toStringTag");

var DOMIterables = (
  "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList," +
  "DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement," +
  "MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList," +
  "SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList," +
  "TextTrackList,TouchList"
).split(",");

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks("toStringTag");
// ES3 wrong here
var ARG =
  _cof(
    (function() {
      return arguments;
    })()
  ) == "Arguments";

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key) {
  try {
    return it[key];
  } catch (e) {
    /* empty */
  }
};

var _classof = function(it) {
  var O, T, B;
  return it === undefined
    ? "Undefined"
    : it === null
    ? "Null"
    : // @@toStringTag case
    typeof (T = tryGet((O = Object(it)), TAG$1)) == "string"
    ? T
    : // builtinTag case
    ARG
    ? _cof(O)
    : // ES3 arguments fallback
    (B = _cof(O)) == "Object" && typeof O.callee == "function"
    ? "Arguments"
    : B;
};

var _anInstance = function(it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ": incorrect invocation!");
  }
  return it;
};

// call something on iterator step with safe closing on error

var _iterCall = function(iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator["return"];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks("iterator");
var ArrayProto = Array.prototype;

var _isArrayIter = function(it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var ITERATOR$2 = _wks("iterator");

var core_getIteratorMethod = (_core.getIteratorMethod = function(it) {
  if (it != undefined) return it[ITERATOR$2] || it["@@iterator"] || _iterators[_classof(it)];
});

var _forOf = createCommonjsModule(function(module) {
  var BREAK = {};
  var RETURN = {};
  var exports = (module.exports = function(iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR
      ? function() {
          return iterable;
        }
      : core_getIteratorMethod(iterable);
    var f = _ctx(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != "function") throw TypeError(iterable + " is not iterable!");
    // fast case for arrays with default iterator
    if (_isArrayIter(iterFn))
      for (length = _toLength(iterable.length); length > index; index++) {
        result = entries ? f(_anObject((step = iterable[index]))[0], step[1]) : f(iterable[index]);
        if (result === BREAK || result === RETURN) return result;
      }
    else
      for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
        result = _iterCall(iterator, f, step.value, entries);
        if (result === BREAK || result === RETURN) return result;
      }
  });
  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)

var SPECIES = _wks("species");
var _speciesConstructor = function(O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function(fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0:
      return un ? fn() : fn.call(that);
    case 1:
      return un ? fn(args[0]) : fn.call(that, args[0]);
    case 2:
      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
    case 3:
      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
    case 4:
      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
  }
  return fn.apply(that, args);
};

var process = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = "onreadystatechange";
var defer, channel, port;
var run = function() {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function() {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == "function" ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process) == "process") {
    defer = function(id) {
      process.nextTick(_ctx(run, id, 1));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function(id) {
      Dispatch.now(_ctx(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == "function" && !_global.importScripts) {
    defer = function(id) {
      _global.postMessage(id + "", "*");
    };
    _global.addEventListener("message", listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate("script")) {
    defer = function(id) {
      _html.appendChild(_domCreate("script"))[ONREADYSTATECHANGE] = function() {
        _html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function(id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};

var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$1 = _global.process;
var Promise$1 = _global.Promise;
var isNode = _cof(process$1) == "process";

var _microtask = function() {
  var head, last, notify;

  var flush = function() {
    var parent, fn;
    if (isNode && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    }
    last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function() {
      process$1.nextTick(flush);
    };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode("");
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function() {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise$1.resolve(undefined);
    notify = function() {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function(fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    }
    last = task;
  };
};

// 25.4.1.5 NewPromiseCapability(C)

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError("Bad Promise constructor");
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

var f$1 = function(C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
  f: f$1
};

var _perform = function(exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

var navigator$1 = _global.navigator;

var _userAgent = (navigator$1 && navigator$1.userAgent) || "";

var _promiseResolve = function(C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var _redefineAll = function(target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  }
  return target;
};

var SPECIES$1 = _wks("species");

var _setSpecies = function(KEY) {
  var C = typeof _core[KEY] == "function" ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES$1])
    _objectDp.f(C, SPECIES$1, {
      configurable: true,
      get: function() {
        return this;
      }
    });
};

var ITERATOR$3 = _wks("iterator");
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter["return"] = function() {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function() {
    throw 2;
  });
} catch (e) {
  /* empty */
}

var _iterDetect = function(exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function() {
      return { done: (safe = true) };
    };
    arr[ITERATOR$3] = function() {
      return iter;
    };
    exec(arr);
  } catch (e) {
    /* empty */
  }
  return safe;
};

var task = _task.set;
var microtask = _microtask();

var PROMISE = "Promise";
var TypeError$1 = _global.TypeError;
var process$2 = _global.process;
var versions = process$2 && process$2.versions;
var v8 = (versions && versions.v8) || "";
var $Promise = _global[PROMISE];
var isNode$1 = _classof(process$2) == "process";
var empty = function() {
  /* empty */
};
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = (newGenericPromiseCapability = _newPromiseCapability.f);

var USE_NATIVE = !!(function() {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = ((promise.constructor = {})[_wks("species")] = function(exec) {
      exec(empty, empty);
    });
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (
      (isNode$1 || typeof PromiseRejectionEvent == "function") &&
      promise.then(empty) instanceof FakePromise &&
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      v8.indexOf("6.6") !== 0 &&
      _userAgent.indexOf("Chrome/66") === -1
    );
  } catch (e) {
    /* empty */
  }
})();

// helpers
var isThenable = function(it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == "function" ? then : false;
};
var notify = function(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function() {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1("Promise-chain cycle"));
          } else if ((then = isThenable(result))) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function(promise) {
  task.call(_global, function() {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = _perform(function() {
        if (isNode$1) {
          process$2.emit("unhandledRejection", value, promise);
        } else if ((handler = _global.onunhandledrejection)) {
          handler({ promise: promise, reason: value });
        } else if ((console = _global.console) && console.error) {
          console.error("Unhandled promise rejection", value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    }
    promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function(promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function(promise) {
  task.call(_global, function() {
    var handler;
    if (isNode$1) {
      process$2.emit("rejectionHandled", promise);
    } else if ((handler = _global.onrejectionhandled)) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if ((then = isThenable(value))) {
      microtask(function() {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    _anInstance(this, $Promise, PROMISE, "_h");
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions
    this._a = undefined; // <- checked in isUnhandled reactions
    this._s = 0; // <- state
    this._d = false; // <- done
    this._v = undefined; // <- value
    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false; // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == "function" ? onFulfilled : true;
      reaction.fail = typeof onRejected == "function" && onRejected;
      reaction.domain = isNode$1 ? process$2.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    catch: function(onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * _library, PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve(this === Wrapper ? $Promise : this, x);
  }
});
_export(
  _export.S +
    _export.F *
      !(
        USE_NATIVE &&
        _iterDetect(function(iter) {
          $Promise.all(iter)["catch"](empty);
        })
      ),
  PROMISE,
  {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = _perform(function() {
        var values = [];
        var index = 0;
        var remaining = 1;
        _forOf(iterable, false, function(promise) {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function(value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.e) reject(result.v);
      return capability.promise;
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = _perform(function() {
        _forOf(iterable, false, function(promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    }
  }
);

_export(_export.P + _export.R, "Promise", {
  finally: function(onFinally) {
    var C = _speciesConstructor(this, _core.Promise || _global.Promise);
    var isFunction = typeof onFinally == "function";
    return this.then(
      isFunction
        ? function(x) {
            return _promiseResolve(C, onFinally()).then(function() {
              return x;
            });
          }
        : onFinally,
      isFunction
        ? function(e) {
            return _promiseResolve(C, onFinally()).then(function() {
              throw e;
            });
          }
        : onFinally
    );
  }
});

// https://github.com/tc39/proposal-promise-try

_export(_export.S, "Promise", {
  try: function(callbackfn) {
    var promiseCapability = _newPromiseCapability.f(this);
    var result = _perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  }
});

var promise = _core.Promise;

var promise$1 = promise;

!(function() {
  if ("undefined" != typeof window) {
    var t = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
      n = !!t && 16 <= parseInt(t[1], 10);
    if (!("objectFit" in document.documentElement.style != !1) || n) {
      var o = function(t, e, i) {
          var n, o, l, a, d;
          if (((i = i.split(" ")).length < 2 && (i[1] = i[0]), "x" === t))
            (n = i[0]), (o = i[1]), (l = "left"), (a = "right"), (d = e.clientWidth);
          else {
            if ("y" !== t) return;
            (n = i[1]), (o = i[0]), (l = "top"), (a = "bottom"), (d = e.clientHeight);
          }
          if (n !== l && o !== l) {
            if (n !== a && o !== a)
              return "center" === n || "50%" === n
                ? ((e.style[l] = "50%"), void (e.style["margin-" + l] = d / -2 + "px"))
                : void (0 <= n.indexOf("%")
                    ? (n = parseInt(n)) < 50
                      ? ((e.style[l] = n + "%"), (e.style["margin-" + l] = d * (n / -100) + "px"))
                      : ((n = 100 - n), (e.style[a] = n + "%"), (e.style["margin-" + a] = d * (n / -100) + "px"))
                    : (e.style[l] = n));
            e.style[a] = "0";
          } else e.style[l] = "0";
        },
        l = function(t) {
          var e = t.dataset ? t.dataset.objectFit : t.getAttribute("data-object-fit"),
            i = t.dataset ? t.dataset.objectPosition : t.getAttribute("data-object-position");
          (e = e || "cover"), (i = i || "50% 50%");
          var n = t.parentNode;
          return (
            (function(t) {
              var e = window.getComputedStyle(t, null),
                i = e.getPropertyValue("position"),
                n = e.getPropertyValue("overflow"),
                o = e.getPropertyValue("display");
              (i && "static" !== i) || (t.style.position = "relative"),
                "hidden" !== n && (t.style.overflow = "hidden"),
                (o && "inline" !== o) || (t.style.display = "block"),
                0 === t.clientHeight && (t.style.height = "100%"),
                -1 === t.className.indexOf("object-fit-polyfill") &&
                  (t.className = t.className + " object-fit-polyfill");
            })(n),
            (function(t) {
              var e = window.getComputedStyle(t, null),
                i = {
                  "max-width": "none",
                  "max-height": "none",
                  "min-width": "0px",
                  "min-height": "0px",
                  top: "auto",
                  right: "auto",
                  bottom: "auto",
                  left: "auto",
                  "margin-top": "0px",
                  "margin-right": "0px",
                  "margin-bottom": "0px",
                  "margin-left": "0px"
                };
              for (var n in i) e.getPropertyValue(n) !== i[n] && (t.style[n] = i[n]);
            })(t),
            (t.style.position = "absolute"),
            (t.style.width = "auto"),
            (t.style.height = "auto"),
            "scale-down" === e &&
              (e = t.clientWidth < n.clientWidth && t.clientHeight < n.clientHeight ? "none" : "contain"),
            "none" === e
              ? (o("x", t, i), void o("y", t, i))
              : "fill" === e
              ? ((t.style.width = "100%"), (t.style.height = "100%"), o("x", t, i), void o("y", t, i))
              : ((t.style.height = "100%"),
                void (("cover" === e && t.clientWidth > n.clientWidth) ||
                ("contain" === e && t.clientWidth < n.clientWidth)
                  ? ((t.style.top = "0"), (t.style.marginTop = "0"), o("x", t, i))
                  : ((t.style.width = "100%"),
                    (t.style.height = "auto"),
                    (t.style.left = "0"),
                    (t.style.marginLeft = "0"),
                    o("y", t, i))))
          );
        },
        e = function(t) {
          if (void 0 === t || t instanceof Event) t = document.querySelectorAll("[data-object-fit]");
          else if (t && t.nodeName) t = [t];
          else {
            if ("object" != typeof t || !t.length || !t[0].nodeName) return !1;
            t = t;
          }
          for (var e = 0; e < t.length; e++)
            if (t[e].nodeName) {
              var i = t[e].nodeName.toLowerCase();
              if ("img" === i) {
                if (n) continue;
                t[e].complete
                  ? l(t[e])
                  : t[e].addEventListener("load", function() {
                      l(this);
                    });
              } else
                "video" === i
                  ? 0 < t[e].readyState
                    ? l(t[e])
                    : t[e].addEventListener("loadedmetadata", function() {
                        l(this);
                      })
                  : l(t[e]);
            }
          return !0;
        };
      "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", e) : e(),
        window.addEventListener("resize", e),
        (window.objectFitPolyfill = e);
    } else
      window.objectFitPolyfill = function() {
        return !1;
      };
  }
})();

var adapter_no_edge_no_global = createCommonjsModule(function(module) {
  (function() {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof commonjsRequire && commonjsRequire;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw ((a.code = "MODULE_NOT_FOUND"), a);
          }
          var p = (n[i] = { exports: {} });
          e[i][0].call(
            p.exports,
            function(r) {
              var n = e[i][1][r];
              return o(n || r);
            },
            p,
            p.exports,
            r,
            e,
            n,
            t
          );
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  })()(
    {
      1: [
        function(require, module, exports) {
          var _adapter_factory = require("./adapter_factory.js");

          var adapter = (0, _adapter_factory.adapterFactory)({ window: window });
          module.exports = adapter; // this is the difference from adapter_core.
        },
        { "./adapter_factory.js": 2 }
      ],
      2: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.adapterFactory = adapterFactory;

          var _utils = require("./utils");

          var utils = _interopRequireWildcard(_utils);

          var _chrome_shim = require("./chrome/chrome_shim");

          var chromeShim = _interopRequireWildcard(_chrome_shim);

          var _edge_shim = require("./edge/edge_shim");

          var edgeShim = _interopRequireWildcard(_edge_shim);

          var _firefox_shim = require("./firefox/firefox_shim");

          var firefoxShim = _interopRequireWildcard(_firefox_shim);

          var _safari_shim = require("./safari/safari_shim");

          var safariShim = _interopRequireWildcard(_safari_shim);

          var _common_shim = require("./common_shim");

          var commonShim = _interopRequireWildcard(_common_shim);

          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            } else {
              var newObj = {};
              if (obj != null) {
                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
              }
              newObj.default = obj;
              return newObj;
            }
          }

          // Shimming starts here.
          /*
           *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
           *
           *  Use of this source code is governed by a BSD-style license
           *  that can be found in the LICENSE file in the root of the source
           *  tree.
           */
          function adapterFactory() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              window = _ref.window;

            var options =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {
                    shimChrome: true,
                    shimFirefox: true,
                    shimEdge: true,
                    shimSafari: true
                  };

            // Utils.
            var logging = utils.log;
            var browserDetails = utils.detectBrowser(window);

            var adapter = {
              browserDetails: browserDetails,
              commonShim: commonShim,
              extractVersion: utils.extractVersion,
              disableLog: utils.disableLog,
              disableWarnings: utils.disableWarnings
            };

            // Shim browser if found.
            switch (browserDetails.browser) {
              case "chrome":
                if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
                  logging("Chrome shim is not included in this adapter release.");
                  return adapter;
                }
                logging("adapter.js shimming chrome.");
                // Export to the adapter global object visible in the browser.
                adapter.browserShim = chromeShim;

                chromeShim.shimGetUserMedia(window);
                chromeShim.shimMediaStream(window);
                chromeShim.shimPeerConnection(window);
                chromeShim.shimOnTrack(window);
                chromeShim.shimAddTrackRemoveTrack(window);
                chromeShim.shimGetSendersWithDtmf(window);
                chromeShim.shimGetStats(window);
                chromeShim.shimSenderReceiverGetStats(window);
                chromeShim.fixNegotiationNeeded(window);

                commonShim.shimRTCIceCandidate(window);
                commonShim.shimConnectionState(window);
                commonShim.shimMaxMessageSize(window);
                commonShim.shimSendThrowTypeError(window);
                commonShim.removeAllowExtmapMixed(window);
                break;
              case "firefox":
                if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
                  logging("Firefox shim is not included in this adapter release.");
                  return adapter;
                }
                logging("adapter.js shimming firefox.");
                // Export to the adapter global object visible in the browser.
                adapter.browserShim = firefoxShim;

                firefoxShim.shimGetUserMedia(window);
                firefoxShim.shimPeerConnection(window);
                firefoxShim.shimOnTrack(window);
                firefoxShim.shimRemoveStream(window);
                firefoxShim.shimSenderGetStats(window);
                firefoxShim.shimReceiverGetStats(window);
                firefoxShim.shimRTCDataChannel(window);
                firefoxShim.shimAddTransceiver(window);
                firefoxShim.shimCreateOffer(window);
                firefoxShim.shimCreateAnswer(window);

                commonShim.shimRTCIceCandidate(window);
                commonShim.shimConnectionState(window);
                commonShim.shimMaxMessageSize(window);
                commonShim.shimSendThrowTypeError(window);
                break;
              case "edge":
                if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
                  logging("MS edge shim is not included in this adapter release.");
                  return adapter;
                }
                logging("adapter.js shimming edge.");
                // Export to the adapter global object visible in the browser.
                adapter.browserShim = edgeShim;

                edgeShim.shimGetUserMedia(window);
                edgeShim.shimGetDisplayMedia(window);
                edgeShim.shimPeerConnection(window);
                edgeShim.shimReplaceTrack(window);

                // the edge shim implements the full RTCIceCandidate object.

                commonShim.shimMaxMessageSize(window);
                commonShim.shimSendThrowTypeError(window);
                break;
              case "safari":
                if (!safariShim || !options.shimSafari) {
                  logging("Safari shim is not included in this adapter release.");
                  return adapter;
                }
                logging("adapter.js shimming safari.");
                // Export to the adapter global object visible in the browser.
                adapter.browserShim = safariShim;

                safariShim.shimRTCIceServerUrls(window);
                safariShim.shimCreateOfferLegacy(window);
                safariShim.shimCallbacksAPI(window);
                safariShim.shimLocalStreamsAPI(window);
                safariShim.shimRemoteStreamsAPI(window);
                safariShim.shimTrackEventTransceiver(window);
                safariShim.shimGetUserMedia(window);

                commonShim.shimRTCIceCandidate(window);
                commonShim.shimMaxMessageSize(window);
                commonShim.shimSendThrowTypeError(window);
                commonShim.removeAllowExtmapMixed(window);
                break;
              default:
                logging("Unsupported browser!");
                break;
            }

            return adapter;
          }

          // Browser shims.
        },
        {
          "./chrome/chrome_shim": 3,
          "./common_shim": 6,
          "./edge/edge_shim": 12,
          "./firefox/firefox_shim": 7,
          "./safari/safari_shim": 10,
          "./utils": 11
        }
      ],
      3: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

          var _typeof =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
              ? function(obj) {
                  return typeof obj;
                }
              : function(obj) {
                  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                    ? "symbol"
                    : typeof obj;
                };

          var _getusermedia = require("./getusermedia");

          Object.defineProperty(exports, "shimGetUserMedia", {
            enumerable: true,
            get: function get() {
              return _getusermedia.shimGetUserMedia;
            }
          });

          var _getdisplaymedia = require("./getdisplaymedia");

          Object.defineProperty(exports, "shimGetDisplayMedia", {
            enumerable: true,
            get: function get() {
              return _getdisplaymedia.shimGetDisplayMedia;
            }
          });
          exports.shimMediaStream = shimMediaStream;
          exports.shimOnTrack = shimOnTrack;
          exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
          exports.shimGetStats = shimGetStats;
          exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
          exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
          exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
          exports.shimPeerConnection = shimPeerConnection;
          exports.fixNegotiationNeeded = fixNegotiationNeeded;

          var _utils = require("../utils.js");

          var utils = _interopRequireWildcard(_utils);

          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            } else {
              var newObj = {};
              if (obj != null) {
                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
              }
              newObj.default = obj;
              return newObj;
            }
          }

          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
            } else {
              obj[key] = value;
            }
            return obj;
          }

          function shimMediaStream(window) {
            window.MediaStream = window.MediaStream || window.webkitMediaStream;
          }

          function shimOnTrack(window) {
            if (
              (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
              window.RTCPeerConnection &&
              !("ontrack" in window.RTCPeerConnection.prototype)
            ) {
              Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
                get: function get() {
                  return this._ontrack;
                },
                set: function set(f) {
                  if (this._ontrack) {
                    this.removeEventListener("track", this._ontrack);
                  }
                  this.addEventListener("track", (this._ontrack = f));
                },

                enumerable: true,
                configurable: true
              });
              var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
              window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                var _this = this;

                if (!this._ontrackpoly) {
                  this._ontrackpoly = function(e) {
                    // onaddstream does not fire when a track is added to an existing
                    // stream. But stream.onaddtrack is implemented so we use that.
                    e.stream.addEventListener("addtrack", function(te) {
                      var receiver = void 0;
                      if (window.RTCPeerConnection.prototype.getReceivers) {
                        receiver = _this.getReceivers().find(function(r) {
                          return r.track && r.track.id === te.track.id;
                        });
                      } else {
                        receiver = { track: te.track };
                      }

                      var event = new Event("track");
                      event.track = te.track;
                      event.receiver = receiver;
                      event.transceiver = { receiver: receiver };
                      event.streams = [e.stream];
                      _this.dispatchEvent(event);
                    });
                    e.stream.getTracks().forEach(function(track) {
                      var receiver = void 0;
                      if (window.RTCPeerConnection.prototype.getReceivers) {
                        receiver = _this.getReceivers().find(function(r) {
                          return r.track && r.track.id === track.id;
                        });
                      } else {
                        receiver = { track: track };
                      }
                      var event = new Event("track");
                      event.track = track;
                      event.receiver = receiver;
                      event.transceiver = { receiver: receiver };
                      event.streams = [e.stream];
                      _this.dispatchEvent(event);
                    });
                  };
                  this.addEventListener("addstream", this._ontrackpoly);
                }
                return origSetRemoteDescription.apply(this, arguments);
              };
            } else {
              // even if RTCRtpTransceiver is in window, it is only used and
              // emitted in unified-plan. Unfortunately this means we need
              // to unconditionally wrap the event.
              utils.wrapPeerConnectionEvent(window, "track", function(e) {
                if (!e.transceiver) {
                  Object.defineProperty(e, "transceiver", { value: { receiver: e.receiver } });
                }
                return e;
              });
            }
          }

          function shimGetSendersWithDtmf(window) {
            // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
            if (
              (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
              window.RTCPeerConnection &&
              !("getSenders" in window.RTCPeerConnection.prototype) &&
              "createDTMFSender" in window.RTCPeerConnection.prototype
            ) {
              var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
                return {
                  track: track,
                  get dtmf() {
                    if (this._dtmf === undefined) {
                      if (track.kind === "audio") {
                        this._dtmf = pc.createDTMFSender(track);
                      } else {
                        this._dtmf = null;
                      }
                    }
                    return this._dtmf;
                  },
                  _pc: pc
                };
              };

              // augment addTrack when getSenders is not available.
              if (!window.RTCPeerConnection.prototype.getSenders) {
                window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                  this._senders = this._senders || [];
                  return this._senders.slice(); // return a copy of the internal state.
                };
                var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
                window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
                  var sender = origAddTrack.apply(this, arguments);
                  if (!sender) {
                    sender = shimSenderWithDtmf(this, track);
                    this._senders.push(sender);
                  }
                  return sender;
                };

                var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
                window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
                  origRemoveTrack.apply(this, arguments);
                  var idx = this._senders.indexOf(sender);
                  if (idx !== -1) {
                    this._senders.splice(idx, 1);
                  }
                };
              }
              var origAddStream = window.RTCPeerConnection.prototype.addStream;
              window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                var _this2 = this;

                this._senders = this._senders || [];
                origAddStream.apply(this, [stream]);
                stream.getTracks().forEach(function(track) {
                  _this2._senders.push(shimSenderWithDtmf(_this2, track));
                });
              };

              var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
              window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                var _this3 = this;

                this._senders = this._senders || [];
                origRemoveStream.apply(this, [stream]);

                stream.getTracks().forEach(function(track) {
                  var sender = _this3._senders.find(function(s) {
                    return s.track === track;
                  });
                  if (sender) {
                    // remove sender
                    _this3._senders.splice(_this3._senders.indexOf(sender), 1);
                  }
                });
              };
            } else if (
              (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
              window.RTCPeerConnection &&
              "getSenders" in window.RTCPeerConnection.prototype &&
              "createDTMFSender" in window.RTCPeerConnection.prototype &&
              window.RTCRtpSender &&
              !("dtmf" in window.RTCRtpSender.prototype)
            ) {
              var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
              window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                var _this4 = this;

                var senders = origGetSenders.apply(this, []);
                senders.forEach(function(sender) {
                  return (sender._pc = _this4);
                });
                return senders;
              };

              Object.defineProperty(window.RTCRtpSender.prototype, "dtmf", {
                get: function get() {
                  if (this._dtmf === undefined) {
                    if (this.track.kind === "audio") {
                      this._dtmf = this._pc.createDTMFSender(this.track);
                    } else {
                      this._dtmf = null;
                    }
                  }
                  return this._dtmf;
                }
              });
            }
          }

          function shimGetStats(window) {
            if (!window.RTCPeerConnection) {
              return;
            }

            var origGetStats = window.RTCPeerConnection.prototype.getStats;
            window.RTCPeerConnection.prototype.getStats = function getStats() {
              var _this5 = this;

              var _arguments = Array.prototype.slice.call(arguments),
                selector = _arguments[0],
                onSucc = _arguments[1],
                onErr = _arguments[2];

              // If selector is a function then we are in the old style stats so just
              // pass back the original getStats format to avoid breaking old users.

              if (arguments.length > 0 && typeof selector === "function") {
                return origGetStats.apply(this, arguments);
              }

              // When spec-style getStats is supported, return those when called with
              // either no arguments or the selector argument is null.
              if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== "function")) {
                return origGetStats.apply(this, []);
              }

              var fixChromeStats_ = function fixChromeStats_(response) {
                var standardReport = {};
                var reports = response.result();
                reports.forEach(function(report) {
                  var standardStats = {
                    id: report.id,
                    timestamp: report.timestamp,
                    type:
                      {
                        localcandidate: "local-candidate",
                        remotecandidate: "remote-candidate"
                      }[report.type] || report.type
                  };
                  report.names().forEach(function(name) {
                    standardStats[name] = report.stat(name);
                  });
                  standardReport[standardStats.id] = standardStats;
                });

                return standardReport;
              };

              // shim getStats with maplike support
              var makeMapStats = function makeMapStats(stats) {
                return new Map(
                  Object.keys(stats).map(function(key) {
                    return [key, stats[key]];
                  })
                );
              };

              if (arguments.length >= 2) {
                var successCallbackWrapper_ = function successCallbackWrapper_(response) {
                  onSucc(makeMapStats(fixChromeStats_(response)));
                };

                return origGetStats.apply(this, [successCallbackWrapper_, selector]);
              }

              // promise-support
              return new Promise(function(resolve, reject) {
                origGetStats.apply(_this5, [
                  function(response) {
                    resolve(makeMapStats(fixChromeStats_(response)));
                  },
                  reject
                ]);
              }).then(onSucc, onErr);
            };
          }

          function shimSenderReceiverGetStats(window) {
            if (
              !(
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                window.RTCPeerConnection &&
                window.RTCRtpSender &&
                window.RTCRtpReceiver
              )
            ) {
              return;
            }

            // shim sender stats.
            if (!("getStats" in window.RTCRtpSender.prototype)) {
              var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
              if (origGetSenders) {
                window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                  var _this6 = this;

                  var senders = origGetSenders.apply(this, []);
                  senders.forEach(function(sender) {
                    return (sender._pc = _this6);
                  });
                  return senders;
                };
              }

              var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
              if (origAddTrack) {
                window.RTCPeerConnection.prototype.addTrack = function addTrack() {
                  var sender = origAddTrack.apply(this, arguments);
                  sender._pc = this;
                  return sender;
                };
              }
              window.RTCRtpSender.prototype.getStats = function getStats() {
                var sender = this;
                return this._pc.getStats().then(function(result) {
                  return (
                    /* Note: this will include stats of all senders that
                     *   send a track with the same id as sender.track as
                     *   it is not possible to identify the RTCRtpSender.
                     */
                    utils.filterStats(result, sender.track, true)
                  );
                });
              };
            }

            // shim receiver stats.
            if (!("getStats" in window.RTCRtpReceiver.prototype)) {
              var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
              if (origGetReceivers) {
                window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
                  var _this7 = this;

                  var receivers = origGetReceivers.apply(this, []);
                  receivers.forEach(function(receiver) {
                    return (receiver._pc = _this7);
                  });
                  return receivers;
                };
              }
              utils.wrapPeerConnectionEvent(window, "track", function(e) {
                e.receiver._pc = e.srcElement;
                return e;
              });
              window.RTCRtpReceiver.prototype.getStats = function getStats() {
                var receiver = this;
                return this._pc.getStats().then(function(result) {
                  return utils.filterStats(result, receiver.track, false);
                });
              };
            }

            if (!("getStats" in window.RTCRtpSender.prototype && "getStats" in window.RTCRtpReceiver.prototype)) {
              return;
            }

            // shim RTCPeerConnection.getStats(track).
            var origGetStats = window.RTCPeerConnection.prototype.getStats;
            window.RTCPeerConnection.prototype.getStats = function getStats() {
              if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
                var track = arguments[0];
                var sender = void 0;
                var receiver = void 0;
                var err = void 0;
                this.getSenders().forEach(function(s) {
                  if (s.track === track) {
                    if (sender) {
                      err = true;
                    } else {
                      sender = s;
                    }
                  }
                });
                this.getReceivers().forEach(function(r) {
                  if (r.track === track) {
                    if (receiver) {
                      err = true;
                    } else {
                      receiver = r;
                    }
                  }
                  return r.track === track;
                });
                if (err || (sender && receiver)) {
                  return Promise.reject(
                    new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")
                  );
                } else if (sender) {
                  return sender.getStats();
                } else if (receiver) {
                  return receiver.getStats();
                }
                return Promise.reject(
                  new DOMException("There is no sender or receiver for the track.", "InvalidAccessError")
                );
              }
              return origGetStats.apply(this, arguments);
            };
          }

          function shimAddTrackRemoveTrackWithNative(window) {
            // shim addTrack/removeTrack with native variants in order to make
            // the interactions with legacy getLocalStreams behave as in other browsers.
            // Keeps a mapping stream.id => [stream, rtpsenders...]
            window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
              var _this8 = this;

              this._shimmedLocalStreams = this._shimmedLocalStreams || {};
              return Object.keys(this._shimmedLocalStreams).map(function(streamId) {
                return _this8._shimmedLocalStreams[streamId][0];
              });
            };

            var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
            window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
              if (!stream) {
                return origAddTrack.apply(this, arguments);
              }
              this._shimmedLocalStreams = this._shimmedLocalStreams || {};

              var sender = origAddTrack.apply(this, arguments);
              if (!this._shimmedLocalStreams[stream.id]) {
                this._shimmedLocalStreams[stream.id] = [stream, sender];
              } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
                this._shimmedLocalStreams[stream.id].push(sender);
              }
              return sender;
            };

            var origAddStream = window.RTCPeerConnection.prototype.addStream;
            window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
              var _this9 = this;

              this._shimmedLocalStreams = this._shimmedLocalStreams || {};

              stream.getTracks().forEach(function(track) {
                var alreadyExists = _this9.getSenders().find(function(s) {
                  return s.track === track;
                });
                if (alreadyExists) {
                  throw new DOMException("Track already exists.", "InvalidAccessError");
                }
              });
              var existingSenders = this.getSenders();
              origAddStream.apply(this, arguments);
              var newSenders = this.getSenders().filter(function(newSender) {
                return existingSenders.indexOf(newSender) === -1;
              });
              this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
            };

            var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
            window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
              this._shimmedLocalStreams = this._shimmedLocalStreams || {};
              delete this._shimmedLocalStreams[stream.id];
              return origRemoveStream.apply(this, arguments);
            };

            var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
            window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
              var _this10 = this;

              this._shimmedLocalStreams = this._shimmedLocalStreams || {};
              if (sender) {
                Object.keys(this._shimmedLocalStreams).forEach(function(streamId) {
                  var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);
                  if (idx !== -1) {
                    _this10._shimmedLocalStreams[streamId].splice(idx, 1);
                  }
                  if (_this10._shimmedLocalStreams[streamId].length === 1) {
                    delete _this10._shimmedLocalStreams[streamId];
                  }
                });
              }
              return origRemoveTrack.apply(this, arguments);
            };
          }

          function shimAddTrackRemoveTrack(window) {
            if (!window.RTCPeerConnection) {
              return;
            }
            var browserDetails = utils.detectBrowser(window);
            // shim addTrack and removeTrack.
            if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
              return shimAddTrackRemoveTrackWithNative(window);
            }

            // also shim pc.getLocalStreams when addTrack is shimmed
            // to return the original streams.
            var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
            window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
              var _this11 = this;

              var nativeStreams = origGetLocalStreams.apply(this);
              this._reverseStreams = this._reverseStreams || {};
              return nativeStreams.map(function(stream) {
                return _this11._reverseStreams[stream.id];
              });
            };

            var origAddStream = window.RTCPeerConnection.prototype.addStream;
            window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
              var _this12 = this;

              this._streams = this._streams || {};
              this._reverseStreams = this._reverseStreams || {};

              stream.getTracks().forEach(function(track) {
                var alreadyExists = _this12.getSenders().find(function(s) {
                  return s.track === track;
                });
                if (alreadyExists) {
                  throw new DOMException("Track already exists.", "InvalidAccessError");
                }
              });
              // Add identity mapping for consistency with addTrack.
              // Unless this is being used with a stream from addTrack.
              if (!this._reverseStreams[stream.id]) {
                var newStream = new window.MediaStream(stream.getTracks());
                this._streams[stream.id] = newStream;
                this._reverseStreams[newStream.id] = stream;
                stream = newStream;
              }
              origAddStream.apply(this, [stream]);
            };

            var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
            window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
              this._streams = this._streams || {};
              this._reverseStreams = this._reverseStreams || {};

              origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
              delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
              delete this._streams[stream.id];
            };

            window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
              var _this13 = this;

              if (this.signalingState === "closed") {
                throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
              }
              var streams = [].slice.call(arguments, 1);
              if (
                streams.length !== 1 ||
                !streams[0].getTracks().find(function(t) {
                  return t === track;
                })
              ) {
                // this is not fully correct but all we can manage without
                // [[associated MediaStreams]] internal slot.
                throw new DOMException(
                  "The adapter.js addTrack polyfill only supports a single " +
                    " stream which is associated with the specified track.",
                  "NotSupportedError"
                );
              }

              var alreadyExists = this.getSenders().find(function(s) {
                return s.track === track;
              });
              if (alreadyExists) {
                throw new DOMException("Track already exists.", "InvalidAccessError");
              }

              this._streams = this._streams || {};
              this._reverseStreams = this._reverseStreams || {};
              var oldStream = this._streams[stream.id];
              if (oldStream) {
                // this is using odd Chrome behaviour, use with caution:
                // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
                // Note: we rely on the high-level addTrack/dtmf shim to
                // create the sender with a dtmf sender.
                oldStream.addTrack(track);

                // Trigger ONN async.
                Promise.resolve().then(function() {
                  _this13.dispatchEvent(new Event("negotiationneeded"));
                });
              } else {
                var newStream = new window.MediaStream([track]);
                this._streams[stream.id] = newStream;
                this._reverseStreams[newStream.id] = stream;
                this.addStream(newStream);
              }
              return this.getSenders().find(function(s) {
                return s.track === track;
              });
            };

            // replace the internal stream id with the external one and
            // vice versa.
            function replaceInternalStreamId(pc, description) {
              var sdp = description.sdp;
              Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
                var externalStream = pc._reverseStreams[internalId];
                var internalStream = pc._streams[externalStream.id];
                sdp = sdp.replace(new RegExp(internalStream.id, "g"), externalStream.id);
              });
              return new RTCSessionDescription({
                type: description.type,
                sdp: sdp
              });
            }
            function replaceExternalStreamId(pc, description) {
              var sdp = description.sdp;
              Object.keys(pc._reverseStreams || []).forEach(function(internalId) {
                var externalStream = pc._reverseStreams[internalId];
                var internalStream = pc._streams[externalStream.id];
                sdp = sdp.replace(new RegExp(externalStream.id, "g"), internalStream.id);
              });
              return new RTCSessionDescription({
                type: description.type,
                sdp: sdp
              });
            }
            ["createOffer", "createAnswer"].forEach(function(method) {
              var nativeMethod = window.RTCPeerConnection.prototype[method];
              var methodObj = _defineProperty({}, method, function() {
                var _this14 = this;

                var args = arguments;
                var isLegacyCall = arguments.length && typeof arguments[0] === "function";
                if (isLegacyCall) {
                  return nativeMethod.apply(this, [
                    function(description) {
                      var desc = replaceInternalStreamId(_this14, description);
                      args[0].apply(null, [desc]);
                    },
                    function(err) {
                      if (args[1]) {
                        args[1].apply(null, err);
                      }
                    },
                    arguments[2]
                  ]);
                }
                return nativeMethod.apply(this, arguments).then(function(description) {
                  return replaceInternalStreamId(_this14, description);
                });
              });
              window.RTCPeerConnection.prototype[method] = methodObj[method];
            });

            var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
            window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
              if (!arguments.length || !arguments[0].type) {
                return origSetLocalDescription.apply(this, arguments);
              }
              arguments[0] = replaceExternalStreamId(this, arguments[0]);
              return origSetLocalDescription.apply(this, arguments);
            };

            // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

            var origLocalDescription = Object.getOwnPropertyDescriptor(
              window.RTCPeerConnection.prototype,
              "localDescription"
            );
            Object.defineProperty(window.RTCPeerConnection.prototype, "localDescription", {
              get: function get() {
                var description = origLocalDescription.get.apply(this);
                if (description.type === "") {
                  return description;
                }
                return replaceInternalStreamId(this, description);
              }
            });

            window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
              var _this15 = this;

              if (this.signalingState === "closed") {
                throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
              }
              // We can not yet check for sender instanceof RTCRtpSender
              // since we shim RTPSender. So we check if sender._pc is set.
              if (!sender._pc) {
                throw new DOMException(
                  "Argument 1 of RTCPeerConnection.removeTrack " + "does not implement interface RTCRtpSender.",
                  "TypeError"
                );
              }
              var isLocal = sender._pc === this;
              if (!isLocal) {
                throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
              }

              // Search for the native stream the senders track belongs to.
              this._streams = this._streams || {};
              var stream = void 0;
              Object.keys(this._streams).forEach(function(streamid) {
                var hasTrack = _this15._streams[streamid].getTracks().find(function(track) {
                  return sender.track === track;
                });
                if (hasTrack) {
                  stream = _this15._streams[streamid];
                }
              });

              if (stream) {
                if (stream.getTracks().length === 1) {
                  // if this is the last track of the stream, remove the stream. This
                  // takes care of any shimmed _senders.
                  this.removeStream(this._reverseStreams[stream.id]);
                } else {
                  // relying on the same odd chrome behaviour as above.
                  stream.removeTrack(sender.track);
                }
                this.dispatchEvent(new Event("negotiationneeded"));
              }
            };
          }

          function shimPeerConnection(window) {
            var browserDetails = utils.detectBrowser(window);

            if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
              // very basic support for old versions.
              window.RTCPeerConnection = window.webkitRTCPeerConnection;
            }
            if (!window.RTCPeerConnection) {
              return;
            }

            // shim implicit creation of RTCSessionDescription/RTCIceCandidate
            if (browserDetails.version < 53) {
              ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(method) {
                var nativeMethod = window.RTCPeerConnection.prototype[method];
                var methodObj = _defineProperty({}, method, function() {
                  arguments[0] = new (method === "addIceCandidate"
                    ? window.RTCIceCandidate
                    : window.RTCSessionDescription)(arguments[0]);
                  return nativeMethod.apply(this, arguments);
                });
                window.RTCPeerConnection.prototype[method] = methodObj[method];
              });
            }

            // support for addIceCandidate(null or undefined)
            var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
            window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
              if (!arguments[0]) {
                if (arguments[1]) {
                  arguments[1].apply(null);
                }
                return Promise.resolve();
              }
              // Firefox 68+ emits and processes {candidate: "", ...}, ignore
              // in older versions. Native support planned for Chrome M77.
              if (browserDetails.version < 78 && arguments[0] && arguments[0].candidate === "") {
                return Promise.resolve();
              }
              return nativeAddIceCandidate.apply(this, arguments);
            };
          }

          function fixNegotiationNeeded(window) {
            utils.wrapPeerConnectionEvent(window, "negotiationneeded", function(e) {
              var pc = e.target;
              if (pc.signalingState !== "stable") {
                return;
              }
              return e;
            });
          }
        },
        { "../utils.js": 11, "./getdisplaymedia": 4, "./getusermedia": 5 }
      ],
      4: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.shimGetDisplayMedia = shimGetDisplayMedia;
          function shimGetDisplayMedia(window, getSourceId) {
            if (window.navigator.mediaDevices && "getDisplayMedia" in window.navigator.mediaDevices) {
              return;
            }
            if (!window.navigator.mediaDevices) {
              return;
            }
            // getSourceId is a function that returns a promise resolving with
            // the sourceId of the screen/window/tab to be shared.
            if (typeof getSourceId !== "function") {
              console.error("shimGetDisplayMedia: getSourceId argument is not " + "a function");
              return;
            }
            window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
              return getSourceId(constraints).then(function(sourceId) {
                var widthSpecified = constraints.video && constraints.video.width;
                var heightSpecified = constraints.video && constraints.video.height;
                var frameRateSpecified = constraints.video && constraints.video.frameRate;
                constraints.video = {
                  mandatory: {
                    chromeMediaSource: "desktop",
                    chromeMediaSourceId: sourceId,
                    maxFrameRate: frameRateSpecified || 3
                  }
                };
                if (widthSpecified) {
                  constraints.video.mandatory.maxWidth = widthSpecified;
                }
                if (heightSpecified) {
                  constraints.video.mandatory.maxHeight = heightSpecified;
                }
                return window.navigator.mediaDevices.getUserMedia(constraints);
              });
            };
          }
        },
        {}
      ],
      5: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });

          var _typeof =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
              ? function(obj) {
                  return typeof obj;
                }
              : function(obj) {
                  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                    ? "symbol"
                    : typeof obj;
                };

          exports.shimGetUserMedia = shimGetUserMedia;

          var _utils = require("../utils.js");

          var utils = _interopRequireWildcard(_utils);

          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            } else {
              var newObj = {};
              if (obj != null) {
                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
              }
              newObj.default = obj;
              return newObj;
            }
          }

          var logging = utils.log;

          function shimGetUserMedia(window) {
            var navigator = window && window.navigator;

            if (!navigator.mediaDevices) {
              return;
            }

            var browserDetails = utils.detectBrowser(window);

            var constraintsToChrome_ = function constraintsToChrome_(c) {
              if ((typeof c === "undefined" ? "undefined" : _typeof(c)) !== "object" || c.mandatory || c.optional) {
                return c;
              }
              var cc = {};
              Object.keys(c).forEach(function(key) {
                if (key === "require" || key === "advanced" || key === "mediaSource") {
                  return;
                }
                var r = _typeof(c[key]) === "object" ? c[key] : { ideal: c[key] };
                if (r.exact !== undefined && typeof r.exact === "number") {
                  r.min = r.max = r.exact;
                }
                var oldname_ = function oldname_(prefix, name) {
                  if (prefix) {
                    return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                  }
                  return name === "deviceId" ? "sourceId" : name;
                };
                if (r.ideal !== undefined) {
                  cc.optional = cc.optional || [];
                  var oc = {};
                  if (typeof r.ideal === "number") {
                    oc[oldname_("min", key)] = r.ideal;
                    cc.optional.push(oc);
                    oc = {};
                    oc[oldname_("max", key)] = r.ideal;
                    cc.optional.push(oc);
                  } else {
                    oc[oldname_("", key)] = r.ideal;
                    cc.optional.push(oc);
                  }
                }
                if (r.exact !== undefined && typeof r.exact !== "number") {
                  cc.mandatory = cc.mandatory || {};
                  cc.mandatory[oldname_("", key)] = r.exact;
                } else {
                  ["min", "max"].forEach(function(mix) {
                    if (r[mix] !== undefined) {
                      cc.mandatory = cc.mandatory || {};
                      cc.mandatory[oldname_(mix, key)] = r[mix];
                    }
                  });
                }
              });
              if (c.advanced) {
                cc.optional = (cc.optional || []).concat(c.advanced);
              }
              return cc;
            };

            var shimConstraints_ = function shimConstraints_(constraints, func) {
              if (browserDetails.version >= 61) {
                return func(constraints);
              }
              constraints = JSON.parse(JSON.stringify(constraints));
              if (constraints && _typeof(constraints.audio) === "object") {
                var remap = function remap(obj, a, b) {
                  if (a in obj && !(b in obj)) {
                    obj[b] = obj[a];
                    delete obj[a];
                  }
                };
                constraints = JSON.parse(JSON.stringify(constraints));
                remap(constraints.audio, "autoGainControl", "googAutoGainControl");
                remap(constraints.audio, "noiseSuppression", "googNoiseSuppression");
                constraints.audio = constraintsToChrome_(constraints.audio);
              }
              if (constraints && _typeof(constraints.video) === "object") {
                // Shim facingMode for mobile & surface pro.
                var face = constraints.video.facingMode;
                face =
                  face &&
                  ((typeof face === "undefined" ? "undefined" : _typeof(face)) === "object" ? face : { ideal: face });
                var getSupportedFacingModeLies = browserDetails.version < 66;

                if (
                  face &&
                  (face.exact === "user" ||
                    face.exact === "environment" ||
                    face.ideal === "user" ||
                    face.ideal === "environment") &&
                  !(
                    navigator.mediaDevices.getSupportedConstraints &&
                    navigator.mediaDevices.getSupportedConstraints().facingMode &&
                    !getSupportedFacingModeLies
                  )
                ) {
                  delete constraints.video.facingMode;
                  var matches = void 0;
                  if (face.exact === "environment" || face.ideal === "environment") {
                    matches = ["back", "rear"];
                  } else if (face.exact === "user" || face.ideal === "user") {
                    matches = ["front"];
                  }
                  if (matches) {
                    // Look for matches in label, or use last cam for back (typical).
                    return navigator.mediaDevices.enumerateDevices().then(function(devices) {
                      devices = devices.filter(function(d) {
                        return d.kind === "videoinput";
                      });
                      var dev = devices.find(function(d) {
                        return matches.some(function(match) {
                          return d.label.toLowerCase().includes(match);
                        });
                      });
                      if (!dev && devices.length && matches.includes("back")) {
                        dev = devices[devices.length - 1]; // more likely the back cam
                      }
                      if (dev) {
                        constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
                      }
                      constraints.video = constraintsToChrome_(constraints.video);
                      logging("chrome: " + JSON.stringify(constraints));
                      return func(constraints);
                    });
                  }
                }
                constraints.video = constraintsToChrome_(constraints.video);
              }
              logging("chrome: " + JSON.stringify(constraints));
              return func(constraints);
            };

            var shimError_ = function shimError_(e) {
              if (browserDetails.version >= 64) {
                return e;
              }
              return {
                name:
                  {
                    PermissionDeniedError: "NotAllowedError",
                    PermissionDismissedError: "NotAllowedError",
                    InvalidStateError: "NotAllowedError",
                    DevicesNotFoundError: "NotFoundError",
                    ConstraintNotSatisfiedError: "OverconstrainedError",
                    TrackStartError: "NotReadableError",
                    MediaDeviceFailedDueToShutdown: "NotAllowedError",
                    MediaDeviceKillSwitchOn: "NotAllowedError",
                    TabCaptureError: "AbortError",
                    ScreenCaptureError: "AbortError",
                    DeviceCaptureError: "AbortError"
                  }[e.name] || e.name,
                message: e.message,
                constraint: e.constraint || e.constraintName,
                toString: function toString() {
                  return this.name + (this.message && ": ") + this.message;
                }
              };
            };

            var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
              shimConstraints_(constraints, function(c) {
                navigator.webkitGetUserMedia(c, onSuccess, function(e) {
                  if (onError) {
                    onError(shimError_(e));
                  }
                });
              });
            };
            navigator.getUserMedia = getUserMedia_.bind(navigator);

            // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
            // function which returns a Promise, it does not accept spec-style
            // constraints.
            if (navigator.mediaDevices.getUserMedia) {
              var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
              navigator.mediaDevices.getUserMedia = function(cs) {
                return shimConstraints_(cs, function(c) {
                  return origGetUserMedia(c).then(
                    function(stream) {
                      if (
                        (c.audio && !stream.getAudioTracks().length) ||
                        (c.video && !stream.getVideoTracks().length)
                      ) {
                        stream.getTracks().forEach(function(track) {
                          track.stop();
                        });
                        throw new DOMException("", "NotFoundError");
                      }
                      return stream;
                    },
                    function(e) {
                      return Promise.reject(shimError_(e));
                    }
                  );
                });
              };
            }
          }
        },
        { "../utils.js": 11 }
      ],
      6: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });

          var _typeof =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
              ? function(obj) {
                  return typeof obj;
                }
              : function(obj) {
                  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                    ? "symbol"
                    : typeof obj;
                };

          exports.shimRTCIceCandidate = shimRTCIceCandidate;
          exports.shimMaxMessageSize = shimMaxMessageSize;
          exports.shimSendThrowTypeError = shimSendThrowTypeError;
          exports.shimConnectionState = shimConnectionState;
          exports.removeAllowExtmapMixed = removeAllowExtmapMixed;

          var _sdp = require("sdp");

          var _sdp2 = _interopRequireDefault(_sdp);

          var _utils = require("./utils");

          var utils = _interopRequireWildcard(_utils);

          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            } else {
              var newObj = {};
              if (obj != null) {
                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
              }
              newObj.default = obj;
              return newObj;
            }
          }

          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }

          function shimRTCIceCandidate(window) {
            // foundation is arbitrarily chosen as an indicator for full support for
            // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
            if (
              !window.RTCIceCandidate ||
              (window.RTCIceCandidate && "foundation" in window.RTCIceCandidate.prototype)
            ) {
              return;
            }

            var NativeRTCIceCandidate = window.RTCIceCandidate;
            window.RTCIceCandidate = function RTCIceCandidate(args) {
              // Remove the a= which shouldn't be part of the candidate string.
              if (
                (typeof args === "undefined" ? "undefined" : _typeof(args)) === "object" &&
                args.candidate &&
                args.candidate.indexOf("a=") === 0
              ) {
                args = JSON.parse(JSON.stringify(args));
                args.candidate = args.candidate.substr(2);
              }

              if (args.candidate && args.candidate.length) {
                // Augment the native candidate with the parsed fields.
                var nativeCandidate = new NativeRTCIceCandidate(args);
                var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);
                var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

                // Add a serializer that does not serialize the extra attributes.
                augmentedCandidate.toJSON = function toJSON() {
                  return {
                    candidate: augmentedCandidate.candidate,
                    sdpMid: augmentedCandidate.sdpMid,
                    sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                    usernameFragment: augmentedCandidate.usernameFragment
                  };
                };
                return augmentedCandidate;
              }
              return new NativeRTCIceCandidate(args);
            };
            window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

            // Hook up the augmented candidate in onicecandidate and
            // addEventListener('icecandidate', ...)
            utils.wrapPeerConnectionEvent(window, "icecandidate", function(e) {
              if (e.candidate) {
                Object.defineProperty(e, "candidate", {
                  value: new window.RTCIceCandidate(e.candidate),
                  writable: "false"
                });
              }
              return e;
            });
          }

          function shimMaxMessageSize(window) {
            if (!window.RTCPeerConnection) {
              return;
            }
            var browserDetails = utils.detectBrowser(window);

            if (!("sctp" in window.RTCPeerConnection.prototype)) {
              Object.defineProperty(window.RTCPeerConnection.prototype, "sctp", {
                get: function get() {
                  return typeof this._sctp === "undefined" ? null : this._sctp;
                }
              });
            }

            var sctpInDescription = function sctpInDescription(description) {
              if (!description || !description.sdp) {
                return false;
              }
              var sections = _sdp2.default.splitSections(description.sdp);
              sections.shift();
              return sections.some(function(mediaSection) {
                var mLine = _sdp2.default.parseMLine(mediaSection);
                return mLine && mLine.kind === "application" && mLine.protocol.indexOf("SCTP") !== -1;
              });
            };

            var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
              // TODO: Is there a better solution for detecting Firefox?
              var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
              if (match === null || match.length < 2) {
                return -1;
              }
              var version = parseInt(match[1], 10);
              // Test for NaN (yes, this is ugly)
              return version !== version ? -1 : version;
            };

            var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
              // Every implementation we know can send at least 64 KiB.
              // Note: Although Chrome is technically able to send up to 256 KiB, the
              //       data does not reach the other peer reliably.
              //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
              var canSendMaxMessageSize = 65536;
              if (browserDetails.browser === "firefox") {
                if (browserDetails.version < 57) {
                  if (remoteIsFirefox === -1) {
                    // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                    // fragmentation.
                    canSendMaxMessageSize = 16384;
                  } else {
                    // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                    // messages. Thus, supporting ~2 GiB when sending.
                    canSendMaxMessageSize = 2147483637;
                  }
                } else if (browserDetails.version < 60) {
                  // Currently, all FF >= 57 will reset the remote maximum message size
                  // to the default value when a data channel is created at a later
                  // stage. :(
                  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                  canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
                } else {
                  // FF >= 60 supports sending ~2 GiB
                  canSendMaxMessageSize = 2147483637;
                }
              }
              return canSendMaxMessageSize;
            };

            var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
              // Note: 65536 bytes is the default value from the SDP spec. Also,
              //       every implementation we know supports receiving 65536 bytes.
              var maxMessageSize = 65536;

              // FF 57 has a slightly incorrect default remote max message size, so
              // we need to adjust it here to avoid a failure when sending.
              // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
              if (browserDetails.browser === "firefox" && browserDetails.version === 57) {
                maxMessageSize = 65535;
              }

              var match = _sdp2.default.matchPrefix(description.sdp, "a=max-message-size:");
              if (match.length > 0) {
                maxMessageSize = parseInt(match[0].substr(19), 10);
              } else if (browserDetails.browser === "firefox" && remoteIsFirefox !== -1) {
                // If the maximum message size is not present in the remote SDP and
                // both local and remote are Firefox, the remote peer can receive
                // ~2 GiB.
                maxMessageSize = 2147483637;
              }
              return maxMessageSize;
            };

            var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
            window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
              this._sctp = null;
              // Chrome decided to not expose .sctp in plan-b mode.
              // As usual, adapter.js has to do an 'ugly worakaround'
              // to cover up the mess.
              if (browserDetails.browser === "chrome" && browserDetails.version >= 76) {
                var _getConfiguration = this.getConfiguration(),
                  sdpSemantics = _getConfiguration.sdpSemantics;

                if (sdpSemantics === "plan-b") {
                  Object.defineProperty(this, "sctp", {
                    get: function get() {
                      return typeof this._sctp === "undefined" ? null : this._sctp;
                    },

                    enumerable: true,
                    configurable: true
                  });
                }
              }

              if (sctpInDescription(arguments[0])) {
                // Check if the remote is FF.
                var isFirefox = getRemoteFirefoxVersion(arguments[0]);

                // Get the maximum message size the local peer is capable of sending
                var canSendMMS = getCanSendMaxMessageSize(isFirefox);

                // Get the maximum message size of the remote peer.
                var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

                // Determine final maximum message size
                var maxMessageSize = void 0;
                if (canSendMMS === 0 && remoteMMS === 0) {
                  maxMessageSize = Number.POSITIVE_INFINITY;
                } else if (canSendMMS === 0 || remoteMMS === 0) {
                  maxMessageSize = Math.max(canSendMMS, remoteMMS);
                } else {
                  maxMessageSize = Math.min(canSendMMS, remoteMMS);
                }

                // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
                // attribute.
                var sctp = {};
                Object.defineProperty(sctp, "maxMessageSize", {
                  get: function get() {
                    return maxMessageSize;
                  }
                });
                this._sctp = sctp;
              }

              return origSetRemoteDescription.apply(this, arguments);
            };
          }

          function shimSendThrowTypeError(window) {
            if (!(window.RTCPeerConnection && "createDataChannel" in window.RTCPeerConnection.prototype)) {
              return;
            }

            // Note: Although Firefox >= 57 has a native implementation, the maximum
            //       message size can be reset for all data channels at a later stage.
            //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

            function wrapDcSend(dc, pc) {
              var origDataChannelSend = dc.send;
              dc.send = function send() {
                var data = arguments[0];
                var length = data.length || data.size || data.byteLength;
                if (dc.readyState === "open" && pc.sctp && length > pc.sctp.maxMessageSize) {
                  throw new TypeError("Message too large (can send a maximum of " + pc.sctp.maxMessageSize + " bytes)");
                }
                return origDataChannelSend.apply(dc, arguments);
              };
            }
            var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
            window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
              var dataChannel = origCreateDataChannel.apply(this, arguments);
              wrapDcSend(dataChannel, this);
              return dataChannel;
            };
            utils.wrapPeerConnectionEvent(window, "datachannel", function(e) {
              wrapDcSend(e.channel, e.target);
              return e;
            });
          }

          /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
           * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
           * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
           * since DTLS failures would be hidden. See
           * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
           * for the Firefox tracking bug.
           */
          function shimConnectionState(window) {
            if (!window.RTCPeerConnection || "connectionState" in window.RTCPeerConnection.prototype) {
              return;
            }
            var proto = window.RTCPeerConnection.prototype;
            Object.defineProperty(proto, "connectionState", {
              get: function get() {
                return (
                  {
                    completed: "connected",
                    checking: "connecting"
                  }[this.iceConnectionState] || this.iceConnectionState
                );
              },

              enumerable: true,
              configurable: true
            });
            Object.defineProperty(proto, "onconnectionstatechange", {
              get: function get() {
                return this._onconnectionstatechange || null;
              },
              set: function set(cb) {
                if (this._onconnectionstatechange) {
                  this.removeEventListener("connectionstatechange", this._onconnectionstatechange);
                  delete this._onconnectionstatechange;
                }
                if (cb) {
                  this.addEventListener("connectionstatechange", (this._onconnectionstatechange = cb));
                }
              },

              enumerable: true,
              configurable: true
            });

            ["setLocalDescription", "setRemoteDescription"].forEach(function(method) {
              var origMethod = proto[method];
              proto[method] = function() {
                if (!this._connectionstatechangepoly) {
                  this._connectionstatechangepoly = function(e) {
                    var pc = e.target;
                    if (pc._lastConnectionState !== pc.connectionState) {
                      pc._lastConnectionState = pc.connectionState;
                      var newEvent = new Event("connectionstatechange", e);
                      pc.dispatchEvent(newEvent);
                    }
                    return e;
                  };
                  this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly);
                }
                return origMethod.apply(this, arguments);
              };
            });
          }

          function removeAllowExtmapMixed(window) {
            /* remove a=extmap-allow-mixed for Chrome < M71 */
            if (!window.RTCPeerConnection) {
              return;
            }
            var browserDetails = utils.detectBrowser(window);
            if (browserDetails.browser === "chrome" && browserDetails.version >= 71) {
              return;
            }
            var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
            window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
              if (desc && desc.sdp && desc.sdp.indexOf("\na=extmap-allow-mixed") !== -1) {
                desc.sdp = desc.sdp
                  .split("\n")
                  .filter(function(line) {
                    return line.trim() !== "a=extmap-allow-mixed";
                  })
                  .join("\n");
              }
              return nativeSRD.apply(this, arguments);
            };
          }
        },
        { "./utils": 11, sdp: 13 }
      ],
      7: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;

          var _typeof =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
              ? function(obj) {
                  return typeof obj;
                }
              : function(obj) {
                  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                    ? "symbol"
                    : typeof obj;
                };

          var _getusermedia = require("./getusermedia");

          Object.defineProperty(exports, "shimGetUserMedia", {
            enumerable: true,
            get: function get() {
              return _getusermedia.shimGetUserMedia;
            }
          });

          var _getdisplaymedia = require("./getdisplaymedia");

          Object.defineProperty(exports, "shimGetDisplayMedia", {
            enumerable: true,
            get: function get() {
              return _getdisplaymedia.shimGetDisplayMedia;
            }
          });
          exports.shimOnTrack = shimOnTrack;
          exports.shimPeerConnection = shimPeerConnection;
          exports.shimSenderGetStats = shimSenderGetStats;
          exports.shimReceiverGetStats = shimReceiverGetStats;
          exports.shimRemoveStream = shimRemoveStream;
          exports.shimRTCDataChannel = shimRTCDataChannel;
          exports.shimAddTransceiver = shimAddTransceiver;
          exports.shimCreateOffer = shimCreateOffer;
          exports.shimCreateAnswer = shimCreateAnswer;

          var _utils = require("../utils");

          var utils = _interopRequireWildcard(_utils);

          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            } else {
              var newObj = {};
              if (obj != null) {
                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
              }
              newObj.default = obj;
              return newObj;
            }
          }

          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
            } else {
              obj[key] = value;
            }
            return obj;
          }

          function shimOnTrack(window) {
            if (
              (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
              window.RTCTrackEvent &&
              "receiver" in window.RTCTrackEvent.prototype &&
              !("transceiver" in window.RTCTrackEvent.prototype)
            ) {
              Object.defineProperty(window.RTCTrackEvent.prototype, "transceiver", {
                get: function get() {
                  return { receiver: this.receiver };
                }
              });
            }
          }

          function shimPeerConnection(window) {
            var browserDetails = utils.detectBrowser(window);

            if (
              (typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object" ||
              !(window.RTCPeerConnection || window.mozRTCPeerConnection)
            ) {
              return; // probably media.peerconnection.enabled=false in about:config
            }
            if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
              // very basic support for old versions.
              window.RTCPeerConnection = window.mozRTCPeerConnection;
            }

            if (browserDetails.version < 53) {
              // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
              ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(method) {
                var nativeMethod = window.RTCPeerConnection.prototype[method];
                var methodObj = _defineProperty({}, method, function() {
                  arguments[0] = new (method === "addIceCandidate"
                    ? window.RTCIceCandidate
                    : window.RTCSessionDescription)(arguments[0]);
                  return nativeMethod.apply(this, arguments);
                });
                window.RTCPeerConnection.prototype[method] = methodObj[method];
              });
            }

            // support for addIceCandidate(null or undefined)
            // as well as ignoring {sdpMid, candidate: ""}
            if (browserDetails.version < 68) {
              var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
              window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
                if (!arguments[0]) {
                  if (arguments[1]) {
                    arguments[1].apply(null);
                  }
                  return Promise.resolve();
                }
                // Firefox 68+ emits and processes {candidate: "", ...}, ignore
                // in older versions.
                if (arguments[0] && arguments[0].candidate === "") {
                  return Promise.resolve();
                }
                return nativeAddIceCandidate.apply(this, arguments);
              };
            }

            var modernStatsTypes = {
              inboundrtp: "inbound-rtp",
              outboundrtp: "outbound-rtp",
              candidatepair: "candidate-pair",
              localcandidate: "local-candidate",
              remotecandidate: "remote-candidate"
            };

            var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
            window.RTCPeerConnection.prototype.getStats = function getStats() {
              var _arguments = Array.prototype.slice.call(arguments),
                selector = _arguments[0],
                onSucc = _arguments[1],
                onErr = _arguments[2];

              return nativeGetStats
                .apply(this, [selector || null])
                .then(function(stats) {
                  if (browserDetails.version < 53 && !onSucc) {
                    // Shim only promise getStats with spec-hyphens in type names
                    // Leave callback version alone; misc old uses of forEach before Map
                    try {
                      stats.forEach(function(stat) {
                        stat.type = modernStatsTypes[stat.type] || stat.type;
                      });
                    } catch (e) {
                      if (e.name !== "TypeError") {
                        throw e;
                      }
                      // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                      stats.forEach(function(stat, i) {
                        stats.set(
                          i,
                          Object.assign({}, stat, {
                            type: modernStatsTypes[stat.type] || stat.type
                          })
                        );
                      });
                    }
                  }
                  return stats;
                })
                .then(onSucc, onErr);
            };
          }

          function shimSenderGetStats(window) {
            if (
              !(
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                window.RTCPeerConnection &&
                window.RTCRtpSender
              )
            ) {
              return;
            }
            if (window.RTCRtpSender && "getStats" in window.RTCRtpSender.prototype) {
              return;
            }
            var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
            if (origGetSenders) {
              window.RTCPeerConnection.prototype.getSenders = function getSenders() {
                var _this = this;

                var senders = origGetSenders.apply(this, []);
                senders.forEach(function(sender) {
                  return (sender._pc = _this);
                });
                return senders;
              };
            }

            var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
            if (origAddTrack) {
              window.RTCPeerConnection.prototype.addTrack = function addTrack() {
                var sender = origAddTrack.apply(this, arguments);
                sender._pc = this;
                return sender;
              };
            }
            window.RTCRtpSender.prototype.getStats = function getStats() {
              return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
            };
          }

          function shimReceiverGetStats(window) {
            if (
              !(
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
                window.RTCPeerConnection &&
                window.RTCRtpSender
              )
            ) {
              return;
            }
            if (window.RTCRtpSender && "getStats" in window.RTCRtpReceiver.prototype) {
              return;
            }
            var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
            if (origGetReceivers) {
              window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
                var _this2 = this;

                var receivers = origGetReceivers.apply(this, []);
                receivers.forEach(function(receiver) {
                  return (receiver._pc = _this2);
                });
                return receivers;
              };
            }
            utils.wrapPeerConnectionEvent(window, "track", function(e) {
              e.receiver._pc = e.srcElement;
              return e;
            });
            window.RTCRtpReceiver.prototype.getStats = function getStats() {
              return this._pc.getStats(this.track);
            };
          }

          function shimRemoveStream(window) {
            if (!window.RTCPeerConnection || "removeStream" in window.RTCPeerConnection.prototype) {
              return;
            }
            window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
              var _this3 = this;

              utils.deprecated("removeStream", "removeTrack");
              this.getSenders().forEach(function(sender) {
                if (sender.track && stream.getTracks().includes(sender.track)) {
                  _this3.removeTrack(sender);
                }
              });
            };
          }

          function shimRTCDataChannel(window) {
            // rename DataChannel to RTCDataChannel (native fix in FF60):
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
            if (window.DataChannel && !window.RTCDataChannel) {
              window.RTCDataChannel = window.DataChannel;
            }
          }

          function shimAddTransceiver(window) {
            // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
            // Firefox ignores the init sendEncodings options passed to addTransceiver
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
            if (
              !(
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window.RTCPeerConnection
              )
            ) {
              return;
            }
            var origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
            if (origAddTransceiver) {
              window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
                this.setParametersPromises = [];
                var initParameters = arguments[1];
                var shouldPerformCheck = initParameters && "sendEncodings" in initParameters;
                if (shouldPerformCheck) {
                  // If sendEncodings params are provided, validate grammar
                  initParameters.sendEncodings.forEach(function(encodingParam) {
                    if ("rid" in encodingParam) {
                      var ridRegex = /^[a-z0-9]{0,16}$/i;
                      if (!ridRegex.test(encodingParam.rid)) {
                        throw new TypeError("Invalid RID value provided.");
                      }
                    }
                    if ("scaleResolutionDownBy" in encodingParam) {
                      if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
                        throw new RangeError("scale_resolution_down_by must be >= 1.0");
                      }
                    }
                    if ("maxFramerate" in encodingParam) {
                      if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
                        throw new RangeError("max_framerate must be >= 0.0");
                      }
                    }
                  });
                }
                var transceiver = origAddTransceiver.apply(this, arguments);
                if (shouldPerformCheck) {
                  // Check if the init options were applied. If not we do this in an
                  // asynchronous way and save the promise reference in a global object.
                  // This is an ugly hack, but at the same time is way more robust than
                  // checking the sender parameters before and after the createOffer
                  // Also note that after the createoffer we are not 100% sure that
                  // the params were asynchronously applied so we might miss the
                  // opportunity to recreate offer.
                  var sender = transceiver.sender;

                  var params = sender.getParameters();
                  if (!("encodings" in params)) {
                    params.encodings = initParameters.sendEncodings;
                    this.setParametersPromises.push(sender.setParameters(params).catch(function() {}));
                  }
                }
                return transceiver;
              };
            }
          }

          function shimCreateOffer(window) {
            // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
            // Firefox ignores the init sendEncodings options passed to addTransceiver
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
            if (
              !(
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window.RTCPeerConnection
              )
            ) {
              return;
            }
            var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
            window.RTCPeerConnection.prototype.createOffer = function createOffer() {
              var _this4 = this,
                _arguments2 = arguments;

              if (this.setParametersPromises && this.setParametersPromises.length) {
                return Promise.all(this.setParametersPromises)
                  .then(function() {
                    return origCreateOffer.apply(_this4, _arguments2);
                  })
                  .finally(function() {
                    _this4.setParametersPromises = [];
                  });
              }
              return origCreateOffer.apply(this, arguments);
            };
          }

          function shimCreateAnswer(window) {
            // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
            // Firefox ignores the init sendEncodings options passed to addTransceiver
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
            if (
              !(
                (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window.RTCPeerConnection
              )
            ) {
              return;
            }
            var origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
            window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
              var _this5 = this,
                _arguments3 = arguments;

              if (this.setParametersPromises && this.setParametersPromises.length) {
                return Promise.all(this.setParametersPromises)
                  .then(function() {
                    return origCreateAnswer.apply(_this5, _arguments3);
                  })
                  .finally(function() {
                    _this5.setParametersPromises = [];
                  });
              }
              return origCreateAnswer.apply(this, arguments);
            };
          }
        },
        { "../utils": 11, "./getdisplaymedia": 8, "./getusermedia": 9 }
      ],
      8: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.shimGetDisplayMedia = shimGetDisplayMedia;
          function shimGetDisplayMedia(window, preferredMediaSource) {
            if (window.navigator.mediaDevices && "getDisplayMedia" in window.navigator.mediaDevices) {
              return;
            }
            if (!window.navigator.mediaDevices) {
              return;
            }
            window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
              if (!(constraints && constraints.video)) {
                var err = new DOMException("getDisplayMedia without video " + "constraints is undefined");
                err.name = "NotFoundError";
                // from https://heycam.github.io/webidl/#idl-DOMException-error-names
                err.code = 8;
                return Promise.reject(err);
              }
              if (constraints.video === true) {
                constraints.video = { mediaSource: preferredMediaSource };
              } else {
                constraints.video.mediaSource = preferredMediaSource;
              }
              return window.navigator.mediaDevices.getUserMedia(constraints);
            };
          }
        },
        {}
      ],
      9: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });

          var _typeof =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
              ? function(obj) {
                  return typeof obj;
                }
              : function(obj) {
                  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                    ? "symbol"
                    : typeof obj;
                };

          exports.shimGetUserMedia = shimGetUserMedia;

          var _utils = require("../utils");

          var utils = _interopRequireWildcard(_utils);

          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            } else {
              var newObj = {};
              if (obj != null) {
                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
              }
              newObj.default = obj;
              return newObj;
            }
          }

          function shimGetUserMedia(window) {
            var browserDetails = utils.detectBrowser(window);
            var navigator = window && window.navigator;
            var MediaStreamTrack = window && window.MediaStreamTrack;

            navigator.getUserMedia = function(constraints, onSuccess, onError) {
              // Replace Firefox 44+'s deprecation warning with unprefixed version.
              utils.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia");
              navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
            };

            if (
              !(browserDetails.version > 55 && "autoGainControl" in navigator.mediaDevices.getSupportedConstraints())
            ) {
              var remap = function remap(obj, a, b) {
                if (a in obj && !(b in obj)) {
                  obj[b] = obj[a];
                  delete obj[a];
                }
              };

              var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
              navigator.mediaDevices.getUserMedia = function(c) {
                if (
                  (typeof c === "undefined" ? "undefined" : _typeof(c)) === "object" &&
                  _typeof(c.audio) === "object"
                ) {
                  c = JSON.parse(JSON.stringify(c));
                  remap(c.audio, "autoGainControl", "mozAutoGainControl");
                  remap(c.audio, "noiseSuppression", "mozNoiseSuppression");
                }
                return nativeGetUserMedia(c);
              };

              if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
                var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
                MediaStreamTrack.prototype.getSettings = function() {
                  var obj = nativeGetSettings.apply(this, arguments);
                  remap(obj, "mozAutoGainControl", "autoGainControl");
                  remap(obj, "mozNoiseSuppression", "noiseSuppression");
                  return obj;
                };
              }

              if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
                var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
                MediaStreamTrack.prototype.applyConstraints = function(c) {
                  if (this.kind === "audio" && (typeof c === "undefined" ? "undefined" : _typeof(c)) === "object") {
                    c = JSON.parse(JSON.stringify(c));
                    remap(c, "autoGainControl", "mozAutoGainControl");
                    remap(c, "noiseSuppression", "mozNoiseSuppression");
                  }
                  return nativeApplyConstraints.apply(this, [c]);
                };
              }
            }
          }
        },
        { "../utils": 11 }
      ],
      10: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });

          var _typeof =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
              ? function(obj) {
                  return typeof obj;
                }
              : function(obj) {
                  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                    ? "symbol"
                    : typeof obj;
                };

          exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
          exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
          exports.shimCallbacksAPI = shimCallbacksAPI;
          exports.shimGetUserMedia = shimGetUserMedia;
          exports.shimConstraints = shimConstraints;
          exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
          exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
          exports.shimCreateOfferLegacy = shimCreateOfferLegacy;

          var _utils = require("../utils");

          var utils = _interopRequireWildcard(_utils);

          function _interopRequireWildcard(obj) {
            if (obj && obj.__esModule) {
              return obj;
            } else {
              var newObj = {};
              if (obj != null) {
                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
              }
              newObj.default = obj;
              return newObj;
            }
          }

          function shimLocalStreamsAPI(window) {
            if (
              (typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object" ||
              !window.RTCPeerConnection
            ) {
              return;
            }
            if (!("getLocalStreams" in window.RTCPeerConnection.prototype)) {
              window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
                if (!this._localStreams) {
                  this._localStreams = [];
                }
                return this._localStreams;
              };
            }
            if (!("addStream" in window.RTCPeerConnection.prototype)) {
              var _addTrack = window.RTCPeerConnection.prototype.addTrack;
              window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
                var _this = this;

                if (!this._localStreams) {
                  this._localStreams = [];
                }
                if (!this._localStreams.includes(stream)) {
                  this._localStreams.push(stream);
                }
                // Try to emulate Chrome's behaviour of adding in audio-video order.
                // Safari orders by track id.
                stream.getAudioTracks().forEach(function(track) {
                  return _addTrack.call(_this, track, stream);
                });
                stream.getVideoTracks().forEach(function(track) {
                  return _addTrack.call(_this, track, stream);
                });
              };

              window.RTCPeerConnection.prototype.addTrack = function addTrack(track) {
                var stream = arguments[1];
                if (stream) {
                  if (!this._localStreams) {
                    this._localStreams = [stream];
                  } else if (!this._localStreams.includes(stream)) {
                    this._localStreams.push(stream);
                  }
                }
                return _addTrack.apply(this, arguments);
              };
            }
            if (!("removeStream" in window.RTCPeerConnection.prototype)) {
              window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
                var _this2 = this;

                if (!this._localStreams) {
                  this._localStreams = [];
                }
                var index = this._localStreams.indexOf(stream);
                if (index === -1) {
                  return;
                }
                this._localStreams.splice(index, 1);
                var tracks = stream.getTracks();
                this.getSenders().forEach(function(sender) {
                  if (tracks.includes(sender.track)) {
                    _this2.removeTrack(sender);
                  }
                });
              };
            }
          }

          function shimRemoteStreamsAPI(window) {
            if (
              (typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object" ||
              !window.RTCPeerConnection
            ) {
              return;
            }
            if (!("getRemoteStreams" in window.RTCPeerConnection.prototype)) {
              window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
                return this._remoteStreams ? this._remoteStreams : [];
              };
            }
            if (!("onaddstream" in window.RTCPeerConnection.prototype)) {
              Object.defineProperty(window.RTCPeerConnection.prototype, "onaddstream", {
                get: function get() {
                  return this._onaddstream;
                },
                set: function set(f) {
                  var _this3 = this;

                  if (this._onaddstream) {
                    this.removeEventListener("addstream", this._onaddstream);
                    this.removeEventListener("track", this._onaddstreampoly);
                  }
                  this.addEventListener("addstream", (this._onaddstream = f));
                  this.addEventListener(
                    "track",
                    (this._onaddstreampoly = function(e) {
                      e.streams.forEach(function(stream) {
                        if (!_this3._remoteStreams) {
                          _this3._remoteStreams = [];
                        }
                        if (_this3._remoteStreams.includes(stream)) {
                          return;
                        }
                        _this3._remoteStreams.push(stream);
                        var event = new Event("addstream");
                        event.stream = stream;
                        _this3.dispatchEvent(event);
                      });
                    })
                  );
                }
              });
              var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
              window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
                var pc = this;
                if (!this._onaddstreampoly) {
                  this.addEventListener(
                    "track",
                    (this._onaddstreampoly = function(e) {
                      e.streams.forEach(function(stream) {
                        if (!pc._remoteStreams) {
                          pc._remoteStreams = [];
                        }
                        if (pc._remoteStreams.indexOf(stream) >= 0) {
                          return;
                        }
                        pc._remoteStreams.push(stream);
                        var event = new Event("addstream");
                        event.stream = stream;
                        pc.dispatchEvent(event);
                      });
                    })
                  );
                }
                return origSetRemoteDescription.apply(pc, arguments);
              };
            }
          }

          function shimCallbacksAPI(window) {
            if (
              (typeof window === "undefined" ? "undefined" : _typeof(window)) !== "object" ||
              !window.RTCPeerConnection
            ) {
              return;
            }
            var prototype = window.RTCPeerConnection.prototype;
            var origCreateOffer = prototype.createOffer;
            var origCreateAnswer = prototype.createAnswer;
            var setLocalDescription = prototype.setLocalDescription;
            var setRemoteDescription = prototype.setRemoteDescription;
            var addIceCandidate = prototype.addIceCandidate;

            prototype.createOffer = function createOffer(successCallback, failureCallback) {
              var options = arguments.length >= 2 ? arguments[2] : arguments[0];
              var promise = origCreateOffer.apply(this, [options]);
              if (!failureCallback) {
                return promise;
              }
              promise.then(successCallback, failureCallback);
              return Promise.resolve();
            };

            prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
              var options = arguments.length >= 2 ? arguments[2] : arguments[0];
              var promise = origCreateAnswer.apply(this, [options]);
              if (!failureCallback) {
                return promise;
              }
              promise.then(successCallback, failureCallback);
              return Promise.resolve();
            };

            var withCallback = function withCallback(description, successCallback, failureCallback) {
              var promise = setLocalDescription.apply(this, [description]);
              if (!failureCallback) {
                return promise;
              }
              promise.then(successCallback, failureCallback);
              return Promise.resolve();
            };
            prototype.setLocalDescription = withCallback;

            withCallback = function withCallback(description, successCallback, failureCallback) {
              var promise = setRemoteDescription.apply(this, [description]);
              if (!failureCallback) {
                return promise;
              }
              promise.then(successCallback, failureCallback);
              return Promise.resolve();
            };
            prototype.setRemoteDescription = withCallback;

            withCallback = function withCallback(candidate, successCallback, failureCallback) {
              var promise = addIceCandidate.apply(this, [candidate]);
              if (!failureCallback) {
                return promise;
              }
              promise.then(successCallback, failureCallback);
              return Promise.resolve();
            };
            prototype.addIceCandidate = withCallback;
          }

          function shimGetUserMedia(window) {
            var navigator = window && window.navigator;

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              // shim not needed in Safari 12.1
              var mediaDevices = navigator.mediaDevices;
              var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
              navigator.mediaDevices.getUserMedia = function(constraints) {
                return _getUserMedia(shimConstraints(constraints));
              };
            }

            if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
                navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
              }.bind(navigator);
            }
          }

          function shimConstraints(constraints) {
            if (constraints && constraints.video !== undefined) {
              return Object.assign({}, constraints, { video: utils.compactObject(constraints.video) });
            }

            return constraints;
          }

          function shimRTCIceServerUrls(window) {
            // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
            var OrigPeerConnection = window.RTCPeerConnection;
            window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
              if (pcConfig && pcConfig.iceServers) {
                var newIceServers = [];
                for (var i = 0; i < pcConfig.iceServers.length; i++) {
                  var server = pcConfig.iceServers[i];
                  if (!server.hasOwnProperty("urls") && server.hasOwnProperty("url")) {
                    utils.deprecated("RTCIceServer.url", "RTCIceServer.urls");
                    server = JSON.parse(JSON.stringify(server));
                    server.urls = server.url;
                    delete server.url;
                    newIceServers.push(server);
                  } else {
                    newIceServers.push(pcConfig.iceServers[i]);
                  }
                }
                pcConfig.iceServers = newIceServers;
              }
              return new OrigPeerConnection(pcConfig, pcConstraints);
            };
            window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
            // wrap static methods. Currently just generateCertificate.
            if ("generateCertificate" in window.RTCPeerConnection) {
              Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
                get: function get() {
                  return OrigPeerConnection.generateCertificate;
                }
              });
            }
          }

          function shimTrackEventTransceiver(window) {
            // Add event.transceiver member over deprecated event.receiver
            if (
              (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" &&
              window.RTCTrackEvent &&
              "receiver" in window.RTCTrackEvent.prototype &&
              !("transceiver" in window.RTCTrackEvent.prototype)
            ) {
              Object.defineProperty(window.RTCTrackEvent.prototype, "transceiver", {
                get: function get() {
                  return { receiver: this.receiver };
                }
              });
            }
          }

          function shimCreateOfferLegacy(window) {
            var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
            window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
              if (offerOptions) {
                if (typeof offerOptions.offerToReceiveAudio !== "undefined") {
                  // support bit values
                  offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
                }
                var audioTransceiver = this.getTransceivers().find(function(transceiver) {
                  return transceiver.receiver.track.kind === "audio";
                });
                if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                  if (audioTransceiver.direction === "sendrecv") {
                    if (audioTransceiver.setDirection) {
                      audioTransceiver.setDirection("sendonly");
                    } else {
                      audioTransceiver.direction = "sendonly";
                    }
                  } else if (audioTransceiver.direction === "recvonly") {
                    if (audioTransceiver.setDirection) {
                      audioTransceiver.setDirection("inactive");
                    } else {
                      audioTransceiver.direction = "inactive";
                    }
                  }
                } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
                  this.addTransceiver("audio");
                }

                if (typeof offerOptions.offerToReceiveVideo !== "undefined") {
                  // support bit values
                  offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
                }
                var videoTransceiver = this.getTransceivers().find(function(transceiver) {
                  return transceiver.receiver.track.kind === "video";
                });
                if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                  if (videoTransceiver.direction === "sendrecv") {
                    if (videoTransceiver.setDirection) {
                      videoTransceiver.setDirection("sendonly");
                    } else {
                      videoTransceiver.direction = "sendonly";
                    }
                  } else if (videoTransceiver.direction === "recvonly") {
                    if (videoTransceiver.setDirection) {
                      videoTransceiver.setDirection("inactive");
                    } else {
                      videoTransceiver.direction = "inactive";
                    }
                  }
                } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
                  this.addTransceiver("video");
                }
              }
              return origCreateOffer.apply(this, arguments);
            };
          }
        },
        { "../utils": 11 }
      ],
      11: [
        function(require, module, exports) {
          Object.defineProperty(exports, "__esModule", {
            value: true
          });

          var _typeof =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
              ? function(obj) {
                  return typeof obj;
                }
              : function(obj) {
                  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                    ? "symbol"
                    : typeof obj;
                };

          exports.extractVersion = extractVersion;
          exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
          exports.disableLog = disableLog;
          exports.disableWarnings = disableWarnings;
          exports.log = log;
          exports.deprecated = deprecated;
          exports.detectBrowser = detectBrowser;
          exports.compactObject = compactObject;
          exports.walkStats = walkStats;
          exports.filterStats = filterStats;

          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
            } else {
              obj[key] = value;
            }
            return obj;
          }

          var logDisabled_ = true;
          var deprecationWarnings_ = true;

          /**
           * Extract browser version out of the provided user agent string.
           *
           * @param {!string} uastring userAgent string.
           * @param {!string} expr Regular expression used as match criteria.
           * @param {!number} pos position in the version string to be returned.
           * @return {!number} browser version.
           */
          function extractVersion(uastring, expr, pos) {
            var match = uastring.match(expr);
            return match && match.length >= pos && parseInt(match[pos], 10);
          }

          // Wraps the peerconnection event eventNameToWrap in a function
          // which returns the modified event object (or false to prevent
          // the event).
          function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
            if (!window.RTCPeerConnection) {
              return;
            }
            var proto = window.RTCPeerConnection.prototype;
            var nativeAddEventListener = proto.addEventListener;
            proto.addEventListener = function(nativeEventName, cb) {
              if (nativeEventName !== eventNameToWrap) {
                return nativeAddEventListener.apply(this, arguments);
              }
              var wrappedCallback = function wrappedCallback(e) {
                var modifiedEvent = wrapper(e);
                if (modifiedEvent) {
                  cb(modifiedEvent);
                }
              };
              this._eventMap = this._eventMap || {};
              this._eventMap[cb] = wrappedCallback;
              return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
            };

            var nativeRemoveEventListener = proto.removeEventListener;
            proto.removeEventListener = function(nativeEventName, cb) {
              if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
                return nativeRemoveEventListener.apply(this, arguments);
              }
              var unwrappedCb = this._eventMap[cb];
              delete this._eventMap[cb];
              return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
            };

            Object.defineProperty(proto, "on" + eventNameToWrap, {
              get: function get() {
                return this["_on" + eventNameToWrap];
              },
              set: function set(cb) {
                if (this["_on" + eventNameToWrap]) {
                  this.removeEventListener(eventNameToWrap, this["_on" + eventNameToWrap]);
                  delete this["_on" + eventNameToWrap];
                }
                if (cb) {
                  this.addEventListener(eventNameToWrap, (this["_on" + eventNameToWrap] = cb));
                }
              },

              enumerable: true,
              configurable: true
            });
          }

          function disableLog(bool) {
            if (typeof bool !== "boolean") {
              return new Error(
                "Argument type: " +
                  (typeof bool === "undefined" ? "undefined" : _typeof(bool)) +
                  ". Please use a boolean."
              );
            }
            logDisabled_ = bool;
            return bool ? "adapter.js logging disabled" : "adapter.js logging enabled";
          }

          /**
           * Disable or enable deprecation warnings
           * @param {!boolean} bool set to true to disable warnings.
           */
          function disableWarnings(bool) {
            if (typeof bool !== "boolean") {
              return new Error(
                "Argument type: " +
                  (typeof bool === "undefined" ? "undefined" : _typeof(bool)) +
                  ". Please use a boolean."
              );
            }
            deprecationWarnings_ = !bool;
            return "adapter.js deprecation warnings " + (bool ? "disabled" : "enabled");
          }

          function log() {
            if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") {
              if (logDisabled_) {
                return;
              }
              if (typeof console !== "undefined" && typeof console.log === "function") {
                console.log.apply(console, arguments);
              }
            }
          }

          /**
           * Shows a deprecation warning suggesting the modern and spec-compatible API.
           */
          function deprecated(oldMethod, newMethod) {
            if (!deprecationWarnings_) {
              return;
            }
            console.warn(oldMethod + " is deprecated, please use " + newMethod + " instead.");
          }

          /**
           * Browser detector.
           *
           * @return {object} result containing browser and version
           *     properties.
           */
          function detectBrowser(window) {
            var navigator = window.navigator;

            // Returned result object.

            var result = { browser: null, version: null };

            // Fail early if it's not a browser
            if (typeof window === "undefined" || !window.navigator) {
              result.browser = "Not a browser.";
              return result;
            }

            if (navigator.mozGetUserMedia) {
              // Firefox.
              result.browser = "firefox";
              result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
            } else if (
              navigator.webkitGetUserMedia ||
              (window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer)
            ) {
              // Chrome, Chromium, Webview, Opera.
              // Version matches Chrome/WebRTC version.
              // Chrome 74 removed webkitGetUserMedia on http as well so we need the
              // more complicated fallback to webkitRTCPeerConnection.
              result.browser = "chrome";
              result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
            } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
              // Edge.
              result.browser = "edge";
              result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
            } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
              // Safari.
              result.browser = "safari";
              result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
              result.supportsUnifiedPlan =
                window.RTCRtpTransceiver && "currentDirection" in window.RTCRtpTransceiver.prototype;
            } else {
              // Default fallthrough: not supported.
              result.browser = "Not a supported browser.";
              return result;
            }

            return result;
          }

          /**
           * Checks if something is an object.
           *
           * @param {*} val The something you want to check.
           * @return true if val is an object, false otherwise.
           */
          function isObject(val) {
            return Object.prototype.toString.call(val) === "[object Object]";
          }

          /**
           * Remove all empty objects and undefined values
           * from a nested object -- an enhanced and vanilla version
           * of Lodash's `compact`.
           */
          function compactObject(data) {
            if (!isObject(data)) {
              return data;
            }

            return Object.keys(data).reduce(function(accumulator, key) {
              var isObj = isObject(data[key]);
              var value = isObj ? compactObject(data[key]) : data[key];
              var isEmptyObject = isObj && !Object.keys(value).length;
              if (value === undefined || isEmptyObject) {
                return accumulator;
              }
              return Object.assign(accumulator, _defineProperty({}, key, value));
            }, {});
          }

          /* iterates the stats graph recursively. */
          function walkStats(stats, base, resultSet) {
            if (!base || resultSet.has(base.id)) {
              return;
            }
            resultSet.set(base.id, base);
            Object.keys(base).forEach(function(name) {
              if (name.endsWith("Id")) {
                walkStats(stats, stats.get(base[name]), resultSet);
              } else if (name.endsWith("Ids")) {
                base[name].forEach(function(id) {
                  walkStats(stats, stats.get(id), resultSet);
                });
              }
            });
          }

          /* filter getStats for a sender/receiver track. */
          function filterStats(result, track, outbound) {
            var streamStatsType = outbound ? "outbound-rtp" : "inbound-rtp";
            var filteredResult = new Map();
            if (track === null) {
              return filteredResult;
            }
            var trackStats = [];
            result.forEach(function(value) {
              if (value.type === "track" && value.trackIdentifier === track.id) {
                trackStats.push(value);
              }
            });
            trackStats.forEach(function(trackStat) {
              result.forEach(function(stats) {
                if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
                  walkStats(result, stats, filteredResult);
                }
              });
            });
            return filteredResult;
          }
        },
        {}
      ],
      12: [function(require, module, exports) {}, {}],
      13: [
        function(require, module, exports) {
          // SDP helpers.
          var SDPUtils = {};

          // Generate an alphanumeric identifier for cname or mids.
          // TODO: use UUIDs instead? https://gist.github.com/jed/982883
          SDPUtils.generateIdentifier = function() {
            return Math.random()
              .toString(36)
              .substr(2, 10);
          };

          // The RTCP CNAME used by all peerconnections from the same JS.
          SDPUtils.localCName = SDPUtils.generateIdentifier();

          // Splits SDP into lines, dealing with both CRLF and LF.
          SDPUtils.splitLines = function(blob) {
            return blob
              .trim()
              .split("\n")
              .map(function(line) {
                return line.trim();
              });
          };
          // Splits SDP into sessionpart and mediasections. Ensures CRLF.
          SDPUtils.splitSections = function(blob) {
            var parts = blob.split("\nm=");
            return parts.map(function(part, index) {
              return (index > 0 ? "m=" + part : part).trim() + "\r\n";
            });
          };

          // returns the session description.
          SDPUtils.getDescription = function(blob) {
            var sections = SDPUtils.splitSections(blob);
            return sections && sections[0];
          };

          // returns the individual media sections.
          SDPUtils.getMediaSections = function(blob) {
            var sections = SDPUtils.splitSections(blob);
            sections.shift();
            return sections;
          };

          // Returns lines that start with a certain prefix.
          SDPUtils.matchPrefix = function(blob, prefix) {
            return SDPUtils.splitLines(blob).filter(function(line) {
              return line.indexOf(prefix) === 0;
            });
          };

          // Parses an ICE candidate line. Sample input:
          // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
          // rport 55996"
          SDPUtils.parseCandidate = function(line) {
            var parts;
            // Parse both variants.
            if (line.indexOf("a=candidate:") === 0) {
              parts = line.substring(12).split(" ");
            } else {
              parts = line.substring(10).split(" ");
            }

            var candidate = {
              foundation: parts[0],
              component: parseInt(parts[1], 10),
              protocol: parts[2].toLowerCase(),
              priority: parseInt(parts[3], 10),
              ip: parts[4],
              address: parts[4], // address is an alias for ip.
              port: parseInt(parts[5], 10),
              // skip parts[6] == 'typ'
              type: parts[7]
            };

            for (var i = 8; i < parts.length; i += 2) {
              switch (parts[i]) {
                case "raddr":
                  candidate.relatedAddress = parts[i + 1];
                  break;
                case "rport":
                  candidate.relatedPort = parseInt(parts[i + 1], 10);
                  break;
                case "tcptype":
                  candidate.tcpType = parts[i + 1];
                  break;
                case "ufrag":
                  candidate.ufrag = parts[i + 1]; // for backward compability.
                  candidate.usernameFragment = parts[i + 1];
                  break;
                default:
                  // extension handling, in particular ufrag
                  candidate[parts[i]] = parts[i + 1];
                  break;
              }
            }
            return candidate;
          };

          // Translates a candidate object into SDP candidate attribute.
          SDPUtils.writeCandidate = function(candidate) {
            var sdp = [];
            sdp.push(candidate.foundation);
            sdp.push(candidate.component);
            sdp.push(candidate.protocol.toUpperCase());
            sdp.push(candidate.priority);
            sdp.push(candidate.address || candidate.ip);
            sdp.push(candidate.port);

            var type = candidate.type;
            sdp.push("typ");
            sdp.push(type);
            if (type !== "host" && candidate.relatedAddress && candidate.relatedPort) {
              sdp.push("raddr");
              sdp.push(candidate.relatedAddress);
              sdp.push("rport");
              sdp.push(candidate.relatedPort);
            }
            if (candidate.tcpType && candidate.protocol.toLowerCase() === "tcp") {
              sdp.push("tcptype");
              sdp.push(candidate.tcpType);
            }
            if (candidate.usernameFragment || candidate.ufrag) {
              sdp.push("ufrag");
              sdp.push(candidate.usernameFragment || candidate.ufrag);
            }
            return "candidate:" + sdp.join(" ");
          };

          // Parses an ice-options line, returns an array of option tags.
          // a=ice-options:foo bar
          SDPUtils.parseIceOptions = function(line) {
            return line.substr(14).split(" ");
          };

          // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
          // a=rtpmap:111 opus/48000/2
          SDPUtils.parseRtpMap = function(line) {
            var parts = line.substr(9).split(" ");
            var parsed = {
              payloadType: parseInt(parts.shift(), 10) // was: id
            };

            parts = parts[0].split("/");

            parsed.name = parts[0];
            parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
            parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
            // legacy alias, got renamed back to channels in ORTC.
            parsed.numChannels = parsed.channels;
            return parsed;
          };

          // Generate an a=rtpmap line from RTCRtpCodecCapability or
          // RTCRtpCodecParameters.
          SDPUtils.writeRtpMap = function(codec) {
            var pt = codec.payloadType;
            if (codec.preferredPayloadType !== undefined) {
              pt = codec.preferredPayloadType;
            }
            var channels = codec.channels || codec.numChannels || 1;
            return (
              "a=rtpmap:" +
              pt +
              " " +
              codec.name +
              "/" +
              codec.clockRate +
              (channels !== 1 ? "/" + channels : "") +
              "\r\n"
            );
          };

          // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
          // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
          // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
          SDPUtils.parseExtmap = function(line) {
            var parts = line.substr(9).split(" ");
            return {
              id: parseInt(parts[0], 10),
              direction: parts[0].indexOf("/") > 0 ? parts[0].split("/")[1] : "sendrecv",
              uri: parts[1]
            };
          };

          // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
          // RTCRtpHeaderExtension.
          SDPUtils.writeExtmap = function(headerExtension) {
            return (
              "a=extmap:" +
              (headerExtension.id || headerExtension.preferredId) +
              (headerExtension.direction && headerExtension.direction !== "sendrecv"
                ? "/" + headerExtension.direction
                : "") +
              " " +
              headerExtension.uri +
              "\r\n"
            );
          };

          // Parses an ftmp line, returns dictionary. Sample input:
          // a=fmtp:96 vbr=on;cng=on
          // Also deals with vbr=on; cng=on
          SDPUtils.parseFmtp = function(line) {
            var parsed = {};
            var kv;
            var parts = line.substr(line.indexOf(" ") + 1).split(";");
            for (var j = 0; j < parts.length; j++) {
              kv = parts[j].trim().split("=");
              parsed[kv[0].trim()] = kv[1];
            }
            return parsed;
          };

          // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
          SDPUtils.writeFmtp = function(codec) {
            var line = "";
            var pt = codec.payloadType;
            if (codec.preferredPayloadType !== undefined) {
              pt = codec.preferredPayloadType;
            }
            if (codec.parameters && Object.keys(codec.parameters).length) {
              var params = [];
              Object.keys(codec.parameters).forEach(function(param) {
                if (codec.parameters[param]) {
                  params.push(param + "=" + codec.parameters[param]);
                } else {
                  params.push(param);
                }
              });
              line += "a=fmtp:" + pt + " " + params.join(";") + "\r\n";
            }
            return line;
          };

          // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
          // a=rtcp-fb:98 nack rpsi
          SDPUtils.parseRtcpFb = function(line) {
            var parts = line.substr(line.indexOf(" ") + 1).split(" ");
            return {
              type: parts.shift(),
              parameter: parts.join(" ")
            };
          };
          // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
          SDPUtils.writeRtcpFb = function(codec) {
            var lines = "";
            var pt = codec.payloadType;
            if (codec.preferredPayloadType !== undefined) {
              pt = codec.preferredPayloadType;
            }
            if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
              // FIXME: special handling for trr-int?
              codec.rtcpFeedback.forEach(function(fb) {
                lines +=
                  "a=rtcp-fb:" +
                  pt +
                  " " +
                  fb.type +
                  (fb.parameter && fb.parameter.length ? " " + fb.parameter : "") +
                  "\r\n";
              });
            }
            return lines;
          };

          // Parses an RFC 5576 ssrc media attribute. Sample input:
          // a=ssrc:3735928559 cname:something
          SDPUtils.parseSsrcMedia = function(line) {
            var sp = line.indexOf(" ");
            var parts = {
              ssrc: parseInt(line.substr(7, sp - 7), 10)
            };
            var colon = line.indexOf(":", sp);
            if (colon > -1) {
              parts.attribute = line.substr(sp + 1, colon - sp - 1);
              parts.value = line.substr(colon + 1);
            } else {
              parts.attribute = line.substr(sp + 1);
            }
            return parts;
          };

          SDPUtils.parseSsrcGroup = function(line) {
            var parts = line.substr(13).split(" ");
            return {
              semantics: parts.shift(),
              ssrcs: parts.map(function(ssrc) {
                return parseInt(ssrc, 10);
              })
            };
          };

          // Extracts the MID (RFC 5888) from a media section.
          // returns the MID or undefined if no mid line was found.
          SDPUtils.getMid = function(mediaSection) {
            var mid = SDPUtils.matchPrefix(mediaSection, "a=mid:")[0];
            if (mid) {
              return mid.substr(6);
            }
          };

          SDPUtils.parseFingerprint = function(line) {
            var parts = line.substr(14).split(" ");
            return {
              algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
              value: parts[1]
            };
          };

          // Extracts DTLS parameters from SDP media section or sessionpart.
          // FIXME: for consistency with other functions this should only
          //   get the fingerprint line as input. See also getIceParameters.
          SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
            var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, "a=fingerprint:");
            // Note: a=setup line is ignored since we use the 'auto' role.
            // Note2: 'algorithm' is not case sensitive except in Edge.
            return {
              role: "auto",
              fingerprints: lines.map(SDPUtils.parseFingerprint)
            };
          };

          // Serializes DTLS parameters to SDP.
          SDPUtils.writeDtlsParameters = function(params, setupType) {
            var sdp = "a=setup:" + setupType + "\r\n";
            params.fingerprints.forEach(function(fp) {
              sdp += "a=fingerprint:" + fp.algorithm + " " + fp.value + "\r\n";
            });
            return sdp;
          };
          // Parses ICE information from SDP media section or sessionpart.
          // FIXME: for consistency with other functions this should only
          //   get the ice-ufrag and ice-pwd lines as input.
          SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
            var lines = SDPUtils.splitLines(mediaSection);
            // Search in session part, too.
            lines = lines.concat(SDPUtils.splitLines(sessionpart));
            var iceParameters = {
              usernameFragment: lines
                .filter(function(line) {
                  return line.indexOf("a=ice-ufrag:") === 0;
                })[0]
                .substr(12),
              password: lines
                .filter(function(line) {
                  return line.indexOf("a=ice-pwd:") === 0;
                })[0]
                .substr(10)
            };
            return iceParameters;
          };

          // Serializes ICE parameters to SDP.
          SDPUtils.writeIceParameters = function(params) {
            return "a=ice-ufrag:" + params.usernameFragment + "\r\n" + "a=ice-pwd:" + params.password + "\r\n";
          };

          // Parses the SDP media section and returns RTCRtpParameters.
          SDPUtils.parseRtpParameters = function(mediaSection) {
            var description = {
              codecs: [],
              headerExtensions: [],
              fecMechanisms: [],
              rtcp: []
            };
            var lines = SDPUtils.splitLines(mediaSection);
            var mline = lines[0].split(" ");
            for (var i = 3; i < mline.length; i++) {
              // find all codecs from mline[3..]
              var pt = mline[i];
              var rtpmapline = SDPUtils.matchPrefix(mediaSection, "a=rtpmap:" + pt + " ")[0];
              if (rtpmapline) {
                var codec = SDPUtils.parseRtpMap(rtpmapline);
                var fmtps = SDPUtils.matchPrefix(mediaSection, "a=fmtp:" + pt + " ");
                // Only the first a=fmtp:<pt> is considered.
                codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
                codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, "a=rtcp-fb:" + pt + " ").map(
                  SDPUtils.parseRtcpFb
                );
                description.codecs.push(codec);
                // parse FEC mechanisms from rtpmap lines.
                switch (codec.name.toUpperCase()) {
                  case "RED":
                  case "ULPFEC":
                    description.fecMechanisms.push(codec.name.toUpperCase());
                    break;
                }
              }
            }
            SDPUtils.matchPrefix(mediaSection, "a=extmap:").forEach(function(line) {
              description.headerExtensions.push(SDPUtils.parseExtmap(line));
            });
            // FIXME: parse rtcp.
            return description;
          };

          // Generates parts of the SDP media section describing the capabilities /
          // parameters.
          SDPUtils.writeRtpDescription = function(kind, caps) {
            var sdp = "";

            // Build the mline.
            sdp += "m=" + kind + " ";
            sdp += caps.codecs.length > 0 ? "9" : "0"; // reject if no codecs.
            sdp += " UDP/TLS/RTP/SAVPF ";
            sdp +=
              caps.codecs
                .map(function(codec) {
                  if (codec.preferredPayloadType !== undefined) {
                    return codec.preferredPayloadType;
                  }
                  return codec.payloadType;
                })
                .join(" ") + "\r\n";

            sdp += "c=IN IP4 0.0.0.0\r\n";
            sdp += "a=rtcp:9 IN IP4 0.0.0.0\r\n";

            // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
            caps.codecs.forEach(function(codec) {
              sdp += SDPUtils.writeRtpMap(codec);
              sdp += SDPUtils.writeFmtp(codec);
              sdp += SDPUtils.writeRtcpFb(codec);
            });
            var maxptime = 0;
            caps.codecs.forEach(function(codec) {
              if (codec.maxptime > maxptime) {
                maxptime = codec.maxptime;
              }
            });
            if (maxptime > 0) {
              sdp += "a=maxptime:" + maxptime + "\r\n";
            }
            sdp += "a=rtcp-mux\r\n";

            if (caps.headerExtensions) {
              caps.headerExtensions.forEach(function(extension) {
                sdp += SDPUtils.writeExtmap(extension);
              });
            }
            // FIXME: write fecMechanisms.
            return sdp;
          };

          // Parses the SDP media section and returns an array of
          // RTCRtpEncodingParameters.
          SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
            var encodingParameters = [];
            var description = SDPUtils.parseRtpParameters(mediaSection);
            var hasRed = description.fecMechanisms.indexOf("RED") !== -1;
            var hasUlpfec = description.fecMechanisms.indexOf("ULPFEC") !== -1;

            // filter a=ssrc:... cname:, ignore PlanB-msid
            var ssrcs = SDPUtils.matchPrefix(mediaSection, "a=ssrc:")
              .map(function(line) {
                return SDPUtils.parseSsrcMedia(line);
              })
              .filter(function(parts) {
                return parts.attribute === "cname";
              });
            var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
            var secondarySsrc;

            var flows = SDPUtils.matchPrefix(mediaSection, "a=ssrc-group:FID").map(function(line) {
              var parts = line.substr(17).split(" ");
              return parts.map(function(part) {
                return parseInt(part, 10);
              });
            });
            if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
              secondarySsrc = flows[0][1];
            }

            description.codecs.forEach(function(codec) {
              if (codec.name.toUpperCase() === "RTX" && codec.parameters.apt) {
                var encParam = {
                  ssrc: primarySsrc,
                  codecPayloadType: parseInt(codec.parameters.apt, 10)
                };
                if (primarySsrc && secondarySsrc) {
                  encParam.rtx = { ssrc: secondarySsrc };
                }
                encodingParameters.push(encParam);
                if (hasRed) {
                  encParam = JSON.parse(JSON.stringify(encParam));
                  encParam.fec = {
                    ssrc: primarySsrc,
                    mechanism: hasUlpfec ? "red+ulpfec" : "red"
                  };
                  encodingParameters.push(encParam);
                }
              }
            });
            if (encodingParameters.length === 0 && primarySsrc) {
              encodingParameters.push({
                ssrc: primarySsrc
              });
            }

            // we support both b=AS and b=TIAS but interpret AS as TIAS.
            var bandwidth = SDPUtils.matchPrefix(mediaSection, "b=");
            if (bandwidth.length) {
              if (bandwidth[0].indexOf("b=TIAS:") === 0) {
                bandwidth = parseInt(bandwidth[0].substr(7), 10);
              } else if (bandwidth[0].indexOf("b=AS:") === 0) {
                // use formula from JSEP to convert b=AS to TIAS value.
                bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
              } else {
                bandwidth = undefined;
              }
              encodingParameters.forEach(function(params) {
                params.maxBitrate = bandwidth;
              });
            }
            return encodingParameters;
          };

          // parses http://draft.ortc.org/#rtcrtcpparameters*
          SDPUtils.parseRtcpParameters = function(mediaSection) {
            var rtcpParameters = {};

            // Gets the first SSRC. Note tha with RTX there might be multiple
            // SSRCs.
            var remoteSsrc = SDPUtils.matchPrefix(mediaSection, "a=ssrc:")
              .map(function(line) {
                return SDPUtils.parseSsrcMedia(line);
              })
              .filter(function(obj) {
                return obj.attribute === "cname";
              })[0];
            if (remoteSsrc) {
              rtcpParameters.cname = remoteSsrc.value;
              rtcpParameters.ssrc = remoteSsrc.ssrc;
            }

            // Edge uses the compound attribute instead of reducedSize
            // compound is !reducedSize
            var rsize = SDPUtils.matchPrefix(mediaSection, "a=rtcp-rsize");
            rtcpParameters.reducedSize = rsize.length > 0;
            rtcpParameters.compound = rsize.length === 0;

            // parses the rtcp-mux attrіbute.
            // Note that Edge does not support unmuxed RTCP.
            var mux = SDPUtils.matchPrefix(mediaSection, "a=rtcp-mux");
            rtcpParameters.mux = mux.length > 0;

            return rtcpParameters;
          };

          // parses either a=msid: or a=ssrc:... msid lines and returns
          // the id of the MediaStream and MediaStreamTrack.
          SDPUtils.parseMsid = function(mediaSection) {
            var parts;
            var spec = SDPUtils.matchPrefix(mediaSection, "a=msid:");
            if (spec.length === 1) {
              parts = spec[0].substr(7).split(" ");
              return { stream: parts[0], track: parts[1] };
            }
            var planB = SDPUtils.matchPrefix(mediaSection, "a=ssrc:")
              .map(function(line) {
                return SDPUtils.parseSsrcMedia(line);
              })
              .filter(function(msidParts) {
                return msidParts.attribute === "msid";
              });
            if (planB.length > 0) {
              parts = planB[0].value.split(" ");
              return { stream: parts[0], track: parts[1] };
            }
          };

          // SCTP
          // parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
          // to draft-ietf-mmusic-sctp-sdp-05
          SDPUtils.parseSctpDescription = function(mediaSection) {
            var mline = SDPUtils.parseMLine(mediaSection);
            var maxSizeLine = SDPUtils.matchPrefix(mediaSection, "a=max-message-size:");
            var maxMessageSize;
            if (maxSizeLine.length > 0) {
              maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
            }
            if (isNaN(maxMessageSize)) {
              maxMessageSize = 65536;
            }
            var sctpPort = SDPUtils.matchPrefix(mediaSection, "a=sctp-port:");
            if (sctpPort.length > 0) {
              return {
                port: parseInt(sctpPort[0].substr(12), 10),
                protocol: mline.fmt,
                maxMessageSize: maxMessageSize
              };
            }
            var sctpMapLines = SDPUtils.matchPrefix(mediaSection, "a=sctpmap:");
            if (sctpMapLines.length > 0) {
              var parts = SDPUtils.matchPrefix(mediaSection, "a=sctpmap:")[0]
                .substr(10)
                .split(" ");
              return {
                port: parseInt(parts[0], 10),
                protocol: parts[1],
                maxMessageSize: maxMessageSize
              };
            }
          };

          // SCTP
          // outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
          // support by now receiving in this format, unless we originally parsed
          // as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
          // protocol of DTLS/SCTP -- without UDP/ or TCP/)
          SDPUtils.writeSctpDescription = function(media, sctp) {
            var output = [];
            if (media.protocol !== "DTLS/SCTP") {
              output = [
                "m=" + media.kind + " 9 " + media.protocol + " " + sctp.protocol + "\r\n",
                "c=IN IP4 0.0.0.0\r\n",
                "a=sctp-port:" + sctp.port + "\r\n"
              ];
            } else {
              output = [
                "m=" + media.kind + " 9 " + media.protocol + " " + sctp.port + "\r\n",
                "c=IN IP4 0.0.0.0\r\n",
                "a=sctpmap:" + sctp.port + " " + sctp.protocol + " 65535\r\n"
              ];
            }
            if (sctp.maxMessageSize !== undefined) {
              output.push("a=max-message-size:" + sctp.maxMessageSize + "\r\n");
            }
            return output.join("");
          };

          // Generate a session ID for SDP.
          // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
          // recommends using a cryptographically random +ve 64-bit value
          // but right now this should be acceptable and within the right range
          SDPUtils.generateSessionId = function() {
            return Math.random()
              .toString()
              .substr(2, 21);
          };

          // Write boilder plate for start of SDP
          // sessId argument is optional - if not supplied it will
          // be generated randomly
          // sessVersion is optional and defaults to 2
          // sessUser is optional and defaults to 'thisisadapterortc'
          SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
            var sessionId;
            var version = sessVer !== undefined ? sessVer : 2;
            if (sessId) {
              sessionId = sessId;
            } else {
              sessionId = SDPUtils.generateSessionId();
            }
            var user = sessUser || "thisisadapterortc";
            // FIXME: sess-id should be an NTP timestamp.
            return (
              "v=0\r\n" +
              "o=" +
              user +
              " " +
              sessionId +
              " " +
              version +
              " IN IP4 127.0.0.1\r\n" +
              "s=-\r\n" +
              "t=0 0\r\n"
            );
          };

          SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
            var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

            // Map ICE parameters (ufrag, pwd) to SDP.
            sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

            // Map DTLS parameters to SDP.
            sdp += SDPUtils.writeDtlsParameters(
              transceiver.dtlsTransport.getLocalParameters(),
              type === "offer" ? "actpass" : "active"
            );

            sdp += "a=mid:" + transceiver.mid + "\r\n";

            if (transceiver.direction) {
              sdp += "a=" + transceiver.direction + "\r\n";
            } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
              sdp += "a=sendrecv\r\n";
            } else if (transceiver.rtpSender) {
              sdp += "a=sendonly\r\n";
            } else if (transceiver.rtpReceiver) {
              sdp += "a=recvonly\r\n";
            } else {
              sdp += "a=inactive\r\n";
            }

            if (transceiver.rtpSender) {
              // spec.
              var msid = "msid:" + stream.id + " " + transceiver.rtpSender.track.id + "\r\n";
              sdp += "a=" + msid;

              // for Chrome.
              sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " " + msid;
              if (transceiver.sendEncodingParameters[0].rtx) {
                sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " " + msid;
                sdp +=
                  "a=ssrc-group:FID " +
                  transceiver.sendEncodingParameters[0].ssrc +
                  " " +
                  transceiver.sendEncodingParameters[0].rtx.ssrc +
                  "\r\n";
              }
            }
            // FIXME: this should be written by writeRtpDescription.
            sdp += "a=ssrc:" + transceiver.sendEncodingParameters[0].ssrc + " cname:" + SDPUtils.localCName + "\r\n";
            if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
              sdp +=
                "a=ssrc:" + transceiver.sendEncodingParameters[0].rtx.ssrc + " cname:" + SDPUtils.localCName + "\r\n";
            }
            return sdp;
          };

          // Gets the direction from the mediaSection or the sessionpart.
          SDPUtils.getDirection = function(mediaSection, sessionpart) {
            // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
            var lines = SDPUtils.splitLines(mediaSection);
            for (var i = 0; i < lines.length; i++) {
              switch (lines[i]) {
                case "a=sendrecv":
                case "a=sendonly":
                case "a=recvonly":
                case "a=inactive":
                  return lines[i].substr(2);
                // FIXME: What should happen here?
              }
            }
            if (sessionpart) {
              return SDPUtils.getDirection(sessionpart);
            }
            return "sendrecv";
          };

          SDPUtils.getKind = function(mediaSection) {
            var lines = SDPUtils.splitLines(mediaSection);
            var mline = lines[0].split(" ");
            return mline[0].substr(2);
          };

          SDPUtils.isRejected = function(mediaSection) {
            return mediaSection.split(" ", 2)[1] === "0";
          };

          SDPUtils.parseMLine = function(mediaSection) {
            var lines = SDPUtils.splitLines(mediaSection);
            var parts = lines[0].substr(2).split(" ");
            return {
              kind: parts[0],
              port: parseInt(parts[1], 10),
              protocol: parts[2],
              fmt: parts.slice(3).join(" ")
            };
          };

          SDPUtils.parseOLine = function(mediaSection) {
            var line = SDPUtils.matchPrefix(mediaSection, "o=")[0];
            var parts = line.substr(2).split(" ");
            return {
              username: parts[0],
              sessionId: parts[1],
              sessionVersion: parseInt(parts[2], 10),
              netType: parts[3],
              addressType: parts[4],
              address: parts[5]
            };
          };

          // a very naive interpretation of a valid SDP.
          SDPUtils.isValidSDP = function(blob) {
            if (typeof blob !== "string" || blob.length === 0) {
              return false;
            }
            var lines = SDPUtils.splitLines(blob);
            for (var i = 0; i < lines.length; i++) {
              if (lines[i].length < 2 || lines[i].charAt(1) !== "=") {
                return false;
              }
              // TODO: check the modifier a bit more.
            }
            return true;
          };

          // Expose public methods.
          if (typeof module === "object") {
            module.exports = SDPUtils;
          }
        },
        {}
      ]
    },
    {},
    [1]
  );
});

unwrapExports(adapter_no_edge_no_global);

var f$2 = _wks;

var _wksExt = {
  f: f$2
};

var iterator = _wksExt.f("iterator");

var iterator$1 = iterator;

var _meta = createCommonjsModule(function(module) {
  var META = _uid("meta");

  var setDesc = _objectDp.f;
  var id = 0;
  var isExtensible =
    Object.isExtensible ||
    function() {
      return true;
    };
  var FREEZE = !_fails(function() {
    return isExtensible(Object.preventExtensions({}));
  });
  var setMeta = function(it) {
    setDesc(it, META, {
      value: {
        i: "O" + ++id, // object ID
        w: {} // weak collections IDs
      }
    });
  };
  var fastKey = function(it, create) {
    // return primitive with prefix
    if (!_isObject(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return "F";
      // not necessary to add metadata
      if (!create) return "E";
      // add missing metadata
      setMeta(it);
      // return object ID
    }
    return it[META].i;
  };
  var getWeak = function(it, create) {
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMeta(it);
      // return hash weak collections IDs
    }
    return it[META].w;
  };
  // add metadata on freeze-family methods calling
  var onFreeze = function(it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
    return it;
  };
  var meta = (module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  });
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty = _objectDp.f;
var _wksDefine = function(name) {
  var $Symbol = _core.Symbol || (_core.Symbol = {});
  if (name.charAt(0) != "_" && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
};

var f$3 = Object.getOwnPropertySymbols;

var _objectGops = {
  f: f$3
};

var f$4 = {}.propertyIsEnumerable;

var _objectPie = {
  f: f$4
};

// all enumerable object keys, includes symbols

var _enumKeys = function(it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, (key = symbols[i++]))) result.push(key);
  }
  return result;
};

// 7.2.2 IsArray(argument)

var _isArray =
  Array.isArray ||
  function isArray(arg) {
    return _cof(arg) == "Array";
  };

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat("length", "prototype");

var f$5 =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
  };

var _objectGopn = {
  f: f$5
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames =
  typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$6 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == "[object Window]" ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
  f: f$6
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$7 = _descriptors
  ? gOPD
  : function getOwnPropertyDescriptor(O, P) {
      O = _toIobject(O);
      P = _toPrimitive(P, true);
      if (_ie8DomDefine)
        try {
          return gOPD(O, P);
        } catch (e) {
          /* empty */
        }
      if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
    };

var _objectGopd = {
  f: f$7
};

// ECMAScript 6 symbols shim

var META = _meta.KEY;

var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = "prototype";
var HIDDEN = _wks("_hidden");
var TO_PRIMITIVE = _wks("toPrimitive");
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared("symbol-registry");
var AllSymbols = _shared("symbols");
var OPSymbols = _shared("op-symbols");
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE$1 = typeof $Symbol == "function" && !!_objectGops.f;
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc =
  _descriptors &&
  _fails(function() {
    return (
      _objectCreate(
        dP$1({}, "a", {
          get: function() {
            return dP$1(this, "a", { value: 7 }).a;
          }
        })
      ).a != 7
    );
  })
    ? function(it, key, D) {
        var protoDesc = gOPD$1(ObjectProto$1, key);
        if (protoDesc) delete ObjectProto$1[key];
        dP$1(it, key, D);
        if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
      }
    : dP$1;

var wrap = function(tag) {
  var sym = (AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]));
  sym._k = tag;
  return sym;
};

var isSymbol =
  USE_NATIVE$1 && typeof $Symbol.iterator == "symbol"
    ? function(it) {
        return typeof it == "symbol";
      }
    : function(it) {
        return it instanceof $Symbol;
      };

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    }
    return setSymbolDesc(it, key, D);
  }
  return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys((P = _toIobject(P)));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, (key = keys[i++]), P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, (key = _toPrimitive(key, true)));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || (_has(this, HIDDEN) && this[HIDDEN][key]) ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, (key = names[i++])) && key != HIDDEN && key != META) result.push(key);
  }
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, (key = names[i++])) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  }
  return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE$1) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], "toString", function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, "propertyIsEnumerable", $propertyIsEnumerable, true);
  }

  _wksExt.f = function(name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

for (
  var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
      ","
    ),
    j = 0;
  es6Symbols.length > j;

)
  _wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k; )
  _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE$1, "Symbol", {
  // 19.4.2.1 Symbol.for(key)
  for: function(key) {
    return _has(SymbolRegistry, (key += "")) ? SymbolRegistry[key] : (SymbolRegistry[key] = $Symbol(key));
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + " is not a symbol!");
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function() {
    setter = true;
  },
  useSimple: function() {
    setter = false;
  }
});

_export(_export.S + _export.F * !USE_NATIVE$1, "Object", {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = _fails(function() {
  _objectGops.f(1);
});

_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, "Object", {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return _objectGops.f(_toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON &&
  _export(
    _export.S +
      _export.F *
        (!USE_NATIVE$1 ||
          _fails(function() {
            var S = $Symbol();
            // MS Edge converts symbol values to JSON as {}
            // WebKit converts symbol values to JSON as null
            // V8 throws on boxed symbols
            return _stringify([S]) != "[null]" || _stringify({ a: S }) != "{}" || _stringify(Object(S)) != "{}";
          })),
    "JSON",
    {
      stringify: function stringify(it) {
        var args = [it];
        var i = 1;
        var replacer, $replacer;
        while (arguments.length > i) args.push(arguments[i++]);
        $replacer = replacer = args[1];
        if ((!_isObject(replacer) && it === undefined) || isSymbol(it)) return; // IE8 returns string on undefined
        if (!_isArray(replacer))
          replacer = function(key, value) {
            if (typeof $replacer == "function") value = $replacer.call(this, key, value);
            if (!isSymbol(value)) return value;
          };
        args[1] = replacer;
        return _stringify.apply($JSON, args);
      }
    }
  );

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, "Symbol");
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, "Math", true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, "JSON", true);

_wksDefine("asyncIterator");

_wksDefine("observable");

var symbol = _core.Symbol;

var symbol$1 = symbol;

var _typeof_1 = createCommonjsModule(function(module) {
  function _typeof2(obj) {
    if (typeof symbol$1 === "function" && typeof iterator$1 === "symbol") {
      _typeof2 = function _typeof2(obj) {
        return typeof obj;
      };
    } else {
      _typeof2 = function _typeof2(obj) {
        return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype
          ? "symbol"
          : typeof obj;
      };
    }
    return _typeof2(obj);
  }

  function _typeof(obj) {
    if (typeof symbol$1 === "function" && _typeof2(iterator$1) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype
          ? "symbol"
          : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

var js_cookie = createCommonjsModule(function(module, exports) {
  (function(factory) {
    var registeredInModuleLoader;
    {
      module.exports = factory();
      registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
      var OldCookies = window.Cookies;
      var api = (window.Cookies = factory());
      api.noConflict = function() {
        window.Cookies = OldCookies;
        return api;
      };
    }
  })(function() {
    function extend() {
      var i = 0;
      var result = {};
      for (; i < arguments.length; i++) {
        var attributes = arguments[i];
        for (var key in attributes) {
          result[key] = attributes[key];
        }
      }
      return result;
    }

    function decode(s) {
      return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }

    function init(converter) {
      function api() {}

      function set(key, value, attributes) {
        if (typeof document === "undefined") {
          return;
        }

        attributes = extend(
          {
            path: "/"
          },
          api.defaults,
          attributes
        );

        if (typeof attributes.expires === "number") {
          attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e5);
        }

        // We're using "expires" because "max-age" is not supported by IE
        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";

        try {
          var result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        value = converter.write
          ? converter.write(value, key)
          : encodeURIComponent(String(value)).replace(
              /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
              decodeURIComponent
            );

        key = encodeURIComponent(String(key))
          .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
          .replace(/[\(\)]/g, escape);

        var stringifiedAttributes = "";
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }
          stringifiedAttributes += "; " + attributeName;
          if (attributes[attributeName] === true) {
            continue;
          }

          // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...
          stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
        }

        return (document.cookie = key + "=" + value + stringifiedAttributes);
      }

      function get(key, json) {
        if (typeof document === "undefined") {
          return;
        }

        var jar = {};
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.
        var cookies = document.cookie ? document.cookie.split("; ") : [];
        var i = 0;

        for (; i < cookies.length; i++) {
          var parts = cookies[i].split("=");
          var cookie = parts.slice(1).join("=");

          if (!json && cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1);
          }

          try {
            var name = decode(parts[0]);
            cookie = (converter.read || converter)(cookie, name) || decode(cookie);

            if (json) {
              try {
                cookie = JSON.parse(cookie);
              } catch (e) {}
            }

            jar[name] = cookie;

            if (key === name) {
              break;
            }
          } catch (e) {}
        }

        return key ? jar[key] : jar;
      }

      api.set = set;
      api.get = function(key) {
        return get(key, false /* read as raw */);
      };
      api.getJSON = function(key) {
        return get(key, true /* read as json */);
      };
      api.remove = function(key, attributes) {
        set(
          key,
          "",
          extend(attributes, {
            expires: -1
          })
        );
      };

      api.defaults = {};

      api.withConverter = init;

      return api;
    }

    return init(function() {});
  });
});

var uaParser = createCommonjsModule(function(module, exports) {
  /*!
   * UAParser.js v0.7.20
   * Lightweight JavaScript-based User-Agent string parser
   * https://github.com/faisalman/ua-parser-js
   *
   * Copyright © 2012-2019 Faisal Salman <f@faisalman.com>
   * Licensed under MIT License
   */

  (function(window, undefined$1) {
    //////////////
    // Constants
    /////////////

    var LIBVERSION = "0.7.20",
      EMPTY = "",
      UNKNOWN = "?",
      FUNC_TYPE = "function",
      UNDEF_TYPE = "undefined",
      OBJ_TYPE = "object",
      STR_TYPE = "string",
      MAJOR = "major", // deprecated
      MODEL = "model",
      NAME = "name",
      TYPE = "type",
      VENDOR = "vendor",
      VERSION = "version",
      ARCHITECTURE = "architecture",
      CONSOLE = "console",
      MOBILE = "mobile",
      TABLET = "tablet",
      SMARTTV = "smarttv",
      WEARABLE = "wearable",
      EMBEDDED = "embedded";

    ///////////
    // Helper
    //////////

    var util = {
      extend: function(regexes, extensions) {
        var mergedRegexes = {};
        for (var i in regexes) {
          if (extensions[i] && extensions[i].length % 2 === 0) {
            mergedRegexes[i] = extensions[i].concat(regexes[i]);
          } else {
            mergedRegexes[i] = regexes[i];
          }
        }
        return mergedRegexes;
      },
      has: function(str1, str2) {
        if (typeof str1 === "string") {
          return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
        } else {
          return false;
        }
      },
      lowerize: function(str) {
        return str.toLowerCase();
      },
      major: function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, "").split(".")[0] : undefined$1;
      },
      trim: function(str) {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
      }
    };

    ///////////////
    // Map helper
    //////////////

    var mapper = {
      rgx: function(ua, arrays) {
        var i = 0,
          j,
          k,
          p,
          q,
          matches,
          match;

        // loop through all regexes maps
        while (i < arrays.length && !matches) {
          var regex = arrays[i], // even sequence (0,2,4,..)
            props = arrays[i + 1]; // odd sequence (1,3,5,..)
          j = k = 0;

          // try matching uastring with regexes
          while (j < regex.length && !matches) {
            matches = regex[j++].exec(ua);

            if (!!matches) {
              for (p = 0; p < props.length; p++) {
                match = matches[++k];
                q = props[p];
                // check if given property is actually array
                if (typeof q === OBJ_TYPE && q.length > 0) {
                  if (q.length == 2) {
                    if (typeof q[1] == FUNC_TYPE) {
                      // assign modified match
                      this[q[0]] = q[1].call(this, match);
                    } else {
                      // assign given value, ignore regex match
                      this[q[0]] = q[1];
                    }
                  } else if (q.length == 3) {
                    // check whether function or regex
                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                      // call function (usually string mapper)
                      this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
                    } else {
                      // sanitize match using given regex
                      this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
                    }
                  } else if (q.length == 4) {
                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
                  }
                } else {
                  this[q] = match ? match : undefined$1;
                }
              }
            }
          }
          i += 2;
        }
      },

      str: function(str, map) {
        for (var i in map) {
          // check if array
          if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
            for (var j = 0; j < map[i].length; j++) {
              if (util.has(map[i][j], str)) {
                return i === UNKNOWN ? undefined$1 : i;
              }
            }
          } else if (util.has(map[i], str)) {
            return i === UNKNOWN ? undefined$1 : i;
          }
        }
        return str;
      }
    };

    ///////////////
    // String map
    //////////////

    var maps = {
      browser: {
        oldsafari: {
          version: {
            "1.0": "/8",
            "1.2": "/1",
            "1.3": "/3",
            "2.0": "/412",
            "2.0.2": "/416",
            "2.0.3": "/417",
            "2.0.4": "/419",
            "?": "/"
          }
        }
      },

      device: {
        amazon: {
          model: {
            "Fire Phone": ["SD", "KF"]
          }
        },
        sprint: {
          model: {
            "Evo Shift 4G": "7373KT"
          },
          vendor: {
            HTC: "APA",
            Sprint: "Sprint"
          }
        }
      },

      os: {
        windows: {
          version: {
            ME: "4.90",
            "NT 3.11": "NT3.51",
            "NT 4.0": "NT4.0",
            "2000": "NT 5.0",
            XP: ["NT 5.1", "NT 5.2"],
            Vista: "NT 6.0",
            "7": "NT 6.1",
            "8": "NT 6.2",
            "8.1": "NT 6.3",
            "10": ["NT 6.4", "NT 10.0"],
            RT: "ARM"
          }
        }
      }
    };

    //////////////
    // Regex map
    /////////////

    var regexes = {
      browser: [
        [
          // Presto based
          /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
          /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
          /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
          /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80
        ],
        [NAME, VERSION],
        [
          /(opios)[\/\s]+([\w\.]+)/i // Opera mini on iphone >= 8.0
        ],
        [[NAME, "Opera Mini"], VERSION],
        [
          /\s(opr)\/([\w\.]+)/i // Opera Webkit
        ],
        [[NAME, "Opera"], VERSION],
        [
          // Mixed
          /(kindle)\/([\w\.]+)/i, // Kindle
          /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
          // Lunascape/Maxthon/Netfront/Jasmine/Blazer

          // Trident based
          /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
          // Avant/IEMobile/SlimBrowser/Baidu
          /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer

          // Webkit/KHTML based
          /(rekonq)\/([\w\.]*)/i, // Rekonq
          /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
          // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
        ],
        [NAME, VERSION],
        [
          /(konqueror)\/([\w\.]+)/i // Konqueror
        ],
        [[NAME, "Konqueror"], VERSION],
        [
          /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
        ],
        [[NAME, "IE"], VERSION],
        [
          /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i // Microsoft Edge
        ],
        [[NAME, "Edge"], VERSION],
        [
          /(yabrowser)\/([\w\.]+)/i // Yandex
        ],
        [[NAME, "Yandex"], VERSION],
        [
          /(puffin)\/([\w\.]+)/i // Puffin
        ],
        [[NAME, "Puffin"], VERSION],
        [
          /(focus)\/([\w\.]+)/i // Firefox Focus
        ],
        [[NAME, "Firefox Focus"], VERSION],
        [
          /(opt)\/([\w\.]+)/i // Opera Touch
        ],
        [[NAME, "Opera Touch"], VERSION],
        [
          /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i // UCBrowser
        ],
        [[NAME, "UCBrowser"], VERSION],
        [
          /(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
        ],
        [[NAME, /_/g, " "], VERSION],
        [
          /(windowswechat qbcore)\/([\w\.]+)/i // WeChat Desktop for Windows Built-in Browser
        ],
        [[NAME, "WeChat(Win) Desktop"], VERSION],
        [
          /(micromessenger)\/([\w\.]+)/i // WeChat
        ],
        [[NAME, "WeChat"], VERSION],
        [
          /(brave)\/([\w\.]+)/i // Brave browser
        ],
        [[NAME, "Brave"], VERSION],
        [
          /(qqbrowserlite)\/([\w\.]+)/i // QQBrowserLite
        ],
        [NAME, VERSION],
        [
          /(QQ)\/([\d\.]+)/i // QQ, aka ShouQ
        ],
        [NAME, VERSION],
        [
          /m?(qqbrowser)[\/\s]?([\w\.]+)/i // QQBrowser
        ],
        [NAME, VERSION],
        [
          /(BIDUBrowser)[\/\s]?([\w\.]+)/i // Baidu Browser
        ],
        [NAME, VERSION],
        [
          /(2345Explorer)[\/\s]?([\w\.]+)/i // 2345 Browser
        ],
        [NAME, VERSION],
        [
          /(MetaSr)[\/\s]?([\w\.]+)/i // SouGouBrowser
        ],
        [NAME],
        [
          /(LBBROWSER)/i // LieBao Browser
        ],
        [NAME],
        [
          /xiaomi\/miuibrowser\/([\w\.]+)/i // MIUI Browser
        ],
        [VERSION, [NAME, "MIUI Browser"]],
        [
          /;fbav\/([\w\.]+);/i // Facebook App for iOS & Android
        ],
        [VERSION, [NAME, "Facebook"]],
        [
          /safari\s(line)\/([\w\.]+)/i, // Line App for iOS
          /android.+(line)\/([\w\.]+)\/iab/i // Line App for Android
        ],
        [NAME, VERSION],
        [
          /headlesschrome(?:\/([\w\.]+)|\s)/i // Chrome Headless
        ],
        [VERSION, [NAME, "Chrome Headless"]],
        [
          /\swv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
        ],
        [[NAME, /(.+)/, "$1 WebView"], VERSION],
        [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
        [[NAME, /(.+(?:g|us))(.+)/, "$1 $2"], VERSION],
        [
          // Oculus / Samsung Browser

          /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i // Android Browser
        ],
        [VERSION, [NAME, "Android Browser"]],
        [
          /(sailfishbrowser)\/([\w\.]+)/i // Sailfish Browser
        ],
        [[NAME, "Sailfish Browser"], VERSION],
        [
          /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
          // Chrome/OmniWeb/Arora/Tizen/Nokia
        ],
        [NAME, VERSION],
        [
          /(dolfin)\/([\w\.]+)/i // Dolphin
        ],
        [[NAME, "Dolphin"], VERSION],
        [
          /((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
        ],
        [[NAME, "Chrome"], VERSION],
        [
          /(coast)\/([\w\.]+)/i // Opera Coast
        ],
        [[NAME, "Opera Coast"], VERSION],
        [
          /fxios\/([\w\.-]+)/i // Firefox for iOS
        ],
        [VERSION, [NAME, "Firefox"]],
        [
          /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
        ],
        [VERSION, [NAME, "Mobile Safari"]],
        [
          /version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
        ],
        [VERSION, NAME],
        [
          /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
        ],
        [[NAME, "GSA"], VERSION],
        [
          /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
        ],
        [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]],
        [/(webkit|khtml)\/([\w\.]+)/i],
        [NAME, VERSION],
        [
          // Gecko based
          /(navigator|netscape)\/([\w\.-]+)/i // Netscape
        ],
        [[NAME, "Netscape"], VERSION],
        [
          /(swiftfox)/i, // Swiftfox
          /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
          // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
          /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

          // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
          /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla

          // Other
          /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
          // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
          /(links)\s\(([\w\.]+)/i, // Links
          /(gobrowser)\/?([\w\.]*)/i, // GoBrowser
          /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
          /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
        ],
        [NAME, VERSION]
      ],

      cpu: [
        [
          /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
        ],
        [[ARCHITECTURE, "amd64"]],
        [
          /(ia32(?=;))/i // IA32 (quicktime)
        ],
        [[ARCHITECTURE, util.lowerize]],
        [
          /((?:i[346]|x)86)[;\)]/i // IA32
        ],
        [[ARCHITECTURE, "ia32"]],
        [
          // PocketPC mistakenly identified as PowerPC
          /windows\s(ce|mobile);\sppc;/i
        ],
        [[ARCHITECTURE, "arm"]],
        [
          /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
        ],
        [[ARCHITECTURE, /ower/, "", util.lowerize]],
        [
          /(sun4\w)[;\)]/i // SPARC
        ],
        [[ARCHITECTURE, "sparc"]],
        [
          /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
          // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
        ],
        [[ARCHITECTURE, util.lowerize]]
      ],

      device: [
        [
          /\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i // iPad/PlayBook
        ],
        [MODEL, VENDOR, [TYPE, TABLET]],
        [
          /applecoremedia\/[\w\.]+ \((ipad)/ // iPad
        ],
        [MODEL, [VENDOR, "Apple"], [TYPE, TABLET]],
        [
          /(apple\s{0,1}tv)/i // Apple TV
        ],
        [
          [MODEL, "Apple TV"],
          [VENDOR, "Apple"]
        ],
        [
          /(archos)\s(gamepad2?)/i, // Archos
          /(hp).+(touchpad)/i, // HP TouchPad
          /(hp).+(tablet)/i, // HP Tablet
          /(kindle)\/([\w\.]+)/i, // Kindle
          /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
          /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
        ],
        [VENDOR, MODEL, [TYPE, TABLET]],
        [
          /(kf[A-z]+)\sbuild\/.+silk\//i // Kindle Fire HD
        ],
        [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]],
        [
          /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i // Fire Phone
        ],
        [
          [MODEL, mapper.str, maps.device.amazon.model],
          [VENDOR, "Amazon"],
          [TYPE, MOBILE]
        ],
        [
          /android.+aft([bms])\sbuild/i // Fire TV
        ],
        [MODEL, [VENDOR, "Amazon"], [TYPE, SMARTTV]],
        [
          /\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
        ],
        [MODEL, VENDOR, [TYPE, MOBILE]],
        [
          /\((ip[honed|\s\w*]+);/i // iPod/iPhone
        ],
        [MODEL, [VENDOR, "Apple"], [TYPE, MOBILE]],
        [
          /(blackberry)[\s-]?(\w+)/i, // BlackBerry
          /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
          // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
          /(hp)\s([\w\s]+\w)/i, // HP iPAQ
          /(asus)-?(\w+)/i // Asus
        ],
        [VENDOR, MODEL, [TYPE, MOBILE]],
        [
          /\(bb10;\s(\w+)/i // BlackBerry 10
        ],
        [MODEL, [VENDOR, "BlackBerry"], [TYPE, MOBILE]],
        [
          // Asus Tablets
          /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i
        ],
        [MODEL, [VENDOR, "Asus"], [TYPE, TABLET]],
        [
          /(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
          /(sony)?(?:sgp.+)\sbuild\//i
        ],
        [
          [VENDOR, "Sony"],
          [MODEL, "Xperia Tablet"],
          [TYPE, TABLET]
        ],
        [/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
        [MODEL, [VENDOR, "Sony"], [TYPE, MOBILE]],
        [
          /\s(ouya)\s/i, // Ouya
          /(nintendo)\s([wids3u]+)/i // Nintendo
        ],
        [VENDOR, MODEL, [TYPE, CONSOLE]],
        [
          /android.+;\s(shield)\sbuild/i // Nvidia
        ],
        [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
        [
          /(playstation\s[34portablevi]+)/i // Playstation
        ],
        [MODEL, [VENDOR, "Sony"], [TYPE, CONSOLE]],
        [
          /(sprint\s(\w+))/i // Sprint Phones
        ],
        [
          [VENDOR, mapper.str, maps.device.sprint.vendor],
          [MODEL, mapper.str, maps.device.sprint.model],
          [TYPE, MOBILE]
        ],
        [
          /(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i, // HTC
          /(zte)-(\w*)/i, // ZTE
          /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
          // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
        ],
        [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
        [
          /(nexus\s9)/i // HTC Nexus 9
        ],
        [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
        [
          /d\/huawei([\w\s-]+)[;\)]/i,
          /(nexus\s6p)/i // Huawei
        ],
        [MODEL, [VENDOR, "Huawei"], [TYPE, MOBILE]],
        [
          /(microsoft);\s(lumia[\s\w]+)/i // Microsoft Lumia
        ],
        [VENDOR, MODEL, [TYPE, MOBILE]],
        [
          /[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
        ],
        [MODEL, [VENDOR, "Microsoft"], [TYPE, CONSOLE]],
        [
          /(kin\.[onetw]{3})/i // Microsoft Kin
        ],
        [
          [MODEL, /\./g, " "],
          [VENDOR, "Microsoft"],
          [TYPE, MOBILE]
        ],
        [
          // Motorola
          /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
          /mot[\s-]?(\w*)/i,
          /(XT\d{3,4}) build\//i,
          /(nexus\s6)/i
        ],
        [MODEL, [VENDOR, "Motorola"], [TYPE, MOBILE]],
        [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
        [MODEL, [VENDOR, "Motorola"], [TYPE, TABLET]],
        [
          /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i // HbbTV devices
        ],
        [
          [VENDOR, util.trim],
          [MODEL, util.trim],
          [TYPE, SMARTTV]
        ],
        [/hbbtv.+maple;(\d+)/i],
        [
          [MODEL, /^/, "SmartTV"],
          [VENDOR, "Samsung"],
          [TYPE, SMARTTV]
        ],
        [
          /\(dtv[\);].+(aquos)/i // Sharp
        ],
        [MODEL, [VENDOR, "Sharp"], [TYPE, SMARTTV]],
        [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
        [[VENDOR, "Samsung"], MODEL, [TYPE, TABLET]],
        [
          // Samsung
          /smart-tv.+(samsung)/i
        ],
        [VENDOR, [TYPE, SMARTTV], MODEL],
        [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i],
        [[VENDOR, "Samsung"], MODEL, [TYPE, MOBILE]],
        [
          /sie-(\w*)/i // Siemens
        ],
        [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
        [
          /(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
          /(nokia)[\s_-]?([\w-]*)/i
        ],
        [[VENDOR, "Nokia"], MODEL, [TYPE, MOBILE]],
        [
          /android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i // Acer
        ],
        [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
        [
          /android.+([vl]k\-?\d{3})\s+build/i // LG Tablet
        ],
        [MODEL, [VENDOR, "LG"], [TYPE, TABLET]],
        [
          /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
        ],
        [[VENDOR, "LG"], MODEL, [TYPE, TABLET]],
        [
          /(lg) netcast\.tv/i // LG SmartTV
        ],
        [VENDOR, MODEL, [TYPE, SMARTTV]],
        [
          /(nexus\s[45])/i, // LG
          /lg[e;\s\/-]+(\w*)/i,
          /android.+lg(\-?[\d\w]+)\s+build/i
        ],
        [MODEL, [VENDOR, "LG"], [TYPE, MOBILE]],
        [
          /(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i // Lenovo tablets
        ],
        [VENDOR, MODEL, [TYPE, TABLET]],
        [
          /android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
        ],
        [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
        [/(lenovo)[_\s-]?([\w-]+)/i],
        [VENDOR, MODEL, [TYPE, MOBILE]],
        [
          /linux;.+((jolla));/i // Jolla
        ],
        [VENDOR, MODEL, [TYPE, MOBILE]],
        [
          /((pebble))app\/[\d\.]+\s/i // Pebble
        ],
        [VENDOR, MODEL, [TYPE, WEARABLE]],
        [
          /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i // OPPO
        ],
        [VENDOR, MODEL, [TYPE, MOBILE]],
        [
          /crkey/i // Google Chromecast
        ],
        [
          [MODEL, "Chromecast"],
          [VENDOR, "Google"]
        ],
        [
          /android.+;\s(glass)\s\d/i // Google Glass
        ],
        [MODEL, [VENDOR, "Google"], [TYPE, WEARABLE]],
        [
          /android.+;\s(pixel c)[\s)]/i // Google Pixel C
        ],
        [MODEL, [VENDOR, "Google"], [TYPE, TABLET]],
        [
          /android.+;\s(pixel( [23])?( xl)?)[\s)]/i // Google Pixel
        ],
        [MODEL, [VENDOR, "Google"], [TYPE, MOBILE]],
        [
          /android.+;\s(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
          /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
          /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,
          // Xiaomi Mi
          /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i // Redmi Phones
        ],
        [
          [MODEL, /_/g, " "],
          [VENDOR, "Xiaomi"],
          [TYPE, MOBILE]
        ],
        [
          /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i // Mi Pad tablets
        ],
        [
          [MODEL, /_/g, " "],
          [VENDOR, "Xiaomi"],
          [TYPE, TABLET]
        ],
        [
          /android.+;\s(m[1-5]\snote)\sbuild/i // Meizu
        ],
        [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
        [/(mz)-([\w-]{2,})/i],
        [[VENDOR, "Meizu"], MODEL, [TYPE, MOBILE]],
        [
          /android.+a000(1)\s+build/i, // OnePlus
          /android.+oneplus\s(a\d{4})\s+build/i
        ],
        [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
        [
          /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i // RCA Tablets
        ],
        [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
        [
          /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i // Dell Venue Tablets
        ],
        [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
        [
          /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i // Verizon Tablet
        ],
        [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
        [
          /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i // Barnes & Noble Tablet
        ],
        [[VENDOR, "Barnes & Noble"], MODEL, [TYPE, TABLET]],
        [
          /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i // Barnes & Noble Tablet
        ],
        [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
        [
          /android.+;\s(k88)\sbuild/i // ZTE K Series Tablet
        ],
        [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
        [
          /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i // Swiss GEN Mobile
        ],
        [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
        [
          /android.+[;\/]\s*(zur\d{3})\s+build/i // Swiss ZUR Tablet
        ],
        [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
        [
          /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i // Zeki Tablets
        ],
        [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
        [
          /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
          /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i // Dragon Touch Tablet
        ],
        [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
        [
          /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i // Insignia Tablets
        ],
        [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
        [
          /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i // NextBook Tablets
        ],
        [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
        [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
        [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
        [
          // Voice Xtreme Phones

          /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i // LvTel Phones
        ],
        [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
        [/android.+;\s(PH-1)\s/i],
        [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
        [
          // Essential PH-1

          /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i // Envizen Tablets
        ],
        [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
        [
          /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i // Le Pan Tablets
        ],
        [VENDOR, MODEL, [TYPE, TABLET]],
        [
          /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i // MachSpeed Tablets
        ],
        [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
        [
          /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i // Trinity Tablets
        ],
        [VENDOR, MODEL, [TYPE, TABLET]],
        [
          /android.+[;\/]\s*TU_(1491)\s+build/i // Rotor Tablets
        ],
        [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
        [
          /android.+(KS(.+))\s+build/i // Amazon Kindle Tablets
        ],
        [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]],
        [
          /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i // Gigaset Tablets
        ],
        [VENDOR, MODEL, [TYPE, TABLET]],
        [
          /\s(tablet|tab)[;\/]/i, // Unidentifiable Tablet
          /\s(mobile)(?:[;\/]|\ssafari)/i // Unidentifiable Mobile
        ],
        [[TYPE, util.lowerize], VENDOR, MODEL],
        [
          /[\s\/\(](smart-?tv)[;\)]/i // SmartTV
        ],
        [[TYPE, SMARTTV]],
        [
          /(android[\w\.\s\-]{0,9});.+build/i // Generic Android Device
        ],
        [MODEL, [VENDOR, "Generic"]]
      ],

      engine: [
        [
          /windows.+\sedge\/([\w\.]+)/i // EdgeHTML
        ],
        [VERSION, [NAME, "EdgeHTML"]],
        [
          /webkit\/537\.36.+chrome\/(?!27)/i // Blink
        ],
        [[NAME, "Blink"]],
        [
          /(presto)\/([\w\.]+)/i, // Presto
          /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
          // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
          /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
          /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
        ],
        [NAME, VERSION],
        [
          /rv\:([\w\.]{1,9}).+(gecko)/i // Gecko
        ],
        [VERSION, NAME]
      ],

      os: [
        [
          // Windows based
          /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
        ],
        [NAME, VERSION],
        [
          /(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
          /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, // Windows Phone
          /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
        ],
        [NAME, [VERSION, mapper.str, maps.os.windows.version]],
        [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
        [
          [NAME, "Windows"],
          [VERSION, mapper.str, maps.os.windows.version]
        ],
        [
          // Mobile/Embedded OS
          /\((bb)(10);/i // BlackBerry 10
        ],
        [[NAME, "BlackBerry"], VERSION],
        [
          /(blackberry)\w*\/?([\w\.]*)/i, // Blackberry
          /(tizen)[\/\s]([\w\.]+)/i, // Tizen
          /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
          // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
        ],
        [NAME, VERSION],
        [
          /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i // Symbian
        ],
        [[NAME, "Symbian"], VERSION],
        [
          /\((series40);/i // Series 40
        ],
        [NAME],
        [
          /mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
        ],
        [[NAME, "Firefox OS"], VERSION],
        [
          // Console
          /(nintendo|playstation)\s([wids34portablevu]+)/i, // Nintendo/Playstation

          // GNU/Linux based
          /(mint)[\/\s\(]?(\w*)/i, // Mint
          /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
          /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
          // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
          // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
          /(hurd|linux)\s?([\w\.]*)/i, // Hurd/Linux
          /(gnu)\s?([\w\.]*)/i // GNU
        ],
        [NAME, VERSION],
        [
          /(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
        ],
        [[NAME, "Chromium OS"], VERSION],
        [
          // Solaris
          /(sunos)\s?([\w\.\d]*)/i // Solaris
        ],
        [[NAME, "Solaris"], VERSION],
        [
          // BSD based
          /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
        ],
        [NAME, VERSION],
        [
          /(haiku)\s(\w+)/i // Haiku
        ],
        [NAME, VERSION],
        [
          /cfnetwork\/.+darwin/i,
          /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i // iOS
        ],
        [
          [VERSION, /_/g, "."],
          [NAME, "iOS"]
        ],
        [
          /(mac\sos\sx)\s?([\w\s\.]*)/i,
          /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
        ],
        [
          [NAME, "Mac OS"],
          [VERSION, /_/g, "."]
        ],
        [
          // Other
          /((?:open)?solaris)[\/\s-]?([\w\.]*)/i, // Solaris
          /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, // AIX
          /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
          // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
          /(unix)\s?([\w\.]*)/i // UNIX
        ],
        [NAME, VERSION]
      ]
    };

    /////////////////
    // Constructor
    ////////////////
    var UAParser = function(uastring, extensions) {
      if (typeof uastring === "object") {
        extensions = uastring;
        uastring = undefined$1;
      }

      if (!(this instanceof UAParser)) {
        return new UAParser(uastring, extensions).getResult();
      }

      var ua =
        uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
      var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

      this.getBrowser = function() {
        var browser = { name: undefined$1, version: undefined$1 };
        mapper.rgx.call(browser, ua, rgxmap.browser);
        browser.major = util.major(browser.version); // deprecated
        return browser;
      };
      this.getCPU = function() {
        var cpu = { architecture: undefined$1 };
        mapper.rgx.call(cpu, ua, rgxmap.cpu);
        return cpu;
      };
      this.getDevice = function() {
        var device = { vendor: undefined$1, model: undefined$1, type: undefined$1 };
        mapper.rgx.call(device, ua, rgxmap.device);
        return device;
      };
      this.getEngine = function() {
        var engine = { name: undefined$1, version: undefined$1 };
        mapper.rgx.call(engine, ua, rgxmap.engine);
        return engine;
      };
      this.getOS = function() {
        var os = { name: undefined$1, version: undefined$1 };
        mapper.rgx.call(os, ua, rgxmap.os);
        return os;
      };
      this.getResult = function() {
        return {
          ua: this.getUA(),
          browser: this.getBrowser(),
          engine: this.getEngine(),
          os: this.getOS(),
          device: this.getDevice(),
          cpu: this.getCPU()
        };
      };
      this.getUA = function() {
        return ua;
      };
      this.setUA = function(uastring) {
        ua = uastring;
        return this;
      };
      return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
      NAME: NAME,
      MAJOR: MAJOR, // deprecated
      VERSION: VERSION
    };
    UAParser.CPU = {
      ARCHITECTURE: ARCHITECTURE
    };
    UAParser.DEVICE = {
      MODEL: MODEL,
      VENDOR: VENDOR,
      TYPE: TYPE,
      CONSOLE: CONSOLE,
      MOBILE: MOBILE,
      SMARTTV: SMARTTV,
      TABLET: TABLET,
      WEARABLE: WEARABLE,
      EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
      NAME: NAME,
      VERSION: VERSION
    };
    UAParser.OS = {
      NAME: NAME,
      VERSION: VERSION
    };

    ///////////
    // Export
    //////////

    // check js environment
    {
      // nodejs env
      if (module.exports) {
        exports = module.exports = UAParser;
      }
      exports.UAParser = UAParser;
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window && (window.jQuery || window.Zepto);
    if (typeof $ !== UNDEF_TYPE && !$.ua) {
      var parser = new UAParser();
      $.ua = parser.getResult();
      $.ua.get = function() {
        return parser.getUA();
      };
      $.ua.set = function(uastring) {
        parser.setUA(uastring);
        var result = parser.getResult();
        for (var prop in result) {
          $.ua[prop] = result[prop];
        }
      };
    }
  })(typeof window === "object" ? window : commonjsGlobal);
});
var uaParser_1 = uaParser.UAParser;

var BrowserCompatibility;

(function(BrowserCompatibility) {
  /**
   * Browser feature.
   */
  var Feature;

  (function(Feature) {
    /**
     * [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) -
     * [current support?](https://caniuse.com/#feat=blobbuilder)
     */
    Feature["BLOB"] = "blob";
    /**
     * [MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) -
     * [current support?](https://caniuse.com/#feat=stream)
     */

    Feature["MEDIA_DEVICES"] = "mediaDevices";
    /**
     * [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) -
     * [current support?](https://caniuse.com/#feat=offscreencanvas)
     */

    Feature["OFFSCREEN_CANVAS"] = "offscreenCanvas";
    /**
     * [URL/createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) -
     * [current support?](https://caniuse.com/#feat=bloburls)
     */

    Feature["URL_OBJECT"] = "urlObject";
    /**
     * [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) -
     * [current support?](https://caniuse.com/#feat=webworkers)
     */

    Feature["WEB_WORKERS"] = "webWorkers";
    /**
     * [WebAssembly](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/WebAssembly) -
     * [current support?](https://caniuse.com/#feat=wasm)
     */

    Feature["WEB_ASSEMBLY"] = "webAssembly";
    /**
     * WebAssembly without memory corruption (specific iOS version 11.2.2/11.2.5/11.2.6 bug)
     */

    Feature["WEB_ASSEMBLY_ERROR_FREE"] = "webAssemblyErrorFree";
    /**
     * [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) -
     * [current support?](https://caniuse.com/#feat=webgl)
     */

    Feature["WEBGL"] = "webgl";
  })((Feature = BrowserCompatibility.Feature || (BrowserCompatibility.Feature = {})));
})(BrowserCompatibility || (BrowserCompatibility = {}));

var BrowserHelper;

(function(BrowserHelper) {
  /**
   * @hidden
   */
  BrowserHelper.userAgentInfo = new uaParser_1(navigator.userAgent);
  /**
   * @hidden
   */

  BrowserHelper.canvas = document.createElement("canvas");
  /**
   * @returns The built [[BrowserCompatibility]] object representing the current OS/Browser's support for features.
   */

  function checkBrowserCompatibility() {
    function objectHasPropertyWithType(object, propertyNames, propertyType) {
      // tslint:disable-next-line:no-any
      var objectProperty = object[propertyNames[0]];

      if (objectProperty == null) {
        return false;
      }

      if (propertyNames.length === 1) {
        return _typeof_1(objectProperty) === propertyType;
      } else {
        return (
          (typeof objectProperty === "function" || _typeof_1(objectProperty) === "object") &&
          objectHasPropertyWithType(objectProperty, propertyNames.slice(1), propertyType)
        );
      }
    }

    function isBrokenWebAssemblyOS(os) {
      return os.name === "iOS" && os.version != null && ["11.2.2", "11.2.5", "11.2.6"].includes(os.version);
    }

    var fullSupport = true;
    var scannerSupport = true;
    var missingFeatures = [];

    if (
      !objectHasPropertyWithType(navigator, ["mediaDevices", "getUserMedia"], "function") &&
      !objectHasPropertyWithType(navigator, ["enumerateDevices"], "function") &&
      !objectHasPropertyWithType(window, ["MediaStreamTrack", "getSources"], "function")
    ) {
      missingFeatures.push(BrowserCompatibility.Feature.MEDIA_DEVICES);
      fullSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["Worker"], "function")) {
      missingFeatures.push(BrowserCompatibility.Feature.WEB_WORKERS);
      fullSupport = scannerSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["WebAssembly"], "object")) {
      missingFeatures.push(BrowserCompatibility.Feature.WEB_ASSEMBLY);
      fullSupport = scannerSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["Blob"], "function")) {
      missingFeatures.push(BrowserCompatibility.Feature.BLOB);
      fullSupport = scannerSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["URL", "createObjectURL"], "function")) {
      missingFeatures.push(BrowserCompatibility.Feature.URL_OBJECT);
      fullSupport = scannerSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["OffscreenCanvas"], "function")) {
      missingFeatures.push(BrowserCompatibility.Feature.OFFSCREEN_CANVAS);
    }

    try {
      if (
        !objectHasPropertyWithType(window, ["WebGLRenderingContext"], "function") ||
        (BrowserHelper.canvas.getContext("webgl") == null &&
          BrowserHelper.canvas.getContext("experimental-webgl") == null)
      ) {
        throw new Error();
      }
    } catch (_unused) {
      missingFeatures.push(BrowserCompatibility.Feature.WEBGL);
    }

    var userAgentOS = BrowserHelper.userAgentInfo.getOS();

    if (isBrokenWebAssemblyOS(userAgentOS)) {
      missingFeatures.push(BrowserCompatibility.Feature.WEB_ASSEMBLY_ERROR_FREE);
      fullSupport = scannerSupport = false;
    }

    return {
      fullSupport: fullSupport,
      scannerSupport: scannerSupport,
      missingFeatures: missingFeatures
    };
  }

  BrowserHelper.checkBrowserCompatibility = checkBrowserCompatibility;
  /**
   * @hidden
   *
   * Get a device id for the current browser, when available it's retrieved from a cookie,
   * when not it's randomly generated and stored in a cookie to be retrieved by later calls.
   *
   * @returns The device id for the current browser.
   */

  function getDeviceId() {
    var cookieKey = "scandit-device-id";
    var storedDeviceId = js_cookie.get("scandit-device-id");

    if (storedDeviceId != null && storedDeviceId !== "") {
      return storedDeviceId;
    }

    var hexCharacters = "0123456789abcdef";
    var randomDeviceId = "";

    for (var i = 0; i < 40; ++i) {
      // tslint:disable-next-line:insecure-random
      randomDeviceId += hexCharacters.charAt(Math.floor(Math.random() * 16));
    }

    js_cookie.set(cookieKey, randomDeviceId, {
      expires: 3650
    });
    return randomDeviceId;
  }

  BrowserHelper.getDeviceId = getDeviceId;
  /**
   * @hidden
   *
   * Check if a given object is a valid HTMLElement
   *
   * @param object The object to check.
   * @returns Whether the given object is a valid HTMLElement.
   */
  // tslint:disable-next-line:no-any

  function isValidHTMLElement(object) {
    return (
      object instanceof HTMLElement ||
      (object != null && _typeof_1(object) === "object" && typeof object.tagName === "string")
    );
  }

  BrowserHelper.isValidHTMLElement = isValidHTMLElement;
})(BrowserHelper || (BrowserHelper = {}));

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */

var check = function(O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set:
    Object.setPrototypeOf ||
    ("__proto__" in {} // eslint-disable-line
      ? (function(test, buggy, set) {
          try {
            set = _ctx(Function.call, _objectGopd.f(Object.prototype, "__proto__").set, 2);
            set(test, []);
            buggy = !(test instanceof Array);
          } catch (e) {
            buggy = true;
          }
          return function setPrototypeOf(O, proto) {
            check(O, proto);
            if (buggy) O.__proto__ = proto;
            else set(O, proto);
            return O;
          };
        })({}, false)
      : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, "Object", { setPrototypeOf: _setProto.set });

var setPrototypeOf = _core.Object.setPrototypeOf;

var setPrototypeOf$1 = setPrototypeOf;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

// most Object methods by ES6 should accept primitives

var _objectSap = function(KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(
    _export.S +
      _export.F *
        _fails(function() {
          fn(1);
        }),
    "Object",
    exp
  );
};

// 19.1.2.9 Object.getPrototypeOf(O)

_objectSap("getPrototypeOf", function() {
  return function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  };
});

var getPrototypeOf = _core.Object.getPrototypeOf;

var getPrototypeOf$1 = getPrototypeOf;

var getPrototypeOf$2 = createCommonjsModule(function(module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = setPrototypeOf$1
      ? getPrototypeOf$1
      : function _getPrototypeOf(o) {
          return o.__proto__ || getPrototypeOf$1(o);
        };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
});

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, "Object", { create: _objectCreate });

var $Object = _core.Object;
var create = function create(P, D) {
  return $Object.create(P, D);
};

var create$1 = create;

var setPrototypeOf$2 = createCommonjsModule(function(module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf =
      setPrototypeOf$1 ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = create$1(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf$2(subClass, superClass);
}

var inherits = _inherits;

var _validateCollection = function(it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError("Incompatible receiver, " + TYPE + " required!");
  return it;
};

var dP$2 = _objectDp.f;

var fastKey = _meta.fastKey;

var SIZE = _descriptors ? "_s" : "size";

var getEntry = function(that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== "F") return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function(that, iterable) {
      _anInstance(that, C, NAME, "_i");
      that._t = NAME; // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined; // first entry
      that._l = undefined; // last entry
      that[SIZE] = 0; // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      delete: function(key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }
        return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while ((entry = entry ? entry.n : this._f)) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors)
      dP$2(C.prototype, "size", {
        get: function() {
          return _validateCollection(this, NAME)[SIZE];
        }
      });
    return C;
  },
  def: function(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
      // create new entry
    } else {
      that._l = entry = {
        i: (index = fastKey(key, true)), // <- index
        k: key, // <- key
        v: value, // <- value
        p: (prev = that._l), // <- previous entry
        n: undefined, // <- next entry
        r: false // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== "F") that._i[index] = entry;
    }
    return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(
      C,
      NAME,
      function(iterated, kind) {
        this._t = _validateCollection(iterated, NAME); // target
        this._k = kind; // kind
        this._l = undefined; // previous
      },
      function() {
        var that = this;
        var kind = that._k;
        var entry = that._l;
        // revert to the last existing entry
        while (entry && entry.r) entry = entry.p;
        // get next entry
        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
          // or finish the iteration
          that._t = undefined;
          return _iterStep(1);
        }
        // return step by kind
        if (kind == "keys") return _iterStep(0, entry.k);
        if (kind == "values") return _iterStep(0, entry.v);
        return _iterStep(0, [entry.k, entry.v]);
      },
      IS_MAP ? "entries" : "values",
      !IS_MAP,
      true
    );

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

var SPECIES$2 = _wks("species");

var _arraySpeciesConstructor = function(original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == "function" && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES$2];
      if (C === null) C = undefined;
    }
  }
  return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)

var _arraySpeciesCreate = function(original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex

var _arrayMethods = function(TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (; length > index; index++)
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res;
          // map
          else if (res)
            switch (TYPE) {
              case 3:
                return true; // some
              case 5:
                return val; // find
              case 6:
                return index; // findIndex
              case 2:
                result.push(val); // filter
            }
          else if (IS_EVERY) return false; // every
        }
      }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var dP$3 = _objectDp.f;
var each = _arrayMethods(0);

var _collection = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? "set" : "add";
  var proto = C && C.prototype;
  var O = {};
  if (
    !_descriptors ||
    typeof C != "function" ||
    !(
      IS_WEAK ||
      (proto.forEach &&
        !_fails(function() {
          new C().entries().next();
        }))
    )
  ) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable) {
      _anInstance(target, C, NAME, "_c");
      target._c = new Base();
      if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","), function(KEY) {
      var IS_ADDER = KEY == "add" || KEY == "set";
      if (KEY in proto && !(IS_WEAK && KEY == "clear"))
        _hide(C.prototype, KEY, function(a, b) {
          _anInstance(this, C, KEY);
          if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == "get" ? undefined : false;
          var result = this._c[KEY](a === 0 ? 0 : a, b);
          return IS_ADDER ? this : result;
        });
    });
    IS_WEAK ||
      dP$3(C.prototype, "size", {
        get: function() {
          return this._c.size;
        }
      });
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var MAP = "Map";

// 23.1 Map Objects
var es6_map = _collection(
  MAP,
  function(get) {
    return function Map() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  },
  {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key) {
      var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value) {
      return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
    }
  },
  _collectionStrong,
  true
);

var _arrayFromIterable = function(iter, ITERATOR) {
  var result = [];
  _forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON

var _collectionToJson = function(NAME) {
  return function toJSON() {
    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return _arrayFromIterable(this);
  };
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON

_export(_export.P + _export.R, "Map", { toJSON: _collectionToJson("Map") });

// https://tc39.github.io/proposal-setmap-offrom/

var _setCollectionOf = function(COLLECTION) {
  _export(_export.S, COLLECTION, {
    of: function of() {
      var length = arguments.length;
      var A = new Array(length);
      while (length--) A[length] = arguments[length];
      return new this(A);
    }
  });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
_setCollectionOf("Map");

// https://tc39.github.io/proposal-setmap-offrom/

var _setCollectionFrom = function(COLLECTION) {
  _export(_export.S, COLLECTION, {
    from: function from(source /* , mapFn, thisArg */) {
      var mapFn = arguments[1];
      var mapping, A, n, cb;
      _aFunction(this);
      mapping = mapFn !== undefined;
      if (mapping) _aFunction(mapFn);
      if (source == undefined) return new this();
      A = [];
      if (mapping) {
        n = 0;
        cb = _ctx(mapFn, arguments[2], 2);
        _forOf(source, false, function(nextItem) {
          A.push(cb(nextItem, n++));
        });
      } else {
        _forOf(source, false, A.push, A);
      }
      return new this(A);
    }
  });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
_setCollectionFrom("Map");

var map = _core.Map;

var map$1 = map;

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

var isNativeFunction = _isNativeFunction;

var arraySlice = [].slice;
var factories = {};

var construct = function(F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = "a[" + i + "]";
    // eslint-disable-next-line no-new-func
    factories[len] = Function("F,a", "return new F(" + n.join(",") + ")");
  }
  return factories[len](F, args);
};

var _bind =
  Function.bind ||
  function bind(that /* , ...args */) {
    var fn = _aFunction(this);
    var partArgs = arraySlice.call(arguments, 1);
    var bound = function(/* args... */) {
      var args = partArgs.concat(arraySlice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
    };
    if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
    return bound;
  };

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])

var rConstruct = (_global.Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = _fails(function() {
  function F() {
    /* empty */
  }
  return !(
    rConstruct(
      function() {
        /* empty */
      },
      [],
      F
    ) instanceof F
  );
});
var ARGS_BUG = !_fails(function() {
  rConstruct(function() {
    /* empty */
  });
});

_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), "Reflect", {
  construct: function construct(Target, args /* , newTarget */) {
    _aFunction(Target);
    _anObject(args);
    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();
        case 1:
          return new Target(args[0]);
        case 2:
          return new Target(args[0], args[1]);
        case 3:
          return new Target(args[0], args[1], args[2]);
        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (_bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return _isObject(result) ? result : instance;
  }
});

var construct$1 = _core.Reflect.construct;

var construct$2 = construct$1;

var construct$3 = createCommonjsModule(function(module) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !construct$2) return false;
    if (construct$2.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(construct$2(Date, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = construct$2;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf$2(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct;
});

var wrapNativeSuper = createCommonjsModule(function(module) {
  function _wrapNativeSuper(Class) {
    var _cache = typeof map$1 === "function" ? new map$1() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct$3(Class, arguments, getPrototypeOf$2(this).constructor);
      }

      Wrapper.prototype = create$1(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return setPrototypeOf$2(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper;
});

/**
 * @hidden
 */
var CustomError =
  /*#__PURE__*/
  (function(_Error) {
    inherits(CustomError, _Error);

    // istanbul ignore next
    function CustomError() {
      var _this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? "" : _ref$name,
        _ref$message = _ref.message,
        message = _ref$message === void 0 ? "" : _ref$message;

      classCallCheck(this, CustomError);

      _this = possibleConstructorReturn(this, getPrototypeOf$2(CustomError).call(this, message));

      setPrototypeOf$1(assertThisInitialized(_this), CustomError.prototype);

      _this.name = name;
      return _this;
    }

    return CustomError;
  })(wrapNativeSuper(Error));

/**
 * @hidden
 */

var UnsupportedBrowserError =
  /*#__PURE__*/
  (function(_CustomError) {
    inherits(UnsupportedBrowserError, _CustomError);

    // istanbul ignore next
    function UnsupportedBrowserError(browserCompatibility) {
      var _this;

      classCallCheck(this, UnsupportedBrowserError);

      _this = possibleConstructorReturn(
        this,
        getPrototypeOf$2(UnsupportedBrowserError).call(this, {
          name: "UnsupportedBrowserError",
          message: "This OS / Browser has one or more missing features preventing it from working correctly"
        })
      );
      _this.data = browserCompatibility;
      return _this;
    }

    return UnsupportedBrowserError;
  })(CustomError);

___$insertStyle(
  '.scandit.scandit-container{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;overflow:hidden}.scandit.scandit-barcode-picker{position:relative;width:100%;height:100%;background-color:#000}.scandit .scandit-video{width:100%;height:100%;position:relative;display:block}.scandit .scandit-video.mirrored{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.scandit .scandit-logo{bottom:5%;right:5%;max-width:35%;max-height:12.5%}.scandit .scandit-laser,.scandit .scandit-logo{position:absolute;pointer-events:none;-webkit-transform:translateZ(0);transform:translateZ(0)}.scandit .scandit-laser{z-index:10;box-sizing:border-box;top:-9999px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.scandit .scandit-laser img{width:100%;max-height:47px}.scandit .scandit-laser img,.scandit .scandit-viewfinder{position:absolute;-webkit-transition:opacity .25s ease;transition:opacity .25s ease;-webkit-animation-duration:.25s;animation-duration:.25s}.scandit .scandit-viewfinder{z-index:10;box-sizing:border-box;border:2px solid #fff;border-radius:10px;top:-9999px;pointer-events:none;-webkit-transform:translateZ(0);transform:translateZ(0)}.scandit .scandit-viewfinder.paused{opacity:.4}.scandit .scandit-camera-switcher,.scandit .scandit-torch-toggle{-webkit-tap-highlight-color:rgba(255,255,255,0);position:absolute;top:5%;max-width:15%;max-height:15%;z-index:10;cursor:pointer;-webkit-filter:drop-shadow(0 2px 0 grey);filter:drop-shadow(0 2px 0 #808080);-webkit-transform:translateZ(0);transform:translateZ(0)}.scandit .scandit-camera-switcher{left:5%}.scandit .scandit-torch-toggle{right:5%}.scandit .scandit-camera-upload{-webkit-tap-highlight-color:rgba(255,255,255,0);display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;width:100%;height:100%;z-index:5}.scandit .scandit-camera-upload label{cursor:pointer;text-align:center;width:224px;height:224px;min-width:224px;min-height:224px;z-index:10;margin:4px;padding:20px;box-sizing:border-box;border-radius:50%;-webkit-filter:drop-shadow(0 0 .15rem #000);filter:drop-shadow(0 0 .15rem #000)}.scandit .scandit-camera-upload label input[type=file]{position:absolute;top:-9999px}.scandit .scandit-camera-upload label img{width:60%;height:60%}.scandit .scandit-camera-upload label div{font-family:sans-serif;color:#fff;font-size:16pt}.scandit .radial-progress{width:224px;height:224px;background-color:transparent;border:4px solid #fff;border-radius:50%;position:absolute;-webkit-transition:opacity 1s ease,border-color .5s;transition:opacity 1s ease,border-color .5s;-webkit-animation-duration:.25s;animation-duration:.25s;z-index:7;box-shadow:0 0 .3rem #000,inset 0 0 .3rem #000}.scandit .radial-progress[data-progress="0"]{border-color:hsla(0,0%,100%,.2)}.scandit .radial-progress[data-progress="5"]{border-color:hsla(0,0%,100%,.24)}.scandit .radial-progress[data-progress="10"]{border-color:hsla(0,0%,100%,.28)}.scandit .radial-progress[data-progress="15"]{border-color:hsla(0,0%,100%,.32)}.scandit .radial-progress[data-progress="20"]{border-color:hsla(0,0%,100%,.36)}.scandit .radial-progress[data-progress="25"]{border-color:hsla(0,0%,100%,.4)}.scandit .radial-progress[data-progress="30"]{border-color:hsla(0,0%,100%,.44)}.scandit .radial-progress[data-progress="35"]{border-color:hsla(0,0%,100%,.48)}.scandit .radial-progress[data-progress="40"]{border-color:hsla(0,0%,100%,.52)}.scandit .radial-progress[data-progress="45"]{border-color:hsla(0,0%,100%,.56)}.scandit .radial-progress[data-progress="50"]{border-color:hsla(0,0%,100%,.6)}.scandit .radial-progress[data-progress="55"]{border-color:hsla(0,0%,100%,.64)}.scandit .radial-progress[data-progress="60"]{border-color:hsla(0,0%,100%,.68)}.scandit .radial-progress[data-progress="65"]{border-color:hsla(0,0%,100%,.72)}.scandit .radial-progress[data-progress="70"]{border-color:hsla(0,0%,100%,.76)}.scandit .radial-progress[data-progress="75"]{border-color:hsla(0,0%,100%,.8)}.scandit .radial-progress[data-progress="80"]{border-color:hsla(0,0%,100%,.84)}.scandit .radial-progress[data-progress="85"]{border-color:hsla(0,0%,100%,.88)}.scandit .radial-progress[data-progress="90"]{border-color:hsla(0,0%,100%,.92)}.scandit .radial-progress[data-progress="95"]{border-color:hsla(0,0%,100%,.96)}.scandit .radial-progress[data-progress="100"]{border-color:#fff}.scandit .scandit-flash-color{-webkit-animation-name:scandit-flash-color;animation-name:scandit-flash-color}.scandit .scandit-flash-white{-webkit-animation-name:scandit-flash-white;animation-name:scandit-flash-white}.scandit .scandit-flash-white-inset{-webkit-animation-name:scandit-flash-white-inset;animation-name:scandit-flash-white-inset}.scandit .scandit-opacity-pulse{-webkit-animation-duration:.333s,1s;animation-duration:.333s,1s;-webkit-animation-iteration-count:1,infinite;animation-iteration-count:1,infinite;-webkit-animation-delay:0s,.333s;animation-delay:0s,.333s;-webkit-animation-timing-function:cubic-bezier(.645,.045,.355,1),cubic-bezier(.645,.045,.355,1);animation-timing-function:cubic-bezier(.645,.045,.355,1),cubic-bezier(.645,.045,.355,1);-webkit-animation-name:scandit-opacity-pulse-before,scandit-opacity-pulse;animation-name:scandit-opacity-pulse-before,scandit-opacity-pulse}.scandit .scandit-hidden-opacity{opacity:0}.scandit-hidden{display:none!important}@-webkit-keyframes scandit-flash-color{0%{-webkit-filter:none;filter:none}50%{-webkit-filter:drop-shadow(0 0 .75rem #fff) drop-shadow(0 0 2.5rem #7ed9e2);filter:drop-shadow(0 0 .75rem #fff) drop-shadow(0 0 2.5rem #7ed9e2)}to{-webkit-filter:none;filter:none}}@keyframes scandit-flash-color{0%{-webkit-filter:none;filter:none}50%{-webkit-filter:drop-shadow(0 0 .75rem #fff) drop-shadow(0 0 2.5rem #7ed9e2);filter:drop-shadow(0 0 .75rem #fff) drop-shadow(0 0 2.5rem #7ed9e2)}to{-webkit-filter:none;filter:none}}@-webkit-keyframes scandit-flash-white{0%{-webkit-filter:none;filter:none}50%{-webkit-filter:drop-shadow(0 0 .5rem #fff) drop-shadow(0 0 1rem #fff) drop-shadow(0 0 2.5rem #fff);filter:drop-shadow(0 0 .5rem #fff) drop-shadow(0 0 1rem #fff) drop-shadow(0 0 2.5rem #fff)}to{-webkit-filter:none;filter:none}}@keyframes scandit-flash-white{0%{-webkit-filter:none;filter:none}50%{-webkit-filter:drop-shadow(0 0 .5rem #fff) drop-shadow(0 0 1rem #fff) drop-shadow(0 0 2.5rem #fff);filter:drop-shadow(0 0 .5rem #fff) drop-shadow(0 0 1rem #fff) drop-shadow(0 0 2.5rem #fff)}to{-webkit-filter:none;filter:none}}@-webkit-keyframes scandit-flash-white-inset{0%{box-shadow:none}50%{box-shadow:inset 0 0 .5rem #fff,inset 0 0 1rem #fff,inset 0 0 2.5rem #fff}to{box-shadow:none}}@keyframes scandit-flash-white-inset{0%{box-shadow:none}50%{box-shadow:inset 0 0 .5rem #fff,inset 0 0 1rem #fff,inset 0 0 2.5rem #fff}to{box-shadow:none}}@-webkit-keyframes scandit-opacity-pulse-before{0%{opacity:1}to{opacity:.4}}@keyframes scandit-opacity-pulse-before{0%{opacity:1}to{opacity:.4}}@-webkit-keyframes scandit-opacity-pulse{0%{opacity:.4}50%{opacity:.6}to{opacity:.4}}@keyframes scandit-opacity-pulse{0%{opacity:.4}50%{opacity:.6}to{opacity:.4}}@-webkit-keyframes scandit-opacity-pulse-after{0%{opacity:.5}to{opacity:1}}@keyframes scandit-opacity-pulse-after{0%{opacity:.5}to{opacity:1}}'
);

var Barcode;

(function(Barcode) {
  /**
   * @hidden
   *
   * Create a [[Barcode]] object from a partial object returned by the external Scandit Engine library.
   * The *rawData* and *data* fields are computed and stored.
   *
   * @param result The barcode result coming from the external Scandit Engine library.
   * @returns The generated [[Barcode]] object.
   */
  function createFromWASMResult(result) {
    var decodedData;

    try {
      decodedData = decodeURIComponent(escape(String.fromCharCode.apply(null, result.rawData)));
    } catch (_unused) {
      decodedData = "";
    }

    return {
      symbology: result.symbology,
      data: decodedData,
      rawData: new Uint8Array(result.rawData),
      location: {
        topLeft: {
          x: result.location[0][0],
          y: result.location[0][1]
        },
        topRight: {
          x: result.location[1][0],
          y: result.location[1][1]
        },
        bottomRight: {
          x: result.location[2][0],
          y: result.location[2][1]
        },
        bottomLeft: {
          x: result.location[3][0],
          y: result.location[3][1]
        }
      },
      compositeFlag: result.compositeFlag,
      isGs1DataCarrier: result.isGs1DataCarrier,
      encodingArray: result.encodingArray
    };
  }

  Barcode.createFromWASMResult = createFromWASMResult;
  /**
   * Barcode symbology type.
   */

  var Symbology;

  (function(Symbology) {
    Symbology["AZTEC"] = "aztec";
    Symbology["CODABAR"] = "codabar";
    Symbology["CODE11"] = "code11";
    Symbology["CODE128"] = "code128";
    Symbology["CODE25"] = "code25";
    Symbology["CODE32"] = "code32";
    Symbology["CODE39"] = "code39";
    Symbology["CODE93"] = "code93";
    Symbology["DATA_MATRIX"] = "data-matrix";
    Symbology["DOTCODE"] = "dotcode";
    Symbology["EAN13"] = "ean13";
    Symbology["EAN8"] = "ean8";
    Symbology["FIVE_DIGIT_ADD_ON"] = "five-digit-add-on";
    Symbology["GS1_DATABAR"] = "databar";
    Symbology["GS1_DATABAR_EXPANDED"] = "databar-expanded";
    Symbology["GS1_DATABAR_LIMITED"] = "databar-limited";
    Symbology["INTERLEAVED_2_OF_5"] = "itf";
    Symbology["KIX"] = "kix";
    Symbology["LAPA4SC"] = "lapa4sc";
    Symbology["MAXICODE"] = "maxicode";
    Symbology["MICRO_PDF417"] = "micropdf417";
    Symbology["MICRO_QR"] = "microqr";
    Symbology["MSI_PLESSEY"] = "msi-plessey";
    Symbology["PDF417"] = "pdf417";
    Symbology["QR"] = "qr";
    Symbology["RM4SCC"] = "rm4scc";
    Symbology["TWO_DIGIT_ADD_ON"] = "two-digit-add-on";
    Symbology["UPCA"] = "upca";
    Symbology["UPCE"] = "upce";
  })((Symbology = Barcode.Symbology || (Barcode.Symbology = {})));
  /**
   * Flags to hint that two codes form a composite code.
   */

  var CompositeFlag;

  (function(CompositeFlag) {
    /**
     * Code is not part of a composite code.
     */
    CompositeFlag[(CompositeFlag["NONE"] = 0)] = "NONE";
    /**
     * Code could be part of a composite code. This flag is set by linear (1D) symbologies that have
     * no composite flag support but can be part of a composite code like the EAN/UPC symbology family.
     */

    CompositeFlag[(CompositeFlag["UNKNOWN"] = 1)] = "UNKNOWN";
    /**
     * Code is the linear component of a composite code. This flag can be set by GS1 DataBar or GS1-128 (Code 128).
     */

    CompositeFlag[(CompositeFlag["LINKED"] = 2)] = "LINKED";
    /**
     * Code is a GS1 Composite Code Type A (CC - A).This flag can be set by MicroPDF417 codes.
     */

    CompositeFlag[(CompositeFlag["GS1_A"] = 4)] = "GS1_A";
    /**
     * Code is a GS1 Composite Code Type B (CC-B). This flag can be set by MicroPDF417 codes.
     */

    CompositeFlag[(CompositeFlag["GS1_B"] = 8)] = "GS1_B";
    /**
     * Code is a GS1 Composite Code Type C (CC-C). This flag can be set by PDF417 codes.
     */

    CompositeFlag[(CompositeFlag["GS1_C"] = 16)] = "GS1_C";
  })((CompositeFlag = Barcode.CompositeFlag || (Barcode.CompositeFlag = {}))); // istanbul ignore next

  (function(Symbology) {
    // tslint:disable:no-unnecessary-qualifier
    var humanizedSymbologyNames = new map$1([
      [Symbology.AZTEC, "Aztec"],
      [Symbology.CODABAR, "Codabar"],
      [Symbology.CODE11, "Code 11"],
      [Symbology.CODE128, "Code 128"],
      [Symbology.CODE25, "Code 25"],
      [Symbology.CODE32, "Code 32"],
      [Symbology.CODE39, "Code 39"],
      [Symbology.CODE93, "Code 93"],
      [Symbology.DATA_MATRIX, "Data Matrix"],
      [Symbology.DOTCODE, "DotCode"],
      [Symbology.EAN13, "EAN-13"],
      [Symbology.EAN8, "EAN-8"],
      [Symbology.FIVE_DIGIT_ADD_ON, "Five-Digit Add-On"],
      [Symbology.GS1_DATABAR_EXPANDED, "GS1 DataBar Expanded"],
      [Symbology.GS1_DATABAR_LIMITED, "GS1 DataBar Limited"],
      [Symbology.GS1_DATABAR, "GS1 DataBar 14"],
      [Symbology.INTERLEAVED_2_OF_5, "Interleaved Two of Five"],
      [Symbology.KIX, "KIX"],
      [Symbology.LAPA4SC, "LAPA4SC"],
      [Symbology.MAXICODE, "MaxiCode"],
      [Symbology.MICRO_PDF417, "MicroPDF417"],
      [Symbology.MICRO_QR, "Micro QR"],
      [Symbology.MSI_PLESSEY, "MSI-Plessey"],
      [Symbology.PDF417, "PDF417"],
      [Symbology.QR, "QR"],
      [Symbology.RM4SCC, "RM4SCC"],
      [Symbology.TWO_DIGIT_ADD_ON, "Two-Digit Add-On"],
      [Symbology.UPCA, "UPC-A"],
      [Symbology.UPCE, "UPC-E"]
    ]);
    var jsonSymbologyNames = new map$1([
      [Symbology.AZTEC, "aztec"],
      [Symbology.CODABAR, "codabar"],
      [Symbology.CODE11, "code11"],
      [Symbology.CODE128, "code128"],
      [Symbology.CODE25, "code25"],
      [Symbology.CODE32, "code32"],
      [Symbology.CODE39, "code39"],
      [Symbology.CODE93, "code93"],
      [Symbology.DATA_MATRIX, "data-matrix"],
      [Symbology.DOTCODE, "dotcode"],
      [Symbology.EAN13, "ean13"],
      [Symbology.EAN8, "ean8"],
      [Symbology.FIVE_DIGIT_ADD_ON, "five-digit-add-on"],
      [Symbology.GS1_DATABAR_EXPANDED, "databar-expanded"],
      [Symbology.GS1_DATABAR_LIMITED, "databar-limited"],
      [Symbology.GS1_DATABAR, "databar"],
      [Symbology.INTERLEAVED_2_OF_5, "itf"],
      [Symbology.KIX, "kix"],
      [Symbology.LAPA4SC, "lapa4sc"],
      [Symbology.MAXICODE, "maxicode"],
      [Symbology.MICRO_PDF417, "micropdf417"],
      [Symbology.MICRO_QR, "microqr"],
      [Symbology.MSI_PLESSEY, "msi-plessey"],
      [Symbology.PDF417, "pdf417"],
      [Symbology.QR, "qr"],
      [Symbology.RM4SCC, "rm4scc"],
      [Symbology.TWO_DIGIT_ADD_ON, "two-digit-add-on"],
      [Symbology.UPCA, "upca"],
      [Symbology.UPCE, "upce"]
    ]); // tslint:enable:no-unnecessary-qualifier

    /**
     * Get the humanized name of a symbology.
     *
     * @param symbology The symbology for which to retrieve the name.
     * @returns The humanized name of the symbology.
     */

    function toHumanizedName(symbology) {
      var humanizedSymbologyName = humanizedSymbologyNames.get(symbology.toLowerCase());

      if (humanizedSymbologyName == null) {
        return "Unknown";
      }

      return humanizedSymbologyName;
    }

    Symbology.toHumanizedName = toHumanizedName;
    /**
     * Get the JSON key name of a symbology, used for JSON-formatted ScanSettings and Scandit Engine library.
     *
     * @param symbology The symbology for which to retrieve the name.
     * @returns The json key name of the symbology.
     */

    function toJSONName(symbology) {
      var jsonSymbologyName = jsonSymbologyNames.get(symbology.toLowerCase());

      if (jsonSymbologyName == null) {
        return "unknown";
      }

      return jsonSymbologyName;
    }

    Symbology.toJSONName = toJSONName;
  })((Symbology = Barcode.Symbology || (Barcode.Symbology = {})));
})(Barcode || (Barcode = {}));

var runtime_1 = createCommonjsModule(function(module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function() {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (
      NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
    ) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype));
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
            // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(
              function(value) {
                invoke("next", value, resolve, reject);
              },
              function(err) {
                invoke("throw", err, resolve, reject);
              }
            );
          }

          return Promise.resolve(value).then(
            function(unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            },
            function(error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            }
          );
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return (previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise
            ? previousPromise.then(
                callInvokeWithMethodAndArg,
                // Avoid propagating failures to Promises returned by later
                // invocations of the iterator.
                callInvokeWithMethodAndArg
              )
            : callInvokeWithMethodAndArg());
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function() {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;

              return next;
            };

          return (next.next = next);
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (
          finallyEntry &&
          (type === "break" || type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc
        ) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      catch: function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
  })(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports
  );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, "Object", { defineProperty: _objectDp.f });

var $Object$1 = _core.Object;
var defineProperty$1 = function defineProperty(it, key, desc) {
  return $Object$1.defineProperty(it, key, desc);
};

var defineProperty$2 = defineProperty$1;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$2(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var eventemitter3 = createCommonjsModule(function(module) {
  var has = Object.prototype.hasOwnProperty,
    prefix = "~";

  /**
   * Constructor to create a storage for our `EE` objects.
   * An `Events` instance is a plain object whose properties are event names.
   *
   * @constructor
   * @private
   */
  function Events() {}

  //
  // We try to not inherit from `Object.prototype`. In some engines creating an
  // instance in this way is faster than calling `Object.create(null)` directly.
  // If `Object.create(null)` is not supported we prefix the event names with a
  // character to make sure that the built-in object properties are not
  // overridden or used as an attack vector.
  //
  if (Object.create) {
    Events.prototype = Object.create(null);

    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false;
  }

  /**
   * Representation of a single event listener.
   *
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
   * @constructor
   * @private
   */
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }

  /**
   * Add a listener for a given event.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} once Specify if the listener is a one-time listener.
   * @returns {EventEmitter}
   * @private
   */
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }

    var listener = new EE(fn, context || emitter, once),
      evt = prefix ? prefix + event : event;

    if (!emitter._events[evt]) (emitter._events[evt] = listener), emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [emitter._events[evt], listener];

    return emitter;
  }

  /**
   * Clear event by name.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} evt The Event name.
   * @private
   */
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
  }

  /**
   * Minimal `EventEmitter` interface that is molded against the Node.js
   * `EventEmitter` interface.
   *
   * @constructor
   * @public
   */
  function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
  }

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   * @public
   */
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [],
      events,
      name;

    if (this._eventsCount === 0) return names;

    for (name in (events = this._events)) {
      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }

    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }

    return names;
  };

  /**
   * Return the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Array} The registered listeners.
   * @public
   */
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event,
      handlers = this._events[evt];

    if (!handlers) return [];
    if (handlers.fn) return [handlers.fn];

    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }

    return ee;
  };

  /**
   * Return the number of listeners listening to a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Number} The number of listeners.
   * @public
   */
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event,
      listeners = this._events[evt];

    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
  };

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   * @public
   */
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;

    if (!this._events[evt]) return false;

    var listeners = this._events[evt],
      len = arguments.length,
      args,
      i;

    if (listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }

      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i];
      }

      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length,
        j;

      for (i = 0; i < length; i++) {
        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }

            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }

    return true;
  };

  /**
   * Add a listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };

  /**
   * Add a one-time listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };

  /**
   * Remove the listeners of a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {*} context Only remove the listeners that have this context.
   * @param {Boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;

    if (!this._events[evt]) return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }

    var listeners = this._events[evt];

    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (listeners[i].fn !== fn || (once && !listeners[i].once) || (context && listeners[i].context !== context)) {
          events.push(listeners[i]);
        }
      }

      //
      // Reset the array, or remove it completely if we have no more listeners.
      //
      if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
      else clearEvent(this, evt);
    }

    return this;
  };

  /**
   * Remove all listeners, or those of the specified event.
   *
   * @param {(String|Symbol)} [event] The event name.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;

    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt]) clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }

    return this;
  };

  //
  // Alias methods names because people roll like that.
  //
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  //
  // Expose the prefix.
  //
  EventEmitter.prefixed = prefix;

  //
  // Allow `EventEmitter` to be imported as module namespace.
  //
  EventEmitter.EventEmitter = EventEmitter;

  //
  // Expose the module.
  //
  {
    module.exports = EventEmitter;
  }
});
var eventemitter3_1 = eventemitter3.EventEmitter;

var howler_core_min = createCommonjsModule(function(module, exports) {
  /*! howler.js v2.1.2 | (c) 2013-2019, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
  !(function() {
    var e = function() {
      this.init();
    };
    e.prototype = {
      init: function() {
        var e = this || n;
        return (
          (e._counter = 1e3),
          (e._html5AudioPool = []),
          (e.html5PoolSize = 10),
          (e._codecs = {}),
          (e._howls = []),
          (e._muted = !1),
          (e._volume = 1),
          (e._canPlayEvent = "canplaythrough"),
          (e._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null),
          (e.masterGain = null),
          (e.noAudio = !1),
          (e.usingWebAudio = !0),
          (e.autoSuspend = !0),
          (e.ctx = null),
          (e.autoUnlock = !0),
          e._setup(),
          e
        );
      },
      volume: function(e) {
        var o = this || n;
        if (((e = parseFloat(e)), o.ctx || _(), void 0 !== e && e >= 0 && e <= 1)) {
          if (((o._volume = e), o._muted)) return o;
          o.usingWebAudio && o.masterGain.gain.setValueAtTime(e, n.ctx.currentTime);
          for (var t = 0; t < o._howls.length; t++)
            if (!o._howls[t]._webAudio)
              for (var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) {
                var u = o._howls[t]._soundById(r[a]);
                u && u._node && (u._node.volume = u._volume * e);
              }
          return o;
        }
        return o._volume;
      },
      mute: function(e) {
        var o = this || n;
        o.ctx || _(),
          (o._muted = e),
          o.usingWebAudio && o.masterGain.gain.setValueAtTime(e ? 0 : o._volume, n.ctx.currentTime);
        for (var t = 0; t < o._howls.length; t++)
          if (!o._howls[t]._webAudio)
            for (var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) {
              var u = o._howls[t]._soundById(r[a]);
              u && u._node && (u._node.muted = !!e || u._muted);
            }
        return o;
      },
      unload: function() {
        for (var e = this || n, o = e._howls.length - 1; o >= 0; o--) e._howls[o].unload();
        return e.usingWebAudio && e.ctx && void 0 !== e.ctx.close && (e.ctx.close(), (e.ctx = null), _()), e;
      },
      codecs: function(e) {
        return (this || n)._codecs[e.replace(/^x-/, "")];
      },
      _setup: function() {
        var e = this || n;
        if (((e.state = e.ctx ? e.ctx.state || "suspended" : "suspended"), e._autoSuspend(), !e.usingWebAudio))
          if ("undefined" != typeof Audio)
            try {
              var o = new Audio();
              void 0 === o.oncanplaythrough && (e._canPlayEvent = "canplay");
            } catch (n) {
              e.noAudio = !0;
            }
          else e.noAudio = !0;
        try {
          var o = new Audio();
          o.muted && (e.noAudio = !0);
        } catch (e) {}
        return e.noAudio || e._setupCodecs(), e;
      },
      _setupCodecs: function() {
        var e = this || n,
          o = null;
        try {
          o = "undefined" != typeof Audio ? new Audio() : null;
        } catch (n) {
          return e;
        }
        if (!o || "function" != typeof o.canPlayType) return e;
        var t = o.canPlayType("audio/mpeg;").replace(/^no$/, ""),
          r = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g),
          a = r && parseInt(r[0].split("/")[1], 10) < 33;
        return (
          (e._codecs = {
            mp3: !(a || (!t && !o.canPlayType("audio/mp3;").replace(/^no$/, ""))),
            mpeg: !!t,
            opus: !!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            oga: !!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            aac: !!o.canPlayType("audio/aac;").replace(/^no$/, ""),
            caf: !!o.canPlayType("audio/x-caf;").replace(/^no$/, ""),
            m4a: !!(
              o.canPlayType("audio/x-m4a;") ||
              o.canPlayType("audio/m4a;") ||
              o.canPlayType("audio/aac;")
            ).replace(/^no$/, ""),
            mp4: !!(
              o.canPlayType("audio/x-mp4;") ||
              o.canPlayType("audio/mp4;") ||
              o.canPlayType("audio/aac;")
            ).replace(/^no$/, ""),
            weba: !!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
            webm: !!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
            dolby: !!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
            flac: !!(o.canPlayType("audio/x-flac;") || o.canPlayType("audio/flac;")).replace(/^no$/, "")
          }),
          e
        );
      },
      _unlockAudio: function() {
        var e = this || n;
        if (!e._audioUnlocked && e.ctx) {
          (e._audioUnlocked = !1),
            (e.autoUnlock = !1),
            e._mobileUnloaded || 44100 === e.ctx.sampleRate || ((e._mobileUnloaded = !0), e.unload()),
            (e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050));
          var o = function(n) {
            for (var t = 0; t < e.html5PoolSize; t++)
              try {
                var r = new Audio();
                (r._unlocked = !0), e._releaseHtml5Audio(r);
              } catch (n) {
                e.noAudio = !0;
              }
            for (var t = 0; t < e._howls.length; t++)
              if (!e._howls[t]._webAudio)
                for (var a = e._howls[t]._getSoundIds(), u = 0; u < a.length; u++) {
                  var i = e._howls[t]._soundById(a[u]);
                  i && i._node && !i._node._unlocked && ((i._node._unlocked = !0), i._node.load());
                }
            e._autoResume();
            var d = e.ctx.createBufferSource();
            (d.buffer = e._scratchBuffer),
              d.connect(e.ctx.destination),
              void 0 === d.start ? d.noteOn(0) : d.start(0),
              "function" == typeof e.ctx.resume && e.ctx.resume(),
              (d.onended = function() {
                d.disconnect(0),
                  (e._audioUnlocked = !0),
                  document.removeEventListener("touchstart", o, !0),
                  document.removeEventListener("touchend", o, !0),
                  document.removeEventListener("click", o, !0);
                for (var n = 0; n < e._howls.length; n++) e._howls[n]._emit("unlock");
              });
          };
          return (
            document.addEventListener("touchstart", o, !0),
            document.addEventListener("touchend", o, !0),
            document.addEventListener("click", o, !0),
            e
          );
        }
      },
      _obtainHtml5Audio: function() {
        var e = this || n;
        if (e._html5AudioPool.length) return e._html5AudioPool.pop();
        var o = new Audio().play();
        return (
          o &&
            "undefined" != typeof Promise &&
            (o instanceof Promise || "function" == typeof o.then) &&
            o.catch(function() {
              console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
            }),
          new Audio()
        );
      },
      _releaseHtml5Audio: function(e) {
        var o = this || n;
        return e._unlocked && o._html5AudioPool.push(e), o;
      },
      _autoSuspend: function() {
        var e = this;
        if (e.autoSuspend && e.ctx && void 0 !== e.ctx.suspend && n.usingWebAudio) {
          for (var o = 0; o < e._howls.length; o++)
            if (e._howls[o]._webAudio)
              for (var t = 0; t < e._howls[o]._sounds.length; t++) if (!e._howls[o]._sounds[t]._paused) return e;
          return (
            e._suspendTimer && clearTimeout(e._suspendTimer),
            (e._suspendTimer = setTimeout(function() {
              e.autoSuspend &&
                ((e._suspendTimer = null),
                (e.state = "suspending"),
                e.ctx.suspend().then(function() {
                  (e.state = "suspended"), e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume());
                }));
            }, 3e4)),
            e
          );
        }
      },
      _autoResume: function() {
        var e = this;
        if (e.ctx && void 0 !== e.ctx.resume && n.usingWebAudio)
          return (
            "running" === e.state && e._suspendTimer
              ? (clearTimeout(e._suspendTimer), (e._suspendTimer = null))
              : "suspended" === e.state
              ? (e.ctx.resume().then(function() {
                  e.state = "running";
                  for (var n = 0; n < e._howls.length; n++) e._howls[n]._emit("resume");
                }),
                e._suspendTimer && (clearTimeout(e._suspendTimer), (e._suspendTimer = null)))
              : "suspending" === e.state && (e._resumeAfterSuspend = !0),
            e
          );
      }
    };
    var n = new e(),
      o = function(e) {
        var n = this;
        if (!e.src || 0 === e.src.length)
          return void console.error("An array of source files must be passed with any new Howl.");
        n.init(e);
      };
    o.prototype = {
      init: function(e) {
        var o = this;
        return (
          n.ctx || _(),
          (o._autoplay = e.autoplay || !1),
          (o._format = "string" != typeof e.format ? e.format : [e.format]),
          (o._html5 = e.html5 || !1),
          (o._muted = e.mute || !1),
          (o._loop = e.loop || !1),
          (o._pool = e.pool || 5),
          (o._preload = "boolean" != typeof e.preload || e.preload),
          (o._rate = e.rate || 1),
          (o._sprite = e.sprite || {}),
          (o._src = "string" != typeof e.src ? e.src : [e.src]),
          (o._volume = void 0 !== e.volume ? e.volume : 1),
          (o._xhrWithCredentials = e.xhrWithCredentials || !1),
          (o._duration = 0),
          (o._state = "unloaded"),
          (o._sounds = []),
          (o._endTimers = {}),
          (o._queue = []),
          (o._playLock = !1),
          (o._onend = e.onend ? [{ fn: e.onend }] : []),
          (o._onfade = e.onfade ? [{ fn: e.onfade }] : []),
          (o._onload = e.onload ? [{ fn: e.onload }] : []),
          (o._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : []),
          (o._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : []),
          (o._onpause = e.onpause ? [{ fn: e.onpause }] : []),
          (o._onplay = e.onplay ? [{ fn: e.onplay }] : []),
          (o._onstop = e.onstop ? [{ fn: e.onstop }] : []),
          (o._onmute = e.onmute ? [{ fn: e.onmute }] : []),
          (o._onvolume = e.onvolume ? [{ fn: e.onvolume }] : []),
          (o._onrate = e.onrate ? [{ fn: e.onrate }] : []),
          (o._onseek = e.onseek ? [{ fn: e.onseek }] : []),
          (o._onunlock = e.onunlock ? [{ fn: e.onunlock }] : []),
          (o._onresume = []),
          (o._webAudio = n.usingWebAudio && !o._html5),
          void 0 !== n.ctx && n.ctx && n.autoUnlock && n._unlockAudio(),
          n._howls.push(o),
          o._autoplay &&
            o._queue.push({
              event: "play",
              action: function() {
                o.play();
              }
            }),
          o._preload && o.load(),
          o
        );
      },
      load: function() {
        var e = this,
          o = null;
        if (n.noAudio) return void e._emit("loaderror", null, "No audio support.");
        "string" == typeof e._src && (e._src = [e._src]);
        for (var r = 0; r < e._src.length; r++) {
          var u, i;
          if (e._format && e._format[r]) u = e._format[r];
          else {
            if ("string" != typeof (i = e._src[r])) {
              e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
              continue;
            }
            (u = /^data:audio\/([^;,]+);/i.exec(i)),
              u || (u = /\.([^.]+)$/.exec(i.split("?", 1)[0])),
              u && (u = u[1].toLowerCase());
          }
          if (
            (u ||
              console.warn(
                'No file extension was found. Consider using the "format" property or specify an extension.'
              ),
            u && n.codecs(u))
          ) {
            o = e._src[r];
            break;
          }
        }
        return o
          ? ((e._src = o),
            (e._state = "loading"),
            "https:" === window.location.protocol && "http:" === o.slice(0, 5) && ((e._html5 = !0), (e._webAudio = !1)),
            new t(e),
            e._webAudio && a(e),
            e)
          : void e._emit("loaderror", null, "No codec support for selected audio sources.");
      },
      play: function(e, o) {
        var t = this,
          r = null;
        if ("number" == typeof e) (r = e), (e = null);
        else {
          if ("string" == typeof e && "loaded" === t._state && !t._sprite[e]) return null;
          if (void 0 === e && ((e = "__default"), !t._playLock)) {
            for (var a = 0, u = 0; u < t._sounds.length; u++)
              t._sounds[u]._paused && !t._sounds[u]._ended && (a++, (r = t._sounds[u]._id));
            1 === a ? (e = null) : (r = null);
          }
        }
        var i = r ? t._soundById(r) : t._inactiveSound();
        if (!i) return null;
        if ((r && !e && (e = i._sprite || "__default"), "loaded" !== t._state)) {
          (i._sprite = e), (i._ended = !1);
          var d = i._id;
          return (
            t._queue.push({
              event: "play",
              action: function() {
                t.play(d);
              }
            }),
            d
          );
        }
        if (r && !i._paused) return o || t._loadQueue("play"), i._id;
        t._webAudio && n._autoResume();
        var _ = Math.max(0, i._seek > 0 ? i._seek : t._sprite[e][0] / 1e3),
          s = Math.max(0, (t._sprite[e][0] + t._sprite[e][1]) / 1e3 - _),
          l = (1e3 * s) / Math.abs(i._rate),
          c = t._sprite[e][0] / 1e3,
          f = (t._sprite[e][0] + t._sprite[e][1]) / 1e3,
          p = !(!i._loop && !t._sprite[e][2]);
        (i._sprite = e), (i._ended = !1);
        var m = function() {
          (i._paused = !1), (i._seek = _), (i._start = c), (i._stop = f), (i._loop = p);
        };
        if (_ >= f) return void t._ended(i);
        var v = i._node;
        if (t._webAudio) {
          var h = function() {
            (t._playLock = !1), m(), t._refreshBuffer(i);
            var e = i._muted || t._muted ? 0 : i._volume;
            v.gain.setValueAtTime(e, n.ctx.currentTime),
              (i._playStart = n.ctx.currentTime),
              void 0 === v.bufferSource.start
                ? i._loop
                  ? v.bufferSource.noteGrainOn(0, _, 86400)
                  : v.bufferSource.noteGrainOn(0, _, s)
                : i._loop
                ? v.bufferSource.start(0, _, 86400)
                : v.bufferSource.start(0, _, s),
              l !== 1 / 0 && (t._endTimers[i._id] = setTimeout(t._ended.bind(t, i), l)),
              o ||
                setTimeout(function() {
                  t._emit("play", i._id), t._loadQueue();
                }, 0);
          };
          "running" === n.state ? h() : ((t._playLock = !0), t.once("resume", h), t._clearTimer(i._id));
        } else {
          var y = function() {
            (v.currentTime = _),
              (v.muted = i._muted || t._muted || n._muted || v.muted),
              (v.volume = i._volume * n.volume()),
              (v.playbackRate = i._rate);
            try {
              var r = v.play();
              if (
                (r && "undefined" != typeof Promise && (r instanceof Promise || "function" == typeof r.then)
                  ? ((t._playLock = !0),
                    m(),
                    r
                      .then(function() {
                        (t._playLock = !1), (v._unlocked = !0), o || (t._emit("play", i._id), t._loadQueue());
                      })
                      .catch(function() {
                        (t._playLock = !1),
                          t._emit(
                            "playerror",
                            i._id,
                            "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                          ),
                          (i._ended = !0),
                          (i._paused = !0);
                      }))
                  : o || ((t._playLock = !1), m(), t._emit("play", i._id), t._loadQueue()),
                (v.playbackRate = i._rate),
                v.paused)
              )
                return void t._emit(
                  "playerror",
                  i._id,
                  "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                );
              "__default" !== e || i._loop
                ? (t._endTimers[i._id] = setTimeout(t._ended.bind(t, i), l))
                : ((t._endTimers[i._id] = function() {
                    t._ended(i), v.removeEventListener("ended", t._endTimers[i._id], !1);
                  }),
                  v.addEventListener("ended", t._endTimers[i._id], !1));
            } catch (e) {
              t._emit("playerror", i._id, e);
            }
          };
          "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" === v.src &&
            ((v.src = t._src), v.load());
          var g = (window && window.ejecta) || (!v.readyState && n._navigator.isCocoonJS);
          if (v.readyState >= 3 || g) y();
          else {
            t._playLock = !0;
            var A = function() {
              y(), v.removeEventListener(n._canPlayEvent, A, !1);
            };
            v.addEventListener(n._canPlayEvent, A, !1), t._clearTimer(i._id);
          }
        }
        return i._id;
      },
      pause: function(e) {
        var n = this;
        if ("loaded" !== n._state || n._playLock)
          return (
            n._queue.push({
              event: "pause",
              action: function() {
                n.pause(e);
              }
            }),
            n
          );
        for (var o = n._getSoundIds(e), t = 0; t < o.length; t++) {
          n._clearTimer(o[t]);
          var r = n._soundById(o[t]);
          if (
            r &&
            !r._paused &&
            ((r._seek = n.seek(o[t])), (r._rateSeek = 0), (r._paused = !0), n._stopFade(o[t]), r._node)
          )
            if (n._webAudio) {
              if (!r._node.bufferSource) continue;
              void 0 === r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0),
                n._cleanBuffer(r._node);
            } else (isNaN(r._node.duration) && r._node.duration !== 1 / 0) || r._node.pause();
          arguments[1] || n._emit("pause", r ? r._id : null);
        }
        return n;
      },
      stop: function(e, n) {
        var o = this;
        if ("loaded" !== o._state || o._playLock)
          return (
            o._queue.push({
              event: "stop",
              action: function() {
                o.stop(e);
              }
            }),
            o
          );
        for (var t = o._getSoundIds(e), r = 0; r < t.length; r++) {
          o._clearTimer(t[r]);
          var a = o._soundById(t[r]);
          a &&
            ((a._seek = a._start || 0),
            (a._rateSeek = 0),
            (a._paused = !0),
            (a._ended = !0),
            o._stopFade(t[r]),
            a._node &&
              (o._webAudio
                ? a._node.bufferSource &&
                  (void 0 === a._node.bufferSource.stop
                    ? a._node.bufferSource.noteOff(0)
                    : a._node.bufferSource.stop(0),
                  o._cleanBuffer(a._node))
                : (isNaN(a._node.duration) && a._node.duration !== 1 / 0) ||
                  ((a._node.currentTime = a._start || 0),
                  a._node.pause(),
                  a._node.duration === 1 / 0 && o._clearSound(a._node))),
            n || o._emit("stop", a._id));
        }
        return o;
      },
      mute: function(e, o) {
        var t = this;
        if ("loaded" !== t._state || t._playLock)
          return (
            t._queue.push({
              event: "mute",
              action: function() {
                t.mute(e, o);
              }
            }),
            t
          );
        if (void 0 === o) {
          if ("boolean" != typeof e) return t._muted;
          t._muted = e;
        }
        for (var r = t._getSoundIds(o), a = 0; a < r.length; a++) {
          var u = t._soundById(r[a]);
          u &&
            ((u._muted = e),
            u._interval && t._stopFade(u._id),
            t._webAudio && u._node
              ? u._node.gain.setValueAtTime(e ? 0 : u._volume, n.ctx.currentTime)
              : u._node && (u._node.muted = !!n._muted || e),
            t._emit("mute", u._id));
        }
        return t;
      },
      volume: function() {
        var e,
          o,
          t = this,
          r = arguments;
        if (0 === r.length) return t._volume;
        if (1 === r.length || (2 === r.length && void 0 === r[1])) {
          t._getSoundIds().indexOf(r[0]) >= 0 ? (o = parseInt(r[0], 10)) : (e = parseFloat(r[0]));
        } else r.length >= 2 && ((e = parseFloat(r[0])), (o = parseInt(r[1], 10)));
        var a;
        if (!(void 0 !== e && e >= 0 && e <= 1)) return (a = o ? t._soundById(o) : t._sounds[0]), a ? a._volume : 0;
        if ("loaded" !== t._state || t._playLock)
          return (
            t._queue.push({
              event: "volume",
              action: function() {
                t.volume.apply(t, r);
              }
            }),
            t
          );
        void 0 === o && (t._volume = e), (o = t._getSoundIds(o));
        for (var u = 0; u < o.length; u++)
          (a = t._soundById(o[u])) &&
            ((a._volume = e),
            r[2] || t._stopFade(o[u]),
            t._webAudio && a._node && !a._muted
              ? a._node.gain.setValueAtTime(e, n.ctx.currentTime)
              : a._node && !a._muted && (a._node.volume = e * n.volume()),
            t._emit("volume", a._id));
        return t;
      },
      fade: function(e, o, t, r) {
        var a = this;
        if ("loaded" !== a._state || a._playLock)
          return (
            a._queue.push({
              event: "fade",
              action: function() {
                a.fade(e, o, t, r);
              }
            }),
            a
          );
        (e = parseFloat(e)), (o = parseFloat(o)), (t = parseFloat(t)), a.volume(e, r);
        for (var u = a._getSoundIds(r), i = 0; i < u.length; i++) {
          var d = a._soundById(u[i]);
          if (d) {
            if ((r || a._stopFade(u[i]), a._webAudio && !d._muted)) {
              var _ = n.ctx.currentTime,
                s = _ + t / 1e3;
              (d._volume = e), d._node.gain.setValueAtTime(e, _), d._node.gain.linearRampToValueAtTime(o, s);
            }
            a._startFadeInterval(d, e, o, t, u[i], void 0 === r);
          }
        }
        return a;
      },
      _startFadeInterval: function(e, n, o, t, r, a) {
        var u = this,
          i = n,
          d = o - n,
          _ = Math.abs(d / 0.01),
          s = Math.max(4, _ > 0 ? t / _ : t),
          l = Date.now();
        (e._fadeTo = o),
          (e._interval = setInterval(function() {
            var r = (Date.now() - l) / t;
            (l = Date.now()),
              (i += d * r),
              (i = Math.max(0, i)),
              (i = Math.min(1, i)),
              (i = Math.round(100 * i) / 100),
              u._webAudio ? (e._volume = i) : u.volume(i, e._id, !0),
              a && (u._volume = i),
              ((o < n && i <= o) || (o > n && i >= o)) &&
                (clearInterval(e._interval),
                (e._interval = null),
                (e._fadeTo = null),
                u.volume(o, e._id),
                u._emit("fade", e._id));
          }, s));
      },
      _stopFade: function(e) {
        var o = this,
          t = o._soundById(e);
        return (
          t &&
            t._interval &&
            (o._webAudio && t._node.gain.cancelScheduledValues(n.ctx.currentTime),
            clearInterval(t._interval),
            (t._interval = null),
            o.volume(t._fadeTo, e),
            (t._fadeTo = null),
            o._emit("fade", e)),
          o
        );
      },
      loop: function() {
        var e,
          n,
          o,
          t = this,
          r = arguments;
        if (0 === r.length) return t._loop;
        if (1 === r.length) {
          if ("boolean" != typeof r[0]) return !!(o = t._soundById(parseInt(r[0], 10))) && o._loop;
          (e = r[0]), (t._loop = e);
        } else 2 === r.length && ((e = r[0]), (n = parseInt(r[1], 10)));
        for (var a = t._getSoundIds(n), u = 0; u < a.length; u++)
          (o = t._soundById(a[u])) &&
            ((o._loop = e),
            t._webAudio &&
              o._node &&
              o._node.bufferSource &&
              ((o._node.bufferSource.loop = e),
              e && ((o._node.bufferSource.loopStart = o._start || 0), (o._node.bufferSource.loopEnd = o._stop))));
        return t;
      },
      rate: function() {
        var e,
          o,
          t = this,
          r = arguments;
        if (0 === r.length) o = t._sounds[0]._id;
        else if (1 === r.length) {
          var a = t._getSoundIds(),
            u = a.indexOf(r[0]);
          u >= 0 ? (o = parseInt(r[0], 10)) : (e = parseFloat(r[0]));
        } else 2 === r.length && ((e = parseFloat(r[0])), (o = parseInt(r[1], 10)));
        var i;
        if ("number" != typeof e) return (i = t._soundById(o)), i ? i._rate : t._rate;
        if ("loaded" !== t._state || t._playLock)
          return (
            t._queue.push({
              event: "rate",
              action: function() {
                t.rate.apply(t, r);
              }
            }),
            t
          );
        void 0 === o && (t._rate = e), (o = t._getSoundIds(o));
        for (var d = 0; d < o.length; d++)
          if ((i = t._soundById(o[d]))) {
            t.playing(o[d]) &&
              ((i._rateSeek = t.seek(o[d])), (i._playStart = t._webAudio ? n.ctx.currentTime : i._playStart)),
              (i._rate = e),
              t._webAudio && i._node && i._node.bufferSource
                ? i._node.bufferSource.playbackRate.setValueAtTime(e, n.ctx.currentTime)
                : i._node && (i._node.playbackRate = e);
            var _ = t.seek(o[d]),
              s = (t._sprite[i._sprite][0] + t._sprite[i._sprite][1]) / 1e3 - _,
              l = (1e3 * s) / Math.abs(i._rate);
            (!t._endTimers[o[d]] && i._paused) ||
              (t._clearTimer(o[d]), (t._endTimers[o[d]] = setTimeout(t._ended.bind(t, i), l))),
              t._emit("rate", i._id);
          }
        return t;
      },
      seek: function() {
        var e,
          o,
          t = this,
          r = arguments;
        if (0 === r.length) o = t._sounds[0]._id;
        else if (1 === r.length) {
          var a = t._getSoundIds(),
            u = a.indexOf(r[0]);
          u >= 0 ? (o = parseInt(r[0], 10)) : t._sounds.length && ((o = t._sounds[0]._id), (e = parseFloat(r[0])));
        } else 2 === r.length && ((e = parseFloat(r[0])), (o = parseInt(r[1], 10)));
        if (void 0 === o) return t;
        if ("loaded" !== t._state || t._playLock)
          return (
            t._queue.push({
              event: "seek",
              action: function() {
                t.seek.apply(t, r);
              }
            }),
            t
          );
        var i = t._soundById(o);
        if (i) {
          if (!("number" == typeof e && e >= 0)) {
            if (t._webAudio) {
              var d = t.playing(o) ? n.ctx.currentTime - i._playStart : 0,
                _ = i._rateSeek ? i._rateSeek - i._seek : 0;
              return i._seek + (_ + d * Math.abs(i._rate));
            }
            return i._node.currentTime;
          }
          var s = t.playing(o);
          s && t.pause(o, !0),
            (i._seek = e),
            (i._ended = !1),
            t._clearTimer(o),
            t._webAudio || !i._node || isNaN(i._node.duration) || (i._node.currentTime = e);
          var l = function() {
            t._emit("seek", o), s && t.play(o, !0);
          };
          if (s && !t._webAudio) {
            var c = function() {
              t._playLock ? setTimeout(c, 0) : l();
            };
            setTimeout(c, 0);
          } else l();
        }
        return t;
      },
      playing: function(e) {
        var n = this;
        if ("number" == typeof e) {
          var o = n._soundById(e);
          return !!o && !o._paused;
        }
        for (var t = 0; t < n._sounds.length; t++) if (!n._sounds[t]._paused) return !0;
        return !1;
      },
      duration: function(e) {
        var n = this,
          o = n._duration,
          t = n._soundById(e);
        return t && (o = n._sprite[t._sprite][1] / 1e3), o;
      },
      state: function() {
        return this._state;
      },
      unload: function() {
        for (var e = this, o = e._sounds, t = 0; t < o.length; t++)
          o[t]._paused || e.stop(o[t]._id),
            e._webAudio ||
              (e._clearSound(o[t]._node),
              o[t]._node.removeEventListener("error", o[t]._errorFn, !1),
              o[t]._node.removeEventListener(n._canPlayEvent, o[t]._loadFn, !1),
              n._releaseHtml5Audio(o[t]._node)),
            delete o[t]._node,
            e._clearTimer(o[t]._id);
        var a = n._howls.indexOf(e);
        a >= 0 && n._howls.splice(a, 1);
        var u = !0;
        for (t = 0; t < n._howls.length; t++)
          if (n._howls[t]._src === e._src || e._src.indexOf(n._howls[t]._src) >= 0) {
            u = !1;
            break;
          }
        return (
          r && u && delete r[e._src], (n.noAudio = !1), (e._state = "unloaded"), (e._sounds = []), (e = null), null
        );
      },
      on: function(e, n, o, t) {
        var r = this,
          a = r["_on" + e];
        return "function" == typeof n && a.push(t ? { id: o, fn: n, once: t } : { id: o, fn: n }), r;
      },
      off: function(e, n, o) {
        var t = this,
          r = t["_on" + e],
          a = 0;
        if (("number" == typeof n && ((o = n), (n = null)), n || o))
          for (a = 0; a < r.length; a++) {
            var u = o === r[a].id;
            if ((n === r[a].fn && u) || (!n && u)) {
              r.splice(a, 1);
              break;
            }
          }
        else if (e) t["_on" + e] = [];
        else {
          var i = Object.keys(t);
          for (a = 0; a < i.length; a++) 0 === i[a].indexOf("_on") && Array.isArray(t[i[a]]) && (t[i[a]] = []);
        }
        return t;
      },
      once: function(e, n, o) {
        var t = this;
        return t.on(e, n, o, 1), t;
      },
      _emit: function(e, n, o) {
        for (var t = this, r = t["_on" + e], a = r.length - 1; a >= 0; a--)
          (r[a].id && r[a].id !== n && "load" !== e) ||
            (setTimeout(
              function(e) {
                e.call(this, n, o);
              }.bind(t, r[a].fn),
              0
            ),
            r[a].once && t.off(e, r[a].fn, r[a].id));
        return t._loadQueue(e), t;
      },
      _loadQueue: function(e) {
        var n = this;
        if (n._queue.length > 0) {
          var o = n._queue[0];
          o.event === e && (n._queue.shift(), n._loadQueue()), e || o.action();
        }
        return n;
      },
      _ended: function(e) {
        var o = this,
          t = e._sprite;
        if (!o._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop)
          return setTimeout(o._ended.bind(o, e), 100), o;
        var r = !(!e._loop && !o._sprite[t][2]);
        if ((o._emit("end", e._id), !o._webAudio && r && o.stop(e._id, !0).play(e._id), o._webAudio && r)) {
          o._emit("play", e._id), (e._seek = e._start || 0), (e._rateSeek = 0), (e._playStart = n.ctx.currentTime);
          var a = (1e3 * (e._stop - e._start)) / Math.abs(e._rate);
          o._endTimers[e._id] = setTimeout(o._ended.bind(o, e), a);
        }
        return (
          o._webAudio &&
            !r &&
            ((e._paused = !0),
            (e._ended = !0),
            (e._seek = e._start || 0),
            (e._rateSeek = 0),
            o._clearTimer(e._id),
            o._cleanBuffer(e._node),
            n._autoSuspend()),
          o._webAudio || r || o.stop(e._id, !0),
          o
        );
      },
      _clearTimer: function(e) {
        var n = this;
        if (n._endTimers[e]) {
          if ("function" != typeof n._endTimers[e]) clearTimeout(n._endTimers[e]);
          else {
            var o = n._soundById(e);
            o && o._node && o._node.removeEventListener("ended", n._endTimers[e], !1);
          }
          delete n._endTimers[e];
        }
        return n;
      },
      _soundById: function(e) {
        for (var n = this, o = 0; o < n._sounds.length; o++) if (e === n._sounds[o]._id) return n._sounds[o];
        return null;
      },
      _inactiveSound: function() {
        var e = this;
        e._drain();
        for (var n = 0; n < e._sounds.length; n++) if (e._sounds[n]._ended) return e._sounds[n].reset();
        return new t(e);
      },
      _drain: function() {
        var e = this,
          n = e._pool,
          o = 0,
          t = 0;
        if (!(e._sounds.length < n)) {
          for (t = 0; t < e._sounds.length; t++) e._sounds[t]._ended && o++;
          for (t = e._sounds.length - 1; t >= 0; t--) {
            if (o <= n) return;
            e._sounds[t]._ended &&
              (e._webAudio && e._sounds[t]._node && e._sounds[t]._node.disconnect(0), e._sounds.splice(t, 1), o--);
          }
        }
      },
      _getSoundIds: function(e) {
        var n = this;
        if (void 0 === e) {
          for (var o = [], t = 0; t < n._sounds.length; t++) o.push(n._sounds[t]._id);
          return o;
        }
        return [e];
      },
      _refreshBuffer: function(e) {
        var o = this;
        return (
          (e._node.bufferSource = n.ctx.createBufferSource()),
          (e._node.bufferSource.buffer = r[o._src]),
          e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node),
          (e._node.bufferSource.loop = e._loop),
          e._loop && ((e._node.bufferSource.loopStart = e._start || 0), (e._node.bufferSource.loopEnd = e._stop || 0)),
          e._node.bufferSource.playbackRate.setValueAtTime(e._rate, n.ctx.currentTime),
          o
        );
      },
      _cleanBuffer: function(e) {
        var o = this,
          t = n._navigator && n._navigator.vendor.indexOf("Apple") >= 0;
        if (n._scratchBuffer && e.bufferSource && ((e.bufferSource.onended = null), e.bufferSource.disconnect(0), t))
          try {
            e.bufferSource.buffer = n._scratchBuffer;
          } catch (e) {}
        return (e.bufferSource = null), o;
      },
      _clearSound: function(e) {
        /MSIE |Trident\//.test(n._navigator && n._navigator.userAgent) ||
          (e.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
      }
    };
    var t = function(e) {
      (this._parent = e), this.init();
    };
    t.prototype = {
      init: function() {
        var e = this,
          o = e._parent;
        return (
          (e._muted = o._muted),
          (e._loop = o._loop),
          (e._volume = o._volume),
          (e._rate = o._rate),
          (e._seek = 0),
          (e._paused = !0),
          (e._ended = !0),
          (e._sprite = "__default"),
          (e._id = ++n._counter),
          o._sounds.push(e),
          e.create(),
          e
        );
      },
      create: function() {
        var e = this,
          o = e._parent,
          t = n._muted || e._muted || e._parent._muted ? 0 : e._volume;
        return (
          o._webAudio
            ? ((e._node = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain()),
              e._node.gain.setValueAtTime(t, n.ctx.currentTime),
              (e._node.paused = !0),
              e._node.connect(n.masterGain))
            : ((e._node = n._obtainHtml5Audio()),
              (e._errorFn = e._errorListener.bind(e)),
              e._node.addEventListener("error", e._errorFn, !1),
              (e._loadFn = e._loadListener.bind(e)),
              e._node.addEventListener(n._canPlayEvent, e._loadFn, !1),
              (e._node.src = o._src),
              (e._node.preload = "auto"),
              (e._node.volume = t * n.volume()),
              e._node.load()),
          e
        );
      },
      reset: function() {
        var e = this,
          o = e._parent;
        return (
          (e._muted = o._muted),
          (e._loop = o._loop),
          (e._volume = o._volume),
          (e._rate = o._rate),
          (e._seek = 0),
          (e._rateSeek = 0),
          (e._paused = !0),
          (e._ended = !0),
          (e._sprite = "__default"),
          (e._id = ++n._counter),
          e
        );
      },
      _errorListener: function() {
        var e = this;
        e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0),
          e._node.removeEventListener("error", e._errorFn, !1);
      },
      _loadListener: function() {
        var e = this,
          o = e._parent;
        (o._duration = Math.ceil(10 * e._node.duration) / 10),
          0 === Object.keys(o._sprite).length && (o._sprite = { __default: [0, 1e3 * o._duration] }),
          "loaded" !== o._state && ((o._state = "loaded"), o._emit("load"), o._loadQueue()),
          e._node.removeEventListener(n._canPlayEvent, e._loadFn, !1);
      }
    };
    var r = {},
      a = function(e) {
        var n = e._src;
        if (r[n]) return (e._duration = r[n].duration), void d(e);
        if (/^data:[^;]+;base64,/.test(n)) {
          for (var o = atob(n.split(",")[1]), t = new Uint8Array(o.length), a = 0; a < o.length; ++a)
            t[a] = o.charCodeAt(a);
          i(t.buffer, e);
        } else {
          var _ = new XMLHttpRequest();
          _.open("GET", n, !0),
            (_.withCredentials = e._xhrWithCredentials),
            (_.responseType = "arraybuffer"),
            (_.onload = function() {
              var n = (_.status + "")[0];
              if ("0" !== n && "2" !== n && "3" !== n)
                return void e._emit("loaderror", null, "Failed loading audio file with status: " + _.status + ".");
              i(_.response, e);
            }),
            (_.onerror = function() {
              e._webAudio && ((e._html5 = !0), (e._webAudio = !1), (e._sounds = []), delete r[n], e.load());
            }),
            u(_);
        }
      },
      u = function(e) {
        try {
          e.send();
        } catch (n) {
          e.onerror();
        }
      },
      i = function(e, o) {
        var t = function() {
            o._emit("loaderror", null, "Decoding audio data failed.");
          },
          a = function(e) {
            e && o._sounds.length > 0 ? ((r[o._src] = e), d(o, e)) : t();
          };
        "undefined" != typeof Promise && 1 === n.ctx.decodeAudioData.length
          ? n.ctx
              .decodeAudioData(e)
              .then(a)
              .catch(t)
          : n.ctx.decodeAudioData(e, a, t);
      },
      d = function(e, n) {
        n && !e._duration && (e._duration = n.duration),
          0 === Object.keys(e._sprite).length && (e._sprite = { __default: [0, 1e3 * e._duration] }),
          "loaded" !== e._state && ((e._state = "loaded"), e._emit("load"), e._loadQueue());
      },
      _ = function() {
        if (n.usingWebAudio) {
          try {
            "undefined" != typeof AudioContext
              ? (n.ctx = new AudioContext())
              : "undefined" != typeof webkitAudioContext
              ? (n.ctx = new webkitAudioContext())
              : (n.usingWebAudio = !1);
          } catch (e) {
            n.usingWebAudio = !1;
          }
          n.ctx || (n.usingWebAudio = !1);
          var e = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform),
            o = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
            t = o ? parseInt(o[1], 10) : null;
          if (e && t && t < 9) {
            var r = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase());
            ((n._navigator && n._navigator.standalone && !r) || (n._navigator && !n._navigator.standalone && !r)) &&
              (n.usingWebAudio = !1);
          }
          n.usingWebAudio &&
            ((n.masterGain = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain()),
            n.masterGain.gain.setValueAtTime(n._muted ? 0 : 1, n.ctx.currentTime),
            n.masterGain.connect(n.ctx.destination)),
            n._setup();
        }
      };
    ((exports.Howler = n), (exports.Howl = o)),
      "undefined" != typeof window
        ? ((window.HowlerGlobal = e), (window.Howler = n), (window.Howl = o), (window.Sound = t))
        : "undefined" != typeof commonjsGlobal &&
          ((commonjsGlobal.HowlerGlobal = e),
          (commonjsGlobal.Howler = n),
          (commonjsGlobal.Howl = o),
          (commonjsGlobal.Sound = t));
  })();
});
var howler_core_min_1 = howler_core_min.Howler;
var howler_core_min_2 = howler_core_min.Howl;

// TODO: gracefully load assets from files inside build process

/**
 * @hidden
 */
var beepSound = // tslint:disable-next-line:max-line-length
  "data:audio/mp3;base64,//uwAAAAA8ROTJVigAB4icmSrFAAE/IjVfj6gAJ+RGq/H1AAADEN55555509PSUkYjEMQ5DCaBiMBmSoGPBh6QGGJAZo8BoDwGYJADEBmQbAAbMBcAJ0IIRQuFwuF8vm6aaaaaaCCH/9RcIubDkCgBQAzBOLL5cLhog3p////6BgTBFC4yZfTah/////WmYFwuBgTh///5cEDgnB8AMQ3nnnnnnT09JSRiMQxDkMJoGIwGZKgY8GHpAYYkBmjwGgPAZgkAMQGZBsABswFwAnQghFC4XC4Xy+bppppppoIIf/1Fwi5sOQKAFADME4svlwuGiDen////oGBMEULjJl9NqH////9aZgXC4GBOH///lwQOCcH7usq4IwABEoZUkABBACSAH6LQxWQ1ekTmN4ZafMA1wANy7UyDUPgZzK4WdA1sdhHQGm0eAcG0Uwxsang94vpi3jMEgeLBTM1nUEFdDatet8mwsLJddIZ0CIGTVYoADBkuf9NrJ1f3UsUMJtLy/dMOCTfrUURBBm/6mKA7P6lkcLj/z5mI2/+plE5/9TFgqrf/qYpFf/9v///9Z7////Weu6yrgjAAEShlSQAEEAJIAfotDFZDV6ROY3hlp8wDXAA3LtTINQ+BnMrhZ0DWx2EdAabR4BwbRTDGxqeD3i+mLeMwSB4sFMzWdQQV0Nq163ybCwsl10hnQIgZNVigAMGS5/02snV/dSxQwm0vL90w4JN+tRREEGb/qYoDs/qWRwuP/PmYjb/6mUTn/1MWCqt/+pikV//2////1nv///9Z57qrtSAAaAEOPo6q0VkVoBSMfBmZVHFMomra/sFv//+7IADwAEcXjR92KgAo4vGj7sVABRJeNFzHKLAiS8aLmOUWARYQFAEDoGXFeBv7iAZHHAGKwQLnD0RkkCKmpzOKUjUjUiy0nUlpOh2UUjSoc4VsAaFAMkgspOZb1de+/222v3lN9ikN8FBKOaa0lI/b/+32+TGsxIaGIRJknav9///1fSInqSWHRKS6v///6/nCEJvdVdqQADQAhx9HVWisitAKRj4MzKo4plE1bX9gt/iLCAoAgdAy4rwN/cQDI44AxWCBc4eiMkgRU1OZxSkakakWWk6ktJ0OyikaVDnCtgDQoBkkFlJzLerr33+221+8pvsUhvgoJRzTWkpH7f/2+3yY1mJDQxCJMk7V/v//+r6RE9SSw6JSXV////X84QhNqq9yGAAtDIPgN54cGQ0s4MLUdIZgz1qumUxddqEpWGZfQdAYAOR0btmDgYpm3SG6ec7wnc1aVs2dj+1bbTnyweolsigCR4Bd4UcqIoKbf1mlbVoekvRo/NT+yIW3Ci11PUfr6dTaC7b2fe/yLtUspAgFDuR53///+pvOkM14YR+pvt/+v6/koSLVV7kMABaGQfAbzw4MhpZwYWo6QzBnrVdMpi67UJSsMy+g6AwAcjo3bMHAxTNukN0853hO5q0rZs7H9q22nPlg9RLZFAEjwC7wo5URQU2/rNK2rQ9JejR+an9kQtuFFrqeo/X06m0F23s+9/kXapZSBAKHcjzv///9TedIZrwwj9Tfb/9f1/JQkVi7zplQAFIAgwMk9GmLaGUorLwS8iIOIgIHDACBpGPGPIQTeb9Ig1+zoNGAMN6Ijtv5KI3h0rZfrLVE0dZ6n/+7IAHwAEk3jRez2kEJJvGi9ntIIT3eU/7PqwQnu8p/2fVgg7IPUzJfLB65iPwTcgPIEeWDqpvvvo6N2qSs9T1fIxKtlg1Fg5Kkp6z7nWWdSqqUulspS3s9vkhqoBb8Kg7POv6///9vUQVqqgx7Xmf7f//rbyUN1Rd50yoACkAQYGSejTFtDKUVl4JeREHEQEDhgBA0jHjHkIJvN+kQa/Z0GjAGG9ER238lEbw6Vsv1lqiaOs9SdkHqZkvlg9cxH4JuQHkCPLB1U3330dG7VJWep6vkYlWywaiwclSU9Z9zrLOpVVKXS2Upb2e3yQ1UAt+FQdnnX9f//+3qIK1VQY9rzP9v//1t5KG6jmYd0IAA0gIAD4Llq2gAnFo8YQd9sJd67dV09LYmltad5GkSGPh80IAtg4NUiAWeV15W6FXRpnnczdM46C/SvZzut0SUNUjYiIywAAvA1QCg40iSbnTJdtr85/P3fO63YhxpWgiDUWgsOUjjzp+tq2+r+++jtYd2dURoFQ+LhSOZ0/Xrb/9T9Sz21xU3rrCIH1Zi9ev9/1atZ7aRwqb1nMw7oQABpAQAHwXLVtABOLR4wg77YS7126rp6WxNLa07yNIkMfD5oQBbBwapEAs8rryt0KujTPO5m6Zx0F+lezndbokoapGxERlgABeBqgFBxpEk3OmS7bX5z+fu+d1uxDjStBEGotBYcpHHnT9bVt9X999Haw7s6ojQKh8XCkczp+vW3/6n6lntripvXWEQPqzF69f7/q1az20jhU3rV7maZEAAWQDDArs+W/cFQBSysHAKdYWnzUwc2mlLOlivqupASYLMR//In/+7IAFQAEsHlRe4mkoJYPKi9xNJQSUeVF7hqSwko8qL3DUliIwQla+ytB9/jCGTwOk7YLCgqBZuy6Dc6/c4eQc0L4CDQAc0T4T5smsq7e5vm9np2bqoaspnmWgiEzoOAqU861fWtS6kamrTW703pasnfL4YpEzZ2sf+32//WnrnSY1XDcPXnP/r/q/baZjfd7maZEAAWQDDArs+W/cFQBSysHAKdYWnzUwc2mlLOlivqupASYLMR//ImIwQla+ytB9/jCGTwOk7YLCgqBZuy6Dc6/c4eQc0L4CDQAc0T4T5smsq7e5vm9np2bqoaspnmWgiEzoOAqU861fWtS6kamrTW703pasnfL4YpEzZ2sf+32//WnrnSY1XDcPXnP/r/q/baZjfdpycyVAATgBDA1ALqbMHAeBrYsAWWvHH2AywaA7BHvZmwaGmklUBEh5MPfAYCKjjZQRAGyw/4fwM8hGdB9J4CJscei+u5YLTImQ+QavAASY+iycWpPbNd999Hba+rMXrrCZ0W1StZar1utXOa91mj1O3XkCZ1SkCRAiy16n9Tfq//P+onVdYcXq02/9f9bf+P47nacnMlQAE4AQwNQC6mzBwHga2LAFlrxx9gMsGgOwR72ZsGhppJVARIeTD3wGAio42UEQBssP+H8DPIRnQfSeAibHHovruWC0yJkPkGrwAEmPosnFqT2zXfffR22vqzF66wmdFtUrWWq9brVzmvdZo9Tt15AmdUpAkQIstep/U36v/z/qJ1XWHF6tNv/X/W3/j+O543/+6UACbAYaztA4tsHCcKBx5S8EJ48ScsKkEaV3wtIwd45ACAQBij/+7IAFAAEt3hUfWKgApbvCo+sVABSgV9f+YoAAlAr6/8xQAAgAbKYoGDwWBIDlhrJuWqzTL9SbKMay9NzZaZstX1Hqz6AYYCxHFLl9Pf+tVapulmK7UWt9B61l8Neg3tQSZCrztaV88yFfW7oCbU6RmLPAOCwEggQQ0TqfapGrV//Uf9RC6EzDAiSHKL/////nREb//dKABNgMNZ2gcW2DhOFA48peCE8eJOWFSCNK74WkYO8cgBAIAxQQANlMUDB4LAkByw1k3LVZpl+pNlGNZem5stM2Wr6j1Z9AMMBYjily+nv/WqtU3SzFdqLW+g9ay+GvQb2oJMhV52tK+eZCvrd0BNqdIzFngHBYCQQIIaJ1PtUjVq//qP+ohdCZhgRJDlF/////zoi5C6lVAABQCoDYQD4ZCwVB9kTFKkiv9NQcExMLk3ipgtxrzPf8LZgdNYHsgYIPgbIgAEXEAwCgpAie4XVi5BaBlBUxSQfMO7yfQPFcsGReNjIgX0QvmASaIgQc3SJkgpqr+myNNNNJSSX/n1Hw/4CgwqkXN3qSMTVX//U2skkQuTq9JJEy/+ybvT6p1IjCCpfiL/+SuQupVQAAUAqA2EA+GQsFQfZExSpIr/TUHBMTC5N4qYLca8z3/C2YHTWB7IGCD4GyIABFxAMAoKQInuF1YuQWgZQVMUkHzDu8n0DxXLBkXjYyIF9EL5gEmiIEHN0iZIKaq/psjTTTSUkl/59R8P+AoMKpFzd6kjE1V//1NrJJELk6vSSRMv/sm70+qdSIwgqX4i//klMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+7IAAA/wAABpBwAACAAADSDgAAEAAAGkAAAAIAAANIAAAARMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";
/**
 * @hidden
 */

var scanditLogoImage = // tslint:disable-next-line:max-line-length
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUcAAAAhCAMAAAB9TZmqAAABgFBMVEVHcEyCgoL+/v6Kior///+FhYXW1tbn5+eAgIDp6en+/v6BgYH///////////+BgYH///////////+wsLCCgoL4+PiBgYH///+srKyAgID////s7OyCgoKBgYGDg4P///+BgYH6+vqBgYH////MzMz39/f///+BgYGbm5uDg4OMjIyBgYG+vr6QkJD///////+BgYGDg4P+/v7Hx8eOjo6BgYH09PT7+/v///////+MjIz9/f3////////Y2Nj6+vrPz8+BgYH9/f3///+3t7f///+Ghob///+AgICDg4P///+IiIj///////+CgoL6+vqmpqb////////t7e3////////////b29vj4+PNzc3y8vLl5eXv7+/U1NTDw8O8vLyRkZH////x8fGJiYmZmZnDw8Pf39/S0tLT09PCwsKfn5/4+PjV1dWlpaWwsLCjo6OsrKzj4+OZmZnCwsLq6uqurq7///+AgICfn5+Tk5OFhYXCwsLJycmYmJjU1NS/v79wPZvPAAAAdnRSTlMAcvoPxiTEAsby9L8p/eusNEoJBlEZ2Pb67nz25fVGOv1Eh+RW7oyC/ToXzkALzmqTe8BJHmf9Uu+n/B2Dnt7/+6MvEP2ZKrmzXHIx2dScYv6wkf3o3SL+/uDhqLbnuNrVV4u4ie7LNGlhweeUnrTsZOjkis/PjpWtfQAACfhJREFUaN7tmXlbGksWxtlMEwRUVjUgrSQqEAQccXdQQRUVVYxqoolqjGa9WW7uW25Xv/pUdxe9q2TM88zMM55/aE5V1/Lr03XeqrZYHuzBHuzB/vPmX+hzgdmcyh/sXrIx95LKPQ64/JoG5oaHHVztzya8Ssl0rV1PfO6A03YbR4xdzUBnblbgXphZm2hv+W0z9bW0+H7tjmL9d2w6VDPon7XX/CsuxR2fTcr1hervk+oWBM9KDa0bLqVys5pOn1vTrxfvG6SrCT3HpwNiS3O1Gzt/E8dN5RHVadNAsL6aXB9ch3/9zWyUdDF/Bqh8/ngm2Shpkp+QB49xEdJy3MbgW4UjaVQ42nola73ywDWt5XhKpIcWbP4h9F3CIOuOEOodiwNz4wvdDsDW/N/PMYPhb1GiGOMY82CiSeWWObYgXsI2SWo4tq7jusOco9xC7yAGF005WixOocIq1mt1eerrw/BT6/L8cu69C3Hfb+EY3NkJ/tINHOU4Vl/VORxGiTOQ9DOTVjGugrVGwmdn/Zxkcv0qds/gOS9rOa6isM+Zc3TaRUsmvhQw2WDO0Z+mNoRnpEnurgjs8RLVPeD3vNkNhMz+2h1PgZP6anrxkTT69d4hhI8IHzCpX8Eb8gyrU1qOxIHJ/A0c5XqHwL7flCOL9GdK2NMR4JRv7LJmnYQvoF2OEHcsqEpY/s1YzK1JYJy7WRu8KoeGo75iMea7iWMxdncYb6CXLBq8I5jhSd7s1YBnnxzjMqLjSDv8kb6Do8+L6556OXYCpYR41RFdbWXx2NwfBrCRYU+jOO4FgBfjEsn+8EpxZBjAHHsX9Y4Tm+3EtKLFV10CPA73SrjfwPFgA0C8KlIOusILtVmHq1pil1HOsC548YcKgMpWUOHJCtbJrJZjwwi2eu7gaGnHdlu6To4DgHdIugwQIi2+GRvwogJgRByxzwF4+vqos5uNY8EBl/Cfrad6Ry3PGCoGHYCLqr94Nxx6joceeIWqfSLzNVQkQptATE0sBk+rXU9rDJ4IKZtxnMAOCQWB0byO46YNqwN3cIzRv+U6OQauAfSNd9KJ+qMkx1SUY3M2cVIFFiQl6xqaTSQW55hkpWy8Q9zs83EgY+pQOBorDiUT9gMbYOCIjWl7YmDBI2nrFmCaxURFS2YG+JlpoRYrWpT5ewlvN+MYp4Gapbm0dV7H0dKN9ak7OAaB8+U6OXaQkihgPX3jsY5yQkqJS05BWkQ+SbN14FGbkIe+ApvC/8dAZxP18IMYsZg5ngP/MPPHgD9C9K9zBXis5+j9FhL6fCMmu2R0kAV/BaWs9h3eqclf20RQntInkjLD6IYtRAKU2WQbp+NY9KK0eDtHH3CWqpNjmieRz2vDAABHjEVTiU6Izqr3pbgiruydET6Vip6yMHuMV07SluLJJfotZg6Fo9Y/gieERFNREnlm5PiIF6uSdZH5/DXinCQsRxM6OB8vtx6/evXKBWyM1Rb5T2TeXG06hEBtwSBJ6DjSMkGM38axCJxH6uRoyRFCUl0fMmthwNYpvVKjTtpPQ5YQq1Cjh0QD6WBn+6DMcbKNSgx77hqvLCYOTuGorVihOSLAWfzl6JWR498hGh1+K3+JPmG5GZVE2DiuQoaskuNrSvl7ks3fRabMOK5hh1AwPhvOcnqO/iVcBG7lOA2Qtno5WqziS8ununY8GKbL5AIKKTFL+UNSo87zR3PDAFwyngsxH3HvGA294/kNFV0oSYmsfGHkOCohyZcQFm6JbGFClDmrVhOBmlueorZvw1d7bSFrMtP3w/iDCDuefpQa9Ryp5Cvs+2/jeEDDvN54PDhwp/NNIkryUsyNhyiw5Jbo6hHerT/D8DjoOcY3Gc9LqfyRzFHjUMWj1m/DOza/SSPHI1b0Djah055V4aE2Y5BP3iwmd3GdZenktNGkPAZXRNQg7diKpvUcKd0r620cZ/CT1Ls+VsTHzi3mm6LkTEzQfwIDTH0HBS0edGEuaEl25H7IeB7pOWodz2+o+ATHrNfvRo4f2OUxnoh6jB/EEE0QF/O3iPIFXPED0so7GTEpb0c/ifpFoAWm6dQcm4GvJzdz9HvxhkzVyXECGyyTpXtOgRaR41BtGC6fEN04mhcCtrdOjtxNHK/wTOoraDNyPGSXn7Al/s5fYI2L4yxwC8cqXksCrxOF0QFjeT8FIULyu9DbZeBI8W9/uZnjAsIhYq2T4+eauhZDoUAfWm4d0jGn7wXWRJoFKlWWc4Hde8YjtwqssPmb6J4iGx1axd4DZx5bC7Yj/lvOOV9QTlL+6MNWzlhuw0diZQnnOmXkOBbGxY0cm13YIaShTo6hLWBElLxjM8Ak7TWwCqwVhT0c0MlZuCFgj65RxRkAT+8Vj6lteDJFy2YVg0aOWKKj4IbC2JYStJBp4mjtugXjGuIptuGYtmHLsDlvQTwqbca5DLblhVbhSOVA4QaO/swwlt6qovMOjsvnTwDEHf1LAK6ERWSRXILKcscwcCEsLuV1YGNuyePZGUR84T7rY9PoNoBhYK5k5HgMvOinZetnbEWkmQaFc/3BUay7ZmteeN4TnhEZssE2Mt4uGdubd2OXtNWOx2znASPHohdajp7J1xOC9dOCjSOiUp13cCwT8qbCDunfED4typ2/Kh4AG19FcZs72wLgWWpZvgBm7hOPHYTfcYRRqWav8d2gezJxAN7dc8LmK2SaSacxdSjmfR+R8wD3YVspcFnYy/5Gnmkcq8tGjpYMUFBzVMy2+5aQrKVejtw8IVPPYysrnSdZQpbZeUVTsjkWzBK+Q/p7FIv57LT47AMnngazl62Hhb3eUTs3M1RsJHw+WaQCf7KmiJgtEkJCs+7OzUBUURpvCzg1nIV1zhz/U7KXexFCInJ24QK915evWdGUsFhy1eq+fJiW2V0NmXDkltQcgzPHl5OvBXu5N0p4MsXVzdFiTwnbWmdjiCeE3ZcVZLmTpmjxZMkeIiREi/muCIlY78Nx+nCPtkzbfevCnp7jMh1FY5uAU0mB64roU0z+fEAHPK+e2WKjUiChsfNKnlCug+6owrH45YyopGde9W0ipJEKY8+JlqPffaTZz3DlkHRfY7mGPyBAldtpmBfGFuqgOMRA//c5Al+cUT6UnVG+M8kcB/I0vEjblDxW3xJKyybppcNas7J+8Wwo14qkoSfzqnjOW2WmbUQRSemImuOs3HhA33iS53VP1Up0m6iBRLncodFf6cWEah+RTCTEJhpmuXt9cHAgXG3pzPQDJbM8PKsaQ7W9D4PniYfP9Sa2mPsJAMBwyfQjgNqGgfBp6IGZKUfCf1vonmkfWiZt9ru+r1bb9++E/f9qThLNBhL5RkKsd1XN9qRIJP2AzNTSTdLJYVv+znWWZu7ow+p4ow1Ys3Snnry7Yj5rHfjfmda/AA1uqYyEPVX6AAAAAElFTkSuQmCC";
/**
 * @hidden
 */

var laserActiveImage = // tslint:disable-next-line:max-line-length
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAuwAAAAvCAMAAACPHW/9AAAAwFBMVEVHcExUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFVydJUyNFUyNFUyNFUyNH8/v5UyNFUyNFUyNFVydJUyNFUyNFUyNFVydJUyNFVydL3/f1YytNUyNFUyNFUyNHx+/ve9fbp+PnR8fNUyNGF2N9009q15+uW3ePD7O+l4+dv0dlv0dj///9Ujp4pAAAAP3RSTlMAiXJnBFsIARM5oA1+UKsuG5W3JEULBishQj5iAm0QkTQZ/h5MF3snWISbSHb8plMFjfjv9Oeyua3Ww9/Nn4y/IgemAAAIrElEQVR42u2da1saOxCAq8jRVuql0qOVIgcvgHhBrBbUYv//vzpzySSTZBeWqo8fOm+E9Vv3eXxnOptNJh8+vD3rhvFC3lHR73/GmmEsxdKKVY+N3ONFN3OT8O+S/GMYnmXtid0rCJAy7b3nrPDyQn5dnk3DiFnaoeJ4Ife98ZnqTnTSPHZ38R0ezWPDMF6BeY6lseK0F+Ej3Vl1MJ1EZ78rmXrmBvxWTLcCO4axU8WUEsk2nIMhJsh6Et75HnQn10l1NB093xB9F9p4UsBBKXuGsQSlIuXSScSQ/Og8Ch9097aT66I6mo6S74i1c++mn7G/v4+fQrYNYymKPWLBEvEkOtD7LhoPvmN+R93R9sR1UR1FR8n7/cqS/oejjI+G8UIyqbb9NQ4NtB6MJ99J99j2deU6q35AnrPDFew99FcY+MN8K6VpGHMpVecwQL5p/1h+dL6/Bwm+i9k92M6yY2IPrpPqaLqT2omrR7hk9l4ETvEHRuAzD8OogNNFgUpd8DeRhgYGACkPvqPuO5jc2XZM7SGxK9dRdRSdknNicIy+Ey/xyDMYDRR1dzGMaihrHKCUxweFhALpD8qj76Q71jLOdknt6y6xB9dZdRCddU4ibpSgdA606q2cWqtWq7VqfDWMUpwk8BVRd99xPHAYkP6oPPkOurPtVMlwaneyU2KHZ1NxHVVvXqDm3uXC0GuR1Nrr+J7bODyr9IGByNUwYtr+wrYEgcClJCZ0FJD6YDz5Drqz7Vi3U2oX2amKgcR+1nWuk+okelmOrmVWB6XxVi9xBHpFNHoNw0gpUkU8WsUfCYoQBLW2uA/Cj0aQ353tBydcyHAdQ8+na5TYsYg52GPXUXUwnbXW2TnC/atKbO+x47xxnrFiGBXIxEGbkoCQAHD2k/CgO2T3JtkOT6ldl9q17JtUxOz1xXXM6WC6N5qVVtm6B2ZfRmrnPo9Xxkxn3InYlWEYGudFDOjDpHEAyin7UXoQnnVn27mQodQusksVw0UMuj6CrM6mU7ZO/6ehIFNZ28uNXjudFUPNJxz8ZRgxw09eDbgEQCEdERwCSn+X+EF48B11B9uxkqFCZmNjk4t2/3xKFTsl9m9Ndh1N7zUa5eWHZO1Y7qFzW+7/GgZ+AVvXW1v0RR/DKMGZgldAFJKAcP7vDhP30fkG6I7ZnWynQoZS+9ev/ISKz6euioHEDkWMdx1UJ8Wdz+NOqEZU1vaJW9ntxBZ+5nzhYRgJJEYBKhQoAjL3wXr0nXRH20+bnNpdHQNPqCQ7VzGS2C9GXnUQncQe+nyNZcjsegZMZ1NgMp0Aj8Av5AF5Qu6RH8wdcctcBY49v42/m6CC8oN8YXnu2CSyivwi01A5dO8RJZxMp+jl8/Pzee+yXasPJLV3pWj3slMVgxV78xTyunN93KG8HWoqjKkZfKZb06A6u462P4DtTyT7Pdn+g3S/I9tvyfYrHInpJPvxbzP+79Qc//BBddEdPLm9cvmRZCfd78t0d7ZP2fbn3mq7VcfU7uqYWPYjnnekKmYAiV1cZ9W5MnGmo+jadQotSuwPvySxR64H1dl2dh1/LLMbLHyku8/sV2z6rU/tJPvTvbhO1cSjtx2E5NzeoNT++SLUMaWy1yPZOZ+L7VtTlP3ndPqFbJ9M0irmKVQxktddYpfMTrofp5ndMNlF9WNnep7ZXWIH2x+C7uT6Y5zaWfZvy8o+lPIF8/oW6z5F3Sec2UNiDxX7vS7Z7+6KqhjU3TK7kVTsKrOz7XeuaM/KGK5iojpmSmU7uT43s0c1Oz2fNs7P8elUlewzrGJwkO6+Yp/oil1ndl2ySxnjXD9OUrv9vU12pzqNUMWEZ9TwiPoUinYpYySzu0dUKmNKa3Y9G0MTj5doO0/G4BzMDAZ+fZrRXEw0FePLmHQu5l5l9rRmvzLZjeLUfhW7ns3GJM+nfj5mqlzHB9Ti2Zh8nr2l5tnjF/67qL9+PxomJYd6ziZ6bVQwz24Y5XPt2SQ7jvDGiebZr7Np9irz7Okb1IvsDeqKjNIXqJ3s/elQvWOS6Rz1psneoRrlL1D16yN+gxpeoPplBLslb1BXy9+ghrUx3cK1Mb2CtTGN4oWMWv6Ol1/nfnkvRStkeJmMrZExooUxTo4E8kjWioXFYdHSsEZj0dqYSqseLwuQNY9h0WMjW0Yz9sTrHnnFY0fu3jCcCR2vc77ocbwyztf/hmWPbtVjbf6qR1nP3o3Xs9fdevaa3yeithz5bRpxMMT6Fy1o53vlj61tN+I17JEX2Xr282SDh9/TIbs5eD37YDRvPXvpTqV6vcI+Jdou5f1XWzr0fwL5ZiW+a9uZY0T7lBpzNioFsfVOJdr9WXGnkt+DulG+B7Vk+3eyZa+m4qCdbEBVwWCbT41Ke1H1/tOgdbtoE6reg3qa7kHd1HtQo+4Ce2l3gfLeAoO4X0YSBfWstUAr7Bo3jMXtBdiatMGA7i5Qj3pshO4C4rokdtVdwPeNOYv7xnD7o6W6xnzWoTBIWsdwRFjrGGNBw5ikT4YyelDaN+ZU+sYcUp+k4r4xlTqCHc7radcsagiWBINvCGYdwYxqHcFO855g1BWMWs2VtwRTHcHQ9aOoI9jcXo/S3NEP/3tOHBSuRV4WGNbq0ajW7DFr+Mg9F2Oy5qfS6/Eg9HpUib2ki+8ed/HtL27iK91PS9ugWhtf4zW6+H7MO/lux518ky6+2vWsZ3VRf/ZqzdnD70l39m1rz268eoN2TML9/Vi90J/9ZE5/9kUnbyx77gYOfdqGHbxhvPLRGycFZ2+EkzfO+LQZOXnjZi0/Z6boTKVFJyrJLy84UcmOVDJefqhSctDYnDOVotPy3GGQ1Q7LO8JhZ+UZ731cHoqojsuT0/Ju1uYeDpmfg/pmp6DaMajGWx2EOvcc1OTg32oHXN+89HxrO+DaeNMjrqsd7M5Huxfy/Y9ZM4wlWVoyZ+mHd2LdMF7Ma5j4P+hE04Z78rHKAAAAAElFTkSuQmCC";
/**
 * @hidden
 */

var laserPausedImage = // tslint:disable-next-line:max-line-length
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAuwAAAAvCAMAAACPHW/9AAAAYFBMVEVHcExUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFUyNFTyNFUyNE9ws1UyNFUyNFUyNFTyNFCxM5UyNFHxc9RyNE5wcwd5ZO7AAAAH3RSTlMAZ35yAQgbBAwTI4lbRDmUoKtQLrc080osVZvhKMyyq5oARwAAB8JJREFUeNrtnYtS4koQhhUENRFRRBQRff+3PNP3nktCRHbPqTr9T5jErdrVrfr6t5PMdF9d/XndhEK/1H8T0dtQ6K/ol7FxAWIX+Veh0AVVoLaYEAojoP8C1btQ6O8KmBsPiSbwnvSfsHvPB4w7ucBhRyh0EQlROgw5/kKjwDNf4G6ke8yngrrkaYmDr+hIk35CoXPlOKJTAZxQSCHhiK9xV9aFdKN3BNNOJ5w7nTs60tR1PIdCZ2pp52VHXC3lBMh1SqEGBjHPvJe056gj6UsFt6HPdMAH5s9K73zQ9I6Tnlp6CYVqGSCf/hK4+pQTq6OJg4KQF+AVdzV2Yt2jjlDjP1ux2cLzFUZTj3A8hkLn6JXn1yEReRofSD0gT7wb7WLtjnVGHTkHpo3YbIxrBccKjlDoskKucLQiA+lPzAPw7O6OdoNdWGfUCXSBtxhyKnh+g5GEU0sbGqHQKb1tGJYBlFY854EgyL+8GO5CO8HOxm6sA+oIOsEsDBffqODYaZ+OfTpMD6HQWdrLKQ0T8JWFhqIJzAPviHuDdjV2ZZ1RB9ALjgXmzd7jDD/S/qFG+pqGnUKhn+iBJkUojToaLAwIe+Q94f5utJewo7Ej68nWkXTkfIov489AP5PTPA0+zfmY21eh0KgEE4GHh2DlwsFHAQAvuCvtYO0edjV29HVgnUh3/vxwPeLOAnGB8awcIrsKhXLNGY+5Xs95QqJ8PABzHn5kHnh3tDtrB9idsad7U2adSDeY9eCpsueZwV2r7+lInxme+15OoVCtmcwzZgYpqoOCsWP6EXjAHdw90Y53qWbtBjsbO7KebF1QL3Cm06yJdT9jlBXjNQ1/QvEpFCrUu6t+vc4B8rEAmOX0E6CKO3q7WbvBTlmMJOyJdUad4B6U0t0b3X2J8sdHOgo9PcGUBkyhEIphIELwYK1pAph8LHj6e3Z/wZ1p50SG8pgbn7KzsaccZg+oK+gDCcea4e6N7g+Hdv4feYYRCv1IT8/PRE4WExYEAr/aPvGutIu1Ux6T7lARdjV2TGI2zDom2y4d6UvTZr4rujOwv56/vvQj2tIIhTIxGIUSRIkeHwQV/Agj8Q7unmgvrL2GHZMY9nVCvfDrD8k8GGTgFnQUHY4H067SN4xv/IRCA9p9IyeAS6bDzthKpJG2RwqTFAxA/pp4v0bazdqHYSfWGfXCs51tM+nHLX5LZZ1x38kwzr9tootQqME5kQFnYl5QJ6CYdcOdgUfchfaUyoC1D8LedZTFJGNnX/eoU9b95HMTJn0rpAPqauye853EKYNunAfvoYx0vVJ3d/Z+8N5+VNq3Ge2QzaC1b+DxI+Qxbdg/4fZ0442dWLc7BYe6ZNyKumd9dyh8fWesh7OHTno7o54lM4ec92OWyhydtc+asN82nV1gtyTm+Snz9crYt01nrzj3pLfiOfQ/t/WdT9kbeXuGepbFHC1td87+yrDfD+bslsb0RcpON8HFvamzdkvZd2buyrsDPjtCoTx/cfeombET621nB9iJ9fWUnL28QeU71LU+hDHuFXez9/phzO7QeBKzC7xDU4DftY39MJTDoK9Lyi6wjz6NyZ6zu/dJ/Oq2krzcGnvOrnGhj9jtcvu1jSfuoS8/CIniYXv1tql6zN54zr5qP2fP36Bu9rJYYKbvlXgZV/0a1cVA/TRen+M82Q1uvEkNTXt7ys9F+Jax8Qb1w1bU9PIGdT72BvXU2pjB9bi6irGIgew3QGthDK16gGiIpTEhvzYGgfjQ1TFea8d2c21MP2VtzPCqx2LRY75GvV726NaEzZr+H2sdQ+csg2xxravF3YrfYtXjamDV4/B69odsb4Yuma83G7UX/orzZxexkj00bU27QqMI5dt/5oJ4vqB9bD37lJ1KugHK9gaWW/Aa2zlm/heBj4LYqRQa36k0L7ZoCNSzYqOS36pEG5XGdypN2YO69xtc29uqiyiY2xanYkfhtW0zDIXG9qEaN5JdtPZku53Y+/3pPagj1QVaVT2stMCD1hfgKgMaAdmmcPndEAqdridwnW13tu3PVYGBPeKt9QVcdYHHkeoCi2bdGKuB9DasRuWjfVYzBn4U/o3gym5w0YIoKRNqFYmRCyOmVF43hsopcbEkrJPUrhszXBFMC4LVFcHa4npKqywWaJKIeMvLPoVCw0XB+PxWFwdbYTmwt6o4nlQEex+oCCbWPlbr0RcqxWqTUgGyVebRRUUodPFqj4JYWfDxNav1WLBusOdVfJdVFd/091/k896q4Gs1VduFfF1J1KjoG5pUvZeReR2u4fviSvm6Mr6uii+zvrAqvpzHtOqzj8nXZu/qQu3D9dijPHvoRGn2F/XUkpbPrDC7VWdnyLVA+1B99qrzhnaPmdwehnsgVO0Lou9G6A904ei6svdG1XhDSF8M95nJeyqdbKR0r81tfI8buaBQuY+OSqFLNVVSsvyF76zkQB/oqZThzt3ysPHeYqRDnmtTZh3yrK0Zf+7sD0KhczvkOYQyohyM2jAvsbsY65ZX9UFd/KAP6p2c7vwVd6ksm1ZG787Q+V1P2X4BOYKNDfzOMETKF+N9UH/V4XpRNB1e6BdFM1b+hEKT+lkLLbd5P1+meZGBVzZX/0Fjdwf+dN3+pg98KPRDjbF49S/pJhT6tS5B4j8UFQCShr1YqAAAAABJRU5ErkJggg==";
/**
 * @hidden
 */

var cameraImage = // tslint:disable-next-line:max-line-length
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0xNyA1Yy0uOCAwLTEuNC41LTEuOCAxLS40LjUtLjcgMS0xLjEgMS41cy0uNiAxLS44IDEuM2wtLjMuM0gzYy0xLjYgMC0zIDEuNC0zIDN2MjdjMCAxLjYgMS40IDMgMyAzaDQ0YzEuNiAwIDMtMS40IDMtM3YtMjdjMC0xLjYtMS40LTMtMy0zSDM3bC0uMy0uM2MtLjItLjMtLjUtLjctLjgtMS4ycy0uNi0xLTEuMS0xLjVjLS40LS41LTEtMS0xLjgtMXptMCAyaDE2Yy0uMSAwIC4xIDAgLjMuM3MuNS44LjggMS4zLjcgMSAxLjEgMS41IDEgMSAxLjggMWgxMGMuNiAwIDEgLjQgMSAxdjI3YzAgLjYtLjQgMS0xIDFIM2MtLjYgMC0xLS40LTEtMXYtMjdjMC0uNi40LTEgMS0xaDEwYy44IDAgMS40LS41IDEuOC0xcy44LTEgMS4xLTEuNS42LTEgLjgtMS4yLjQtLjMuMy0uM3ptOCA0Yy03LjIgMC0xMyA1LjgtMTMgMTNzNS44IDEzIDEzIDEzIDEzLTUuOCAxMy0xMy01LjgtMTMtMTMtMTN6bTAgMmM2LjEgMCAxMSA0LjkgMTEgMTFzLTQuOSAxMS0xMSAxMS0xMS00LjktMTEtMTEgNC45LTExIDExLTExek04IDE0Yy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMmgxYzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMnptMTcgMWMtNSAwLTkgNC05IDlzNCA5IDkgOSA5LTQgOS05LTQtOS05LTl6bTAgMmMzLjkgMCA3IDMuMSA3IDdzLTMuMSA3LTcgNy03LTMuMS03LTcgMy4xLTcgNy03eiIgY2xhc3M9ImEiLz48L3N2Zz4K";
/**
 * @hidden
 */

var switchCameraImage = // tslint:disable-next-line:max-line-length
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0yNi4xNCA4YTQuOTkgNC45OSAwIDAgMC00LjE2IDIuMjI3bC0yLjIxOCAzLjMyOGExLjAwMyAxLjAwMyAwIDAgMS0uODMyLjQ0NUgxOHYtMmMwLTEuMTAyLS44OTgtMi0yLTJoLTZjLTEuMTAyIDAtMiAuODk4LTIgMnYySDVjLTEuNjUyIDAtMyAxLjM0OC0zIDN2MzZjMCAxLjY1MiAxLjM0OCAzIDMgM2g1NGMxLjY1MiAwIDMtMS4zNDggMy0zVjE3YzAtMS42NTItMS4zNDgtMy0zLTNoLTN2LTFjMC0xLjEwMi0uODk4LTItMi0yaC0yYy0xLjEwMiAwLTIgLjg5OC0yIDJ2MWgtNC45MzhhLjk5Ny45OTcgMCAwIDEtLjgyOC0uNDQxbC0yLjI1NC0zLjM1MkE1LjAwMSA1LjAwMSAwIDAgMCAzNy44MjggOHptMCAyaDExLjY4OGMxIDAgMS45MzQuNDk2IDIuNDkyIDEuMzI0bDIuMjU0IDMuMzUyQTIuOTk4IDIuOTk4IDAgMCAwIDQ1LjA2MyAxNkg1OWMuNTUgMCAxIC40NSAxIDF2MzZjMCAuNTUtLjQ1IDEtMSAxSDVjLS41NSAwLTEtLjQ1LTEtMVYxN2MwLS41NS40NS0xIDEtMWgxMy45M2MxLjAwNCAwIDEuOTM3LS41IDIuNDk2LTEuMzM2bDIuMjE5LTMuMzI4QTIuOTk4IDIuOTk4IDAgMCAxIDI2LjE0IDEwek0xMCAxMmg2djJoLTZ6bTQyIDFoMnYxaC0yem0tMjAgNWMtNS4yOSAwLTEwLjI0NiAyLjgzNi0xMi45MzQgNy4zOThhLjk5Ni45OTYgMCAwIDAgLjM1NiAxLjM2OC45OTcuOTk3IDAgMCAwIDEuMzY3LS4zNTZBMTMuMDY1IDEzLjA2NSAwIDAgMSAzMiAyMGM3LjE2OCAwIDEzIDUuODMyIDEzIDEzIDAgLjE4OC0uMDE2LjM3NS0uMDIzLjU2M2wtMi4yNy0yLjI3YTEgMSAwIDEgMC0xLjQxNCAxLjQxNGw0IDRjLjE5NS4xOTUuNDUuMjkzLjcwNy4yOTNhLjk5My45OTMgMCAwIDAgLjcwNy0uMjkzbDQtNGExIDEgMCAxIDAtMS40MTQtMS40MTRsLTIuMzIgMi4zMTZjLjAxMS0uMjAzLjAyNy0uNDA2LjAyNy0uNjA5IDAtOC4yNy02LjczLTE1LTE1LTE1ek0xOCAyOWExIDEgMCAwIDAtLjcwNy4yOTNsLTQgNGExIDEgMCAxIDAgMS40MTQgMS40MTRsMi4zMTMtMi4zMTZjLS4wMDguMjAzLS4wMi40MDYtLjAyLjYwOSAwIDguMjcgNi43MyAxNSAxNSAxNSA1LjM2NyAwIDEwLjM2LTIuODk4IDEzLjAyNy03LjU2M2EuOTk5Ljk5OSAwIDEgMC0xLjczNC0uOTkyQTEzLjA0MiAxMy4wNDIgMCAwIDEgMzIgNDZjLTcuMTY4IDAtMTMtNS44MzItMTMtMTMgMC0uMTg4LjAxMi0uMzc5LjAyLS41NjZsMi4yNzMgMi4yNzNjLjE5NS4xOTUuNDUuMjkzLjcwNy4yOTNhMSAxIDAgMCAwIC43MDctMS43MDdsLTQtNEExIDEgMCAwIDAgMTggMjl6bTkgMmMtLjU1NSAwLTEgLjQ0NS0xIDF2MmMwIC41NTUuNDQ1IDEgMSAxIC41NTUgMCAxLS40NDUgMS0xdi0yYzAtLjU1NS0uNDQ1LTEtMS0xem01IDBjLS41NTUgMC0xIC40NDUtMSAxdjJjMCAuNTU1LjQ0NSAxIDEgMSAuNTU1IDAgMS0uNDQ1IDEtMXYtMmMwLS41NTUtLjQ0NS0xLTEtMXptNSAwYy0uNTU1IDAtMSAuNDQ1LTEgMXYyYzAgLjU1NS40NDUgMSAxIDEgLjU1NSAwIDEtLjQ0NSAxLTF2LTJjMC0uNTU1LS40NDUtMS0xLTF6Ii8+PC9zdmc+Cg==";
/**
 * @hidden
 */

var toggleTorchImage = // tslint:disable-next-line:max-line-length
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik0zMC45MzggMWMtLjQ0Ni4wMi0xIC4yMy0xLjMxMy42NTZhMS4zMDIgMS4zMDIgMCAwIDAtLjA2My4wOTRsLTYuNzggMTIuMDYzLS4wNjMuMDkzYy0uNTU1Ljc4NS0uNzI3IDEuNzMtLjU5NCAyLjY1NmwtMjAuNSAyMi41NjMtLjAzMS4wMzFjLTEuMDcgMS4yMTktLjY2NCAzLjAxMi40NjggNC4xNTdoLjAzMmw0LjU5NCA0LjU5M2MuNTcuNTcgMS4yNjUuOTUgMiAxLjA2My43MzQuMTEzIDEuNTQ2LS4wNTUgMi4xNTYtLjU5NGguMDMxbDIyLjU2My0yMC41Yy45My4xMjkgMS44Ny0uMDQzIDIuNjU2LS41OTQuMDItLjAxNS4wNDMtLjAxNS4wNjItLjAzMWwuMDYzLS4wMzEgMTIuMDMxLTYuNzgyYy4wMzEtLjAxOS4wNjMtLjAzOS4wOTQtLjA2Mi40MjItLjMxMy42MzYtLjg2Ny42NTYtMS4zMTMuMDItLjQ0NS0uMDk4LS44NC0uMjUtMS4yNS0uMzA1LS44Mi0uODI4LTEuNjktMS41MzEtMi42ODctMS40MDctMS45OTItMy41MTYtNC4zOS01Ljc1LTYuNjI1LTIuMjM1LTIuMjM0LTQuNjAyLTQuMzEzLTYuNTk0LTUuNzE5LS45OTYtLjcwMy0xLjg2Ny0xLjIyNi0yLjY4OC0xLjUzMS0uNDEtLjE1Mi0uODA0LS4yNy0xLjI1LS4yNXptLjIxOCAyLjAzMWMuMDc4LjAxMi4xNTMuMDI0LjM0NC4wOTQuNTIuMTkxIDEuMy42MzMgMi4yMTkgMS4yODEgMS44MzYgMS4yOTcgNC4xNjggMy4zNTYgNi4zNDMgNS41MzIgMi4xNzYgMi4xNzUgNC4yMzUgNC40NzYgNS41MzIgNi4zMTIuNjQ4LjkxOCAxLjA5IDEuNzMgMS4yODEgMi4yNS4wNy4xOTEuMDgyLjI2Ni4wOTQuMzQ0TDM1LjEyNSAyNS41M2EuOTQ5Ljk0OSAwIDAgMC0uMTI1LjA5NGMtLjMxNi4yNDItLjg2LjMyOC0xLjQzOC4yMTlhMS4wNTYgMS4wNTYgMCAwIDAtLjE4Ny0uMDYzIDMuMTEzIDMuMTEzIDAgMCAxLTEuNDM4LS44MTJsLTYuOTA2LTYuOTA3Yy0uOTc2LS45ODQtMS4xMjktMi40MzctLjY1Ni0zLjA2MmEuNTMyLjUzMiAwIDAgMCAuMDk0LS4wOTR6bS04LjIxOCAxNS41OTRjLjE5OS4yOTcuNDMuNTg2LjY4Ny44NDRsNi45MDYgNi45MDZjLjI2Mi4yNjIuNTQzLjQ4OC44NDQuNjg4TDkuNTMxIDQ2LjkwNmMtLjA4Ni4wNzgtLjI1NC4xMzctLjUzMS4wOTQtLjI3Ny0uMDQzLS42MjktLjIyMy0uOTA2LS41TDMuNSA0MS45MDZjLS41NTktLjU2Ni0uNTYzLTEuMjYxLS40MDYtMS40Mzd6bS0yLjg3NSA4LjMxM2MtLjc3IDAtMS41NDMuMjkyLTIuMTI1Ljg3NWwtMi4xMjUgMi4xMjVhMy4wMjMgMy4wMjMgMCAwIDAgMCA0LjI1IDMuMDIzIDMuMDIzIDAgMCAwIDQuMjUgMGwyLjEyNS0yLjEyNmEzLjAyMyAzLjAyMyAwIDAgMCAwLTQuMjUgMy4wMDIgMy4wMDIgMCAwIDAtMi4xMjUtLjg3NXptMCAyYy4yNTMgMCAuNTE5LjA4Mi43MTguMjguMzk5LjQuMzk5IDEuMDQgMCAxLjQzOGwtMi4xMjUgMi4xMjVhMS4wMTQgMS4wMTQgMCAwIDEtMS40MzcgMCAxLjAxNCAxLjAxNCAwIDAgMSAwLTEuNDM3Yy40MjItLjQyMiAxLjY5OS0xLjY5NiAyLjEyNS0yLjEyNS4xOTktLjIuNDY1LS4yODIuNzE4LS4yODJ6Ii8+PC9zdmc+Cg==";

// 19.1.2.14 Object.keys(O)

_objectSap("keys", function() {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var keys = _core.Object.keys;

var keys$1 = keys;

var Camera;

(function(Camera) {
  /**
   * Camera type (not guaranteed to be correct, depending on the device).
   */
  var Type;

  (function(Type) {
    /**
     * Front facing camera.
     */
    Type["FRONT"] = "front";
    /**
     * Back facing camera.
     */

    Type["BACK"] = "back";
  })((Type = Camera.Type || (Camera.Type = {})));
})(Camera || (Camera = {}));

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)

_export(_export.S, "Array", { isArray: _isArray });

var isArray = _core.Array.isArray;

var isArray$1 = isArray;

function _arrayWithoutHoles(arr) {
  if (isArray$1(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

var _createProperty = function(object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

_export(
  _export.S +
    _export.F *
      !_iterDetect(function(iter) {
        Array.from(iter);
      }),
  "Array",
  {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = _toObject(arrayLike);
      var C = typeof this == "function" ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = core_getIteratorMethod(O);
      var length, result, step, iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = _toLength(O.length);
        for (result = new C(length); length > index; index++) {
          _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    }
  }
);

var from_1 = _core.Array.from;

var from_1$1 = from_1;

var ITERATOR$4 = _wks("iterator");

var core_isIterable = (_core.isIterable = function(it) {
  var O = Object(it);
  return (
    O[ITERATOR$4] !== undefined ||
    "@@iterator" in O ||
    // eslint-disable-next-line no-prototype-builtins
    _iterators.hasOwnProperty(_classof(O))
  );
});

var isIterable = core_isIterable;

var isIterable$1 = isIterable;

function _iterableToArray(iter) {
  if (isIterable$1(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]")
    return from_1$1(iter);
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

var _stringWs =
  "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
  "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

var space = "[" + _stringWs + "]";
var non = "\u200b\u0085";
var ltrim = RegExp("^" + space + space + "*");
var rtrim = RegExp(space + space + "*$");

var exporter = function(KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = _fails(function() {
    return !!_stringWs[KEY]() || non[KEY]() != non;
  });
  var fn = (exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY]);
  if (ALIAS) exp[ALIAS] = fn;
  _export(_export.P + _export.F * FORCE, "String", exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = (exporter.trim = function(string, TYPE) {
  string = String(_defined(string));
  if (TYPE & 1) string = string.replace(ltrim, "");
  if (TYPE & 2) string = string.replace(rtrim, "");
  return string;
});

var _stringTrim = exporter;

var $parseInt = _global.parseInt;
var $trim = _stringTrim.trim;

var hex = /^[-+]?0[xX]/;

var _parseInt =
  $parseInt(_stringWs + "08") !== 8 || $parseInt(_stringWs + "0x16") !== 22
    ? function parseInt(str, radix) {
        var string = $trim(String(str), 3);
        return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
      }
    : $parseInt;

// 18.2.5 parseInt(string, radix)
_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

var _parseInt$1 = _core.parseInt;

var _parseInt$2 = _parseInt$1;

/**
 * A helper object to interact with cameras.
 */

var CameraAccess;

(function(CameraAccess) {
  /**
   * @hidden
   *
   * Handle localized camera labels. Supported languages:
   * English, German, French, Spanish (spain), Portuguese (brasil), Portuguese (portugal), Italian,
   * Chinese (simplified), Chinese (traditional), Japanese, Russian, Turkish, Dutch, Arabic, Thai, Swedish,
   * Danish, Vietnamese, Norwegian, Polish, Finnish, Indonesian, Hebrew, Greek, Romanian, Hungarian, Czech,
   * Catalan, Slovak, Ukraininan, Croatian, Malay, Hindi.
   */
  var backCameraKeywords = [
    "rear",
    "back",
    "rück",
    "arrière",
    "trasera",
    "trás",
    "traseira",
    "posteriore",
    "后面",
    "後面",
    "背面",
    "后置",
    "後置",
    "背置",
    "задней",
    "الخلفية",
    "후",
    "arka",
    "achterzijde",
    "หลัง",
    "baksidan",
    "bagside",
    "sau",
    "bak",
    "tylny",
    "takakamera",
    "belakang",
    "אחורית",
    "πίσω",
    "spate",
    "hátsó",
    "zadní",
    "darrere",
    "zadná",
    "задня",
    "stražnja",
    "belakang",
    "बैक"
  ];
  /**
   * @hidden
   */

  var cameraObjects = new map$1();
  /**
   * @hidden
   */

  var getCamerasPromise;
  /**
   * @hidden
   *
   * @param label The camera label.
   * @returns Whether the label mentions the camera being a back-facing one.
   */

  function isBackCameraLabel(label) {
    var lowercaseLabel = label.toLowerCase();
    return backCameraKeywords.some(function(keyword) {
      return lowercaseLabel.includes(keyword);
    });
  }
  /**
   * @hidden
   *
   * Adjusts the cameras' type classification based on the given currently active video stream:
   * If the stream comes from an environment-facing camera, the camera is marked to be a back-facing camera
   * and the other cameras to be of other types accordingly (if they are not correctly set already).
   *
   * The method returns the currently active camera if it's actually the main (back or only) camera in use.
   *
   * @param mediaStreamTrack The currently active `MediaStreamTrack`.
   * @param cameras The array of available [[Camera]] objects.
   * @returns Whether the stream was actually from the main camera.
   */

  function adjustCamerasFromMainCameraStream(mediaStreamTrack, cameras) {
    var mediaTrackSettings;

    if (typeof mediaStreamTrack.getSettings === "function") {
      mediaTrackSettings = mediaStreamTrack.getSettings();
    }

    var activeCamera = cameras.find(function(camera) {
      return (
        (mediaTrackSettings != null && camera.deviceId === mediaTrackSettings.deviceId) ||
        camera.label === mediaStreamTrack.label
      );
    });

    if (activeCamera !== undefined) {
      var activeCameraIsBackFacing =
        (mediaTrackSettings != null && mediaTrackSettings.facingMode === "environment") ||
        isBackCameraLabel(mediaStreamTrack.label);
      var activeCameraIsMainBackCamera = activeCameraIsBackFacing; // TODO: also correct camera types when active camera is not back-facing

      if (activeCameraIsBackFacing && cameras.length > 1) {
        // Correct camera types if needed
        cameras.forEach(function(camera) {
          if (camera.deviceId === activeCamera.deviceId) {
            // tslint:disable-next-line:no-any
            camera.cameraType = Camera.Type.BACK;
          } else if (!isBackCameraLabel(camera.label)) {
            // tslint:disable-next-line:no-any
            camera.cameraType = Camera.Type.FRONT;
          }
        });
        var mainBackCamera = cameras
          .filter(function(camera) {
            return camera.cameraType === Camera.Type.BACK;
          })
          .sort(function(camera1, camera2) {
            return camera1.label.localeCompare(camera2.label);
          })[0];
        activeCameraIsMainBackCamera = activeCamera.deviceId === mainBackCamera.deviceId;
      }

      if (cameras.length === 1 || activeCameraIsMainBackCamera) {
        return activeCamera;
      }
    }

    return undefined;
  }

  CameraAccess.adjustCamerasFromMainCameraStream = adjustCamerasFromMainCameraStream;
  /**
   * @hidden
   *
   * @param devices The list of available devices.
   * @returns The extracted list of camera objects initialized from the given devices.
   */

  function extractCamerasFromDevices(devices) {
    var cameras = devices
      .filter(function(device) {
        return device.kind === "videoinput";
      })
      .map(function(videoDevice) {
        if (cameraObjects.has(videoDevice.deviceId)) {
          return cameraObjects.get(videoDevice.deviceId);
        }

        var label = videoDevice.label != null ? videoDevice.label : "";
        var camera = {
          deviceId: videoDevice.deviceId,
          label: label,
          cameraType: isBackCameraLabel(label) ? Camera.Type.BACK : Camera.Type.FRONT
        };

        if (label !== "") {
          cameraObjects.set(videoDevice.deviceId, camera);
        }

        return camera;
      });

    if (
      cameras.length > 1 &&
      !cameras.some(function(camera) {
        return camera.cameraType === Camera.Type.BACK;
      })
    ) {
      // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
      // Otherwise pick the last camera
      var backCameraIndex = cameras.length - 1;
      var cameraResolutions = cameras.map(function(camera) {
        var match = camera.label.match(/\b([0-9]+)MP?\b/i);

        if (match != null) {
          return _parseInt$2(match[1], 10);
        }

        return NaN;
      });

      if (
        !cameraResolutions.some(function(cameraResolution) {
          return isNaN(cameraResolution);
        })
      ) {
        backCameraIndex = cameraResolutions.lastIndexOf(Math.max.apply(Math, toConsumableArray(cameraResolutions)));
      } // tslint:disable-next-line:no-any

      cameras[backCameraIndex].cameraType = Camera.Type.BACK;
    }

    return cameras;
  }
  /**
   * Get a list of cameras (if any) available on the device, a camera access permission is requested to the user
   * the first time this method is called if needed.
   *
   * Depending on device features and user permissions for camera access, any of the following errors
   * could be the rejected result of the returned promise:
   * - `UnsupportedBrowserError`
   * - `PermissionDeniedError`
   * - `NotAllowedError`
   * - `NotFoundError`
   * - `AbortError`
   * - `NotReadableError`
   * - `InternalError`
   *
   * @returns A promise resolving to the array of available [[Camera]] objects (could be empty).
   */

  function getCameras() {
    if (getCamerasPromise != null) {
      return getCamerasPromise;
    }

    var browserCompatibility = BrowserHelper.checkBrowserCompatibility();

    if (!browserCompatibility.fullSupport) {
      return promise$1.reject(new UnsupportedBrowserError(browserCompatibility));
    }

    var accessPermissionPromise = new promise$1(function(resolve, reject) {
      return enumerateDevices()
        .then(function(devices) {
          if (
            devices
              .filter(function(device) {
                return device.kind === "videoinput";
              })
              .every(function(device) {
                return device.label === "";
              })
          ) {
            resolve(
              navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
              })
            );
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
    getCamerasPromise = new promise$1(function _callee(resolve, reject) {
      var stream, _console, devices, cameras;

      return regenerator.async(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return regenerator.awrap(accessPermissionPromise);

              case 3:
                stream = _context.sent;
                _context.next = 6;
                return regenerator.awrap(enumerateDevices());

              case 6:
                devices = _context.sent;
                cameras = extractCamerasFromDevices(devices);

                (_console = console).debug.apply(_console, ["Camera list: "].concat(toConsumableArray(cameras)));

                return _context.abrupt("return", resolve(cameras));

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);

                // istanbul ignore if
                if (_context.t0.name === "SourceUnavailableError") {
                  _context.t0.name = "NotReadableError";
                }

                return _context.abrupt("return", reject(_context.t0));

              case 16:
                _context.prev = 16;

                // istanbul ignore else
                if (stream != null) {
                  stream.getVideoTracks().forEach(function(track) {
                    track.stop();
                  });
                }

                getCamerasPromise = undefined;
                return _context.finish(16);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        },
        null,
        null,
        [[0, 12, 16, 20]]
      );
    });
    return getCamerasPromise;
  }

  CameraAccess.getCameras = getCameras;
  /**
   * @hidden
   *
   * Call `navigator.mediaDevices.getUserMedia` asynchronously in a `setTimeout` call.
   *
   * @param getUserMediaParams The parameters for the `navigator.mediaDevices.getUserMedia` call.
   * @returns A promise resolving when the camera is accessed.
   */

  function getUserMediaDelayed(getUserMediaParams) {
    console.debug("Camera access:", getUserMediaParams.video);
    return new promise$1(function(resolve, reject) {
      window.setTimeout(function() {
        navigator.mediaDevices
          .getUserMedia(getUserMediaParams)
          .then(resolve)
          .catch(reject);
      }, 0);
    });
  }
  /**
   * @hidden
   *
   * Get the *getUserMedia* *video* parameters to be used given a resolution fallback level and the browser used.
   *
   * @param resolutionFallbackLevel The number representing the wanted resolution, from 0 to 6,
   * resulting in higher to lower video resolutions.
   * @param isSafariBrowser Whether the browser is *Safari*.
   * @returns The resulting *getUserMedia* *video* parameters.
   */

  function getUserMediaVideoParams(resolutionFallbackLevel, isSafariBrowser) {
    switch (resolutionFallbackLevel) {
      case 0:
        if (isSafariBrowser) {
          return {
            width: {
              min: 1400,
              ideal: 1920,
              max: 1920
            },
            height: {
              min: 900,
              ideal: 1080,
              max: 1440
            }
          };
        } else {
          return {
            width: {
              min: 1400,
              ideal: 1920,
              max: 1920
            },
            height: {
              min: 900,
              ideal: 1440,
              max: 1440
            }
          };
        }

      case 1:
        if (isSafariBrowser) {
          return {
            width: {
              min: 1200,
              ideal: 1600,
              max: 1920
            },
            height: {
              min: 900,
              ideal: 1080,
              max: 1200
            }
          };
        } else {
          return {
            width: {
              min: 1200,
              ideal: 1920,
              max: 1920
            },
            height: {
              min: 900,
              ideal: 1200,
              max: 1200
            }
          };
        }

      case 2:
        if (isSafariBrowser) {
          return {
            width: {
              min: 1080,
              ideal: 1600,
              max: 1920
            },
            height: {
              min: 900,
              ideal: 900,
              max: 1080
            }
          };
        } else {
          return {
            width: {
              min: 1080,
              ideal: 1920,
              max: 1920
            },
            height: {
              min: 900,
              ideal: 1080,
              max: 1080
            }
          };
        }

      case 3:
        if (isSafariBrowser) {
          return {
            width: {
              min: 960,
              ideal: 1280,
              max: 1440
            },
            height: {
              min: 480,
              ideal: 720,
              max: 960
            }
          };
        } else {
          return {
            width: {
              min: 960,
              ideal: 1280,
              max: 1440
            },
            height: {
              min: 480,
              ideal: 960,
              max: 960
            }
          };
        }

      case 4:
        if (isSafariBrowser) {
          return {
            width: {
              min: 720,
              ideal: 1024,
              max: 1440
            },
            height: {
              min: 480,
              ideal: 768,
              max: 768
            }
          };
        } else {
          return {
            width: {
              min: 720,
              ideal: 1280,
              max: 1440
            },
            height: {
              min: 480,
              ideal: 720,
              max: 768
            }
          };
        }

      case 5:
        if (isSafariBrowser) {
          return {
            width: {
              min: 640,
              ideal: 800,
              max: 1440
            },
            height: {
              min: 480,
              ideal: 600,
              max: 720
            }
          };
        } else {
          return {
            width: {
              min: 640,
              ideal: 960,
              max: 1440
            },
            height: {
              min: 480,
              ideal: 720,
              max: 720
            }
          };
        }

      default:
        return {};
    }
  }
  /**
   * @hidden
   *
   * Try to access a given camera for video input at the given resolution level.
   *
   * @param resolutionFallbackLevel The number representing the wanted resolution, from 0 to 6,
   * resulting in higher to lower video resolutions.
   * @param camera The camera to try to access for video input.
   * @returns A promise resolving to the `MediaStream` object coming from the accessed camera.
   */

  function accessCameraStream(resolutionFallbackLevel, camera) {
    var browserName = BrowserHelper.userAgentInfo.getBrowser().name;
    var getUserMediaParams = {
      audio: false,
      video: getUserMediaVideoParams(resolutionFallbackLevel, browserName != null && browserName.includes("Safari"))
    };

    if (camera.deviceId === "") {
      getUserMediaParams.video.facingMode = {
        ideal: camera.cameraType === Camera.Type.BACK ? "environment" : "user"
      };
    } else {
      getUserMediaParams.video.deviceId = {
        exact: camera.deviceId
      };
    }

    return getUserMediaDelayed(getUserMediaParams);
  }

  CameraAccess.accessCameraStream = accessCameraStream;
  /**
   * @hidden
   *
   * Get a list of available devices in a cross-browser compatible way.
   *
   * @returns A promise resolving to the `MediaDeviceInfo` array of all available devices.
   */

  function enumerateDevices() {
    if (typeof navigator.enumerateDevices === "function") {
      return navigator.enumerateDevices();
    } else if (
      _typeof_1(navigator.mediaDevices) === "object" &&
      typeof navigator.mediaDevices.enumerateDevices === "function"
    ) {
      return navigator.mediaDevices.enumerateDevices();
    } else {
      return new promise$1(function(resolve, reject) {
        try {
          if (window.MediaStreamTrack == null || window.MediaStreamTrack.getSources == null) {
            throw new Error();
          }

          window.MediaStreamTrack.getSources(function(devices) {
            resolve(
              devices
                .filter(function(device) {
                  return device.kind.toLowerCase() === "video" || device.kind.toLowerCase() === "videoinput";
                })
                .map(function(device) {
                  return {
                    deviceId: device.deviceId != null ? device.deviceId : "",
                    groupId: device.groupId,
                    kind: "videoinput",
                    label: device.label,
                    toJSON:
                      /* istanbul ignore next */
                      function toJSON() {
                        return this;
                      }
                  };
                })
            );
          });
        } catch (_unused) {
          var browserCompatibility = {
            fullSupport: false,
            scannerSupport: true,
            missingFeatures: [BrowserCompatibility.Feature.MEDIA_DEVICES]
          };
          return reject(new UnsupportedBrowserError(browserCompatibility));
        }
      });
    }
  }
})(CameraAccess || (CameraAccess = {}));

/**
 * @hidden
 */
var CameraManager = function CameraManager() {
  classCallCheck(this, CameraManager);
};

var CameraSettings;

(function(CameraSettings) {
  /**
   * Video frame resolution request (not guaranteed to be precise depending on device, could be imprecise/lower).
   */
  var ResolutionPreference;

  (function(ResolutionPreference) {
    /**
     * Resolution of around 1080p (or less).
     */
    ResolutionPreference["FULL_HD"] = "full-hd";
    /**
     * Resolution of around 720p (or less).
     */

    ResolutionPreference["HD"] = "hd";
  })((ResolutionPreference = CameraSettings.ResolutionPreference || (CameraSettings.ResolutionPreference = {})));
})(CameraSettings || (CameraSettings = {}));

/**
 * @hidden
 */

var MeteringMode;

(function(MeteringMode) {
  MeteringMode["CONTINUOUS"] = "continuous";
  MeteringMode["MANUAL"] = "manual";
  MeteringMode["NONE"] = "none";
  MeteringMode["SINGLE_SHOT"] = "single-shot";
})(MeteringMode || (MeteringMode = {}));
/**
 * @hidden
 *
 * A barcode picker utility class used to handle camera interaction.
 */

var BarcodePickerCameraManager =
  /*#__PURE__*/
  (function(_CameraManager) {
    inherits(BarcodePickerCameraManager, _CameraManager);

    function BarcodePickerCameraManager(triggerFatalError, barcodePickerGui) {
      var _this;

      classCallCheck(this, BarcodePickerCameraManager);

      _this = possibleConstructorReturn(this, getPrototypeOf$2(BarcodePickerCameraManager).call(this));
      _this.postStreamInitializationListener = _this.postStreamInitialization.bind(assertThisInitialized(_this));
      _this.videoTrackUnmuteListener = _this.videoTrackUnmuteRecovery.bind(assertThisInitialized(_this));
      _this.triggerManualFocusListener = _this.triggerManualFocus.bind(assertThisInitialized(_this));
      _this.triggerZoomStartListener = _this.triggerZoomStart.bind(assertThisInitialized(_this));
      _this.triggerZoomMoveListener = _this.triggerZoomMove.bind(assertThisInitialized(_this));
      _this.triggerFatalError = triggerFatalError;
      _this.barcodePickerGui = barcodePickerGui;
      return _this;
    }

    createClass(BarcodePickerCameraManager, [
      {
        key: "setInteractionOptions",
        value: function setInteractionOptions(
          cameraSwitcherEnabled,
          torchToggleEnabled,
          tapToFocusEnabled,
          pinchToZoomEnabled
        ) {
          this.cameraSwitcherEnabled = cameraSwitcherEnabled;
          this.torchToggleEnabled = torchToggleEnabled;
          this.tapToFocusEnabled = tapToFocusEnabled;
          this.pinchToZoomEnabled = pinchToZoomEnabled;
        }
      },
      {
        key: "isCameraSwitcherEnabled",
        value: function isCameraSwitcherEnabled() {
          return this.cameraSwitcherEnabled;
        }
      },
      {
        key: "setCameraSwitcherEnabled",
        value: function setCameraSwitcherEnabled(enabled) {
          var cameras;
          return regenerator.async(
            function setCameraSwitcherEnabled$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    this.cameraSwitcherEnabled = enabled;

                    if (!this.cameraSwitcherEnabled) {
                      _context.next = 8;
                      break;
                    }

                    _context.next = 4;
                    return regenerator.awrap(CameraAccess.getCameras());

                  case 4:
                    cameras = _context.sent;

                    if (cameras.length > 1) {
                      this.barcodePickerGui.setCameraSwitcherVisible(true);
                    }

                    _context.next = 9;
                    break;

                  case 8:
                    this.barcodePickerGui.setCameraSwitcherVisible(false);

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "isTorchToggleEnabled",
        value: function isTorchToggleEnabled() {
          return this.torchToggleEnabled;
        }
      },
      {
        key: "setTorchToggleEnabled",
        value: function setTorchToggleEnabled(enabled) {
          this.torchToggleEnabled = enabled;

          if (this.torchToggleEnabled) {
            if (
              this.mediaStream != null &&
              this.mediaTrackCapabilities != null &&
              this.mediaTrackCapabilities.torch != null &&
              this.mediaTrackCapabilities.torch
            ) {
              this.barcodePickerGui.setTorchTogglerVisible(true);
            }
          } else {
            this.barcodePickerGui.setTorchTogglerVisible(false);
          }
        }
      },
      {
        key: "isTapToFocusEnabled",
        value: function isTapToFocusEnabled() {
          return this.tapToFocusEnabled;
        }
      },
      {
        key: "setTapToFocusEnabled",
        value: function setTapToFocusEnabled(enabled) {
          this.tapToFocusEnabled = enabled;

          if (this.mediaStream != null) {
            if (this.tapToFocusEnabled) {
              this.enableTapToFocusListeners();
            } else {
              this.disableTapToFocusListeners();
            }
          }
        }
      },
      {
        key: "isPinchToZoomEnabled",
        value: function isPinchToZoomEnabled() {
          return this.pinchToZoomEnabled;
        }
      },
      {
        key: "setPinchToZoomEnabled",
        value: function setPinchToZoomEnabled(enabled) {
          this.pinchToZoomEnabled = enabled;

          if (this.mediaStream != null) {
            if (this.pinchToZoomEnabled) {
              this.enablePinchToZoomListeners();
            } else {
              this.disablePinchToZoomListeners();
            }
          }
        }
      },
      {
        key: "setSelectedCamera",
        value: function setSelectedCamera(camera) {
          this.selectedCamera = camera;
        }
      },
      {
        key: "setSelectedCameraSettings",
        value: function setSelectedCameraSettings(cameraSettings) {
          this.selectedCameraSettings = cameraSettings;
        }
      },
      {
        key: "setupCameras",
        value: function setupCameras() {
          var mediaStreamTrack, cameras, mainCamera, autoselectedCamera;
          return regenerator.async(
            function setupCameras$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    if (!(this.cameraInitializationPromise != null)) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return", this.cameraInitializationPromise);

                  case 2:
                    _context2.next = 4;
                    return regenerator.awrap(this.accessInitialCamera());

                  case 4:
                    mediaStreamTrack = _context2.sent;
                    _context2.next = 7;
                    return regenerator.awrap(CameraAccess.getCameras());

                  case 7:
                    cameras = _context2.sent;

                    if (this.cameraSwitcherEnabled && cameras.length > 1) {
                      this.barcodePickerGui.setCameraSwitcherVisible(true);
                    }

                    if (!(mediaStreamTrack != null)) {
                      _context2.next = 16;
                      break;
                    }

                    // We successfully accessed a camera, check if it's really the main (back or only) camera
                    mainCamera = CameraAccess.adjustCamerasFromMainCameraStream(mediaStreamTrack, cameras);

                    if (!(mainCamera != null)) {
                      _context2.next = 15;
                      break;
                    }

                    this.selectedCamera = mainCamera;
                    this.updateActiveCameraCurrentResolution(mainCamera);
                    return _context2.abrupt("return", promise$1.resolve());

                  case 15:
                    this.setSelectedCamera();

                  case 16:
                    if (!(this.selectedCamera == null)) {
                      _context2.next = 25;
                      break;
                    }

                    autoselectedCamera = cameras
                      .filter(function(camera) {
                        return camera.cameraType === Camera.Type.BACK;
                      })
                      .sort(function(camera1, camera2) {
                        return camera1.label.localeCompare(camera2.label);
                      })[0];

                    if (!(autoselectedCamera == null)) {
                      _context2.next = 22;
                      break;
                    }

                    autoselectedCamera = cameras[0];

                    if (!(autoselectedCamera == null)) {
                      _context2.next = 22;
                      break;
                    }

                    throw new CustomError(BarcodePickerCameraManager.noCameraErrorParameters);

                  case 22:
                    return _context2.abrupt(
                      "return",
                      this.initializeCameraWithSettings(autoselectedCamera, this.selectedCameraSettings)
                    );

                  case 25:
                    return _context2.abrupt(
                      "return",
                      this.initializeCameraWithSettings(this.selectedCamera, this.selectedCameraSettings)
                    );

                  case 26:
                  case "end":
                    return _context2.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "stopStream",
        value: function stopStream() {
          if (this.activeCamera != null) {
            this.activeCamera.currentResolution = undefined;
          }

          this.activeCamera = undefined;

          if (this.mediaStream != null) {
            window.clearTimeout(this.cameraAccessTimeout);
            window.clearInterval(this.cameraMetadataCheckInterval);
            window.clearTimeout(this.getCapabilitiesTimeout);
            window.clearTimeout(this.manualFocusWaitTimeout);
            window.clearTimeout(this.manualToAutofocusResumeTimeout);
            window.clearInterval(this.autofocusInterval);
            this.mediaStream.getVideoTracks().forEach(function(track) {
              track.stop();
            });
            this.mediaStream = undefined;
            this.mediaTrackCapabilities = undefined;
          }
        }
      },
      {
        key: "applyCameraSettings",
        value: function applyCameraSettings(cameraSettings) {
          this.selectedCameraSettings = cameraSettings;

          if (this.activeCamera == null) {
            return promise$1.reject(new CustomError(BarcodePickerCameraManager.noCameraErrorParameters));
          }

          return this.initializeCameraWithSettings(this.activeCamera, cameraSettings);
        }
      },
      {
        key: "reinitializeCamera",
        value: function reinitializeCamera() {
          if (this.activeCamera != null) {
            this.initializeCameraWithSettings(this.activeCamera, this.activeCameraSettings).catch(
              this.triggerFatalError
            );
          }
        }
      },
      {
        key: "initializeCameraWithSettings",
        value: function initializeCameraWithSettings(camera, cameraSettings) {
          var existingCameraInitializationPromise;
          return regenerator.async(
            function initializeCameraWithSettings$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    existingCameraInitializationPromise = promise$1.resolve();

                    if (this.cameraInitializationPromise != null) {
                      existingCameraInitializationPromise = this.cameraInitializationPromise;
                    }

                    _context3.next = 4;
                    return regenerator.awrap(existingCameraInitializationPromise);

                  case 4:
                    this.setSelectedCamera(camera);
                    this.selectedCameraSettings = this.activeCameraSettings = cameraSettings;

                    if (
                      cameraSettings != null &&
                      cameraSettings.resolutionPreference === CameraSettings.ResolutionPreference.FULL_HD
                    ) {
                      this.cameraInitializationPromise = this.initializeCameraAndCheckUpdatedSettings(camera);
                    } else {
                      this.cameraInitializationPromise = this.initializeCameraAndCheckUpdatedSettings(camera, 3);
                    }

                    return _context3.abrupt("return", this.cameraInitializationPromise);

                  case 8:
                  case "end":
                    return _context3.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "setTorchEnabled",
        value: function setTorchEnabled(enabled) {
          var videoTracks;
          return regenerator.async(
            function setTorchEnabled$(_context4) {
              while (1) {
                switch ((_context4.prev = _context4.next)) {
                  case 0:
                    if (
                      !(
                        this.mediaStream != null &&
                        this.mediaTrackCapabilities != null &&
                        this.mediaTrackCapabilities.torch != null &&
                        this.mediaTrackCapabilities.torch
                      )
                    ) {
                      _context4.next = 6;
                      break;
                    }

                    this.torchEnabled = enabled;
                    videoTracks = this.mediaStream.getVideoTracks(); // istanbul ignore else

                    if (!(videoTracks.length !== 0 && typeof videoTracks[0].applyConstraints === "function")) {
                      _context4.next = 6;
                      break;
                    }

                    _context4.next = 6;
                    return regenerator.awrap(
                      videoTracks[0].applyConstraints({
                        advanced: [
                          {
                            torch: enabled
                          }
                        ]
                      })
                    );

                  case 6:
                  case "end":
                    return _context4.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "toggleTorch",
        value: function toggleTorch() {
          return regenerator.async(
            function toggleTorch$(_context5) {
              while (1) {
                switch ((_context5.prev = _context5.next)) {
                  case 0:
                    this.torchEnabled = !this.torchEnabled;
                    _context5.next = 3;
                    return regenerator.awrap(this.setTorchEnabled(this.torchEnabled));

                  case 3:
                  case "end":
                    return _context5.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "setZoom",
        value: function setZoom(zoomPercentage, currentZoom) {
          var videoTracks, zoomRange, targetZoom;
          return regenerator.async(
            function setZoom$(_context6) {
              while (1) {
                switch ((_context6.prev = _context6.next)) {
                  case 0:
                    if (
                      !(
                        this.mediaStream != null &&
                        this.mediaTrackCapabilities != null &&
                        this.mediaTrackCapabilities.zoom != null
                      )
                    ) {
                      _context6.next = 8;
                      break;
                    }

                    videoTracks = this.mediaStream.getVideoTracks(); // istanbul ignore else

                    if (!(videoTracks.length !== 0 && typeof videoTracks[0].applyConstraints === "function")) {
                      _context6.next = 8;
                      break;
                    }

                    zoomRange = this.mediaTrackCapabilities.zoom.max - this.mediaTrackCapabilities.zoom.min;

                    if (currentZoom == null) {
                      currentZoom = this.mediaTrackCapabilities.zoom.min;
                    }

                    targetZoom = Math.max(
                      this.mediaTrackCapabilities.zoom.min,
                      Math.min(currentZoom + zoomRange * zoomPercentage, this.mediaTrackCapabilities.zoom.max)
                    );
                    _context6.next = 8;
                    return regenerator.awrap(
                      videoTracks[0].applyConstraints({
                        advanced: [
                          {
                            zoom: targetZoom
                          }
                        ]
                      })
                    );

                  case 8:
                  case "end":
                    return _context6.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "accessInitialCamera",
        value: function accessInitialCamera() {
          var _this2 = this;

          var initialCameraAccessPromise = promise$1.resolve();

          if (this.selectedCamera == null) {
            // Try to directly access primary (back or only) camera
            var primaryCamera = {
              deviceId: "",
              label: "",
              cameraType: Camera.Type.BACK
            };
            initialCameraAccessPromise = new promise$1(function _callee(resolve) {
              var videoTracks;
              return regenerator.async(
                function _callee$(_context7) {
                  while (1) {
                    switch ((_context7.prev = _context7.next)) {
                      case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return regenerator.awrap(
                          _this2.initializeCameraWithSettings(primaryCamera, _this2.selectedCameraSettings)
                        );

                      case 3:
                        if (!(_this2.mediaStream != null)) {
                          _context7.next = 7;
                          break;
                        }

                        videoTracks = _this2.mediaStream.getVideoTracks();

                        if (!(videoTracks.length !== 0)) {
                          _context7.next = 7;
                          break;
                        }

                        return _context7.abrupt("return", resolve(videoTracks[0]));

                      case 7:
                        _context7.next = 11;
                        break;

                      case 9:
                        _context7.prev = 9;
                        _context7.t0 = _context7["catch"](0);

                      case 11:
                        _context7.prev = 11;
                        resolve();
                        return _context7.finish(11);

                      case 14:
                      case "end":
                        return _context7.stop();
                    }
                  }
                },
                null,
                null,
                [[0, 9, 11, 14]]
              );
            });
          }

          return initialCameraAccessPromise;
        }
      },
      {
        key: "updateActiveCameraCurrentResolution",
        value: function updateActiveCameraCurrentResolution(camera) {
          this.activeCamera = camera;
          this.activeCamera.currentResolution = {
            width: this.barcodePickerGui.videoElement.videoWidth,
            height: this.barcodePickerGui.videoElement.videoHeight
          };
          this.barcodePickerGui.setMirrorImageEnabled(this.barcodePickerGui.isMirrorImageEnabled(), false);
        }
      },
      {
        key: "postStreamInitialization",
        value: function postStreamInitialization() {
          var _this3 = this;

          window.clearTimeout(this.getCapabilitiesTimeout);
          this.getCapabilitiesTimeout = window.setTimeout(function() {
            _this3.storeStreamCapabilities();

            _this3.setupAutofocus();

            if (
              _this3.torchToggleEnabled &&
              _this3.mediaStream != null &&
              _this3.mediaTrackCapabilities != null &&
              _this3.mediaTrackCapabilities.torch != null &&
              _this3.mediaTrackCapabilities.torch
            ) {
              _this3.barcodePickerGui.setTorchTogglerVisible(true);
            }
          }, BarcodePickerCameraManager.getCapabilitiesTimeoutMs);
        }
      },
      {
        key: "videoTrackUnmuteRecovery",
        value: function videoTrackUnmuteRecovery() {
          this.reinitializeCamera();
        }
      },
      {
        key: "triggerManualFocusForContinuous",
        value: function triggerManualFocusForContinuous() {
          var _this4 = this;

          return regenerator.async(
            function triggerManualFocusForContinuous$(_context10) {
              while (1) {
                switch ((_context10.prev = _context10.next)) {
                  case 0:
                    this.manualToAutofocusResumeTimeout = window.setTimeout(function _callee2() {
                      return regenerator.async(function _callee2$(_context8) {
                        while (1) {
                          switch ((_context8.prev = _context8.next)) {
                            case 0:
                              _context8.next = 2;
                              return regenerator.awrap(_this4.triggerFocusMode(MeteringMode.CONTINUOUS));

                            case 2:
                            case "end":
                              return _context8.stop();
                          }
                        }
                      });
                    }, BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs);
                    _context10.prev = 1;
                    _context10.next = 4;
                    return regenerator.awrap(this.triggerFocusMode(MeteringMode.CONTINUOUS));

                  case 4:
                    this.manualFocusWaitTimeout = window.setTimeout(function _callee3() {
                      return regenerator.async(function _callee3$(_context9) {
                        while (1) {
                          switch ((_context9.prev = _context9.next)) {
                            case 0:
                              _context9.next = 2;
                              return regenerator.awrap(_this4.triggerFocusMode(MeteringMode.MANUAL));

                            case 2:
                            case "end":
                              return _context9.stop();
                          }
                        }
                      });
                    }, BarcodePickerCameraManager.manualFocusWaitTimeoutMs);
                    _context10.next = 9;
                    break;

                  case 7:
                    _context10.prev = 7;
                    _context10.t0 = _context10["catch"](1);

                  case 9:
                  case "end":
                    return _context10.stop();
                }
              }
            },
            null,
            this,
            [[1, 7]]
          );
        }
      },
      {
        key: "triggerManualFocusForSingleShot",
        value: function triggerManualFocusForSingleShot() {
          var _this5 = this;

          return regenerator.async(
            function triggerManualFocusForSingleShot$(_context11) {
              while (1) {
                switch ((_context11.prev = _context11.next)) {
                  case 0:
                    window.clearInterval(this.autofocusInterval);
                    this.manualToAutofocusResumeTimeout = window.setTimeout(function() {
                      _this5.autofocusInterval = window.setInterval(
                        _this5.triggerAutoFocus.bind(_this5),
                        BarcodePickerCameraManager.autofocusIntervalMs
                      );
                    }, BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs);
                    _context11.prev = 2;
                    _context11.next = 5;
                    return regenerator.awrap(this.triggerFocusMode(MeteringMode.SINGLE_SHOT));

                  case 5:
                    _context11.next = 9;
                    break;

                  case 7:
                    _context11.prev = 7;
                    _context11.t0 = _context11["catch"](2);

                  case 9:
                  case "end":
                    return _context11.stop();
                }
              }
            },
            null,
            this,
            [[2, 7]]
          );
        }
      },
      {
        key: "triggerManualFocus",
        value: function triggerManualFocus(event) {
          var focusModeCapability;
          return regenerator.async(
            function triggerManualFocus$(_context12) {
              while (1) {
                switch ((_context12.prev = _context12.next)) {
                  case 0:
                    if (!(event != null)) {
                      _context12.next = 7;
                      break;
                    }

                    event.preventDefault();

                    if (!(event.type === "touchend" && event.touches.length !== 0)) {
                      _context12.next = 4;
                      break;
                    }

                    return _context12.abrupt("return");

                  case 4:
                    if (!(this.pinchToZoomDistance != null)) {
                      _context12.next = 7;
                      break;
                    }

                    this.pinchToZoomDistance = undefined;
                    return _context12.abrupt("return");

                  case 7:
                    window.clearTimeout(this.manualFocusWaitTimeout);
                    window.clearTimeout(this.manualToAutofocusResumeTimeout);

                    if (!(this.mediaStream != null && this.mediaTrackCapabilities != null)) {
                      _context12.next = 20;
                      break;
                    }

                    focusModeCapability = this.mediaTrackCapabilities.focusMode;

                    if (
                      !(focusModeCapability instanceof Array && focusModeCapability.includes(MeteringMode.SINGLE_SHOT))
                    ) {
                      _context12.next = 20;
                      break;
                    }

                    if (
                      !(
                        focusModeCapability.includes(MeteringMode.CONTINUOUS) &&
                        focusModeCapability.includes(MeteringMode.MANUAL)
                      )
                    ) {
                      _context12.next = 17;
                      break;
                    }

                    _context12.next = 15;
                    return regenerator.awrap(this.triggerManualFocusForContinuous());

                  case 15:
                    _context12.next = 20;
                    break;

                  case 17:
                    if (focusModeCapability.includes(MeteringMode.CONTINUOUS)) {
                      _context12.next = 20;
                      break;
                    }

                    _context12.next = 20;
                    return regenerator.awrap(this.triggerManualFocusForSingleShot());

                  case 20:
                  case "end":
                    return _context12.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "triggerZoomStart",
        value: function triggerZoomStart(event) {
          if (event == null || event.touches.length !== 2) {
            return;
          }

          event.preventDefault();
          this.pinchToZoomDistance = Math.hypot(
            (event.touches[1].screenX - event.touches[0].screenX) / screen.width,
            (event.touches[1].screenY - event.touches[0].screenY) / screen.height
          );

          if (
            this.mediaStream != null &&
            this.mediaTrackCapabilities != null &&
            this.mediaTrackCapabilities.zoom != null
          ) {
            var videoTracks = this.mediaStream.getVideoTracks(); // istanbul ignore else

            if (videoTracks.length !== 0 && typeof videoTracks[0].getConstraints === "function") {
              this.pinchToZoomInitialZoom = this.mediaTrackCapabilities.zoom.min;
              var currentConstraints = videoTracks[0].getConstraints();

              if (currentConstraints.advanced != null) {
                var currentZoomConstraint = currentConstraints.advanced.find(function(constraint) {
                  return "zoom" in constraint;
                });

                if (currentZoomConstraint != null && currentZoomConstraint.zoom != null) {
                  this.pinchToZoomInitialZoom = currentZoomConstraint.zoom;
                }
              }
            }
          }
        }
      },
      {
        key: "triggerZoomMove",
        value: function triggerZoomMove(event) {
          return regenerator.async(
            function triggerZoomMove$(_context13) {
              while (1) {
                switch ((_context13.prev = _context13.next)) {
                  case 0:
                    if (!(this.pinchToZoomDistance == null || event == null || event.touches.length !== 2)) {
                      _context13.next = 2;
                      break;
                    }

                    return _context13.abrupt("return");

                  case 2:
                    event.preventDefault();
                    _context13.next = 5;
                    return regenerator.awrap(
                      this.setZoom(
                        (Math.hypot(
                          (event.touches[1].screenX - event.touches[0].screenX) / screen.width,
                          (event.touches[1].screenY - event.touches[0].screenY) / screen.height
                        ) -
                          this.pinchToZoomDistance) *
                          2,
                        this.pinchToZoomInitialZoom
                      )
                    );

                  case 5:
                  case "end":
                    return _context13.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "storeStreamCapabilities",
        value: function storeStreamCapabilities() {
          // istanbul ignore else
          if (this.mediaStream != null) {
            var videoTracks = this.mediaStream.getVideoTracks(); // istanbul ignore else

            if (videoTracks.length !== 0 && typeof videoTracks[0].getCapabilities === "function") {
              this.mediaTrackCapabilities = videoTracks[0].getCapabilities();
            }
          }
        }
      },
      {
        key: "setupAutofocus",
        value: function setupAutofocus() {
          window.clearTimeout(this.manualFocusWaitTimeout);
          window.clearTimeout(this.manualToAutofocusResumeTimeout); // istanbul ignore else

          if (this.mediaStream != null && this.mediaTrackCapabilities != null) {
            var focusModeCapability = this.mediaTrackCapabilities.focusMode;

            if (
              focusModeCapability instanceof Array &&
              !focusModeCapability.includes(MeteringMode.CONTINUOUS) &&
              focusModeCapability.includes(MeteringMode.SINGLE_SHOT)
            ) {
              window.clearInterval(this.autofocusInterval);
              this.autofocusInterval = window.setInterval(
                this.triggerAutoFocus.bind(this),
                BarcodePickerCameraManager.autofocusIntervalMs
              );
            }
          }
        }
      },
      {
        key: "triggerAutoFocus",
        value: function triggerAutoFocus() {
          this.triggerFocusMode(MeteringMode.SINGLE_SHOT).catch(
            /* istanbul ignore next */
            function() {
              // Ignored
            }
          );
        }
      },
      {
        key: "triggerFocusMode",
        value: function triggerFocusMode(focusMode) {
          // istanbul ignore else
          if (this.mediaStream != null) {
            var videoTracks = this.mediaStream.getVideoTracks();

            if (videoTracks.length !== 0 && typeof videoTracks[0].applyConstraints === "function") {
              return videoTracks[0].applyConstraints({
                advanced: [
                  {
                    focusMode: focusMode
                  }
                ]
              });
            }
          }

          return promise$1.reject(undefined);
        }
      },
      {
        key: "enableTapToFocusListeners",
        value: function enableTapToFocusListeners() {
          var _this6 = this;

          ["touchend", "mousedown"].forEach(function(eventName) {
            _this6.barcodePickerGui.videoElement.addEventListener(eventName, _this6.triggerManualFocusListener);
          });
        }
      },
      {
        key: "enablePinchToZoomListeners",
        value: function enablePinchToZoomListeners() {
          this.barcodePickerGui.videoElement.addEventListener("touchstart", this.triggerZoomStartListener);
          this.barcodePickerGui.videoElement.addEventListener("touchmove", this.triggerZoomMoveListener);
        }
      },
      {
        key: "disableTapToFocusListeners",
        value: function disableTapToFocusListeners() {
          var _this7 = this;

          ["touchend", "mousedown"].forEach(function(eventName) {
            _this7.barcodePickerGui.videoElement.removeEventListener(eventName, _this7.triggerManualFocusListener);
          });
        }
      },
      {
        key: "disablePinchToZoomListeners",
        value: function disablePinchToZoomListeners() {
          this.barcodePickerGui.videoElement.removeEventListener("touchstart", this.triggerZoomStartListener);
          this.barcodePickerGui.videoElement.removeEventListener("touchmove", this.triggerZoomMoveListener);
        }
      },
      {
        key: "initializeCameraAndCheckUpdatedSettings",
        value: function initializeCameraAndCheckUpdatedSettings(camera, resolutionFallbackLevel) {
          var _this8 = this;

          return regenerator.async(
            function initializeCameraAndCheckUpdatedSettings$(_context14) {
              while (1) {
                switch ((_context14.prev = _context14.next)) {
                  case 0:
                    _context14.prev = 0;
                    _context14.next = 3;
                    return regenerator.awrap(this.initializeCamera(camera, resolutionFallbackLevel));

                  case 3:
                    if (
                      !(
                        this.selectedCameraSettings !== this.activeCameraSettings &&
                        (this.selectedCameraSettings == null ||
                          this.activeCameraSettings == null ||
                          keys$1(this.selectedCameraSettings).some(function(cameraSettingsProperty) {
                            return (
                              _this8.selectedCameraSettings[cameraSettingsProperty] !==
                              _this8.activeCameraSettings[cameraSettingsProperty]
                            );
                          }))
                      )
                    ) {
                      _context14.next = 6;
                      break;
                    }

                    this.activeCameraSettings = this.selectedCameraSettings;
                    return _context14.abrupt(
                      "return",
                      this.initializeCameraAndCheckUpdatedSettings(camera, resolutionFallbackLevel)
                    );

                  case 6:
                    _context14.prev = 6;
                    this.cameraInitializationPromise = undefined;
                    return _context14.finish(6);

                  case 9:
                  case "end":
                    return _context14.stop();
                }
              }
            },
            null,
            this,
            [[0, , 6, 9]]
          );
        }
      },
      {
        key: "retryInitializeCameraIfNeeded",
        value: function retryInitializeCameraIfNeeded(camera, resolutionFallbackLevel, resolve, reject, error) {
          if (resolutionFallbackLevel < 6) {
            return this.initializeCamera(camera, resolutionFallbackLevel + 1)
              .then(resolve)
              .catch(reject);
          } else {
            return reject(error);
          }
        }
      },
      {
        key: "handleCameraInitializationError",
        value: function handleCameraInitializationError(error, resolutionFallbackLevel, camera, resolve, reject) {
          var cameras, newCamera;
          return regenerator.async(
            function handleCameraInitializationError$(_context15) {
              while (1) {
                switch ((_context15.prev = _context15.next)) {
                  case 0:
                    // istanbul ignore if
                    if (error.name === "SourceUnavailableError") {
                      error.name = "NotReadableError";
                    }

                    if (
                      !(
                        error.message === "Invalid constraint" || // tslint:disable-next-line:no-any
                        (error.name === "OverconstrainedError" && error.constraint === "deviceId")
                      )
                    ) {
                      _context15.next = 11;
                      break;
                    }

                    _context15.next = 4;
                    return regenerator.awrap(CameraAccess.getCameras());

                  case 4:
                    cameras = _context15.sent;
                    newCamera = cameras.find(function(currentCamera) {
                      return (
                        currentCamera.label === camera.label &&
                        currentCamera.cameraType === camera.cameraType &&
                        currentCamera.deviceId !== camera.deviceId
                      );
                    });

                    if (!(newCamera == null)) {
                      _context15.next = 10;
                      break;
                    }

                    return _context15.abrupt(
                      "return",
                      this.retryInitializeCameraIfNeeded(camera, resolutionFallbackLevel, resolve, reject, error)
                    );

                  case 10:
                    return _context15.abrupt(
                      "return",
                      this.initializeCamera(newCamera, resolutionFallbackLevel)
                        .then(resolve)
                        .catch(reject)
                    );

                  case 11:
                    if (
                      ![
                        "PermissionDeniedError",
                        "PermissionDismissedError",
                        "NotAllowedError",
                        "NotFoundError",
                        "AbortError"
                      ].includes(error.name)
                    ) {
                      _context15.next = 13;
                      break;
                    }

                    return _context15.abrupt("return", reject(error));

                  case 13:
                    return _context15.abrupt(
                      "return",
                      this.retryInitializeCameraIfNeeded(camera, resolutionFallbackLevel, resolve, reject, error)
                    );

                  case 14:
                  case "end":
                    return _context15.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "initializeCamera",
        value: function initializeCamera(camera) {
          var _this9 = this;

          var resolutionFallbackLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

          if (camera == null) {
            return promise$1.reject(new CustomError(BarcodePickerCameraManager.noCameraErrorParameters));
          }

          this.stopStream();
          this.torchEnabled = false;
          this.barcodePickerGui.setTorchTogglerVisible(false);
          return new promise$1(function _callee4(resolve, reject) {
            var stream, mediaTrackSettings;
            return regenerator.async(
              function _callee4$(_context16) {
                while (1) {
                  switch ((_context16.prev = _context16.next)) {
                    case 0:
                      _context16.prev = 0;
                      _context16.next = 3;
                      return regenerator.awrap(CameraAccess.accessCameraStream(resolutionFallbackLevel, camera));

                    case 3:
                      stream = _context16.sent;

                      if (!(typeof stream.getTracks()[0].getSettings === "function")) {
                        _context16.next = 12;
                        break;
                      }

                      mediaTrackSettings = stream.getTracks()[0].getSettings();

                      if (
                        !(
                          mediaTrackSettings.width != null &&
                          mediaTrackSettings.height != null &&
                          (mediaTrackSettings.width === 2 || mediaTrackSettings.height === 2)
                        )
                      ) {
                        _context16.next = 12;
                        break;
                      }

                      if (!(resolutionFallbackLevel === 6)) {
                        _context16.next = 11;
                        break;
                      }

                      return _context16.abrupt(
                        "return",
                        reject(
                          new CustomError({
                            name: "NotReadableError",
                            message: "Could not initialize camera correctly"
                          })
                        )
                      );

                    case 11:
                      return _context16.abrupt(
                        "return",
                        _this9
                          .initializeCamera(camera, resolutionFallbackLevel + 1)
                          .then(resolve)
                          .catch(reject)
                      );

                    case 12:
                      _this9.mediaStream = stream;

                      _this9.mediaStream.getVideoTracks().forEach(function(track) {
                        // Reinitialize camera on weird pause/resumption coming from the OS
                        // This will add the listener only once in the case of multiple calls, identical listeners are ignored
                        track.addEventListener("unmute", _this9.videoTrackUnmuteListener);
                      }); // This will add the listener only once in the case of multiple calls, identical listeners are ignored

                      _this9.barcodePickerGui.videoElement.addEventListener(
                        "loadedmetadata",
                        _this9.postStreamInitializationListener
                      );

                      if (_this9.tapToFocusEnabled) {
                        _this9.enableTapToFocusListeners();
                      }

                      if (_this9.pinchToZoomEnabled) {
                        _this9.enablePinchToZoomListeners();
                      }

                      _this9.resolveInitializeCamera(camera, resolve, reject);

                      _this9.barcodePickerGui.videoElement.srcObject = stream;

                      _this9.barcodePickerGui.videoElement.load();

                      _this9.barcodePickerGui.playVideo();

                      _context16.next = 27;
                      break;

                    case 23:
                      _context16.prev = 23;
                      _context16.t0 = _context16["catch"](0);
                      _context16.next = 27;
                      return regenerator.awrap(
                        _this9.handleCameraInitializationError(
                          _context16.t0,
                          resolutionFallbackLevel,
                          camera,
                          resolve,
                          reject
                        )
                      );

                    case 27:
                    case "end":
                      return _context16.stop();
                  }
                }
              },
              null,
              null,
              [[0, 23]]
            );
          });
        }
      },
      {
        key: "resolveInitializeCamera",
        value: function resolveInitializeCamera(camera, resolve, reject) {
          var _this10 = this;

          var cameraNotReadableError = new CustomError({
            name: "NotReadableError",
            message: "Could not initialize camera correctly"
          });
          window.clearTimeout(this.cameraAccessTimeout);
          this.cameraAccessTimeout = window.setTimeout(function() {
            _this10.stopStream();

            reject(cameraNotReadableError);
          }, BarcodePickerCameraManager.cameraAccessTimeoutMs);

          this.barcodePickerGui.videoElement.onresize = function() {
            _this10.updateActiveCameraCurrentResolution(camera);
          };

          this.barcodePickerGui.videoElement.onloadeddata = function() {
            _this10.barcodePickerGui.videoElement.onloadeddata = null;
            window.clearTimeout(_this10.cameraAccessTimeout); // Detect weird browser behaviour that on unsupported resolution returns a 2x2 video instead
            // Also detect failed camera access with no error but also no video stream provided

            if (
              _this10.barcodePickerGui.videoElement.videoWidth > 2 &&
              _this10.barcodePickerGui.videoElement.videoHeight > 2 &&
              _this10.barcodePickerGui.videoElement.currentTime > 0
            ) {
              if (camera.deviceId !== "") {
                _this10.updateActiveCameraCurrentResolution(camera);
              }

              return resolve();
            }

            var cameraMetadataCheckStartTime = performance.now();
            window.clearInterval(_this10.cameraMetadataCheckInterval);
            _this10.cameraMetadataCheckInterval = window.setInterval(function() {
              // Detect weird browser behaviour that on unsupported resolution returns a 2x2 video instead
              // Also detect failed camera access with no error but also no video stream provided
              if (
                _this10.barcodePickerGui.videoElement.videoWidth === 2 ||
                _this10.barcodePickerGui.videoElement.videoHeight === 2 ||
                _this10.barcodePickerGui.videoElement.currentTime === 0
              ) {
                if (
                  performance.now() - cameraMetadataCheckStartTime >
                  BarcodePickerCameraManager.cameraMetadataCheckTimeoutMs
                ) {
                  window.clearInterval(_this10.cameraMetadataCheckInterval);

                  _this10.stopStream();

                  return reject(cameraNotReadableError);
                }

                return;
              }

              window.clearInterval(_this10.cameraMetadataCheckInterval);

              if (camera.deviceId !== "") {
                _this10.updateActiveCameraCurrentResolution(camera);

                _this10.barcodePickerGui.videoElement.dispatchEvent(new Event("canplay"));
              }

              return resolve();
            }, BarcodePickerCameraManager.cameraMetadataCheckIntervalMs);
          };
        }
      }
    ]);

    return BarcodePickerCameraManager;
  })(CameraManager);
BarcodePickerCameraManager.cameraAccessTimeoutMs = 4000;
BarcodePickerCameraManager.cameraMetadataCheckTimeoutMs = 4000;
BarcodePickerCameraManager.cameraMetadataCheckIntervalMs = 50;
BarcodePickerCameraManager.getCapabilitiesTimeoutMs = 500;
BarcodePickerCameraManager.autofocusIntervalMs = 1500;
BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs = 5000;
BarcodePickerCameraManager.manualFocusWaitTimeoutMs = 400;
BarcodePickerCameraManager.noCameraErrorParameters = {
  name: "NoCameraAvailableError",
  message: "No camera available"
};

var global$1 = typeof window === "undefined" ? undefined || {} : window;

var trigger;
var callbacks = [];
var notify$1 = function() {
  return callbacks.splice(0).forEach(function(cb) {
    return cb();
  });
};
var queueMicroTask = function(callback) {
  if (!trigger) {
    var el_1 = document.createTextNode("");
    var config = { characterData: true };
    new MutationObserver(function() {
      return notify$1();
    }).observe(el_1, config);
    trigger = function() {
      el_1.textContent = "";
    };
  }
  callbacks.push(callback);
  trigger();
};

var queueResizeObserver = function(cb) {
  queueMicroTask(function ResizeObserver() {
    requestAnimationFrame(cb);
  });
};

var CATCH_FRAMES = 60 / 5;
var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
var events = [
  "resize",
  "load",
  "transitionend",
  "animationend",
  "animationstart",
  "animationiteration",
  "keyup",
  "keydown",
  "mouseup",
  "mousedown",
  "mouseover",
  "mouseout",
  "blur",
  "focus"
];
var scheduled = false;
var Scheduler = (function() {
  function Scheduler() {
    var _this = this;
    this.stopped = true;
    this.listener = function() {
      return _this.schedule();
    };
  }
  Scheduler.prototype.run = function(frames) {
    var _this = this;
    if (scheduled) {
      return;
    }
    scheduled = true;
    queueResizeObserver(function() {
      var elementsHaveResized = false;
      try {
        elementsHaveResized = process$3();
      } finally {
        scheduled = false;
        if (!isWatching()) {
          return;
        }
        if (elementsHaveResized) {
          _this.run(60);
        } else if (frames) {
          _this.run(frames - 1);
        } else {
          _this.start();
        }
      }
    });
  };
  Scheduler.prototype.schedule = function() {
    this.stop();
    this.run(CATCH_FRAMES);
  };
  Scheduler.prototype.observe = function() {
    var _this = this;
    var cb = function() {
      return _this.observer && _this.observer.observe(document.body, observerConfig);
    };
    document.body ? cb() : global$1.addEventListener("DOMContentLoaded", cb);
  };
  Scheduler.prototype.start = function() {
    var _this = this;
    if (this.stopped) {
      this.stopped = false;
      this.observer = new MutationObserver(this.listener);
      this.observe();
      events.forEach(function(name) {
        return global$1.addEventListener(name, _this.listener, true);
      });
    }
  };
  Scheduler.prototype.stop = function() {
    var _this = this;
    if (!this.stopped) {
      this.observer && this.observer.disconnect();
      events.forEach(function(name) {
        return global$1.removeEventListener(name, _this.listener, true);
      });
      this.stopped = true;
    }
  };
  return Scheduler;
})();
var scheduler = new Scheduler();

var ResizeObserverBoxOptions;
(function(ResizeObserverBoxOptions) {
  ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
  ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));

var DOMRectReadOnly = (function() {
  function DOMRectReadOnly(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    return Object.freeze(this);
  }
  DOMRectReadOnly.fromRect = function(rectangle) {
    return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };
  return DOMRectReadOnly;
})();

var isSVG = function(target) {
  return target instanceof SVGElement && "getBBox" in target;
};
var isHidden = function(target) {
  if (isSVG(target)) {
    var _a = target.getBBox(),
      width = _a.width,
      height = _a.height;
    return !width && !height;
  }
  var _b = target,
    offsetWidth = _b.offsetWidth,
    offsetHeight = _b.offsetHeight;
  return !(offsetWidth || offsetHeight || target.getClientRects().length);
};
var isReplacedElement = function(target) {
  switch (target.tagName) {
    case "INPUT":
      if (target.type !== "image") {
        break;
      }
    case "VIDEO":
    case "AUDIO":
    case "EMBED":
    case "OBJECT":
    case "CANVAS":
    case "IFRAME":
    case "IMG":
      return true;
  }
  return false;
};

var cache = new Map();
var scrollRegexp = /auto|scroll/;
var verticalRegexp = /^tb|vertical/;
var IE = /msie|trident/i.test(global$1.navigator && global$1.navigator.userAgent);
var parseDimension = function(pixel) {
  return parseFloat(pixel || "0");
};
var size = function(inlineSize, blockSize, switchSizes) {
  if (inlineSize === void 0) {
    inlineSize = 0;
  }
  if (blockSize === void 0) {
    blockSize = 0;
  }
  if (switchSizes === void 0) {
    switchSizes = false;
  }
  return Object.freeze({
    inlineSize: (switchSizes ? blockSize : inlineSize) || 0,
    blockSize: (switchSizes ? inlineSize : blockSize) || 0
  });
};
var zeroBoxes = Object.freeze({
  borderBoxSize: size(),
  contentBoxSize: size(),
  contentRect: new DOMRectReadOnly(0, 0, 0, 0)
});
var calculateBoxSizes = function(target) {
  if (cache.has(target)) {
    return cache.get(target);
  }
  if (isHidden(target)) {
    cache.set(target, zeroBoxes);
    return zeroBoxes;
  }
  var cs = getComputedStyle(target);
  var svg = isSVG(target) && target.getBBox();
  var removePadding = !IE && cs.boxSizing === "border-box";
  var switchSizes = verticalRegexp.test(cs.writingMode || "");
  var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || "");
  var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || "");
  var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
  var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
  var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
  var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
  var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
  var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
  var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
  var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
  var horizontalPadding = paddingLeft + paddingRight;
  var verticalPadding = paddingTop + paddingBottom;
  var horizontalBorderArea = borderLeft + borderRight;
  var verticalBorderArea = borderTop + borderBottom;
  var horizontalScrollbarThickness = !canScrollHorizontally
    ? 0
    : target.offsetHeight - verticalBorderArea - target.clientHeight;
  var verticalScrollbarThickness = !canScrollVertically
    ? 0
    : target.offsetWidth - horizontalBorderArea - target.clientWidth;
  var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
  var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
  var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
  var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
  var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
  var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
  var boxes = Object.freeze({
    borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
    contentBoxSize: size(contentWidth, contentHeight, switchSizes),
    contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
  });
  cache.set(target, boxes);
  return boxes;
};
var calculateBoxSize = function(target, observedBox) {
  var _a = calculateBoxSizes(target),
    borderBoxSize = _a.borderBoxSize,
    contentBoxSize = _a.contentBoxSize;
  return observedBox === ResizeObserverBoxOptions.BORDER_BOX ? borderBoxSize : contentBoxSize;
};

var skipNotifyOnElement = function(target) {
  return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
};
var ResizeObservation = (function() {
  function ResizeObservation(target, observedBox) {
    this.target = target;
    this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
    this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  ResizeObservation.prototype.isActive = function() {
    var size = calculateBoxSize(this.target, this.observedBox);
    if (skipNotifyOnElement(this.target)) {
      this.lastReportedSize = size;
    }
    if (this.lastReportedSize.inlineSize !== size.inlineSize || this.lastReportedSize.blockSize !== size.blockSize) {
      return true;
    }
    return false;
  };
  return ResizeObservation;
})();

var ResizeObserverDetail = (function() {
  function ResizeObserverDetail(resizeObserver, callback) {
    this.activeTargets = [];
    this.skippedTargets = [];
    this.observationTargets = [];
    this.observer = resizeObserver;
    this.callback = callback;
  }
  return ResizeObserverDetail;
})();

var hasActiveObservations = function() {
  return resizeObservers.some(function(ro) {
    return ro.activeTargets.length > 0;
  });
};

var hasSkippedObservations = function() {
  return resizeObservers.some(function(ro) {
    return ro.skippedTargets.length > 0;
  });
};

var msg = "ResizeObserver loop completed with undelivered notifications.";
var deliverResizeLoopError = function() {
  var event;
  if (typeof ErrorEvent === "function") {
    event = new ErrorEvent("error", {
      message: msg
    });
  } else {
    event = document.createEvent("Event");
    event.initEvent("error", false, false);
    event.message = msg;
  }
  window.dispatchEvent(event);
};

var ResizeObserverEntry = (function() {
  function ResizeObserverEntry(target) {
    var boxes = calculateBoxSizes(target);
    this.target = target;
    this.contentRect = boxes.contentRect;
    this.borderBoxSize = boxes.borderBoxSize;
    this.contentBoxSize = boxes.contentBoxSize;
  }
  return ResizeObserverEntry;
})();

var calculateDepthForNode = function(node) {
  if (isHidden(node)) {
    return Infinity;
  }
  var depth = 0;
  var parent = node.parentNode;
  while (parent) {
    depth += 1;
    parent = parent.parentNode;
  }
  return depth;
};

var broadcastActiveObservations = function() {
  var shallowestDepth = Infinity;
  var callbacks = [];
  resizeObservers.forEach(function processObserver(ro) {
    if (ro.activeTargets.length === 0) {
      return;
    }
    var entries = [];
    ro.activeTargets.forEach(function processTarget(ot) {
      var entry = new ResizeObserverEntry(ot.target);
      var targetDepth = calculateDepthForNode(ot.target);
      entries.push(entry);
      ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
      if (targetDepth < shallowestDepth) {
        shallowestDepth = targetDepth;
      }
    });
    callbacks.push(function resizeObserverCallback() {
      ro.callback.call(ro.observer, entries, ro.observer);
    });
    ro.activeTargets.splice(0, ro.activeTargets.length);
  });
  for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
    var callback = callbacks_1[_i];
    callback();
  }
  return shallowestDepth;
};

var gatherActiveObservationsAtDepth = function(depth) {
  cache.clear();
  resizeObservers.forEach(function processObserver(ro) {
    ro.activeTargets.splice(0, ro.activeTargets.length);
    ro.skippedTargets.splice(0, ro.skippedTargets.length);
    ro.observationTargets.forEach(function processTarget(ot) {
      if (ot.isActive()) {
        if (calculateDepthForNode(ot.target) > depth) {
          ro.activeTargets.push(ot);
        } else {
          ro.skippedTargets.push(ot);
        }
      }
    });
  });
};

var resizeObservers = [];
var observerMap = new Map();
var watching = 0;
var updateCount = function(n) {
  !watching && n > 0 && scheduler.start();
  watching += n;
  !watching && scheduler.stop();
};
var getObservationIndex = function(observationTargets, target) {
  for (var i = 0; i < observationTargets.length; i += 1) {
    if (observationTargets[i].target === target) {
      return i;
    }
  }
  return -1;
};
var process$3 = function() {
  var depth = 0;
  gatherActiveObservationsAtDepth(depth);
  while (hasActiveObservations()) {
    depth = broadcastActiveObservations();
    gatherActiveObservationsAtDepth(depth);
  }
  if (hasSkippedObservations()) {
    deliverResizeLoopError();
  }
  return depth > 0;
};
var ResizeObserverController = (function() {
  function ResizeObserverController() {}
  ResizeObserverController.connect = function(resizeObserver, callback) {
    var detail = new ResizeObserverDetail(resizeObserver, callback);
    resizeObservers.push(detail);
    observerMap.set(resizeObserver, detail);
  };
  ResizeObserverController.observe = function(resizeObserver, target, options) {
    if (observerMap.has(resizeObserver)) {
      var detail = observerMap.get(resizeObserver);
      if (getObservationIndex(detail.observationTargets, target) < 0) {
        detail.observationTargets.push(new ResizeObservation(target, options && options.box));
        updateCount(1);
        scheduler.schedule();
      }
    }
  };
  ResizeObserverController.unobserve = function(resizeObserver, target) {
    if (observerMap.has(resizeObserver)) {
      var detail = observerMap.get(resizeObserver);
      var index = getObservationIndex(detail.observationTargets, target);
      if (index >= 0) {
        detail.observationTargets.splice(index, 1);
        updateCount(-1);
      }
    }
  };
  ResizeObserverController.disconnect = function(resizeObserver) {
    if (observerMap.has(resizeObserver)) {
      var detail = observerMap.get(resizeObserver);
      resizeObservers.splice(resizeObservers.indexOf(detail), 1);
      observerMap.delete(resizeObserver);
      updateCount(-detail.observationTargets.length);
    }
  };
  return ResizeObserverController;
})();
var isWatching = function() {
  return !!watching;
};

var ResizeObserver = (function() {
  function ResizeObserver(callback) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (typeof callback !== "function") {
      throw new TypeError(
        "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
      );
    }
    ResizeObserverController.connect(this, callback);
  }
  ResizeObserver.prototype.observe = function(target, options) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (target instanceof Element === false) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }
    ResizeObserverController.observe(this, target, options);
  };
  ResizeObserver.prototype.unobserve = function(target) {
    if (arguments.length === 0) {
      throw new TypeError(
        "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
      );
    }
    if (target instanceof Element === false) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }
    ResizeObserverController.unobserve(this, target);
  };
  ResizeObserver.prototype.disconnect = function() {
    ResizeObserverController.disconnect(this);
  };
  ResizeObserver.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  };
  return ResizeObserver;
})();

var ImageSettings;

(function(ImageSettings) {
  // Warning: the values of Format are important as the engine web worker relies on them without type checking.

  /**
   * Image bytes format/layout.
   */
  var Format;

  (function(Format) {
    /**
     * Single-channel 8-bit gray scale image.
     */
    Format[(Format["GRAY_8U"] = 0)] = "GRAY_8U";
    /**
     * RGB image with 8 bits per color channel.
     */

    Format[(Format["RGB_8U"] = 1)] = "RGB_8U";
    /**
     * RGBA image with 8 bits per color channel.
     */

    Format[(Format["RGBA_8U"] = 2)] = "RGBA_8U";
  })((Format = ImageSettings.Format || (ImageSettings.Format = {})));
})(ImageSettings || (ImageSettings = {}));

var ResizeObserver$1 = // tslint:disable-next-line: no-any
  "ResizeObserver" in window
    ? /* istanbul ignore next */
      window.ResizeObserver
    : ResizeObserver;
/**
 * @hidden
 */

var BarcodePickerGui =
  /*#__PURE__*/
  (function() {
    function BarcodePickerGui(options) {
      var _this = this;

      classCallCheck(this, BarcodePickerGui);

      this.scanner = options.scanner;
      this.originElement = options.originElement;
      this.singleImageMode = options.singleImageMode;
      this.scanningPaused = options.scanningPaused;
      this.cameraUploadCallback = options.cameraUploadCallback;
      this.mirrorImageOverrides = new map$1();
      this.grandParentElement = document.createElement("div");
      this.grandParentElement.className = BarcodePickerGui.grandParentElementClassName;
      this.originElement.appendChild(this.grandParentElement);
      this.parentElement = document.createElement("div");
      this.parentElement.className = BarcodePickerGui.parentElementClassName;
      this.grandParentElement.appendChild(this.parentElement);
      this.videoImageCanvasContext = document.createElement("canvas").getContext("2d");
      this.videoElement = document.createElement("video");
      this.cameraSwitcherElement = document.createElement("img");
      this.torchTogglerElement = document.createElement("img");
      this.laserContainerElement = document.createElement("div");
      this.laserActiveImageElement = document.createElement("img");
      this.laserPausedImageElement = document.createElement("img");
      this.viewfinderElement = document.createElement("div");

      if (options.singleImageMode) {
        this.cameraUploadElement = document.createElement("div");
        this.cameraUploadInputElement = document.createElement("input");
        this.cameraUploadLabelElement = document.createElement("label");
        this.cameraUploadProgressElement = document.createElement("div");
        this.setupCameraUploadGuiAssets();
        this.guiStyle = BarcodePicker.GuiStyle.NONE;
      } else {
        this.setupVideoElement();
        this.setupCameraSwitcher();
        this.setupTorchToggler();
        this.setupFullGuiAssets();
        this.setGuiStyle(options.guiStyle);
        this.setVideoFit(options.videoFit);
        this.setLaserArea(options.laserArea);
        this.setViewfinderArea(options.viewfinderArea);
        this.visibilityListener = this.checkAndRecoverPlayback.bind(this);
        document.addEventListener("visibilitychange", this.visibilityListener);
        this.newScanSettingsListener = this.handleNewScanSettings.bind(this);
        this.scanner.onNewScanSettings(this.newScanSettingsListener);
        this.handleNewScanSettings();
        this.videoResizeListener = this.handleVideoResize.bind(this);
        this.videoElement.addEventListener("resize", this.videoResizeListener);
      }

      if (options.hideLogo) {
        this.licenseFeaturesReadyListener = this.showScanditLogo.bind(this, options.hideLogo);
        this.scanner.onLicenseFeaturesReady(this.licenseFeaturesReadyListener);
      } else {
        this.showScanditLogo(false);
      }

      this.resize();
      this.resizeObserver = new ResizeObserver$1(function() {
        _this.resize();
      });
      this.resizeObserver.observe(this.originElement);
      this.setVisible(options.visible);
    }

    createClass(BarcodePickerGui, [
      {
        key: "destroy",
        value: function destroy() {
          if (this.visibilityListener != null) {
            document.removeEventListener("visibilitychange", this.visibilityListener);
          }

          if (this.newScanSettingsListener != null) {
            this.scanner.removeListener("newScanSettings", this.newScanSettingsListener);
          }

          if (this.videoResizeListener != null) {
            document.removeEventListener("resize", this.videoResizeListener);
          }

          if (this.licenseFeaturesReadyListener != null) {
            this.scanner.removeListener("licenseFeaturesReady", this.licenseFeaturesReadyListener);
          }

          this.resizeObserver.disconnect();
          this.grandParentElement.remove();
          this.originElement.classList.remove(BarcodePickerGui.hiddenClassName);
        }
      },
      {
        key: "setCameraManager",
        value: function setCameraManager(cameraManager) {
          this.cameraManager = cameraManager;
        }
      },
      {
        key: "pauseScanning",
        value: function pauseScanning() {
          this.scanningPaused = true;
          this.laserActiveImageElement.classList.add(BarcodePickerGui.hiddenOpacityClassName);
          this.laserPausedImageElement.classList.remove(BarcodePickerGui.hiddenOpacityClassName);
          this.viewfinderElement.classList.add(BarcodePickerGui.pausedClassName);
        }
      },
      {
        key: "resumeScanning",
        value: function resumeScanning() {
          this.scanningPaused = false;
          this.laserPausedImageElement.classList.add(BarcodePickerGui.hiddenOpacityClassName);
          this.laserActiveImageElement.classList.remove(BarcodePickerGui.hiddenOpacityClassName);
          this.viewfinderElement.classList.remove(BarcodePickerGui.pausedClassName);
        }
      },
      {
        key: "isVisible",
        value: function isVisible() {
          return this.visible;
        }
      },
      {
        key: "setVisible",
        value: function setVisible(visible) {
          var browserName = BrowserHelper.userAgentInfo.getBrowser().name;

          if (
            browserName != null &&
            browserName.includes("Safari") &&
            this.visible != null &&
            !this.visible &&
            visible
          ) {
            // Safari behaves very weirdly when displaying the video element again after being hidden:
            // it undetectably reuses video frames "buffered" from the video just before it was hidden.
            // We do this to avoid reusing old data
            this.videoElement.pause();
            this.videoElement.currentTime = 0;
            this.videoElement.load();
            this.playVideo();
          }

          this.visible = visible;

          if (visible) {
            this.originElement.classList.remove(BarcodePickerGui.hiddenClassName);

            if (this.guiStyle === BarcodePicker.GuiStyle.LASER) {
              this.laserActiveImageElement.classList.remove(BarcodePickerGui.flashColorClassName);
            } else if (this.guiStyle === BarcodePicker.GuiStyle.VIEWFINDER) {
              this.viewfinderElement.classList.remove(BarcodePickerGui.flashWhiteClassName);
            }
          } else {
            this.originElement.classList.add(BarcodePickerGui.hiddenClassName);
          }
        }
      },
      {
        key: "isMirrorImageEnabled",
        value: function isMirrorImageEnabled() {
          if (
            this.cameraManager != null &&
            this.cameraManager.selectedCamera != null &&
            this.cameraManager.activeCamera != null
          ) {
            var mirrorImageOverride = this.mirrorImageOverrides.get(
              this.cameraManager.activeCamera.deviceId + this.cameraManager.activeCamera.label
            );

            if (mirrorImageOverride != null) {
              return mirrorImageOverride;
            } else {
              return this.cameraManager.activeCamera.cameraType === Camera.Type.FRONT;
            }
          } else {
            return false;
          }
        }
      },
      {
        key: "setMirrorImageEnabled",
        value: function setMirrorImageEnabled(enabled, override) {
          if (this.cameraManager != null && this.cameraManager.selectedCamera != null) {
            if (enabled) {
              this.videoElement.classList.add(BarcodePickerGui.mirroredClassName);
            } else {
              this.videoElement.classList.remove(BarcodePickerGui.mirroredClassName);
            }

            if (override) {
              this.mirrorImageOverrides.set(
                this.cameraManager.selectedCamera.deviceId + this.cameraManager.selectedCamera.label,
                enabled
              );
            }
          }
        }
      },
      {
        key: "setGuiStyle",
        value: function setGuiStyle(guiStyle) {
          if (this.singleImageMode) {
            return;
          }

          switch (guiStyle) {
            case BarcodePicker.GuiStyle.LASER:
              this.guiStyle = guiStyle;
              this.laserContainerElement.classList.remove(BarcodePickerGui.hiddenClassName);
              this.viewfinderElement.classList.add(BarcodePickerGui.hiddenClassName);
              break;

            case BarcodePicker.GuiStyle.VIEWFINDER:
              this.guiStyle = guiStyle;
              this.laserContainerElement.classList.add(BarcodePickerGui.hiddenClassName);
              this.viewfinderElement.classList.remove(BarcodePickerGui.hiddenClassName);
              break;

            case BarcodePicker.GuiStyle.NONE:
            default:
              this.guiStyle = BarcodePicker.GuiStyle.NONE;
              this.laserContainerElement.classList.add(BarcodePickerGui.hiddenClassName);
              this.viewfinderElement.classList.add(BarcodePickerGui.hiddenClassName);
              break;
          }
        }
      },
      {
        key: "setLaserArea",
        value: function setLaserArea(area) {
          this.customLaserArea = area;

          if (area == null) {
            area = this.scanner.getScanSettings().getSearchArea();
          }

          var borderPercentage = 0.025;
          var usablePercentage = 1 - borderPercentage * 2;
          this.laserContainerElement.style.left = "".concat((borderPercentage + area.x * usablePercentage) * 100, "%");
          this.laserContainerElement.style.width = "".concat(area.width * usablePercentage * 100, "%");
          this.laserContainerElement.style.top = "".concat((borderPercentage + area.y * usablePercentage) * 100, "%");
          this.laserContainerElement.style.height = "".concat(area.height * usablePercentage * 100, "%");
        }
      },
      {
        key: "setViewfinderArea",
        value: function setViewfinderArea(area) {
          this.customViewfinderArea = area;

          if (area == null) {
            area = this.scanner.getScanSettings().getSearchArea();
          }

          var borderPercentage = 0.025;
          var usablePercentage = 1 - borderPercentage * 2;
          this.viewfinderElement.style.left = "".concat((borderPercentage + area.x * usablePercentage) * 100, "%");
          this.viewfinderElement.style.width = "".concat(area.width * usablePercentage * 100, "%");
          this.viewfinderElement.style.top = "".concat((borderPercentage + area.y * usablePercentage) * 100, "%");
          this.viewfinderElement.style.height = "".concat(area.height * usablePercentage * 100, "%");
        }
      },
      {
        key: "setVideoFit",
        value: function setVideoFit(objectFit) {
          if (this.singleImageMode) {
            return;
          }

          this.videoFit = objectFit;

          if (objectFit === BarcodePicker.ObjectFit.COVER) {
            this.videoElement.style.objectFit = "cover";
            this.videoElement.dataset.objectFit = "cover"; // used by "objectFitPolyfill" library
          } else {
            this.videoElement.style.objectFit = "contain";
            this.videoElement.dataset.objectFit = "contain"; // used by "objectFitPolyfill" library

            this.scanner.applyScanSettings(
              this.scanner.getScanSettings().setBaseSearchArea({
                x: 0,
                y: 0,
                width: 1.0,
                height: 1.0
              })
            );
          }

          this.resize();
        }
      },
      {
        key: "reassignOriginElement",
        value: function reassignOriginElement(originElement) {
          if (!this.visible) {
            this.originElement.classList.remove(BarcodePickerGui.hiddenClassName);
            originElement.classList.add(BarcodePickerGui.hiddenClassName);
          }

          originElement.appendChild(this.grandParentElement);
          this.checkAndRecoverPlayback();
          this.resize();
          this.resizeObserver.disconnect();
          this.resizeObserver.observe(originElement);
          this.originElement = originElement;
        }
      },
      {
        key: "flashGUI",
        value: function flashGUI() {
          if (this.guiStyle === BarcodePicker.GuiStyle.LASER) {
            this.flashLaser();
          } else if (this.guiStyle === BarcodePicker.GuiStyle.VIEWFINDER) {
            this.flashViewfinder();
          }
        }
      },
      {
        key: "getVideoImageData",
        value: function getVideoImageData() {
          if (!this.singleImageMode) {
            // This could happen in very weird situations and should be temporary
            if (
              this.videoElement.readyState !== 4 ||
              this.videoImageCanvasContext.canvas.width <= 2 ||
              this.videoImageCanvasContext.canvas.height <= 2
            ) {
              return undefined;
            }

            this.videoImageCanvasContext.drawImage(this.videoElement, 0, 0);
          }

          return this.videoImageCanvasContext.getImageData(
            0,
            0,
            this.videoImageCanvasContext.canvas.width,
            this.videoImageCanvasContext.canvas.height
          ).data;
        }
      },
      {
        key: "getVideoCurrentTime",
        value: function getVideoCurrentTime() {
          return this.videoElement.currentTime;
        }
      },
      {
        key: "setCameraSwitcherVisible",
        value: function setCameraSwitcherVisible(visible) {
          if (visible) {
            this.cameraSwitcherElement.classList.remove(BarcodePickerGui.hiddenClassName);
          } else {
            this.cameraSwitcherElement.classList.add(BarcodePickerGui.hiddenClassName);
          }
        }
      },
      {
        key: "setTorchTogglerVisible",
        value: function setTorchTogglerVisible(visible) {
          if (visible) {
            this.torchTogglerElement.classList.remove(BarcodePickerGui.hiddenClassName);
          } else {
            this.torchTogglerElement.classList.add(BarcodePickerGui.hiddenClassName);
          }
        }
      },
      {
        key: "playVideo",
        value: function playVideo() {
          var playPromise = this.videoElement.play();

          if (playPromise != null) {
            playPromise.catch(
              /* istanbul ignore next */
              function() {
                // Can sometimes cause an incorrect rejection (all is good, ignore).
              }
            );
          }
        }
      },
      {
        key: "setCameraUploadGuiAvailable",
        value: function setCameraUploadGuiAvailable(available) {
          if (available) {
            this.cameraUploadProgressElement.classList.add(BarcodePickerGui.flashWhiteInsetClassName);
            this.cameraUploadElement.classList.remove(BarcodePickerGui.opacityPulseClassName);
          } else {
            this.cameraUploadProgressElement.classList.remove(BarcodePickerGui.flashWhiteInsetClassName);
            this.cameraUploadElement.classList.add(BarcodePickerGui.opacityPulseClassName);
          }
        }
      },
      {
        key: "setupVideoElement",
        value: function setupVideoElement() {
          this.videoElement.setAttribute("autoplay", "autoplay");
          this.videoElement.setAttribute("playsinline", "true");
          this.videoElement.setAttribute("muted", "muted");
          this.videoElement.className = BarcodePickerGui.videoElementClassName;
          this.parentElement.appendChild(this.videoElement);
        }
      },
      {
        key: "setupCameraUploadGuiAssets",
        value: function setupCameraUploadGuiAssets() {
          var _this2 = this;

          this.cameraUploadElement.className = BarcodePickerGui.cameraUploadElementClassName;
          this.parentElement.appendChild(this.cameraUploadElement);
          this.cameraUploadInputElement.type = "file";
          this.cameraUploadInputElement.accept = "image/*";
          this.cameraUploadInputElement.setAttribute("capture", "environment");
          this.cameraUploadInputElement.addEventListener("change", this.cameraUploadFile.bind(this));
          this.cameraUploadInputElement.addEventListener(
            "click",
            /* istanbul ignore next */
            function(event) {
              if (_this2.scanningPaused || _this2.scanner.isBusyProcessing()) {
                event.preventDefault();
              }
            }
          );
          this.cameraUploadLabelElement.appendChild(this.cameraUploadInputElement);
          this.cameraUploadElement.appendChild(this.cameraUploadLabelElement);
          var cameraUploadImageElement = document.createElement("img");
          cameraUploadImageElement.src = cameraImage;
          this.cameraUploadLabelElement.appendChild(cameraUploadImageElement);
          var cameraUploadTextElement = document.createElement("div");
          cameraUploadTextElement.innerText = "Scan from Camera";
          this.cameraUploadLabelElement.appendChild(cameraUploadTextElement);
          this.cameraUploadProgressElement.classList.add("radial-progress");
          this.cameraUploadElement.appendChild(this.cameraUploadProgressElement);
        }
      },
      {
        key: "setupFullGuiAssets",
        value: function setupFullGuiAssets() {
          this.laserActiveImageElement.src = laserActiveImage;
          this.laserContainerElement.appendChild(this.laserActiveImageElement);
          this.laserPausedImageElement.src = laserPausedImage;
          this.laserContainerElement.appendChild(this.laserPausedImageElement);
          this.laserContainerElement.className = BarcodePickerGui.laserContainerElementClassName;
          this.parentElement.appendChild(this.laserContainerElement);
          this.viewfinderElement.className = BarcodePickerGui.viewfinderElementClassName;
          this.parentElement.appendChild(this.viewfinderElement); // Show inactive GUI, as for now the scanner isn't ready yet

          this.laserActiveImageElement.classList.add(BarcodePickerGui.hiddenOpacityClassName);
          this.laserPausedImageElement.classList.remove(BarcodePickerGui.hiddenOpacityClassName);
          this.viewfinderElement.classList.add(BarcodePickerGui.pausedClassName);
        }
      },
      {
        key: "flashLaser",
        value: function flashLaser() {
          this.laserActiveImageElement.classList.remove(BarcodePickerGui.flashColorClassName); // tslint:disable-next-line:no-unused-expression

          this.laserActiveImageElement.offsetHeight; // NOSONAR // Trigger reflow to restart animation

          this.laserActiveImageElement.classList.add(BarcodePickerGui.flashColorClassName);
        }
      },
      {
        key: "flashViewfinder",
        value: function flashViewfinder() {
          this.viewfinderElement.classList.remove(BarcodePickerGui.flashWhiteClassName); // tslint:disable-next-line:no-unused-expression

          this.viewfinderElement.offsetHeight; // NOSONAR // Trigger reflow to restart animation

          this.viewfinderElement.classList.add(BarcodePickerGui.flashWhiteClassName);
        }
      },
      {
        key: "resize",
        value: function resize() {
          if (this.singleImageMode) {
            this.resizeCameraUpload();
          } else {
            this.resizeVideo();
          }
        }
      },
      {
        key: "resizeCameraUpload",
        value: function resizeCameraUpload() {
          var width = this.originElement.clientWidth;
          var height = this.originElement.clientHeight;
          this.cameraUploadLabelElement.style.transform = "scale(".concat(Math.min(1, width / 500, height / 300), ")");
          this.cameraUploadProgressElement.style.transform = "scale(".concat(
            Math.min(1, width / 500, height / 300),
            ")"
          );
        }
      },
      {
        key: "resizeVideo",
        value: function resizeVideo() {
          if (this.videoElement.videoWidth <= 2 || this.videoElement.videoHeight <= 2) {
            return;
          }

          this.parentElement.style.maxWidth = null;
          this.parentElement.style.maxHeight = null;
          var width = this.originElement.clientWidth;
          var height = this.originElement.clientHeight;
          var videoRatio = this.videoElement.videoWidth / this.videoElement.videoHeight;

          if (this.videoFit === BarcodePicker.ObjectFit.COVER) {
            var widthPercentage = 1;
            var heightPercentage = 1;

            if (videoRatio < width / height) {
              heightPercentage = Math.min(1, height / (width / videoRatio));
            } else {
              widthPercentage = Math.min(1, width / (height * videoRatio));
            }

            this.scanner.applyScanSettings(
              this.scanner.getScanSettings().setBaseSearchArea({
                x: (1 - widthPercentage) / 2,
                y: (1 - heightPercentage) / 2,
                width: widthPercentage,
                height: heightPercentage
              })
            );
            return;
          }

          if (videoRatio > width / height) {
            height = width / videoRatio;
          } else {
            width = height * videoRatio;
          }

          this.parentElement.style.maxWidth = "".concat(Math.ceil(width), "px");
          this.parentElement.style.maxHeight = "".concat(Math.ceil(height), "px");
          window.objectFitPolyfill(this.videoElement);
        }
      },
      {
        key: "checkAndRecoverPlayback",
        value: function checkAndRecoverPlayback() {
          if (
            this.cameraManager != null &&
            this.cameraManager.activeCamera != null &&
            this.videoElement != null &&
            this.videoElement.srcObject != null
          ) {
            if (!this.videoElement.srcObject.active) {
              this.cameraManager.reinitializeCamera();
            } else {
              this.playVideo();
            }
          }
        }
      },
      {
        key: "updateCameraUploadProgress",
        value: function updateCameraUploadProgress(progressPercentageValue) {
          this.cameraUploadProgressElement.setAttribute("data-progress", progressPercentageValue);
        }
      },
      {
        key: "cameraUploadImageLoad",
        value: function cameraUploadImageLoad(image) {
          var resizedImageWidth, resizedImageHeight, resizedImageSizeLimit;
          return regenerator.async(
            function cameraUploadImageLoad$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    this.updateCameraUploadProgress("100");
                    resizedImageSizeLimit = 1440;

                    if (image.naturalWidth <= resizedImageSizeLimit && image.naturalHeight <= resizedImageSizeLimit) {
                      resizedImageWidth = image.naturalWidth;
                      resizedImageHeight = image.naturalHeight;
                    } else {
                      if (image.naturalWidth > image.naturalHeight) {
                        resizedImageWidth = resizedImageSizeLimit;
                        resizedImageHeight = Math.round(
                          (image.naturalHeight / image.naturalWidth) * resizedImageSizeLimit
                        );
                      } else {
                        resizedImageWidth = Math.round(
                          (image.naturalWidth / image.naturalHeight) * resizedImageSizeLimit
                        );
                        resizedImageHeight = resizedImageSizeLimit;
                      }
                    }

                    _context.next = 5;
                    return regenerator.awrap(
                      this.cameraUploadFileProcess(image, resizedImageWidth, resizedImageHeight)
                    );

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "cameraUploadFileProcess",
        value: function cameraUploadFileProcess(image, width, height) {
          return regenerator.async(
            function cameraUploadFileProcess$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    this.videoImageCanvasContext.canvas.width = width;
                    this.videoImageCanvasContext.canvas.height = height;
                    this.videoImageCanvasContext.drawImage(image, 0, 0, width, height);
                    this.scanner.applyImageSettings({
                      width: width,
                      height: height,
                      format: ImageSettings.Format.RGBA_8U
                    });
                    this.setCameraUploadGuiAvailable(false);
                    _context2.next = 7;
                    return regenerator.awrap(this.cameraUploadCallback());

                  case 7:
                    this.setCameraUploadGuiAvailable(true);

                  case 8:
                  case "end":
                    return _context2.stop();
                }
              }
            },
            null,
            this
          );
        }
      },
      {
        key: "cameraUploadFile",
        value: function cameraUploadFile() {
          var _this3 = this;

          var files = this.cameraUploadInputElement.files;

          if (files != null && files.length !== 0) {
            var image = new Image();
            var fileReader = new FileReader();

            fileReader.onload = function() {
              _this3.cameraUploadInputElement.value = "";

              if (fileReader.result != null) {
                image.onload = _this3.cameraUploadImageLoad.bind(_this3, image);

                image.onprogress = function(event2) {
                  if (event2.lengthComputable) {
                    var progress = Math.round((event2.loaded / event2.total) * 20) * 5;

                    if (progress <= 100) {
                      _this3.updateCameraUploadProgress(progress.toString());
                    }
                  }
                };

                image.src = fileReader.result;
              }
            };

            this.updateCameraUploadProgress("0");
            fileReader.readAsDataURL(files[0]);
          }
        }
      },
      {
        key: "setupCameraSwitcher",
        value: function setupCameraSwitcher() {
          var _this4 = this;

          this.cameraSwitcherElement.src = switchCameraImage;
          this.cameraSwitcherElement.className = BarcodePickerGui.cameraSwitcherElementClassName;
          this.cameraSwitcherElement.classList.add(BarcodePickerGui.hiddenClassName);
          this.parentElement.appendChild(this.cameraSwitcherElement);
          ["touchstart", "mousedown"].forEach(function(eventName) {
            _this4.cameraSwitcherElement.addEventListener(eventName, function _callee(event) {
              var cameraManager, cameras, newCameraIndex;
              return regenerator.async(
                function _callee$(_context3) {
                  while (1) {
                    switch ((_context3.prev = _context3.next)) {
                      case 0:
                        if (!(_this4.cameraManager != null)) {
                          _context3.next = 14;
                          break;
                        }

                        cameraManager = _this4.cameraManager;
                        event.preventDefault();
                        _context3.prev = 3;
                        _context3.next = 6;
                        return regenerator.awrap(CameraAccess.getCameras());

                      case 6:
                        cameras = _context3.sent;
                        newCameraIndex =
                          (cameras.findIndex(function(camera) {
                            return (
                              camera.deviceId ===
                              (cameraManager.activeCamera == null
                                ? camera.deviceId
                                : cameraManager.activeCamera.deviceId)
                            );
                          }) +
                            1) %
                          cameras.length;
                        cameraManager
                          .initializeCameraWithSettings(cameras[newCameraIndex], cameraManager.activeCameraSettings)
                          .catch(console.error);
                        _context3.next = 14;
                        break;

                      case 11:
                        _context3.prev = 11;
                        _context3.t0 = _context3["catch"](3);
                        console.error(_context3.t0);

                      case 14:
                      case "end":
                        return _context3.stop();
                    }
                  }
                },
                null,
                null,
                [[3, 11]]
              );
            });
          });
        }
      },
      {
        key: "setupTorchToggler",
        value: function setupTorchToggler() {
          var _this5 = this;

          this.torchTogglerElement.src = toggleTorchImage;
          this.torchTogglerElement.className = BarcodePickerGui.torchTogglerElementClassName;
          this.torchTogglerElement.classList.add(BarcodePickerGui.hiddenClassName);
          this.parentElement.appendChild(this.torchTogglerElement);
          ["touchstart", "mousedown"].forEach(function(eventName) {
            _this5.torchTogglerElement.addEventListener(eventName, function(event) {
              if (_this5.cameraManager != null) {
                event.preventDefault();

                _this5.cameraManager.toggleTorch();
              }
            });
          });
        }
      },
      {
        key: "showScanditLogo",
        value: function showScanditLogo(hideLogo, licenseFeatures) {
          if (
            hideLogo &&
            licenseFeatures != null &&
            licenseFeatures.hiddenScanditLogoAllowed != null &&
            licenseFeatures.hiddenScanditLogoAllowed
          ) {
            return;
          }

          var scanditLogoImageElement = document.createElement("img");
          scanditLogoImageElement.src = scanditLogoImage;
          scanditLogoImageElement.className = BarcodePickerGui.scanditLogoImageElementClassName;
          this.parentElement.appendChild(scanditLogoImageElement);
        }
      },
      {
        key: "handleNewScanSettings",
        value: function handleNewScanSettings() {
          if (this.customLaserArea == null) {
            this.setLaserArea();
          }

          if (this.customViewfinderArea == null) {
            this.setViewfinderArea();
          }
        }
      },
      {
        key: "handleVideoResize",
        value: function handleVideoResize() {
          if (
            this.videoImageCanvasContext.canvas.width === this.videoElement.videoWidth &&
            this.videoImageCanvasContext.canvas.height === this.videoElement.videoHeight
          ) {
            return;
          }

          this.videoImageCanvasContext.canvas.width = this.videoElement.videoWidth;
          this.videoImageCanvasContext.canvas.height = this.videoElement.videoHeight;
          this.scanner.applyImageSettings({
            width: this.videoElement.videoWidth,
            height: this.videoElement.videoHeight,
            format: ImageSettings.Format.RGBA_8U
          });
          this.resize();
        }
      }
    ]);

    return BarcodePickerGui;
  })();
BarcodePickerGui.grandParentElementClassName = "scandit scandit-container";
BarcodePickerGui.parentElementClassName = "scandit scandit-barcode-picker";
BarcodePickerGui.hiddenClassName = "scandit-hidden";
BarcodePickerGui.hiddenOpacityClassName = "scandit-hidden-opacity";
BarcodePickerGui.videoElementClassName = "scandit-video";
BarcodePickerGui.scanditLogoImageElementClassName = "scandit-logo";
BarcodePickerGui.laserContainerElementClassName = "scandit-laser";
BarcodePickerGui.viewfinderElementClassName = "scandit-viewfinder";
BarcodePickerGui.cameraSwitcherElementClassName = "scandit-camera-switcher";
BarcodePickerGui.torchTogglerElementClassName = "scandit-torch-toggle";
BarcodePickerGui.cameraUploadElementClassName = "scandit-camera-upload";
BarcodePickerGui.flashColorClassName = "scandit-flash-color";
BarcodePickerGui.flashWhiteClassName = "scandit-flash-white";
BarcodePickerGui.flashWhiteInsetClassName = "scandit-flash-white-inset";
BarcodePickerGui.opacityPulseClassName = "scandit-opacity-pulse";
BarcodePickerGui.mirroredClassName = "mirrored";
BarcodePickerGui.pausedClassName = "paused";

/**
 * @hidden
 *
 * A dummy barcode picker utility class used to (not) handle camera interaction.
 */
// istanbul ignore next

var DummyCameraManager =
  /*#__PURE__*/
  (function(_CameraManager) {
    inherits(DummyCameraManager, _CameraManager);

    function DummyCameraManager() {
      classCallCheck(this, DummyCameraManager);

      return possibleConstructorReturn(this, getPrototypeOf$2(DummyCameraManager).apply(this, arguments));
    }

    createClass(DummyCameraManager, [
      {
        key: "setInteractionOptions",
        value: function setInteractionOptions(_1, _2, _3, _4) {
          return;
        }
      },
      {
        key: "isCameraSwitcherEnabled",
        value: function isCameraSwitcherEnabled() {
          return false;
        }
      },
      {
        key: "setCameraSwitcherEnabled",
        value: function setCameraSwitcherEnabled(_1) {
          return promise$1.resolve();
        }
      },
      {
        key: "isTorchToggleEnabled",
        value: function isTorchToggleEnabled() {
          return false;
        }
      },
      {
        key: "setTorchToggleEnabled",
        value: function setTorchToggleEnabled(_1) {
          return;
        }
      },
      {
        key: "isTapToFocusEnabled",
        value: function isTapToFocusEnabled() {
          return false;
        }
      },
      {
        key: "setTapToFocusEnabled",
        value: function setTapToFocusEnabled(_1) {
          return;
        }
      },
      {
        key: "isPinchToZoomEnabled",
        value: function isPinchToZoomEnabled() {
          return false;
        }
      },
      {
        key: "setPinchToZoomEnabled",
        value: function setPinchToZoomEnabled(_1) {
          return;
        }
      },
      {
        key: "setSelectedCamera",
        value: function setSelectedCamera(_1) {
          return;
        }
      },
      {
        key: "setSelectedCameraSettings",
        value: function setSelectedCameraSettings(_1) {
          return;
        }
      },
      {
        key: "setupCameras",
        value: function setupCameras() {
          return promise$1.resolve();
        }
      },
      {
        key: "stopStream",
        value: function stopStream() {
          return;
        }
      },
      {
        key: "applyCameraSettings",
        value: function applyCameraSettings(_1) {
          return promise$1.resolve();
        }
      },
      {
        key: "reinitializeCamera",
        value: function reinitializeCamera() {
          return;
        }
      },
      {
        key: "initializeCameraWithSettings",
        value: function initializeCameraWithSettings(_1, _2) {
          return promise$1.resolve();
        }
      },
      {
        key: "setTorchEnabled",
        value: function setTorchEnabled(_1) {
          return;
        }
      },
      {
        key: "toggleTorch",
        value: function toggleTorch() {
          return;
        }
      },
      {
        key: "setZoom",
        value: function setZoom(_1, _2) {
          return;
        }
      }
    ]);

    return DummyCameraManager;
  })(CameraManager);

var $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
var stringify = function stringify(it) {
  // eslint-disable-line no-unused-vars
  return $JSON$1.stringify.apply($JSON$1, arguments);
};

var stringify$1 = stringify;

/**
 * @hidden
 * @returns Engine
 */
// tslint:disable-next-line:max-func-body-length
function engine() {
  const scanQueue = [];
  const parseQueue = [];
  const gpuAccelerationAvailable = typeof self.OffscreenCanvas === "function";
  let browserName;
  let imageBufferPointer;
  let licenseKey;
  let settings;
  let imageSettings;
  let scanWorkSubmitted = false;
  let fileSystemSynced = false;
  let runtimeLoaded = false;
  let wasmReady = false;
  let scannerSettingsReady = false;
  let scannerImageSettingsReady = false;
  let contextAvailable = false;
  let fsSyncInProgress;
  let fsSyncScheduled = false; // Public
  // Promise is used only during testing

  function loadLibrary(deviceId, libraryLocation, locationPath, deviceModelName, uaBrowserName) {
    function start() {
      if (!wasmReady && fileSystemSynced && runtimeLoaded) {
        wasmReady = true;
        Module.callMain();
        postMessage(["status", "ready"]);
        workOnScanQueue();
        workOnParseQueue();
      }
    }

    const _getLibraryLocationUR = getLibraryLocationURIs(libraryLocation),
      jsURI = _getLibraryLocationUR.jsURI,
      wasmURI = _getLibraryLocationUR.wasmURI;

    Module = {
      arguments: [deviceId],
      canvas: gpuAccelerationAvailable
        ? new self.OffscreenCanvas(32, 32)
        : /* istanbul ignore next */
          undefined,
      instantiateWasm: function instantiateWasm(importObject, successCallback) {
        // wasmJSVersion is globally defined inside scandit-engine-sdk.min.js
        let wasmJSVersion = self.wasmJSVersion; // istanbul ignore if

        if (wasmJSVersion == null) {
          wasmJSVersion = "undefined";
        } // istanbul ignore if

        if (wasmJSVersion !== "4.6.1") {
          console.error(
            "The Scandit SDK Engine library JS file found at ".concat(jsURI, " seems invalid: ") +
              "expected version doesn't match (received: ".concat(wasmJSVersion, ", expected: ", "4.6.1", "). ") +
              "Please ensure the correct Scandit SDK Engine file (with correct version) is retrieved."
          );
        }

        if (typeof self.WebAssembly.instantiateStreaming === "function") {
          instantiateWebAssemblyStreaming(importObject, wasmURI, successCallback);
        } else {
          instantiateWebAssembly(importObject, wasmURI, successCallback);
        }

        return {};
      },
      noInitialRun: true,
      preRun: function preRun() {
        try {
          FS.mkdir("/scandit_sync_folder");
        } catch (error) {
          // istanbul ignore next
          if (error.code !== "EEXIST") {
            throw error;
          }
        }

        FS.mount(IDBFS, {}, "/scandit_sync_folder");
        FS.syncfs(true, function() {
          fileSystemSynced = true;
          start();
        });
      },
      onRuntimeInitialized: function onRuntimeInitialized() {
        runtimeLoaded = true;
        start();
      }
    };
    browserName = uaBrowserName;
    self.window = self.document = self; // Fix some Emscripten quirks

    self.path = locationPath; // Used by the Scandit SDK Engine library

    self.deviceModelName = deviceModelName; // Used by the Scandit SDK Engine library

    function tryImportScripts() {
      try {
        const importScriptsResults = importScripts(jsURI); // istanbul ignore else

        if (importScriptsResults != null) {
          return importScriptsResults;
        } else {
          return Promise.resolve();
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return retryWithExponentialBackoff(tryImportScripts, 250, 4000, function(error) {
      console.warn(error);
      console.warn("Couldn't retrieve Scandit SDK Engine library at ".concat(jsURI, ", retrying..."));
    }).catch(function(error) {
      console.error(error);
      console.error(
        "Couldn't retrieve Scandit SDK Engine library at ".concat(
          jsURI,
          ", did you configure the path for it correctly?"
        )
      );
      return Promise.resolve(error); // Promise is used only during testing
    });
  }

  function createContext(newLicenseKey) {
    licenseKey = newLicenseKey;

    if (contextAvailable || licenseKey == null || !wasmReady) {
      return;
    }

    const licenseKeyLength = Module.lengthBytesUTF8(licenseKey) + 1;

    const licenseKeyPointer = Module._malloc(licenseKeyLength);

    Module.stringToUTF8(licenseKey, licenseKeyPointer, licenseKeyLength);

    Module._create_context(licenseKeyPointer, false);

    Module._free(licenseKeyPointer);

    contextAvailable = true;
    postMessage([
      "license-features",
      {
        hiddenScanditLogoAllowed: Module._can_hide_logo() === 1
      }
    ]);
  }

  function setSettings(newSettings) {
    settings = newSettings;
    applySettings();
  }

  function setImageSettings(newImageSettings) {
    imageSettings = newImageSettings;
    applyImageSettings();
  }

  function augmentErrorInformation(error) {
    if (error.errorCode === 260) {
      let hostname; // istanbul ignore if

      if (location.href != null && location.href.indexOf("blob:null/") === 0) {
        hostname = "localhost";
      } else {
        hostname = new URL(
          location.pathname != null && location.pathname !== "" && !location.pathname.startsWith("/")
            ? /* istanbul ignore next */
              location.pathname
            : location.origin
        ).hostname;
      } // istanbul ignore next

      if (hostname[0].startsWith("[") && hostname.endsWith("]")) {
        hostname = hostname.slice(1, -1);
      }

      error.errorMessage = error.errorMessage.replace("domain name", "domain name (".concat(hostname, ")"));
    }
  }

  function processScanWorkUnit(currentScanWorkUnit) {
    if (currentScanWorkUnit.highQualitySingleFrameMode) {
      applySettings(true);
    }

    const resultData = scanImage(currentScanWorkUnit.data);

    if (currentScanWorkUnit.highQualitySingleFrameMode) {
      applySettings(false);
    }

    const result = JSON.parse(resultData); // Important! We transfer data back even if we don't use it on the receiving end on Firefox.
    // Not doing so can result in memory and stability issues.
    // https://developer.mozilla.org/en-US/docs/Web/API/Transferable
    // https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage

    const postMessageTransfer = browserName === "Firefox" ? [currentScanWorkUnit.data.buffer] : undefined;

    if (result.error != null) {
      augmentErrorInformation(result.error);
      postMessage(
        [
          "work-error",
          {
            requestId: currentScanWorkUnit.requestId,
            error: result.error
          }
        ],
        postMessageTransfer
      );
    } else {
      // istanbul ignore else
      if (result.scanResult != null) {
        if (result.scanResult.length > 0 || fsSyncInProgress == null) {
          syncFS();
        }

        postMessage(
          [
            "work-result",
            {
              requestId: currentScanWorkUnit.requestId,
              result
            }
          ],
          postMessageTransfer
        );
      } else {
        console.error("Unrecognized Scandit Engine result:", result);
        postMessage([""], postMessageTransfer);
      }
    }
  }

  function workOnScanQueue() {
    if ((!scannerSettingsReady || !scannerImageSettingsReady) && scanQueue.length !== 0) {
      // First submitted work unit
      createContext(licenseKey);
      applySettings();
      applyImageSettings();
    }

    if (!scannerSettingsReady || !scannerImageSettingsReady || scanQueue.length === 0) {
      return;
    }

    while (scanQueue.length !== 0) {
      processScanWorkUnit(scanQueue.shift());
    }
  }

  function processParseWorkUnit(parseWorkUnit) {
    const resultData = parseString(parseWorkUnit.dataFormat, parseWorkUnit.dataString, parseWorkUnit.options);
    const result = JSON.parse(resultData);

    if (result.error != null) {
      augmentErrorInformation(result.error);
      postMessage([
        "parse-string-error",
        {
          requestId: parseWorkUnit.requestId,
          error: result.error
        }
      ]);
    } else {
      // istanbul ignore else
      if (result.result != null) {
        postMessage([
          "parse-string-result",
          {
            requestId: parseWorkUnit.requestId,
            result: result.result
          }
        ]);
      } else {
        console.error("Unrecognized Scandit Parser result:", result);
        postMessage([
          "parse-string-error",
          {
            requestId: parseWorkUnit.requestId,
            error: {
              errorCode: -1,
              errorMessage: "Unknown Scandit Parser error"
            }
          }
        ]);
      }
    }
  }

  function workOnParseQueue() {
    if (!contextAvailable && parseQueue.length !== 0) {
      // First submitted work unit
      createContext(licenseKey);
    }

    if (!contextAvailable || !wasmReady || parseQueue.length === 0) {
      return;
    }

    while (parseQueue.length !== 0) {
      processParseWorkUnit(parseQueue.shift());
    }

    syncFS();
  }

  function addScanWorkUnit(scanWorkUnit) {
    scanWorkSubmitted = true;
    scanQueue.push(scanWorkUnit);
    workOnScanQueue();
  }

  function addParseWorkUnit(parseWorkUnit) {
    parseQueue.push(parseWorkUnit);
    workOnParseQueue();
  }

  function clearSession() {
    if (scannerSettingsReady) {
      Module._scanner_session_clear();
    }
  } // Private

  function retryWithExponentialBackoff(handler, backoffMs, maxBackoffMs, singleTryRejectionCallback) {
    return new Promise(function(resolve, reject) {
      handler()
        .then(resolve)
        .catch(function(error) {
          const newBackoffMs = backoffMs * 2;

          if (newBackoffMs > maxBackoffMs) {
            return reject(error);
          }

          singleTryRejectionCallback(error);
          setTimeout(function() {
            retryWithExponentialBackoff(handler, newBackoffMs, maxBackoffMs, singleTryRejectionCallback)
              .then(resolve)
              .catch(reject);
          }, backoffMs);
        });
    });
  }

  function getLibraryLocationURIs(libraryLocation) {
    let cdnURI = false;

    if (/^https?:\/\/([^\/.]*\.)*cdn.jsdelivr.net\//.test(libraryLocation)) {
      libraryLocation = "https://cdn.jsdelivr.net/npm/scandit-sdk@4.6.1/build/";
      cdnURI = true;
    } else if (/^https?:\/\/([^\/.]*\.)*unpkg.com\//.test(libraryLocation)) {
      libraryLocation = "https://unpkg.com/scandit-sdk@4.6.1/build/";
      cdnURI = true;
    }

    if (cdnURI) {
      return {
        jsURI: "".concat(libraryLocation, "scandit-engine-sdk.min.js"),
        wasmURI: "".concat(libraryLocation, "scandit-engine-sdk.wasm")
      };
    }

    return {
      jsURI: "".concat(libraryLocation, "scandit-engine-sdk.min.js?v=4.6.1"),
      wasmURI: "".concat(libraryLocation, "scandit-engine-sdk.wasm?v=4.6.1")
    };
  }

  function arrayBufferToHexString(arrayBuffer) {
    return Array.from(new Uint8Array(arrayBuffer))
      .map(function(byteNumber) {
        const byteHex = byteNumber.toString(16);
        return byteHex.length === 1
          ? /* istanbul ignore next */
            "0".concat(byteHex)
          : byteHex;
      })
      .join("");
  }

  function applySettings() {
    let highQualitySingleFrameMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (settings == null || !contextAvailable || !wasmReady || !scanWorkSubmitted) {
      return;
    }

    scannerSettingsReady = false;
    const parsedSettings = JSON.parse(settings);
    const settingsLength = Module.lengthBytesUTF8(settings) + 1;

    const settingsPointer = Module._malloc(settingsLength);

    Module.stringToUTF8(settings, settingsPointer, settingsLength);

    const resultPointer = Module._scanner_settings_new_from_json(
      settingsPointer,
      parsedSettings.blurryRecognition,
      parsedSettings.matrixScanEnabled,
      highQualitySingleFrameMode,
      gpuAccelerationAvailable && parsedSettings.gpuAcceleration
    );

    Module._free(settingsPointer);

    const result = Module.UTF8ToString(resultPointer);

    if (result !== "") {
      scannerSettingsReady = true;
      console.debug(JSON.parse(result));
    }
  }

  function applyImageSettings() {
    if (imageSettings == null || !wasmReady || !scanWorkSubmitted) {
      return;
    }

    scannerImageSettingsReady = false;
    let channels; // TODO: For now it's not possible to use imported variables as the worker doesn't have access at runtime

    if (imageSettings.format.valueOf() === 1) {
      // RGB_8U
      channels = 3;
    } else if (imageSettings.format.valueOf() === 2) {
      // RGBA_8U
      channels = 4;
    } else {
      // GRAY_8U
      channels = 1;
    }

    Module._scanner_image_settings_new(imageSettings.width, imageSettings.height, channels);

    if (imageBufferPointer != null) {
      Module._free(imageBufferPointer);

      imageBufferPointer = undefined;
    }

    imageBufferPointer = Module._malloc(imageSettings.width * imageSettings.height * channels);
    scannerImageSettingsReady = true;
  }

  function scanImage(imageData) {
    Module.HEAPU8.set(imageData, imageBufferPointer);
    return Module.UTF8ToString(Module._scanner_scan(imageBufferPointer));
  }

  function parseString(dataFormat, dataString, options) {
    const dataStringLength = Module.lengthBytesUTF8(dataString) + 1;

    const dataStringPointer = Module._malloc(dataStringLength);

    Module.stringToUTF8(dataString, dataStringPointer, dataStringLength);
    const optionsLength = Module.lengthBytesUTF8(options) + 1;

    const optionsPointer = Module._malloc(optionsLength);

    Module.stringToUTF8(options, optionsPointer, optionsLength);

    const resultPointer = Module._parser_parse_string(
      dataFormat.valueOf(),
      dataStringPointer,
      dataStringLength - 1,
      optionsPointer
    );

    Module._free(dataStringPointer);

    Module._free(optionsPointer);

    return Module.UTF8ToString(resultPointer);
  }

  function verifiedWasmFetch(wasmURI, awaitFullResponse) {
    function verifyResponseData(responseData) {
      // istanbul ignore else
      if (crypto.subtle != null && typeof crypto.subtle === "object" && typeof crypto.subtle.digest === "function") {
        crypto.subtle.digest("SHA-256", responseData).then(function(hash) {
          const hashString = arrayBufferToHexString(hash); // istanbul ignore if

          if (hashString !== "5b0d98f64fbb1ae195263e35d905f965a2cafec2f48f1125337a62f8236c75f1") {
            console.error(
              "The Scandit SDK Engine library WASM file found at ".concat(wasmURI, " seems invalid: ") +
                "expected file hash doesn't match (received: ".concat(hashString, ", ") +
                "expected: ".concat("5b0d98f64fbb1ae195263e35d905f965a2cafec2f48f1125337a62f8236c75f1", "). ") +
                "Please ensure the correct Scandit SDK Engine file (with correct version) is retrieved."
            );
          }
        });
      } else {
        console.warn(
          "Insecure origin (see https://goo.gl/Y0ZkNV): " +
            "The hash of the Scandit SDK Engine library WASM file found at ".concat(wasmURI, " could not be verified")
        );
      }
    }

    function tryFetch() {
      return new Promise(function(resolve, reject) {
        fetch(wasmURI)
          .then(function(response) {
            // istanbul ignore else
            if (response.ok) {
              response
                .clone()
                .arrayBuffer()
                .then(function(responseData) {
                  if (awaitFullResponse) {
                    resolve(response);
                  }

                  verifyResponseData(responseData);
                })
                .catch(
                  // istanbul ignore next
                  function(error) {
                    if (awaitFullResponse) {
                      reject(error);
                    }
                  }
                );

              if (!awaitFullResponse) {
                resolve(response);
              }
            } else {
              reject(new Error("HTTP status code is not ok"));
            }
          })
          .catch(function(error) {
            reject(error);
          });
      });
    }

    return retryWithExponentialBackoff(tryFetch, 250, 4000, function(error) {
      console.warn(error);
      console.warn("Couldn't retrieve Scandit SDK Engine library at ".concat(wasmURI, ", retrying..."));
    }).catch(function(error) {
      console.error(error);
      console.error(
        "Couldn't retrieve/instantiate Scandit SDK Engine library at ".concat(wasmURI, ", ") +
          "did you configure the path for it correctly?"
      );
      return Promise.reject(error);
    });
  }

  function instantiateWebAssembly(importObject, wasmURI, successCallback) {
    verifiedWasmFetch(wasmURI, true)
      .then(function(response) {
        return response.arrayBuffer();
      })
      .then(function(bytes) {
        return self.WebAssembly.instantiate(bytes, importObject)
          .then(function(results) {
            successCallback(results.instance);
          })
          .catch(function(error) {
            console.error(error);
            console.error(
              "Couldn't instantiate Scandit SDK Engine library at ".concat(wasmURI, ", ") +
                "did you configure the path for it correctly?"
            );
          });
      })
      .catch(
        /* istanbul ignore next */
        function() {
          // Ignored
        }
      );
  }

  function instantiateWebAssemblyStreaming(importObject, wasmURI, successCallback) {
    verifiedWasmFetch(wasmURI, false)
      .then(function(response) {
        self.WebAssembly.instantiateStreaming(response, importObject)
          .then(function(results) {
            successCallback(results.instance);
          })
          .catch(function(error) {
            console.warn(error);
            console.warn(
              "WebAssembly streaming compile failed. " +
                "Falling back to ArrayBuffer instantiation (this will make things slower)"
            );
            instantiateWebAssembly(importObject, wasmURI, successCallback);
          });
      })
      .catch(
        /* istanbul ignore next */
        function() {
          // Ignored
        }
      );
  }

  function syncFS() {
    // istanbul ignore if
    if (fsSyncInProgress === true) {
      fsSyncScheduled = true;
    } else {
      fsSyncInProgress = true;
      fsSyncScheduled = false;
      FS.syncfs(false, function() {
        fsSyncInProgress = false; // istanbul ignore if

        if (fsSyncScheduled) {
          syncFS();
        }
      });
    }
  }

  return {
    loadLibrary,
    createContext,
    setSettings,
    setImageSettings,
    workOnScanQueue,
    workOnParseQueue,
    addScanWorkUnit,
    addParseWorkUnit,
    clearSession
  };
}
/**
 * @hidden
 */
// istanbul ignore next

function engineWorkerFunction() {
  const engineInstance = engine();

  onmessage = function onmessage(e) {
    // Setting settings triggers license verification and activation: delay until first frame processed
    // tslint:disable:no-reserved-keywords max-union-size
    const data = e.data; // tslint:enable:no-reserved-keywords max-union-size

    switch (data.type) {
      case "load-library":
        // tslint:disable-next-line: no-floating-promises
        engineInstance.loadLibrary(
          data.deviceId,
          data.libraryLocation,
          data.path,
          data.deviceModelName,
          data.uaBrowserName
        );
        break;

      case "license-key":
        engineInstance.createContext(data.licenseKey);
        engineInstance.workOnParseQueue();
        break;

      case "settings":
        engineInstance.setSettings(data.settings);
        engineInstance.workOnScanQueue();
        break;

      case "image-settings":
        engineInstance.setImageSettings(data.imageSettings);
        engineInstance.workOnScanQueue();
        break;

      case "work":
        engineInstance.addScanWorkUnit({
          requestId: data.requestId,
          data: data.data,
          highQualitySingleFrameMode: data.highQualitySingleFrameMode
        });
        break;

      case "parse-string":
        engineInstance.addParseWorkUnit({
          requestId: data.requestId,
          dataFormat: data.dataFormat,
          dataString: data.dataString,
          options: data.options
        });
        break;

      case "clear-session":
        engineInstance.clearSession();
        break;
    }
  };
}
/**
 * @hidden
 */

const engineWorkerBlob = new Blob(
  ["var Module;".concat(engine.toString(), "(").concat(engineWorkerFunction.toString(), ")()")],
  {
    type: "text/javascript"
  }
);

/**
 * A data string parser.
 *
 * Parsers are capable of parsing one particular data format, which is passed to them during construction.
 *
 * The parser is created through [[BarcodePicker.createParserForFormat]] or [[Scanner.createParserForFormat]].
 * Note that you need to have a valid license with the parsing feature enabled to use the parser functionalities.
 *
 * For documentation on the available formats, check the official parser library documentation here:
 * https://docs.scandit.com/parser/formats.html.
 */
var Parser =
  /*#__PURE__*/
  (function() {
    /**
     * @hidden
     *
     * @param scanner The [[Scanner]] object used to interact with the external Scandit library.
     * @param dataFormat The data format for this parser.
     */
    function Parser(scanner, dataFormat) {
      classCallCheck(this, Parser);

      this.scanner = scanner;
      this.dataFormat = dataFormat;
    }
    /**
     * Apply the option map to the parser, allowing the user to fine-tune the behaviour of the parser.
     * Available options depend on the data format and are specified in the respective documentation.
     *
     * @param options The new options to be applied (replacing previous ones, if any).
     */

    createClass(Parser, [
      {
        key: "setOptions",
        value: function setOptions(options) {
          this.options = options;
        }
        /**
         * Process the given raw data with the parser, retrieving the result as a [[ParserResult]] object.
         *
         * Multiple requests done without waiting for previous results will be queued and handled in order.
         *
         * If parsing of the data fails the returned promise is rejected with a `ScanditEngineError` error.
         *
         * @param dataRaw The raw data to be parsed.
         * @returns A promise resolving to the [[ParserResult]] object.
         */
      },
      {
        key: "parseRawData",
        value: function parseRawData(dataRaw) {
          var dataString = "";

          try {
            dataRaw.forEach(function(byte) {
              dataString += String.fromCharCode(byte);
            });
            dataString = decodeURIComponent(escape(dataString));
          } catch (_unused) {
            dataString = "";
          }

          return this.scanner.parseString(this.dataFormat, dataString, this.options);
        }
        /**
         * Process the given string data with the parser, retrieving the result as a [[ParserResult]] object.
         *
         * Multiple requests done without waiting for previous results will be queued and handled in order.
         *
         * If parsing of the data fails the returned promise is rejected with a `ScanditEngineError` error.
         *
         * @param dataString The string to be parsed.
         * @returns A promise resolving to the [[ParserResult]] object.
         */
      },
      {
        key: "parseString",
        value: function parseString(dataString) {
          return this.scanner.parseString(this.dataFormat, dataString, this.options);
        }
      }
    ]);

    return Parser;
  })(); // istanbul ignore next

(function(Parser) {
  /**
   * Data format of a string to be parsed into a set of key-value mappings by the Scandit Parser Library.
   *
   * See https://docs.scandit.com/parser/formats.html for more details.
   */
  var DataFormat;

  (function(DataFormat) {
    /**
     * GS1 Application Identifier (AI).
     *
     * See: http://www.gs1.org/docs/barcodes/GS1_General_Specifications.pdf.
     */
    DataFormat[(DataFormat["GS1_AI"] = 1)] = "GS1_AI";
    /**
     * Health Industry Bar Code (HIBC).
     *
     * See: http://www.hibcc.org.
     */

    DataFormat[(DataFormat["HIBC"] = 2)] = "HIBC";
    /**
     * AAMVA Driver License/Identification (DL/ID).
     *
     * See: http://www.aamva.org.
     */

    DataFormat[(DataFormat["DLID"] = 3)] = "DLID";
    /**
     * ICAO Machine Readable Travel Document (MRTD).
     *
     * See: https://www.icao.int.
     */

    DataFormat[(DataFormat["MRTD"] = 4)] = "MRTD";
    /**
     * Swiss QR ISO 20022.
     *
     * See: https://www.paymentstandards.ch.
     */

    DataFormat[(DataFormat["SWISSQR"] = 5)] = "SWISSQR";
  })((DataFormat = Parser.DataFormat || (Parser.DataFormat = {})));
})(Parser || (Parser = {}));

var SET = "Set";

// 23.2 Set Objects
var es6_set = _collection(
  SET,
  function(get) {
    return function Set() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  },
  {
    // 23.2.3.1 Set.prototype.add(value)
    add: function add(value) {
      return _collectionStrong.def(_validateCollection(this, SET), (value = value === 0 ? 0 : value), value);
    }
  },
  _collectionStrong
);

// https://github.com/DavidBruant/Map-Set.prototype.toJSON

_export(_export.P + _export.R, "Set", { toJSON: _collectionToJson("Set") });

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
_setCollectionOf("Set");

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
_setCollectionFrom("Set");

var set = _core.Set;

var set$1 = set;

/**
 * A result of a scanning operation on an image.
 */
var ScanResult =
  /*#__PURE__*/
  (function() {
    /**
     * @hidden
     *
     * Create a ScanResult instance.
     *
     * @param barcodes The list of barcodes found in the image.
     * @param imageData The image data given as a byte array, formatted accordingly to the set settings.
     * @param imageSettings The configuration object defining the properties of the processed image.
     */
    function ScanResult(barcodes, imageData, imageSettings) {
      classCallCheck(this, ScanResult);

      this.barcodes = barcodes;
      this.imageData = imageData;
      this.imageSettings = imageSettings;
      this.rejectedCodes = new set$1();
    }
    /**
     * Prevent playing a sound, vibrating or flashing the GUI for a particular code.
     * If all codes in the result are rejected (or no barcode is present), sound, vibration and GUI flashing will be
     * suppressed.
     *
     * Rejected codes will still be part of the [[ScanResult.barcodes]] property like all other codes.
     *
     * @param barcode The barcode to be rejected.
     */

    createClass(ScanResult, [
      {
        key: "rejectCode",
        value: function rejectCode(barcode) {
          this.rejectedCodes.add(barcode);
        }
      }
    ]);

    return ScanResult;
  })();

var core_getIterator = (_core.getIterator = function(it) {
  var iterFn = core_getIteratorMethod(it);
  if (typeof iterFn != "function") throw TypeError(it + " is not iterable!");
  return _anObject(iterFn.call(it));
});

var getIterator = core_getIterator;

var getIterator$1 = getIterator;

var isEnum$1 = _objectPie.f;
var _objectToArray = function(isEntries) {
  return function(it) {
    var O = _toIobject(it);
    var keys = _objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!_descriptors || isEnum$1.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

// https://github.com/tc39/proposal-object-values-entries

var $values = _objectToArray(false);

_export(_export.S, "Object", {
  values: function values(it) {
    return $values(it);
  }
});

var values = _core.Object.values;

var values$1 = values;

/**
 * A symbology-specific configuration object.
 *
 * See https://docs.scandit.com/stable/c_api/symbologies.html for more details.
 */
var SymbologySettings =
  /*#__PURE__*/
  (function() {
    /**
     * Create a SymbologySettings instance.
     *
     * @param enabled <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the symbology is enabled for recognition.
     * @param colorInvertedEnabled <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether color inverted recognition is enabled.
     * @param activeSymbolCounts
     * <div class="tsd-signature-symbol">Default =&nbsp;[] &nbsp;(default symbology range)</div>
     * The list of active symbol counts.
     * @param extensions
     * <div class="tsd-signature-symbol">Default =&nbsp;undefined &nbsp;(default symbology extensions)</div>
     * The list/set of enabled extensions.
     * @param checksums
     * <div class="tsd-signature-symbol">Default =&nbsp;undefined &nbsp;(default symbology checksums)</div>
     * The list/set of enabled checksums.
     */
    function SymbologySettings() {
      var _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$enabled = _ref.enabled,
        enabled = _ref$enabled === void 0 ? false : _ref$enabled,
        _ref$colorInvertedEna = _ref.colorInvertedEnabled,
        colorInvertedEnabled = _ref$colorInvertedEna === void 0 ? false : _ref$colorInvertedEna,
        _ref$activeSymbolCoun = _ref.activeSymbolCounts,
        activeSymbolCounts = _ref$activeSymbolCoun === void 0 ? [] : _ref$activeSymbolCoun,
        extensions = _ref.extensions,
        checksums = _ref.checksums;

      classCallCheck(this, SymbologySettings);

      this.enabled = enabled;
      this.colorInvertedEnabled = colorInvertedEnabled;
      this.activeSymbolCounts = activeSymbolCounts;
      this.customExtensions = extensions != null;
      this.customChecksums = checksums != null;

      if (extensions == null) {
        extensions = [];
      }

      if (checksums == null) {
        checksums = [];
      }

      this.extensions = new set$1(
        from_1$1(extensions).filter(function(extension) {
          return _this.isValidExtension(extension);
        })
      );
      this.checksums = new set$1(
        from_1$1(checksums).filter(function(checksum) {
          return _this.isValidChecksum(checksum);
        })
      );
    }
    /**
     * @returns Whether the symbology enabled for recognition.
     */

    createClass(SymbologySettings, [
      {
        key: "isEnabled",
        value: function isEnabled() {
          return this.enabled;
        }
        /**
         * Enable or disable recognition of the symbology.
         *
         * @param enabled Whether the symbology is enabled for recognition.
         * @returns The updated [[SymbologySettings]] object.
         */
      },
      {
        key: "setEnabled",
        value: function setEnabled(enabled) {
          this.enabled = enabled;
          return this;
        }
        /**
         * @returns Whether color inverted recognition is enabled.
         */
      },
      {
        key: "isColorInvertedEnabled",
        value: function isColorInvertedEnabled() {
          return this.colorInvertedEnabled;
        }
        /**
         * Enable or disable recognition of inverted-color symbology (in addition to normal colors).
         *
         * @param enabled Whether color inverted recognition is enabled.
         * @returns The updated [[SymbologySettings]] object.
         */
      },
      {
        key: "setColorInvertedEnabled",
        value: function setColorInvertedEnabled(enabled) {
          this.colorInvertedEnabled = enabled;
          return this;
        }
        /**
         * Get the currently set custom list of active symbol counts.
         * If never set, an empty array is returned
         * but the Scandit Engine library will use the default list for the symbology.
         *
         * @returns The list of active symbol counts.
         */
      },
      {
        key: "getActiveSymbolCounts",
        value: function getActiveSymbolCounts() {
          return this.activeSymbolCounts;
        }
        /**
         * Set the list of active symbol counts.
         *
         * @param activeSymbolCounts The list of active symbol counts.
         * @returns The updated [[SymbologySettings]] object.
         */
      },
      {
        key: "setActiveSymbolCounts",
        value: function setActiveSymbolCounts(activeSymbolCounts) {
          this.activeSymbolCounts = activeSymbolCounts;
          return this;
        }
        /**
         * Set the (inclusive) range of active symbol counts.
         *
         * @param minCount The minimum accepted number of symbols.
         * @param maxCount The maximum accepted number of symbols.
         * @returns The updated [[SymbologySettings]] object.
         */
      },
      {
        key: "setActiveSymbolCountsRange",
        value: function setActiveSymbolCountsRange(minCount, maxCount) {
          this.activeSymbolCounts = from_1$1(
            {
              length: maxCount - minCount + 1
            },
            function(_, k) {
              return k + minCount;
            }
          );
          return this;
        }
        /**
         * Get the currently set custom set of extensions.
         * If never set, an empty set is returned
         * but the Scandit Engine library will use the default extension set for the symbology.
         *
         * @returns The set of enabled extensions.
         */
      },
      {
        key: "getEnabledExtensions",
        value: function getEnabledExtensions() {
          return this.extensions;
        }
        /**
         * Enable an extension or list/set of extensions
         *
         * @param extension The single extension or list/set of extensions to enable.
         * @returns The updated [[SymbologySettings]] object.
         */
      },
      {
        key: "enableExtensions",
        value: function enableExtensions(extension) {
          var _this2 = this;

          this.customExtensions = true;

          if (_typeof_1(extension) === "object") {
            this.extensions = new set$1(
              [].concat(
                toConsumableArray(this.extensions),
                toConsumableArray(
                  from_1$1(extension).filter(function(e) {
                    return _this2.isValidExtension(e);
                  })
                )
              )
            );
          } else {
            if (this.isValidExtension(extension)) {
              this.extensions.add(extension);
            }
          }

          return this;
        }
        /**
         * Disable an extension or list/set of extensions.
         *
         * @param extension The single extension or list/set of extensions to disable.
         * @returns The updated [[SymbologySettings]] object.
         */
      },
      {
        key: "disableExtensions",
        value: function disableExtensions(extension) {
          if (_typeof_1(extension) === "object") {
            this.extensions = new set$1(
              toConsumableArray(this.extensions).filter(function(x) {
                return extension instanceof Array ? !extension.includes(x) : !extension.has(x);
              })
            );
          } else {
            this.extensions.delete(extension);
          }

          return this;
        }
        /**
         * Get the currently set custom set of checksums.
         * If never set, an empty set is returned
         * but the Scandit Engine library will use the default checksum set for the symbology.
         *
         * @returns The set of enabled checksums.
         */
      },
      {
        key: "getEnabledChecksums",
        value: function getEnabledChecksums() {
          return this.checksums;
        }
        /**
         * Enable a checksum or list/set of checksums.
         *
         * @param checksum The single checksum or list/set of checksums to enable.
         * @returns The updated [[SymbologySettings]] object.
         */
      },
      {
        key: "enableChecksums",
        value: function enableChecksums(checksum) {
          var _this3 = this;

          this.customChecksums = true;

          if (_typeof_1(checksum) === "object") {
            this.checksums = new set$1(
              [].concat(
                toConsumableArray(this.checksums),
                toConsumableArray(
                  from_1$1(checksum).filter(function(c) {
                    return _this3.isValidChecksum(c);
                  })
                )
              )
            );
          } else {
            if (this.isValidChecksum(checksum)) {
              this.checksums.add(checksum);
            }
          }

          return this;
        }
        /**
         * Disable a checksum or list/set of checksums.
         *
         * @param checksum The single checksum or list/set of checksums to disable.
         * @returns The updated [[SymbologySettings]] object.
         */
      },
      {
        key: "disableChecksums",
        value: function disableChecksums(checksum) {
          if (_typeof_1(checksum) === "object") {
            this.checksums = new set$1(
              toConsumableArray(this.checksums).filter(function(x) {
                return checksum instanceof Array ? !checksum.includes(x) : !checksum.has(x);
              })
            );
          } else {
            this.checksums.delete(checksum);
          }

          return this;
        }
      },
      {
        key: "toJSON",
        value: function toJSON() {
          return {
            enabled: this.enabled,
            colorInvertedEnabled: this.colorInvertedEnabled,
            activeSymbolCounts: this.activeSymbolCounts.length === 0 ? undefined : this.activeSymbolCounts,
            extensions: this.customExtensions ? from_1$1(this.extensions) : undefined,
            checksums: this.customChecksums ? from_1$1(this.checksums) : undefined
          };
        }
      },
      {
        key: "isValidExtension",
        value: function isValidExtension(extension) {
          return (
            extension in SymbologySettings.Extension ||
            values$1(SymbologySettings.Extension).includes(extension.toLowerCase())
          );
        }
      },
      {
        key: "isValidChecksum",
        value: function isValidChecksum(checksum) {
          return (
            checksum in SymbologySettings.Checksum ||
            values$1(SymbologySettings.Checksum).includes(checksum.toLowerCase())
          );
        }
      }
    ]);

    return SymbologySettings;
  })(); // istanbul ignore next

(function(SymbologySettings) {
  /**
   * Symbology extensions for particular functionalities, only applicable to specific barcodes.
   * See: https://docs.scandit.com/stable/c_api/symbologies.html.
   */
  var Extension;

  (function(Extension) {
    /**
     * Improve scan performance when reading direct part marked (DPM) Data Matrix codes.
     * Enabling this extension comes at the cost of increased frame processing times.
     */
    Extension["DIRECT_PART_MARKING_MODE"] = "direct_part_marking_mode";
    /**
     * Interpret the Code 39 / Code 93 code data using two symbols per output character to encode all ASCII characters.
     */

    Extension["FULL_ASCII"] = "full_ascii";
    /**
     * Enable scanning codes that have quiet zones (white area before and after the code) significantly smaller
     * than what's allowed by the symbology specification.
     */

    Extension["RELAXED_SHARP_QUIET_ZONE_CHECK"] = "relaxed_sharp_quiet_zone_check";
    /**
     * Remove the leading zero digit from the result.
     */

    Extension["REMOVE_LEADING_ZERO"] = "remove_leading_zero";
    /**
     * Remove the leading zero digit from the result if the UPC-A representation extension "RETURN_AS_UPCA" is enabled.
     */

    Extension["REMOVE_LEADING_UPCA_ZERO"] = "remove_leading_upca_zero";
    /**
     * Transform the UPC-E result into its UPC-A representation.
     */

    Extension["RETURN_AS_UPCA"] = "return_as_upca";
    /**
     * Remove the leading FNC1 character that indicates a GS1 code.
     */

    Extension["STRIP_LEADING_FNC1"] = "strip_leading_fnc1";
  })((Extension = SymbologySettings.Extension || (SymbologySettings.Extension = {})));
  /**
   * Checksum algorithms, only applicable to specific barcodes.
   * See: https://docs.scandit.com/stable/c_api/symbologies.html.
   */

  var Checksum;

  (function(Checksum) {
    /**
     * Modulo 10 checksum.
     */
    Checksum["MOD_10"] = "mod10";
    /**
     * Modulo 11 checksum.
     */

    Checksum["MOD_11"] = "mod11";
    /**
     * Modulo 16 checksum.
     */

    Checksum["MOD_16"] = "mod16";
    /**
     * Modulo 43 checksum.
     */

    Checksum["MOD_43"] = "mod43";
    /**
     * Modulo 47 checksum.
     */

    Checksum["MOD_47"] = "mod47";
    /**
     * Modulo 103 checksum.
     */

    Checksum["MOD_103"] = "mod103";
    /**
     * Two modulo 10 checksums.
     */

    Checksum["MOD_1010"] = "mod1010";
    /**
     * Modulo 11 and modulo 10 checksum.
     */

    Checksum["MOD_1110"] = "mod1110";
  })((Checksum = SymbologySettings.Checksum || (SymbologySettings.Checksum = {})));
})(SymbologySettings || (SymbologySettings = {}));

/**
 * A configuration object for scanning options.
 *
 * Modified ScanSettings need to be applied to a scanner via
 * [[BarcodePicker.applyScanSettings]] or [[Scanner.applyScanSettings]] to take effect.
 */

var ScanSettings =
  /*#__PURE__*/
  (function() {
    /**
     * Create a ScanSettings instance.
     *
     * @param enabledSymbologies <div class="tsd-signature-symbol">Default =&nbsp;[]</div>
     * The single symbology or list/set of symbologies that should be initialized as enabled for recognition.
     * @param codeDuplicateFilter <div class="tsd-signature-symbol">Default =&nbsp;0</div>
     * The duplicate filter specifying how often a code can be scanned.
     * When the filter is set to -1, each unique code is only scanned once. When set to 0,
     * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
     * When the same code (data/symbology) is scanned within the specified interval it is filtered out as a duplicate.
     * @param maxNumberOfCodesPerFrame <div class="tsd-signature-symbol">Default =&nbsp;1</div>
     * The maximum number of barcodes to be recognized every frame.
     * @param searchArea <div class="tsd-signature-symbol">Default =&nbsp;{ x: 0, y: 0, width: 1.0, height: 1.0 }</div>
     * The area of the image in which barcodes are searched.
     * @param gpuAcceleration <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to enable/disable GPU support via WebGL, to provide faster and more accurate barcode localization.
     * The GPU can and will be used only if the browser also supports the needed technologies
     * ([WebGL](https://caniuse.com/#feat=webgl) and [OffscreenCanvas](https://caniuse.com/#feat=offscreencanvas)).
     * @param blurryRecognition <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to enable/disable blurry recognition, to allow accurate scanning capabilities for out-of-focus (1D) codes.
     * If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order
     * to successfully decode/scan difficult codes.
     */
    function ScanSettings() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$enabledSymbologi = _ref.enabledSymbologies,
        enabledSymbologies = _ref$enabledSymbologi === void 0 ? [] : _ref$enabledSymbologi,
        _ref$codeDuplicateFil = _ref.codeDuplicateFilter,
        codeDuplicateFilter = _ref$codeDuplicateFil === void 0 ? 0 : _ref$codeDuplicateFil,
        _ref$maxNumberOfCodes = _ref.maxNumberOfCodesPerFrame,
        maxNumberOfCodesPerFrame = _ref$maxNumberOfCodes === void 0 ? 1 : _ref$maxNumberOfCodes,
        _ref$searchArea = _ref.searchArea,
        searchArea =
          _ref$searchArea === void 0
            ? {
                x: 0,
                y: 0,
                width: 1.0,
                height: 1.0
              }
            : _ref$searchArea,
        _ref$gpuAcceleration = _ref.gpuAcceleration,
        gpuAcceleration = _ref$gpuAcceleration === void 0 ? true : _ref$gpuAcceleration,
        _ref$blurryRecognitio = _ref.blurryRecognition,
        blurryRecognition = _ref$blurryRecognitio === void 0 ? true : _ref$blurryRecognitio;

      classCallCheck(this, ScanSettings);

      this.symbologySettings = new map$1();
      this.enableSymbologies(enabledSymbologies);
      this.codeDuplicateFilter = codeDuplicateFilter;
      this.maxNumberOfCodesPerFrame = maxNumberOfCodesPerFrame;
      this.baseSearchArea = {
        x: 0,
        y: 0,
        width: 1.0,
        height: 1.0
      };
      this.searchArea = searchArea;
      this.gpuAcceleration = gpuAcceleration;
      this.blurryRecognition = blurryRecognition;
      this.properties = new map$1();
    }
    /**
     * @returns The configuration object as a JSON string.
     */

    createClass(ScanSettings, [
      {
        key: "toJSONString",
        value: function toJSONString() {
          var symbologies = {};
          this.symbologySettings.forEach(function(symbologySettings, symbology) {
            symbologies[Barcode.Symbology.toJSONName(symbology)] = symbologySettings;
          });
          var properties = {};
          this.properties.forEach(function(value, key) {
            properties[key] = value;
          });
          var combinedSearchArea = {
            x: Math.min(1, this.baseSearchArea.x + this.searchArea.x * this.baseSearchArea.width),
            y: Math.min(1, this.baseSearchArea.y + this.searchArea.y * this.baseSearchArea.height),
            width: Math.min(1, this.baseSearchArea.width * this.searchArea.width),
            height: Math.min(1, this.baseSearchArea.height * this.searchArea.height)
          };
          var isFullSearchArea =
            Math.round(combinedSearchArea.x * 100) === 0 &&
            Math.round(combinedSearchArea.y * 100) === 0 &&
            Math.round(combinedSearchArea.width * 100) === 100 &&
            Math.round(combinedSearchArea.height * 100) === 100;
          return stringify$1({
            symbologies: symbologies,
            codeDuplicateFilter: this.codeDuplicateFilter,
            maxNumberOfCodesPerFrame: this.maxNumberOfCodesPerFrame,
            searchArea: combinedSearchArea,
            codeLocation1d: isFullSearchArea
              ? undefined
              : {
                  area: {
                    x: combinedSearchArea.x,
                    y: combinedSearchArea.y + (combinedSearchArea.height * 0.75) / 2,
                    width: combinedSearchArea.width,
                    height: combinedSearchArea.height * 0.25
                  }
                },
            codeLocation2d: isFullSearchArea
              ? undefined
              : {
                  area: combinedSearchArea
                },
            gpuAcceleration: this.gpuAcceleration,
            blurryRecognition: this.blurryRecognition,
            properties: properties
          });
        }
        /**
         * Get the configuration object for a symbology (which can then be modified).
         *
         * @param symbology The symbology for which to retrieve the configuration.
         * @returns The symbology configuration object for the specified symbology.
         */
      },
      {
        key: "getSymbologySettings",
        value: function getSymbologySettings(symbology) {
          if (this.symbologySettings.has(symbology)) {
            return this.symbologySettings.get(symbology);
          } else {
            if (symbology in Barcode.Symbology || values$1(Barcode.Symbology).includes(symbology)) {
              this.symbologySettings.set(symbology, new SymbologySettings());
              return this.symbologySettings.get(symbology);
            } else {
              throw new TypeError('Invalid symbology "'.concat(symbology, '"'));
            }
          }
        }
        /**
         * Get the recognition enabled status for a symbology.
         *
         * @param symbology The symbology for which to retrieve the recognition enabled status.
         * @returns Whether the symbology enabled for recognition.
         */
      },
      {
        key: "isSymbologyEnabled",
        value: function isSymbologyEnabled(symbology) {
          return this.getSymbologySettings(symbology).isEnabled();
        }
        /**
         * Enable recognition of a symbology or list/set of symbologies.
         *
         * @param symbology The single symbology or list/set of symbologies to enable.
         * @returns The updated [[ScanSettings]] object.
         */
      },
      {
        key: "enableSymbologies",
        value: function enableSymbologies(symbology) {
          return this.setSymbologiesEnabled(symbology, true);
        }
        /**
         * Disable recognition of a symbology or list/set of symbologies.
         *
         * @param symbology The single symbology or list/set of symbologies to disable.
         * @returns The updated [[ScanSettings]] object.
         */
      },
      {
        key: "disableSymbologies",
        value: function disableSymbologies(symbology) {
          return this.setSymbologiesEnabled(symbology, false);
        }
        /**
         * When the filter is set to -1, each unique code is only scanned once. When set to 0,
         * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
         *
         * @returns The code duplicate filter value.
         */
      },
      {
        key: "getCodeDuplicateFilter",
        value: function getCodeDuplicateFilter() {
          return this.codeDuplicateFilter;
        }
        /**
         * Set the code duplicate filter value.
         *
         * When the filter is set to -1, each unique code is only scanned once. When set to 0,
         * duplicate filtering is disabled. Otherwise the duplicate filter specifies an interval in milliseconds.
         *
         * @param durationMilliseconds The new value (-1, 0, or positive integer).
         * @returns The updated [[ScanSettings]] object.
         */
      },
      {
        key: "setCodeDuplicateFilter",
        value: function setCodeDuplicateFilter(durationMilliseconds) {
          this.codeDuplicateFilter = durationMilliseconds;
          return this;
        }
        /**
         * @returns The maximum number of barcodes to be recognized every frame.
         */
      },
      {
        key: "getMaxNumberOfCodesPerFrame",
        value: function getMaxNumberOfCodesPerFrame() {
          return this.maxNumberOfCodesPerFrame;
        }
        /**
         * Set the maximum number of barcodes to be recognized every frame.
         *
         * @param limit The new value (non-zero positive integer).
         * @returns The updated [[ScanSettings]] object.
         */
      },
      {
        key: "setMaxNumberOfCodesPerFrame",
        value: function setMaxNumberOfCodesPerFrame(limit) {
          this.maxNumberOfCodesPerFrame = limit;
          return this;
        }
        /**
         * @returns The area of the image in which barcodes are searched.
         */
      },
      {
        key: "getSearchArea",
        value: function getSearchArea() {
          return this.searchArea;
        }
        /**
         * Set the area of the image in which barcodes are searched.
         *
         * @param searchArea The new search area.
         * @returns The updated [[ScanSettings]] object.
         */
      },
      {
        key: "setSearchArea",
        value: function setSearchArea(searchArea) {
          this.searchArea = searchArea;
          return this;
        }
        /**
         * @hidden
         *
         * @returns The base area of the image in which barcodes are searched.
         */
      },
      {
        key: "getBaseSearchArea",
        value: function getBaseSearchArea() {
          return this.baseSearchArea;
        }
        /**
         * @hidden
         *
         * Set the base area of the image in which barcodes are searched, this is set automatically by a [[BarcodePicker]]
         * and is combined with the searchArea to obtain the final combined search area.
         *
         * @param baseSearchArea The new base search area.
         * @returns The updated [[ScanSettings]] object.
         */
      },
      {
        key: "setBaseSearchArea",
        value: function setBaseSearchArea(baseSearchArea) {
          this.baseSearchArea = baseSearchArea;
          return this;
        }
        /**
         * @returns Whether GPU acceleration is configured to be enabled ot not.
         *
         * Note that this refers to the settings: depending on browser capabilities the actual GPU usage might be prevented.
         */
      },
      {
        key: "isGpuAccelerationEnabled",
        value: function isGpuAccelerationEnabled() {
          return this.gpuAcceleration;
        }
        /**
         * Enable or disable GPU acceleration.
         *
         * Provide faster and more accurate barcode localization.
         * The GPU can and will be used only if the browser also supports the needed technologies
         * ([WebGL](https://caniuse.com/#feat=webgl) and [OffscreenCanvas](https://caniuse.com/#feat=offscreencanvas)).
         *
         * @param enabled Whether to enable or disable GPU acceleration.
         * @returns The updated [[ScanSettings]] object.
         */
      },
      {
        key: "setGpuAccelerationEnabled",
        value: function setGpuAccelerationEnabled(enabled) {
          this.gpuAcceleration = enabled;
          return this;
        }
        /**
         * @returns Whether blurry recognition is configured to be enabled ot not.
         */
      },
      {
        key: "isBlurryRecognitionEnabled",
        value: function isBlurryRecognitionEnabled() {
          return this.blurryRecognition;
        }
        /**
         * Enable or disable blurry recognition.
         *
         * Allow accurate scanning capabilities for out-of-focus (1D) codes.
         * If enabled, more advanced algorithms are executed (and more resources/time is spent) every frame in order
         * to successfully decode/scan difficult codes.
         *
         * @param enabled Whether to enable or disable blurry recognition.
         * @returns The updated [[ScanSettings]] object.
         */
      },
      {
        key: "setBlurryRecognitionEnabled",
        value: function setBlurryRecognitionEnabled(enabled) {
          this.blurryRecognition = enabled;
          return this;
        }
        /**
         * Get a Scandit Engine library property.
         *
         * This function is for internal use only and any functionality that can be accessed through it can and will vanish
         * without public notice from one version to the next. Do not call this function unless you specifically have to.
         *
         * @param key The property name.
         * @returns The property value. For properties not previously set, -1 is returned.
         */
      },
      {
        key: "getProperty",
        value: function getProperty(key) {
          if (this.properties.has(key)) {
            return this.properties.get(key);
          }

          return -1;
        }
        /**
         * Set a Scandit Engine library property.
         *
         * This function is for internal use only and any functionality that can be accessed through it can and will vanish
         * without public notice from one version to the next. Do not call this function unless you specifically have to.
         *
         * @param key The property name.
         * @param value The property value.
         * @returns The updated [[ScanSettings]] object.
         */
      },
      {
        key: "setProperty",
        value: function setProperty(key, value) {
          this.properties.set(key, value);
          return this;
        }
      },
      {
        key: "setSingleSymbologyEnabled",
        value: function setSingleSymbologyEnabled(symbology, enabled) {
          if (symbology in Barcode.Symbology || values$1(Barcode.Symbology).includes(symbology)) {
            if (this.symbologySettings.has(symbology)) {
              this.symbologySettings.get(symbology).setEnabled(enabled);
            } else {
              this.symbologySettings.set(
                symbology,
                new SymbologySettings({
                  enabled: enabled
                })
              );
            }
          } else {
            throw new TypeError('Invalid symbology "'.concat(symbology, '"'));
          }
        }
      },
      {
        key: "setMultipleSymbologiesEnabled",
        value: function setMultipleSymbologiesEnabled(symbology, enabled) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (
              var _iterator = getIterator$1(symbology), _step;
              !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
              _iteratorNormalCompletion = true
            ) {
              var s = _step.value;

              if (!(s in Barcode.Symbology || values$1(Barcode.Symbology).includes(s))) {
                throw new TypeError('Invalid symbology "'.concat(s, '"'));
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (
              var _iterator2 = getIterator$1(symbology), _step2;
              !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
              _iteratorNormalCompletion2 = true
            ) {
              var _s = _step2.value;

              if (this.symbologySettings.has(_s)) {
                this.symbologySettings.get(_s).setEnabled(enabled);
              } else {
                this.symbologySettings.set(
                  _s,
                  new SymbologySettings({
                    enabled: enabled
                  })
                );
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      },
      {
        key: "setSymbologiesEnabled",
        value: function setSymbologiesEnabled(symbology, enabled) {
          if (_typeof_1(symbology) === "object") {
            this.setMultipleSymbologiesEnabled(symbology, enabled);
          } else {
            this.setSingleSymbologyEnabled(symbology, enabled);
          }

          return this;
        }
      }
    ]);

    return ScanSettings;
  })();

/**
 * A low-level scanner interacting with the external Scandit Engine library.
 * Used to set up scan / image settings and to process single image frames.
 *
 * The loading of the external Scandit Engine library which takes place on creation can take some time,
 * the [[on]] method targeting the [[ready]] event can be used to set up a listener function to be called when the
 * library is loaded and the [[isReady]] method can return the current status. The scanner will be ready to start
 * scanning when the library is fully loaded.
 *
 * In the special case where a single [[Scanner]] instance is shared between multiple active [[BarcodePicker]]
 * instances, the fairness in resource allocation for processing images between the different pickers is not guaranteed.
 */

var Scanner =
  /*#__PURE__*/
  (function() {
    /**
     * Create a Scanner instance.
     *
     * It is required to having configured the library via [[configure]] before this object can be created.
     *
     * Before processing an image the relative settings must also have been set.
     *
     * If the library has not been correctly configured yet a `LibraryNotConfiguredError` error is thrown.
     *
     * If a browser is incompatible a `UnsupportedBrowserError` error is thrown.
     *
     * @param scanSettings <div class="tsd-signature-symbol">Default =&nbsp;new ScanSettings()</div>
     * The configuration object for scanning options.
     * @param imageSettings <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The configuration object to define the properties of an image to be scanned.
     */
    function Scanner() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$scanSettings = _ref.scanSettings,
        scanSettings = _ref$scanSettings === void 0 ? new ScanSettings() : _ref$scanSettings,
        imageSettings = _ref.imageSettings;

      classCallCheck(this, Scanner);

      var browserCompatibility = BrowserHelper.checkBrowserCompatibility();

      if (!browserCompatibility.scannerSupport) {
        throw new UnsupportedBrowserError(browserCompatibility);
      }

      if (userLicenseKey == null) {
        throw new CustomError({
          name: "LibraryNotConfiguredError",
          message: "The library has not correctly been configured yet, please call 'configure' with valid parameters"
        });
      }

      this.isReadyToWork = false;
      this.workerScanQueueLength = 0;
      this.engineWorker = new Worker(URL.createObjectURL(engineWorkerBlob));
      this.engineWorker.onmessage = this.engineWorkerOnMessage.bind(this);
      this.engineWorker.postMessage({
        type: "load-library",
        deviceId: deviceId,
        libraryLocation: scanditEngineLocation,
        path: self.location.pathname,
        deviceModelName: BrowserHelper.userAgentInfo.getDevice().model,
        uaBrowserName: BrowserHelper.userAgentInfo.getBrowser().name
      });
      this.eventEmitter = new eventemitter3_1();
      this.workerParseRequestId = 0;
      this.workerScanRequestId = 0;
      this.applyLicenseKey(userLicenseKey);
      this.applyScanSettings(scanSettings);

      if (imageSettings != null) {
        this.applyImageSettings(imageSettings);
      }
    }
    /**
     * Stop the internal `WebWorker` and destroy the scanner itself; ensuring complete cleanup.
     *
     * This method should be called after you don't plan to use the scanner anymore,
     * before the object is automatically cleaned up by JavaScript.
     * The barcode picker must not be used in any way after this call.
     */

    createClass(Scanner, [
      {
        key: "destroy",
        value: function destroy() {
          if (this.engineWorker != null) {
            this.engineWorker.terminate();
          }

          this.eventEmitter.removeAllListeners();
        }
        /**
         * Apply a new set of scan settings to the scanner (replacing old settings).
         *
         * @param scanSettings The scan configuration object to be applied to the scanner.
         * @returns The updated [[Scanner]] object.
         */
      },
      {
        key: "applyScanSettings",
        value: function applyScanSettings(scanSettings) {
          this.scanSettings = scanSettings;
          this.engineWorker.postMessage({
            type: "settings",
            settings: this.scanSettings.toJSONString()
          });
          this.eventEmitter.emit("newScanSettings", this.scanSettings);
          return this;
        }
        /**
         * Apply a new set of image settings to the scanner (replacing old settings).
         *
         * @param imageSettings The image configuration object to be applied to the scanner.
         * @returns The updated [[Scanner]] object.
         */
      },
      {
        key: "applyImageSettings",
        value: function applyImageSettings(imageSettings) {
          this.imageSettings = imageSettings;
          this.engineWorker.postMessage({
            type: "image-settings",
            imageSettings: imageSettings
          });
          return this;
        }
        /**
         * Clear the scanner session.
         *
         * This removes all recognized barcodes from the scanner session and allows them to be scanned again in case a custom
         * *codeDuplicateFilter* was set in the [[ScanSettings]].
         *
         * @returns The updated [[Scanner]] object.
         */
      },
      {
        key: "clearSession",
        value: function clearSession() {
          this.engineWorker.postMessage({
            type: "clear-session"
          });
          return this;
        }
        /**
         * Process a given image using the previously set scanner and image settings,
         * recognizing codes and retrieving the result as a list of barcodes (if any).
         *
         * Multiple requests done without waiting for previous results will be queued and handled in order.
         *
         * If *highQualitySingleFrameMode* is enabled the image will be processed with really accurate internal settings,
         * resulting in much slower but more precise scanning results. This should be used only for single images not part
         * of a continuous video stream.
         *
         * Passing image data as a *Uint8ClampedArray* is the fastest option, passing a *HTMLImageElement* will incur
         * in additional operations.
         *
         * Depending on the current image settings, given *imageData* and scanning execution, any of the following errors
         * could be the rejected result of the returned promise:
         * - `NoImageSettings`
         * - `ImageSettingsDataMismatch`
         * - `ScanditEngineError`
         *
         * @param imageData The image data given as byte array or image element, complying with the previously set
         * image settings.
         * @param highQualitySingleFrameMode Whether to process the image as a high quality single frame.
         * @returns A promise resolving to the [[ScanResult]] object.
         */
      },
      {
        key: "processImage",
        value: function processImage(imageData) {
          var _this = this;

          var highQualitySingleFrameMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (this.imageSettings == null) {
            return promise$1.reject(
              new CustomError({
                name: "NoImageSettings",
                message: "No image settings set up in the scanner"
              })
            );
          }

          if (imageData instanceof HTMLImageElement) {
            if (this.imageDataConversionContext == null) {
              this.imageDataConversionContext = document.createElement("canvas").getContext("2d");
            }

            this.imageDataConversionContext.canvas.width = imageData.naturalWidth;
            this.imageDataConversionContext.canvas.height = imageData.naturalHeight;
            this.imageDataConversionContext.drawImage(imageData, 0, 0, imageData.naturalWidth, imageData.naturalHeight);
            imageData = this.imageDataConversionContext.getImageData(
              0,
              0,
              imageData.naturalWidth,
              imageData.naturalHeight
            ).data;
          }

          var channels;

          switch (this.imageSettings.format.valueOf()) {
            case ImageSettings.Format.GRAY_8U:
              channels = 1;
              break;

            case ImageSettings.Format.RGB_8U:
              channels = 3;
              break;

            case ImageSettings.Format.RGBA_8U:
              channels = 4;
              break;

            default:
              channels = 1;
              break;
          }

          if (this.imageSettings.width * this.imageSettings.height * channels !== imageData.length) {
            return promise$1.reject(
              new CustomError({
                name: "ImageSettingsDataMismatch",
                message: "The provided image data doesn't match the previously set image settings"
              })
            );
          }

          this.workerScanRequestId++;
          this.workerScanQueueLength++;
          var originalImageData = imageData.slice();
          return new promise$1(function(resolve, reject) {
            var workResultEvent = "workResult-".concat(_this.workerScanRequestId);
            var workErrorEvent = "workError-".concat(_this.workerScanRequestId);

            _this.eventEmitter.once(workResultEvent, function(workResult) {
              _this.eventEmitter.removeAllListeners(workErrorEvent);

              resolve(
                new ScanResult(
                  workResult.scanResult.map(Barcode.createFromWASMResult),
                  originalImageData,
                  _this.imageSettings
                )
              );
            });

            _this.eventEmitter.once(workErrorEvent, function(error) {
              console.error("Scandit Engine error (".concat(error.errorCode, "):"), error.errorMessage);

              _this.eventEmitter.removeAllListeners(workResultEvent);

              var errorObject = new CustomError({
                name: "ScanditEngineError",
                message: "".concat(error.errorMessage, " (").concat(error.errorCode, ")")
              });
              reject(errorObject);
            });

            _this.engineWorker.postMessage(
              {
                type: "work",
                requestId: _this.workerScanRequestId,
                data: imageData,
                highQualitySingleFrameMode: highQualitySingleFrameMode
              },
              [imageData.buffer]
            );
          });
        }
        /**
         * @returns Whether the scanner is currently busy processing an image.
         */
      },
      {
        key: "isBusyProcessing",
        value: function isBusyProcessing() {
          return this.workerScanQueueLength !== 0;
        }
        /**
         * @returns Whether the scanner has loaded the external Scandit Engine library and is ready to scan.
         */
      },
      {
        key: "isReady",
        value: function isReady() {
          return this.isReadyToWork;
        }
      },
      {
        key: "on",
        value: function on(eventName, listener) {
          if (eventName === "ready") {
            if (this.isReadyToWork) {
              listener();
            } else {
              this.eventEmitter.once(eventName, listener, this);
            }
          } else if (eventName === "licenseFeaturesReady") {
            if (this.licenseFeatures != null) {
              listener(this.licenseFeatures);
            } else {
              this.eventEmitter.once(eventName, listener, this);
            }
          } else {
            this.eventEmitter.on(eventName, listener, this);
          }

          return this;
        }
        /**
         * Add the listener function to the listeners array for the [[ready]] event, fired only once when the external
         * Scandit Engine library has been loaded and the scanner can thus start to scan barcodes.
         * If the external Scandit Engine library has already been loaded the listener is called immediately.
         *
         * No checks are made to see if the listener has already been added.
         * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
         *
         * @deprecated Use the [[on]] method instead.
         *
         * @param listener The listener function.
         * @returns The updated [[Scanner]] object.
         */
      },
      {
        key: "onReady",
        value: function onReady(listener) {
          console.warn(
            "The onReady(<listener>) method is deprecated and will be removed in the next major library version." +
              'Please use on("ready", <listener>) instead.'
          );
          return this.on("ready", listener);
        }
        /**
         * *See the [[on]] method.*
         *
         * @param eventName The name of the event to listen to.
         * @param listener The listener function.
         * @returns The updated [[Scanner]] object.
         */
      },
      {
        key: "addListener",
        value: function addListener(eventName, listener) {
          return this.on(eventName, listener);
        }
        /**
         * Create a new parser object.
         *
         * @param dataFormat The format of the input data for the parser.
         * @returns The newly created parser.
         */
      },
      {
        key: "createParserForFormat",
        value: function createParserForFormat(dataFormat) {
          return new Parser(this, dataFormat);
        }
        /**
         * Return the current image settings.
         *
         * Note that modifying this object won't directly apply these settings: the [[applyImageSettings]] method must be
         * called with the updated object.
         *
         * @returns The current image settings.
         */
      },
      {
        key: "getImageSettings",
        value: function getImageSettings() {
          return this.imageSettings;
        }
        /**
         * Return the current scan settings.
         *
         * Note that modifying this object won't directly apply these settings: the [[applyScanSettings]] method must be
         * called with the updated object.
         *
         * @returns The current scan settings.
         */
      },
      {
        key: "getScanSettings",
        value: function getScanSettings() {
          return this.scanSettings;
        }
        /**
         * @hidden
         *
         * Process a given string using the Scandit Parser library,
         * parsing the data in the given format and retrieving the result as a [[ParserResult]] object.
         *
         * Multiple requests done without waiting for previous results will be queued and handled in order.
         *
         * If parsing of the data fails the returned promise is rejected with a `ScanditEngineError` error.
         *
         * @param dataFormat The format of the given data.
         * @param dataString The string containing the data to be parsed.
         * @param options Options for the specific data format parser.
         * @returns A promise resolving to the [[ParserResult]] object.
         */
      },
      {
        key: "parseString",
        value: function parseString(dataFormat, dataString, options) {
          var _this2 = this;

          this.workerParseRequestId++;
          return new promise$1(function(resolve, reject) {
            var parseStringResultEvent = "parseStringResult-".concat(_this2.workerParseRequestId);
            var parseStringErrorEvent = "parseStringError-".concat(_this2.workerParseRequestId);

            _this2.eventEmitter.once(parseStringResultEvent, function(result) {
              _this2.eventEmitter.removeAllListeners(parseStringErrorEvent);

              var parserResult = {
                jsonString: result,
                fields: [],
                fieldsByName: {}
              };
              JSON.parse(result).forEach(function(parserField) {
                parserResult.fields.push(parserField);
                parserResult.fieldsByName[parserField.name] = parserField;
              });
              resolve(parserResult);
            });

            _this2.eventEmitter.once(parseStringErrorEvent, function(error) {
              console.error("Scandit Engine error (".concat(error.errorCode, "):"), error.errorMessage);

              _this2.eventEmitter.removeAllListeners(parseStringResultEvent);

              var errorObject = new CustomError({
                name: "ScanditEngineError",
                message: "".concat(error.errorMessage, " (").concat(error.errorCode, ")")
              });
              reject(errorObject);
            });

            _this2.engineWorker.postMessage({
              type: "parse-string",
              requestId: _this2.workerParseRequestId,
              dataFormat: dataFormat,
              dataString: dataString,
              options: options == null ? "{}" : stringify$1(options)
            });
          });
        }
        /**
         * @hidden
         *
         * Add the listener function to the listeners array for the "licenseFeaturesReady" event, fired only once
         * when the external Scandit Engine library has verified and loaded the license key and parsed its features.
         * If the license features are already available the listener is called immediately.
         *
         * No checks are made to see if the listener has already been added.
         * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
         *
         * @param listener The listener function, which will be invoked with a *licenseFeatures* object.
         * @returns The updated [[Scanner]] object.
         */
      },
      {
        key: "onLicenseFeaturesReady",
        value: function onLicenseFeaturesReady(listener) {
          return this.on("licenseFeaturesReady", listener);
        }
        /**
         * @hidden
         *
         * Add the listener function to the listeners array for the "newScanSettings" event, fired when new a new
         * [[ScanSettings]] object is applied via the [[applyScanSettings]] method.
         *
         * No checks are made to see if the listener has already been added.
         * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
         *
         * @param listener The listener function, which will be invoked with a [[ScanSettings]] object.
         * @returns The updated [[Scanner]] object.
         */
      },
      {
        key: "onNewScanSettings",
        value: function onNewScanSettings(listener) {
          return this.on("newScanSettings", listener);
        }
        /**
         * @hidden
         *
         * Remove the specified listener from the given event's listener array.
         *
         * @param eventName The name of the event from which to remove the listener.
         * @param listener The listener function to be removed.
         * @returns The updated [[Scanner]] object.
         */
      },
      {
        key: "removeListener",
        value: function removeListener(eventName, listener) {
          this.eventEmitter.removeListener(eventName, listener);
          return this;
        }
      },
      {
        key: "applyLicenseKey",
        value: function applyLicenseKey(licenseKey) {
          this.engineWorker.postMessage({
            type: "license-key",
            licenseKey: licenseKey
          });
          return this;
        }
      },
      {
        key: "engineWorkerOnMessage",
        value: function engineWorkerOnMessage(ev) {
          // tslint:disable:max-union-size
          var data = ev.data; // tslint:enable:max-union-size

          if (data[0] === "status" && data[1] === "ready") {
            this.isReadyToWork = true;
            this.eventEmitter.emit("ready");
          } else if (data[1] != null) {
            if (data[0] === "license-features") {
              this.licenseFeatures = data[1];
              this.eventEmitter.emit("licenseFeaturesReady", this.licenseFeatures);
            } else if (data[0] === "work-result") {
              this.eventEmitter.emit("workResult-".concat(data[1].requestId), data[1].result);
              this.workerScanQueueLength--;
            } else if (data[0] === "work-error") {
              this.eventEmitter.emit("workError-".concat(data[1].requestId), data[1].error);
              this.workerScanQueueLength--;
            } else if (data[0] === "parse-string-result") {
              this.eventEmitter.emit("parseStringResult-".concat(data[1].requestId), data[1].result);
            } else if (data[0] === "parse-string-error") {
              this.eventEmitter.emit("parseStringError-".concat(data[1].requestId), data[1].error);
            }
          }
        }
      }
    ]);

    return Scanner;
  })(); // istanbul ignore next

(function(Scanner) {
  /**
   * @hidden
   *
   * Fired when the external Scandit Engine library has verified and loaded the license key and parsed its features.
   *
   * @asMemberOf Scanner
   * @event
   * @param licenseFeatures The features of the used license key.
   */
  // @ts-ignore
  // declare function licenseFeaturesReady(licenseFeatures: any): void;
  /**
   * @hidden
   *
   * Fired when new a new [[ScanSettings]] object is applied via the [[applyScanSettings]] method.
   *
   * @asMemberOf Scanner
   * @event
   * @param newScanSettings The features of the used license key.
   */
  // @ts-ignore
  // declare function newScanSettings(newScanSettings: any): void;
})(Scanner || (Scanner = {}));

/**
 * A barcode picker element used to get and show camera input and perform scanning operations.
 *
 * The barcode picker will automatically fit and scale inside the given *originElement*.
 *
 * Each barcode picker internally contains a [[Scanner]] object with its own WebWorker thread running a
 * separate copy of the external Scandit Engine library. To optimize loading times and performance it's
 * recommended to reuse the same picker and to already create the picker in advance (hidden) and just
 * display it when needed whenever possible.
 *
 * As the loading of the external Scandit Engine library can take some time the picker always starts inactive
 * (but showing GUI and video) and then activates, if not paused, as soon as the library is ready to scan.
 * The [[on]] method targeting the [[ready]] event can be used to set up a listener function to be called when the
 * library is loaded.
 *
 * The picker can also operate in "single image mode", letting the user click/tap to take a single image to be scanned
 * via the camera (mobile/tablet) or a file select dialog (desktop). This is provided automatically as fallback by
 * default when the OS/browser only supports part of the needed features and cannot provide direct access to the camera
 * for video streaming and continuous scanning, or can also be forced. This behaviour can be set up on creation. Note
 * that in this mode some of the functions provided by the picker will have no effect.
 *
 * By default an alert is shown if an internal error during scanning is encountered which prevents the scanning
 * procedure from continuing when running on a local IP address. As this uses the built-in [[scanError]] event
 * functionality, if unwanted it can be disabled by calling [[removeAllListeners]] on the BarcodePicker
 * instance (right after creation).
 *
 * You are not allowed to hide the Scandit logo present in the corner of the GUI.
 */

var BarcodePicker =
  /*#__PURE__*/
  (function() {
    function BarcodePicker(originElement, _ref) {
      var visible = _ref.visible,
        singleImageMode = _ref.singleImageMode,
        playSoundOnScan = _ref.playSoundOnScan,
        vibrateOnScan = _ref.vibrateOnScan,
        scanningPaused = _ref.scanningPaused,
        guiStyle = _ref.guiStyle,
        videoFit = _ref.videoFit,
        laserArea = _ref.laserArea,
        viewfinderArea = _ref.viewfinderArea,
        scanner = _ref.scanner,
        scanSettings = _ref.scanSettings,
        targetScanningFPS = _ref.targetScanningFPS,
        hideLogo = _ref.hideLogo;

      classCallCheck(this, BarcodePicker);

      this.isReadyToWork = false;
      this.destroyed = false;
      this.scanningPaused = scanningPaused;
      howler_core_min_1.autoSuspend = false;
      this.beepSound = new howler_core_min_2({
        src: beepSound
      }); // istanbul ignore else

      if (navigator.vibrate != null) {
        this.vibrateFunction = navigator.vibrate;
      } else if (navigator.webkitVibrate != null) {
        this.vibrateFunction = navigator.webkitVibrate;
      } else if (navigator.mozVibrate != null) {
        this.vibrateFunction = navigator.mozVibrate;
      } else if (navigator.msVibrate != null) {
        this.vibrateFunction = navigator.msVibrate;
      }

      this.eventEmitter = new eventemitter3_1();
      this.setPlaySoundOnScanEnabled(playSoundOnScan);
      this.setVibrateOnScanEnabled(vibrateOnScan);
      this.setTargetScanningFPS(targetScanningFPS);

      if (scanner == null) {
        this.scanner = new Scanner({
          scanSettings: scanSettings
        });
      } else {
        this.scanner = scanner;
        this.scanner.applyScanSettings(scanSettings);
      }

      this.scannerReadyEventListener = this.handleScannerReady.bind(this);
      this.scanner.on("ready", this.scannerReadyEventListener);
      this.barcodePickerGui = new BarcodePickerGui({
        scanner: this.scanner,
        originElement: originElement,
        singleImageMode: singleImageMode,
        scanningPaused: scanningPaused,
        visible: visible,
        guiStyle: guiStyle,
        videoFit: videoFit,
        hideLogo: hideLogo,
        laserArea: laserArea,
        viewfinderArea: viewfinderArea,
        cameraUploadCallback: this.processVideoFrame.bind(this, true)
      });

      if (singleImageMode) {
        this.cameraManager = new DummyCameraManager();
      } else {
        this.cameraManager = new BarcodePickerCameraManager(this.triggerFatalError.bind(this), this.barcodePickerGui);
        this.scheduleVideoProcessing();
      }

      this.barcodePickerGui.setCameraManager(this.cameraManager);
    }
    /**
     * Create a [[BarcodePicker]] instance, creating the needed HTML in the given origin element.
     * If the *accessCamera* option is enabled (active by default) and the picker is not in "single image mode",
     * the available cameras are accessed and camera access permission is requested to the user if needed.
     * This object expects that at least a camera is available. The active camera is accessed and kept active during the
     * lifetime of the picker (also when hidden or scanning is paused), and is only released when [[destroy]] is called.
     *
     * It is required to having configured the library via [[configure]] before this object can be created.
     *
     * The "single image mode" behaviour of the picker can be set up via the
     * *singleImageMode* option, which accepts a configuration object of the form:
     * ```
     * {
     *   desktop: {
     *     always: false, allowFallback: true
     *   },
     *   mobile: {
     *     always: false, allowFallback: true
     *   }
     * }
     * ```
     *
     * Depending on parameters, device features and user permissions for camera access, any of the following errors
     * could be the rejected result of the returned promise:
     * - `LibraryNotConfiguredError`
     * - `NoOriginElementError`
     * - `UnsupportedBrowserError`
     * - `PermissionDeniedError`
     * - `NotAllowedError`
     * - `NotFoundError`
     * - `AbortError`
     * - `NotReadableError`
     * - `InternalError`
     * - `NoCameraAvailableError`
     *
     * @param originElement The HTMLElement inside which all the necessary elements for the picker will be added.
     * @param visible <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether the picker starts in a visible state.
     * @param singleImageMode <div class="tsd-signature-symbol">Default =&nbsp;
     * { desktop: { always: false, allowFallback: true }, mobile: { always: false, allowFallback: true } }</div>
     * Whether to provide a UI to pick/snap a single image from the camera instead of accessing and using the persistent
     * video stream from a camera ("force"), or to allow to provide this as a fallback ("allowFallback") in case the
     * necessary features for direct camera access are not provided by the OS/browser.
     * @param playSoundOnScan <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether a sound is played on barcode recognition (iOS requires user input).
     * @param vibrateOnScan <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the device vibrates on barcode recognition (only Chrome & Firefox, requires user input).
     * @param scanningPaused <div class="tsd-signature-symbol">Default =&nbsp;false</div>
     * Whether the picker starts in a paused scanning state.
     * @param guiStyle <div class="tsd-signature-symbol">Default =&nbsp;GuiStyle.LASER</div>
     * The GUI style for the picker.
     * @param videoFit <div class="tsd-signature-symbol">Default =&nbsp;ObjectFit.CONTAIN</div>
     * The fit type for the video element of the picker.
     * @param laserArea <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The area of the laser displayed when the GUI style is set to *laser* (the laser will match the width and be
     * vertically centered), by default the area will match the current [[ScanSettings]]'s *searchArea* option.
     * @param viewfinderArea <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The area of the viewfinder displayed when the GUI style is set to *viewfinder*, by default the area will match
     * the current [[ScanSettings]]'s *searchArea* option.
     * @param enableCameraSwitcher <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to show a GUI button to switch between different cameras (when available).
     * @param enableTorchToggle <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to show a GUI button to toggle device torch on/off (when available, only Chrome).
     * @param enableTapToFocus <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to trigger a manual focus of the camera when clicking/tapping on the video (when available, only Chrome).
     * @param enablePinchToZoom <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to control the zoom of the camera when doing a pinching gesture on the video (when available, only Chrome).
     * @param accessCamera <div class="tsd-signature-symbol">Default =&nbsp;true</div>
     * Whether to immediately access the camera (and requesting user permissions if needed) on picker creation.
     * @param camera <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The camera to be used for video input, if not specified the back or only camera will be used.
     * @param cameraSettings <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The camera options used when accessing the camera, by default HD resolution is used.
     * @param scanner <div class="tsd-signature-symbol">Default =&nbsp;undefined</div>
     * The scanner object responsible for scanning via the external Scandit Engine library
     * (a new scanner will be created and initialized if not provided).
     * @param scanSettings <div class="tsd-signature-symbol">Default =&nbsp;new ScanSettings()</div>
     * The configuration object for scanning options to be applied to the scanner (all symbologies disabled by default).
     * @param targetScanningFPS <div class="tsd-signature-symbol">Default =&nbsp;30</div>
     * The target frames per second to be processed, the final speed is limited by the camera framerate (usually 30 FPS)
     * and the frame processing time of the device. By setting this to lower numbers devices can save power by performing
     * less work during scanning operations, depending on device speed (faster devices can "sleep" for longer periods).
     * Must be a number bigger than 0.
     * @returns A promise resolving to the created ready [[BarcodePicker]] object.
     */

    createClass(
      BarcodePicker,
      [
        {
          key: "destroy",

          /**
           * Stop scanning and displaying video output, remove HTML elements added to the page,
           * destroy the internal [[Scanner]] (by default) and destroy the barcode picker itself; ensuring complete cleanup.
           *
           * This method should be called after you don't plan to use the picker anymore,
           * before the object is automatically cleaned up by JavaScript.
           * The barcode picker must not be used in any way after this call.
           *
           * If the [[Scanner]] is or will be in use for other purposes, the relative option can be passed to prevent
           * its destruction.
           *
           * @param destroyScanner Whether to destroy the internally used [[Scanner]] or not.
           */
          value: function destroy() {
            var destroyScanner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            this.pauseScanning(true);
            this.scanner.removeListener("ready", this.scannerReadyEventListener);
            this.destroyed = true;

            if (destroyScanner) {
              this.scanner.destroy();
            }

            this.barcodePickerGui.destroy();
            this.eventEmitter.removeAllListeners();
          }
          /**
           * Apply a new set of scan settings to the internal scanner (replacing old settings).
           *
           * @param scanSettings The scan configuration object to be applied to the scanner.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "applyScanSettings",
          value: function applyScanSettings(scanSettings) {
            this.scanner.applyScanSettings(scanSettings);
            return this;
          }
          /**
           * @returns Whether the scanning is currently paused.
           */
        },
        {
          key: "isScanningPaused",
          value: function isScanningPaused() {
            return this.scanningPaused;
          }
          /**
           * Pause the recognition of codes in the input image.
           *
           * By default video from the camera is still shown, if the *pauseCamera* option is enabled the camera stream
           * is paused (camera access is fully interrupted) and will be resumed when calling [[resumeScanning]] or
           * [[accessCamera]], possibly requesting user permissions if needed.
           *
           * In "single image mode" the input for submitting a picture is disabled.
           *
           * @param pauseCamera Whether to also pause the camera stream.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "pauseScanning",
          value: function pauseScanning() {
            var pauseCamera = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            this.scanningPaused = true;

            if (pauseCamera) {
              this.cameraManager.stopStream();
            }

            if (this.scanner.isReady()) {
              this.barcodePickerGui.pauseScanning();
            }

            return this;
          }
          /**
           * Resume the recognition of codes in the input image.
           *
           * If the camera stream was stopped when calling [[pauseScanning]], the camera stream is also resumed and
           * user permissions are requested if needed to resume video input.
           *
           * In "single image mode" the input for submitting a picture is enabled.
           *
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "resumeScanning",
          value: function resumeScanning() {
            return regenerator.async(
              function resumeScanning$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      this.scanningPaused = false;

                      if (this.scanner.isReady()) {
                        this.barcodePickerGui.resumeScanning();
                      }

                      if (!(this.cameraManager.activeCamera == null && this.cameraAccess)) {
                        _context.next = 5;
                        break;
                      }

                      _context.next = 5;
                      return regenerator.awrap(this.cameraManager.setupCameras());

                    case 5:
                      return _context.abrupt("return", this);

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              null,
              this
            );
          }
          /**
           * @returns The currently active camera.
           */
        },
        {
          key: "getActiveCamera",
          value: function getActiveCamera() {
            return this.cameraManager.activeCamera;
          }
          /**
           * Select a camera to be used for video input, if no camera is passed, the default one is selected.
           *
           * If camera access is enabled, the camera is enabled and accessed.
           *
           * Depending on device features and user permissions for camera access, any of the following errors
           * could be the rejected result of the returned promise:
           * - `PermissionDeniedError`
           * - `NotAllowedError`
           * - `NotFoundError`
           * - `AbortError`
           * - `NotReadableError`
           * - `InternalError`
           * - `NoCameraAvailableError`
           *
           * In "single image mode" this method has no effect.
           *
           * @param camera The new camera to be used, by default the automatically detected back camera is used.
           * @param cameraSettings The camera options used when accessing the camera, by default HD resolution is used.
           * @returns A promise resolving to the updated [[BarcodePicker]] object when the camera is set
           * (and accessed, if camera access is currently enabled).
           */
        },
        {
          key: "setActiveCamera",
          value: function setActiveCamera(camera, cameraSettings) {
            return regenerator.async(
              function setActiveCamera$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      if (!(camera == null || !this.cameraAccess)) {
                        _context2.next = 8;
                        break;
                      }

                      this.cameraManager.setSelectedCamera(camera);
                      this.cameraManager.setSelectedCameraSettings(cameraSettings);

                      if (!this.cameraAccess) {
                        _context2.next = 6;
                        break;
                      }

                      _context2.next = 6;
                      return regenerator.awrap(this.cameraManager.setupCameras());

                    case 6:
                      _context2.next = 10;
                      break;

                    case 8:
                      _context2.next = 10;
                      return regenerator.awrap(this.cameraManager.initializeCameraWithSettings(camera, cameraSettings));

                    case 10:
                      return _context2.abrupt("return", this);

                    case 11:
                    case "end":
                      return _context2.stop();
                  }
                }
              },
              null,
              this
            );
          }
          /**
           * Try to apply new settings to the currently used camera for video input,
           * if no settings are passed the default ones are set.
           *
           * If camera access is enabled, the camera is updated and accessed with the new settings.
           *
           * Depending on device features and user permissions for camera access, any of the following errors
           * could be the rejected result of the returned promise:
           * - `PermissionDeniedError`
           * - `NotAllowedError`
           * - `NotFoundError`
           * - `AbortError`
           * - `NotReadableError`
           * - `InternalError`
           * - `NoCameraAvailableError`
           *
           * In "single image mode" this method has no effect.
           *
           * @param cameraSettings The new camera options used when accessing the camera, by default HD resolution is used.
           * @returns A promise resolving to the updated [[BarcodePicker]] object when the camera is updated
           * (and accessed, if camera access is currently enabled).
           */
        },
        {
          key: "applyCameraSettings",
          value: function applyCameraSettings(cameraSettings) {
            return regenerator.async(
              function applyCameraSettings$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      if (this.cameraAccess) {
                        _context3.next = 4;
                        break;
                      }

                      this.cameraManager.setSelectedCameraSettings(cameraSettings);
                      _context3.next = 6;
                      break;

                    case 4:
                      _context3.next = 6;
                      return regenerator.awrap(this.cameraManager.applyCameraSettings(cameraSettings));

                    case 6:
                      return _context3.abrupt("return", this);

                    case 7:
                    case "end":
                      return _context3.stop();
                  }
                }
              },
              null,
              this
            );
          }
          /**
           * @returns Whether the picker is in a visible state or not.
           */
        },
        {
          key: "isVisible",
          value: function isVisible() {
            return this.barcodePickerGui.isVisible();
          }
          /**
           * Enable or disable picker visibility.
           *
           * Note that this does not affect camera access, frame processing or any other picker logic.
           *
           * @param visible Whether the picker is in a visible state or not.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setVisible",
          value: function setVisible(visible) {
            this.barcodePickerGui.setVisible(visible);
            return this;
          }
          /**
           * @returns Whether the currently selected camera's video is mirrored along the vertical axis.
           */
        },
        {
          key: "isMirrorImageEnabled",
          value: function isMirrorImageEnabled() {
            return this.barcodePickerGui.isMirrorImageEnabled();
          }
          /**
           * Enable or disable camera video mirroring along the vertical axis.
           * By default front cameras are automatically mirrored.
           * This setting is applied per camera and the method has no effect if no camera is currently selected.
           *
           * In "single image mode" this method has no effect.
           *
           * @param enabled Whether the camera video is mirrored along the vertical axis.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setMirrorImageEnabled",
          value: function setMirrorImageEnabled(enabled) {
            this.barcodePickerGui.setMirrorImageEnabled(enabled, true);
            return this;
          }
          /**
           * @returns Whether a sound should be played on barcode recognition (iOS requires user input).
           * Note that the sound is played if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
           */
        },
        {
          key: "isPlaySoundOnScanEnabled",
          value: function isPlaySoundOnScanEnabled() {
            return this.playSoundOnScan;
          }
          /**
           * Enable or disable playing a sound on barcode recognition (iOS requires user input).
           *
           * The sound is played if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
           *
           * @param enabled Whether a sound should be played on barcode recognition.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setPlaySoundOnScanEnabled",
          value: function setPlaySoundOnScanEnabled(enabled) {
            this.playSoundOnScan = enabled;
            return this;
          }
          /**
           * @returns Whether the device should vibrate on barcode recognition (only Chrome & Firefox, requires user input).
           * Note that the vibration is triggered if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
           */
        },
        {
          key: "isVibrateOnScanEnabled",
          value: function isVibrateOnScanEnabled() {
            return this.vibrateOnScan;
          }
          /**
           * Enable or disable vibrating the device on barcode recognition (only Chrome & Firefox, requires user input).
           *
           * The vibration is triggered if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
           *
           * @param enabled Whether the device should vibrate on barcode recognition.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setVibrateOnScanEnabled",
          value: function setVibrateOnScanEnabled(enabled) {
            this.vibrateOnScan = enabled;
            return this;
          }
          /**
           * @returns Whether a GUI button to switch between different cameras is shown (when available).
           */
        },
        {
          key: "isCameraSwitcherEnabled",
          value: function isCameraSwitcherEnabled() {
            return this.cameraManager.isCameraSwitcherEnabled();
          }
          /**
           * Show or hide a GUI button to switch between different cameras (when available).
           *
           * In "single image mode" this method has no effect.
           *
           * @param enabled Whether to show a GUI button to switch between different cameras.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setCameraSwitcherEnabled",
          value: function setCameraSwitcherEnabled(enabled) {
            this.cameraManager.setCameraSwitcherEnabled(enabled).catch(
              /* istanbul ignore next */
              function() {
                // Ignored
              }
            );
            return this;
          }
          /**
           * @returns Whether a GUI button to toggle device torch on/off is shown (when available, only Chrome).
           */
        },
        {
          key: "isTorchToggleEnabled",
          value: function isTorchToggleEnabled() {
            return this.cameraManager.isTorchToggleEnabled();
          }
          /**
           * Show or hide a GUI button to toggle device torch on/off (when available, only Chrome).
           *
           * In "single image mode" this method has no effect.
           *
           * @param enabled Whether to show a GUI button to toggle device torch on/off.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setTorchToggleEnabled",
          value: function setTorchToggleEnabled(enabled) {
            this.cameraManager.setTorchToggleEnabled(enabled);
            return this;
          }
          /**
           * @returns Whether manual camera focus when clicking/tapping on the video is enabled (when available, only Chrome).
           */
        },
        {
          key: "isTapToFocusEnabled",
          value: function isTapToFocusEnabled() {
            return this.cameraManager.isTapToFocusEnabled();
          }
          /**
           * Enable or disable manual camera focus when clicking/tapping on the video (when available, only Chrome).
           *
           * In "single image mode" this method has no effect.
           *
           * @param enabled Whether to enable manual camera focus when clicking/tapping on the video.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setTapToFocusEnabled",
          value: function setTapToFocusEnabled(enabled) {
            this.cameraManager.setTapToFocusEnabled(enabled);
            return this;
          }
          /**
           * @returns Whether camera zoom control via pinching gesture on the video is enabled (when available, only Chrome).
           */
        },
        {
          key: "isPinchToZoomEnabled",
          value: function isPinchToZoomEnabled() {
            return this.cameraManager.isPinchToZoomEnabled();
          }
          /**
           * Enable or disable camera zoom control via pinching gesture on the video (when available, only Chrome).
           *
           * In "single image mode" this method has no effect.
           *
           * @param enabled Whether to enable camera zoom control via pinching gesture on the video.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setPinchToZoomEnabled",
          value: function setPinchToZoomEnabled(enabled) {
            this.cameraManager.setPinchToZoomEnabled(enabled);
            return this;
          }
          /**
           * Enable or disable the torch/flashlight of the device (when available, only Chrome).
           * Changing active camera or camera settings will cause the torch to become disabled.
           *
           * A button on the [[BarcodePicker]] GUI to let the user toggle this functionality can also be set
           * on creation via the *enableTorchToggle* option (enabled by default, when available).
           *
           * In "single image mode" this method has no effect.
           *
           * @param enabled Whether the torch should be enabled or disabled.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setTorchEnabled",
          value: function setTorchEnabled(enabled) {
            this.cameraManager.setTorchEnabled(enabled);
            return this;
          }
          /**
           * Set the zoom level of the device (when available, only Chrome).
           * Changing active camera or camera settings will cause the zoom to be reset.
           *
           * In "single image mode" this method has no effect.
           *
           * @param zoomPercentage The percentage of the max zoom (between 0 and 1).
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setZoom",
          value: function setZoom(zoomPercentage) {
            this.cameraManager.setZoom(zoomPercentage);
            return this;
          }
          /**
           * @returns Whether the barcode picker has loaded the external Scandit Engine library and is ready to scan.
           */
        },
        {
          key: "isReady",
          value: function isReady() {
            return this.isReadyToWork;
          }
        },
        {
          key: "on",
          value: function on(eventName, listener) {
            var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (eventName === "ready") {
              if (this.isReadyToWork) {
                listener();
              } else {
                this.eventEmitter.once(eventName, listener, this);
              }
            } else {
              if (once === true) {
                this.eventEmitter.once(eventName, listener, this);
              } else {
                this.eventEmitter.on(eventName, listener, this);
              }
            }

            return this;
          }
          /**
           * Remove the specified listener from the given event's listener array.
           *
           * @param eventName The name of the event from which to remove the listener.
           * @param listener The listener function to be removed.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "removeListener",
          value: function removeListener(eventName, listener) {
            this.eventEmitter.removeListener(eventName, listener);
            return this;
          }
          /**
           * Remove all listeners from the given event's listener array.
           *
           * @param eventName The name of the event from which to remove all listeners.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "removeAllListeners",
          value: function removeAllListeners(eventName) {
            this.eventEmitter.removeAllListeners(eventName);
            return this;
          }
          /**
           * *See the [[on]] method.*
           *
           * @param eventName The name of the event to listen to.
           * @param listener The listener function.
           * @param once <div class="tsd-signature-symbol">Default =&nbsp;false</div>
           * Whether the listener should just be triggered only once and then discarded.
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:bool-param-default
        },
        {
          key: "addListener",
          value: function addListener(eventName, listener, once) {
            return this.on(eventName, listener, once);
          }
          /**
           * Add the listener function to the listeners array for the [[ready]] event, fired when the external
           * Scandit Engine library has been loaded and the barcode picker can thus start to scan barcodes.
           * If the library has already been loaded the listener is called immediately.
           *
           * No checks are made to see if the listener has already been added.
           * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
           *
           * @deprecated Use the [[on]] method instead.
           *
           * @param listener The listener function.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "onReady",
          value: function onReady(listener) {
            console.warn(
              "The onReady(<listener>) method is deprecated and will be removed in the next" +
                ' major library version. Please use on("ready", <listener>) instead.'
            );
            return this.on("ready", listener);
          }
          /**
           * Add the listener function to the listeners array for the [[scan]] event, fired when new barcodes
           * are recognized in the image frame. The returned barcodes are affected
           * by the [[ScanSettings.setCodeDuplicateFilter]] option.
           *
           * No checks are made to see if the listener has already been added.
           * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
           *
           * @deprecated Use the [[on]] method instead.
           *
           * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
           * @param once Whether the listener should just be triggered only once and then discarded.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "onScan",
          value: function onScan(listener) {
            var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            console.warn(
              "The onScan(<listener>) method is deprecated and will be removed in the next" +
                ' major library version. Please use on("scan", <listener>) instead.'
            );
            return this.on("scan", listener, once);
          }
          /**
           * Remove the specified listener from the [[scan]] event's listener array.
           *
           * @deprecated Use the [[removeListener]] method instead.
           *
           * @param listener The listener function to be removed.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "removeScanListener",
          value: function removeScanListener(listener) {
            console.warn(
              "The removeScanListener(<listener>) method is deprecated and will be removed in the next" +
                ' major library version. Please use removeListener("scan", <listener>) instead.'
            );
            return this.removeListener("scan", listener);
          }
          /**
           * Remove all listeners from the [[scan]] event's listener array.
           *
           * @deprecated Use the [[removeAllListeners]] method instead.
           *
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "removeScanListeners",
          value: function removeScanListeners() {
            console.warn(
              "The removeScanListeners() method is deprecated and will be removed in the next" +
                ' major library version. Please use removeAllListeners("scan") instead.'
            );
            return this.removeAllListeners("scan");
          }
          /**
           * Add the listener function to the listeners array for the [[scanError]] event, fired when an error occurs
           * during scanning initialization and execution. The barcode picker will be automatically paused when this happens.
           *
           * No checks are made to see if the listener has already been added.
           * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
           *
           * @deprecated Use the [[on]] method instead.
           *
           * @param listener The listener function, which will be invoked with an `ScanditEngineError` object.
           * @param once Whether the listener should just be triggered only once and then discarded.
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:no-identical-functions
        },
        {
          key: "onScanError",
          value: function onScanError(listener) {
            var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            console.warn(
              "The onScanError(<listener>) method is deprecated and will be removed in the next" +
                ' major library version. Please use on("scanError", <listener>) instead.'
            );
            return this.on("scanError", listener, once);
          }
          /**
           * Remove the specified listener from the [[scanError]] event's listener array.
           *
           * @deprecated Use the [[removeListener]] method instead.
           *
           * @param listener The listener function to be removed.
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:no-identical-functions
        },
        {
          key: "removeScanErrorListener",
          value: function removeScanErrorListener(listener) {
            console.warn(
              "The removeScanErrorListener(<listener>) method is deprecated and will be removed in the next" +
                ' major library version. Please use removeListener("scanError", <listener>) instead.'
            );
            return this.removeListener("scanError", listener);
          }
          /**
           * Remove all listeners from the [[scanError]] event's listener array.
           *
           * @deprecated Use the [[removeAllListeners]] method instead.
           *
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:no-identical-functions
        },
        {
          key: "removeScanErrorListeners",
          value: function removeScanErrorListeners() {
            console.warn(
              "The removeScanErrorListeners() method is deprecated and will be removed in the next" +
                ' major library version. Please use removeAllListeners("scanError") instead.'
            );
            return this.removeAllListeners("scanError");
          }
          /**
           * Add the listener function to the listeners array for the [[submitFrame]] event, fired when a new frame is submitted
           * to the engine to be processed. As the frame is not processed yet, the [[ScanResult.barcodes]] property will
           * always be empty (no results yet).
           *
           * No checks are made to see if the listener has already been added.
           * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
           *
           * @deprecated Use the [[on]] method instead.
           *
           * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
           * @param once Whether the listener should just be triggered only once and then discarded.
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:no-identical-functions
        },
        {
          key: "onSubmitFrame",
          value: function onSubmitFrame(listener) {
            var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            console.warn(
              "The onSubmitFrame(<listener>) method is deprecated and will be removed in the next" +
                ' major library version. Please use on("submitFrame", <listener>) instead.'
            );
            return this.on("submitFrame", listener, once);
          }
          /**
           * Remove the specified listener from the [[submitFrame]] event's listener array.
           *
           * @deprecated Use the [[removeListener]] method instead.
           *
           * @param listener The listener function to be removed.
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:no-identical-functions
        },
        {
          key: "removeSubmitFrameListener",
          value: function removeSubmitFrameListener(listener) {
            console.warn(
              "The removeSubmitFrameListener(<listener>) method is deprecated and will be removed in the next" +
                ' major library version. Please use removeListener("submitFrame", <listener>) instead.'
            );
            return this.removeListener("submitFrame", listener);
          }
          /**
           * Remove all listeners from the [[submitFrame]] event's listener array.
           *
           * @deprecated Use the [[removeAllListeners]] method instead.
           *
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:no-identical-functions
        },
        {
          key: "removeSubmitFrameListeners",
          value: function removeSubmitFrameListeners() {
            console.warn(
              "The removeSubmitFrameListeners() method is deprecated and will be removed in the next" +
                ' major library version. Please use removeAllListeners("submitFrame") instead.'
            );
            return this.removeAllListeners("submitFrame");
          }
          /**
           * Add the listener function to the listeners array for the [[processFrame]] event, fired when a new frame is
           * processed. This event is fired on every frame, independently from the number of recognized barcodes (can be none).
           * The returned barcodes are affected by the [[ScanSettings.setCodeDuplicateFilter]] option.
           *
           * No checks are made to see if the listener has already been added.
           * Multiple calls passing the same listener will result in the listener being added, and called, multiple times.
           *
           * @deprecated Use the [[on]] method instead.
           *
           * @param listener The listener function, which will be invoked with a [[ScanResult]] object.
           * @param once Whether the listener should just be triggered only once and then discarded.
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:no-identical-functions
        },
        {
          key: "onProcessFrame",
          value: function onProcessFrame(listener) {
            var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            console.warn(
              "The onProcessFrame(<listener>) method is deprecated and will be removed in the next" +
                ' major library version. Please use on("processFrame", <listener>) instead.'
            );
            return this.on("processFrame", listener, once);
          }
          /**
           * Remove the specified listener from the [[processFrame]] event's listener array.
           *
           * @deprecated Use the [[removeListener]] method instead.
           *
           * @param listener The listener function to be removed.
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:no-identical-functions
        },
        {
          key: "removeProcessFrameListener",
          value: function removeProcessFrameListener(listener) {
            console.warn(
              "The removeProcessFrameListener(<listener>) method is deprecated and will be removed in the next" +
                ' major library version. Please use removeListener("processFrame", <listener>) instead.'
            );
            return this.removeListener("processFrame", listener);
          }
          /**
           * Remove all listeners from the [[processFrame]] event's listener array.
           *
           * @deprecated Use the [[removeAllListeners]] method instead.
           *
           * @returns The updated [[BarcodePicker]] object.
           */
          // tslint:disable-next-line:no-identical-functions
        },
        {
          key: "removeProcessFrameListeners",
          value: function removeProcessFrameListeners() {
            console.warn(
              "The removeProcessFrameListeners() method is deprecated and will be removed in the next" +
                ' major library version. Please use removeAllListeners("processFrame") instead.'
            );
            return this.removeAllListeners("processFrame");
          }
          /**
           * Set the GUI style for the picker.
           *
           * In "single image mode" this method has no effect.
           *
           * When the GUI style is set to *laser* or *viewfinder*, the GUI will flash on barcode recognition.
           * Note that the GUI will flash if there's at least a barcode not rejected via [[ScanResult.rejectCode]].
           *
           * @param guiStyle The new GUI style to be applied.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setGuiStyle",
          value: function setGuiStyle(guiStyle) {
            this.barcodePickerGui.setGuiStyle(guiStyle);
            return this;
          }
          /**
           * Set the fit type for the video element of the picker.
           *
           * If the "cover" type is selected the maximum available search area for barcode detection is (continuously) adjusted
           * automatically according to the visible area of the picker.
           *
           * In "single image mode" this method has no effect.
           *
           * @param objectFit The new fit type to be applied.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setVideoFit",
          value: function setVideoFit(objectFit) {
            this.barcodePickerGui.setVideoFit(objectFit);
            return this;
          }
          /**
           * Access the currently set or default camera, requesting user permissions if needed.
           * This method is meant to be used after the picker has been initialized with disabled camera access
           * (*accessCamera*=false) or after [[pauseScanning]] has been called with the pause camera stream option.
           * Calling this doesn't do anything if the camera is already being accessed.
           *
           * Depending on device features and user permissions for camera access, any of the following errors
           * could be the rejected result of the returned promise:
           * - `PermissionDeniedError`
           * - `NotAllowedError`
           * - `NotFoundError`
           * - `AbortError`
           * - `NotReadableError`
           * - `InternalError`
           * - `NoCameraAvailableError`
           *
           * In "single image mode" this method has no effect.
           *
           * @returns A promise resolving to the updated [[BarcodePicker]] object when the camera is accessed.
           */
        },
        {
          key: "accessCamera",
          value: function accessCamera() {
            return regenerator.async(
              function accessCamera$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      if (!(!this.cameraAccess || this.cameraManager.activeCamera == null)) {
                        _context4.next = 4;
                        break;
                      }

                      _context4.next = 3;
                      return regenerator.awrap(this.cameraManager.setupCameras());

                    case 3:
                      this.cameraAccess = true;

                    case 4:
                      return _context4.abrupt("return", this);

                    case 5:
                    case "end":
                      return _context4.stop();
                  }
                }
              },
              null,
              this
            );
          }
          /**
           * Create a new parser object.
           *
           * @param dataFormat The format of the input data for the parser.
           * @returns The newly created parser.
           */
        },
        {
          key: "createParserForFormat",
          value: function createParserForFormat(dataFormat) {
            return this.scanner.createParserForFormat(dataFormat);
          }
          /**
           * Reassign the barcode picker to a different HTML element.
           *
           * All the barcode picker elements inside the current origin element will be moved to the new given one.
           *
           * If an invalid element is given, a `NoOriginElementError` error is thrown.
           *
           * @param originElement The HTMLElement into which all the necessary elements for the picker will be moved.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "reassignOriginElement",
          value: function reassignOriginElement(originElement) {
            if (!BrowserHelper.isValidHTMLElement(originElement)) {
              throw new CustomError({
                name: "NoOriginElementError",
                message: "A valid origin HTML element must be given"
              });
            }

            this.barcodePickerGui.reassignOriginElement(originElement);
            return this;
          }
          /**
           * Set the target frames per second to be processed by the scanning engine.
           *
           * The final speed is limited by the camera framerate (usually 30 FPS) and the frame processing time of the device.
           * By setting this to lower numbers devices can save power by performing less work during scanning operations,
           * depending on device speed (faster devices can "sleep" for longer periods).
           *
           * In "single image mode" this method has no effect.
           *
           * @param targetScanningFPS The target frames per second to be processed.
           * Must be a number bigger than 0, by default set to 30.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setTargetScanningFPS",
          value: function setTargetScanningFPS(targetScanningFPS) {
            if (targetScanningFPS <= 0) {
              targetScanningFPS = 30;
            }

            this.targetScanningFPS = targetScanningFPS;
            return this;
          }
          /**
           * @returns The internally used initialized (and possibly configured) [[Scanner]] object instance.
           */
        },
        {
          key: "getScanner",
          value: function getScanner() {
            return this.scanner;
          }
          /**
           * Clear the internal scanner session.
           *
           * This removes all recognized barcodes from the scanner session and allows them to be scanned again in case a custom
           * *codeDuplicateFilter* option was set in the [[ScanSettings]].
           *
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "clearSession",
          value: function clearSession() {
            this.scanner.clearSession();
            return this;
          }
          /**
           * Set the area of the laser displayed when the GUI style is set to *laser* (the laser will match the width and be
           * vertically centered).
           * Note that this functionality affects UI only and doesn't change the actual *searchArea* option set via
           * [[ScanSettings]]. If no area is passed, the default automatic size behaviour is set, where the laser will match
           * the current area of the image in which barcodes are searched, controlled via the *searchArea* option in
           * [[ScanSettings]].
           *
           * @param area The new search area, by default the area will match [[ScanSettings]]'s *searchArea* option.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setLaserArea",
          value: function setLaserArea(area) {
            this.barcodePickerGui.setLaserArea(area);
            return this;
          }
          /**
           * Set the area of the viewfinder displayed when the GUI style is set to *viewfinder*.
           * Note that this functionality affects UI only and doesn't change the actual search area set via [[ScanSettings]].
           * If no area is passed, the default automatic size behaviour is set, where the viewfinder will match the current area
           * of the image in which barcodes are searched, controlled via the *searchArea* option in [[ScanSettings]].
           *
           * @param area The new search area, by default the area will match the [[ScanSettings]]'s *searchArea*.
           * @returns The updated [[BarcodePicker]] object.
           */
        },
        {
          key: "setViewfinderArea",
          value: function setViewfinderArea(area) {
            this.barcodePickerGui.setViewfinderArea(area);
            return this;
          }
        },
        {
          key: "triggerFatalError",
          value: function triggerFatalError(error) {
            this.fatalError = error;
            console.error(error);
          }
        },
        {
          key: "handleScanResult",
          value: function handleScanResult(scanResult) {
            var _this = this;

            this.eventEmitter.emit("processFrame", scanResult);

            if (scanResult.barcodes.length !== 0) {
              // This will get executed only after the other existing listeners for "processFrame" and "scan" are executed
              this.eventEmitter.once("scan", function() {
                if (
                  scanResult.barcodes.some(function(barcode) {
                    return !scanResult.rejectedCodes.has(barcode);
                  })
                ) {
                  _this.barcodePickerGui.flashGUI();

                  if (_this.playSoundOnScan) {
                    _this.beepSound.play();
                  }

                  if (_this.vibrateOnScan && _this.vibrateFunction != null) {
                    _this.vibrateFunction.call(navigator, 300);
                  }
                }
              });
              this.eventEmitter.emit("scan", scanResult);
            }
          }
        },
        {
          key: "scheduleVideoProcessing",
          value: function scheduleVideoProcessing() {
            var _this2 = this;

            var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            window.setTimeout(function _callee() {
              return regenerator.async(function _callee$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      _context5.next = 2;
                      return regenerator.awrap(_this2.videoProcessing());

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            }, timeout); // Leave some breathing room for other operations
          }
        },
        {
          key: "scheduleNextVideoProcessing",
          value: function scheduleNextVideoProcessing(processingStartTime) {
            var nextProcessingCallDelay;
            return regenerator.async(
              function scheduleNextVideoProcessing$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      if (!(this.targetScanningFPS < 60)) {
                        _context6.next = 11;
                        break;
                      }

                      if (this.averageProcessingTime == null) {
                        this.averageProcessingTime = performance.now() - processingStartTime;
                      } else {
                        this.averageProcessingTime =
                          this.averageProcessingTime * 0.9 + (performance.now() - processingStartTime) * 0.1;
                      }

                      nextProcessingCallDelay = Math.max(0, 1000 / this.targetScanningFPS - this.averageProcessingTime);

                      if (!(Math.round(nextProcessingCallDelay) <= 16)) {
                        _context6.next = 8;
                        break;
                      }

                      _context6.next = 6;
                      return regenerator.awrap(this.videoProcessing());

                    case 6:
                      _context6.next = 9;
                      break;

                    case 8:
                      this.scheduleVideoProcessing(nextProcessingCallDelay);

                    case 9:
                      _context6.next = 13;
                      break;

                    case 11:
                      _context6.next = 13;
                      return regenerator.awrap(this.videoProcessing());

                    case 13:
                    case "end":
                      return _context6.stop();
                  }
                }
              },
              null,
              this
            );
          }
        },
        {
          key: "processVideoFrame",
          value: function processVideoFrame(highQualitySingleFrameMode) {
            var imageData, scanResult;
            return regenerator.async(
              function processVideoFrame$(_context7) {
                while (1) {
                  switch ((_context7.prev = _context7.next)) {
                    case 0:
                      imageData = this.barcodePickerGui.getVideoImageData(); // This could happen in very weird situations and should be temporary
                      // istanbul ignore if

                      if (!(imageData == null)) {
                        _context7.next = 3;
                        break;
                      }

                      return _context7.abrupt("return");

                    case 3:
                      if (this.scanningPaused) {
                        _context7.next = 16;
                        break;
                      }

                      if (this.eventEmitter.listenerCount("submitFrame") > 0) {
                        this.eventEmitter.emit(
                          "submitFrame",
                          new ScanResult([], imageData.slice(), this.scanner.getImageSettings())
                        );
                      }

                      _context7.prev = 5;
                      _context7.next = 8;
                      return regenerator.awrap(this.scanner.processImage(imageData, highQualitySingleFrameMode));

                    case 8:
                      scanResult = _context7.sent;

                      // Paused status could have changed in the meantime
                      if (!this.scanningPaused) {
                        this.handleScanResult(scanResult);
                      }

                      _context7.next = 16;
                      break;

                    case 12:
                      _context7.prev = 12;
                      _context7.t0 = _context7["catch"](5);
                      this.pauseScanning();
                      this.eventEmitter.emit("scanError", _context7.t0);

                    case 16:
                    case "end":
                      return _context7.stop();
                  }
                }
              },
              null,
              this,
              [[5, 12]]
            );
          }
        },
        {
          key: "videoProcessing",
          value: function videoProcessing() {
            var processingStartTime;
            return regenerator.async(
              function videoProcessing$(_context8) {
                while (1) {
                  switch ((_context8.prev = _context8.next)) {
                    case 0:
                      if (!this.destroyed) {
                        _context8.next = 2;
                        break;
                      }

                      return _context8.abrupt("return");

                    case 2:
                      if (
                        !(
                          this.cameraManager.activeCamera == null ||
                          this.cameraManager.activeCamera.currentResolution == null ||
                          this.fatalError != null ||
                          this.scanningPaused ||
                          !this.scanner.isReady() ||
                          this.scanner.isBusyProcessing() ||
                          this.latestVideoTimeProcessed === this.barcodePickerGui.getVideoCurrentTime()
                        )
                      ) {
                        _context8.next = 5;
                        break;
                      }

                      this.scheduleVideoProcessing();
                      return _context8.abrupt("return");

                    case 5:
                      if (!(this.latestVideoTimeProcessed == null)) {
                        _context8.next = 8;
                        break;
                      }

                      _context8.next = 8;
                      return regenerator.awrap(this.resumeScanning());

                    case 8:
                      processingStartTime = performance.now();
                      this.latestVideoTimeProcessed = this.barcodePickerGui.getVideoCurrentTime();
                      _context8.next = 12;
                      return regenerator.awrap(this.processVideoFrame(false));

                    case 12:
                      _context8.next = 14;
                      return regenerator.awrap(this.scheduleNextVideoProcessing(processingStartTime));

                    case 14:
                    case "end":
                      return _context8.stop();
                  }
                }
              },
              null,
              this
            );
          }
        },
        {
          key: "handleScannerReady",
          value: function handleScannerReady() {
            this.isReadyToWork = true;
            this.eventEmitter.emit("ready");
          }
        }
      ],
      [
        {
          key: "create",
          value: function create(originElement) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              _ref2$visible = _ref2.visible,
              visible = _ref2$visible === void 0 ? true : _ref2$visible,
              _ref2$singleImageMode = _ref2.singleImageMode,
              singleImageMode =
                _ref2$singleImageMode === void 0
                  ? {
                      desktop: {
                        always: false,
                        allowFallback: true
                      },
                      mobile: {
                        always: false,
                        allowFallback: true
                      }
                    }
                  : _ref2$singleImageMode,
              _ref2$playSoundOnScan = _ref2.playSoundOnScan,
              playSoundOnScan = _ref2$playSoundOnScan === void 0 ? false : _ref2$playSoundOnScan,
              _ref2$vibrateOnScan = _ref2.vibrateOnScan,
              vibrateOnScan = _ref2$vibrateOnScan === void 0 ? false : _ref2$vibrateOnScan,
              _ref2$scanningPaused = _ref2.scanningPaused,
              scanningPaused = _ref2$scanningPaused === void 0 ? false : _ref2$scanningPaused,
              _ref2$guiStyle = _ref2.guiStyle,
              guiStyle = _ref2$guiStyle === void 0 ? BarcodePicker.GuiStyle.LASER : _ref2$guiStyle,
              _ref2$videoFit = _ref2.videoFit,
              videoFit = _ref2$videoFit === void 0 ? BarcodePicker.ObjectFit.CONTAIN : _ref2$videoFit,
              laserArea = _ref2.laserArea,
              viewfinderArea = _ref2.viewfinderArea,
              scanner = _ref2.scanner,
              _ref2$scanSettings = _ref2.scanSettings,
              scanSettings = _ref2$scanSettings === void 0 ? new ScanSettings() : _ref2$scanSettings,
              _ref2$enableCameraSwi = _ref2.enableCameraSwitcher,
              enableCameraSwitcher = _ref2$enableCameraSwi === void 0 ? true : _ref2$enableCameraSwi,
              _ref2$enableTorchTogg = _ref2.enableTorchToggle,
              enableTorchToggle = _ref2$enableTorchTogg === void 0 ? true : _ref2$enableTorchTogg,
              _ref2$enableTapToFocu = _ref2.enableTapToFocus,
              enableTapToFocus = _ref2$enableTapToFocu === void 0 ? true : _ref2$enableTapToFocu,
              _ref2$enablePinchToZo = _ref2.enablePinchToZoom,
              enablePinchToZoom = _ref2$enablePinchToZo === void 0 ? true : _ref2$enablePinchToZo,
              _ref2$accessCamera = _ref2.accessCamera,
              accessCamera = _ref2$accessCamera === void 0 ? true : _ref2$accessCamera,
              camera = _ref2.camera,
              cameraSettings = _ref2.cameraSettings,
              _ref2$targetScanningF = _ref2.targetScanningFPS,
              targetScanningFPS = _ref2$targetScanningF === void 0 ? 30 : _ref2$targetScanningF;

            var singleImageModeForced;
            var singleImageModeFallbackAllowed;
            var deviceType = BrowserHelper.userAgentInfo.getDevice().type;

            if (deviceType != null && ["mobile", "tablet"].includes(deviceType)) {
              singleImageModeForced = singleImageMode.mobile.always;
              singleImageModeFallbackAllowed = singleImageMode.mobile.allowFallback;
            } else {
              singleImageModeForced = singleImageMode.desktop.always;
              singleImageModeFallbackAllowed = singleImageMode.desktop.allowFallback;
            }

            var browserCompatibility = BrowserHelper.checkBrowserCompatibility();

            if (
              !browserCompatibility.scannerSupport ||
              (!singleImageModeForced && !singleImageModeFallbackAllowed && !browserCompatibility.fullSupport)
            ) {
              return promise$1.reject(new UnsupportedBrowserError(browserCompatibility));
            }

            if (userLicenseKey == null) {
              return promise$1.reject(
                new CustomError({
                  name: "LibraryNotConfiguredError",
                  message:
                    "The library has not correctly been configured yet, please call 'configure' with valid parameters"
                })
              );
            }

            if (!BrowserHelper.isValidHTMLElement(originElement)) {
              return promise$1.reject(
                new CustomError({
                  name: "NoOriginElementError",
                  message: "A valid origin HTML element must be given"
                })
              );
            }

            var barcodePicker = new BarcodePicker(originElement, {
              visible: visible,
              singleImageMode: browserCompatibility.fullSupport ? singleImageModeForced : true,
              playSoundOnScan: playSoundOnScan,
              vibrateOnScan: vibrateOnScan,
              scanningPaused: scanningPaused,
              guiStyle: guiStyle,
              videoFit: videoFit,
              laserArea: laserArea,
              viewfinderArea: viewfinderArea,
              scanner: scanner,
              scanSettings: scanSettings,
              targetScanningFPS: targetScanningFPS,
              // tslint:disable-next-line:use-named-parameter
              hideLogo: arguments[1] == null ? false : arguments[1].hideLogo === true // Hidden parameter
            });
            barcodePicker.cameraManager.setInteractionOptions(
              enableCameraSwitcher,
              enableTorchToggle,
              enableTapToFocus,
              enablePinchToZoom
            );
            barcodePicker.cameraManager.setSelectedCamera(camera);
            barcodePicker.cameraManager.setSelectedCameraSettings(cameraSettings);
            barcodePicker.cameraAccess = accessCamera; // Show error in alert on ScanError by default when running on local IP address for easier customer debugging

            barcodePicker.on("scanError", function(error) {
              // istanbul ignore if
              if (["localhost", "127.0.0.1", ""].includes(window.location.hostname)) {
                alert(error);
              }
            });

            if (accessCamera) {
              return barcodePicker.cameraManager.setupCameras().then(function() {
                return barcodePicker;
              });
            }

            return promise$1.resolve(barcodePicker);
          }
        }
      ]
    );

    return BarcodePicker;
  })(); // istanbul ignore next

(function(BarcodePicker) {
  /**
   * GUI style to be used by a barcode picker, used to hint barcode placement in the frame.
   */
  var GuiStyle;

  (function(GuiStyle) {
    /**
     * No GUI is shown to indicate where the barcode should be placed.
     * Be aware that the Scandit logo continues to be displayed as showing it is part of the license agreement.
     */
    GuiStyle["NONE"] = "none";
    /**
     * A laser line is shown.
     */

    GuiStyle["LASER"] = "laser";
    /**
     * A rectangular viewfinder with rounded corners is shown.
     */

    GuiStyle["VIEWFINDER"] = "viewfinder";
  })((GuiStyle = BarcodePicker.GuiStyle || (BarcodePicker.GuiStyle = {})));
  /**
   * Fit type used to control the resizing (scale) of the barcode picker to fit in its container *originElement*.
   */

  var ObjectFit;

  (function(ObjectFit) {
    /**
     * Scale to maintain aspect ratio while fitting within the *originElement*'s content box.
     * Aspect ratio is preserved, so the barcode picker will be "letterboxed" if its aspect ratio
     * does not match the aspect ratio of the box.
     */
    ObjectFit["CONTAIN"] = "contain";
    /**
     * Scale to maintain aspect ratio while filling the *originElement*'s entire content box.
     * Aspect ratio is preserved, so the barcode picker will be clipped to fit if its aspect ratio
     * does not match the aspect ratio of the box.
     */

    ObjectFit["COVER"] = "cover";
  })((ObjectFit = BarcodePicker.ObjectFit || (BarcodePicker.ObjectFit = {})));
})(BarcodePicker || (BarcodePicker = {}));

/**
 * @hidden
 */

var deviceId = BrowserHelper.getDeviceId();
/**
 * @hidden
 */

var userLicenseKey;
/**
 * @hidden
 */

var scanditEngineLocation;
/**
 * Initialize and configure the Scandit Barcode Scanner SDK library. This function must be called as first thing
 * before using any other function of the library.
 *
 * Depending on parameters and device features, any of the following errors could be the rejected result of the returned
 * promise:
 * - `NoLicenseKeyError`
 * - `UnsupportedBrowserError`
 *
 * Camera access requests and external Scandit Engine library loads are done lazily only when needed by a
 * [[BarcodePicker]] (or [[Scanner]]) object. To make the loading process faster when scanning is actually needed, it is
 * recommended depending on the use case to create in advance a (hidden and paused) [[BarcodePicker]] or [[Scanner]]
 * object, to later simply show and unpause it when needed. You can also eagerly ask only for camera access permissions
 * by calling the [[CameraAccess.getCameras]] function.
 *
 * @param licenseKey The Scandit license key to be used by the library.
 * @param engineLocation <div class="tsd-signature-symbol">Default =&nbsp;"/"</div>
 * The location of the folder containing the external scandit-engine-sdk.min.js and
 * scandit-engine-sdk.wasm files (external Scandit Engine library).
 * By default they are retrieved from the root of the web application.
 * Can be a full URL to folder or an absolute folder path.
 * @returns A promise resolving when the library has been configured.
 */

function configure(licenseKey) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$engineLocation = _ref.engineLocation,
    engineLocation = _ref$engineLocation === void 0 ? "/" : _ref$engineLocation;

  var browserCompatibility = BrowserHelper.checkBrowserCompatibility();

  if (!browserCompatibility.fullSupport && !browserCompatibility.scannerSupport) {
    return promise$1.reject(new UnsupportedBrowserError(browserCompatibility));
  }

  if (licenseKey == null || licenseKey.trim().length < 64) {
    return promise$1.reject(
      new CustomError({
        name: "NoLicenseKeyError",
        message: "No license key provided"
      })
    );
  }

  userLicenseKey = licenseKey;
  engineLocation += engineLocation.slice(-1) === "/" ? "" : "/";

  if (/^https?:\/\//.test(engineLocation)) {
    scanditEngineLocation = "".concat(engineLocation);
  } else {
    engineLocation = engineLocation
      .split("/")
      .filter(function(s) {
        return s.length > 0;
      })
      .join("/");

    if (engineLocation === "") {
      engineLocation = "/";
    } else {
      engineLocation = "/".concat(engineLocation, "/");
    }

    if (location.protocol === "file:" || location.origin === "null") {
      scanditEngineLocation = ""
        .concat(
          location.href
            .split("/")
            .slice(0, -1)
            .join("/")
        )
        .concat(engineLocation);
    } else {
      scanditEngineLocation = "".concat(location.origin).concat(engineLocation);
    }
  }

  return promise$1.resolve();
}

export {
  Barcode,
  BarcodePicker,
  BrowserCompatibility,
  BrowserHelper,
  Camera,
  CameraAccess,
  CameraSettings,
  CustomError,
  ImageSettings,
  Parser,
  ScanResult,
  ScanSettings,
  Scanner,
  SymbologySettings,
  uaParser_1 as UAParser,
  configure,
  deviceId,
  engine,
  engineWorkerBlob,
  engineWorkerFunction,
  scanditEngineLocation,
  userLicenseKey
};
//# sourceMappingURL=index.esm.js.map
