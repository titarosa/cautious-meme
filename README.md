# J.A.T.E (Just Another Text Editor)

## Description

J.A.T.E is a simple text editor application that utilizes IndexedDB to store user content persistently. It features a code editor interface powered by CodeMirror, allowing users to write and save code snippets efficiently.

## Features

- **Rich Text Editing**: Supports JavaScript syntax highlighting and line numbering.
- **Persistent Storage**: Uses IndexedDB to save and retrieve content, ensuring data is not lost on page refresh.
- **Offline Capabilities**: The editor works seamlessly even without an internet connection.
- **User-Friendly Interface**: Provides a clean and simple UI for editing text.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Libraries**: 
  - [CodeMirror](https://codemirror.net/) for the code editor interface
  - [idb](https://github.com/jakearchibald/idb) for IndexedDB interactions
- **Backend**: Node.js with Express for serving the application

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. Navigate to the client directory:
- -mcd client

3. Install dependencies:
- npm install

4. Build the application:
- npm run build

5. Start the server:
- mnpm start
- Open your browser and go to http://localhost:3000.

### Database Structure
- IndexedDB
- The application uses IndexedDB to store user content. The database is structured as follows:

- Database Name: jate
- Object Store: jate
- Key Path: id (auto-incremented)
- Value: An object containing user content (e.g., { content: "..." })



### Usage
- When you open the application, it loads any previously saved content from IndexedDB.
- You can edit the text in the editor, and changes are saved automatically when the editor loses focus.
- The header with "Just Another Text Editor" is displayed as part of the default content.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

markdown
Copy code

### Customization Tips

- Replace `<repository-url>` and `<repository-directory>` with your actual repository URL and directory name.
- Adjust the descriptions and features to reflect any additional functionalities or specifics of your project.
- If you have any additional setup or usage instructions, feel free to add them.
