
const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


let medicos = [];

app.get('/medicos', (req,res) => {
    res.json(medicos);
})


app.post('/medicos',(req, res) => {
    const { idMedico, identificacion, nombres, telefono, correo } = req.body;

    const existe = medicos.find(m => m.idMedico === idMedico);
    if(existe) {
        return res.status(400).json({ error: 'El médico ya existe' });
    }

    const nuevoMedico = {idMedico, identificacion, nombres, telefono, correo};
    medicos.push(nuevoMedico);
    res.status(201).json(nuevoMedico);
});


app.put('/medicos/:id', (req, res) => {
    const id = req.params.id;
    const { identificacion, nombres, telefono, correo } = req.body;

    const medicoIndex = medicos.findIndex(m => m.idMedico === id);
    if(medicoIndex === -1) {
        return res.status(404).json({ error: 'Medico no encontrado'});
    }

    if (identificacion) medicos[medicoIndex].identificacion = identificacion;
    if (nombres) medicos[medicoIndex].nombres = nombres;
    if (telefono) medicos[medicoIndex].telefono = telefono;
    if (correo) medicos[medicoIndex].correo = correo;

    res.json(medicos[medicoIndex]);
});


app.delete('/medicos/:idMedico', (req, res) => {
    const id = req.params.idMedico;

    const medicoIndex = medicos.findIndex(m => m.idMedico === id);
    if (medicoIndex === -1) {
        return res.status(404).json({ error: 'Medico no encontrado' });
    }

    const eliminado = medicos.splice(medicoIndex, 1);

    res.json({ mensaje: 'Medico eliminado', medico: eliminado[0] });
});


let pacientes = [];


app.get('/pacientes', (req, res) => {
    res.json(pacientes);
});



app.post('/pacientes', (req, res) => {
    const { idPacientes, identificacion, nombres, telefono, correo } = req.body;

    const existe = pacientes.find(p => p.idPacientes === idPacientes);
    if (existe) {
        return res.status(400).json({ error: 'El paciente ya existe' });
    }

    const nuevoPaciente = { idPacientes, identificacion, nombres, telefono, correo };
    pacientes.push(nuevoPaciente);
    res.status(201).json(nuevoPaciente);
});


app.put('/pacientes/:id', (req, res) => {
    const id = req.params.id;
    const { identificacion, nombres, telefono, correo } = req.body;

    const pacienteIndex = pacientes.findIndex(p => p.idPacientes === id);
    if (pacienteIndex === -1) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    if (identificacion) pacientes[pacienteIndex].identificacion = identificacion;
    if (nombres) pacientes[pacienteIndex].nombres = nombres;
    if (telefono) pacientes[pacienteIndex].telefono = telefono;
    if (correo) pacientes[pacienteIndex].correo = correo;

    res.json(pacientes[pacienteIndex]);
});


app.delete('/pacientes/:idPacientes', (req, res) => {
    const id = req.params.idPacientes;

    const pacienteIndex = pacientes.findIndex(p => p.idPacientes === id);
    if (pacienteIndex === -1) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    const eliminado = pacientes.splice(pacienteIndex, 1);

    res.json({ mensaje: 'Paciente eliminado', paciente: eliminado[0] });
});


app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});