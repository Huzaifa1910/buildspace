// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const OpenAI = require("openai");
// Import dotenv package
require("dotenv").config();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

// Access environment variables

const openai = new OpenAI({
  // apiKey: process.env.API_KEY, // Use the API key from environment variable
});

let JSBeginner = [
  "Variables and Data Types",
  "Operators and Expressions",
  "Conditional Statements (if, else if, else)",
  "Loops (for, while)",
  "Functions",
  "Arrays and Objects",
  "DOM Manipulation (Basic)",
  "Event Handling",
];

let JSIntermediate = [
  "Advanced Functions (Closures, Arrow Functions)",
  "Prototypes and Inheritance",
  "Error Handling (try, catch)",
  "Asynchronous Programming (Promises, async/await)",
  "DOM Manipulation (Advanced)",
  "AJAX and Fetch API",
  "ES6+ Features (Modules, Classes, Template Literals)",
  "Functional Programming Concepts",
];

let JSAdvance = [
  "Advanced Asynchronous Patterns (Generators, RxJS)",
  "WebSockets",
  "Service Workers",
  "Testing (Unit Testing, Integration Testing)",
  "Performance Optimization",
  "Design Patterns (Singleton, Observer, etc.)",
  "Security Best Practices (Cross-Site Scripting, CORS)",
  "Frameworks and Libraries (React, Angular, Vue)",
];

let PYBeginner = [
  "Variables and Data Types",
  "Operators and Expressions",
  "Control Flow (if, else, elif)",
  "Loops (for, while)",
  "Functions",
  "Lists, Tuples, and Dictionaries",
  "Input and Output",
  "Error Handling (try, except)",
];

let PYIntermediate = [
  "File Handling (Reading and Writing Files)",
  "Object-Oriented Programming (Classes, Objects)",
  "Modules and Packages",
  "Regular Expressions",
  " Functional Programming Tools (map, filter, lambda)",
  "Generators and Iterators",
  "Decorators",
  "Database Access (SQLite, SQLAlchemy)",
];

let PYAdvance = [
  "Advanced OOP Concepts (Inheritance, Polymorphism)",
  "Concurrency and Parallelism (Threading, Multiprocessing)",
  "Networking (Socket Programming, Requests)",
  "Web Development (Flask, Django)",
  "Data Science Libraries (NumPy, Pandas)",
  "Machine Learning (scikit-learn, TensorFlow)",
  "Testing (Unit Testing, Mocking)",
  "Security (Encryption, Authentication)",
];

async function main(prompt) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Start the conversation with this message : Welcome to CodeDojo. Would you like to learn Javascript or Python (end the message here)",
      },

      { role: "user", content: prompt },

      {
        role: "system",
        content:
          "The user will now choose Javascript or Python so your next response should be We have three stages Beginner, Intermediate and Advance which one would like to start with? Donot show the stages array here",
      },

      { role: "user", content: prompt },

      {
        role: "system",
        content: `(The third message of the conversation):if the user choose Javascript's Beginner stage list down these topics ${JSBeginner} end the message here if the user choose Javascript's Intermediate stage list down these topics ${JSIntermediate}end the message here if the user choose Javascript's Advance stage list down these topics ${JSAdvance} end the message here if the user choose python's Beginner stage list down these topics ${PYBeginner} end the message here if the user choose python's Intermediate stage list down these topics ${PYIntermediate} end the message here if the user choose python's Advance stage list down these topics ${PYAdvance} end the message here Show the stages array here`,
      },

      { role: "user", content: prompt },
    ],
  });
  return chatCompletion.choices[0].message.content;
}

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "learnwithai.main",
    async function () {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        // const selection = editor.selection;

        const text = document.getText();
        console.log(text);
        const response = await main(text);
        console.log(response);
        editor.edit((editBuilder) => {
          editBuilder.insert(
            new vscode.Position(document.lineCount, 0),
            response
          );
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
