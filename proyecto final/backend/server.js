const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let escenas = [
    { id: 1, nombre: "Callejón Oscuro", potencia: 10, color: "#552222" },
    { id: 2, nombre: "Laboratorio", potencia: 150, color: "#cccccc" }
];

app.get('/api/escenas', (req, res) => {
    res.json(escenas);
});

app.post('/api/escenas', (req, res) => {
    const nuevaEscena = {
        id: escenas.length + 1,
        ...req.body
    };
    escenas.push(nuevaEscena);
    res.status(201).json(nuevaEscena);
});

app.delete('/api/escenas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    escenas = escenas.filter(e => e.id !== id);
    res.json({ mensaje: `Escena ${id} eliminada correctamente` });
});

app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});

const mongoose = require('mongoose');

// Conexión a MongoDB (puedes usar una URL de Atlas o local)
mongoose.connect('mongodb://127.0.0.1:27017/lightrender_db')
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión", err));

// Definición del Modelo con validaciones
const EscenaSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, "El nombre es obligatorio"] },
    potencia: { type: Number, required: true },
    color: { type: String, default: "white" },
    modo: { type: String, enum: ['radiante', 'luminosa'], default: 'radiante' }
});

const Escena = mongoose.model('Escena', EscenaSchema);

// Ejemplo de cómo cambiaría tu POST para usar la base de datos
app.post('/api/escenas', async (req, res) => {
    try {
        const nuevaEscena = new Escena(req.body);
        await nuevaEscena.save(); // Aquí se guarda en Mongo
        res.status(201).json(nuevaEscena);
    } catch (error) {
        res.status(400).json({ error: error.message }); // Validación fallida
    }
});

const jwt = require('jsonwebtoken');
const SECRET_KEY = "tu_clave_secreta_super_pro"; // Esto debería estar en un .env

app.post('/api/login', (req, res) => {
    const { user, password } = req.body;

    // Simulación de validación
    if (user === "admin" && password === "12345") {
        const token = jwt.sign({ id: 1, role: "admin" }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    
    res.status(401).json({ error: "Credenciales inválidas" });
});

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: "No hay token" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });
        req.user = decoded;
        next(); // Si todo está bien, pasa al siguiente paso
    });
};

// Ejemplo: Solo el admin puede borrar escenas
app.delete('/api/escenas/:id', verificarToken, async (req, res) => {
    await Escena.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Escena eliminada" });
});