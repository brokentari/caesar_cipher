const UPPER_LIMIT_CAPITAL = 90;
const LOWER_LIMIT_CAPITAL = 65;
const UPPER_LIMIT_LOWERCASE = 122;
const LOWER_LIMIT_LOWERCASE = 97;
let input_text;
let ascii_array = [];
let modified_ascii_array = [];
let modified_input_text_char = [];

function clearInput() {
    document.getElementById("encrypt_input").value = "";
    ascii_array.length = 0;
    modified_ascii_array.length = 0;
    modified_input_text_char.length = 0;
}

function convertToASCII() {
    input_text = document.getElementById("encrypt_input").value;
    for (let i = 0; i < input_text.length; i++) {
        ascii_array.push(input_text.charCodeAt(i));
    }
}

function convertToString() {
    document.getElementById("modified_text").innerHTML = "";
    for (let i = 0; i < modified_ascii_array.length; i++) {
        modified_input_text_char.push(String.fromCharCode(modified_ascii_array[i]));
    }
    document.getElementById("modified_text").innerHTML = modified_input_text_char.join("");
}

function standardProcedure(input_char, modified_input_char) {
    if (input_char < LOWER_LIMIT_CAPITAL || input_char > UPPER_LIMIT_LOWERCASE || (UPPER_LIMIT_CAPITAL < input_char && input_char < LOWER_LIMIT_LOWERCASE)) {
        modified_ascii_array.push(input_char);
    }

    else if ((LOWER_LIMIT_CAPITAL <= modified_input_char && modified_input_char <= UPPER_LIMIT_CAPITAL) || (LOWER_LIMIT_LOWERCASE <= modified_input_char && modified_input_char <= UPPER_LIMIT_LOWERCASE)) {
        modified_ascii_array.push(modified_input_char);
    }
}

function encrypt() {

    convertToASCII();

    for (let k = 0; k < ascii_array.length; k++) {
        let input_char = ascii_array[k];
        let modified_input_char = ascii_array[k] - 5;

        standardProcedure(input_char, modified_input_char);

        if ((UPPER_LIMIT_CAPITAL < modified_input_char && modified_input_char < LOWER_LIMIT_LOWERCASE) || (65 <= modified_input_char && modified_input_char <= 69)) {
            let single_char = input_char;
            let count = 0;
            if (modified_input_char < LOWER_LIMIT_LOWERCASE) {
                while (single_char - 1 >= LOWER_LIMIT_LOWERCASE) {
                    single_char = single_char - 1;
                    count = count + 1;
                }
                modified_ascii_array.push((UPPER_LIMIT_CAPITAL + 1) - (5 - count));
            }
            else if (modified_input_char < LOWER_LIMIT_CAPITAL) {
                while (single_char - 1 >= LOWER_LIMIT_CAPITAL) {
                    single_char = single_char - 1;
                    count = count + 1;
                    modified_ascii_array.push((UPPER_LIMIT_LOWERCASE + 1) - (5 - count));
                }
            }
        }
    }

    convertToString();

}

function decrypt() {

    convertToASCII();

    for (let k = 0; k < ascii_array.length; k++) {

        let input_char = ascii_array[k];
        let modified_input_char = ascii_array[k] + 5;

        standardProcedure(input_char, modified_input_char);

        if ((UPPER_LIMIT_CAPITAL < modified_input_char && modified_input_char < LOWER_LIMIT_LOWERCASE) || (117 <= modified_input_char && modified_input_char <= 122)) {
            console.log("third test initialized...");
            let single_char = input_char;
            let count = 0;
            if (modified_input_char > UPPER_LIMIT_CAPITAL) {
                while (single_char + 1 <= UPPER_LIMIT_CAPITAL) {
                    single_char = single_char + 1;
                    count = count + 1;
                }
                modified_ascii_array.push((LOWER_LIMIT_LOWERCASE - 1) + (5 - count));
            }
            else if (modified_input_char > UPPER_LIMIT_LOWERCASE) {
                while (single_char + 1 >= LOWER_LIMIT_CAPITAL) {
                    single_char = single_char - 1;
                    count = count + 1;
                }
                modified_ascii_array.push((LOWER_LIMIT_CAPITAL - 1) + (5 - count));
            }

        }

    }

    convertToString();

}

window.onload = function() {
    document.getElementById("encrypt_input").addEventListener("click", clearInput);

    document.getElementById("encryption").addEventListener("click", function() {
        encrypt();
        clearInput();
    });

    document.getElementById("decryption").addEventListener("click", function() {
        decrypt();
        clearInput();
    });

};
