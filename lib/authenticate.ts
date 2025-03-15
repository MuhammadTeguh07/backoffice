import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function authenticate(req: NextApiRequest, res: NextApiResponse) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verifikasi JWT
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid user", success: false });
        }

        // Cek apakah token masih tersimpan di database (sesi aktif)
        const session = await prisma.session.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!session) {
            return res.status(401).json({ message: "Session expired", success: false });
        }

        return {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            createdAt: session.user.createdAt,
        };
    } catch (error) {
        return res.status(401).json({ message: "Invalid user", success: false });
    }
}
