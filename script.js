const UPPER_LIMIT_CAPITAL = 90;
const LOWER_LIMIT_CAPITAL = 65;
const UPPER_LIMIT_LOWERCASE = 122;
const LOWER_LIMIT_LOWERCASE = 97;
let encrypted_ascii = [];
let encrypted_char = [];
let decrypted_ascii = [];
let decrypted_char = [];


function convertToASCII_encrypted(event) {
    const input_char = event.which;
    const mod_input = input_char - 5;
    let single_char = input_char;
    let count = 0;

    if (input_char < LOWER_LIMIT_CAPITAL || input_char > UPPER_LIMIT_LOWERCASE || (UPPER_LIMIT_CAPITAL < input_char && input_char < LOWER_LIMIT_LOWERCASE)) {
        encrypted_ascii.push(input_char);
    }

    else if ((LOWER_LIMIT_CAPITAL < mod_input && mod_input < UPPER_LIMIT_CAPITAL) || (LOWER_LIMIT_LOWERCASE < mod_input && mod_input < UPPER_LIMIT_LOWERCASE)) {
        encrypted_ascii.push(mod_input);
    }

    else if ((UPPER_LIMIT_CAPITAL < mod_input && mod_input < LOWER_LIMIT_LOWERCASE) || (65 <= mod_input && mod_input <= 69)) {
        if (mod_input < LOWER_LIMIT_LOWERCASE) {
            while (single_char - 1 >= LOWER_LIMIT_LOWERCASE) {
                single_char = single_char - 1;
                count = count + 1;
            }
            encrypted_ascii.push(UPPER_LIMIT_CAPITAL - (5 - count))
        }
        else if (mod_input < LOWER_LIMIT_CAPITAL) {
            while (single_char - 1 >= LOWER_LIMIT_CAPITAL) {
                single_char = single_char - 1;
                count = count + 1;
            encrypted_ascii.push(UPPER_LIMIT_LOWERCASE - (5 - count))
            }
        }
    }
}

function convertToASCII_decrypted(event) {
    const input_char = event.which;
    const mod_input = input_char + 5;
    let single_char = input_char;
    let count = 0;

    console.log("character ascii: " + input_char + "\tmodded ascii: " + mod_input);
    console.log("in between capital: " + (LOWER_LIMIT_CAPITAL < mod_input && mod_input < UPPER_LIMIT_CAPITAL) + "\tin between lowercase: " + (LOWER_LIMIT_LOWERCASE < mod_input && mod_input < UPPER_LIMIT_LOWERCASE));
    if (input_char < LOWER_LIMIT_CAPITAL || input_char > UPPER_LIMIT_LOWERCASE || (UPPER_LIMIT_CAPITAL < input_char && input_char < LOWER_LIMIT_LOWERCASE)) {
        console.log("first test: true");
        decrypted_ascii.push(input_char);
    }

    else if ((LOWER_LIMIT_CAPITAL < mod_input && mod_input < UPPER_LIMIT_CAPITAL) || (LOWER_LIMIT_LOWERCASE < mod_input && mod_input < UPPER_LIMIT_LOWERCASE)) {
        console.log("first test: false \nsecond test: true");
        decrypted_ascii.push(mod_input);
        console.log("second test: completed");
    }

    else if ((UPPER_LIMIT_CAPITAL < mod_input && mod_input < LOWER_LIMIT_LOWERCASE) || (117 <= mod_input && mod_input <=122)) {
        console.log("first test: false\nsecond test: false\nthird test: true");
        if (mod_input > UPPER_LIMIT_CAPITAL) {
            while (single_char + 1 <= UPPER_LIMIT_CAPITAL) {
                single_char = single_char + 1;
                count = count + 1;
            }
            decrypted_ascii.push(LOWER_LIMIT_LOWERCASE + (5 - count));
        }
        else if (mod_input > UPPER_LIMIT_LOWERCASE) {
            while (single_char + 1 >= LOWER_LIMIT_CAPITAL) {
                single_char = single_char - 1;
                count = count + 1;
            }
            decrypted_ascii.push(LOWER_LIMIT_CAPITAL + (5 - count));
        }
    }
}

function additionalKeys(event) {
    const input_char = event.which;
    console.log(input_char);
    if (input_char === 8) {
        encrypted_ascii.splice(encrypted_ascii.length - 1);
        decrypted_ascii.splice(decrypted_ascii.length - 1);
    }
}

function clearTextBox() {
    document.getElementById('encrypt_input').value = "";
}

function encrypt() {
    document.getElementById('encrypted').innerHTML = "";
    for(let i = 0; i < encrypted_ascii.length; i++) {
        encrypted_char.push(String.fromCharCode(encrypted_ascii[i]));
    }
    document.getElementById('encrypted').innerHTML = encrypted_char.join("");
    encrypted_ascii.length = 0;
    encrypted_char.length = 0;
    decrypted_ascii.length = 0;
    decrypted_char.length = 0;
    document.getElementById('encrypt_input').value = "";
}

function decrypt() {
    document.getElementById('encrypted').innerHTML = "";
    for (let i = 0; i < decrypted_ascii.length; i++) {
        decrypted_char.push(String.fromCharCode(decrypted_ascii[i]));
    }
    document.getElementById('encrypted').innerHTML = decrypted_char.join("");
    encrypted_ascii.length = 0;
    encrypted_char.length = 0;
    decrypted_ascii.length = 0;
    decrypted_char.length = 0;
    document.getElementById('encrypt_input').value = "";
}