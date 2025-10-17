// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { movieApi } from "../api/movieApi"; // dùng movieApi của bạn (axios)
import Banner from "../components/Banner";
import TopicCard from "../components/TopicCard";
import MovieSection from "../components/MovieSection";

export default function Home() {
  const [countries, setCountries] = useState([]); // list (max 3)
  const [movieData, setMovieData] = useState({}); // { slug: [movies...] }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // helper: unwrap axios response shapes safely
  const unwrap = (resp) => {
    if (!resp) return null;
    // axios usually: resp.data; some endpoints: resp.data.data
    if (resp.data !== undefined) {
      return resp.data.data !== undefined ? resp.data.data : resp.data;
    }
    return resp;
  };

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        // 1) Lấy danh sách countries từ API
        const respCountries = await movieApi.getCountries();
        const allCountries = unwrap(respCountries) || [];

        // only keep first 3 countries
        const topCountries = Array.isArray(allCountries)
          ? allCountries.slice(0, 3)
          : [];

        // set countries to render
        if (!mounted) return;
        setCountries(topCountries);

        // 2) load movies for each selected country in parallel
        const promises = topCountries.map(async (c) => {
          try {
            const resp = await movieApi.getCountryDetail(c.slug, 1); // page 1
            const data = unwrap(resp);
            // some APIs pack items in data.items or data.data or directly array
            const items = (data && (data.items || data.data || data)) || []; // fallback shapes
            return { slug: c.slug, items: Array.isArray(items) ? items : [] };
          } catch (e) {
            console.error(`Lỗi load country ${c.slug}:`, e);
            return { slug: c.slug, items: [] };
          }
        });

        const results = await Promise.all(promises);
        if (!mounted) return;

        // build object { slug: items }
        const map = {};
        for (const r of results) map[r.slug] = r.items;
        setMovieData(map);
      } catch (e) {
        console.error("Lỗi Home load:", e);
        if (!mounted) return;
        setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const topics = [
    {
      title: "Marvel",
      color: "bg-gradient-to-r from-indigo-600 to-indigo-400",
    },
    { title: "4K", color: "bg-gradient-to-r from-purple-600 to-purple-400" },
    {
      title: "Sitcom",
      color: "bg-gradient-to-r from-emerald-600 to-emerald-400",
    },
    {
      title: "Lồng Tiếng Cực Mạnh",
      color: "bg-gradient-to-r from-violet-600 to-violet-400",
    },
    {
      title: "Xuyên Không",
      color: "bg-gradient-to-r from-orange-500 to-orange-300",
    },
    { title: "Cổ Trang", color: "bg-gradient-to-r from-rose-600 to-rose-400" },
  ];

  return (
    <div className="bg-[#0f1115] text-white min-h-screen pb-16">
      <Banner />

      <main className="max-w-7xl mx-auto px-4 mt-10">
        {/* Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Bạn đang quan tâm gì?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topics.map((t, i) => (
              <TopicCard key={i} title={t.title} color={t.color} />
            ))}
          </div>
        </section>

        {/* Country movie sections (only 3) */}
        <section className="space-y-12">
          {loading && <p className="text-gray-400">Đang tải phim...</p>}
          {error && <p className="text-red-400">{error}</p>}

          {!loading &&
            countries.map((country) => (
              <MovieSection
                key={country.slug}
                title={`Phim ${country.name} mới`}
                slug={country.slug}
                movies={movieData[country.slug] || []}
              />
            ))}
        </section>
      </main>
    </div>
  );
}
