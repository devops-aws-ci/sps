const deploiement = [
  {
    day: 46,
    time: "09:00",
    from: "provider",
    subject: "🚀 Déploiement prévu — {projectName}",
    body: "Bonjour {clientName},\n\nNous préparons le déploiement en production de **{projectName}**.\n\n**Planning:**\n- Validation finale: J46–J47\n- Déploiement: J48\n- Vérifications post-déploiement: J49–J50\n\nCordialement,\n{providerName}"
  },
  {
    day: 48,
    time: "19:00",
    from: "provider",
    subject: "✅ Déploiement terminé avec succès",
    body: "Bonjour {clientName},\n\nLe projet **{projectName}** est désormais en ligne ! 🎉\n\nNous surveillons activement les performances et les logs pour garantir la stabilité.\n\nCordialement,\n{providerName}"
  },
];

export default deploiement;
