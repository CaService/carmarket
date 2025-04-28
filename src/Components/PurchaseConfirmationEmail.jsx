import React from "react";
import PropTypes from "prop-types";

const PurchaseConfirmationEmail = ({
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
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333333",
        margin: 0,
        padding: 0,
        backgroundColor: "#FFFFFF",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 10px" }}>
        <div
          style={{
            backgroundColor: "#0F3549",
            padding: "20px",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <img
            src="/images/logo-desktop-ayvens-white.png"
            alt="Ayvens"
            style={{
              maxWidth: "200px",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{ fontSize: "48px", marginBottom: "20px", color: "#333333" }}
          >
            ✓
          </div>
          <h1 style={{ color: "#333333", fontSize: "24px" }}>
            Conferma ordine
          </h1>
        </div>

        <div style={{ padding: "20px" }}>
          <table
            style={{
              width: "100%",
              background: "#000000",
              color: "#FFFFFF",
              margin: "20px 0",
              fontSize: "14px",
            }}
          >
            <tbody>
              <tr>
                <th style={{ padding: "10px", textAlign: "left" }}>Articolo</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Prezzo</th>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "10px",
                    background: "#FFFFFF",
                    color: "#333333",
                  }}
                >
                  1 x {vehicleTitle}
                </td>
                <td
                  style={{
                    padding: "10px",
                    background: "#FFFFFF",
                    color: "#333333",
                  }}
                >
                  € {vehiclePrice},00
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ margin: "10px 0", color: "#333333", fontSize: "14px" }}>
            <strong>Importo totale</strong>
            <span style={{ float: "right" }}>€ {vehiclePrice},00</span>
          </div>
          <div style={{ margin: "10px 0", color: "#333333", fontSize: "14px" }}>
            <span>Incluso 22% IVA su € {basePrice}</span>
            <span style={{ float: "right" }}>€ {vatAmount}</span>
          </div>

          <div style={{ margin: "30px 0", fontSize: "14px" }}>
            <p>
              <strong>Ordine #{auctionNumber}</strong>
            </p>

            <p>
              <strong>Metodo di pagamento:</strong>
              <br />
              BONIFICO BANCARIO
            </p>

            <p>
              Congratulazioni, state per concludere l&apos;acquisto con
              successo.
            </p>

            <p style={{ color: "#5B5BFF" }}>
              Potete proseguire con il pagamento alle seguenti coordinate
              bancarie.
            </p>

            <p>Amministrazione Acquisti Veicoli</p>
            <p>
              <em>Ayvens CarMarket</em>
            </p>
          </div>

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "1px solid #333333",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            <h3 style={{ color: "#333333", marginBottom: "15px" }}>
              COORDINATE BANCARIE
            </h3>
            <p style={{ color: "#333333", marginBottom: "10px" }}>
              BANCA SELLA
              <br />
              C/C # 1234567890
              <br />
              IBAN IT1234567890
            </p>
            <p style={{ color: "#333333", marginBottom: "10px" }}>
              Adriano Tuzzi
              <br />
              Ayvens s.r.l.
            </p>
            <p style={{ color: "#333333", fontWeight: "bold" }}>
              Causale: Pagamento Ordine #{auctionNumber}
            </p>
          </div>

          <div
            style={{ marginTop: "30px", color: "#333333", fontSize: "14px" }}
          >
            <p>
              Ayvens s.r.l.
              <br />
              Via Cividale 356, 33100 Udine UD Italia
              <br />
              vendite@ayvens-carmarket.com
              <br />
              +391234567890
              <br />
              P.IVA/C.F.: 1234567890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PurchaseConfirmationEmail.propTypes = {
  vehicleTitle: PropTypes.string.isRequired,
  vehiclePrice: PropTypes.number.isRequired,
  auctionNumber: PropTypes.string.isRequired,
};

export default PurchaseConfirmationEmail;
