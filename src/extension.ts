import { window, commands, Range, ExtensionContext } from 'vscode';
import { ConversionManager } from "./ConversionManager";

// function updates editor text after conversion
function updateActiveText(conversionFn: any) {
  return () => {
    // Get the current text editor
    const editor = window.activeTextEditor;
    if (!editor) {
        return;
    }

    if (editor) {
        editor.edit(edit => {
        let textRange;
        // if our editor text is not null, grab entire range
        if (!editor.selection.isEmpty) {
            textRange = new Range(editor.selection.start, editor.selection.end);
        }

        const text = editor.document.getText(textRange);
        const converted = conversionFn(text);

        // check our text conversion was successful, i.e. converted not null 
        if (converted) {
            if (!textRange) {
            //  replace editor text with converted
            textRange = new Range(
                editor.document.positionAt(0),
                editor.document.positionAt(text.length)
            );
            }

            edit.replace(textRange, converted);
        }
      }); 
    } 
  };
}

export function activate(context: ExtensionContext) {
  console.log('ARM_YAML extension');

  // create a new word counter
  let conversionManager = new ConversionManager(5);

  context.subscriptions.push(commands.registerCommand('extension.toYAML', updateActiveText(conversionManager.toYAML)));
  context.subscriptions.push(commands.registerCommand('extension.toJSON', updateActiveText(conversionManager.toJSON)));
}

export function deactivate() {
}