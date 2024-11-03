import { getDb, putDb } from './database';
import { header } from './header';

export default class Editor {
  constructor() {
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexedDB.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor:', data);

      // Check if data is an array and extract the relevant string
      const valueToSet = Array.isArray(data) && data.length > 0
        ? JSON.stringify(data, null, 2) // Convert the array to a string for the editor
        : (typeof localData === 'string' ? localData : header);

      this.editor.setValue(valueToSet);
    }).catch(err => {
      console.error('Failed to load data from IndexedDB:', err);
      // Set to header in case of an error
      this.editor.setValue(localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}

