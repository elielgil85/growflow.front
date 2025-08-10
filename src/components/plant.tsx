'use client';
// Ajustado para aceitar o formato de tarefa vindo do componente GardenView
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Flower2, Sprout, Leaf, CheckCircle2, Circle } from 'lucide-react';

interface MappedTask {
    id: string;
    name: string;
    completed: boolean;
    growthStage: number;
    type: string;
}

const PlantIcon = ({ stage }: { stage: number }) => {
    const iconProps = {
        className: "transition-all duration-500"
    };
    switch (stage) {
        case 0: return <Sprout {...iconProps} style={{ color: 'hsl(88, 57%, 53%)' }} className="h-10 w-10" />;
        case 1: return <Sprout {...iconProps} style={{ color: 'hsl(120, 57%, 45%)' }} className="h-14 w-14" />;
        case 2: return <Leaf {...iconProps} style={{ color: 'hsl(120, 61%, 40%)' }} className="h-16 w-16" />;
        case 3: return <Leaf {...iconProps} style={{ color: 'hsl(120, 61%, 34%)' }} className="h-20 w-20" />;
        case 4: return <Flower2 {...iconProps} style={{ color: 'hsl(340, 82%, 60%)' }} className="h-20 w-20" />;
        case 5: return <Flower2 {...iconProps} style={{ color: 'hsl(51, 100%, 50%)' }} className="h-24 w-24" />;
        default: return <Sprout {...iconProps} className="h-10 w-10" />;
    }
};

export default function Plant({ task }: { task: MappedTask }) {
  const { name, growthStage, completed, type } = task;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative flex flex-col items-center justify-end h-48 group cursor-pointer animate-in fade-in zoom-in-95">
            <div className="absolute bottom-0 w-20 h-4 bg-yellow-900/20 rounded-t-full" />
            <div className="z-10 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 flex items-center justify-center">
                <PlantIcon stage={growthStage} />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-background border-primary shadow-lg">
          <p className="font-bold font-headline">{name}</p>
          <p className="text-sm text-muted-foreground">Type: <span className="capitalize font-semibold text-foreground">{type}</span></p>
          <p className="text-sm text-muted-foreground">Growth Stage: {growthStage}/5</p>
          <div className="flex items-center gap-2 mt-2">
            {completed ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
            <span className={cn('text-sm font-semibold', completed ? 'text-primary' : 'text-muted-foreground')}>
              {completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
