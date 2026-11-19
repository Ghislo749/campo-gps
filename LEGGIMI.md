# Campo GPS

Web app (PWA) per iPhone che funziona come guida GPS per il trattore e mappa di copertura. È gratuita e non serve un account Apple.

## Cosa fa
- **Campi**: disegni il confine toccando gli angoli sulla mappa satellitare, oppure percorri il perimetro col trattore. Mostra la superficie in ettari. I punti si possono trascinare per correggere il confine.
- **Lavoro**: scegli il campo e la larghezza dell'attrezzo. Durante il lavoro l'app colora la zona lavorata **solo dentro il campo**:
  - verde = lavorato
  - arancione = sovrapposizione
  - rossiccio = ancora da fare
- **Pannello in alto**: velocità, ettari fatti, % del campo, % di sovrapposizione, precisione GPS.
- **Linea A-B**: fissi A e B lungo la prima passata e compaiono le passate parallele. L'indicatore ◀ ▶ dice da che parte correggere. Con il GPS del telefono (2-5 m) è un aiuto indicativo, non è una guida di precisione.
- **Pausa** (attrezzo alzato, capezzagne): mentre è in pausa non dipinge niente.
- I lavori si possono **riprendere** in un altro momento. Lo storico è illimitato.
- Lo schermo resta acceso durante il lavoro. L'app funziona anche senza rete: si vedono solo le mappe già visualizzate in precedenza, mentre GPS e copertura funzionano sempre.
- **Backup**: si esporta e si importa da Impostazioni (WhatsApp, File, mail).
- **Modalità prova**: GPS simulato, per vedere come funziona senza uscire di casa.

## Come pubblicarla (gratis, 2 minuti)
Serve un indirizzo **https**: il GPS nel browser funziona solo così.

**Netlify Drop (il più semplice)**
1. Da computer apri https://app.netlify.com/drop e crea un account gratuito.
2. Trascina dentro la **cartella** `campo-gps`.
3. Ti dà un link `https://….netlify.app`, che si può rinominare.

In alternativa vanno bene GitHub Pages o Cloudflare Pages: basta caricare questi file nella cartella principale del sito.

## Installazione su iPhone
1. Apri il link con **Safari**.
2. Tocca **Condividi** → **Aggiungi alla schermata Home**.
3. Aprila sempre dall'icona e consenti la posizione.
4. Controlla in Impostazioni → Privacy e sicurezza → Localizzazione → **Siti web di Safari** che siano attivi “Mentre usi l'app” e **Posizione esatta**.

## Limiti da sapere (sono limiti di iOS)
- **La app deve restare aperta e in primo piano.** Se blocchi il telefono o passi a un'altra app, iOS ferma il GPS delle web app. Quando torni, il lavoro riprende dal punto in cui eri. Per questo serve il telefono sul supporto e collegato al caricatore.
- Per tenere lo schermo acceso nella app installata serve iOS 18.4 o successivo. Con versioni precedenti imposta Blocco automatico su “Mai”.
- I dati restano solo sul telefono, quindi conviene esportare un backup ogni tanto.
- Le mappe satellitari sono di Esri World Imagery. L'uso gratuito è previsto per app non commerciali. Se un giorno diventasse un prodotto da vendere, va cambiato fornitore oppure serve una licenza.

## File
`index.html` (tutta l'app) · `sw.js` (funzionamento offline) · `manifest.webmanifest` + icone · `leaflet.js/.css` (libreria mappe, licenza BSD-2)
