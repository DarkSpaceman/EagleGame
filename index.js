#! usr/bin/env
const readline = require('readline');
const fs       = require('fs');
const process  = require('process');

const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let win = 0;
let lose = 0;

const prArgs = process.argv;
const gameFile = prArgs[ prArgs.length - 1 ];

fs.appendFile( gameFile, '', (err) => { if (err) throw err });

function getRandomIntInclusive(min, max) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 )) + min; 
  }

function eagle() {
        inquirer.question('Орёл илл Решка? (1/2) ', (guess) => {
            if (guess == 'exit') { process.exit() };
            
            const correctAnswer = getRandomIntInclusive(1, 2);

            if (guess == correctAnswer) {
                win += 1
                console.log(`Exelent! The correct answer is ${correctAnswer}.`);
                console.log(`You win ${win} and lose ${lose}`);
                fs.writeFile(gameFile, `You win ${win} and lose ${lose}`, (err) => {
                  if (err) throw err
                });
                eagle();
            }
            else if (guess != correctAnswer) {
                lose += 1;
                console.log(`You were so close! The correct answer is ${correctAnswer}.`);
                console.log(`You win ${win} and lose ${lose}`);
                fs.writeFile(gameFile, `You win ${win} and lose ${lose}`, (err) => {
                  if (err) throw err
                });
                eagle();
            };
        });
        
}

eagle();
