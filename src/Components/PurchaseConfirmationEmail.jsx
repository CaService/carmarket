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
        color: "#333",
        margin: 0,
        padding: 0,
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>✓</div>
          <h1>Conferma ordine</h1>
        </div>

        <div style={{ padding: "20px" }}>
          <p>Congratulazioni! Acquisto completato.</p>

          <table
            style={{
              width: "100%",
              background: "#000",
              color: "white",
              margin: "20px 0",
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
                    background: "white",
                    color: "#333",
                  }}
                >
                  1 x {vehicleTitle}
                </td>
                <td
                  style={{
                    padding: "10px",
                    background: "white",
                    color: "#333",
                  }}
                >
                  € {vehiclePrice},00
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ margin: "10px 0" }}>
            <strong>Importo totale</strong>
            <span style={{ float: "right" }}>€ {vehiclePrice},00</span>
          </div>
          <div style={{ margin: "10px 0" }}>
            <span>Incluso 22% IVA su € {basePrice}</span>
            <span style={{ float: "right" }}>€ {vatAmount}</span>
          </div>

          <div style={{ margin: "30px 0" }}>
            <p>
              <strong>Ordine #{auctionNumber}</strong>
            </p>

            <p>
              <strong>Metodo di pagamento:</strong>
              <br />
              Bonifico bancario.
            </p>

            <p>Congratulazioni, avete concluso l&apos;acquisto con successo.</p>

            <p style={{ color: "#5b5bff" }}>
              Riceverete comunicazione via e-mail con la fattura proforma per
              procedere al saldo
            </p>

            <p>Amministrazione acquisti veicoli</p>
            <p>
              <em>Ayvens Carmarket Buy Now</em>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <div style={{ width: "48%" }}>
              <h3>Estremi di pagamento</h3>
              <p>
                Adriano Tuzzi
                <br />
                Ayvens s.r.l.
                <br />
                VIA CIVIDALE 356 60
                <br />
                33100 UDINE UD
                <br />
                Italia
              </p>

              <p>
                Email: noreply@carmarket-ayvens.com
                <br />
                Telefono: +391234567890
                <br />
                P.IVA/C.F.: 0123456789
                <br />
                Codice Fiscale: IT00605220326
              </p>
            </div>

            <div style={{ width: "48%" }}>
              <h3>Indirizzo di spedizione</h3>
              <p>
                maurizio ballarin
                <br />
                aerrecar s.r.l.
                <br />
                VIA SAN FRANCESCO D&apos;ASSISI 60
                <br />
                34133 TRIESTE TS
                <br />
                Italia
              </p>
            </div>
          </div>

          <div style={{ marginTop: "30px", fontSize: "14px" }}>
            <p>
              <a href="#" style={{ color: "#5b5bff", textDecoration: "none" }}>
                Visualizza il tuo ordine online
              </a>{" "}
              per aggiornamenti.
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
