import { AnimalType } from '../types/animal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface AnimalTypeGridProps {
  animalTypes: AnimalType[];
  onSelectType: (typeId: string) => void;
}

const imageMap: { [key: string]: string } = {
  Cow: 'https://images.unsplash.com/photo-1730067492788-ea2dcabddee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMGNvdyUyMGNhdHRsZXxlbnwxfHx8fDE3NzMzNzQyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  Piggy: 'https://images.unsplash.com/photo-1716140238774-42cc9572c2a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWclMjBmYXJtJTIwbGl2ZXN0b2NrfGVufDF8fHx8MTc3MzM3NDI0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  Sheep: 'https://images.unsplash.com/photo-1656635097553-00ae8a7c3683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVlcCUyMHdvb2wlMjBmYXJtfGVufDF8fHx8MTc3MzM3NDI0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  Rabbit: 'https://images.unsplash.com/photo-1723625449728-40e7a4d968e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2F0JTIwZmFybSUyMGxpdmVzdG9ja3xlbnwxfHx8fDE3NzMzNzQyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  Bird: 'https://images.unsplash.com/photo-1596646532903-ad5a3b364751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwaGVuJTIwcG91bHRyeXxlbnwxfHx8fDE3NzMzNzQyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

export function AnimalTypeGrid({ animalTypes, onSelectType }: AnimalTypeGridProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2">Sistema de Regulación y Control de Ganado</h1>
        <p className="text-muted-foreground">
          Seleccione un tipo de animal para ver el inventario certificado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animalTypes.map((type) => {
          const imageUrl = imageMap[type.icon];
          return (
            <Card
              key={type.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-card border-2"
              onClick={() => onSelectType(type.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#5A7324]">
                    <img 
                      src={imageUrl} 
                      alt={type.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-[#5A7324] text-white px-3 py-1 rounded-full">
                    {type.count}
                  </div>
                </div>
                <CardTitle className="mt-4">{type.name}</CardTitle>
                <CardDescription className="text-card-foreground/70">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click para ver animales registrados
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}