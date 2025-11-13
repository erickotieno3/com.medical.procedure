// AI Content Generation Service
// Generates blog posts and educational content
import { API_CONFIG, isOpenAIConfigured } from '../config/apiConfig';
import { allProcedures } from '../data/allProceduresData';

const DEMO_MODE = !isOpenAIConfigured();

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: Date;
  tags: string[];
  readTime: number;
}

export const generateBlogPost = (procedure: any): BlogPost => {
  if (DEMO_MODE) {
    console.log('⚠️ Demo Mode: AI blog generation limited. Add OpenAI API key for enhanced content.');
  }

  const templates = [
    `Understanding ${procedure.name}: A Comprehensive Guide`,
    `${procedure.name}: What Healthcare Professionals Need to Know`,
    `Step-by-Step: Performing ${procedure.name} Safely`,
    `Latest Updates on ${procedure.name} Procedures`,
    `Best Practices for ${procedure.name} in ${new Date().getFullYear()}`,
  ];

  const content = `

# ${procedure.name}

## Overview
${procedure.description}

## Key Indications
${procedure.indications?.join(', ') || 'Multiple clinical scenarios'}

## Procedure Steps
${procedure.steps?.map((step: any, i: number) => `${i + 1}. ${step.title || step}`).join('\n') || 'Detailed steps available in procedure guide'}

## Equipment Required
${procedure.equipment?.join(', ') || 'Standard surgical equipment'}

## Complications to Monitor
${procedure.complications?.join(', ') || 'Standard post-operative monitoring required'}

## Conclusion
This procedure is essential for ${procedure.specialty} specialists and requires proper training and adherence to protocols.
  `.trim();

  return {
    id: `blog-${procedure.id}-${Date.now()}`,
    title: templates[Math.floor(Math.random() * templates.length)],
    content,
    category: procedure.specialty,
    author: 'MedProc AI',
    date: new Date(),
    tags: [procedure.specialty, 'procedures', 'medical', 'training'],
    readTime: Math.ceil(content.length / 1000),
  };
};

export const autoGenerateBlogPosts = (): BlogPost[] => {
  return allProcedures.slice(0, 10).map(generateBlogPost);
};
