import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Inisialisasi middleware CORS
export const cors = Cors({
  methods: ['POST', 'OPTIONS'],
  origin: '*', // Ganti '*' dengan domain yang diizinkan, misal 'http://localhost:3000'
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Helper untuk menjalankan middleware
export function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
