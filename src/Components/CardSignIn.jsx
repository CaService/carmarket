// import { useState } from "react";

// import CardSignInSelector from "./CardSignInSelector";
import Container from "./Container";
import Button from "./Button";
// import { InfoCircledIcon } from "@radix-ui/react-icons";
// import Toggle from "./Toggle";

const CardSignIn = () => {
  // const [isRepresentative, setIsRepresentative] = useState(false);

  // const handleToggleChange = (newState) => {
  //   setIsRepresentative(newState);
  // };

  return (
    <div className="flex flex-col justify-center mt-16 pt-18">
      <Container>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-medium text-teal-500 mb-16 opacity-80">
            Iscriviti per acquistare l&apos;usato Ayvens
          </h1>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
          <form className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-8">
                Società
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="country"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Paese
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="border-b text-xs border-black rounded px-3 py-2 
                           focus:outline-none focus:ring-2"
                  >
                    <option value="">Seleziona il Paese</option>
                    <option value="it">Italia</option>
                    <option value="fr">Francia</option>
                    <option value="de">Germania</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="societa"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Società
                  </label>
                  <input
                    type="text"
                    id="societa"
                    name="societa"
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Ragione sociale"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="iva"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    N. IVA
                  </label>
                  <input
                    type="text"
                    id="iva"
                    name="iva"
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Es. 12345678901"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="indirizzo"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    id="indirizzo"
                    name="indirizzo"
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Es. Via Roma 1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="cap"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Codice Postale
                  </label>
                  <input
                    type="text"
                    id="cap"
                    name="cap"
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Es. 00100"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="citta"
                    className="mb-1 font-semibold text-gray-700"
                  >
                    Città
                  </label>
                  <input
                    type="text"
                    id="citta"
                    name="citta"
                    className="border-b text-xs border-black rounded px-3 py-2
                           focus:outline-none focus:ring-2"
                    placeholder="Es. Roma"
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <div>
                <span className="font-semibold text-gray-700 mb-2 md:mb-0">
                  Sono il rappresentante legale della mia società
                </span>
                <div className="flex items-center space-x-8 mt-4">
                  <span>No</span>
                  <Toggle
                    checked={isRepresentative}
                    onChange={handleToggleChange}
                  />
                  <span>Si</span>
                </div>
              </div>

              <a
                href="#"
                className="flex items-center mt-2 md:mt-0 text-sm text-teal-600 hover:underline whitespace-nowrap"
              >
                <InfoCircledIcon className="w-6 h-6 mr-2" />
                Chi è il legale rappresentante della società?
              </a>
            </div> */}
          </form>
        </div>

        {/* <div className="max-w-2xl mx-auto mt-8">
          <CardSignInSelector />
        </div> */}

        <div className="max-w-2xl mx-auto mt-4 flex justify-center">
          <Button>REGISTRATI</Button>
        </div>
      </Container>
    </div>
  );
};

export default CardSignIn;
