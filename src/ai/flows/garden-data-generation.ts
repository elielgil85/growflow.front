'use server';

/**
 * @fileOverview Populates the initial garden with a variety of mock tasks and plant types.
 *
 * - generateGardenData - A function that generates mock garden data.
 * - GardenDataInput - The input type for the generateGardenData function.
 * - GardenDataOutput - The return type for the generateGardenData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GardenDataInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to generate garden data.'),
});
export type GardenDataInput = z.infer<typeof GardenDataInputSchema>;

const TaskSchema = z.object({
  id: z.string().describe('Unique ID of the task.'),
  name: z.string().describe('Name of the task.'),
  completed: z.boolean().describe('Whether the task is completed.'),
  growthStage: z.number().describe('The current growth stage of the plant associated with the task.'),
  type: z.string().describe('Type of plant or task.'),
});

const GardenDataOutputSchema = z.object({
  tasks: z.array(TaskSchema).describe('An array of mock tasks for the garden.'),
});
export type GardenDataOutput = z.infer<typeof GardenDataOutputSchema>;

export async function generateGardenData(input: GardenDataInput): Promise<GardenDataOutput> {
  return generateGardenDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gardenDataPrompt',
  input: {schema: GardenDataInputSchema},
  output: {schema: GardenDataOutputSchema},
  prompt: `You are a garden data generator. Your task is to create a set of diverse and engaging tasks with associated plant types for a new user's garden within the GrowFlow application.

  Generate a JSON array of tasks for the user with the ID: {{{userId}}}.
  Each task should have a unique id, name, a completed status (either true or false), a growthStage (a number between 0 and 5), and a type (e.g., rose, tulip, oak, etc.).
  Make sure to return a variety of different plant types and task names to make the garden visually interesting and engaging.  Include tasks that are both completed and not completed and growth stages at various numbers.
  Limit the number of tasks to 10.
  Ensure the output is valid JSON.
  Example:
  {
    "tasks": [
      {
        "id": "1",
        "name": "Water Roses",
        "completed": false,
        "growthStage": 2,
        "type": "rose"
      },
      {
        "id": "2",
        "name": "Prune Tomatoes",
        "completed": true,
        "growthStage": 5,
        "type": "tomato"
      }
    ]
  }
  `,
});

const generateGardenDataFlow = ai.defineFlow(
  {
    name: 'generateGardenDataFlow',
    inputSchema: GardenDataInputSchema,
    outputSchema: GardenDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
