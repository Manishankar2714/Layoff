import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Layoff } from '@/models/Layoff';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');
    const company = searchParams.get('company');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const client = await clientPromise;
    const db = client.db('layoffTracker');
    
    let query = {};
    
    if (industry) {
      query = { ...query, industry };
    }
    
    if (company) {
      query = { ...query, company: { $regex: company, $options: 'i' } };
    }
    
    const layoffs = await db
      .collection<Layoff>('layoffs')
      .find(query)
      .sort({ date: -1 })
      .limit(limit)
      .toArray();
    
    return NextResponse.json({ layoffs });
  } catch (error) {
    console.error('Error fetching layoffs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch layoffs data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['company', 'date', 'employees', 'industry', 'source'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const newLayoff: Layoff = {
      ...body,
      date: new Date(body.date),
      employees: Number(body.employees),
      percentage: body.percentage ? Number(body.percentage) : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const client = await clientPromise;
    const db = client.db('layoffTracker');
    
    const result = await db.collection<Layoff>('layoffs').insertOne(newLayoff);
    
    return NextResponse.json({
      success: true,
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Error adding layoff:', error);
    return NextResponse.json(
      { error: 'Failed to add layoff data' },
      { status: 500 }
    );
  }
}