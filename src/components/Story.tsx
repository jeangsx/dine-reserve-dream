import chefImage from "@/assets/chef.jpg";
import interiorImage from "@/assets/interior.jpg";

export const Story = () => {
  return (
    <section id="story" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] overflow-hidden shadow-elegant">
              <img src={chefImage} alt="Chef Hiroto Tanaka" loading="lazy" width={1080} height={1350} className="w-full h-full object-cover hover:scale-105 transition-smooth" />
            </div>
            <div className="hidden md:block absolute -bottom-12 -right-8 w-56 aspect-[3/4] overflow-hidden shadow-elegant border-8 border-background">
              <img src={interiorImage} alt="Interior del restaurante" loading="lazy" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-accent" />
              <span className="tracking-wider-luxe text-[10px] uppercase text-accent">Nuestra historia</span>
            </div>

            <h2 className="font-display font-light text-5xl md:text-6xl leading-tight text-balance">
              Diez años cultivando<br/>
              <em className="italic text-moss">ichi-go ichi-e</em>
            </h2>

            <p className="mt-8 text-foreground/75 text-lg leading-relaxed">
              «Un encuentro, una oportunidad». Esa es la filosofía que el chef Hiroto Tanaka 
              aprendió en Ginza y que hoy guía cada noche en Saikō. Cada servicio es único: 
              irrepetible, vivo, en armonía con la estación.
            </p>

            <p className="mt-5 text-foreground/65 leading-relaxed">
              Trabajamos con pequeños pescadores de la costa cantábrica, productores 
              ecológicos del Tajo y hierbas que cultivamos en nuestro propio invernadero. 
              El resultado: una cocina japonesa con raíces locales y respeto absoluto al producto.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8 pt-8 border-t border-border">
              <div>
                <p className="font-display text-3xl text-primary">2014</p>
                <p className="text-xs tracking-luxe uppercase text-muted-foreground mt-1">Año de apertura</p>
              </div>
              <div>
                <p className="font-display text-3xl text-primary">12 mesas</p>
                <p className="text-xs tracking-luxe uppercase text-muted-foreground mt-1">Aforo íntimo</p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <p className="font-display italic text-2xl text-primary">— Hiroto Tanaka</p>
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs tracking-luxe uppercase text-muted-foreground">Chef ejecutivo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
