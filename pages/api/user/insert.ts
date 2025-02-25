// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { cors, runMiddleware } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors);

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, Password, dan Nama harus diisi', success: false });
    }

    try {
        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Membuat user baru di database
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return res.status(201).json({ message: 'Berhasil Membuat User', data: newUser, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan server', success: false });
    }
}
