import { NextResponse } from 'next/server';
import { scrapeLayoffData } from '@/lib/scraper';
import clientPromise from '@/lib/mongodb';
import { Layoff } from '@/models/Layoff';

export async function GET(request: Request) {
  try {
    // This would trigger the scraping process
    const layoffs = await scrapeLayoffData();
    
    // In a real implementation, we would save the scraped data to MongoDB
    const client = await clientPromise;
    const db = client.db('layoffTracker');
    
    // For demo purposes only - this won't actually save data since we're using mock data
    // and MongoDB connection isn't configured in this demo
    
    // Prepare the response with some status information
    return NextResponse.json({
      success: true,
      message: 'Scraper ran successfully',
      layoffs: layoffs.length,
      // This is just for demo purposes to show the data structure
      sampleData: layoffs.slice(0, 2),
    });
  } catch (error) {
    console.error('Error running scraper:', error);
    return NextResponse.json(
      { error: 'Failed to run scraper' },
      { status: 500 }
    );
  }
}

// In a real implementation, this endpoint would be triggered by a cron job
// or manually by an admin to update the database with new layoff data
export async function POST(request: Request) {
  try {
    const { runFull } = await request.json();
    
    // The 'runFull' parameter could determine if we do a full scrape of all sources
    // or just check for recent updates
    
    // Simulate scraping
    const layoffs = await scrapeLayoffData();
    
    // In a real implementation, we would:
    // 1. Process the scraped data (clean, normalize, etc.)
    // 2. Check if the layoff already exists in the database
    // 3. Update existing entries or create new ones
    // 4. Update related collections (companies, industries)
    
    const client = await clientPromise;
    const db = client.db('layoffTracker');
    
    // This is for demo purposes only and won't actually run in this environment
    const processedCount = layoffs.length;
    const newCount = layoffs.length;
    
    return NextResponse.json({
      success: true,
      message: 'Scraper triggered successfully',
      processedCount,
      newCount,
    });
  } catch (error) {
    console.error('Error triggering scraper:', error);
    return NextResponse.json(
      { error: 'Failed to trigger scraper' },
      { status: 500 }
    );
  }
}