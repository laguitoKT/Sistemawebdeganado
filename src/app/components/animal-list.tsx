import { useState } from 'react';
import { Animal } from '../types/animal';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft, FileText, Activity, LayoutGrid, Table as TableIcon, Building2, Home as HomeIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface AnimalListProps {
  animals: Animal[];
  typeName: string;
  onBack: () => void;
  onSelectAnimal: (animal: Animal) => void;
}

const healthStatusColors = {
  'Excelente': 'bg-[#5A7324] text-white hover:bg-[#5A7324]/80',
  'Bueno': 'bg-[#B3BF56] text-[#401C08] hover:bg-[#B3BF56]/80',
  'Regular': 'bg-[#F2EAC2] text-[#401C08] hover:bg-[#F2EAC2]/80',
  'Requiere Atención': 'bg-[#BC4C27] text-white hover:bg-[#BC4C27]/80',
};

type ViewMode = 'grid' | 'table';
type FilterMode = 'all' | 'comercial' | 'traspatio';

export function AnimalList({ animals, typeName, onBack, onSelectAnimal }: AnimalListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  // Filtrar animales por tipo de rancho
  const filteredAnimals = filterMode === 'all' 
    ? animals 
    : animals.filter(animal => 
        animal.producer.ranchType.toLowerCase() === filterMode
      );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-4 border-[#401C08] text-[#401C08] hover:bg-[#401C08] hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a categorías
        </Button>
        
        <div className="mb-4">
          <h1 className="mb-2">{typeName}</h1>
          <p className="text-muted-foreground">
            {filteredAnimals.length} animal{filteredAnimals.length !== 1 ? 'es' : ''} {filterMode !== 'all' && `en ranchos ${filterMode === 'comercial' ? 'comerciales' : 'de traspatio'}`}
          </p>
        </div>

        {/* Filtros por tipo de rancho */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            onClick={() => setFilterMode('all')}
            variant={filterMode === 'all' ? 'default' : 'outline'}
            className={filterMode === 'all' 
              ? 'bg-[#5A7324] text-white hover:bg-[#5A7324]/90' 
              : 'border-[#5A7324] text-[#5A7324] hover:bg-[#5A7324] hover:text-white'}
          >
            <LayoutGrid className="mr-2 h-4 w-4" />
            Todos los Animales
          </Button>
          <Button
            onClick={() => setFilterMode('comercial')}
            variant={filterMode === 'comercial' ? 'default' : 'outline'}
            className={filterMode === 'comercial' 
              ? 'bg-[#5A7324] text-white hover:bg-[#5A7324]/90' 
              : 'border-[#5A7324] text-[#5A7324] hover:bg-[#5A7324] hover:text-white'}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Ranchos Comerciales
          </Button>
          <Button
            onClick={() => setFilterMode('traspatio')}
            variant={filterMode === 'traspatio' ? 'default' : 'outline'}
            className={filterMode === 'traspatio' 
              ? 'bg-[#5A7324] text-white hover:bg-[#5A7324]/90' 
              : 'border-[#5A7324] text-[#5A7324] hover:bg-[#5A7324] hover:text-white'}
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Ranchos de Traspatio
          </Button>
        </div>

        {/* Botones de vista */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Vista:</p>
          <div className="flex gap-2">
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              className={viewMode === 'grid' 
                ? 'bg-[#401C08] text-white hover:bg-[#401C08]/90' 
                : 'border-[#401C08] text-[#401C08] hover:bg-[#401C08] hover:text-white'}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Tarjetas
            </Button>
            <Button
              onClick={() => setViewMode('table')}
              variant={viewMode === 'table' ? 'default' : 'outline'}
              className={viewMode === 'table' 
                ? 'bg-[#401C08] text-white hover:bg-[#401C08]/90' 
                : 'border-[#401C08] text-[#401C08] hover:bg-[#401C08] hover:text-white'}
            >
              <TableIcon className="mr-2 h-4 w-4" />
              Tabla
            </Button>
          </div>
        </div>
      </div>

      {filteredAnimals.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-[#401C08] mb-2">No se encontraron animales</h2>
          <p className="text-muted-foreground">
            No hay animales registrados en esta categoría para {filterMode === 'comercial' ? 'ranchos comerciales' : 'ranchos de traspatio'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => (
            <Card key={animal.id} className="bg-card border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{animal.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{animal.breed}</p>
                  </div>
                  <Badge className={healthStatusColors[animal.healthStatus]}>
                    {animal.healthStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Precio:</p>
                    <p className="font-medium text-foreground">${animal.price?.toLocaleString('es-MX') || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Edad:</p>
                    <p className="font-medium text-foreground">{animal.age} años</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Peso:</p>
                    <p className="font-medium text-foreground">{animal.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Género:</p>
                    <p className="font-medium text-foreground">{animal.gender}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm pt-2">
                  <Building2 className="h-4 w-4 text-[#5A7324]" />
                  <div>
                    <p className="font-medium text-foreground">{animal.producer.ranchName}</p>
                    <p className="text-xs text-muted-foreground">
                      {animal.producer.ranchType === 'Comercial' ? 'Rancho Comercial' : 'Rancho de Traspatio'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Activity className="h-4 w-4 text-[#5A7324]" />
                  <span className="text-foreground">
                    Certificado por {animal.vetCertification.certifiedBy}
                  </span>
                </div>

                <Button
                  onClick={() => onSelectAnimal(animal)}
                  className="w-full bg-[#401C08] text-white hover:bg-[#401C08]/90"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Ficha Técnica
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border-2 border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#401C08] hover:bg-[#401C08]">
                <TableHead className="text-white">ID</TableHead>
                <TableHead className="text-white">Nombre</TableHead>
                <TableHead className="text-white">Rancho</TableHead>
                <TableHead className="text-white">Tipo</TableHead>
                <TableHead className="text-white">Raza</TableHead>
                <TableHead className="text-white">Edad</TableHead>
                <TableHead className="text-white">Peso</TableHead>
                <TableHead className="text-white">Estado de Salud</TableHead>
                <TableHead className="text-white">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnimals.map((animal) => (
                <TableRow key={animal.id} className="hover:bg-[#F2EAC2]/30">
                  <TableCell className="font-medium">{animal.id}</TableCell>
                  <TableCell>{animal.name}</TableCell>
                  <TableCell className="text-sm">{animal.producer.ranchName}</TableCell>
                  <TableCell className="text-sm">
                    {animal.producer.ranchType === 'Comercial' ? 'Comercial' : 'Traspatio'}
                  </TableCell>
                  <TableCell>{animal.breed}</TableCell>
                  <TableCell>{animal.age} años</TableCell>
                  <TableCell>{animal.weight} kg</TableCell>
                  <TableCell>
                    <Badge className={healthStatusColors[animal.healthStatus]}>
                      {animal.healthStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onSelectAnimal(animal)}
                      size="sm"
                      className="bg-[#401C08] text-white hover:bg-[#401C08]/90"
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}