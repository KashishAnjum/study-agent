import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "user",
              content: body.userMessage,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      answer:
        data?.choices?.[0]?.message?.content ||
        JSON.stringify(data),
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
    });
  }
}