/* Setting up some general variables by default */
let home = 'GBP';
let visiting = 'EUR';

let currencies = ['EUR']; // initial look of the two arrays holding currencies and rates (failed to use object)
let rates = [1.000];

let bank_fee = 0;

let back = false;  // false if we have not selected any option in the navigation bar, true otherwise

/* Using AJAX to get the up-to-date currencies and rates*/
let xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://devweb2019.cis.strath.ac.uk/~aes02112/ecbxml.php", true);
xhttp.onload = function() {
    var txt = '' + xhttp.responseText;
    var parser=new DOMParser();
    var xmlDoc=parser.parseFromString(txt,"text/xml");
    let x = xmlDoc.getElementsByTagName("Cube");
    for (i = 2; i < x.length; i++) {
        let prop = '' + x[i].getAttribute("currency"); // <-- ensuring that the currency is a string variable
        currencies.push(prop);                                       // <-- populating currencies array
        rates.push(x[i].getAttribute("rate"));         // <-- populating rates array
    }
};
xhttp.send();

/* Load function used when html file is loaded. It gets and sets all the elements that are saved with localStorage*/
function load() {
    let x = localStorage.getItem('home');
    let y = localStorage.getItem('visiting');
    let z = localStorage.getItem('bank_fee');
    if (x) {
        home = x;
    }
    if (y) {
        visiting = y;
    }
    if (z) {
        bank_fee = z;
    }
    let w =document.getElementsByClassName("fee");
    for (i = 0; i < w.length; i++) {
        w[i].style.background = "bisque";
    }
    document.getElementById(bank_fee).style.background = "greenyellow";
    document.getElementById("result").placeholder = visiting + ' to ' + home;
}

/* Simple function for displaying a value */
function displayValue(val) {
    document.getElementById("result").value += val
}

/* Simple function for clearing the display */
function clearDisplay() {
    document.getElementById("result").value = ""
}

/* Slightly more exotic function that recognises the current currencies rates and then calculates them
* using a formula. Evoked when '=' is pressed */
function convertRate() {
    let value = document.getElementById("result").value;
    let i = currencies.indexOf(visiting);
    let y = rates[i];
    let j = currencies.indexOf(home);
    let z = rates[j];
    let original = (1 / y) * z * value;
    let result = Math.floor(original + (original * (bank_fee / 100)));
    document.getElementById("result").value = result
}

/* Opens navigation bar making it 100% on the screen. */
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

/* Closing navigation bar when back is set to false, otherwise it goes one step backwards. Also the function
* is making some styling changes to the visibility of the options in the menu */
function closeNav() {
    if (!back) {
        document.getElementById("mySidenav").style.width = "0";
    }
    back = false;
    let x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "block";
    }
    let y = document.getElementsByClassName("flag");
    for (j = 0; j < y.length; j++) {
        y[j].style.display = "none";
    }
    let z = document.getElementsByTagName("label");
    for (k = 0; k < z.length; k++) {
        z[k].style.display = "none";
    }
    let w = document.getElementsByClassName("fee");
    for (l = 0; l < w.length; l++) {
        w[l].style.display = "none";
    }
}

let convert; // variable that helps recognising which currency(home or visiting) to convert

/* Function that makes styling changes to the display of the elements in the html file when an option
* from the menu is chosen */
function option(val) {
    back = true;
    if (val === 'home') {
        document.getElementById("l1").style.display = "block";
        convert = val;
    }
    else if (val === 'visiting') {
        document.getElementById("l2").style.display = "block";
        convert = val;
    }
    else {
        document.getElementById("l3").style.display = "block"
    }
    let x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    let y = document.getElementsByClassName("flag");
    let z = document.getElementsByClassName("fee");
    if (val === 'fee') {
        for (k = 0; k < z.length; k++) {
            z[k].style.display = "block";
        }
    }
    else {
        for (j = 0; j < y.length; j++) {
            y[j].style.display = "table";
        }
    }
}

/* Function that changes one of the currencies which is picked by the user */
function changeCurrency(val) {
    if (convert === 'home') {
        localStorage.setItem('home', val);
        home = localStorage.getItem('home');  //save
    }
    else if (convert === 'visiting') {
        localStorage.setItem('visiting', val);
        visiting = localStorage.getItem('visiting');  //save
    }
    document.getElementById("result").placeholder = visiting + ' to ' + home;
    closeNav();
}

/* Function that changes the bank fee */
function fee(val) {
    localStorage.setItem('bank_fee', parseInt(val));
    bank_fee = localStorage.getItem('bank_fee');         //save
    let x =document.getElementsByClassName("fee");
    for (i = 0; i < x.length; i++) {
        x[i].style.background = "bisque";  // other fees are displayed in neutral color
    }
    document.getElementById(val).style.background = "greenyellow"  //the current fee is displayed in green
}



