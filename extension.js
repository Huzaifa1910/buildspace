// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const OpenAI = require('openai');
// Import dotenv package
require('dotenv').config();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */


// Access environment variables




const openai = new OpenAI({
	apiKey: process.env.API_KEY, // Use the API key from environment variable
});
  
async function main(prompt) {
const chatCompletion = await openai.chat.completions.create({
	messages: [{ role: 'user', content: prompt }],
	model: 'gpt-3.5-turbo',
});
return chatCompletion.choices[0].message.content;
}
  
function activate(context) {
	let disposable = vscode.commands.registerCommand('learnwithai.main', async function () {
	  const editor = vscode.window.activeTextEditor;
	  if (editor) {
		const document = editor.document;
		// const selection = editor.selection;

		const text = document.getText();
		console.log(text)
		const response = await main(text);
		console.log(response)
		editor.edit(editBuilder => {
		  editBuilder.insert(new vscode.Position(document.lineCount, 0), response);
		});
	  }
	});
  
	context.subscriptions.push(disposable);
  }
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}


