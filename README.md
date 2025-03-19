# PDF Splitter

A simple web-based application that allows you to split large PDF files into smaller ones based on the number of pages per file.

## Features

- Upload large PDF files
- Specify the number of pages per split file
- Automatically download all split PDFs
- Modern and responsive UI
- Progress and status indicators

## How to Use

1. Open `index.html` in a modern web browser
2. Click "Choose PDF File" to select your PDF
3. Enter the desired number of pages per file in the input field
4. Click "Split & Download" to process the PDF
5. The split PDFs will be automatically downloaded with names like "split_1_of_5.pdf"

## Technical Details

- Built with vanilla JavaScript
- Uses pdf-lib.js for PDF manipulation
- No server required - runs entirely in the browser
- Works with modern browsers (Chrome, Firefox, Safari, Edge)

## Browser Support

This application works best in modern browsers that support:
- File API
- Blob API
- ArrayBuffer
- ES6+ JavaScript features

## Note

The application processes PDFs entirely in the browser, so very large files might take some time to process depending on your device's capabilities. 