document.addEventListener('DOMContentLoaded', function() {
    const storedApps = JSON.parse(localStorage.getItem('apps')) || [];
    const appsContainer = document.querySelector('.grid-container');

    storedApps.forEach(appInfo => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('image-container');
        
        if (appInfo.appImage) {
            const img = document.createElement('img');
            img.src = appInfo.appImage;
            img.classList.add('app-image');
            appDiv.appendChild(img);
        }
        const descrDiv = document.createElement('div');
        descrDiv.classList.add('descr');
        descrDiv.textContent = appInfo.appDescription;
        appDiv.appendChild(descrDiv);

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container1');

        const btn = document.createElement('button');
        btn.classList.add('btn1');

        const link = document.createElement('a');
        link.href = appInfo.appLink;
        link.textContent = `En savoir plus `;
        btn.appendChild(link);

        btnContainer.appendChild(btn);
        appDiv.appendChild(btnContainer);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            removeApp(appInfo.id);
            appDiv.remove();
        });
        appDiv.appendChild(deleteButton);

        appsContainer.appendChild(appDiv);
    });

    document.getElementById('clearStorage').addEventListener('click', function() {
        localStorage.clear(); // Efface toutes les données du localStorage
        appsContainer.innerHTML = ''; // Retire tous les éléments du DOM
    });
});

function removeApp(appId) {
    const storedApps = JSON.parse(localStorage.getItem('apps')) || [];
    const updatedApps = storedApps.filter(app => app.id !== appId);
    localStorage.setItem('apps', JSON.stringify(updatedApps));
}
