// CreatePDF.tsx
import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./CreatePDF.css";

const CreatePDF: React.FC = () => {
  const generatePDF = () => {
    const input = document.getElementById("report-container");

    if (!input) {
      console.error("No se encontró el contenedor del reporte");
      return;
    }

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", margin, 20, imgWidth, imgHeight);
      pdf.save("Reporte.pdf");
    });
  };

  return (
    <button className="pdf-button" onClick={generatePDF}>
      Descargar Reporte en PDF
    </button>
  );
};

export default CreatePDF;
