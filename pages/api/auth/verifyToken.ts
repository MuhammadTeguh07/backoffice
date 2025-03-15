import { authenticate } from "@/lib/authenticate";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed", success: false });
    }

    const user = await authenticate(req, res);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }

    return res.status(200).json({
        message: "Token valid",
        success: true,
        data: user,
    });
}
