// ==UserScript==
// @author         birkett83
// @name           IITC plugin: Landgrab
// @category       Misc
// @version        0.2
// @description    Landgrab
// @id             landgrab
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @match          https://intel.ingress.com/*
// @grant          none

// ==/UserScript==

/* globals $, L, d3 */

// https://github.com/d3/d3-delaunay v6.0.2 Copyright 2018-2021 Observable, Inc., 2021 Mapbox
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t="undefined"!=typeof globalThis?globalThis:t||self).d3=t.d3||{})}(this,(function(t){"use strict";const i=134217729;function e(t,i,e,n,s){let l,h,r,o,a=i[0],c=n[0],u=0,f=0;c>a==c>-a?(l=a,a=i[++u]):(l=c,c=n[++f]);let _=0;if(u<t&&f<e)for(c>a==c>-a?(h=a+l,r=l-(h-a),a=i[++u]):(h=c+l,r=l-(h-c),c=n[++f]),l=h,0!==r&&(s[_++]=r);u<t&&f<e;)c>a==c>-a?(h=l+a,o=h-l,r=l-(h-o)+(a-o),a=i[++u]):(h=l+c,o=h-l,r=l-(h-o)+(c-o),c=n[++f]),l=h,0!==r&&(s[_++]=r);for(;u<t;)h=l+a,o=h-l,r=l-(h-o)+(a-o),a=i[++u],l=h,0!==r&&(s[_++]=r);for(;f<e;)h=l+c,o=h-l,r=l-(h-o)+(c-o),c=n[++f],l=h,0!==r&&(s[_++]=r);return 0===l&&0!==_||(s[_++]=l),_}function n(t){return new Float64Array(t)}const s=n(4),l=n(8),h=n(12),r=n(16),o=n(4);function a(t,n,a,c,u,f){const _=(n-f)*(a-u),d=(t-u)*(c-f),g=_-d;if(0===_||0===d||_>0!=d>0)return g;const y=Math.abs(_+d);return Math.abs(g)>=33306690738754716e-32*y?g:-function(t,n,a,c,u,f,_){let d,g,y,m,x,p,w,v,b,T,M,A,k,$,P,S,I,z;const F=t-u,U=a-u,K=n-f,L=c-f;$=F*L,p=i*F,w=p-(p-F),v=F-w,p=i*L,b=p-(p-L),T=L-b,P=v*T-($-w*b-v*b-w*T),S=K*U,p=i*K,w=p-(p-K),v=K-w,p=i*U,b=p-(p-U),T=U-b,I=v*T-(S-w*b-v*b-w*T),M=P-I,x=P-M,s[0]=P-(M+x)+(x-I),A=$+M,x=A-$,k=$-(A-x)+(M-x),M=k-S,x=k-M,s[1]=k-(M+x)+(x-S),z=A+M,x=z-A,s[2]=A-(z-x)+(M-x),s[3]=z;let j=function(t,i){let e=i[0];for(let n=1;n<t;n++)e+=i[n];return e}(4,s),H=22204460492503146e-32*_;if(j>=H||-j>=H)return j;if(x=t-F,d=t-(F+x)+(x-u),x=a-U,y=a-(U+x)+(x-u),x=n-K,g=n-(K+x)+(x-f),x=c-L,m=c-(L+x)+(x-f),0===d&&0===g&&0===y&&0===m)return j;if(H=11093356479670487e-47*_+33306690738754706e-32*Math.abs(j),j+=F*m+L*d-(K*y+U*g),j>=H||-j>=H)return j;$=d*L,p=i*d,w=p-(p-d),v=d-w,p=i*L,b=p-(p-L),T=L-b,P=v*T-($-w*b-v*b-w*T),S=g*U,p=i*g,w=p-(p-g),v=g-w,p=i*U,b=p-(p-U),T=U-b,I=v*T-(S-w*b-v*b-w*T),M=P-I,x=P-M,o[0]=P-(M+x)+(x-I),A=$+M,x=A-$,k=$-(A-x)+(M-x),M=k-S,x=k-M,o[1]=k-(M+x)+(x-S),z=A+M,x=z-A,o[2]=A-(z-x)+(M-x),o[3]=z;const E=e(4,s,4,o,l);$=F*m,p=i*F,w=p-(p-F),v=F-w,p=i*m,b=p-(p-m),T=m-b,P=v*T-($-w*b-v*b-w*T),S=K*y,p=i*K,w=p-(p-K),v=K-w,p=i*y,b=p-(p-y),T=y-b,I=v*T-(S-w*b-v*b-w*T),M=P-I,x=P-M,o[0]=P-(M+x)+(x-I),A=$+M,x=A-$,k=$-(A-x)+(M-x),M=k-S,x=k-M,o[1]=k-(M+x)+(x-S),z=A+M,x=z-A,o[2]=A-(z-x)+(M-x),o[3]=z;const C=e(E,l,4,o,h);$=d*m,p=i*d,w=p-(p-d),v=d-w,p=i*m,b=p-(p-m),T=m-b,P=v*T-($-w*b-v*b-w*T),S=g*y,p=i*g,w=p-(p-g),v=g-w,p=i*y,b=p-(p-y),T=y-b,I=v*T-(S-w*b-v*b-w*T),M=P-I,x=P-M,o[0]=P-(M+x)+(x-I),A=$+M,x=A-$,k=$-(A-x)+(M-x),M=k-S,x=k-M,o[1]=k-(M+x)+(x-S),z=A+M,x=z-A,o[2]=A-(z-x)+(M-x),o[3]=z;const N=e(C,h,4,o,r);return r[N-1]}(t,n,a,c,u,f,y)}const c=Math.pow(2,-52),u=new Uint32Array(512);class f{static from(t,i=x,e=p){const n=t.length,s=new Float64Array(2*n);for(let l=0;l<n;l++){const n=t[l];s[2*l]=i(n),s[2*l+1]=e(n)}return new f(s)}constructor(t){const i=t.length>>1;if(i>0&&"number"!=typeof t[0])throw new Error("Expected coords to contain numbers.");this.coords=t;const e=Math.max(2*i-5,0);this._triangles=new Uint32Array(3*e),this._halfedges=new Int32Array(3*e),this._hashSize=Math.ceil(Math.sqrt(i)),this._hullPrev=new Uint32Array(i),this._hullNext=new Uint32Array(i),this._hullTri=new Uint32Array(i),this._hullHash=new Int32Array(this._hashSize).fill(-1),this._ids=new Uint32Array(i),this._dists=new Float64Array(i),this.update()}update(){const{coords:t,_hullPrev:i,_hullNext:e,_hullTri:n,_hullHash:s}=this,l=t.length>>1;let h=1/0,r=1/0,o=-1/0,u=-1/0;for(let i=0;i<l;i++){const e=t[2*i],n=t[2*i+1];e<h&&(h=e),n<r&&(r=n),e>o&&(o=e),n>u&&(u=n),this._ids[i]=i}const f=(h+o)/2,d=(r+u)/2;let m,x,p,w=1/0;for(let i=0;i<l;i++){const e=_(f,d,t[2*i],t[2*i+1]);e<w&&(m=i,w=e)}const v=t[2*m],b=t[2*m+1];w=1/0;for(let i=0;i<l;i++){if(i===m)continue;const e=_(v,b,t[2*i],t[2*i+1]);e<w&&e>0&&(x=i,w=e)}let T=t[2*x],M=t[2*x+1],A=1/0;for(let i=0;i<l;i++){if(i===m||i===x)continue;const e=g(v,b,T,M,t[2*i],t[2*i+1]);e<A&&(p=i,A=e)}let k=t[2*p],$=t[2*p+1];if(A===1/0){for(let i=0;i<l;i++)this._dists[i]=t[2*i]-t[0]||t[2*i+1]-t[1];y(this._ids,this._dists,0,l-1);const i=new Uint32Array(l);let e=0;for(let t=0,n=-1/0;t<l;t++){const s=this._ids[t];this._dists[s]>n&&(i[e++]=s,n=this._dists[s])}return this.hull=i.subarray(0,e),this.triangles=new Uint32Array(0),void(this.halfedges=new Uint32Array(0))}if(a(v,b,T,M,k,$)<0){const t=x,i=T,e=M;x=p,T=k,M=$,p=t,k=i,$=e}const P=function(t,i,e,n,s,l){const h=e-t,r=n-i,o=s-t,a=l-i,c=h*h+r*r,u=o*o+a*a,f=.5/(h*a-r*o);return{x:t+(a*c-r*u)*f,y:i+(h*u-o*c)*f}}(v,b,T,M,k,$);this._cx=P.x,this._cy=P.y;for(let i=0;i<l;i++)this._dists[i]=_(t[2*i],t[2*i+1],P.x,P.y);y(this._ids,this._dists,0,l-1),this._hullStart=m;let S=3;e[m]=i[p]=x,e[x]=i[m]=p,e[p]=i[x]=m,n[m]=0,n[x]=1,n[p]=2,s.fill(-1),s[this._hashKey(v,b)]=m,s[this._hashKey(T,M)]=x,s[this._hashKey(k,$)]=p,this.trianglesLen=0,this._addTriangle(m,x,p,-1,-1,-1);for(let l,h,r=0;r<this._ids.length;r++){const o=this._ids[r],u=t[2*o],f=t[2*o+1];if(r>0&&Math.abs(u-l)<=c&&Math.abs(f-h)<=c)continue;if(l=u,h=f,o===m||o===x||o===p)continue;let _=0;for(let t=0,i=this._hashKey(u,f);t<this._hashSize&&(_=s[(i+t)%this._hashSize],-1===_||_===e[_]);t++);_=i[_];let d,g=_;for(;d=e[g],a(u,f,t[2*g],t[2*g+1],t[2*d],t[2*d+1])>=0;)if(g=d,g===_){g=-1;break}if(-1===g)continue;let y=this._addTriangle(g,o,e[g],-1,-1,n[g]);n[o]=this._legalize(y+2),n[g]=y,S++;let w=e[g];for(;d=e[w],a(u,f,t[2*w],t[2*w+1],t[2*d],t[2*d+1])<0;)y=this._addTriangle(w,o,d,n[o],-1,n[w]),n[o]=this._legalize(y+2),e[w]=w,S--,w=d;if(g===_)for(;d=i[g],a(u,f,t[2*d],t[2*d+1],t[2*g],t[2*g+1])<0;)y=this._addTriangle(d,o,g,-1,n[g],n[d]),this._legalize(y+2),n[d]=y,e[g]=g,S--,g=d;this._hullStart=i[o]=g,e[g]=i[w]=o,e[o]=w,s[this._hashKey(u,f)]=o,s[this._hashKey(t[2*g],t[2*g+1])]=g}this.hull=new Uint32Array(S);for(let t=0,i=this._hullStart;t<S;t++)this.hull[t]=i,i=e[i];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(t,i){return Math.floor(function(t,i){const e=t/(Math.abs(t)+Math.abs(i));return(i>0?3-e:1+e)/4}(t-this._cx,i-this._cy)*this._hashSize)%this._hashSize}_legalize(t){const{_triangles:i,_halfedges:e,coords:n}=this;let s=0,l=0;for(;;){const h=e[t],r=t-t%3;if(l=r+(t+2)%3,-1===h){if(0===s)break;t=u[--s];continue}const o=h-h%3,a=r+(t+1)%3,c=o+(h+2)%3,f=i[l],_=i[t],g=i[a],y=i[c];if(d(n[2*f],n[2*f+1],n[2*_],n[2*_+1],n[2*g],n[2*g+1],n[2*y],n[2*y+1])){i[t]=y,i[h]=f;const n=e[c];if(-1===n){let i=this._hullStart;do{if(this._hullTri[i]===c){this._hullTri[i]=t;break}i=this._hullPrev[i]}while(i!==this._hullStart)}this._link(t,n),this._link(h,e[l]),this._link(l,c);const r=o+(h+1)%3;s<u.length&&(u[s++]=r)}else{if(0===s)break;t=u[--s]}}return l}_link(t,i){this._halfedges[t]=i,-1!==i&&(this._halfedges[i]=t)}_addTriangle(t,i,e,n,s,l){const h=this.trianglesLen;return this._triangles[h]=t,this._triangles[h+1]=i,this._triangles[h+2]=e,this._link(h,n),this._link(h+1,s),this._link(h+2,l),this.trianglesLen+=3,h}}function _(t,i,e,n){const s=t-e,l=i-n;return s*s+l*l}function d(t,i,e,n,s,l,h,r){const o=t-h,a=i-r,c=e-h,u=n-r,f=s-h,_=l-r,d=c*c+u*u,g=f*f+_*_;return o*(u*g-d*_)-a*(c*g-d*f)+(o*o+a*a)*(c*_-u*f)<0}function g(t,i,e,n,s,l){const h=e-t,r=n-i,o=s-t,a=l-i,c=h*h+r*r,u=o*o+a*a,f=.5/(h*a-r*o),_=(a*c-r*u)*f,d=(h*u-o*c)*f;return _*_+d*d}function y(t,i,e,n){if(n-e<=20)for(let s=e+1;s<=n;s++){const n=t[s],l=i[n];let h=s-1;for(;h>=e&&i[t[h]]>l;)t[h+1]=t[h--];t[h+1]=n}else{let s=e+1,l=n;m(t,e+n>>1,s),i[t[e]]>i[t[n]]&&m(t,e,n),i[t[s]]>i[t[n]]&&m(t,s,n),i[t[e]]>i[t[s]]&&m(t,e,s);const h=t[s],r=i[h];for(;;){do{s++}while(i[t[s]]<r);do{l--}while(i[t[l]]>r);if(l<s)break;m(t,s,l)}t[e+1]=t[l],t[l]=h,n-s+1>=l-e?(y(t,i,s,n),y(t,i,e,l-1)):(y(t,i,e,l-1),y(t,i,s,n))}}function m(t,i,e){const n=t[i];t[i]=t[e],t[e]=n}function x(t){return t[0]}function p(t){return t[1]}const w=1e-6;class v{constructor(){this._x0=this._y0=this._x1=this._y1=null,this._=""}moveTo(t,i){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+i}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")}lineTo(t,i){this._+=`L${this._x1=+t},${this._y1=+i}`}arc(t,i,e){const n=(t=+t)+(e=+e),s=i=+i;if(e<0)throw new Error("negative radius");null===this._x1?this._+=`M${n},${s}`:(Math.abs(this._x1-n)>w||Math.abs(this._y1-s)>w)&&(this._+="L"+n+","+s),e&&(this._+=`A${e},${e},0,1,1,${t-e},${i}A${e},${e},0,1,1,${this._x1=n},${this._y1=s}`)}rect(t,i,e,n){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+i}h${+e}v${+n}h${-e}Z`}value(){return this._||null}}class b{constructor(){this._=[]}moveTo(t,i){this._.push([t,i])}closePath(){this._.push(this._[0].slice())}lineTo(t,i){this._.push([t,i])}value(){return this._.length?this._:null}}class T{constructor(t,[i,e,n,s]=[0,0,960,500]){if(!((n=+n)>=(i=+i)&&(s=+s)>=(e=+e)))throw new Error("invalid bounds");this.delaunay=t,this._circumcenters=new Float64Array(2*t.points.length),this.vectors=new Float64Array(2*t.points.length),this.xmax=n,this.xmin=i,this.ymax=s,this.ymin=e,this._init()}update(){return this.delaunay.update(),this._init(),this}_init(){const{delaunay:{points:t,hull:i,triangles:e},vectors:n}=this,s=this.circumcenters=this._circumcenters.subarray(0,e.length/3*2);for(let i,n,l=0,h=0,r=e.length;l<r;l+=3,h+=2){const r=2*e[l],o=2*e[l+1],a=2*e[l+2],c=t[r],u=t[r+1],f=t[o],_=t[o+1],d=t[a],g=t[a+1],y=f-c,m=_-u,x=d-c,p=g-u,w=2*(y*p-m*x);if(Math.abs(w)<1e-9){let s=1e9;const l=2*e[0];s*=Math.sign((t[l]-c)*p-(t[l+1]-u)*x),i=(c+d)/2-s*p,n=(u+g)/2+s*x}else{const t=1/w,e=y*y+m*m,s=x*x+p*p;i=c+(p*e-m*s)*t,n=u+(y*s-x*e)*t}s[h]=i,s[h+1]=n}let l,h,r,o=i[i.length-1],a=4*o,c=t[2*o],u=t[2*o+1];n.fill(0);for(let e=0;e<i.length;++e)o=i[e],l=a,h=c,r=u,a=4*o,c=t[2*o],u=t[2*o+1],n[l+2]=n[a]=r-u,n[l+3]=n[a+1]=c-h}render(t){const i=null==t?t=new v:void 0,{delaunay:{halfedges:e,inedges:n,hull:s},circumcenters:l,vectors:h}=this;if(s.length<=1)return null;for(let i=0,n=e.length;i<n;++i){const n=e[i];if(n<i)continue;const s=2*Math.floor(i/3),h=2*Math.floor(n/3),r=l[s],o=l[s+1],a=l[h],c=l[h+1];this._renderSegment(r,o,a,c,t)}let r,o=s[s.length-1];for(let i=0;i<s.length;++i){r=o,o=s[i];const e=2*Math.floor(n[o]/3),a=l[e],c=l[e+1],u=4*r,f=this._project(a,c,h[u+2],h[u+3]);f&&this._renderSegment(a,c,f[0],f[1],t)}return i&&i.value()}renderBounds(t){const i=null==t?t=new v:void 0;return t.rect(this.xmin,this.ymin,this.xmax-this.xmin,this.ymax-this.ymin),i&&i.value()}renderCell(t,i){const e=null==i?i=new v:void 0,n=this._clip(t);if(null===n||!n.length)return;i.moveTo(n[0],n[1]);let s=n.length;for(;n[0]===n[s-2]&&n[1]===n[s-1]&&s>1;)s-=2;for(let t=2;t<s;t+=2)n[t]===n[t-2]&&n[t+1]===n[t-1]||i.lineTo(n[t],n[t+1]);return i.closePath(),e&&e.value()}*cellPolygons(){const{delaunay:{points:t}}=this;for(let i=0,e=t.length/2;i<e;++i){const t=this.cellPolygon(i);t&&(t.index=i,yield t)}}cellPolygon(t){const i=new b;return this.renderCell(t,i),i.value()}_renderSegment(t,i,e,n,s){let l;const h=this._regioncode(t,i),r=this._regioncode(e,n);0===h&&0===r?(s.moveTo(t,i),s.lineTo(e,n)):(l=this._clipSegment(t,i,e,n,h,r))&&(s.moveTo(l[0],l[1]),s.lineTo(l[2],l[3]))}contains(t,i,e){return(i=+i)==i&&(e=+e)==e&&this.delaunay._step(t,i,e)===t}*neighbors(t){const i=this._clip(t);if(i)for(const e of this.delaunay.neighbors(t)){const t=this._clip(e);if(t)t:for(let n=0,s=i.length;n<s;n+=2)for(let l=0,h=t.length;l<h;l+=2)if(i[n]==t[l]&&i[n+1]==t[l+1]&&i[(n+2)%s]==t[(l+h-2)%h]&&i[(n+3)%s]==t[(l+h-1)%h]){yield e;break t}}}_cell(t){const{circumcenters:i,delaunay:{inedges:e,halfedges:n,triangles:s}}=this,l=e[t];if(-1===l)return null;const h=[];let r=l;do{const e=Math.floor(r/3);if(h.push(i[2*e],i[2*e+1]),r=r%3==2?r-2:r+1,s[r]!==t)break;r=n[r]}while(r!==l&&-1!==r);return h}_clip(t){if(0===t&&1===this.delaunay.hull.length)return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];const i=this._cell(t);if(null===i)return null;const{vectors:e}=this,n=4*t;return e[n]||e[n+1]?this._clipInfinite(t,i,e[n],e[n+1],e[n+2],e[n+3]):this._clipFinite(t,i)}_clipFinite(t,i){const e=i.length;let n,s,l,h,r=null,o=i[e-2],a=i[e-1],c=this._regioncode(o,a),u=0;for(let f=0;f<e;f+=2)if(n=o,s=a,o=i[f],a=i[f+1],l=c,c=this._regioncode(o,a),0===l&&0===c)h=u,u=0,r?r.push(o,a):r=[o,a];else{let i,e,f,_,d;if(0===l){if(null===(i=this._clipSegment(n,s,o,a,l,c)))continue;[e,f,_,d]=i}else{if(null===(i=this._clipSegment(o,a,n,s,c,l)))continue;[_,d,e,f]=i,h=u,u=this._edgecode(e,f),h&&u&&this._edge(t,h,u,r,r.length),r?r.push(e,f):r=[e,f]}h=u,u=this._edgecode(_,d),h&&u&&this._edge(t,h,u,r,r.length),r?r.push(_,d):r=[_,d]}if(r)h=u,u=this._edgecode(r[0],r[1]),h&&u&&this._edge(t,h,u,r,r.length);else if(this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2))return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];return r}_clipSegment(t,i,e,n,s,l){for(;;){if(0===s&&0===l)return[t,i,e,n];if(s&l)return null;let h,r,o=s||l;8&o?(h=t+(e-t)*(this.ymax-i)/(n-i),r=this.ymax):4&o?(h=t+(e-t)*(this.ymin-i)/(n-i),r=this.ymin):2&o?(r=i+(n-i)*(this.xmax-t)/(e-t),h=this.xmax):(r=i+(n-i)*(this.xmin-t)/(e-t),h=this.xmin),s?(t=h,i=r,s=this._regioncode(t,i)):(e=h,n=r,l=this._regioncode(e,n))}}_clipInfinite(t,i,e,n,s,l){let h,r=Array.from(i);if((h=this._project(r[0],r[1],e,n))&&r.unshift(h[0],h[1]),(h=this._project(r[r.length-2],r[r.length-1],s,l))&&r.push(h[0],h[1]),r=this._clipFinite(t,r))for(let i,e=0,n=r.length,s=this._edgecode(r[n-2],r[n-1]);e<n;e+=2)i=s,s=this._edgecode(r[e],r[e+1]),i&&s&&(e=this._edge(t,i,s,r,e),n=r.length);else this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2)&&(r=[this.xmin,this.ymin,this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax]);return r}_edge(t,i,e,n,s){for(;i!==e;){let e,l;switch(i){case 5:i=4;continue;case 4:i=6,e=this.xmax,l=this.ymin;break;case 6:i=2;continue;case 2:i=10,e=this.xmax,l=this.ymax;break;case 10:i=8;continue;case 8:i=9,e=this.xmin,l=this.ymax;break;case 9:i=1;continue;case 1:i=5,e=this.xmin,l=this.ymin}n[s]===e&&n[s+1]===l||!this.contains(t,e,l)||(n.splice(s,0,e,l),s+=2)}if(n.length>4)for(let t=0;t<n.length;t+=2){const i=(t+2)%n.length,e=(t+4)%n.length;(n[t]===n[i]&&n[i]===n[e]||n[t+1]===n[i+1]&&n[i+1]===n[e+1])&&(n.splice(i,2),t-=2)}return s}_project(t,i,e,n){let s,l,h,r=1/0;if(n<0){if(i<=this.ymin)return null;(s=(this.ymin-i)/n)<r&&(h=this.ymin,l=t+(r=s)*e)}else if(n>0){if(i>=this.ymax)return null;(s=(this.ymax-i)/n)<r&&(h=this.ymax,l=t+(r=s)*e)}if(e>0){if(t>=this.xmax)return null;(s=(this.xmax-t)/e)<r&&(l=this.xmax,h=i+(r=s)*n)}else if(e<0){if(t<=this.xmin)return null;(s=(this.xmin-t)/e)<r&&(l=this.xmin,h=i+(r=s)*n)}return[l,h]}_edgecode(t,i){return(t===this.xmin?1:t===this.xmax?2:0)|(i===this.ymin?4:i===this.ymax?8:0)}_regioncode(t,i){return(t<this.xmin?1:t>this.xmax?2:0)|(i<this.ymin?4:i>this.ymax?8:0)}}const M=2*Math.PI,A=Math.pow;function k(t){return t[0]}function $(t){return t[1]}function P(t,i,e){return[t+Math.sin(t+i)*e,i+Math.cos(t-i)*e]}class S{static from(t,i=k,e=$,n){return new S("length"in t?function(t,i,e,n){const s=t.length,l=new Float64Array(2*s);for(let h=0;h<s;++h){const s=t[h];l[2*h]=i.call(n,s,h,t),l[2*h+1]=e.call(n,s,h,t)}return l}(t,i,e,n):Float64Array.from(function*(t,i,e,n){let s=0;for(const l of t)yield i.call(n,l,s,t),yield e.call(n,l,s,t),++s}(t,i,e,n)))}constructor(t){this._delaunator=new f(t),this.inedges=new Int32Array(t.length/2),this._hullIndex=new Int32Array(t.length/2),this.points=this._delaunator.coords,this._init()}update(){return this._delaunator.update(),this._init(),this}_init(){const t=this._delaunator,i=this.points;if(t.hull&&t.hull.length>2&&function(t){const{triangles:i,coords:e}=t;for(let t=0;t<i.length;t+=3){const n=2*i[t],s=2*i[t+1],l=2*i[t+2];if((e[l]-e[n])*(e[s+1]-e[n+1])-(e[s]-e[n])*(e[l+1]-e[n+1])>1e-10)return!1}return!0}(t)){this.collinear=Int32Array.from({length:i.length/2},((t,i)=>i)).sort(((t,e)=>i[2*t]-i[2*e]||i[2*t+1]-i[2*e+1]));const t=this.collinear[0],e=this.collinear[this.collinear.length-1],n=[i[2*t],i[2*t+1],i[2*e],i[2*e+1]],s=1e-8*Math.hypot(n[3]-n[1],n[2]-n[0]);for(let t=0,e=i.length/2;t<e;++t){const e=P(i[2*t],i[2*t+1],s);i[2*t]=e[0],i[2*t+1]=e[1]}this._delaunator=new f(i)}else delete this.collinear;const e=this.halfedges=this._delaunator.halfedges,n=this.hull=this._delaunator.hull,s=this.triangles=this._delaunator.triangles,l=this.inedges.fill(-1),h=this._hullIndex.fill(-1);for(let t=0,i=e.length;t<i;++t){const i=s[t%3==2?t-2:t+1];-1!==e[t]&&-1!==l[i]||(l[i]=t)}for(let t=0,i=n.length;t<i;++t)h[n[t]]=t;n.length<=2&&n.length>0&&(this.triangles=new Int32Array(3).fill(-1),this.halfedges=new Int32Array(3).fill(-1),this.triangles[0]=n[0],l[n[0]]=1,2===n.length&&(l[n[1]]=0,this.triangles[1]=n[1],this.triangles[2]=n[1]))}voronoi(t){return new T(this,t)}*neighbors(t){const{inedges:i,hull:e,_hullIndex:n,halfedges:s,triangles:l,collinear:h}=this;if(h){const i=h.indexOf(t);return i>0&&(yield h[i-1]),void(i<h.length-1&&(yield h[i+1]))}const r=i[t];if(-1===r)return;let o=r,a=-1;do{if(yield a=l[o],o=o%3==2?o-2:o+1,l[o]!==t)return;if(o=s[o],-1===o){const i=e[(n[t]+1)%e.length];return void(i!==a&&(yield i))}}while(o!==r)}find(t,i,e=0){if((t=+t)!=t||(i=+i)!=i)return-1;const n=e;let s;for(;(s=this._step(e,t,i))>=0&&s!==e&&s!==n;)e=s;return s}_step(t,i,e){const{inedges:n,hull:s,_hullIndex:l,halfedges:h,triangles:r,points:o}=this;if(-1===n[t]||!o.length)return(t+1)%(o.length>>1);let a=t,c=A(i-o[2*t],2)+A(e-o[2*t+1],2);const u=n[t];let f=u;do{let n=r[f];const u=A(i-o[2*n],2)+A(e-o[2*n+1],2);if(u<c&&(c=u,a=n),f=f%3==2?f-2:f+1,r[f]!==t)break;if(f=h[f],-1===f){if(f=s[(l[t]+1)%s.length],f!==n&&A(i-o[2*f],2)+A(e-o[2*f+1],2)<c)return f;break}}while(f!==u);return a}render(t){const i=null==t?t=new v:void 0,{points:e,halfedges:n,triangles:s}=this;for(let i=0,l=n.length;i<l;++i){const l=n[i];if(l<i)continue;const h=2*s[i],r=2*s[l];t.moveTo(e[h],e[h+1]),t.lineTo(e[r],e[r+1])}return this.renderHull(t),i&&i.value()}renderPoints(t,i){void 0!==i||t&&"function"==typeof t.moveTo||(i=t,t=null),i=null==i?2:+i;const e=null==t?t=new v:void 0,{points:n}=this;for(let e=0,s=n.length;e<s;e+=2){const s=n[e],l=n[e+1];t.moveTo(s+i,l),t.arc(s,l,i,0,M)}return e&&e.value()}renderHull(t){const i=null==t?t=new v:void 0,{hull:e,points:n}=this,s=2*e[0],l=e.length;t.moveTo(n[s],n[s+1]);for(let i=1;i<l;++i){const s=2*e[i];t.lineTo(n[s],n[s+1])}return t.closePath(),i&&i.value()}hullPolygon(){const t=new b;return this.renderHull(t),t.value()}renderTriangle(t,i){const e=null==i?i=new v:void 0,{points:n,triangles:s}=this,l=2*s[t*=3],h=2*s[t+1],r=2*s[t+2];return i.moveTo(n[l],n[l+1]),i.lineTo(n[h],n[h+1]),i.lineTo(n[r],n[r+1]),i.closePath(),e&&e.value()}*trianglePolygons(){const{triangles:t}=this;for(let i=0,e=t.length/3;i<e;++i)yield this.trianglePolygon(i)}trianglePolygon(t){const i=new b;return this.renderTriangle(t,i),i.value()}}t.Delaunay=S,t.Voronoi=T,Object.defineProperty(t,"__esModule",{value:!0})}));

function wrapper(plugin_info) {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if(typeof window.plugin !== 'function') window.plugin = function() {};

    //use own namespace for plugin
    var landgrab = window.plugin.landgrab = function() {};

    landgrab.portalInfo = [];
    landgrab.portalIndex = {};
    landgrab.captureScores = [];
    landgrab.visitScores = [];
    landgrab.totalCaptureScore = 0;
    landgrab.totalVisitScore = 0;
    landgrab.voronoi = null;
    landgrab.captureColorGradient = ['#000000', '#b20000', '#da0000', '#e72400', '#f14c00', '#fa7400', '#fc9200', '#feb900', '#ffde04', '#ffe432', '#ffea60'];
    landgrab.visitColorGradient = ['#000000', '#b200b2', '#da00da', '#e700c3', '#f100a5', '#fa0086', '#fc006a', '#fe0045', '#ff0421', '#ff321b', '#ff6015'];

    landgrab.disabledMessage = null;
    landgrab.contentHTML = null;

    landgrab.voronoiStyle = {
        stroke: true,
        color: '#FF00FF',
        weight: 4,
        opacity: 0.5,
        interactive: false,
        fill: true,
        fillColor: null, // to use the same as 'color' for fill
        fillOpacity: 0.2,
        dashArray: ''
    };

    landgrab.onPortalSelected = function() {
        // TODO
    }

    landgrab.onPortalDetailsUpdated = function() {
        if(typeof(Storage) === "undefined") {
            $('#portaldetails > .imgpreview').after(landgrab.disabledMessage);
            return;
        }

        var guid = window.selectedPortal,
            details = window.portalDetail.get(guid),
            nickname = window.PLAYER.nickname;
        if(details) {
            let [idx, portalInfo] = landgrab.getPortal(guid);
            if(details.history) {
                if(details.history.captured && !portalInfo.captured) {
                    portalInfo.captured = true;
                    landgrab.computeScores();
                    landgrab.storePortalInfo();
                }
            }
            if (landgrab.captureScores == null) {
                console.log("scores are null!");
                return
            }


            $('#portaldetails > .imgpreview').after(
                '<table id="landgrab-container">' +
                '<tr><th></th><th>Visited</th><th>Captured</th></tr>' +
                '<tr><td>Portal Score</td><td>' + landgrab.visitScores[idx] + '</td><td>' + landgrab.captureScores[idx] + '</td></tr>' +
                '<tr><td>Total Score</td><td>' + landgrab.totalVisitScore + '</td><td>' + landgrab.totalCaptureScore + '</td></tr>' +
                '</table>');
        }
    }

    landgrab.onPortalAdded = function (data) {
        let guid = data.portal.options.guid;
        let portal = data.portal;
        let history = portal.options.data.history;
        // Bug in stock ingress means history often doesn't show. Something about caching.
        // Reload the page and eventually it does. Or something.
        // For now we just ignore portals that don't have history.
        if (!history) { return }
        let [idx, portalInfo] = landgrab.getPortal(guid);
        if (idx == undefined) {
            // We have not seen this portal before.
            // This means we need to compute a new voronoi diagram (and scores)
            // We'll do that in mapDataRefreshEnd
            landgrab.voronoi = null;
            //console.log(history);
            landgrab.addPortal(guid, portal.options.data.latE6/1000000, portal.options.data.lngE6/1000000, history.captured);
        } else {
            if(history.captured && !portalInfo.captured) {
                // This portal has been captured since we last saw it. We need to recompute scores.
                // We'll do that in mapDataRefreshEnd
                portalInfo.captured = true;
                landgrab.scores = null;
            }
        }
    }

    landgrab.mapDataRefreshEnd = function () {
        if (!landgrab.voronoi) {
            // Using the d3-geo-voronoi package which does proper spherical geometry
            // produced extremely bad results when portals are close together, probably
            // because of rounding errors in the trigonometric functions blowing up.

            // Instead we will just ignore all that and pretend these are coordinates
            // a plane. This will totally break near the anti-prime meridian.
            // To the people of Fiji, I humbly apologise, I could not get it to work
            // properly for you.

            landgrab.voronoi = d3.Delaunay.from(
                Object.values(landgrab.portalInfo),
                p => p.lat,
                p => p.lng
            ).voronoi([-180, -180, 180, 180]);
            // need to recompute scores.
            landgrab.captureScores = null;
            landgrab.visitScores = null;
        }
        if (!landgrab.visitScores || !landgrab.captureScores) {
            landgrab.computeScores();
        }
        landgrab.storePortalInfo();
    }

    landgrab.computeScores = function() {
        landgrab.captureLayer.clearLayers();
        landgrab.totalCaptureScore = 0;
        landgrab.captureScores = [];
        landgrab.visitLayer.clearLayers();
        landgrab.totalVisitScore = 0;
        landgrab.visitScores = [];
        var uncaptured = [];
        var unvisited = [];
        for (let [i, portalInfo] of landgrab.portalInfo.entries()) {
            if (!portalInfo.captured) {
                uncaptured.push(i)
            }
            if (!portalInfo.visited) {
                unvisited.push(i)
            }
        }
        landgrab.computeScoresInner(
            0, uncaptured, 'captureLayer', 'captureColorGradient', 'captureScores', 'totalCaptureScore');
        landgrab.computeScoresInner(
            0, unvisited, 'visitLayer', 'visitColorGradient', 'visitScores', 'totalVisitScore');

    }

    landgrab.computeScoresInner = function(depth, neighbors, layer, gradient, scores, totalScore) {
        var newneighbors = []
        for (let i of neighbors) {
            // Check if we've seen this portal before
            if (landgrab[scores][i] != undefined) { continue };
            landgrab[scores][i] = depth;
            if (depth > 0) {
                // draw on map
                let color = landgrab[gradient][depth % landgrab[gradient].length];
                let style = {...landgrab.voronoiStyle, color: color};
                landgrab[layer].addLayer(
                    new L.polygon(landgrab.voronoi.cellPolygon(i), style)
                );
            }
            landgrab[totalScore] += depth;
            for (let n of landgrab.voronoi.neighbors(i)) {
                if (landgrab[scores][n] == undefined) {
                    newneighbors.push(n)
                }
            }
        }
        if (newneighbors.length) {
            landgrab.computeScoresInner(depth+1, newneighbors, layer, gradient, scores, totalScore);
        }
    }

    landgrab.getPortal = function(guid) {
        var idx = landgrab.portalIndex[guid];
        /*if (idx == undefined) {
            console.log("guid not found", guid);
            return [null, null];
        }*/
        var portalInfo = landgrab.portalInfo[idx];
        /*if (portalInfo == undefined) {
            console.log("index not found", guid, idx);
            return [null, null];
        }
        if (portalInfo.guid != guid) {
            console.log("guid mismatch", guid, idx, portalInfo.guid);
            return [null, null];
        }*/
        return [idx, portalInfo];
    }

    landgrab.addPortal = function(guid, lat, lng, captured) {
        // It would be nice to use the guid as our portal identifiers everywhere
        // but sadly d3.Delunay only works on integer indices.
        let newlen = landgrab.portalInfo.push({
            guid: guid,
            lat: lat,
            lng: lng,
            captured: captured,
        });
        landgrab.portalIndex[guid] = newlen -1;
    }

    const key = 'plugin-landgrab-portalinfo';
    landgrab.loadPortalInfo = function() {
        if(localStorage[key] == undefined) {
            return;
        }

        var portalInfo = JSON.parse(localStorage[key]);
        if (!portalInfo instanceof Array) {return};
        // We don't set landgrab.portalInfo to the value loaded from JSON directly
        // because we need to construct landgrab.portalIndex as well.
        // So instead we call addPortal on each item.
        for (let p of portalInfo) {
            // migration from older versions that didn't store visit info
            if (p.visited == undefined) {
                p.visited = p.captured;
            }
            landgrab.addPortal(p.guid, p.lat, p.lng, p.captured, p.visited);
        }
    }

    landgrab.storePortalInfo = function() {
        // Find indicies of all visited portals and their neighbours.
        // We need the immediate neighbours of captured portals to correctly
        // draw the Voronoi diagram. Filtering in this way reduced my
        // portalInfo list from 20000 down to 7000 so it should help with
        // performance.
        let indicies = {};
        for (let [i, portalInfo] of landgrab.portalInfo.entries()) {
            if (portalInfo.visited) {
                indicies[i] = true;
                for (let j of landgrab.voronoi.neighbors(i)) {
                    indicies[j] = true;
                }
            }
        }
        // This won't take effect until the next time IITC is loaded but that's fine.
        let newPortalInfo = landgrab.portalInfo.filter((_, idx) => indicies[idx]);
        //localStorage.removeItem('plugin-landgrab-portalinfo');
        localStorage[key] = JSON.stringify(newPortalInfo);
    }

    /***************************************************************************************************************************************************************/
    /** HIGHLIGHTER ************************************************************************************************************************************************/
    /***************************************************************************************************************************************************************/
    landgrab.highlighter = {
        highlight: function(data) {
            var guid = data.portal.options.ent[0];
            let [idx, portalInfo] = landgrab.getPortal(guid);

            var style = {};

            if (portalInfo) {
                if (portalInfo.captured) {
                    // captured - no highlights
                } else {
                    // we have an 'portalInfo' entry for the portal, but it's not captured
                    style.fillColor = 'white';
                    style.fillOpacity = 1.0;
                }
            } else {
                // no visit data at all
                style.fillColor = 'white';
                style.fillOpacity = 1.0;
            }

            data.portal.setStyle(style);
        },
    }


    landgrab.setupCSS = function() {
        $("<style>")
            .prop("type", "text/css")
            .html('\
#landgrab-container {\
  text-align: center;\
  margin: 6px auto 1px auto;\
  padding: 0 4px;\
}\
')
            .appendTo("head");
    }

    landgrab.setupContent = function() {
        landgrab.disabledMessage = '<div id="landgrab-container" class="help" title="Your browser does not support localStorage">Plugin landgrab disabled</div>';
    }

    var setup = function() {
        landgrab.setupCSS();
        landgrab.setupContent();
        landgrab.loadPortalInfo();
        window.COLORS[0] = "#777777";

        window.addPortalHighlighter('landgrab', landgrab.highlighter);
        window.addHook('portalDetailsUpdated', landgrab.onPortalDetailsUpdated);
        window.addHook('portalSelected', landgrab.onPortalSelected);
        window.addHook('portalAdded', landgrab.onPortalAdded);
        window.addHook('mapDataRefreshEnd', landgrab.mapDataRefreshEnd);
        landgrab.captureLayer = new L.LayerGroup();
        landgrab.visitLayer = new L.LayerGroup();
        window.addLayerGroup('Landgrab: Grabbed land', landgrab.captureLayer, true);
        window.addLayerGroup('Landgrab: Visited land', landgrab.visitLayer, true);
        // This is janky as heck but it works.
        // We need the timeout because if we remove the layer before the addLayer function has completed it breaks the layer chooser.
        // There is a groupedLayerControl thing for leaflet that would do it better but I don't want to mess with the internals of IITC.
        landgrab.captureLayer.on('add', _ => setTimeout(_ => window.map.removeLayer(landgrab.visitLayer), 10))
        landgrab.visitLayer.on('add', _ => setTimeout(_ => window.map.removeLayer(landgrab.captureLayer), 10))
    }

    setup.info = plugin_info; //add the script info data to the function as a property
    if(!window.bootPlugins) window.bootPlugins = [];
    window.bootPlugins.push(setup);
    // if IITC has already booted, immediately run the 'setup' function
    if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
