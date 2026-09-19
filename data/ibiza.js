/* ==================================================================
   LATITUDE · Ibiza edition · 2–9 September 2026
   This file is the whole edition: places, lines, route geometry and
   the day-by-day plan. The engine (index.html) is edition-agnostic and
   reads only window.ATLAS. A new trip is a new copy of this file.
   ================================================================== */
const rev = a => a.slice().reverse();

/* ---- route geometry (GPS polylines) ---- */
const ROUTES = {"AERO1":[[38.87711,1.36884],[38.87729,1.36904],[38.87791,1.36858],[38.87815,1.36858],[38.87834,1.36872],[38.8787,1.36939],[38.87875,1.36971],[38.87912,1.3701],[38.88011,1.3722],[38.88206,1.3769],[38.88209,1.37719],[38.88195,1.37752],[38.88219,1.37805],[38.88226,1.38353],[38.88236,1.38497],[38.88253,1.38591],[38.8831,1.3877],[38.88348,1.38852],[38.88525,1.39146],[38.88587,1.39275],[38.88637,1.39456],[38.88676,1.39747],[38.88719,1.39862],[38.88762,1.39932],[38.88826,1.40003],[38.88881,1.40044],[38.8899,1.40088],[38.89156,1.40099],[38.89426,1.40066],[38.89503,1.4008],[38.89588,1.40117],[38.89671,1.40174],[38.90402,1.40797],[38.90491,1.40842],[38.90815,1.40942],[38.91048,1.41027],[38.9116,1.41082],[38.91338,1.41197],[38.91575,1.41411],[38.91639,1.4149],[38.91721,1.41633],[38.91778,1.41786],[38.91933,1.42386],[38.91988,1.42532],[38.91987,1.42567],[38.92003,1.42591],[38.9203,1.42588],[38.92048,1.42555],[38.92078,1.42528],[38.9277,1.42113],[38.92805,1.42096],[38.92855,1.42095],[38.92906,1.42032],[38.932,1.41846],[38.94226,1.41234],[38.94251,1.41223],[38.94291,1.41223],[38.94337,1.41171],[38.94867,1.40867],[38.94945,1.40828],[38.9497,1.40825],[38.94994,1.40835],[38.9504,1.40796],[38.95326,1.40682],[38.95432,1.40628],[38.95585,1.40511],[38.95733,1.40349],[38.95747,1.40295],[38.96023,1.39868],[38.96153,1.39635],[38.96271,1.39358],[38.96348,1.39112],[38.96402,1.3888],[38.96429,1.38714],[38.96454,1.3849],[38.96478,1.38116],[38.96528,1.37781],[38.96587,1.3753],[38.96701,1.37133],[38.96782,1.36793],[38.9688,1.36252],[38.97066,1.35357],[38.97107,1.35105],[38.9713,1.35051],[38.97124,1.35005],[38.97162,1.34794],[38.97167,1.34677],[38.97159,1.34585],[38.97113,1.34342],[38.97112,1.34254],[38.97125,1.34144],[38.97169,1.34006],[38.97242,1.33884],[38.97314,1.33807],[38.97376,1.33757],[38.97393,1.33746],[38.97421,1.33757],[38.97438,1.3374],[38.97437,1.33649],[38.97482,1.33379],[38.97691,1.32414],[38.977,1.32338],[38.97924,1.31273],[38.97946,1.31115],[38.97974,1.3104],[38.97965,1.30954],[38.98008,1.30588],[38.98076,1.30596],[38.98097,1.30611],[38.98128,1.30606]],"T1D1":[[38.98128,1.30606],[38.9816,1.30618],[38.98178,1.30666],[38.98176,1.30712],[38.98144,1.30759],[38.98126,1.30774],[38.98067,1.30793],[38.98049,1.30731],[38.97988,1.30758],[38.97965,1.30954],[38.97932,1.31032],[38.97946,1.31115],[38.97924,1.31273],[38.97697,1.32357],[38.97664,1.32399],[38.97663,1.32474],[38.97463,1.33431],[38.97424,1.33678],[38.97403,1.33723],[38.97268,1.33835],[38.97208,1.33912],[38.97147,1.34029],[38.97122,1.3411],[38.97101,1.34254],[38.97103,1.34344],[38.97154,1.34631],[38.97156,1.34755],[38.97112,1.35001],[38.97091,1.35051],[38.97097,1.35102],[38.97062,1.3532],[38.96871,1.36249],[38.96763,1.36829],[38.96691,1.3713],[38.96554,1.37613],[38.96502,1.37864],[38.96468,1.38114],[38.96435,1.38577],[38.96382,1.38927],[38.96332,1.39133],[38.96261,1.39354],[38.96204,1.39501],[38.96081,1.39749],[38.95854,1.40111],[38.95741,1.40283],[38.95704,1.40325],[38.95688,1.40378],[38.95573,1.40506],[38.95456,1.40598],[38.95346,1.4066],[38.95028,1.40787],[38.94981,1.40777],[38.94939,1.40814],[38.9434,1.41156],[38.9431,1.41168],[38.94276,1.41165],[38.94223,1.41221],[38.93215,1.41823],[38.92913,1.42013],[38.92879,1.4203],[38.92833,1.42029],[38.92792,1.42087],[38.92071,1.4252],[38.92003,1.42526],[38.91956,1.42589],[38.91628,1.42782],[38.91573,1.42784],[38.91527,1.42852],[38.91138,1.43083],[38.91136,1.43163],[38.91205,1.43164],[38.91202,1.43465],[38.91183,1.43461]],"D3":[[38.98128,1.30606],[38.9816,1.30618],[38.98178,1.30666],[38.98176,1.30712],[38.98144,1.30759],[38.98126,1.30774],[38.98067,1.30793],[38.98049,1.30731],[38.97988,1.30758],[38.97965,1.30954],[38.97932,1.31032],[38.97946,1.31115],[38.97924,1.31273],[38.97697,1.32357],[38.97664,1.32399],[38.97663,1.32474],[38.97463,1.33431],[38.97424,1.33678],[38.97403,1.33723],[38.97268,1.33835],[38.97208,1.33912],[38.97147,1.34029],[38.97115,1.34142],[38.97101,1.343],[38.97107,1.34386],[38.97154,1.34631],[38.97156,1.34755],[38.97146,1.34831],[38.97112,1.35001],[38.97093,1.35039],[38.97097,1.35102],[38.97062,1.3532],[38.96851,1.3635],[38.96774,1.36779],[38.96691,1.3713],[38.96554,1.37613],[38.96502,1.37864],[38.96468,1.38114],[38.96428,1.38638],[38.96406,1.38801],[38.96354,1.39051],[38.96306,1.3922],[38.96204,1.39501],[38.96081,1.39749],[38.95854,1.40111],[38.95741,1.40283],[38.95704,1.40325],[38.95688,1.40378],[38.95607,1.40472],[38.95505,1.40563],[38.95387,1.40639],[38.95028,1.40787],[38.94981,1.40777],[38.94939,1.40814],[38.9434,1.41156],[38.9431,1.41168],[38.94276,1.41165],[38.94223,1.41221],[38.93215,1.41823],[38.92913,1.42013],[38.92879,1.4203],[38.92833,1.42029],[38.92792,1.42087],[38.92071,1.4252],[38.92035,1.42529],[38.92011,1.42506],[38.91941,1.42342],[38.91789,1.41783],[38.91748,1.41667],[38.91685,1.4154],[38.91619,1.41445],[38.91555,1.41373],[38.91342,1.41186],[38.9113,1.41052],[38.90905,1.40959],[38.90491,1.4083],[38.90407,1.40785],[38.89624,1.4011],[38.89522,1.4005],[38.89502,1.40053],[38.89492,1.40083],[38.89516,1.40141],[38.8951,1.40178],[38.89389,1.40325],[38.89167,1.40492],[38.89051,1.40638],[38.89031,1.40668],[38.8903,1.40694],[38.8897,1.40784],[38.88918,1.40761],[38.88811,1.40678],[38.88661,1.40581],[38.88505,1.40397]],"P4":[[38.98128,1.30606],[38.98148,1.30608],[38.98169,1.3063],[38.98176,1.30712],[38.98144,1.30759],[38.98093,1.30787],[38.97982,1.30812],[38.98005,1.3062],[38.98001,1.3059],[38.97986,1.30581],[38.97974,1.30588],[38.97952,1.30642],[38.97621,1.30866],[38.97319,1.30933],[38.97286,1.30929],[38.97265,1.30943],[38.96796,1.31042],[38.96759,1.31031],[38.96726,1.31052],[38.96639,1.31033],[38.96625,1.3102],[38.96587,1.30701],[38.96499,1.30462],[38.96499,1.30164],[38.96508,1.30145],[38.96497,1.30136],[38.96493,1.30064],[38.96505,1.30003],[38.96579,1.29833],[38.96581,1.29609],[38.96683,1.29331],[38.96711,1.28862],[38.9672,1.28854],[38.96711,1.28825],[38.96734,1.28444],[38.96716,1.28285],[38.96677,1.2812],[38.96474,1.27505],[38.96469,1.27389],[38.96509,1.27188],[38.96493,1.27102],[38.96468,1.27046],[38.96385,1.26926],[38.9636,1.2689],[38.95815,1.27154],[38.95579,1.2724],[38.95569,1.27222],[38.95582,1.27248],[38.95452,1.26752],[38.95408,1.26646],[38.95261,1.26409],[38.95165,1.26186],[38.95085,1.25894],[38.95052,1.25709],[38.94991,1.25539],[38.94993,1.25262],[38.94968,1.25118],[38.94971,1.25074],[38.95121,1.24675],[38.95188,1.2444],[38.95215,1.24194],[38.95246,1.24026],[38.95277,1.23965],[38.95394,1.23857],[38.95453,1.23771],[38.95541,1.23435],[38.95574,1.2339],[38.95642,1.2339],[38.95667,1.23371],[38.9597,1.22718],[38.96096,1.2225],[38.9612,1.22106],[38.96131,1.22089]],"P5":[[38.98128,1.30606],[38.98148,1.30608],[38.98169,1.3063],[38.98176,1.30712],[38.98144,1.30759],[38.98093,1.30787],[38.97982,1.30812],[38.98005,1.3062],[38.98001,1.3059],[38.97986,1.30581],[38.97974,1.30588],[38.97952,1.30642],[38.97621,1.30866],[38.97319,1.30933],[38.97286,1.30929],[38.97265,1.30943],[38.96796,1.31042],[38.96759,1.31031],[38.96726,1.31052],[38.96639,1.31033],[38.96625,1.3102],[38.96587,1.30701],[38.96499,1.30462],[38.96499,1.30164],[38.96508,1.30145],[38.96497,1.30136],[38.96493,1.30064],[38.96505,1.30003],[38.96579,1.29833],[38.96581,1.29609],[38.96683,1.29331],[38.96711,1.28862],[38.9672,1.28854],[38.96711,1.28825],[38.96734,1.28444],[38.96716,1.28285],[38.96677,1.2812],[38.96474,1.27505],[38.96467,1.27414],[38.96504,1.27239],[38.96509,1.27188],[38.96501,1.27129],[38.96468,1.27046],[38.96385,1.26926],[38.9636,1.2689],[38.95815,1.27154],[38.95579,1.2724],[38.95569,1.27222],[38.95466,1.26794],[38.95474,1.26779],[38.95457,1.26652],[38.95446,1.26436],[38.95464,1.26179],[38.95528,1.25853],[38.95519,1.25681],[38.95485,1.25423],[38.95524,1.25129],[38.95546,1.25035],[38.95665,1.24828],[38.95784,1.24714],[38.95944,1.24676],[38.96101,1.24568],[38.96177,1.24559],[38.96215,1.24535],[38.9632,1.24441],[38.96332,1.24415],[38.9634,1.24346],[38.9635,1.24338],[38.96485,1.24327]],"P7":[[38.98128,1.30606],[38.9816,1.30618],[38.98178,1.30666],[38.98176,1.30712],[38.98145,1.30754],[38.9815,1.30772],[38.98178,1.30749],[38.98328,1.30673],[38.98344,1.30679],[38.98378,1.3087],[38.9837,1.30924],[38.98385,1.30944],[38.98445,1.3091],[38.98653,1.30864],[38.98703,1.30874],[38.98755,1.30841],[38.98931,1.30806],[38.99039,1.30794],[38.9911,1.308],[38.99547,1.3079],[38.99566,1.30781],[38.99614,1.30691],[38.99666,1.30687],[38.99828,1.30707],[38.99976,1.3067],[38.99984,1.3061],[39.00025,1.30501],[39.00103,1.30385],[39.00224,1.30265],[39.00276,1.30248],[39.00346,1.30268],[39.00415,1.30264],[39.0051,1.30238],[39.00559,1.30201],[39.00622,1.3021],[39.00721,1.30181],[39.00786,1.30202],[39.0084,1.30309],[39.00861,1.30333],[39.00888,1.30307],[39.00898,1.30276],[39.00895,1.30114],[39.00923,1.3001],[39.00937,1.30004],[39.00946,1.30013],[39.0094,1.30063],[39.00978,1.30062],[39.01001,1.30112]],"L3":[[38.73464,1.41551],[38.73475,1.41492],[38.7335,1.4141],[38.73325,1.41412],[38.73274,1.41462],[38.73202,1.41653],[38.73018,1.41762],[38.73021,1.41817],[38.73013,1.41838],[38.72923,1.41955],[38.72886,1.4203],[38.72907,1.42083],[38.72936,1.42115],[38.73084,1.42151],[38.73126,1.42173],[38.73168,1.42212],[38.73222,1.42299],[38.73338,1.42442],[38.73362,1.42559],[38.73428,1.42673],[38.73595,1.42869],[38.73662,1.43057],[38.73871,1.43232],[38.73897,1.43267],[38.73902,1.43291],[38.73911,1.43291],[38.73942,1.43335],[38.74009,1.43364],[38.74017,1.43407],[38.74039,1.43441],[38.74058,1.43452],[38.74077,1.4345],[38.74296,1.43345],[38.74569,1.43326],[38.74616,1.43299],[38.74663,1.43243],[38.74713,1.43246],[38.74788,1.43232],[38.74823,1.43247],[38.74851,1.43233],[38.74886,1.43252],[38.7492,1.43343],[38.74975,1.43379],[38.75078,1.43379],[38.75167,1.43427],[38.75271,1.43418],[38.75338,1.43391],[38.75442,1.43387],[38.75553,1.43451],[38.75603,1.43467],[38.75614,1.43481],[38.75613,1.43505]],"TX_ST_HOTEL":[[38.98128,1.30606],[38.98148,1.30608],[38.98169,1.3063],[38.98176,1.30712],[38.98144,1.30759],[38.98093,1.30787],[38.97982,1.30812],[38.98005,1.3062],[38.98001,1.3059],[38.97986,1.30581],[38.97974,1.30588],[38.97952,1.30642],[38.97621,1.30866],[38.97319,1.30933],[38.97286,1.30929],[38.97265,1.30943],[38.96796,1.31042],[38.96759,1.31031],[38.96726,1.31052],[38.96639,1.31033],[38.96625,1.3102],[38.96587,1.30701],[38.96499,1.30462],[38.96499,1.30164],[38.96508,1.30145],[38.96497,1.30136],[38.96494,1.30049],[38.96505,1.30003],[38.96579,1.29833],[38.96581,1.29609],[38.96683,1.29331],[38.96711,1.28862],[38.9672,1.28854],[38.96711,1.28838],[38.96716,1.28745],[38.96968,1.28671]],"TX_HOTEL_CKW":[[38.96968,1.28671],[38.97049,1.28648],[38.97074,1.28455],[38.97068,1.28341],[38.96733,1.28493],[38.96711,1.28838],[38.96702,1.28846],[38.96711,1.28874],[38.96683,1.29331],[38.96581,1.29609],[38.96579,1.29833],[38.96505,1.30003],[38.96494,1.30049],[38.96497,1.30136],[38.96487,1.30154],[38.96499,1.30164],[38.96503,1.30235],[38.96499,1.30462],[38.96587,1.30701],[38.96618,1.30987],[38.96603,1.31025],[38.96608,1.31041],[38.96639,1.31033],[38.96761,1.31067],[38.96796,1.31042],[38.97216,1.30953],[38.97256,1.30945],[38.97287,1.30958],[38.97299,1.30943],[38.97284,1.30918]],"TX_AIR_HOTEL":[[38.87711,1.36884],[38.87729,1.36904],[38.87791,1.36858],[38.8782,1.3686],[38.87868,1.36935],[38.87877,1.36974],[38.87889,1.36978],[38.87903,1.36967],[38.87899,1.36928],[38.87716,1.36495],[38.8771,1.36465],[38.87717,1.36448],[38.87924,1.36269],[38.88002,1.3615],[38.88059,1.36096],[38.88633,1.35682],[38.88726,1.35654],[38.88779,1.3575],[38.88853,1.35825],[38.88996,1.35918],[38.89154,1.35981],[38.89198,1.35987],[38.89233,1.35978],[38.89361,1.35878],[38.89401,1.35865],[38.89396,1.35797],[38.89233,1.35001],[38.89223,1.34784],[38.8923,1.34577],[38.89248,1.34445],[38.89406,1.33846],[38.89451,1.3372],[38.89962,1.32869],[38.90001,1.32779],[38.9002,1.32682],[38.90074,1.32222],[38.90174,1.31725],[38.90202,1.31627],[38.90223,1.31585],[38.90269,1.31536],[38.90306,1.31516],[38.90349,1.31507],[38.9042,1.31518],[38.90667,1.31636],[38.90734,1.31654],[38.90801,1.3165],[38.91148,1.31578],[38.91198,1.3155],[38.91244,1.31503],[38.91383,1.3126],[38.91407,1.31232],[38.91614,1.31064],[38.91673,1.31036],[38.92036,1.30925],[38.92074,1.30906],[38.92111,1.30872],[38.92146,1.30809],[38.92161,1.30709],[38.92153,1.29942],[38.92189,1.29748],[38.92141,1.29645],[38.92152,1.29505],[38.92176,1.29291],[38.92196,1.2929],[38.92214,1.29273],[38.92256,1.29211],[38.92284,1.29192],[38.92332,1.29185],[38.9241,1.29149],[38.92442,1.29104],[38.92512,1.29047],[38.92534,1.29011],[38.92559,1.28988],[38.92589,1.28979],[38.9267,1.28877],[38.9275,1.2884],[38.92842,1.28736],[38.93046,1.28743],[38.93075,1.28751],[38.93251,1.28955],[38.933,1.28992],[38.93357,1.28989],[38.93574,1.28948],[38.93654,1.28945],[38.94442,1.29121],[38.94479,1.29144],[38.94508,1.29184],[38.94539,1.29176],[38.94579,1.29202],[38.94741,1.29225],[38.94764,1.29224],[38.94911,1.29158],[38.94954,1.29164],[38.95098,1.29104],[38.95122,1.29081],[38.95141,1.29022],[38.95182,1.29002],[38.9524,1.29002],[38.95331,1.29029],[38.95527,1.29008],[38.95563,1.29029],[38.95611,1.29095],[38.95631,1.29105],[38.95765,1.29135],[38.95805,1.29133],[38.95924,1.29027],[38.96025,1.28993],[38.96553,1.2889],[38.96702,1.28853],[38.96714,1.28862],[38.96716,1.28745],[38.96968,1.28671]],"P2":[[38.96968,1.28671],[38.96716,1.28745],[38.96711,1.28838],[38.9672,1.28854],[38.96711,1.28862],[38.96683,1.29331],[38.96581,1.29609],[38.96579,1.29833],[38.96505,1.30003],[38.96494,1.30049],[38.96497,1.30136],[38.96508,1.30145],[38.96499,1.30164],[38.96499,1.30462],[38.96587,1.30701],[38.96625,1.3102],[38.96639,1.31033],[38.96726,1.31052],[38.96759,1.31031],[38.96796,1.31042],[38.97265,1.30943],[38.97286,1.30929],[38.97319,1.30933],[38.97621,1.30866],[38.97952,1.30642],[38.97974,1.30588],[38.97986,1.30581],[38.98001,1.3059],[38.98005,1.3062],[38.97982,1.30812],[38.98093,1.30787],[38.98144,1.30759],[38.98176,1.30712],[38.98169,1.3063],[38.98148,1.30608],[38.98128,1.30606]]};
ROUTES.FERRY = [[38.91243,1.43525],[38.9078,1.4440],[38.8960,1.4505],[38.8700,1.4500],[38.8450,1.4430],[38.8180,1.4330],[38.7950,1.4275],[38.7700,1.4215],[38.7480,1.4185],[38.73457,1.41768]];
ROUTES.BOAT_SALADA = [[38.97973,1.30399],[38.9800,1.2975],[38.9825,1.2905],[38.9862,1.2865],[38.9905,1.2840],[38.9950,1.2820],[38.9990,1.2795],[39.0040,1.2830],[39.0075,1.2915],[39.0092,1.2975],[39.0095,1.29907]];
ROUTES.BOAT_BASSA = [[38.97693,1.29862],[38.9775,1.2930],[38.9755,1.2840],[38.9725,1.2720],[38.9700,1.2600],[38.9685,1.2480],[38.9678,1.2410],[38.96785,1.23993]];

/* ---- lines: colour, name, description, dash ---- */
const LINE = {
  AERO1:{c:'#6FA35B',n:'AERO1',d:'Airport ↔ Sant Antoni'},
  T1:{c:'#2E86AB',n:'T1',d:'Sant Antoni ↔ Sant Rafel ↔ Port d\'Eivissa'},
  D1:{c:'#D4472F',n:'D1',d:'Discobus · Sant Antoni ↔ Sant Rafel (UNVRS, Amnesia) ↔ Ibiza port',shares:'T1'},
  D3:{c:'#B23A8F',n:'D3',d:'Discobus · Sant Antoni ↔ Platja d\'en Bossa (Ushuaïa, Hï)'},
  P4:{c:'#E8A33D',n:'P4',d:'Sant Antoni ↔ Cala de Bou ↔ Platges de Comte'},
  P5:{c:'#E07A2E',n:'P5',d:'Sant Antoni ↔ Cala de Bou ↔ Cala Bassa'},
  P7:{c:'#2AA198',n:'P7',d:'Sant Antoni ↔ Cala Salada'},
  P2:{c:'#8A8F98',n:'P2',d:'Sant Antoni ↔ the bay road ↔ Port des Torrent (your local)'},
  A1:{c:'#8A8F98',n:'A1',d:'Cala Tarida ↔ Cala de Bou ↔ Sant Antoni (early morning)'},
  L3:{c:'#C9A227',n:'L3',d:'La Savina ↔ Ses Illetes (Formentera)'},
  FERRY:{c:'#1B4F72',n:'FERRY',d:'Ibiza port ↔ La Savina',dash:'8 7'},
  BOAT:{c:'#3D8DA1',n:'BOAT',d:'Sea Experience / Cruceros Portmany',dash:'2 6'},
  TAXI:{c:'#1B2836',n:'TAXI',d:'Taxi',dash:'6 6'},
  WALK:{c:'#6E7682',n:'WALK',d:'On foot',dash:'1 6'},
};

// id: [name, category, lat, lon, note, area]
// categories: base beach night eat stop port air sight town

/* ---- places: id: [name, category, lat, lon, note, area] ---- */
const P = {
  hotel:['Vibra Riviera','base',38.96971,1.28704,'Base camp. Carrer des Caló 49, Cala de Bou — the far western end of San Antonio Bay, 3.5 km from the bus station. Ask for a room away from the club side.','Cala de Bou'],
  xinxo:['Platja des Xinxó','beach',38.97188,1.28613,'The beach four minutes from the hotel door. Last swim on the last day.','Cala de Bou'],
  kumharas:['Kumharas','eat',38.97217,1.28256,'Sunset bar and street-food market. No bookings, no minimum spend, live music, open to midnight. Six minutes on foot.','Cala de Bou'],
  kojima:['Kojima Sushi & Ramen Bar','eat',38.97063,1.28671,'Japanese small plates on the hotel\'s own corner, 4.9/5. Carrer de la Corunya 5. Check the day — reports of a midweek closure.','Cala de Bou'],
  kitchen62:['The Kitchen 62','eat',38.97066,1.28595,'Burgers, Carrer des Caló 62 — two minutes from the door.','Cala de Bou'],
  coolcafe:['Cool Cafè','eat',38.96930,1.29102,'Open 07:00–02:00 in summer: breakfast tomorrow and somewhere to end tonight. Carrer des Caló 23.','Cala de Bou'],
  relish:['Relish','eat',38.97145,1.28485,'#3 of 182 in Sant Josep. Evenings only except Sunday. Carrer La Rioja 13 — book ahead.','Cala de Bou'],
  salvaje:['Salvaje Eivissa','eat',38.96984,1.29173,'Dinner with live cabaret 21:00–23:00 — flamenco, fire, tightrope. Six minutes\' walk.','Cala de Bou'],
  pomthai:['POM Thai','eat',38.96624,1.29423,'Upmarket Thai sharing plates, confirmed reopened for 2026. Carrer de Cala de Bou 73.','Cala de Bou'],
  kugo:['Kugo Sushi & Japo','eat',38.96748,1.29456,'4.9 from 700+ reviews — mostly takeaway, check before planning to sit in.','Cala de Bou'],
  skysalia:['Sky of Salia Rooftop','eat',38.97018,1.27766,'Rooftop at the far west end of Cala de Bou facing open sea. Book the sunset slot. Carrer des Caló 108.','Cala de Bou'],
  felices:['Nocturna · Hotel Los Felices','night',38.96855,1.28079,'The only actual late club within walking distance — house and electronic.','Cala de Bou'],
  esvirot:['Es Virot','eat',38.96856,1.29718,'Seafront on the Cala de Bou front. Rice dishes are the reason to go. Sunset from the table.','Cala de Bou'],
  canpujol:['Can Pujol','eat',38.96981,1.27724,'Traditional Ibizan seafood since 1980 — bullit de peix, arròs a banda. Ask the fish price out loud.','Port des Torrent'],
  gallo:['El Gallo Viejo','eat',38.96535,1.26772,'Excellent, serves whole fresh fish by the kilo — ask the price before it\'s cooked.','Port des Torrent'],
  espueto:['Es Puetó','eat',38.96960,1.30323,'Feet-in-the-sand chiringuito since 1969. Menu del día with a sunset view, open to 01:00, no booking.','Cala de Bou'],
  escuco:['Es Cucó','eat',38.95586,1.27205,'Rotisserie chicken at the top of the Port des Torrent hill — cheap, local, forty-five years old. 2.4 km: bus out, taxi back.','Port des Torrent'],
  chikee:['Chi Kee Wun','eat',38.972985,1.309019,'Chinese fusion in a lantern garden, kitchen to 00:30. Give the driver 38.972985, 1.309019 rather than the street name.','San Antonio Bay'],
  aragma:['Aragma','eat',38.97889,1.29981,'Modern Greek mezze, #1 of 228 in San Antonio. Calle Madrid 4, 400 m back from the sunset strip. Needs a few days\' notice.','San Antonio'],
  obeach:['O Beach Ibiza','night',38.97185,1.30659,'KISSTORY Tue 8 Sept 13:00–22:00, €25 before 14:00. Walkable at both ends.','San Antonio Bay'],
  itaca:['Ítaca','night',38.97678,1.30819,'R&B / hip-hop bar on the bay side of town — the right side for getting home.','San Antonio'],
  rocksbar:['Ibiza Rocks Bar','night',38.97697,1.30803,'Free entry, on the beach, DJs and live music until 04:00.','San Antonio'],
  soulcity:['Soul City','night',38.97980,1.30292,'Twenty years of R&B, hip-hop, dancehall, garage and grime. Every night, no ticket, hard close 03:00. West End.','San Antonio'],
  esparadis:['Es Paradís','night',38.97867,1.30791,'Puro Reggaeton every Friday 23:30–06:00 (€40) · "You Know The Vibes" Mon 7 (€25, to 07:00). Walk home.','San Antonio'],
  eden:['Eden','night',38.97906,1.30784,'Charlie Sloth\'s Fire In The Club, Fri 4 Sept — season closing, €25, walk home.','San Antonio'],
  busSA:['Sant Antoni bus station','stop',38.98132,1.30643,'Estació d\'autobusos. Every line you use starts or ends here: AERO1, T1, D1, D3, P4, P5, P7, P2.','San Antonio'],
  fonts:['Passeig de ses Fonts · boat kiosks','port',38.97973,1.30399,'Sea Experience Ibiza boat to Cala Salada leaves from the San Antonio waterfront here (out 10:30 · 11:30 · 12:30 · 15:30; back 13:00 · 16:00 · 18:00 only).','San Antonio'],
  nemo:['Capitán Nemo kiosk','port',38.97932,1.30476,'Es Vedrà catamaran 10:00–14:00 — underwater windows, snorkel gear, swim stop. Scenic, not a booze cruise. Check in 30 min early.','San Antonio'],
  saport:['Sant Antoni port · Cruceros Portmany','port',38.97693,1.29862,'Boats to Cala Bassa (three sailings a day) leave from the harbour in front of the fountain and taxi rank. Fare not published — ask at the kiosk.','San Antonio'],
  gracioneta:['Cala Gracioneta','beach',38.99304,1.29030,'Tiny cove fifteen minutes on foot from San Antonio, or the P1. Sunbeds, a stepped chiringuito, clear water.','San Antonio'],
  salada:['Cala Salada','beach',39.00950,1.29907,'Sunbeds (capped €7), a restaurant, toilets. Access road closed to cars 09:30–17:00 — bus and boat win.','North of San Antonio'],
  saladeta:['Cala Saladeta','beach',39.01144,1.29753,'The clearest water on the island. Absolutely no facilities — bring water, food, shade and grippy shoes. 10–15 min rocky path from Salada.','North of San Antonio'],
  stopSalada:['P7 stop · Cala Salada','stop',39.01001,1.30116,'P7 back to San Antonio every 15 min until 20:50, 15 min, ≈€1.90.','North of San Antonio'],
  bassa:['Cala Bassa','beach',38.96785,1.23993,'Wide, pine-backed, superb water — busier and more commercial than the coves up north.','West coast'],
  cbbc:['Cala Bassa Beach Club','eat',38.96794,1.23920,'Upscale lounge rather than a party. Four restaurants on the sand. Pre-book beds in September (WhatsApp +34 971 342 661).','West coast'],
  stopBassa:['P5 stop · Cala Bassa','stop',38.96484,1.24322,'Last P5 back 21:00 → Cala de Bou 21:10 → San Antonio 21:33.','West coast'],
  comte:['Cala Comte (Platges de Comte)','beach',38.96265,1.22020,'The best beach and the best sunset on the island. Sunbeds capped €10, €5 after 15:30. Cliff steps west to Cala Escondida.','West coast'],
  escondida:['Cala Escondida','beach',38.96450,1.21700,'The quiet cove at the western end of Comte, down the cliff steps. (Position approximate.)','West coast'],
  stopComte:['P4 stop · Cala Comte','stop',38.96129,1.22085,'The 21:45 is the last P4: Cala de Bou 21:57, San Antonio 22:20. Taxi from here ≈€16.','West coast'],
  stopRivMain:['Bus stop · H. Riviera (Av. Sant Agustí)','stop',38.96728,1.28514,'The stop on the main road behind the hotel — the P4 / P5 / A1 corridor. Four minutes\' walk.','Cala de Bou'],
  stopRivBay:['Bus stop · H. Riviera (bay road)','stop',38.97068,1.28540,'The P2 stop on the bay road right by the hotel — the last 3.5 km from the bus station, hourly, last 23:30.','Cala de Bou'],
  stopCdB:['Bus stop · Cala de Bou','stop',38.96537,1.27684,'The timetabled "Cala de Bou" stop on Av. Sant Agustí: P4 out 21:57 / P5 21:10 on the way back; the A1 passes here 07:59 towards town.','Cala de Bou'],
  stopBerg:['Bus stop · H. Bergantín','stop',38.96782,1.30185,'P2 stop on the bay road, named in the timetable.','San Antonio Bay'],
  stopPdT:['Bus stop · Port des Torrent','stop',38.96383,1.26934,'P2 terminus; P4 / P5 pass through.','Port des Torrent'],
  stopCuco:['Bus stop · es Cucó','stop',38.95567,1.27231,'On the P4 / P5 road out to the west-coast beaches. Handy for lunch at Es Cucó.','Port des Torrent'],
  amnesia:['Amnesia','night',38.94768,1.40820,'★ Bresh closing party · Sat 5 Sept 23:30–06:00, from €50. Main Room + Terraza (glass roof at sunrise). Has lockers.','Sant Rafel'],
  stopAmnesia:['D1 stop · Amnesia (Sant Rafel)','stop',38.94698,1.40979,'The D1 stops on the main road right by the door. Every 30 min 23:30–06:30, €3 card / €4.20 cash, 13 min to San Antonio.','Sant Rafel'],
  unvrs:['UNVRS (ex-Privilege)','night',38.95788,1.40826,'★ FISHER with Gorgon City · Thu 3 Sept from 23:30. €50 before midnight, €60 before 1am, €80 after. No published closing time.','Sant Rafel'],
  stopUnvrs:['D1 stop · Privilege / UNVRS','stop',38.95738,1.40273,'The D1 stop for UNVRS on the Sant Antoni road, same line as Amnesia.','Sant Rafel'],
  ushuaia:['Ushuaïa','night',38.88500,1.40536,'★ CALVIN HARRIS · Fri 4 Sept 17:00–23:00 — booked. Open-air, starts in daylight, 18+ with original ID. With MK, Illyus & Barrientos, Tyson O\'Brien.','Platja d\'en Bossa'],
  hi:['Hï Ibiza','night',38.88603,1.40396,'Directly across the road from Ushuaïa. Fri 4: CamelPhat Summer Of Love — €35 before midnight, €40–45 before 1am, €50–55 standard. Wed 2: MEDUZA & James Hype, €35 before midnight. No cloakroom.','Platja d\'en Bossa'],
  stopPdB:['D3 stop · Ushuaïa / Hï','stop',38.88498,1.40405,'The D3 stops between the two clubs. After Ushuaïa closes: 23:33 (→ San Antonio 00:15), 00:03, 00:43, then every 30 min to 06:47.','Platja d\'en Bossa'],
  portIbz:['Port d\'Eivissa · T1 / D1 stop','stop',38.91124,1.43453,'Stay on the T1 to here rather than the bus station — the ferry terminal and Dalt Vila are both a short walk. The D1 back to San Antonio leaves from the port every 30 min to 06:30.','Ibiza Town'],

  taules:['Portal de ses Taules','sight',38.90821,1.43666,'The main gate — a steep stone drawbridge into the walled city. Wear proper shoes.','Dalt Vila'],
  escalinata:['S\'Escalinata','eat',38.90795,1.43388,'Cushions straight onto the stone steps on the ramp up. A drink here at 19:55.','Dalt Vila'],
  bernat:['Baluard de Sant Bernat','sight',38.90605,1.43638,'The sunset-facing bastion — Figueretes, Platja d\'en Bossa and the salt flats. Free. Sunset 20:17 on the Monday.','Dalt Vila'],
  olivo:['El Olivo Mio · Plaça de Vila','eat',38.908421,1.435522,'Boho, organic, live music, on the prettiest square inside the walls. ⚠ Booking is held for Sun 6 — move it to Mon 7.','Dalt Vila'],
  verge:['Carrer de la Verge','town',38.90920,1.43800,'The old town\'s bar street just below the walls — twenty tiny bars, dancing in the lane. No ticket, no door.','Sa Penya'],
  bar1805:['Bar 1805','night',38.90852,1.43771,'Every day 20:00–04:00, food until 02:30.','Sa Penya'],
  paradise:['Paradise Lost','night',38.90890,1.43758,'The best bet for actually dancing without a ticket.','Sa Penya'],
  parc:['Plaça del Parc · Madagascar','eat',38.90899,1.43382,'The locals\' square for a quieter one. Madagascar is cash only.','Ibiza Town'],
  pacha:['Pacha','night',38.91842,1.44321,'Optional Tue 8: Gordo presents Taraka, from €30 — the cheapest big room of the week. The D1 drops you at the door.','Ibiza Town'],
  airport:['Ibiza Airport (IBZ)','air',38.87617,1.36794,'Land Wed 2 Sept 19:25 · fly Wed 9 Sept 20:15.','Airport'],
  aeroStop:['AERO1 stop · Aeroport (arribades)','stop',38.87708,1.36886,'AERO1 to San Antonio every 30 min, 07:00–01:30 from the airport, 50 min, €4 card / €5.60 cash.','Airport'],
  savina:['La Savina · ferry port','port',38.73457,1.41768,'Where the fast ferries land on Formentera. Your open return is only valid with the company that issued it.','Formentera'],
  stopSavina:['L3 stop · Port la Savina','stop',38.73446,1.41555,'The yellow Bus Turístic to Ses Illetes: out 10:30 · 11:30 · 12:30 · 13:15 then 16:30 · 17:30 · 18:30. €10 return, 10 min. Check the board — the operator\'s own timetables disagree.','Formentera'],
  illetes:['Platja de ses Illetes','beach',38.75969,1.43580,'The headline. Turquoise, shallow, white sand. Walk the sandbar out towards Espalmador. Inside a natural park — the access charge is per vehicle, so on the bus you pay nothing.','Formentera'],
  stopIlletes:['L3 stop · Ses Illetes (parking)','stop',38.75626,1.43507,'Returns 10:45 · 11:45 · 12:45 — then nothing until 16:10, 17:00, 17:45 and 18:45 (last). Take the 17:45 on the Thursday.','Formentera'],
  pirata:['Kiosko El Pirata','eat',38.74885,1.43210,'The honest one on Illetes — a hippy beach bar from the early 80s, casual food, famous cocktails.','Formentera'],
  juanyandrea:['Juan y Andrea','eat',38.75395,1.43342,'⚠ Rated ~3.0, prepaid minimum spends €120–250 pp, €14 water. If you go, book the "random placement" slot.','Formentera'],
  vedra:['Es Vedrà','sight',38.86784,1.19747,'The rock. Seen from the Capitán Nemo catamaran, or the Torre des Savinar path.','South-west'],
  // --- added for the September 2026 plan ---
  taxiRank:['Taxi rank · C/ des Caló 47','taxi',38.96990,1.28800,'92 m from the hotel door. Off a rank the meter starts at €4.00 instead of €5.45 — no need to phone.','Cala de Bou'],
  terminal:['Estació Marítima Eivissa–Formentera','port',38.91243,1.43525,'Where the Formentera boats sail from — Avinguda de Santa Eulària. Trasmapi, Aquabus, Formentera Lines and Baleària; a sailing every 20–30 min; ID to board. Not Botafoc, which is a 2.5 km walk away.','Ibiza Town'],
  cicheto:['El Cicheto','eat',38.88620,1.40620,'Carrer de Porreres 8. Italian, 4.8 from 677 reviews, €20–30, open to 02:00. The one to book for before the show.','Platja d’en Bossa'],
  zanzibar:['Zanzibar','eat',38.88600,1.40540,'110 m from Ushuaïa’s gate and 140 m from Hï’s door. Bar and grill, open to 04:30, €9–21 a head.','Platja d’en Bossa'],
  manoa:['Manoa','eat',38.88660,1.40600,'Same owners as Zanzibar, thirty seconds further. Burgers and strong cocktails, open to 04:00.','Platja d’en Bossa'],
  nash:['Nash Hot Chicken','eat',38.88763,1.40663,'Open until 08:00 — still serving when Hï turns out.','Platja d’en Bossa'],
};

/* ------------------------------------------------------------------
   DAYS — the itinerary as it actually stands. This must match the
   itinerary page: it is the same trip, told on a map.
   Leg fields: t time · ph day|night · mode · line · h heading · from/to
   place ids · geom polyline · r note · fx fact chips · alt/altgeom.
   ------------------------------------------------------------------ */
const DAYS = [
{ id:'ov', chip:'WEEK', b:'', title:'The whole week, <em>on one map</em>', eyebrow:'Overview · every place, every line', sunset:null,
  lede:'Base camp, the beaches, the four big rooms, the restaurants, and every bus and boat between them. Pick a day to see just that day.' },

{ id:'d02', chip:'WED', b:'2', title:'Land, drop bags, <em>walk to the good bar</em>', eyebrow:'Wednesday 2 September · arrival', sunset:'20:23',
  lede:'You land at 19:25, so the sunset is gone before baggage. Bus in, the last 3.5 km by P2 or taxi, then six minutes on foot to Kumharas.',
  places:['airport','aeroStop','busSA','hotel','stopRivMain','kumharas','kojima','kitchen62','coolcafe','hi','stopPdB'],
  legs:[
    {t:'19:25',ph:'night',mode:'plane',h:'Wheels down',from:'airport',to:'airport',r:'Clear by about 20:00.'},
    {t:'20:30',ph:'night',mode:'bus',line:'AERO1',h:'AERO1 → San Antonio bus station',from:'aeroStop',to:'busSA',geom:rev(ROUTES.AERO1),r:'Fifty minutes, straight from the terminal.',fx:['every 30 min','50 min','€4 card'],
      alt:'Taxi door to door ≈ €28–33, 30 min.',altgeom:ROUTES.TX_AIR_HOTEL,altfrom:'aeroStop',altto:'hotel'},
    {t:'21:25',ph:'night',mode:'bus',line:'P2',h:'The last 3.5 km · P2 or a taxi',from:'busSA',to:'stopRivBay',geom:ROUTES.P2,r:'The hotel is in Cala de Bou, not the town.',fx:['P2 hourly','last 23:30','taxi ≈ €8']},
    {t:'22:00',ph:'night',mode:'walk',h:'Kumharas',from:'hotel',to:'kumharas',r:'Street food, live music, no booking. Open to midnight.',fx:['6 min','to midnight']},
    {t:'OPT',ph:'night',mode:'bus',line:'D3',h:'A first night out · Hï (MEDUZA, James Hype)',from:'busSA',to:'stopPdB',geom:ROUTES.D3,r:'€35 before midnight — the cheapest Hï door all week. The cost is tomorrow’s 08:30 start.',fx:['D3 to 06:47','€35']}
  ],
  calls:[{k:'',t:'The last-mile problem',b:'Everything drops at the bus station, and the P2 stops at 23:30. After that the final 3.5 km is an €8–10 taxi — about €40 across the week.'}]
},

{ id:'d03', chip:'THU', b:'3', title:'Formentera, <em>then Aragma</em>', eyebrow:'Thursday 3 September', sunset:'20:22',
  lede:'Taxi at both ends, so no timetable governs the day. Ses Illetes really does look like the photographs. Back for the best dinner in San Antonio, then a free dancefloor.',
  places:['hotel','taxiRank','terminal','savina','stopSavina','stopIlletes','illetes','pirata','juanyandrea','busSA','stopRivMain','aragma','itaca','rocksbar','soulcity','fonts'],
  legs:[
    {t:'08:30',ph:'day',mode:'taxi',line:'TAXI',h:'Taxi from the rank on your own street',from:'taxiRank',to:'terminal',geom:rev(ROUTES.TX_ST_HOTEL).concat(ROUTES.T1D1),r:'Carrer des Caló 47 — 92 m from the door. Off a rank the meter starts at €4.00, not €5.45.',fx:['19 km · 28 min','€28–36 day rate']},
    {t:'10:00',ph:'day',mode:'ferry',line:'FERRY',h:'Fast ferry → La Savina',from:'terminal',to:'savina',geom:ROUTES.FERRY,r:'Every 20–30 min, about 30 minutes. Check it is a fast one. Bring ID.',fx:['≈ 30 min','ID needed']},
    {t:'10:30',ph:'day',mode:'bus',line:'L3',h:'L3 → Ses Illetes',from:'stopSavina',to:'stopIlletes',geom:ROUTES.L3,r:'Ten minutes. First bus of the day, so an earlier ferry just means waiting.',fx:['10 min','€10 return']},
    {t:'11:00',ph:'day',mode:'walk',h:'Ses Illetes · lunch at El Pirata',from:'stopIlletes',to:'illetes',r:'Walk the sandbar towards Espalmador. On foot or by bus the park fee does not apply.',fx:['no park fee on foot']},
    {t:'17:45',ph:'day',mode:'bus',line:'L3',h:'Leave on the 17:45, not the last one',from:'stopIlletes',to:'stopSavina',geom:rev(ROUTES.L3),r:'Landing back before 21:00 saves the night taxi rate.',fx:['last bus 18:45']},
    {t:'18:30',ph:'day',mode:'ferry',line:'FERRY',h:'Ferry back → Ibiza',from:'savina',to:'terminal',geom:rev(ROUTES.FERRY),r:'Your operator sets your last sailing — ask when you buy.'},
    {t:'19:30',ph:'day',mode:'taxi',line:'TAXI',h:'Taxi from the port rank → hotel',from:'terminal',to:'hotel',geom:rev(ROUTES.T1D1).concat(ROUTES.TX_ST_HOTEL),r:'The rank is 210 m from the terminal door. Before 21:00 you are on the day rate.',fx:['€30–38 before 21:00','€36–46 after']},
    {t:'20:45',ph:'night',mode:'bus',line:'P2',h:'Into town · Aragma',from:'stopRivBay',to:'aragma',geom:rev(ROUTES.P2),r:'Greek mezze, #1 of 228 in San Antonio. C/ Madrid 4. Kitchen shuts 23:00 — book it.',fx:['P2 or taxi ≈ €8','book ahead']},
    {t:'23:00',ph:'night',mode:'walk',h:'★ Ítaca · Soul House',from:'aragma',to:'itaca',r:'Free entry, 23:00–05:00 every Thursday. Beach terrace plus an indoor room, and the right side of town for home.',fx:['FREE','13 min flat','to 05:00']},
    {t:'late',ph:'night',mode:'taxi',line:'TAXI',h:'Taxi home from Passeig de ses Fonts',from:'fonts',to:'hotel',geom:ROUTES.TX_ST_HOTEL,r:'The last P2 left at 23:30. The rank is 6 minutes from Ítaca, 3 from Soul City.',fx:['≈ €8–10']}
  ],
  calls:[{k:'warn',t:'Say this to the driver',b:'“A la Estación Marítima de Formentera, avenida de Santa Eulària cien.” The other station, Botafoc, is a 2.5 km walk from the Formentera boats — and it is where a map search sends drivers by default.'},
         {k:'',t:'Two ways to lose money tonight',b:'Café Mambo puts a per-person minimum on tables after 18:00 — a table for two starts around €160. Ítaca and Soul City are free. On Illetes, Juan y Andrea has prepaid minimums of €120–250 a head; its “random placement” slot has none.'}]
},

{ id:'d04', chip:'FRI', b:'4', title:'Pool day, Calvin Harris, <em>then CamelPhat</em>', eyebrow:'Friday 4 September · the anchor', sunset:'20:20',
  lede:'Keep the day flat. Inside Ushuaïa from five with no re-entry, then across the road until six in the morning. Eat before you go in.',
  places:['hotel','xinxo','stopRivMain','busSA','stopPdB','cicheto','ushuaia','zanzibar','manoa','nash','hi'],
  legs:[
    {t:'11:00',ph:'day',mode:'walk',h:'Pool, and nothing else',from:'hotel',to:'xinxo',r:'Or Xinxó, four minutes away. Today is about arriving with legs.',fx:['4 min']},
    {t:'15:45',ph:'day',mode:'bus',line:'P2',h:'Pre-drinks, then P2 or a taxi to the station',from:'stopRivBay',to:'busSA',geom:rev(ROUTES.P2),r:'Anything you drink here costs a quarter of what it does inside.',fx:['taxi ≈ €8']},
    {t:'16:00',ph:'day',mode:'bus',line:'D3',h:'D3 → Platja d’en Bossa',from:'busSA',to:'stopPdB',geom:ROUTES.D3,r:'Starts at 16:00, which is exactly what a 17:00 door needs.',fx:['47 min','€4 card']},
    {t:'16:50',ph:'day',mode:'walk',h:'Eat before you go in · El Cicheto',from:'stopPdB',to:'cicheto',r:'Six hours inside with no re-entry. Three minutes away, 4.8 from 677 reviews. Book it.',fx:['3 min','€20–30']},
    {t:'17:00',ph:'day',mode:'walk',h:'★ Calvin Harris · Ushuaïa',from:'cicheto',to:'ushuaia',r:'Open-air, MK supporting. Runs to 23:00 and starts in daylight. 18+, physical ID.',fx:['BOOKED ✓','17:00 → 23:00','no re-entry']},
    {t:'23:05',ph:'night',mode:'walk',h:'Zanzibar, 110 metres away',from:'ushuaia',to:'zanzibar',r:'One minute from the gate, open to 04:30, €9–21. Hot food and a seat at non-club prices. Hï is two minutes further on.',fx:['1 min','to 04:30']},
    {t:'00:30',ph:'night',mode:'walk',h:'★ CamelPhat · Hï',from:'zanzibar',to:'hi',r:'Summer Of Love, closes 06:00. No cloakroom — one small bag between you.',fx:['no cloakroom','to 06:00']},
    {t:'06:00',ph:'night',mode:'bus',line:'D3',h:'D3 home, then the €8 taxi',from:'stopPdB',to:'busSA',geom:rev(ROUTES.D3),r:'Departures through the night to 06:47.',fx:['to 06:47']}
  ],
  calls:[{k:'ok',t:'You may have 90 minutes, not 30 — check the ticket',b:'Ushuaïa ends 23:00, Hï opens 23:30. But Hï sells in tiers: before midnight €35, before 1am €40–45, standard €50–55. A before-1am ticket buys a proper sit-down in between. Before-midnight means walking straight across.'}]
},

{ id:'d05', chip:'SAT', b:'5', title:'Cala Bassa, Es Virot, <em>then Bresh</em>', eyebrow:'Saturday 5 September · the big one', sunset:'20:20',
  lede:'The P5 to Cala Bassa, back in time for sunset dinner on the Cala de Bou front, then the D1 to Amnesia for the season closing.',
  places:['hotel','stopRivMain','stopCdB','busSA','stopBassa','bassa','cbbc','saport','esvirot','canpujol','espueto','salvaje','stopAmnesia','amnesia'],
  legs:[
    {t:'11:40',ph:'day',mode:'bus',line:'P5',h:'P5 → Cala Bassa, joined at the Cala de Bou stop',from:'stopCdB',to:'stopBassa',geom:ROUTES.P5.slice(ROUTES.P5.findIndex(p=>p[1]<1.2860)),r:'About 25 minutes from here. The 11:30 out of San Antonio passes the Cala de Bou stop on Av. Sant Agustí, four minutes behind the hotel.',fx:['34 min from town','tap card']},
    {t:'12:30',ph:'day',mode:'walk',h:'Cala Bassa',from:'stopBassa',to:'bassa',r:'Wide, pine-backed, genuinely beautiful. The beach club is upscale lounge, not a party.'},
    {t:'18:15',ph:'day',mode:'bus',line:'P5',h:'Leave on time — this is the one that matters',from:'stopBassa',to:'stopCdB',geom:rev(ROUTES.P5).slice(0,rev(ROUTES.P5).findIndex(p=>p[1]>1.2765)+1),r:'The last P5 is 21:00 — an hour after sunset. For Es Virot as the sun goes down you need this one.',fx:['last bus 21:00'],
      alt:'Or the little boat back to San Antonio port — the nicer trip.',altgeom:rev(ROUTES.BOAT_BASSA),altfrom:'bassa',altto:'saport'},
    {t:'20:00',ph:'night',mode:'walk',h:'Es Virot, for sunset',from:'hotel',to:'esvirot',r:'Walkable. Rice dishes are the reason to go — and they sidestep the fish-by-the-kilo trap.',fx:['sunset 20:20','walkable']},
    {t:'23:00',ph:'night',mode:'bus',line:'P2',h:'To the station, then the D1',from:'stopRivBay',to:'busSA',geom:rev(ROUTES.P2),r:'Saturday taxi night-rate runs from 15:00. Buy the D1 return as you board.',fx:['taxi ≈ €8']},
    {t:'23:30',ph:'night',mode:'bus',line:'D1',h:'D1 → Amnesia',from:'busSA',to:'stopAmnesia',geom:ROUTES.T1D1.slice(0,ROUTES.T1D1.findIndex(p=>p[0]<38.9470)+1),r:'Every 30 minutes, thirteen minutes up the road.',fx:['€3 card','13 min']},
    {t:'23:45',ph:'night',mode:'walk',h:'★ Bresh · Amnesia',from:'stopAmnesia',to:'amnesia',r:'Main Room and the Terraza, whose glass roof floods with light at sunrise. Amnesia has lockers, unlike Hï.',fx:['TICKETS ✓','season closer','lockers']},
    {t:'06:00',ph:'night',mode:'bus',line:'D1',h:'D1 home, then the €8 taxi',from:'stopAmnesia',to:'busSA',geom:rev(ROUTES.T1D1.slice(0,ROUTES.T1D1.findIndex(p=>p[0]<38.9470)+1)),r:'Runs to 06:30. It solves the 4am taxi shortage completely.',fx:['to 06:30']}
  ],
  calls:[{k:'warn',t:'Ask the price of the fish, out loud, before it is cooked',b:'Es Virot, Can Pujol and El Gallo Viejo all serve whole fresh fish by the kilo — one documented dish came to €354. The rice dishes sidestep it.'}]
},

{ id:'d06', chip:'SUN', b:'6', title:'Cala Comte, the sunset, <em>an early night</em>', eyebrow:'Sunday 6 September · recovery', sunset:'20:17',
  lede:'You finished at 6am. This day costs almost nothing and asks almost nothing: the P4 from the bay road, €5 sunbeds, the island’s best sunset for free, the 21:45 home.',
  places:['hotel','xinxo','stopRivMain','stopCdB','busSA','stopComte','comte','escondida','espueto','coolcafe','kitchen62'],
  legs:[
    {t:'11:00',ph:'day',mode:'walk',h:'Slowest morning of the trip',from:'hotel',to:'xinxo',r:'The beach is four minutes from the door. No bus, no plan.'},
    {t:'15:00',ph:'day',mode:'bus',line:'P4',h:'P4 → Cala Comte, joined at the Cala de Bou stop',from:'stopCdB',to:'stopComte',geom:ROUTES.P4.slice(ROUTES.P4.findIndex(p=>p[1]<1.2860)),r:'About 25 minutes from here. The Cala de Bou stop is on Av. Sant Agustí, four minutes behind the hotel.',fx:['35 min']},
    {t:'15:40',ph:'day',mode:'walk',h:'€5 sunbeds · Cala Escondida for quiet',from:'stopComte',to:'comte',r:'Capped at €10, halved after 15:30. Cliff steps west to the quiet cove.',fx:['€5 after 15:30']},
    {t:'20:17',ph:'night',mode:'walk',h:'★ Sunset over the islands',from:'comte',to:'escondida',r:'The horizon is broken by islets, so you get the whole show. Buy the wine at the Spar before you leave — there is no bus back between sunset and the 21:45.',fx:['free']},
    {t:'21:45',ph:'night',mode:'bus',line:'P4',h:'The last P4 — do not miss it',from:'stopComte',to:'stopCdB',geom:rev(ROUTES.P4).slice(0,rev(ROUTES.P4).findIndex(p=>p[1]>1.2765)+1),r:'Cala de Bou 21:57. A taxi from out here is €16 and they do not hang around.',fx:['LAST BUS 21:45']},
    {t:'22:00',ph:'night',mode:'walk',h:'Something cheap, then bed',from:'stopCdB',to:'hotel',r:'Es Puetó to 01:00, Cool Cafè to 02:00, Kitchen 62 two minutes away.'}
  ],
  calls:[{k:'ok',t:'The best-value evening of the week',b:'Bus fare, a €5 sunbed and a bottle from the Spar: about €10–12 each for the island’s best sunset.'}]
},

{ id:'d07', chip:'MON', b:'7', title:'Saladeta by boat, <em>then the old town</em>', eyebrow:'Monday 7 September', sunset:'20:17',
  lede:'The clearest water you will see, reached the good way. Then the only genuinely ancient thing on the island, for sunset from its walls.',
  places:['hotel','stopRivMain','busSA','fonts','salada','saladeta','stopSalada','portIbz','taules','escalinata','bernat','olivo','verge','bar1805','paradise'],
  legs:[
    {t:'09:45',ph:'day',mode:'bus',line:'P2',h:'To the waterfront',from:'stopRivBay',to:'busSA',geom:rev(ROUTES.P2),r:'The boat kiosks are on Passeig de ses Fonts, ten minutes from the station.',fx:['P2 or taxi ≈ €8']},
    {t:'10:30',ph:'day',mode:'boat',line:'BOAT',h:'Boat → Cala Salada',from:'fonts',to:'salada',geom:ROUTES.BOAT_SALADA,r:'Forty minutes up the coast, €9 return. The run itself is the point.',fx:['≈ 40 min','€9 return']},
    {t:'11:10',ph:'day',mode:'walk',h:'Round the path to Saladeta',from:'salada',to:'saladeta',r:'Ten to fifteen minutes on rock. No facilities at all — bring everything, wear trainers.',fx:['NO facilities']},
    {t:'16:45',ph:'day',mode:'bus',line:'P7',h:'Back on the P7, not the boat',from:'stopSalada',to:'busSA',geom:rev(ROUTES.P7),r:'Every 15 minutes to 20:50, four times cheaper, and the deadline cannot strand you.',fx:['every 15 min','last 20:50']},
    {t:'18:45',ph:'night',mode:'bus',line:'T1',h:'T1 → Port d’Eivissa',from:'busSA',to:'portIbz',geom:ROUTES.T1D1,r:'Stay on to the port stop — a much shorter climb to the walls.',fx:['every 15 min','45 min']},
    {t:'19:40',ph:'night',mode:'walk',h:'Up through the walls · a drink on the steps',from:'portIbz',to:'taules',r:'Portal de ses Taules, then cushions straight onto the stone at S’Escalinata. Sunset from Baluard de Sant Bernat at 20:17, free.',fx:['sunset 20:17']},
    {t:'20:30',ph:'night',mode:'walk',h:'Dinner · El Olivo Mio, Plaça de Vila',from:'bernat',to:'olivo',r:'Booking currently held for Sunday — it needs moving to tonight.',fx:['⚠ rebook to Mon 7']},
    {t:'22:30',ph:'night',mode:'walk',h:'Carrer de la Verge',from:'olivo',to:'verge',r:'Twenty tiny bars in a lane below the walls. The dancing happens in the street. Bar 1805 to 04:00; Paradise Lost for actually dancing.',fx:['no ticket']},
    {t:'late',ph:'night',mode:'bus',line:'D1',h:'D1 from the port, then the €8 taxi',from:'portIbz',to:'busSA',geom:rev(ROUTES.T1D1),r:'Every 30 minutes to 06:30, so you never watch the clock in a bar.',fx:['to 06:30']}
  ],
  calls:[{k:'warn',t:'Two Monday traps in the old town',b:'Teatro Pereyra is a ticketed dinner show now, not the free live-music bar older guides describe. Malanga Café is your music but opens Friday and Saturday only.'}]
},

{ id:'d08', chip:'TUE', b:'8', title:'<em>Free</em>', eyebrow:'Tuesday 8 September · last full day', sunset:'20:14',
  lede:'Nothing booked, on purpose. Four nights out by now and you fly tomorrow — decide this one over breakfast.',
  places:['hotel','xinxo','busSA','nemo','vedra','obeach','gracioneta','aragma','chikee','portIbz','pacha'],
  legs:[
    {t:'10:00',ph:'day',mode:'boat',line:'BOAT',h:'Option · Es Vedrà by catamaran',from:'nemo',to:'vedra',geom:[[38.97932,1.30476],[38.9780,1.2960],[38.9740,1.2760],[38.9660,1.2400],[38.9560,1.2200],[38.9300,1.1950],[38.9000,1.1900],[38.8760,1.1930],[38.86784,1.19747]],r:'Capitán Nemo, 10:00–14:00 from the port. Underwater windows and a swim stop. A scenic sail, not a party boat.',fx:['needs booking']},
    {t:'13:00',ph:'day',mode:'walk',h:'Option · KISSTORY at O Beach',from:'hotel',to:'obeach',r:'13:00–22:00, garage and old skool. Walkable at both ends.',fx:['€25 before 14:00']},
    {t:'—',ph:'day',mode:'walk',h:'Option · Cala Gracioneta',from:'busSA',to:'gracioneta',r:'Tiny cove fifteen minutes on foot from the north end of town. The lowest-effort beach of the week.',fx:['walkable','≈ 15 min']},
    {t:'—',ph:'day',mode:'walk',h:'Option · do nothing at all',from:'hotel',to:'xinxo',r:'Xinxó is four minutes away and the pool is closer. A legitimate plan.',fx:['free']},
    {t:'19:30',ph:'night',mode:'taxi',line:'TAXI',h:'Dinner · Aragma, or Chi Kee Wun',from:'hotel',to:'chikee',geom:ROUTES.TX_HOTEL_CKW,r:'Both need a few days’ notice. Chi Kee Wun takes coordinates, not a street name: 38.972985, 1.309019.',fx:['taxi ≈ €8','book ahead']},
    {t:'23:30',ph:'night',mode:'bus',line:'D1',h:'Option · D1 → Pacha',from:'busSA',to:'pacha',geom:ROUTES.T1D1.concat([[38.91842,1.44321]]),r:'Gordo, from €30 — the cheapest big room of the week. The D1 drops you by the door and collects you from the same stop every 30 min to 06:30.',fx:['from €30','D1 to 06:30']}
  ],
  calls:[{k:'',t:'Whatever you do, do it early',b:'You check out tomorrow and fly at 20:15. If you go out, Pacha over Es Paradís — shorter journey home, and it does not run to seven in the morning.'}]
},

{ id:'d09', chip:'WED', b:'9', title:'<em>Home</em>', eyebrow:'Wednesday 9 September · departure', sunset:'20:12',
  lede:'A 20:15 flight gives you almost the whole day. Check out, a last swim, lunch, then the AERO1 from the station at 16:30.',
  places:['hotel','xinxo','kumharas','escuco','stopCuco','stopRivMain','busSA','aeroStop','airport'],
  legs:[
    {t:'11:00',ph:'day',mode:'walk',h:'Check out, bags in storage · last swim',from:'hotel',to:'xinxo',r:'Reception will hold them. Four minutes to the water.',fx:['4 min']},
    {t:'13:30',ph:'day',mode:'walk',h:'Last lunch · Kumharas, or Es Cucó',from:'hotel',to:'kumharas',r:'Kumharas again, or Es Cucó up the hill for rotisserie chicken — bus out, taxi back.'},
    {t:'15:45',ph:'day',mode:'bus',line:'P2',h:'Bags, then P2 or a taxi to the station',from:'stopRivBay',to:'busSA',geom:rev(ROUTES.P2),r:'Ten minutes in a taxi, about €8.',fx:['taxi ≈ €8']},
    {t:'16:30',ph:'day',mode:'bus',line:'AERO1',h:'AERO1 → Airport',from:'busSA',to:'aeroStop',geom:ROUTES.AERO1,r:'Every 30 minutes, fifty minutes, €4 by card. The 16:30 lands you there at 17:20.',fx:['16:30 → 17:20','€4 card'],
      alt:'Or one taxi from the door: ≈ €30, 30 minutes. Worth it with more luggage than you flew out with.',altgeom:rev(ROUTES.TX_AIR_HOTEL),altfrom:'hotel',altto:'aeroStop'},
    {t:'20:15',ph:'night',mode:'plane',h:'Wheels up',from:'airport',to:'airport',r:'Sunset is 20:12 — right side of the plane and you get it on the way out.'}
  ],
  calls:[]
}
];

const META = {
  product:'Latitude', edition:'Ibiza', dates:'2–9 September 2026', season:'September 2026',
  strap:'A week, on one map',
  centre:[38.93,1.35], zoom:11, base:'hotel',
  tilesKey:'cb1_2b01_1_0552a6d00221009dab1f3482',
  // which drawn geometry belongs to which line on the overview (D1 shares the T1 road — see LINE.D1.shares)
  routeLines:{AERO1:'AERO1',T1D1:'T1',D3:'D3',P4:'P4',P5:'P5',P7:'P7',P2:'P2',L3:'L3',FERRY:'FERRY',BOAT_SALADA:'BOAT',BOAT_BASSA:'BOAT',TX_ST_HOTEL:'TAXI',TX_HOTEL_CKW:'TAXI',TX_AIR_HOTEL:'TAXI'}
};

/* memories land here in phase three: {id, ts, day, place, lat, lng, type:'photo'|'video', src, thumb, caption} */
const MEMORIES = [];

window.ATLAS = { meta:META, ROUTES, LINE, P, DAYS, memories:MEMORIES };
