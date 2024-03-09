import { Request, Response } from "express";
import { knex } from "../database/conexao";
import { mensagensRequisicao } from "../mensagens/mensagensRequisicao";
import { Carro } from "../types/types";

export const listarCarros = async (_: Request, res: Response) => {
  try {
    const carros = await knex("carros");
    return res.status(200).json(carros);
  } catch {
    res.status(500).json({ mensagem: mensagensRequisicao.erroInterno });
  }
};

export const detalharCarros = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const carro = await knex<Carro>("carros")
      .where({ id: Number(id) })
      .first();

    if (!carro) {
      res.status(404).json({ mensagem: mensagensRequisicao.naoEncontrado });
    }
    return res.status(200).json(carro);
  } catch (error) {
    res.status(500).json({ mensagem: mensagensRequisicao.erroInterno });
  }
};

export const cadastrarCarros = async (req: Request, res: Response) => {
  const { marca, modelo, ano, cor, valor } = req.body;
  try {
    const novoCarro = await knex<Omit<Carro, "id">>("carros")
      .insert({
        marca,
        modelo,
        ano,
        cor,
        valor,
      })
      .returning("*");

    return res.status(201).json(novoCarro[0]);
  } catch (error) {
    res.status(500).json({ mensagem: mensagensRequisicao.erroInterno });
  }
};

export const atualizarCarros = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { marca, modelo, ano, cor, valor } = req.body;
  try {
    const carro = await knex<Carro>("carros")
      .where({ id: Number(id) })
      .first();

    if (!carro) {
      res.status(404).json({ mensagem: mensagensRequisicao.naoEncontrado });
    }
    await knex<Carro>("carros")
      .where({ id: Number(id) })
      .update({
        marca,
        modelo,
        ano,
        cor,
        valor,
      });

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: mensagensRequisicao.erroInterno });
  }
};

export const excluirCarros = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const carro = await knex<Carro>("carros")
      .where({ id: Number(id) })
      .first();

    if (!carro) {
      res.status(404).json({ mensagem: mensagensRequisicao.naoEncontrado });
    }
    await knex<Carro>("carros")
      .where({ id: Number(id) })
      .del();

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: mensagensRequisicao.erroInterno });
  }
};
