import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import reddataLogo from "@/assets/reddata-logo-timeline.png";
import DOMPurify from "dompurify";
import { useLanguage } from "@/contexts/LanguageContext";
import pt from "@/translations/pt";
import en from "@/translations/en";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

// Sanitize HTML to prevent XSS attacks
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'a', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
  });
};

interface TimelineItem {
  year: string;
  title: string;
  detailHtml: string;
}

const yearToCol = (year: string): number => {
  const map: Record<string, number> = {
    "2017": 1,
    "2018": 3,
    "2019": 5,
    "2020": 7,
    "2021": 8,
    "2022–2023": 10,
    "2023": 10,
    "2024": 11,
    "2025": 12,
    "2024–2025": 12
  };
  return map[year] || 12;
};

const TimelineNode = ({
  item,
  color
}: {
  item: TimelineItem;
  color: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={nodeRef} 
      className={`w-6 h-6 rounded-full border-4 cursor-pointer transition-all duration-300 hover:scale-125 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} 
      style={{
        backgroundColor: color,
        borderColor: color
      }} 
      onClick={e => {
        e.stopPropagation();
      }} 
      title={`${item.year} – ${item.title}`} 
      aria-label={`${item.year} – ${item.title}`}
    />
  );
};

const Timeline = () => {
  const { t, language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<'reddata' | 'llms'>('reddata');
  
  // Get timeline data from translations
  const translations = language === 'pt' ? pt : en;
  const reddataTimeline = translations.timeline.reddata;
  
  const timelineData = {
    reddata: [
      { year: reddataTimeline[2017].year, title: reddataTimeline[2017].title, detailHtml: reddataTimeline[2017].detail },
      { year: reddataTimeline[2018].year, title: reddataTimeline[2018].title, detailHtml: reddataTimeline[2018].detail },
      { year: reddataTimeline[2019].year, title: reddataTimeline[2019].title, detailHtml: reddataTimeline[2019].detail },
      { year: reddataTimeline[2020].year, title: reddataTimeline[2020].title, detailHtml: reddataTimeline[2020].detail },
      { year: reddataTimeline[2021].year, title: reddataTimeline[2021].title, detailHtml: reddataTimeline[2021].detail },
      { year: reddataTimeline["2022-2023"].year, title: reddataTimeline["2022-2023"].title, detailHtml: reddataTimeline["2022-2023"].detail },
      { year: reddataTimeline["2024-2025"].year, title: reddataTimeline["2024-2025"].title, detailHtml: reddataTimeline["2024-2025"].detail },
    ],
    llms: [] as TimelineItem[]
  };
  
  const handleItemClick = (item: TimelineItem, track: 'reddata' | 'llms', index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
    setCurrentTrack(track);
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedItem(timelineData[currentTrack][newIndex]);
    }
  };
  
  const handleNext = () => {
    const maxIndex = timelineData[currentTrack].length - 1;
    if (currentIndex < maxIndex) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedItem(timelineData[currentTrack][newIndex]);
    }
  };
  
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < timelineData[currentTrack].length - 1;
  
  return (
    <AuroraBackground className="min-h-screen flex flex-col">
      <div className="w-full flex flex-col flex-1">
      <Header />
      
      <main className="flex-1 pt-16 md:pt-20 pb-8">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4 md:text-3xl text-justify">
              {t('timeline.title')}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              {t('timeline.subtitle')}
            </p>
          </div>

          <div id="timeline-wrapper" className="relative overflow-x-auto">
            <div className="min-w-[1200px] py-4">
              {/* Logo RedData */}
              <div className="flex justify-center mb-6">
                <img src={reddataLogo} alt="RedData Logo" className="h-16 md:h-20 w-auto opacity-90" />
              </div>

              {/* Track RedData */}
              <section aria-label="Linha do tempo RedData" className="relative mb-8">
                <div className="h-px bg-border translate-y-2"></div>
                <div className="relative grid grid-cols-12 gap-4">
                  {timelineData.reddata.map((item, idx) => {
                    const col = yearToCol(item.year);
                    return (
                      <div 
                        key={idx} 
                        className="flex flex-col items-center text-center" 
                        style={{
                          gridColumn: `${col} / span 2`
                        }} 
                        onClick={() => handleItemClick(item, 'reddata', idx)}
                      >
                        <TimelineNode item={item} color="hsl(var(--primary))" />
                        <div className="mt-4 space-y-2">
                          <div className="text-base font-bold text-primary">{item.year}</div>
                          <div className="text-sm text-muted-foreground">{item.title}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>

          {/* Resumo Expandido */}
          <section className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6">{t('timeline.expandedSummary')}</h2>
            
            {/* RedData Section */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">{t('timeline.reddataSection')}</h3>
              <div className="space-y-6">
                {timelineData.reddata.map((item, idx) => (
                  <article key={idx} className="border border-border rounded-xl p-5 shadow-sm bg-card">
                    <h4 className="text-base md:text-lg font-bold mb-3">
                      {item.year} – {item.title}
                    </h4>
                    <div 
                      className="prose prose-sm max-w-none text-foreground" 
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(item.detailHtml)
                      }} 
                    />
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedItem?.title}</DialogTitle>
            <p className="text-2xl font-bold text-[#E2211C] mt-2">{selectedItem?.year}</p>
          </DialogHeader>
          <div 
            className="prose prose-sm max-w-none leading-relaxed mt-4 text-foreground" 
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(selectedItem?.detailHtml || '')
            }} 
          />
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <Button onClick={handlePrevious} disabled={!canGoPrevious} variant="outline" size="lg" className="gap-2">
              <ChevronLeft className="h-5 w-5" />
              {t('timeline.previous')}
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} {t('timeline.of')} {timelineData[currentTrack].length}
            </span>
            <Button onClick={handleNext} disabled={!canGoNext} variant="outline" size="lg" className="gap-2">
              {t('timeline.next')}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </AuroraBackground>
  );
};

export default Timeline;
