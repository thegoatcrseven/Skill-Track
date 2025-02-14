import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  console.log(`Processing ${req.method} request for goal ${id}`);

  try {
    // PATCH /api/goals/[id] - Mettre à jour un objectif
    if (req.method === 'PATCH') {
      const { status } = req.body;
      console.log('Updating goal status:', { id, status });
      
      const updatedGoal = await prisma.goal.update({
        where: { id },
        data: { status }
      });
      
      console.log('Goal updated:', updatedGoal);
      return res.status(200).json(updatedGoal);
    }

    // DELETE /api/goals/[id] - Supprimer un objectif
    if (req.method === 'DELETE') {
      console.log('Deleting goal:', id);
      
      await prisma.goal.delete({
        where: { id }
      });
      
      console.log('Goal deleted successfully');
      return res.status(204).end();
    }

    // Méthode non supportée
    res.setHeader('Allow', ['PATCH', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
