// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
type Data = {
  status: string;
  data?: {
    token: string;
  };
  message?: string;
};
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);
const AccessToken = twilio.jwt.AccessToken;
const { ChatGrant } = AccessToken;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    if (!req.body.identity) {
      return res.status(400).json({
        status: "fail",
        message: "Required identity property in body",
      });
    }
    if (!req.body.sid) {
      return res.status(400).json({
        status: "fail",
        message: "Required sid property in body",
      });
    }

    const { identity, sid } = req.body;
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_API_KEY!,
      process.env.TWILIO_API_SECRET!,
      { identity }
    );
    const chatGrant = new ChatGrant({
      serviceSid: process.env.TWILIO_CHAT_SERVICE,
    });

    await client.conversations
      .conversations(sid)
      .participants.create({ identity })
      .catch((err) => console.log(err));

    token.addGrant(chatGrant);
    return res.status(200).json({
      status: "success",
      data: {
        token: token.toJwt(),
      },
    });
  } else
    return res.status(400).json({
      status: "fail",
      message: "Only support POST request",
    });
}
