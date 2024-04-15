import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const jwtKey = process.env.JWT_SECRET_KEY as string;

/**
 * Interface para el payload del JWT
 */
interface JwtPayload {
  id: string;
  name: string;
}

/**
 * Middleware para validar el token JWT
 * @param req - Request con el token en el header 'x-token'
 * @param res - Response para enviar errores
 * @param next - Función para continuar con el siguiente middleware
 * @returns void o Response con error
 */
export const validarJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).send("No hay token en la petición");
  }

  try {
    const { id, name } = jwt.verify(token, jwtKey) as JwtPayload;
    req.body.id = id;
    req.body.name = name;
  } catch (error) {
    return res.status(401).send("Token no válido");
  }

  next();
};
