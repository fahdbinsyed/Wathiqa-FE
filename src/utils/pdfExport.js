// utils/pdfExport.js
import jsPDF from 'jspdf';

export const exportEmployeeDocuments = (documents, employees) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Employee Documents Report', 20, 30);

  doc.setFontSize(12);
  let yPosition = 50;

  documents.forEach((document, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }

    const employee = employees.find(emp => emp.employeeId === document.employeeId);
    const employeeName = employee ? employee.fullName : 'Unknown';

    doc.text(`Employee: ${employeeName}`, 20, yPosition);
    doc.text(`Document Type: ${document.documentType}`, 20, yPosition + 10);
    doc.text(`Document Number: ${document.documentNumber}`, 20, yPosition + 20);
    doc.text(`Expiry Date: ${new Date(document.expiryDate).toLocaleDateString()}`, 20, yPosition + 30);
    doc.text(`Status: ${document.status}`, 20, yPosition + 40);

    yPosition += 60;
  });

  doc.save('employee_documents.pdf');
};

export const exportCompanyDocuments = (documents) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Company Documents Report', 20, 30);

  doc.setFontSize(12);
  let yPosition = 50;

  documents.forEach((document, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }

    doc.text(`Document Name: ${document.documentName}`, 20, yPosition);
    doc.text(`Document Number: ${document.documentNumber}`, 20, yPosition + 10);
    doc.text(`Branch: ${document.branchName}`, 20, yPosition + 20);
    doc.text(`Expiry Date: ${new Date(document.expiryDate).toLocaleDateString()}`, 20, yPosition + 30);
    doc.text(`Status: ${document.status}`, 20, yPosition + 40);

    yPosition += 60;
  });

  doc.save('company_documents.pdf');
};

export const exportVehicleDocuments = (documents, vehicles) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Vehicle Documents Report', 20, 30);

  doc.setFontSize(12);
  let yPosition = 50;

  documents.forEach((document, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }

    const vehicle = vehicles.find(v => v.vehicleId === document.vehicleId);
    const vehicleInfo = vehicle ? `${vehicle.plateNumber} (${vehicle.vehicleType})` : 'Unknown';

    doc.text(`Vehicle: ${vehicleInfo}`, 20, yPosition);
    doc.text(`Document Type: ${document.documentType}`, 20, yPosition + 10);
    doc.text(`Document Number: ${document.documentNumber}`, 20, yPosition + 20);
    doc.text(`Branch: ${document.branchName}`, 20, yPosition + 30);
    doc.text(`Expiry Date: ${new Date(document.expiryDate).toLocaleDateString()}`, 20, yPosition + 40);
    doc.text(`Status: ${document.status}`, 20, yPosition + 50);

    yPosition += 70;
  });

  doc.save('vehicle_documents.pdf');
};