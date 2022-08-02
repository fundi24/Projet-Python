from flask import Flask, render_template, redirect, request, Response
from datetime import date
import sqlite3

app = Flask(__name__)


@app.route('/')
def index():  # put application's code here
    return redirect('static/index.html')

@app.route('/pos')
def pos():
    return redirect('static/pos.html')

@app.route('/AddMembre', methods=['POST'])
def AddMembre():

    dateInscription = date.today()
    abonnement = 0

    if request.method == "POST":
        nom = request.form["para1"]
        prenom = request.form["para2"]
        adresse = request.form["para3"]
        numeroTelephone = request.form["para4"]
        dateNaissance = request.form["para5"]

    connection = sqlite3.connect("Db.sqlite")
    cursor = connection.cursor()
    cursor.execute("insert into Membre (Nom, Prenom, Adresse, NumeroTelephone, DateNaissance, DateInscription, Abonnement) VALUES (?,?,?,?,?,?,?)",
                   (nom, prenom, adresse, numeroTelephone, dateNaissance, dateInscription, abonnement))
    connection.commit()
    return redirect('', 200)

@app.route('/membres')
def membres():
    connection = sqlite3.connect("Db.sqlite")
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM MEMBRE")
    Listmembres = cursor.fetchall()
    return Response(render_template('Membres.xml', membres=Listmembres), content_type="text/xml")

@app.route('/AddAbonnement', methods=['POST'])
def AddAbonnement():

    dateAchat = date.today()
    abonnement = 1

    if request.method == "POST":
        idMembre = request.form["para1"]
        idFormule = request.form["para2"]

    connection = sqlite3.connect("Db.sqlite")

    cursor1 = connection.cursor()
    cursor1.execute("select NombreSeance from Formule WHERE IdFormule = ?", (idFormule))
    result = cursor1.fetchone()
    delimiter = ','
    seanceDispo = delimiter.join([str(result) for result in result])
    seanceDispo = int(seanceDispo)

    cursor2 = connection.cursor()
    cursor2.execute("select Abonnement from Membre where IdMembre = ?", (idMembre,))
    result2 = cursor2.fetchone()
    delimiter2 = ','
    AbonnementPris = delimiter2.join([str(result2) for result2 in result2])
    AbonnementPris = int(AbonnementPris)

    if AbonnementPris == 1:
        cursor3 = connection.cursor()
        cursor3.execute("UPDATE Abonnement SET IdFormule= ? WHERE IdMembre = ?", (idFormule, idMembre))

        cursor3 = connection.cursor()
        cursor3.execute("UPDATE Abonnement SET SeanceDispo=SeanceDispo + ? WHERE IdMembre = ?", (seanceDispo, idMembre))

        cursor3 = connection.cursor()
        cursor3.execute("UPDATE Abonnement SET DateAchat= ? WHERE IdMembre = ?", (dateAchat, idMembre))

        cursor4 = connection.cursor()
        cursor4.execute("insert into Journal (IdMembre, IdFormule, DateAchat) VALUES (?,?,?)",
                        (idMembre, idFormule, dateAchat))
    elif AbonnementPris == 0:
        cursor5 = connection.cursor()
        cursor5.execute("insert into Abonnement (IdMembre, IdFormule, SeanceDispo, DateAchat) VALUES (?,?,?,?)",
                        (idMembre, idFormule, seanceDispo, dateAchat))

        cursor6 = connection.cursor()
        cursor6.execute("UPDATE Membre SET Abonnement=? WHERE IdMembre = ?", (abonnement, idMembre))

        cursor7 = connection.cursor()
        cursor7.execute("insert into Journal (IdMembre, IdFormule, DateAchat) VALUES (?,?,?)",
                        (idMembre, idFormule, dateAchat))

    connection.commit()

    return redirect('', 200)


@app.route('/Abonnements')
def Abonnements():
    connection = sqlite3.connect("Db.sqlite")
    cursor = connection.cursor()
    cursor.execute("select a.IdMembre, a.IdFormule, a.SeanceDispo, f.NombreSeance, a.DateAchat from Abonnement a inner join Formule f on a.IdFormule = f.IdFormule Where a.SeanceDispo > 0")
    ListDetailAbonnement = cursor.fetchall()
    return Response(render_template('DetailAbonnements.xml', DetailAbonnements=ListDetailAbonnement), content_type="text/xml")

@app.route('/formules')
def formules():
    connection = sqlite3.connect("Db.sqlite")
    cursor = connection.cursor()
    cursor.execute("select * from Formule")
    ListFormule = cursor.fetchall()
    return Response(render_template('ListFormule.xml', ListFormule=ListFormule), content_type="text/xml")

@app.route('/AddArriveDep', methods=['POST'])
def AddArriveDep():
    dateSeance = date.today()
    Present = 1

    if request.method == "POST":
        idMembre = request.form["para1"]
        Duree = request.form["para2"]

    connection = sqlite3.connect("Db.sqlite")

    cursor = connection.cursor()
    cursor.execute(
        "insert into ArriveDep (DateSeance, Present, IdMembre, Duree) VALUES (?,?,?,?)",
        (dateSeance,Present, idMembre, Duree))

    cursor2 = connection.cursor()
    cursor2.execute(
        "update Abonnement set SeanceDispo = SeanceDispo - ? Where IdMembre = ?",
        (Duree, idMembre))

    connection.commit()
    return redirect('', 200)


@app.route('/ArriveDep')
def ArriveDep():
    connection = sqlite3.connect("Db.sqlite")
    cursor1 = connection.cursor()
    cursor1.execute("select IdMembre, DateSeance, Duree from ArriveDep where Present = '1'")
    ListMembresPresent = cursor1.fetchall()

    cursor2 = connection.cursor()
    cursor2.execute("select count(*) from ArriveDep where Present = '1'")
    result = cursor2.fetchone()
    delimiter = ','
    NbrTotal = delimiter.join([str(result) for result in result])
    NbrTotal = int(NbrTotal)

    return Response(render_template('MembresPresent.xml', MembresPresent=ListMembresPresent, total = NbrTotal), content_type="text/xml")

@app.route('/DelArriveDep', methods=['POST'])
def DelArriveDep():

    if request.method == "POST":
        idMembre = request.form["para1"]

    connection = sqlite3.connect("Db.sqlite")
    cursor = connection.cursor()
    cursor.execute("update ArriveDep set Present = '0' Where IdMembre = ?",
        (idMembre,))
    connection.commit()
    return redirect('', 200)

@app.route('/AddMarchandise', methods=['POST'])
def AddMarchandise():

    DateAchat = date.today()

    if request.method == "POST":
        idMembre = request.form["para1"]
        idMarchandise = request.form["para2"]
        Quantite = request.form["para3"]

    connection = sqlite3.connect("Db.sqlite")
    cursor1 = connection.cursor()
    cursor1.execute("insert into Journal (IdMembre, DateAchat) Values (?, ?)",
                    (idMembre, DateAchat))

    cursor2 = connection.cursor()
    cursor2.execute("Select IdJournal from Journal order by IdJournal desc limit 1")
    result = cursor2.fetchone()
    delimiter = ','
    LastIdJournal = delimiter.join([str(result) for result in result])
    LastIdJournal = int(LastIdJournal)

    cursor3 = connection.cursor()
    cursor3.execute("insert into Achats (IdJournal, IdMarchandise, Quantite) VALUES (?,?,?)",
                    (LastIdJournal, idMarchandise, Quantite))

    connection.commit()
    return redirect('', 200)

@app.route('/Marchandises')
def Marchandises():
    connection = sqlite3.connect("Db.sqlite")
    cursor = connection.cursor()
    cursor.execute("select * from Marchandise")
    ListMarchandise = cursor.fetchall()
    return Response(render_template('Marchandise.xml', ListMarchandise=ListMarchandise), content_type="text/xml")

@app.route('/Journal')
def Journal():
    connection = sqlite3.connect("Db.sqlite")
    cursor = connection.cursor()
    cursor.execute("select j.IdJournal, j.IdMembre, j.IdFormule, j.DateAchat, a.IdMarchandise, a.Quantite, m.Nom, m.Prix from Journal J "
                   "left join Achats A on j.IdJournal = A.IdJournal "
                   "left JOIN Marchandise m ON A.IdMarchandise = m.IdMarchandise")
    Journals = cursor.fetchall()
    return Response(render_template('Journal.xml', Journals=Journals), content_type="text/xml")

if __name__ == '__main__':
    app.run()
