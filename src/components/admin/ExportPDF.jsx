import { LucideDownload } from "lucide-react";
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable";
import YouthComputing from "../../assets/YouthComputing.png";

export default function ExportPDF({ rapports }) {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    const imgWidth = 20;
    const imgHeight = 20;
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.addImage(
      YouthComputing,
      "PNG",
      pageWidth - imgWidth - 10,
      10,                        
      imgWidth,
      imgHeight
    );

    // Title
    doc.setFontSize(20);
    doc.text("Rapports Mensuels", 14, 52);

    const tableColumn = ["ID", "Période", "Utilisation équipements", "Consommation Totale", "Stock Disponible"];
    const tableRows = [];

    rapports.forEach((rapport, index) => {
      const data = JSON.parse(rapport.contenu);
      const row = [
        index + 1,
        data.periode,
        data.utilisationEquipements,
        data.consommationTotale,
        data.stockDisponible
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },

      // Header color
      headStyles: {
        fillColor: [241, 53, 68],  
        textColor: [255, 255, 255],
        halign: "center",
      },

      // Lignes alternées
      alternateRowStyles: {
        fillColor: [250, 230, 233],
      },

      // Centrer ou aligner
      columnStyles: {
        0: { halign: "center" },
        1: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" },
        4: { halign: "center" },
      }
    });

    doc.save("rapports.pdf");
  };

  return (
    <button
      onClick={handleExportPDF}
      className="p-1 rounded dark:text-white border border-gray-100 dark:border-gray-900 hover:text-fuchsia hover:border-fuchsia"
    >
      <LucideDownload />
    </button>
  );
}
