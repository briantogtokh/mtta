import React, { useEffect, useState } from 'react';
import Navigation from '@/components/navigation';
import PageWithLoading from '@/components/PageWithLoading';

const ChampionsPage: React.FC = () => {
  const [champions, setChampions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const res = await fetch('/api/champions');
        const data = await res.json();
        setChampions(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to load champions', e);
      } finally {
        setLoading(false);
      }
    };
    fetchChampions();
  }, []);

  return (
    <PageWithLoading>
      <Navigation />
      <div className="main-bg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 glow-text">
            Үе үеийн аваргууд
          </h1>
          {loading ? (
            <div>Ачааллаж байна...</div>
          ) : champions.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {champions.map((champion) => (
                <div key={champion.id} className="bg-gray-800 p-4 rounded-lg text-center">
                  {champion.imageUrl && (
                    <img
                      src={champion.imageUrl}
                      alt={champion.name}
                      className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                    />
                  )}
                  <h3 className="text-white font-semibold">{champion.name}</h3>
                  <p className="text-green-400">{champion.year}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>Аварга олдсонгүй</div>
          )}
        </div>
      </div>
    </PageWithLoading>
  );
};

export default ChampionsPage;
