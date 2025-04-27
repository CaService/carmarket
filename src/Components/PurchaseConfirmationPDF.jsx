import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  checkmark: {
    fontSize: 48,
    marginBottom: 20,
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
  },
  tableHeader: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    padding: 10,
    flex: 1,
  },
  tableCell: {
    padding: 10,
    flex: 1,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bankDetails: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
  },
  bankTitle: {
    fontSize: 16,
    marginBottom: 15,
  },
  footer: {
    marginTop: 30,
    fontSize: 12,
  },
});

const PurchaseConfirmationPDF = ({
  vehicleTitle,
  vehiclePrice,
  auctionNumber,
}) => {
  const calculateVAT = (price) => {
    const basePrice = price / 1.22;
    const vatAmount = price - basePrice;
    return {
      basePrice: basePrice.toFixed(2),
      vatAmount: vatAmount.toFixed(2),
    };
  };

  const { basePrice, vatAmount } = calculateVAT(vehiclePrice);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.title}>Conferma ordine</Text>
        </View>

        <Text>Congratulazioni! Acquisto completato.</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Articolo</Text>
            <Text style={styles.tableHeader}>Prezzo</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1 x {vehicleTitle}</Text>
            <Text style={styles.tableCell}>€ {vehiclePrice},00</Text>
          </View>
        </View>

        <View style={styles.total}>
          <Text>Importo totale</Text>
          <Text>€ {vehiclePrice},00</Text>
        </View>

        <View style={styles.total}>
          <Text>Incluso 22% IVA su € {basePrice}</Text>
          <Text>€ {vatAmount}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text>Ordine #{auctionNumber}</Text>
          <Text>Metodo di pagamento: BONIFICO BANCARIO</Text>
          <Text>
            Congratulazioni, state per concludere l&apos;acquisto con successo.
          </Text>
          <Text>
            Potete proseguire con il pagamento alle seguenti coordinate
            bancarie.
          </Text>
          <Text>Amministrazione Acquisti Veicoli</Text>
          <Text>Ayvens CarMarket</Text>
        </View>

        <View style={styles.bankDetails}>
          <Text style={styles.bankTitle}>COORDINATE BANCARIE</Text>
          <Text>BANCA SELLA</Text>
          <Text>C/C # 1234567890</Text>
          <Text>IBAN IT1234567890</Text>
          <Text>Adriano Tuzzi</Text>
          <Text>Ayvens s.r.l.</Text>
          <Text>Causale: Pagamento Ordine #{auctionNumber}</Text>
        </View>

        <View style={styles.footer}>
          <Text>Ayvens s.r.l.</Text>
          <Text>Via Cividale 356, 33100 Udine UD Italia</Text>
          <Text>vendite@ayvens-carmarket.com</Text>
          <Text>+391234567890</Text>
          <Text>P.IVA/C.F.: 1234567890</Text>
        </View>
      </Page>
    </Document>
  );
};

PurchaseConfirmationPDF.propTypes = {
  vehicleTitle: PropTypes.string.isRequired,
  vehiclePrice: PropTypes.number.isRequired,
  auctionNumber: PropTypes.string.isRequired,
};

export default PurchaseConfirmationPDF;
