import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const startTime = Date.now();
  console.log('=== Starting API request ===');
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  
  try {
    // GET /api/goals - Récupérer tous les goals
    if (req.method === 'GET') {
      console.log('Processing GET request');
      try {
        const goals = await prisma.goal.findMany({
          orderBy: {
            createdAt: 'desc'
          }
        });
        
        console.log('Goals fetched:', goals.length);
        return res.status(200).json(goals);
      } catch (error) {
        console.error('Database error while fetching goals:', {
          error: error.message,
          name: error.name,
          code: error.code,
          stack: error.stack
        });
        return res.status(500).json({ 
          error: 'Failed to fetch goals',
          details: error.message
        });
      }
    }

    // POST /api/goals - Créer un nouveau goal
    if (req.method === 'POST') {
      console.log('Processing POST request');
      const { title, description, dueDate } = req.body;
      
      console.log('Request body:', req.body);
      
      if (!title) {
        console.log('Title is missing in request body');
        return res.status(400).json({ error: 'Title is required' });
      }

      try {
        console.log('Creating goal in database...');
        const goal = await prisma.goal.create({
          data: {
            title,
            description,
            dueDate: dueDate ? new Date(dueDate) : null,
            status: 'IN_PROGRESS'
          }
        });
        
        console.log('Goal created successfully:', goal);
        return res.status(201).json(goal);
      } catch (error) {
        console.error('Database error while creating goal:', {
          error: error.message,
          name: error.name,
          code: error.code,
          stack: error.stack
        });
        return res.status(500).json({ 
          error: 'Failed to create goal',
          details: error.message
        });
      }
    }

    // Méthode non supportée
    console.log('Method not allowed:', req.method);
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    
  } catch (error) {
    console.error('Unhandled API error:', {
      error: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack
    });
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
    console.log(`=== Request completed in ${Date.now() - startTime}ms ===\n`);
  }
}
