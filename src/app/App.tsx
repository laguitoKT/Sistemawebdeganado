import { useState } from 'react';
import { HomeLanding } from './components/home-landing';
import { AnimalTypeGrid } from './components/animal-type-grid';
import { AnimalList } from './components/animal-list';
import { AnimalDetail } from './components/animal-detail';
import { RegisterPage } from './components/register-page';
import { animalTypes, mockAnimals } from './data/mock-data';
import { Animal } from './types/animal';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Search, ArrowLeft, Home } from 'lucide-react';

type View = 'home' | 'grid' | 'list' | 'detail' | 'register';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleExploreAnimals = () => {
    setCurrentView('grid');
  };

  const handleGoToRegister = () => {
    setCurrentView('register');
  };

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId);
    setCurrentView('list');
  };

  const handleBackToGrid = () => {
    setSelectedType(null);
    setCurrentView('grid');
  };

  const handleBackToHome = () => {
    setSelectedType(null);
    setSelectedAnimal(null);
    setSearchQuery('');
    setCurrentView('home');
  };

  const handleSelectAnimal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setSelectedAnimal(null);
    setCurrentView('list');
  };

  const getTypeName = () => {
    if (!selectedType) return '';
    const type = animalTypes.find((t) => t.id === selectedType);
    return type?.name || '';
  };

  // Filtrar animales por nombre de rancho
  const getFilteredAnimals = () => {
    if (!selectedType) return [];
    const animals = mockAnimals[selectedType] || [];
    
    if (!searchQuery.trim()) return animals;
    
    return animals.filter(animal => 
      animal.producer.ranchName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Only show when not on home view or register view */}
      {currentView !== 'home' && currentView !== 'register' && (
        <>
          <header className="bg-[#401C08] text-white py-6 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="text-center"> Sistema de Regulación y Control de Ganado</h1>
                  <p className="text-center text-white/80 mt-2"><span className="">Verifica, confía y compra</span></p>
                </div>
                <Button
                  onClick={handleBackToHome}
                  variant="outline"
                  className="border-white text-[#401C08] bg-white hover:bg-white/90 hover:text-[#401C08]"
                  size="sm"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Inicio
                </Button>
              </div>
            </div>
          </header>

          {/* Search Bar - Only show in list or grid view */}
          {currentView !== 'detail' && (
            <div className="bg-white border-b">
              <div className="container mx-auto px-4 py-4">
                <div className="max-w-2xl mx-auto relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5A7324]" />
                  <Input
                    type="text"
                    placeholder="Buscar por nombre del rancho..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white border-[#5A7324]/30 focus:border-[#5A7324] focus:ring-[#5A7324]"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Main Content */}
      <main>
        {currentView === 'home' && (
          <HomeLanding onExploreAnimals={handleExploreAnimals} onGoToRegister={handleGoToRegister} />
        )}

        {currentView === 'grid' && (
          <AnimalTypeGrid
            animalTypes={animalTypes}
            onSelectType={handleSelectType}
          />
        )}

        {currentView === 'list' && selectedType && (
          <>
            {getFilteredAnimals().length === 0 && searchQuery.trim() ? (
              <div className="container mx-auto px-4 py-8">
                <Button
                  onClick={handleBackToGrid}
                  variant="outline"
                  className="mb-4 border-[#401C08] text-[#401C08] hover:bg-[#401C08] hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a categorías
                </Button>
                <div className="text-center py-12">
                  <h2 className="text-[#401C08] mb-2">No se encontraron resultados</h2>
                  <p className="text-muted-foreground">
                    No hay animales del rancho "{searchQuery}" en esta categoría
                  </p>
                </div>
              </div>
            ) : (
              <AnimalList
                animals={getFilteredAnimals()}
                typeName={getTypeName()}
                onBack={handleBackToGrid}
                onSelectAnimal={handleSelectAnimal}
              />
            )}
          </>
        )}

        {currentView === 'detail' && selectedAnimal && (
          <AnimalDetail
            animal={selectedAnimal}
            onBack={handleBackToList}
          />
        )}

        {currentView === 'register' && (
          <RegisterPage onBack={handleBackToHome} />
        )}
      </main>

      {/* Footer - Hide on register page */}
      {currentView !== 'register' && (
        <footer className="bg-[#401C08] text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              © 2026 Sistema de Regulación y Control de Ganado · Gobierno Federal
            </p>
            <p className="text-xs text-white/70 mt-2">
              Certificación veterinaria oficial · Trazabilidad garantizada
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}