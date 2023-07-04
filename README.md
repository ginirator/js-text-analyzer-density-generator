# Javascript Analyzer Density Generator

This repository contains a JavaScript-based text analysis tool that provides word, character, sentence, and paragraph counts, as well as reading and speaking time estimates. It features a keyword density analyzer for SEO-focused content optimization. Try to learn how it works or integrate it into your project.

This TypeScript code can be used in a web page once it's compiled into JavaScript. You can use a tool like `tsc` (TypeScript Compiler) to compile your TypeScript code into JavaScript.

Here is a basic guide to using this code on a webpage:

1. Create an HTML file where you want to use the generated JavaScript. You can create a text area for input and a button to trigger the word count operation.

<pre><code>&lt;!DOCTYPE html>
&lt;html>
&lt;head>
    &lt;title>Word Analyzer&lt;/title>
&lt;/head>
&lt;body>
    &lt;h1>Word Analyzer&lt;/h1>
    &lt;textarea id="textArea" rows="10" cols="50">Enter your text here...&lt;/textarea>
    &lt;button onclick="analyzeText()">Analyze Text&lt;/button>
    &lt;div id="result">&lt;/div>

	&lt;script src="YourFileName.js">&lt;/script>
&lt;/body>
&lt;/html></code></pre>

2. Replace the console.log statements in the `display()` method with `document.getElementById` statements. This is to display the results in your HTML page instead of the console.

<pre><code>display(): void {
    document.getElementById("result").innerHTML =
        `Words: ${this.getWords()} <br/>
        Characters: ${this.getCharacters()} <br/>
        Sentences: ${this.getSentences()} <br/>
        Paragraphs: ${this.getParagraphs()} <br/>
        Reading Time: ${this.getReadingTime()} <br/>
        Speaking Time: ${this.getSpeakingTime()} <br/>
        Keyword Density: <br/>`;
    let keywordDensity = this.getKeywordDensity();
    for (let word in keywordDensity) {
        document.getElementById("result").innerHTML +=
        `${word} - ${keywordDensity[word].count} (${(keywordDensity[word].density * 100).toFixed(2)}%) <br/>`;
    }
}</code></pre>

3. Also, replace the last two lines of the TypeScript file with this JavaScript code:

<pre><code>function analyzeText() {
    let text = document.getElementById('textArea').value;
    let counter = new WordCounter(text);
    counter.display();
}</code></pre>

This will create a new WordCounter instance with the text from the textarea when the button is clicked, and display the results in the `result` div.

After these steps, open the HTML file in a web browser, enter text in the textarea, and click the `Analyze Text` button to see the results.
