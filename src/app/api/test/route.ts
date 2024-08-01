import { NextRequest, NextResponse } from "next/server";
 
type ResponseData = {
  message: string
}
 
export async function GET(
  req: NextRequest,
  res: NextResponse<ResponseData>
) {
  return new Response('Hello from Next.js!', { status: 200 })
}