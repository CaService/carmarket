import Container from "./Container";
import Button from "./Button";
import Accordion from "./Accordion";

const PrivacyBody = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-[200px] md:h-[400px] pt-16 relative">
        <img
          src="/images/hero-guy-with-headphones.jpg"
          alt="Privacy Hero"
          className="w-full h-full object-cover"
        />
        <h1 className="font-chillax w-[90%] md:w-1/3 text-2xl md:text-4xl font-medium text-gray-700 absolute top-3/4 left-1/2 md:left-1/4 -translate-x-1/2 -translate-y-1/2 bg-white p-4 md:p-12 rounded-br-4xl">
          Informativa privacy Ayvens Italia
        </h1>
      </div>

      {/* Body Section */}
      <Container>
        <div className="mt-[50px] md:mt-[100px] pt-8 md:pt-16">
          <h2 className="font-chillax font-medium text-gray-700 text-3xl md:text-4xl">
            Informativa privacy Ayvens Italia
          </h2>
          <p className="text-gray-700 text-xl md:text-2xl font-bold w-full md:w-2/3 pt-4 md:pt-8">
            Ultimo aggiornamento: 13-01-2025
          </p>

          {/* Testo principale */}
          <p className="text-gray-700 text-lg md:text-2xl font-medium w-full md:w-2/3 pt-4 md:pt-8">
            Il rispetto della privacy è molto importante per noi e per il Gruppo
            Société Générale a cui appartiene Ayvens . Si tratta di una
            questione prioritaria per noi e per questo abbiamo adottato principi
            particolarmente rigorosi, alla luce soprattutto del Regolamento
            generale sulla protezione dei dati dell&apos;UE. Ayvens S.A. e le
            sue entità affiliate (di seguito &quot;
            <span className="font-bold">Ayvens</span>&quot;) apprezzano la
            fiducia accordata da clienti, fornitori e partner commerciali e si
            impegnano a proteggere i loro dati Personali. Le pratiche di tutela
            della privacy e della sicurezza delle informazioni sono quindi
            componenti integrali dei servizi, della governance aziendale, della
            gestione dei rischi e della responsabilità generale di Ayvens.
            Elaboriamo solo i dati Personali necessari per le nostre attività
            commerciali e per la fornitura dei servizi Ayvens. La presente
            Informativa sulla privacy globale (l&quot;
            <span className="font-bold">Informativa</span>&quot;) descrive le
            nostre pratiche in relazione alle informazioni personali (&quot;
            <span className="font-bold">Dati personali</span>
            &quot;) che elaboriamo sull&apos;utente e sul suo rapporto
            commerciale con Ayvens. Si prega di leggere attentamente la presente
            Informativa globale sulla privacy per comprendere come acquisiamo e
            utilizziamo i Dati personali raccolti. personali raccolti.
          </p>

          {/* Bottone download */}
          <div className="w-full md:w-[800px] pt-4 md:pt-8 cursor-pointer">
            <a
              href="/static/pdf/informativa-privacy-ayvens_13012025.pdf"
              download
              className="inline-block cursor-pointer w-full md:w-auto"
            >
              <Button
                variant="secondary"
                className="text-white font-bold py-2 px-4 rounded cursor-pointer w-full md:w-auto"
              >
                Fare click qui per scaricare l&apos;informativa privacy
              </Button>
            </a>
          </div>

          {/* Indice */}
          <h2 className="font-chillax font-medium text-gray-700 text-4xl md:text-5xl pt-8">
            INDICE
          </h2>
          <ol className="list-decimal list-inside text-gray-700 text-base md:text-lg font-regular w-full md:w-2/3 pt-4 md:pt-8">
            <li className="text-teal-700 underline pt-4">
              <a href="#1">Ambito di applicazione della presente Informativa</a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#2">Chi siamo?</a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#3">Come raccogliamo i dati personali?</a>
            </li>
            <li className="text-teal-700 pt-4">
              <a href="#4">
                Perchè e su quale base giuridica utilizziamo i dati personali?
              </a>
              <div className="ml-6 mt-4">
                <div className="text-teal-700 underline pt-4">
                  <span className="mr-2">4.1</span>
                  <a href="#4.1">DATI RELATIVI AI VISITATORI DEL SITO WEB</a>
                </div>
              </div>
              <div className="ml-6 mt-4">
                <div className="text-teal-700 underline pt-4">
                  <span className="mr-2">4.2</span>
                  <a href="#4.2">DATI RELATIVI AI CLIENTI</a>
                </div>
              </div>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#5">Chi ha accesso ai dati dell&apos;utente?</a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#6">
                Perchè i dati personali possono essere trasferiti a Paesi terzi?
              </a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#7">Privacy dei minorenni</a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#8">
                {" "}
                Utilizziamo i dati dell&apos;utente per altri scopi?
              </a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#9">
                Per quanto tempo conserveremo i dati dell&apos;utente?
              </a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#10">
                Per quanto tempo conserveremo i dati dell&apos;utente?
              </a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#11">Modifiche alla presente informativa</a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#12">Come è possibile contattarci?</a>
            </li>
            <li className="text-teal-700 underline pt-4">
              <a href="#13">
                Come è possibile esercitare i propri diritti sui dati personali?
              </a>
            </li>
          </ol>

          {/* Sezioni di contenuto */}
          <div className="space-y-6 md:space-y-8">
            {/* Titoli delle sezioni */}
            <h2 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-3xl md:text-4xl pt-6 md:pt-8">
              <span>1. </span>
              Ambito di applicazione della presente Informativa
            </h2>

            {/* Liste e paragrafi */}
            <ol className="list-decimal text-gray-700 text-base md:text-lg font-regular w-full md:w-2/3 pt-4 md:pt-8 ml-2 md:ml-4">
              <li className="pt-4">
                <p>
                  Visitatori/utenti del sito web (&quot;
                  <span className="font-bold">Visitatori del sito web</span>
                  &quot;);
                </p>
              </li>
              <li className="pt-4">
                <p>
                  Clienti aziendali (&quot;
                  <span className="font-bold">Clienti</span>
                  &quot;);
                </p>
              </li>
              <li className="pt-4">
                <p>
                  Dipendenti/conducenti dei clienti (&quot;
                  <span className="font-bold">Conducenti</span>
                  &quot;);
                </p>
              </li>
              <li className="pt-4">
                <p>
                  Clienti di leasing privato (inclusi imprenditori individuali e
                  società di persone) (&quot;
                  <span className="font-bold">Clienti di leasing privato</span>
                  &quot;);
                </p>
              </li>
              <li className="pt-4">
                <p>
                  Acquirenti privati di veicoli usati (&quot;
                  <span className="font-bold">Acquirenti</span>
                  &quot;);
                </p>
              </li>
              <li className="pt-4">
                <p>
                  Acquirenti professionali di veicoli usati (&quot;
                  <span className="font-bold">Operatori commerciali</span>
                  &quot;);
                </p>
              </li>
              <li className="pt-4">
                <p>
                  Qualsiasi terza parte, diversa da un cliente, acquirente,
                  operatore commerciale o fornitore, con una relazione
                  commerciale o un&apos;alleanza strategica (&quot;
                  <span className="font-bold">Partner commerciali</span>
                  &quot;). (o potenziale relazione rispetto a quanto sopra;
                  collettivamente denominati anche &quot;
                  <span className="font-bold">utente</span>
                  &quot;, &quot;
                  <span className="font-bold">suo/sua/suoi/sue</span>
                  &quot;.
                </p>
              </li>
            </ol>

            {/* Accordion sections */}
            <div className="w-full pt-4 md:pt-8">
              <Accordion title="4.1.1 SITI WEB">
                <div>
                  <h4 className="font-bold text-navy-700 mb-4">
                    4.1.1.a Per comunicare con l&apos;utente
                  </h4>

                  <p className="italic">Cosa comporta questa finalità?</p>
                  <p className="mb-4">
                    Elaboriamo i Dati personali dell&apos;utente quando ci
                    contatta tramite uno dei nostri moduli online, ad esempio
                    quando ci invia domande, suggerimenti, complimenti o reclami
                    oppure quando richiede un preventivo per i nostri Servizi.
                    Questo trattamento viene effettuato per la conclusione o
                    l&apos;esecuzione di un contratto in essere con noi, per
                    poter di un contratto in essere con noi, per poter
                    rispondere a una richiesta o in base al consenso prestato.
                  </p>

                  <p className="italic mb-4">
                    Quali Dati personali trattiamo per conseguire questa
                    finalità?
                  </p>
                  <p className="mb-4">
                    Per conseguire questa finalità, potremmo raccogliere i dati
                    di contatto (aziendali) dell&apos;utente (ad esempio nome e
                    cognome, indirizzo e-mail, numero di telefono), numero di
                    targa o di registrazione e qualsiasi altra informazione che
                    l&apos;utente ci fornisce nei campi di testo libero del
                    modulo di contatto, dove può, ad esempio, inserire domande o
                    suggerimenti, esprimere il suo apprezzamento o condividere
                    un reclamo.
                  </p>

                  <p className="italic mb-4">
                    Con chi condividiamo i Dati personali dell&apos;utente?
                  </p>
                  <p className="mb-4">
                    Vedere la sezione 5 &quot;
                    <a href="#5" className="text-teal-700 underline">
                      Chi ha accesso ai dati dell&apos;utente?
                    </a>
                    &quot;.
                  </p>

                  <h4 className="font-bold text-navy-700 mb-4 pt-8">
                    4.1.1.b Per sondaggi o altre comunicazioni (di marketing)
                  </h4>
                  <p className="italic">Cosa comporta questa finalità?</p>
                  <p className="mb-4">
                    Trattiamo i Dati personali dell&apos;utente quando completa
                    un sondaggio sul nostro sito web o tramite un altro
                    strumento, per ottenere un feedback sui nostri siti web e/o
                    servizi, con il suo consenso o qualora abbiamo un legittimo
                    interesse a trattare tali dati (miglioramento dei servizi).
                    Con il suo consenso o laddove abbiamo un legittimo
                    interesse, potremmo inviare all&apos;utente comunicazioni di
                    marketing per tenerlo aggiornato su eventi, offerte
                    speciali, promozioni e prodotti e servizi attuali e futuri
                    di Ayvens. Quando contattiamo l&apos;utente per sondaggi o
                    comunicazioni di marketing, lo faremo tramite e-mail, al
                    telefono o per posta (newsletter/opuscoli/riviste). Se
                    l&apos;utente non desidera più ricevere sondaggi o
                    comunicazioni di marketing, è pregato di utilizzare le
                    opzioni di revoca del consenso contenute nella relativa
                    comunicazione o contattare la sede Ayvens locale tramite il
                    rispettivo modulo web sui diritti degli interessati,
                    disponibile sul sito web locale, oppure consultare le
                    informazioni di contatto generali riportate di seguito. In
                    seguito alla sua visita a un sito web di Ayvens, potremo
                    mostrare all&apos;utente annunci pubblicitari personalizzati
                    al di fuori del sito web di Ayvens. Per comprendere cosa è
                    rilevante per l&apos;utente, possiamo utilizzare strumenti
                    manuali e automatizzati per analizzare le sue informazioni
                    personali.
                  </p>
                  <p className="italic">
                    Quali Dati personali trattiamo per conseguire questa
                    finalità?
                  </p>
                  <p className="mb-4">
                    Per conseguire questa finalità, trattiamo nome e cognome,
                    indirizzo, indirizzo e-mail dell&apos;utente e argomenti che
                    potrebbero interessargli (come eventualmente indicato
                    dall&apos;utente sul nostro sito web).
                  </p>
                  <p className="italic">
                    Con chi condividiamo i Dati personali dell&apos;utente?
                  </p>
                  <p className="mb-4">
                    Vedere la sezione 5 &quot;
                    <a href="#5" className="text-teal-700 underline">
                      Chi ha accesso ai dati dell&apos;utente?
                    </a>
                    &quot;.
                  </p>
                </div>
              </Accordion>

              <Accordion title="4.1.2 SOCIAL MEDIA">
                <div>
                  <h4 className="font-bold text-navy-700 mb-4">
                    4.1.2.a Per agevolare la funzionalità di condivisione
                    sociale
                  </h4>

                  <p className="italic">Cosa comporta questa finalità?</p>
                  <p className="mb-4">
                    I nostri siti web possono contenere varie funzionalità di
                    condivisione sui social media, come i pulsanti LinkedIn,
                    Facebook o Snapchat, che, con il suo consenso, l&apos;utente
                    può utilizzare per condividere le informazioni fornite sui
                    nostri siti web con i social media di sua scelta. I nostri
                    siti web potrebbero contenere anche link alle nostre pagine
                    social, come LinkedIn o Facebook oppure il nostro feed X,
                    che l&apos;utente può utilizzare per pubblicare il suo
                    feedback. può utilizzare per pubblicare il suo feedback.
                  </p>

                  <p className="mb-4">
                    Allo stesso modo, vari siti web di social media, come
                    LinkedIn, Facebook, Snapchat o X, potrebbero contenere
                    annunci pubblicitari di Ayvens con link ai nostri siti web.
                    Questi siti di social media possono, con il consenso
                    dell&apos;utente, condividere con noi le informazioni
                    fornite dall&apos;utente quando fa clic su un link a uno dei
                    nostri siti web.
                  </p>
                  <p className="mb-4">
                    Non siamo responsabili delle politiche e delle prassi di
                    raccolta, utilizzo e divulgazione (incluse le prassi di
                    sicurezza dei dati) di altre organizzazioni, quali Meta
                    (Facebook), X, Apple, Google, Microsoft, RIM o qualsiasi
                    altro sviluppatore di app, fornitore di app, fornitore di
                    piattaforme di social media, fornitore di sistemi operativi,
                    fornitore di servizi wireless o produttore di dispositivi,
                    comprese le informazioni personali che l&apos;utente
                    comunica ad altre organizzazioni tramite o in relazione alle
                    nostre funzionalità di social media e/o pubblicità. Il
                    trattamento dei Dati personali è soggetto alle politiche e
                    alle prassi sulla privacy di tali organizzazioni.
                  </p>

                  <p className="italic">
                    Quali Dati personali trattiamo per conseguire questa
                    finalità?
                  </p>
                  <p className="mb-4">
                    Per conseguire questa finalità, trattiamo nome e cognome,
                    indirizzo e-mail, indirizzo IP, foto, elenco dei contatti
                    sui social media e qualsiasi altra informazione
                    dell&apos;utente a cui potremmo avere accesso tramite le
                    funzionalità dei social media.
                  </p>

                  <p className="italic">
                    Quali Dati personali trattiamo per conseguire questa
                    finalità?
                  </p>
                  <p className="mb-4">
                    Vedere la sezione 5 &quot;
                    <a href="#5" className="text-teal-700 underline">
                      Chi ha accesso ai dati dell&apos;utente?
                    </a>
                    &quot;.
                  </p>
                </div>
              </Accordion>

              <Accordion title="4.1.3 COOKIE E TECNOLOGIE SIMILI">
                <div>
                  <p className="mb-4">
                    Qualsiasi trattamento dei Dati personali dell&apos;utente
                    tramite cookie e/o tecnologie simili avverrà in conformità
                    alla nostra informativa sui cookie, disponibile su
                    ayvens.com o sul sito web locale dell&apos;entità Ayvens
                    interessata.
                  </p>
                </div>
              </Accordion>

              <Accordion title="4.1.4 FINALITÁ COMMERCIALI DI AYVENS">
                <div>
                  <h4 className="font-bold text-navy-700 mb-4">
                    4.1.4.a Reporting gestionale
                  </h4>

                  <p className="italic">Cosa comporta questa finalità?</p>
                  <p className="mb-4">
                    Dati personali utilizzati per varie finalità commerciali di
                    Ayvens per le quali abbiamo un legittimo interesse al loro
                    trattamento, ad esempio attività di audit, sviluppo di nuovi
                    prodotti, potenziamento, miglioramento o modifica dei nostri
                    siti web e Servizi, analisi dei dati, identificazione delle
                    tendenze di utilizzo, determinazione dell&apos;efficacia
                    delle nostre campagne promozionali e gestione ed espansione
                    delle nostre attività commerciali.
                  </p>

                  <p className="mb-4">
                    Per agevolare l&apos;utilizzo dei nostri Servizi o
                    applicazioni online da parte dell&apos;utente, potremmo
                    analizzare i dati che raccogliamo tramite i nostri media
                    digitali e associarli a informazioni raccolte tramite i
                    cookie. Ad esempio, per capire meglio quale canale digitale
                    (ricerca Google, e-mail, social media) o dispositivo
                    (desktop, tablet o cellulare) preferisce l&apos;utente,
                    possiamo ottimizzare o limitare le nostre attività di
                    comunicazione e marketing in base al canale e al
                    dispositivo.
                  </p>
                  <p className="italic">
                    Quali Dati personali trattiamo per conseguire questa
                    finalità?
                  </p>
                  <p className="mb-4">
                    Per conseguire questa finalità, potremmo trattare nome e
                    cognome, indirizzo e-mail, indirizzo IP, sesso, data di
                    nascita, luogo di residenza, cifre del codice postale e
                    qualsiasi altra informazione dell&apos;utente inclusa nella
                    presente Informativa o altrimenti fornitaci dall&apos;utente
                    stesso, se ciò dovesse essere necessario per conseguire una
                    delle finalità descritte nel paragrafo precedente.
                  </p>

                  <p className="italic">
                    Con chi condividiamo i Dati personali dell&apos;utente?
                  </p>
                  <p className="mb-4">
                    Vedere la sezione 5 &quot;
                    <a href="#5" className="text-teal-700 underline">
                      Chi ha accesso ai dati dell&apos;utente?
                    </a>
                    &quot;.
                  </p>

                  <h4 className="font-bold text-navy-700 mb-4">
                    4.1.4.b Rispetto delle leggi e degli obblighi legali e
                    tutela dei beni e degli interessi di Ayvens
                  </h4>

                  <p className="italic">Cosa comporta questa finalità?</p>
                  <p className="mb-4">
                    Per ottemperare a un obbligo legale o laddove abbiamo un
                    legittimo interesse, elaboriamo i Dati personali
                    dell&apos;utente come appropriato o necessario: <br></br>{" "}
                    (a) ai sensi della legge in vigore, comprese le leggi
                    vigenti al di fuori del Paese di residenza dell&apos;utente
                    e le raccomandazioni settoriali; <br></br> (b) per
                    assicurare la conformità a procedimenti legali; <br></br>{" "}
                    (c) per adempiere a richieste delle autorità pubbliche e
                    governative, comprese quelle al di fuori del Paese di
                    residenza dell&apos;utente;
                    <br></br> (d) per far rispettare i nostri termini e
                    condizioni e le altre politiche <br></br> applicabili;{" "}
                    <br></br>
                    (e) per proteggere le nostre operazioni; <br></br> (f) per
                    proteggere i nostri diritti, la nostra privacy, la nostra
                    sicurezza o le nostre proprietà, e/o quelle delle nostre
                    affiliate, e per proteggere l&apos;utente o altri soggetti;
                    <br></br> (g) per consentirci di perseguire i rimedi
                    disponibili o <br></br> limitare i danni che potremmo
                    subire. limitare i danni che potremmo subire.
                  </p>

                  <p className="italic">
                    Quali Dati personali trattiamo per conseguire questa
                    finalità?
                  </p>
                  <p className="mb-4">
                    Per conseguire questa finalità, trattiamo dati quali nome e
                    cognome, informazioni di contatto, corrispondenza con
                    Ayvens, utilizzo di uno qualsiasi dei nostri Servizi e
                    qualsiasi altra informazione dell&apos;utente inclusa nella
                    presente Informativa o altrimenti fornitaci dall&apos;utente
                    stesso, se ciò dovesse essere necessario per conseguire una
                    delle finalità descritte nel paragrafo precedente.
                  </p>

                  <p className="italic">
                    Con chi condividiamo i Dati personali dell&apos;utente?
                  </p>
                  <p className="mb-4">
                    Solo se richiesto dalla legge o da una raccomandazione
                    settoriale a cui Ayvens è soggetta, oppure se abbiamo un
                    legittimo interesse in tal senso, i Dati personali
                    dell&apos;utente saranno forniti a enti di vigilanza,
                    autorità fiscali e agenzie investigative. Vedere la sezione
                    5 &quot;
                    <a href="#5" className="text-teal-700 underline">
                      Chi ha accesso ai dati dell&apos;utente?
                    </a>
                    &quot;.
                  </p>
                </div>
              </Accordion>
            </div>
          </div>

          {/* Footer sections */}
          <div className="space-y-6 md:space-y-8 pb-16 md:pb-32">
            {/* ... sezioni finali ... */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyBody;
