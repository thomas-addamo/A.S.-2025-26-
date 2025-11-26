// We are using the global pdfjsLib loaded via CDN in index.html to avoid complex build setups for the worker
declare const pdfjsLib: any;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    const totalPages = pdf.numPages;

    // Limit to first 10 pages to avoid hitting token limits too quickly in this demo
    const maxPages = Math.min(totalPages, 10);

    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw new Error("Impossibile leggere il file PDF. Assicurati che non sia protetto da password.");
  }
};