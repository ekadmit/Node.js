const { lstatSync } = require('fs');
const fs = require('fs');
const path = require("path");
const inquirer = require("inquirer");
const yargs = require("yargs");


const executionDir = process.cwd();
const options = yargs
    .usage('Usage: -p <path to the file or directory')
    .option('p', {
        alias: 'path',
        describe: 'Path to the file',
        type: 'string',
        default: executionDir,
    })
    .option(
        'f', {
            alias: 'find',
            describe: 'Find in the file',
            type: 'string',
            demandOption: 'false',
            default: null,
        }).argv;
console.log(options);

const dirpath = options.p;
let fileNames = [];
async function readingDirectory(directory) {
    fileNames = await fs.promises.readdir(directory);

    const answer = await inquirer.prompt(
        {
            name: 'fileName',
            type: 'list',
            message: 'Выберите файл для чтения',
            choices: fileNames,
        }
    ).then(answer => answer.fileName);

    let stat = lstatSync(path.resolve(directory, answer));
    if (stat.isDirectory()) {

        currentDirectory = path.resolve(executionDir, answer);

        return await readingDirectory(currentDirectory);
    } else {

        const fullPath = path.join(directory, answer);

        const data = fs.readFileSync(fullPath, 'utf-8');

        if (options.f == null) {
            console.log(data);
            console.log("No criteria for search");
        } else {
            const regExp = new RegExp(options.f, 'igm');
            console.log(data.match(regExp));
        }
    }
}