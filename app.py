from flask import Flask, request, render_template, redirect, url_for
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configuration du dossier d'upload et des extensions autorisées
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Vérifier l'extension du fichier
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def index():
    appName = None
    appDescription = None
    appLink = None
    filename = None
    if request.method == 'POST':
        appName = request.form['appName']
        appDescription = request.form['appDescription']
        appLink = request.form['appLink']
        file = request.files['image']
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            # Enregistrer les informations saisies dans un fichier texte
            with open('form_data.txt', 'a') as f:
                f.write(f"Nom de l'application: {appName}\n")
                f.write(f"Description de l'application: {appDescription}\n")
                f.write(f"Lien de l'application: {appLink}\n")
                f.write(f"Fichier image: {filename}\n")
                f.write("----\n")
    
    return render_template('ajouter.html', appName=appName, appDescription=appDescription, appLink=appLink, filename=filename)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return redirect(url_for('static', filename='uploads/' + filename))

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
