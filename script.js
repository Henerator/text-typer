const config = {
    minTypingDelay: 100,
    maxTypingDelay: 300,
    messageChangeDelay: 1000,
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class TextTyper {
    constructor(text) {
        this.setText(text);
    }

    onStatusChanged() { }
    onTypingEnd() { }

    setText(text) {
        this.text = text;
        this.statusText = '';
    }

    startTyping() {
        if (this.statusText.length < this.text.length) {
            this.statusText = this.text.substring(0, this.statusText.length + 1);
            this.onStatusChanged(this.statusText);
            const delayTime = getRandomInt(config.minTypingDelay, config.maxTypingDelay);
            delay(delayTime).then(() => this.startTyping());
        } else {
            this.onTypingEnd();
        }
    }
}

const messages = [
    'Wake up, Lena...',
    'The matrix has you...',
    'But you will pass driving test',
    'Follow the white car.',
];

const encodedMessages = [
    [87, 97, 107, 101, 32, 117, 112, 44, 32, 76, 101, 110, 97, 46, 46, 46],
    [84, 104, 101, 32, 109, 97, 116, 114, 105, 120, 32, 104, 97, 115, 32, 121, 111, 117, 46, 46, 46],
    [66, 117, 116, 32, 121, 111, 117, 32, 119, 105, 108, 108, 32, 112, 97, 115, 115, 32, 100, 114, 105, 118, 105, 110, 103, 32, 116, 101, 115, 116],
    [70, 111, 108, 108, 111, 119, 32, 116, 104, 101, 32, 119, 104, 105, 116, 101, 32, 99, 97, 114, 46],
]

const messageElement = document.querySelector('.message');

function decodeMessage(encodedMessage) {
    return encodedMessage
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}

function typeMessage() {
    const encodedMessage = encodedMessages.shift();
    if (encodedMessage) {
        const message = decodeMessage(encodedMessage);
        const textTyper = new TextTyper(message);
        textTyper.onStatusChanged = (text) => {
            messageElement.innerText = text;
        };
        textTyper.onTypingEnd = () => {
            delay(config.messageChangeDelay).then(typeMessage);
        };
        textTyper.startTyping();
    }
}

delay(config.messageChangeDelay).then(typeMessage);