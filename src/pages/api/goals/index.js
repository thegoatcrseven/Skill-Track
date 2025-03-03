import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Constantes pour les statuts valides
const VALID_STATUSES = ['IN_PROGRESS', 'COMPLETED'];

// Fonction pour normaliser un statut
const normalizeStatus = (status) => {
  const normalized = status?.toUpperCase();
  return VALID_STATUSES.includes(normalized) ? normalized : 'IN_PROGRESS';
};

// Fonction pour formater un goal avant de le renvoyer
const formatGoal = (goal) => {
  return {
    ...goal,
    status: normalizeStatus(goal.status),
    dueDate: goal.dueDate ? goal.dueDate.toISOString() : null,
    createdAt: goal.createdAt.toISOString(),
    updatedAt: goal.updatedAt.toISOString()
  };
};

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
        
        // Formater chaque goal avant de le renvoyer
        const formattedGoals = goals.map(formatGoal);
        
        console.log('Goals fetched:', formattedGoals.length);
        return res.status(200).json(formattedGoals);
      } catch (error) {
        console.error('Database error while fetching goals:', error);
        return res.status(500).json({ 
          error: 'Failed to fetch goals',
          details: error.message
        });
      }
    }

    // POST /api/goals - Créer un nouveau goal
    if (req.method === 'POST') {
      console.log('Processing POST request');
      const { title, description, dueDate, status } = req.body;
      
      console.log('Request body:', req.body);
      
      if (!title?.trim()) {
        console.log('Title is missing or empty in request body');
        return res.status(400).json({ error: 'Title is required and cannot be empty' });
      }

      try {
        console.log('Creating goal in database...');
        const goal = await prisma.goal.create({
          data: {
            title: title.trim(),
            description: description?.trim() || null,
            dueDate: dueDate ? new Date(dueDate) : null,
            status: normalizeStatus(status)
          }
        });
        
        const formattedGoal = formatGoal(goal);
        console.log('Goal created successfully:', formattedGoal);
        return res.status(201).json(formattedGoal);
      } catch (error) {
        console.error('Database error while creating goal:', error);
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
    console.error('Unhandled API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
    console.log(`=== Request completed in ${Date.now() - startTime}ms ===\n`);
  }
}
