import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const locations = await prisma.location.findMany();
        console.log('Retrieved locations:', locations);
        return NextResponse.json(locations, { status: 200 });
    } catch (error) {
        console.error('Error retrieving locations:', error);
        return NextResponse.json({ message: 'Error retrieving locations' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, latitude, longitude } = await req.json();
        if (!name || !latitude || !longitude) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        const location = await prisma.location.create({
            data: {
                name,
                latitude,
                longitude
            }
        });
        console.log('Created new location:', location);
        return NextResponse.json(location, { status: 201 });
    } catch (error) {
        console.error('Error creating location:', error);
        return NextResponse.json({ message: 'Error creating location' }, { status: 500 });
    }
}