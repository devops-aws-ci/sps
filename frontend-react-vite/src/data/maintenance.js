const maintenance = [
  {
    day: 51,
    time: "10:00",
    from: "provider",
    subject: "🧰 Démarrage de la phase de maintenance — {projectName}",
    body: "Bonjour {clientName},\n\nNous entamons la phase de maintenance préventive et corrective de **{projectName}**.\n\n**Tâches:**\n- Suivi des incidents\n- Mises à jour de sécurité\n- Support utilisateur\n\nCordialement,\n{providerName}"
  },
  {
    day: 60,
    time: "14:00",
    from: "provider",
    subject: "📈 Rapport de maintenance mensuel",
    body: "Bonjour {clientName},\n\nVoici le rapport de maintenance pour {projectName} :\n- Incidents: 0\n- Mises à jour appliquées: 3\n- Performance: excellente\n\nMerci pour votre confiance.\n\nCordialement,\n{providerName}"
  },
];

export default maintenance;
