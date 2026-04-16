const express = require("express");
const router = express.Router();
const { items } = require("../data/db");

/**
 * GET /api/items
 * Recupera tutti gli elementi
 * Livello 3: supporta filtro per nome (?name=), ordinamento (?sort=name|year|rating&order=asc|desc)
 */
router.get("/", (req, res) => {
    let result = [...items];

    // Filtro per nome (case-insensitive)
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        result = result.filter(item => item.name.toLowerCase().includes(search));
    }

    // Filtro per genere (?genre=)
    if (req.query.genre) {
        const genre = req.query.genre.toLowerCase();
        result = result.filter(item => item.genre.toLowerCase().includes(genre));
    }

    // Ordinamento (?sort=name|year|rating, ?order=asc|desc)
    if (req.query.sort) {
        const sortField = req.query.sort;
        const order = req.query.order === "desc" ? -1 : 1;
        const validFields = ["name", "year", "rating", "id"];

        if (!validFields.includes(sortField)) {
            return res.status(400).json({ message: `Campo di ordinamento non valido. Usa: ${validFields.join(", ")}` });
        }

        result.sort((a, b) => {
            if (a[sortField] < b[sortField]) return -1 * order;
            if (a[sortField] > b[sortField]) return 1 * order;
            return 0;
        });
    }

    res.json(result);
});

/**
 * GET /api/items/:id
 * Recupera un elemento per ID
 */
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID non valido, deve essere un numero" });
    }

    const item = items.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({ message: "Elemento non trovato" });
    }

    res.json(item);
});

/**
 * POST /api/items
 * Crea un nuovo elemento
 * Livello 3: validazione dati
 */
router.post("/", (req, res) => {
    const { name, genre, year, rating } = req.body;

    // Validazione: name obbligatorio
    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "Il campo 'name' e' obbligatorio e deve essere una stringa non vuota" });
    }

    // Validazione: year opzionale ma se presente deve essere un numero valido
    if (year !== undefined && (isNaN(year) || year < 1970 || year > new Date().getFullYear())) {
        return res.status(400).json({ message: `Il campo 'year' deve essere un numero tra 1970 e ${new Date().getFullYear()}` });
    }

    // Validazione: rating opzionale ma se presente deve essere tra 0 e 10
    if (rating !== undefined && (isNaN(rating) || rating < 0 || rating > 10)) {
        return res.status(400).json({ message: "Il campo 'rating' deve essere un numero tra 0 e 10" });
    }

    // Genera nuovo ID (max ID esistente + 1)
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

    const newItem = {
        id: newId,
        name: name.trim(),
        genre: genre ? genre.trim() : "N/A",
        year: year ? parseInt(year) : null,
        rating: rating !== undefined ? parseFloat(rating) : null
    };

    items.push(newItem);

    res.status(201).json(newItem);
});

/**
 * PUT /api/items/:id
 * Modifica un elemento esistente
 * Livello 3: validazione dati
 */
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID non valido, deve essere un numero" });
    }

    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Elemento non trovato" });
    }

    const { name, genre, year, rating } = req.body;

    // Validazione: almeno un campo da aggiornare
    if (!name && !genre && year === undefined && rating === undefined) {
        return res.status(400).json({ message: "Fornire almeno un campo da aggiornare: name, genre, year, rating" });
    }

    // Validazione name se fornito
    if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
        return res.status(400).json({ message: "Il campo 'name' deve essere una stringa non vuota" });
    }

    // Validazione year se fornito
    if (year !== undefined && (isNaN(year) || year < 1970 || year > new Date().getFullYear())) {
        return res.status(400).json({ message: `Il campo 'year' deve essere un numero tra 1970 e ${new Date().getFullYear()}` });
    }

    // Validazione rating se fornito
    if (rating !== undefined && (isNaN(rating) || rating < 0 || rating > 10)) {
        return res.status(400).json({ message: "Il campo 'rating' deve essere un numero tra 0 e 10" });
    }

    // Aggiorna solo i campi forniti (merge parziale)
    if (name !== undefined) items[index].name = name.trim();
    if (genre !== undefined) items[index].genre = genre.trim();
    if (year !== undefined) items[index].year = parseInt(year);
    if (rating !== undefined) items[index].rating = parseFloat(rating);

    res.json(items[index]);
});

/**
 * DELETE /api/items/:id
 * Elimina un elemento
 */
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID non valido, deve essere un numero" });
    }

    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Elemento non trovato" });
    }

    const deleted = items.splice(index, 1)[0];

    res.json({ message: "Elemento eliminato con successo", deleted });
});

module.exports = router;
