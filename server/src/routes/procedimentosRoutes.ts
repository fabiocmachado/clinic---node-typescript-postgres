import express, { Express } from "express";
import pool from "../db";

const router = express.Router();

router.get("/", async (req, res) =>{
    const result = await pool.query('SELECT * FROM procedimento ORDER BY id ASC ');
    res.json(result.rows);
})

export default router;