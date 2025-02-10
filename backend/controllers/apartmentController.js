import connection from "../connection.js";
import CustomError from "../classes/CustomError.js";

function index(req, res) {
    const sql = "SELECT *  FROM `apartments` ORDER BY `likes` DESC;";
    connection.query(sql, (err, results) => {
        if (err) res.status(500).json({ error: 'Errore del server' });
        const response = {
            status: "success",
            count: results.length,
            items: results
        }
        res.json(response)
    });
}

function show(req, res) {
    const id = parseInt(req.params.id);
    // Recupero tutti i libri e per ciascun libro il numero delle recensioni e la media voto totale:
    const sql = `SELECT apartments.*, AVG(reviews.vote) AS vote_average, COUNT(reviews.text) AS commenti
                FROM reviews
                RIGHT JOIN apartments 
                ON apartments.id = reviews.apartment_id
                WHERE apartments.id = ? `;
    // Uso il metodo query() per passargli la query SQL e una funzione di callback:
    connection.query(sql, [id], (err, results) => {
        // Se rilevo un errore nella chiamata al database, restituisco l'errore HTTP 500 Internal Server Error” e un messaggio personalizzato:
        if (err) return res.status(500).json({
            error: 'Errore del server'
        });
        // Assegno alla costante item i dati ritornati dalla query:
        const item = results[0];
        if (item.id == null) return res.status(404).json({ error: 'Libro non trovato' });
        // Creo la query SQL con le Prepared statements (? al posto di id) per evitare le SQL Injections:
        const sqlReviews = "SELECT * FROM `reviews` WHERE `apartment_id` = ?";
        // Uso il metodo query() per passargli la query SQL, il valore di di id nel segnaposto "?", e una funzione di callback:
        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: "Error server" });
            // Aggiungo all'oggetto item una chiave/proprietà che conterrà i commenti associati:
            item.reviews = reviews;
            // Ritorno l'oggetto (item)
            res.json(item);
        });
    });
}

function store(req, res) {
}

// Agiunta dei commenti al singolo libro
function storeReview(req, res) {
    // Recuperiamo l'id:
    const { id } = req.params
    // Recuperiamo il body:
    const { text, name, vote } = req.body
    // Prepariamo la query:
    const sql = "INSERT INTO reviews (text, name, vote, apartment_id) VALUES (?, ?, ?, ?)"

    // Eseguo la query:
    connection.query(sql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: "Query non trovata nel database" });
        res.status(201).json({ message: "Review added", id: results.insertId });
    })
}

function update(req, res) {
}
function destroy(req, res) {
    const id = parseInt(req.params.id);
    // Uso il metodo query() per passargli la query SQL, il valore di "?", e una funzione di callback:
    connection.query("DELETE FROM `apartments` WHERE `id` = ?", [id], (err) => {
        // Se rilevo un errore restituisco l'errore HTTP 500 Internal Server Error” e un messaggio personalizzato:
        if (err) return res.status(500).json({ error: 'Errore del server! Cancellazione fallita' });
        // Invio lo status 204: il server ha completato con successo la richiesta, ma restituisco alcun contenuto
        res.sendStatus(204);
    });
}

export { index, show, store, storeReview, update, destroy };
