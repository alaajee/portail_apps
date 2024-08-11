// infoForm.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('infoForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire

        // Récupère les valeurs des champs du formulaire
        const appName = document.getElementById('appName').value;
        const appDescription = document.getElementById('appDescription').value;
        const appLink = document.getElementById('appLink').value;
        const appImage = document.getElementById('appImage').files[0];

        // Convertir l'image en URL de données
        const reader = new FileReader();
        reader.onload = function(e) {
            // Récupère les données existantes depuis le localStorage
            const existingApps = JSON.parse(localStorage.getItem('apps')) || [];

            // Crée un objet pour stocker les nouvelles données
            const appInfo = {
                appName: appName,
                appDescription: appDescription,
                appLink: appLink,
                appImage: e.target.result // URL de données de l'image
            };

            // Ajoute les nouvelles données aux données existantes
            existingApps.push(appInfo);

            // Enregistre les données mises à jour dans le localStorage
            localStorage.setItem('apps', JSON.stringify(existingApps));

            // Affiche un message de succès
            alert('Les informations ont été sauvegardées localement.');

            // Redirige vers la deuxième page
            window.location.href = 'apps.html';
        };
        
        if (appImage) {
            reader.readAsDataURL(appImage);
        } else {
            // Si aucune image n'est sélectionnée, continue sans image
            reader.onload({ target: { result: '' } });
        }
    });
});
