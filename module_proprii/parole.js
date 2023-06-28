/**
 * @type {string} sir ce contine caracterele alfabetice si numerice
 */

let sirAlphaNum = "";

/**
 * @type {Array<Array<number>>} vector de vectori ce reprezinta codurile ascii pentru caracterele aflaberice si numerice
 */

v_intervale=[[48,57],[65,90],[97,122]]



for(let interval of v_intervale){
    for(let i=interval[0]; i<=interval[1]; i++)
        sirAlphaNum+=String.fromCharCode(i)
}

//console.log(sirAlphaNum);

/**
 * @param {number} n lungimea token-ului generat
 * @returns {string} token-ul generat
 */

function genereazaToken(n){
    let token=""
    for (let i=0;i<n; i++){
        token+=sirAlphaNum[Math.floor(Math.random()*sirAlphaNum.length)]
    }
    return token;
}

module.exports.genereazaToken=genereazaToken;