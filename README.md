# Unitutor
 
🎓 Pianificazione del Progetto e Configurazione Iniziale
📄 Descrizione
Questa è un'applicazione progettata per supportare studenti universitari nella gestione delle loro attività accademiche. L'app include funzionalità per la registrazione e autenticazione degli utenti, gestione dei registri universitari, registrazione delle lezioni e generazione di appunti, creazione di mappe concettuali, gestione degli orari delle lezioni, e funzioni di community e messaggistica.

✨ Funzionalità
🔐 Registrazione e Autenticazione dell'Utente
🗂️ Progettazione del Database: Struttura delle tabelle per utenti, ruoli e token di autenticazione.
🔑 Registrazione e Accesso: Meccanismi sicuri per la registrazione e l'autenticazione degli utenti.
📝 Gestione dei Profili: Gli utenti possono aggiornare i loro profili e gestire le password.
🎓 Gestione dei Registri Universitari
🗂️ Schema del Database: Tabelle per corsi, voti e trascrizioni.
💻 Interfaccia Utente: Pagine intuitive per visualizzare e gestire i registri universitari.
🔧 Implementazione Backend: API per le operazioni CRUD sui record universitari.
📝 Registrazione delle Lezioni e Generazione di Appunti
🗒️ Generazione di Note: Estrazione automatica di testo dalle registrazioni e generazione di appunti.
🕒 Gestione dell'Orario delle Lezioni
🗂️ Schema del Database: Tabelle per pianificazioni ed eventi accademici.
📅 Interfaccia Utente: Visualizzazioni del calendario e pagine di gestione della pianificazione.
🔧 Implementazione Backend: API per la gestione delle pianificazioni.
🌐 Funzionalità di Community e Messaggistica
🗂️ Progettazione del Database: Tabelle per post e commenti della community.
💬 Interfaccia Utente: Pagine per interazioni sociali tra gli utenti.
🛠️ Tecnologie Utilizzate
Frontend: [Specificare framework/librerie utilizzate come React, ecc.]
Database: [Specificare il database utilizzato come PostgreSQL, ecc.]
🔑 API Keys e Configurazione
Per far funzionare correttamente l'applicazione, devi essere iscritto e avere le seguenti API key configurate nel tuo ambiente:

cloudinary.name=${CLOUDINARY_NAME}
cloudinary.secret=${CLOUDINARY_SECRET}
cloudinary.key=${CLOUDINARY_KEY}
jwt.secret=${JWT_SECRET}


firebase.key=${FIREBASE_KEY}
firebase.auth.domain=${FIREBASE_AUTH_DOMAIN}
firebase.project.id=${FIREBASE_PROJECT_ID}
firebase.storage.bucket=${FIREBASE_STORAGE_BUCKET}
firebase.messaging.sender.id=${FIREBASE_MESSAGING_SENDER_ID}
firebase.app.id=${FIREBASE_APP_ID}
firebase.measurement.id=${FIREBASE_MEASUREMENT_ID}
speech.flow.key.id=${SPEECH_FLOW_KEY_ID}
speech.flow.key.secret=${SPEECH_FLOW_KEY_SECRET}
text.razon.apy.key=${TEXT_RAZON_API_KEY}
