import { LucideDownload } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import YouthComputing from "../../assets/YouthComputing.png";

export default function ExportPDF({ rapport }) {
  const handleExportPDF = () => {
    // Toujours travailler avec un tableau
    const rapportsArray = Array.isArray(rapport) ? rapport : [rapport];

    const doc = new jsPDF();

    rapportsArray.forEach((rapportItem, index) => {
      const data = JSON.parse(rapportItem.contenu);

      // Nouvelle page sauf pour la première
      if (index > 0) doc.addPage();

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      /* ---------- HEADER ---------- */
      doc.addImage(
        YouthComputing,
        "PNG",
        pageWidth - 30,
        10,
        20,
        20
      );

      doc.setFontSize(18);
      doc.text("Rapport Mensuel", 14, 25);

      const periodeLabel = `${new Date(
        data.periode.debut
      ).toLocaleDateString()} → ${new Date(
        data.periode.fin
      ).toLocaleDateString()}`;

      doc.setFontSize(11);
      doc.text(`Période : ${periodeLabel}`, 14, 35);

      /* ---------- TABLE ---------- */
      autoTable(doc, {
        startY: 45,
        head: [[
          "Total emprunts",
          "En cours",
          "En retard",
          "Retournés",
          "Consommation",
          "Stock dispo"
        ]],
        body: [[
          data.emprunts.total,
          data.emprunts.enCours,
          data.emprunts.enRetard,
          data.emprunts.retournes,
          data.consommation.quantiteTotaleUtilisee,
          data.stock.consommablesDisponibles,
        ]],
        styles: {
          fontSize: 10,
          halign: "center",
        },
        headStyles: {
          fillColor: [241, 53, 68],
          textColor: 255,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      /* ---------- FOOTER ---------- */
      doc.setFontSize(9);
      doc.text(
        `Généré le ${new Date().toLocaleDateString()}`,
        14,
        pageHeight - 10
      );
    });

    doc.save("rapport-mensuel.pdf");
  };

  return (
    <button
      onClick={handleExportPDF}
      className="p-1 rounded dark:text-white border border-gray-100 dark:border-gray-900 hover:text-fuchsia hover:border-fuchsia"
      title="Exporter le rapport en PDF"
    >
      <LucideDownload />
    </button>
  );
}
