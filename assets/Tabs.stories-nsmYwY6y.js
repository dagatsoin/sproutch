import{j as o}from"./extends-C7_UVhvk.js";import{r as x,R as ge}from"./index-R2V08a_e.js";import{c as pe,D as _,a as G}from"./create-icon-set-B8RN24XO.js";import{g as te,e as A,s as B,h as ae,o as f,i as F,j as ye,k as he,l as be,m as ne,V as q,T as ie,F as se,n as R,b as oe,M as le,A as m,r as U,q as ve,P as ke,t as fe,v as k}from"./BackgroundImage-BQD4Zmgx.js";import"./index-Dv5xzOwU.js";const qe=a=>e=>{const r=x.useContext(te),{innerRef:t,...n}=e,i=a;return o.jsx(i,{theme:r,ref:t,...n})};var we=Object.defineProperty,$=Object.getOwnPropertySymbols,Se=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable,W=(a,e,r)=>e in a?we(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r,K=(a,e)=>{for(var r in e||(e={}))Se.call(e,r)&&W(a,r,e[r]);if($)for(var r of $(e))xe.call(e,r)&&W(a,r,e[r]);return a},Te=(a,e,r)=>W(a,e+"",r);function Ie(a,e={}){const r=Object.keys(a);if(r.length===0)throw new Error("You need to add at least one style");const t=K({defaultStyle:r[0],fallbackFamily:()=>r[0],glyphValidator:()=>!0},e),n=r.reduce((s,u)=>{const d=a[u];return s[u]=pe(d.glyphMap||{},d.fontFamily||"",d.fontFile||"",d.fontStyle||{}),s},{});function i(s){return Object.keys(s).reduce((u,d)=>r.indexOf(d)!==-1&&s[d]===!0?d:u,t.defaultStyle)}function c(s){const{name:u}=s,d=i(s);if(t.glyphValidator(u,d))return n[d];const S=t.fallbackFamily(u);return r.indexOf(S)===-1?t.defaultStyle:n[S]}function l(s,u){return u.length>0?s[u]:s}function p(s){return Object.keys(s).reduce((u,d)=>(r.indexOf(d)===-1&&(u[d]=s[d]),u),{})}function h(s,u=""){return r.indexOf(s)===-1?n[t.defaultStyle]:u?c({name:u,[s]:!0}):n[i({[s]:!0})]}function I(s,u=_,d=G,S=t.defaultStyle){return h(S,s).getImageSource(s,u,d)}function w(s,u=_,d=G,S=t.defaultStyle){return h(S,s).getImageSourceSync(s,u,d)}function O(s=t.defaultStyle){return h(s).getFontFamily()}function T(s=t.defaultStyle){return h(s).getRawGlyphMap()}function b(s,u=t.defaultStyle){return t.glyphValidator(s,u)}function v(s=""){class u extends x.PureComponent{render(){const S=c(this.props),V=l(S,s),E=p(this.props);return ge.createElement(V,K({},E))}}return Te(u,"defaultProps",r.reduce((d,S)=>(d[S]=!1,d),{})),u}const y=v();return y.Button=v("Button"),y.getStyledIconSet=h,y.getImageSource=I,y.getImageSourceSync=w,y.getFontFamily=O,y.getRawGlyphMap=T,y.hasIcon=b,y}function je(a,e={},r=!1){const t=Object.keys(e),n=`FontAwesome5${r?"Pro":"Free"}`;function i(T){for(let b=0;b<t.length;b+=1){const v=t[b];if(e[v].indexOf(T)!==-1)return v==="brands"?"brand":v}return"regular"}function c(T,b){const v=b==="brand"?"brands":b;return t.indexOf(v)===-1?!1:e[v].indexOf(T)!==-1}function l(T,b,v=n){let y=T,s=`FontAwesome5_${r?`Pro_${y}`:y}.ttf`;return y==="Brands"&&(y="Regular",s="FontAwesome5_Brands.ttf"),{fontFamily:`${v}-${y}`,fontFile:s,fontStyle:A.select({ios:{fontWeight:b},default:{}}),glyphMap:a}}const p=l("Brands","400","FontAwesome5Brands"),h=l("Light","300"),I=l("Regular","400"),w=l("Solid","900");return Ie({brand:p,light:h,regular:I,solid:w},{defaultStyle:"regular",fallbackFamily:i,glyphValidator:c})}const Oe=62313,Be=63041,Pe=61506,Ae=61808,Ce=62314,Re=62315,ze=63540,Ve=62316,Le=63042,Me=62561,Fe=62064,We=61689,De=62317,Ne=61757,Ee=61819,He=61961,Xe=62806,Ye=62318,_e=62496,Ge=63044,Ue=62321,$e=61817,Ke=61831,Ze=62807,Je=63354,Qe=61545,er=62322,rr=61946,tr=62808,ar=63355,nr=62930,ir=62323,sr=62492,or=62324,lr=62497,ur=62809,cr=62325,dr=63356,mr=62810,gr=61514,pr=63461,yr=57433,hr=57434,br=63078,vr=61534,kr=62165,fr=61482,qr=61641,wr=62157,Sr=62006,xr=61692,Tr=61876,Ir=61683,jr=63047,Or=61958,Br=63562,Pr=62328,Ar=61925,Cr=63360,Rr=61809,zr=62329,Vr=62330,Lr=62331,Mr=62743,Fr=62109,Wr=63361,Dr=62332,Nr=62099,Er=61490,Hr=61671,Xr=61922,Yr=62935,_r=62812,Gr=61485,Ur=61486,$r=63542,Kr=62566,Zr=62568,Jr=62113,Qr=62940,et=61617,rt=62746,tt=62813,at=61786,nt=63543,it=61832,st=61869,ot=61601,lt=61760,ut=62570,ct=62335,dt=61959,mt=61965,gt=61932,pt=61747,yt=61488,ht=63163,bt=62815,vt=62571,kt=61881,ft=63743,qt=63367,wt=63166,St=62336,xt=63369,Tt=61603,It=63168,jt=62747,Ot=61452,Bt=63471,Pt=62521,At=61870,Ct=62056,Rt=63544,zt=62749,Vt=61713,Lt=63055,Mt=62248,Ft=61463,Wt=62029,Dt=61634,Nt=57469,Et=62339,Ht=62340,Xt=62341,Yt=62817,_t=61729,Gt=61899,Ut=62084,$t=61684,Kt=61459,Zt=61573,Jt=62750,Qt=61659,ea=61557,ra=61574,ta=61774,aa=61542,na=63373,ia=61966,sa=62061,oa=62819,la=61637,ua=61945,ca=62648,da=62344,ma=61733,ga=63060,pa=61531,ya=62752,ha=62753,ba=63479,va=61756,ka=61874,fa=61875,qa=61636,wa=62348,Sa=57426,xa=61968,Ta=61888,Ia=62116,ja=57463,Oa=61861,Ba=63303,Pa=62350,Aa=62351,Ca=61704,Ra=63180,za=61885,Va=63061,La=63376,Ma=62576,Fa=63377,Wa=62754,Da=61862,Na=62955,Ea=62354,Ha=62355,Xa=63482,Ya=62761,_a=62823,Ga=62577,Ua=62356,$a=62357,Ka=63187,Za=62578,Ja=62649,Qa=62650,en=61465,rn=62358,tn=63189,an=61821,nn=61803,sn=62825,on=61865,ln=62539,un=63379,cn=63193,dn=62361,mn=62362,gn=62708,pn=62082,yn=61508,hn=63483,bn=61522,vn=62512,kn=62961,fn=62499,qn=61905,wn=61664,Sn=62105,xn=62764,Tn=61741,In=62365,jn=62510,On=63382,Bn=62167,Pn=63545,An=61738,Cn=61541,Rn=62014,zn=61550,Vn=61594,Ln=63587,Mn=57349,Fn=61868,Wn=62765,Dn=63383,Nn=63384,En=61826,Hn=63385,Xn=61787,Yn=62837,_n=61448,Gn=61616,Un=62839,$n=61549,Kn=62057,Zn=62369,Jn=62840,Qn=61476,ei=61635,ri=61806,ti=62541,ai=62841,ni=62487,ii=61563,si=61489,oi=62080,li=61969,ui=61518,ci=61824,di=62372,mi=62766,gi=61721,pi=62731,yi=61923,hi=61723,bi=61667,vi=62373,ki=61997,fi=62048,qi=63202,wi=61547,Si=63388,xi=61907,Ti=61595,Ii=62374,ji=62102,Oi=62502,Bi=62768,Pi=62117,Ai=61612,Ci=62375,Ri=62376,zi=61856,Vi=63076,Li=61828,Mi=62166,Fi=62847,Wi=62848,Di=62380,Ni=62381,Ei=57470,Hi=63398,Xi=62382,Yi=62967,_i=63493,Gi=63203,Ui=63077,$i=62658,Ki=62133,Zi=63206,Ji=62098,Qi=61600,es=61916,rs=61477,ts=62864,as=61444,ns=61982,is=62771,ss=62865,os=63212,ls=63213,us=62546,cs=61914,ds=57471,ms=61461,gs=62503,ps=62866,ys=63216,hs=61688,bs=63503,vs=62868,ks=62385,fs=62036,qs=62076,ws=63218,Ss=61755,xs=62386,Ts=63405,Is=63597,js=57363,Os=63406,Bs=61502,Ps=62210,As=62168,Cs=61468,Rs=61500,zs=62069,Vs=62772,Ls=61737,Ms=57472,Fs=61805,Ws=57473,Ds=63407,Ns=63408,Es=61960,Hs=61491,Xs=62388,Ys=62692,_s=63081,Gs=62390,Us=63409,$s=62391,Ks=62869,Zs=61866,Js=62392,Qs=61900,eo=63083,ro=62970,to=61572,ao=62709,no=61724,io=62394,so=63085,oo=62395,lo=62870,uo=62511,co=63087,mo=61867,go=61705,po=62397,yo=61954,ho=62873,bo=61548,vo=61970,ko=61588,fo=62493,qo=61675,wo=62400,So=61633,xo=61580,To=62136,Io=61820,jo=61498,Oo=61475,Bo=62980,Po=62403,Ao=62404,Co=61648,Ro=61558,zo=62878,Vo=61827,Lo=62735,Mo=62073,Fo=62991,Wo=62881,Do=61986,No=63226,Eo=62710,Ho=61750,Xo=63690,Yo=62882,_o=62406,Go=62010,Uo=61690,$o=62408,Ko=62176,Zo=62883,Jo=61722,Qo=62776,el=63411,rl=63094,tl=61987,al=63315,nl=57370,il=62171,sl=61744,ol=62992,ll=62410,ul=61544,cl=63413,dl=62411,ml=62089,gl=57430,pl=62412,yl=61707,hl=62085,bl=62416,vl=62886,kl=61830,fl=63096,ql=61980,wl=63228,Sl=63692,xl=61441,Tl=62418,Il=62994,jl=61996,Ol=61930,Bl=62888,Pl=62489,Al=62420,Cl=62421,Rl=62422,zl=62051,Vl=63097,Ll=62013,Ml=61851,Fl=62058,Wl=63698,Dl=62490,Nl=63232,El=61499,Hl=62423,Xl=61836,Yl=63509,_l=62783,Gl=62424,Ul=62594,$l=61638,Kl=61917,Zl=62784,Jl=62891,Ql=63099,eu=61674,ru=62425,tu=61516,au=61872,nu=61933,iu=63100,su=62212,ou=57475,lu=62101,uu=62785,cu=62426,du=62427,mu=61589,gu=62551,pu=62596,yu=61650,hu=61554,bu=61515,vu=62431,ku=61926,fu=61543,qu=62158,wu=63105,Su=62206,xu=63001,Tu=62432,Iu=63107,ju=62897,Ou=61487,Bu=62599,Pu=62433,Au=62434,Cu=61910,Ru=61481,zu=61736,Vu=62552,Lu=62553,Mu=62148,Fu=63111,Wu=63417,Du=63323,Nu=61556,Eu=62169,Hu=62491,Xu=63325,Yu=62677,_u=61904,Gu=62787,Uu=61880,$u=61857,Ku=63420,Zu=61470,Ju=62045,Qu=61835,ec=62437,rc=62438,tc=63326,ac=62712,nc=62439,ic=63421,sc=61561,oc=62898,lc=62678,uc=63243,cc=61464,dc=62788,mc=61749,gc=62440,pc=62441,yc=62679,hc=61598,bc=62789,vc=63244,kc=57466,fc=62055,qc=63547,wc=62494,Sc=63423,xc=61639,Tc=62442,Ic=62793,jc=62794,Oc=62090,Bc=63246,Pc=61442,Ac=62443,Cc=62680,Rc=62170,zc=61971,Vc=62003,Lc=62444,Mc=63007,Fc=61540,Wc=61978,Dc=61972,Nc=57431,Ec=62901,Hc=62156,Xc=62681,Yc=61458,_c=62903,Gc=61973,Uc=57453,$c=62446,Kc=61672,Zc=62738,Jc=63429,Qc=63430,ed=63433,rd=62796,td=61974,ad=61822,nd=61848,id=63253,sd=63436,od=61927,ld=61720,ud=63327,cd=62605,dd=63437,md=62123,gd=63438,pd=62172,yd=63440,hd=63442,bd=57454,vd=63126,kd=61660,fd=61886,qd=63443,wd=62907,Sd=62451,xd=63255,Td=61712,Id=62908,jd=61884,Od=61640,Bd=62910,Pd=63554,Ad=62911,Cd=61445,Rd=62453,zd=61878,Vd=61681,Ld=61517,Md=62194,Fd=62798,Wd=62504,Dd=62800,Nd=61644,Ed=62505,Hd=62801,Xd=62456,Yd=61860,_d=61740,Gd=62009,Ud=61682,$d=61829,Kd=62173,Zd=61739,Jd=62457,Qd=62914,em=63446,rm=62915,tm=63713,am=62916,nm=63549,im=63131,sm=61473,om=62606,lm=61646,um=61706,cm=62608,dm=61483,mm=61484,gm=62683,pm=61614,ym=61882,hm=62713,bm=63022,vm=62150,km=63447,fm=61728,qm=61450,wm=62918,Sm=62130,xm=62609,Tm=61581,Im=57467,jm=61453,Om=61507,Bm=62920,Pm=63448,Am=62802,Cm=63449,Rm=62921,zm=63136,Vm=63266,Lm=62044,Mm=57409,Fm=62008,Wm=63450,Dm=61988,Nm=61944,Em=61883,Hm=61825,Xm=62050,Ym=61585,_m=61649,Gm=62803,Um=61924,$m=61811,Km=62060,Zm=61928,Jm=61593,Qm=62507,eg=62466,rg=63455,tg=62467,ag=63720,ng=61673,ig=57476,sg=61645,og=61666,lg=62468,ug=57417,cg=61852,dg=61735,mg=61596,gg=57468,pg=62469,yg=61587,hg=63456,bg=62087,vg=61447,kg=61632,fg=63457,qg=62471,wg=62183,Sg=62472,xg=61985,Tg=57477,Ig=62007,jg=62121,Og=62610,Bg=62611,Pg=62473,Ag=61501,Cg=63143,Rg=62474,zg=61898,Vg=57460,Lg=57462,Mg=61833,Fg=62475,Wg=63639,Dg=62495,Ng=62804,Eg=62805,Hg=62612,Xg=63347,Yg=63551,_g=62924,Gg=61834,Ug=62614,$g=61911,Kg=62002,Zg=61843,Jg=62477,Qg=61931,ep=63278,rp=61818,tp=62927,ap=57480,np=61850,ip=62103,sp=62174,op=62104,lp=62436,up=61613,cp=62482,dp=61800,mp=61854,gp=63552,pp=62483,yp=63459,hp=61929,bp=62129,vp=61799,kp=63039,fp={"500px":62062,"accessible-icon":62312,accusoft:Oe,"acquisitions-incorporated":63151,ad:Be,"address-book":62137,"address-card":62139,adjust:Pe,adn:Ae,adversal:Ce,affiliatetheme:Re,"air-freshener":62928,airbnb:ze,algolia:Ve,"align-center":61495,"align-justify":61497,"align-left":61494,"align-right":61496,alipay:Le,allergies:Me,amazon:Fe,"amazon-pay":62508,ambulance:We,"american-sign-language-interpreting":62115,amilia:De,anchor:Ne,android:Ee,angellist:He,"angle-double-down":61699,"angle-double-left":61696,"angle-double-right":61697,"angle-double-up":61698,"angle-down":61703,"angle-left":61700,"angle-right":61701,"angle-up":61702,angry:Xe,angrycreative:Ye,angular:_e,ankh:Ge,"app-store":62319,"app-store-ios":62320,apper:Ue,apple:$e,"apple-alt":62929,"apple-pay":62485,archive:Ke,archway:Ze,"arrow-alt-circle-down":62296,"arrow-alt-circle-left":62297,"arrow-alt-circle-right":62298,"arrow-alt-circle-up":62299,"arrow-circle-down":61611,"arrow-circle-left":61608,"arrow-circle-right":61609,"arrow-circle-up":61610,"arrow-down":61539,"arrow-left":61536,"arrow-right":61537,"arrow-up":61538,"arrows-alt":61618,"arrows-alt-h":62263,"arrows-alt-v":62264,artstation:Je,"assistive-listening-systems":62114,asterisk:Qe,asymmetrik:er,at:rr,atlas:tr,atlassian:ar,atom:nr,audible:ir,"audio-description":62110,autoprefixer:sr,avianex:or,aviato:lr,award:ur,aws:cr,baby:dr,"baby-carriage":63357,backspace:mr,backward:gr,bacon:pr,bacteria:yr,bacterium:hr,bahai:br,"balance-scale":62030,"balance-scale-left":62741,"balance-scale-right":62742,ban:vr,"band-aid":62562,bandcamp:kr,barcode:fr,bars:qr,"baseball-ball":62515,"basketball-ball":62516,bath:wr,"battery-empty":62020,"battery-full":62016,"battery-half":62018,"battery-quarter":62019,"battery-three-quarters":62017,"battle-net":63541,bed:Sr,beer:xr,behance:Tr,"behance-square":61877,bell:Ir,"bell-slash":61942,"bezier-curve":62811,bible:jr,bicycle:Or,biking:Br,bimobject:Pr,binoculars:Ar,biohazard:Cr,"birthday-cake":61949,bitbucket:Rr,bitcoin:zr,bity:Vr,"black-tie":62078,blackberry:Lr,blender:Mr,"blender-phone":63158,blind:Fr,blog:Wr,blogger:Dr,"blogger-b":62333,bluetooth:Nr,"bluetooth-b":62100,bold:Er,bolt:Hr,bomb:Xr,bone:Yr,bong:_r,book:Gr,"book-dead":63159,"book-medical":63462,"book-open":62744,"book-reader":62938,bookmark:Ur,bootstrap:$r,"border-all":63564,"border-none":63568,"border-style":63571,"bowling-ball":62518,box:Kr,"box-open":62622,"box-tissue":57435,boxes:Zr,braille:Jr,brain:Qr,"bread-slice":63468,briefcase:et,"briefcase-medical":62569,"broadcast-tower":62745,broom:rt,brush:tt,btc:at,buffer:nt,bug:it,building:st,bullhorn:ot,bullseye:lt,burn:ut,buromobelexperte:ct,bus:dt,"bus-alt":62814,"business-time":63050,"buy-n-large":63654,buysellads:mt,calculator:gt,calendar:pt,"calendar-alt":61555,"calendar-check":62068,"calendar-day":63363,"calendar-minus":62066,"calendar-plus":62065,"calendar-times":62067,"calendar-week":63364,camera:yt,"camera-retro":61571,campground:ht,"canadian-maple-leaf":63365,"candy-cane":63366,cannabis:bt,capsules:vt,car:kt,"car-alt":62942,"car-battery":62943,"car-crash":62945,"car-side":62948,caravan:ft,"caret-down":61655,"caret-left":61657,"caret-right":61658,"caret-square-down":61776,"caret-square-left":61841,"caret-square-right":61778,"caret-square-up":61777,"caret-up":61656,carrot:qt,"cart-arrow-down":61976,"cart-plus":61975,"cash-register":63368,cat:wt,"cc-amazon-pay":62509,"cc-amex":61939,"cc-apple-pay":62486,"cc-diners-club":62028,"cc-discover":61938,"cc-jcb":62027,"cc-mastercard":61937,"cc-paypal":61940,"cc-stripe":61941,"cc-visa":61936,centercode:St,centos:xt,certificate:Tt,chair:It,chalkboard:jt,"chalkboard-teacher":62748,"charging-station":62951,"chart-area":61950,"chart-bar":61568,"chart-line":61953,"chart-pie":61952,check:Ot,"check-circle":61528,"check-double":62816,"check-square":61770,cheese:Bt,chess:Pt,"chess-bishop":62522,"chess-board":62524,"chess-king":62527,"chess-knight":62529,"chess-pawn":62531,"chess-queen":62533,"chess-rook":62535,"chevron-circle-down":61754,"chevron-circle-left":61751,"chevron-circle-right":61752,"chevron-circle-up":61753,"chevron-down":61560,"chevron-left":61523,"chevron-right":61524,"chevron-up":61559,child:At,chrome:Ct,chromecast:Rt,church:zt,circle:Vt,"circle-notch":61902,city:Lt,"clinic-medical":63474,clipboard:Mt,"clipboard-check":62572,"clipboard-list":62573,clock:Ft,clone:Wt,"closed-captioning":61962,cloud:Dt,"cloud-download-alt":62337,"cloud-meatball":63291,"cloud-moon":63171,"cloud-moon-rain":63292,"cloud-rain":63293,"cloud-showers-heavy":63296,"cloud-sun":63172,"cloud-sun-rain":63299,"cloud-upload-alt":62338,cloudflare:Nt,cloudscale:Et,cloudsmith:Ht,cloudversify:Xt,cocktail:Yt,code:_t,"code-branch":61734,codepen:Gt,codiepie:Ut,coffee:$t,cog:Kt,cogs:Zt,coins:Jt,columns:Qt,comment:ea,"comment-alt":62074,"comment-dollar":63057,"comment-dots":62637,"comment-medical":63477,"comment-slash":62643,comments:ra,"comments-dollar":63059,"compact-disc":62751,compass:ta,compress:aa,"compress-alt":62498,"compress-arrows-alt":63372,"concierge-bell":62818,confluence:na,connectdevelop:ia,contao:sa,cookie:oa,"cookie-bite":62820,copy:la,copyright:ua,"cotton-bureau":63646,couch:ca,cpanel:da,"creative-commons":62046,"creative-commons-by":62695,"creative-commons-nc":62696,"creative-commons-nc-eu":62697,"creative-commons-nc-jp":62698,"creative-commons-nd":62699,"creative-commons-pd":62700,"creative-commons-pd-alt":62701,"creative-commons-remix":62702,"creative-commons-sa":62703,"creative-commons-sampling":62704,"creative-commons-sampling-plus":62705,"creative-commons-share":62706,"creative-commons-zero":62707,"credit-card":61597,"critical-role":63177,crop:ma,"crop-alt":62821,cross:ga,crosshairs:pa,crow:ya,crown:ha,crutch:ba,css3:va,"css3-alt":62347,cube:ka,cubes:fa,cut:qa,cuttlefish:wa,"d-and-d":62349,"d-and-d-beyond":63178,dailymotion:Sa,dashcube:xa,database:Ta,deaf:Ia,deezer:ja,delicious:Oa,democrat:Ba,deploydog:Pa,deskpro:Aa,desktop:Ca,dev:Ra,deviantart:za,dharmachakra:Va,dhl:La,diagnoses:Ma,diaspora:Fa,dice:Wa,"dice-d20":63183,"dice-d6":63185,"dice-five":62755,"dice-four":62756,"dice-one":62757,"dice-six":62758,"dice-three":62759,"dice-two":62760,digg:Da,"digital-ocean":62353,"digital-tachograph":62822,directions:Na,discord:Ea,discourse:Ha,disease:Xa,divide:Ya,dizzy:_a,dna:Ga,dochub:Ua,docker:$a,dog:Ka,"dollar-sign":61781,dolly:Za,"dolly-flatbed":62580,donate:Ja,"door-closed":62762,"door-open":62763,"dot-circle":61842,dove:Qa,download:en,draft2digital:rn,"drafting-compass":62824,dragon:tn,"draw-polygon":62958,dribbble:an,"dribbble-square":62359,dropbox:nn,drum:sn,"drum-steelpan":62826,"drumstick-bite":63191,drupal:on,dumbbell:ln,dumpster:un,"dumpster-fire":63380,dungeon:cn,dyalog:dn,earlybirds:mn,ebay:gn,edge:pn,"edge-legacy":57464,edit:yn,egg:hn,eject:bn,elementor:vn,"ellipsis-h":61761,"ellipsis-v":61762,ello:kn,ember:fn,empire:qn,envelope:wn,"envelope-open":62134,"envelope-open-text":63064,"envelope-square":61849,envira:Sn,equals:xn,eraser:Tn,erlang:In,ethereum:jn,ethernet:On,etsy:Bn,"euro-sign":61779,evernote:Pn,"exchange-alt":62306,exclamation:An,"exclamation-circle":61546,"exclamation-triangle":61553,expand:Cn,"expand-alt":62500,"expand-arrows-alt":62238,expeditedssl:Rn,"external-link-alt":62301,"external-link-square-alt":62304,eye:zn,"eye-dropper":61947,"eye-slash":61552,facebook:Vn,"facebook-f":62366,"facebook-messenger":62367,"facebook-square":61570,fan:Ln,"fantasy-flight-games":63196,"fast-backward":61513,"fast-forward":61520,faucet:Mn,fax:Fn,feather:Wn,"feather-alt":62827,fedex:Dn,fedora:Nn,female:En,"fighter-jet":61691,figma:Hn,file:Xn,"file-alt":61788,"file-archive":61894,"file-audio":61895,"file-code":61897,"file-contract":62828,"file-csv":63197,"file-download":62829,"file-excel":61891,"file-export":62830,"file-image":61893,"file-import":62831,"file-invoice":62832,"file-invoice-dollar":62833,"file-medical":62583,"file-medical-alt":62584,"file-pdf":61889,"file-powerpoint":61892,"file-prescription":62834,"file-signature":62835,"file-upload":62836,"file-video":61896,"file-word":61890,fill:Yn,"fill-drip":62838,film:_n,filter:Gn,fingerprint:Un,fire:$n,"fire-alt":63460,"fire-extinguisher":61748,firefox:Kn,"firefox-browser":57351,"first-aid":62585,"first-order":62128,"first-order-alt":62730,firstdraft:Zn,fish:Jn,"fist-raised":63198,flag:Qn,"flag-checkered":61726,"flag-usa":63309,flask:ei,flickr:ri,flipboard:ti,flushed:ai,fly:ni,folder:ii,"folder-minus":63069,"folder-open":61564,"folder-plus":63070,font:si,"font-awesome":62132,"font-awesome-alt":62300,"font-awesome-flag":62501,"font-awesome-logo-full":62694,fonticons:oi,"fonticons-fi":62370,"football-ball":62542,"fort-awesome":62086,"fort-awesome-alt":62371,forumbee:li,forward:ui,foursquare:ci,"free-code-camp":62149,freebsd:di,frog:mi,frown:gi,"frown-open":62842,fulcrum:pi,"funnel-dollar":63074,futbol:yi,"galactic-republic":62732,"galactic-senate":62733,gamepad:hi,"gas-pump":62767,gavel:bi,gem:vi,genderless:ki,"get-pocket":62053,gg:fi,"gg-circle":62049,ghost:qi,gift:wi,gifts:Si,git:xi,"git-alt":63553,"git-square":61906,github:Ti,"github-alt":61715,"github-square":61586,gitkraken:Ii,gitlab:ji,gitter:Oi,"glass-cheers":63391,"glass-martini":61440,"glass-martini-alt":62843,"glass-whiskey":63392,glasses:Bi,glide:Pi,"glide-g":62118,globe:Ai,"globe-africa":62844,"globe-americas":62845,"globe-asia":62846,"globe-europe":63394,gofore:Ci,"golf-ball":62544,goodreads:Ri,"goodreads-g":62377,google:zi,"google-drive":62378,"google-pay":57465,"google-play":62379,"google-plus":62131,"google-plus-g":61653,"google-plus-square":61652,"google-wallet":61934,gopuram:Vi,"graduation-cap":61853,gratipay:Li,grav:Mi,"greater-than":62769,"greater-than-equal":62770,grimace:Fi,grin:Wi,"grin-alt":62849,"grin-beam":62850,"grin-beam-sweat":62851,"grin-hearts":62852,"grin-squint":62853,"grin-squint-tears":62854,"grin-stars":62855,"grin-tears":62856,"grin-tongue":62857,"grin-tongue-squint":62858,"grin-tongue-wink":62859,"grin-wink":62860,"grip-horizontal":62861,"grip-lines":63396,"grip-lines-vertical":63397,"grip-vertical":62862,gripfire:Di,grunt:Ni,guilded:Ei,guitar:Hi,gulp:Xi,"h-square":61693,"hacker-news":61908,"hacker-news-square":62383,hackerrank:Yi,hamburger:_i,hammer:Gi,hamsa:Ui,"hand-holding":62653,"hand-holding-heart":62654,"hand-holding-medical":57436,"hand-holding-usd":62656,"hand-holding-water":62657,"hand-lizard":62040,"hand-middle-finger":63494,"hand-paper":62038,"hand-peace":62043,"hand-point-down":61607,"hand-point-left":61605,"hand-point-right":61604,"hand-point-up":61606,"hand-pointer":62042,"hand-rock":62037,"hand-scissors":62039,"hand-sparkles":57437,"hand-spock":62041,hands:$i,"hands-helping":62660,"hands-wash":57438,handshake:Ki,"handshake-alt-slash":57439,"handshake-slash":57440,hanukiah:Zi,"hard-hat":63495,hashtag:Ji,"hat-cowboy":63680,"hat-cowboy-side":63681,"hat-wizard":63208,hdd:Qi,"head-side-cough":57441,"head-side-cough-slash":57442,"head-side-mask":57443,"head-side-virus":57444,heading:es,headphones:rs,"headphones-alt":62863,headset:ts,heart:as,"heart-broken":63401,heartbeat:ns,helicopter:is,highlighter:ss,hiking:os,hippo:ls,hips:us,"hire-a-helper":62384,history:cs,hive:ds,"hockey-puck":62547,"holly-berry":63402,home:ms,hooli:gs,hornbill:ps,horse:ys,"horse-head":63403,hospital:hs,"hospital-alt":62589,"hospital-symbol":62590,"hospital-user":63501,"hot-tub":62867,hotdog:bs,hotel:vs,hotjar:ks,hourglass:fs,"hourglass-end":62035,"hourglass-half":62034,"hourglass-start":62033,"house-damage":63217,"house-user":57445,houzz:qs,hryvnia:ws,html5:Ss,hubspot:xs,"i-cursor":62022,"ice-cream":63504,icicles:Ts,icons:Is,"id-badge":62145,"id-card":62146,"id-card-alt":62591,ideal:js,igloo:Os,image:Bs,images:Ps,imdb:As,inbox:Cs,indent:Rs,industry:zs,infinity:Vs,info:Ls,"info-circle":61530,innosoft:Ms,instagram:Fs,"instagram-square":57429,instalod:Ws,intercom:Ds,"internet-explorer":62059,invision:Ns,ioxhost:Es,italic:Hs,"itch-io":63546,itunes:Xs,"itunes-note":62389,java:Ys,jedi:_s,"jedi-order":62734,jenkins:Gs,jira:Us,joget:$s,joint:Ks,joomla:Zs,"journal-whills":63082,js:Js,"js-square":62393,jsfiddle:Qs,kaaba:eo,kaggle:ro,key:to,keybase:ao,keyboard:no,keycdn:io,khanda:so,kickstarter:oo,"kickstarter-k":62396,kiss:lo,"kiss-beam":62871,"kiss-wink-heart":62872,"kiwi-bird":62773,korvue:uo,landmark:co,language:mo,laptop:go,"laptop-code":62972,"laptop-house":57446,"laptop-medical":63506,laravel:po,lastfm:yo,"lastfm-square":61955,laugh:ho,"laugh-beam":62874,"laugh-squint":62875,"laugh-wink":62876,"layer-group":62973,leaf:bo,leanpub:vo,lemon:ko,less:fo,"less-than":62774,"less-than-equal":62775,"level-down-alt":62398,"level-up-alt":62399,"life-ring":61901,lightbulb:qo,line:wo,link:So,linkedin:xo,"linkedin-in":61665,linode:To,linux:Io,"lira-sign":61845,list:jo,"list-alt":61474,"list-ol":61643,"list-ul":61642,"location-arrow":61732,lock:Oo,"lock-open":62401,"long-arrow-alt-down":62217,"long-arrow-alt-left":62218,"long-arrow-alt-right":62219,"long-arrow-alt-up":62220,"low-vision":62120,"luggage-cart":62877,lungs:Bo,"lungs-virus":57447,lyft:Po,magento:Ao,magic:Co,magnet:Ro,"mail-bulk":63092,mailchimp:zo,male:Vo,mandalorian:Lo,map:Mo,"map-marked":62879,"map-marked-alt":62880,"map-marker":61505,"map-marker-alt":62405,"map-pin":62070,"map-signs":62071,markdown:Fo,marker:Wo,mars:Do,"mars-double":61991,"mars-stroke":61993,"mars-stroke-h":61995,"mars-stroke-v":61994,mask:No,mastodon:Eo,maxcdn:Ho,mdb:Xo,medal:Yo,medapps:_o,medium:Go,"medium-m":62407,medkit:Uo,medrt:$o,meetup:Ko,megaport:Zo,meh:Jo,"meh-blank":62884,"meh-rolling-eyes":62885,memory:Qo,mendeley:el,menorah:rl,mercury:tl,meteor:al,microblog:nl,microchip:il,microphone:sl,"microphone-alt":62409,"microphone-alt-slash":62777,"microphone-slash":61745,microscope:ol,microsoft:ll,minus:ul,"minus-circle":61526,"minus-square":61766,mitten:cl,mix:dl,mixcloud:ml,mixer:gl,mizuni:pl,mobile:yl,"mobile-alt":62413,modx:hl,monero:bl,"money-bill":61654,"money-bill-alt":62417,"money-bill-wave":62778,"money-bill-wave-alt":62779,"money-check":62780,"money-check-alt":62781,monument:vl,moon:kl,"mortar-pestle":62887,mosque:fl,motorcycle:ql,mountain:wl,mouse:Sl,"mouse-pointer":62021,"mug-hot":63414,music:xl,napster:Tl,neos:Il,"network-wired":63231,neuter:jl,newspaper:Ol,nimblr:Bl,node:Pl,"node-js":62419,"not-equal":62782,"notes-medical":62593,npm:Al,ns8:Cl,nutritionix:Rl,"object-group":62023,"object-ungroup":62024,"octopus-deploy":57474,odnoklassniki:zl,"odnoklassniki-square":62052,"oil-can":62995,"old-republic":62736,om:Vl,opencart:Ll,openid:Ml,opera:Fl,"optin-monster":62012,orcid:Wl,osi:Dl,otter:Nl,outdent:El,page4:Hl,pagelines:Xl,pager:Yl,"paint-brush":61948,"paint-roller":62890,palette:_l,palfed:Gl,pallet:Ul,"paper-plane":61912,paperclip:$l,"parachute-box":62669,paragraph:Kl,parking:Zl,passport:Jl,pastafarianism:Ql,paste:eu,patreon:ru,pause:tu,"pause-circle":62091,paw:au,paypal:nu,peace:iu,pen:su,"pen-alt":62213,"pen-fancy":62892,"pen-nib":62893,"pen-square":61771,"pencil-alt":62211,"pencil-ruler":62894,"penny-arcade":63236,"people-arrows":57448,"people-carry":62670,"pepper-hot":63510,perbyte:ou,percent:lu,percentage:uu,periscope:cu,"person-booth":63318,phabricator:du,"phoenix-framework":62428,"phoenix-squadron":62737,phone:mu,"phone-alt":63609,"phone-slash":62429,"phone-square":61592,"phone-square-alt":63611,"phone-volume":62112,"photo-video":63612,php:gu,"pied-piper":62126,"pied-piper-alt":61864,"pied-piper-hat":62693,"pied-piper-pp":61863,"pied-piper-square":57374,"piggy-bank":62675,pills:pu,pinterest:yu,"pinterest-p":62001,"pinterest-square":61651,"pizza-slice":63512,"place-of-worship":63103,plane:hu,"plane-arrival":62895,"plane-departure":62896,"plane-slash":57449,play:bu,"play-circle":61764,playstation:vu,plug:ku,plus:fu,"plus-circle":61525,"plus-square":61694,podcast:qu,poll:wu,"poll-h":63106,poo:Su,"poo-storm":63322,poop:xu,portrait:Tu,"pound-sign":61780,"power-off":61457,pray:Iu,"praying-hands":63108,prescription:ju,"prescription-bottle":62597,"prescription-bottle-alt":62598,print:Ou,procedures:Bu,"product-hunt":62088,"project-diagram":62786,"pump-medical":57450,"pump-soap":57451,pushed:Pu,"puzzle-piece":61742,python:Au,qq:Cu,qrcode:Ru,question:zu,"question-circle":61529,quidditch:Vu,quinscape:Lu,quora:Mu,"quote-left":61709,"quote-right":61710,quran:Fu,"r-project":62711,radiation:Wu,"radiation-alt":63418,rainbow:Du,random:Nu,"raspberry-pi":63419,ravelry:Eu,react:Hu,reacteurope:Xu,readme:Yu,rebel:_u,receipt:Gu,"record-vinyl":63705,recycle:Uu,"red-river":62435,reddit:$u,"reddit-alien":62081,"reddit-square":61858,redhat:Ku,redo:Zu,"redo-alt":62201,registered:Ju,"remove-format":63613,renren:Qu,reply:ec,"reply-all":61730,replyd:rc,republican:tc,researchgate:ac,resolving:nc,restroom:ic,retweet:sc,rev:oc,ribbon:lc,ring:uc,road:cc,robot:dc,rocket:mc,rocketchat:gc,rockrms:pc,route:yc,rss:hc,"rss-square":61763,"ruble-sign":61784,ruler:bc,"ruler-combined":62790,"ruler-horizontal":62791,"ruler-vertical":62792,running:vc,"rupee-sign":61782,rust:kc,"sad-cry":62899,"sad-tear":62900,safari:fc,salesforce:qc,sass:wc,satellite:Sc,"satellite-dish":63424,save:xc,schlix:Tc,school:Ic,screwdriver:jc,scribd:Oc,scroll:Bc,"sd-card":63426,search:Pc,"search-dollar":63112,"search-location":63113,"search-minus":61456,"search-plus":61454,searchengin:Ac,seedling:Cc,sellcast:Rc,sellsy:zc,server:Vc,servicestack:Lc,shapes:Mc,share:Fc,"share-alt":61920,"share-alt-square":61921,"share-square":61773,"shekel-sign":61963,"shield-alt":62445,"shield-virus":57452,ship:Wc,"shipping-fast":62603,shirtsinbulk:Dc,"shoe-prints":62795,shopify:Nc,"shopping-bag":62096,"shopping-basket":62097,"shopping-cart":61562,shopware:Ec,shower:Hc,"shuttle-van":62902,sign:Xc,"sign-in-alt":62198,"sign-language":62119,"sign-out-alt":62197,signal:Yc,signature:_c,"sim-card":63428,simplybuilt:Gc,sink:Uc,sistrix:$c,sitemap:Kc,sith:Zc,skating:Jc,sketch:Qc,skiing:ed,"skiing-nordic":63434,skull:rd,"skull-crossbones":63252,skyatlas:td,skype:ad,slack:nd,"slack-hash":62447,slash:id,sleigh:sd,"sliders-h":61918,slideshare:od,smile:ld,"smile-beam":62904,"smile-wink":62682,smog:ud,smoking:cd,"smoking-ban":62797,sms:dd,snapchat:md,"snapchat-ghost":62124,"snapchat-square":62125,snowboarding:gd,snowflake:pd,snowman:yd,snowplow:hd,soap:bd,socks:vd,"solar-panel":62906,sort:kd,"sort-alpha-down":61789,"sort-alpha-down-alt":63617,"sort-alpha-up":61790,"sort-alpha-up-alt":63618,"sort-amount-down":61792,"sort-amount-down-alt":63620,"sort-amount-up":61793,"sort-amount-up-alt":63621,"sort-down":61661,"sort-numeric-down":61794,"sort-numeric-down-alt":63622,"sort-numeric-up":61795,"sort-numeric-up-alt":63623,"sort-up":61662,soundcloud:fd,sourcetree:qd,spa:wd,"space-shuttle":61847,speakap:Sd,"speaker-deck":63548,"spell-check":63633,spider:xd,spinner:Td,splotch:Id,spotify:jd,"spray-can":62909,square:Od,"square-full":62556,"square-root-alt":63128,squarespace:Bd,"stack-exchange":61837,"stack-overflow":61804,stackpath:Pd,stamp:Ad,star:Cd,"star-and-crescent":63129,"star-half":61577,"star-half-alt":62912,"star-of-david":63130,"star-of-life":63009,staylinked:Rd,steam:zd,"steam-square":61879,"steam-symbol":62454,"step-backward":61512,"step-forward":61521,stethoscope:Vd,"sticker-mule":62455,"sticky-note":62025,stop:Ld,"stop-circle":62093,stopwatch:Md,"stopwatch-20":57455,store:Fd,"store-alt":62799,"store-alt-slash":57456,"store-slash":57457,strava:Wd,stream:Dd,"street-view":61981,strikethrough:Nd,stripe:Ed,"stripe-s":62506,stroopwafel:Hd,studiovinari:Xd,stumbleupon:Yd,"stumbleupon-circle":61859,subscript:_d,subway:Gd,suitcase:Ud,"suitcase-rolling":62913,sun:$d,superpowers:Kd,superscript:Zd,supple:Jd,surprise:Qd,suse:em,swatchbook:rm,swift:tm,swimmer:am,"swimming-pool":62917,symfony:nm,synagogue:im,sync:sm,"sync-alt":62193,syringe:om,table:lm,"table-tennis":62557,tablet:um,"tablet-alt":62458,tablets:cm,"tachometer-alt":62461,tag:dm,tags:mm,tape:gm,tasks:pm,taxi:ym,teamspeak:hm,teeth:bm,"teeth-open":63023,telegram:vm,"telegram-plane":62462,"temperature-high":63337,"temperature-low":63339,"tencent-weibo":61909,tenge:km,terminal:fm,"text-height":61492,"text-width":61493,th:qm,"th-large":61449,"th-list":61451,"the-red-yeti":63133,"theater-masks":63024,themeco:wm,themeisle:Sm,thermometer:xm,"thermometer-empty":62155,"thermometer-full":62151,"thermometer-half":62153,"thermometer-quarter":62154,"thermometer-three-quarters":62152,"think-peaks":63281,"thumbs-down":61797,"thumbs-up":61796,thumbtack:Tm,"ticket-alt":62463,tiktok:Im,times:jm,"times-circle":61527,tint:Om,"tint-slash":62919,tired:Bm,"toggle-off":61956,"toggle-on":61957,toilet:Pm,"toilet-paper":63262,"toilet-paper-slash":57458,toolbox:Am,tools:Cm,tooth:Rm,torah:zm,"torii-gate":63137,tractor:Vm,"trade-federation":62739,trademark:Lm,"traffic-light":63031,trailer:Mm,train:Fm,tram:Wm,transgender:Dm,"transgender-alt":61989,trash:Nm,"trash-alt":62189,"trash-restore":63529,"trash-restore-alt":63530,tree:Em,trello:Hm,tripadvisor:Xm,trophy:Ym,truck:_m,"truck-loading":62686,"truck-monster":63035,"truck-moving":62687,"truck-pickup":63036,tshirt:Gm,tty:Um,tumblr:$m,"tumblr-square":61812,tv:Km,twitch:Zm,twitter:Jm,"twitter-square":61569,typo3:Qm,uber:eg,ubuntu:rg,uikit:tg,umbraco:ag,umbrella:ng,"umbrella-beach":62922,uncharted:ig,underline:sg,undo:og,"undo-alt":62186,uniregistry:lg,unity:ug,"universal-access":62106,university:cg,unlink:dg,unlock:mg,"unlock-alt":61758,unsplash:gg,untappd:pg,upload:yg,ups:hg,usb:bg,user:vg,"user-alt":62470,"user-alt-slash":62714,"user-astronaut":62715,"user-check":62716,"user-circle":62141,"user-clock":62717,"user-cog":62718,"user-edit":62719,"user-friends":62720,"user-graduate":62721,"user-injured":63272,"user-lock":62722,"user-md":61680,"user-minus":62723,"user-ninja":62724,"user-nurse":63535,"user-plus":62004,"user-secret":61979,"user-shield":62725,"user-slash":62726,"user-tag":62727,"user-tie":62728,"user-times":62005,users:kg,"users-cog":62729,"users-slash":57459,usps:fg,ussunnah:qg,"utensil-spoon":62181,utensils:wg,vaadin:Sg,"vector-square":62923,venus:xg,"venus-double":61990,"venus-mars":61992,vest:Tg,"vest-patches":57478,viacoin:Ig,viadeo:jg,"viadeo-square":62122,vial:Og,vials:Bg,viber:Pg,video:Ag,"video-slash":62690,vihara:Cg,vimeo:Rg,"vimeo-square":61844,"vimeo-v":62077,vine:zg,virus:Vg,"virus-slash":57461,viruses:Lg,vk:Mg,vnv:Fg,voicemail:Wg,"volleyball-ball":62559,"volume-down":61479,"volume-mute":63145,"volume-off":61478,"volume-up":61480,"vote-yea":63346,"vr-cardboard":63273,vuejs:Dg,walking:Ng,wallet:Eg,warehouse:Hg,"watchman-monitoring":57479,water:Xg,"wave-square":63550,waze:Yg,weebly:_g,weibo:Gg,weight:Ug,"weight-hanging":62925,weixin:$g,whatsapp:Kg,"whatsapp-square":62476,wheelchair:Zg,whmcs:Jg,wifi:Qg,"wikipedia-w":62054,wind:ep,"window-close":62480,"window-maximize":62160,"window-minimize":62161,"window-restore":62162,windows:rp,"wine-bottle":63279,"wine-glass":62691,"wine-glass-alt":62926,wix:tp,"wizards-of-the-coast":63280,wodu:ap,"wolf-pack-battalion":62740,"won-sign":61785,wordpress:np,"wordpress-simple":62481,wpbeginner:ip,wpexplorer:sp,wpforms:op,wpressr:lp,wrench:up,"x-ray":62615,xbox:cp,xing:dp,"xing-square":61801,"y-combinator":62011,yahoo:mp,yammer:gp,yandex:pp,"yandex-international":62484,yarn:yp,yelp:hp,"yen-sign":61783,"yin-yang":63149,yoast:bp,youtube:vp,"youtube-square":62513,zhihu:kp},qp=["500px","accessible-icon","accusoft","acquisitions-incorporated","adn","adversal","affiliatetheme","airbnb","algolia","alipay","amazon-pay","amazon","amilia","android","angellist","angrycreative","angular","app-store-ios","app-store","apper","apple-pay","apple","artstation","asymmetrik","atlassian","audible","autoprefixer","avianex","aviato","aws","bandcamp","battle-net","behance-square","behance","bimobject","bitbucket","bitcoin","bity","black-tie","blackberry","blogger-b","blogger","bluetooth-b","bluetooth","bootstrap","btc","buffer","buromobelexperte","buy-n-large","buysellads","canadian-maple-leaf","cc-amazon-pay","cc-amex","cc-apple-pay","cc-diners-club","cc-discover","cc-jcb","cc-mastercard","cc-paypal","cc-stripe","cc-visa","centercode","centos","chrome","chromecast","cloudflare","cloudscale","cloudsmith","cloudversify","codepen","codiepie","confluence","connectdevelop","contao","cotton-bureau","cpanel","creative-commons-by","creative-commons-nc-eu","creative-commons-nc-jp","creative-commons-nc","creative-commons-nd","creative-commons-pd-alt","creative-commons-pd","creative-commons-remix","creative-commons-sa","creative-commons-sampling-plus","creative-commons-sampling","creative-commons-share","creative-commons-zero","creative-commons","critical-role","css3-alt","css3","cuttlefish","d-and-d-beyond","d-and-d","dailymotion","dashcube","deezer","delicious","deploydog","deskpro","dev","deviantart","dhl","diaspora","digg","digital-ocean","discord","discourse","dochub","docker","draft2digital","dribbble-square","dribbble","dropbox","drupal","dyalog","earlybirds","ebay","edge-legacy","edge","elementor","ello","ember","empire","envira","erlang","ethereum","etsy","evernote","expeditedssl","facebook-f","facebook-messenger","facebook-square","facebook","fantasy-flight-games","fedex","fedora","figma","firefox-browser","firefox","first-order-alt","first-order","firstdraft","flickr","flipboard","fly","font-awesome-alt","font-awesome-flag","font-awesome-logo-full","font-awesome","fonticons-fi","fonticons","fort-awesome-alt","fort-awesome","forumbee","foursquare","free-code-camp","freebsd","fulcrum","galactic-republic","galactic-senate","get-pocket","gg-circle","gg","git-alt","git-square","git","github-alt","github-square","github","gitkraken","gitlab","gitter","glide-g","glide","gofore","goodreads-g","goodreads","google-drive","google-pay","google-play","google-plus-g","google-plus-square","google-plus","google-wallet","google","gratipay","grav","gripfire","grunt","guilded","gulp","hacker-news-square","hacker-news","hackerrank","hips","hire-a-helper","hive","hooli","hornbill","hotjar","houzz","html5","hubspot","ideal","imdb","innosoft","instagram-square","instagram","instalod","intercom","internet-explorer","invision","ioxhost","itch-io","itunes-note","itunes","java","jedi-order","jenkins","jira","joget","joomla","js-square","js","jsfiddle","kaggle","keybase","keycdn","kickstarter-k","kickstarter","korvue","laravel","lastfm-square","lastfm","leanpub","less","line","linkedin-in","linkedin","linode","linux","lyft","magento","mailchimp","mandalorian","markdown","mastodon","maxcdn","mdb","medapps","medium-m","medium","medrt","meetup","megaport","mendeley","microblog","microsoft","mix","mixcloud","mixer","mizuni","modx","monero","napster","neos","nimblr","node-js","node","npm","ns8","nutritionix","octopus-deploy","odnoklassniki-square","odnoklassniki","old-republic","opencart","openid","opera","optin-monster","orcid","osi","page4","pagelines","palfed","patreon","paypal","penny-arcade","perbyte","periscope","phabricator","phoenix-framework","phoenix-squadron","php","pied-piper-alt","pied-piper-hat","pied-piper-pp","pied-piper-square","pied-piper","pinterest-p","pinterest-square","pinterest","playstation","product-hunt","pushed","python","qq","quinscape","quora","r-project","raspberry-pi","ravelry","react","reacteurope","readme","rebel","red-river","reddit-alien","reddit-square","reddit","redhat","renren","replyd","researchgate","resolving","rev","rocketchat","rockrms","rust","safari","salesforce","sass","schlix","scribd","searchengin","sellcast","sellsy","servicestack","shirtsinbulk","shopify","shopware","simplybuilt","sistrix","sith","sketch","skyatlas","skype","slack-hash","slack","slideshare","snapchat-ghost","snapchat-square","snapchat","soundcloud","sourcetree","speakap","speaker-deck","spotify","squarespace","stack-exchange","stack-overflow","stackpath","staylinked","steam-square","steam-symbol","steam","sticker-mule","strava","stripe-s","stripe","studiovinari","stumbleupon-circle","stumbleupon","superpowers","supple","suse","swift","symfony","teamspeak","telegram-plane","telegram","tencent-weibo","the-red-yeti","themeco","themeisle","think-peaks","tiktok","trade-federation","trello","tripadvisor","tumblr-square","tumblr","twitch","twitter-square","twitter","typo3","uber","ubuntu","uikit","umbraco","uncharted","uniregistry","unity","unsplash","untappd","ups","usb","usps","ussunnah","vaadin","viacoin","viadeo-square","viadeo","viber","vimeo-square","vimeo-v","vimeo","vine","vk","vnv","vuejs","watchman-monitoring","waze","weebly","weibo","weixin","whatsapp-square","whatsapp","whmcs","wikipedia-w","windows","wix","wizards-of-the-coast","wodu","wolf-pack-battalion","wordpress-simple","wordpress","wpbeginner","wpexplorer","wpforms","wpressr","xbox","xing-square","xing","y-combinator","yahoo","yammer","yandex-international","yandex","yarn","yelp","yoast","youtube-square","youtube","zhihu"],wp=["address-book","address-card","angry","arrow-alt-circle-down","arrow-alt-circle-left","arrow-alt-circle-right","arrow-alt-circle-up","bell-slash","bell","bookmark","building","calendar-alt","calendar-check","calendar-minus","calendar-plus","calendar-times","calendar","caret-square-down","caret-square-left","caret-square-right","caret-square-up","chart-bar","check-circle","check-square","circle","clipboard","clock","clone","closed-captioning","comment-alt","comment-dots","comment","comments","compass","copy","copyright","credit-card","dizzy","dot-circle","edit","envelope-open","envelope","eye-slash","eye","file-alt","file-archive","file-audio","file-code","file-excel","file-image","file-pdf","file-powerpoint","file-video","file-word","file","flag","flushed","folder-open","folder","font-awesome-logo-full","frown-open","frown","futbol","gem","grimace","grin-alt","grin-beam-sweat","grin-beam","grin-hearts","grin-squint-tears","grin-squint","grin-stars","grin-tears","grin-tongue-squint","grin-tongue-wink","grin-tongue","grin-wink","grin","hand-lizard","hand-paper","hand-peace","hand-point-down","hand-point-left","hand-point-right","hand-point-up","hand-pointer","hand-rock","hand-scissors","hand-spock","handshake","hdd","heart","hospital","hourglass","id-badge","id-card","image","images","keyboard","kiss-beam","kiss-wink-heart","kiss","laugh-beam","laugh-squint","laugh-wink","laugh","lemon","life-ring","lightbulb","list-alt","map","meh-blank","meh-rolling-eyes","meh","minus-square","money-bill-alt","moon","newspaper","object-group","object-ungroup","paper-plane","pause-circle","play-circle","plus-square","question-circle","registered","sad-cry","sad-tear","save","share-square","smile-beam","smile-wink","smile","snowflake","square","star-half","star","sticky-note","stop-circle","sun","surprise","thumbs-down","thumbs-up","times-circle","tired","trash-alt","user-circle","user","window-close","window-maximize","window-minimize","window-restore"],Sp=["ad","address-book","address-card","adjust","air-freshener","align-center","align-justify","align-left","align-right","allergies","ambulance","american-sign-language-interpreting","anchor","angle-double-down","angle-double-left","angle-double-right","angle-double-up","angle-down","angle-left","angle-right","angle-up","angry","ankh","apple-alt","archive","archway","arrow-alt-circle-down","arrow-alt-circle-left","arrow-alt-circle-right","arrow-alt-circle-up","arrow-circle-down","arrow-circle-left","arrow-circle-right","arrow-circle-up","arrow-down","arrow-left","arrow-right","arrow-up","arrows-alt-h","arrows-alt-v","arrows-alt","assistive-listening-systems","asterisk","at","atlas","atom","audio-description","award","baby-carriage","baby","backspace","backward","bacon","bacteria","bacterium","bahai","balance-scale-left","balance-scale-right","balance-scale","ban","band-aid","barcode","bars","baseball-ball","basketball-ball","bath","battery-empty","battery-full","battery-half","battery-quarter","battery-three-quarters","bed","beer","bell-slash","bell","bezier-curve","bible","bicycle","biking","binoculars","biohazard","birthday-cake","blender-phone","blender","blind","blog","bold","bolt","bomb","bone","bong","book-dead","book-medical","book-open","book-reader","book","bookmark","border-all","border-none","border-style","bowling-ball","box-open","box-tissue","box","boxes","braille","brain","bread-slice","briefcase-medical","briefcase","broadcast-tower","broom","brush","bug","building","bullhorn","bullseye","burn","bus-alt","bus","business-time","calculator","calendar-alt","calendar-check","calendar-day","calendar-minus","calendar-plus","calendar-times","calendar-week","calendar","camera-retro","camera","campground","candy-cane","cannabis","capsules","car-alt","car-battery","car-crash","car-side","car","caravan","caret-down","caret-left","caret-right","caret-square-down","caret-square-left","caret-square-right","caret-square-up","caret-up","carrot","cart-arrow-down","cart-plus","cash-register","cat","certificate","chair","chalkboard-teacher","chalkboard","charging-station","chart-area","chart-bar","chart-line","chart-pie","check-circle","check-double","check-square","check","cheese","chess-bishop","chess-board","chess-king","chess-knight","chess-pawn","chess-queen","chess-rook","chess","chevron-circle-down","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-down","chevron-left","chevron-right","chevron-up","child","church","circle-notch","circle","city","clinic-medical","clipboard-check","clipboard-list","clipboard","clock","clone","closed-captioning","cloud-download-alt","cloud-meatball","cloud-moon-rain","cloud-moon","cloud-rain","cloud-showers-heavy","cloud-sun-rain","cloud-sun","cloud-upload-alt","cloud","cocktail","code-branch","code","coffee","cog","cogs","coins","columns","comment-alt","comment-dollar","comment-dots","comment-medical","comment-slash","comment","comments-dollar","comments","compact-disc","compass","compress-alt","compress-arrows-alt","compress","concierge-bell","cookie-bite","cookie","copy","copyright","couch","credit-card","crop-alt","crop","cross","crosshairs","crow","crown","crutch","cube","cubes","cut","database","deaf","democrat","desktop","dharmachakra","diagnoses","dice-d20","dice-d6","dice-five","dice-four","dice-one","dice-six","dice-three","dice-two","dice","digital-tachograph","directions","disease","divide","dizzy","dna","dog","dollar-sign","dolly-flatbed","dolly","donate","door-closed","door-open","dot-circle","dove","download","drafting-compass","dragon","draw-polygon","drum-steelpan","drum","drumstick-bite","dumbbell","dumpster-fire","dumpster","dungeon","edit","egg","eject","ellipsis-h","ellipsis-v","envelope-open-text","envelope-open","envelope-square","envelope","equals","eraser","ethernet","euro-sign","exchange-alt","exclamation-circle","exclamation-triangle","exclamation","expand-alt","expand-arrows-alt","expand","external-link-alt","external-link-square-alt","eye-dropper","eye-slash","eye","fan","fast-backward","fast-forward","faucet","fax","feather-alt","feather","female","fighter-jet","file-alt","file-archive","file-audio","file-code","file-contract","file-csv","file-download","file-excel","file-export","file-image","file-import","file-invoice-dollar","file-invoice","file-medical-alt","file-medical","file-pdf","file-powerpoint","file-prescription","file-signature","file-upload","file-video","file-word","file","fill-drip","fill","film","filter","fingerprint","fire-alt","fire-extinguisher","fire","first-aid","fish","fist-raised","flag-checkered","flag-usa","flag","flask","flushed","folder-minus","folder-open","folder-plus","folder","font-awesome-logo-full","font","football-ball","forward","frog","frown-open","frown","funnel-dollar","futbol","gamepad","gas-pump","gavel","gem","genderless","ghost","gift","gifts","glass-cheers","glass-martini-alt","glass-martini","glass-whiskey","glasses","globe-africa","globe-americas","globe-asia","globe-europe","globe","golf-ball","gopuram","graduation-cap","greater-than-equal","greater-than","grimace","grin-alt","grin-beam-sweat","grin-beam","grin-hearts","grin-squint-tears","grin-squint","grin-stars","grin-tears","grin-tongue-squint","grin-tongue-wink","grin-tongue","grin-wink","grin","grip-horizontal","grip-lines-vertical","grip-lines","grip-vertical","guitar","h-square","hamburger","hammer","hamsa","hand-holding-heart","hand-holding-medical","hand-holding-usd","hand-holding-water","hand-holding","hand-lizard","hand-middle-finger","hand-paper","hand-peace","hand-point-down","hand-point-left","hand-point-right","hand-point-up","hand-pointer","hand-rock","hand-scissors","hand-sparkles","hand-spock","hands-helping","hands-wash","hands","handshake-alt-slash","handshake-slash","handshake","hanukiah","hard-hat","hashtag","hat-cowboy-side","hat-cowboy","hat-wizard","hdd","head-side-cough-slash","head-side-cough","head-side-mask","head-side-virus","heading","headphones-alt","headphones","headset","heart-broken","heart","heartbeat","helicopter","highlighter","hiking","hippo","history","hockey-puck","holly-berry","home","horse-head","horse","hospital-alt","hospital-symbol","hospital-user","hospital","hot-tub","hotdog","hotel","hourglass-end","hourglass-half","hourglass-start","hourglass","house-damage","house-user","hryvnia","i-cursor","ice-cream","icicles","icons","id-badge","id-card-alt","id-card","igloo","image","images","inbox","indent","industry","infinity","info-circle","info","italic","jedi","joint","journal-whills","kaaba","key","keyboard","khanda","kiss-beam","kiss-wink-heart","kiss","kiwi-bird","landmark","language","laptop-code","laptop-house","laptop-medical","laptop","laugh-beam","laugh-squint","laugh-wink","laugh","layer-group","leaf","lemon","less-than-equal","less-than","level-down-alt","level-up-alt","life-ring","lightbulb","link","lira-sign","list-alt","list-ol","list-ul","list","location-arrow","lock-open","lock","long-arrow-alt-down","long-arrow-alt-left","long-arrow-alt-right","long-arrow-alt-up","low-vision","luggage-cart","lungs-virus","lungs","magic","magnet","mail-bulk","male","map-marked-alt","map-marked","map-marker-alt","map-marker","map-pin","map-signs","map","marker","mars-double","mars-stroke-h","mars-stroke-v","mars-stroke","mars","mask","medal","medkit","meh-blank","meh-rolling-eyes","meh","memory","menorah","mercury","meteor","microchip","microphone-alt-slash","microphone-alt","microphone-slash","microphone","microscope","minus-circle","minus-square","minus","mitten","mobile-alt","mobile","money-bill-alt","money-bill-wave-alt","money-bill-wave","money-bill","money-check-alt","money-check","monument","moon","mortar-pestle","mosque","motorcycle","mountain","mouse-pointer","mouse","mug-hot","music","network-wired","neuter","newspaper","not-equal","notes-medical","object-group","object-ungroup","oil-can","om","otter","outdent","pager","paint-brush","paint-roller","palette","pallet","paper-plane","paperclip","parachute-box","paragraph","parking","passport","pastafarianism","paste","pause-circle","pause","paw","peace","pen-alt","pen-fancy","pen-nib","pen-square","pen","pencil-alt","pencil-ruler","people-arrows","people-carry","pepper-hot","percent","percentage","person-booth","phone-alt","phone-slash","phone-square-alt","phone-square","phone-volume","phone","photo-video","piggy-bank","pills","pizza-slice","place-of-worship","plane-arrival","plane-departure","plane-slash","plane","play-circle","play","plug","plus-circle","plus-square","plus","podcast","poll-h","poll","poo-storm","poo","poop","portrait","pound-sign","power-off","pray","praying-hands","prescription-bottle-alt","prescription-bottle","prescription","print","procedures","project-diagram","pump-medical","pump-soap","puzzle-piece","qrcode","question-circle","question","quidditch","quote-left","quote-right","quran","radiation-alt","radiation","rainbow","random","receipt","record-vinyl","recycle","redo-alt","redo","registered","remove-format","reply-all","reply","republican","restroom","retweet","ribbon","ring","road","robot","rocket","route","rss-square","rss","ruble-sign","ruler-combined","ruler-horizontal","ruler-vertical","ruler","running","rupee-sign","sad-cry","sad-tear","satellite-dish","satellite","save","school","screwdriver","scroll","sd-card","search-dollar","search-location","search-minus","search-plus","search","seedling","server","shapes","share-alt-square","share-alt","share-square","share","shekel-sign","shield-alt","shield-virus","ship","shipping-fast","shoe-prints","shopping-bag","shopping-basket","shopping-cart","shower","shuttle-van","sign-in-alt","sign-language","sign-out-alt","sign","signal","signature","sim-card","sink","sitemap","skating","skiing-nordic","skiing","skull-crossbones","skull","slash","sleigh","sliders-h","smile-beam","smile-wink","smile","smog","smoking-ban","smoking","sms","snowboarding","snowflake","snowman","snowplow","soap","socks","solar-panel","sort-alpha-down-alt","sort-alpha-down","sort-alpha-up-alt","sort-alpha-up","sort-amount-down-alt","sort-amount-down","sort-amount-up-alt","sort-amount-up","sort-down","sort-numeric-down-alt","sort-numeric-down","sort-numeric-up-alt","sort-numeric-up","sort-up","sort","spa","space-shuttle","spell-check","spider","spinner","splotch","spray-can","square-full","square-root-alt","square","stamp","star-and-crescent","star-half-alt","star-half","star-of-david","star-of-life","star","step-backward","step-forward","stethoscope","sticky-note","stop-circle","stop","stopwatch-20","stopwatch","store-alt-slash","store-alt","store-slash","store","stream","street-view","strikethrough","stroopwafel","subscript","subway","suitcase-rolling","suitcase","sun","superscript","surprise","swatchbook","swimmer","swimming-pool","synagogue","sync-alt","sync","syringe","table-tennis","table","tablet-alt","tablet","tablets","tachometer-alt","tag","tags","tape","tasks","taxi","teeth-open","teeth","temperature-high","temperature-low","tenge","terminal","text-height","text-width","th-large","th-list","th","theater-masks","thermometer-empty","thermometer-full","thermometer-half","thermometer-quarter","thermometer-three-quarters","thermometer","thumbs-down","thumbs-up","thumbtack","ticket-alt","times-circle","times","tint-slash","tint","tired","toggle-off","toggle-on","toilet-paper-slash","toilet-paper","toilet","toolbox","tools","tooth","torah","torii-gate","tractor","trademark","traffic-light","trailer","train","tram","transgender-alt","transgender","trash-alt","trash-restore-alt","trash-restore","trash","tree","trophy","truck-loading","truck-monster","truck-moving","truck-pickup","truck","tshirt","tty","tv","umbrella-beach","umbrella","underline","undo-alt","undo","universal-access","university","unlink","unlock-alt","unlock","upload","user-alt-slash","user-alt","user-astronaut","user-check","user-circle","user-clock","user-cog","user-edit","user-friends","user-graduate","user-injured","user-lock","user-md","user-minus","user-ninja","user-nurse","user-plus","user-secret","user-shield","user-slash","user-tag","user-tie","user-times","user","users-cog","users-slash","users","utensil-spoon","utensils","vector-square","venus-double","venus-mars","venus","vest-patches","vest","vial","vials","video-slash","video","vihara","virus-slash","virus","viruses","voicemail","volleyball-ball","volume-down","volume-mute","volume-off","volume-up","vote-yea","vr-cardboard","walking","wallet","warehouse","water","wave-square","weight-hanging","weight","wheelchair","wifi","wind","window-close","window-maximize","window-minimize","window-restore","wine-bottle","wine-glass-alt","wine-glass","won-sign","wrench","x-ray","yen-sign","yin-yang"],xp={brands:qp,regular:wp,solid:Sp},D=je(fp,xp,!1),{Button:Yp,getImageSource:_p,getImageSourceSync:Gp}=D,Tp=function({theme:a,palette:e,style:r={},overlayColor:t,options:n}){const i=n&&n.hasIconOnTop?72:48,c=90,l=360,p=3*a.spacing,h=e===void 0||e===""?F.fade(a.palette.primary.contrastText,.7):a.palette.text.secondary,I=e===void 0||e===""?a.palette.primary.contrastText:a.palette[e].main,w=e===void 0||e===""?F.fade(a.palette.primary.contrastText,.5):a.palette.text.disabled,O=a.spacing*1.5,T=ae(t,a);return B.create({root:{height:i,minWidth:c,maxWidth:l,...!!n&&!n.mustGrow&&{flexGrow:1,flexShrink:1,flexBasis:"100%"},paddingHorizontal:16,paddingVertical:n&&n.hasIconOnTop?O:void 0,justifyContent:n&&n.hasIconOnTop?"space-between":"center",alignItems:"center",flexDirection:n&&n.hasIconOnTop?"column":"row",...A.select({web:{cursor:"pointer"}}),...r.root,...f(a.overrides,"tab","root"),...n&&n.hasIcon?f(a.overrides,"tab","hasIcon"):r.hasIcon,...n&&n.hasLabel?f(a.overrides,"tab","hasLabel"):r.hasLabel},icon:{justifyContent:"center",...!!n&&n.hasLabel&&{margin:0},fontSize:p,textAlign:"center",color:h,...!!n&&n.isActive&&{color:I,...r.isActiveIcon},...!!n&&n.isDisabled&&{color:w},...r.icon,...f(a.overrides,"tab","icon")},label:{margin:0,paddingLeft:n&&!n.hasIconOnTop&&n.hasIcon?a.spacing:0,overflow:"visible",textAlign:"center",fontSize:14,color:h,...!!n&&n.isActive&&{color:I,...r.isActiveLabel},...!!n&&n.isDisabled&&{color:w},...r.label,...f(a.overrides,"tab","label")},overlay:{flex:1,backgroundColor:t,opacity:T,...r.overlay,...f(a.overrides,"tab","overlay")}})},Ip=function({palette:a,theme:e,style:r={},options:t}){const n=t&&t.hasIconOnTop?72:48,i=t&&t.isScrollEnabled?52:0,c=a===void 0||a===""?e.palette.secondary.main:e.palette[a].main;return{style:B.create({root:{height:n,maxHeight:n,flexGrow:1,flexShrink:1,marginBottom:4,...r.root,...f(e.overrides,"tabs","root")},container:{backgroundColor:"blue",paddingHorizontal:i,...r.container,...f(e.overrides,"tabs","container")},scrollContent:{flexDirection:"row",overflow:"visible",...r.scrollContent,...f(e.overrides,"tabs","scrollContent")},leftIndicator:{position:"absolute",left:0,top:0,bottom:0,width:i,...A.select({web:{cursor:"pointer"}}),backgroundColor:"blue",...r.leftIndicator,...f(e.overrides,"tabs","leftIndicator")},rightIndicator:{position:"absolute",right:0,top:0,bottom:0,width:i,...A.select({web:{cursor:"pointer"}}),backgroundColor:"blue",...r.rightIndicator,...f(e.overrides,"tabs","rightIndicator")},cursorAnimatedContainer:{position:"absolute",width:1,top:0,bottom:0},cursorIndicator:{height:4,top:n-4,backgroundColor:c,...r.cursorIndicator,...f(e.overrides,"tabs","cursorIndicator")},scrollView:{marginBottom:-20,...A.select({web:{display:"inline-flex"}}),...r.scrollView,...f(e.overrides,"tabs","scrollView")}}),paddingHorizontal:i}};function jp(a,e){return B.create({root:{flex:1,backgroundColor:a,opacity:ae(a,e)}})}function Op(){}function ue(a){var X,Y;const e=x.useContext(te),[r,t]=x.useState(!1),n=x.useRef(void 0),i=x.useRef(void 0),c=x.useRef(!1),l=x.useRef(g=>{const{id:L,onTabLayout:M}=a;n.current!==void 0&&n.current.height===g.height&&n.current.width===g.width&&n.current.x===g.x&&n.current.y===g.y||(n.current={x:Math.round(g.x),y:Math.round(g.y),width:Math.round(g.width),height:Math.round(g.height)},M==null||M({id:L,layout:n.current}))});ye(function(){const{onWillMount:g=()=>{}}=a;g(a.id)}),he(function(){n.current&&l.current(n.current)}),be(function(){const{id:g,onUnmount:L=()=>{}}=a;L(g)});const p=x.useRef(function(){var g;c.current=!1,(g=i.current)==null||g.onPressOut()}),h=x.useRef(function(){c.current=!0}),{id:I,iconSlot:w,label:O,isActive:T=!1,isDisabled:b=!1,isFrozen:v=!1,hasIconOnTop:y=!1,mustGrow:s=!1,palette:u,badgeSlot:d,style:S,onPress:V=Op}=a,H=ne({isOnPaper:u!==void 0,palette:u,theme:e}),P={tab:Tp({theme:e,palette:u,style:S,overlayColor:H,options:{hasIconOnTop:y,isDisabled:b,isActive:T,mustGrow:s,hasIcon:!!w,hasLabel:!!O}}),flex:B.create({root:{flex:1}})};return o.jsxs(q,{onResponderMove:p.current,onResponderRelease:h.current,onLayout:g=>l.current(g.nativeEvent.layout),style:P.tab.root,children:[w&&w(P.tab.icon),O&&o.jsx(ie,{style:P.tab.label,children:O}),d,o.jsx(se,{style:R.root,isVisible:r,duration:75,children:o.jsx(q,{style:P.tab.overlay})}),!b&&!v&&o.jsxs(q,{style:R.root,children:[o.jsx(oe,{onRef:g=>{i.current=g},color:H}),o.jsx(le,{disabled:b,style:P.flex.root,onPress:function(){!v&&c&&V(I)},onPressIn:(X=i.current)==null?void 0:X.onPressIn,onPressOut:(Y=i.current)==null?void 0:Y.onPressOut,onHoverIn:function(){t(!0)},onHoverOut:function(){var g;(g=i.current)==null||g.onPressOut(),t(!1)}})]})]})}ue.__docgenInfo={description:"",methods:[],displayName:"Tab",props:{mustGrow:{required:!1,tsType:{name:"boolean"},description:""},palette:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"}]},description:""},hasIconOnTop:{required:!1,tsType:{name:"boolean"},description:""},isActive:{required:!0,tsType:{name:"boolean"},description:""},isFrozen:{required:!1,tsType:{name:"boolean"},description:""},onPress:{required:!0,tsType:{name:"signature",type:"function",raw:"(index: string) => void",signature:{arguments:[{type:{name:"string"},name:"index"}],return:{name:"void"}}},description:""},onUnmount:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onTabLayout:{required:!0,tsType:{name:"signature",type:"function",raw:"(tab: { id: string; layout: LayoutRectangle }) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ id: string; layout: LayoutRectangle }",signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"layout",value:{name:"LayoutRectangle",required:!0}}]}},name:"tab"}],return:{name:"void"}}},description:""},onWillMount:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},id:{required:!0,tsType:{name:"string"},description:""},iconSlot:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  style: TextStyle
) => React.ReactNode`,signature:{arguments:[{type:{name:"TextStyle"},name:"style"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},label:{required:!1,tsType:{name:"string"},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:""},style:{required:!1,tsType:{name:"Partial",elements:[{name:"intersection",raw:`TabStyle & {
  hasIcon: ViewStyle
  hasLabel: ViewStyle
  isActiveLabel: TextStyle
  isActiveIcon: TextStyle
}`,elements:[{name:"signature",type:"object",raw:`{
  root: ViewStyle
  icon: TextStyle
  label: TextStyle
  overlay: ViewStyle
}`,signature:{properties:[{key:"root",value:{name:"ViewStyle",required:!0}},{key:"icon",value:{name:"TextStyle",required:!0}},{key:"label",value:{name:"TextStyle",required:!0}},{key:"overlay",value:{name:"ViewStyle",required:!0}}]}},{name:"signature",type:"object",raw:`{
  hasIcon: ViewStyle
  hasLabel: ViewStyle
  isActiveLabel: TextStyle
  isActiveIcon: TextStyle
}`,signature:{properties:[{key:"hasIcon",value:{name:"ViewStyle",required:!0}},{key:"hasLabel",value:{name:"ViewStyle",required:!0}},{key:"isActiveLabel",value:{name:"TextStyle",required:!0}},{key:"isActiveIcon",value:{name:"TextStyle",required:!0}}]}}]}],raw:`Partial<
  TabStyle & {
    hasIcon: ViewStyle
    hasLabel: ViewStyle
    isActiveLabel: TextStyle
    isActiveIcon: TextStyle
  }
>`},description:""},badgeSlot:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const Bp=B.create({root:{flex:1}});class N extends x.Component{constructor(){super(...arguments),this.state={isHover:!1}}render(){const{onPress:e,palette:r,slot:t,style:n,theme:i}=this.props,c=ne({palette:r,theme:i,isOnPaper:r!==void 0}),l=jp(c,i);return o.jsxs(q,{style:n,onStartShouldSetResponder:()=>!0,children:[t==null?void 0:t(i),o.jsx(oe,{color:c,onRef:p=>this.ripple=p}),o.jsx(se,{style:R.root,isVisible:this.state.isHover,children:o.jsx(q,{style:l.root})}),o.jsx(q,{style:R.root,children:o.jsx(le,{style:Bp.root,onHoverIn:()=>this.setState({isHover:!0}),onHoverOut:()=>{this.ripple.onPressOut(),this.setState({isHover:!1})},onPress:e,onPressIn:p=>{this.ripple.onPressIn(p)},onPressOut:()=>{this.ripple.onPressOut()}})})]})}}N.__docgenInfo={description:"",methods:[],displayName:"ScrollIndicator",props:{style:{required:!0,tsType:{name:"unknown"},description:""},palette:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"}]},description:""},theme:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  shape: Shape
  palette: Palette
  spacing: number
  business: Status & B
  overrides: O
  typography: Typography
}`,signature:{properties:[{key:"shape",value:{name:"signature",type:"object",raw:`{
  borderRadius: number
}`,signature:{properties:[{key:"borderRadius",value:{name:"number",required:!0}}]},required:!0}},{key:"palette",value:{name:"signature",type:"object",raw:`{
  common: CommonColors
  type: PaletteType
  contrastThreshold: number
  tonalOffset: number
  primary: PaletteColor
  secondary: PaletteColor
  grey: Color
  text: Text
  divider: Divider
  modifier: Modifier
  background: Background
  state: {
    hover: OverlayOpacity
    focus: OverlayOpacity
    selected: OverlayOpacity
    activated: OverlayOpacity
    pressed: OverlayOpacity
    draged: OverlayOpacity
  }
}`,signature:{properties:[{key:"common",value:{name:"signature",type:"object",raw:`{
  black: string
  white: string
}`,signature:{properties:[{key:"black",value:{name:"string",required:!0}},{key:"white",value:{name:"string",required:!0}}]},required:!0}},{key:"type",value:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}],required:!0}},{key:"contrastThreshold",value:{name:"number",required:!0}},{key:"tonalOffset",value:{name:"number",required:!0}},{key:"primary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"secondary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"grey",value:{name:"signature",type:"object",raw:`{
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100: string
    A200: string
    A400: string
    A700: string
}`,signature:{properties:[{key:"50",value:{name:"string",required:!0}},{key:"100",value:{name:"string",required:!0}},{key:"200",value:{name:"string",required:!0}},{key:"300",value:{name:"string",required:!0}},{key:"400",value:{name:"string",required:!0}},{key:"500",value:{name:"string",required:!0}},{key:"600",value:{name:"string",required:!0}},{key:"700",value:{name:"string",required:!0}},{key:"800",value:{name:"string",required:!0}},{key:"900",value:{name:"string",required:!0}},{key:"A100",value:{name:"string",required:!0}},{key:"A200",value:{name:"string",required:!0}},{key:"A400",value:{name:"string",required:!0}},{key:"A700",value:{name:"string",required:!0}}]},required:!0}},{key:"text",value:{name:"signature",type:"object",raw:`{
  primary: string
  secondary: string
  disabled: string
  hint: string
}`,signature:{properties:[{key:"primary",value:{name:"string",required:!0}},{key:"secondary",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"hint",value:{name:"string",required:!0}}]},required:!0}},{key:"divider",value:{name:"string",required:!0}},{key:"modifier",value:{name:"signature",type:"object",raw:`{
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  disabled: string
  disabledBackground: string
}`,signature:{properties:[{key:"active",value:{name:"string",required:!0}},{key:"hover",value:{name:"string",required:!0}},{key:"hoverOpacity",value:{name:"number",required:!0}},{key:"selected",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"disabledBackground",value:{name:"string",required:!0}}]},required:!0}},{key:"background",value:{name:"signature",type:"object",raw:`{
  statusBar: BackgroundTheme
  appBar: BackgroundTheme
  default: BackgroundTheme
  paper: BackgroundTheme
}`,signature:{properties:[{key:"statusBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"appBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"default",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"paper",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}}]},required:!0}},{key:"state",value:{name:"signature",type:"object",raw:`{
  hover: OverlayOpacity
  focus: OverlayOpacity
  selected: OverlayOpacity
  activated: OverlayOpacity
  pressed: OverlayOpacity
  draged: OverlayOpacity
}`,signature:{properties:[{key:"hover",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"focus",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"selected",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"activated",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"pressed",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"draged",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]},required:!0}},{key:"spacing",value:{name:"number",required:!0}},{key:"business",value:{name:"intersection",raw:"Status & B",elements:[{name:"signature",type:"object",raw:`{
  error: PaletteColor
  valid: PaletteColor
  warning: PaletteColor
}`,signature:{properties:[{key:"error",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"valid",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"warning",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"any"}],required:!0}},{key:"overrides",value:{name:"any",required:!0}},{key:"typography",value:{name:"signature",type:"object",raw:`{
  fontFamily: string
  fontSize: number
  fontWeightLight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightRegular:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightMedium:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
}`,signature:{properties:[{key:"fontFamily",value:{name:"string",required:!0}},{key:"fontSize",value:{name:"number",required:!0}},{key:"fontWeightLight",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightRegular",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightMedium",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}}]},required:!0}}]}},description:""},slot:{required:!1,tsType:{name:"signature",type:"function",raw:"(theme: Theme<any, any>) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  shape: Shape
  palette: Palette
  spacing: number
  business: Status & B
  overrides: O
  typography: Typography
}`,signature:{properties:[{key:"shape",value:{name:"signature",type:"object",raw:`{
  borderRadius: number
}`,signature:{properties:[{key:"borderRadius",value:{name:"number",required:!0}}]},required:!0}},{key:"palette",value:{name:"signature",type:"object",raw:`{
  common: CommonColors
  type: PaletteType
  contrastThreshold: number
  tonalOffset: number
  primary: PaletteColor
  secondary: PaletteColor
  grey: Color
  text: Text
  divider: Divider
  modifier: Modifier
  background: Background
  state: {
    hover: OverlayOpacity
    focus: OverlayOpacity
    selected: OverlayOpacity
    activated: OverlayOpacity
    pressed: OverlayOpacity
    draged: OverlayOpacity
  }
}`,signature:{properties:[{key:"common",value:{name:"signature",type:"object",raw:`{
  black: string
  white: string
}`,signature:{properties:[{key:"black",value:{name:"string",required:!0}},{key:"white",value:{name:"string",required:!0}}]},required:!0}},{key:"type",value:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}],required:!0}},{key:"contrastThreshold",value:{name:"number",required:!0}},{key:"tonalOffset",value:{name:"number",required:!0}},{key:"primary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"secondary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"grey",value:{name:"signature",type:"object",raw:`{
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100: string
    A200: string
    A400: string
    A700: string
}`,signature:{properties:[{key:"50",value:{name:"string",required:!0}},{key:"100",value:{name:"string",required:!0}},{key:"200",value:{name:"string",required:!0}},{key:"300",value:{name:"string",required:!0}},{key:"400",value:{name:"string",required:!0}},{key:"500",value:{name:"string",required:!0}},{key:"600",value:{name:"string",required:!0}},{key:"700",value:{name:"string",required:!0}},{key:"800",value:{name:"string",required:!0}},{key:"900",value:{name:"string",required:!0}},{key:"A100",value:{name:"string",required:!0}},{key:"A200",value:{name:"string",required:!0}},{key:"A400",value:{name:"string",required:!0}},{key:"A700",value:{name:"string",required:!0}}]},required:!0}},{key:"text",value:{name:"signature",type:"object",raw:`{
  primary: string
  secondary: string
  disabled: string
  hint: string
}`,signature:{properties:[{key:"primary",value:{name:"string",required:!0}},{key:"secondary",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"hint",value:{name:"string",required:!0}}]},required:!0}},{key:"divider",value:{name:"string",required:!0}},{key:"modifier",value:{name:"signature",type:"object",raw:`{
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  disabled: string
  disabledBackground: string
}`,signature:{properties:[{key:"active",value:{name:"string",required:!0}},{key:"hover",value:{name:"string",required:!0}},{key:"hoverOpacity",value:{name:"number",required:!0}},{key:"selected",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"disabledBackground",value:{name:"string",required:!0}}]},required:!0}},{key:"background",value:{name:"signature",type:"object",raw:`{
  statusBar: BackgroundTheme
  appBar: BackgroundTheme
  default: BackgroundTheme
  paper: BackgroundTheme
}`,signature:{properties:[{key:"statusBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"appBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"default",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"paper",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}}]},required:!0}},{key:"state",value:{name:"signature",type:"object",raw:`{
  hover: OverlayOpacity
  focus: OverlayOpacity
  selected: OverlayOpacity
  activated: OverlayOpacity
  pressed: OverlayOpacity
  draged: OverlayOpacity
}`,signature:{properties:[{key:"hover",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"focus",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"selected",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"activated",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"pressed",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"draged",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]},required:!0}},{key:"spacing",value:{name:"number",required:!0}},{key:"business",value:{name:"intersection",raw:"Status & B",elements:[{name:"signature",type:"object",raw:`{
  error: PaletteColor
  valid: PaletteColor
  warning: PaletteColor
}`,signature:{properties:[{key:"error",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"valid",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"warning",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"any"}],required:!0}},{key:"overrides",value:{name:"any",required:!0}},{key:"typography",value:{name:"signature",type:"object",raw:`{
  fontFamily: string
  fontSize: number
  fontWeightLight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightRegular:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightMedium:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
}`,signature:{properties:[{key:"fontFamily",value:{name:"string",required:!0}},{key:"fontSize",value:{name:"number",required:!0}},{key:"fontWeightLight",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightRegular",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightMedium",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}}]},required:!0}}]}},name:"theme"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},onPress:{required:!0,tsType:{name:"signature",type:"function",raw:"(e: GestureResponderEvent) => void",signature:{arguments:[{type:{name:"GestureResponderEvent"},name:"e"}],return:{name:"void"}}},description:""}}};const j=class j extends x.Component{constructor(e){super(e),this.state={activeTabId:"",isScrollEnabled:!1,hasLeftScrollIndicator:!1,hasRightScrollIndicator:!1,wrapperWidth:0},this.layout={currentScroll:0,maxScroll:0,tabsState:[]},this.SAMmodel={tabsWidth:0,tabsState:[]},this.cursorAnimatedValues={opacity:new m.Value(0),translateX:new m.Value(0),translateY:new m.Value(0),rotate:new m.Value(0),scaleX:new m.Value(0),scaleY:new m.Value(1)},this.controlState="stale",this.rollRight=U((t=0)=>{const n=Vp(this.layout,this.paddingHorizontal);if(n===void 0)return;const i=n.id,c=Math.min(this.SAMmodel.tabsState.findIndex(p=>p.id===i)+t+1,this.SAMmodel.tabsState.length-1),l=this.SAMmodel.tabsState[c];this.scrollToTab(l.id)},t=>[t],500),this.rollLeft=U((t=0)=>{const n=Lp(this.layout);if(n===void 0)return;const i=n.id,c=Math.max(this.SAMmodel.tabsState.findIndex(p=>p.id===i)-(t+1),0),l=this.SAMmodel.tabsState[c];this.scrollToTab(l.id)},t=>[t],500),this.bindTab=t=>{const{hasIconOnTop:n,palette:i,isFrozen:c}=this.props,{activeTabId:l,isScrollEnabled:p}=this.state;return{onWillMount:this.registerTab,onTabLayout:this.setTabLayout,onUnmount:this.removeTab,onPress:this.onPressTab,isFrozen:c,isActive:t===l,mustGrow:p,hasIconOnTop:n,palette:i}},this.onLayout=t=>{this.layout.barLayout!==void 0&&t.nativeEvent.layout.height===this.layout.barLayout.height&&t.nativeEvent.layout.width===this.layout.barLayout.width&&t.nativeEvent.layout.x===this.layout.barLayout.x&&t.nativeEvent.layout.y===this.layout.barLayout.y||(this.layout.barLayout=t.nativeEvent.layout,this.computeState())},this.registerTab=t=>{this.present({mutation:"registerTab",payload:{id:t}})},this.removeTab=t=>{this.present({mutation:"removeTab",payload:{id:t}})},this.setTabLayout=t=>{this.present({mutation:"setTabLayout",payload:t})},this.onScroll=t=>{const n=t.nativeEvent.contentOffset.x;this.layout.currentScroll=Math.round(n),(this.layout.currentScroll>0!==this.state.hasLeftScrollIndicator||this.layout.currentScroll<this.layout.maxScroll!==this.state.hasRightScrollIndicator)&&this.setState({hasLeftScrollIndicator:this.layout.currentScroll>0,hasRightScrollIndicator:this.layout.currentScroll<this.layout.maxScroll})},this.onPressTab=t=>{const{onChange:n,onPressActiveTab:i}=this.props;t!==this.state.activeTabId?(this.scrollToTab(t),n&&n(t),this.setState({activeTabId:t})):i&&i()};const r=this.cursorAnimatedValues.rotate.interpolate({inputRange:[0,1],outputRange:["0deg","360deg"]});this.animatedStyle=B.create({root:{transform:[{translateX:this.cursorAnimatedValues.translateX},{translateY:this.cursorAnimatedValues.translateY},{scaleX:this.cursorAnimatedValues.scaleX},{scaleY:this.cursorAnimatedValues.scaleY},{rotate:r}]}})}get activeTab(){return this.SAMmodel.tabsState.find(e=>e.id===this.state.activeTabId)}get paddingHorizontal(){return this.getStyles(this.state.isScrollEnabled).paddingHorizontal}get isLayoutReady(){return this.layout.barLayout!==void 0&&this.SAMmodel.tabsState.length>0&&this.SAMmodel.tabsState.every(e=>!e.isStale)}get tabs(){return this.props.tabs.map(e=>o.jsx(ue,{...e,...this.bindTab(e.id)},e.id))}static getDerivedStateFromProps(e,r){const t=e.activeTabId!==r.activeIdFromProps;return{...r,activeIdFromProps:e.activeTabId,activeTabId:t&&e.activeTabId?e.activeTabId:r.activeTabId}}componentDidMount(){const e=Cp(this.SAMmodel);(this.props.activeTabId||e)&&this.setState({activeTabId:this.props.activeTabId||e})}shouldComponentUpdate(e,r){return ve(e,r,this.props,this.state)}render(){const{isFrozen:e}=this.props,{hasLeftScrollIndicator:r,hasRightScrollIndicator:t,isScrollEnabled:n}=this.state,{style:i}=this.getStyles(n),c=e?{left:-this.layout.currentScroll}:{},l=o.jsxs(q,{style:[i.scrollContent,{minWidth:this.state.wrapperWidth},c],children:[this.renderCursor(i),this.tabs]});return o.jsx(ke,{elevation:2,style:{root:i.root,content:i.container},onLayout:this.onLayout,children:this.renderInScrollView(l,i,n,r,t)})}componentDidUpdate(e,r){this.state.activeTabId!==r.activeTabId&&this.controlState==="isLayoutReady"&&this.scrollToTab(this.state.activeTabId),this.activeTab&&this.activeTab.layout&&this.updateCursorPosition()}updateCursorPosition(){this.cursorAnimation&&Object.keys(this.cursorAnimation).forEach(e=>this.cursorAnimation[e].stop()),this.cursorAnimation=this.getAnimation({opacity:1,translateX:this.activeTab.layout.x+this.activeTab.layout.width*.5,translateY:0,rotate:0,scaleX:this.activeTab.layout.width,scaleY:1}),Object.keys(this.cursorAnimation).forEach(e=>this.cursorAnimation[e].start())}renderCursor(e){const r=this.activeTab&&this.activeTab.layout?this.activeTab.layout:{x:0,y:0,width:0,height:0},t=this.layout&&this.layout.barLayout?this.layout.barLayout:{x:0,y:0,width:0,height:0};return o.jsx(m.View,{style:[e.cursorAnimatedContainer,this.animatedStyle.root],children:this.props.renderCustomCursor?this.props.renderCustomCursor(r,t,this.props.theme):o.jsx(q,{style:e.cursorIndicator})})}renderInScrollView(e,r,t,n,i){const{palette:c,theme:l,leftScrollButton:p,rightScrollButton:h,isFrozen:I}=this.props;return o.jsxs(o.Fragment,{children:[o.jsx(fe,{ref:w=>{this.scrollViewRef=w},scrollEnabled:t&&!I,horizontal:!0,showsHorizontalScrollIndicator:!1,showsVerticalScrollIndicator:!1,onScroll:this.onScroll,style:r.scrollView,children:e}),n&&p&&o.jsx(N,{palette:c,style:r.leftIndicator,slot:p,theme:l,onPress:()=>this.rollLeft()}),i&&h&&o.jsx(N,{palette:c,style:r.rightIndicator,slot:h,theme:l,onPress:()=>this.rollRight()})]})}getStyles(e){const{hasIconOnTop:r,palette:t,theme:n,style:i}=this.props;return Ip({theme:n,palette:t,style:i,options:{hasIconOnTop:r,isScrollEnabled:e}})}computeState(){const e=this.controlState;switch(this.controlState==="stale"?this.isLayoutReady&&(this.controlState="isLayoutReady"):this.controlState==="isLayoutReady"&&(this.isLayoutReady||(this.controlState="stale")),this.layout.tabsState=this.SAMmodel.tabsState.filter(r=>!r.isStale).map(({id:r,layout:t})=>({id:r,layout:t})),this.controlState==="isLayoutReady"&&this.activeTab&&(e==="stale"&&this.activeTab.layout&&(this.cursorAnimatedValues.translateX.setValue(this.activeTab.layout.x),this.cursorAnimatedValues.scaleX.setValue(this.activeTab.layout.width)),this.updateCursorPosition()),this.controlState){default:case"stale":break;case"isLayoutReady":this.setScrollState();break}}present(e){if(e.mutation==="registerTab"){const r=e.payload;this.SAMmodel.tabsState=this.SAMmodel.tabsState.filter(t=>t.id!==r.id),this.SAMmodel.tabsState.push({id:r.id,isStale:!0}),this.computeState()}else if(e.mutation==="setTabLayout"){const r=e.payload;if(!r.layout)return;if(this.isLayoutReady)this.SAMmodel.tabsState=this.SAMmodel.tabsState.map(t=>t.id===r.id?r:{...t});else{const t=this.SAMmodel.tabsState.find(n=>n.id===r.id);t&&(t.isStale=!1,t.layout=r.layout),this.SAMmodel.tabsWidth=Z(this.SAMmodel)}this.computeState()}else if(e.mutation==="removeTab"){if(this.controlState==="stale")return;const r=e.payload;this.SAMmodel.tabsState=this.SAMmodel.tabsState.filter(t=>t.id!==r.id),this.SAMmodel.tabsWidth=Z(this.SAMmodel),this.computeState()}}setScrollState(){const e=this.SAMmodel.tabsWidth>this.layout.barLayout.width,r=e;this.layout.maxScroll=e?this.SAMmodel.tabsWidth-this.layout.barLayout.width+this.getStyles(e).paddingHorizontal*2:0;const t=(this.layout&&this.layout.barLayout&&this.layout.barLayout.width||0)-this.paddingHorizontal*2;this.setState({isScrollEnabled:e,hasRightScrollIndicator:r,wrapperWidth:t},()=>{this.props.isFrozen||this.scrollToTab(this.state.activeTabId,!1)})}scrollToTab(e,r){const t=this.getTabOffset(e);this.scrollTo(this.layout.currentScroll+t,r)}getTabOffset(e){const r=this.layout.tabsState.find(t=>t.id===e);if(r===void 0)return 0;{const t=de(r,this.layout),n=ce(r,this.layout,this.paddingHorizontal);return t<0?t:n>0?n:0}}scrollTo(e,r=!0){const t=this.limit(e);this.scrollViewRef&&this.scrollViewRef.scrollTo({x:t,animated:r}),this.layout.currentScroll=Math.round(t)}limit(e=0){return Math.min(this.layout.maxScroll,Math.max(0,e))}getAnimation({opacity:e,translateX:r,translateY:t,rotate:n,scaleX:i,scaleY:c}){const l=this.props.customCursorAnimation?this.props.customCursorAnimation(this.cursorAnimatedValues,this.activeTab.layout,this.props.theme):{};return{opacity:l.opacity||m.timing(this.cursorAnimatedValues.opacity,{useNativeDriver:!0,toValue:e,duration:j.cursorTransitionDuration,easing:k.easeInOut}),translateX:l.translateX||m.timing(this.cursorAnimatedValues.translateX,{useNativeDriver:!0,toValue:r,duration:j.cursorTransitionDuration,easing:k.easeInOut}),translateY:l.translateY||m.timing(this.cursorAnimatedValues.translateY,{useNativeDriver:!0,toValue:t,duration:j.cursorTransitionDuration,easing:k.easeInOut}),rotate:l.rotate||m.timing(this.cursorAnimatedValues.rotate,{useNativeDriver:!0,toValue:n,duration:j.cursorTransitionDuration,easing:k.easeInOut}),scaleX:l.scaleX||m.timing(this.cursorAnimatedValues.scaleX,{useNativeDriver:!0,toValue:i,duration:j.cursorTransitionDuration,easing:k.easeInOut}),scaleY:l.scaleY||m.timing(this.cursorAnimatedValues.scaleY,{useNativeDriver:!0,toValue:c,duration:j.cursorTransitionDuration,easing:k.easeInOut})}}};j.cursorTransitionDuration=200;let z=j;function Pp(a){return a.tabsState[0]||void 0}function Ap(a){return a.tabsState[a.tabsState.length-1]}function Cp(a){const e=a.tabsState[0];return e?e.id:void 0}function Z(a){if(a.tabsState.length===0)return 0;const e=Pp(a).layout,r=Ap(a).layout;return e&&r?Math.round(r.x+r.width-e.x):0}function ce(a,e,r){return a.layout.x+a.layout.width-e.currentScroll-(e.barLayout.x+e.barLayout.width-r*2)}function de(a,e){return a.layout.x-e.currentScroll-e.barLayout.x}function Rp(a,e,r){return ce(a,e,r)>0}function zp(a,e){return de(a,e)<0}function Vp(a,e){return a.tabsState.slice().reverse().find(r=>!Rp(r,a,e))}function Lp(a){return a.tabsState.slice().find(e=>!zp(e,a))}const me=qe(z);z.__docgenInfo={description:"",methods:[{name:"activeTab",docblock:null,modifiers:["get"],params:[],returns:{type:{name:"union",raw:"TabState | undefined",elements:[{name:"signature",type:"object",raw:`{
  isStale: boolean
  id: string
  layout?: LayoutRectangle
}`,signature:{properties:[{key:"isStale",value:{name:"boolean",required:!0}},{key:"id",value:{name:"string",required:!0}},{key:"layout",value:{name:"LayoutRectangle",required:!1}}]}},{name:"undefined"}]}}},{name:"paddingHorizontal",docblock:null,modifiers:["get"],params:[],returns:{type:{name:"number"}}},{name:"isLayoutReady",docblock:null,modifiers:["get"],params:[],returns:null},{name:"tabs",docblock:null,modifiers:["get"],params:[],returns:{type:{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}}}],displayName:"Tabs",props:{activeTabId:{required:!1,tsType:{name:"string"},description:""},hasIconOnTop:{required:!1,tsType:{name:"boolean"},description:""},palette:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"}]},description:""},style:{required:!1,tsType:{name:"Partial",elements:[{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
  root: ViewStyle
  container: ViewStyle
  scrollContent: ViewStyle
  leftIndicator: ViewStyle
  rightIndicator: ViewStyle
  cursorAnimatedContainer: ViewStyle
  cursorIndicator: ViewStyle
  scrollView: ViewStyle
}`,signature:{properties:[{key:"root",value:{name:"ViewStyle",required:!0}},{key:"container",value:{name:"ViewStyle",required:!0}},{key:"scrollContent",value:{name:"ViewStyle",required:!0}},{key:"leftIndicator",value:{name:"ViewStyle",required:!0}},{key:"rightIndicator",value:{name:"ViewStyle",required:!0}},{key:"cursorAnimatedContainer",value:{name:"ViewStyle",required:!0}},{key:"cursorIndicator",value:{name:"ViewStyle",required:!0}},{key:"scrollView",value:{name:"ViewStyle",required:!0}}]}}],raw:"Partial<TabsBarStyle>"}],raw:"Partial<TabBarStyleOverride>"},description:""},paddingHorizontal:{required:!0,tsType:{name:"number"},description:""},tabs:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string
  iconSlot?: (
    style: TextStyle
  ) => React.ReactNode
  label?: string
  isDisabled?: boolean
  style?: TabStyleOverride
  badgeSlot?: React.ReactNode
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"iconSlot",value:{name:"signature",type:"function",raw:`(
  style: TextStyle
) => React.ReactNode`,signature:{arguments:[{type:{name:"TextStyle"},name:"style"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1}},{key:"label",value:{name:"string",required:!1}},{key:"isDisabled",value:{name:"boolean",required:!1}},{key:"style",value:{name:"Partial",elements:[{name:"intersection",raw:`TabStyle & {
  hasIcon: ViewStyle
  hasLabel: ViewStyle
  isActiveLabel: TextStyle
  isActiveIcon: TextStyle
}`,elements:[{name:"signature",type:"object",raw:`{
  root: ViewStyle
  icon: TextStyle
  label: TextStyle
  overlay: ViewStyle
}`,signature:{properties:[{key:"root",value:{name:"ViewStyle",required:!0}},{key:"icon",value:{name:"TextStyle",required:!0}},{key:"label",value:{name:"TextStyle",required:!0}},{key:"overlay",value:{name:"ViewStyle",required:!0}}]}},{name:"signature",type:"object",raw:`{
  hasIcon: ViewStyle
  hasLabel: ViewStyle
  isActiveLabel: TextStyle
  isActiveIcon: TextStyle
}`,signature:{properties:[{key:"hasIcon",value:{name:"ViewStyle",required:!0}},{key:"hasLabel",value:{name:"ViewStyle",required:!0}},{key:"isActiveLabel",value:{name:"TextStyle",required:!0}},{key:"isActiveIcon",value:{name:"TextStyle",required:!0}}]}}]}],raw:`Partial<
  TabStyle & {
    hasIcon: ViewStyle
    hasLabel: ViewStyle
    isActiveLabel: TextStyle
    isActiveIcon: TextStyle
  }
>`,required:!1}},{key:"badgeSlot",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1}}]}}],raw:"TabProps[]"},description:""},customCursorAnimation:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  cursorValues: AnimatedValues,
  targetLayout: LayoutRectangle,
  theme: Theme<any>
) => {
  opacity?: Animated.CompositeAnimation
  translateX?: Animated.CompositeAnimation
  translateY?: Animated.CompositeAnimation
  rotate?: Animated.CompositeAnimation
  scaleX?: Animated.CompositeAnimation
  scaleY?: Animated.CompositeAnimation
}`,signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ [key in AnimatableKey]: Animated.Value }",signature:{properties:[{key:{name:"union",raw:`| 'opacity'
| 'translateX'
| 'translateY'
| 'rotate'
| 'scaleX'
| 'scaleY'`,elements:[{name:"literal",value:"'opacity'"},{name:"literal",value:"'translateX'"},{name:"literal",value:"'translateY'"},{name:"literal",value:"'rotate'"},{name:"literal",value:"'scaleX'"},{name:"literal",value:"'scaleY'"}],required:!0},value:{name:"Animated.Value"}}]}},name:"cursorValues"},{type:{name:"LayoutRectangle"},name:"targetLayout"},{type:{name:"signature",type:"object",raw:`{
  shape: Shape
  palette: Palette
  spacing: number
  business: Status & B
  overrides: O
  typography: Typography
}`,signature:{properties:[{key:"shape",value:{name:"signature",type:"object",raw:`{
  borderRadius: number
}`,signature:{properties:[{key:"borderRadius",value:{name:"number",required:!0}}]},required:!0}},{key:"palette",value:{name:"signature",type:"object",raw:`{
  common: CommonColors
  type: PaletteType
  contrastThreshold: number
  tonalOffset: number
  primary: PaletteColor
  secondary: PaletteColor
  grey: Color
  text: Text
  divider: Divider
  modifier: Modifier
  background: Background
  state: {
    hover: OverlayOpacity
    focus: OverlayOpacity
    selected: OverlayOpacity
    activated: OverlayOpacity
    pressed: OverlayOpacity
    draged: OverlayOpacity
  }
}`,signature:{properties:[{key:"common",value:{name:"signature",type:"object",raw:`{
  black: string
  white: string
}`,signature:{properties:[{key:"black",value:{name:"string",required:!0}},{key:"white",value:{name:"string",required:!0}}]},required:!0}},{key:"type",value:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}],required:!0}},{key:"contrastThreshold",value:{name:"number",required:!0}},{key:"tonalOffset",value:{name:"number",required:!0}},{key:"primary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"secondary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"grey",value:{name:"signature",type:"object",raw:`{
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100: string
    A200: string
    A400: string
    A700: string
}`,signature:{properties:[{key:"50",value:{name:"string",required:!0}},{key:"100",value:{name:"string",required:!0}},{key:"200",value:{name:"string",required:!0}},{key:"300",value:{name:"string",required:!0}},{key:"400",value:{name:"string",required:!0}},{key:"500",value:{name:"string",required:!0}},{key:"600",value:{name:"string",required:!0}},{key:"700",value:{name:"string",required:!0}},{key:"800",value:{name:"string",required:!0}},{key:"900",value:{name:"string",required:!0}},{key:"A100",value:{name:"string",required:!0}},{key:"A200",value:{name:"string",required:!0}},{key:"A400",value:{name:"string",required:!0}},{key:"A700",value:{name:"string",required:!0}}]},required:!0}},{key:"text",value:{name:"signature",type:"object",raw:`{
  primary: string
  secondary: string
  disabled: string
  hint: string
}`,signature:{properties:[{key:"primary",value:{name:"string",required:!0}},{key:"secondary",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"hint",value:{name:"string",required:!0}}]},required:!0}},{key:"divider",value:{name:"string",required:!0}},{key:"modifier",value:{name:"signature",type:"object",raw:`{
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  disabled: string
  disabledBackground: string
}`,signature:{properties:[{key:"active",value:{name:"string",required:!0}},{key:"hover",value:{name:"string",required:!0}},{key:"hoverOpacity",value:{name:"number",required:!0}},{key:"selected",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"disabledBackground",value:{name:"string",required:!0}}]},required:!0}},{key:"background",value:{name:"signature",type:"object",raw:`{
  statusBar: BackgroundTheme
  appBar: BackgroundTheme
  default: BackgroundTheme
  paper: BackgroundTheme
}`,signature:{properties:[{key:"statusBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"appBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"default",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"paper",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}}]},required:!0}},{key:"state",value:{name:"signature",type:"object",raw:`{
  hover: OverlayOpacity
  focus: OverlayOpacity
  selected: OverlayOpacity
  activated: OverlayOpacity
  pressed: OverlayOpacity
  draged: OverlayOpacity
}`,signature:{properties:[{key:"hover",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"focus",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"selected",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"activated",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"pressed",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"draged",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]},required:!0}},{key:"spacing",value:{name:"number",required:!0}},{key:"business",value:{name:"intersection",raw:"Status & B",elements:[{name:"signature",type:"object",raw:`{
  error: PaletteColor
  valid: PaletteColor
  warning: PaletteColor
}`,signature:{properties:[{key:"error",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"valid",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"warning",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"any"}],required:!0}},{key:"overrides",value:{name:"Record",elements:[{name:"string"},{name:"object"}],raw:"Record<string, object>",required:!0}},{key:"typography",value:{name:"signature",type:"object",raw:`{
  fontFamily: string
  fontSize: number
  fontWeightLight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightRegular:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightMedium:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
}`,signature:{properties:[{key:"fontFamily",value:{name:"string",required:!0}},{key:"fontSize",value:{name:"number",required:!0}},{key:"fontWeightLight",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightRegular",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightMedium",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}}]},required:!0}}]}},name:"theme"}],return:{name:"signature",type:"object",raw:`{
  opacity?: Animated.CompositeAnimation
  translateX?: Animated.CompositeAnimation
  translateY?: Animated.CompositeAnimation
  rotate?: Animated.CompositeAnimation
  scaleX?: Animated.CompositeAnimation
  scaleY?: Animated.CompositeAnimation
}`,signature:{properties:[{key:"opacity",value:{name:"Animated.CompositeAnimation",required:!1}},{key:"translateX",value:{name:"Animated.CompositeAnimation",required:!1}},{key:"translateY",value:{name:"Animated.CompositeAnimation",required:!1}},{key:"rotate",value:{name:"Animated.CompositeAnimation",required:!1}},{key:"scaleX",value:{name:"Animated.CompositeAnimation",required:!1}},{key:"scaleY",value:{name:"Animated.CompositeAnimation",required:!1}}]}}}},description:""},isFrozen:{required:!1,tsType:{name:"boolean"},description:""},renderCustomCursor:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  tabLayout: LayoutRectangle,
  barLayout: LayoutRectangle,
  theme: Theme<any>
) => React.ReactNode`,signature:{arguments:[{type:{name:"LayoutRectangle"},name:"tabLayout"},{type:{name:"LayoutRectangle"},name:"barLayout"},{type:{name:"signature",type:"object",raw:`{
  shape: Shape
  palette: Palette
  spacing: number
  business: Status & B
  overrides: O
  typography: Typography
}`,signature:{properties:[{key:"shape",value:{name:"signature",type:"object",raw:`{
  borderRadius: number
}`,signature:{properties:[{key:"borderRadius",value:{name:"number",required:!0}}]},required:!0}},{key:"palette",value:{name:"signature",type:"object",raw:`{
  common: CommonColors
  type: PaletteType
  contrastThreshold: number
  tonalOffset: number
  primary: PaletteColor
  secondary: PaletteColor
  grey: Color
  text: Text
  divider: Divider
  modifier: Modifier
  background: Background
  state: {
    hover: OverlayOpacity
    focus: OverlayOpacity
    selected: OverlayOpacity
    activated: OverlayOpacity
    pressed: OverlayOpacity
    draged: OverlayOpacity
  }
}`,signature:{properties:[{key:"common",value:{name:"signature",type:"object",raw:`{
  black: string
  white: string
}`,signature:{properties:[{key:"black",value:{name:"string",required:!0}},{key:"white",value:{name:"string",required:!0}}]},required:!0}},{key:"type",value:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}],required:!0}},{key:"contrastThreshold",value:{name:"number",required:!0}},{key:"tonalOffset",value:{name:"number",required:!0}},{key:"primary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"secondary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"grey",value:{name:"signature",type:"object",raw:`{
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100: string
    A200: string
    A400: string
    A700: string
}`,signature:{properties:[{key:"50",value:{name:"string",required:!0}},{key:"100",value:{name:"string",required:!0}},{key:"200",value:{name:"string",required:!0}},{key:"300",value:{name:"string",required:!0}},{key:"400",value:{name:"string",required:!0}},{key:"500",value:{name:"string",required:!0}},{key:"600",value:{name:"string",required:!0}},{key:"700",value:{name:"string",required:!0}},{key:"800",value:{name:"string",required:!0}},{key:"900",value:{name:"string",required:!0}},{key:"A100",value:{name:"string",required:!0}},{key:"A200",value:{name:"string",required:!0}},{key:"A400",value:{name:"string",required:!0}},{key:"A700",value:{name:"string",required:!0}}]},required:!0}},{key:"text",value:{name:"signature",type:"object",raw:`{
  primary: string
  secondary: string
  disabled: string
  hint: string
}`,signature:{properties:[{key:"primary",value:{name:"string",required:!0}},{key:"secondary",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"hint",value:{name:"string",required:!0}}]},required:!0}},{key:"divider",value:{name:"string",required:!0}},{key:"modifier",value:{name:"signature",type:"object",raw:`{
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  disabled: string
  disabledBackground: string
}`,signature:{properties:[{key:"active",value:{name:"string",required:!0}},{key:"hover",value:{name:"string",required:!0}},{key:"hoverOpacity",value:{name:"number",required:!0}},{key:"selected",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"disabledBackground",value:{name:"string",required:!0}}]},required:!0}},{key:"background",value:{name:"signature",type:"object",raw:`{
  statusBar: BackgroundTheme
  appBar: BackgroundTheme
  default: BackgroundTheme
  paper: BackgroundTheme
}`,signature:{properties:[{key:"statusBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"appBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"default",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"paper",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}}]},required:!0}},{key:"state",value:{name:"signature",type:"object",raw:`{
  hover: OverlayOpacity
  focus: OverlayOpacity
  selected: OverlayOpacity
  activated: OverlayOpacity
  pressed: OverlayOpacity
  draged: OverlayOpacity
}`,signature:{properties:[{key:"hover",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"focus",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"selected",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"activated",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"pressed",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"draged",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]},required:!0}},{key:"spacing",value:{name:"number",required:!0}},{key:"business",value:{name:"intersection",raw:"Status & B",elements:[{name:"signature",type:"object",raw:`{
  error: PaletteColor
  valid: PaletteColor
  warning: PaletteColor
}`,signature:{properties:[{key:"error",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"valid",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"warning",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"any"}],required:!0}},{key:"overrides",value:{name:"Record",elements:[{name:"string"},{name:"object"}],raw:"Record<string, object>",required:!0}},{key:"typography",value:{name:"signature",type:"object",raw:`{
  fontFamily: string
  fontSize: number
  fontWeightLight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightRegular:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightMedium:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
}`,signature:{properties:[{key:"fontFamily",value:{name:"string",required:!0}},{key:"fontSize",value:{name:"number",required:!0}},{key:"fontWeightLight",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightRegular",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightMedium",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}}]},required:!0}}]}},name:"theme"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},leftScrollButton:{required:!1,tsType:{name:"signature",type:"function",raw:"(theme: Theme<any>) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  shape: Shape
  palette: Palette
  spacing: number
  business: Status & B
  overrides: O
  typography: Typography
}`,signature:{properties:[{key:"shape",value:{name:"signature",type:"object",raw:`{
  borderRadius: number
}`,signature:{properties:[{key:"borderRadius",value:{name:"number",required:!0}}]},required:!0}},{key:"palette",value:{name:"signature",type:"object",raw:`{
  common: CommonColors
  type: PaletteType
  contrastThreshold: number
  tonalOffset: number
  primary: PaletteColor
  secondary: PaletteColor
  grey: Color
  text: Text
  divider: Divider
  modifier: Modifier
  background: Background
  state: {
    hover: OverlayOpacity
    focus: OverlayOpacity
    selected: OverlayOpacity
    activated: OverlayOpacity
    pressed: OverlayOpacity
    draged: OverlayOpacity
  }
}`,signature:{properties:[{key:"common",value:{name:"signature",type:"object",raw:`{
  black: string
  white: string
}`,signature:{properties:[{key:"black",value:{name:"string",required:!0}},{key:"white",value:{name:"string",required:!0}}]},required:!0}},{key:"type",value:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}],required:!0}},{key:"contrastThreshold",value:{name:"number",required:!0}},{key:"tonalOffset",value:{name:"number",required:!0}},{key:"primary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"secondary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"grey",value:{name:"signature",type:"object",raw:`{
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100: string
    A200: string
    A400: string
    A700: string
}`,signature:{properties:[{key:"50",value:{name:"string",required:!0}},{key:"100",value:{name:"string",required:!0}},{key:"200",value:{name:"string",required:!0}},{key:"300",value:{name:"string",required:!0}},{key:"400",value:{name:"string",required:!0}},{key:"500",value:{name:"string",required:!0}},{key:"600",value:{name:"string",required:!0}},{key:"700",value:{name:"string",required:!0}},{key:"800",value:{name:"string",required:!0}},{key:"900",value:{name:"string",required:!0}},{key:"A100",value:{name:"string",required:!0}},{key:"A200",value:{name:"string",required:!0}},{key:"A400",value:{name:"string",required:!0}},{key:"A700",value:{name:"string",required:!0}}]},required:!0}},{key:"text",value:{name:"signature",type:"object",raw:`{
  primary: string
  secondary: string
  disabled: string
  hint: string
}`,signature:{properties:[{key:"primary",value:{name:"string",required:!0}},{key:"secondary",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"hint",value:{name:"string",required:!0}}]},required:!0}},{key:"divider",value:{name:"string",required:!0}},{key:"modifier",value:{name:"signature",type:"object",raw:`{
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  disabled: string
  disabledBackground: string
}`,signature:{properties:[{key:"active",value:{name:"string",required:!0}},{key:"hover",value:{name:"string",required:!0}},{key:"hoverOpacity",value:{name:"number",required:!0}},{key:"selected",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"disabledBackground",value:{name:"string",required:!0}}]},required:!0}},{key:"background",value:{name:"signature",type:"object",raw:`{
  statusBar: BackgroundTheme
  appBar: BackgroundTheme
  default: BackgroundTheme
  paper: BackgroundTheme
}`,signature:{properties:[{key:"statusBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"appBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"default",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"paper",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}}]},required:!0}},{key:"state",value:{name:"signature",type:"object",raw:`{
  hover: OverlayOpacity
  focus: OverlayOpacity
  selected: OverlayOpacity
  activated: OverlayOpacity
  pressed: OverlayOpacity
  draged: OverlayOpacity
}`,signature:{properties:[{key:"hover",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"focus",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"selected",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"activated",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"pressed",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"draged",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]},required:!0}},{key:"spacing",value:{name:"number",required:!0}},{key:"business",value:{name:"intersection",raw:"Status & B",elements:[{name:"signature",type:"object",raw:`{
  error: PaletteColor
  valid: PaletteColor
  warning: PaletteColor
}`,signature:{properties:[{key:"error",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"valid",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"warning",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"any"}],required:!0}},{key:"overrides",value:{name:"Record",elements:[{name:"string"},{name:"object"}],raw:"Record<string, object>",required:!0}},{key:"typography",value:{name:"signature",type:"object",raw:`{
  fontFamily: string
  fontSize: number
  fontWeightLight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightRegular:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightMedium:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
}`,signature:{properties:[{key:"fontFamily",value:{name:"string",required:!0}},{key:"fontSize",value:{name:"number",required:!0}},{key:"fontWeightLight",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightRegular",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightMedium",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}}]},required:!0}}]}},name:"theme"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},rightScrollButton:{required:!1,tsType:{name:"signature",type:"function",raw:"(theme: Theme<any>) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  shape: Shape
  palette: Palette
  spacing: number
  business: Status & B
  overrides: O
  typography: Typography
}`,signature:{properties:[{key:"shape",value:{name:"signature",type:"object",raw:`{
  borderRadius: number
}`,signature:{properties:[{key:"borderRadius",value:{name:"number",required:!0}}]},required:!0}},{key:"palette",value:{name:"signature",type:"object",raw:`{
  common: CommonColors
  type: PaletteType
  contrastThreshold: number
  tonalOffset: number
  primary: PaletteColor
  secondary: PaletteColor
  grey: Color
  text: Text
  divider: Divider
  modifier: Modifier
  background: Background
  state: {
    hover: OverlayOpacity
    focus: OverlayOpacity
    selected: OverlayOpacity
    activated: OverlayOpacity
    pressed: OverlayOpacity
    draged: OverlayOpacity
  }
}`,signature:{properties:[{key:"common",value:{name:"signature",type:"object",raw:`{
  black: string
  white: string
}`,signature:{properties:[{key:"black",value:{name:"string",required:!0}},{key:"white",value:{name:"string",required:!0}}]},required:!0}},{key:"type",value:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}],required:!0}},{key:"contrastThreshold",value:{name:"number",required:!0}},{key:"tonalOffset",value:{name:"number",required:!0}},{key:"primary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"secondary",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"grey",value:{name:"signature",type:"object",raw:`{
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    A100: string
    A200: string
    A400: string
    A700: string
}`,signature:{properties:[{key:"50",value:{name:"string",required:!0}},{key:"100",value:{name:"string",required:!0}},{key:"200",value:{name:"string",required:!0}},{key:"300",value:{name:"string",required:!0}},{key:"400",value:{name:"string",required:!0}},{key:"500",value:{name:"string",required:!0}},{key:"600",value:{name:"string",required:!0}},{key:"700",value:{name:"string",required:!0}},{key:"800",value:{name:"string",required:!0}},{key:"900",value:{name:"string",required:!0}},{key:"A100",value:{name:"string",required:!0}},{key:"A200",value:{name:"string",required:!0}},{key:"A400",value:{name:"string",required:!0}},{key:"A700",value:{name:"string",required:!0}}]},required:!0}},{key:"text",value:{name:"signature",type:"object",raw:`{
  primary: string
  secondary: string
  disabled: string
  hint: string
}`,signature:{properties:[{key:"primary",value:{name:"string",required:!0}},{key:"secondary",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"hint",value:{name:"string",required:!0}}]},required:!0}},{key:"divider",value:{name:"string",required:!0}},{key:"modifier",value:{name:"signature",type:"object",raw:`{
  active: string
  hover: string
  hoverOpacity: number
  selected: string
  disabled: string
  disabledBackground: string
}`,signature:{properties:[{key:"active",value:{name:"string",required:!0}},{key:"hover",value:{name:"string",required:!0}},{key:"hoverOpacity",value:{name:"number",required:!0}},{key:"selected",value:{name:"string",required:!0}},{key:"disabled",value:{name:"string",required:!0}},{key:"disabledBackground",value:{name:"string",required:!0}}]},required:!0}},{key:"background",value:{name:"signature",type:"object",raw:`{
  statusBar: BackgroundTheme
  appBar: BackgroundTheme
  default: BackgroundTheme
  paper: BackgroundTheme
}`,signature:{properties:[{key:"statusBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"appBar",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"default",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}},{key:"paper",value:{name:"signature",type:"object",raw:`{
  container: ImageBackgroundProps['style']
  image?: ImageBackgroundProps['imageStyle']
}`,signature:{properties:[{key:"container",value:{name:"ImageBackgroundProps['style']",raw:"ImageBackgroundProps['style']",required:!0}},{key:"image",value:{name:"ImageBackgroundProps['imageStyle']",raw:"ImageBackgroundProps['imageStyle']",required:!1}}]},required:!0}}]},required:!0}},{key:"state",value:{name:"signature",type:"object",raw:`{
  hover: OverlayOpacity
  focus: OverlayOpacity
  selected: OverlayOpacity
  activated: OverlayOpacity
  pressed: OverlayOpacity
  draged: OverlayOpacity
}`,signature:{properties:[{key:"hover",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"focus",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"selected",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"activated",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"pressed",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}},{key:"draged",value:{name:"signature",type:"object",raw:`{
  light: number
  medium: number
  dark: number
}`,signature:{properties:[{key:"light",value:{name:"number",required:!0}},{key:"medium",value:{name:"number",required:!0}},{key:"dark",value:{name:"number",required:!0}}]},required:!0}}]},required:!0}}]},required:!0}},{key:"spacing",value:{name:"number",required:!0}},{key:"business",value:{name:"intersection",raw:"Status & B",elements:[{name:"signature",type:"object",raw:`{
  error: PaletteColor
  valid: PaletteColor
  warning: PaletteColor
}`,signature:{properties:[{key:"error",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"valid",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}},{key:"warning",value:{name:"signature",type:"object",raw:`{
  light: string
  main: string
  dark: string
  contrastText: string
}`,signature:{properties:[{key:"light",value:{name:"string",required:!0}},{key:"main",value:{name:"string",required:!0}},{key:"dark",value:{name:"string",required:!0}},{key:"contrastText",value:{name:"string",required:!0}}]},required:!0}}]}},{name:"any"}],required:!0}},{key:"overrides",value:{name:"Record",elements:[{name:"string"},{name:"object"}],raw:"Record<string, object>",required:!0}},{key:"typography",value:{name:"signature",type:"object",raw:`{
  fontFamily: string
  fontSize: number
  fontWeightLight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightRegular:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontWeightMedium:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
}`,signature:{properties:[{key:"fontFamily",value:{name:"string",required:!0}},{key:"fontSize",value:{name:"number",required:!0}},{key:"fontWeightLight",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightRegular",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}},{key:"fontWeightMedium",value:{name:"union",raw:`| 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'`,elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bold'"},{name:"literal",value:"'100'"},{name:"literal",value:"'200'"},{name:"literal",value:"'300'"},{name:"literal",value:"'400'"},{name:"literal",value:"'500'"},{name:"literal",value:"'600'"},{name:"literal",value:"'700'"},{name:"literal",value:"'800'"},{name:"literal",value:"'900'"}],required:!0}}]},required:!0}}]}},name:"theme"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},onPressActiveTab:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(tabId: string) => void",signature:{arguments:[{type:{name:"string"},name:"tabId"}],return:{name:"void"}}},description:""},theme:{required:!0,tsType:{name:"T"},description:""}}};const J={notification:B.create({root:{backgroundColor:"red",borderRadius:10,minWidth:20,padding:4,position:"absolute",top:0,right:0},text:{color:"white",textAlign:"center",fontSize:10}})};function Mp({x:a},{width:e},r){return o.jsx(q,{style:{position:"absolute",width:1,height:4,top:44,backgroundColor:F.fade(r.business.warning.main,Math.max(a/Math.max(e,1),.1))}})}const Fp=({scaleX:a,scaleY:e,translateY:r,rotate:t},{width:n},i)=>({scaleX:m.sequence([m.timing(a,{toValue:0,useNativeDriver:!0,duration:100,easing:k.easeOut}),m.timing(a,{toValue:n-i.spacing*4,useNativeDriver:!0,duration:200,easing:k.easeIn})]),scaleY:m.sequence([m.timing(e,{toValue:1,useNativeDriver:!0,duration:100,easing:k.easeOut}),m.timing(e,{toValue:1,useNativeDriver:!0,duration:200,easing:k.easeIn})]),translateY:m.sequence([m.timing(r,{toValue:-30,useNativeDriver:!0,duration:50,easing:k.easeOut}),m.timing(r,{toValue:0,useNativeDriver:!0,duration:50,easing:k.easeIn})]),rotate:m.sequence([m.timing(t,{toValue:180,useNativeDriver:!0,duration:50,easing:k.easeOut}),m.timing(t,{toValue:0,useNativeDriver:!0,duration:50,easing:k.easeIn})])}),Wp=o.jsx(q,{style:J.notification.root,children:o.jsx(ie,{style:J.notification.text,children:"1"})}),Up={title:"Advanced/Tabs bar",tags:["!dev"],component:me,argTypes:{palette:{options:[void 0,"primary","secondary"],control:{type:"select"}},hasIcon:{type:"boolean",description:"With icon"},hasIconOnTop:{type:"boolean",description:"Has two lines"},activeTabId:{options:["0","1","2","3","4","5"],control:{type:"select"}},useCustomCursor:{type:"boolean",description:"Use custom cursor"},firstTabLabel:{control:"text",description:"First tab label"},otherTabBarLabel:{control:"text",description:"Other tabs label"}}},C={render:a=>o.jsx(q,{style:{flex:1,justifyContent:"center"},children:o.jsx(me,{paddingHorizontal:0,isFrozen:a.isFrozen,hasIconOnTop:a.hasIconOnTop,palette:a.palette,activeTabId:a.activeTabId,customCursorAnimation:a.useCustomCursor?Fp:void 0,renderCustomCursor:a.useCustomCursor?Mp:void 0,leftScrollButton:e=>o.jsx(q,{style:{flex:1,alignItems:"center",justifyContent:"center"},children:o.jsx(D,{name:"chevron-left",size:16,color:a.palette!==void 0?e.palette[a.palette].main:e.palette.primary.contrastText})}),rightScrollButton:e=>o.jsx(q,{style:{flex:1,alignItems:"center",justifyContent:"center"},children:o.jsx(D,{name:"chevron-right",size:16,color:a.palette!==void 0?e.palette[a.palette].main:e.palette.primary.contrastText})}),tabs:[{id:"0",label:a.firstTabLabel,isDisabled:a.isDisabled,badgeSlot:Wp},...Array.from(Array(a.numberOfTabs)).map((e,r)=>({id:r+1+"",label:`${a.otherTabBarLabel} ${r+1}`}))]})}),args:{isDisabled:!1,palette:void 0,activeTabId:"0",numberOfTabs:4,firstTabLabel:"LARGE ROCKET LABEL",otherTabBarLabel:"ROCKET",hasIcon:!1,hasIconOnTop:!1,useCustomCursor:!1,isFrozen:!1}};var Q,ee,re;C.parameters={...C.parameters,docs:{...(Q=C.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: (props: any) => <View style={{
    flex: 1,
    justifyContent: 'center'
  }}>
      <TabBar paddingHorizontal={0} isFrozen={props.isFrozen} hasIconOnTop={props.hasIconOnTop} palette={props.palette} activeTabId={props.activeTabId} customCursorAnimation={props.useCustomCursor ? customCursorAnimation : undefined} renderCustomCursor={props.useCustomCursor ? renderCustomCursor : undefined} leftScrollButton={(theme: any) => <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
            <FontAwesome name="chevron-left" size={16} color={props.palette !== undefined ? theme.palette[props.palette].main : theme.palette.primary.contrastText} />
          </View>} rightScrollButton={(theme: any) => <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
            <FontAwesome name="chevron-right" size={16} color={props.palette !== undefined ? theme.palette[props.palette].main : theme.palette.primary.contrastText} />
          </View>} tabs={[{
      id: '0',
      label: props.firstTabLabel,
      isDisabled: props.isDisabled,
      badgeSlot: notification
    }, ...Array.from(Array(props.numberOfTabs)).map<TabProps>((_, i) => ({
      id: i + 1 + '',
      label: \`\${props.otherTabBarLabel} \${i + 1}\`
    }))]} />
    </View>,
  args: {
    isDisabled: false,
    palette: undefined,
    activeTabId: '0',
    numberOfTabs: 4,
    firstTabLabel: 'LARGE ROCKET LABEL',
    otherTabBarLabel: 'ROCKET',
    hasIcon: false,
    hasIconOnTop: false,
    useCustomCursor: false,
    isFrozen: false
  }
}`,...(re=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};const $p=["Basic"];export{C as Basic,$p as __namedExportsOrder,Up as default};
