export interface Animal {
  id: string;
  type: string;
  name: string;
  age: number;
  weight: number;
  healthStatus: 'Excelente' | 'Bueno' | 'Regular' | 'Requiere Atención';
  vetCertification: {
    certified: boolean;
    certifiedBy: string;
    certificationDate: string;
    nextCheckup: string;
    vetLicense: string; // Cédula profesional del veterinario
    verificationStatus: 'Verificada' | 'Pendiente' | 'Rechazada';
  };
  breed: string;
  gender: 'Macho' | 'Hembra';
  registrationDate: string;
  origin: string;
  vaccinations: {
    name: string;
    date: string;
    nextDose?: string;
  }[];
  notes?: string;
  // Información comercial
  price: number;
  salesPurpose: 'Reproducción' | 'Desarrollo' | 'Producción';
  condition: 'Excelente' | 'Buena' | 'Regular' | 'Requiere Mejora';
  hasOffspring: boolean;
  offspringCount?: number;
  productionType: string;
  certifications: string[];
  // Información del productor
  producer: {
    ranchName: string;
    ranchType: 'Comercial' | 'Traspatio';
    ownerName: string;
    contact: string;
    location: string;
  };
  // Lotes
  batch?: {
    id: string;
    name: string;
    entryDate: string;
    purpose: 'Reproducción' | 'Desarrollo' | 'Producción';
  };
  // Galería de imágenes
  images: string[];
}

export interface AnimalType {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}