class WordCounter {
    // Define stop words to be ignored
    static stopWords = ['a', 'an', 'the', 'in', 'on', 'at', 'to', 'from', 'of', 'for', 'with', 'under', 'above', 'into', 'onto', 'across', 'through', 'between', 'among', 'he', 'she', 'it', 'they', 'them', 'his', 'her', 'its', 'their', 'who', 'which', 'that', 'i', 'you', 'me', 'us', 'and', 'or', 'but', 'yet', 'so', 'either', 'neither', 'while', 'when', 'where', 'as', 'if', 'because', 'although', 'not', 'only', 'just', 'also', 'even', 'than', 'too', 'very', 'is', 'am', 'are', 'was', 'were', 'be', 'being', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'can', 'could', 'shall', 'should', 'will', 'would', 'may', 'might', 'must'];

    constructor(text) {
        this.text = text;
    }

    getWords(useStopWords) {
        let words = this.text.toLowerCase().match(/\b(\w+)\b/g);

        // If stopWords parameter is true, ignore stop words
        if (useStopWords) {
            // Filter out the stop words
            words = words.filter(word => !WordCounter.stopWords.includes(word));
        }

        return words ? words.length : 0;
    }

    getCharacters() {
        return this.text.length;
    }

    getSentences() {
        let sentences = this.text.match(/[^\.!\?]+[\.!\?]+/g);
        return sentences ? sentences.length : 0;
    }

    getParagraphs() {
        let paragraphs = this.text.split(/\n+/g);
        return paragraphs ? paragraphs.length : 0;
    }

    formatTime(timeInMinutes) {
        const timeInSeconds = timeInMinutes * 60;
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return minutes >= 1 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    }

    getReadingTime() {
        // Average reading speed is about 200 words per minute.
        const timeInMinutes = this.getWords() / 200;
        return this.formatTime(timeInMinutes);
    }

    getSpeakingTime() {
        // Average speaking speed is about 150 words per minute.
        const timeInMinutes = this.getWords() / 150;
        return this.formatTime(timeInMinutes);
    }

    getKeywordDensity() {
        // Extract words from the text, lower case them, and filter out stop words
        let words = this.text.toLowerCase().match(/\b(\w+)\b/g);
        words = words.filter(word => !WordCounter.stopWords.includes(word));

        let wordCount = {};

        if (words) {
            words.forEach(word => {
                if (wordCount[word]) {
                    wordCount[word]++;
                } else {
                    wordCount[word] = 1;
                }
            });
        }

        let keywordDensity = {};

        for (let word in wordCount) {
            // Avoid showing 'undefined' in the results
            if (wordCount[word] !== undefined && wordCount[word] >= words.length * 0.03) {
                keywordDensity[word] = wordCount[word] / words.length;
            }
        }

        // Sort keywords by density from highest to lowest
        let sortedKeywordDensity = Object.keys(keywordDensity).sort((a, b) => keywordDensity[b] - keywordDensity[a]);

        let sortedDensity = {};
        sortedKeywordDensity.forEach(key => {
            sortedDensity[key] = keywordDensity[key];
        });

        return sortedDensity;
    }
}

jQuery(document).ready(function ($) {
    // Define the result fields
    let resultFields = ['Words', 'Characters', 'Sentences', 'Paragraphs', 'Reading Time', 'Speaking Time'];

    // Initialize the result fields with 0
    resultFields.forEach(field => {
        $('#analyzedData').append(`
            <div class="result-item">
                <span class="result-label">${field}</span>
                <span id="${field.replace(' ', '')}" class="result-value">0</span>
            </div>
        `);
    });

    // Handle the analyze button click event
    $('#analyze-btn').on('click', function () {
        let text = $('#userText').val();
        let counter = new WordCounter(text);
        counter.display();
    });

    // Handle the input event of the textarea
    $('#userText').on('input', function() {
        let text = $(this).val();
        let counter = new WordCounter(text);
        counter.display();
    });

    // Override the display method
    WordCounter.prototype.display = function () {
        $('#Words').text(this.getWords());
        $('#Characters').text(this.getCharacters());
        $('#Sentences').text(this.getSentences());
        $('#Paragraphs').text(this.getParagraphs());
        $('#ReadingTime').text(this.getReadingTime());
        $('#SpeakingTime').text(this.getSpeakingTime());

        // Display keyword density
        $('#kwd-density-data').empty();
        let keywordDensity = this.getKeywordDensity();
        for (let word in keywordDensity) {
            if (keywordDensity.hasOwnProperty(word)) {
                $('#kwd-density-data').append(`
                    <div class="result-item">
                        <span class="result-label">
                            <span class="result-value">${(this.getWords(true)*(keywordDensity[word]*100).toFixed(2)/100).toFixed(0)}</span>
                            ${word}
                        </span>
                        <span class="result-value">(${(keywordDensity[word]*100).toFixed(2)}%)</span>
                    </div>
                `);
            }
        }

    };
});
