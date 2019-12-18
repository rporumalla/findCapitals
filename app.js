const axios = require('axios');
const readline = require('readline');
var fs = require("fs");

function getCapitalCity() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    prefix = '>>> '
    fs.unlink('out/output.txt', function(error) {
        if (error) {
        }
    });
    var letters = /^[A-Za-z]+$/;

    rl.on('line', (input) => {
        if(`${input}`.match(letters)) {
            axios.get(`https://restcountries.eu/rest/v2/name/${input}`)
            .then(response => {
                if (response.status === 200) {
                    console.log('CAPITAL CITIES BY COUNTRY NAME MATCHES:')
                    console.log('=======================================')
                    response.data.forEach(country => {
                                            console.log(country.name + ' capital => ' + country.capital)
                                            fs.appendFile("out/output.txt", country.capital+"\n", (err) => {
                                                if (err) console.log(err);
                                            });
                                        })
                }
            })
            .catch(error => {
            });

        axios.get(`https://restcountries.eu/rest/v2/alpha/${input}`)
            .then(response => {
                if (response.status === 200) {
                    console.log('CAPITAL CITIES BY COUNTRY CODE MATCHES:')
                    console.log('=======================================')
                    console.log(response.data.name + ' capital => ' + response.data.capital)
                    fs.appendFile("out/output.txt", response.data.capital+"\n", (err) => {
                        if (err) console.log(err);
                    });
                }
            })
            .catch(error => {
            });
        } else {
            console.log('INVALID INPUT');
        }
        rl.setPrompt(prefix, prefix.length);
        rl.prompt();
    }).on('close', function() {
        console.log('Have a great day!');
        process.exit(0);
    });
    console.log(prefix + 'Good to see you. Enter Country Code or partial/full country name.');
    rl.setPrompt(prefix, prefix.length);
    rl.prompt();
}

getCapitalCity()
// module.exports.getCapitalCity = getCapitalCity