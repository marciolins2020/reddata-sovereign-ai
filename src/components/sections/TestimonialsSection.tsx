import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t('testimonials.testimonial1Quote'),
      author: t('testimonials.testimonial1Author'),
      role: t('testimonials.testimonial1Role'),
      image: "👨‍💼"
    },
    {
      quote: t('testimonials.testimonial2Quote'),
      author: t('testimonials.testimonial2Author'),
      role: t('testimonials.testimonial2Role'),
      image: "👩‍⚖️"
    },
    {
      quote: t('testimonials.testimonial3Quote'),
      author: t('testimonials.testimonial3Author'),
      role: t('testimonials.testimonial3Role'),
      image: "🏛️"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 border-0 bg-gradient-tech hover:shadow-medium transition-all duration-300">
              <div className="mb-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <blockquote className="text-lg text-foreground leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span className="text-sm text-muted-foreground">
              {t('testimonials.conclusion')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};