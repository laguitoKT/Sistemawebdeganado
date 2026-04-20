import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  User,
  Building2,
  Stethoscope,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Home,
  MapPin,
  Phone,
  Mail,
  IdCard,
  Award,
  ChevronRight,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

interface RegisterPageProps {
  onBack: () => void;
}

type UserType = "veterinario" | "traspatio" | "comercial" | null;

interface DocumentFile {
  name: string;
  uploaded: boolean;
}

export function RegisterPage({ onBack }: RegisterPageProps) {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos comunes
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    
    // Veterinario
    cedulaProfesional: "",
    especialidad: "",
    universidad: "",
    
    // Rancho
    nombreRancho: "",
    capacidadAnimales: "",
    superficieHectareas: "",
  });

  const [documents, setDocuments] = useState<DocumentFile[]>([]);

  const userTypes = [
    {
      id: "veterinario" as UserType,
      icon: Stethoscope,
      title: "Veterinario Certificador",
      description: "Para profesionales que certifican y verifican la salud del ganado",
      color: "bg-[#5A7324]",
      hoverColor: "hover:bg-[#5A7324]/90",
      info: null,
    },
    {
      id: "traspatio" as UserType,
      icon: Home,
      title: "Rancho de Traspatio",
      description: "Pequeños productores con crianza familiar y venta local",
      color: "bg-[#B3BF56]",
      hoverColor: "hover:bg-[#B3BF56]/90",
      info: "Límite: 10 animales grandes o 80 aves",
    },
    {
      id: "comercial" as UserType,
      icon: Building2,
      title: "Rancho Comercial",
      description: "Productores a gran escala con operaciones comerciales",
      color: "bg-[#401C08]",
      hoverColor: "hover:bg-[#401C08]/90",
      info: "Para más de 10 animales grandes o 80 aves",
    },
  ];

  const getRequiredDocuments = (): string[] => {
    switch (selectedType) {
      case "veterinario":
        return [
          "Cédula Profesional",
          "Identificación Oficial (INE/Pasaporte)",
          "Comprobante de Domicilio",
          "Certificado de Especialización (Opcional)",
          "Carta de Antecedentes No Penales",
        ];
      case "traspatio":
        return [
          "Identificación Oficial (INE/Pasaporte)",
          "Comprobante de Domicilio",
          "Constancia de Residencia",
          "Fotografías del Rancho",
        ];
      case "comercial":
        return [
          "Identificación Oficial (INE/Pasaporte)",
          "Acta Constitutiva o Registro Comercial",
          "RFC con Constancia de Situación Fiscal",
          "Comprobante de Domicilio",
          "Permisos Sanitarios (SAGARPA/SENASICA)",
          "Licencia de Uso de Suelo",
          "Fotografías de las Instalaciones",
          "Plan de Manejo Sanitario",
        ];
      default:
        return [];
    }
  };

  const handleFileUpload = (docName: string) => {
    // Simulación de carga de archivo
    setDocuments((prev) => {
      const exists = prev.find((d) => d.name === docName);
      if (exists) {
        return prev.map((d) =>
          d.name === docName ? { ...d, uploaded: !d.uploaded } : d
        );
      }
      return [...prev, { name: docName, uploaded: true }];
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Aquí iría la lógica de envío al backend
    alert("Registro enviado exitosamente. Recibirás una notificación cuando sea aprobado.");
    onBack();
    // Reset
    setSelectedType(null);
    setStep(1);
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      ciudad: "",
      estado: "",
      codigoPostal: "",
      cedulaProfesional: "",
      especialidad: "",
      universidad: "",
      nombreRancho: "",
      capacidadAnimales: "",
      superficieHectareas: "",
    });
    setDocuments([]);
  };

  const renderStepContent = () => {
    if (step === 1 && !selectedType) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#401C08] mb-2">
              Selecciona tu tipo de registro
            </h3>
            <p className="text-muted-foreground">
              Elige la categoría que mejor describe tu actividad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {userTypes.map((type) => (
              <Card
                key={type.id}
                className="cursor-pointer border-2 border-transparent hover:border-[#5A7324] transition-all duration-200 hover:shadow-lg"
                onClick={() => {
                  setSelectedType(type.id);
                  setStep(2);
                }}
              >
                <CardContent className="pt-6 pb-6 text-center">
                  <div
                    className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <type.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg text-[#401C08] mb-2">
                    {type.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {type.description}
                  </p>
                  {type.info && (
                    <div className="bg-[#5A7324]/10 rounded-md px-3 py-2 mb-3">
                      <p className="text-xs font-medium text-[#5A7324]">
                        {type.info}
                      </p>
                    </div>
                  )}
                  <ChevronRight className="h-5 w-5 text-[#5A7324] mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#401C08] mb-2">
                Datos Personales
              </h3>
              <p className="text-muted-foreground">
                Completa la información requerida
              </p>
            </div>
            <Badge className="bg-[#5A7324] text-white">
              Paso 2 de 3
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#401C08] mb-2">
                <User className="inline h-4 w-4 mr-1 text-[#5A7324]" />
                Nombre Completo *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Juan Pérez García"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#401C08] mb-2">
                <Mail className="inline h-4 w-4 mr-1 text-[#5A7324]" />
                Correo Electrónico *
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#401C08] mb-2">
                <Phone className="inline h-4 w-4 mr-1 text-[#5A7324]" />
                Teléfono *
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                placeholder="555-123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#401C08] mb-2">
                <MapPin className="inline h-4 w-4 mr-1 text-[#5A7324]" />
                Ciudad *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                value={formData.ciudad}
                onChange={(e) => handleInputChange("ciudad", e.target.value)}
                placeholder="Guadalajara"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#401C08] mb-2">
                <Home className="inline h-4 w-4 mr-1 text-[#5A7324]" />
                Dirección Completa *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                value={formData.direccion}
                onChange={(e) => handleInputChange("direccion", e.target.value)}
                placeholder="Calle, número, colonia"
              />
            </div>

            {selectedType === "veterinario" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#401C08] mb-2">
                    <IdCard className="inline h-4 w-4 mr-1 text-[#5A7324]" />
                    Cédula Profesional *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                    value={formData.cedulaProfesional}
                    onChange={(e) =>
                      handleInputChange("cedulaProfesional", e.target.value)
                    }
                    placeholder="12345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#401C08] mb-2">
                    <Award className="inline h-4 w-4 mr-1 text-[#5A7324]" />
                    Especialidad *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                    value={formData.especialidad}
                    onChange={(e) =>
                      handleInputChange("especialidad", e.target.value)
                    }
                    placeholder="Medicina Veterinaria y Zootecnia"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#401C08] mb-2">
                    <Building2 className="inline h-4 w-4 mr-1 text-[#5A7324]" />
                    Universidad *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                    value={formData.universidad}
                    onChange={(e) =>
                      handleInputChange("universidad", e.target.value)
                    }
                    placeholder="Universidad Nacional Autónoma de México"
                  />
                </div>
              </>
            )}

            {(selectedType === "traspatio" || selectedType === "comercial") && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#401C08] mb-2">
                    <Building2 className="inline h-4 w-4 mr-1 text-[#5A7324]" />
                    Nombre del Rancho *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                    value={formData.nombreRancho}
                    onChange={(e) =>
                      handleInputChange("nombreRancho", e.target.value)
                    }
                    placeholder="Rancho El Ejemplo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#401C08] mb-2">
                    Capacidad (Animales) *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                    value={formData.capacidadAnimales}
                    onChange={(e) => {
                      handleInputChange("capacidadAnimales", e.target.value);
                    }}
                    placeholder={selectedType === "traspatio" ? "" : "100"}
                  />
                  {selectedType === "traspatio" && (
                    null
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#401C08] mb-2">
                    Superficie (Hectáreas) *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border-2 border-[#5A7324]/20 rounded-md focus:outline-none focus:border-[#5A7324] bg-white"
                    value={formData.superficieHectareas}
                    onChange={(e) =>
                      handleInputChange("superficieHectareas", e.target.value)
                    }
                    placeholder="50"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedType(null);
                setStep(1);
              }}
              className="border-[#401C08] text-[#401C08] hover:bg-[#401C08] hover:text-white"
            >
              Regresar
            </Button>
            <Button
              onClick={() => setStep(3)}
              className="bg-[#5A7324] text-white hover:bg-[#5A7324]/90"
            >
              Continuar
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    }

    if (step === 3) {
      const requiredDocs = getRequiredDocuments();
      const uploadedCount = documents.filter((d) => d.uploaded).length;

      return (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#401C08] mb-2">
                Documentación Requerida
              </h3>
              <p className="text-muted-foreground">
                Adjunta los documentos necesarios para tu registro
              </p>
            </div>
            <Badge className="bg-[#5A7324] text-white">
              Paso 3 de 3
            </Badge>
          </div>

          <div className="bg-[#F2EAC2]/30 p-4 rounded-lg border-2 border-[#5A7324]/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-[#5A7324]" />
              <p className="font-medium text-[#401C08]">Importante</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Todos los documentos deben estar vigentes y ser legibles. Los
              archivos deben estar en formato PDF, JPG o PNG no mayor a 5MB.
            </p>
          </div>

          <div className="space-y-3">
            {requiredDocs.map((doc) => {
              const isUploaded = documents.find((d) => d.name === doc)?.uploaded;
              return (
                <div
                  key={doc}
                  className="flex items-center justify-between p-4 border-2 border-[#5A7324]/20 rounded-lg hover:border-[#5A7324]/40 transition-colors bg-white"
                >
                  <div className="flex items-center gap-3">
                    {isUploaded ? (
                      <CheckCircle2 className="h-5 w-5 text-[#5A7324]" />
                    ) : (
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium text-[#401C08]">{doc}</p>
                      {isUploaded && (
                        <p className="text-xs text-[#5A7324]">
                          Documento cargado exitosamente
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileUpload(doc)}
                    className={
                      isUploaded
                        ? "border-[#5A7324] text-[#5A7324] hover:bg-[#5A7324] hover:text-white"
                        : "border-[#401C08] text-[#401C08] hover:bg-[#401C08] hover:text-white"
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploaded ? "Reemplazar" : "Cargar"}
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="bg-[#5A7324]/10 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#5A7324]" />
                <p className="font-medium text-[#401C08]">
                  Progreso de documentación
                </p>
              </div>
              <p className="text-sm font-semibold text-[#5A7324]">
                {uploadedCount} de {requiredDocs.length}
              </p>
            </div>
            <div className="mt-3 bg-white rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#5A7324] h-full transition-all duration-300"
                style={{
                  width: `${(uploadedCount / requiredDocs.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              className="border-[#401C08] text-[#401C08] hover:bg-[#401C08] hover:text-white"
            >
              Regresar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={uploadedCount < requiredDocs.length}
              className="bg-[#401C08] text-white hover:bg-[#401C08]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Enviar Registro
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EAC2]/10">
      {/* Header */}
      <header className="bg-[#401C08] text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-center text-3xl font-bold">Registro de Usuario</h1>
              <p className="text-center text-white/80 mt-2">
                Sistema de Regulación y Control de Ganado
              </p>
            </div>
            <Button
              onClick={onBack}
              variant="outline"
              className="border-white text-[#401C08] bg-white hover:bg-white/90 hover:text-[#401C08]"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStepContent()}
        </div>
      </main>

      {/* Footer */}
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
    </div>
  );
}