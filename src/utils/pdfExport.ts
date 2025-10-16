import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportOptions {
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
  quality?: number;
  margin?: number;
}

// Export element to PDF
export const exportToPDF = async (
  elementId: string,
  options: ExportOptions = {}
): Promise<void> => {
  const {
    filename = 'dashboard-export',
    format = 'a4',
    orientation = 'portrait',
    quality = 1,
    margin = 10,
  } = options;

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Create canvas from element
    const canvas = await html2canvas(element, {
      scale: quality,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    // Add first page
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - margin * 2);

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - margin * 2);
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

// Export data to CSV
export const exportToCSV = (
  data: any[],
  filename = 'data-export',
  headers?: string[]
): void => {
  try {
    if (!data || data.length === 0) {
      throw new Error('No data to export');
    }

    // Get headers from first object if not provided
    const csvHeaders = headers || Object.keys(data[0]);
    
    // Create CSV content
    const csvContent = [
      csvHeaders.join(','),
      ...data.map(row => 
        csvHeaders.map(header => {
          const value = row[header];
          // Escape commas and quotes in values
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw error;
  }
};

// Print current page
export const printPage = (): void => {
  window.print();
};

// Export chart as image
export const exportChartAsImage = async (
  chartElementId: string,
  filename = 'chart',
  format: 'png' | 'jpeg' = 'png'
): Promise<void> => {
  try {
    const element = document.getElementById(chartElementId);
    if (!element) {
      throw new Error(`Chart element with ID "${chartElementId}" not found`);
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  } catch (error) {
    console.error('Error exporting chart as image:', error);
    throw error;
  }
};

// Generate PDF report with multiple sections
export const generateReport = async (
  sections: { elementId: string; title: string }[],
  options: ExportOptions = {}
): Promise<void> => {
  const {
    filename = 'dashboard-report',
    format = 'a4',
    orientation = 'portrait',
    margin = 15,
  } = options;

  try {
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Add title page
    pdf.setFontSize(24);
    pdf.text('Dashboard Report', pdfWidth / 2, 30, { align: 'center' });
    pdf.setFontSize(12);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pdfWidth / 2, 45, { align: 'center' });

    let isFirstSection = true;

    for (const section of sections) {
      const element = document.getElementById(section.elementId);
      if (!element) {
        console.warn(`Element with ID "${section.elementId}" not found, skipping section`);
        continue;
      }

      if (!isFirstSection) {
        pdf.addPage();
      } else {
        isFirstSection = false;
      }

      // Add section title
      pdf.setFontSize(16);
      pdf.text(section.title, margin, margin + 20);

      // Capture section as image
      const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdfWidth - (margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', margin, margin + 30, imgWidth, imgHeight);
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};
