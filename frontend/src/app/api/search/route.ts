// app/api/search/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('ord');
  
  const response = await fetch(`http://localhost:9000/content/search?ord=${searchTerm}`);
  const data = await response.json();
  
  return NextResponse.json(data);
}