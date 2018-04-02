const UPPER_LIMIT_CAPITAL = 90;
const LOWER_LIMIT_CAPITAL = 65;
const UPPER_LIMIT_LOWERCASE = 122;
const LOWER_LIMIT_LOWERCASE = 97;
let input_text;


function clearInput() {
    document.getElementById("encrypt_input").value = "";
    document.getElementById("modified_text").innerHTML = "";
}


function convertToString(characterASCII) {
    input_text = document.getElementById("encrypt_input").value;
    return String.fromCharCode(characterASCII);
}

function encrypt(characterASCII) {
    let input_char = characterASCII;
    let modified_input_char = characterASCII - 5;
    if (input_char < LOWER_LIMIT_CAPITAL || input_char > UPPER_LIMIT_LOWERCASE || (UPPER_LIMIT_CAPITAL < input_char && input_char < LOWER_LIMIT_LOWERCASE)) {
        return input_char;
    }

    else if ((LOWER_LIMIT_CAPITAL <= modified_input_char && modified_input_char <= UPPER_LIMIT_CAPITAL) || (LOWER_LIMIT_LOWERCASE <= modified_input_char && modified_input_char <= UPPER_LIMIT_LOWERCASE)) {
        return modified_input_char;
    }

    else if ((UPPER_LIMIT_CAPITAL < modified_input_char && modified_input_char < LOWER_LIMIT_LOWERCASE) || (65 <= modified_input_char && modified_input_char <= 69)) {
        let single_char = input_char;
        let count = 0;
        if (modified_input_char < LOWER_LIMIT_LOWERCASE) {
            while (single_char - 1 >= LOWER_LIMIT_LOWERCASE) {
                single_char = single_char - 1;
                count = count + 1;
            }
            return ((UPPER_LIMIT_CAPITAL + 1) - (5 - count));
        }
        else if (modified_input_char < LOWER_LIMIT_CAPITAL) {
            while (single_char - 1 >= LOWER_LIMIT_CAPITAL) {
                single_char = single_char - 1;
                count = count + 1;

            }
            return ((UPPER_LIMIT_LOWERCASE + 1) - (5 - count));
        }
    }

}

function decrypt(characterASCII) {
    let input_char = characterASCII;
    let modified_input_char = characterASCII + 5;

    if (input_char < LOWER_LIMIT_CAPITAL || input_char > UPPER_LIMIT_LOWERCASE || (UPPER_LIMIT_CAPITAL < input_char && input_char < LOWER_LIMIT_LOWERCASE)) {
        return input_char;
    }

    else if ((LOWER_LIMIT_CAPITAL <= modified_input_char && modified_input_char <= UPPER_LIMIT_CAPITAL) || (LOWER_LIMIT_LOWERCASE <= modified_input_char && modified_input_char <= UPPER_LIMIT_LOWERCASE)) {
        return modified_input_char;
    }

    else if ((UPPER_LIMIT_CAPITAL < modified_input_char && modified_input_char < LOWER_LIMIT_LOWERCASE) || (modified_input_char > UPPER_LIMIT_LOWERCASE)) {
        let single_char = input_char;
        let count = 0;
        if (modified_input_char > UPPER_LIMIT_CAPITAL && modified_input_char < LOWER_LIMIT_LOWERCASE) {
            while (single_char + 1 <= UPPER_LIMIT_CAPITAL) {
                single_char = single_char + 1;
                count = count + 1;
            }
            return ((LOWER_LIMIT_LOWERCASE - 1) + (5 - count));
        }
        else if (modified_input_char > UPPER_LIMIT_LOWERCASE) {
            while (single_char + 1 <= UPPER_LIMIT_LOWERCASE) {
                single_char = single_char + 1;
                count = count + 1;
            }
            return ((LOWER_LIMIT_CAPITAL - 1) + (5 - count));
        }
        console.log(count);
    }
}

function encryptAsYouType(e) {
    const keyCode = e.which;
    console.log(keyCode);

    document.getElementById("modified_text").innerHTML = document.getElementById("modified_text").innerHTML + convertToString(encrypt(keyCode));
}

function decryptAsYouType(e) {
    const keyCode = e.which;
    document.getElementById("modified_text").innerHTML = document.getElementById("modified_text").innerHTML + convertToString(decrypt(keyCode));
}

window.onload = function () {
    const input_bar = document.getElementById("encrypt_input");
    const encrypt_button = document.getElementById("encryption");
    const decrypt_button = document.getElementById("decryption");

    input_bar.addEventListener("keydown", function (e) {
        const keyCode = e.which;
        if (keyCode === 8) {
            console.log(keyCode);
            document.getElementById("modified_text").innerHTML = document.getElementById("modified_text").innerHTML.substring(0, document.getElementById("modified_text").innerHTML.length - 1);
        }
    });
    input_bar.addEventListener("click", clearInput);
    input_bar.addEventListener("keypress", encryptAsYouType);
    document.getElementById("encryption").addEventListener("click", function () {
        clearInput();
        input_bar.removeEventListener("keypress", decryptAsYouType);
        document.getElementById("decryption").style.color = "#ffffff";
        document.getElementById("decryption").style.backgroundColor = "#000000";
        document.getElementById("decryption").style.borderColor = "#000000";
        encrypt_button.style.color = "#000000";
        encrypt_button.style.backgroundColor = "#ffffff";
        encrypt_button.style.borderColor = "#ffffff";
        input_bar.addEventListener("keypress", encryptAsYouType);
    });

    document.getElementById("decryption").addEventListener("click", function () {
        clearInput();
        input_bar.removeEventListener("keypress", encryptAsYouType);
        encrypt_button.style.color = "#ffffff";
        encrypt_button.style.backgroundColor = "#000000";
        encrypt_button.style.borderColor = "#000000";
        decrypt_button.style.color = "#000000";
        decrypt_button.style.backgroundColor = "#ffffff";
        decrypt_button.style.borderColor = "#ffffff";
        input_bar.addEventListener("keypress", decryptAsYouType);
    });
};
