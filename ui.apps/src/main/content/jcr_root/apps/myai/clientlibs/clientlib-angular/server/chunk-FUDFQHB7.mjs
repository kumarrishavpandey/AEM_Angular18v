import './polyfills.server.mjs';
import{a as K,b as le,c as ce,d as pe,e as X,f as Z,k as he,n as de,p as me,q as ue,t as fe,z as ge}from"./chunk-ZL6XQO54.mjs";import{c as De,e as ne,g as se}from"./chunk-5XUXGTUW.mjs";var _e=ne((V,ie)=>{"use strict";(function(O,g){typeof V=="object"&&typeof ie=="object"?ie.exports=g():typeof define=="function"&&define.amd?define([],g):typeof V=="object"?V.aemSpaComponentMapping=g():O.aemSpaComponentMapping=g()})(function(){try{return typeof self<"u"}catch{return!1}}()?self:V,function(){return(()=>{"use strict";var O={d:(D,f)=>{for(var i in f)O.o(f,i)&&!O.o(D,i)&&Object.defineProperty(D,i,{enumerable:!0,get:f[i]})},o:(D,f)=>Object.prototype.hasOwnProperty.call(D,f),r:D=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(D,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(D,"__esModule",{value:!0})}},g={};let y;O.r(g),O.d(g,{ComponentMapping:()=>P,MapTo:()=>_});class P{constructor(){return y||(y=this),y}static get instance(){return new this}map(f,i){P.map(f,i)}static map(f,i){f&&i&&(typeof f=="string"?[f]:f).forEach(s=>{this.mapping[s]=i})}lazyMap(f,i){P.lazyMap(f,i)}static lazyMap(f,i){f&&i&&(typeof f=="string"?[f]:f).forEach(s=>{this.lazyMapping[s]=i})}get(f){return P.get(f)}static get(f){return this.mapping[f]}getLazy(f){return P.getLazy(f)}static getLazy(f){return this.lazyMapping[f]?this.lazyMapping[f]():Promise.reject("resourceType "+f+" not found in mappings!")}}P.mapping={},P.lazyMapping={};let _=D=>f=>P.instance.map(D,f);return g})()})});var Pe=ne((Te,ee)=>{"use strict";var Oe=function(){"use strict";function O(a,c){return c!=null&&a instanceof c}var g;try{g=Map}catch{g=function(){}}var y;try{y=Set}catch{y=function(){}}var P;try{P=Promise}catch{P=function(){}}function _(a,c,m,d,C){typeof c=="object"&&(m=c.depth,d=c.prototype,C=c.includeNonEnumerable,c=c.circular);var R=[],A=[],S=typeof Buffer<"u";typeof c>"u"&&(c=!0),typeof m>"u"&&(m=1/0);function N(E,L){if(E===null)return null;if(L===0)return E;var I,H;if(typeof E!="object")return E;if(O(E,g))I=new g;else if(O(E,y))I=new y;else if(O(E,P))I=new P(function(q,x){E.then(function(z){q(N(z,L-1))},function(z){x(N(z,L-1))})});else if(_.__isArray(E))I=[];else if(_.__isRegExp(E))I=new RegExp(E.source,h(E)),E.lastIndex&&(I.lastIndex=E.lastIndex);else if(_.__isDate(E))I=new Date(E.getTime());else{if(S&&Buffer.isBuffer(E))return Buffer.allocUnsafe?I=Buffer.allocUnsafe(E.length):I=new Buffer(E.length),E.copy(I),I;O(E,Error)?I=Object.create(E):typeof d>"u"?(H=Object.getPrototypeOf(E),I=Object.create(H)):(I=Object.create(d),H=d)}if(c){var k=R.indexOf(E);if(k!=-1)return A[k];R.push(E),A.push(I)}O(E,g)&&E.forEach(function(q,x){var z=N(x,L-1),$=N(q,L-1);I.set(z,$)}),O(E,y)&&E.forEach(function(q){var x=N(q,L-1);I.add(x)});for(var l in E){var F;H&&(F=Object.getOwnPropertyDescriptor(H,l)),!(F&&F.set==null)&&(I[l]=N(E[l],L-1))}if(Object.getOwnPropertySymbols)for(var Q=Object.getOwnPropertySymbols(E),l=0;l<Q.length;l++){var U=Q[l],b=Object.getOwnPropertyDescriptor(E,U);b&&!b.enumerable&&!C||(I[U]=N(E[U],L-1),b.enumerable||Object.defineProperty(I,U,{enumerable:!1}))}if(C)for(var w=Object.getOwnPropertyNames(E),l=0;l<w.length;l++){var B=w[l],b=Object.getOwnPropertyDescriptor(E,B);b&&b.enumerable||(I[B]=N(E[B],L-1),Object.defineProperty(I,B,{enumerable:!1}))}return I}return N(a,m)}_.clonePrototype=function(c){if(c===null)return null;var m=function(){};return m.prototype=c,new m};function D(a){return Object.prototype.toString.call(a)}_.__objToStr=D;function f(a){return typeof a=="object"&&D(a)==="[object Date]"}_.__isDate=f;function i(a){return typeof a=="object"&&D(a)==="[object Array]"}_.__isArray=i;function s(a){return typeof a=="object"&&D(a)==="[object RegExp]"}_.__isRegExp=s;function h(a){var c="";return a.global&&(c+="g"),a.ignoreCase&&(c+="i"),a.multiline&&(c+="m"),c}return _.__getRegExpFlags=h,_}();typeof ee=="object"&&ee.exports&&(ee.exports=Oe)});var Ce=ne((Y,oe)=>{"use strict";(function(O,g){typeof Y=="object"&&typeof oe=="object"?oe.exports=g():typeof define=="function"&&define.amd?define([],g):typeof Y=="object"?Y.aemSpaPageModelManager=g():O.aemSpaPageModelManager=g()})(function(){try{return typeof self<"u"}catch{return!1}}()?self:Y,function(){return(()=>{"use strict";var O={470:P=>{function _(i){if(typeof i!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(i))}function D(i,s){for(var h,a="",c=0,m=-1,d=0,C=0;C<=i.length;++C){if(C<i.length)h=i.charCodeAt(C);else{if(h===47)break;h=47}if(h===47){if(!(m===C-1||d===1))if(m!==C-1&&d===2){if(a.length<2||c!==2||a.charCodeAt(a.length-1)!==46||a.charCodeAt(a.length-2)!==46){if(a.length>2){var R=a.lastIndexOf("/");if(R!==a.length-1){R===-1?(a="",c=0):c=(a=a.slice(0,R)).length-1-a.lastIndexOf("/"),m=C,d=0;continue}}else if(a.length===2||a.length===1){a="",c=0,m=C,d=0;continue}}s&&(a.length>0?a+="/..":a="..",c=2)}else a.length>0?a+="/"+i.slice(m+1,C):a=i.slice(m+1,C),c=C-m-1;m=C,d=0}else h===46&&d!==-1?++d:d=-1}return a}var f={resolve:function(){for(var i,s="",h=!1,a=arguments.length-1;a>=-1&&!h;a--){var c;a>=0?c=arguments[a]:(i===void 0&&(i=process.cwd()),c=i),_(c),c.length!==0&&(s=c+"/"+s,h=c.charCodeAt(0)===47)}return s=D(s,!h),h?s.length>0?"/"+s:"/":s.length>0?s:"."},normalize:function(i){if(_(i),i.length===0)return".";var s=i.charCodeAt(0)===47,h=i.charCodeAt(i.length-1)===47;return(i=D(i,!s)).length!==0||s||(i="."),i.length>0&&h&&(i+="/"),s?"/"+i:i},isAbsolute:function(i){return _(i),i.length>0&&i.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var i,s=0;s<arguments.length;++s){var h=arguments[s];_(h),h.length>0&&(i===void 0?i=h:i+="/"+h)}return i===void 0?".":f.normalize(i)},relative:function(i,s){if(_(i),_(s),i===s||(i=f.resolve(i))===(s=f.resolve(s)))return"";for(var h=1;h<i.length&&i.charCodeAt(h)===47;++h);for(var a=i.length,c=a-h,m=1;m<s.length&&s.charCodeAt(m)===47;++m);for(var d=s.length-m,C=c<d?c:d,R=-1,A=0;A<=C;++A){if(A===C){if(d>C){if(s.charCodeAt(m+A)===47)return s.slice(m+A+1);if(A===0)return s.slice(m+A)}else c>C&&(i.charCodeAt(h+A)===47?R=A:A===0&&(R=0));break}var S=i.charCodeAt(h+A);if(S!==s.charCodeAt(m+A))break;S===47&&(R=A)}var N="";for(A=h+R+1;A<=a;++A)A!==a&&i.charCodeAt(A)!==47||(N.length===0?N+="..":N+="/..");return N.length>0?N+s.slice(m+R):(m+=R,s.charCodeAt(m)===47&&++m,s.slice(m))},_makeLong:function(i){return i},dirname:function(i){if(_(i),i.length===0)return".";for(var s=i.charCodeAt(0),h=s===47,a=-1,c=!0,m=i.length-1;m>=1;--m)if((s=i.charCodeAt(m))===47){if(!c){a=m;break}}else c=!1;return a===-1?h?"/":".":h&&a===1?"//":i.slice(0,a)},basename:function(i,s){if(s!==void 0&&typeof s!="string")throw new TypeError('"ext" argument must be a string');_(i);var h,a=0,c=-1,m=!0;if(s!==void 0&&s.length>0&&s.length<=i.length){if(s.length===i.length&&s===i)return"";var d=s.length-1,C=-1;for(h=i.length-1;h>=0;--h){var R=i.charCodeAt(h);if(R===47){if(!m){a=h+1;break}}else C===-1&&(m=!1,C=h+1),d>=0&&(R===s.charCodeAt(d)?--d==-1&&(c=h):(d=-1,c=C))}return a===c?c=C:c===-1&&(c=i.length),i.slice(a,c)}for(h=i.length-1;h>=0;--h)if(i.charCodeAt(h)===47){if(!m){a=h+1;break}}else c===-1&&(m=!1,c=h+1);return c===-1?"":i.slice(a,c)},extname:function(i){_(i);for(var s=-1,h=0,a=-1,c=!0,m=0,d=i.length-1;d>=0;--d){var C=i.charCodeAt(d);if(C!==47)a===-1&&(c=!1,a=d+1),C===46?s===-1?s=d:m!==1&&(m=1):s!==-1&&(m=-1);else if(!c){h=d+1;break}}return s===-1||a===-1||m===0||m===1&&s===a-1&&s===h+1?"":i.slice(s,a)},format:function(i){if(i===null||typeof i!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof i);return function(s,h){var a=h.dir||h.root,c=h.base||(h.name||"")+(h.ext||"");return a?a===h.root?a+c:a+"/"+c:c}(0,i)},parse:function(i){_(i);var s={root:"",dir:"",base:"",ext:"",name:""};if(i.length===0)return s;var h,a=i.charCodeAt(0),c=a===47;c?(s.root="/",h=1):h=0;for(var m=-1,d=0,C=-1,R=!0,A=i.length-1,S=0;A>=h;--A)if((a=i.charCodeAt(A))!==47)C===-1&&(R=!1,C=A+1),a===46?m===-1?m=A:S!==1&&(S=1):m!==-1&&(S=-1);else if(!R){d=A+1;break}return m===-1||C===-1||S===0||S===1&&m===C-1&&m===d+1?C!==-1&&(s.base=s.name=d===0&&c?i.slice(1,C):i.slice(d,C)):(d===0&&c?(s.name=i.slice(1,m),s.base=i.slice(1,C)):(s.name=i.slice(d,m),s.base=i.slice(d,C)),s.ext=i.slice(m,C)),d>0?s.dir=i.slice(0,d-1):c&&(s.dir="/"),s},sep:"/",delimiter:":",win32:null,posix:null};f.posix=f,P.exports=f},873:(P,_,D)=>{D.r(_),D.d(_,{AEM_MODE:()=>c,AuthoringUtils:()=>w,Constants:()=>d,ModelClient:()=>U,ModelManager:()=>B,ModelStore:()=>b,PathUtils:()=>l});class f{constructor(){}}f.PAGE_MODEL_INIT="cq-pagemodel-init",f.PAGE_MODEL_LOADED="cq-pagemodel-loaded",f.PAGE_MODEL_UPDATE="cq-pagemodel-update",f.PAGE_MODEL_ROUTE_CHANGED="cq-pagemodel-route-changed";let i=f;class s{constructor(){}}s.PAGE_MODEL_ROOT_URL="cq:pagemodel_root_url",s.PAGE_MODEL_ROUTE_FILTERS="cq:pagemodel_route_filters",s.PAGE_MODEL_ROUTER="cq:pagemodel_router",s.WCM_MODE="cq:wcmmode",s.WCM_DATA_TYPE="cq:datatype";let h=s;class a{constructor(){}}var c,m;a.TYPE_PROP=":type",a.ITEMS_PROP=":items",a.ITEMS_ORDER_PROP=":itemsOrder",a.PATH_PROP=":path",a.CHILDREN_PROP=":children",a.HIERARCHY_TYPE_PROP=":hierarchyType",a.JCR_CONTENT="jcr:content",function(r){r.EDIT="edit",r.PREVIEW="preview",r.DISABLED="disabled"}(c||(c={})),function(r){r.JS="script",r.STYLESHEET="stylesheet"}(m||(m={}));let d=a,C=Pe();var R=D.n(C),A=D(470);let S=De("url");var N=D.n(S);class E{constructor(){}}E.DEFAULT_SLING_MODEL_SELECTOR="model",E.DEFAULT_MODEL_JSON_EXTENSION=`.${E.DEFAULT_SLING_MODEL_SELECTOR}.json`;let L=E,I=/(?:\/)(?:content|apps|libs|etc|etc.clientlibs|conf|mnt\/overlay)(?:\/)/,H=`(.+)/${d.JCR_CONTENT}/(.+)`,k="http://dummy";class l{static isBrowser(){return typeof window<"u"}static getContextPath(e){let t=e||this.getCurrentPathname();if(!t)return"";let n=t.match(I),o=n===null?-1:n.index||-1;return o>0?t.slice(0,o):""}static adaptPagePath(e,t){if(!e)return"";let n=l.internalize(e);return t&&n===l.sanitize(t)?"":n}static externalize(e){let t=this.getContextPath();return e.startsWith(t)?e:`${t}${e}`}static internalize(e){if(!e||typeof e!="string")return"";let t=this.getContextPath();return e.replace(new RegExp(`^${t}/`),"/")}static getMetaPropertyValue(e){let t=null;if(this.isBrowser()){let n=document.head.querySelector(`meta[property="${e}"]`);t=n?n.getAttribute("content"):null}return t}static convertToModelUrl(e){return e&&e.replace&&e.replace(/\.htm(l)?$/,L.DEFAULT_MODEL_JSON_EXTENSION)}static getCurrentPageModelUrl(){let e=this.getCurrentPathname(),t=null;return e&&(t=this.convertToModelUrl(e)||null),t}static getModelUrl(e){return e&&e.replace?this.convertToModelUrl(e):this.getMetaPropertyValue(h.PAGE_MODEL_ROOT_URL)||this.getCurrentPageModelUrl()}static sanitize(e){if(!e||typeof e!="string")return null;let t=N().parse(e,!1,!0).pathname;if(t){t=this.internalize(t);let n=t.indexOf(".");n>-1&&(t=t.substr(0,n)),t=(0,A.normalize)(t)}return t}static addExtension(e,t){if(!t||t.length<1||(t.startsWith(".")||(t="."+t),!e||e.length<1||e.indexOf(t)>-1))return e;let n=this.normalize(e),o=new URL(n,k),p=this.sanitize(o.pathname);p=o.origin===k?p:o.origin+p;let u=this._extractPathWithoutResource(o.pathname);return u=this._replaceExtension(u,t),n=(p+"."+u+o.search).replace(/\.\./g,"."),n}static _extractPathWithoutResource(e){let t=e.split(".");return t.shift(),t.join(".")}static _replaceExtension(e,t){if(e.length<1)return t;let n=e.split("/"),o=n[0].split("."),p=o.pop();p=p?p.replace(/htm(l)?/,""):"";let u=o.join(".")+"."+p+t;return n.shift(),n.length>0&&(u+=n.join("/")),u}static addSelector(e,t){if(!t||t.length<1||(t.startsWith(".")||(t="."+t),!e||e.length<1||e.indexOf(t)>-1))return e;let n=e.indexOf(".")||e.length;return n<0?e+t:e.slice(0,n)+t+e.slice(n,e.length)}static getCurrentPathname(){return this.isBrowser()?window.location.pathname:null}static getCurrentURL(){return this.isBrowser()?window.location.href:""}static dispatchGlobalCustomEvent(e,t){this.isBrowser()&&window.dispatchEvent(new CustomEvent(e,t))}static join(e){return e?this.normalize(e.filter(t=>t).join("/")):""}static normalize(e){return e?e.replace(/\/+/g,"/"):""}static makeAbsolute(e){return e&&typeof e=="string"?e.startsWith("/")?e:"/"+e:""}static makeRelative(e){return e&&typeof e=="string"?e.startsWith("/")?e.slice(1):e:""}static getParentNodePath(e){if(e&&e.length>0){let t=e.lastIndexOf("/")+1;if(t<e.length)return e.substring(0,t-1)}return null}static isItem(e){return new RegExp(H).test(e)}static getNodeName(e){return(typeof e=="string"?e.replace(/\/+/g,"/").split(/\//).filter(Boolean):[]).pop()||null}static subpath(e,t){if(!e)return"";let n=l.makeRelative(e).split("/"),o=l.makeRelative(t).split("/");if(n.length<o.length)return e;let p;for(p=0;p<o.length&&n[p]===o[p];++p);return p===o.length?n.slice(p).join("/"):e}static splitByDelimitators(e,t){let n=[e];return t.forEach(o=>{let p=[],u=l.normalize(l.makeAbsolute(o)+"/");n.forEach(v=>{if(p=p.concat(v.split(u)),v.endsWith(o)){let M=p.splice(p.length-1,1)[0];M!==o&&(p=p.concat(M.split(l.makeAbsolute(o))))}p=p.filter(M=>M)}),n=p}),n}static _getJCRPath(e,t){return[e,d.JCR_CONTENT,t].join("/")}static splitPageContentPaths(e){if(!e&&typeof e!="string")return;let t=e.split(`/${d.JCR_CONTENT}/`),n={pagePath:t[0]};return t.length>1&&(n.itemPath=t[1]),n}static trimStrings(e,t){return t.forEach(n=>{for(;e.startsWith(n);)e=l.makeRelative(e.slice(n.length));for(;e.endsWith(n);)(e=e.slice(0,e.length-n.length)).endsWith("/")&&(e=e.slice(0,e.length-1))}),e}static _getStartStrings(e,t){let n="";return t.forEach(o=>{for(;e.startsWith(o);)e=l.makeRelative(e.slice(o.length)),n=`${n}/${o}`}),l.makeRelative(n)}static toAEMPath(e,t,n){if(this.isBrowser()&&window.location.origin===t){let o=`(/editor.html)?(/content/${n=n.replace(/^\/|\/$/g,"")})?`;if(e.indexOf(o)<0)return`${o}${e}(.html)?`}return e}}function F(r){l.dispatchGlobalCustomEvent(i.PAGE_MODEL_LOADED,{detail:{model:R()(r)}})}class Q{constructor(e){this._modelManager=e,this._windowListener=t=>{t&&t.detail&&t.detail.msg?this._updateModel(t.detail.msg):console.error("EditorService.js","No message passed to cq-pagemodel-update",t)},l.isBrowser()&&window.addEventListener(i.PAGE_MODEL_UPDATE,this._windowListener)}_updateModel(e){if(!e||!e.cmd||!e.path)return void console.error("PageModelManager.js","Not enough data received to update the page model");let t=e.path,n=e.cmd,o=R()(e.data),p,u,v,M=l.getParentNodePath(t);switch(n){case"replace":this._modelManager.modelStore.setData(t,o),this._modelManager._notifyListeners(t);break;case"delete":this._modelManager.modelStore.removeData(t),M&&this._modelManager._notifyListeners(M);break;case"insertBefore":v=!0;case"insertAfter":p=l.getNodeName(t),M&&(u=M+"/"+o.key,this._modelManager.modelStore.insertData(u,o.value,p,v),this._modelManager._notifyListeners(M));break;default:console.log("EditorClient","unsupported command:",n)}F(this._modelManager.modelStore.dataMap)}destroy(){l.isBrowser()&&window.removeEventListener(i.PAGE_MODEL_UPDATE,this._windowListener)}}class U{constructor(e){this._apiHost=e||null}get apiHost(){return this._apiHost}fetch(e){if(!e){let n="Fetching model rejected for path: "+e;return Promise.reject(new Error(n))}let t=this._apiHost||"";return fetch(`${t}${e}`,{credentials:"same-origin"}).then(n=>{if(n.status>=200&&n.status<300)return n.json();throw{response:n}}).catch(n=>Promise.reject(n))}destroy(){this._apiHost=null}}class b{constructor(e,t){this._data=null,this._rootPath=null,this._data={},e&&this.initialize(e,t||{}),this._pageContentDelimiter=[d.JCR_CONTENT]}initialize(e,t){t&&(this._data=t),this._rootPath=e}get rootPath(){return this._rootPath||""}get dataMap(){return this._data}setData(e,t={}){let n=l.getNodeName(e);if(n){let o=this.getData(l.getParentNodePath(e),!1);if(o&&o[d.ITEMS_PROP]){let p=R()(t),u=o[d.ITEMS_PROP]||{};u[n]&&Object.keys(u[n]).forEach(v=>p.value[v]=p.value[v]||""),u[n]=p.value,o[d.ITEMS_PROP]=u}}}getData(e,t=!0){if(!e&&typeof e!="string")return t?R()(this._data):this._data;if(e===this._rootPath||e===`${this._rootPath}/${d.JCR_CONTENT}`)return t?R()(this._data):this._data;let n=l.splitPageContentPaths(e);if(n){let o=this._getPageData(n.pagePath);if(!o||!n.itemPath)return t?R()(o):o;let p=this._findItemData(n.itemPath,o);if(p)return t?R()(p.data):p.data}}insertData(e,t,n,o=!1){if(t=R()(t),!e)return void console.warn("No path provided for data: "+t);if(!l.isItem(e)&&this._data)return this._data[d.CHILDREN_PROP]||(this._data[d.CHILDREN_PROP]={}),void(this._data[d.CHILDREN_PROP][e]=t);let p=l.splitPageContentPaths(e);if(p&&p.itemPath){let u=this._getPageData(p.pagePath),v=this._findItemData(p.itemPath,u).parent||u||this._data,M=l.getNodeName(p.itemPath);if(M!=null&&v&&Object.prototype.hasOwnProperty.call(v,d.ITEMS_PROP)){let T=v[d.ITEMS_PROP];if(T){T[M]=t;let G=v[d.ITEMS_ORDER_PROP];if(G!=null&&G.length>0&&n!=null){let W=G.indexOf(n);W>-1?G.splice(o?W:W+1,0,M):G.push(M)}}}}}removeData(e){if(!e)return null;if(!l.isItem(e)&&this._data&&this._data[d.CHILDREN_PROP])return delete this._data[d.CHILDREN_PROP][e],null;let t=l.splitPageContentPaths(e);if(t&&t.itemPath){let n=this._getPageData(t.pagePath),o=this._findItemData(t.itemPath,n);if(o.data&&o&&o.parent&&Object.prototype.hasOwnProperty.call(o.parent,d.ITEMS_PROP)){let{parent:p}=o,u=p[d.ITEMS_PROP],v=l.getNodeName(t.itemPath);if(v){u&&delete u[v],delete o.data,delete o.parent;let M=p[d.ITEMS_ORDER_PROP];if(M&&M.length>0){let T=M.indexOf(v);M.splice(T,1)}return o.parentPath?o.parentPath:null}}}return console.warn(`Item for path ${e} was not found! Nothing to remove then.`),null}destroy(){this._data=null,this._rootPath=null,this._pageContentDelimiter=null}_findItemData(e,t=this._data,n=null,o=""){let p={parent:n,parentPath:o};if(!t)throw new Error("Assertion error: No data provided. This should never happen.");let u=t[d.ITEMS_PROP];if(!u)return p;for(let v in u){if(!Object.prototype.hasOwnProperty.call(u,v))continue;let M=u[v];if(v===e)return p.data=u[v],p.key=v,p;{let T=l.subpath(e,v);if(!this._pageContentDelimiter)throw new Error("_pageContentDelimiter not set. this should never happen as its set in constructor.");{let G=l._getStartStrings(T,this._pageContentDelimiter),W=l.join([o,v,G]);if(T=l.trimStrings(T,this._pageContentDelimiter),T!==e){let ae=this._findItemData(T,M,M,W);if(ae)return ae}}}}return p}_getPageData(e){if(!this._data)return;if(e===""||e===this._data[d.PATH_PROP]||e===this.rootPath)return this._data;let t=this._data[d.CHILDREN_PROP];return t&&t[e]}}class w{constructor(e){this._apiDomain=e}getApiDomain(){return this._apiDomain}getAemLibraries(){let e=document.createDocumentFragment();if(!w.isRemoteApp()||!w.isEditMode())return e;let t=this.prependDomain(w.AUTHORING_LIBRARIES.JS),n=this.prependDomain(w.AUTHORING_LIBRARIES.CSS),o=w.AUTHORING_LIBRARIES.META;return e.append(this.generateScriptElements(t)),e.append(this.generateLinkElements(n)),e.append(this.generateMetaElements(o)),e}setOnLoadCallback(e,t){let n=e.querySelectorAll("script");n.length?n[n.length-1].onload=()=>{t()}:t()}generateMetaElements(e){let t=document.createDocumentFragment();return Object.entries(e).forEach(n=>{let[o,p]=n,u=document.createElement("meta");u.setAttribute("property",o),u.content=p,t.appendChild(u)}),t}generateLinkElements(e){let t=document.createDocumentFragment();return e.forEach(n=>{let o=document.createElement("link");o.type="text/css",o.rel="stylesheet",o.href=n,t.appendChild(o)}),t}generateScriptElements(e){let t=document.createDocumentFragment();return e.forEach(n=>{let o=document.createElement("script");o.type="text/javascript",o.src=n,o.async=!1,t.appendChild(o)}),t}static isMode(e){let t=l.getMetaPropertyValue(h.WCM_MODE)===e,n=l.isBrowser()&&w.getWCMModeFromURL()===e;return t||n}static isEditMode(){return w.isMode(c.EDIT)}static isPreviewMode(){return w.isMode(c.PREVIEW)}static isRemoteApp(){try{return!!new URL(l.getCurrentURL()).searchParams.get(h.WCM_MODE)}catch{}return!1}static getWCMModeFromURL(){let e;try{return e=new URL(l.getCurrentURL()),e.searchParams.get(h.WCM_MODE)||""}catch{}return""}prependDomain(e){let t=[],n=this.getApiDomain();return e.forEach(o=>{t.push(`${n||""}${o}`)}),t}static isInEditor(){return w.isEditMode()||w.isPreviewMode()||w.isRemoteApp()}}w.EDITOR_CLIENTLIB_PATH="/etc.clientlibs/cq/gui/components/authoring/editors/clientlibs/",w.AUTHORING_LIBRARIES={JS:[w.EDITOR_CLIENTLIB_PATH+"internal/messaging.js",w.EDITOR_CLIENTLIB_PATH+"utils.js",w.EDITOR_CLIENTLIB_PATH+"internal/page.js",w.EDITOR_CLIENTLIB_PATH+"internal/pagemodel/messaging.js"],CSS:[w.EDITOR_CLIENTLIB_PATH+"internal/page.css"],META:{[h.WCM_DATA_TYPE]:"JSON"}};let B=new class{constructor(){this._listenersMap={},this._fetchPromises={},this._modelPaths={}}get modelClient(){if(!this._modelClient)throw new Error("ModelClient is undefined. Call initialize first!");return this._modelClient}get modelStore(){if(!this._modelStore)throw new Error("ModelStore is undefined. Call initialize first!");return this._modelStore}get clientlibUtil(){if(!this._clientlibUtil)throw new Error("AuthoringUtils is undefined. Call initialize first!");return this._clientlibUtil}initialize(r){this.initializeAsync(r);let{rootModelURL:e,rootModelPath:t}=this._modelPaths;if(!e)throw new Error("Provide root model url to initialize ModelManager.");if(!t)throw new Error("No root modelpath resolved! This should never happen.");return this._initPromise}initializeAsync(r){this.destroy();let e=this._toModelConfig(r),t=e&&e.model;this._initializeFields(e),this._initPromise=this._attachAEMLibraries();let{rootModelPath:n}=this._modelPaths;this._modelStore=new b(n,t),n&&this._setInitializationPromise(n),function(){if(z()&&l.isBrowser()){let o=window.history.pushState,p=window.history.replaceState;window.addEventListener("popstate",u=>{var v;let M=u?.target;$(((v=M?.location)===null||v===void 0?void 0:v.pathname)||null)}),window.history.pushState=(u,v,M)=>($(M),o.apply(history,[u,v,M])),window.history.replaceState=(u,v,M)=>($(M||null),p.apply(history,[u,v,M]))}}()}_attachAEMLibraries(){if(!l.isBrowser())return Promise.resolve();let r=this.clientlibUtil.getAemLibraries();if(!r.hasChildNodes())return Promise.resolve();let e,t=new Promise(n=>{e=n});return this.clientlibUtil.setOnLoadCallback(r,e),window.document.head.appendChild(r),t}_initializeFields(r){this._listenersMap={},this._fetchPromises={},this._initPromise=null,this._modelClient=r&&r.modelClient||new U,this._errorPageRoot=r&&r.errorPageRoot||void 0,this._editorClient=new Q(this),this._clientlibUtil=new w(this.modelClient.apiHost),this._modelPaths=this._getPathsForModel(r)}_getPathsForModel(r){let e=r?.path,t=l.getMetaPropertyValue(h.PAGE_MODEL_ROOT_URL),n=l.internalize(t),o=this._isRemoteApp()?"":l.getCurrentPathname(),p=o&&l.sanitize(o)||"",u=e||n||p;return{currentPathname:o,metaPropertyModelURL:n,rootModelURL:u,rootModelPath:l.sanitize(u)||""}}_fetchPageModelFromStore(){let r=this.modelStore.getData();return F(r),r}_setInitializationPromise(r){let{rootModelURL:e}=this._modelPaths;this._initPromise=this._initPromise.then(()=>this._checkDependencies()).then(()=>{let t=this.modelStore.getData(r);return t&&Object.keys(t).length>0?(F(t),t):e?this._fetchData(e).then(n=>{try{return this.modelStore.initialize(r,n),this._fetchActivePageModel(n)||this._fetchPageModelFromStore()}catch(o){console.error("Error on initialization - "+o)}}):void 0})}_fetchActivePageModel(r){let{currentPathname:e,metaPropertyModelURL:t}=this._modelPaths,n=e&&l.sanitize(e)||"";if(e&&n&&!x(e)&&(p=t,(o=e)&&p&&l.sanitize(o)!==l.sanitize(p))&&!function(u,v){let M=l.sanitize(v);return!!M&&!!(u&&v&&u[d.CHILDREN_PROP]&&u[d.CHILDREN_PROP][M])}(r,e))return this._fetchData(e).then(u=>(this.modelStore.insertData(n,u),this._fetchPageModelFromStore())).catch(u=>{console.warn("caught",u)});if(e&&x(e))return this._fetchPageModelFromStore();if(!l.isBrowser())throw new Error(`Attempting to retrieve model data from a non-browser.
                Please provide the initial data with the property key model`);var o,p}get rootPath(){return this.modelStore.rootPath}getData(r){let e="",t=!1;return typeof r=="string"?e=r:r&&(e=r.path||"",t=!!r.forceReload),(this._initPromise||Promise.resolve()).then(()=>this._checkDependencies()).then(()=>{if(!t){let n=this.modelStore.getData(e);if(n)return Promise.resolve(n)}if(l.isItem(e)){let{pageData:n,pagePath:o}=this._getParentPage(e);if(!n)return this._fetchData(o).then(p=>(this._storeData(o,p),this.modelStore.getData(e)))}return this._fetchData(e).then(n=>this._storeData(e,n))})}_fetchData(r){if(Object.prototype.hasOwnProperty.call(this._fetchPromises,r))return this._fetchPromises[r];if(this.modelClient)return new Promise((e,t)=>{let n=this.modelClient.fetch(this._toModelPath(r));this._fetchPromises[r]=n,n.then(o=>{delete this._fetchPromises[r],this._isRemoteApp()&&F(o),e(o)}).catch(o=>{if(delete this._fetchPromises[r],this._errorPageRoot!==void 0){let p=typeof o!="string"&&o.response?o.response.status:"500",u=this._errorPageRoot+p+".model.json";r.indexOf(d.JCR_CONTENT)===-1&&r!==u?this._fetchData(u).then(v=>{v[d.PATH_PROP]=l.sanitize(r)||r,e(v)}).catch(t):t(o)}else t(o)})});throw new Error("ModelClient not initialized!")}_notifyListeners(r){if(r=l.adaptPagePath.call(this,r),!this._listenersMap)throw new Error("ListenersMap is undefined.");let e=this._listenersMap[r];e&&e.length&&e.forEach(t=>{try{t()}catch(n){console.error(`Error in listener ${e} at path ${r}: ${n}`)}})}addListener(r,e){var t;if(!r||typeof r!="string"||typeof e!="function")return;let n=l.adaptPagePath(r,(t=this.modelStore)===null||t===void 0?void 0:t.rootPath);this._listenersMap[n]=this._listenersMap[r]||[],this._listenersMap[n].push(e)}removeListener(r,e){var t;if(!r||typeof r!="string"||typeof e!="function")return;let n=l.adaptPagePath(r,(t=this.modelStore)===null||t===void 0?void 0:t.rootPath),o=this._listenersMap[n];if(o){let p=o.indexOf(e);p!==-1&&o.splice(p,1)}}destroy(){this._modelClient&&this._modelClient.destroy&&this._modelClient.destroy(),this._modelStore&&this._modelStore.destroy&&this._modelStore.destroy(),this._editorClient&&this._editorClient.destroy&&this._editorClient.destroy()}_storeData(r,e){let t=!1;return this._modelStore&&(t=l.isItem(r)),e&&Object.keys(e).length>0&&(this.modelStore.insertData(r,e),this._notifyListeners(r)),t||this._notifyListeners(""),e}_toModelPath(r){let e=l.addSelector(r,"model");return e=l.addExtension(e,"json"),e=l.externalize(e),l.makeAbsolute(e)}_toModelConfig(r){return r&&typeof r=="string"?{path:r}:r||{}}_checkDependencies(){return this.modelClient?this.modelStore?Promise.resolve():Promise.reject("No ModelManager registered."):Promise.reject("No ModelClient registered.")}_getParentPage(r){let e=l.splitPageContentPaths(r),t=e?.pagePath||"";return{pageData:this.modelStore.getData(t),pagePath:t}}_isRemoteApp(){let r=this.modelClient.apiHost||"";return l.isBrowser()&&r.length>0&&l.getCurrentURL()!==r}};class q{constructor(){}}function x(r){let e=function(){let t=l.getMetaPropertyValue(h.PAGE_MODEL_ROUTE_FILTERS);return t?t.split(","):[]}();for(let t=0,n=e.length;t<n;t++)if(new RegExp(e[t]).test(r))return!0;return!1}function z(){if(!l.isBrowser())return!1;let r=l.getMetaPropertyValue(h.PAGE_MODEL_ROUTER);return!r||q.DISABLED!==r}function $(r){if(!z())return;let e=function(t){let n=t||l.isBrowser()&&window.location.pathname;return n?l.sanitize(n):null}(r);e&&e!=="/"&&!x(e)&&function(t){B.getData({path:t}).then(n=>{l.dispatchGlobalCustomEvent(i.PAGE_MODEL_ROUTE_CHANGED,{detail:{model:n}})})}(e)}q.DISABLED="disabled",q.CONTENT_PATH="path"}},g={};function y(P){if(g[P])return g[P].exports;var _=g[P]={exports:{}};return O[P](_,_.exports,y),_.exports}return y.n=P=>{var _=P&&P.__esModule?()=>P.default:()=>P;return y.d(_,{a:_}),_},y.d=(P,_)=>{for(var D in _)y.o(_,D)&&!y.o(P,D)&&Object.defineProperty(P,D,{enumerable:!0,get:_[D]})},y.o=(P,_)=>Object.prototype.hasOwnProperty.call(P,_),y.r=P=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(P,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(P,"__esModule",{value:!0})},y(873)})()})});var Ee=se(_e(),1),j=se(Ce(),1);var re=class{constructor(g){this.spaMapping=g,this.editConfigMap={}}map(g,y,P=null){let _=y;(typeof g=="string"?[g]:g).forEach(f=>{P&&(this.editConfigMap[f]=P),this.spaMapping.map(f,_)})}lazyMap(g,y,P=null){let _=y;P&&(this.editConfigMap[g]=P),this.spaMapping.lazyMap(g,_)}get(g){return this.spaMapping.get(g)}lazyGet(g){return this.spaMapping.getLazy(g)}getEditConfig(g){return this.editConfigMap[g]}},Re=new re(Ee.ComponentMapping);function ve(O){return(g,y=null)=>Re.map(O,g,y)}var Ie={NEW_SECTION_CLASS_NAMES:"new section",APPLIED_CLASS_NAMES:"appliedCssClassNames",TYPE_PROP:j.Constants.TYPE_PROP,ITEMS_PROP:j.Constants.ITEMS_PROP,ITEMS_ORDER_PROP:j.Constants.ITEMS_ORDER_PROP,PATH_PROP:j.Constants.PATH_PROP,CHILDREN_PROP:j.Constants.CHILDREN_PROP,DATA_PATH_PROP:":dataPath",HIERARCHY_TYPE_PROP:j.Constants.HIERARCHY_TYPE_PROP,ASYNC_CONTENT_LOADED_EVENT:"cq-async-content-loaded"};var xe=Ie.NEW_SECTION_CLASS_NAMES;var J=class O{rishavData;ngOnInit(){console.log("this is for testing.")}static \u0275fac=function(y){return new(y||O)};static \u0275cmp=K({type:O,selectors:[["app-rishav"]],inputs:{rishavData:"rishavData"},standalone:!0,features:[Z],decls:2,vars:0,template:function(y,P){y&1&&(le(0,"p"),X(1,"rishav works!"),ce())}})};ve("myai/components/rishav")(J);var te=class O{title="angular-projects";static \u0275fac=function(y){return new(y||O)};static \u0275cmp=K({type:O,selectors:[["app-root"]],standalone:!0,features:[Z],decls:2,vars:0,template:function(y,P){y&1&&(X(0,"Hello "),pe(1,"app-rishav"))},dependencies:[J]})};var Me=[];var ye={providers:[he({eventCoalescing:!0}),ge(Me),ue()]};var Se={providers:[fe()]},Ae=de(ye,Se);var Le=()=>me(te,Ae),ot=Le;export{ot as a};
