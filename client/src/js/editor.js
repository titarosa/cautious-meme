import { getDb, putDb } from './database';
import { header } from './header'; // Import the header

export default class {
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

    // Load content from IndexedDB or set the initial header
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB:', data);
      
      // Check if the retrieved data is an array
      if (Array.isArray(data) && data.length > 0) {
        console.info('Data is an array with length:', data.length);
        
        // Extract content and ensure it's a string
        const contentToSet = data.map(item => item.content || '').join('\n');
        console.info('Combined content to set in editor:', contentToSet);
        
        // Set the editor value
        this.editor.setValue(contentToSet || localData || header);
      } else {
        console.error('Data retrieved is not an array or is empty:', data);
        this.editor.setValue(localData || header);
      }
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when it loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(this.editor.getValue());
    });
  }
}
