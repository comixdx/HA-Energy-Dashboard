function t(t,e,i,r){var s,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(o<3?s(n):o>3?s(e,i,n):s(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(i,t,r)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,f=globalThis,y=f.trustedTypes,u=y?y.emptyScript:"",v=f.reactiveElementPolyfillSupport,x=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},m=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:m};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&d(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=r;const o=s.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const o=this.constructor;if(!1===r&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??m)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[x("elementProperties")]=new Map,b[x("finalized")]=new Map,v?.({ReactiveElement:b}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _=globalThis,k=t=>t,A=_.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+z,M=`<${C}>`,D=document,P=()=>D.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,N=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,I=/"/g,W=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Y=new WeakMap,q=D.createTreeWalker(D,129);function G(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,r=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===H?"!--"===l[1]?n=O:void 0!==l[1]?n=N:void 0!==l[2]?(W.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=s??H,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?j:'"'===l[3]?I:B):n===I||n===B?n=j:n===O||n===N?n=H:(n=j,s=void 0);const p=n===j&&t[e+1].startsWith("/>")?" ":"";o+=n===H?i+M:d>=0?(r.push(a),i.slice(0,d)+E+i.slice(d)+z+p):i+z+(-2===d?e:p)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class X{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[l,d]=K(t,e);if(this.el=X.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=q.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(E)){const e=d[o++],i=r.getAttribute(t).split(z),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(z)&&(a.push({type:6,index:s}),r.removeAttribute(t));if(W.test(r.tagName)){const t=r.textContent.split(z),e=t.length-1;if(e>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],P()),q.nextNode(),a.push({type:2,index:++s});r.append(t[e],P())}}}else if(8===r.nodeType)if(r.data===C)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(z,t+1));)a.push({type:7,index:s}),t+=z.length-1}s++}}static createElement(t,e){const i=D.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,r){if(e===F)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=R(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,r)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??D).importNode(e,!0);q.currentNode=r;let s=q.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Z(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(s=q.nextNode(),o++)}return q.currentNode=D,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),R(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new J(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new X(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new Z(this.O(P()),this.O(P()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,r){const s=this.strings;let o=!1;if(void 0===s)t=Q(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const r=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Q(this,r[i+n],e,n),a===F&&(a=this._$AH[n]),o||=!R(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class rt extends tt{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===F)return;const i=this._$AH,r=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==V&&(i===V||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=_.litHtmlPolyfillSupport;ot?.(X,Z),(_.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new Z(e.insertBefore(P(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:m},pt=(t=ct,e,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ht(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return ht({...t,state:!0,attribute:!1})}const ft="#e9e9ed",yt="#9184d9",ut="rgba(233,233,237,0.16)",vt="#f3f5fe",xt="#b2b6ca",$t="#9397ab",mt="#75798c",wt="#595d6c",bt="#3f424d",_t="#d2cefd",kt="#5d5294",At="#d1a05e",St="#ef9f27",Et="#fac775",zt="#412402",Ct="#378add",Mt="#85b7eb",Dt="#042c53",Pt="#1d9e75",Rt="#5dcaa5",Tt="#04342c",Ut="#639922",Ht="#97c459",Ot="#173404",Nt="#d4537e",jt="#ed93b1",Bt="#4b1528";function It(t,e){if(!e)return;const i=t.states[e];if(!i)return;const r=Number(i.state);return Number.isFinite(r)?r:void 0}function Wt(t){return t.import_rate??.28}function Lt(t){return t.export_rate??.155}function Ft(t,e){return void 0===e?0:"kW"===t.power_unit?e:e/1e3}function Vt(t){return`${t.toFixed(2)} kW`}function Yt(t){return`${t.toFixed(1)} kWh`}function qt(t,e){return`${function(t){return t.currency??"$"}(t)}${e.toFixed(2)}`}function Gt(t){return`${Math.round(t)}%`}const Kt={today:"today",week:"this week",month:"this month"},Xt={today:"yesterday",week:"last week",month:"last month"},Qt=["today","week","month"];function Jt(t,e){const i=t.entities,r=Math.max(0,Ft(t,It(e,i.pv_power))||0),s=Ft(t,It(e,i.grid_power))||0,o=Ft(t,It(e,i.battery_power))||0,n=It(e,i.battery_soc),a=Math.max(0,s),l=Math.max(0,-s),d=Math.max(0,o),c=Math.max(0,-o),p=It(e,i.load_power),h=r+c+a;return{pv:r,load:void 0!==p?Math.max(0,Ft(t,p)||0):Math.max(0,r+c+a-d-l),soc:n,imp:a,exp:l,charge:d,discharge:c,supply:h,selfSufficiencyNow:h>0?(h-a)/h*100:void 0}}function Zt(t,e){return e>0?`${Math.round(t/e*100)}%`:"0%"}const te=226.2;function ee(t){return Math.max(.8,2.6-.4*t).toFixed(2)}function ie(t,e,i,r){return t<=.02?{line:bt,dot:"transparent",anim:"idle 3s linear infinite",tag:"idle"}:{line:i,dot:i,anim:`${e} ${ee(t)}s linear infinite`,tag:`${Vt(t)} · ${Zt(t,r)}`}}function re(t,e){const i="v"===e?"position:absolute;left:50%;top:0;margin-left:-3.5px;width:7px;height:7px;border-radius:50%":"position:absolute;top:50%;left:0;margin-top:-3.5px;width:7px;height:7px;border-radius:50%";return L`
    <div style="${i};background:${t.dot};animation:${t.anim}"></div>
    <div style="${i};background:${t.dot};animation:${t.anim};animation-delay:-0.55s"></div>
    <div style="${i};background:${t.dot};animation:${t.anim};animation-delay:-1.1s"></div>
  `}async function se(t,e,i){const r=Array.from(new Set(e.filter(t=>!!t)));if(!r.length)return{};let s;try{s=await t.callWS({type:"recorder/statistics_during_period",start_time:i.start.toISOString(),end_time:i.end.toISOString(),statistic_ids:r,period:i.period,types:["change"]})}catch(t){return console.warn("[energy-card] statistics_during_period failed",t),{}}const o={};for(const t of r){const e=s[t]||[];o[t]=e.map(t=>({start:"number"==typeof t.start?t.start:new Date(t.start).getTime(),value:"number"==typeof t.change?t.change:0}))}return o}function oe(t){return t?t.reduce((t,e)=>t+(e.value||0),0):0}function ne(t,e){return"hour"===e?`${t.getFullYear()}-${t.getMonth()}-${t.getDate()}-${t.getHours()}`:`${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`}function ae(t,e,i){return"today"===t?String(e.getHours()).padStart(2,"0"):"week"===t?e.toLocaleDateString(i,{weekday:"short"}):e.toLocaleDateString(i,{month:"short",day:"numeric"}).replace(".","")}const le=[{name:"variant",required:!0,selector:{select:{mode:"dropdown",options:[{value:"1a",label:"1A — Wide panel (cost headline, bars, device breakdown)"},{value:"1b",label:"1B — Live flow tile (battery ring)"},{value:"1c",label:"1C — Compact cost tile (sparkline)"},{value:"2a",label:"2A — Energy flow diagram (PV/grid/inverter/battery/load)"}]}}},{name:"title",selector:{text:{}}},{name:"entities",type:"expandable",title:"Entities",schema:[{name:"pv_power",selector:{entity:{domain:"sensor"}}},{name:"grid_power",selector:{entity:{domain:"sensor"}}},{name:"battery_power",selector:{entity:{domain:"sensor"}}},{name:"battery_soc",selector:{entity:{domain:"sensor"}}},{name:"load_power",selector:{entity:{domain:"sensor"}}},{name:"solar_energy",selector:{entity:{domain:"sensor"}}},{name:"grid_import_energy",selector:{entity:{domain:"sensor"}}},{name:"grid_export_energy",selector:{entity:{domain:"sensor"}}}]},{name:"",type:"grid",schema:[{name:"import_rate",selector:{number:{mode:"box",step:.001,min:0}}},{name:"export_rate",selector:{number:{mode:"box",step:.001,min:0}}},{name:"currency",selector:{text:{}}},{name:"power_unit",selector:{select:{mode:"dropdown",options:["W","kW"]}}},{name:"battery_capacity_kwh",selector:{number:{mode:"box",step:.1,min:0}}}]}],de={variant:"Card layout",title:"Title (optional)",pv_power:"Solar power (W)",grid_power:"Grid power, signed: + import / − export (W)",battery_power:"Battery power, signed: + charging / − discharging (W)",battery_soc:"Battery state of charge (%)",load_power:"House load (W) — optional, derived if omitted",solar_energy:"Solar energy, cumulative (kWh)",grid_import_energy:"Grid import energy, cumulative (kWh)",grid_export_energy:"Grid export energy, cumulative (kWh)",import_rate:"Import rate (currency/kWh)",export_rate:"Export rate (currency/kWh)",currency:"Currency symbol",power_unit:"Power entity unit",battery_capacity_kwh:"Battery capacity (kWh)"};function ce(t){return de[t.name]||t.name}let pe=class extends at{constructor(){super(...arguments),this._valueChanged=t=>{t.stopPropagation(),this._fire(t.detail.value)}}setConfig(t){this._config=t}_fire(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_addDevice(){const t=[...this._config.devices||[],{name:"New device",entity:""}];this._fire({...this._config,devices:t})}_removeDevice(t){const e=(this._config.devices||[]).filter((e,i)=>i!==t);this._fire({...this._config,devices:e})}_updateDevice(t,e){const i=(this._config.devices||[]).map((i,r)=>r===t?{...i,...e}:i);this._fire({...this._config,devices:i})}render(){if(!this._config)return L``;const t=!!customElements.get("ha-form"),e=!!customElements.get("ha-selector");return L`
      ${t?L`<ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${le}
            .computeLabel=${ce}
            @value-changed=${this._valueChanged}
          ></ha-form>`:this._fallbackForm()}

      <div class="devices">
        <div class="devices-title">Device breakdown (1A only, optional)</div>
        ${(this._config.devices||[]).map((t,i)=>L`
            <div class="device-row">
              <input
                .value=${t.name}
                placeholder="Name"
                @change=${t=>this._updateDevice(i,{name:t.target.value})}
              />
              ${e?L`<ha-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"sensor"}}}
                    .value=${t.entity}
                    @value-changed=${t=>this._updateDevice(i,{entity:t.detail.value??""})}
                  ></ha-selector>`:L`<input
                    .value=${t.entity}
                    placeholder="sensor.device_energy"
                    @change=${t=>this._updateDevice(i,{entity:t.target.value})}
                  />`}
              <button type="button" title="Remove" @click=${()=>this._removeDevice(i)}>✕</button>
            </div>
          `)}
        <button type="button" class="add" @click=${()=>this._addDevice()}>+ Add device</button>
      </div>
    `}_fallbackForm(){const t=this._config,e=(t,e,i,r)=>L`
      <label class="row">
        <span>${t}</span>
        <input .value=${i??""} @change=${t=>r(t.target.value)} />
      </label>
    `;return L`
      <div class="fallback-note">Entity pickers unavailable outside the Home Assistant frontend — using plain text fields.</div>
      ${e("Card layout (1a/1b/1c/2a)",0,t.variant,e=>this._fire({...t,variant:e}))}
      ${e("Solar power entity",0,t.entities.pv_power,e=>this._fire({...t,entities:{...t.entities,pv_power:e}}))}
      ${e("Grid power entity",0,t.entities.grid_power,e=>this._fire({...t,entities:{...t.entities,grid_power:e}}))}
      ${e("Battery power entity",0,t.entities.battery_power,e=>this._fire({...t,entities:{...t.entities,battery_power:e}}))}
      ${e("Battery SoC entity",0,t.entities.battery_soc,e=>this._fire({...t,entities:{...t.entities,battery_soc:e}}))}
      ${e("Solar energy entity",0,t.entities.solar_energy,e=>this._fire({...t,entities:{...t.entities,solar_energy:e}}))}
      ${e("Grid import energy entity",0,t.entities.grid_import_energy,e=>this._fire({...t,entities:{...t.entities,grid_import_energy:e}}))}
      ${e("Grid export energy entity",0,t.entities.grid_export_energy,e=>this._fire({...t,entities:{...t.entities,grid_export_energy:e}}))}
    `}};pe.styles=n`
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
  `,t([ht({attribute:!1})],pe.prototype,"hass",void 0),t([gt()],pe.prototype,"_config",void 0),pe=t([dt("energy-card-editor")],pe);const he={"1a":720,"1b":340,"1c":280,"2a":660};let ge=class extends at{constructor(){super(...arguments),this.range="today",this.mode="cost",this.sel=null,this.showDevices=!1,this.loading=!1,this._dataByRange={},this._fetchToken=0}get config(){return this._config}get rangeData(){return this._dataByRange[this.range]}static getStubConfig(){return{variant:"1a",entities:{},import_rate:.28,export_rate:.155}}static getConfigElement(){return document.createElement("energy-card-editor")}setConfig(t){if(!t?.variant)throw new Error("energy-card: `variant` is required (one of 1a, 1b, 1c, 2a)");this._config={...t,entities:t.entities??{}},this._dataByRange={},this.sel=null,this.showDevices=!1,this.range="today",this._loadRange(this.range)}getCardSize(){return"2a"===this._config?.variant?6:"1a"===this._config?.variant?5:3}connectedCallback(){super.connectedCallback(),this._config&&this._loadRange(this.range),this._refreshTimer=setInterval(()=>this._loadRange(this.range,!0),3e5)}disconnectedCallback(){super.disconnectedCallback(),this._refreshTimer&&clearInterval(this._refreshTimer)}updated(t){t.has("hass")&&this.hass&&this._config&&!this._dataByRange[this.range]&&this._loadRange(this.range)}setRange(t){this.range!==t&&(this.range=t,this.sel=null,this._loadRange(t))}setMode(t){this.mode=t}setSel(t){this.sel=t}toggleDevices(){this.showDevices=!this.showDevices}async _loadRange(t,e=!1){if(!this.hass||!this._config)return;if(!e&&this._dataByRange[t])return;const i=this._config.entities,r=function(t,e=new Date){if("today"===t){const t=new Date(e);t.setHours(0,0,0,0);const i=new Date(t);return i.setDate(i.getDate()+1),{start:t,end:i,period:"hour"}}if("week"===t){const t=(e.getDay()+6)%7,i=new Date(e);i.setHours(0,0,0,0),i.setDate(i.getDate()-t);const r=new Date(i);return r.setDate(r.getDate()+7),{start:i,end:r,period:"day"}}return{start:new Date(e.getFullYear(),e.getMonth(),1),end:new Date(e.getFullYear(),e.getMonth()+1,1),period:"day"}}(t),s=function(t){const e=t.end.getTime()-t.start.getTime();return{start:new Date(t.start.getTime()-e),end:new Date(t.start.getTime()),period:t.period}}(r),o=[i.solar_energy,i.grid_import_energy,i.grid_export_energy],n=++this._fetchToken;this.loading=!0;const[a,l]=await Promise.all([se(this.hass,o,r),se(this.hass,o,s)]);if(n!==this._fetchToken)return;const d=function(t,e,i,r,s,o="en-US"){const n=new Map;for(const t of i){const i=new Date(t.start);n.set(ne(i,e.period),(n.get(ne(i,e.period))||0)+t.value)}const a=new Map;for(const t of r){const i=new Date(t.start);a.set(ne(i,e.period),(a.get(ne(i,e.period))||0)+t.value)}const l=new Map;for(const t of s){const i=new Date(t.start);l.set(ne(i,e.period),(l.get(ne(i,e.period))||0)+t.value)}const d=[],c=new Date(e.start);for(;c<e.end;){const i=ne(c,e.period),r=n.get(i)||0,s=l.get(i)||0,p=Math.max(0,r-s),h=a.get(i)||0;d.push({label:ae(t,c,o),solar:p,grid:h}),"hour"===e.period?c.setHours(c.getHours()+1):c.setDate(c.getDate()+1)}return d}(t,r,i.solar_energy&&a[i.solar_energy]||[],i.grid_import_energy&&a[i.grid_import_energy]||[],i.grid_export_energy&&a[i.grid_export_energy]||[],this.hass.locale?.language),c=oe(i.solar_energy?a[i.solar_energy]:void 0),p=oe(i.grid_import_energy?a[i.grid_import_energy]:void 0),h=oe(i.grid_export_energy?a[i.grid_export_energy]:void 0),g=Math.max(0,c-h),f=oe(i.solar_energy?l[i.solar_energy]:void 0),y=oe(i.grid_import_energy?l[i.grid_import_energy]:void 0),u=oe(i.grid_export_energy?l[i.grid_export_energy]:void 0),v={rows:d,solarUsed:g,gridImported:p,exported:h,totalKwh:g+p,prevTotalKwh:Math.max(0,f-u)+y};if(this._config.devices?.length){const t=this._config.devices.map(t=>t.entity),e=await se(this.hass,t,r);if(n!==this._fetchToken)return;v.devices=this._config.devices.map(t=>({name:t.name,color:t.color,entity:t.entity,kwh:oe(e[t.entity])}))}this._dataByRange={...this._dataByRange,[t]:v},this.loading=!1}render(){if(!this._config)return L``;const t=this._config.variant;let e;switch(t){case"1a":e=function(t){const e=t.rangeData,i=t.mode,r=e?.rows??[],s=Math.max(1e-6,...r.map(t=>t.solar+t.grid)),o=Wt(t.config),n=Lt(t.config),a=e?.gridImported??0,l=e?.solarUsed??0,d=e?.exported??0,c=e?.totalKwh??0,p=e?.prevTotalKwh??0,h=a*o,g=p>0?Math.round((c-p)/p*100):0,f=c>0?Math.round(l/c*100):0,y=t.sel,u=null!==y?r[y]:void 0,v=u?{label:"today"===t.range?`${u.label}:00`:u.label,headline:"cost"===i?`${qt(t.config,u.grid*o)} from grid`:`${Yt(u.solar+u.grid)} used`,detail:`${Yt(u.solar)} solar · ${Yt(u.grid)} grid`}:null,x=null!==y&&r.length?(y+.5)/r.length*100+"%":"50%",$=e=>{if(!r.length)return"";const i=r[e].label;return"today"===t.range?`${i}:00`:i},m=e?.devices??[],w=Math.max(1e-6,...m.map(t=>t.kwh));return L`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16.8px">
        <div style="display:flex;flex-direction:column;gap:8.4px">
          <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$t}">
            Energy spend · ${Kt[t.range]}
          </div>
          <div style="display:flex;align-items:baseline;gap:8.4px">
            <div style="font-size:44px;font-weight:500;line-height:1;letter-spacing:-0.02em;color:${vt}">
              ${"cost"===i?qt(t.config,h):Yt(c)}
            </div>
            <div style="font-size:13px;color:${$t}">
              ${"cost"===i?`${Yt(c)} used`:`${qt(t.config,h)} billed`}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:5.6px;font-size:12px;color:${$t}">
            <span style="color:${g>0?At:_t}">${g>0?"+":""}${g}%</span>
            <span>vs. ${Xt[t.range]}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8.4px">
          <div style="display:flex;gap:2px;padding:2px;background:#1b1d29;border-radius:8px;box-shadow:inset 0 0 0 1px ${bt}">
            ${Qt.map(e=>L`
                <button
                  type="button"
                  @click=${()=>t.setRange(e)}
                  style="border:0;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;padding:5.6px 11.2px;border-radius:6px;background:${t.range===e?"#3a3d4d":"transparent"};color:${t.range===e?vt:$t}"
                >
                  ${e[0].toUpperCase()}${e.slice(1)}
                </button>
              `)}
          </div>
          <div style="display:flex;gap:2px;padding:2px;background:#1b1d29;border-radius:8px;box-shadow:inset 0 0 0 1px ${bt}">
            <button
              type="button"
              @click=${()=>t.setMode("cost")}
              style="border:0;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;padding:5.6px 11.2px;border-radius:6px;background:${"cost"===i?"#3a3d4d":"transparent"};color:${"cost"===i?vt:$t}"
            >
              Cost
            </button>
            <button
              type="button"
              @click=${()=>t.setMode("kwh")}
              style="border:0;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;padding:5.6px 11.2px;border-radius:6px;background:${"kwh"===i?"#3a3d4d":"transparent"};color:${"kwh"===i?vt:$t}"
            >
              kWh
            </button>
          </div>
        </div>
      </div>

      <div style="position:relative;height:168px;display:flex;align-items:flex-end;gap:3px;padding-top:28px">
        ${r.map((e,i)=>{const r=null===y||y===i?1:.42;return L`
            <button
              type="button"
              @click=${()=>t.setSel(y===i?null:i)}
              title=${e.label}
              style="flex:1 1 0;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:1px;background:transparent;border:0;padding:0;cursor:pointer;opacity:${r};transition:opacity 120ms ease"
            >
              <div style="width:100%;border-radius:3px 3px 0 0;background:${mt};height:${e.grid/s*138}px"></div>
              <div style="width:100%;background:${At};height:${e.solar/s*138}px"></div>
              <div style="width:100%;height:2px;border-radius:0 0 2px 2px;background:${y===i?yt:"transparent"}"></div>
            </button>
          `})}
        ${v?L`
              <div
                style="position:absolute;top:0;left:${x};transform:translateX(-50%);background:#2c2f3d;box-shadow:0 0 0 1px ${wt},0 6px 18px rgba(0,0,0,0.55);border-radius:8px;padding:8.4px 11.2px;display:flex;flex-direction:column;gap:2.8px;white-space:nowrap;pointer-events:none"
              >
                <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${$t}">${v.label}</div>
                <div style="font-size:15px;font-weight:500;color:${vt}">${v.headline}</div>
                <div style="font-size:11px;color:${xt}">${v.detail}</div>
              </div>
            `:V}
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:${mt};margin-top:-8.4px">
        <span>${$(0)}</span>
        <span>${$(Math.floor((r.length-1)/2))}</span>
        <span>${$(r.length-1)}</span>
      </div>

      <div style="height:1px;background:linear-gradient(90deg, transparent, ${ut} 48px, ${ut} calc(100% - 48px), transparent)"></div>

      <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:16.8px">
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${$t}">
            <span style="width:8px;height:8px;border-radius:2px;background:${At}"></span>Solar used
          </div>
          <div style="font-size:18px;font-weight:500;color:${ft}">
            ${"cost"===i?`${qt(t.config,l*o)} saved`:Yt(l)}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${$t}">
            <span style="width:8px;height:8px;border-radius:2px;background:${mt}"></span>From grid
          </div>
          <div style="font-size:18px;font-weight:500;color:${ft}">
            ${"cost"===i?qt(t.config,h):Yt(a)}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${$t}">
            <span style="width:8px;height:8px;border-radius:2px;background:${yt}"></span>Exported
          </div>
          <div style="font-size:18px;font-weight:500;color:${ft}">
            ${"cost"===i?qt(t.config,d*n):Yt(d)}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <div style="font-size:11px;color:${$t}">Self-sufficiency</div>
          <div style="display:flex;align-items:center;gap:8.4px">
            <div style="font-size:18px;font-weight:500;color:${ft}">${Gt(f)}</div>
            <div style="flex:1;height:4px;border-radius:2px;background:${bt};overflow:hidden">
              <div style="height:100%;border-radius:2px;background:${yt};width:${Gt(f)}"></div>
            </div>
          </div>
        </div>
      </div>

      ${t.config.devices?.length?L`
            <button
              type="button"
              @click=${()=>t.toggleDevices()}
              style="align-self:flex-start;font-family:inherit;font-size:12px;font-weight:500;color:${_t};background:transparent;border:1px solid ${kt};border-radius:8px;padding:5.6px 11.2px;cursor:pointer"
            >
              ${t.showDevices?"Hide device breakdown":"Show device breakdown"}
            </button>
            ${t.showDevices?L`
                  <div style="display:flex;flex-direction:column;gap:8.4px;padding-top:2.8px">
                    ${m.map(e=>L`
                        <div style="display:grid;grid-template-columns:132px 1fr 84px;align-items:center;gap:11.2px">
                          <div style="font-size:13px;color:${xt}">${e.name}</div>
                          <div style="height:6px;border-radius:3px;background:#1b1d29">
                            <div style="height:100%;border-radius:3px;background:${e.color||yt};width:${e.kwh/w*100}%"></div>
                          </div>
                          <div style="font-size:13px;text-align:right;color:${ft};font-variant-numeric:tabular-nums">
                            ${"cost"===i?qt(t.config,e.kwh*o):Yt(e.kwh)}
                          </div>
                        </div>
                      `)}
                  </div>
                `:V}
          `:V}
    </div>
  `}(this);break;case"1b":e=function(t){const e=Jt(t.config,t.hass),i=Wt(t.config),r=Lt(t.config),s=e.imp*i-e.exp*r,o=Math.max(e.pv,e.load,e.imp,e.exp,e.charge,e.discharge,.01),n=e.imp>.01?Vt(e.imp):e.exp>.01?`−${Vt(e.exp)}`:"idle",a=e.charge>.01?`+${Vt(e.charge)}`:e.discharge>.01?`−${Vt(e.discharge)}`:"idle",l=e.soc,d=void 0!==l?`${(l/100*te).toFixed(1)} 226.2`:"0 226.2",c=t.config.battery_capacity_kwh,p=void 0!==c&&void 0!==l?c*l/100:void 0;let h=null,g=null;if(void 0!==l){if(e.charge>.01&&void 0!==c){const t=c*(100-l)/100/e.charge,i=new Date(Date.now()+36e5*t);h=`Charging to 100% by ${i.getHours().toString().padStart(2,"0")}:${i.getMinutes().toString().padStart(2,"0")}`}else h=e.charge>.01?"Charging":e.discharge>.01?"Discharging":"Idle";if(void 0!==p){const t=e.load>.01?p/e.load:void 0;g=`${Yt(p)} stored${void 0!==t?` · ${t.toFixed(1)} h of house use`:""}`}}const f=t.rangeData,y=f?f.gridImported*i:void 0,u=f?.totalKwh;return L`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$t}">Right now</div>
        <div style="display:flex;align-items:center;gap:5.6px;font-size:11px;color:${xt}">
          <span style="width:6px;height:6px;border-radius:50%;background:${yt};box-shadow:0 0 8px ${yt}"></span>live
        </div>
      </div>

      <div style="display:flex;align-items:baseline;gap:8.4px">
        <div style="font-size:40px;font-weight:500;line-height:1;letter-spacing:-0.02em;color:${vt}">${e.load.toFixed(2)}</div>
        <div style="font-size:15px;color:${$t}">kW drawn</div>
      </div>
      <div style="font-size:13px;color:${xt}">
        ${s>=0?L`Costing <span style="color:${vt}">${qt(t.config,s)}/h</span> at the current tariff`:L`Earning <span style="color:${vt}">${qt(t.config,-s)}/h</span> on export`}
      </div>

      <div style="display:flex;flex-direction:column;gap:11.2px;padding:16.8px 0;border-top:1px solid ${ut};border-bottom:1px solid ${ut}">
        <div style="display:grid;grid-template-columns:92px 1fr 66px;align-items:center;gap:11.2px">
          <div style="font-size:13px;color:${xt}">Solar</div>
          <div style="height:6px;border-radius:3px;background:#1b1d29"><div style="height:100%;width:${e.pv/o*100}%;border-radius:3px;background:${At}"></div></div>
          <div style="font-size:13px;text-align:right;color:${ft};font-variant-numeric:tabular-nums">${Vt(e.pv)}</div>
        </div>
        <div style="display:grid;grid-template-columns:92px 1fr 66px;align-items:center;gap:11.2px">
          <div style="font-size:13px;color:${xt}">Grid</div>
          <div style="height:6px;border-radius:3px;background:#1b1d29"><div style="height:100%;width:${Math.max(e.imp,e.exp)/o*100}%;border-radius:3px;background:${mt}"></div></div>
          <div style="font-size:13px;text-align:right;color:${e.imp>.01||e.exp>.01?ft:mt};font-variant-numeric:tabular-nums">${n}</div>
        </div>
        <div style="display:grid;grid-template-columns:92px 1fr 66px;align-items:center;gap:11.2px">
          <div style="font-size:13px;color:${xt}">Battery</div>
          <div style="height:6px;border-radius:3px;background:#1b1d29"><div style="height:100%;width:${Math.max(e.charge,e.discharge)/o*100}%;border-radius:3px;background:${yt}"></div></div>
          <div style="font-size:13px;text-align:right;color:${e.charge>.01||e.discharge>.01?_t:mt};font-variant-numeric:tabular-nums">${a}</div>
        </div>
      </div>

      ${void 0!==l?L`
            <div style="display:flex;align-items:center;gap:16.8px">
              <div style="position:relative;width:84px;height:84px;flex:0 0 auto">
                <svg viewBox="0 0 84 84" style="width:84px;height:84px;transform:rotate(-90deg)">
                  <circle cx="42" cy="42" r="36" fill="none" stroke="${bt}" stroke-width="7"></circle>
                  <circle cx="42" cy="42" r="36" fill="none" stroke="${yt}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${d}"></circle>
                </svg>
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px">
                  <div style="font-size:18px;font-weight:500;color:${vt}">${Math.round(l)}%</div>
                  <div style="font-size:10px;color:${$t}">battery</div>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:5.6px">
                ${h?L`<div style="font-size:13px;color:${ft}">${h}</div>`:V}
                ${g?L`<div style="font-size:12px;color:${$t}">${g}</div>`:V}
              </div>
            </div>
          `:V}

      ${void 0!==y?L`
            <div style="display:flex;align-items:baseline;justify-content:space-between">
              <div style="font-size:12px;color:${$t}">Today so far</div>
              <div style="font-size:15px;font-weight:500;color:${vt}">
                ${qt(t.config,y)} <span style="font-size:12px;font-weight:400;color:${$t}">· ${Yt(u??0)}</span>
              </div>
            </div>
          `:V}
    </div>
  `}(this);break;case"1c":e=function(t){const e=t.rangeData,i=Wt(t.config),r=Lt(t.config),s=e?.gridImported??0,o=e?.exported??0,n=e?.solarUsed??0,a=e?.totalKwh??0,l=e?.prevTotalKwh??0,d=s*i,c=l>0?Math.round((a-l)/l*100):0,p=a>0?Math.round(n/a*100):0,h=e?.rows??[],g=Math.max(1e-6,...h.map(t=>t.solar+t.grid)),f=h.map(t=>({h:Math.max(3,(t.solar+t.grid)/g*52),color:t.grid>t.solar?mt:At})),y=Jt(t.config,t.hass),u=y.soc,v=y.charge>.01?"charging":y.discharge>.01?"discharging":"idle";return L`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$t}">Today</div>
        <div style="font-size:11px;color:${mt}">${t.config.currency??"$"}${i.toFixed(2)}/kWh</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="font-size:40px;font-weight:500;line-height:1;letter-spacing:-0.02em;color:${vt}">${qt(t.config,d)}</div>
        <div style="font-size:12px;color:${$t}">
          <span style="color:${_t}">${c>0?"+":""}${c}%</span> vs. yesterday · ${Yt(a)}
        </div>
      </div>

      <div style="display:flex;align-items:flex-end;gap:2px;height:52px">
        ${f.map(t=>L`<div style="flex:1 1 0;border-radius:2px;background:${t.color};height:${t.h}px"></div>`)}
      </div>

      <div style="display:flex;flex-direction:column;gap:8.4px;padding-top:11.2px;border-top:1px solid ${ut}">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
          <span style="color:${$t}">Self-sufficiency</span><span style="color:${ft}">${p}%</span>
        </div>
        ${void 0!==u?L`
              <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
                <span style="color:${$t}">Battery</span><span style="color:${ft}">${Math.round(u)}% · ${v}</span>
              </div>
            `:V}
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
          <span style="color:${$t}">Exported</span><span style="color:${ft}">${Yt(o)} · ${qt(t.config,o*r)}</span>
        </div>
      </div>
    </div>
  `}(this);break;case"2a":e=function(t){const e=Jt(t.config,t.hass),i=ie(e.pv,"fdown",St,e.supply),r=e.imp>.02?ie(e.imp,"fright",Ct,e.supply):ie(e.exp,"fleft",Mt,e.supply),s=ie(e.load,"fright",Ut,e.supply),o=e.charge>.02?ie(e.charge,"fdown",Nt,e.supply):ie(e.discharge,"fup",Nt,e.supply),n=e.exp>.02?"Solar covers the house and charges the battery — surplus is going back to the grid.":e.discharge>.02&&e.imp>.02?"Battery is carrying most of the load; the grid tops up the rest.":e.pv>.02&&e.imp<=.02?"Solar is covering the house.":"Drawing from the grid.",a=void 0!==e.selfSufficiencyNow?`${Math.round(e.selfSufficiencyNow)}%`:"—",l=e.soc??0,d=e.imp>.02?Vt(e.imp):e.exp>.02?Vt(e.exp):Vt(0),c=e.exp>.02?"exporting":e.imp>.02?"importing":"idle",p=e.charge>.02?`+${Vt(e.charge)}`:e.discharge>.02?`−${Vt(e.discharge)}`:Vt(0),h=e.charge>.02?"charging":e.discharge>.02?"discharging":"idle";return L`
    <div style="display:flex;flex-direction:column;gap:16.8px">
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$t}">Energy flow</div>
        <div style="font-size:13px;color:${xt}">${n}</div>
      </div>

      <div style="overflow-x:auto;overflow-y:visible">
      <div
        style="display:grid;grid-template-columns:25% 12.5% 25% 12.5% 25%;grid-template-rows:minmax(132px,auto) 74px 148px 74px minmax(132px,auto);justify-content:center;align-items:start;padding:5.6px 0;width:100%;margin:0 auto"
      >
        <div style="grid-column:3;grid-row:1;align-self:end;display:flex;flex-direction:column-reverse;align-items:center;gap:4px;min-width:0">
          <svg viewBox="12 14 116 116" style="width:57%;height:auto;overflow:visible">
            <circle cx="68" cy="70" r="52" fill="${zt}" stroke="${St}" stroke-width="3"></circle>
            <circle cx="68" cy="48" r="8" fill="none" stroke="${Et}" stroke-width="2"></circle>
            <line x1="68" y1="35" x2="68" y2="31" stroke="${Et}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="79" y1="39" x2="82" y2="36" stroke="${Et}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="83" y1="53" x2="87" y2="53" stroke="${Et}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="57" y1="39" x2="54" y2="36" stroke="${Et}" stroke-width="1.8" stroke-linecap="round"></line>
            <line x1="53" y1="53" x2="49" y2="53" stroke="${Et}" stroke-width="1.8" stroke-linecap="round"></line>
            <rect x="46" y="62" width="44" height="20" rx="3" fill="none" stroke="${Et}" stroke-width="1.8"></rect>
            <line x1="61" y1="62" x2="61" y2="82" stroke="${Et}" stroke-width="1.2" opacity="0.7"></line>
            <line x1="75" y1="62" x2="75" y2="82" stroke="${Et}" stroke-width="1.2" opacity="0.7"></line>
            <line x1="46" y1="72" x2="90" y2="72" stroke="${Et}" stroke-width="1.2" opacity="0.7"></line>
            <circle cx="112" cy="102" r="11" fill="${St}"></circle>
            <text x="112" y="106" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">PV</text>
          </svg>
          <div style="font-size:11px;color:${mt}">${e.pv>.02?`${(t=>Zt(t,e.supply))(e.pv)} of supply`:"no production"}</div>
          <div style="font-size:20px;font-weight:500;color:${vt};font-variant-numeric:tabular-nums;line-height:1.1">${Vt(e.pv)}</div>
          <div style="font-size:12px;font-weight:500;color:${Et}">Solar PV</div>
        </div>

        <div style="grid-column:3;grid-row:2;height:74px;position:relative;display:flex;justify-content:center">
          <div style="width:2px;height:100%;background:linear-gradient(180deg, transparent, ${i.line} 22%, ${i.line} 78%, transparent)"></div>
          ${re(i,"v")}
          <div style="position:absolute;left:50%;top:50%;margin-left:14px;transform:translateY(-50%);font-size:11px;color:${$t};font-variant-numeric:tabular-nums;white-space:nowrap">${i.tag}</div>
        </div>

        <div style="grid-column:1;grid-row:3;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">
          <svg viewBox="148 14 116 116" style="width:57%;height:auto;margin-top:6px;overflow:visible">
            <circle cx="204" cy="70" r="52" fill="${Dt}" stroke="${Ct}" stroke-width="3"></circle>
            <g fill="none" stroke="${Mt}" stroke-width="2" stroke-linecap="round">
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
            <path d="M184 70 Q204 80 224 70" fill="none" stroke="${Mt}" stroke-width="1.4"></path>
            <path d="M185 78 Q204 87 223 78" fill="none" stroke="${Mt}" stroke-width="1.4"></path>
            <circle cx="248" cy="102" r="11" fill="${Ct}"></circle>
            <text x="248" y="106" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">AC</text>
          </svg>
          <div style="font-size:12px;font-weight:500;color:#b5d4f4">Grid</div>
          <div style="font-size:20px;font-weight:500;color:${vt};font-variant-numeric:tabular-nums;line-height:1.1">${d}</div>
          <div style="font-size:11px;color:${mt}">${c}</div>
        </div>

        <div style="grid-column:2;grid-row:3;height:95px;position:relative;display:flex;align-items:center">
          <div style="height:2px;width:100%;background:linear-gradient(90deg, transparent, ${r.line} 22%, ${r.line} 78%, transparent)"></div>
          ${re(r,"h")}
          <div style="position:absolute;left:50%;top:50%;margin-top:11px;transform:translateX(-50%);font-size:11px;color:${$t};font-variant-numeric:tabular-nums;white-space:nowrap">${r.tag}</div>
        </div>

        <div style="grid-column:3;grid-row:3;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">
          <svg viewBox="278 8 132 132" style="width:64%;height:auto;overflow:visible">
            <circle cx="340" cy="70" r="58" fill="${Tt}" stroke="${Pt}" stroke-width="3"></circle>
            <rect x="308" y="54" width="64" height="34" rx="6" fill="none" stroke="${Rt}" stroke-width="2"></rect>
            <polyline points="315,80 315,64 323,64 323,80 329,80" fill="none" stroke="${Rt}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
            <line x1="340" y1="57" x2="340" y2="85" stroke="${Rt}" stroke-width="1" stroke-dasharray="2.5 2" opacity="0.45"></line>
            <path d="M348,71 Q353,60 358,71 Q363,82 368,71" fill="none" stroke="${Rt}" stroke-width="2" stroke-linecap="round"></path>
            <circle cx="392" cy="106" r="12" fill="${Pt}"></circle>
            <text x="392" y="110" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">INV</text>
          </svg>
          <div style="font-size:12px;font-weight:500;color:#9fe1cb">Hybrid inverter</div>
          <div style="font-size:20px;font-weight:500;color:${vt};font-variant-numeric:tabular-nums;line-height:1.1">${Vt(e.supply)}</div>
          <div style="font-size:11px;color:${mt}">throughput</div>
        </div>

        <div style="grid-column:4;grid-row:3;height:95px;position:relative;display:flex;align-items:center">
          <div style="height:2px;width:100%;background:linear-gradient(90deg, transparent, ${s.line} 22%, ${s.line} 78%, transparent)"></div>
          ${re(s,"h")}
          <div style="position:absolute;left:50%;top:50%;margin-top:11px;transform:translateX(-50%);font-size:11px;color:${$t};font-variant-numeric:tabular-nums;white-space:nowrap">${s.tag}</div>
        </div>

        <div style="grid-column:5;grid-row:3;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">
          <svg viewBox="420 14 116 116" style="width:57%;height:auto;margin-top:6px;overflow:visible">
            <circle cx="476" cy="70" r="52" fill="${Ot}" stroke="${Ut}" stroke-width="3"></circle>
            <polygon points="476,46 500,60 500,90 452,90 452,60" fill="none" stroke="${Ht}" stroke-width="2" stroke-linejoin="round"></polygon>
            <rect x="468" y="72" width="16" height="18" rx="2" fill="none" stroke="${Ht}" stroke-width="1.8"></rect>
            <rect x="457" y="66" width="10" height="9" rx="1.5" fill="none" stroke="${Ht}" stroke-width="1.4"></rect>
            <line x1="462" y1="66" x2="462" y2="75" stroke="${Ht}" stroke-width="1"></line>
            <line x1="457" y1="70.5" x2="467" y2="70.5" stroke="${Ht}" stroke-width="1"></line>
            <circle cx="490" cy="66" r="6" fill="none" stroke="${Ht}" stroke-width="1.6"></circle>
            <line x1="487" y1="71.5" x2="493" y2="71.5" stroke="${Ht}" stroke-width="1.6" stroke-linecap="round"></line>
            <line x1="487.5" y1="75" x2="492.5" y2="75" stroke="${Ht}" stroke-width="1.2" stroke-linecap="round"></line>
            <circle cx="520" cy="102" r="11" fill="${Ut}"></circle>
            <text x="520" y="106" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">~W</text>
          </svg>
          <div style="font-size:12px;font-weight:500;color:#c0dd97">House load</div>
          <div style="font-size:20px;font-weight:500;color:${vt};font-variant-numeric:tabular-nums;line-height:1.1">${Vt(e.load)}</div>
          <div style="font-size:11px;color:${mt}">current draw</div>
        </div>

        <div style="grid-column:3;grid-row:4;height:74px;position:relative;display:flex;justify-content:center">
          <div style="width:2px;height:100%;background:linear-gradient(180deg, transparent, ${o.line} 22%, ${o.line} 78%, transparent)"></div>
          ${re(o,"v")}
          <div style="position:absolute;left:50%;top:50%;margin-left:14px;transform:translateY(-50%);font-size:11px;color:${$t};font-variant-numeric:tabular-nums;white-space:nowrap">${o.tag}</div>
        </div>

        <div style="grid-column:3;grid-row:5;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0">
          <svg viewBox="556 14 116 116" style="width:57%;height:auto;overflow:visible">
            <circle cx="612" cy="70" r="52" fill="${Bt}" stroke="${Nt}" stroke-width="3"></circle>
            <rect x="588" y="60" width="38" height="22" rx="4" fill="none" stroke="${jt}" stroke-width="2"></rect>
            <rect x="626" y="66" width="6" height="10" rx="2.5" fill="none" stroke="${jt}" stroke-width="1.8"></rect>
            <rect x="592" y="64" width="8" height="14" rx="1.8" fill="${jt}"></rect>
            <rect x="602" y="64" width="8" height="14" rx="1.8" fill="${jt}" opacity="0.55"></rect>
            <rect x="612" y="64" width="6" height="14" rx="1.8" fill="${jt}" opacity="0.22"></rect>
            <polygon points="608,42 602,53 607,53 604,66 615,51 609,51 613,42" fill="${jt}" opacity="0.85"></polygon>
            <circle cx="656" cy="102" r="11" fill="${Nt}"></circle>
            <text x="656" y="106" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="Inter, sans-serif">DC</text>
          </svg>
          <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline;gap:5.6px">
            <div style="font-size:12px;font-weight:500;color:#f4c0d1">Battery</div>
            <div style="font-size:12px;color:${jt};font-variant-numeric:tabular-nums">${Math.round(l)}%</div>
          </div>
          <div style="width:64%;height:4px;border-radius:2px;background:${bt};overflow:hidden">
            <div style="height:100%;border-radius:2px;background:${Nt};width:${l}%"></div>
          </div>
          <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline;gap:5.6px">
            <div style="font-size:20px;font-weight:500;color:${vt};font-variant-numeric:tabular-nums;line-height:1.1">${p}</div>
            <div style="font-size:11px;color:${mt}">${h}</div>
          </div>
        </div>
      </div>
      </div>

      <div style="height:1px;background:linear-gradient(90deg, transparent, ${ut} 48px, ${ut} calc(100% - 48px), transparent)"></div>

      <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:${$t}">
        <div style="display:flex;align-items:center;gap:16.8px">
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${St}"></span>solar DC</span>
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${Ct}"></span>grid AC</span>
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${Nt}"></span>battery</span>
          <span style="display:flex;align-items:center;gap:5.6px"><span style="width:7px;height:7px;border-radius:50%;background:${Ut}"></span>house</span>
        </div>
        <div>Self-sufficiency now <span style="color:${ft}">${a}</span></div>
      </div>
    </div>
  `}(this);break;default:return L`<div style="padding:16px;color:${St}">energy-card: unknown variant "${t}"</div>`}return L`
      <div class="energy-card" style="max-width:${he[t]}px">
        ${this._config.title?L`<div style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${$t};padding:0 0 12px">
              ${this._config.title}
            </div>`:V}
        ${e}
      </div>
    `}};ge.styles=n`
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
  `,t([ht({attribute:!1})],ge.prototype,"hass",void 0),t([gt()],ge.prototype,"_config",void 0),t([gt()],ge.prototype,"range",void 0),t([gt()],ge.prototype,"mode",void 0),t([gt()],ge.prototype,"sel",void 0),t([gt()],ge.prototype,"showDevices",void 0),t([gt()],ge.prototype,"loading",void 0),ge=t([dt("energy-card")],ge),window.customCards=window.customCards||[],window.customCards.push({type:"energy-card",name:"Energy Card",description:"Nocturne-themed energy dashboard card — wide panel, live flow tile, compact tile, or an animated PV/grid/inverter/battery/load diagram.",preview:!0,documentationURL:"https://github.com/"}),console.info(`%c ENERGY-CARD %c v0.1.4 (${Object.keys({"1a":"Wide panel — cost headline, hourly bars, device breakdown","1b":"Live flow tile — where power is going right now","1c":"Compact tile — cost first, one sparkline","2a":"Energy flow — PV · grid · inverter · battery · load"}).join(", ")}) `,"color:#161826;background:#9184d9;font-weight:700;","color:#9184d9;background:#161826;font-weight:500;");export{ge as EnergyCard};
