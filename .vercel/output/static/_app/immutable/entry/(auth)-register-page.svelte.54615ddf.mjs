import{S as Ee,i as Ie,s as De,k as r,q as y,a as m,l as s,m as l,r as x,h as a,c as v,n as e,b as xe,D as t,K as we}from"../chunks/index.deb332b0.mjs";function ye(S){let o,d;return{c(){o=r("div"),d=y("Something went wrong. Please try again"),this.h()},l(n){o=s(n,"DIV",{class:!0});var u=l(o);d=x(u,"Something went wrong. Please try again"),u.forEach(a),this.h()},h(){e(o,"class","text-red-500 mt-2 text-sm font-bold text-center")},m(n,u){xe(n,o,u),t(o,d)},d(n){n&&a(o)}}}function ke(S){var de;let o,d,n,u,K,M,i,O,E,k,z,G,b,J,h,V,Q,W,p,X,q,Y,Z,I,L,$,ee,g,te,D,P,re,se,_,ae,A,U,oe,le,B,R,ie,c=((de=S[0])==null?void 0:de.error)&&ye();return{c(){o=r("div"),d=r("div"),n=r("div"),u=r("h1"),K=y("Registration"),M=m(),i=r("form"),c&&c.c(),O=m(),E=r("div"),k=r("label"),z=y("Username"),G=m(),b=r("input"),J=m(),h=r("div"),V=r("label"),Q=y("Email"),W=m(),p=r("input"),X=m(),q=r("div"),Y=y("Used for password resets"),Z=m(),I=r("div"),L=r("label"),$=y("Password"),ee=m(),g=r("input"),te=m(),D=r("div"),P=r("label"),re=y("Retype password"),se=m(),_=r("input"),ae=m(),A=r("div"),U=r("button"),oe=y("Register"),le=m(),B=r("div"),R=r("a"),ie=y("Have an account? Login here"),this.h()},l(T){o=s(T,"DIV",{class:!0});var H=l(o);d=s(H,"DIV",{class:!0});var w=l(d);n=s(w,"DIV",{id:!0});var ne=l(n);u=s(ne,"H1",{class:!0});var ce=l(u);K=x(ce,"Registration"),ce.forEach(a),ne.forEach(a),M=v(w),i=s(w,"FORM",{action:!0,method:!0});var f=l(i);c&&c.l(f),O=v(f),E=s(f,"DIV",{class:!0});var j=l(E);k=s(j,"LABEL",{class:!0,for:!0});var ue=l(k);z=x(ue,"Username"),ue.forEach(a),G=v(j),b=s(j,"INPUT",{class:!0,id:!0,type:!0,name:!0}),j.forEach(a),J=v(f),h=s(f,"DIV",{class:!0});var N=l(h);V=s(N,"LABEL",{class:!0,for:!0});var fe=l(V);Q=x(fe,"Email"),fe.forEach(a),W=v(N),p=s(N,"INPUT",{class:!0,id:!0,type:!0,name:!0}),X=v(N),q=s(N,"DIV",{class:!0});var me=l(q);Y=x(me,"Used for password resets"),me.forEach(a),N.forEach(a),Z=v(f),I=s(f,"DIV",{class:!0});var C=l(I);L=s(C,"LABEL",{class:!0,for:!0});var ve=l(L);$=x(ve,"Password"),ve.forEach(a),ee=v(C),g=s(C,"INPUT",{class:!0,id:!0,type:!0,name:!0}),C.forEach(a),te=v(f),D=s(f,"DIV",{class:!0});var F=l(D);P=s(F,"LABEL",{class:!0,for:!0});var he=l(P);re=x(he,"Retype password"),he.forEach(a),se=v(F),_=s(F,"INPUT",{class:!0,id:!0,type:!0,name:!0}),F.forEach(a),ae=v(f),A=s(f,"DIV",{class:!0});var be=l(A);U=s(be,"BUTTON",{type:!0,class:!0});var pe=l(U);oe=x(pe,"Register"),pe.forEach(a),be.forEach(a),f.forEach(a),le=v(w),B=s(w,"DIV",{class:!0});var ge=l(B);R=s(ge,"A",{href:!0,class:!0});var _e=l(R);ie=x(_e,"Have an account? Login here"),_e.forEach(a),ge.forEach(a),w.forEach(a),H.forEach(a),this.h()},h(){e(u,"class","mb-6 text-3xl font-bold text-center"),e(n,"id","registration-header"),e(k,"class","block text-sm"),e(k,"for","username"),e(b,"class","p-2.5 rounded-lg shadow-sm border-2 border-gray-300 focus:border-indigo-600 block mt-1 w-full"),e(b,"id","username"),e(b,"type","text"),e(b,"name","username"),b.required=!0,b.value="",e(E,"class","mb-5"),e(V,"class","block text-sm"),e(V,"for","email"),e(p,"class","p-2.5 rounded-lg shadow-sm border-2 border-gray-300 focus:border-indigo-600 block mt-1 w-full"),e(p,"id","email"),e(p,"type","email"),e(p,"name","email"),p.required=!0,p.value="",e(q,"class","text-sm text-gray-500"),e(h,"class","mb-5"),e(L,"class","block text-sm"),e(L,"for","password"),e(g,"class","p-2.5 rounded-lg shadow-sm border-2 border-gray-300 focus:border-indigo-600 block mt-1 w-full"),e(g,"id","password"),e(g,"type","password"),e(g,"name","password"),g.required=!0,g.value="",e(I,"class","mb-5"),e(P,"class","block text-sm"),e(P,"for","password_confirmation"),e(_,"class","p-2.5 rounded-lg shadow-sm border-2 border-gray-300 focus:border-indigo-600 block mt-1 w-full"),e(_,"id","password_confirmation"),e(_,"type","password"),e(_,"name","password_confirmation"),_.required=!0,_.value="",e(D,"class","mb-5"),e(U,"type","submit"),e(U,"class","w-full bg-indigo-700 px-4 py-2 border border-transparent rounded text-white hover:bg-indigo-600 focus:bg-indigo-600 focus:ring focus:ring-indigo-300 disabled:opacity-25 transition duration-150"),e(A,"class","mb-6"),e(i,"action","?/register"),e(i,"method","POST"),e(R,"href","/login"),e(R,"class","cursor:pointer text-indigo-800 hover:text-indigo-600 hover:underline transition-colors text-sm opacity-75"),e(B,"class","text-center"),e(d,"class","lg:w-4/12 md:w-8/12 w-11/12 bg-white my-4 p-6 rounded-lg shadow-md"),e(o,"class","flex justify-center items-center min-h-screen")},m(T,H){xe(T,o,H),t(o,d),t(d,n),t(n,u),t(u,K),t(d,M),t(d,i),c&&c.m(i,null),t(i,O),t(i,E),t(E,k),t(k,z),t(E,G),t(E,b),t(i,J),t(i,h),t(h,V),t(V,Q),t(h,W),t(h,p),t(h,X),t(h,q),t(q,Y),t(i,Z),t(i,I),t(I,L),t(L,$),t(I,ee),t(I,g),t(i,te),t(i,D),t(D,P),t(P,re),t(D,se),t(D,_),t(i,ae),t(i,A),t(A,U),t(U,oe),t(d,le),t(d,B),t(B,R),t(R,ie)},p(T,[H]){var w;(w=T[0])!=null&&w.error?c||(c=ye(),c.c(),c.m(i,O)):c&&(c.d(1),c=null)},i:we,o:we,d(T){T&&a(o),c&&c.d()}}}function Ve(S,o,d){let{form:n}=o;return S.$$set=u=>{"form"in u&&d(0,n=u.form)},[n]}class Pe extends Ee{constructor(o){super(),Ie(this,o,Ve,ke,De,{form:0})}}export{Pe as default};