import Container from "./Container";
import Button from "./Button";
import Accordion from "./Accordion";

const PrivacyBody = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-[250px] md:h-[400px] pt-16 relative">
        <img
          src="/images/hero-guy-with-headphones.jpg"
          alt="Privacy Hero"
          className="w-full h-full object-cover"
        />
        <h1 className="font-chillax w-[85%] md:w-1/3 text-2xl md:text-4xl font-medium text-gray-700 absolute top-3/4 left-1/2 md:left-1/4 -translate-x-1/2 -translate-y-1/2 bg-white p-4 md:p-12 rounded-br-4xl md:ml-8">
          Informativa privacy Ayvens Italia
        </h1>
      </div>

      {/* Body Section */}
      <Container>
        <div className="mt-[50px] md:mt-[100px] pt-8 md:pt-16">
          <h2 className="font-chillax font-medium text-gray-700 text-2xl md:text-4xl">
            Informativa privacy Ayvens Italia
          </h2>
          <p className="text-gray-700 text-xl md:text-2xl font-bold w-full md:w-2/3 pt-4 md:pt-8">
            Ultimo aggiornamento: 13-01-2025
          </p>
          <p className="text-gray-700 text-base md:text-2xl font-medium w-full md:w-2/3 pt-4 md:pt-8">
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

          <div className="w-full md:w-[800px] pt-4 md:pt-8 cursor-pointer">
            <a
              href="/static/pdf/informativa-privacy-ayvens_13012025.pdf"
              download
              className="inline-block cursor-pointer"
            >
              <Button
                variant="secondary"
                className="text-white font-bold py-2 px-4 rounded cursor-pointer w-full md:w-auto"
              >
                Fare click qui per scaricare l&apos;informativa privacy
              </Button>
            </a>
          </div>

          <h2 className="font-chillax font-medium text-gray-700 text-3xl md:text-5xl pt-6 md:pt-8">
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

          {/* Sezioni numerate */}
          <h2 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
            <span>1. </span>
            Ambito di applicazione della presente Informativa
          </h2>

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
                operatore commerciale o fornitore, con una relazione commerciale
                o un&apos;alleanza strategica (&quot;
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
                  l&apos;esecuzione di un contratto in essere con noi, per poter
                  di un contratto in essere con noi, per poter rispondere a una
                  richiesta o in base al consenso prestato.
                </p>

                <p className="italic mb-4">
                  Quali Dati personali trattiamo per conseguire questa finalità?
                </p>
                <p className="mb-4">
                  Per conseguire questa finalità, potremmo raccogliere i dati di
                  contatto (aziendali) dell&apos;utente (ad esempio nome e
                  cognome, indirizzo e-mail, numero di telefono), numero di
                  targa o di registrazione e qualsiasi altra informazione che
                  l&apos;utente ci fornisce nei campi di testo libero del modulo
                  di contatto, dove può, ad esempio, inserire domande o
                  suggerimenti, esprimere il suo apprezzamento o condividere un
                  reclamo.
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
                  Trattiamo i Dati personali dell&apos;utente quando completa un
                  sondaggio sul nostro sito web o tramite un altro strumento,
                  per ottenere un feedback sui nostri siti web e/o servizi, con
                  il suo consenso o qualora abbiamo un legittimo interesse a
                  trattare tali dati (miglioramento dei servizi). Con il suo
                  consenso o laddove abbiamo un legittimo interesse, potremmo
                  inviare all&apos;utente comunicazioni di marketing per tenerlo
                  aggiornato su eventi, offerte speciali, promozioni e prodotti
                  e servizi attuali e futuri di Ayvens. Quando contattiamo
                  l&apos;utente per sondaggi o comunicazioni di marketing, lo
                  faremo tramite e-mail, al telefono o per posta
                  (newsletter/opuscoli/riviste). Se l&apos;utente non desidera
                  più ricevere sondaggi o comunicazioni di marketing, è pregato
                  di utilizzare le opzioni di revoca del consenso contenute
                  nella relativa comunicazione o contattare la sede Ayvens
                  locale tramite il rispettivo modulo web sui diritti degli
                  interessati, disponibile sul sito web locale, oppure
                  consultare le informazioni di contatto generali riportate di
                  seguito. In seguito alla sua visita a un sito web di Ayvens,
                  potremo mostrare all&apos;utente annunci pubblicitari
                  personalizzati al di fuori del sito web di Ayvens. Per
                  comprendere cosa è rilevante per l&apos;utente, possiamo
                  utilizzare strumenti manuali e automatizzati per analizzare le
                  sue informazioni personali.
                </p>
                <p className="italic">
                  Quali Dati personali trattiamo per conseguire questa finalità?
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
                  4.1.2.a Per agevolare la funzionalità di condivisione sociale
                </h4>

                <p className="italic">Cosa comporta questa finalità?</p>
                <p className="mb-4">
                  I nostri siti web possono contenere varie funzionalità di
                  condivisione sui social media, come i pulsanti LinkedIn,
                  Facebook o Snapchat, che, con il suo consenso, l&apos;utente
                  può utilizzare per condividere le informazioni fornite sui
                  nostri siti web con i social media di sua scelta. I nostri
                  siti web potrebbero contenere anche link alle nostre pagine
                  social, come LinkedIn o Facebook oppure il nostro feed X, che
                  l&apos;utente può utilizzare per pubblicare il suo feedback.
                  può utilizzare per pubblicare il suo feedback.
                </p>

                <p className="mb-4">
                  Allo stesso modo, vari siti web di social media, come
                  LinkedIn, Facebook, Snapchat o X, potrebbero contenere annunci
                  pubblicitari di Ayvens con link ai nostri siti web. Questi
                  siti di social media possono, con il consenso
                  dell&apos;utente, condividere con noi le informazioni fornite
                  dall&apos;utente quando fa clic su un link a uno dei nostri
                  siti web.
                </p>
                <p className="mb-4">
                  Non siamo responsabili delle politiche e delle prassi di
                  raccolta, utilizzo e divulgazione (incluse le prassi di
                  sicurezza dei dati) di altre organizzazioni, quali Meta
                  (Facebook), X, Apple, Google, Microsoft, RIM o qualsiasi altro
                  sviluppatore di app, fornitore di app, fornitore di
                  piattaforme di social media, fornitore di sistemi operativi,
                  fornitore di servizi wireless o produttore di dispositivi,
                  comprese le informazioni personali che l&apos;utente comunica
                  ad altre organizzazioni tramite o in relazione alle nostre
                  funzionalità di social media e/o pubblicità. Il trattamento
                  dei Dati personali è soggetto alle politiche e alle prassi
                  sulla privacy di tali organizzazioni.
                </p>

                <p className="italic">
                  Quali Dati personali trattiamo per conseguire questa finalità?
                </p>
                <p className="mb-4">
                  Per conseguire questa finalità, trattiamo nome e cognome,
                  indirizzo e-mail, indirizzo IP, foto, elenco dei contatti sui
                  social media e qualsiasi altra informazione dell&apos;utente a
                  cui potremmo avere accesso tramite le funzionalità dei social
                  media.
                </p>

                <p className="italic">
                  Quali Dati personali trattiamo per conseguire questa finalità?
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
                  alla nostra informativa sui cookie, disponibile su ayvens.com
                  o sul sito web locale dell&apos;entità Ayvens interessata.
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
                  tendenze di utilizzo, determinazione dell&apos;efficacia delle
                  nostre campagne promozionali e gestione ed espansione delle
                  nostre attività commerciali.
                </p>

                <p className="mb-4">
                  Per agevolare l&apos;utilizzo dei nostri Servizi o
                  applicazioni online da parte dell&apos;utente, potremmo
                  analizzare i dati che raccogliamo tramite i nostri media
                  digitali e associarli a informazioni raccolte tramite i
                  cookie. Ad esempio, per capire meglio quale canale digitale
                  (ricerca Google, e-mail, social media) o dispositivo (desktop,
                  tablet o cellulare) preferisce l&apos;utente, possiamo
                  ottimizzare o limitare le nostre attività di comunicazione e
                  marketing in base al canale e al dispositivo.
                </p>
                <p className="italic">
                  Quali Dati personali trattiamo per conseguire questa finalità?
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
                  4.1.4.b Rispetto delle leggi e degli obblighi legali e tutela
                  dei beni e degli interessi di Ayvens
                </h4>

                <p className="italic">Cosa comporta questa finalità?</p>
                <p className="mb-4">
                  Per ottemperare a un obbligo legale o laddove abbiamo un
                  legittimo interesse, elaboriamo i Dati personali
                  dell&apos;utente come appropriato o necessario: <br></br> (a)
                  ai sensi della legge in vigore, comprese le leggi vigenti al
                  di fuori del Paese di residenza dell&apos;utente e le
                  raccomandazioni settoriali; <br></br> (b) per assicurare la
                  conformità a procedimenti legali; <br></br> (c) per adempiere
                  a richieste delle autorità pubbliche e governative, comprese
                  quelle al di fuori del Paese di residenza dell&apos;utente;
                  <br></br> (d) per far rispettare i nostri termini e condizioni
                  e le altre politiche <br></br> applicabili; <br></br>
                  (e) per proteggere le nostre operazioni; <br></br> (f) per
                  proteggere i nostri diritti, la nostra privacy, la nostra
                  sicurezza o le nostre proprietà, e/o quelle delle nostre
                  affiliate, e per proteggere l&apos;utente o altri soggetti;
                  <br></br> (g) per consentirci di perseguire i rimedi
                  disponibili o <br></br> limitare i danni che potremmo subire.
                  limitare i danni che potremmo subire.
                </p>

                <p className="italic">
                  Quali Dati personali trattiamo per conseguire questa finalità?
                </p>
                <p className="mb-4">
                  Per conseguire questa finalità, trattiamo dati quali nome e
                  cognome, informazioni di contatto, corrispondenza con Ayvens,
                  utilizzo di uno qualsiasi dei nostri Servizi e qualsiasi altra
                  informazione dell&apos;utente inclusa nella presente
                  Informativa o altrimenti fornitaci dall&apos;utente stesso, se
                  ciò dovesse essere necessario per conseguire una delle
                  finalità descritte nel paragrafo precedente.
                </p>

                <p className="italic">
                  Con chi condividiamo i Dati personali dell&apos;utente?
                </p>
                <p className="mb-4">
                  Solo se richiesto dalla legge o da una raccomandazione
                  settoriale a cui Ayvens è soggetta, oppure se abbiamo un
                  legittimo interesse in tal senso, i Dati personali
                  dell&apos;utente saranno forniti a enti di vigilanza, autorità
                  fiscali e agenzie investigative. Vedere la sezione 5 &quot;
                  <a href="#5" className="text-teal-700 underline">
                    Chi ha accesso ai dati dell&apos;utente?
                  </a>
                  &quot;.
                </p>
              </div>
            </Accordion>
          </div>

          {/* Sezioni finali */}
          <div className="space-y-4 md:space-y-8 pb-16 md:pb-32">
            <h3 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
              5. Chi ha accesso ai dati dell&apos;utente?
            </h3>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              Oltre a quanto indicato per ciascuna finalità sopra riportata
              relativamente a chi può accedere ai Dati personali sotto il
              controllo di Ayvens, potremmo anche condividere i Dati personali:
            </p>
            <ul className="list-disc w-full md:w-2/3 ml-4">
              <li>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  All&apos;interno del gruppo Ayvens per le finalità descritte
                  nella presente Informativa sulla privacy.
                </p>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Per un elenco delle affiliate di Ayvens e delle loro sedi che
                  utilizzano i Dati personali, scegli la bandiera dello stato
                  nel menù in alto a destra del sito www.Ayvens.com.
                </p>
              </li>
              <li>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Nell&apos;ambito del Gruppo Société Générale a cui appartiene
                  Ayvens, per finalità amministrative interne, per adempiere a
                  un obbligo legale, per migliorare i nostri servizi, per
                  consentirci di rispettare in modo più efficiente ed efficace
                  leggi e regolamenti o per finalità di monitoraggio, controllo
                  e reporting. Le finalità di reporting riguardano eventuali
                  obblighi normativi e statutari di reporting e richieste di
                  dati come stabilito dalle autorità di regolamentazione del
                  Gruppo Société Générale.
                </p>
              </li>
              <li>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Con i nostri partner di servizi terzi, fornitori di servizi e
                  partner non affiliati, o partner commerciali quali produttori
                  di apparecchiature originali (OEM) e intermediari, per
                  agevolare i servizi forniti all&apos;utente e a noi.
                </p>
              </li>
            </ul>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              Per poter offrire all&apos;utente i nostri servizi, collaboriamo
              spesso a stretto contatto con partner, fornitori di servizi e
              partner non affiliati. I partner di servizi indipendenti ci
              aiutano a fornire all&apos;utente i nostri servizi di leasing e di
              altra natura e comprendono concessionari, fornitori di servizi di
              comprendono concessionari, fornitori di servizi di manutenzione,
              carrozzerie e fornitori di assistenza stradale, ma anche società
              di noleggio e amministratori dei nostri programmi di sicurezza per
              i conducenti. I concessionari o i fornitori di veicoli (elettrici)
              potrebbero richiedere i dati di contatto di un conducente per
              attivare un account personale, necessario per la configurazione
              come conducente, altrimenti il veicolo non potrà funzionare. I
              fornitori di servizi sono aziende a cui ci affidiamo per aiutarci
              nella gestione delle nostre attività, ad esempio per mantenere la
              nostra rete informatica e la relativa infrastruttura nonché per
              svolgere i controlli di sicurezza e di accesso nei nostri locali.
            </p>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              Inoltre, utilizziamo e divulghiamo i Dati personali
              dell&apos;utente se necessario o appropriato, in particolare
              quando abbiamo un obbligo legale o un legittimo interesse a farlo:
            </p>
            <ul className="list-disc w-full md:w-2/3 ml-4">
              <li>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Per rispettare le leggi e i regolamenti vigenti.
                </p>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Ciò può includere leggi al di fuori del Paese di residenza
                  dell&apos;utente.
                </p>
              </li>
              <li>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Per collaborare con le autorità pubbliche e governative.
                </p>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Per adempiere a una richiesta o fornire informazioni che
                  riteniamo importanti. Sono potenzialmente incluse le autorità
                  al di fuori del Paese di residenza dell&apos;utente.
                </p>
              </li>
              <li>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Per collaborare con le forze dell&apos;ordine.
                </p>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Ad esempio, quando siamo tenuti ad adempiere a richieste e
                  ordinanze delle forze dell&apos;ordine o forniamo informazioni
                  che riteniamo importanti.
                </p>
              </li>
              <li>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Per altri motivi legali.
                </p>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Per far rispettare i nostri termini e condizioni e per
                  proteggere i nostri diritti, la nostra privacy, la nostra
                  sicurezza o le nostre proprietà, e/o quelli delle nostre
                  affiliate, dell&apos;utente o di altri soggetti.
                </p>
              </li>
              <li>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  In relazione a una vendita o transazione commerciale.
                </p>
                <p className="mt-8 text-gray-700 text-base md:text-lg font-medium">
                  Abbiamo un legittimo interesse a divulgare o trasferire i Dati
                  personali dell&apos;utente a una terza parte in caso di
                  riorganizzazione, fusione, vendita, joint venture, cessione,
                  trasferimento o altra alienazione di tutto o parte
                  dell&apos;attività, dei beni o delle azioni di Ayvens (anche
                  in relazione a una procedura fallimentare o simile). Tali
                  terze parti possono includere, ad esempio, un&apos; entità
                  acquirente e i suoi consulenti.
                </p>
              </li>
            </ul>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              Limiteremo l&apos;accesso ai Dati personali al personale che ha
              necessità di conoscerli per le finalità descritte nella presente
              Informativa.
            </p>
            <h3 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
              6. Perchè i dati personali possono essere trasferiti a paesi
              terzi?
            </h3>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              Ayvens è un fornitore di servizi globale con clienti e sedi in
              tutto il mondo. I Dati personali dell&apos;utente possono essere
              archiviati e/o trattati in un Paese diverso da quello in cui
              risiede. Per un elenco delle affiliate di Ayvens e delle loro sedi
              che utilizzano i Dati personali, scegli la bandiera dello stato
              nel menù in alto a destra del sito{" "}
              <span className="text-teal-700 underline">www.Ayvens.com</span>.
            </p>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              Alcuni Paesi non appartenenti al SEE garantiscano un livello
              adeguato di protezione dei Dati personali, secondo gli standard
              stabiliti dall&apos;UE. Un elenco di questi &quot;Paesi con
              protezione adeguata&quot; è disponibile qui. Per il trasferimento
              dei Dati personali verso altri Paesi, Ayvens ha adottato misure
              adeguate per proteggere i Dati personali, quali le Clausole
              contrattuali tipo. È possibile ottenere una copia di queste misure
              contattandoci all&apos;indirizzo riportato nella successiva
              sezione &quot;Come è possibile contattarci&quot;.
            </p>
            <h3 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
              7. Privacy dei minorenni
            </h3>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              I nostri servizi non sono rivolti a individui di età inferiore a
              18 anni.
            </p>
            <h3 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
              8. Utilizziamo i dati dell&apos;utente per altri scopi?
            </h3>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              Potremmo utilizzare i Dati personali dell&apos;utente anche per
              una finalità diversa da quella iniziale. Ciò è consentito a
              condizione che la finalità secondaria sia in linea con la finalità
              iniziale. Vengono presi in considerazione, tra gli altri, i
              seguenti fattori: le finalità sono chiaramente correlate; la
              finalità secondaria è appropriata e/o prevista; i Dati personali
              sono stati ottenuti direttamente dall&apos;utente o in altro modo;
              che tipo di Dati personali sono interessati dalla finalità
              secondaria; quali sarebbero le implicazioni per l&apos;utente; e
              quali misure di protezione dei dati vengono applicate quando i
              dati dell&apos;utente vengono applicate quando i dati
              dell&apos;utente sono utilizzati per le finalità secondarie.
            </p>
            <h3 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
              9. Per quanto tempo conserveremo i dati dell&apos;utente?
            </h3>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              I Dati personali degli interessati saranno conservati per il
              periodo necessario a soddisfare le finalità descritte nella
              presente Informativa, a meno che non sia richiesto o consentito
              dalla legge un periodo di conservazione più lungo.
            </p>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              I criteri applicati per determinare i periodi di conservazione
              pertinenti sono: la durata del rapporto e della fornitura dei
              Servizi all&apos;utente (ad esempio, per tutto il tempo in cui
              l&apos;utente utilizza o prende in leasing un veicolo Ayvens);
              come previsto da un obbligo legale a cui siamo soggetti; e come
              consigliabile alla luce della nostra posizione legale, ad esempio
              per termini di prescrizione applicabili, le controversie legali o
              le indagini normative. Trascorso il periodo di conservazione
              applicabile, Ayvens renderà anonimi o cancellerà i Dati personali
              dell&apos;utente.
            </p>
            <h3 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
              10. Come possiamo essere contattati?
            </h3>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              Cerchiamo di adottare misure organizzative, tecniche e
              amministrative adeguate per proteggere i Dati personali
              all&apos;interno della nostra organizzazione, in conformità alle
              leggi e ai regolamenti vigenti in materia di privacy e protezione
              dei dati. Purtroppo, nessun sistema di trasmissione o
              archiviazione dei dati può garantire una sicurezza del 100%. Se
              l&apos;utente ha motivo di ritenere che la propria interazione con
              noi non sia più sicura, è pregato di segnalarcelo immediatamente
              in conformità alle istruzioni riportate nella successiva sezione
              &quot;Come è possibile contattarci&quot;.
            </p>
            <h3 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
              11. Modifiche alla presente informativa
            </h3>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              Ci riserviamo il diritto di modificare la presente Informativa in
              qualsiasi momento, ad esempio, per adattarla agli sviluppi futuri
              di Ayvens o ai cambiamenti nelle tendenze settoriali o
              legislative. La dicitura &quot;Ultimo aggiornamento&quot;
              all&apos;inizio della presente Informativa indica la data della
              sua revisione più recente.
            </p>
            <h3 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
              12. Come è possibile contattarci?
            </h3>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3">
              In caso di domande, richieste o reclami, l&apos;utente può
              contattarci scrivendo al seguente indirizzo e-mail{" "}
              <span className="text-teal-700 underline">
                privacy.it@aldautomotive.com
              </span>{" "}
              oppure al nostro Responsabile della protezione dei dati
              all&apos;indirizzo{" "}
              <span className="text-teal-700 underline">
                dpoalditalia@aldautomotive.com
              </span>
              . Poiché la comunicazione tramite e-mail non è sempre sicura, si
              prega di non includere informazioni personali sensibili nelle
              e-mail.
            </p>
            <h3 className="w-full md:w-2/3 font-chillax font-medium text-gray-700 text-2xl md:text-4xl pt-6 md:pt-8">
              13. Come è possibile esercitare i propri diritti sui dati
              personali?
            </h3>
            <p className="text-gray-700 text-base md:text-lg font-medium w-full md:w-2/3 pb-32">
              L&apos;utente è pregato di contattare il nostro Responsabile della
              protezione dei dati all&apos;indirizzo{" "}
              <span className="text-teal-700 underline">
                dpoalditalia@aldautomotive.com
              </span>{" "}
              se dovesse avere domande o dubbi sulle modalità attraverso le
              quali Ayvens elabora i suoi Dati personali; se desidera esercitare
              il suo diritto di richiedere l&apos;accesso, la correzione, la
              cancellazione o l&apos;eliminazione dei Dati personali che lo
              riguardano o chiedere la cessazione del loro utilizzo (diritto di
              opposizione), ritirare il consenso o se desidera richiedere una
              copia o la portabilità dei propri Dati personali. Risponderemo
              alla richiesta inoltrata in conformità alla legge in vigore.
              L&apos;utente deve tenere presente che potremmo non essere tenuti
              a soddisfare (o soddisfare pienamente) la sua richiesta. Le leggi
              o i regolamenti in vigore possono imporre condizioni o limitare
              alcuni di tali diritti. condizioni o limitare alcuni di tali
              diritti. Ad esempio, per tutto il tempo in cui abbiamo in corso un
              rapporto o quando i Dati personali sono conservati in un sistema
              di backup (allo scopo di ripristinarli in caso di perdita di dati)
              e il ciclo di eliminazione dei dati potrebbe essere diverso da
              quello applicabile al sistema di produzione. In tali circostanze,
              informeremo l&apos;utente spiegando il motivo per cui non siamo in
              grado di soddisfare la sua richiesta in quel momento specifico
              oppure, nel caso di dati di backup, la richiesta potrebbe essere
              evasa in una fase successiva (quando il backup viene
              sovrascritto). Si prega di specificare chiaramente, nella
              richiesta inoltrata, a quali Dati personali si vuole accedere o
              modificare o eliminare, oppure di comunicarci quali limitazioni si
              vorrebbero applicare al nostro utilizzo dei Dati personali. Per la
              tutela dell&apos;utente, evadiamo richieste solo in relazione alle
              informazioni associate all&apos;indirizzo e-mail specifico
              utilizzato per inviarci tali richieste e potremmo richiedere
              ulteriori informazioni per verificare l&apos;identità del mittente
              prima di procedere. Tenere presente che alcuni Dati personali
              potrebbero essere esenti da tali obblighi ai sensi delle leggi
              vigenti sulla protezione dei dati o di altre leggi e regolamenti.
              L&apos;utente può anche presentare un reclamo all&apos;autorità di
              protezione dei dati del proprio Paese o regione, oppure del luogo
              in cui si è verificata la presunta violazione. Qui è disponibile
              il{" "}
              <a
                href="https://ec.europa.eu/info/law/law-topic/data-protection/reform/rights-data-subject_en"
                className="text-teal-700 underline"
              >
                link{" "}
              </a>
              alle autorità nazionali per la dati situate nell&apos;Unione
              europea e nello Spazio economico europeo.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyBody;
