// Verkefni 3 (5%)  DevTools og debugging 

/*  lesefni:
 *		Error Handling & Debugging, kafli 10 JavaScript & jQuery eftir Jon Duckett 
 *		ChromeDevToolsTutorial: https://www.codeschool.com/courses/discover-devtools 
 *		ChromeDevTools: https://developers.google.com/web/tools/chrome-devtools/?hl=en
 *		Bugs and Error handling, kafli 8 http://eloquentjavascript.net/08_error.html 
 *    	Jshint.com (debug tól) http://jshint.com/ 
*/

  
// 1. 2% 
// Discover DevTools, kláraðu Level 1- 4
// https://www.codeschool.com/courses/discover-devtools
Búin

// 2. - Scope
// Hvað prentast í console og afhverju
(function() {//Self-Invoking Functions
   var a = b = 5;//Þetta virkar a = (b = 5)
})();
//Þetta vinnur frá hærgri til vinstri
console.log(b);//skrifar út töluna sem myndi vera 5
//Útaf var a er skilgreint inni i scopinum er ekki hægt að kalla á það fyrir utan
//enn utaf b er þarna og það er ekki skilgreint það bara gefið þvi value verður það default global breyta og þa er hægt að kalla i það

// 3. - Hoisting
// Hver er niðurstaðan og afhverju
function test() { //functionið test sem mun declerast
   console.log(a);//Þetta mun skrifa undifined ut þvi a er olskilgreind breyta
   console.log(foo());//Útaf hvernig javascript virkar er þessi function skilgreinda utaf það er skilgreint þær aður enn það er runnað koða
   
   var a = 1;//skilgreint svo breytuna a
   function foo() {//Breytann foo mun skilgreinast og geta keyrst
      return 2;//skilar ut tveimurs
   }
}

test();//kallað í test

// 4. - this
// Hver er niðurstaðan, útskýrðu svar
var fullname = 'John Doe';//skilgreint breyta fullname
var obj = {//object
   fullname: 'Colin Ihrig',//proberty fullname i objectinu obj
   prop: { //object i objectinu objc
      fullname: 'Aurelio De Rosa',//proberty fullname i objectinu prob
      getFullname: function() {//function i objectinu prob
         return this.fullname;//functionið returnar fullname frá prob
      }
   }
};

console.log(obj.prop.getFullname());//skilar ut Aurelio De Rosa því það er það sem functionið skilar samkvæmt this bendingunni

var test = obj.prop.getFullname;
//þetta skilgreinir test sem bara getullfuname functionið og þá fær það ekki object probertyinn tvö
//semsagt ef það er kallað i það mun það kalla i this.fullname og þá væri this global og þá kemur fullnamið "John doe"

console.log(test());//sem virkar svo skringilega og eg skil það ekki


// 5.  
// Notaðu hér fyrir neðan "use strict" á viðeigandi stað og jshint þér til hjálpar
// a) hver er villan, b) afhverju er villa, c) lagaðu hana
"use strict";
//ég er a linux og nota browserinn chromium sem ég held að geti ekki nota use strict enn agiskuninn min er

//Rangt
function canYouSpotTheProblem() {
  for (counter = 0; counter < 10; counter++)
    console.log("Happy happy");
}
canYouSpotTheProblem();
//Rétt
function canYouSpotTheProblem() {
  for (var counter = 0; counter < 10; counter++) {
    console.log("happy happy");
  };
}
//Það vantar slaufusvigana fyrir for loopuna og það er ekki skilgreint counter
//biðst afsökunar ef það er meira enn get bara ekki prufukeyrt strict i tölvunni minni

// 6. 
//a) hver er villan, tvær villur console.log(name) og var ferdinand  = new Person("ferdinanad") 
//b) afhverju er villa, það stendur fyrir hverja linu 
//c) lagaðu hana, búin að laga,  enn leyfði linunni console.log(name) að vera, hun virkar samt ekki
function Person(name) { this.name = name; }
var ferdinand = new Person("Ferdinand"); //bætti við new fyrir framan þvi þu þarft að gera nytt object
console.log(name);//hvaða name er verið að kalla i ??? þetta virkar ekki þvi það er bara til aðferð sem heitir person og object sem heitir ferdianand 
console.log(ferdinand.name); //þetta ætti að virka með rettum koða enn það er ekki buið til nytt object sem er sett a ferdinand þannig það virkar ekki


// 7. 
// Convert a whole number to a string in any base (decimal, binary, and so on) 
// a) Reyndu að greina kóðann t.d. með að setja console.log() í kóðann til að fá frekari upplýsingar
// b) Notaðu debugger í chromeDeveloper eða firebug. (breakpoint á ákveðnum línum til að geta skoðað gildi)

function numberToString(n, base) {//aðferð sem tekur inn tölu, og baseið
  var result = "", sign = "";//skilgreinir tvær breytur sem string til að nota
  if (n < 0) {//ef n er minna enn null
    sign = "-";//bætir við strenginn - merki
    n = -n;//segir að n sjé minus sjalfur sig, semsagt ef n er -10 verður n 10
  }
  do {//do while n er meira enn 0
    result = String(n % base) + result;//result verður jafntog modulus af n og base + result sett i strengt
    n /= base;//svo deilum við n með base
  } while (n > 0);//kikjum hvort það sjé enþá stærra
  return sign + result;//returnum svo sign + result strengjunum
}
console.log(numberToString(1, 10)); // → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…


// 8. 
// Útskýrðu notkun á isNaN í kóðanum, afhverju að gera þetta?
//Semsagt isnan gefur false ef það er ekkert og false ef það er tala, ef það er strengur gefur það true
//semsagt ef þú skrifar tölu returnar hann tölunni 
//ef þú hinsvegar skrifar texta returnar hann null
function promptNumber(question) {
  //Þetta herna segir að result sjé jafntog svarið við spurninginnu og það vill fá tölu
  var result = Number(prompt(question, ""));
  if (isNaN(result)) return null;//ef það er ekki tala returnar það null
  else return result;//ef það er tala returnar það result
}

console.log(promptNumber("How many trees do you see?")); //console.logar það sem kemur fra þessari aðferð


// 9. 
//  Útskýrðu hvernig try og catch virkar hér í kóðanum, 
//  hvað gerir throw keyword og hvað gerist þegar það verður error (útskýra kóðaflæði)

//okeymm koðaflæðið er að það byrjar með skilgreiningu aðferðann og svo keyrsit koðinn
//Það byrjar i try og prufar að spurja um what sjérðu með aðferðinni look
//aðferðinni look spyr hvaða átt þú horfir i, með þvi að kalla i promptdirection
//það tekur inn textann fra look og kikjir hvort þetta sjé left eða right og hendir þvi öllu i lower case
//ef það er left returnar það L ef það er right returnar það r ef það er ekkert hendir það i throw new error og gefur upplyisingar, þannig ef 
//það fer til baka með þessar upplysingar verður try ið rangt og þa catchar það skilgreinda errorinn og console.logar hann út
//ef þú gerir left eða right og það kemur ekki error þá skilar það l eða r
//i look tjekkar það hvort það sje returnar l og myndi þá skila a house annars skilar það two angry bears, 
//þegar það er else þá getur promptdirection bara skilað l og r enn engu öðru sem gerir kleyft að nota else i staðinn fyrir else if
//svo returnar look a house eða two angry bears og þá mun logga það ut frá byrjun 

//Þetta voru vonandi fullnægjandi svör
function promptDirection(question) {
  var result = prompt(question, "");
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L")
    return "a house";
  else
    return "two angry bears";
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}


/*
Skil á verkefni:
Skilaðu tengil á Verkefni 3 sem er hýst á Github eða Bitbucket
	
Námsmat:	
liður 1 gildir 2%
Liðir 2-9 gilda samtals 3%

Gefið er full fyrir rétt og fullnægjandi svar og skýringu þegar það á við, hálft ef svar eða skýring er ábótavant.

*/