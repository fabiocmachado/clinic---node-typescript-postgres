import express from 'express';
import pool from '../db';

const router = express.Router();

router.get('/', async (req, res) =>{
	const result = await pool.query('SELECT * FROM procedimento ORDER BY id ASC ');
	res.json(result.rows);
});

router.post('/', async (req, res) => {
	const { nome_do_procedimento, valor, data_de_realização, observação, paciente_id} = req.body;
	const result = await pool.query(
		'INSERT INTO procedimento (nome_do_procedimento, valor, data_de_realização, observação, paciente_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *',
		[nome_do_procedimento, valor, data_de_realização, observação, paciente_id]
	);
	res.json(result.rows[0]);
    
});
  
router.get('/:id', async (req, res) => {
	const procedimentoId = parseInt(req.params.id, 10);
	const result = await pool.query('SELECT * FROM procedimento WHERE id = $1', [procedimentoId]);
	res.json(result.rows[0]);
      
});
  
router.put('/:id', async (req, res) => {
    
	const procedimentoId = parseInt(req.params.id, 10);
	const { nome_do_procedimento, valor, data_de_realização, observação} = req.body;
	const result = await pool.query(
		'UPDATE procedimento SET nome_do_procedimento = $1, valor = $2, data_de_realização = $3, observação = $4 WHERE id = $5 RETURNING *',
		[nome_do_procedimento, valor, data_de_realização, observação, procedimentoId]
	);
	res.json(result.rows[0]);
});
    

router.delete('/:id', async (req, res) => {
     
	const procedimentoId = parseInt(req.params.id, 10);
	await pool.query('DELETE FROM procedimento WHERE id = $1 RETURNING *', [procedimentoId]);
	res.json({ message: 'procedimento excluído com sucesso' });
     
});

export default router;