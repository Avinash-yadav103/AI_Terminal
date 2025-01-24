const { exec } = require('child_process');
const readline = require('readline');
const os = require('os');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Terminal> '
});

console.log('Welcome to the basic terminal! Type "exit" or "quit" to exit.');
rl.prompt();

rl.on('line', (line) => {
    const command = line.trim();

    if (command === 'exit' || command === 'quit') {
        console.log('Exiting the terminal...');
        rl.close();
        return;
    }

    if (command === 'clear') {
        console.clear();
        rl.prompt();
        return;
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            rl.prompt();
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
        console.log(stdout);
        rl.prompt();
    });
});

rl.on('SIGINT', () => {
    console.log('\nKeyboard Interrupt. Exiting the terminal...');
    process.exit(0);
});
