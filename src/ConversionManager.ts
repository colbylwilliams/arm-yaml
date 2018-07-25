import { window } from 'vscode';

const yaml = require('js-yaml');

// responsible for conversion functions
export class ConversionManager {
    _tabSize: number = 5;

    constructor(tabSize: number) {
        this._tabSize = tabSize;
    }

    public toYAML(text: string): string {
        try {
            let json = JSON.parse(text);
            return yaml.safeDump(json, () => { return this._tabSize;});
        } 
        catch (e) {
            window.showErrorMessage('JSON.parse failed. Text contains invalid JSON.');
            console.error(e);
        }
    
        return "";
    }
    
    public toJSON(text: string): string {
        try {
            let json = yaml.safeLoad(text, {schema: yaml.JSON_SCHEMA});
            return JSON.stringify(json, null, this._tabSize);
        } catch (e) {
            window.showErrorMessage('yaml.safeLoad Failed. Text contains invalid YAML.');
            console.error(e);
        }
    
        return "";
    }
}