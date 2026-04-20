import { useEffect, useRef, useState } from "react";
import { Animal } from "../types/animal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Syringe,
  CheckCircle2,
  User,
  Weight,
  Activity,
  AlertCircle,
  DollarSign,
  Target,
  Award,
  Heart,
  Building2,
  Phone,
  MapPinned,
  CreditCard,
  ShieldCheck,
  Images,
  Package,
} from "lucide-react";
import QRCode from "qrcode";

interface AnimalDetailProps {
  animal: Animal;
  onBack: () => void;
}

const healthStatusColors = {
  Excelente: "bg-[#5A7324] text-white hover:bg-[#5A7324]/80",
  Bueno: "bg-[#B3BF56] text-[#401C08] hover:bg-[#B3BF56]/80",
  Regular: "bg-[#F2EAC2] text-[#401C08] hover:bg-[#F2EAC2]/80",
  "Requiere Atención":
    "bg-[#BC4C27] text-white hover:bg-[#BC4C27]/80",
};

const conditionColors = {
  Excelente: "bg-[#5A7324] text-white",
  Buena: "bg-[#B3BF56] text-[#401C08]",
  Regular: "bg-[#F2EAC2] text-[#401C08]",
  "Requiere Mejora": "bg-[#BC4C27] text-white",
};

const salesPurposeColors = {
  Reproducción: "bg-[#5A7324] text-white",
  Desarrollo: "bg-[#B3BF56] text-[#401C08]",
  Producción: "bg-[#401C08] text-white",
};

export function AnimalDetail({
  animal,
  onBack,
}: AnimalDetailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  // Calcular la última fecha de actualización
  const getLastUpdateDate = () => {
    const dates: Date[] = [
      new Date(animal.vetCertification.certificationDate),
      new Date(animal.registrationDate),
    ];
    
    // Agregar fechas de vacunación
    animal.vaccinations.forEach(vac => {
      dates.push(new Date(vac.date));
    });
    
    // Encontrar la fecha más reciente
    return new Date(Math.max(...dates.map(d => d.getTime())));
  };

  useEffect(() => {
    if (canvasRef.current && !qrGenerated) {
      const animalData = JSON.stringify({
        id: animal.id,
        name: animal.name,
        type: animal.type,
        certified: animal.vetCertification.certified,
        url: `https://sistema-ganado.gob.mx/animal/${animal.id}`,
      });

      QRCode.toCanvas(
        canvasRef.current,
        animalData,
        {
          width: 200,
          margin: 2,
          color: {
            dark: "#401C08",
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) console.error(error);
          else setQrGenerated(true);
        },
      );
    }
  }, [animal, qrGenerated]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button
        onClick={onBack}
        variant="outline"
        className="mb-6 border-[#401C08] text-[#401C08] hover:bg-[#401C08] hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a la lista
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {animal.name}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {animal.breed} · {animal.gender}
                  </p>
                </div>
                <Badge
                  className={
                    healthStatusColors[animal.healthStatus] +
                    " text-base px-4 py-2"
                  }
                >
                  {animal.healthStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Datos Básicos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#5A7324]/10 rounded-lg">
                    <Activity className="h-5 w-5 text-[#5A7324]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">No. de identificación</p>
                    <p className="font-medium text-foreground">
                      {animal.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#5A7324]/10 rounded-lg">
                    <Weight className="h-5 w-5 text-[#5A7324]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Peso
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.weight} kg
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#5A7324]/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-[#5A7324]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Edad
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.age} años
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Propósito y Condición */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Propósito de Venta
                  </p>
                  <Badge
                    className={
                      salesPurposeColors[animal.salesPurpose]
                    }
                  >
                    {animal.salesPurpose}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Condición
                  </p>
                  <Badge
                    className={
                      conditionColors[animal.condition]
                    }
                  >
                    {animal.condition}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Información de Producción */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tipo de Producción
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.productionType}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Con Crías
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.hasOffspring
                        ? `Sí (${animal.offspringCount || 0} cría${(animal.offspringCount || 0) !== 1 ? "s" : ""})`
                        : "No"}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Ubicación y Registro */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Origen
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.origin}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Fecha de Registro
                    </p>
                    <p className="font-medium text-foreground">
                      {new Date(
                        animal.registrationDate,
                      ).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {animal.notes && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-[#5A7324]" />
                      <p className="font-medium text-foreground">
                        Notas Adicionales
                      </p>
                    </div>
                    <p className="text-sm text-foreground/80">
                      {animal.notes}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Certificaciones */}
          <Card className="bg-card border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#5A7324]" />
                Certificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              {animal.certifications &&
              animal.certifications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {animal.certifications.map((cert, index) => (
                    <Badge
                      key={index}
                      className="bg-[#5A7324] text-white px-3 py-1"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sin certificaciones adicionales
                </p>
              )}
            </CardContent>
          </Card>

          {/* Información del Productor */}
          <Card className="bg-card border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#5A7324]" />
                Información del Productor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Nombre del Rancho
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.producer.ranchName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tipo de Rancho
                    </p>
                    <Badge
                      className={
                        animal.producer.ranchType ===
                        "Comercial"
                          ? "bg-[#401C08] text-white"
                          : "bg-[#5A7324] text-white"
                      }
                    >
                      {animal.producer.ranchType}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Propietario
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.producer.ownerName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Contacto
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.producer.contact}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinned className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Ubicación
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.producer.location}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificación Veterinaria */}
          <Card className="bg-card border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#5A7324]" />
                Certificación Veterinaria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                {animal.vetCertification.certified ? (
                  <Badge className="bg-[#5A7324] text-white">
                    Certificado
                  </Badge>
                ) : (
                  <Badge className="bg-[#BC4C27] text-white">
                    Sin Certificar
                  </Badge>
                )}
                {animal.vetCertification.verificationStatus ===
                  "Verificada" && (
                  <Badge className="bg-[#5A7324] text-white flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" />
                    Certificación Verificada
                  </Badge>
                )}
                {animal.vetCertification.verificationStatus ===
                  "Pendiente" && (
                  <Badge className="bg-[#B3BF56] text-[#401C08]">
                    Verificación Pendiente
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Certificado por
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.vetCertification.certifiedBy}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Cédula Profesional
                    </p>
                    <p className="font-medium text-foreground">
                      {animal.vetCertification.vetLicense}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#5A7324] mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Fecha de Certificación
                    </p>
                    <p className="font-medium text-foreground">
                      {new Date(
                        animal.vetCertification.certificationDate,
                      ).toLocaleDateString("es-MX")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Próxima Revisión
                    </p>
                    <p className="font-medium text-foreground">
                      {new Date(
                        animal.vetCertification.nextCheckup,
                      ).toLocaleDateString("es-MX")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historial de Vacunación */}
          <Card className="bg-card border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Syringe className="h-5 w-5 text-[#5A7324]" />
                  Historial de Vacunación
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-[#5A7324] text-[#5A7324] hover:bg-[#5A7324] hover:text-white gap-2"
                    >
                      <Syringe className="h-4 w-4" />
                      Ver Historial Completo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-[#401C08]">
                        <Syringe className="h-5 w-5 text-[#5A7324]" />
                        Historial de Vacunación - {animal.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      {animal.vaccinations.map(
                        (vaccination, index) => (
                          <Card
                            key={index}
                            className="border-2 border-[#5A7324]/20"
                          >
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-lg text-[#401C08] mb-2">
                                    {vaccination.name}
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4 text-[#5A7324]" />
                                      <span className="text-sm text-muted-foreground">
                                        Aplicada el:
                                      </span>
                                      <span className="text-sm font-medium text-foreground">
                                        {new Date(
                                          vaccination.date,
                                        ).toLocaleDateString(
                                          "es-MX",
                                          {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          },
                                        )}
                                      </span>
                                    </div>
                                    {vaccination.nextDose && (
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-accent" />
                                        <span className="text-sm text-muted-foreground">
                                          Próxima dosis:
                                        </span>
                                        <span className="text-sm font-medium text-accent">
                                          {new Date(
                                            vaccination.nextDose,
                                          ).toLocaleDateString(
                                            "es-MX",
                                            {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            },
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <Badge className="bg-[#5A7324] text-white">
                                  Aplicada
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ),
                      )}
                      {animal.vaccinations.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          No hay vacunaciones registradas
                        </p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {animal.vaccinations.length} vacunación
                {animal.vaccinations.length !== 1
                  ? "es"
                  : ""}{" "}
                registrada
                {animal.vaccinations.length !== 1 ? "s" : ""}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {animal.vaccinations
                  .slice(0, 3)
                  .map((vaccination, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-[#5A7324] text-[#5A7324]"
                    >
                      {vaccination.name}
                    </Badge>
                  ))}
                {animal.vaccinations.length > 3 && (
                  <Badge
                    variant="outline"
                    className="border-[#5A7324] text-[#5A7324]"
                  >
                    +{animal.vaccinations.length - 3} más
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Código QR */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-2 sticky top-4">
            <CardHeader>
              <CardTitle className="text-center">
                Código QR
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-lg bg-white border-2 border-[#5A7324]/20">
                <canvas ref={canvasRef} />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Escanea para acceso rápido a la ficha técnica
                certificada
              </p>
              <div className="w-full space-y-2 text-sm">
                <p className="text-center font-medium text-foreground">
                  Información del QR:
                </p>
                <div className="bg-muted/30 p-3 rounded-lg space-y-1">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">
                      ID:
                    </span>{" "}
                    {animal.id}
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">
                      Animal:
                    </span>{" "}
                    {animal.name}
                  </p>
                  <p className="text-foreground">
                    <span className="text-muted-foreground">
                      Estado:
                    </span>{" "}
                    {animal.vetCertification.certified
                      ? "Certificado ✓"
                      : "Sin certificar"}
                  </p>
                </div>
              </div>

              <Separator className="w-full" />

              {/* Precio Destacado */}
              <div className="w-full">
                <Card className="bg-gradient-to-br from-[#401C08] to-[#5A7324] border-2">
                  <CardContent className="py-6 bg-[#401c08]">
                    <div className="text-center space-y-2">
                      <p className="text-white/80 text-sm uppercase tracking-wide">
                        Precio de Venta
                      </p>
                      <div className="flex items-center justify-center gap-1">
                        <DollarSign className="h-8 w-8 text-white" />
                        <p className="text-4xl font-bold text-white">
                          {animal.price.toLocaleString("es-MX")}
                        </p>
                      </div>
                      <p className="text-white/60 text-xs">
                        MXN
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Botón de Galería de Imágenes */}
              {animal.images && animal.images.length > 0 && (
                <>
                  <Separator className="w-full" />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-[#5A7324] text-white hover:bg-[#5A7324]/90 gap-2">
                        <Images className="h-5 w-5" />
                        Ver Galería de Imágenes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-[#401C08]">
                          <Images className="h-5 w-5 text-[#5A7324]" />
                          Galería de Imágenes - {animal.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {animal.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-video rounded-lg overflow-hidden border-2 border-[#5A7324]/20 hover:border-[#5A7324] transition-colors"
                          >
                            <img
                              src={image}
                              alt={`${animal.name} - Imagen ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Última Fecha de Actualización */}
      <div className="mt-6 pb-4">
        <Card className="bg-[#F2EAC2] border-2 border-[#5A7324]">
          <CardContent className="py-4">
            <div className="flex items-center justify-center gap-2 text-[#401C08]">
              <Calendar className="h-4 w-4 text-[#5A7324]" />
              <span className="text-sm font-medium">
                Última actualización:
              </span>
              <span className="text-sm font-semibold">
                {getLastUpdateDate().toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}