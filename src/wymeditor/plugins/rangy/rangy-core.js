/*
 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2011, Tim Down
 Licensed under the MIT license.
 Version: 1.0.1
 Build date: 3 January 2011
*/
var rangy=function(){function m(o,q){var z=typeof o[q];return z=="function"||!!(z=="object"&&o[q])||z=="unknown"}function F(o,q){return!!(typeof o[q]=="object"&&o[q])}function G(o,q){return typeof o[q]!="undefined"}function x(o){return function(q,z){for(var N=z.length;N--;)if(!o(q,z[N]))return false;return true}}function B(o){window.alert("Rangy not supported in your browser. Reason: "+o);u.initialized=true;u.supported=false}function I(){if(!u.initialized){var o,q=false,z=false;if(m(document,"createRange")){o=
document.createRange();if(w(o,j)&&t(o,O))q=true;o.detach()}if((o=F(document,"body")?document.body:document.getElementsByTagName("body")[0])&&m(o,"createTextRange")){o=o.createTextRange();if(w(o,l)&&t(o,n))z=true}!q&&!z&&B("Neither Range nor TextRange are implemented");u.initialized=true;u.features={implementsDomRange:q,implementsTextRange:z};q=e.concat(f);z=0;for(o=q.length;z<o;++z)try{q[z](u)}catch(N){F(window,"console")&&m(window.console,"log")&&console.log("Init listener threw an exception. Continuing.",
N)}}}function H(o){this.name=o;this.supported=this.initialized=false}var O=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"],j=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],
n=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],l=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint"],w=x(m),y=x(F),t=x(G),u={initialized:false,supported:true,util:{isHostMethod:m,isHostObject:F,isHostProperty:G,areHostMethods:w,areHostObjects:y,areHostProperties:t},features:{},modules:{},config:{alertOnWarn:false}};u.fail=B;u.warn=function(o){o="Rangy warning: "+o;if(u.config.alertOnWarn)window.alert(o);
else typeof window.console!="undefined"&&typeof window.console.log!="undefined"&&window.console.log(o)};u.init=I;var f=[],e=[];u.addInitListener=function(o){u.initialized?o(u):f.push(o)};var i=[];u.addCreateMissingNativeApiListener=function(o){i.push(o)};u.createMissingNativeApi=function(o){o=o||window;I();for(var q=0,z=i.length;q<z;++q)i[q](o)};H.prototype.fail=function(o){this.initialized=true;this.supported=false;throw Error("Module '"+this.name+"' failed to load: "+o);};H.prototype.createError=
function(o){return Error("Error in Rangy "+this.name+" module: "+o)};u.createModule=function(o,q){var z=new H(o);u.modules[o]=z;e.push(function(N){q(N,z);z.initialized=true;z.supported=true})};u.requireModules=function(o){for(var q=0,z=o.length,N,S;q<z;++q){S=o[q];N=u.modules[S];if(!N||!(N instanceof H))throw Error("Module '"+S+"' not found");if(!N.supported)throw Error("Module '"+S+"' not supported");}};var p=false;y=function(){if(!p){p=true;u.initialized||I()}};if(typeof window=="undefined")B("No window found");
else if(typeof document=="undefined")B("No document found");else{m(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",y,false);if(m(window,"addEventListener"))window.addEventListener("load",y,false);else m(window,"attachEvent")?window.attachEvent("onload",y):B("Window does not have required addEventListener or attachEvent method");return u}}();
rangy.createModule("DomUtil",function(m,F){function G(f){for(var e=0;f=f.previousSibling;)e++;return e}function x(f,e){var i=[],p;for(p=f;p;p=p.parentNode)i.push(p);for(p=e;p;p=p.parentNode)if(u(i,p))return p;return null}function B(f,e,i){for(i=i?f:f.parentNode;i;){f=i.parentNode;if(f===e)return i;i=f}return null}function I(f){f=f.nodeType;return f==3||f==4||f==8}function H(f,e){var i=e.nextSibling,p=e.parentNode;i?p.insertBefore(f,i):p.appendChild(f);return f}function O(f){if(f.nodeType==9)return f;
else if(typeof f.ownerDocument!="undefined")return f.ownerDocument;else if(typeof f.document!="undefined")return f.document;else if(f.parentNode)return O(f.parentNode);else throw Error("getDocument: no document found for node");}function j(f){if(!f)return"[No node]";return I(f)?'"'+f.data+'"':f.nodeType==1?"<"+f.nodeName+(f.id?' id="'+f.id+'"':"")+">":f.nodeName}function n(f){this._next=this.root=f}function l(f,e){this.node=f;this.offset=e}function w(f){this.code=this[f];this.codeName=f;this.message=
"DOMException: "+this.codeName}var y=m.util;y.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||F.fail("document missing a Node creation method");y.isHostMethod(document,"getElementsByTagName")||F.fail("document missing getElementsByTagName method");var t=document.createElement("div");y.areHostMethods(t,["insertBefore","appendChild","cloneNode"])||F.fail("Incomplete Element implementation");t=document.createTextNode("test");y.areHostMethods(t,["splitText","deleteData",
"insertData","appendData","cloneNode"])||F.fail("Incomplete Text Node implementation");var u=function(f,e){for(var i=f.length;i--;)if(f[i]===e)return true;return false};n.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var f=this._current=this._next,e;if(this._current)if(e=f.firstChild)this._next=e;else{for(e=null;f!==this.root&&!(e=f.nextSibling);)f=f.parentNode;this._next=e}return this._current},detach:function(){this._current=this._next=this.root=null}};l.prototype=
{equals:function(f){return this.node===f.node&this.offset==f.offset},inspect:function(){return"[DomPosition("+j(this.node)+":"+this.offset+")]"}};w.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};w.prototype.toString=function(){return this.message};m.dom={arrayContains:u,getNodeIndex:G,getCommonAncestor:x,isAncestorOf:function(f,e,i){for(e=i?e:e.parentNode;e;)if(e===f)return true;else e=
e.parentNode;return false},getClosestAncestorIn:B,isCharacterDataNode:I,insertAfter:H,splitDataNode:function(f,e){var i;if(f.nodeType==3)i=f.splitText(e);else{i=f.cloneNode();i.deleteData(0,e);f.deleteData(0,f.length-e);H(i,f)}return i},getDocument:O,getWindow:function(f){f=O(f);if(typeof f.defaultView!="undefined")return f.defaultView;else if(typeof f.parentWindow!="undefined")return f.parentWindow;else throw Error("Cannot get a window object for node");},getBody:function(f){return y.isHostObject(f,
"body")?f.body:f.getElementsByTagName("body")[0]},comparePoints:function(f,e,i,p){var o;if(f==i)return e===p?0:e<p?-1:1;else if(o=B(i,f,true))return e<=G(o)?-1:1;else if(o=B(f,i,true))return G(o)<p?-1:1;else{e=x(f,i);f=f===e?e:B(f,e,true);i=i===e?e:B(i,e,true);if(f===i)throw Error("comparePoints got to case 4 and childA and childB are the same!");else{for(e=e.firstChild;e;){if(e===f)return-1;else if(e===i)return 1;e=e.nextSibling}throw Error("Should not be here!");}}},inspectNode:j,createIterator:function(f){return new n(f)},
DomPosition:l};m.DOMException=w});
rangy.createModule("DomRange",function(m){function F(b,h){this.range=b;this.clonePartiallySelectedTextNodes=h;if(!b.collapsed){this.sc=b.startContainer;this.so=b.startOffset;this.ec=b.endContainer;this.eo=b.endOffset;var v=b.commonAncestorContainer;if(this.sc===this.ec&&s.isCharacterDataNode(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=this.sc===v&&!s.isCharacterDataNode(this.sc)?this.sc.childNodes[this.so]:s.getClosestAncestorIn(this.sc,
v,true);this._last=this.ec===v&&!s.isCharacterDataNode(this.ec)?this.ec.childNodes[this.eo-1]:s.getClosestAncestorIn(this.ec,v,true)}}}function G(b){this.code=this[b];this.codeName=b;this.message="RangeException: "+this.codeName}function x(b){return s.getDocument(b.startContainer)}function B(b,h,v){if(h=b._listeners[h])for(var A=0,J=h.length;A<J;++A)h[A].call(b,{target:b,args:v})}function I(b){return new a(b.parentNode,s.getNodeIndex(b))}function H(b){return new a(b.parentNode,s.getNodeIndex(b)+1)}
function O(b){return s.isCharacterDataNode(b)?b.length:b.childNodes?b.childNodes.length:0}function j(b,h,v){var A=b.nodeType==11?b.firstChild:b;if(s.isCharacterDataNode(h))v==h.length?s.insertAfter(b,h):h.parentNode.insertBefore(b,v==0?h:s.splitDataNode(h,v));else v>=h.childNodes.length?h.appendChild(b):h.insertBefore(b,h.childNodes[v]);return A}function n(b){for(var h,v,A=x(b.range).createDocumentFragment();v=b.next();){h=b.isPartiallySelectedSubtree();v=v.cloneNode(!h);if(h){h=b.getSubtreeIterator();
v.appendChild(n(h));h.detach(true)}if(v.nodeType==10)throw new d("HIERARCHY_REQUEST_ERR");A.appendChild(v)}return A}function l(b,h,v){var A,J;for(v=v||{stop:false};A=b.next();)if(b.isPartiallySelectedSubtree())if(h(A)===false){v.stop=true;return}else{A=b.getSubtreeIterator();l(A,h,v);A.detach(true);if(v.stop)return}else for(A=s.createIterator(A);J=A.next();)if(h(J)===false){v.stop=true;return}}function w(b){for(var h;b.next();)if(b.isPartiallySelectedSubtree()){h=b.getSubtreeIterator();w(h);h.detach(true)}else b.remove()}
function y(b){for(var h,v=x(b.range).createDocumentFragment(),A;h=b.next();){if(b.isPartiallySelectedSubtree()){h=h.cloneNode(false);A=b.getSubtreeIterator();h.appendChild(y(A));A.detach(true)}else b.remove();if(h.nodeType==10)throw new d("HIERARCHY_REQUEST_ERR");v.appendChild(h)}return v}function t(b,h,v){var A=!!(h&&h.length),J,U=!!v;if(A)J=RegExp("^("+h.join("|")+")$");var aa=[];l(new F(b,false),function(ba){if((!A||J.test(ba.nodeType))&&(!U||v(ba)))aa.push(ba)});return aa}function u(b){return"["+
(typeof b.getName=="undefined"?"Range":b.getName())+"("+s.inspectNode(b.startContainer)+":"+b.startOffset+", "+s.inspectNode(b.endContainer)+":"+b.endOffset+")]"}function f(b,h,v){this.nodes=t(b,h,v);this._next=this.nodes[0];this._pointer=0}function e(b,h){return b.nodeType!=3&&(s.isAncestorOf(b,h.startContainer,true)||s.isAncestorOf(b,h.endContainer,true))}function i(b){return function(h,v){for(var A,J=v?h:h.parentNode;J;){A=J.nodeType;if(s.arrayContains(b,A))return J;J=J.parentNode}return null}}
function p(b){for(var h;h=b.parentNode;)b=h;return b}function o(b,h){if(na(b,h))throw new G("INVALID_NODE_TYPE_ERR");}function q(b){if(!b.startContainer)throw new d("INVALID_STATE_ERR");}function z(b,h){if(!s.arrayContains(h,b.nodeType))throw new G("INVALID_NODE_TYPE_ERR");}function N(b,h){if(h<0||h>(s.isCharacterDataNode(b)?b.length:b.childNodes.length))throw new d("INDEX_SIZE_ERR");}function S(b,h){if(V(b,true)!==V(h,true))throw new d("WRONG_DOCUMENT_ERR");}function W(b){if(oa(b,true))throw new d("NO_MODIFICATION_ALLOWED_ERR");
}function Y(b,h){if(!b)throw new d(h);}function K(b){if(!V(b.startContainer,true)||!V(b.endContainer,true)||!(b.startOffset<=(s.isCharacterDataNode(b.startContainer)?b.startContainer.length:b.startContainer.childNodes.length))||!(b.endOffset<=(s.isCharacterDataNode(b.endContainer)?b.endContainer.length:b.endContainer.childNodes.length)))throw Error("Range Range error: Range is no longer valid after DOM mutation ("+b.inspect()+")");}function Z(b){b.START_TO_START=ea;b.START_TO_END=ha;b.END_TO_END=
pa;b.END_TO_START=ia;b.NODE_BEFORE=ja;b.NODE_AFTER=ka;b.NODE_BEFORE_AND_AFTER=la;b.NODE_INSIDE=fa}function D(b){Z(b);Z(b.prototype)}function $(b,h,v){function A(c,g){return function(r){q(this);z(r,k);z(p(r),E);r=(c?I:H)(r);(g?J:U)(this,r.node,r.offset)}}function J(c,g,r){var C=c.endContainer,L=c.endOffset;if(g!==c.startContainer||r!==this.startOffset){if(p(g)!=p(C)||s.comparePoints(g,r,C,L)==1){C=g;L=r}h(c,g,r,C,L)}}function U(c,g,r){var C=c.startContainer,L=c.startOffset;if(g!==c.endContainer||r!==
this.endOffset){if(p(g)!=p(C)||s.comparePoints(g,r,C,L)==-1){C=g;L=r}h(c,C,L,g,r)}}function aa(c,g,r){if(g!==c.startContainer||r!==this.startOffset||g!==c.endContainer||r!==this.endOffset)h(c,g,r,g,r)}function ba(c){return function(){q(this);K(this);var g=this.startContainer,r=this.startOffset,C=this.commonAncestorContainer,L=new F(this,true);if(g!==C){g=s.getClosestAncestorIn(g,C,true);r=H(g);g=r.node;r=r.offset}l(L,W);L.reset();C=c(L);L.detach();h(this,g,r,g,r);return C}}b.prototype={attachListener:function(c,
g){this._listeners[c].push(g)},setStart:function(c,g){q(this);o(c,true);N(c,g);J(this,c,g)},setEnd:function(c,g){q(this);o(c,true);N(c,g);U(this,c,g)},setStartBefore:A(true,true),setStartAfter:A(false,true),setEndBefore:A(true,false),setEndAfter:A(false,false),collapse:function(c){q(this);K(this);c?h(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):h(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(c){q(this);o(c,true);
h(this,c,0,c,O(c))},selectNode:function(c){q(this);o(c,false);z(c,k);var g=I(c);c=H(c);h(this,g.node,g.offset,c.node,c.offset)},compareBoundaryPoints:function(c,g){q(this);K(this);S(this.startContainer,g.startContainer);var r=c==ia||c==ea?"start":"end",C=c==ha||c==ea?"start":"end";return s.comparePoints(this[r+"Container"],this[r+"Offset"],g[C+"Container"],g[C+"Offset"])},insertNode:function(c){q(this);K(this);z(c,M);W(this.startContainer);if(s.isAncestorOf(c,this.startContainer,true))throw new d("HIERARCHY_REQUEST_ERR");
this.setStartBefore(j(c,this.startContainer,this.startOffset))},cloneContents:function(){q(this);K(this);var c,g;if(this.collapsed)return x(this).createDocumentFragment();else{if(this.startContainer===this.endContainer&&s.isCharacterDataNode(this.startContainer)){c=this.startContainer.cloneNode(true);c.data=c.data.slice(this.startOffset,this.endOffset);g=x(this).createDocumentFragment();g.appendChild(c);return g}else{g=new F(this,true);c=n(g);g.detach()}return c}},extractContents:ba(y),deleteContents:ba(w),
canSurroundContents:function(){q(this);K(this);W(this.startContainer);W(this.endContainer);var c=new F(this,true),g=c._first&&e(c._first,this)||c._last&&e(c._last,this);c.detach();return!g},surroundContents:function(c){z(c,Q);if(!this.canSurroundContents())throw new G("BAD_BOUNDARYPOINTS_ERR");var g=this.extractContents();if(c.hasChildNodes())for(;c.lastChild;)c.removeChild(c.lastChild);j(c,this.startContainer,this.startOffset);c.appendChild(g);this.selectNode(c)},cloneRange:function(){q(this);K(this);
for(var c=new P(x(this)),g=ga.length,r;g--;){r=ga[g];c[r]=this[r]}return c},detach:function(){v(this)},toString:function(){q(this);K(this);var c=this.startContainer;if(c===this.endContainer&&s.isCharacterDataNode(c))return c.nodeType==3||c.nodeType==4?c.data.slice(this.startOffset,this.endOffset):"";else{var g=[];c=new F(this,true);l(c,function(r){if(r.nodeType==3||r.nodeType==4)g.push(r.data)});c.detach();return g.join("")}},compareNode:function(c){q(this);K(this);var g=c.parentNode,r=s.getNodeIndex(c);
if(!g)throw new d("NOT_FOUND_ERR");c=this.comparePoint(g,r);g=this.comparePoint(g,r+1);return c<0?g>0?la:ja:g>0?ka:fa},comparePoint:function(c,g){q(this);K(this);Y(c,"HIERARCHY_REQUEST_ERR");S(c,this.startContainer);if(s.comparePoints(c,g,this.startContainer,this.startOffset)<0)return-1;else if(s.comparePoints(c,g,this.endContainer,this.endOffset)>0)return 1;return 0},createContextualFragment:function(c){q(this);var g=x(this),r=g.createElement("div");r.innerHTML=c;for(c=g.createDocumentFragment();g=
r.firstChild;)c.appendChild(g);return c},intersectsNode:function(c){q(this);K(this);Y(c,"NOT_FOUND_ERR");if(s.getDocument(c)!==x(this))return false;var g=c.parentNode,r=s.getNodeIndex(c);Y(g,"NOT_FOUND_ERR");c=s.comparePoints(g,r,this.startContainer,this.startOffset);g=s.comparePoints(g,r+1,this.endContainer,this.endOffset);return!(c<0&&g<0||c>0&&g>0)},isPointInRange:function(c,g){q(this);K(this);Y(c,"HIERARCHY_REQUEST_ERR");S(c,this.startContainer);return s.comparePoints(c,g,this.startContainer,
this.startOffset)>=0&&s.comparePoints(c,g,this.endContainer,this.endOffset)<=0},intersectsRange:function(c){q(this);K(this);if(x(c)!=x(this))throw new d("WRONG_DOCUMENT_ERR");return s.comparePoints(this.startContainer,this.startOffset,c.endContainer,c.endOffset)<0&&s.comparePoints(this.endContainer,this.endOffset,c.startContainer,c.startOffset)>0},containsNode:function(c,g){return g?this.intersectsNode(c):this.compareNode(c)==fa},containsNodeContents:function(c){return this.comparePoint(c,0)>=0&&
this.comparePoint(c,O(c))<=0},splitBoundaries:function(){q(this);K(this);var c=this.startContainer,g=this.startOffset,r=this.endContainer,C=this.endOffset,L=c===r;s.isCharacterDataNode(r)&&C<r.length&&s.splitDataNode(r,C);if(s.isCharacterDataNode(c)&&g>0){c=s.splitDataNode(c,g);if(L){C-=g;r=c}g=0}h(this,c,g,r,C)},normalizeBoundaries:function(){q(this);K(this);var c=this.startContainer,g=this.startOffset,r=this.endContainer,C=this.endOffset,L=function(T){var R=T.nextSibling;if(R&&R.nodeType==T.nodeType){r=
T;C=T.length;T.appendData(R.data);R.parentNode.removeChild(R)}},ma=function(T){var R=T.previousSibling;if(R&&R.nodeType==T.nodeType){c=T;g=R.length;T.insertData(0,R.data);R.parentNode.removeChild(R);if(c==r){C+=g;r=c}}},ca=true;if(s.isCharacterDataNode(r))r.length==C&&L(r);else{if(C>0)(ca=r.childNodes[C-1])&&s.isCharacterDataNode(ca)&&L(ca);ca=!this.collapsed}if(ca)if(s.isCharacterDataNode(c))g==0&&ma(c);else{if(g<c.childNodes.length)(L=c.childNodes[g])&&s.isCharacterDataNode(L)&&ma(L)}else{c=r;g=
C}h(this,c,g,r,C)},createNodeIterator:function(c,g){q(this);K(this);return new f(this,c,g)},getNodes:function(c,g){q(this);K(this);return t(this,c,g)},collapseToPoint:function(c,g){q(this);K(this);o(c,true);N(c,g);aa(this,c,g)},collapseBefore:function(c){q(this);this.setEndBefore(c);this.collapse(false)},collapseAfter:function(c){q(this);this.setStartAfter(c);this.collapse(true)},getName:function(){return"DomRange"},inspect:function(){return u(this)}};D(b)}function da(b){b.collapsed=b.startContainer===
b.endContainer&&b.startOffset===b.endOffset;b.commonAncestorContainer=b.collapsed?b.startContainer:s.getCommonAncestor(b.startContainer,b.endContainer)}function X(b,h,v,A,J){var U=b.startContainer!==h||b.startOffset!==v,aa=b.endContainer!==A||b.endOffset!==J;b.startContainer=h;b.startOffset=v;b.endContainer=A;b.endOffset=J;da(b);B(b,"boundarychange",{startMoved:U,endMoved:aa})}function P(b){this.startContainer=b;this.startOffset=0;this.endContainer=b;this.endOffset=0;this._listeners={boundarychange:[],
detach:[]};da(this)}m.requireModules(["DomUtil"]);var s=m.dom,a=s.DomPosition,d=m.DOMException;F.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return!!this._next},next:function(){var b=this._current=this._next;if(b){this._next=b!==this._last?b.nextSibling:null;if(s.isCharacterDataNode(b)&&this.clonePartiallySelectedTextNodes){if(b===this.ec)(b=b.cloneNode(true)).deleteData(this.eo,
b.length-this.eo);if(this._current===this.sc)(b=b.cloneNode(true)).deleteData(0,this.so)}}return b},remove:function(){var b=this._current,h,v;if(s.isCharacterDataNode(b)&&(b===this.sc||b===this.ec)){h=b===this.sc?this.so:0;v=b===this.ec?this.eo:b.length;h!=v&&b.deleteData(h,v-h)}else b.parentNode&&b.parentNode.removeChild(b)},isPartiallySelectedSubtree:function(){return e(this._current,this.range)},getSubtreeIterator:function(){var b;if(this.isSingleCharacterDataNode){b=this.range.cloneRange();b.collapse()}else{b=
new P(x(this.range));var h=this._current,v=h,A=0,J=h,U=O(h);if(s.isAncestorOf(h,this.sc,true)){v=this.sc;A=this.so}if(s.isAncestorOf(h,this.ec,true)){J=this.ec;U=this.eo}X(b,v,A,J,U)}return new F(b,this.clonePartiallySelectedTextNodes)},detach:function(b){b&&this.range.detach();this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};G.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};G.prototype.toString=function(){return this.message};f.prototype=
{_current:null,hasNext:function(){return!!this._next},next:function(){this._current=this._next;this._next=this.nodes[++this._pointer];return this._current},detach:function(){this._current=this._next=this.nodes=null}};var k=[1,3,4,5,7,8,10],E=[2,9,11],M=[1,3,4,5,7,8,10,11],Q=[1,3,4,5,7,8],V=i([9,11]),oa=i([5,6,10,12]),na=i([6,10,12]),ga=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],ea=0,ha=1,pa=2,ia=3,ja=0,ka=1,la=2,fa=3;$(P,X,function(b){q(b);b.startContainer=
b.startOffset=b.endContainer=b.endOffset=null;b.collapsed=b.commonAncestorContainer=null;B(b,"detach",null);b._listeners=null});P.fromRange=function(b){var h=new P(x(b));X(h,b.startContainer,b.startOffset,b.endContainer,b.endOffset);return h};P.rangeProperties=ga;P.RangeIterator=F;P.copyComparisonConstants=D;P.createPrototypeRange=$;P.inspect=u;P.getRangeDocument=x;P.rangesEqual=function(b,h){return b.startContainer===h.startContainer&&b.startOffset===h.startOffset&&b.endContainer===h.endContainer&&
b.endOffset===h.endOffset};P.getEndOffset=O;m.DomRange=P;m.RangeException=G});
rangy.createModule("WrappedRange",function(m){function F(j,n,l,w){var y=j.duplicate();y.collapse(l);var t=y.parentElement();B.isAncestorOf(n,t,true)||(t=n);if(!t.canHaveHTML)return new I(t.parentNode,B.getNodeIndex(t));n=B.getDocument(t).createElement("span");var u,f=l?"StartToStart":"StartToEnd";do{t.insertBefore(n,n.previousSibling);y.moveToElementText(n)}while((u=y.compareEndPoints(f,j))>0&&n.previousSibling);f=n.nextSibling;if(u==-1&&f&&B.isCharacterDataNode(f)){y.setEndPoint(l?"EndToStart":"EndToEnd",
j);if(/[\r\n]/.test(f.data)){t=y.duplicate();l=t.text.replace(/\r\n/g,"\r").length;for(l=t.moveStart("character",l);t.compareEndPoints("StartToEnd",t)==-1;){l++;t.moveStart("character",1)}}else l=y.text.length;t=new I(f,l)}else{f=(w||!l)&&n.previousSibling;t=(l=(w||l)&&n.nextSibling)&&B.isCharacterDataNode(l)?new I(l,0):f&&B.isCharacterDataNode(f)?new I(f,f.length):new I(t,B.getNodeIndex(n))}n.parentNode.removeChild(n);return t}function G(j,n){var l,w,y=j.offset,t=B.getDocument(j.node),u=t.body.createTextRange(),
f=B.isCharacterDataNode(j.node);if(f){l=j.node;w=l.parentNode}else{l=j.node.childNodes;l=y<l.length?l[y]:null;w=j.node}t=t.createElement("span");t.innerHTML="&#ffef;";l?w.insertBefore(t,l):w.appendChild(t);u.moveToElementText(t);u.collapse(!n);w.removeChild(t);if(f)u[n?"moveStart":"moveEnd"]("character",y);return u}m.requireModules(["DomUtil","DomRange"]);var x,B=m.dom,I=B.DomPosition,H=m.DomRange;if(m.features.implementsDomRange)(function(){function j(e){for(var i=l.length,p;i--;){p=l[i];e[p]=e.nativeRange[p]}}
var n,l=H.rangeProperties,w,y;x=function(e){if(!e)throw Error("Range must be specified");this.nativeRange=e;j(this)};H.createPrototypeRange(x,function(e,i,p,o,q){var z=e.startContainer!==i||e.startOffset!=p;(e.endContainer!==o||e.endOffset!=q)&&e.setEnd(o,q);z&&e.setStart(i,p)},function(e){e.nativeRange.detach();e.detached=true;for(var i=l.length,p;i--;){p=l[i];e[p]=null}});n=x.prototype;n.selectNode=function(e){this.nativeRange.selectNode(e);j(this)};n.deleteContents=function(){this.nativeRange.deleteContents();
j(this)};n.extractContents=function(){var e=this.nativeRange.extractContents();j(this);return e};n.cloneContents=function(){return this.nativeRange.cloneContents()};n.surroundContents=function(e){this.nativeRange.surroundContents(e);j(this)};n.collapse=function(e){this.nativeRange.collapse(e);j(this)};n.cloneRange=function(){return new x(this.nativeRange.cloneRange())};n.refresh=function(){j(this)};n.toString=function(){return this.nativeRange.toString()};var t=document.createTextNode("test");B.getBody(document).appendChild(t);
var u=document.createRange();u.setStart(t,0);u.setEnd(t,0);try{u.setStart(t,1);w=true;n.setStart=function(e,i){this.nativeRange.setStart(e,i);j(this)};n.setEnd=function(e,i){this.nativeRange.setEnd(e,i);j(this)};y=function(e){return function(i){this.nativeRange[e](i);j(this)}}}catch(f){w=false;n.setStart=function(e,i){try{this.nativeRange.setStart(e,i)}catch(p){this.nativeRange.setEnd(e,i);this.nativeRange.setStart(e,i)}j(this)};n.setEnd=function(e,i){try{this.nativeRange.setEnd(e,i)}catch(p){this.nativeRange.setStart(e,
i);this.nativeRange.setEnd(e,i)}j(this)};y=function(e,i){return function(p){try{this.nativeRange[e](p)}catch(o){this.nativeRange[i](p);this.nativeRange[e](p)}j(this)}}}n.setStartBefore=y("setStartBefore","setEndBefore");n.setStartAfter=y("setStartAfter","setEndAfter");n.setEndBefore=y("setEndBefore","setStartBefore");n.setEndAfter=y("setEndAfter","setStartAfter");u.selectNodeContents(t);n.selectNodeContents=u.startContainer==t&&u.endContainer==t&&u.startOffset==0&&u.endOffset==t.length?function(e){this.nativeRange.selectNodeContents(e);
j(this)}:function(e){this.setStart(e,0);this.setEnd(e,H.getEndOffset(e))};u.selectNodeContents(t);u.setEnd(t,3);w=document.createRange();w.selectNodeContents(t);w.setEnd(t,4);w.setStart(t,2);n.compareBoundaryPoints=u.compareBoundaryPoints(u.START_TO_END,w)==-1&&u.compareBoundaryPoints(u.END_TO_START,w)==1?function(e,i){i=i.nativeRange||i;if(e==i.START_TO_END)e=i.END_TO_START;else if(e==i.END_TO_START)e=i.START_TO_END;return this.nativeRange.compareBoundaryPoints(e,i)}:function(e,i){return this.nativeRange.compareBoundaryPoints(e,
i.nativeRange||i)};B.getBody(document).removeChild(t);u.detach();w.detach()})();else if(m.features.implementsTextRange){x=function(j){this.textRange=j;this.refresh()};x.prototype=new H(document);x.prototype.refresh=function(){var j,n;n=this.textRange;j=n.parentElement();var l=n.duplicate(),w=l.getBookmark();l.collapse(true);n=l.parentElement();l.moveToBookmark(w);l.collapse(false);l=l.parentElement();n=n==l?n:B.getCommonAncestor(n,l);n=n==j?n:B.getCommonAncestor(j,n);if(this.textRange.compareEndPoints("StartToEnd",
this.textRange)==0)n=j=F(this.textRange,n,true,true);else{j=F(this.textRange,n,true,false);n=F(this.textRange,n,false,false)}this.setStart(j.node,j.offset);this.setEnd(n.node,n.offset)};x.rangeToTextRange=function(j){if(j.collapsed)return G(new I(j.startContainer,j.startOffset),true,true);else{var n=G(new I(j.startContainer,j.startOffset),true,false),l=G(new I(j.endContainer,j.endOffset),false,false);j=B.getDocument(j.startContainer).body.createTextRange();j.setEndPoint("StartToStart",n);j.setEndPoint("EndToEnd",
l);return j}};H.copyComparisonConstants(x);var O=function(){return this}();if(typeof O.Range=="undefined")O.Range=x}x.prototype.getName=function(){return"WrappedRange"};m.WrappedRange=x;m.createNativeRange=function(j){j=j||document;if(m.features.implementsDomRange)return j.createRange();else if(m.features.implementsTextRange)return j.body.createTextRange()};m.createRange=function(j){j=j||document;return new x(m.createNativeRange(j))};m.createRangyRange=function(j){j=j||document;return new H(j)};m.addCreateMissingNativeApiListener(function(j){j=
j.document;if(typeof j.createRange=="undefined")j.createRange=function(){return m.createRange(this)};j=j=null})});
rangy.createModule("WrappedSelection",function(m,F){function G(a,d,k){var E=k?"end":"start";k=k?"start":"end";a.anchorNode=d[E+"Container"];a.anchorOffset=d[E+"Offset"];a.focusNode=d[k+"Container"];a.focusOffset=d[k+"Offset"]}function x(a){a.anchorNode=a.focusNode=null;a.anchorOffset=a.focusOffset=0;a.rangeCount=0;a.isCollapsed=true;a._ranges.length=0}function B(a){var d;if(a instanceof y){d=a._selectionNativeRange;if(!d){d=m.createNativeRange(l.getDocument(a.startContainer));d.setEnd(a.endContainer,
a.endOffset);d.setStart(a.startContainer,a.startOffset);a._selectionNativeRange=d;a.attachListener("detach",function(){this._selectionNativeRange=null})}}else if(a instanceof t)d=a.nativeRange;else if(window.Range&&a instanceof Range)d=a;return d}function I(a){var d=a.getNodes(),k;a:if(!d.length||d[0].nodeType!=1)k=false;else{k=1;for(var E=d.length;k<E;++k)if(!l.isAncestorOf(d[0],d[k])){k=false;break a}k=true}if(!k)throw Error("getSingleElementFromRange: range "+a.inspect()+" did not consist of a single element");
return d[0]}function H(a){a._ranges.length=0;if(a.nativeSelection.type=="None")x(a);else{var d=a.nativeSelection.createRange();a.rangeCount=d.length;for(var k,E=l.getDocument(d.item(0)),M=0;M<a.rangeCount;++M){k=m.createRange(E);k.selectNode(d.item(M));a._ranges.push(k)}a.isCollapsed=a.rangeCount==1&&a._ranges[0].collapsed;G(a,a._ranges[a.rangeCount-1],false)}}function O(a){this.nativeSelection=a;this._ranges=[];this.refresh()}function j(a,d){if(a.anchorNode&&l.getDocument(a.anchorNode)!==l.getDocument(d))throw new u("WRONG_DOCUMENT_ERR");
}function n(a){var d=[],k=new f(a.anchorNode,a.anchorOffset),E=new f(a.focusNode,a.focusOffset),M=typeof a.getName=="function"?a.getName():"Selection";if(typeof a.rangeCount!="undefined")for(var Q=0,V=a.rangeCount;Q<V;++Q)d[Q]=y.inspect(a.getRangeAt(Q));return"["+M+"(Ranges: "+d.join(", ")+")(anchor: "+k.inspect()+", focus: "+E.inspect()+"]"}m.requireModules(["DomUtil","DomRange","WrappedRange"]);m.config.checkSelectionRanges=true;var l=m.dom,w=m.util,y=m.DomRange,t=m.WrappedRange,u=m.DOMException,
f=l.DomPosition,e,i;if(m.util.isHostMethod(window,"getSelection"))e=function(a){return(a||window).getSelection()};else if(m.util.isHostObject(document,"selection"))e=function(a){return(a||window).document.selection};else F.fail("No means of obtaining a selection object");m.getNativeSelection=e;var p=e(),o=m.createNativeRange(document),q=l.getBody(document),z=w.areHostObjects(p,w.areHostProperties(p,["anchorOffset","focusOffset"]));m.features.selectionHasAnchorAndFocus=z;var N=w.isHostMethod(p,"extend");
m.features.selectionHasExtend=N;var S=typeof p.rangeCount=="number";m.features.selectionHasRangeCount=S;var W=false,Y=true;w.areHostMethods(p,["addRange","getRangeAt","removeAllRanges"])&&typeof p.rangeCount=="number"&&m.features.implementsDomRange&&function(){var a=q.appendChild(document.createTextNode("One")),d=q.appendChild(document.createTextNode("Two")),k=m.createNativeRange(document);k.selectNodeContents(a);var E=m.createNativeRange(document);E.selectNodeContents(d);p.removeAllRanges();p.addRange(k);
p.addRange(E);W=p.rangeCount==2;p.removeAllRanges();a.parentNode.removeChild(a);d.parentNode.removeChild(d);a=document.createElement("p");a.contentEditable=false;d=a.appendChild(document.createTextNode("test"));q.appendChild(a);k=m.createRange();k.collapseToPoint(d,1);p.addRange(k.nativeRange);Y=p.rangeCount==1;p.removeAllRanges();q.removeChild(a)}();m.features.selectionSupportsMultipleRanges=W;m.features.collapsedNonEditableSelectionsSupported=Y;var K=w.isHostProperty(p,"type"),Z=false,D;if(q&&w.isHostMethod(q,
"createControlRange")){D=q.createControlRange();if(w.areHostProperties(D,["item","add"]))Z=true}m.features.implementsControlRange=Z;i=z?function(a){return a.anchorNode===a.focusNode&&a.anchorOffset===a.focusOffset}:function(a){return a.rangeCount?a.getRangeAt(a.rangeCount-1).collapsed:false};var $;if(w.isHostMethod(p,"getRangeAt"))$=function(a,d){try{return a.getRangeAt(d)}catch(k){return null}};else if(z)$=function(a){var d=l.getDocument(a.anchorNode);d=m.createRange(d);d.setStart(a.anchorNode,a.anchorOffset);
d.setEnd(a.focusNode,a.focusOffset);if(d.collapsed!==this.isCollapsed){d.setStart(a.focusNode,a.focusOffset);d.setEnd(a.anchorNode,a.anchorOffset)}return d};m.getSelection=function(a){a=a||window;var d=a._rangySelection;if(d){d.nativeSelection=e(a);d.refresh()}else{d=new O(e(a));a._rangySelection=d}return d};D=O.prototype;if(z&&w.areHostMethods(p,["removeAllRanges","addRange"])){D.removeAllRanges=function(){this.nativeSelection.removeAllRanges();x(this)};var da=function(a,d){var k=y.getRangeDocument(d);
k=m.createRange(k);k.collapseToPoint(d.endContainer,d.endOffset);a.nativeSelection.addRange(B(k));a.nativeSelection.extend(d.startContainer,d.startOffset);a.refresh()};D.addRange=S?function(a,d){if(d&&N)da(this,a);else{var k;if(W)k=this.rangeCount;else{this.removeAllRanges();k=0}this.nativeSelection.addRange(B(a));this.rangeCount=this.nativeSelection.rangeCount;if(this.rangeCount==k+1){if(m.config.checkSelectionRanges)if((k=$(this.nativeSelection,this.rangeCount-1))&&!y.rangesEqual(k,a))a=new t(k);
this._ranges[this.rangeCount-1]=a;G(this,a,s(this.nativeSelection));this.isCollapsed=i(this)}else this.refresh()}}:function(a,d){if(d&&N)da(this,a);else{this.nativeSelection.addRange(B(a));this.refresh()}};D.setRanges=function(a){this.removeAllRanges();for(var d=0,k=a.length;d<k;++d)this.addRange(a[d])}}else if(w.isHostMethod(p,"empty")&&w.isHostMethod(o,"select")&&K&&Z){D.removeAllRanges=function(){try{this.nativeSelection.empty();if(this.nativeSelection.type!="None"){var a;if(this.anchorNode)a=
l.getDocument(this.anchorNode);else if(this.nativeSelection.type=="Control"){var d=this.nativeSelection.createRange();if(d.length)a=l.getDocument(d.item(0)).body.createTextRange()}if(a){a.body.createTextRange().select();this.nativeSelection.empty()}}}catch(k){}x(this)};D.addRange=function(a){if(this.nativeSelection.type=="Control"){var d=this.nativeSelection.createRange();a=I(a);var k=l.getDocument(d.item(0));k=l.getBody(k).createControlRange();for(var E=0,M=d.length;E<M;++E)k.add(d.item(E));try{k.add(a)}catch(Q){throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
}k.select();H(this)}else{t.rangeToTextRange(a).select();this._ranges[0]=a;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;G(this,a,false)}};D.setRanges=function(a){this.removeAllRanges();var d=a.length;if(d>1){var k=l.getDocument(a[0].startContainer);k=l.getBody(k).createControlRange();for(var E=0,M;E<d;++E){M=I(a[E]);try{k.add(M)}catch(Q){throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");}}k.select();
H(this)}else d&&this.addRange(a[0])}}else{F.fail("No means of selecting a Range or TextRange was found");return false}D.getRangeAt=function(a){if(a<0||a>=this.rangeCount)throw new u("INDEX_SIZE_ERR");else return this._ranges[a]};var X;if(w.isHostMethod(p,"getRangeAt")&&typeof p.rangeCount=="number")X=function(a){a._ranges.length=a.rangeCount=a.nativeSelection.rangeCount;if(a.rangeCount){for(var d=0,k=a.rangeCount;d<k;++d)a._ranges[d]=new m.WrappedRange(a.nativeSelection.getRangeAt(d));G(a,a._ranges[a.rangeCount-
1],s(a.nativeSelection));a.isCollapsed=i(a)}else x(a)};else if(z&&typeof p.isCollapsed=="boolean"&&typeof o.collapsed=="boolean"&&m.features.implementsDomRange)X=function(a){var d;d=a.nativeSelection;if(d.anchorNode){d=$(d,0);a._ranges=[d];a.rangeCount=1;d=a.nativeSelection;a.anchorNode=d.anchorNode;a.anchorOffset=d.anchorOffset;a.focusNode=d.focusNode;a.focusOffset=d.focusOffset;a.isCollapsed=i(a)}else x(a)};else if(w.isHostMethod(p,"createRange")&&m.features.implementsTextRange)X=function(a){var d=
a.nativeSelection.createRange();if(a.nativeSelection.type=="Control")H(a);else if(d&&typeof d.text!="undefined"){d=new t(d);a._ranges=[d];G(a,d,false);a.rangeCount=1;a.isCollapsed=d.collapsed}else x(a)};else{F.fail("No means of obtaining a Range or TextRange from the user's selection was found");return false}D.refresh=function(a){var d=a?this._ranges.slice(0):null;X(this);if(a){a=d.length;if(a!=this._ranges.length)return false;for(;a--;)if(!y.rangesEqual(d[a],this._ranges[a]))return false;return true}};
var P=function(a,d){var k=a.getAllRanges(),E=false;a.removeAllRanges();for(var M=0,Q=k.length;M<Q;++M)if(E||d!==k[M])a.addRange(k[M]);else E=true;a.rangeCount||x(a)};D.removeRange=K&&Z?function(a){if(this.nativeSelection.type=="Control"){var d=this.nativeSelection.createRange();a=I(a);var k=l.getDocument(d.item(0));k=l.getBody(k).createControlRange();for(var E,M=false,Q=0,V=d.length;Q<V;++Q){E=d.item(Q);if(E!==a||M)k.add(d.item(Q));else M=true}k.select();H(this)}else P(this,a)}:function(a){P(this,
a)};var s;if(z&&m.features.implementsDomRange){s=function(a){var d=false;if(a.anchorNode)d=l.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset)==1;return d};D.isBackwards=function(){return s(this)}}else s=D.isBackwards=function(){return false};D.toString=function(){for(var a=[],d=0,k=this.rangeCount;d<k;++d)a[d]=""+this._ranges[d];return a.join("")};D.collapse=function(a,d){j(this,a);var k=m.createRange(l.getDocument(a));k.collapseToPoint(a,d);this.removeAllRanges();this.addRange(k);
this.isCollapsed=true};D.collapseToStart=function(){if(this.rangeCount){var a=this._ranges[0];this.collapse(a.startContainer,a.startOffset)}else throw new u("INVALID_STATE_ERR");};D.collapseToEnd=function(){if(this.rangeCount){var a=this._ranges[this.rangeCount-1];this.collapse(a.endContainer,a.endOffset)}else throw new u("INVALID_STATE_ERR");};D.selectAllChildren=function(a){j(this,a);var d=m.createRange(l.getDocument(a));d.selectNodeContents(a);this.removeAllRanges();this.addRange(d)};D.deleteFromDocument=
function(){if(this.rangeCount){var a=this.getAllRanges();this.removeAllRanges();for(var d=0,k=a.length;d<k;++d)a[d].deleteContents();this.addRange(a[k-1])}};D.getAllRanges=function(){return this._ranges.slice(0)};D.setSingleRange=function(a){this.setRanges([a])};D.containsNode=function(a,d){for(var k=0,E=this._ranges.length;k<E;++k)if(this._ranges[k].containsNode(a,d))return true;return false};D.getName=function(){return"WrappedSelection"};D.inspect=function(){return n(this)};D.detach=function(){if(this.anchorNode)l.getWindow(this.anchorNode)._rangySelection=
null};O.inspect=n;m.Selection=O;m.addCreateMissingNativeApiListener(function(a){if(typeof a.getSelection=="undefined")a.getSelection=function(){return m.getSelection(this)};a=null})});