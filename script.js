// Create View

const main = document.createElement('main');
main.classList.add('main');

const mainContainer = document.createElement('section');
mainContainer.classList.add('main__main-section');

const passwordsContainer = document.createElement('div');
passwordsContainer.classList.add('main-section__passwords-container');

const inputsAmount = 16;

for (let i = 0; i < inputsAmount; i += 1) {
    const inputBlock = document.createElement('div');
    inputBlock.classList.add('passwords-container__password-block');
    inputBlock.id = i.toString();

    const number = document.createElement('div');
    number.classList.add('password-block__number');
    number.textContent = `${(i + 1).toString()}.`;

    const input = document.createElement('input');
    input.classList.add('password-block__input');
    input.type = 'password';

    const image = document.createElement('img');
    image.classList.add('password-block__image');
    image.src = './assets/images/png/unvisable-icon.png';
    image.addEventListener('click', () => switchView(inputBlock));

    inputBlock.append(number, input, image);

    passwordsContainer.append(inputBlock);
}

const generateButton = document.createElement('button');
generateButton.classList.add('main-section__generate-button');
generateButton.textContent = 'Generate passwords';
generateButton.addEventListener('click', () => generatePassword());

mainContainer.append(passwordsContainer, generateButton);

main.append(mainContainer);

document.body.append(main);

// Common functions

const visableField = {};

function hidePassword() {
    if (visableField.input) {
        visableField.input.type = 'password'
        visableField.image.src = './assets/images/png/unvisable-icon.png';
    }
}

function showPassword(block) {
    hidePassword();

    const input = block.children[1];
    const image = block.children[2];

    input.type = 'text';
    image.src = './assets/images/png/visable-icon.png';

    visableField.input = input;
    visableField.image = image;
}

function switchView(block) {
    if (visableField.input?.parentElement === block && visableField.input.type === 'text') {
        hidePassword();
    } else {
        showPassword(block);
    }
}

function generatePassword() {
    const minLength = 3;
    const maxLength = 8;
    let passwordLength;

    const passwordBlocksArr = document.querySelectorAll('.passwords-container__password-block');

    passwordBlocksArr.forEach(el => {
        const symbolsArr = [];

        const randomLength = Math.round((maxLength - minLength) * Math.random());
        Number(el.id) === (inputsAmount - 1) ? passwordLength = minLength + randomLength : passwordLength = maxLength;

        for (let i = 0; i < passwordLength; i += 1) {
            symbolsArr.push(generateSymbol());
        }

        const input = el.children[1];
        input.value = symbolsArr.join('');
    });
}

function generateSymbol() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+';

    return chars[Math.floor(Math.random() * chars.length)];
}