import express, { Express } from "express";
import pool from "../db";

const router = express.Router();

router.get("/", async (req, res) =>{
    const result = await pool.query('SELECT * FROM paciente ORDER BY id ASC ');
    res.json(result.rows);
})

router.post("/", async (req,res) => {
    const { nome_completo, data_de_nascimento, nif, email, telefone } = req.body;
    const result = await pool.query(
      'INSERT INTO paciente (nome_completo, data_de_nascimento, nif, email, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome_completo, data_de_nascimento, nif, email, telefone]
    );
    res.json(result.rows[0]);
});

router.get("/:id", async (req, res) => {
    const pacienteId = parseInt(req.params.id, 10);
    const result = await pool.query('SELECT * FROM paciente WHERE id = $1', [pacienteId]);
    res.json(result.rows[0]);
});

router.get('/:id/procedimentos', async (req, res) => {
    const pacienteId = parseInt(req.params.id, 10);
    const result = await pool.query('SELECT * FROM procedimento WHERE paciente_id = $1',[pacienteId]);
    res.json(result.rows);
});

router.put("/:id", async (req, res) => {
    const pacienteId = parseInt(req.params.id, 10);
    const { nome_completo, data_de_nascimento, nif, email, telefone } = req.body;
    const result = await pool.query(
        'UPDATE paciente SET nome_completo = $1, data_de_nascimento = $2, nif = $3, email = $4, telefone = $5 WHERE id = $6 RETURNING *',
        [nome_completo, data_de_nascimento, nif, email, telefone, pacienteId]
    );
    res.json(result.rows[0]);  
});

router.delete('/:id', async (req, res) => {
    const pacienteId = parseInt(req.params.id, 10);
    const result = await pool.query('DELETE FROM paciente WHERE id = $1 RETURNING *', [pacienteId]);
    res.json({ message: 'Paciente excluído com sucesso' });
});
export default router;