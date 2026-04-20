import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ShieldCheck,
  Users,
  Award,
  TrendingUp,
  Beef,
  FileCheck,
  Truck,
  DollarSign,
  ArrowRight,
  Home,
  ImageIcon,
  HelpCircle,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HomeLandingProps {
  onExploreAnimals: () => void;
  onGoToRegister: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function HomeLanding({ onExploreAnimals, onGoToRegister }: HomeLandingProps) {
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close help menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setHelpMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── Navigation Bar ── Fixed, transparent on hero, white on scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span
                className={`font-bold transition-colors duration-300 ${ scrolled ? "text-[#401C08]" : "text-white" } text-[32px]`}
              ><span className="font-bold">PeQ</span></span>
            </motion.div>

            {/* Navigation Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-1"
            >
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100 hover:text-[#401C08]"
                    : "text-white hover:bg-white/15"
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >Home</button>

              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100 hover:text-[#401C08]"
                    : "text-white hover:bg-white/15"
                }`}
                onClick={onExploreAnimals}
              >
                
                Galería
              </button>

              {/* Help Dropdown */}
              <div className="relative" ref={helpRef}>
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    scrolled
                      ? "text-gray-700 hover:bg-gray-100 hover:text-[#401C08]"
                      : "text-white hover:bg-white/15"
                  }`}
                  onClick={() => setHelpMenuOpen(!helpMenuOpen)}
                >
                  
                  Ayuda
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      helpMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {helpMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2"
                    >
                      {[
                        { title: "Comercial", sub: "Ranchos comerciales" },
                        { title: "Traspatio", sub: "Ranchos de traspatio" },
                        { title: "Veterinario", sub: "Información veterinaria" },
                      ].map((item) => (
                        <button
                          key={item.title}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[#F2EAC2]/60 transition-colors"
                          onClick={() => setHelpMenuOpen(false)}
                        >
                          <div className="font-medium text-[#401C08]">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.sub}</div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Register Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? "bg-[#401C08] text-white hover:bg-white hover:text-[#401C08] border-2 border-[#401C08]"
                    : "bg-white/15 text-white border-2 border-white hover:bg-white hover:text-[#401C08]"
                }`}
                onClick={onGoToRegister}
              >
                
                Registrar
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── nav overlays this */}
      <section className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1635857771563-2124c086d656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXR0bGUlMjByYW5jaCUyMGZhcm1lcnMlMjBsaXZlc3RvY2t8ZW58MXx8fHwxNzczMjgxMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        >
          <div className="absolute inset-0 bg-[#401C08]/80" />
        </div>

        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-2xl text-white">
            

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Confianza y Calidad:{" "}
              <span className="text-[#F2EAC2]">Directo del Rancho</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-white/90 mb-8 leading-relaxed"
            >
              Plataforma oficial de compra y venta de ganado certificado.
              Trazabilidad completa, transparencia garantizada y verificación
              veterinaria en cada animal.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex gap-4 flex-wrap"
            >
              <button
                onClick={onExploreAnimals}
                className="inline-flex items-center gap-2 bg-[#F2EAC2] text-[#401C08] hover:bg-white hover:text-[#401C08] px-8 py-3 rounded-md text-base font-medium transition-all duration-200 shadow-md"
              >
                Explorar Animales
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#401C08] px-8 py-3 rounded-md text-base font-medium transition-all duration-200"
              >
                Registrar Rancho
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-16 bg-[#F2EAC2]/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-[#401C08] mb-3">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Todo lo que necesitas para comprar o vender ganado con total confianza
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Ganaderos Profesionales",
                desc: "Ranchos certificados con trayectoria verificada y prácticas sustentables",
              },
              {
                icon: Beef,
                title: "Ganado Premium",
                desc: "Animales certificados de alta calidad para reproducción y producción",
              },
              {
                icon: Award,
                title: "Certificación Oficial",
                desc: "Verificación veterinaria completa y registro gubernamental validado",
              },
              {
                icon: ShieldCheck,
                title: "100% Garantizado",
                desc: "Transparencia total con historial sanitario y códigos QR verificables",
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white h-full">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-16 h-16 bg-[#F2EAC2] rounded-full flex items-center justify-center mx-auto mb-4">
                      <feat.icon className="h-8 w-8 text-[#5A7324]" />
                    </div>
                    <h3 className="font-semibold text-lg text-[#401C08] mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {feat.desc}
                    </p>
                    <ArrowRight className="h-4 w-4 text-[#5A7324] mx-auto" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1597317319427-8fe74703a940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBmYXJtZXIlMjBjYXR0bGUlMjBsaXZlc3RvY2t8ZW58MXx8fHwxNzczMjgxMDg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Veterinario certificando ganado"
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Stats Card Overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="absolute -bottom-8 -right-8 bg-[#F2EAC2] border-none shadow-xl w-72">
                  <CardContent className="p-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-bold text-[#401C08]">Seguridad</span>
                    </div>
                    <p className="text-[#401C08]/80 font-medium">en cada una de tus certificaciones</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <Badge className="bg-[#5A7324] text-white hover:bg-[#5A7324]/90 mb-4">
                Quiénes Somos
              </Badge>
              <h2 className="text-4xl font-bold text-[#401C08] mb-6">
                Actualmente facilitamos la compra y venta de ganado certificado
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nuestro sistema gubernamental conecta a ganaderos profesionales
                con compradores que buscan calidad garantizada. Cada animal
                registrado cuenta con verificación veterinaria completa,
                historial sanitario transparente y certificación oficial.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: FileCheck,
                    title: "Ranchos Certificados",
                    desc: "Red nacional de productores verificados con estándares de calidad",
                  },
                  {
                    icon: Truck,
                    title: "Logística Especializada",
                    desc: "Transporte certificado para traslado seguro de animales",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-[#5A7324]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <stat.icon className="h-6 w-6 text-[#5A7324]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#401C08] mb-1">
                        {stat.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{stat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={onExploreAnimals}
                className="bg-[#401C08] text-white hover:bg-white hover:text-[#401C08] border-2 border-[#401C08] gap-2 transition-all duration-200"
                size="lg"
              >
                Ver Catálogo Completo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── solid color instead of gradient */}
      <section className="py-16 bg-[#401C08]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para comprar o vender ganado certificado?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Únete a la plataforma oficial de regulación ganadera y accede a
              animales certificados con trazabilidad completa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreAnimals}
                className="inline-flex items-center justify-center gap-2 bg-[#F2EAC2] text-[#401C08] hover:bg-white hover:text-[#401C08] px-8 py-3 rounded-md text-base font-medium transition-all duration-200 shadow-md"
              >
                
                Comprar Ganado
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#401C08] px-8 py-3 rounded-md text-base font-medium transition-all duration-200"
              >
                
                Vender Ganado
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}