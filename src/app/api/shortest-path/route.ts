import findShortestPath from '@/utils/shortestPath';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
      const  locations  = await req.json();      
      if (!locations) {
          return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }
      const shortestPath = await findShortestPath(locations)
      return NextResponse.json(shortestPath, { status: 201 });
  } catch (error) {
      console.error('Error creating location:', error);
      return NextResponse.json({ message: 'Error creating location' }, { status: 500 });
  }
}

