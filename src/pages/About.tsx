import { Layout } from "@/components/layout/Layout";
import { Heart, Users, Leaf, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Crafted with Love",
    description: "Every product is made by skilled artisans who pour their heart into their craft.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "We prioritize eco-friendly materials and sustainable production methods.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We support local artisan communities and fair trade practices worldwide.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Each piece undergoes rigorous quality checks to ensure lasting beauty.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 animate-slide-up">
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Founded on a passion for authentic craftsmanship and sustainable living, 
            Artisan connects you with treasures from skilled makers around the world.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800"
                alt="Artisan workshop"
                className="rounded-xl card-shadow"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-semibold text-foreground">
                Where Tradition Meets Modern Living
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                What started as a small passion project in 2018 has grown into a curated 
                marketplace for handcrafted goods. We believe that every home deserves 
                pieces that tell a story — objects crafted by human hands with techniques 
                passed down through generations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team travels the world to find artisans who share our commitment to 
                quality and sustainability. From ceramic studios in Portugal to weaving 
                cooperatives in Morocco, we partner directly with makers to bring you 
                authentic, one-of-a-kind pieces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-semibold text-foreground text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
            Meet the Team
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            A small but passionate team dedicated to bringing you the best in artisan crafts.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { name: "Emma Chen", role: "Founder & Curator", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
              { name: "Marcus Rivera", role: "Head of Artisan Relations", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
              { name: "Sophie Laurent", role: "Creative Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
            ].map((member, index) => (
              <div
                key={member.name}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover card-shadow"
                />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
