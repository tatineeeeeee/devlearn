import { NextRequest, NextResponse } from "next/server";
import { searchTutorials } from "@/lib/tutorials";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
        return NextResponse.json([]);
    }

    const results = searchTutorials(query);
    return NextResponse.json(results);
}
