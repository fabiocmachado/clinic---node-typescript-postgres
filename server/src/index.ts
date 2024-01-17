import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
const port = 3333   ;

app.get("/", (req, res) =>{
    res.send('Bem-vindo à sua aplicação de gerenciamento de paciente!')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}. `);
})