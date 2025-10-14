const maintenance = [
  {
    day: 1,
    time: "09:00",
    from: "provider",
    subject: "🚀 Lancement officiel du projet {projectName}",
    body: "Bonjour {clientName},\n\nNous sommes ravis de démarrer cette collaboration sur {projectName}! 🎉\n\n**Phase de conception (J1–J15):**\n- Ateliers utilisateurs: J1–J5\n- Wireframes: J6–J10\n- Maquettes UI/UX: J11–J15\n\nPremier atelier prévu demain à 10h.\n\nCordialement,\n{providerName}"
  },
  {
    day: 2,
    time: "18:00",
    from: "provider",
    subject: "Compte-rendu atelier utilisateur #1",
    body: "Bonsoir {clientName},\n\nPremier atelier très productif 👍\n\n**Résumé:**\n- 4 profils clients identifiés\n- Objectif principal: simplifier le parcours achat\n- Besoin fort d'un moteur de recherche performant\n\nAtelier #2 prévu mercredi matin.\n\nBonne soirée,\n{providerName}"
  },
  {
    day: 4,
    time: "09:00",
    from: "client",
    subject: "Retour sur les personas définis",
    body: "Bonjour,\n\nExcellent travail sur les personas! 🙌\n\nPetite remarque: pour le profil “Thomas”, pensez à inclure ses préférences de livraison.\nCela aidera pour la future logique de fidélisation.\n\nMerci,\n{clientName}"
  },
  {
    day: 5,
    time: "18:00",
    from: "provider",
    subject: "RE: Ajustement personas - Livraison ajoutée",
    body: "Bonsoir {clientName},\n\nModif appliquée ✅\n\nLe persona 'Thomas' inclut désormais ses préférences de livraison et habitudes d'achat.\n\nProchaine étape: conception des wireframes à partir de lundi.\n\nCordialement,\n{providerName}"
  },
  {
    day: 7,
    time: "09:00",
    from: "provider",
    subject: "🧩 Wireframes disponibles pour validation",
    body: "Bonjour {clientName},\n\nLes premiers wireframes sont prêts!\n\n**Pages:**\n- Accueil\n- Catalogue produits\n- Détail produit\n- Panier\n\nLien Figma: [figma.com/projet-wireframes]\nVos retours avant jeudi?\n\n{providerName}"
  },
  {
    day: 8,
    time: "18:00",
    from: "client",
    subject: "Retour wireframes - Ajouts souhaités",
    body: "Bonsoir,\n\nLes wireframes sont top 👌\n\nPetites suggestions:\n- Ajouter filtre par labels bio\n- Mentionner la provenance des produits\n- Simplifier la barre de navigation mobile\n\nMerci d’avance!\n\n{clientName}"
  },
  {
    day: 10,
    time: "09:00",
    from: "provider",
    subject: "Wireframes v2 disponibles 🎨",
    body: "Bonjour {clientName},\n\nVos remarques ont été intégrées:\n✅ Filtres bio + origine produits\n✅ Navigation mobile optimisée\n✅ Page catalogue allégée\n\nLien mis à jour sur Figma.\n\nProchaine étape: maquettes UI haute-fidélité.\n\n{providerName}"
  },
  {
    day: 14,
    time: "17:30",
    from: "provider",
    subject: "🎨 Maquettes UI/UX finalisées",
    body: "Bonsoir {clientName},\n\nLes maquettes finales sont prêtes!\n\n**Détails:**\n- Palette verte & dorée validée 🌿\n- Version mobile responsive\n- CTA clairs et accessibles\n\nRDV de validation vendredi matin?\n\nBien à vous,\n{providerName}"
  }
];

export default maintenance;
