const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = "tu_clave_secreta_super_pro";

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// CONEXIÓN A MONGODB
mongoose.connect('mongodb+srv://pedrolinares_db_user:2pTbYJjQ59Bo4QA9@proyectolightrender.md9dyqj.mongodb.net/?appName=ProyectoLightRender')
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión", err));

// MODELO
const EscenaSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, "El nombre es obligatorio"] },
    watts: { type: Number, required: true }, // Asegúrate que se llame 'watts' o 'potencia' igual que en tu HTML
    selectedColor: { type: String, default: "white" },
    mode: { type: String, default: 'radiante' },
    sensibilidad: { type: Number, default: 1.0 }
});
const Escena = mongoose.model('Escena', EscenaSchema);

// MIDDLEWARE DE JWT
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: "No hay token" });
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });
        req.user = decoded;
        next();
    });
};

// --- RUTAS ---

// 1. LOGIN
app.post('/api/login', (req, res) => {
    const { user, password } = req.body;
    if (user === "admin" && password === "12345") {
        const token = jwt.sign({ id: 1, role: "admin" }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ error: "Credenciales inválidas" });
});

// 2. OBTENER ESCENAS (Desde MongoDB)
app.get('/api/escenas', async (req, res) => {
    const escenas = await Escena.find(); // Busca en la base de datos de verdad
    res.json(escenas);
});

// 3. GUARDAR ESCENA (En MongoDB)
app.post('/api/escenas', async (req, res) => {
    try {
        console.log("Recibiendo datos para guardar:", req.body);
        const nuevaEscena = new Escena(req.body);
        await nuevaEscena.save(); 
        res.status(201).json(nuevaEscena);
    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(400).json({ error: error.message });
    }
});

// 4. ELIMINAR ESCENA
app.delete('/api/escenas/:id', verificarToken, async (req, res) => {
    try {
        await Escena.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Escena eliminada de MongoDB" });
    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`);
});