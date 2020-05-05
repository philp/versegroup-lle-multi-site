"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (e, t) {
	"use strict";
	"object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
		if (!e.document) throw new Error("jQuery requires a window with a document");return t(e);
	} : t(e);
}("undefined" != typeof window ? window : undefined, function (e, t) {
	"use strict";
	var n = [],
	    r = e.document,
	    i = Object.getPrototypeOf,
	    o = n.slice,
	    a = n.concat,
	    s = n.push,
	    u = n.indexOf,
	    l = {},
	    c = l.toString,
	    f = l.hasOwnProperty,
	    p = f.toString,
	    d = p.call(Object),
	    h = {},
	    g = function e(t) {
		return "function" == typeof t && "number" != typeof t.nodeType;
	},
	    y = function e(t) {
		return null != t && t === t.window;
	},
	    v = { type: !0, src: !0, noModule: !0 };function m(e, t, n) {
		var i,
		    o = (t = t || r).createElement("script");if (o.text = e, n) for (i in v) {
			n[i] && (o[i] = n[i]);
		}t.head.appendChild(o).parentNode.removeChild(o);
	}function x(e) {
		return null == e ? e + "" : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e ? l[c.call(e)] || "object" : typeof e === "undefined" ? "undefined" : _typeof(e);
	}var b = "3.3.1",
	    w = function w(e, t) {
		return new w.fn.init(e, t);
	},
	    T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn = w.prototype = { jquery: "3.3.1", constructor: w, length: 0, toArray: function toArray() {
			return o.call(this);
		}, get: function get(e) {
			return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e];
		}, pushStack: function pushStack(e) {
			var t = w.merge(this.constructor(), e);return t.prevObject = this, t;
		}, each: function each(e) {
			return w.each(this, e);
		}, map: function map(e) {
			return this.pushStack(w.map(this, function (t, n) {
				return e.call(t, n, t);
			}));
		}, slice: function slice() {
			return this.pushStack(o.apply(this, arguments));
		}, first: function first() {
			return this.eq(0);
		}, last: function last() {
			return this.eq(-1);
		}, eq: function eq(e) {
			var t = this.length,
			    n = +e + (e < 0 ? t : 0);return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
		}, end: function end() {
			return this.prevObject || this.constructor();
		}, push: s, sort: n.sort, splice: n.splice }, w.extend = w.fn.extend = function () {
		var e,
		    t,
		    n,
		    r,
		    i,
		    o,
		    a = arguments[0] || {},
		    s = 1,
		    u = arguments.length,
		    l = !1;for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || g(a) || (a = {}), s === u && (a = this, s--); s < u; s++) {
			if (null != (e = arguments[s])) for (t in e) {
				n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && w.isPlainObject(n) ? n : {}, a[t] = w.extend(l, o, r)) : void 0 !== r && (a[t] = r));
			}
		}return a;
	}, w.extend({ expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(e) {
			throw new Error(e);
		}, noop: function noop() {}, isPlainObject: function isPlainObject(e) {
			var t, n;return !(!e || "[object Object]" !== c.call(e)) && (!(t = i(e)) || "function" == typeof (n = f.call(t, "constructor") && t.constructor) && p.call(n) === d);
		}, isEmptyObject: function isEmptyObject(e) {
			var t;for (t in e) {
				return !1;
			}return !0;
		}, globalEval: function globalEval(e) {
			m(e);
		}, each: function each(e, t) {
			var n,
			    r = 0;if (C(e)) {
				for (n = e.length; r < n; r++) {
					if (!1 === t.call(e[r], r, e[r])) break;
				}
			} else for (r in e) {
				if (!1 === t.call(e[r], r, e[r])) break;
			}return e;
		}, trim: function trim(e) {
			return null == e ? "" : (e + "").replace(T, "");
		}, makeArray: function makeArray(e, t) {
			var n = t || [];return null != e && (C(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n;
		}, inArray: function inArray(e, t, n) {
			return null == t ? -1 : u.call(t, e, n);
		}, merge: function merge(e, t) {
			for (var n = +t.length, r = 0, i = e.length; r < n; r++) {
				e[i++] = t[r];
			}return e.length = i, e;
		}, grep: function grep(e, t, n) {
			for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++) {
				(r = !t(e[o], o)) !== s && i.push(e[o]);
			}return i;
		}, map: function map(e, t, n) {
			var r,
			    i,
			    o = 0,
			    s = [];if (C(e)) for (r = e.length; o < r; o++) {
				null != (i = t(e[o], o, n)) && s.push(i);
			} else for (o in e) {
				null != (i = t(e[o], o, n)) && s.push(i);
			}return a.apply([], s);
		}, guid: 1, support: h }), "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]), w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
		l["[object " + t + "]"] = t.toLowerCase();
	});function C(e) {
		var t = !!e && "length" in e && e.length,
		    n = x(e);return !g(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e);
	}var E = function (e) {
		var t,
		    n,
		    r,
		    i,
		    o,
		    a,
		    s,
		    u,
		    l,
		    c,
		    f,
		    p,
		    d,
		    h,
		    g,
		    y,
		    v,
		    m,
		    x,
		    b = "sizzle" + 1 * new Date(),
		    w = e.document,
		    T = 0,
		    C = 0,
		    E = ae(),
		    k = ae(),
		    S = ae(),
		    D = function D(e, t) {
			return e === t && (f = !0), 0;
		},
		    N = {}.hasOwnProperty,
		    A = [],
		    j = A.pop,
		    q = A.push,
		    L = A.push,
		    H = A.slice,
		    O = function O(e, t) {
			for (var n = 0, r = e.length; n < r; n++) {
				if (e[n] === t) return n;
			}return -1;
		},
		    P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
		    M = "[\\x20\\t\\r\\n\\f]",
		    R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
		    I = "\\[" + M + "*(" + R + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + M + "*\\]",
		    W = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
		    $ = new RegExp(M + "+", "g"),
		    B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
		    F = new RegExp("^" + M + "*," + M + "*"),
		    _ = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
		    z = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
		    X = new RegExp(W),
		    U = new RegExp("^" + R + "$"),
		    V = { ID: new RegExp("^#(" + R + ")"), CLASS: new RegExp("^\\.(" + R + ")"), TAG: new RegExp("^(" + R + "|[*])"), ATTR: new RegExp("^" + I), PSEUDO: new RegExp("^" + W), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"), bool: new RegExp("^(?:" + P + ")$", "i"), needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i") },
		    G = /^(?:input|select|textarea|button)$/i,
		    Y = /^h\d$/i,
		    Q = /^[^{]+\{\s*\[native \w/,
		    J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    K = /[+~]/,
		    Z = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
		    ee = function ee(e, t, n) {
			var r = "0x" + t - 65536;return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
		},
		    te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		    ne = function ne(e, t) {
			return t ? "\0" === e ? "\uFFFD" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
		},
		    re = function re() {
			p();
		},
		    ie = me(function (e) {
			return !0 === e.disabled && ("form" in e || "label" in e);
		}, { dir: "parentNode", next: "legend" });try {
			L.apply(A = H.call(w.childNodes), w.childNodes), A[w.childNodes.length].nodeType;
		} catch (e) {
			L = { apply: A.length ? function (e, t) {
					q.apply(e, H.call(t));
				} : function (e, t) {
					var n = e.length,
					    r = 0;while (e[n++] = t[r++]) {}e.length = n - 1;
				} };
		}function oe(e, t, r, i) {
			var o,
			    s,
			    l,
			    c,
			    f,
			    h,
			    v,
			    m = t && t.ownerDocument,
			    T = t ? t.nodeType : 9;if (r = r || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T) return r;if (!i && ((t ? t.ownerDocument || t : w) !== d && p(t), t = t || d, g)) {
				if (11 !== T && (f = J.exec(e))) if (o = f[1]) {
					if (9 === T) {
						if (!(l = t.getElementById(o))) return r;if (l.id === o) return r.push(l), r;
					} else if (m && (l = m.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r;
				} else {
					if (f[2]) return L.apply(r, t.getElementsByTagName(e)), r;if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return L.apply(r, t.getElementsByClassName(o)), r;
				}if (n.qsa && !S[e + " "] && (!y || !y.test(e))) {
					if (1 !== T) m = t, v = e;else if ("object" !== t.nodeName.toLowerCase()) {
						(c = t.getAttribute("id")) ? c = c.replace(te, ne) : t.setAttribute("id", c = b), s = (h = a(e)).length;while (s--) {
							h[s] = "#" + c + " " + ve(h[s]);
						}v = h.join(","), m = K.test(e) && ge(t.parentNode) || t;
					}if (v) try {
						return L.apply(r, m.querySelectorAll(v)), r;
					} catch (e) {} finally {
						c === b && t.removeAttribute("id");
					}
				}
			}return u(e.replace(B, "$1"), t, r, i);
		}function ae() {
			var e = [];function t(n, i) {
				return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i;
			}return t;
		}function se(e) {
			return e[b] = !0, e;
		}function ue(e) {
			var t = d.createElement("fieldset");try {
				return !!e(t);
			} catch (e) {
				return !1;
			} finally {
				t.parentNode && t.parentNode.removeChild(t), t = null;
			}
		}function le(e, t) {
			var n = e.split("|"),
			    i = n.length;while (i--) {
				r.attrHandle[n[i]] = t;
			}
		}function ce(e, t) {
			var n = t && e,
			    r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;if (r) return r;if (n) while (n = n.nextSibling) {
				if (n === t) return -1;
			}return e ? 1 : -1;
		}function fe(e) {
			return function (t) {
				return "input" === t.nodeName.toLowerCase() && t.type === e;
			};
		}function pe(e) {
			return function (t) {
				var n = t.nodeName.toLowerCase();return ("input" === n || "button" === n) && t.type === e;
			};
		}function de(e) {
			return function (t) {
				return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ie(t) === e : t.disabled === e : "label" in t && t.disabled === e;
			};
		}function he(e) {
			return se(function (t) {
				return t = +t, se(function (n, r) {
					var i,
					    o = e([], n.length, t),
					    a = o.length;while (a--) {
						n[i = o[a]] && (n[i] = !(r[i] = n[i]));
					}
				});
			});
		}function ge(e) {
			return e && "undefined" != typeof e.getElementsByTagName && e;
		}n = oe.support = {}, o = oe.isXML = function (e) {
			var t = e && (e.ownerDocument || e).documentElement;return !!t && "HTML" !== t.nodeName;
		}, p = oe.setDocument = function (e) {
			var t,
			    i,
			    a = e ? e.ownerDocument || e : w;return a !== d && 9 === a.nodeType && a.documentElement ? (d = a, h = d.documentElement, g = !o(d), w !== d && (i = d.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ue(function (e) {
				return e.className = "i", !e.getAttribute("className");
			}), n.getElementsByTagName = ue(function (e) {
				return e.appendChild(d.createComment("")), !e.getElementsByTagName("*").length;
			}), n.getElementsByClassName = Q.test(d.getElementsByClassName), n.getById = ue(function (e) {
				return h.appendChild(e).id = b, !d.getElementsByName || !d.getElementsByName(b).length;
			}), n.getById ? (r.filter.ID = function (e) {
				var t = e.replace(Z, ee);return function (e) {
					return e.getAttribute("id") === t;
				};
			}, r.find.ID = function (e, t) {
				if ("undefined" != typeof t.getElementById && g) {
					var n = t.getElementById(e);return n ? [n] : [];
				}
			}) : (r.filter.ID = function (e) {
				var t = e.replace(Z, ee);return function (e) {
					var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");return n && n.value === t;
				};
			}, r.find.ID = function (e, t) {
				if ("undefined" != typeof t.getElementById && g) {
					var n,
					    r,
					    i,
					    o = t.getElementById(e);if (o) {
						if ((n = o.getAttributeNode("id")) && n.value === e) return [o];i = t.getElementsByName(e), r = 0;while (o = i[r++]) {
							if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
						}
					}return [];
				}
			}), r.find.TAG = n.getElementsByTagName ? function (e, t) {
				return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0;
			} : function (e, t) {
				var n,
				    r = [],
				    i = 0,
				    o = t.getElementsByTagName(e);if ("*" === e) {
					while (n = o[i++]) {
						1 === n.nodeType && r.push(n);
					}return r;
				}return o;
			}, r.find.CLASS = n.getElementsByClassName && function (e, t) {
				if ("undefined" != typeof t.getElementsByClassName && g) return t.getElementsByClassName(e);
			}, v = [], y = [], (n.qsa = Q.test(d.querySelectorAll)) && (ue(function (e) {
				h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && y.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || y.push("\\[" + M + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + b + "-]").length || y.push("~="), e.querySelectorAll(":checked").length || y.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || y.push(".#.+[+~]");
			}), ue(function (e) {
				e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t = d.createElement("input");t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && y.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && y.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && y.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), y.push(",.*:");
			})), (n.matchesSelector = Q.test(m = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function (e) {
				n.disconnectedMatch = m.call(e, "*"), m.call(e, "[s!='']:x"), v.push("!=", W);
			}), y = y.length && new RegExp(y.join("|")), v = v.length && new RegExp(v.join("|")), t = Q.test(h.compareDocumentPosition), x = t || Q.test(h.contains) ? function (e, t) {
				var n = 9 === e.nodeType ? e.documentElement : e,
				    r = t && t.parentNode;return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
			} : function (e, t) {
				if (t) while (t = t.parentNode) {
					if (t === e) return !0;
				}return !1;
			}, D = t ? function (e, t) {
				if (e === t) return f = !0, 0;var r = !e.compareDocumentPosition - !t.compareDocumentPosition;return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === d || e.ownerDocument === w && x(w, e) ? -1 : t === d || t.ownerDocument === w && x(w, t) ? 1 : c ? O(c, e) - O(c, t) : 0 : 4 & r ? -1 : 1);
			} : function (e, t) {
				if (e === t) return f = !0, 0;var n,
				    r = 0,
				    i = e.parentNode,
				    o = t.parentNode,
				    a = [e],
				    s = [t];if (!i || !o) return e === d ? -1 : t === d ? 1 : i ? -1 : o ? 1 : c ? O(c, e) - O(c, t) : 0;if (i === o) return ce(e, t);n = e;while (n = n.parentNode) {
					a.unshift(n);
				}n = t;while (n = n.parentNode) {
					s.unshift(n);
				}while (a[r] === s[r]) {
					r++;
				}return r ? ce(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0;
			}, d) : d;
		}, oe.matches = function (e, t) {
			return oe(e, null, null, t);
		}, oe.matchesSelector = function (e, t) {
			if ((e.ownerDocument || e) !== d && p(e), t = t.replace(z, "='$1']"), n.matchesSelector && g && !S[t + " "] && (!v || !v.test(t)) && (!y || !y.test(t))) try {
				var r = m.call(e, t);if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r;
			} catch (e) {}return oe(t, d, null, [e]).length > 0;
		}, oe.contains = function (e, t) {
			return (e.ownerDocument || e) !== d && p(e), x(e, t);
		}, oe.attr = function (e, t) {
			(e.ownerDocument || e) !== d && p(e);var i = r.attrHandle[t.toLowerCase()],
			    o = i && N.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null;
		}, oe.escape = function (e) {
			return (e + "").replace(te, ne);
		}, oe.error = function (e) {
			throw new Error("Syntax error, unrecognized expression: " + e);
		}, oe.uniqueSort = function (e) {
			var t,
			    r = [],
			    i = 0,
			    o = 0;if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(D), f) {
				while (t = e[o++]) {
					t === e[o] && (i = r.push(o));
				}while (i--) {
					e.splice(r[i], 1);
				}
			}return c = null, e;
		}, i = oe.getText = function (e) {
			var t,
			    n = "",
			    r = 0,
			    o = e.nodeType;if (o) {
				if (1 === o || 9 === o || 11 === o) {
					if ("string" == typeof e.textContent) return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
						n += i(e);
					}
				} else if (3 === o || 4 === o) return e.nodeValue;
			} else while (t = e[r++]) {
				n += i(t);
			}return n;
		}, (r = oe.selectors = { cacheLength: 50, createPseudo: se, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
					return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
				}, CHILD: function CHILD(e) {
					return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e;
				}, PSEUDO: function PSEUDO(e) {
					var t,
					    n = !e[6] && e[2];return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
				} }, filter: { TAG: function TAG(e) {
					var t = e.replace(Z, ee).toLowerCase();return "*" === e ? function () {
						return !0;
					} : function (e) {
						return e.nodeName && e.nodeName.toLowerCase() === t;
					};
				}, CLASS: function CLASS(e) {
					var t = E[e + " "];return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && E(e, function (e) {
						return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
					});
				}, ATTR: function ATTR(e, t, n) {
					return function (r) {
						var i = oe.attr(r, e);return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace($, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"));
					};
				}, CHILD: function CHILD(e, t, n, r, i) {
					var o = "nth" !== e.slice(0, 3),
					    a = "last" !== e.slice(-4),
					    s = "of-type" === t;return 1 === r && 0 === i ? function (e) {
						return !!e.parentNode;
					} : function (t, n, u) {
						var l,
						    c,
						    f,
						    p,
						    d,
						    h,
						    g = o !== a ? "nextSibling" : "previousSibling",
						    y = t.parentNode,
						    v = s && t.nodeName.toLowerCase(),
						    m = !u && !s,
						    x = !1;if (y) {
							if (o) {
								while (g) {
									p = t;while (p = p[g]) {
										if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
									}h = g = "only" === e && !h && "nextSibling";
								}return !0;
							}if (h = [a ? y.firstChild : y.lastChild], a && m) {
								x = (d = (l = (c = (f = (p = y)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], p = d && y.childNodes[d];while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) {
									if (1 === p.nodeType && ++x && p === t) {
										c[e] = [T, d, x];break;
									}
								}
							} else if (m && (x = d = (l = (c = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x) while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) {
								if ((s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) && ++x && (m && ((c = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]), p === t)) break;
							}return (x -= i) === r || x % r == 0 && x / r >= 0;
						}
					};
				}, PSEUDO: function PSEUDO(e, t) {
					var n,
					    i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function (e, n) {
						var r,
						    o = i(e, t),
						    a = o.length;while (a--) {
							e[r = O(e, o[a])] = !(n[r] = o[a]);
						}
					}) : function (e) {
						return i(e, 0, n);
					}) : i;
				} }, pseudos: { not: se(function (e) {
					var t = [],
					    n = [],
					    r = s(e.replace(B, "$1"));return r[b] ? se(function (e, t, n, i) {
						var o,
						    a = r(e, null, i, []),
						    s = e.length;while (s--) {
							(o = a[s]) && (e[s] = !(t[s] = o));
						}
					}) : function (e, i, o) {
						return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop();
					};
				}), has: se(function (e) {
					return function (t) {
						return oe(e, t).length > 0;
					};
				}), contains: se(function (e) {
					return e = e.replace(Z, ee), function (t) {
						return (t.textContent || t.innerText || i(t)).indexOf(e) > -1;
					};
				}), lang: se(function (e) {
					return U.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(Z, ee).toLowerCase(), function (t) {
						var n;do {
							if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
						} while ((t = t.parentNode) && 1 === t.nodeType);return !1;
					};
				}), target: function target(t) {
					var n = e.location && e.location.hash;return n && n.slice(1) === t.id;
				}, root: function root(e) {
					return e === h;
				}, focus: function focus(e) {
					return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
				}, enabled: de(!1), disabled: de(!0), checked: function checked(e) {
					var t = e.nodeName.toLowerCase();return "input" === t && !!e.checked || "option" === t && !!e.selected;
				}, selected: function selected(e) {
					return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
				}, empty: function empty(e) {
					for (e = e.firstChild; e; e = e.nextSibling) {
						if (e.nodeType < 6) return !1;
					}return !0;
				}, parent: function parent(e) {
					return !r.pseudos.empty(e);
				}, header: function header(e) {
					return Y.test(e.nodeName);
				}, input: function input(e) {
					return G.test(e.nodeName);
				}, button: function button(e) {
					var t = e.nodeName.toLowerCase();return "input" === t && "button" === e.type || "button" === t;
				}, text: function text(e) {
					var t;return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
				}, first: he(function () {
					return [0];
				}), last: he(function (e, t) {
					return [t - 1];
				}), eq: he(function (e, t, n) {
					return [n < 0 ? n + t : n];
				}), even: he(function (e, t) {
					for (var n = 0; n < t; n += 2) {
						e.push(n);
					}return e;
				}), odd: he(function (e, t) {
					for (var n = 1; n < t; n += 2) {
						e.push(n);
					}return e;
				}), lt: he(function (e, t, n) {
					for (var r = n < 0 ? n + t : n; --r >= 0;) {
						e.push(r);
					}return e;
				}), gt: he(function (e, t, n) {
					for (var r = n < 0 ? n + t : n; ++r < t;) {
						e.push(r);
					}return e;
				}) } }).pseudos.nth = r.pseudos.eq;for (t in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
			r.pseudos[t] = fe(t);
		}for (t in { submit: !0, reset: !0 }) {
			r.pseudos[t] = pe(t);
		}function ye() {}ye.prototype = r.filters = r.pseudos, r.setFilters = new ye(), a = oe.tokenize = function (e, t) {
			var n,
			    i,
			    o,
			    a,
			    s,
			    u,
			    l,
			    c = k[e + " "];if (c) return t ? 0 : c.slice(0);s = e, u = [], l = r.preFilter;while (s) {
				n && !(i = F.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = _.exec(s)) && (n = i.shift(), o.push({ value: n, type: i[0].replace(B, " ") }), s = s.slice(n.length));for (a in r.filter) {
					!(i = V[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({ value: n, type: a, matches: i }), s = s.slice(n.length));
				}if (!n) break;
			}return t ? s.length : s ? oe.error(e) : k(e, u).slice(0);
		};function ve(e) {
			for (var t = 0, n = e.length, r = ""; t < n; t++) {
				r += e[t].value;
			}return r;
		}function me(e, t, n) {
			var r = t.dir,
			    i = t.next,
			    o = i || r,
			    a = n && "parentNode" === o,
			    s = C++;return t.first ? function (t, n, i) {
				while (t = t[r]) {
					if (1 === t.nodeType || a) return e(t, n, i);
				}return !1;
			} : function (t, n, u) {
				var l,
				    c,
				    f,
				    p = [T, s];if (u) {
					while (t = t[r]) {
						if ((1 === t.nodeType || a) && e(t, n, u)) return !0;
					}
				} else while (t = t[r]) {
					if (1 === t.nodeType || a) if (f = t[b] || (t[b] = {}), c = f[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;else {
						if ((l = c[o]) && l[0] === T && l[1] === s) return p[2] = l[2];if (c[o] = p, p[2] = e(t, n, u)) return !0;
					}
				}return !1;
			};
		}function xe(e) {
			return e.length > 1 ? function (t, n, r) {
				var i = e.length;while (i--) {
					if (!e[i](t, n, r)) return !1;
				}return !0;
			} : e[0];
		}function be(e, t, n) {
			for (var r = 0, i = t.length; r < i; r++) {
				oe(e, t[r], n);
			}return n;
		}function we(e, t, n, r, i) {
			for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) {
				(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
			}return a;
		}function Te(e, t, n, r, i, o) {
			return r && !r[b] && (r = Te(r)), i && !i[b] && (i = Te(i, o)), se(function (o, a, s, u) {
				var l,
				    c,
				    f,
				    p = [],
				    d = [],
				    h = a.length,
				    g = o || be(t || "*", s.nodeType ? [s] : s, []),
				    y = !e || !o && t ? g : we(g, p, e, s, u),
				    v = n ? i || (o ? e : h || r) ? [] : a : y;if (n && n(y, v, s, u), r) {
					l = we(v, d), r(l, [], s, u), c = l.length;while (c--) {
						(f = l[c]) && (v[d[c]] = !(y[d[c]] = f));
					}
				}if (o) {
					if (i || e) {
						if (i) {
							l = [], c = v.length;while (c--) {
								(f = v[c]) && l.push(y[c] = f);
							}i(null, v = [], l, u);
						}c = v.length;while (c--) {
							(f = v[c]) && (l = i ? O(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f));
						}
					}
				} else v = we(v === a ? v.splice(h, v.length) : v), i ? i(null, a, v, u) : L.apply(a, v);
			});
		}function Ce(e) {
			for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = me(function (e) {
				return e === t;
			}, s, !0), f = me(function (e) {
				return O(t, e) > -1;
			}, s, !0), p = [function (e, n, r) {
				var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));return t = null, i;
			}]; u < o; u++) {
				if (n = r.relative[e[u].type]) p = [me(xe(p), n)];else {
					if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
						for (i = ++u; i < o; i++) {
							if (r.relative[e[i].type]) break;
						}return Te(u > 1 && xe(p), u > 1 && ve(e.slice(0, u - 1).concat({ value: " " === e[u - 2].type ? "*" : "" })).replace(B, "$1"), n, u < i && Ce(e.slice(u, i)), i < o && Ce(e = e.slice(i)), i < o && ve(e));
					}p.push(n);
				}
			}return xe(p);
		}function Ee(e, t) {
			var n = t.length > 0,
			    i = e.length > 0,
			    o = function o(_o, a, s, u, c) {
				var f,
				    h,
				    y,
				    v = 0,
				    m = "0",
				    x = _o && [],
				    b = [],
				    w = l,
				    C = _o || i && r.find.TAG("*", c),
				    E = T += null == w ? 1 : Math.random() || .1,
				    k = C.length;for (c && (l = a === d || a || c); m !== k && null != (f = C[m]); m++) {
					if (i && f) {
						h = 0, a || f.ownerDocument === d || (p(f), s = !g);while (y = e[h++]) {
							if (y(f, a || d, s)) {
								u.push(f);break;
							}
						}c && (T = E);
					}n && ((f = !y && f) && v--, _o && x.push(f));
				}if (v += m, n && m !== v) {
					h = 0;while (y = t[h++]) {
						y(x, b, a, s);
					}if (_o) {
						if (v > 0) while (m--) {
							x[m] || b[m] || (b[m] = j.call(u));
						}b = we(b);
					}L.apply(u, b), c && !_o && b.length > 0 && v + t.length > 1 && oe.uniqueSort(u);
				}return c && (T = E, l = w), x;
			};return n ? se(o) : o;
		}return s = oe.compile = function (e, t) {
			var n,
			    r = [],
			    i = [],
			    o = S[e + " "];if (!o) {
				t || (t = a(e)), n = t.length;while (n--) {
					(o = Ce(t[n]))[b] ? r.push(o) : i.push(o);
				}(o = S(e, Ee(i, r))).selector = e;
			}return o;
		}, u = oe.select = function (e, t, n, i) {
			var o,
			    u,
			    l,
			    c,
			    f,
			    p = "function" == typeof e && e,
			    d = !i && a(e = p.selector || e);if (n = n || [], 1 === d.length) {
				if ((u = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
					if (!(t = (r.find.ID(l.matches[0].replace(Z, ee), t) || [])[0])) return n;p && (t = t.parentNode), e = e.slice(u.shift().value.length);
				}o = V.needsContext.test(e) ? 0 : u.length;while (o--) {
					if (l = u[o], r.relative[c = l.type]) break;if ((f = r.find[c]) && (i = f(l.matches[0].replace(Z, ee), K.test(u[0].type) && ge(t.parentNode) || t))) {
						if (u.splice(o, 1), !(e = i.length && ve(u))) return L.apply(n, i), n;break;
					}
				}
			}return (p || s(e, d))(i, t, !g, n, !t || K.test(e) && ge(t.parentNode) || t), n;
		}, n.sortStable = b.split("").sort(D).join("") === b, n.detectDuplicates = !!f, p(), n.sortDetached = ue(function (e) {
			return 1 & e.compareDocumentPosition(d.createElement("fieldset"));
		}), ue(function (e) {
			return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
		}) || le("type|href|height|width", function (e, t, n) {
			if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
		}), n.attributes && ue(function (e) {
			return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
		}) || le("value", function (e, t, n) {
			if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
		}), ue(function (e) {
			return null == e.getAttribute("disabled");
		}) || le(P, function (e, t, n) {
			var r;if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
		}), oe;
	}(e);w.find = E, w.expr = E.selectors, w.expr[":"] = w.expr.pseudos, w.uniqueSort = w.unique = E.uniqueSort, w.text = E.getText, w.isXMLDoc = E.isXML, w.contains = E.contains, w.escapeSelector = E.escape;var k = function k(e, t, n) {
		var r = [],
		    i = void 0 !== n;while ((e = e[t]) && 9 !== e.nodeType) {
			if (1 === e.nodeType) {
				if (i && w(e).is(n)) break;r.push(e);
			}
		}return r;
	},
	    S = function S(e, t) {
		for (var n = []; e; e = e.nextSibling) {
			1 === e.nodeType && e !== t && n.push(e);
		}return n;
	},
	    D = w.expr.match.needsContext;function N(e, t) {
		return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
	}var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e, t, n) {
		return g(t) ? w.grep(e, function (e, r) {
			return !!t.call(e, r, e) !== n;
		}) : t.nodeType ? w.grep(e, function (e) {
			return e === t !== n;
		}) : "string" != typeof t ? w.grep(e, function (e) {
			return u.call(t, e) > -1 !== n;
		}) : w.filter(t, e, n);
	}w.filter = function (e, t, n) {
		var r = t[0];return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function (e) {
			return 1 === e.nodeType;
		}));
	}, w.fn.extend({ find: function find(e) {
			var t,
			    n,
			    r = this.length,
			    i = this;if ("string" != typeof e) return this.pushStack(w(e).filter(function () {
				for (t = 0; t < r; t++) {
					if (w.contains(i[t], this)) return !0;
				}
			}));for (n = this.pushStack([]), t = 0; t < r; t++) {
				w.find(e, i[t], n);
			}return r > 1 ? w.uniqueSort(n) : n;
		}, filter: function filter(e) {
			return this.pushStack(j(this, e || [], !1));
		}, not: function not(e) {
			return this.pushStack(j(this, e || [], !0));
		}, is: function is(e) {
			return !!j(this, "string" == typeof e && D.test(e) ? w(e) : e || [], !1).length;
		} });var q,
	    L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init = function (e, t, n) {
		var i, o;if (!e) return this;if (n = n || q, "string" == typeof e) {
			if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : L.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);if (i[1]) {
				if (t = t instanceof w ? t[0] : t, w.merge(this, w.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), A.test(i[1]) && w.isPlainObject(t)) for (i in t) {
					g(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
				}return this;
			}return (o = r.getElementById(i[2])) && (this[0] = o, this.length = 1), this;
		}return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this);
	}).prototype = w.fn, q = w(r);var H = /^(?:parents|prev(?:Until|All))/,
	    O = { children: !0, contents: !0, next: !0, prev: !0 };w.fn.extend({ has: function has(e) {
			var t = w(e, this),
			    n = t.length;return this.filter(function () {
				for (var e = 0; e < n; e++) {
					if (w.contains(this, t[e])) return !0;
				}
			});
		}, closest: function closest(e, t) {
			var n,
			    r = 0,
			    i = this.length,
			    o = [],
			    a = "string" != typeof e && w(e);if (!D.test(e)) for (; r < i; r++) {
				for (n = this[r]; n && n !== t; n = n.parentNode) {
					if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
						o.push(n);break;
					}
				}
			}return this.pushStack(o.length > 1 ? w.uniqueSort(o) : o);
		}, index: function index(e) {
			return e ? "string" == typeof e ? u.call(w(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
		}, add: function add(e, t) {
			return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))));
		}, addBack: function addBack(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
		} });function P(e, t) {
		while ((e = e[t]) && 1 !== e.nodeType) {}return e;
	}w.each({ parent: function parent(e) {
			var t = e.parentNode;return t && 11 !== t.nodeType ? t : null;
		}, parents: function parents(e) {
			return k(e, "parentNode");
		}, parentsUntil: function parentsUntil(e, t, n) {
			return k(e, "parentNode", n);
		}, next: function next(e) {
			return P(e, "nextSibling");
		}, prev: function prev(e) {
			return P(e, "previousSibling");
		}, nextAll: function nextAll(e) {
			return k(e, "nextSibling");
		}, prevAll: function prevAll(e) {
			return k(e, "previousSibling");
		}, nextUntil: function nextUntil(e, t, n) {
			return k(e, "nextSibling", n);
		}, prevUntil: function prevUntil(e, t, n) {
			return k(e, "previousSibling", n);
		}, siblings: function siblings(e) {
			return S((e.parentNode || {}).firstChild, e);
		}, children: function children(e) {
			return S(e.firstChild);
		}, contents: function contents(e) {
			return N(e, "iframe") ? e.contentDocument : (N(e, "template") && (e = e.content || e), w.merge([], e.childNodes));
		} }, function (e, t) {
		w.fn[e] = function (n, r) {
			var i = w.map(this, t, n);return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = w.filter(r, i)), this.length > 1 && (O[e] || w.uniqueSort(i), H.test(e) && i.reverse()), this.pushStack(i);
		};
	});var M = /[^\x20\t\r\n\f]+/g;function R(e) {
		var t = {};return w.each(e.match(M) || [], function (e, n) {
			t[n] = !0;
		}), t;
	}w.Callbacks = function (e) {
		e = "string" == typeof e ? R(e) : w.extend({}, e);var t,
		    n,
		    r,
		    i,
		    o = [],
		    a = [],
		    s = -1,
		    u = function u() {
			for (i = i || e.once, r = t = !0; a.length; s = -1) {
				n = a.shift();while (++s < o.length) {
					!1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
				}
			}e.memory || (n = !1), t = !1, i && (o = n ? [] : "");
		},
		    l = { add: function add() {
				return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
					w.each(n, function (n, r) {
						g(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== x(r) && t(r);
					});
				}(arguments), n && !t && u()), this;
			}, remove: function remove() {
				return w.each(arguments, function (e, t) {
					var n;while ((n = w.inArray(t, o, n)) > -1) {
						o.splice(n, 1), n <= s && s--;
					}
				}), this;
			}, has: function has(e) {
				return e ? w.inArray(e, o) > -1 : o.length > 0;
			}, empty: function empty() {
				return o && (o = []), this;
			}, disable: function disable() {
				return i = a = [], o = n = "", this;
			}, disabled: function disabled() {
				return !o;
			}, lock: function lock() {
				return i = a = [], n || t || (o = n = ""), this;
			}, locked: function locked() {
				return !!i;
			}, fireWith: function fireWith(e, n) {
				return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this;
			}, fire: function fire() {
				return l.fireWith(this, arguments), this;
			}, fired: function fired() {
				return !!r;
			} };return l;
	};function I(e) {
		return e;
	}function W(e) {
		throw e;
	}function $(e, t, n, r) {
		var i;try {
			e && g(i = e.promise) ? i.call(e).done(t).fail(n) : e && g(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
		} catch (e) {
			n.apply(void 0, [e]);
		}
	}w.extend({ Deferred: function Deferred(t) {
			var n = [["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2], ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]],
			    r = "pending",
			    i = { state: function state() {
					return r;
				}, always: function always() {
					return o.done(arguments).fail(arguments), this;
				}, "catch": function _catch(e) {
					return i.then(null, e);
				}, pipe: function pipe() {
					var e = arguments;return w.Deferred(function (t) {
						w.each(n, function (n, r) {
							var i = g(e[r[4]]) && e[r[4]];o[r[1]](function () {
								var e = i && i.apply(this, arguments);e && g(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments);
							});
						}), e = null;
					}).promise();
				}, then: function then(t, r, i) {
					var o = 0;function a(t, n, r, i) {
						return function () {
							var s = this,
							    u = arguments,
							    l = function l() {
								var e, l;if (!(t < o)) {
									if ((e = r.apply(s, u)) === n.promise()) throw new TypeError("Thenable self-resolution");l = e && ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e) && e.then, g(l) ? i ? l.call(e, a(o, n, I, i), a(o, n, W, i)) : (o++, l.call(e, a(o, n, I, i), a(o, n, W, i), a(o, n, I, n.notifyWith))) : (r !== I && (s = void 0, u = [e]), (i || n.resolveWith)(s, u));
								}
							},
							    c = i ? l : function () {
								try {
									l();
								} catch (e) {
									w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, c.stackTrace), t + 1 >= o && (r !== W && (s = void 0, u = [e]), n.rejectWith(s, u));
								}
							};t ? c() : (w.Deferred.getStackHook && (c.stackTrace = w.Deferred.getStackHook()), e.setTimeout(c));
						};
					}return w.Deferred(function (e) {
						n[0][3].add(a(0, e, g(i) ? i : I, e.notifyWith)), n[1][3].add(a(0, e, g(t) ? t : I)), n[2][3].add(a(0, e, g(r) ? r : W));
					}).promise();
				}, promise: function promise(e) {
					return null != e ? w.extend(e, i) : i;
				} },
			    o = {};return w.each(n, function (e, t) {
				var a = t[2],
				    s = t[5];i[t[1]] = a.add, s && a.add(function () {
					r = s;
				}, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), o[t[0]] = function () {
					return o[t[0] + "With"](this === o ? void 0 : this, arguments), this;
				}, o[t[0] + "With"] = a.fireWith;
			}), i.promise(o), t && t.call(o, o), o;
		}, when: function when(e) {
			var t = arguments.length,
			    n = t,
			    r = Array(n),
			    i = o.call(arguments),
			    a = w.Deferred(),
			    s = function s(e) {
				return function (n) {
					r[e] = this, i[e] = arguments.length > 1 ? o.call(arguments) : n, --t || a.resolveWith(r, i);
				};
			};if (t <= 1 && ($(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || g(i[n] && i[n].then))) return a.then();while (n--) {
				$(i[n], s(n), a.reject);
			}return a.promise();
		} });var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook = function (t, n) {
		e.console && e.console.warn && t && B.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
	}, w.readyException = function (t) {
		e.setTimeout(function () {
			throw t;
		});
	};var F = w.Deferred();w.fn.ready = function (e) {
		return F.then(e)["catch"](function (e) {
			w.readyException(e);
		}), this;
	}, w.extend({ isReady: !1, readyWait: 1, ready: function ready(e) {
			(!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0, !0 !== e && --w.readyWait > 0 || F.resolveWith(r, [w]));
		} }), w.ready.then = F.then;function _() {
		r.removeEventListener("DOMContentLoaded", _), e.removeEventListener("load", _), w.ready();
	}"complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? e.setTimeout(w.ready) : (r.addEventListener("DOMContentLoaded", _), e.addEventListener("load", _));var z = function z(e, t, n, r, i, o, a) {
		var s = 0,
		    u = e.length,
		    l = null == n;if ("object" === x(n)) {
			i = !0;for (s in n) {
				z(e, t, s, n[s], !0, o, a);
			}
		} else if (void 0 !== r && (i = !0, g(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
			return l.call(w(e), n);
		})), t)) for (; s < u; s++) {
			t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
		}return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
	},
	    X = /^-ms-/,
	    U = /-([a-z])/g;function V(e, t) {
		return t.toUpperCase();
	}function G(e) {
		return e.replace(X, "ms-").replace(U, V);
	}var Y = function Y(e) {
		return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
	};function Q() {
		this.expando = w.expando + Q.uid++;
	}Q.uid = 1, Q.prototype = { cache: function cache(e) {
			var t = e[this.expando];return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t;
		}, set: function set(e, t, n) {
			var r,
			    i = this.cache(e);if ("string" == typeof t) i[G(t)] = n;else for (r in t) {
				i[G(r)] = t[r];
			}return i;
		}, get: function get(e, t) {
			return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][G(t)];
		}, access: function access(e, t, n) {
			return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
		}, remove: function remove(e, t) {
			var n,
			    r = e[this.expando];if (void 0 !== r) {
				if (void 0 !== t) {
					n = (t = Array.isArray(t) ? t.map(G) : (t = G(t)) in r ? [t] : t.match(M) || []).length;while (n--) {
						delete r[t[n]];
					}
				}(void 0 === t || w.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
			}
		}, hasData: function hasData(e) {
			var t = e[this.expando];return void 0 !== t && !w.isEmptyObject(t);
		} };var J = new Q(),
	    K = new Q(),
	    Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    ee = /[A-Z]/g;function te(e) {
		return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Z.test(e) ? JSON.parse(e) : e);
	}function ne(e, t, n) {
		var r;if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(ee, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
			try {
				n = te(n);
			} catch (e) {}K.set(e, t, n);
		} else n = void 0;return n;
	}w.extend({ hasData: function hasData(e) {
			return K.hasData(e) || J.hasData(e);
		}, data: function data(e, t, n) {
			return K.access(e, t, n);
		}, removeData: function removeData(e, t) {
			K.remove(e, t);
		}, _data: function _data(e, t, n) {
			return J.access(e, t, n);
		}, _removeData: function _removeData(e, t) {
			J.remove(e, t);
		} }), w.fn.extend({ data: function data(e, t) {
			var n,
			    r,
			    i,
			    o = this[0],
			    a = o && o.attributes;if (void 0 === e) {
				if (this.length && (i = K.get(o), 1 === o.nodeType && !J.get(o, "hasDataAttrs"))) {
					n = a.length;while (n--) {
						a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = G(r.slice(5)), ne(o, r, i[r]));
					}J.set(o, "hasDataAttrs", !0);
				}return i;
			}return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? this.each(function () {
				K.set(this, e);
			}) : z(this, function (t) {
				var n;if (o && void 0 === t) {
					if (void 0 !== (n = K.get(o, e))) return n;if (void 0 !== (n = ne(o, e))) return n;
				} else this.each(function () {
					K.set(this, e, t);
				});
			}, null, t, arguments.length > 1, null, !0);
		}, removeData: function removeData(e) {
			return this.each(function () {
				K.remove(this, e);
			});
		} }), w.extend({ queue: function queue(e, t, n) {
			var r;if (e) return t = (t || "fx") + "queue", r = J.get(e, t), n && (!r || Array.isArray(n) ? r = J.access(e, t, w.makeArray(n)) : r.push(n)), r || [];
		}, dequeue: function dequeue(e, t) {
			t = t || "fx";var n = w.queue(e, t),
			    r = n.length,
			    i = n.shift(),
			    o = w._queueHooks(e, t),
			    a = function a() {
				w.dequeue(e, t);
			};"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
		}, _queueHooks: function _queueHooks(e, t) {
			var n = t + "queueHooks";return J.get(e, n) || J.access(e, n, { empty: w.Callbacks("once memory").add(function () {
					J.remove(e, [t + "queue", n]);
				}) });
		} }), w.fn.extend({ queue: function queue(e, t) {
			var n = 2;return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function () {
				var n = w.queue(this, e, t);w._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e);
			});
		}, dequeue: function dequeue(e) {
			return this.each(function () {
				w.dequeue(this, e);
			});
		}, clearQueue: function clearQueue(e) {
			return this.queue(e || "fx", []);
		}, promise: function promise(e, t) {
			var n,
			    r = 1,
			    i = w.Deferred(),
			    o = this,
			    a = this.length,
			    s = function s() {
				--r || i.resolveWith(o, [o]);
			};"string" != typeof e && (t = e, e = void 0), e = e || "fx";while (a--) {
				(n = J.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
			}return s(), i.promise(t);
		} });var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	    ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
	    oe = ["Top", "Right", "Bottom", "Left"],
	    ae = function ae(e, t) {
		return "none" === (e = t || e).style.display || "" === e.style.display && w.contains(e.ownerDocument, e) && "none" === w.css(e, "display");
	},
	    se = function se(e, t, n, r) {
		var i,
		    o,
		    a = {};for (o in t) {
			a[o] = e.style[o], e.style[o] = t[o];
		}i = n.apply(e, r || []);for (o in t) {
			e.style[o] = a[o];
		}return i;
	};function ue(e, t, n, r) {
		var i,
		    o,
		    a = 20,
		    s = r ? function () {
			return r.cur();
		} : function () {
			return w.css(e, t, "");
		},
		    u = s(),
		    l = n && n[3] || (w.cssNumber[t] ? "" : "px"),
		    c = (w.cssNumber[t] || "px" !== l && +u) && ie.exec(w.css(e, t));if (c && c[3] !== l) {
			u /= 2, l = l || c[3], c = +u || 1;while (a--) {
				w.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
			}c *= 2, w.style(e, t, c + l), n = n || [];
		}return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
	}var le = {};function ce(e) {
		var t,
		    n = e.ownerDocument,
		    r = e.nodeName,
		    i = le[r];return i || (t = n.body.appendChild(n.createElement(r)), i = w.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), le[r] = i, i);
	}function fe(e, t) {
		for (var n, r, i = [], o = 0, a = e.length; o < a; o++) {
			(r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = J.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && ae(r) && (i[o] = ce(r))) : "none" !== n && (i[o] = "none", J.set(r, "display", n)));
		}for (o = 0; o < a; o++) {
			null != i[o] && (e[o].style.display = i[o]);
		}return e;
	}w.fn.extend({ show: function show() {
			return fe(this, !0);
		}, hide: function hide() {
			return fe(this);
		}, toggle: function toggle(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
				ae(this) ? w(this).show() : w(this).hide();
			});
		} });var pe = /^(?:checkbox|radio)$/i,
	    de = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
	    he = /^$|^module$|\/(?:java|ecma)script/i,
	    ge = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ge.optgroup = ge.option, ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td;function ye(e, t) {
		var n;return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && N(e, t) ? w.merge([e], n) : n;
	}function ve(e, t) {
		for (var n = 0, r = e.length; n < r; n++) {
			J.set(e[n], "globalEval", !t || J.get(t[n], "globalEval"));
		}
	}var me = /<|&#?\w+;/;function xe(e, t, n, r, i) {
		for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) {
			if ((o = e[d]) || 0 === o) if ("object" === x(o)) w.merge(p, o.nodeType ? [o] : o);else if (me.test(o)) {
				a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + w.htmlPrefilter(o) + u[2], c = u[0];while (c--) {
					a = a.lastChild;
				}w.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
			} else p.push(t.createTextNode(o));
		}f.textContent = "", d = 0;while (o = p[d++]) {
			if (r && w.inArray(o, r) > -1) i && i.push(o);else if (l = w.contains(o.ownerDocument, o), a = ye(f.appendChild(o), "script"), l && ve(a), n) {
				c = 0;while (o = a[c++]) {
					he.test(o.type || "") && n.push(o);
				}
			}
		}return f;
	}!function () {
		var e = r.createDocumentFragment().appendChild(r.createElement("div")),
		    t = r.createElement("input");t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), h.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue;
	}();var be = r.documentElement,
	    we = /^key/,
	    Te = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    Ce = /^([^.]*)(?:\.(.+)|)/;function Ee() {
		return !0;
	}function ke() {
		return !1;
	}function Se() {
		try {
			return r.activeElement;
		} catch (e) {}
	}function De(e, t, n, r, i, o) {
		var a, s;if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
			"string" != typeof n && (r = r || n, n = void 0);for (s in t) {
				De(e, s, n, r, t[s], o);
			}return e;
		}if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = ke;else if (!i) return e;return 1 === o && (a = i, (i = function i(e) {
			return w().off(e), a.apply(this, arguments);
		}).guid = a.guid || (a.guid = w.guid++)), e.each(function () {
			w.event.add(this, t, i, r, n);
		});
	}w.event = { global: {}, add: function add(e, t, n, r, i) {
			var o,
			    a,
			    s,
			    u,
			    l,
			    c,
			    f,
			    p,
			    d,
			    h,
			    g,
			    y = J.get(e);if (y) {
				n.handler && (n = (o = n).handler, i = o.selector), i && w.find.matchesSelector(be, i), n.guid || (n.guid = w.guid++), (u = y.events) || (u = y.events = {}), (a = y.handle) || (a = y.handle = function (t) {
					return "undefined" != typeof w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0;
				}), l = (t = (t || "").match(M) || [""]).length;while (l--) {
					d = g = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = w.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = w.event.special[d] || {}, c = w.extend({ type: d, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && w.expr.match.needsContext.test(i), namespace: h.join(".") }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), w.event.global[d] = !0);
				}
			}
		}, remove: function remove(e, t, n, r, i) {
			var o,
			    a,
			    s,
			    u,
			    l,
			    c,
			    f,
			    p,
			    d,
			    h,
			    g,
			    y = J.hasData(e) && J.get(e);if (y && (u = y.events)) {
				l = (t = (t || "").match(M) || [""]).length;while (l--) {
					if (s = Ce.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
						f = w.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;while (o--) {
							c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
						}a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, y.handle) || w.removeEvent(e, d, y.handle), delete u[d]);
					} else for (d in u) {
						w.event.remove(e, d + t[l], n, r, !0);
					}
				}w.isEmptyObject(u) && J.remove(e, "handle events");
			}
		}, dispatch: function dispatch(e) {
			var t = w.event.fix(e),
			    n,
			    r,
			    i,
			    o,
			    a,
			    s,
			    u = new Array(arguments.length),
			    l = (J.get(this, "events") || {})[t.type] || [],
			    c = w.event.special[t.type] || {};for (u[0] = t, n = 1; n < arguments.length; n++) {
				u[n] = arguments[n];
			}if (t.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, t)) {
				s = w.event.handlers.call(this, t, l), n = 0;while ((o = s[n++]) && !t.isPropagationStopped()) {
					t.currentTarget = o.elem, r = 0;while ((a = o.handlers[r++]) && !t.isImmediatePropagationStopped()) {
						t.rnamespace && !t.rnamespace.test(a.namespace) || (t.handleObj = a, t.data = a.data, void 0 !== (i = ((w.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
					}
				}return c.postDispatch && c.postDispatch.call(this, t), t.result;
			}
		}, handlers: function handlers(e, t) {
			var n,
			    r,
			    i,
			    o,
			    a,
			    s = [],
			    u = t.delegateCount,
			    l = e.target;if (u && l.nodeType && !("click" === e.type && e.button >= 1)) for (; l !== this; l = l.parentNode || this) {
				if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
					for (o = [], a = {}, n = 0; n < u; n++) {
						void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? w(i, this).index(l) > -1 : w.find(i, this, null, [l]).length), a[i] && o.push(r);
					}o.length && s.push({ elem: l, handlers: o });
				}
			}return l = this, u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s;
		}, addProp: function addProp(e, t) {
			Object.defineProperty(w.Event.prototype, e, { enumerable: !0, configurable: !0, get: g(t) ? function () {
					if (this.originalEvent) return t(this.originalEvent);
				} : function () {
					if (this.originalEvent) return this.originalEvent[e];
				}, set: function set(t) {
					Object.defineProperty(this, e, { enumerable: !0, configurable: !0, writable: !0, value: t });
				} });
		}, fix: function fix(e) {
			return e[w.expando] ? e : new w.Event(e);
		}, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
					if (this !== Se() && this.focus) return this.focus(), !1;
				}, delegateType: "focusin" }, blur: { trigger: function trigger() {
					if (this === Se() && this.blur) return this.blur(), !1;
				}, delegateType: "focusout" }, click: { trigger: function trigger() {
					if ("checkbox" === this.type && this.click && N(this, "input")) return this.click(), !1;
				}, _default: function _default(e) {
					return N(e.target, "a");
				} }, beforeunload: { postDispatch: function postDispatch(e) {
					void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
				} } } }, w.removeEvent = function (e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n);
	}, w.Event = function (e, t) {
		if (!(this instanceof w.Event)) return new w.Event(e, t);e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ee : ke, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[w.expando] = !0;
	}, w.Event.prototype = { constructor: w.Event, isDefaultPrevented: ke, isPropagationStopped: ke, isImmediatePropagationStopped: ke, isSimulated: !1, preventDefault: function preventDefault() {
			var e = this.originalEvent;this.isDefaultPrevented = Ee, e && !this.isSimulated && e.preventDefault();
		}, stopPropagation: function stopPropagation() {
			var e = this.originalEvent;this.isPropagationStopped = Ee, e && !this.isSimulated && e.stopPropagation();
		}, stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;this.isImmediatePropagationStopped = Ee, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
		} }, w.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(e) {
			var t = e.button;return null == e.which && we.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Te.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
		} }, w.event.addProp), w.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) {
		w.event.special[e] = { delegateType: t, bindType: t, handle: function handle(e) {
				var n,
				    r = this,
				    i = e.relatedTarget,
				    o = e.handleObj;return i && (i === r || w.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
			} };
	}), w.fn.extend({ on: function on(e, t, n, r) {
			return De(this, e, t, n, r);
		}, one: function one(e, t, n, r) {
			return De(this, e, t, n, r, 1);
		}, off: function off(e, t, n) {
			var r, i;if (e && e.preventDefault && e.handleObj) return r = e.handleObj, w(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
				for (i in e) {
					this.off(i, t, e[i]);
				}return this;
			}return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ke), this.each(function () {
				w.event.remove(this, e, n, t);
			});
		} });var Ne = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
	    Ae = /<script|<style|<link/i,
	    je = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e, t) {
		return N(e, "table") && N(11 !== t.nodeType ? t : t.firstChild, "tr") ? w(e).children("tbody")[0] || e : e;
	}function He(e) {
		return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
	}function Oe(e) {
		return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
	}function Pe(e, t) {
		var n, r, i, o, a, s, u, l;if (1 === t.nodeType) {
			if (J.hasData(e) && (o = J.access(e), a = J.set(t, o), l = o.events)) {
				delete a.handle, a.events = {};for (i in l) {
					for (n = 0, r = l[i].length; n < r; n++) {
						w.event.add(t, i, l[i][n]);
					}
				}
			}K.hasData(e) && (s = K.access(e), u = w.extend({}, s), K.set(t, u));
		}
	}function Me(e, t) {
		var n = t.nodeName.toLowerCase();"input" === n && pe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue);
	}function Re(e, t, n, r) {
		t = a.apply([], t);var i,
		    o,
		    s,
		    u,
		    l,
		    c,
		    f = 0,
		    p = e.length,
		    d = p - 1,
		    y = t[0],
		    v = g(y);if (v || p > 1 && "string" == typeof y && !h.checkClone && je.test(y)) return e.each(function (i) {
			var o = e.eq(i);v && (t[0] = y.call(this, i, o.html())), Re(o, t, n, r);
		});if (p && (i = xe(t, e[0].ownerDocument, !1, e, r), o = i.firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
			for (u = (s = w.map(ye(i, "script"), He)).length; f < p; f++) {
				l = i, f !== d && (l = w.clone(l, !0, !0), u && w.merge(s, ye(l, "script"))), n.call(e[f], l, f);
			}if (u) for (c = s[s.length - 1].ownerDocument, w.map(s, Oe), f = 0; f < u; f++) {
				l = s[f], he.test(l.type || "") && !J.access(l, "globalEval") && w.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? w._evalUrl && w._evalUrl(l.src) : m(l.textContent.replace(qe, ""), c, l));
			}
		}return e;
	}function Ie(e, t, n) {
		for (var r, i = t ? w.filter(t, e) : e, o = 0; null != (r = i[o]); o++) {
			n || 1 !== r.nodeType || w.cleanData(ye(r)), r.parentNode && (n && w.contains(r.ownerDocument, r) && ve(ye(r, "script")), r.parentNode.removeChild(r));
		}return e;
	}w.extend({ htmlPrefilter: function htmlPrefilter(e) {
			return e.replace(Ne, "<$1></$2>");
		}, clone: function clone(e, t, n) {
			var r,
			    i,
			    o,
			    a,
			    s = e.cloneNode(!0),
			    u = w.contains(e.ownerDocument, e);if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e))) for (a = ye(s), r = 0, i = (o = ye(e)).length; r < i; r++) {
				Me(o[r], a[r]);
			}if (t) if (n) for (o = o || ye(e), a = a || ye(s), r = 0, i = o.length; r < i; r++) {
				Pe(o[r], a[r]);
			} else Pe(e, s);return (a = ye(s, "script")).length > 0 && ve(a, !u && ye(e, "script")), s;
		}, cleanData: function cleanData(e) {
			for (var t, n, r, i = w.event.special, o = 0; void 0 !== (n = e[o]); o++) {
				if (Y(n)) {
					if (t = n[J.expando]) {
						if (t.events) for (r in t.events) {
							i[r] ? w.event.remove(n, r) : w.removeEvent(n, r, t.handle);
						}n[J.expando] = void 0;
					}n[K.expando] && (n[K.expando] = void 0);
				}
			}
		} }), w.fn.extend({ detach: function detach(e) {
			return Ie(this, e, !0);
		}, remove: function remove(e) {
			return Ie(this, e);
		}, text: function text(e) {
			return z(this, function (e) {
				return void 0 === e ? w.text(this) : this.empty().each(function () {
					1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
				});
			}, null, e, arguments.length);
		}, append: function append() {
			return Re(this, arguments, function (e) {
				1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Le(this, e).appendChild(e);
			});
		}, prepend: function prepend() {
			return Re(this, arguments, function (e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = Le(this, e);t.insertBefore(e, t.firstChild);
				}
			});
		}, before: function before() {
			return Re(this, arguments, function (e) {
				this.parentNode && this.parentNode.insertBefore(e, this);
			});
		}, after: function after() {
			return Re(this, arguments, function (e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
			});
		}, empty: function empty() {
			for (var e, t = 0; null != (e = this[t]); t++) {
				1 === e.nodeType && (w.cleanData(ye(e, !1)), e.textContent = "");
			}return this;
		}, clone: function clone(e, t) {
			return e = null != e && e, t = null == t ? e : t, this.map(function () {
				return w.clone(this, e, t);
			});
		}, html: function html(e) {
			return z(this, function (e) {
				var t = this[0] || {},
				    n = 0,
				    r = this.length;if (void 0 === e && 1 === t.nodeType) return t.innerHTML;if ("string" == typeof e && !Ae.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = w.htmlPrefilter(e);try {
						for (; n < r; n++) {
							1 === (t = this[n] || {}).nodeType && (w.cleanData(ye(t, !1)), t.innerHTML = e);
						}t = 0;
					} catch (e) {}
				}t && this.empty().append(e);
			}, null, e, arguments.length);
		}, replaceWith: function replaceWith() {
			var e = [];return Re(this, arguments, function (t) {
				var n = this.parentNode;w.inArray(this, e) < 0 && (w.cleanData(ye(this)), n && n.replaceChild(t, this));
			}, e);
		} }), w.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
		w.fn[e] = function (e) {
			for (var n, r = [], i = w(e), o = i.length - 1, a = 0; a <= o; a++) {
				n = a === o ? this : this.clone(!0), w(i[a])[t](n), s.apply(r, n.get());
			}return this.pushStack(r);
		};
	});var We = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
	    $e = function $e(t) {
		var n = t.ownerDocument.defaultView;return n && n.opener || (n = e), n.getComputedStyle(t);
	},
	    Be = new RegExp(oe.join("|"), "i");!function () {
		function t() {
			if (c) {
				l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", be.appendChild(l).appendChild(c);var t = e.getComputedStyle(c);i = "1%" !== t.top, u = 12 === n(t.marginLeft), c.style.right = "60%", s = 36 === n(t.right), o = 36 === n(t.width), c.style.position = "absolute", a = 36 === c.offsetWidth || "absolute", be.removeChild(l), c = null;
			}
		}function n(e) {
			return Math.round(parseFloat(e));
		}var i,
		    o,
		    a,
		    s,
		    u,
		    l = r.createElement("div"),
		    c = r.createElement("div");c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === c.style.backgroundClip, w.extend(h, { boxSizingReliable: function boxSizingReliable() {
				return t(), o;
			}, pixelBoxStyles: function pixelBoxStyles() {
				return t(), s;
			}, pixelPosition: function pixelPosition() {
				return t(), i;
			}, reliableMarginLeft: function reliableMarginLeft() {
				return t(), u;
			}, scrollboxSize: function scrollboxSize() {
				return t(), a;
			} }));
	}();function Fe(e, t, n) {
		var r,
		    i,
		    o,
		    a,
		    s = e.style;return (n = n || $e(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || w.contains(e.ownerDocument, e) || (a = w.style(e, t)), !h.pixelBoxStyles() && We.test(a) && Be.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
	}function _e(e, t) {
		return { get: function get() {
				if (!e()) return (this.get = t).apply(this, arguments);delete this.get;
			} };
	}var ze = /^(none|table(?!-c[ea]).+)/,
	    Xe = /^--/,
	    Ue = { position: "absolute", visibility: "hidden", display: "block" },
	    Ve = { letterSpacing: "0", fontWeight: "400" },
	    Ge = ["Webkit", "Moz", "ms"],
	    Ye = r.createElement("div").style;function Qe(e) {
		if (e in Ye) return e;var t = e[0].toUpperCase() + e.slice(1),
		    n = Ge.length;while (n--) {
			if ((e = Ge[n] + t) in Ye) return e;
		}
	}function Je(e) {
		var t = w.cssProps[e];return t || (t = w.cssProps[e] = Qe(e) || e), t;
	}function Ke(e, t, n) {
		var r = ie.exec(t);return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
	}function Ze(e, t, n, r, i, o) {
		var a = "width" === t ? 1 : 0,
		    s = 0,
		    u = 0;if (n === (r ? "border" : "content")) return 0;for (; a < 4; a += 2) {
			"margin" === n && (u += w.css(e, n + oe[a], !0, i)), r ? ("content" === n && (u -= w.css(e, "padding" + oe[a], !0, i)), "margin" !== n && (u -= w.css(e, "border" + oe[a] + "Width", !0, i))) : (u += w.css(e, "padding" + oe[a], !0, i), "padding" !== n ? u += w.css(e, "border" + oe[a] + "Width", !0, i) : s += w.css(e, "border" + oe[a] + "Width", !0, i));
		}return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5))), u;
	}function et(e, t, n) {
		var r = $e(e),
		    i = Fe(e, t, r),
		    o = "border-box" === w.css(e, "boxSizing", !1, r),
		    a = o;if (We.test(i)) {
			if (!n) return i;i = "auto";
		}return a = a && (h.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === w.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), (i = parseFloat(i) || 0) + Ze(e, t, n || (o ? "border" : "content"), a, r, i) + "px";
	}w.extend({ cssHooks: { opacity: { get: function get(e, t) {
					if (t) {
						var n = Fe(e, "opacity");return "" === n ? "1" : n;
					}
				} } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function style(e, t, n, r) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var i,
				    o,
				    a,
				    s = G(t),
				    u = Xe.test(t),
				    l = e.style;if (u || (t = Je(s)), a = w.cssHooks[t] || w.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];"string" == (o = typeof n === "undefined" ? "undefined" : _typeof(n)) && (i = ie.exec(n)) && i[1] && (n = ue(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (w.cssNumber[s] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
			}
		}, css: function css(e, t, n, r) {
			var i,
			    o,
			    a,
			    s = G(t);return Xe.test(t) || (t = Je(s)), (a = w.cssHooks[t] || w.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Fe(e, t, r)), "normal" === i && t in Ve && (i = Ve[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i;
		} }), w.each(["height", "width"], function (e, t) {
		w.cssHooks[t] = { get: function get(e, n, r) {
				if (n) return !ze.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? et(e, t, r) : se(e, Ue, function () {
					return et(e, t, r);
				});
			}, set: function set(e, n, r) {
				var i,
				    o = $e(e),
				    a = "border-box" === w.css(e, "boxSizing", !1, o),
				    s = r && Ze(e, t, r, a, o);return a && h.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ze(e, t, "border", !1, o) - .5)), s && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = w.css(e, t)), Ke(e, n, s);
			} };
	}), w.cssHooks.marginLeft = _e(h.reliableMarginLeft, function (e, t) {
		if (t) return (parseFloat(Fe(e, "marginLeft")) || e.getBoundingClientRect().left - se(e, { marginLeft: 0 }, function () {
			return e.getBoundingClientRect().left;
		})) + "px";
	}), w.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
		w.cssHooks[e + t] = { expand: function expand(n) {
				for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) {
					i[e + oe[r] + t] = o[r] || o[r - 2] || o[0];
				}return i;
			} }, "margin" !== e && (w.cssHooks[e + t].set = Ke);
	}), w.fn.extend({ css: function css(e, t) {
			return z(this, function (e, t, n) {
				var r,
				    i,
				    o = {},
				    a = 0;if (Array.isArray(t)) {
					for (r = $e(e), i = t.length; a < i; a++) {
						o[t[a]] = w.css(e, t[a], !1, r);
					}return o;
				}return void 0 !== n ? w.style(e, t, n) : w.css(e, t);
			}, e, t, arguments.length > 1);
		} });function tt(e, t, n, r, i) {
		return new tt.prototype.init(e, t, n, r, i);
	}w.Tween = tt, tt.prototype = { constructor: tt, init: function init(e, t, n, r, i, o) {
			this.elem = e, this.prop = n, this.easing = i || w.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (w.cssNumber[n] ? "" : "px");
		}, cur: function cur() {
			var e = tt.propHooks[this.prop];return e && e.get ? e.get(this) : tt.propHooks._default.get(this);
		}, run: function run(e) {
			var t,
			    n = tt.propHooks[this.prop];return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : tt.propHooks._default.set(this), this;
		} }, tt.prototype.init.prototype = tt.prototype, tt.propHooks = { _default: { get: function get(e) {
				var t;return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
			}, set: function set(e) {
				w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[w.cssProps[e.prop]] && !w.cssHooks[e.prop] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit);
			} } }, tt.propHooks.scrollTop = tt.propHooks.scrollLeft = { set: function set(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
		} }, w.easing = { linear: function linear(e) {
			return e;
		}, swing: function swing(e) {
			return .5 - Math.cos(e * Math.PI) / 2;
		}, _default: "swing" }, w.fx = tt.prototype.init, w.fx.step = {};var nt,
	    rt,
	    it = /^(?:toggle|show|hide)$/,
	    ot = /queueHooks$/;function at() {
		rt && (!1 === r.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(at) : e.setTimeout(at, w.fx.interval), w.fx.tick());
	}function st() {
		return e.setTimeout(function () {
			nt = void 0;
		}), nt = Date.now();
	}function ut(e, t) {
		var n,
		    r = 0,
		    i = { height: e };for (t = t ? 1 : 0; r < 4; r += 2 - t) {
			i["margin" + (n = oe[r])] = i["padding" + n] = e;
		}return t && (i.opacity = i.width = e), i;
	}function lt(e, t, n) {
		for (var r, i = (pt.tweeners[t] || []).concat(pt.tweeners["*"]), o = 0, a = i.length; o < a; o++) {
			if (r = i[o].call(n, t, e)) return r;
		}
	}function ct(e, t, n) {
		var r,
		    i,
		    o,
		    a,
		    s,
		    u,
		    l,
		    c,
		    f = "width" in t || "height" in t,
		    p = this,
		    d = {},
		    h = e.style,
		    g = e.nodeType && ae(e),
		    y = J.get(e, "fxshow");n.queue || (null == (a = w._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
			a.unqueued || s();
		}), a.unqueued++, p.always(function () {
			p.always(function () {
				a.unqueued--, w.queue(e, "fx").length || a.empty.fire();
			});
		}));for (r in t) {
			if (i = t[r], it.test(i)) {
				if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
					if ("show" !== i || !y || void 0 === y[r]) continue;g = !0;
				}d[r] = y && y[r] || w.style(e, r);
			}
		}if ((u = !w.isEmptyObject(t)) || !w.isEmptyObject(d)) {
			f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = y && y.display) && (l = J.get(e, "display")), "none" === (c = w.css(e, "display")) && (l ? c = l : (fe([e], !0), l = e.style.display || l, c = w.css(e, "display"), fe([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === w.css(e, "float") && (u || (p.done(function () {
				h.display = l;
			}), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
				h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
			})), u = !1;for (r in d) {
				u || (y ? "hidden" in y && (g = y.hidden) : y = J.access(e, "fxshow", { display: l }), o && (y.hidden = !g), g && fe([e], !0), p.done(function () {
					g || fe([e]), J.remove(e, "fxshow");for (r in d) {
						w.style(e, r, d[r]);
					}
				})), u = lt(g ? y[r] : 0, r, p), r in y || (y[r] = u.start, g && (u.end = u.start, u.start = 0));
			}
		}
	}function ft(e, t) {
		var n, r, i, o, a;for (n in e) {
			if (r = G(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = w.cssHooks[r]) && "expand" in a) {
				o = a.expand(o), delete e[r];for (n in o) {
					n in e || (e[n] = o[n], t[n] = i);
				}
			} else t[r] = i;
		}
	}function pt(e, t, n) {
		var r,
		    i,
		    o = 0,
		    a = pt.prefilters.length,
		    s = w.Deferred().always(function () {
			delete u.elem;
		}),
		    u = function u() {
			if (i) return !1;for (var t = nt || st(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) {
				l.tweens[o].run(r);
			}return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1);
		},
		    l = s.promise({ elem: e, props: w.extend({}, t), opts: w.extend(!0, { specialEasing: {}, easing: w.easing._default }, n), originalProperties: t, originalOptions: n, startTime: nt || st(), duration: n.duration, tweens: [], createTween: function createTween(t, n) {
				var r = w.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);return l.tweens.push(r), r;
			}, stop: function stop(t) {
				var n = 0,
				    r = t ? l.tweens.length : 0;if (i) return this;for (i = !0; n < r; n++) {
					l.tweens[n].run(1);
				}return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this;
			} }),
		    c = l.props;for (ft(c, l.opts.specialEasing); o < a; o++) {
			if (r = pt.prefilters[o].call(l, e, c, l.opts)) return g(r.stop) && (w._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
		}return w.map(c, lt, l), g(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), w.fx.timer(w.extend(u, { elem: e, anim: l, queue: l.opts.queue })), l;
	}w.Animation = w.extend(pt, { tweeners: { "*": [function (e, t) {
				var n = this.createTween(e, t);return ue(n.elem, e, ie.exec(t), n), n;
			}] }, tweener: function tweener(e, t) {
			g(e) ? (t = e, e = ["*"]) : e = e.match(M);for (var n, r = 0, i = e.length; r < i; r++) {
				n = e[r], pt.tweeners[n] = pt.tweeners[n] || [], pt.tweeners[n].unshift(t);
			}
		}, prefilters: [ct], prefilter: function prefilter(e, t) {
			t ? pt.prefilters.unshift(e) : pt.prefilters.push(e);
		} }), w.speed = function (e, t, n) {
		var r = e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? w.extend({}, e) : { complete: n || !n && t || g(e) && e, duration: e, easing: n && t || t && !g(t) && t };return w.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in w.fx.speeds ? r.duration = w.fx.speeds[r.duration] : r.duration = w.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
			g(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue);
		}, r;
	}, w.fn.extend({ fadeTo: function fadeTo(e, t, n, r) {
			return this.filter(ae).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
		}, animate: function animate(e, t, n, r) {
			var i = w.isEmptyObject(e),
			    o = w.speed(t, n, r),
			    a = function a() {
				var t = pt(this, w.extend({}, e), o);(i || J.get(this, "finish")) && t.stop(!0);
			};return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
		}, stop: function stop(e, t, n) {
			var r = function r(e) {
				var t = e.stop;delete e.stop, t(n);
			};return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
				var t = !0,
				    i = null != e && e + "queueHooks",
				    o = w.timers,
				    a = J.get(this);if (i) a[i] && a[i].stop && r(a[i]);else for (i in a) {
					a[i] && a[i].stop && ot.test(i) && r(a[i]);
				}for (i = o.length; i--;) {
					o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
				}!t && n || w.dequeue(this, e);
			});
		}, finish: function finish(e) {
			return !1 !== e && (e = e || "fx"), this.each(function () {
				var t,
				    n = J.get(this),
				    r = n[e + "queue"],
				    i = n[e + "queueHooks"],
				    o = w.timers,
				    a = r ? r.length : 0;for (n.finish = !0, w.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) {
					o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				}for (t = 0; t < a; t++) {
					r[t] && r[t].finish && r[t].finish.call(this);
				}delete n.finish;
			});
		} }), w.each(["toggle", "show", "hide"], function (e, t) {
		var n = w.fn[t];w.fn[t] = function (e, r, i) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ut(t, !0), e, r, i);
		};
	}), w.each({ slideDown: ut("show"), slideUp: ut("hide"), slideToggle: ut("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
		w.fn[e] = function (e, n, r) {
			return this.animate(t, e, n, r);
		};
	}), w.timers = [], w.fx.tick = function () {
		var e,
		    t = 0,
		    n = w.timers;for (nt = Date.now(); t < n.length; t++) {
			(e = n[t])() || n[t] !== e || n.splice(t--, 1);
		}n.length || w.fx.stop(), nt = void 0;
	}, w.fx.timer = function (e) {
		w.timers.push(e), w.fx.start();
	}, w.fx.interval = 13, w.fx.start = function () {
		rt || (rt = !0, at());
	}, w.fx.stop = function () {
		rt = null;
	}, w.fx.speeds = { slow: 600, fast: 200, _default: 400 }, w.fn.delay = function (t, n) {
		return t = w.fx ? w.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, r) {
			var i = e.setTimeout(n, t);r.stop = function () {
				e.clearTimeout(i);
			};
		});
	}, function () {
		var e = r.createElement("input"),
		    t = r.createElement("select").appendChild(r.createElement("option"));e.type = "checkbox", h.checkOn = "" !== e.value, h.optSelected = t.selected, (e = r.createElement("input")).value = "t", e.type = "radio", h.radioValue = "t" === e.value;
	}();var dt,
	    ht = w.expr.attrHandle;w.fn.extend({ attr: function attr(e, t) {
			return z(this, w.attr, e, t, arguments.length > 1);
		}, removeAttr: function removeAttr(e) {
			return this.each(function () {
				w.removeAttr(this, e);
			});
		} }), w.extend({ attr: function attr(e, t, n) {
			var r,
			    i,
			    o = e.nodeType;if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? w.prop(e, t, n) : (1 === o && w.isXMLDoc(e) || (i = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? dt : void 0)), void 0 !== n ? null === n ? void w.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = w.find.attr(e, t)) ? void 0 : r);
		}, attrHooks: { type: { set: function set(e, t) {
					if (!h.radioValue && "radio" === t && N(e, "input")) {
						var n = e.value;return e.setAttribute("type", t), n && (e.value = n), t;
					}
				} } }, removeAttr: function removeAttr(e, t) {
			var n,
			    r = 0,
			    i = t && t.match(M);if (i && 1 === e.nodeType) while (n = i[r++]) {
				e.removeAttribute(n);
			}
		} }), dt = { set: function set(e, t, n) {
			return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n;
		} }, w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) {
		var n = ht[t] || w.find.attr;ht[t] = function (e, t, r) {
			var i,
			    o,
			    a = t.toLowerCase();return r || (o = ht[a], ht[a] = i, i = null != n(e, t, r) ? a : null, ht[a] = o), i;
		};
	});var gt = /^(?:input|select|textarea|button)$/i,
	    yt = /^(?:a|area)$/i;w.fn.extend({ prop: function prop(e, t) {
			return z(this, w.prop, e, t, arguments.length > 1);
		}, removeProp: function removeProp(e) {
			return this.each(function () {
				delete this[w.propFix[e] || e];
			});
		} }), w.extend({ prop: function prop(e, t, n) {
			var r,
			    i,
			    o = e.nodeType;if (3 !== o && 8 !== o && 2 !== o) return 1 === o && w.isXMLDoc(e) || (t = w.propFix[t] || t, i = w.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
		}, propHooks: { tabIndex: { get: function get(e) {
					var t = w.find.attr(e, "tabindex");return t ? parseInt(t, 10) : gt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1;
				} } }, propFix: { "for": "htmlFor", "class": "className" } }), h.optSelected || (w.propHooks.selected = { get: function get(e) {
			var t = e.parentNode;return t && t.parentNode && t.parentNode.selectedIndex, null;
		}, set: function set(e) {
			var t = e.parentNode;t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
		} }), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		w.propFix[this.toLowerCase()] = this;
	});function vt(e) {
		return (e.match(M) || []).join(" ");
	}function mt(e) {
		return e.getAttribute && e.getAttribute("class") || "";
	}function xt(e) {
		return Array.isArray(e) ? e : "string" == typeof e ? e.match(M) || [] : [];
	}w.fn.extend({ addClass: function addClass(e) {
			var t,
			    n,
			    r,
			    i,
			    o,
			    a,
			    s,
			    u = 0;if (g(e)) return this.each(function (t) {
				w(this).addClass(e.call(this, t, mt(this)));
			});if ((t = xt(e)).length) while (n = this[u++]) {
				if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
					a = 0;while (o = t[a++]) {
						r.indexOf(" " + o + " ") < 0 && (r += o + " ");
					}i !== (s = vt(r)) && n.setAttribute("class", s);
				}
			}return this;
		}, removeClass: function removeClass(e) {
			var t,
			    n,
			    r,
			    i,
			    o,
			    a,
			    s,
			    u = 0;if (g(e)) return this.each(function (t) {
				w(this).removeClass(e.call(this, t, mt(this)));
			});if (!arguments.length) return this.attr("class", "");if ((t = xt(e)).length) while (n = this[u++]) {
				if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
					a = 0;while (o = t[a++]) {
						while (r.indexOf(" " + o + " ") > -1) {
							r = r.replace(" " + o + " ", " ");
						}
					}i !== (s = vt(r)) && n.setAttribute("class", s);
				}
			}return this;
		}, toggleClass: function toggleClass(e, t) {
			var n = typeof e === "undefined" ? "undefined" : _typeof(e),
			    r = "string" === n || Array.isArray(e);return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each(function (n) {
				w(this).toggleClass(e.call(this, n, mt(this), t), t);
			}) : this.each(function () {
				var t, i, o, a;if (r) {
					i = 0, o = w(this), a = xt(e);while (t = a[i++]) {
						o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
					}
				} else void 0 !== e && "boolean" !== n || ((t = mt(this)) && J.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : J.get(this, "__className__") || ""));
			});
		}, hasClass: function hasClass(e) {
			var t,
			    n,
			    r = 0;t = " " + e + " ";while (n = this[r++]) {
				if (1 === n.nodeType && (" " + vt(mt(n)) + " ").indexOf(t) > -1) return !0;
			}return !1;
		} });var bt = /\r/g;w.fn.extend({ val: function val(e) {
			var t,
			    n,
			    r,
			    i = this[0];{
				if (arguments.length) return r = g(e), this.each(function (n) {
					var i;1 === this.nodeType && (null == (i = r ? e.call(this, n, w(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = w.map(i, function (e) {
						return null == e ? "" : e + "";
					})), (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i));
				});if (i) return (t = w.valHooks[i.type] || w.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(bt, "") : null == n ? "" : n;
			}
		} }), w.extend({ valHooks: { option: { get: function get(e) {
					var t = w.find.attr(e, "value");return null != t ? t : vt(w.text(e));
				} }, select: { get: function get(e) {
					var t,
					    n,
					    r,
					    i = e.options,
					    o = e.selectedIndex,
					    a = "select-one" === e.type,
					    s = a ? null : [],
					    u = a ? o + 1 : i.length;for (r = o < 0 ? u : a ? o : 0; r < u; r++) {
						if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !N(n.parentNode, "optgroup"))) {
							if (t = w(n).val(), a) return t;s.push(t);
						}
					}return s;
				}, set: function set(e, t) {
					var n,
					    r,
					    i = e.options,
					    o = w.makeArray(t),
					    a = i.length;while (a--) {
						((r = i[a]).selected = w.inArray(w.valHooks.option.get(r), o) > -1) && (n = !0);
					}return n || (e.selectedIndex = -1), o;
				} } } }), w.each(["radio", "checkbox"], function () {
		w.valHooks[this] = { set: function set(e, t) {
				if (Array.isArray(t)) return e.checked = w.inArray(w(e).val(), t) > -1;
			} }, h.checkOn || (w.valHooks[this].get = function (e) {
			return null === e.getAttribute("value") ? "on" : e.value;
		});
	}), h.focusin = "onfocusin" in e;var wt = /^(?:focusinfocus|focusoutblur)$/,
	    Tt = function Tt(e) {
		e.stopPropagation();
	};w.extend(w.event, { trigger: function trigger(t, n, i, o) {
			var a,
			    s,
			    u,
			    l,
			    c,
			    p,
			    d,
			    h,
			    v = [i || r],
			    m = f.call(t, "type") ? t.type : t,
			    x = f.call(t, "namespace") ? t.namespace.split(".") : [];if (s = h = u = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !wt.test(m + w.event.triggered) && (m.indexOf(".") > -1 && (m = (x = m.split(".")).shift(), x.sort()), c = m.indexOf(":") < 0 && "on" + m, t = t[w.expando] ? t : new w.Event(m, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t), t.isTrigger = o ? 2 : 3, t.namespace = x.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : w.makeArray(n, [t]), d = w.event.special[m] || {}, o || !d.trigger || !1 !== d.trigger.apply(i, n))) {
				if (!o && !d.noBubble && !y(i)) {
					for (l = d.delegateType || m, wt.test(l + m) || (s = s.parentNode); s; s = s.parentNode) {
						v.push(s), u = s;
					}u === (i.ownerDocument || r) && v.push(u.defaultView || u.parentWindow || e);
				}a = 0;while ((s = v[a++]) && !t.isPropagationStopped()) {
					h = s, t.type = a > 1 ? l : d.bindType || m, (p = (J.get(s, "events") || {})[t.type] && J.get(s, "handle")) && p.apply(s, n), (p = c && s[c]) && p.apply && Y(s) && (t.result = p.apply(s, n), !1 === t.result && t.preventDefault());
				}return t.type = m, o || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(v.pop(), n) || !Y(i) || c && g(i[m]) && !y(i) && ((u = i[c]) && (i[c] = null), w.event.triggered = m, t.isPropagationStopped() && h.addEventListener(m, Tt), i[m](), t.isPropagationStopped() && h.removeEventListener(m, Tt), w.event.triggered = void 0, u && (i[c] = u)), t.result;
			}
		}, simulate: function simulate(e, t, n) {
			var r = w.extend(new w.Event(), n, { type: e, isSimulated: !0 });w.event.trigger(r, null, t);
		} }), w.fn.extend({ trigger: function trigger(e, t) {
			return this.each(function () {
				w.event.trigger(e, t, this);
			});
		}, triggerHandler: function triggerHandler(e, t) {
			var n = this[0];if (n) return w.event.trigger(e, t, n, !0);
		} }), h.focusin || w.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
		var n = function n(e) {
			w.event.simulate(t, e.target, w.event.fix(e));
		};w.event.special[t] = { setup: function setup() {
				var r = this.ownerDocument || this,
				    i = J.access(r, t);i || r.addEventListener(e, n, !0), J.access(r, t, (i || 0) + 1);
			}, teardown: function teardown() {
				var r = this.ownerDocument || this,
				    i = J.access(r, t) - 1;i ? J.access(r, t, i) : (r.removeEventListener(e, n, !0), J.remove(r, t));
			} };
	});var Ct = e.location,
	    Et = Date.now(),
	    kt = /\?/;w.parseXML = function (t) {
		var n;if (!t || "string" != typeof t) return null;try {
			n = new e.DOMParser().parseFromString(t, "text/xml");
		} catch (e) {
			n = void 0;
		}return n && !n.getElementsByTagName("parsererror").length || w.error("Invalid XML: " + t), n;
	};var St = /\[\]$/,
	    Dt = /\r?\n/g,
	    Nt = /^(?:submit|button|image|reset|file)$/i,
	    At = /^(?:input|select|textarea|keygen)/i;function jt(e, t, n, r) {
		var i;if (Array.isArray(t)) w.each(t, function (t, i) {
			n || St.test(e) ? r(e, i) : jt(e + "[" + ("object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) && null != i ? t : "") + "]", i, n, r);
		});else if (n || "object" !== x(t)) r(e, t);else for (i in t) {
			jt(e + "[" + i + "]", t[i], n, r);
		}
	}w.param = function (e, t) {
		var n,
		    r = [],
		    i = function i(e, t) {
			var n = g(t) ? t() : t;r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
		};if (Array.isArray(e) || e.jquery && !w.isPlainObject(e)) w.each(e, function () {
			i(this.name, this.value);
		});else for (n in e) {
			jt(n, e[n], t, i);
		}return r.join("&");
	}, w.fn.extend({ serialize: function serialize() {
			return w.param(this.serializeArray());
		}, serializeArray: function serializeArray() {
			return this.map(function () {
				var e = w.prop(this, "elements");return e ? w.makeArray(e) : this;
			}).filter(function () {
				var e = this.type;return this.name && !w(this).is(":disabled") && At.test(this.nodeName) && !Nt.test(e) && (this.checked || !pe.test(e));
			}).map(function (e, t) {
				var n = w(this).val();return null == n ? null : Array.isArray(n) ? w.map(n, function (e) {
					return { name: t.name, value: e.replace(Dt, "\r\n") };
				}) : { name: t.name, value: n.replace(Dt, "\r\n") };
			}).get();
		} });var qt = /%20/g,
	    Lt = /#.*$/,
	    Ht = /([?&])_=[^&]*/,
	    Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
	    Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    Mt = /^(?:GET|HEAD)$/,
	    Rt = /^\/\//,
	    It = {},
	    Wt = {},
	    $t = "*/".concat("*"),
	    Bt = r.createElement("a");Bt.href = Ct.href;function Ft(e) {
		return function (t, n) {
			"string" != typeof t && (n = t, t = "*");var r,
			    i = 0,
			    o = t.toLowerCase().match(M) || [];if (g(n)) while (r = o[i++]) {
				"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
			}
		};
	}function _t(e, t, n, r) {
		var i = {},
		    o = e === Wt;function a(s) {
			var u;return i[s] = !0, w.each(e[s] || [], function (e, s) {
				var l = s(t, n, r);return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1);
			}), u;
		}return a(t.dataTypes[0]) || !i["*"] && a("*");
	}function zt(e, t) {
		var n,
		    r,
		    i = w.ajaxSettings.flatOptions || {};for (n in t) {
			void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
		}return r && w.extend(!0, e, r), e;
	}function Xt(e, t, n) {
		var r,
		    i,
		    o,
		    a,
		    s = e.contents,
		    u = e.dataTypes;while ("*" === u[0]) {
			u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
		}if (r) for (i in s) {
			if (s[i] && s[i].test(r)) {
				u.unshift(i);break;
			}
		}if (u[0] in n) o = u[0];else {
			for (i in n) {
				if (!u[0] || e.converters[i + " " + u[0]]) {
					o = i;break;
				}a || (a = i);
			}o = o || a;
		}if (o) return o !== u[0] && u.unshift(o), n[o];
	}function Ut(e, t, n, r) {
		var i,
		    o,
		    a,
		    s,
		    u,
		    l = {},
		    c = e.dataTypes.slice();if (c[1]) for (a in e.converters) {
			l[a.toLowerCase()] = e.converters[a];
		}o = c.shift();while (o) {
			if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
				if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) {
					if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
						!0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));break;
					}
				}if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
					t = a(t);
				} catch (e) {
					return { state: "parsererror", error: a ? e : "No conversion from " + u + " to " + o };
				}
			}
		}return { state: "success", data: t };
	}w.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Ct.href, type: "GET", isLocal: Pt.test(Ct.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": $t, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": w.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(e, t) {
			return t ? zt(zt(e, w.ajaxSettings), t) : zt(w.ajaxSettings, e);
		}, ajaxPrefilter: Ft(It), ajaxTransport: Ft(Wt), ajax: function ajax(t, n) {
			"object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (n = t, t = void 0), n = n || {};var i,
			    o,
			    a,
			    s,
			    u,
			    l,
			    c,
			    f,
			    p,
			    d,
			    h = w.ajaxSetup({}, n),
			    g = h.context || h,
			    y = h.context && (g.nodeType || g.jquery) ? w(g) : w.event,
			    v = w.Deferred(),
			    m = w.Callbacks("once memory"),
			    x = h.statusCode || {},
			    b = {},
			    T = {},
			    C = "canceled",
			    E = { readyState: 0, getResponseHeader: function getResponseHeader(e) {
					var t;if (c) {
						if (!s) {
							s = {};while (t = Ot.exec(a)) {
								s[t[1].toLowerCase()] = t[2];
							}
						}t = s[e.toLowerCase()];
					}return null == t ? null : t;
				}, getAllResponseHeaders: function getAllResponseHeaders() {
					return c ? a : null;
				}, setRequestHeader: function setRequestHeader(e, t) {
					return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, b[e] = t), this;
				}, overrideMimeType: function overrideMimeType(e) {
					return null == c && (h.mimeType = e), this;
				}, statusCode: function statusCode(e) {
					var t;if (e) if (c) E.always(e[E.status]);else for (t in e) {
						x[t] = [x[t], e[t]];
					}return this;
				}, abort: function abort(e) {
					var t = e || C;return i && i.abort(t), k(0, t), this;
				} };if (v.promise(E), h.url = ((t || h.url || Ct.href) + "").replace(Rt, Ct.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(M) || [""], null == h.crossDomain) {
				l = r.createElement("a");try {
					l.href = h.url, l.href = l.href, h.crossDomain = Bt.protocol + "//" + Bt.host != l.protocol + "//" + l.host;
				} catch (e) {
					h.crossDomain = !0;
				}
			}if (h.data && h.processData && "string" != typeof h.data && (h.data = w.param(h.data, h.traditional)), _t(It, h, n, E), c) return E;(f = w.event && h.global) && 0 == w.active++ && w.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Mt.test(h.type), o = h.url.replace(Lt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(qt, "+")) : (d = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (kt.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(Ht, "$1"), d = (kt.test(o) ? "&" : "?") + "_=" + Et++ + d), h.url = o + d), h.ifModified && (w.lastModified[o] && E.setRequestHeader("If-Modified-Since", w.lastModified[o]), w.etag[o] && E.setRequestHeader("If-None-Match", w.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && E.setRequestHeader("Content-Type", h.contentType), E.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : h.accepts["*"]);for (p in h.headers) {
				E.setRequestHeader(p, h.headers[p]);
			}if (h.beforeSend && (!1 === h.beforeSend.call(g, E, h) || c)) return E.abort();if (C = "abort", m.add(h.complete), E.done(h.success), E.fail(h.error), i = _t(Wt, h, n, E)) {
				if (E.readyState = 1, f && y.trigger("ajaxSend", [E, h]), c) return E;h.async && h.timeout > 0 && (u = e.setTimeout(function () {
					E.abort("timeout");
				}, h.timeout));try {
					c = !1, i.send(b, k);
				} catch (e) {
					if (c) throw e;k(-1, e);
				}
			} else k(-1, "No Transport");function k(t, n, r, s) {
				var l,
				    p,
				    d,
				    b,
				    T,
				    C = n;c || (c = !0, u && e.clearTimeout(u), i = void 0, a = s || "", E.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, r && (b = Xt(h, E, r)), b = Ut(h, b, E, l), l ? (h.ifModified && ((T = E.getResponseHeader("Last-Modified")) && (w.lastModified[o] = T), (T = E.getResponseHeader("etag")) && (w.etag[o] = T)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, p = b.data, l = !(d = b.error))) : (d = C, !t && C || (C = "error", t < 0 && (t = 0))), E.status = t, E.statusText = (n || C) + "", l ? v.resolveWith(g, [p, C, E]) : v.rejectWith(g, [E, C, d]), E.statusCode(x), x = void 0, f && y.trigger(l ? "ajaxSuccess" : "ajaxError", [E, h, l ? p : d]), m.fireWith(g, [E, C]), f && (y.trigger("ajaxComplete", [E, h]), --w.active || w.event.trigger("ajaxStop")));
			}return E;
		}, getJSON: function getJSON(e, t, n) {
			return w.get(e, t, n, "json");
		}, getScript: function getScript(e, t) {
			return w.get(e, void 0, t, "script");
		} }), w.each(["get", "post"], function (e, t) {
		w[t] = function (e, n, r, i) {
			return g(n) && (i = i || r, r = n, n = void 0), w.ajax(w.extend({ url: e, type: t, dataType: i, data: n, success: r }, w.isPlainObject(e) && e));
		};
	}), w._evalUrl = function (e) {
		return w.ajax({ url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 });
	}, w.fn.extend({ wrapAll: function wrapAll(e) {
			var t;return this[0] && (g(e) && (e = e.call(this[0])), t = w(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
				var e = this;while (e.firstElementChild) {
					e = e.firstElementChild;
				}return e;
			}).append(this)), this;
		}, wrapInner: function wrapInner(e) {
			return g(e) ? this.each(function (t) {
				w(this).wrapInner(e.call(this, t));
			}) : this.each(function () {
				var t = w(this),
				    n = t.contents();n.length ? n.wrapAll(e) : t.append(e);
			});
		}, wrap: function wrap(e) {
			var t = g(e);return this.each(function (n) {
				w(this).wrapAll(t ? e.call(this, n) : e);
			});
		}, unwrap: function unwrap(e) {
			return this.parent(e).not("body").each(function () {
				w(this).replaceWith(this.childNodes);
			}), this;
		} }), w.expr.pseudos.hidden = function (e) {
		return !w.expr.pseudos.visible(e);
	}, w.expr.pseudos.visible = function (e) {
		return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
	}, w.ajaxSettings.xhr = function () {
		try {
			return new e.XMLHttpRequest();
		} catch (e) {}
	};var Vt = { 0: 200, 1223: 204 },
	    Gt = w.ajaxSettings.xhr();h.cors = !!Gt && "withCredentials" in Gt, h.ajax = Gt = !!Gt, w.ajaxTransport(function (t) {
		var _n, r;if (h.cors || Gt && !t.crossDomain) return { send: function send(i, o) {
				var a,
				    s = t.xhr();if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (a in t.xhrFields) {
					s[a] = t.xhrFields[a];
				}t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");for (a in i) {
					s.setRequestHeader(a, i[a]);
				}_n = function n(e) {
					return function () {
						_n && (_n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Vt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? { binary: s.response } : { text: s.responseText }, s.getAllResponseHeaders()));
					};
				}, s.onload = _n(), r = s.onerror = s.ontimeout = _n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function () {
					4 === s.readyState && e.setTimeout(function () {
						_n && r();
					});
				}, _n = _n("abort");try {
					s.send(t.hasContent && t.data || null);
				} catch (e) {
					if (_n) throw e;
				}
			}, abort: function abort() {
				_n && _n();
			} };
	}), w.ajaxPrefilter(function (e) {
		e.crossDomain && (e.contents.script = !1);
	}), w.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(e) {
				return w.globalEval(e), e;
			} } }), w.ajaxPrefilter("script", function (e) {
		void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
	}), w.ajaxTransport("script", function (e) {
		if (e.crossDomain) {
			var t, _n2;return { send: function send(i, o) {
					t = w("<script>").prop({ charset: e.scriptCharset, src: e.url }).on("load error", _n2 = function n(e) {
						t.remove(), _n2 = null, e && o("error" === e.type ? 404 : 200, e.type);
					}), r.head.appendChild(t[0]);
				}, abort: function abort() {
					_n2 && _n2();
				} };
		}
	});var Yt = [],
	    Qt = /(=)\?(?=&|$)|\?\?/;w.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
			var e = Yt.pop() || w.expando + "_" + Et++;return this[e] = !0, e;
		} }), w.ajaxPrefilter("json jsonp", function (t, n, r) {
		var i,
		    o,
		    a,
		    s = !1 !== t.jsonp && (Qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Qt.test(t.data) && "data");if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Qt, "$1" + i) : !1 !== t.jsonp && (t.url += (kt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
			return a || w.error(i + " was not called"), a[0];
		}, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
			a = arguments;
		}, r.always(function () {
			void 0 === o ? w(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Yt.push(i)), a && g(o) && o(a[0]), a = o = void 0;
		}), "script";
	}), h.createHTMLDocument = function () {
		var e = r.implementation.createHTMLDocument("").body;return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length;
	}(), w.parseHTML = function (e, t, n) {
		if ("string" != typeof e) return [];"boolean" == typeof t && (n = t, t = !1);var i, o, a;return t || (h.createHTMLDocument ? ((i = (t = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href, t.head.appendChild(i)) : t = r), o = A.exec(e), a = !n && [], o ? [t.createElement(o[1])] : (o = xe([e], t, a), a && a.length && w(a).remove(), w.merge([], o.childNodes));
	}, w.fn.load = function (e, t, n) {
		var r,
		    i,
		    o,
		    a = this,
		    s = e.indexOf(" ");return s > -1 && (r = vt(e.slice(s)), e = e.slice(0, s)), g(t) ? (n = t, t = void 0) : t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (i = "POST"), a.length > 0 && w.ajax({ url: e, type: i || "GET", dataType: "html", data: t }).done(function (e) {
			o = arguments, a.html(r ? w("<div>").append(w.parseHTML(e)).find(r) : e);
		}).always(n && function (e, t) {
			a.each(function () {
				n.apply(this, o || [e.responseText, t, e]);
			});
		}), this;
	}, w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
		w.fn[t] = function (e) {
			return this.on(t, e);
		};
	}), w.expr.pseudos.animated = function (e) {
		return w.grep(w.timers, function (t) {
			return e === t.elem;
		}).length;
	}, w.offset = { setOffset: function setOffset(e, t, n) {
			var r,
			    i,
			    o,
			    a,
			    s,
			    u,
			    l,
			    c = w.css(e, "position"),
			    f = w(e),
			    p = {};"static" === c && (e.style.position = "relative"), s = f.offset(), o = w.css(e, "top"), u = w.css(e, "left"), (l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1) ? (a = (r = f.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), g(t) && (t = t.call(e, n, w.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p);
		} }, w.fn.extend({ offset: function offset(e) {
			if (arguments.length) return void 0 === e ? this : this.each(function (t) {
				w.offset.setOffset(this, e, t);
			});var t,
			    n,
			    r = this[0];if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset }) : { top: 0, left: 0 };
		}, position: function position() {
			if (this[0]) {
				var e,
				    t,
				    n,
				    r = this[0],
				    i = { top: 0, left: 0 };if ("fixed" === w.css(r, "position")) t = r.getBoundingClientRect();else {
					t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;while (e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position")) {
						e = e.parentNode;
					}e && e !== r && 1 === e.nodeType && ((i = w(e).offset()).top += w.css(e, "borderTopWidth", !0), i.left += w.css(e, "borderLeftWidth", !0));
				}return { top: t.top - i.top - w.css(r, "marginTop", !0), left: t.left - i.left - w.css(r, "marginLeft", !0) };
			}
		}, offsetParent: function offsetParent() {
			return this.map(function () {
				var e = this.offsetParent;while (e && "static" === w.css(e, "position")) {
					e = e.offsetParent;
				}return e || be;
			});
		} }), w.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, t) {
		var n = "pageYOffset" === t;w.fn[e] = function (r) {
			return z(this, function (e, r, i) {
				var o;if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i;
			}, e, r, arguments.length);
		};
	}), w.each(["top", "left"], function (e, t) {
		w.cssHooks[t] = _e(h.pixelPosition, function (e, n) {
			if (n) return n = Fe(e, t), We.test(n) ? w(e).position()[t] + "px" : n;
		});
	}), w.each({ Height: "height", Width: "width" }, function (e, t) {
		w.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, r) {
			w.fn[r] = function (i, o) {
				var a = arguments.length && (n || "boolean" != typeof i),
				    s = n || (!0 === i || !0 === o ? "margin" : "border");return z(this, function (t, n, i) {
					var o;return y(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? w.css(t, n, s) : w.style(t, n, i, s);
				}, t, a ? i : void 0, a);
			};
		});
	}), w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
		w.fn[t] = function (e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
		};
	}), w.fn.extend({ hover: function hover(e, t) {
			return this.mouseenter(e).mouseleave(t || e);
		} }), w.fn.extend({ bind: function bind(e, t, n) {
			return this.on(e, null, t, n);
		}, unbind: function unbind(e, t) {
			return this.off(e, null, t);
		}, delegate: function delegate(e, t, n, r) {
			return this.on(t, e, n, r);
		}, undelegate: function undelegate(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
		} }), w.proxy = function (e, t) {
		var n, r, i;if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return r = o.call(arguments, 2), i = function i() {
			return e.apply(t || this, r.concat(o.call(arguments)));
		}, i.guid = e.guid = e.guid || w.guid++, i;
	}, w.holdReady = function (e) {
		e ? w.readyWait++ : w.ready(!0);
	}, w.isArray = Array.isArray, w.parseJSON = JSON.parse, w.nodeName = N, w.isFunction = g, w.isWindow = y, w.camelCase = G, w.type = x, w.now = Date.now, w.isNumeric = function (e) {
		var t = w.type(e);return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
	}, "function" == typeof define && define.amd && define("jquery", [], function () {
		return w;
	});var Jt = e.jQuery,
	    Kt = e.$;return w.noConflict = function (t) {
		return e.$ === w && (e.$ = Kt), t && e.jQuery === w && (e.jQuery = Jt), w;
	}, t || (e.jQuery = e.$ = w), w;
});

/*
 * https://remysharp.com/2010/07/21/throttling-function-calls
 */
function throttle(fn, threshhold, scope) {
	threshhold || (threshhold = 250);
	var last, deferTimer;
	return function () {
		var context = scope || this;

		var now = +new Date(),
		    args = arguments;
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function () {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}

function debounce(fn, delay) {
	var timer = null;
	return function () {
		var context = this,
		    args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}

/*! Swipebox v1.4.4 | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */

;(function (window, document, $, undefined) {

	$.swipebox = function (elem, options) {

		// Default options
		var ui,
		    defaults = {
			useCSS: true,
			useSVG: true,
			initialIndexOnArray: 0,
			removeBarsOnMobile: true,
			hideCloseButtonOnMobile: false,
			hideBarsDelay: 3000,
			videoMaxWidth: 1140,
			vimeoColor: 'cccccc',
			beforeOpen: null,
			afterOpen: null,
			afterClose: null,
			afterMedia: null,
			nextSlide: null,
			prevSlide: null,
			loopAtEnd: false,
			autoplayVideos: false,
			queryStringData: {},
			toggleClassOnLoad: ''
		},
		    plugin = this,
		    elements = [],
		    // slides array [ { href:'...', title:'...' }, ...],
		$elem,
		    selector = elem.selector,
		    isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),
		    isTouch = isMobile !== null || document.createTouch !== undefined || 'ontouchstart' in window || 'onmsgesturechange' in window || navigator.msMaxTouchPoints,
		    supportSVG = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,
		    winWidth = window.innerWidth ? window.innerWidth : $(window).width(),
		    winHeight = window.innerHeight ? window.innerHeight : $(window).height(),
		    currentX = 0,

		/* jshint multistr: true */
		html = '<div id="swipebox-overlay">\
					<div id="swipebox-container">\
						<div id="swipebox-slider"></div>\
						<div id="swipebox-top-bar">\
							<div id="swipebox-title"></div>\
						</div>\
						<div id="swipebox-bottom-bar">\
							<div id="swipebox-arrows">\
								<a id="swipebox-prev"></a>\
								<a id="swipebox-next"></a>\
							</div>\
						</div>\
						<a id="swipebox-close"></a>\
					</div>\
			</div>';

		plugin.settings = {};

		$.swipebox.close = function () {
			ui.closeSlide();
		};

		$.swipebox.extend = function () {
			return ui;
		};

		plugin.init = function () {

			plugin.settings = $.extend({}, defaults, options);
			selector = plugin.settings.selector;
			if ($.isArray(elem)) {

				elements = elem;
				ui.target = $(window);
				ui.init(plugin.settings.initialIndexOnArray);
			} else {

				$(document).on('click', selector, function (event) {

					// console.log( isTouch );

					if (event.target.parentNode.className === 'slide current') {

						return false;
					}

					if (!$.isArray(elem)) {
						ui.destroy();
						$elem = $(selector);
						ui.actions();
					}

					elements = [];
					var index, relType, relVal;

					// Allow for HTML5 compliant attribute before legacy use of rel
					if (!relVal) {
						relType = 'data-rel';
						relVal = $(this).attr(relType);
					}

					if (!relVal) {
						relType = 'rel';
						relVal = $(this).attr(relType);
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						$elem = $(selector).filter('[' + relType + '="' + relVal + '"]');
					} else {
						$elem = $(selector);
					}

					$elem.each(function () {

						var title = null,
						    href = null;

						if ($(this).attr('title')) {
							title = $(this).attr('title');
						}

						if ($(this).attr('href')) {
							href = $(this).attr('href');
						}

						elements.push({
							href: href,
							title: title
						});
					});

					index = $elem.index($(this));
					event.preventDefault();
					event.stopPropagation();
					ui.target = $(event.target);
					ui.init(index);
				});
			}
		};

		ui = {

			/**
    * Initiate Swipebox
    */
			init: function init(index) {
				if (plugin.settings.beforeOpen) {
					plugin.settings.beforeOpen();
				}
				this.target.trigger('swipebox-start');
				$.swipebox.isOpen = true;
				this.build();
				this.openSlide(index);
				this.openMedia(index);
				this.preloadMedia(index + 1);
				this.preloadMedia(index - 1);
				if (plugin.settings.afterOpen) {
					plugin.settings.afterOpen(index);
				}
			},

			/**
    * Built HTML containers and fire main functions
    */
			build: function build() {
				var $this = this,
				    bg;

				$('body').append(html);

				if (supportSVG && plugin.settings.useSVG === true) {
					bg = $('#swipebox-close').css('background-image');
					bg = bg.replace('png', 'svg');
					$('#swipebox-prev, #swipebox-next, #swipebox-close').css({
						'background-image': bg
					});
				}

				if (isMobile && plugin.settings.removeBarsOnMobile) {
					$('#swipebox-bottom-bar, #swipebox-top-bar').remove();
				}

				$.each(elements, function () {
					$('#swipebox-slider').append('<div class="slide"></div>');
				});

				$this.setDim();
				$this.actions();

				if (isTouch) {
					$this.gesture();
				}

				// Devices can have both touch and keyboard input so always allow key events
				$this.keyboard();

				$this.animBars();
				$this.resize();
			},

			/**
    * Set dimensions depending on windows width and height
    */
			setDim: function setDim() {

				var width,
				    height,
				    sliderCss = {};

				// Reset dimensions on mobile orientation change
				if ('onorientationchange' in window) {

					window.addEventListener('orientationchange', function () {
						if (window.orientation === 0) {
							width = winWidth;
							height = winHeight;
						} else if (window.orientation === 90 || window.orientation === -90) {
							width = winHeight;
							height = winWidth;
						}
					}, false);
				} else {

					width = window.innerWidth ? window.innerWidth : $(window).width();
					height = window.innerHeight ? window.innerHeight : $(window).height();
				}

				sliderCss = {
					width: width,
					height: height
				};

				$('#swipebox-overlay').css(sliderCss);
			},

			/**
    * Reset dimensions on window resize envent
    */
			resize: function resize() {
				var $this = this;

				$(window).resize(function () {
					$this.setDim();
				}).resize();
			},

			/**
    * Check if device supports CSS transitions
    */
			supportTransition: function supportTransition() {

				var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition'.split(' '),
				    i;

				for (i = 0; i < prefixes.length; i++) {
					if (document.createElement('div').style[prefixes[i]] !== undefined) {
						return prefixes[i];
					}
				}
				return false;
			},

			/**
    * Check if CSS transitions are allowed (options + devicesupport)
    */
			doCssTrans: function doCssTrans() {
				if (plugin.settings.useCSS && this.supportTransition()) {
					return true;
				}
			},

			/**
    * Touch navigation
    */
			gesture: function gesture() {

				var $this = this,
				    index,
				    hDistance,
				    vDistance,
				    hDistanceLast,
				    vDistanceLast,
				    hDistancePercent,
				    vSwipe = false,
				    hSwipe = false,
				    hSwipMinDistance = 10,
				    vSwipMinDistance = 50,
				    startCoords = {},
				    endCoords = {},
				    bars = $('#swipebox-top-bar, #swipebox-bottom-bar'),
				    slider = $('#swipebox-slider');

				bars.addClass('visible-bars');
				$this.setTimeout();

				$('body').bind('touchstart', function (event) {

					$(this).addClass('touching');
					index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));
					endCoords = event.originalEvent.targetTouches[0];
					startCoords.pageX = event.originalEvent.targetTouches[0].pageX;
					startCoords.pageY = event.originalEvent.targetTouches[0].pageY;

					$('#swipebox-slider').css({
						'-webkit-transform': 'translate3d(' + currentX + '%, 0, 0)',
						'transform': 'translate3d(' + currentX + '%, 0, 0)'
					});

					$('.touching').bind('touchmove', function (event) {
						event.preventDefault();
						event.stopPropagation();
						endCoords = event.originalEvent.targetTouches[0];

						if (!hSwipe) {
							vDistanceLast = vDistance;
							vDistance = endCoords.pageY - startCoords.pageY;
							if (Math.abs(vDistance) >= vSwipMinDistance || vSwipe) {
								var opacity = 0.75 - Math.abs(vDistance) / slider.height();

								slider.css({ 'top': vDistance + 'px' });
								slider.css({ 'opacity': opacity });

								vSwipe = true;
							}
						}

						hDistanceLast = hDistance;
						hDistance = endCoords.pageX - startCoords.pageX;
						hDistancePercent = hDistance * 100 / winWidth;

						if (!hSwipe && !vSwipe && Math.abs(hDistance) >= hSwipMinDistance) {
							$('#swipebox-slider').css({
								'-webkit-transition': '',
								'transition': ''
							});
							hSwipe = true;
						}

						if (hSwipe) {

							// swipe left
							if (0 < hDistance) {

								// first slide
								if (0 === index) {
									// console.log( 'first' );
									$('#swipebox-overlay').addClass('leftSpringTouch');
								} else {
									// Follow gesture
									$('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
									$('#swipebox-slider').css({
										'-webkit-transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)',
										'transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)'
									});
								}

								// swipe rught
							} else if (0 > hDistance) {

								// last Slide
								if (elements.length === index + 1) {
									// console.log( 'last' );
									$('#swipebox-overlay').addClass('rightSpringTouch');
								} else {
									$('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
									$('#swipebox-slider').css({
										'-webkit-transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)',
										'transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)'
									});
								}
							}
						}
					});

					return false;
				}).bind('touchend', function (event) {
					event.preventDefault();
					event.stopPropagation();

					$('#swipebox-slider').css({
						'-webkit-transition': '-webkit-transform 0.4s ease',
						'transition': 'transform 0.4s ease'
					});

					vDistance = endCoords.pageY - startCoords.pageY;
					hDistance = endCoords.pageX - startCoords.pageX;
					hDistancePercent = hDistance * 100 / winWidth;

					// Swipe to bottom to close
					if (vSwipe) {
						vSwipe = false;
						if (Math.abs(vDistance) >= 2 * vSwipMinDistance && Math.abs(vDistance) > Math.abs(vDistanceLast)) {
							var vOffset = vDistance > 0 ? slider.height() : -slider.height();
							slider.animate({ top: vOffset + 'px', 'opacity': 0 }, 300, function () {
								$this.closeSlide();
							});
						} else {
							slider.animate({ top: 0, 'opacity': 1 }, 300);
						}
					} else if (hSwipe) {

						hSwipe = false;

						// swipeLeft
						if (hDistance >= hSwipMinDistance && hDistance >= hDistanceLast) {

							$this.getPrev();

							// swipeRight
						} else if (hDistance <= -hSwipMinDistance && hDistance <= hDistanceLast) {

							$this.getNext();
						}
					} else {
						// Top and bottom bars have been removed on touchable devices
						// tap
						if (!bars.hasClass('visible-bars')) {
							$this.showBars();
							$this.setTimeout();
						} else {
							$this.clearTimeout();
							$this.hideBars();
						}
					}

					$('#swipebox-slider').css({
						'-webkit-transform': 'translate3d(' + currentX + '%, 0, 0)',
						'transform': 'translate3d(' + currentX + '%, 0, 0)'
					});

					$('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
					$('.touching').off('touchmove').removeClass('touching');
				});
			},

			/**
    * Set timer to hide the action bars
    */
			setTimeout: function setTimeout() {
				if (plugin.settings.hideBarsDelay > 0) {
					var $this = this;
					$this.clearTimeout();
					$this.timeout = window.setTimeout(function () {
						$this.hideBars();
					}, plugin.settings.hideBarsDelay);
				}
			},

			/**
    * Clear timer
    */
			clearTimeout: function clearTimeout() {
				window.clearTimeout(this.timeout);
				this.timeout = null;
			},

			/**
    * Show navigation and title bars
    */
			showBars: function showBars() {
				var bars = $('#swipebox-top-bar, #swipebox-bottom-bar');
				if (this.doCssTrans()) {
					bars.addClass('visible-bars');
				} else {
					$('#swipebox-top-bar').animate({ top: 0 }, 500);
					$('#swipebox-bottom-bar').animate({ bottom: 0 }, 500);
					setTimeout(function () {
						bars.addClass('visible-bars');
					}, 1000);
				}
			},

			/**
    * Hide navigation and title bars
    */
			hideBars: function hideBars() {
				var bars = $('#swipebox-top-bar, #swipebox-bottom-bar');
				if (this.doCssTrans()) {
					bars.removeClass('visible-bars');
				} else {
					$('#swipebox-top-bar').animate({ top: '-50px' }, 500);
					$('#swipebox-bottom-bar').animate({ bottom: '-50px' }, 500);
					setTimeout(function () {
						bars.removeClass('visible-bars');
					}, 1000);
				}
			},

			/**
    * Animate navigation and top bars
    */
			animBars: function animBars() {
				var $this = this,
				    bars = $('#swipebox-top-bar, #swipebox-bottom-bar');

				bars.addClass('visible-bars');
				$this.setTimeout();

				$('#swipebox-slider').click(function () {
					if (!bars.hasClass('visible-bars')) {
						$this.showBars();
						$this.setTimeout();
					}
				});

				$('#swipebox-bottom-bar').hover(function () {
					$this.showBars();
					bars.addClass('visible-bars');
					$this.clearTimeout();
				}, function () {
					if (plugin.settings.hideBarsDelay > 0) {
						bars.removeClass('visible-bars');
						$this.setTimeout();
					}
				});
			},

			/**
    * Keyboard navigation
    */
			keyboard: function keyboard() {
				var $this = this;
				$(window).bind('keyup', function (event) {
					event.preventDefault();
					event.stopPropagation();

					if (event.keyCode === 37) {

						$this.getPrev();
					} else if (event.keyCode === 39) {

						$this.getNext();
					} else if (event.keyCode === 27) {

						$this.closeSlide();
					}
				});
			},

			/**
    * Navigation events : go to next slide, go to prevous slide and close
    */
			actions: function actions() {
				var $this = this,
				    action = 'touchend click'; // Just detect for both event types to allow for multi-input

				if (elements.length < 2) {

					$('#swipebox-bottom-bar').hide();

					if (undefined === elements[1]) {
						$('#swipebox-top-bar').hide();
					}
				} else {
					$('#swipebox-prev').bind(action, function (event) {
						event.preventDefault();
						event.stopPropagation();
						$this.getPrev();
						$this.setTimeout();
					});

					$('#swipebox-next').bind(action, function (event) {
						event.preventDefault();
						event.stopPropagation();
						$this.getNext();
						$this.setTimeout();
					});
				}

				$('#swipebox-close').bind(action, function () {
					$this.closeSlide();
				});
			},

			/**
    * Set current slide
    */
			setSlide: function setSlide(index, isFirst) {

				isFirst = isFirst || false;

				var slider = $('#swipebox-slider');

				currentX = -index * 100;

				if (this.doCssTrans()) {
					slider.css({
						'-webkit-transform': 'translate3d(' + -index * 100 + '%, 0, 0)',
						'transform': 'translate3d(' + -index * 100 + '%, 0, 0)'
					});
				} else {
					slider.animate({ left: -index * 100 + '%' });
				}

				$('#swipebox-slider .slide').removeClass('current');
				$('#swipebox-slider .slide').eq(index).addClass('current');
				this.setTitle(index);

				if (isFirst) {
					slider.fadeIn();
				}

				$('#swipebox-prev, #swipebox-next').removeClass('disabled');

				if (index === 0) {
					$('#swipebox-prev').addClass('disabled');
				} else if (index === elements.length - 1 && plugin.settings.loopAtEnd !== true) {
					$('#swipebox-next').addClass('disabled');
				}
			},

			/**
    * Open slide
    */
			openSlide: function openSlide(index) {
				$('html').addClass('swipebox-html');
				if (isTouch) {
					$('html').addClass('swipebox-touch');

					if (plugin.settings.hideCloseButtonOnMobile) {
						$('html').addClass('swipebox-no-close-button');
					}
				} else {
					$('html').addClass('swipebox-no-touch');
				}
				$(window).trigger('resize'); // fix scroll bar visibility on desktop
				this.setSlide(index, true);
			},

			/**
    * Set a time out if the media is a video
    */
			preloadMedia: function preloadMedia(index) {
				var $this = this,
				    src = null;

				if (elements[index] !== undefined) {
					src = elements[index].href;
				}

				if (!$this.isVideo(src)) {
					setTimeout(function () {
						$this.openMedia(index);
					}, 1000);
				} else {
					$this.openMedia(index);
				}
			},

			/**
    * Open
    */
			openMedia: function openMedia(index) {
				var $this = this,
				    src,
				    slide;

				if (elements[index] !== undefined) {
					src = elements[index].href;
				}

				if (index < 0 || index >= elements.length) {
					return false;
				}

				slide = $('#swipebox-slider .slide').eq(index);

				if (!$this.isVideo(src)) {
					slide.addClass('slide-loading');
					$this.loadMedia(src, function () {
						slide.removeClass('slide-loading');
						slide.html(this);

						if (plugin.settings.afterMedia) {
							plugin.settings.afterMedia(index);
						}
					});
				} else {
					slide.html($this.getVideo(src));

					if (plugin.settings.afterMedia) {
						plugin.settings.afterMedia(index);
					}
				}
			},

			/**
    * Set link title attribute as caption
    */
			setTitle: function setTitle(index) {
				var title = null;

				$('#swipebox-title').empty();

				if (elements[index] !== undefined) {
					title = elements[index].title;
				}

				if (title) {
					$('#swipebox-top-bar').show();
					$('#swipebox-title').append(title);
				} else {
					$('#swipebox-top-bar').hide();
				}
			},

			/**
    * Check if the URL is a video
    */
			isVideo: function isVideo(src) {

				if (src) {
					if (src.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || src.match(/vimeo\.com\/([0-9]*)/) || src.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)) {
						return true;
					}

					if (src.toLowerCase().indexOf('swipeboxvideo=1') >= 0) {

						return true;
					}
				}
			},

			/**
    * Parse URI querystring and:
    * - overrides value provided via dictionary
    * - rebuild it again returning a string
    */
			parseUri: function parseUri(uri, customData) {
				var a = document.createElement('a'),
				    qs = {};

				// Decode the URI
				a.href = decodeURIComponent(uri);

				// QueryString to Object
				if (a.search) {
					qs = JSON.parse('{"' + a.search.toLowerCase().replace('?', '').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
				}

				// Extend with custom data
				if ($.isPlainObject(customData)) {
					qs = $.extend(qs, customData, plugin.settings.queryStringData); // The dev has always the final word
				}

				// Return querystring as a string
				return $.map(qs, function (val, key) {
					if (val && val > '') {
						return encodeURIComponent(key) + '=' + encodeURIComponent(val);
					}
				}).join('&');
			},

			/**
    * Get video iframe code from URL
    */
			getVideo: function getVideo(url) {
				var iframe = '',
				    youtubeUrl = url.match(/((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/),
				    youtubeShortUrl = url.match(/(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/),
				    vimeoUrl = url.match(/(?:www\.)?vimeo\.com\/([0-9]*)/),
				    qs = '';
				if (youtubeUrl || youtubeShortUrl) {
					if (youtubeShortUrl) {
						youtubeUrl = youtubeShortUrl;
					}
					qs = ui.parseUri(url, {
						'autoplay': plugin.settings.autoplayVideos ? '1' : '0',
						'v': ''
					});
					iframe = '<iframe width="560" height="315" src="//' + youtubeUrl[1] + '/embed/' + youtubeUrl[2] + '?' + qs + '" frameborder="0" allowfullscreen></iframe>';
				} else if (vimeoUrl) {
					qs = ui.parseUri(url, {
						'autoplay': plugin.settings.autoplayVideos ? '1' : '0',
						'byline': '0',
						'portrait': '0',
						'color': plugin.settings.vimeoColor
					});
					iframe = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + vimeoUrl[1] + '?' + qs + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
				} else {
					iframe = '<iframe width="560" height="315" src="' + url + '" frameborder="0" allowfullscreen></iframe>';
				}

				return '<div class="swipebox-video-container" style="max-width:' + plugin.settings.videoMaxWidth + 'px"><div class="swipebox-video">' + iframe + '</div></div>';
			},

			/**
    * Load image
    */
			loadMedia: function loadMedia(src, callback) {
				// Inline content
				if (src.trim().indexOf('#') === 0) {
					callback.call($('<div>', {
						'class': 'swipebox-inline-container'
					}).append($(src).clone().toggleClass(plugin.settings.toggleClassOnLoad)));
				}
				// Everything else
				else {
						if (!this.isVideo(src)) {
							var img = $('<img>').on('load', function () {
								callback.call(img);
							});

							img.attr('src', src);
						}
					}
			},

			/**
    * Get next slide
    */
			getNext: function getNext() {
				var $this = this,
				    src,
				    index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));
				if (index + 1 < elements.length) {

					src = $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src');
					$('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src', src);
					index++;
					$this.setSlide(index);
					$this.preloadMedia(index + 1);
					if (plugin.settings.nextSlide) {
						plugin.settings.nextSlide(index);
					}
				} else {

					if (plugin.settings.loopAtEnd === true) {
						src = $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src');
						$('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src', src);
						index = 0;
						$this.preloadMedia(index);
						$this.setSlide(index);
						$this.preloadMedia(index + 1);
						if (plugin.settings.nextSlide) {
							plugin.settings.nextSlide(index);
						}
					} else {
						$('#swipebox-overlay').addClass('rightSpring');
						setTimeout(function () {
							$('#swipebox-overlay').removeClass('rightSpring');
						}, 500);
					}
				}
			},

			/**
    * Get previous slide
    */
			getPrev: function getPrev() {
				var index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current')),
				    src;
				if (index > 0) {
					src = $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src');
					$('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src', src);
					index--;
					this.setSlide(index);
					this.preloadMedia(index - 1);
					if (plugin.settings.prevSlide) {
						plugin.settings.prevSlide(index);
					}
				} else {
					$('#swipebox-overlay').addClass('leftSpring');
					setTimeout(function () {
						$('#swipebox-overlay').removeClass('leftSpring');
					}, 500);
				}
			},
			/* jshint unused:false */
			nextSlide: function nextSlide(index) {
				// Callback for next slide
			},

			prevSlide: function prevSlide(index) {
				// Callback for prev slide
			},

			/**
    * Close
    */
			closeSlide: function closeSlide() {
				$('html').removeClass('swipebox-html');
				$('html').removeClass('swipebox-touch');
				$(window).trigger('resize');
				this.destroy();
			},

			/**
    * Destroy the whole thing
    */
			destroy: function destroy() {
				$(window).unbind('keyup');
				$('body').unbind('touchstart');
				$('body').unbind('touchmove');
				$('body').unbind('touchend');
				$('#swipebox-slider').unbind();
				$('#swipebox-overlay').remove();

				if (!$.isArray(elem)) {
					elem.removeData('_swipebox');
				}

				if (this.target) {
					this.target.trigger('swipebox-destroy');
				}

				$.swipebox.isOpen = false;

				if (plugin.settings.afterClose) {
					plugin.settings.afterClose();
				}
			}
		};

		plugin.init();
	};

	$.fn.swipebox = function (options) {

		if (!$.data(this, '_swipebox')) {
			var swipebox = new $.swipebox(this, options);
			this.data('_swipebox', swipebox);
		}
		return this.data('_swipebox');
	};
})(window, document, jQuery);

(function ($) {

	$.fn.infiniteScroll = function (options) {
		var defaults = {
			slideSpeed: 500,
			autoplay: false,
			autoplaySpeed: 5000,
			scrollVisible: true,
			resizeLimit: 1150,
			fitSlideCount: false
			//slideCount:3
			//width:,
			//height:,
		};
		var o = $.extend(defaults, options);

		return this.each(function () {
			var sd, sc, totalChildren;
			var item = $(this);
			var myChildren = item.children();
			var slideInterval;
			var currentItem = 0;
			var totalWidth = 0;
			var childWidthExtras = 0;
			var tstartX, tstartY, tX, tY;

			if (!o.width) {
				o.width = item.width();
			}

			function resetSizes() {
				childrenItems = item.find('.sliderContainer').children();
				childrenItems.css({ 'max-width': '', 'width': '', '-webkit-transition-duration': '0s', '-moz-transition-duration': '0s', 'transition-duration': '0s', '-ms-transition-duration': '0s' });

				if (o.fitSlideCount && sd && sd.children('.sliderContainer').length == 3) {
					sc.children().css('width', '');
					var targetwidth = Math.floor(item.outerWidth() / sc.children().outerWidth());
					var paddingpx = Number(sc.children().css('padding-left').replace('px', '')) + Number(sc.children().css('padding-right').replace('px', ''));
					sd.children().children().css('width', item.outerWidth() / targetwidth - paddingpx);
				}

				updateSizes();
				totalChildren = myChildren.length;
				totalWidth = o.childrenWidth;

				if (!o.height) {
					o.height = 0;
					myChildren.each(function () {
						o.height = Math.max($(this).height(), o.height);
					});
				}
				childrenItems.css({ '-webkit-transition-duration': '', '-moz-transition-duration': '', 'transition-duration': '', '-ms-transition-duration': '' });
			}
			function updateSizes() {
				o.childWidth = 0;
				o.childHeight = 0;
				o.childrenWidth = 0;

				item.find('.sliderContainer').children().each(function () {
					var cItem = $(this);
					if (cItem.outerWidth(true) < o.resizeLimit && cItem.outerWidth(true) < item.width()) {
						o.childrenWidth += cItem.outerWidth(true);
					} else {
						cItem.css('max-width', Math.min(o.resizeLimit, item.width()) - cItem.css('padding-left').replace('px', '') - cItem.css('padding-right').replace('px', ''));
						o.childrenWidth += cItem.outerWidth(true);
					}
					o.childWidth = Math.max(cItem.outerWidth(true), o.childWidth);
					o.childHeight = Math.max(cItem.outerHeight(true), o.childHeight);
					childWidthExtras = cItem.outerWidth(true) - cItem.innerWidth();
				});
			}

			resetSizes();

			if (item.find('img').length > 0) {
				var imglength = item.find('img').length;
				var loadcount = 0;
				item.find('img').each(function () {
					var img = new Image();
					img.onload = function () {
						loadcount++;
						if (loadcount == imglength) {
							resetSizes();
							activateSlider();
						}
					};
					img.src = this.src;
				});
			} else {
				activateSlider();
			}

			function activateSlider() {
				item.children().wrapAll('<div class="sliderDiv"><div class="sliderContainer" /></div>');
				if (o.buttonholder) {
					$(o.buttonholder).append('<div class="leftarrow"><span></span></div><div class="rightarrow"><span></span></div>');
					sd = item.children('.sliderDiv');
				} else {
					sd = item.prepend('<div class="leftarrow"><span></span></div><div class="rightarrow"><span></span></div>').children('.sliderDiv');
				}
				sc = sd.css({
					width: o.width,
					height: o.height,
					overflow: "hidden",
					position: "relative",
					'text-align': "left"
				}).children().css('position', 'absolute').end().children('.sliderContainer');

				resetSizes();

				sc.css('width', o.childrenWidth);
				sd.append(sc.clone(true).css('left', o.childrenWidth)).append(sc.clone(true).css('left', -o.childrenWidth));

				var slb, srb;
				if (o.buttonholder) {
					slb = $(o.buttonholder).children('.leftarrow');
					srb = $(o.buttonholder).children('.rightarrow');
				} else {
					slb = item.children('.leftarrow');
					srb = item.children('.rightarrow');
				}
				slb.click(function (e) {
					if (slideInterval) {
						clearInterval(slideInterval);
					}
					sliderLeft();
					e.stopPropagation();
					e.preventDefault();
				});
				srb.click(function (e) {
					if (slideInterval) {
						clearInterval(slideInterval);
					}
					sliderRight();
					e.stopPropagation();
					e.preventDefault();
				});

				item.bind('touchstart', function (e) {
					var touch = e.originalEvent.touch || e.originalEvent.touches[0];
					tstartX = touch.pageX;
					tstartY = touch.pageY;
				}).bind('touchmove', function (e) {
					var touch = e.originalEvent.touch || e.originalEvent.touches[0];
					tX = touch.pageX;
					tY = touch.pageY;

					if (tX < tstartX - 10 || tX > tstartX + 10) {
						e.preventDefault();
					}
					e.stopPropagation();
				}).bind('touchend', function (e) {
					if (tstartX && tX) {
						if (tX < tstartX - 20 || tX > tstartX + 20) {
							var origTrans = o.transition;
							if (tX < tstartX - 20) {
								o.transition = "right";
								if (slideInterval) {
									clearInterval(slideInterval);
								}
								sliderRight();
							}
							if (tX > tstartX + 20) {
								o.transition = "left";
								if (slideInterval) {
									clearInterval(slideInterval);
								}
								sliderLeft();
							}
							o.transition = origTrans;
							e.stopPropagation();
						}
						tstartX = tstartY = tX = tY = false;
					}
				});

				if (o.autoplay) {
					if (slideInterval) {
						clearInterval(slideInterval);
					}
					slideInterval = setInterval(function () {
						sliderRight();
					}, o.autoplaySpeed);
				}

				sd.children('.sliderContainer').children(':eq(' + currentItem + ')').removeClass('noanim').addClass('activeslide');

				sd.children('.sliderContainer').children().click(function (e) {
					var ti = $(this);
					var ai = sd.find('.activeslide');
					if (!ti.hasClass('notclicked')) {
						sd.addClass('clicked');
						if (ti[0].nodeName == "A" && !ti.hasClass('activeslide') && !ti.hasClass('active')) {
							var steps = ti.index() - ai.index();
							if (ai.offset().left < ti.offset().left) {
								if (steps < 0) {
									steps += sd.children('.sliderContainer:eq(0)').children().length;
								}
								sliderRight(steps);
							} else {
								if (steps > 0) {
									steps -= sd.children('.sliderContainer:eq(0)').children().length;
								}
								sliderLeft(-steps);
							}
						}
						e.stopPropagation();
						e.preventDefault();
					}
				}).find('a').click(function (e) {
					e.stopPropagation();
				});

				$(window).bind('load resize', resizeAndPosition).resize();
			}

			function resizeAndPosition(e, oldactive) {
				item.find('.sliderDiv').css({ width: item.width() });
				sc.children().addClass('noanim');

				resetSizes();

				var as = item.find('.activeslide');
				var fc = as.parent();

				var targetleft = -as.position().left;
				if (o.centerFirst) {
					targetleft = item.width() / 2 - as.outerWidth() / 2 - as.position().left;
				}
				if (oldactive) {
					targetleft = fc.position().left;
				}
				var fcchildwidth = 0;
				fc.children().each(function () {
					fcchildwidth += Math.ceil($(this).outerWidth(true));
				}).end().css({ 'width': fcchildwidth + 1, 'left': targetleft });

				var nextfc = fc.next();
				var nextfcchildwidth = 0;
				if (nextfc.length == 0) {
					nextfc = fc.siblings().first();
				}
				nextfc.children().each(function () {
					nextfcchildwidth += Math.ceil($(this).outerWidth(true));
				}).end().css({ 'width': nextfcchildwidth + 1, 'left': targetleft + fcchildwidth });
				var prevfc = nextfc.next();
				if (prevfc.length == 0) {
					prevfc = nextfc.siblings().first();
				}
				var prevfcchildwidth = 0;
				prevfc.children().each(function () {
					prevfcchildwidth += Math.ceil($(this).outerWidth(true));
				}).end().css({ 'width': prevfcchildwidth + 1, 'left': targetleft - prevfcchildwidth });
				item.find('.sliderDiv').css('height', o.childHeight);
			}

			function sliderLeft(steps) {
				if (typeof steps != "number") {
					if (o.scrollVisible) {
						var stepCount = 0;
						var limitReached = false;
						var lastItem = sd.children('.sliderContainer').children('.activeslide').first();;
						var stepWidth = 0;
						while (!limitReached) {
							var nextItem = lastItem.prev();
							if (nextItem.length == 0) {
								nextItem = lastItem.siblings().last();
							}
							if (stepWidth + nextItem.outerWidth() <= sd.width()) {
								stepWidth += nextItem.outerWidth(true);
								stepCount++;
								lastItem = nextItem;
							} else {
								limitReached = true;
							}
						}
						steps = stepCount;
					} else {
						steps = 1;
					}
				}
				o.width = item.width();
				var slideDist = 0;
				var oas = sd.children('.sliderContainer').children('.activeslide').first();
				var oldwidth = oas.outerWidth();
				var pos = oas.position();
				var limited = true;
				if (oas.outerWidth() > 0) {

					if (sd.children('.sliderContainer:animated').length == 0) {
						currentItem -= steps;
						while (currentItem < 0) {
							currentItem += totalChildren;
						}

						var as;
						if (currentItem > oas.index()) {
							if (oas.parent().prev('.sliderContainer').length > 0) {
								as = oas.removeClass('activeslide').parent().prev('.sliderContainer').css('width', '').children(':eq(' + currentItem + ')').addClass('activeslide');
							} else {
								as = oas.removeClass('activeslide').parent().parent().children('.sliderContainer').last().css('width', '').children(':eq(' + currentItem + ')').addClass('activeslide');
							}
						} else {
							as = oas.removeClass('activeslide').parent().children(':eq(' + currentItem + ')').addClass('activeslide');
						}
						as.parent().addClass('activeslider').siblings().removeClass('activeslider');

						resizeAndPosition({}, true);
						var masterslider = as.parent();
						var msleft = masterslider.position().left;

						updateSizes();

						var slideDist = as.offset().left - sd.offset().left;
						if (o.centerFirst) {
							slideDist = as.offset().left - (sd.offset().left + sd.width() / 2 - as.outerWidth() / 2);
						}
						sd.children('.sliderContainer').each(function () {
							var childwidth = 0;
							var slider = $(this);
							slider.children().each(function () {
								childwidth += $(this).outerWidth(true);
							});
							var newwidth = childwidth + slider.children().length;
							slider.width(newwidth);
							var pos = slider.position();

							slider.stop(true).stop(true).animate({ left: pos.left - slideDist }, o.slideSpeed, function () {
								resizeAndPosition();
							});
						});
					}
				}
			}

			function sliderRight(steps) {
				if (typeof steps != "number") {
					if (o.scrollVisible) {
						var stepCount = 1;
						var limitReached = false;
						var lastItem = sd.children('.sliderContainer').children('.activeslide').first();;
						var stepWidth = lastItem.outerWidth(true);
						while (!limitReached) {
							var nextItem = lastItem.next();
							if (nextItem.length == 0) {
								nextItem = lastItem.siblings().first();
							}
							if (stepWidth + nextItem.outerWidth() <= sd.width()) {
								stepWidth += nextItem.outerWidth(true);
								stepCount++;
								lastItem = nextItem;
							} else {
								limitReached = true;
							}
						}
						steps = stepCount;
					} else {
						steps = 1;
					}
				}
				o.width = item.width();
				var slideDist = 0;
				var oas = sd.children('.sliderContainer').children('.activeslide').first();
				var oldwidth = oas.outerWidth();
				var pos = oas.position();
				var limited = true;
				if (oas.outerWidth() > 0) {

					if (sd.children('.sliderContainer:animated').length == 0) {
						currentItem += steps;
						while (currentItem >= totalChildren) {
							currentItem -= totalChildren;
						}

						var as;
						if (currentItem < oas.index()) {
							if (oas.parent().next('.sliderContainer').length > 0) {
								as = oas.removeClass('activeslide').parent().next('.sliderContainer').children(':eq(' + currentItem + ')').addClass('activeslide');
							} else {
								as = oas.removeClass('activeslide').parent().parent().children('.sliderContainer').first().children(':eq(' + currentItem + ')').addClass('activeslide');
							}
						} else {
							as = oas.removeClass('activeslide').parent().children(':eq(' + currentItem + ')').addClass('activeslide');
						}

						as.parent().addClass('activeslider').siblings().removeClass('activeslider');

						var masterslider = as.parent();
						var msleft = masterslider.position().left;

						updateSizes();
						var slideDist = as.offset().left - sd.offset().left;
						if (o.centerFirst) {
							slideDist = as.offset().left - (sd.offset().left + sd.width() / 2 - as.outerWidth() / 2);
						}

						sd.children('.sliderContainer').each(function () {
							var childwidth = 0;
							var slider = $(this);
							slider.children().each(function () {
								childwidth += $(this).outerWidth(true);
							});
							var newwidth = childwidth;
							slider.width(newwidth);
							var pos = slider.position();
							if (slider.find('.activeslide').length == 0) {
								if (pos.left < msleft) {
									slider.stop(true).css('left', msleft - newwidth);
								} else {
									slider.stop(true).css('left', msleft + masterslider.outerWidth());
								}
							}
							pos = slider.position();

							if (typeof o.itembuttonsSelector == "string" && $(o.itembuttonsSelector).length > 0) {
								$(o.itembuttonsSelector).find('.itemButton[data-index="' + currentItem + '"]').addClass('activeButton').siblings().removeClass('activeButton');
							}

							slider.stop(true).animate({ left: pos.left - slideDist }, o.slideSpeed, function () {
								resizeAndPosition();
							});
						});
					}
				}
			}
		});
	};
})($);
(function ($) {

	$.fn.imageGallery = function (options) {
		var defaults = {
			width: 'auto',
			height: 'auto',
			itemSelector: '.galleryItem',
			nextPrevButtons: false,
			itemButtons: false,
			playPause: false,
			transition: 'opacity',
			transspeed: '1000',
			speed: '5000',
			reverse: true,
			imgSelector: '',
			autoplay: true,
			resizable: true,
			itembuttonstarget: '',
			callback: function callback() {}
		};

		return this.each(function () {
			var o = $.extend(defaults, options);
			var itemIndex = -1;
			var waitingIndex = -1;
			var reverse = o.reverse;
			var tstartX, tstartY, tX, tY;
			var g = $(this);
			var gi = g.find(o.itemSelector);
			gi.each(function (index, a) {
				var ti = $(this);
				ti.attr('index', index);

				var a = ti.find('img' + o.imgSelector);
				if (a.length > 0) {
					var img = new Image();
					img.onload = img.onerror = function () {
						a.attr('data-loaded', true);
						if (waitingIndex == a.attr('index')) {
							g.find('.loading').remove();
							waitingIndex = -1;
							transitionIn(a.attr('index'));
							checkSizes();
						}
					};
					img.src = a[0].src;
					a.attr('index', index);
					if (a.attr('complete')) {
						a.attr('data-loaded', true);
					}
				}
			});
			var playing = o.autoplay;
			var playTimer;
			g.css({
				'position': 'relative',
				'overflow': 'hidden'
			});
			gi.css({
				'position': 'absolute',
				'top': '0px',
				'left': '0px',
				'width': '100%',
				'height': '100%'
			}).hide();

			g.append('<div class="transitionLayer"></div>');
			var tl = g.children('.transitionLayer').css({
				'position': 'absolute',
				'display': 'none',
				'top': '0px',
				'left': '0px',
				'width': '100%',
				'height': '100%',
				'z-index': 3
			});

			if (o.width != 'auto') {
				g.width(o.width);
			}
			if (o.height != 'auto') {
				g.height(o.height);
			}

			if (o.nextPrevButtons) {
				if (gi.length > 1) {
					g.after('<div class="leftButton"><span></span></div><div class="rightButton"><span></span></div>');
					g.siblings('.leftButton').click(clickLeft);
					g.siblings('.rightButton').click(clickRight);
				}
			}

			gi.bind('touchstart', function (e) {
				var touch = e.originalEvent.touch || e.originalEvent.touches[0];
				tstartX = touch.pageX;
				tstartY = touch.pageY;
				//e.stopPropagation();
			}).bind('touchmove', function (e) {
				var touch = e.originalEvent.touch || e.originalEvent.touches[0];
				tX = touch.pageX;
				tY = touch.pageY;

				/*var swipewidth = $(window).width()/5;
    var swipeheight = $(window).height()/10;
    if((tX < tstartX - swipewidth || tX > tstartX + swipewidth) && tY > tstartY - swipeheight && tY < tstartY + swipeheight) {
    e.preventDefault();
    }
    e.stopPropagation();*/
			}).bind('touchend', function (e) {
				if (tstartX && tX) {
					var swipewidth = $(window).width() / 5;
					var swipeheight = $(window).height() / 10;
					if ((tX < tstartX - swipewidth || tX > tstartX + swipewidth) && tY > tstartY - swipeheight && tY < tstartY + swipeheight) {
						var origTrans = o.transition;
						if (tX < tstartX - swipewidth) {
							o.transition = "left";
							clickRight();
						}
						if (tX > tstartX + swipewidth) {
							o.transition = "left";
							clickLeft();
						}
						o.transition = origTrans;
						e.stopPropagation();
					}
					tstartX = tstartY = tX = tY = false;
				}
			});

			if (o.playPause) {
				g.append('<div class="playpause"></div>');
				g.children('.playpause').click(function () {
					if (playing) {
						playing = false;
						g.children('.playpause').addClass('paused');
						clearTimeout(playTimer);
					} else {
						playing = true;
						g.children('.playpause').removeClass('paused');
						transitionIn();
					}
				});
			}

			if (o.itemButtons) {
				var ib;
				if (o.itembuttonstarget) {
					$(o.itembuttonstarget).append('<div class="itemButtons"></div>');
					ib = $(o.itembuttonstarget).children('.itemButtons');
				} else {
					g.append('<div class="itemButtons"></div>');
					ib = g.children('.itemButtons');
				}

				gi.each(function (i) {
					thisgi = $(this);
					if (thisgi.find('img:first').attr('data-thumb')) {
						ib.append('<div class="itemButton thumbnailButton" data-index="' + i + '"><span></span><img src="' + thisgi.find('img:first').attr('data-thumb') + '" alt="" /></div>');
					} else {
						ib.append('<div class="itemButton" data-index="' + i + '"></div>');
					}
					var nb = ib.children('.itemButton[data-index=' + i + ']');
					nb.click(function (e) {
						playing = false;
						g.children('.playpause').addClass('paused');
						clearTimeout(playTimer);
						ti = $(this);
						if (itemIndex > ti.attr('data-index')) {
							reverse = true;
						}
						ti.siblings().removeClass('activeButton');
						ti.addClass('activeButton');
						transitionIn(parseInt(ti.attr('data-index')));
						e.stopPropagation();
					});
				});
			}

			switch (o.transition) {
				case 'right':
				case 'left':
					$(window).load(function () {
						$(window).resize(function () {
							var ai = gi.filter('.activeItem');
							if (ai.length > 0) {
								ai.siblings(o.itemSelector).css('left', '100%');
							}
						});
					});
					break;
			}

			$(window).resize(function () {
				checkSizes();
			});

			function clickLeft() {
				playing = false;
				clearTimeout(playTimer);
				g.children('.playpause').addClass('paused');
				reverse = true;
				transitionIn(itemIndex - 1);
			}
			function clickRight() {
				playing = false;
				g.children('.playpause').addClass('paused');
				clearTimeout(playTimer);
				transitionIn();
			}

			function checkSizes() {
				g.children(o.itemSelector + ':not(.activeItem)').hide();
				g.css({ 'min-height': '', 'height': '' });
				var minheight = g.children('.activeItem').height();
				//if(g.children('.activeItem').css('display') == "none" || g.children('.activeItem').find('img'+o.imgSelector).height() == 0) {
				var ai = g.children('.activeItem');
				var h = 0;
				var c = ai.children().filter(function () {
					var posi = $(this).css('position');
					var floa = $(this).css('float');
					return posi != 'absolute' && floa == 'none';
				}).each(function () {
					h += $(this).outerHeight();
				});
				var childrenheight = h;

				if (childrenheight > minheight) {
					minheight = childrenheight;
				}
				if (g.find('img' + o.imgSelector).length == 0 && g.width() > 0) {
					g.children(o.itemSelector).width(g.width());
				}
				//}
				if (g.find('img' + o.imgSelector).length > 0) {
					g.css('height', minheight);
				}
				g.css('min-height', minheight);
			}

			transitionIn(0);

			function transitionIn(i) {
				var lastIndex = itemIndex;
				if (!isNaN(i)) {
					itemIndex = parseInt(i);
				} else {
					itemIndex++;
				}

				if (itemIndex < 0) {
					itemIndex += gi.length;
				} else if (itemIndex > gi.length - 1) {
					itemIndex -= gi.length;
				}

				var ni = gi.slice(itemIndex, itemIndex + 1);
				var li = gi.slice(lastIndex, lastIndex + 1);
				ni.stop(true, true).find('div').stop(true, true);
				li.stop(true, true).find('div').stop(true, true);
				if ((ni.find('img' + o.imgSelector).attr('data-loaded') || ni.find('img' + o.imgSelector).length == 0) && !ni.is(':animated') && !li.is(':animated') && !tl.children().is(':animated')) {
					if (li.html() != ni.html()) {

						if (o.resizable && gi.filter('.activeItem').length == 0) {
							var heightcheck = setInterval(function () {
								if (ni.height() > g.height() && ni.height() > 0) {
									g.height(ni.height());
									clearInterval(heightcheck);
								}
							}, 50);
						}

						li.removeClass('activeItem').css('z-index', 1);
						ni.addClass('activeItem').css('z-index', 5);

						if (li.css('display') != 'block') {
							$(window).resize();
						}

						var transition = ni.attr('data-transition') || o.transition;
						var dl = ni.attr('data-display-length') || o.speed;

						if (playing) {
							playTimer = setTimeout(function () {
								transitionIn();
							}, dl);
						}
						if (reverse) {
							switch (transition) {
								case 'right':
									transition = "left";
									break;
								case 'left':
									transition = "right";
									break;
								case 'top':
									transition = "bottom";
									break;
								case 'bottom':
									transition = "top";
									break;
							}
							reverse = false;
						}
						switch (transition) {
							case 'right':
								if (li.css('display') == 'block') {
									ni.css('left', "-" + ni.outerWidth() + "px").show();
									ni.animate({ left: "0px" }, o.transspeed, o.callback);
									li.animate({ left: ni.outerWidth() + "px" }, o.transspeed);
								} else {
									ni.show();
								}
								break;
							case 'left':
								if (li.css('display') == 'block') {
									ni.css('left', ni.outerWidth() + "px").show();
									ni.animate({ left: "0px" }, o.transspeed, o.callback);
									li.animate({ left: "-" + ni.outerWidth() + "px" }, o.transspeed);
								} else {
									ni.show();
								}
								break;
							case 'top':
								if (li.css('display') == 'block') {
									ni.css('top', "-" + ni.outerHeight() + "px").show();
									ni.animate({ top: "0px" }, o.transspeed, o.callback);
									li.animate({ top: ni.outerHeight() + "px" }, o.transspeed);
								} else {
									ni.show();
								}
								break;
							case 'bottom':
								if (li.css('display') == 'block') {
									ni.css('top', ni.outerHeight() + "px").show();
									ni.animate({ top: "0px" }, o.transspeed, o.callback);
									li.animate({ top: "-" + ni.outerHeight() + "px" }, o.transspeed);
								} else {
									ni.show();
								}
								break;
							case 'checkerboard':
								var img = ni.find('img');
								ni.show();
								var sizeX = Math.ceil(ni.width() / 10);
								var sizeY = Math.ceil(ni.height() / 8);
								img.hide();
								tl.html('');
								for (x = 0; x < 10; x++) {
									for (y = 0; y < 8; y++) {
										$("<div />").css({
											width: sizeX,
											height: sizeY,
											left: x * sizeX,
											top: y * sizeY,
											backgroundPosition: "-" + x * sizeX + "px -" + y * sizeY + "px",
											position: 'absolute',
											display: 'none',
											'background-image': 'url(' + img.attr('src') + ')'
										}).appendTo(tl);
									}
								}
								tl.show().children().each(function (a, i) {
									$(this).delay(Math.random() * (o.transspeed * 0.75)).fadeIn(o.transspeed / 4, function () {
										var tb = $(this);
										if (tb.siblings().length == tb.siblings(':visible:not(:animated)').length) {
											tb.parent().siblings('.activeItem').find('img').show();
											tl.hide();
											o.callback();
										}
									});
								});
								break;
							case 'joinV':
								var img = ni.find('img');
								ni.show();
								var sizeX = Math.ceil(ni.width() + ni.width() / 2);
								var sizeY = Math.ceil(ni.height());
								img.hide();
								tl.html('');
								for (x = 0; x < 2; x++) {
									$("<div />").css({
										width: ni.width() / 2,
										height: sizeY,
										left: x * sizeX - ni.width() / 2,
										top: 0,
										backgroundPosition: "-" + x * sizeX + "px 0px",
										position: 'absolute',
										'background-image': 'url(' + img.attr('src') + ')'
									}).appendTo(tl);
								}
								tl.show().children(':eq(0)').animate({ left: 0 + "px" }, o.transspeed).siblings('div').animate({ left: ni.width() / 2 + "px" }, o.transspeed, function () {
									var tb = $(this);
									tb.parent().siblings('.activeItem').find('img').show();
									tl.hide();
									o.callback();
								});
								break;
							case 'joinH':
								var img = ni.find('img');
								ni.show();
								var sizeX = Math.ceil(ni.width());
								var sizeY = Math.ceil(ni.height() + ni.height() / 2);
								img.hide();
								tl.html('');
								for (y = 0; y < 2; y++) {
									$("<div />").css({
										width: sizeX,
										height: ni.height() / 2,
										left: 0,
										top: y * sizeY - ni.height() / 2,
										backgroundPosition: "-0px " + y * sizeY + "px",
										position: 'absolute',
										'background-image': 'url(' + img.attr('src') + ')'
									}).appendTo(tl);
								}
								tl.show().children(':eq(0)').animate({ top: 0 + "px" }, o.transspeed).siblings('div').animate({ top: ni.height() / 2 + "px" }, o.transspeed, function () {
									var tb = $(this);
									tb.parent().siblings('.activeItem').find('img').show();
									tl.hide();
									o.callback();
								});
								break;
							case 'splitV':
								li.css('z-index', 5);
								ni.css('z-index', 1);
								var img = li.find('img');
								li.show();
								ni.show();
								var sizeX = Math.ceil(li.width() / 2);
								var sizeY = Math.ceil(li.height());
								img.hide();
								tl.html('');
								for (x = 0; x < 2; x++) {
									$("<div />").css({
										width: sizeX,
										height: sizeY,
										left: x * sizeX,
										top: 0,
										backgroundPosition: "-" + x * sizeX + "px 0px",
										position: 'absolute',
										'background-image': 'url(' + img.attr('src') + ')'
									}).appendTo(tl);
								}
								tl.show().children(':eq(0)').animate({ left: -sizeX + "px" }, o.transspeed).siblings('div').animate({ left: li.width() + "px" }, o.transspeed, function () {
									var tb = $(this);
									tb.parent().siblings(o.itemSelector).css('z-index', 1).hide().find('img').show();
									tb.parent().siblings('.activeItem').css('z-index', 5).show();
									tl.hide();
									o.callback();
								});
								break;
							case 'splitH':
								li.css('z-index', 5);
								ni.css('z-index', 1);
								var img = li.find('img');
								li.show();
								ni.show();
								var sizeX = Math.ceil(li.width());
								var sizeY = Math.ceil(li.height() / 2);
								img.hide();
								tl.html('');
								for (y = 0; y < 2; y++) {
									$("<div />").css({
										width: sizeX,
										height: sizeY,
										left: 0,
										top: y * sizeY,
										backgroundPosition: "0px -" + y * sizeY + "px",
										position: 'absolute',
										'background-image': 'url(' + img.attr('src') + ')'
									}).appendTo(tl);
								}
								tl.show().children(':eq(0)').animate({ top: -sizeY + "px" }, o.transspeed).siblings('div').animate({ top: li.height() + "px" }, o.transspeed, function () {
									var tb = $(this);
									tb.parent().siblings(o.itemSelector).css('z-index', 1).hide().find('img').show();
									tb.parent().siblings('.activeItem').css('z-index', 5).show();
									tl.hide();
									o.callback();
								});
								break;
							case 'opacity':
							default:
								ni.css('left', '0px').hide().fadeIn(o.transspeed, function () {
									$(this).siblings(o.itemSelector).hide();
									o.callback();
								});
								break;
						}
						if (o.itemButtons) {
							var ib;
							if (o.itembuttonstarget) {
								ib = $(o.itembuttonstarget).children('.itemButtons');
							} else {
								ib = g.children('.itemButtons');
							}
							ib.find('.itemButton').removeClass('activeButton');
							ib.find('.itemButton[data-index="' + ni.attr('index') + '"]').addClass('activeButton');
						}
						if (o.resizable) {
							if (ni.find('img' + o.imgSelector).length > 0) {
								ni.css({ width: '', height: '' });
							}
							ni.css({ height: '' });
							g.siblings('.rightButton, .leftButton').animate({ height: ni.outerHeight() }, 200);
							if (ni.outerWidth() > 0 && ni.outerHeight() > 0) {
								var ato = { height: ni.outerHeight() };
								if (o.width != 'auto') {
									ato.width = ni.outerWidth();
								}
								g.animate(ato, 200);
							}
						}
					}
				} else {
					if (!ni.is(':animated') && !li.is(':animated')) {
						waitingIndex = itemIndex;
						g.prepend('<div class="loading"></div>');
					}
					if (!isNaN(i)) {
						itemIndex = lastIndex;
					}
				}
			}
		});
	};
})($)
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function (factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
})(function ($) {
	'use strict';

	var Slick = window.Slick || {};

	Slick = function () {

		var instanceUid = 0;

		function Slick(element, settings) {

			var _ = this,
			    dataSettings;

			_.defaults = {
				accessibility: true,
				adaptiveHeight: false,
				appendArrows: $(element),
				appendDots: $(element),
				arrows: true,
				asNavFor: null,
				prevArrow: '<div class="slick-prev">&nbsp;</div>',
				nextArrow: '<div class="slick-next">&nbsp;</div>',
				autoplay: false,
				autoplaySpeed: 3000,
				centerMode: false,
				centerPadding: '50px',
				cssEase: 'ease',
				customPaging: function customPaging(slider, i) {
					return $('<button type="button" />').text(i + 1);
				},
				dots: false,
				dotsClass: 'slick-dots',
				draggable: true,
				easing: 'linear',
				edgeFriction: 0.35,
				fade: false,
				focusOnSelect: false,
				focusOnChange: false,
				infinite: true,
				initialSlide: 0,
				lazyLoad: 'ondemand',
				mobileFirst: false,
				pauseOnHover: true,
				pauseOnFocus: true,
				pauseOnDotsHover: false,
				respondTo: 'window',
				responsive: null,
				rows: 1,
				rtl: false,
				slide: '',
				slidesPerRow: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: true,
				swipeToSlide: false,
				touchMove: true,
				touchThreshold: 5,
				useCSS: true,
				useTransform: true,
				variableWidth: false,
				vertical: false,
				verticalSwiping: false,
				waitForAnimate: true,
				zIndex: 1000
			};

			_.initials = {
				animating: false,
				dragging: false,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				scrolling: false,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: false,
				slideOffset: 0,
				swipeLeft: null,
				swiping: false,
				$list: null,
				touchObject: {},
				transformsEnabled: false,
				unslicked: false
			};

			$.extend(_, _.initials);

			_.activeBreakpoint = null;
			_.animType = null;
			_.animProp = null;
			_.breakpoints = [];
			_.breakpointSettings = [];
			_.cssTransitions = false;
			_.focussed = false;
			_.interrupted = false;
			_.hidden = 'hidden';
			_.paused = true;
			_.positionProp = null;
			_.respondTo = null;
			_.rowCount = 1;
			_.shouldClick = true;
			_.$slider = $(element);
			_.$slidesCache = null;
			_.transformType = null;
			_.transitionType = null;
			_.visibilityChange = 'visibilitychange';
			_.windowWidth = 0;
			_.windowTimer = null;

			dataSettings = $(element).data('slick') || {};

			_.options = $.extend({}, _.defaults, settings, dataSettings);

			_.currentSlide = _.options.initialSlide;

			_.originalSettings = _.options;

			if (typeof document.mozHidden !== 'undefined') {
				_.hidden = 'mozHidden';
				_.visibilityChange = 'mozvisibilitychange';
			} else if (typeof document.webkitHidden !== 'undefined') {
				_.hidden = 'webkitHidden';
				_.visibilityChange = 'webkitvisibilitychange';
			}

			_.autoPlay = $.proxy(_.autoPlay, _);
			_.autoPlayClear = $.proxy(_.autoPlayClear, _);
			_.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
			_.changeSlide = $.proxy(_.changeSlide, _);
			_.clickHandler = $.proxy(_.clickHandler, _);
			_.selectHandler = $.proxy(_.selectHandler, _);
			_.setPosition = $.proxy(_.setPosition, _);
			_.swipeHandler = $.proxy(_.swipeHandler, _);
			_.dragHandler = $.proxy(_.dragHandler, _);
			_.keyHandler = $.proxy(_.keyHandler, _);

			_.instanceUid = instanceUid++;

			// A simple way to check for HTML strings
			// Strict HTML recognition (must start with <)
			// Extracted from jQuery v1.11 source
			_.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

			_.registerBreakpoints();
			_.init(true);
		}

		return Slick;
	}();

	Slick.prototype.activateADA = function () {
		var _ = this;

		_.$slideTrack.find('.slick-active').attr({
			'aria-hidden': 'false'
		}).find('a, input, button, select').attr({
			'tabindex': '0'
		});
	};

	Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {

		var _ = this;

		if (typeof index === 'boolean') {
			addBefore = index;
			index = null;
		} else if (index < 0 || index >= _.slideCount) {
			return false;
		}

		_.unload();

		if (typeof index === 'number') {
			if (index === 0 && _.$slides.length === 0) {
				$(markup).appendTo(_.$slideTrack);
			} else if (addBefore) {
				$(markup).insertBefore(_.$slides.eq(index));
			} else {
				$(markup).insertAfter(_.$slides.eq(index));
			}
		} else {
			if (addBefore === true) {
				$(markup).prependTo(_.$slideTrack);
			} else {
				$(markup).appendTo(_.$slideTrack);
			}
		}

		_.$slides = _.$slideTrack.children(this.options.slide);

		_.$slideTrack.children(this.options.slide).detach();

		_.$slideTrack.append(_.$slides);

		_.$slides.each(function (index, element) {
			$(element).attr('data-slick-index', index);
		});

		_.$slidesCache = _.$slides;

		_.reinit();
	};

	Slick.prototype.animateHeight = function () {
		var _ = this;
		if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
			var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
			_.$list.animate({
				height: targetHeight
			}, _.options.speed);
		}
	};

	Slick.prototype.animateSlide = function (targetLeft, callback) {

		var animProps = {},
		    _ = this;

		_.animateHeight();

		if (_.options.rtl === true && _.options.vertical === false) {
			targetLeft = -targetLeft;
		}
		if (_.transformsEnabled === false) {
			if (_.options.vertical === false) {
				_.$slideTrack.animate({
					left: targetLeft
				}, _.options.speed, _.options.easing, callback);
			} else {
				_.$slideTrack.animate({
					top: targetLeft
				}, _.options.speed, _.options.easing, callback);
			}
		} else {

			if (_.cssTransitions === false) {
				if (_.options.rtl === true) {
					_.currentLeft = -_.currentLeft;
				}
				$({
					animStart: _.currentLeft
				}).animate({
					animStart: targetLeft
				}, {
					duration: _.options.speed,
					easing: _.options.easing,
					step: function step(now) {
						now = Math.ceil(now);
						if (_.options.vertical === false) {
							animProps[_.animType] = 'translate(' + now + 'px, 0px)';
							_.$slideTrack.css(animProps);
						} else {
							animProps[_.animType] = 'translate(0px,' + now + 'px)';
							_.$slideTrack.css(animProps);
						}
					},
					complete: function complete() {
						if (callback) {
							callback.call();
						}
					}
				});
			} else {

				_.applyTransition();
				targetLeft = Math.ceil(targetLeft);

				if (_.options.vertical === false) {
					animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
				} else {
					animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
				}
				_.$slideTrack.css(animProps);

				if (callback) {
					setTimeout(function () {

						_.disableTransition();

						callback.call();
					}, _.options.speed);
				}
			}
		}
	};

	Slick.prototype.getNavTarget = function () {

		var _ = this,
		    asNavFor = _.options.asNavFor;

		if (asNavFor && asNavFor !== null) {
			asNavFor = $(asNavFor).not(_.$slider);
		}

		return asNavFor;
	};

	Slick.prototype.asNavFor = function (index) {

		var _ = this,
		    asNavFor = _.getNavTarget();

		if (asNavFor !== null && (typeof asNavFor === "undefined" ? "undefined" : _typeof(asNavFor)) === 'object') {
			asNavFor.each(function () {
				var target = $(this).slick('getSlick');
				if (!target.unslicked) {
					target.slideHandler(index, true);
				}
			});
		}
	};

	Slick.prototype.applyTransition = function (slide) {

		var _ = this,
		    transition = {};

		if (_.options.fade === false) {
			transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
		} else {
			transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
		}

		if (_.options.fade === false) {
			_.$slideTrack.css(transition);
		} else {
			_.$slides.eq(slide).css(transition);
		}
	};

	Slick.prototype.autoPlay = function () {

		var _ = this;

		_.autoPlayClear();

		if (_.slideCount > _.options.slidesToShow) {
			_.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
		}
	};

	Slick.prototype.autoPlayClear = function () {

		var _ = this;

		if (_.autoPlayTimer) {
			clearInterval(_.autoPlayTimer);
		}
	};

	Slick.prototype.autoPlayIterator = function () {

		var _ = this,
		    slideTo = _.currentSlide + _.options.slidesToScroll;

		if (!_.paused && !_.interrupted && !_.focussed) {

			if (_.options.infinite === false) {

				if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
					_.direction = 0;
				} else if (_.direction === 0) {

					slideTo = _.currentSlide - _.options.slidesToScroll;

					if (_.currentSlide - 1 === 0) {
						_.direction = 1;
					}
				}
			}

			_.slideHandler(slideTo);
		}
	};

	Slick.prototype.buildArrows = function () {

		var _ = this;

		if (_.options.arrows === true) {

			_.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
			_.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

			if (_.slideCount > _.options.slidesToShow) {

				_.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
				_.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

				if (_.htmlExpr.test(_.options.prevArrow)) {
					_.$prevArrow.prependTo(_.options.appendArrows);
				}

				if (_.htmlExpr.test(_.options.nextArrow)) {
					_.$nextArrow.appendTo(_.options.appendArrows);
				}

				if (_.options.infinite !== true) {
					_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
				}
			} else {

				_.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
					'aria-disabled': 'true',
					'tabindex': '-1'
				});
			}
		}
	};

	Slick.prototype.buildDots = function () {

		var _ = this,
		    i,
		    dot;

		if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

			_.$slider.addClass('slick-dotted');

			dot = $('<ul />').addClass(_.options.dotsClass);

			for (i = 0; i <= _.getDotCount(); i += 1) {
				dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
			}

			_.$dots = dot.appendTo(_.options.appendDots);

			_.$dots.find('li').first().addClass('slick-active');
		}
	};

	Slick.prototype.buildOut = function () {

		var _ = this;

		_.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');

		_.slideCount = _.$slides.length;

		_.$slides.each(function (index, element) {
			$(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
		});

		_.$slider.addClass('slick-slider');

		_.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();

		_.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
		_.$slideTrack.css('opacity', 0);

		if (_.options.centerMode === true || _.options.swipeToSlide === true) {
			_.options.slidesToScroll = 1;
		}

		$('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

		_.setupInfinite();

		_.buildArrows();

		_.buildDots();

		_.updateDots();

		_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

		if (_.options.draggable === true) {
			_.$list.addClass('draggable');
		}
	};

	Slick.prototype.buildRows = function () {

		var _ = this,
		    a,
		    b,
		    c,
		    newSlides,
		    numOfSlides,
		    originalSlides,
		    slidesPerSection;

		newSlides = document.createDocumentFragment();
		originalSlides = _.$slider.children();

		if (_.options.rows > 0) {

			slidesPerSection = _.options.slidesPerRow * _.options.rows;
			numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

			for (a = 0; a < numOfSlides; a++) {
				var slide = document.createElement('div');
				for (b = 0; b < _.options.rows; b++) {
					var row = document.createElement('div');
					for (c = 0; c < _.options.slidesPerRow; c++) {
						var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
						if (originalSlides.get(target)) {
							row.appendChild(originalSlides.get(target));
						}
					}
					slide.appendChild(row);
				}
				newSlides.appendChild(slide);
			}

			_.$slider.empty().append(newSlides);
			_.$slider.children().children().children().css({
				'width': 100 / _.options.slidesPerRow + '%',
				'display': 'inline-block'
			});
		}
	};

	Slick.prototype.checkResponsive = function (initial, forceUpdate) {

		var _ = this,
		    breakpoint,
		    targetBreakpoint,
		    respondToWidth,
		    triggerBreakpoint = false;
		var sliderWidth = _.$slider.width();
		var windowWidth = window.innerWidth || $(window).width();

		if (_.respondTo === 'window') {
			respondToWidth = windowWidth;
		} else if (_.respondTo === 'slider') {
			respondToWidth = sliderWidth;
		} else if (_.respondTo === 'min') {
			respondToWidth = Math.min(windowWidth, sliderWidth);
		}

		if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {

			targetBreakpoint = null;

			for (breakpoint in _.breakpoints) {
				if (_.breakpoints.hasOwnProperty(breakpoint)) {
					if (_.originalSettings.mobileFirst === false) {
						if (respondToWidth < _.breakpoints[breakpoint]) {
							targetBreakpoint = _.breakpoints[breakpoint];
						}
					} else {
						if (respondToWidth > _.breakpoints[breakpoint]) {
							targetBreakpoint = _.breakpoints[breakpoint];
						}
					}
				}
			}

			if (targetBreakpoint !== null) {
				if (_.activeBreakpoint !== null) {
					if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
						_.activeBreakpoint = targetBreakpoint;
						if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
							_.unslick(targetBreakpoint);
						} else {
							_.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
							if (initial === true) {
								_.currentSlide = _.options.initialSlide;
							}
							_.refresh(initial);
						}
						triggerBreakpoint = targetBreakpoint;
					}
				} else {
					_.activeBreakpoint = targetBreakpoint;
					if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
						_.unslick(targetBreakpoint);
					} else {
						_.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
						if (initial === true) {
							_.currentSlide = _.options.initialSlide;
						}
						_.refresh(initial);
					}
					triggerBreakpoint = targetBreakpoint;
				}
			} else {
				if (_.activeBreakpoint !== null) {
					_.activeBreakpoint = null;
					_.options = _.originalSettings;
					if (initial === true) {
						_.currentSlide = _.options.initialSlide;
					}
					_.refresh(initial);
					triggerBreakpoint = targetBreakpoint;
				}
			}

			// only trigger breakpoints during an actual break. not on initialize.
			if (!initial && triggerBreakpoint !== false) {
				_.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
			}
		}
	};

	Slick.prototype.changeSlide = function (event, dontAnimate) {

		var _ = this,
		    $target = $(event.currentTarget),
		    indexOffset,
		    slideOffset,
		    unevenOffset;

		// If target is a link, prevent default action.
		if ($target.is('a')) {
			event.preventDefault();
		}

		// If target is not the <li> element (ie: a child), find the <li>.
		if (!$target.is('li')) {
			$target = $target.closest('li');
		}

		unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
		indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

		switch (event.data.message) {

			case 'previous':
				slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
				if (_.slideCount > _.options.slidesToShow) {
					_.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
				}
				break;

			case 'next':
				slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
				if (_.slideCount > _.options.slidesToShow) {
					_.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
				}
				break;

			case 'index':
				var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

				_.slideHandler(_.checkNavigable(index), false, dontAnimate);
				$target.children().trigger('focus');
				break;

			default:
				return;
		}
	};

	Slick.prototype.checkNavigable = function (index) {

		var _ = this,
		    navigables,
		    prevNavigable;

		navigables = _.getNavigableIndexes();
		prevNavigable = 0;
		if (index > navigables[navigables.length - 1]) {
			index = navigables[navigables.length - 1];
		} else {
			for (var n in navigables) {
				if (index < navigables[n]) {
					index = prevNavigable;
					break;
				}
				prevNavigable = navigables[n];
			}
		}

		return index;
	};

	Slick.prototype.cleanUpEvents = function () {

		var _ = this;

		if (_.options.dots && _.$dots !== null) {

			$('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

			if (_.options.accessibility === true) {
				_.$dots.off('keydown.slick', _.keyHandler);
			}
		}

		_.$slider.off('focus.slick blur.slick');

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
			_.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
			_.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

			if (_.options.accessibility === true) {
				_.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
				_.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
			}
		}

		_.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
		_.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
		_.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
		_.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

		_.$list.off('click.slick', _.clickHandler);

		$(document).off(_.visibilityChange, _.visibility);

		_.cleanUpSlideEvents();

		if (_.options.accessibility === true) {
			_.$list.off('keydown.slick', _.keyHandler);
		}

		if (_.options.focusOnSelect === true) {
			$(_.$slideTrack).children().off('click.slick', _.selectHandler);
		}

		$(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

		$(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

		$('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

		$(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
	};

	Slick.prototype.cleanUpSlideEvents = function () {

		var _ = this;

		_.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
		_.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
	};

	Slick.prototype.cleanUpRows = function () {

		var _ = this,
		    originalSlides;

		if (_.options.rows > 0) {
			originalSlides = _.$slides.children().children();
			originalSlides.removeAttr('style');
			_.$slider.empty().append(originalSlides);
		}
	};

	Slick.prototype.clickHandler = function (event) {

		var _ = this;

		if (_.shouldClick === false) {
			event.stopImmediatePropagation();
			event.stopPropagation();
			event.preventDefault();
		}
	};

	Slick.prototype.destroy = function (refresh) {

		var _ = this;

		_.autoPlayClear();

		_.touchObject = {};

		_.cleanUpEvents();

		$('.slick-cloned', _.$slider).detach();

		if (_.$dots) {
			_.$dots.remove();
		}

		if (_.$prevArrow && _.$prevArrow.length) {

			_.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

			if (_.htmlExpr.test(_.options.prevArrow)) {
				_.$prevArrow.remove();
			}
		}

		if (_.$nextArrow && _.$nextArrow.length) {

			_.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

			if (_.htmlExpr.test(_.options.nextArrow)) {
				_.$nextArrow.remove();
			}
		}

		if (_.$slides) {

			_.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
				$(this).attr('style', $(this).data('originalStyling'));
			});

			_.$slideTrack.children(this.options.slide).detach();

			_.$slideTrack.detach();

			_.$list.detach();

			_.$slider.append(_.$slides);
		}

		_.cleanUpRows();

		_.$slider.removeClass('slick-slider');
		_.$slider.removeClass('slick-initialized');
		_.$slider.removeClass('slick-dotted');

		_.unslicked = true;

		if (!refresh) {
			_.$slider.trigger('destroy', [_]);
		}
	};

	Slick.prototype.disableTransition = function (slide) {

		var _ = this,
		    transition = {};

		transition[_.transitionType] = '';

		if (_.options.fade === false) {
			_.$slideTrack.css(transition);
		} else {
			_.$slides.eq(slide).css(transition);
		}
	};

	Slick.prototype.fadeSlide = function (slideIndex, callback) {

		var _ = this;

		if (_.cssTransitions === false) {

			_.$slides.eq(slideIndex).css({
				zIndex: _.options.zIndex
			});

			_.$slides.eq(slideIndex).animate({
				opacity: 1
			}, _.options.speed, _.options.easing, callback);
		} else {

			_.applyTransition(slideIndex);

			_.$slides.eq(slideIndex).css({
				opacity: 1,
				zIndex: _.options.zIndex
			});

			if (callback) {
				setTimeout(function () {

					_.disableTransition(slideIndex);

					callback.call();
				}, _.options.speed);
			}
		}
	};

	Slick.prototype.fadeSlideOut = function (slideIndex) {

		var _ = this;

		if (_.cssTransitions === false) {

			_.$slides.eq(slideIndex).animate({
				opacity: 0,
				zIndex: _.options.zIndex - 2
			}, _.options.speed, _.options.easing);
		} else {

			_.applyTransition(slideIndex);

			_.$slides.eq(slideIndex).css({
				opacity: 0,
				zIndex: _.options.zIndex - 2
			});
		}
	};

	Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {

		var _ = this;

		if (filter !== null) {

			_.$slidesCache = _.$slides;

			_.unload();

			_.$slideTrack.children(this.options.slide).detach();

			_.$slidesCache.filter(filter).appendTo(_.$slideTrack);

			_.reinit();
		}
	};

	Slick.prototype.focusHandler = function () {

		var _ = this;

		_.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*', function (event) {

			event.stopImmediatePropagation();
			var $sf = $(this);

			setTimeout(function () {

				if (_.options.pauseOnFocus) {
					_.focussed = $sf.is(':focus');
					_.autoPlay();
				}
			}, 0);
		});
	};

	Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {

		var _ = this;
		return _.currentSlide;
	};

	Slick.prototype.getDotCount = function () {

		var _ = this;

		var breakPoint = 0;
		var counter = 0;
		var pagerQty = 0;

		if (_.options.infinite === true) {
			if (_.slideCount <= _.options.slidesToShow) {
				++pagerQty;
			} else {
				while (breakPoint < _.slideCount) {
					++pagerQty;
					breakPoint = counter + _.options.slidesToScroll;
					counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
				}
			}
		} else if (_.options.centerMode === true) {
			pagerQty = _.slideCount;
		} else if (!_.options.asNavFor) {
			pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
		} else {
			while (breakPoint < _.slideCount) {
				++pagerQty;
				breakPoint = counter + _.options.slidesToScroll;
				counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
			}
		}

		return pagerQty - 1;
	};

	Slick.prototype.getLeft = function (slideIndex) {

		var _ = this,
		    targetLeft,
		    verticalHeight,
		    verticalOffset = 0,
		    targetSlide,
		    coef;

		_.slideOffset = 0;
		verticalHeight = _.$slides.first().outerHeight(true);

		if (_.options.infinite === true) {
			if (_.slideCount > _.options.slidesToShow) {
				_.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
				coef = -1;

				if (_.options.vertical === true && _.options.centerMode === true) {
					if (_.options.slidesToShow === 2) {
						coef = -1.5;
					} else if (_.options.slidesToShow === 1) {
						coef = -2;
					}
				}
				verticalOffset = verticalHeight * _.options.slidesToShow * coef;
			}
			if (_.slideCount % _.options.slidesToScroll !== 0) {
				if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
					if (slideIndex > _.slideCount) {
						_.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
						verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
					} else {
						_.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
						verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
					}
				}
			}
		} else {
			if (slideIndex + _.options.slidesToShow > _.slideCount) {
				_.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
				verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
			}
		}

		if (_.slideCount <= _.options.slidesToShow) {
			_.slideOffset = 0;
			verticalOffset = 0;
		}

		if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
			_.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
		} else if (_.options.centerMode === true && _.options.infinite === true) {
			_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
		} else if (_.options.centerMode === true) {
			_.slideOffset = 0;
			_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
		}

		if (_.options.vertical === false) {
			targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
		} else {
			targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
		}

		if (_.options.variableWidth === true) {

			if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
				targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
			} else {
				targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
			}

			if (_.options.rtl === true) {
				if (targetSlide[0]) {
					targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
				} else {
					targetLeft = 0;
				}
			} else {
				targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
			}

			if (_.options.centerMode === true) {
				if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
					targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
				} else {
					targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
				}

				if (_.options.rtl === true) {
					if (targetSlide[0]) {
						targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
					} else {
						targetLeft = 0;
					}
				} else {
					targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
				}

				targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
			}
		}

		return targetLeft;
	};

	Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {

		var _ = this;

		return _.options[option];
	};

	Slick.prototype.getNavigableIndexes = function () {

		var _ = this,
		    breakPoint = 0,
		    counter = 0,
		    indexes = [],
		    max;

		if (_.options.infinite === false) {
			max = _.slideCount;
		} else {
			breakPoint = _.options.slidesToScroll * -1;
			counter = _.options.slidesToScroll * -1;
			max = _.slideCount * 2;
		}

		while (breakPoint < max) {
			indexes.push(breakPoint);
			breakPoint = counter + _.options.slidesToScroll;
			counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
		}

		return indexes;
	};

	Slick.prototype.getSlick = function () {

		return this;
	};

	Slick.prototype.getSlideCount = function () {

		var _ = this,
		    slidesTraversed,
		    swipedSlide,
		    centerOffset;

		centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

		if (_.options.swipeToSlide === true) {
			_.$slideTrack.find('.slick-slide').each(function (index, slide) {
				if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
					swipedSlide = slide;
					return false;
				}
			});

			slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

			return slidesTraversed;
		} else {
			return _.options.slidesToScroll;
		}
	};

	Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {

		var _ = this;

		_.changeSlide({
			data: {
				message: 'index',
				index: parseInt(slide)
			}
		}, dontAnimate);
	};

	Slick.prototype.init = function (creation) {

		var _ = this;

		if (!$(_.$slider).hasClass('slick-initialized')) {

			$(_.$slider).addClass('slick-initialized');

			_.buildRows();
			_.buildOut();
			_.setProps();
			_.startLoad();
			_.loadSlider();
			_.initializeEvents();
			_.updateArrows();
			_.updateDots();
			_.checkResponsive(true);
			_.focusHandler();
		}

		if (creation) {
			_.$slider.trigger('init', [_]);
		}

		if (_.options.accessibility === true) {
			_.initADA();
		}

		if (_.options.autoplay) {

			_.paused = false;
			_.autoPlay();
		}
	};

	Slick.prototype.initADA = function () {
		var _ = this,
		    numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
		    tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
			return val >= 0 && val < _.slideCount;
		});

		_.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
			'aria-hidden': 'true',
			'tabindex': '-1'
		}).find('a, input, button, select').attr({
			'tabindex': '-1'
		});

		if (_.$dots !== null) {
			_.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
				var slideControlIndex = tabControlIndexes.indexOf(i);

				$(this).attr({
					'role': 'tabpanel',
					'id': 'slick-slide' + _.instanceUid + i,
					'tabindex': -1
				});

				if (slideControlIndex !== -1) {
					var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;
					if ($('#' + ariaButtonControl).length) {
						$(this).attr({
							'aria-describedby': ariaButtonControl
						});
					}
				}
			});

			_.$dots.attr('role', 'tablist').find('li').each(function (i) {
				var mappedSlideIndex = tabControlIndexes[i];

				$(this).attr({
					'role': 'presentation'
				});

				$(this).find('button').first().attr({
					'role': 'tab',
					'id': 'slick-slide-control' + _.instanceUid + i,
					'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
					'aria-label': i + 1 + ' of ' + numDotGroups,
					'aria-selected': null,
					'tabindex': '-1'
				});
			}).eq(_.currentSlide).find('button').attr({
				'aria-selected': 'true',
				'tabindex': '0'
			}).end();
		}

		for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
			if (_.options.focusOnChange) {
				_.$slides.eq(i).attr({ 'tabindex': '0' });
			} else {
				_.$slides.eq(i).removeAttr('tabindex');
			}
		}

		_.activateADA();
	};

	Slick.prototype.initArrowEvents = function () {

		var _ = this;

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
			_.$prevArrow.off('click.slick').on('click.slick', {
				message: 'previous'
			}, _.changeSlide);
			_.$nextArrow.off('click.slick').on('click.slick', {
				message: 'next'
			}, _.changeSlide);

			if (_.options.accessibility === true) {
				_.$prevArrow.on('keydown.slick', _.keyHandler);
				_.$nextArrow.on('keydown.slick', _.keyHandler);
			}
		}
	};

	Slick.prototype.initDotEvents = function () {

		var _ = this;

		if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
			$('li', _.$dots).on('click.slick', {
				message: 'index'
			}, _.changeSlide);

			if (_.options.accessibility === true) {
				_.$dots.on('keydown.slick', _.keyHandler);
			}
		}

		if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

			$('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
		}
	};

	Slick.prototype.initSlideEvents = function () {

		var _ = this;

		if (_.options.pauseOnHover) {

			_.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
			_.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
		}
	};

	Slick.prototype.initializeEvents = function () {

		var _ = this;

		_.initArrowEvents();

		_.initDotEvents();
		_.initSlideEvents();

		_.$list.on('touchstart.slick mousedown.slick', {
			action: 'start'
		}, _.swipeHandler);
		_.$list.on('touchmove.slick mousemove.slick', {
			action: 'move'
		}, _.swipeHandler);
		_.$list.on('touchend.slick mouseup.slick', {
			action: 'end'
		}, _.swipeHandler);
		_.$list.on('touchcancel.slick mouseleave.slick', {
			action: 'end'
		}, _.swipeHandler);

		_.$list.on('click.slick', _.clickHandler);

		$(document).on(_.visibilityChange, $.proxy(_.visibility, _));

		if (_.options.accessibility === true) {
			_.$list.on('keydown.slick', _.keyHandler);
		}

		if (_.options.focusOnSelect === true) {
			$(_.$slideTrack).children().on('click.slick', _.selectHandler);
		}

		$(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

		$(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

		$('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

		$(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
		$(_.setPosition);
	};

	Slick.prototype.initUI = function () {

		var _ = this;

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

			_.$prevArrow.show();
			_.$nextArrow.show();
		}

		if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

			_.$dots.show();
		}
	};

	Slick.prototype.keyHandler = function (event) {

		var _ = this;
		//Dont slide if the cursor is inside the form fields and arrow keys are pressed
		if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
			if (event.keyCode === 37 && _.options.accessibility === true) {
				_.changeSlide({
					data: {
						message: _.options.rtl === true ? 'next' : 'previous'
					}
				});
			} else if (event.keyCode === 39 && _.options.accessibility === true) {
				_.changeSlide({
					data: {
						message: _.options.rtl === true ? 'previous' : 'next'
					}
				});
			}
		}
	};

	Slick.prototype.lazyLoad = function () {

		var _ = this,
		    loadRange,
		    cloneRange,
		    rangeStart,
		    rangeEnd;

		function loadImages(imagesScope) {

			$('img[data-lazy]', imagesScope).each(function () {

				var image = $(this),
				    imageSource = $(this).attr('data-lazy'),
				    imageSrcSet = $(this).attr('data-srcset'),
				    imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
				    imageToLoad = document.createElement('img');

				imageToLoad.onload = function () {

					image.animate({ opacity: 0 }, 100, function () {

						if (imageSrcSet) {
							image.attr('srcset', imageSrcSet);

							if (imageSizes) {
								image.attr('sizes', imageSizes);
							}
						}

						image.attr('src', imageSource).animate({ opacity: 1 }, 200, function () {
							image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
						});
						_.$slider.trigger('lazyLoaded', [_, image, imageSource]);
					});
				};

				imageToLoad.onerror = function () {

					image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

					_.$slider.trigger('lazyLoadError', [_, image, imageSource]);
				};

				imageToLoad.src = imageSource;
			});
		}

		if (_.options.centerMode === true) {
			if (_.options.infinite === true) {
				rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
				rangeEnd = rangeStart + _.options.slidesToShow + 2;
			} else {
				rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
				rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
			}
		} else {
			rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
			rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
			if (_.options.fade === true) {
				if (rangeStart > 0) rangeStart--;
				if (rangeEnd <= _.slideCount) rangeEnd++;
			}
		}

		loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

		if (_.options.lazyLoad === 'anticipated') {
			var prevSlide = rangeStart - 1,
			    nextSlide = rangeEnd,
			    $slides = _.$slider.find('.slick-slide');

			for (var i = 0; i < _.options.slidesToScroll; i++) {
				if (prevSlide < 0) prevSlide = _.slideCount - 1;
				loadRange = loadRange.add($slides.eq(prevSlide));
				loadRange = loadRange.add($slides.eq(nextSlide));
				prevSlide--;
				nextSlide++;
			}
		}

		loadImages(loadRange);

		if (_.slideCount <= _.options.slidesToShow) {
			cloneRange = _.$slider.find('.slick-slide');
			loadImages(cloneRange);
		} else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
			cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
			loadImages(cloneRange);
		} else if (_.currentSlide === 0) {
			cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
			loadImages(cloneRange);
		}
	};

	Slick.prototype.loadSlider = function () {

		var _ = this;

		_.setPosition();

		_.$slideTrack.css({
			opacity: 1
		});

		_.$slider.removeClass('slick-loading');

		_.initUI();

		if (_.options.lazyLoad === 'progressive') {
			_.progressiveLazyLoad();
		}
	};

	Slick.prototype.next = Slick.prototype.slickNext = function () {

		var _ = this;

		_.changeSlide({
			data: {
				message: 'next'
			}
		});
	};

	Slick.prototype.orientationChange = function () {

		var _ = this;

		_.checkResponsive();
		_.setPosition();
	};

	Slick.prototype.pause = Slick.prototype.slickPause = function () {

		var _ = this;

		_.autoPlayClear();
		_.paused = true;
	};

	Slick.prototype.play = Slick.prototype.slickPlay = function () {

		var _ = this;

		_.autoPlay();
		_.options.autoplay = true;
		_.paused = false;
		_.focussed = false;
		_.interrupted = false;
	};

	Slick.prototype.postSlide = function (index) {

		var _ = this;

		if (!_.unslicked) {

			_.$slider.trigger('afterChange', [_, index]);

			_.animating = false;

			if (_.slideCount > _.options.slidesToShow) {
				_.setPosition();
			}

			_.swipeLeft = null;

			if (_.options.autoplay) {
				_.autoPlay();
			}

			if (_.options.accessibility === true) {
				_.initADA();

				if (_.options.focusOnChange) {
					var $currentSlide = $(_.$slides.get(_.currentSlide));
					$currentSlide.attr('tabindex', 0).focus();
				}
			}
		}
	};

	Slick.prototype.prev = Slick.prototype.slickPrev = function () {

		var _ = this;

		_.changeSlide({
			data: {
				message: 'previous'
			}
		});
	};

	Slick.prototype.preventDefault = function (event) {

		event.preventDefault();
	};

	Slick.prototype.progressiveLazyLoad = function (tryCount) {

		tryCount = tryCount || 1;

		var _ = this,
		    $imgsToLoad = $('img[data-lazy]', _.$slider),
		    image,
		    imageSource,
		    imageSrcSet,
		    imageSizes,
		    imageToLoad;

		if ($imgsToLoad.length) {

			image = $imgsToLoad.first();
			imageSource = image.attr('data-lazy');
			imageSrcSet = image.attr('data-srcset');
			imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
			imageToLoad = document.createElement('img');

			imageToLoad.onload = function () {

				if (imageSrcSet) {
					image.attr('srcset', imageSrcSet);

					if (imageSizes) {
						image.attr('sizes', imageSizes);
					}
				}

				image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

				if (_.options.adaptiveHeight === true) {
					_.setPosition();
				}

				_.$slider.trigger('lazyLoaded', [_, image, imageSource]);
				_.progressiveLazyLoad();
			};

			imageToLoad.onerror = function () {

				if (tryCount < 3) {

					/**
      * try to load the image 3 times,
      * leave a slight delay so we don't get
      * servers blocking the request.
      */
					setTimeout(function () {
						_.progressiveLazyLoad(tryCount + 1);
					}, 500);
				} else {

					image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

					_.$slider.trigger('lazyLoadError', [_, image, imageSource]);

					_.progressiveLazyLoad();
				}
			};

			imageToLoad.src = imageSource;
		} else {

			_.$slider.trigger('allImagesLoaded', [_]);
		}
	};

	Slick.prototype.refresh = function (initializing) {

		var _ = this,
		    currentSlide,
		    lastVisibleIndex;

		lastVisibleIndex = _.slideCount - _.options.slidesToShow;

		// in non-infinite sliders, we don't want to go past the
		// last visible index.
		if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
			_.currentSlide = lastVisibleIndex;
		}

		// if less slides than to show, go to start.
		if (_.slideCount <= _.options.slidesToShow) {
			_.currentSlide = 0;
		}

		currentSlide = _.currentSlide;

		_.destroy(true);

		$.extend(_, _.initials, { currentSlide: currentSlide });

		_.init();

		if (!initializing) {

			_.changeSlide({
				data: {
					message: 'index',
					index: currentSlide
				}
			}, false);
		}
	};

	Slick.prototype.registerBreakpoints = function () {

		var _ = this,
		    breakpoint,
		    currentBreakpoint,
		    l,
		    responsiveSettings = _.options.responsive || null;

		if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

			_.respondTo = _.options.respondTo || 'window';

			for (breakpoint in responsiveSettings) {

				l = _.breakpoints.length - 1;

				if (responsiveSettings.hasOwnProperty(breakpoint)) {
					currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

					// loop through the breakpoints and cut out any existing
					// ones with the same breakpoint number, we don't want dupes.
					while (l >= 0) {
						if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
							_.breakpoints.splice(l, 1);
						}
						l--;
					}

					_.breakpoints.push(currentBreakpoint);
					_.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
				}
			}

			_.breakpoints.sort(function (a, b) {
				return _.options.mobileFirst ? a - b : b - a;
			});
		}
	};

	Slick.prototype.reinit = function () {

		var _ = this;

		_.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');

		_.slideCount = _.$slides.length;

		if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
			_.currentSlide = _.currentSlide - _.options.slidesToScroll;
		}

		if (_.slideCount <= _.options.slidesToShow) {
			_.currentSlide = 0;
		}

		_.registerBreakpoints();

		_.setProps();
		_.setupInfinite();
		_.buildArrows();
		_.updateArrows();
		_.initArrowEvents();
		_.buildDots();
		_.updateDots();
		_.initDotEvents();
		_.cleanUpSlideEvents();
		_.initSlideEvents();

		_.checkResponsive(false, true);

		if (_.options.focusOnSelect === true) {
			$(_.$slideTrack).children().on('click.slick', _.selectHandler);
		}

		_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

		_.setPosition();
		_.focusHandler();

		_.paused = !_.options.autoplay;
		_.autoPlay();

		_.$slider.trigger('reInit', [_]);
	};

	Slick.prototype.resize = function () {

		var _ = this;

		if ($(window).width() !== _.windowWidth) {
			clearTimeout(_.windowDelay);
			_.windowDelay = window.setTimeout(function () {
				_.windowWidth = $(window).width();
				_.checkResponsive();
				if (!_.unslicked) {
					_.setPosition();
				}
			}, 50);
		}
	};

	Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {

		var _ = this;

		if (typeof index === 'boolean') {
			removeBefore = index;
			index = removeBefore === true ? 0 : _.slideCount - 1;
		} else {
			index = removeBefore === true ? --index : index;
		}

		if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
			return false;
		}

		_.unload();

		if (removeAll === true) {
			_.$slideTrack.children().remove();
		} else {
			_.$slideTrack.children(this.options.slide).eq(index).remove();
		}

		_.$slides = _.$slideTrack.children(this.options.slide);

		_.$slideTrack.children(this.options.slide).detach();

		_.$slideTrack.append(_.$slides);

		_.$slidesCache = _.$slides;

		_.reinit();
	};

	Slick.prototype.setCSS = function (position) {

		var _ = this,
		    positionProps = {},
		    x,
		    y;

		if (_.options.rtl === true) {
			position = -position;
		}
		x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
		y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

		positionProps[_.positionProp] = position;

		if (_.transformsEnabled === false) {
			_.$slideTrack.css(positionProps);
		} else {
			positionProps = {};
			if (_.cssTransitions === false) {
				positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
				_.$slideTrack.css(positionProps);
			} else {
				positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
				_.$slideTrack.css(positionProps);
			}
		}
	};

	Slick.prototype.setDimensions = function () {

		var _ = this;

		if (_.options.vertical === false) {
			if (_.options.centerMode === true) {
				_.$list.css({
					padding: '0px ' + _.options.centerPadding
				});
			}
		} else {
			_.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
			if (_.options.centerMode === true) {
				_.$list.css({
					padding: _.options.centerPadding + ' 0px'
				});
			}
		}

		_.listWidth = _.$list.width();
		_.listHeight = _.$list.height();

		if (_.options.vertical === false && _.options.variableWidth === false) {
			_.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
			_.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
		} else if (_.options.variableWidth === true) {
			_.$slideTrack.width(5000 * _.slideCount);
		} else {
			_.slideWidth = Math.ceil(_.listWidth);
			_.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
		}

		var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
		if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
	};

	Slick.prototype.setFade = function () {

		var _ = this,
		    targetLeft;

		_.$slides.each(function (index, element) {
			targetLeft = _.slideWidth * index * -1;
			if (_.options.rtl === true) {
				$(element).css({
					position: 'relative',
					right: targetLeft,
					top: 0,
					zIndex: _.options.zIndex - 2,
					opacity: 0
				});
			} else {
				$(element).css({
					position: 'relative',
					left: targetLeft,
					top: 0,
					zIndex: _.options.zIndex - 2,
					opacity: 0
				});
			}
		});

		_.$slides.eq(_.currentSlide).css({
			zIndex: _.options.zIndex - 1,
			opacity: 1
		});
	};

	Slick.prototype.setHeight = function () {

		var _ = this;

		if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
			var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
			_.$list.css('height', targetHeight);
		}
	};

	Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {

		/**
   * accepts arguments in format of:
   *
   *  - for changing a single option's value:
   *     .slick("setOption", option, value, refresh )
   *
   *  - for changing a set of responsive options:
   *     .slick("setOption", 'responsive', [{}, ...], refresh )
   *
   *  - for updating multiple values at once (not responsive)
   *     .slick("setOption", { 'option': value, ... }, refresh )
   */

		var _ = this,
		    l,
		    item,
		    option,
		    value,
		    refresh = false,
		    type;

		if ($.type(arguments[0]) === 'object') {

			option = arguments[0];
			refresh = arguments[1];
			type = 'multiple';
		} else if ($.type(arguments[0]) === 'string') {

			option = arguments[0];
			value = arguments[1];
			refresh = arguments[2];

			if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

				type = 'responsive';
			} else if (typeof arguments[1] !== 'undefined') {

				type = 'single';
			}
		}

		if (type === 'single') {

			_.options[option] = value;
		} else if (type === 'multiple') {

			$.each(option, function (opt, val) {

				_.options[opt] = val;
			});
		} else if (type === 'responsive') {

			for (item in value) {

				if ($.type(_.options.responsive) !== 'array') {

					_.options.responsive = [value[item]];
				} else {

					l = _.options.responsive.length - 1;

					// loop through the responsive object and splice out duplicates.
					while (l >= 0) {

						if (_.options.responsive[l].breakpoint === value[item].breakpoint) {

							_.options.responsive.splice(l, 1);
						}

						l--;
					}

					_.options.responsive.push(value[item]);
				}
			}
		}

		if (refresh) {

			_.unload();
			_.reinit();
		}
	};

	Slick.prototype.setPosition = function () {

		var _ = this;

		_.setDimensions();

		_.setHeight();

		if (_.options.fade === false) {
			_.setCSS(_.getLeft(_.currentSlide));
		} else {
			_.setFade();
		}

		_.$slider.trigger('setPosition', [_]);
	};

	Slick.prototype.setProps = function () {

		var _ = this,
		    bodyStyle = document.body.style;

		_.positionProp = _.options.vertical === true ? 'top' : 'left';

		if (_.positionProp === 'top') {
			_.$slider.addClass('slick-vertical');
		} else {
			_.$slider.removeClass('slick-vertical');
		}

		if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
			if (_.options.useCSS === true) {
				_.cssTransitions = true;
			}
		}

		if (_.options.fade) {
			if (typeof _.options.zIndex === 'number') {
				if (_.options.zIndex < 3) {
					_.options.zIndex = 3;
				}
			} else {
				_.options.zIndex = _.defaults.zIndex;
			}
		}

		if (bodyStyle.OTransform !== undefined) {
			_.animType = 'OTransform';
			_.transformType = '-o-transform';
			_.transitionType = 'OTransition';
			if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
		}
		if (bodyStyle.MozTransform !== undefined) {
			_.animType = 'MozTransform';
			_.transformType = '-moz-transform';
			_.transitionType = 'MozTransition';
			if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
		}
		if (bodyStyle.webkitTransform !== undefined) {
			_.animType = 'webkitTransform';
			_.transformType = '-webkit-transform';
			_.transitionType = 'webkitTransition';
			if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
		}
		if (bodyStyle.msTransform !== undefined) {
			_.animType = 'msTransform';
			_.transformType = '-ms-transform';
			_.transitionType = 'msTransition';
			if (bodyStyle.msTransform === undefined) _.animType = false;
		}
		if (bodyStyle.transform !== undefined && _.animType !== false) {
			_.animType = 'transform';
			_.transformType = 'transform';
			_.transitionType = 'transition';
		}
		_.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
	};

	Slick.prototype.setSlideClasses = function (index) {

		var _ = this,
		    centerOffset,
		    allSlides,
		    indexOffset,
		    remainder;

		allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

		_.$slides.eq(index).addClass('slick-current');

		if (_.options.centerMode === true) {

			var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

			centerOffset = Math.floor(_.options.slidesToShow / 2);

			if (_.options.infinite === true) {

				if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
					_.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
				} else {

					indexOffset = _.options.slidesToShow + index;
					allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
				}

				if (index === 0) {

					allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
				} else if (index === _.slideCount - 1) {

					allSlides.eq(_.options.slidesToShow).addClass('slick-center');
				}
			}

			_.$slides.eq(index).addClass('slick-center');
		} else {

			if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {

				_.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
			} else if (allSlides.length <= _.options.slidesToShow) {

				allSlides.addClass('slick-active').attr('aria-hidden', 'false');
			} else {

				remainder = _.slideCount % _.options.slidesToShow;
				indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

				if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {

					allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
				} else {

					allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
				}
			}
		}

		if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
			_.lazyLoad();
		}
	};

	Slick.prototype.setupInfinite = function () {

		var _ = this,
		    i,
		    slideIndex,
		    infiniteCount;

		if (_.options.fade === true) {
			_.options.centerMode = false;
		}

		if (_.options.infinite === true && _.options.fade === false) {

			slideIndex = null;

			if (_.slideCount > _.options.slidesToShow) {

				if (_.options.centerMode === true) {
					infiniteCount = _.options.slidesToShow + 1;
				} else {
					infiniteCount = _.options.slidesToShow;
				}

				for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
					slideIndex = i - 1;
					$(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
				}
				for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
					slideIndex = i;
					$(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
				}
				_.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
					$(this).attr('id', '');
				});
			}
		}
	};

	Slick.prototype.interrupt = function (toggle) {

		var _ = this;

		if (!toggle) {
			_.autoPlay();
		}
		_.interrupted = toggle;
	};

	Slick.prototype.selectHandler = function (event) {

		var _ = this;

		var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');

		var index = parseInt(targetElement.attr('data-slick-index'));

		if (!index) index = 0;

		if (_.slideCount <= _.options.slidesToShow) {

			_.slideHandler(index, false, true);
			return;
		}

		_.slideHandler(index);
	};

	Slick.prototype.slideHandler = function (index, sync, dontAnimate) {

		var targetSlide,
		    animSlide,
		    oldSlide,
		    slideLeft,
		    targetLeft = null,
		    _ = this,
		    navTarget;

		sync = sync || false;

		if (_.animating === true && _.options.waitForAnimate === true) {
			return;
		}

		if (_.options.fade === true && _.currentSlide === index) {
			return;
		}

		if (sync === false) {
			_.asNavFor(index);
		}

		targetSlide = index;
		targetLeft = _.getLeft(targetSlide);
		slideLeft = _.getLeft(_.currentSlide);

		_.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

		if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
			if (_.options.fade === false) {
				targetSlide = _.currentSlide;
				if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
					_.animateSlide(slideLeft, function () {
						_.postSlide(targetSlide);
					});
				} else {
					_.postSlide(targetSlide);
				}
			}
			return;
		} else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
			if (_.options.fade === false) {
				targetSlide = _.currentSlide;
				if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
					_.animateSlide(slideLeft, function () {
						_.postSlide(targetSlide);
					});
				} else {
					_.postSlide(targetSlide);
				}
			}
			return;
		}

		if (_.options.autoplay) {
			clearInterval(_.autoPlayTimer);
		}

		if (targetSlide < 0) {
			if (_.slideCount % _.options.slidesToScroll !== 0) {
				animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
			} else {
				animSlide = _.slideCount + targetSlide;
			}
		} else if (targetSlide >= _.slideCount) {
			if (_.slideCount % _.options.slidesToScroll !== 0) {
				animSlide = 0;
			} else {
				animSlide = targetSlide - _.slideCount;
			}
		} else {
			animSlide = targetSlide;
		}

		_.animating = true;

		_.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

		oldSlide = _.currentSlide;
		_.currentSlide = animSlide;

		_.setSlideClasses(_.currentSlide);

		if (_.options.asNavFor) {

			navTarget = _.getNavTarget();
			navTarget = navTarget.slick('getSlick');

			if (navTarget.slideCount <= navTarget.options.slidesToShow) {
				navTarget.setSlideClasses(_.currentSlide);
			}
		}

		_.updateDots();
		_.updateArrows();

		if (_.options.fade === true) {
			if (dontAnimate !== true) {

				_.fadeSlideOut(oldSlide);

				_.fadeSlide(animSlide, function () {
					_.postSlide(animSlide);
				});
			} else {
				_.postSlide(animSlide);
			}
			_.animateHeight();
			return;
		}

		if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
			_.animateSlide(targetLeft, function () {
				_.postSlide(animSlide);
			});
		} else {
			_.postSlide(animSlide);
		}
	};

	Slick.prototype.startLoad = function () {

		var _ = this;

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

			_.$prevArrow.hide();
			_.$nextArrow.hide();
		}

		if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

			_.$dots.hide();
		}

		_.$slider.addClass('slick-loading');
	};

	Slick.prototype.swipeDirection = function () {

		var xDist,
		    yDist,
		    r,
		    swipeAngle,
		    _ = this;

		xDist = _.touchObject.startX - _.touchObject.curX;
		yDist = _.touchObject.startY - _.touchObject.curY;
		r = Math.atan2(yDist, xDist);

		swipeAngle = Math.round(r * 180 / Math.PI);
		if (swipeAngle < 0) {
			swipeAngle = 360 - Math.abs(swipeAngle);
		}

		if (swipeAngle <= 45 && swipeAngle >= 0) {
			return _.options.rtl === false ? 'left' : 'right';
		}
		if (swipeAngle <= 360 && swipeAngle >= 315) {
			return _.options.rtl === false ? 'left' : 'right';
		}
		if (swipeAngle >= 135 && swipeAngle <= 225) {
			return _.options.rtl === false ? 'right' : 'left';
		}
		if (_.options.verticalSwiping === true) {
			if (swipeAngle >= 35 && swipeAngle <= 135) {
				return 'down';
			} else {
				return 'up';
			}
		}

		return 'vertical';
	};

	Slick.prototype.swipeEnd = function (event) {

		var _ = this,
		    slideCount,
		    direction;

		_.dragging = false;
		_.swiping = false;

		if (_.scrolling) {
			_.scrolling = false;
			return false;
		}

		_.interrupted = false;
		_.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

		if (_.touchObject.curX === undefined) {
			return false;
		}

		if (_.touchObject.edgeHit === true) {
			_.$slider.trigger('edge', [_, _.swipeDirection()]);
		}

		if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

			direction = _.swipeDirection();

			switch (direction) {

				case 'left':
				case 'down':

					slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();

					_.currentDirection = 0;

					break;

				case 'right':
				case 'up':

					slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();

					_.currentDirection = 1;

					break;

				default:

			}

			if (direction != 'vertical') {

				_.slideHandler(slideCount);
				_.touchObject = {};
				_.$slider.trigger('swipe', [_, direction]);
			}
		} else {

			if (_.touchObject.startX !== _.touchObject.curX) {

				_.slideHandler(_.currentSlide);
				_.touchObject = {};
			}
		}
	};

	Slick.prototype.swipeHandler = function (event) {

		var _ = this;

		if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
			return;
		} else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
			return;
		}

		_.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

		_.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

		if (_.options.verticalSwiping === true) {
			_.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
		}

		switch (event.data.action) {

			case 'start':
				_.swipeStart(event);
				break;

			case 'move':
				_.swipeMove(event);
				break;

			case 'end':
				_.swipeEnd(event);
				break;

		}
	};

	Slick.prototype.swipeMove = function (event) {

		var _ = this,
		    edgeWasHit = false,
		    curLeft,
		    swipeDirection,
		    swipeLength,
		    positionOffset,
		    touches,
		    verticalSwipeLength;

		touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

		if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
			return false;
		}

		curLeft = _.getLeft(_.currentSlide);

		_.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
		_.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

		_.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

		verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

		if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
			_.scrolling = true;
			return false;
		}

		if (_.options.verticalSwiping === true) {
			_.touchObject.swipeLength = verticalSwipeLength;
		}

		swipeDirection = _.swipeDirection();

		if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
			_.swiping = true;
			event.preventDefault();
		}

		positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
		if (_.options.verticalSwiping === true) {
			positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
		}

		swipeLength = _.touchObject.swipeLength;

		_.touchObject.edgeHit = false;

		if (_.options.infinite === false) {
			if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
				swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
				_.touchObject.edgeHit = true;
			}
		}

		if (_.options.vertical === false) {
			_.swipeLeft = curLeft + swipeLength * positionOffset;
		} else {
			_.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
		}
		if (_.options.verticalSwiping === true) {
			_.swipeLeft = curLeft + swipeLength * positionOffset;
		}

		if (_.options.fade === true || _.options.touchMove === false) {
			return false;
		}

		if (_.animating === true) {
			_.swipeLeft = null;
			return false;
		}

		_.setCSS(_.swipeLeft);
	};

	Slick.prototype.swipeStart = function (event) {

		var _ = this,
		    touches;

		_.interrupted = true;

		if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
			_.touchObject = {};
			return false;
		}

		if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
			touches = event.originalEvent.touches[0];
		}

		_.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
		_.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

		_.dragging = true;
	};

	Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {

		var _ = this;

		if (_.$slidesCache !== null) {

			_.unload();

			_.$slideTrack.children(this.options.slide).detach();

			_.$slidesCache.appendTo(_.$slideTrack);

			_.reinit();
		}
	};

	Slick.prototype.unload = function () {

		var _ = this;

		$('.slick-cloned', _.$slider).remove();

		if (_.$dots) {
			_.$dots.remove();
		}

		if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
			_.$prevArrow.remove();
		}

		if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
			_.$nextArrow.remove();
		}

		_.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
	};

	Slick.prototype.unslick = function (fromBreakpoint) {

		var _ = this;
		_.$slider.trigger('unslick', [_, fromBreakpoint]);
		_.destroy();
	};

	Slick.prototype.updateArrows = function () {

		var _ = this,
		    centerOffset;

		centerOffset = Math.floor(_.options.slidesToShow / 2);

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {

			_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
			_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

			if (_.currentSlide === 0) {

				_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
				_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
			} else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

				_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
				_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
			} else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

				_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
				_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
			}
		}
	};

	Slick.prototype.updateDots = function () {

		var _ = this;

		if (_.$dots !== null) {

			_.$dots.find('li').removeClass('slick-active').end();

			_.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
		}
	};

	Slick.prototype.visibility = function () {

		var _ = this;

		if (_.options.autoplay) {

			if (document[_.hidden]) {

				_.interrupted = true;
			} else {

				_.interrupted = false;
			}
		}
	};

	$.fn.slick = function () {
		var _ = this,
		    opt = arguments[0],
		    args = Array.prototype.slice.call(arguments, 1),
		    l = _.length,
		    i,
		    ret;
		for (i = 0; i < l; i++) {
			if ((typeof opt === "undefined" ? "undefined" : _typeof(opt)) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
			if (typeof ret != 'undefined') return ret;
		}
		return _;
	};
});

$.fn.equalRowHeight = function (options) {
	var defaults = {};
	var o = $.extend(defaults, options);
	var tallest = [];
	$(this).height('');
	this.each(function (i) {
		if (o.rowLength) {
			tallest[Math.floor(i / o.rowLength)] = Math.max($(this).height(), tallest[Math.floor(i / o.rowLength)] || 0);
		} else {
			var a = $(this);
			var p = a.offset();
			a.data('top', Math.floor(p.top));
			tallest[Math.floor(p.top)] = Math.max($(this).height(), tallest[Math.floor(p.top)] || 0);
		}
	}).each(function (i) {
		if (o.rowLength) {
			if (tallest[Math.floor(i / o.rowLength)] > 0) {
				$(this).css({ "height": tallest[Math.floor(i / o.rowLength)] });
			}
		} else {
			var a = $(this);
			if (tallest[Math.floor(a.data('top'))] > 0) {
				$(this).css({ "height": tallest[Math.floor(a.data('top'))] });
			}
		}
	});
	return this;
};
function validateContactForm(sel) {
	var contactForm = document.querySelectorAll(sel);
	if (contactForm.length > 0) {
		for (var i = 0; i < contactForm.length; i++) {
			contactForm[i].addEventListener('submit', function (evt) {
				var fields = this.querySelectorAll('input,select');
				var invalidFields = {};
				for (var j = 0; j < fields.length; j++) {
					var field = fields[j];
					if (field.previousElementSibling) {
						var lbl = field.previousElementSibling.innerText.replace('*', '');

						if (field.getAttribute('required') && field.value == '') {
							invalidFields[field.name] = {
								label: lbl,
								reason: 'Please enter ' + lbl
							};
						}

						if (field.name.indexOf('email') > -1 && !validEmail(field.value)) {
							invalidFields[field.name] = {
								label: lbl,
								reason: lbl + ' needs to be a valid email address'
							};
						}

						if (field.name.indexOf('phone') > -1 && !validPhone(field.value)) {
							invalidFields[field.name] = {
								label: lbl,
								reason: lbl + ' needs to be a valid phone number'
							};
						}

						if (field.name.indexOf('postcode') > -1 && !validPostcode(field.value)) {
							invalidFields[field.name] = {
								label: lbl,
								reason: lbl + ' needs to be a valid postcode'
							};
						}
					}
				}

				if (Object.keys(invalidFields).length) {
					var errorString = this.dataset.errorText;
					for (var f in invalidFields) {
						errorString += '\n ' + invalidFields[f].reason;
					}
					alert(errorString);
					evt.preventDefault();
				}
			});
		}
	}
};

function validPostcode(val) {
	//Republic of ireland val.toUpperCase().match(/[A-Za-z]\d{2}\s[A-Za-z\d]{4}/)
	return val.toUpperCase().match(/^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/);
}
function validEmail(val) {
	return val.toUpperCase().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
}
function validPhone(val) {
	return val.toUpperCase().match(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/);
}
function mobileNav(mobileNavs) {
	$(mobileNavs).each(function (i, a) {
		var $a = $(this);
		if ($a.children('.menu-toggle').length === 0) {
			$a.prepend("<div class=\"menu-toggle\">\n        <span class=\"menu-toggle__toggleholder\">\n          <span class=\"menu-toggle__line menu-toggle__line1\"></span>\n          <span class=\"menu-toggle__line menu-toggle__line2\"></span>\n          <span class=\"menu-toggle__line menu-toggle__line3\"></span>\n        </span>\n        <span class=\"menu-toggle__text\">Menu</span>\n      </div>");
			$a.children('.menu-toggle').off('click').click(mobileMenuDisplay).end().children('div:not(".menu-toggle")').find('.nomobilenav').parent('.selectcontainer').remove().end().remove().end().prepend($('.nomobilenav').clone(true, true).addClass('mobileonly'));

			$('.pageholder, .topsection, .endsection, .footer').off('click').click(function () {
				if ($('.menu-toggle').hasClass('selected')) {
					$('.menu-toggle').removeClass('selected').siblings('div').fadeOut(400);
				}
			});
		}
		if (!$a.children('.menu-toggle').hasClass('selected')) {
			$a.children('div:not(".menu-toggle")').hide();
		}

		switch (this.id) {
			case 'nav':
				$a.find('.tog-menu').text('');
				break;
		}
	});
}

function mobileMenuDisplay(e) {
	var anbtn = $(this);
	if (anbtn.hasClass('selected')) {
		anbtn.removeClass('selected').siblings('div').fadeOut(400);
		$('body').css({ 'overflow': 'auto', 'position': 'static' });
	} else {
		anbtn.addClass('selected').siblings('div:not(.keephidden)').fadeIn(400);
		$('body').css({ 'overflow': 'hidden', 'position': 'fixed' });
	}
	e.stopPropagation();
	e.preventDefault();
}

function removeMobileNav(mobileNavs) {
	$('.menu-toggle').remove();
	$(mobileNavs).children('div:not(".menu-toggle")').show();
}
$(function () {
	$('.smoothscroll').unbind('click').click(function () {
		var $a = $(this);
		var $w = $(window);
		var ahref = $a.attr('href');
		var targetid = ahref.substring(ahref.indexOf('#') + 1, ahref.length);
		scrollToId(targetid);
	});
});

function scrollToId(targetid) {
	var targettop = $('#' + targetid).offset().top;
	$('html, body').animate({ scrollTop: targettop }, 2000);
}
$(function () {

	var prefixAnimationEvent = "webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend";
	var prefixTransitionEvent = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
	var mobileswitchwidth = 975;
	var mobileNavs = '#nav, #smallnav';

	if ($('#contactholder').length > 0 && document.getElementById("contactholder").hasAttribute('data-subject')) {
		$('#contactholder').find("select[name=\"subject\"] option:contains(" + $('#contactholder').data('subject') + ")").prop({ selected: true });
	}

	function windowResize() {
		/*
  if(window.matchMedia(`(max-width: ${mobileswitchwidth}px)`).matches){
  	mobileNav(mobileNavs);
  } else {
  	removeMobileNav(mobileNavs);
  }*/

		if ($('.brochures__listarea--wcontainer').length > 0) {
			$('.brochures__listarea--wcontainer').each(function () {
				var current = $(this);
				if (window.matchMedia('(max-width: 400px)').matches) {
					current.find('.brochures__itemtext').removeAttr('style');
				} else if (window.matchMedia('(max-width: 750px)').matches) {
					current.find('.brochures__itemtext').equalRowHeight({ rowLength: 2 });
				} else {
					current.find('.brochures__itemtext').equalRowHeight({ rowLength: 4 });
				}
			});
		}

		if ($('.pricetable__headings').length > 0) {
			$('.pricetable__headings').each(function () {
				var current = $(this);

				if (current.find('.pricetable__mainheading').length > 0 && current.find('.pricetable__secondaryheading').length > 0) {

					var mainHeading = current.find('.pricetable__mainheading');
					var secondaryHeading = current.find('.pricetable__secondaryheading');

					mainHeading.removeAttr('style');
					secondaryHeading.removeAttr('style');

					if (secondaryHeading.outerHeight() > mainHeading.outerHeight()) {
						mainHeading.css({ 'height': secondaryHeading.outerHeight() + 'px' });
					} else {
						secondaryHeading.css({ 'height': mainHeading.outerHeight() + 'px' });
					}
				}
			});
		}

		if ($('.freeformpanelarea .freeform-row').length > 0) {
			$('.freeformpanelarea .freeform-row').each(function () {
				var current = $(this);
				if (current.children().length == 2) {
					current.addClass('freeform-row--twocol');
				}
			});
		}

		if ($('.propertydetail__linktext').length > 0) {
			$('.propertydetail__linktext').each(function () {
				var current = $(this);
				current.removeAttr('style');
				if (current.outerHeight() < 38) {
					current.css({ 'height': 38 + 'px' });
				}
			});
		}

		if ($('.mooringtable__contentrow').length > 0) {
			$('.mooringtable__contentrow').each(function () {
				var thisRow = $(this);
				thisRow.find('.mooringtable__contentcell').removeAttr('style');
				thisRow.find('.mooringtable__contentcell').css({ 'height': thisRow.height() + 'px' });
			});
		}

		if ($('.mooringtable__headingrow').length > 0) {
			$('.mooringtable__headingrow').each(function () {
				var thisRow = $(this);
				thisRow.find('.mooringtable__headingcellinner').removeAttr('style');
				thisRow.find('.mooringtable__headingcellinner').css({ 'height': thisRow.height() + 'px' });
			});
		}

		if ($('.mooringtable__midheadingrow').length > 0) {
			$('.mooringtable__midheadingrow').each(function () {
				var thisRow = $(this);
				thisRow.find('.mooringtable__midheadingcell').removeAttr('style');
				thisRow.find('.mooringtable__midheadingcell').css({ 'height': thisRow.height() + 'px' });
			});
		}

		if ($('.mappanel__headingbefore').length > 0) {
			var leftSpace = $('.mappanel__heading').offset().left;
			$('.mappanel__headingbefore').css({ 'left': '-' + leftSpace + 'px', 'width': leftSpace + 'px' });
		}

		if ($('.headerarea').length > 0) {
			if ($('.headerarea__background').length > 0 || $('.headerarea__galleryholder').length > 0) {
				$('.headerarea').css({ 'min-height': $(window).height() + 'px' });
				setTimeout(function () {
					// slight pause
					if ($('.headerarea__scrollholder').length > 0) {
						$('.headerarea__scrollholder').addClass('headerarea__scrollholder--show');
					}
					if ($('.headerarea__form').length > 0) {
						$('.headerarea__form').addClass('headerarea__form--show');
					}
				}, 200);
			}
		}

		if ($('.salespanels__item').length > 0) {
			if (!window.matchMedia("(max-width: 600px)").matches) {
				$('.salespanels__item').equalRowHeight({ rowLength: 2 });
			}
		}

		if ($('.blogslist__itemcontent--equals').length > 0) {
			$('.blogslist__itemcontent--equals').equalRowHeight({ rowLength: 2 });
		}

		if ($('.optionboxes__imgarea').length > 0) {
			$('.optionboxes__imgarea').equalRowHeight();
		}

		if ($('.properties__enditemimage').length > 0) {
			$('.properties__enditemimage').css({ 'height': $('.properties__enditemcontent').outerHeight() + 'px' });
		}

		if ($('.popup__back').length > 0 && $('.popup__back').is(':visible')) {
			$('.popup__back').each(function () {
				var current = $(this);
				var thisPop = current.closest('.popup');
				var thisAreaHeight = thisPop.find('.popup__box').outerHeight() + parseInt(thisPop.css('padding-top')) + parseInt(thisPop.css('padding-bottom'));
				current.removeAttr('style');
				current.css({ 'height': thisAreaHeight + 'px' });
			});
		}

		if ($('.section__half--imgside').length > 0) {
			$('.section__half--imgside').each(function () {
				var current = $(this);
				var thisContainer = current.closest('.container');
				if (current.hasClass('section__half--alignright')) {
					// same level as content
					current.removeAttr('style');
					current.css({ 'min-height': thisContainer.find('.section__half--contentside').outerHeight() + 'px' });
				} else {
					current.removeAttr('style');
					current.css({ 'min-height': thisContainer.find('.section__half--contentside').outerHeight() + (parseInt(thisContainer.find('.section__half--contentside').css('margin-top')) - parseInt(current.css('margin-top'))) + 'px' });
				}
			});
		}

		if ($('.popup__topexpand').length > 0 && $('.popup__aboveformheading').length > 0 && $('.popup__formexpandarea').length > 0) {
			$('.popup').each(function () {
				var current = $(this);
				var topArea = false;
				var headingArea = false;
				var formArea = false;
				if (current.find('.popup__topexpand').length > 0) {
					topArea = current.find('.popup__topexpand');
				}
				if (current.find('.popup__aboveformheading').length > 0) {
					headingArea = current.find('.popup__aboveformheading');
				}
				if (current.find('.popup__formexpandarea').length > 0) {
					formArea = current.find('.popup__formexpandarea');
				}
				if (topArea != false && headingArea != false && formArea != false) {
					if (window.matchMedia("(max-width: 400px)").matches) {
						if (!(headingArea.hasClass('popup__aboveformheading--formopen') || headingArea.hasClass('popup__aboveformheading--formclosed'))) {
							headingArea.addClass('popup__aboveformheading--formclosed');
							formArea.slideUp().promise().done(function () {
								$(window).trigger('resize');
							});
						}
					} else {
						if (headingArea.hasClass('popup__aboveformheading--formopen') || headingArea.hasClass('popup__aboveformheading--formclosed')) {
							topArea.removeAttr('style');
							formArea.removeAttr('style');
							current.find('.popup__content').removeClass('popup__content--notopspacing');
							headingArea.removeClass('popup__aboveformheading--formopen popup__aboveformheading--formclosed');
						}
					}
				}
			});
		}

		if ($('.section__listingstopright').length > 0 && $('.section__listingstopleft').length > 0) {
			if ($('.section__listingstopleft').width() + $('.section__listingstopright').width() < $('.section__listingstopinner').width()) {
				var listingsLeftHeight = $('.section__listingstopleft').height();
				var listingsRightHeight = $('.section__listingstopright').height();
				var listingsDiff = listingsLeftHeight - listingsRightHeight;
				if (listingsDiff > 0) {
					$('.section__listingstopright').css({ 'margin-top': listingsDiff + 'px' });
				}
			} else {
				$('.section__listingstopright').removeAttr('style');
			}
		}

		if ($('.properties__itemimgsideinner').length > 0) {
			$('.properties__itemimgsideinner').each(function () {
				var current = $(this);
				var thisItem = current.closest('.properties__item');
				var imgSide = thisItem.find('.properties__itemimgsideinner');
				var contentSide = thisItem.find('.properties__itemcontentside');

				imgSide.removeAttr('style');
				contentSide.removeAttr('style');

				if (!window.matchMedia("(max-width: 700px)").matches) {
					var sideImgCheck = function sideImgCheck() {
						if (thisItem.find('.properties__itemimg').height() > 0) {
							clearInterval(checkImg);
							var thisImageHeight = thisItem.find('.properties__itemimg').height();
							var thisContentHeight = thisItem.find('.properties__itemcontentside').outerHeight();

							var imgTopMargin = (thisContentHeight - thisImageHeight) / 2;
							if (imgTopMargin > 0) {
								imgSide.css({ 'margin-top': imgTopMargin + 'px' });
							} else {
								var contentTopMargin = (thisImageHeight - thisContentHeight) / 2;
								if (contentTopMargin > 0) {
									contentSide.css({ 'margin-top': contentTopMargin + 'px' });
								}
							}
						}
					};

					var checkImg = setInterval(sideImgCheck, 200);
				}
			});
		}

		if ($('.membership').length > 0) {
			if (!window.matchMedia("(max-width: 1100px)").matches) {
				$('.membership').each(function () {
					var current = $(this);
					var name = current.find('.membership__name');
					var options = current.find('.membership__options');
					var endText = current.find('.membership__enddetail');
					name.removeAttr('style');
					options.removeAttr('style');
					endText.removeAttr('style');
					var nameHeight = parseFloat(name.outerHeight());
					var optionsHeight = parseFloat(options.outerHeight());
					var endTextHeight = parseFloat(endText.outerHeight());

					if (nameHeight >= optionsHeight && nameHeight >= endTextHeight) {
						options.css({ 'height': nameHeight + 'px' });
						endText.css({ 'height': nameHeight + 'px' });
					} else if (optionsHeight >= nameHeight && optionsHeight >= endTextHeight) {
						name.css({ 'height': optionsHeight + 'px' });
						endText.css({ 'height': optionsHeight + 'px' });
					} else if (endTextHeight >= optionsHeight && endTextHeight >= nameHeight) {
						name.css({ 'height': endTextHeight + 'px' });
						options.css({ 'height': endTextHeight + 'px' });
					}
				});
			} else {
				$('.membership__name').removeAttr('style');
				$('.membership__enddetail').removeAttr('style');
				$('.membership__options').removeAttr('style');
			}
		}

		if ($('.menutable__3colequaltitle').length > 0) {
			$('.menutable__3colequaltitle').equalRowHeight({ rowLength: 3 });
		}

		if ($('.galleryarea__img').length > 0) {
			var fifthWindowWidth = Math.ceil($(window).width() / 100 * 20);
			if ($('.galleryarea__img--short').length > 0) {
				$('.galleryarea__img--short').css({ 'height': fifthWindowWidth + 'px' });
			}
			if ($('.galleryarea__img--tall').length > 0) {
				$('.galleryarea__img--tall').css({ 'height': fifthWindowWidth * 2 + 'px' });
			}
		}

		if ($('.events__itemimg').length > 0 && !window.matchMedia("(max-width: 670px)").matches) {
			$('.events__itemimg').each(function () {
				var current = $(this);
				var thisHeight = current.next('.events__itemcontent').outerHeight();
				current.css({ 'height': thisHeight + 'px' });
			});
		}

		if ($('.section__equalsides').length > 0) {
			$('.section__equalsides').equalRowHeight({ rowLength: 2 });
		}

		if ($('.articles__item--equal').length > 0) {
			$('.articles__item--equal').equalRowHeight({ rowLength: 2 });
		}

		if ($('.headerarea__scrollholder').length > 0 && $('.headerarea__form').length == 0) {
			$('.headerarea__scrollholder').addClass('headerarea__scrollholder--noform');
		}

		if ($('.headerarea__form').length > 0) {
			var extraSpace = 0;
			if ($('.headerarea__financeholder').length > 0) {
				extraSpace = $('.headerarea__financeholder').outerHeight();
			}
			var announceSpace = 0;
			if ($('.announcement').length > 0) {
				announceSpace = $('.announcement').outerHeight();
			}
			var takenSpace = $(window).height() - ($('.headerarea__top').outerHeight() + $('.headerarea__scrollholder').outerHeight() + $('.headerarea__form').outerHeight() + announceSpace + extraSpace);
			if (takenSpace > 0) {
				$('.headerarea__form').css({ 'margin-top': takenSpace + 'px' });
			}
		}

		if ($('.headerarea__financeholder').length > 0) {
			if ($('.headerarea__form').height() == 0) {
				$('.headerarea__form').addClass('headerarea__form--none');
				var announceSpace = 0;
				if ($('.announcement').length > 0) {
					announceSpace = $('.announcement').outerHeight();
				}
				var takenSpace = $(window).height() - ($('.headerarea__top').outerHeight() + $('.headerarea__scrollholder').outerHeight() + $('.headerarea__financeholder').outerHeight() + announceSpace);
				$('.headerarea__financeholder').css({ 'margin-top': takenSpace + 'px' });
			} else {
				$('.headerarea__form').removeClass('headerarea__form--none');
				$('.headerarea__financeholder').removeAttr('style');
			}
		}

		scrollMarkers('.scrolldots__dot', 'scrolldots__dot--active', 'section');

		$('.socialfeeds__item').css({ 'min-height': $('.socialfeeds__item').width() + 'px' });

		$('.socialfeeds__itemcontent').equalRowHeight({ rowLength: 12 });

		$('.socialfeeds__itemcaption').each(function () {
			var current = $(this);
			var panelWidth = current.outerWidth();
			var thisHeight = current.find('.socialfeeds__itemcaptioninner').height();
			var bottomSpace = $('.socialfeeds__itemtype').height() + parseInt($('.socialfeeds__itemtype').css('bottom')) * 2;
			current.css({ 'padding-top': panelWidth / 2 - thisHeight / 2 + 'px', 'padding-bottom': bottomSpace + 'px' });
		});

		if ($('.menutable__title--right').length > 0) {
			$('.menutable__title--right').each(function () {
				var current = $(this);
				var outerTable = current.closest('.menutable');
				var thisTable = outerTable.find('.menutable__table');
				var firstTdWidth = thisTable.find('td:first-child').outerWidth();
				var lastTdWidth = thisTable.find('td:last-child').outerWidth();
				var numRight = 1;
				var addExtra = 0;
				if (current.hasClass('menutable__title--rightthreecol')) {
					numRight = 2;
				}
				if (current.hasClass('menutable__title--rightthreemid')) {
					addExtra = 1;
				}
				current.css({ 'width': (lastTdWidth + firstTdWidth - firstTdWidth + (outerTable.outerWidth() - (lastTdWidth + firstTdWidth))) / numRight + addExtra + 'px' });
			});
		}
		/*
  $('.menutable__title--right').css({'width': ($('.menutable__table td:last-child').outerWidth() + $('.menutable__table td:first-child').outerWidth()) - $('.menutable__table td:first-child').outerWidth() + ($('.menutable').outerWidth() - ($('.menutable__table td:last-child').outerWidth() + $('.menutable__table td:first-child').outerWidth())) + 'px'});
  */
		if ($('.imgopts__imgopt').length > 0) {
			setTimeout(function () {
				$('.imgopts__imgopt').on('click', function () {
					var current = $(this);
					$('.imgopts__imgopt').removeClass('imgopts__imgopt--active');
					current.addClass('imgopts__imgopt--active');
					var img = current.find('img').attr('src');
					$('.headerarea__background').css({ 'background-image': 'url(' + img + ')' });
				});
			}, 300);
		}
	}

	if ($('.freeformpanelarea .freeform-row .freeform-column select.freeform-input').length > 0) {
		$('.freeformpanelarea .freeform-row .freeform-column select.freeform-input').wrap('<div class="freeformpanelarea__fieldholder freeformpanelarea__fieldholder--arrow"></div>');
	}

	if ($('.freeformpanelarea .freeform-row .freeform-column .freeform-input.form-date-time-field').length > 0) {
		$('.freeformpanelarea .freeform-row .freeform-column .freeform-input.form-date-time-field').wrap('<div class="freeformpanelarea__fieldholder freeformpanelarea__fieldholder--date"></div>');
	}

	if ($('.popuplink').length > 0) {
		$('.popuplink').click(function (e) {
			e.preventDefault();
			var current = $(this);
			var thisPopup = current.data('popup');
			$(".popup[data-popup=\"" + thisPopup + "\"]").fadeIn();
			$('body,html').css({ 'overflow': 'hidden', /*'height':'100%', */'position': 'relative' });
			$(window).trigger('resize');
			if (thisPopup == 'newsletter-signup') {
				$('#mce-EMAIL').val($('.newsletter__input').val());
			}
		});
		$('.popup__back, .popup__close').click(function () {
			$(this).closest('.popup').fadeOut();
			$('body,html').removeAttr('style');
		});
		if ($('.freeform-form-has-errors').length > 0) {
			$('.freeform-form-has-errors').closest('.popup').fadeIn();
			$('body,html').css({ 'overflow': 'hidden', /*'height':'100%', */'position': 'relative' });
			$(window).trigger('resize');
		}
	}

	if ($('.popup__topexpand').length > 0 && $('.popup__aboveformheading').length > 0 && $('.popup__formexpandarea').length > 0) {
		$('.popup__aboveformheading').click(function () {
			var thisHeading = $(this);
			if (window.matchMedia("(max-width: 400px)").matches) {
				var thisPop = thisHeading.closest('.popup');
				if (thisPop.find('.popup__topexpand').length > 0 && thisPop.find('.popup__formexpandarea').length > 0) {
					var thisTopArea = thisPop.find('.popup__topexpand');
					var thisFormArea = thisPop.find('.popup__formexpandarea');
					if (thisHeading.hasClass('popup__aboveformheading--formopen')) {
						thisHeading.removeClass('popup__aboveformheading--formopen').addClass('popup__aboveformheading--formclosed');
						thisPop.find('.popup__content').removeClass('popup__content--notopspacing');
						thisTopArea.slideDown();
						thisFormArea.slideUp().promise().done(function () {
							$(window).trigger('resize');
						});;
					} else if (thisHeading.hasClass('popup__aboveformheading--formclosed')) {
						thisHeading.addClass('popup__aboveformheading--formopen').removeClass('popup__aboveformheading--formclosed');
						thisPop.find('.popup__content').addClass('popup__content--notopspacing');
						thisFormArea.slideDown();
						thisTopArea.slideUp().promise().done(function () {
							$(window).trigger('resize');
						});;
					}
				}
			}
		});
	}

	validateContactForm('.contact__form');

	if ($('.articles__details').length > 0) {
		$('.articles__item').hover(function () {
			var current = $(this).find('.articles__details');
			current.css({ 'visibility': 'visible' });
			setTimeout(function () {
				current.css({ 'opacity': 1 });
			}, 50);
		}, function () {
			var current = $(this).find('.articles__details');
			current.css({ 'opacity': 0 });
			setTimeout(function () {
				current.css({ 'visibility': 'hidden' });
			}, 350);
		});
	}

	if ($('.faqs__answer').length > 0) {
		$('.faqs__answer').hide();
		$('.faqs__question').click(function () {
			var current = $(this);
			if (current.hasClass('faqs__question--active')) {
				current.removeClass('faqs__question--active');
				current.next().slideUp();
			} else {
				current.addClass('faqs__question--active');
				current.next().slideDown();
			}
		});
	}

	$('.mobiletopsearch__btn').on('click', function () {
		var current = $(this);
		var content = current.next();
		content.slideDown();
		current.fadeOut();
	});

	/*
 $('.fader').each(function() {
 	var f = $(this);
 	if(f.data('url')) {
 		var furl = f.data('url');
 		if(furl.indexOf('.xml') > -1) {
 			loadSlideshowGalleryXml(f,furl,function() {
 				f.imageGallery();
 			});
 		} else {
 			f.load(f.data('url'), function() {
 				f.imageGallery();
 			});
 		}
 	} else {
 		f.imageGallery();
 	}
 });
 */

	mobileNav(mobileNavs);

	overlapColour($('.section--white'), $('.scrolldots__dot'), 'scrolldots__dot--grey');

	$(window).scroll(function () {

		overlapColour($('.section--white'), $('.scrolldots__dot'), 'scrolldots__dot--grey');

		scrollMarkers('.scrolldots__dot', 'scrolldots__dot--active', 'section');
	});

	if ($('.endgallery__opts').length > 0) {
		$('.endgallery__opts').slick({
			dots: false,
			infinite: false,
			slidesToShow: 6,
			slidesToScroll: 1,
			arrows: false,
			asNavFor: '.endgallery__lrgopts',
			focusOnSelect: true,
			responsive: [{
				breakpoint: 1550,
				settings: {
					slidesToShow: 5
				}
			}, {
				breakpoint: 1150,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 930,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 730,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 601,
				settings: {
					slidesToShow: 3
				}
			}]
		});
		$('.endgallery__lrgopts').slick({
			dots: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			focusOnSelect: true,
			asNavFor: '.endgallery__opts'
		});
	}

	if ($('.scrollproperties__scroll').length > 0) {
		$('.scrollproperties__scroll').slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			dots: true,
			arrows: true,
			responsive: [{
				breakpoint: 851,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 601,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
	}

	if ($('.imgopts').length > 0) {

		$('.imgopts__inner').slick({
			dots: false,
			infinite: false,
			slidesToShow: 6,
			slidesToScroll: 2,
			arrows: false,
			responsive: [{
				breakpoint: 900,
				settings: {
					slidesToShow: 5
				}
			}, {
				breakpoint: 760,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 550,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 400,
				settings: {
					slidesToShow: 2
				}
			}]
		});

		var galleryLoadClick = setInterval(function () {
			if ($('.headerarea__background').css('background-image') == 'none') {
				if ($('.imgopts__imgopt').length > 0) {
					if ($('.headerarea__background').css('background-image') == 'none') {
						$('.slick-slide:first-child .imgopts__imgopt').click();
					}
				}
			} else {
				clearInterval(galleryLoadClick);
			}
		}, 200);
	}

	if ($('#socialfeedtemplate').length > 0) {
		var thisSite = $('#socialfeed').data('site');
		$.getJSON('assets/js/' + thisSite + '/socialwall.php', function (data) {
			var feedtemplate = $('#socialfeedtemplate')[0].innerHTML;
			var feedhtml = '';

			var imgs = [];
			var imgscount = data.length;
			var imgsloadedcount = 0;

			for (var n in data) {
				var img = new Image();
				img.onload = function () {
					imgsloadedcount++;
					if (imgsloadedcount == imgscount) {
						$(window).resize();
					}
				};

				img.src = data[n].url;
				feedhtml += applyTemplate(feedtemplate, data[n]);
			}
			$('#socialfeed').html(feedhtml);
		}).done(function (json) {
			$(window).trigger('resize');
			if ($('.socialfeeds__item').length < 8) {
				$('.socialfeeds__info').addClass('socialfeeds__info--static');
			}
		}).fail(function (jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.log("Request Failed: " + err);
			$('.socialfeeds__info').addClass('socialfeeds__info--static');
		});
	}

	//$(window).resize(throttle(windowResize,100));


	$(".swipebox").swipebox({ selector: '.swipebox' });

	$(window).resize(windowResize);

	$(window).on('load', function () {
		$(window).trigger('resize');
	});
});

function scrollMarkers(dotClass, activeClass, dataName) {

	var ids = [];
	//get ids
	$(dotClass).each(function () {
		var current = $(this);
		var thisId = current.data(dataName);
		ids.push(thisId);
	});

	var sections = [];
	//get location of each section
	for (var i = 0; i < ids.length; i++) {
		var thisSection = $('#' + ids[i]);
		var thisId = ids[i];
		if (thisSection.height() > 0) {
			var top = thisSection.offset().top;
			var end = thisSection.offset().top + thisSection.outerHeight();
			sections.push([top, end, thisId]);
		}
	}

	// scroll location
	var screenTop = $(window).scrollTop();
	var screenBottom = $(window).scrollTop() + $(window).height();

	var visibleEls = [];
	// which sections are visible currently?
	for (var i = 0; i < sections.length; i++) {
		var top = sections[i][0];
		var bottom = sections[i][1];

		var topBeforeScreenTop = false;
		var bottomBeforeScreenTop = false;

		var topAfterScreenBottom = false;
		var bottomAfterScreenBottom = false;

		var topOnScreen = false;
		var bottomOnScreen = false;

		var withinBoundaries = false;
		var middleVisible = false;
		var topBeforeBottomOn = false;
		var topOnBottomAfter = false;
		var offScreen = false;

		var pixels = 0;

		// boundary locations
		if (top < screenTop) {
			topBeforeScreenTop = true;
		} else if (top > screenBottom) {
			topAfterScreenBottom = true;
		} else {
			topOnScreen = true;
		}
		if (bottom < screenTop) {
			bottomBeforeScreenTop = true;
		} else if (bottom > screenBottom) {
			bottomAfterScreenBottom = true;
		} else {
			bottomOnScreen = true;
		}
		// section location
		if (topOnScreen && bottomOnScreen) {
			withinBoundaries = true;
		} else if (topBeforeScreenTop && bottomAfterScreenBottom) {
			middleVisible = true;
		} else if (topBeforeScreenTop && bottomOnScreen) {
			topBeforeBottomOn = true;
		} else if (topOnScreen && bottomAfterScreenBottom) {
			topOnBottomAfter = true;
		} else {
			offScreen = true;
		}

		// pixels visible
		if (withinBoundaries) {
			pixels = bottom - top;
		} else if (middleVisible) {
			pixels = screenBottom - screenTop;
		} else if (topBeforeBottomOn) {
			pixels = bottom - screenTop;
		} else if (topOnBottomAfter) {
			pixels = screenBottom - top;
		}
		// set array with all visible elements 
		if (!offScreen) {
			var thisId = sections[i][2];
			visibleEls.push([thisId, pixels]);
		}
	}

	var currentTallest = 0;
	var tallestId;
	// find tallest
	for (var i = 0; i < visibleEls.length; i++) {
		var id = visibleEls[i][0];
		var pixels = visibleEls[i][1];
		if (pixels > currentTallest) {
			currentTallest = pixels;
			tallestId = id;
		}
	}

	// set active dot
	$(dotClass).removeClass(activeClass);
	$(dotClass + '[data-' + dataName + '=' + tallestId + ']').addClass(activeClass);
}

function overlapColour(overlappedEl, movingEl, newColourClass) {
	var whiteAreas = [];
	overlappedEl.each(function () {
		var top = $(this).offset().top;
		var end = $(this).offset().top + $(this).outerHeight();
		whiteAreas.push([top, end]);
	});

	movingEl.each(function () {
		var current = $(this);
		var thisTop = current.offset().top;
		var currentHeight = current.outerHeight();
		var overlapping = false;
		for (var i = 0; i < whiteAreas.length; i++) {
			var top = whiteAreas[i][0];
			var end = whiteAreas[i][1];
			if (thisTop > top && thisTop + currentHeight < end) {
				overlapping = true;
				current.addClass(newColourClass);
			}
		}
		if (overlapping === false) {
			current.removeClass(newColourClass);
		}
	});
}

/* Twitter Feed */
var Twitter = {};

Twitter.getUserTimeline = function (screenName, callback) {
	var url = "/assets/js/gettweets.php?screen_name=" + encodeURIComponent(screenName);
	$.getJSON(url, callback);
};

var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function shortMonthIndex(monthText) {
	var myIndex;
	$.each(shortMonths, function (i, a) {
		if (a == monthText) {
			myIndex = i;
		}
	});
	return myIndex;
}
function showTweets(screenName, selector) {
	Twitter.getUserTimeline(screenName, function (timeline) {
		var index = 0;
		var nextTimeout;
		var $d = $(document.createElement("div"));
		$(selector).empty();
		$(selector).append($d).append('<div class="controls"><a class="nextTweet"></a><a class="prevTweet"></a></div>');

		$(selector).children('.controls').children('.nextTweet').click(function () {
			update();
		}).end().children('.prevTweet').click(function () {
			index -= 4;
			if (index < 0) {
				index += timeline.length;
			}
			update();
		});

		function update() {
			$d.fadeOut(500, function () {
				if (timeline) {
					var tweet = timeline[index = (index + 1) % timeline.length];

					$d.empty().append(returnTweetContent(tweet));

					var sectweet = timeline[index = (index + 1) % timeline.length];
					$d.append(returnTweetContent(sectweet));

					$d.fadeIn(500, schedNextUpdate);
				}
			});
		}

		function returnTweetContent(tweet) {
			var a = document.createElement("a");
			a.href = "https://twitter.com/#!/" + screenName + "/status/" + tweet.id_str;

			var now = new Date();
			var v = tweet.created_at.split(/\s+/);
			var created = new Date(Date.parse(v[1] + " " + v[2] + ", " + v[5] + " " + v[3] + " UTC"));
			var e = (now.getTime() - created.getTime()) / 1000;
			var f;
			if (e < 60) {
				f = e + " seconds ago";
			} else if (e < 120) {
				f = "a minute ago";
			} else if (e < 45 * 60) {
				f = parseInt(e / 60, 10).toString() + " minutes ago";
			} else if (e < 2 * 60 * 60) {
				f = "an hour ago";
			} else if (e < 24 * 60 * 60) {
				f = "" + parseInt(e / 3600, 10).toString() + " hours ago";
			} else if (e < 48 * 60 * 60) {
				f = "a day ago";
			} else {
				f = parseInt(e / 86400, 10).toString() + " days ago";
			}
			a.href = "https://twitter.com/#!/" + screenName + "/status/" + tweet.id_str;
			$(a).append('<span class="colour">' + screenName + '</span> ' + tweet.text);

			setTimeout(function () {
				var $a = $(a);
				$a.attr('target', '_blank');
			});
			tdiv = $('<div class="tweet"></div>').append(a);
			return tdiv;
		}

		function schedNextUpdate() {
			if (nextTimeout) {
				clearTimeout(nextTimeout);
			}
			nextTimeout = setTimeout(update, 10000);
		}

		update();
	});
}

var timeouts = [];
function slideRender(slide) {
	var inttime = 2000;
	for (var i = 0; i < timeouts.length; i++) {
		if (timeouts[i]) {
			clearTimeout(timeouts[i]);
		}
	}
	timeouts = [];
	slide.siblings().find('.galleryText').find(':not(:has(*))').hide();
}

/* Gallery XML */
function loadSlideshowGalleryXml(slideshow, url, callback) {
	$('#headerplaceholder').remove();
	callback = callback || $.noop;
	var first = true;
	$.get(url, function (data) {
		var dir = url.match(/(.*)\/.*$/)[1];

		var gal = $("document > gallery", data);
		var itemwidth = gal.attr('width');
		var itemheight = gal.attr('height');

		slideshow.html('');
		$("document > gallery > photo", data).each(function () {
			var caption = this.getAttribute("caption");
			if (!caption) {
				caption = "";
			} else {
				if (caption.indexOf('"bottom"') > -1) {
					caption = '<div class="galleryText bottom"><div class="holder"><div class="back">' + caption + '</div></div></div>';
				} else {
					caption = '<div class="galleryText"><div class="holder"><div class="back">' + caption + '</div></div></div>';
				}
			}
			if (this.getAttribute("href")) {
				slideshow.append('<div class="galleryItem" style="background-image:url(' + dir + '/' + this.getAttribute("src") + ')"><div class="imgholder"><a href="' + this.getAttribute("href") + '"><img class="img" src="' + dir + '/' + this.getAttribute("src") + '" alt="" /></a></div>' + caption + '</div>');
			} else {
				slideshow.append('<div class="galleryItem" style="background-image:url(' + dir + '/' + this.getAttribute("src") + ')"><div class="imgholder"><img class="img" src="' + dir + '/' + this.getAttribute("src") + '" alt="" width="' + itemwidth + '" height="' + itemheight + '" /></div>' + caption + '</div>');
			}
		});
		callback();
	});
}

function applyTemplate(temp, data) {
	var newText = temp;
	for (var nme in data) {
		var newtext = data[nme] || "";
		if (typeof newtext == 'function') {
			newtext = '';
		}
		newText = newText.replace(new RegExp('{{' + nme + '}}', 'g'), newtext);
	}
	return newText;
}

(function ($) {

	$.fn.selectBox = function (options) {
		var defaults = {
			nooptsText: 'Any',
			includeLabel: false,
			setWidth: false
		};
		var o = $.extend(defaults, options);

		return this.each(function () {
			if (this.nodeName == 'SELECT') {
				var showDrop = function showDrop(e) {
					d.stop(true, true).slideDown();
					$('html').click().click(hideDrop).bind('keydown', keyActions);
					e.stopPropagation();
					l.addClass('active');
					la.blur();
				};

				var hideDrop = function hideDrop() {
					$('html').unbind('click', hideDrop).unbind('keydown', keyActions);
					d.stop(true, true).slideUp();
					charmem = "";
					l.removeClass('active');
					la.focus();
				};

				var ensureonscreen = function ensureonscreen(hov) {
					var hovpos = hov.position();
					if (hovpos.top + hov.outerHeight() > d.scrollTop() + d.height()) {
						d.scrollTop(hovpos.top + hov.outerHeight() - d.height());
					} else if (hovpos.top < d.scrollTop()) {
						d.scrollTop(hovpos.top);
					}
					var hovpos = hov.offset();
					if (hovpos.top + hov.outerHeight() > $('body').scrollTop() + $(window).height()) {
						$('html,body').scrollTop(hovpos.top + hov.outerHeight() - $(window).height());
					} else if (hovpos.top < $('body').scrollTop()) {
						$('html,body').scrollTop(hovpos.top);
					}
				};

				var keyActions = function keyActions(e) {
					var charCode = typeof e.which == "number" ? e.which : e.keyCode;
					switch (charCode) {
						case 38:
							highlighted--;
							if (highlighted < 0) {
								highlighted += oc.children().length;
							}
							var hov = oc.children().removeClass('hovered').filter(':eq(' + highlighted + ')').addClass('hovered');
							ensureonscreen(hov);
							break;
						case 40:
							highlighted++;
							if (highlighted >= oc.children().length) {
								highlighted -= oc.children().length;
							}
							var hov = oc.children().removeClass('hovered').filter(':eq(' + highlighted + ')').addClass('hovered');
							var hovpos = hov.position();
							ensureonscreen(hov);
							break;
						case 13:
							if (multi) {
								hideDrop();
							} else {
								oc.children(':eq(' + highlighted + ')').click();
							}
							break;
						case 32:
							oc.children(':eq(' + highlighted + ')').click();
							break;
					}
					if (charCode >= 65 && charCode <= 90) {
						var charregex = new RegExp("^" + charmem + String.fromCharCode(charCode), "i");
						var hov = oc.children().filter(function () {
							var c = this.textContent || this.innerText;
							return charregex.test(c);
						}).first();
						charmem += String.fromCharCode(charCode);
						if (hov.length == 0) {
							var first = true;
							while (hov.length == 0 && charCode >= 65) {
								charmem = "";
								var hov = oc.children().filter(function () {
									var c = this.textContent || this.innerText;
									return c.indexOf(String.fromCharCode(charCode)) === 0;
								});
								if (first) {
									hov = hov.first();
									charmem = String.fromCharCode(charCode);
								} else {
									hov = hov.last();
								}
								first = false;
								charCode--;
							}
						}
						if (hov.length > 0) {
							oc.children().removeClass('hovered');
							hov.addClass('hovered');
							highlighted = hov.index();
							ensureonscreen(hov);
						}
					}
					return false;
				};

				var populateLabel = function populateLabel() {
					l.children().html('');
					$s.find('option').each(function (i) {
						var opt = this;
						var itemText = $(opt).html();
						if ($(opt).data('image')) {
							itemText = '<img src="' + $(opt).data('image') + '" alt="' + itemText + '" />' + itemText;
						}
						if (opt.selected) {
							if (multi) {
								if (l.children().text() != "") {
									l.children().append(', ');
								}
								l.children().append('<span class="selectedLabel"><span class="icon"></span>' + itemText + '</span>');
							} else {
								highlighted = i;
								l.children().html('<span class="icon"></span>' + itemText);
							}
						}
					});
					if (l.children().text() == '') {
						l.children().html(o.nooptsText);
					}
					if (o.includeLabel) {
						l.children().prepend('<strong>' + labeltext + '</strong> ');
					}
				};

				var s = this;
				var $s = $(s);
				var label = $('label[for="' + s.id + '"]');
				var labeltext = "";
				if (label.length > 0) {
					if (o.includeLabel) {
						label.hide();
					}
					labeltext = label.html();
				}
				var highlighted = 0;
				if ($.inArray($s.parent().css('position'), ['relative', 'absolute'])) {
					$s.wrap('<span class="selectcontainer"></span>');
				}
				$s.next('.selectLabel').remove();
				$s.next('.selectOpts').remove();
				var charmem = '';

				var l = $('<div class="selectLabel"><a class="back" href="javascript:;"><span class="icon"></span></a></div>');
				var la = l.children('a').bind('keydown', function (e) {
					switch (e.keyCode) {
						case 32:
						case 38:
						case 40:
							$(this).blur().parent().click();
							return false;
							break;
					}
				});
				var cssopts = { display: $s.css('display') };

				l.css(cssopts);
				var d = $('<div class="selectOpts"><div class="optcontainer"></div></div>');
				d.hide();
				var oc = d.children().css({ position: 'relative' });

				$(window).resize(function () {
					$s.show();
					if ($s.outerWidth() > 10 && o.setWidth) {
						l.css({ width: $s.outerWidth() });
					}
					$s.hide();
				}).resize();

				l.click(function (e) {
					if (d.filter(":visible").length == 0) {
						showDrop(e);
					}
				});
				var multi = s.multiple;
				$s.find('option').each(function () {
					var opt = this;
					var itemText = $(opt).html();
					if ($(opt).data('image')) {
						itemText = '<img src="' + $(opt).data('image') + '" alt="' + itemText + '" />' + itemText;
					}
					var $opt = $('<div class="opt">' + itemText + '</div>');
					if (opt.selected) {
						$opt.addClass('selected');
					}

					$opt.click(function optionClicked(e) {
						if (multi) {
							opt.selected = !opt.selected;
							if (opt.selected) {
								$opt.addClass('selected');
							} else {
								$opt.removeClass('selected');
							}
						} else {
							opt.selected = true;
							$opt.addClass('selected').siblings().removeClass('selected');
						}
						$s.change();
						if (!multi) {
							hideDrop();
						}
						populateLabel();
						e.stopPropagation();
					});
					oc.append($opt);
				});
				populateLabel();
				$s.after(d).after(l).hide();
			}
		});
	};
})($);