"use strict";
const PROMPT = require('readline-sync');

let priceTable = [];
let continueResponse;
let numPassengers, numZones, price;

function main() {
    setContinueResponse();
    populatePriceTable();
    while (continueResponse === 1)
    {
        setNumPassengers();
        setNumZones();
        calculatePrice();
        printPrice();
        setContinueResponse();
    }
}

main();

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\nDo you want to enter a new ride?\n\t0. No\n\t1. Yes `));
        }
    } else {
        continueResponse = 1;
    }
}

function setNumPassengers() {
    numPassengers = PROMPT.question("Number of passengers: ");
    if (numPassengers > 4 || numPassengers < 0) {
        return setNumPassengers();
    }
}

function setNumZones() {
    numZones = PROMPT.question("Number of zones crossed: ");
    if (numZones > 3 || numZones < 0) {
        return setNumZones();
    }
}

function calculatePrice() {
    price = priceTable[numPassengers][numZones];
}

function printPrice() {
    console.log(`The price for your ride is: $${price}`);
}

function populatePriceTable() {
    priceTable[0] = [];
    priceTable[1] = [];
    priceTable[2] = [];
    priceTable[3] = [];
    priceTable[4] = [];

    priceTable[0][0] = 0;
    priceTable[0][1] = 0;
    priceTable[0][2] = 0;
    priceTable[0][3] = 0;
    priceTable[1][0] = 7.5;
    priceTable[1][1] = 10;
    priceTable[1][2] = 12;
    priceTable[1][3] = 12.75;
    priceTable[2][0] = 14;
    priceTable[2][1] = 18.5;
    priceTable[2][2] = 22;
    priceTable[2][3] = 23;
    priceTable[3][0] = 20;
    priceTable[3][1] = 21;
    priceTable[3][2] = 32;
    priceTable[3][3] = 33;
    priceTable[4][0] = 25;
    priceTable[4][1] = 27.5;
    priceTable[4][2] = 36;
    priceTable[4][3] = 37;
}
