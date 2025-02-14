import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log('=== Starting registration request ===');
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Processing registration request');
    const { name, email, password } = req.body;

    // Validation des champs
    if (!name || !email || !password) {
      console.log('Missing required fields:', { 
        name: !!name, 
        email: !!email, 
        password: !!password 
      });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Vérifier si l'email existe déjà
    console.log('Checking if email exists:', email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (existingUser) {
      console.log('Email already exists:', email);
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hasher le mot de passe
    console.log('Hashing password...');
    const hashedPassword = await hash(password, 12);

    console.log('Creating user...');
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    console.log('User created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name
    });

    return res.status(201).json({
      message: 'User created successfully',
      user
    });

  } catch (error) {
    console.error('Registration error:', {
      message: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack
    });
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: 'Email already exists',
        details: 'This email is already registered'
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to create account',
      details: error.message
    });
  } finally {
    await prisma.$disconnect();
    console.log('=== Registration request completed ===\n');
  }
}
