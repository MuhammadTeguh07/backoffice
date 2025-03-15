import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwt";
import { cors, runMiddleware } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors);

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }

    try {
        const { email, password } = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password harus diisi', success: false });
        }

        // Cari user di database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Email atau Password salah', success: false });
        }

        // Cek password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email atau Password salah', success: false });
        }

        // Generate JWT token
        const token = signToken({ id: user.id, email: user.email });
        console.log(token)
        // Simpan token ke dalam tabel Session
        await prisma.session.create({
            data: {
                userId: user.id,
                token,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // Expire dalam 24 jam
            },
        });

        // Response sukses dengan token
        return res.status(200).json({ message: 'Login berhasil', data: token, success: true });
    } catch (error) {
        return res.status(500).json({ message: error, success: false });
    }
}
