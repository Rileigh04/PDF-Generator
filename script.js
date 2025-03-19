document.addEventListener('DOMContentLoaded', () => {
    const pdfInput = document.getElementById('pdfInput');
    const pagesPerFileInput = document.getElementById('pagesPerFile');
    const splitButton = document.getElementById('splitButton');
    const statusDiv = document.getElementById('status');

    let pdfBytes = null;

    pdfInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            pdfBytes = await file.arrayBuffer();
            splitButton.disabled = false;
            showStatus('File loaded successfully!', 'success');
        } catch (error) {
            showStatus('Error loading file. Please try again.', 'error');
            splitButton.disabled = true;
        }
    });

    splitButton.addEventListener('click', async () => {
        if (!pdfBytes) return;

        const pagesPerFile = parseInt(pagesPerFileInput.value);
        if (pagesPerFile < 1) {
            showStatus('Please enter a valid number of pages.', 'error');
            return;
        }

        try {
            splitButton.disabled = true;
            showStatus('Processing PDF...', 'success');

            const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
            const totalPages = pdfDoc.getPageCount();
            const numFiles = Math.ceil(totalPages / pagesPerFile);

            for (let i = 0; i < numFiles; i++) {
                const startPage = i * pagesPerFile;
                const endPage = Math.min(startPage + pagesPerFile, totalPages);
                
                const newPdfDoc = await PDFLib.PDFDocument.create();
                
                for (let j = startPage; j < endPage; j++) {
                    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [j]);
                    newPdfDoc.addPage(copiedPage);
                }

                const newPdfBytes = await newPdfDoc.save();
                const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = `split_${i + 1}_of_${numFiles}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }

            showStatus(`Successfully split PDF into ${numFiles} files!`, 'success');
        } catch (error) {
            showStatus('Error processing PDF. Please try again.', 'error');
        } finally {
            splitButton.disabled = false;
        }
    });

    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
    }
}); 