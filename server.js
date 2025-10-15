// server.js

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const axios = require('axios'); // ⚠️ Utilisation de axios !
const path = require('path');

// ⚠️ VOTRE WEBHOOK DISCORD EST INTÉGRÉ ICI
// APRÈS (Demande au système d'exploitation de donner la valeur de la variable)
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Le serveur web sert les fichiers statiques (index.html, styles.css, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Pour parser les requêtes HTTP POST (méthode de secours)

// ----------------------------------------------------
// Fonction d'envoi vers Discord
// ----------------------------------------------------
/**
 * Envoie une notification au webhook Discord via axios.
 * @param {object} visitorInfo Les informations du visiteur.
 */
async function sendDiscordNotification(visitorInfo) {
    const embed = {
        title: "🚨 Nouvelle Visite sur la Page 🚨",
        description: `Un utilisateur vient d'accéder à votre site.`,
        color: 3447003, // Couleur bleue standard Discord
        fields: [
            { name: "Heure de Visite", value: visitorInfo.timestamp, inline: false },
            { name: "Langue du Navigateur", value: visitorInfo.language, inline: true },
            { name: "Taille d'Écran", value: visitorInfo.screenSize, inline: true },
            { name: "Référent", value: visitorInfo.referrer, inline: false },
            { name: "User Agent (Navigateur)", value: visitorInfo.userAgent.substring(0, 500), inline: false }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "Suivi de Visiteurs en Temps Réel" }
    };
    
    // Le corps de la requête utilise "data" avec axios
    const discordPayload = {
        embeds: [embed]
    };

    try {
        const response = await axios.post(DISCORD_WEBHOOK_URL, discordPayload, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        // Axios ne lance pas d'erreur pour les codes 2xx (Succès)
        if (response.status >= 200 && response.status < 300) {
            console.log("Notification Discord envoyée avec succès.");
        } 
    } catch (error) {
        // Axios lance une erreur pour les codes 4xx et 5xx
        if (error.response) {
            // Le serveur Discord a répondu avec un code d'erreur (ex: 404, 400)
            console.error(`Erreur Discord: ${error.response.status}`);
            console.error('Message de Discord:', error.response.data ? error.response.data.message : 'Aucun message d\'erreur détaillé.');
        } else {
            // Erreur de connexion réseau (DNS, Timeout, etc.)
            console.error("Erreur réseau lors de l'envoi à Discord:", error.message);
        }
    }
}

// ----------------------------------------------------
// 1. Gestion des connexions Socket.IO (Méthode principale)
// ----------------------------------------------------
io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté par Socket.IO');

    // Écoute l'événement 'visitorInfo' envoyé par realtime.js
    socket.on('visitorInfo', (info) => {
        console.log('Info reçue via Socket:', info);
        // Envoi de la notification Discord
        sendDiscordNotification(info);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

// ----------------------------------------------------
// 2. Gestion de la route HTTP POST /visit (Méthode de secours)
// ----------------------------------------------------
app.post('/visit', (req, res) => {
    const visitorInfo = req.body;
    console.log('Info reçue via HTTP POST /visit:', visitorInfo);
    // Envoi de la notification Discord
    sendDiscordNotification(visitorInfo);
    res.status(200).send('Visite enregistrée.');
});

// Lancement du serveur
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});