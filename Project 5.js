"use strict";
const PROMPT = require('readline-sync');

let lastNames = [], firstNames = [], ages = [], people = [];
let continueResponse, whichPopulate, numNames;
let persons = {};

function main() {
    const SD_ARRAY = 0,
        MD_ARRAY = 1;
    process.stdout.write('\x1Bc'); //Clears the screen
    setContinueResponse();
    while (continueResponse === 1) {
        setWhichPopulate();
        if (whichPopulate === SD_ARRAY) {
            setNumNames();
            for (let i = 0; i < numNames; i++) {
                populateLastNames(i);
                populateFirstNames(i);
                populateAges(i);
                process.stdout.write('\x1Bc'); //Clears the screen
            }
        } else if (whichPopulate === MD_ARRAY) {
            populatePeople();
        } else {
            populatePersonsMap();
        }
        setContinueResponse();
    }
    if (whichPopulate === 0) {
        printParallelArrays();
    } else if (whichPopulate === 1) {
        printPeople();
    } else {
        printPersons();
    }
    printGoodbye();
}

main();

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}

function setWhichPopulate() {
    while (typeof whichPopulate === 'undefined' || isNaN(whichPopulate) || whichPopulate < 0 || whichPopulate > 2) {
        whichPopulate = Number(PROMPT.question(`\nWhich collection do you wish to use? [0=SD Array, 1=MD Array, 2=Map]: `));
    }
}

function setNumNames() {
    while (typeof numNames === 'undefined' || isNaN(numNames) || numNames < 1 || numNames > 10) {
        numNames = Number(PROMPT.question(`\nHow many names to enter? (Not more than 10): `));
    }
}

function populateLastNames(index) {
    while (typeof lastNames[index] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(lastNames[index])) {
        lastNames[index] = PROMPT.question(`Please enter last name: `);
    }
}

function populateFirstNames(index) {
    while (typeof firstNames[index] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(firstNames[index])) {
        firstNames[index] = PROMPT.question(`Please enter first name: `);
    }
}

function populateAges(index) {
    while(typeof ages[index] === 'undefined' || isNaN(ages[index]) || ages[index] < 0 || ages[index] > 149) {
        ages[index] = Number(PROMPT.question(`Please enter age: `));
    }
    /*while (ages[i] === undefined || !/^([1-9]|[0-9][0-9]|[1-1][0-4][0-9])$/.test(ages[i])) {
         ages[i] = Number(PROMPT.question(`Please enter age: `));
    }*/
}

function populatePeople() {
    const COLUMNS = 3;
    let numPeople = 0;
    while (isNaN(numPeople) || numPeople < 1 || numPeople > 10) {
        numPeople = Number(PROMPT.question(`\nHow many people to enter? (Not more than 10): `));
    }
    process.stdout.write('\x1Bc'); //Clears the screen
    for (let i = 0; i < numPeople; i++) {
        people[i] = [];
        for (let j = 0; j < COLUMNS; j++) {
            if (j === 0) {
                while (typeof people[i][j] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(people[i][j])) {
                    people[i][j] = PROMPT.question(`Please enter last name: `);
                }
            } else if (j === 1) {
                while (typeof people[i][j] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(people[i][j])) {
                    people[i][j] = PROMPT.question(`Please enter First name: `);
                }
            } else {
                while(typeof people[i][j] === 'undefined' || isNaN(people[i][j]) || people[i][j] < 0 || people[i][j] > 149) {
                    people[i][j] = Number(PROMPT.question(`Please enter age: `));
                }
            }
        }
        process.stdout.write('\x1Bc'); //Clears the screen
    }
}

function populatePersonsMap() {
    persons = {'person': []}; //Creates an array in an object to hold persons
    const COLUMNS = 3;
    let numPersons = 0;
    while (isNaN(numPersons) || numPersons < 1 || numPersons > 10) {
        numPersons = Number(PROMPT.question(`\nHow many persons to enter? (Not more than 10): `));
    }
    process.stdout.write('\x1Bc'); //Clears the screen
    for (let i = 0; i < numPersons; i++) {
        let person = [];
        for (let j = 0; j < COLUMNS; j++) {
            if (j === 0) {
                while (typeof person[j] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(person[j])) {
                    person[j] = PROMPT.question(`Please enter last name: `);
                    persons.person.push({'lastName': person[j]});
                }
            } else if (j === 1) {
                while (typeof person[j] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(person[j])) {
                    person[j] = PROMPT.question(`Please enter first name: `);
                    persons.person.push({'firstName': person[j]});
                }
            } else {
                while (typeof person[j] === 'undefined' || isNaN(person[j]) || person[j] < 0 || person[j] > 149) {
                    person[j] = Number(PROMPT.question(`Please enter age: `));
                    persons.person.push({'age': person[j]});
                }
            }
        }
        process.stdout.write('\x1Bc'); //Clears the screen
    }
}

function printParallelArrays() {
    for (let i = 0; i < lastNames.length; i++) {
        console.log(`${lastNames[i]}, ${firstNames[i]}, ${ages[i]}`);
    }
}

function printPeople() {
    const COLUMNS = 3;
    for (let i = 0; i < people.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            console.log(people[i][j]);
        }
    }
}

function printPersons() {
    // console.log(persons);
    // console.log(JSON.stringify(persons, null, "   "));
    for (let i = 0; i < persons.person.length; i++) {
        console.log(persons.person[i]);
        // console.log(`Last Name: ${persons.person[i].lastName}, First Name: ${persons.person[i].firstName}, Age: ${persons.person[i].age}`);
    }
}

function printGoodbye() {
    console.log(`\tGoodbye.`);
}