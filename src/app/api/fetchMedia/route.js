import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const mediaUrl = url.searchParams.get("mediaUrl");
    const stream = ytdl(mediaUrl, { quality: "highestaudio" });

    return new NextResponse(stream);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { mediaUrl } = await req.json();
    const mediaInfo = await ytdl.getBasicInfo(mediaUrl);
    const mediaName = mediaInfo.videoDetails.title;
    return NextResponse.json(mediaName);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
