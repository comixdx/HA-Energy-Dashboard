function e(e,t,i,r){var s,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new o(i,e,r)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,f=globalThis,y=f.trustedTypes,u=y?y.emptyScript:"",x=f.reactiveElementPolyfillSupport,v=(e,t)=>e,$={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},m=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:m};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);s?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:$;this._$Em=r;const o=s.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const o=this.constructor;if(!1===r&&(s=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??m)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==s||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[v("elementProperties")]=new Map,b[v("finalized")]=new Map,x?.({ReactiveElement:b}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _=globalThis,k=e=>e,A=_.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+z,M=`<${C}>`,D=document,P=()=>D.createComment(""),R=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,N=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,I=/"/g,W=/^(?:script|style|textarea|title)$/i,L=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Y=new WeakMap,q=D.createTreeWalker(D,129);function G(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":3===t?"<math>":"",n=H;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===H?"!--"===l[1]?n=O:void 0!==l[1]?n=N:void 0!==l[2]?(W.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=s??H,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?j:'"'===l[3]?I:B):n===I||n===B?n=j:n===O||n===N?n=H:(n=j,s=void 0);const p=n===j&&e[t+1].startsWith("/>")?" ":"";o+=n===H?i+M:d>=0?(r.push(a),i.slice(0,d)+E+i.slice(d)+z+p):i+z+(-2===d?t:p)}return[G(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class X{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,d]=K(e,t);if(this.el=X.createElement(l,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=q.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(E)){const t=d[o++],i=r.getAttribute(e).split(z),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?te:"?"===n[1]?ie:"@"===n[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(z)&&(a.push({type:6,index:s}),r.removeAttribute(e));if(W.test(r.tagName)){const e=r.textContent.split(z),t=e.length-1;if(t>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],P()),q.nextNode(),a.push({type:2,index:++s});r.append(e[t],P())}}}else if(8===r.nodeType)if(r.data===C)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(z,e+1));)a.push({type:7,index:s}),e+=z.length-1}s++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,r){if(t===F)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=R(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,r)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);q.currentNode=r;let s=q.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new Z(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new se(s,this,e)),this._$AV.push(t),a=i[++n]}o!==a?.index&&(s=q.nextNode(),o++)}return q.currentNode=D,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),R(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new J(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new X(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new Z(this.O(P()),this.O(P()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=Q(this,e,t,0),o=!R(e)||e!==this._$AH&&e!==F,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=Q(this,r[i+n],t,n),a===F&&(a=this._$AH[n]),o||=!R(a)||a!==this._$AH[n],a===V?e=V:e!==V&&(e+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class re extends ee{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??V)===F)return;const i=this._$AH,r=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==V&&(i===V||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const oe=_.litHtmlPolyfillSupport;oe?.(X,Z),(_.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ae extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new Z(t.insertBefore(P(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ae._$litElement$=!0,ae.finalized=!0,ne.litElementHydrateSupport?.({LitElement:ae});const le=ne.litElementPolyfillSupport;le?.({LitElement:ae}),(ne.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ce={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:m},pe=(e=ce,t,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function he(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return he({...e,state:!0,attribute:!1})}const fe="#e9e9ed",ye="#9184d9",ue="rgba(233,233,237,0.16)",xe="#f3f5fe",ve="#b2b6ca",$e="#9397ab",me="#75798c",we="#595d6c",be="#3f424d",_e="#d2cefd",ke="#5d5294",Ae="#d1a05e",Se="#ef9f27",Ee="#fac775",ze="#412402",Ce="#378add",Me="#85b7eb",De="#042c53",Pe="#1d9e75",Re="#5dcaa5",Te="#04342c",Ue="#639922",He="#97c459",Oe="#173404",Ne="#d4537e",je="#ed93b1",Be="#4b1528";function Ie(e,t){if(!t)return;const i=e.states[t];if(!i)return;const r=Number(i.state);return Number.isFinite(r)?r:void 0}function We(e){return e.import_rate??.28}function Le(e){return e.export_rate??.155}function Fe(e,t){return void 0===t?0:"kW"===e.power_unit?t:t/1e3}function Ve(e){return`${e.toFixed(2)} kW`}function Ye(e){return`${e.toFixed(1)} kWh`}function qe(e,t){return`${function(e){return e.currency??"$"}(e)}${t.toFixed(2)}`}function Ge(e){return`${Math.round(e)}%`}const Ke={today:"today",week:"this week",month:"this month"},Xe={today:"yesterday",week:"last week",month:"last month"},Qe=["today","week","month"];function Je(e,t){const i=e.entities,r=Math.max(0,Fe(e,Ie(t,i.pv_power))||0),s=Fe(e,Ie(t,i.grid_power))||0,o=Fe(e,Ie(t,i.battery_power))||0,n=Ie(t,i.battery_soc),a=Math.max(0,s),l=Math.max(0,-s),d=Math.max(0,o),c=Math.max(0,-o),p=Ie(t,i.load_power),h=r+c+a;return{pv:r,load:void 0!==p?Math.max(0,Fe(e,p)||0):Math.max(0,r+c+a-d-l),soc:n,imp:a,exp:l,charge:d,discharge:c,supply:h,selfSufficiencyNow:h>0?(h-a)/h*100:void 0}}function Ze(e,t){return t>0?`${Math.round(e/t*100)}%`:"0%"}const et=226.2;function tt(e){return Math.max(.8,2.6-.4*e).toFixed(2)}function it(e,t,i,r){return e<=.02?{line:be,dot:"transparent",anim:"idle 3s linear infinite",tag:"idle"}:{line:i,dot:i,anim:`${t} ${tt(e)}s linear infinite`,tag:`${Ve(e)} · ${Ze(e,r)}`}}function rt(e,t){const i="v"===t?"position:absolute;left:50%;top:0;margin-left:-3.5px;width:7px;height:7px;border-radius:50%":"position:absolute;top:50%;left:0;margin-top:-3.5px;width:7px;height:7px;border-radius:50%";return L`
    <div style="${i};background:${e.dot};animation:${e.anim}"></div>
    <div style="${i};background:${e.dot};animation:${e.anim};animation-delay:-0.55s"></div>
    <div style="${i};background:${e.dot};animation:${e.anim};animation-delay:-1.1s"></div>
  `}async function st(e,t,i){const r=Array.from(new Set(t.filter(e=>!!e)));if(!r.length)return{};let s;try{s=await e.callWS({type:"recorder/statistics_during_period",start_time:i.start.toISOString(),end_time:i.end.toISOString(),statistic_ids:r,period:i.period,types:["change"]})}catch(e){return console.warn("[energy-card] statistics_during_period failed",e),{}}const o={};for(const e of r){const t=s[e]||[];o[e]=t.map(e=>({start:"number"==typeof e.start?e.start:new Date(e.start).getTime(),value:"number"==typeof e.change?e.change:0}))}return o}function ot(e){return e?e.reduce((e,t)=>e+(t.value||0),0):0}function nt(e,t){return"hour"===t?`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}-${e.getHours()}`:`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`}function at(e,t,i){return"today"===e?String(t.getHours()).padStart(2,"0"):"week"===e?t.toLocaleDateString(i,{weekday:"short"}):t.toLocaleDateString(i,{month:"short",day:"numeric"}).replace(".","")}const lt=[{name:"variant",required:!0,selector:{select:{mode:"dropdown",options:[{value:"1a",label:"1A — Wide panel (cost headline, bars, device breakdown)"},{value:"1b",label:"1B — Live flow tile (battery ring)"},{value:"1c",label:"1C — Compact cost tile (sparkline)"},{value:"2a",label:"2A — Energy flow diagram (PV/grid/inverter/battery/load)"}]}}},{name:"title",selector:{text:{}}},{name:"entities",type:"expandable",title:"Entities",schema:[{name:"pv_power",selector:{entity:{domain:"sensor"}}},{name:"grid_power",selector:{entity:{domain:"sensor"}}},{name:"battery_power",selector:{entity:{domain:"sensor"}}},{name:"battery_soc",selector:{entity:{domain:"sensor"}}},{name:"load_power",selector:{entity:{domain:"sensor"}}},{name:"solar_energy",selector:{entity:{domain:"sensor"}}},{name:"grid_import_energy",selector:{entity:{domain:"sensor"}}},{name:"grid_export_energy",selector:{entity:{domain:"sensor"}}}]},{name:"",type:"grid",schema:[{name:"import_rate",selector:{number:{mode:"box",step:.001,min:0}}},{name:"export_rate",selector:{number:{mode:"box",step:.001,min:0}}},{name:"currency",selector:{text:{}}},{name:"power_unit",selector:{select:{mode:"dropdown",options:["W","kW"]}}},{name:"battery_capacity_kwh",selector:{number:{mode:"box",step:.1,min:0}}}]}],dt={variant:"Card layout",title:"Title (optional)",pv_power:"Solar power (W)",grid_power:"Grid power, signed: + import / − export (W)",battery_power:"Battery power, signed: + charging / − discharging (W)",battery_soc:"Battery state of charge (%)",load_power:"House load (W) — optional, derived if omitted",solar_energy:"Solar energy, cumulative (kWh)",grid_import_energy:"Grid import energy, cumulative (kWh)",grid_export_energy:"Grid export energy, cumulative (kWh)",import_rate:"Import rate (currency/kWh)",export_rate:"Export rate (currency/kWh)",currency:"Currency symbol",power_unit:"Power entity unit",battery_capacity_kwh:"Battery capacity (kWh)"};function ct(e){return dt[e.name]||e.name}let pt=class extends ae{constructor(){super(...arguments),this._valueChanged=e=>{e.stopPropagation(),this._fire(e.detail.value)}}setConfig(e){this._config=e}_fire(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_addDevice(){const e=[...this._config.devices||[],{name:"New device",entity:""}];this._fire({...this._config,devices:e})}_removeDevice(e){const t=(this._config.devices||[]).filter((t,i)=>i!==e);this._fire({...this._config,devices:t})}_updateDevice(e,t){const i=(this._config.devices||[]).map((i,r)=>r===e?{...i,...t}:i);this._fire({...this._config,devices:i})}render(){if(!this._config)return L``;const e=!!customElements.get("ha-form"),t=!!customElements.get("ha-selector");return L`
      ${e?L`<ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${lt}
            .computeLabel=${ct}
            @value-changed=${this._valueChanged}
          ></ha-form>`:this._fallbackForm()}

      <div class="devices">
        <div class="devices-title">Device breakdown (1A only, optional)</div>
        ${(this._config.devices||[]).map((e,i)=>L`
            <div class="device-row">
              <input
                .value=${e.name}
                placeholder="Name"
                @change=${e=>this._updateDevice(i,{name:e.target.value})}
              />
              ${t?L`<ha-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"sensor"}}}
                    .value=${e.entity}
                    @value-changed=${e=>this._updateDevice(i,{entity:e.detail.value??""})}
                  ></ha-selector>`:L`<input
                    .value=${e.entity}
                    placeholder="sensor.device_energy"
                    @change=${e=>this._updateDevice(i,{entity:e.target.value})}
                  />`}
              <button type="button" title="Remove" @click=${()=>this._removeDevice(i)}>✕</button>
            </div>
          `)}
        <button type="button" class="add" @click=${()=>this._addDevice()}>+ Add device</button>
      </div>
    `}_fallbackForm(){const e=this._config,t=(e,t,i,r)=>L`
      <label class="row">
        <span>${e}</span>
        <input .value=${i??""} @change=${e=>r(e.target.value)} />
      </label>
    `;return L`
      <div class="fallback-note">Entity pickers unavailable outside the Home Assistant frontend — using plain text fields.</div>
      ${t("Card layout (1a/1b/1c/2a)",0,e.variant,t=>this._fire({...e,variant:t}))}
      ${t("Solar power entity",0,e.entities.pv_power,t=>this._fire({...e,entities:{...e.entities,pv_power:t}}))}
      ${t("Grid power entity",0,e.entities.grid_power,t=>this._fire({...e,entities:{...e.entities,grid_power:t}}))}
      ${t("Battery power entity",0,e.entities.battery_power,t=>this._fire({...e,entities:{...e.entities,battery_power:t}}))}
      ${t("Battery SoC entity",0,e.entities.battery_soc,t=>this._fire({...e,entities:{...e.entities,battery_soc:t}}))}
      ${t("Solar energy entity",0,e.entities.solar_energy,t=>this._fire({...e,entities:{...e.entities,solar_energy:t}}))}
      ${t("Grid import energy entity",0,e.entities.grid_import_energy,t=>this._fire({...e,entities:{...e.entities,grid_import_energy:t}}))}
      ${t("Grid export energy entity",0,e.entities.grid_export_energy,t=>this._fire({...e,entities:{...e.entities,grid_export_energy:t}}))}
    `}};pt.styles=n`
    :host {
      display: block;
    }
    .devices {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color, #444);
    }
    .devices-title {
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--secondary-text-color);
    }
    .device-row {
      display: grid;
      grid-template-columns: 1fr 1.4fr auto;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .device-row ha-selector {
      display: block;
      width: 100%;
    }
    input {
      font: inherit;
      padding: 6px 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #444);
      background: var(--card-background-color, transparent);
      color: var(--primary-text-color, inherit);
    }
    button {
      font: inherit;
      cursor: pointer;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #444);
      background: transparent;
      color: inherit;
    }
    button.add {
      padding: 6px 10px;
    }
    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      margin-bottom: 10px;
    }
    .fallback-note {
      font-size: 12px;
      opacity: 0.7;
      margin-bottom: 8px;
    }
  `,e([he({attribute:!1})],pt.prototype,"hass",void 0),e([ge()],pt.prototype,"_config",void 0),pt=e([de("energy-card-editor")],pt);const ht={"1a":720,"1b":340,"1c":280,"2a":720};let gt=class extends ae{constructor(){super(...arguments),this.range="today",this.mode="cost",this.sel=null,this.showDevices=!1,this.loading=!1,this._dataByRange={},this._fetchToken=0}get config(){return this._config}get rangeData(){return this._dataByRange[this.range]}static getStubConfig(){return{variant:"1a",entities:{},import_rate:.28,export_rate:.155}}static getConfigElement(){return document.createElement("energy-card-editor")}setConfig(e){if(!e?.variant)throw new Error("energy-card: `variant` is required (one of 1a, 1b, 1c, 2a)");this._config={...e,entities:e.entities??{}},this._dataByRange={},this.sel=null,this.showDevices=!1,this.range="today",this._loadRange(this.range)}getCardSize(){return"2a"===this._config?.variant?6:"1a"===this._config?.variant?5:3}connectedCallback(){super.connectedCallback(),this._config&&this._loadRange(this.range),this._refreshTimer=setInterval(()=>this._loadRange(this.range,!0),3e5)}disconnectedCallback(){super.disconnectedCallback(),this._refreshTimer&&clearInterval(this._refreshTimer)}updated(e){e.has("hass")&&this.hass&&this._config&&!this._dataByRange[this.range]&&this._loadRange(this.range)}setRange(e){this.range!==e&&(this.range=e,this.sel=null,this._loadRange(e))}setMode(e){this.mode=e}setSel(e){this.sel=e}toggleDevices(){this.showDevices=!this.showDevices}async _loadRange(e,t=!1){if(!this.hass||!this._config)return;if(!t&&this._dataByRange[e])return;const i=this._config.entities,r=function(e,t=new Date){if("today"===e){const e=new Date(t);e.setHours(0,0,0,0);const i=new Date(e);return i.setDate(i.getDate()+1),{start:e,end:i,period:"hour"}}if("week"===e){const e=(t.getDay()+6)%7,i=new Date(t);i.setHours(0,0,0,0),i.setDate(i.getDate()-e);const r=new Date(i);return r.setDate(r.getDate()+7),{start:i,end:r,period:"day"}}return{start:new Date(t.getFullYear(),t.getMonth(),1),end:new Date(t.getFullYear(),t.getMonth()+1,1),period:"day"}}(e),s=function(e){const t=e.end.getTime()-e.start.getTime();return{start:new Date(e.start.getTime()-t),end:new Date(e.start.getTime()),period:e.period}}(r),o=[i.solar_energy,i.grid_import_energy,i.grid_export_energy],n=++this._fetchToken;this.loading=!0;const[a,l]=await Promise.all([st(this.hass,o,r),st(this.hass,o,s)]);if(n!==this._fetchToken)return;const d=function(e,t,i,r,s,o="en-US"){const n=new Map;for(const e of i){const i=new Date(e.start);n.set(nt(i,t.period),(n.get(nt(i,t.period))||0)+e.value)}const a=new Map;for(const e of r){const i=new Date(e.start);a.set(nt(i,t.period),(a.get(nt(i,t.period))||0)+e.value)}const l=new Map;for(const e of s){const i=new Date(e.start);l.set(nt(i,t.period),(l.get(nt(i,t.period))||0)+e.value)}const d=[],c=new Date(t.start);for(;c<t.end;){const i=nt(c,t.period),r=n.get(i)||0,s=l.get(i)||0,p=Math.max(0,r-s),h=a.get(i)||0;d.push({label:at(e,c,o),solar:p,grid:h}),"hour"===t.period?c.setHours(c.getHours()+1):c.setDate(c.getDate()+1)}return d}(e,r,i.solar_energy&&a[i.solar_energy]||[],i.grid_import_energy&&a[i.grid_import_energy]||[],i.grid_export_energy&&a[i.grid_export_energy]||[],this.hass.locale?.language),c=ot(i.solar_energy?a[i.solar_energy]:void 0),p=ot(i.grid_import_energy?a[i.grid_import_energy]:void 0),h=ot(i.grid_export_energy?a[i.grid_export_energy]:void 0),g=Math.max(0,c-h),f=ot(i.solar_energy?l[i.solar_energy]:void 0),y=ot(i.grid_import_energy?l[i.grid_import_energy]:void 0),u=ot(i.grid_export_energy?l[i.grid_export_energy]:void 0),x={rows:d,solarUsed:g,gridImported:p,exported:h,totalKwh:g+p,prevTotalKwh:Math.max(0,f-u)+y};if(this._config.devices?.length){const e=this._config.devices.map(e=>e.entity),t=await st(this.hass,e,r);if(n!==this._fetchToken)return;x.devices=this._config.devices.map(e=>({name:e.name,color:e.color,entity:e.entity,kwh:ot(t[e.entity])}))}this._dataByRange={...this._dataByRange,[e]:x},this.loading=!1}render(){if(!this._config)return L``;const e=this._config.variant;let t;switch(e){case"1a":t=function(e){const t=e.rangeData,i=e.mode,r=t?.rows??[],s=Math.max(1e-6,...r.map(e=>e.solar+e.grid)),o=We(e.config),n=Le(e.config),a=t?.gridImported??0,l=t?.solarUsed??0,d=t?.exported??0,c=t?.totalKwh??0,p=t?.prevTotalKwh??0,h=a*o,g=p>0?Math.round((c-p)/p*100):0,f=c>0?Math.round(l/c*100):0,y=e.sel,u=null!==y?r[y]:void 0,x=u?{label:"today"===e.range?`${u.label}:00`:u.label,headline:"cost"===i?`${qe(e.config,u.grid*o)} from grid`:`${Ye(u.solar+u.grid)} used`,detail:`${Ye(u.solar)} solar · ${Ye(u.grid)} grid`}:null,v=null!==y&&r.length?(y+.5)/r.length*100+"%":"50%",$=t=>{if(!r.length)return"";const i=r[t].label;return"today"===e.range?`${i}:00`:i},m=t?.devices??[],w=Math.max(1e-6,...m.map(e=>e.kwh));return L`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16.8px">
        <div style="display:flex;flex-direction:column;gap:8.4px">
          <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$e}">
            Energy spend · ${Ke[e.range]}
          </div>
          <div style="display:flex;align-items:baseline;gap:8.4px">
            <div style="font-size:44px;font-weight:500;line-height:1;letter-spacing:-0.02em;color:${xe}">
              ${"cost"===i?qe(e.config,h):Ye(c)}
            </div>
            <div style="font-size:13px;color:${$e}">
              ${"cost"===i?`${Ye(c)} used`:`${qe(e.config,h)} billed`}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:5.6px;font-size:12px;color:${$e}">
            <span style="color:${g>0?Ae:_e}">${g>0?"+":""}${g}%</span>
            <span>vs. ${Xe[e.range]}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8.4px">
          <div style="display:flex;gap:2px;padding:2px;background:#1b1d29;border-radius:8px;box-shadow:inset 0 0 0 1px ${be}">
            ${Qe.map(t=>L`
                <button
                  type="button"
                  @click=${()=>e.setRange(t)}
                  style="border:0;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;padding:5.6px 11.2px;border-radius:6px;background:${e.range===t?"#3a3d4d":"transparent"};color:${e.range===t?xe:$e}"
                >
                  ${t[0].toUpperCase()}${t.slice(1)}
                </button>
              `)}
          </div>
          <div style="display:flex;gap:2px;padding:2px;background:#1b1d29;border-radius:8px;box-shadow:inset 0 0 0 1px ${be}">
            <button
              type="button"
              @click=${()=>e.setMode("cost")}
              style="border:0;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;padding:5.6px 11.2px;border-radius:6px;background:${"cost"===i?"#3a3d4d":"transparent"};color:${"cost"===i?xe:$e}"
            >
              Cost
            </button>
            <button
              type="button"
              @click=${()=>e.setMode("kwh")}
              style="border:0;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;padding:5.6px 11.2px;border-radius:6px;background:${"kwh"===i?"#3a3d4d":"transparent"};color:${"kwh"===i?xe:$e}"
            >
              kWh
            </button>
          </div>
        </div>
      </div>

      <div style="position:relative;height:168px;display:flex;align-items:flex-end;gap:3px;padding-top:28px">
        ${r.map((t,i)=>{const r=null===y||y===i?1:.42;return L`
            <button
              type="button"
              @click=${()=>e.setSel(y===i?null:i)}
              title=${t.label}
              style="flex:1 1 0;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:1px;background:transparent;border:0;padding:0;cursor:pointer;opacity:${r};transition:opacity 120ms ease"
            >
              <div style="width:100%;border-radius:3px 3px 0 0;background:${me};height:${t.grid/s*138}px"></div>
              <div style="width:100%;background:${Ae};height:${t.solar/s*138}px"></div>
              <div style="width:100%;height:2px;border-radius:0 0 2px 2px;background:${y===i?ye:"transparent"}"></div>
            </button>
          `})}
        ${x?L`
              <div
                style="position:absolute;top:0;left:${v};transform:translateX(-50%);background:#2c2f3d;box-shadow:0 0 0 1px ${we},0 6px 18px rgba(0,0,0,0.55);border-radius:8px;padding:8.4px 11.2px;display:flex;flex-direction:column;gap:2.8px;white-space:nowrap;pointer-events:none"
              >
                <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${$e}">${x.label}</div>
                <div style="font-size:15px;font-weight:500;color:${xe}">${x.headline}</div>
                <div style="font-size:11px;color:${ve}">${x.detail}</div>
              </div>
            `:V}
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:${me};margin-top:-8.4px">
        <span>${$(0)}</span>
        <span>${$(Math.floor((r.length-1)/2))}</span>
        <span>${$(r.length-1)}</span>
      </div>

      <div style="height:1px;background:linear-gradient(90deg, transparent, ${ue} 48px, ${ue} calc(100% - 48px), transparent)"></div>

      <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:16.8px">
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${$e}">
            <span style="width:8px;height:8px;border-radius:2px;background:${Ae}"></span>Solar used
          </div>
          <div style="font-size:18px;font-weight:500;color:${fe}">
            ${"cost"===i?`${qe(e.config,l*o)} saved`:Ye(l)}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${$e}">
            <span style="width:8px;height:8px;border-radius:2px;background:${me}"></span>From grid
          </div>
          <div style="font-size:18px;font-weight:500;color:${fe}">
            ${"cost"===i?qe(e.config,h):Ye(a)}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${$e}">
            <span style="width:8px;height:8px;border-radius:2px;background:${ye}"></span>Exported
          </div>
          <div style="font-size:18px;font-weight:500;color:${fe}">
            ${"cost"===i?qe(e.config,d*n):Ye(d)}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="font-size:11px;color:${$e}">Self-sufficiency</div>
          <div style="display:flex;align-items:center;gap:8.4px">
            <div style="font-size:18px;font-weight:500;color:${fe}">${Ge(f)}</div>
            <div style="flex:1;height:4px;border-radius:2px;background:${be};overflow:hidden">
              <div style="height:100%;border-radius:2px;background:${ye};width:${Ge(f)}"></div>
            </div>
          </div>
        </div>
      </div>

      ${e.config.devices?.length?L`
            <button
              type="button"
              @click=${()=>e.toggleDevices()}
              style="align-self:flex-start;font-family:inherit;font-size:12px;font-weight:500;color:${_e};background:transparent;border:1px solid ${ke};border-radius:8px;padding:5.6px 11.2px;cursor:pointer"
            >
              ${e.showDevices?"Hide device breakdown":"Show device breakdown"}
            </button>
            ${e.showDevices?L`
                  <div style="display:flex;flex-direction:column;gap:8.4px;padding-top:2.8px">
                    ${m.map(t=>L`
                        <div style="display:grid;grid-template-columns:132px 1fr 84px;align-items:center;gap:11.2px">
                          <div style="font-size:13px;color:${ve}">${t.name}</div>
                          <div style="height:6px;border-radius:3px;background:#1b1d29">
                            <div style="height:100%;border-radius:3px;background:${t.color||ye};width:${t.kwh/w*100}%"></div>
                          </div>
                          <div style="font-size:13px;text-align:right;color:${fe};font-variant-numeric:tabular-nums">
                            ${"cost"===i?qe(e.config,t.kwh*o):Ye(t.kwh)}
                          </div>
                        </div>
                      `)}
                  </div>
                `:V}
          `:V}
    </div>
  `}(this);break;case"1b":t=function(e){const t=Je(e.config,e.hass),i=We(e.config),r=Le(e.config),s=t.imp*i-t.exp*r,o=Math.max(t.pv,t.load,t.imp,t.exp,t.charge,t.discharge,.01),n=t.imp>.01?Ve(t.imp):t.exp>.01?`−${Ve(t.exp)}`:"idle",a=t.charge>.01?`+${Ve(t.charge)}`:t.discharge>.01?`−${Ve(t.discharge)}`:"idle",l=t.soc,d=void 0!==l?`${(l/100*et).toFixed(1)} 226.2`:"0 226.2",c=e.config.battery_capacity_kwh,p=void 0!==c&&void 0!==l?c*l/100:void 0;let h=null,g=null;if(void 0!==l){if(t.charge>.01&&void 0!==c){const e=c*(100-l)/100/t.charge,i=new Date(Date.now()+36e5*e);h=`Charging to 100% by ${i.getHours().toString().padStart(2,"0")}:${i.getMinutes().toString().padStart(2,"0")}`}else h=t.charge>.01?"Charging":t.discharge>.01?"Discharging":"Idle";if(void 0!==p){const e=t.load>.01?p/t.load:void 0;g=`${Ye(p)} stored${void 0!==e?` · ${e.toFixed(1)} h of house use`:""}`}}const f=e.rangeData,y=f?f.gridImported*i:void 0,u=f?.totalKwh;return L`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$e}">Right now</div>
        <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${ve}">
          <span style="width:6px;height:6px;border-radius:50%;background:${ye};box-shadow:0 0 8px ${ye}"></span>live
        </div>
      </div>

      <div style="display:flex;align-items:baseline;gap:8.4px">
        <div style="font-size:40px;font-weight:500;line-height:1;letter-spacing:-0.02em;color:${xe}">${t.load.toFixed(2)}</div>
        <div style="font-size:15px;color:${$e}">kW drawn</div>
      </div>
      <div style="font-size:13px;color:${ve}">
        ${s>=0?L`Costing <span style="color:${xe}">${qe(e.config,s)}/h</span> at the current tariff`:L`Earning <span style="color:${xe}">${qe(e.config,-s)}/h</span> on export`}
      </div>

      <div style="display:flex;flex-direction:column;gap:11.2px;padding:16.8px 0;border-top:1px solid ${ue};border-bottom:1px solid ${ue}">
        <div style="display:grid;grid-template-columns:92px 1fr 66px;align-items:center;gap:11.2px">
          <div style="font-size:13px;color:${ve}">Solar</div>
          <div style="height:6px;border-radius:3px;background:#1b1d29"><div style="height:100%;width:${t.pv/o*100}%;border-radius:3px;background:${Ae}"></div></div>
          <div style="font-size:13px;text-align:right;color:${fe};font-variant-numeric:tabular-nums">${Ve(t.pv)}</div>
        </div>
        <div style="display:grid;grid-template-columns:92px 1fr 66px;align-items:center;gap:11.2px">
          <div style="font-size:13px;color:${ve}">Grid</div>
          <div style="height:6px;border-radius:3px;background:#1b1d29"><div style="height:100%;width:${Math.max(t.imp,t.exp)/o*100}%;border-radius:3px;background:${me}"></div></div>
          <div style="font-size:13px;text-align:right;color:${t.imp>.01||t.exp>.01?fe:me};font-variant-numeric:tabular-nums">${n}</div>
        </div>
        <div style="display:grid;grid-template-columns:92px 1fr 66px;align-items:center;gap:11.2px">
          <div style="font-size:13px;color:${ve}">Battery</div>
          <div style="height:6px;border-radius:3px;background:#1b1d29"><div style="height:100%;width:${Math.max(t.charge,t.discharge)/o*100}%;border-radius:3px;background:${ye}"></div></div>
          <div style="font-size:13px;text-align:right;color:${t.charge>.01||t.discharge>.01?_e:me};font-variant-numeric:tabular-nums">${a}</div>
        </div>
      </div>

      ${void 0!==l?L`
            <div style="display:flex;align-items:center;gap:16.8px">
              <div style="position:relative;width:84px;height:84px;flex:0 0 auto">
                <svg viewBox="0 0 84 84" style="width:84px;height:84px;transform:rotate(-90deg)">
                  <circle cx="42" cy="42" r="36" fill="none" stroke="${be}" stroke-width="7"></circle>
                  <circle cx="42" cy="42" r="36" fill="none" stroke="${ye}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${d}"></circle>
                </svg>
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px">
                  <div style="font-size:18px;font-weight:500;color:${xe}">${Math.round(l)}%</div>
                  <div style="font-size:10px;color:${$e}">battery</div>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:5.6px">
                ${h?L`<div style="font-size:13px;color:${fe}">${h}</div>`:V}
                ${g?L`<div style="font-size:12px;color:${$e}">${g}</div>`:V}
              </div>
            </div>
          `:V}

      ${void 0!==y?L`
            <div style="display:flex;align-items:baseline;justify-content:space-between">
              <div style="font-size:12px;color:${$e}">Today so far</div>
              <div style="font-size:15px;font-weight:500;color:${xe}">
                ${qe(e.config,y)} <span style="font-size:12px;font-weight:400;color:${$e}">· ${Ye(u??0)}</span>
              </div>
            </div>
          `:V}
    </div>
  `}(this);break;case"1c":t=function(e){const t=e.rangeData,i=We(e.config),r=Le(e.config),s=t?.gridImported??0,o=t?.exported??0,n=t?.solarUsed??0,a=t?.totalKwh??0,l=t?.prevTotalKwh??0,d=s*i,c=l>0?Math.round((a-l)/l*100):0,p=a>0?Math.round(n/a*100):0,h=t?.rows??[],g=Math.max(1e-6,...h.map(e=>e.solar+e.grid)),f=h.map(e=>({h:Math.max(3,(e.solar+e.grid)/g*52),color:e.grid>e.solar?me:Ae})),y=Je(e.config,e.hass),u=y.soc,x=y.charge>.01?"charging":y.discharge>.01?"discharging":"idle";return L`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$e}">Today</div>
        <div style="font-size:11px;color:${me}">${e.config.currency??"$"}${i.toFixed(2)}/kWh</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="font-size:40px;font-weight:500;line-height:1;letter-spacing:-0.02em;color:${xe}">${qe(e.config,d)}</div>
        <div style="font-size:12px;color:${$e}">
          <span style="color:${_e}">${c>0?"+":""}${c}%</span> vs. yesterday · ${Ye(a)}
        </div>
      </div>

      <div style="display:flex;align-items:flex-end;gap:2px;height:52px">
        ${f.map(e=>L`<div style="flex:1 1 0;border-radius:2px;background:${e.color};height:${e.h}px"></div>`)}
      </div>

      <div style="display:flex;flex-direction:column;gap:8.4px;padding-top:11.2px;border-top:1px solid ${ue}">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
          <span style="color:${$e}">Self-sufficiency</span><span style="color:${fe}">${p}%</span>
        </div>
        ${void 0!==u?L`
              <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
                <span style="color:${$e}">Battery</span><span style="color:${fe}">${Math.round(u)}% · ${x}</span>
              </div>
            `:V}
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
          <span style="color:${$e}">Exported</span><span style="color:${fe}">${Ye(o)} · ${qe(e.config,o*r)}</span>
        </div>
      </div>
    </div>
  `}(this);break;case"2a":t=function(e){const t=Je(e.config,e.hass),i=it(t.pv,"fdown",Se,t.supply),r=t.imp>.02?it(t.imp,"fright",Ce,t.supply):it(t.exp,"fleft",Me,t.supply),s=it(t.load,"fright",Ue,t.supply),o=t.charge>.02?it(t.charge,"fdown",Ne,t.supply):it(t.discharge,"fup",Ne,t.supply),n=t.exp>.02?"Solar covers the house and charges the battery — surplus is going back to the grid.":t.discharge>.02&&t.imp>.02?"Battery is carrying most of the load; the grid tops up the rest.":t.pv>.02&&t.imp<=.02?"Solar is covering the house.":"Drawing from the grid.",a=void 0!==t.selfSufficiencyNow?`${Math.round(t.selfSufficiencyNow)}%`:"—",l=t.soc??0,d=t.imp>.02?Ve(t.imp):t.exp>.02?Ve(t.exp):Ve(0),c=t.exp>.02?"exporting":t.imp>.02?"importing":"idle",p=t.charge>.02?`+${Ve(t.charge)}`:t.discharge>.02?`−${Ve(t.discharge)}`:Ve(0),h=t.charge>.02?"charging":t.discharge>.02?"discharging":"idle";return L`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$e}">Energy flow</div>
        <div style="font-size:13px;color:${ve}">${n}</div>
      </div>

      <div style="overflow-x:auto;overflow-y:hidden">
      <div
        style="display:grid;grid-template-columns:168px 84px 168px 84px 168px;grid-template-rows:150px 84px 168px 84px 150px;justify-content:center;align-items:start;padding:5.6px 0;width:672px;max-width:none;margin:0 auto"
      >
        <div style="grid-column:3;grid-row:1;align-self:end;display:flex;flex-direction:column-reverse;align-items:center;gap:4px">
          <svg viewBox="12 14 116 116" style="width:96px;height:96px;overflow:visible">
            <circle cx="68" cy="70" r="52" fill="${ze}" stroke="${Se}" stroke-width="3"></circle>
            <circle cx="68" cy="48" r="8" fill="none" stroke="${Ee}" stroke-width="2"></circle>
            <line x1="68" y1="35" x2="68" y2="31" stroke="${Ee}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="79" y1="39" x2="82" y2="36" stroke="${Ee}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="83" y1="53" x2="87" y2="53" stroke="${Ee}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="57" y1="39" x2="54" y2="36" stroke="${Ee}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="53" y1="53" x2="49" y2="53" stroke="${Ee}" stroke-width="1.8" stroke-linecap="round"></line>
            <rect x="46" y="62" width="44" height="20" rx="3" fill="none" stroke="${Ee}" stroke-width="1.8"></rect>
            <line x1="61" y1="62" x2="61" y2="82" stroke="${Ee}" stroke-width="1.2" opacity="0.7"></line>
            <line x1="75" y1="62" x2="75" y2="82" stroke="${Ee}" stroke-width="1.2" opacity="0.7"></line>
            <line x1="46" y1="72" x2="90" y2="72" stroke="${Ee}" stroke-width="1.2" opacity="0.7"></line>
            <circle cx="112" cy="102" r="11" fill="${Se}"></circle>
            <text x="112" y="106" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">PV</text>
          </svg>
          <div style="font-size:11px;color:${me}">${t.pv>.02?`${(e=>Ze(e,t.supply))(t.pv)} of supply`:"no production"}</div>
          <div style="font-size:20px;font-weight:500;color:${xe};font-variant-numeric:tabular-nums;line-height:1.1">${Ve(t.pv)}</div>
          <div style="font-size:12px;font-weight:500;color:${Ee}">Solar PV</div>
        </div>

        <div style="grid-column:3;grid-row:2;height:84px;position:relative;display:flex;justify-content:center">
          <div style="width:2px;height:100%;background:linear-gradient(180deg, transparent, ${i.line} 22%, ${i.line} 78%, transparent)"></div>
          ${rt(i,"v")}
          <div style="position:absolute;left:50%;top:50%;margin-left:14px;transform:translateY(-50%);font-size:11px;color:${$e};font-variant-numeric:tabular-nums;white-space:nowrap">${i.tag}</div>
        </div>

        <div style="grid-column:1;grid-row:3;display:flex;flex-direction:column;align-items:center;gap:4px">
          <svg viewBox="148 14 116 116" style="width:96px;height:96px;margin-top:6px;overflow:visible">
            <circle cx="204" cy="70" r="52" fill="${De}" stroke="${Ce}" stroke-width="3"></circle>
            <g fill="none" stroke="${Me}" stroke-width="2" stroke-linecap="round">
              <line x1="192" y1="94" x2="192" y2="60"></line>
              <line x1="184" y1="70" x2="200" y2="70"></line>
              <line x1="185" y1="78" x2="199" y2="78"></line>
              <line x1="184" y1="70" x2="192" y2="60"></line>
              <line x1="200" y1="70" x2="192" y2="60"></line>
              <line x1="216" y1="94" x2="216" y2="60"></line>
              <line x1="208" y1="70" x2="224" y2="70"></line>
              <line x1="209" y1="78" x2="223" y2="78"></line>
              <line x1="208" y1="70" x2="216" y2="60"></line>
              <line x1="224" y1="70" x2="216" y2="60"></line>
            </g>
            <path d="M184 70 Q204 80 224 70" fill="none" stroke="${Me}" stroke-width="1.4"></path>
            <path d="M185 78 Q204 87 223 78" fill="none" stroke="${Me}" stroke-width="1.4"></path>
            <circle cx="248" cy="102" r="11" fill="${Ce}"></circle>
            <text x="248" y="106" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">AC</text>
          </svg>
          <div style="font-size:12px;font-weight:500;color:#b5d4f4">Grid</div>
          <div style="font-size:20px;font-weight:500;color:${xe};font-variant-numeric:tabular-nums;line-height:1.1">${d}</div>
          <div style="font-size:11px;color:${me}">${c}</div>
        </div>

        <div style="grid-column:2;grid-row:3;height:108px;position:relative;display:flex;align-items:center">
          <div style="height:2px;width:100%;background:linear-gradient(90deg, transparent, ${r.line} 22%, ${r.line} 78%, transparent)"></div>
          ${rt(r,"h")}
          <div style="position:absolute;left:50%;top:50%;margin-top:11px;transform:translateX(-50%);font-size:11px;color:${$e};font-variant-numeric:tabular-nums;white-space:nowrap">${r.tag}</div>
        </div>

        <div style="grid-column:3;grid-row:3;display:flex;flex-direction:column;align-items:center;gap:4px">
          <svg viewBox="278 8 132 132" style="width:108px;height:108px;overflow:visible">
            <circle cx="340" cy="70" r="58" fill="${Te}" stroke="${Pe}" stroke-width="3"></circle>
            <rect x="308" y="54" width="64" height="34" rx="6" fill="none" stroke="${Re}" stroke-width="2"></rect>
            <polyline points="315,80 315,64 323,64 323,80 329,80" fill="none" stroke="${Re}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
            <line x1="340" y1="57" x2="340" y2="85" stroke="${Re}" stroke-width="1" stroke-dasharray="2.5 2" opacity="0.45"></line>
            <path d="M348,71 Q353,60 358,71 Q363,82 368,71" fill="none" stroke="${Re}" stroke-width="2" stroke-linecap="round"></path>
            <circle cx="392" cy="106" r="12" fill="${Pe}"></circle>
            <text x="392" y="110" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">INV</text>
          </svg>
          <div style="font-size:12px;font-weight:500;color:#9fe1cb">Hybrid inverter</div>
          <div style="font-size:20px;font-weight:500;color:${xe};font-variant-numeric:tabular-nums;line-height:1.1">${Ve(t.supply)}</div>
          <div style="font-size:11px;color:${me}">throughput</div>
        </div>

        <div style="grid-column:4;grid-row:3;height:108px;position:relative;display:flex;align-items:center">
          <div style="height:2px;width:100%;background:linear-gradient(90deg, transparent, ${s.line} 22%, ${s.line} 78%, transparent)"></div>
          ${rt(s,"h")}
          <div style="position:absolute;left:50%;top:50%;margin-top:11px;transform:translateX(-50%);font-size:11px;color:${$e};font-variant-numeric:tabular-nums;white-space:nowrap">${s.tag}</div>
        </div>

        <div style="grid-column:5;grid-row:3;display:flex;flex-direction:column;align-items:center;gap:4px">
          <svg viewBox="420 14 116 116" style="width:96px;height:96px;margin-top:6px;overflow:visible">
            <circle cx="476" cy="70" r="52" fill="${Oe}" stroke="${Ue}" stroke-width="3"></circle>
            <polygon points="476,46 500,60 500,90 452,90 452,60" fill="none" stroke="${He}" stroke-width="2" stroke-linejoin="round"></polygon>
            <rect x="468" y="72" width="16" height="18" rx="2" fill="none" stroke="${He}" stroke-width="1.8"></rect>
            <rect x="457" y="66" width="10" height="9" rx="1.5" fill="none" stroke="${He}" stroke-width="1.4"></rect>
            <line x1="462" y1="66" x2="462" y2="75" stroke="${He}" stroke-width="1"></line>
            <line x1="457" y1="70.5" x2="467" y2="70.5" stroke="${He}" stroke-width="1"></line>
            <circle cx="490" cy="66" r="6" fill="none" stroke="${He}" stroke-width="1.6"></circle>
            <line x1="487" y1="71.5" x2="493" y2="71.5" stroke="${He}" stroke-width="1.6" stroke-linecap="round"></line>
            <line x1="487.5" y1="75" x2="492.5" y2="75" stroke="${He}" stroke-width="1.2" stroke-linecap="round"></line>
            <circle cx="520" cy="102" r="11" fill="${Ue}"></circle>
            <text x="520" y="106" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">~W</text>
          </svg>
          <div style="font-size:12px;font-weight:500;color:#c0dd97">House load</div>
          <div style="font-size:20px;font-weight:500;color:${xe};font-variant-numeric:tabular-nums;line-height:1.1">${Ve(t.load)}</div>
          <div style="font-size:11px;color:${me}">current draw</div>
        </div>

        <div style="grid-column:3;grid-row:4;height:84px;position:relative;display:flex;justify-content:center">
          <div style="width:2px;height:100%;background:linear-gradient(180deg, transparent, ${o.line} 22%, ${o.line} 78%, transparent)"></div>
          ${rt(o,"v")}
          <div style="position:absolute;left:50%;top:50%;margin-left:14px;transform:translateY(-50%);font-size:11px;color:${$e};font-variant-numeric:tabular-nums;white-space:nowrap">${o.tag}</div>
        </div>

        <div style="grid-column:3;grid-row:5;display:flex;flex-direction:column;align-items:center;gap:4px">
          <svg viewBox="556 14 116 116" style="width:96px;height:96px;overflow:visible">
            <circle cx="612" cy="70" r="52" fill="${Be}" stroke="${Ne}" stroke-width="3"></circle>
            <rect x="588" y="60" width="38" height="22" rx="4" fill="none" stroke="${je}" stroke-width="2"></rect>
            <rect x="626" y="66" width="6" height="10" rx="2.5" fill="none" stroke="${je}" stroke-width="1.8"></rect>
            <rect x="592" y="64" width="8" height="14" rx="1.8" fill="${je}"></rect>
            <rect x="602" y="64" width="8" height="14" rx="1.8" fill="${je}" opacity="0.55"></rect>
            <rect x="612" y="64" width="6" height="14" rx="1.8" fill="${je}" opacity="0.22"></rect>
            <polygon points="608,42 602,53 607,53 604,66 615,51 609,51 613,42" fill="${je}" opacity="0.85"></polygon>
            <circle cx="656" cy="102" r="11" fill="${Ne}"></circle>
            <text x="656" y="106" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">DC</text>
          </svg>
          <div style="display:flex;align-items:baseline;gap:5.6px">
            <div style="font-size:12px;font-weight:500;color:#f4c0d1">Battery</div>
            <div style="font-size:12px;color:${je};font-variant-numeric:tabular-nums">${Math.round(l)}%</div>
          </div>
          <div style="width:108px;height:4px;border-radius:2px;background:${be};overflow:hidden">
            <div style="height:100%;border-radius:2px;background:${Ne};width:${l}%"></div>
          </div>
          <div style="display:flex;align-items:baseline;gap:5.6px">
            <div style="font-size:20px;font-weight:500;color:${xe};font-variant-numeric:tabular-nums;line-height:1.1">${p}</div>
            <div style="font-size:11px;color:${me}">${h}</div>
          </div>
        </div>
      </div>
      </div>

      <div style="height:1px;background:linear-gradient(90deg, transparent, ${ue} 48px, ${ue} calc(100% - 48px), transparent)"></div>

      <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:${$e}">
        <div style="display:flex;align-items:center;gap:16.8px">
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${Se}"></span>solar DC</span>
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${Ce}"></span>grid AC</span>
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${Ne}"></span>battery</span>
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${Ue}"></span>house</span>
        </div>
        <div>Self-sufficiency now <span style="color:${fe}">${a}</span></div>
      </div>
    </div>
  `}(this);break;default:return L`<div style="padding:16px;color:${Se}">energy-card: unknown variant "${e}"</div>`}return L`
      <div class="energy-card" style="max-width:${ht[e]}px">
        ${this._config.title?L`<div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$e};padding:0 0 12px">
              ${this._config.title}
            </div>`:V}
        ${t}
      </div>
    `}};gt.styles=n`
    :host {
      display: block;
      font-family: "Inter", system-ui, sans-serif;
    }
    .energy-card {
      width: 100%;
      background: #161826;
      color: #e9e9ed;
      border-radius: 14px;
      box-shadow: 0 0 0 1px #3f424d, 0 6px 18px rgba(0, 0, 0, 0.45);
      padding: 22.4px;
      box-sizing: border-box;
    }
    button {
      font-family: inherit;
    }
    @keyframes fdown {
      0% { transform: translateY(-8px); opacity: 0; }
      18% { opacity: 1; }
      82% { opacity: 1; }
      100% { transform: translateY(84px); opacity: 0; }
    }
    @keyframes fup {
      0% { transform: translateY(84px); opacity: 0; }
      18% { opacity: 1; }
      82% { opacity: 1; }
      100% { transform: translateY(-8px); opacity: 0; }
    }
    @keyframes fright {
      0% { transform: translateX(-8px); opacity: 0; }
      18% { opacity: 1; }
      82% { opacity: 1; }
      100% { transform: translateX(84px); opacity: 0; }
    }
    @keyframes fleft {
      0% { transform: translateX(84px); opacity: 0; }
      18% { opacity: 1; }
      82% { opacity: 1; }
      100% { transform: translateX(-8px); opacity: 0; }
    }
    @keyframes idle {
      0%, 100% { opacity: 0; }
    }
  `,e([he({attribute:!1})],gt.prototype,"hass",void 0),e([ge()],gt.prototype,"_config",void 0),e([ge()],gt.prototype,"range",void 0),e([ge()],gt.prototype,"mode",void 0),e([ge()],gt.prototype,"sel",void 0),e([ge()],gt.prototype,"showDevices",void 0),e([ge()],gt.prototype,"loading",void 0),gt=e([de("energy-card")],gt),window.customCards=window.customCards||[],window.customCards.push({type:"energy-card",name:"Energy Card",description:"Nocturne-themed energy dashboard card — wide panel, live flow tile, compact tile, or an animated PV/grid/inverter/battery/load diagram.",preview:!0,documentationURL:"https://github.com/"}),console.info(`%c ENERGY-CARD %c v0.1.2 (${Object.keys({"1a":"Wide panel — cost headline, hourly bars, device breakdown","1b":"Live flow tile — where power is going right now","1c":"Compact tile — cost first, one sparkline","2a":"Energy flow — PV · grid · inverter · battery · load"}).join(", ")}) `,"color:#161826;background:#9184d9;font-weight:700;","color:#9184d9;background:#161826;font-weight:500;");export{gt as EnergyCard};
