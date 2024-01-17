import express from 'express';
import cors from 'cors';
import pacientesRoutes from './routes/pacientesRoutes';
import procedimentosRoutes from './routes/procedimentosRoutes';


const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send('Bem-vindo à sua aplicação de gerenciamento de paciente!')
})

app.use('/pacientes', pacientesRoutes);
app.use('/procedimentos', procedimentosRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}. `);
})