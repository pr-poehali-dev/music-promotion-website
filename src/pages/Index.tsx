import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/9446d833-8ef1-44c4-8ada-510b01f4ef37/files/6eaf086f-1817-4a8a-8adf-d408015af7db.jpg";

const navLinks = [
  { id: "home", label: "Главная" },
  { id: "tracks", label: "Треки" },
  { id: "services", label: "Услуги" },
  { id: "about", label: "О мне" },
  { id: "channels", label: "Каналы" },
  { id: "blog", label: "Блог" },
  { id: "contacts", label: "Контакты" },
];

const tracks: { id: number; title: string; genre: string; duration: string; year: string }[] = [];

const services = [
  {
    icon: "Music",
    title: "Продакшн",
    desc: "Полноценное создание трека с нуля: от идеи до финального файла. Авторский звук, индивидуальный подход.",
    price: "Уточняйте цену"
  },
  {
    icon: "Headphones",
    title: "Сведение",
    desc: "Профессиональное сведение вашего материала. Баланс, пространство, динамика — всё под контролем.",
    price: "Уточняйте цену"
  },
  {
    icon: "Sliders",
    title: "Кастомный пресет",
    desc: "Разработка уникального пресета под ваш стиль и звук. Только для вас, никаких шаблонов.",
    price: "Уточняйте цену"
  },
  {
    icon: "Megaphone",
    title: "Реклама",
    desc: "Размещение рекламы у меня. Охваты, вовлечённая аудитория, музыкальная ниша.",
    price: "Пишите в Telegram"
  },
];

const channels = [
  { name: "Spotify", icon: "Radio", followers: "2.4K", link: "#" },
  { name: "Apple Music", icon: "Music2", followers: "1.8K", link: "#" },
  { name: "YouTube", icon: "Play", followers: "5.1K", link: "#" },
  { name: "ВКонтакте", icon: "Users", followers: "3.7K", link: "#" },
  { name: "Telegram", icon: "Send", followers: "1.2K", link: "https://t.me/leenayzee" },
  { name: "SoundCloud", icon: "Cloud", followers: "890", link: "#" },
];

const reviews = [
  {
    name: "Алексей М.",
    rating: 5,
    text: "Потрясающая работа! Трек получился именно таким, каким я его представлял. Атмосфера, глубина — всё на высшем уровне.",
    role: "Видеоблогер",
    date: "Март 2024"
  },
  {
    name: "Мария С.",
    rating: 5,
    text: "Сотрудничаем уже второй год. Каждый раз удивляет способность уловить настроение и воплотить его в звуке.",
    role: "Режиссёр",
    date: "Февраль 2024"
  },
  {
    name: "Дмитрий К.",
    rating: 5,
    text: "Мастеринг трека занял 2 дня, результат превзошёл ожидания. Профессионал своего дела.",
    role: "Музыкант",
    date: "Январь 2024"
  },
  {
    name: "Анна Р.",
    rating: 4,
    text: "Написали джингл для рекламы — клиенты в восторге. Быстро, качественно, без лишних вопросов.",
    role: "Маркетолог",
    date: "Декабрь 2023"
  },
];

const blogPosts = [
  {
    tag: "Процесс",
    title: "Как я создаю атмосферу в треке: от идеи до финального микса",
    excerpt: "Каждый трек начинается с образа. Не с мелодии, не с ритма — а с ощущения...",
    date: "15 апреля 2024",
    readTime: "6 мин"
  },
  {
    tag: "Техника",
    title: "Мои любимые инструменты для создания тёмного электронного звука",
    excerpt: "Синтезаторы, плагины и железо, которые формируют мой звук уже несколько лет.",
    date: "2 апреля 2024",
    readTime: "4 мин"
  },
  {
    tag: "Мысли",
    title: "Почему тишина — главный инструмент в музыке",
    excerpt: "То, что не звучит, часто говорит громче всего. О роли пространства в треке.",
    date: "20 марта 2024",
    readTime: "3 мин"
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? "star-filled" : "star-empty"}>★</span>
      ))}
    </div>
  );
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(l => l.id);
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen" style={{ background: "#080b12" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(8,11,18,0.97) 0%, rgba(8,11,18,0) 100%)" }}>
        <button
          className="font-display text-xl tracking-widest text-gold-light glow-gold-text"
          style={{ fontFamily: "Cormorant, serif", letterSpacing: "0.2em" }}
          onClick={() => scrollTo("home")}
        >
          SOUNDSCAPE
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`nav-link text-xs tracking-widest uppercase transition-colors ${
                activeSection === link.id ? "text-gold" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button className="md:hidden text-foreground/70" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(8,11,18,0.97)" }}>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-display text-3xl tracking-widest text-foreground/80 hover:text-gold transition-colors"
              style={{ fontFamily: "Cormorant, serif" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex flex-col justify-end pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Studio" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(8,11,18,0.3) 0%, rgba(8,11,18,0.6) 50%, rgba(8,11,18,1) 100%)"
          }} />
          <div className="absolute inset-0 animate-glow-pulse" style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(196,150,86,0.06) 0%, transparent 60%)"
          }} />
        </div>

        <div className="relative z-10 px-6 md:px-12 max-w-4xl">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 opacity-0 animate-fade-in animate-delay-200" style={{ animationFillMode: "forwards" }}>
            Музыкальный продюсер
          </p>
          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-8 opacity-0 animate-fade-up animate-delay-300"
            style={{ fontFamily: "Cormorant, serif", animationFillMode: "forwards" }}
          >
            Звук,<br />
            <em className="text-gold glow-gold-text not-italic">который<br />остаётся</em>
          </h1>
          <p className="text-foreground/50 text-sm md:text-base tracking-wide max-w-md mb-12 leading-relaxed opacity-0 animate-fade-up animate-delay-500"
            style={{ animationFillMode: "forwards" }}>
            Создаю атмосферную электронную музыку и пишу треки под заказ. Каждый проект — это история.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up animate-delay-600"
            style={{ animationFillMode: "forwards" }}>
            <button
              onClick={() => scrollTo("tracks")}
              className="px-8 py-3 text-xs tracking-widest uppercase border border-gold text-gold hover:bg-gold hover:text-background transition-all duration-300"
            >
              Слушать треки
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="px-8 py-3 text-xs tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors"
            >
              Заказать трек →
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <div className="w-px h-12 bg-gold" />
        </div>
      </section>

      {/* TRACKS */}
      <section id="tracks" className="py-24 px-6 md:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Дискография</p>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-16 text-foreground/90"
              style={{ fontFamily: "Cormorant, serif" }}>
              Треки
            </h2>

            <div className="space-y-0">
              {tracks.length === 0 ? (
                <div className="py-16 text-center border border-border/30">
                  <Icon name="Music" size={32} className="text-gold/30 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Треки скоро появятся</p>
                </div>
              ) : tracks.map((track, i) => (
                <div
                  key={track.id}
                  className="track-card group flex items-center gap-4 py-5 border-b border-border/40 cursor-pointer"
                  onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                >
                  <span className="text-xs text-muted-foreground w-6 text-right">{String(i + 1).padStart(2, "0")}</span>
                  <button className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${
                    playingTrack === track.id
                      ? "border-gold bg-gold text-background"
                      : "border-border group-hover:border-gold group-hover:text-gold text-muted-foreground"
                  }`}>
                    <Icon name={playingTrack === track.id ? "Pause" : "Play"} size={12} />
                  </button>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">{track.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{track.genre}</div>
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:block">{track.year}</span>
                  <span className="text-xs text-muted-foreground">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 md:px-12" style={{ background: "rgba(255,255,255,0.02)" }}>
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Что я предлагаю</p>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-16 text-foreground/90"
              style={{ fontFamily: "Cormorant, serif" }}>
              Услуги
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/40">
              {services.map((s) => (
                <div key={s.title} className="p-8 md:p-10 hover:bg-card transition-colors duration-300 cursor-pointer group"
                  style={{ background: "#080b12" }}>
                  <div className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-gold/50 mb-6 transition-colors">
                    <Icon name={s.icon} size={18} className="text-gold" fallback="Music" />
                  </div>
                  <h3 className="text-lg font-medium mb-3 group-hover:text-gold transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                  <div className="text-xs tracking-widest text-gold">{s.price}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Кто я</p>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-8 text-foreground/90"
                style={{ fontFamily: "Cormorant, serif" }}>
                О мне
              </h2>
              <p className="text-foreground/60 leading-loose text-sm mb-6">
                Занимаюсь музыкой более 10 лет. Начинал с ambient и электроники, сейчас работаю
                на стыке жанров — от dark pop до кинематографических саундтреков.
              </p>
              <p className="text-foreground/60 leading-loose text-sm mb-10">
                Моя задача — создать не просто трек, а атмосферу. Звук, который вызывает образы
                и остаётся в памяти после первого прослушивания.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[["10+", "лет опыта"], ["200+", "треков"], ["50+", "клиентов"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display text-3xl text-gold" style={{ fontFamily: "Cormorant, serif" }}>{n}</div>
                    <div className="text-xs text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={HERO_IMAGE} alt="About" className="w-full h-full object-cover opacity-60 grayscale" />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(135deg, transparent 60%, rgba(196,150,86,0.1) 100%)"
                }} />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/30" />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 md:px-12" style={{ background: "rgba(255,255,255,0.02)" }}>
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Обратная связь</p>
                <h2 className="font-display text-5xl md:text-6xl font-light text-foreground/90"
                  style={{ fontFamily: "Cormorant, serif" }}>
                  Отзывы
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-6xl text-gold" style={{ fontFamily: "Cormorant, serif" }}>{avgRating}</span>
                <div>
                  <StarRating rating={5} />
                  <p className="text-xs text-muted-foreground mt-1">{reviews.length} отзыва</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((r, i) => (
                <div key={i} className="p-8 border border-border/40 hover:border-gold/20 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-medium text-sm">{r.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{r.role}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <StarRating rating={r.rating} />
                  <p className="text-sm text-foreground/60 mt-4 leading-relaxed italic">«{r.text}»</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CHANNELS */}
      <section id="channels" className="py-24 px-6 md:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Где слушать</p>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-16 text-foreground/90"
              style={{ fontFamily: "Cormorant, serif" }}>
              Каналы
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {channels.map((ch) => (
                <a
                  key={ch.name}
                  href={ch.link}
                  className="group p-6 border border-border/40 hover:border-gold/40 hover:bg-card transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <Icon name={ch.icon} size={20} className="text-muted-foreground group-hover:text-gold transition-colors" fallback="Radio" />
                    <Icon name="ArrowUpRight" size={14} className="text-muted-foreground/40 group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-medium group-hover:text-gold transition-colors">{ch.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{ch.followers} подписчиков</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 px-6 md:px-12" style={{ background: "rgba(255,255,255,0.02)" }}>
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Мысли и процесс</p>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-16 text-foreground/90"
              style={{ fontFamily: "Cormorant, serif" }}>
              Блог
            </h2>

            <div className="space-y-0">
              {blogPosts.map((post, i) => (
                <article key={i}
                  className="group py-8 border-b border-border/40 cursor-pointer grid md:grid-cols-[1fr_auto] gap-6 items-start hover:bg-card/20 transition-colors px-2">
                  <div>
                    <span className="text-xs tracking-widest text-gold uppercase">{post.tag}</span>
                    <h3 className="text-lg font-medium mt-2 mb-3 group-hover:text-gold transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  </div>
                  <div className="text-right min-w-max">
                    <div className="text-xs text-muted-foreground">{post.date}</div>
                    <div className="text-xs text-muted-foreground mt-1">{post.readTime} чтения</div>
                    <div className="text-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 md:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">Написать мне</p>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-6 text-foreground/90"
              style={{ fontFamily: "Cormorant, serif" }}>
              Контакты
            </h2>
            <p className="text-muted-foreground text-sm mb-16 max-w-md leading-relaxed">
              Обсудим ваш проект. Расскажите об идее — и мы найдём для неё звук.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Ваше имя</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2 text-sm transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2 text-sm transition-colors"
                    placeholder="ivan@mail.ru"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Сообщение</label>
                  <textarea
                    className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2 text-sm transition-colors resize-none"
                    rows={4}
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 border border-gold text-gold text-xs tracking-widest uppercase hover:bg-gold hover:text-background transition-all duration-300"
                >
                  Отправить
                </button>
              </form>

              <div className="flex flex-col gap-8 pt-2">
                {[
                  { icon: "Mail", label: "Email", value: "hello@soundscape.ru" },
                  { icon: "MessageCircle", label: "Telegram", value: "@leenayzee_15" },
                  { icon: "Instagram", label: "Instagram", value: "@soundscape.music" },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-8 h-8 flex items-center justify-center border border-border mt-0.5">
                      <Icon name={c.icon} size={14} className="text-gold" fallback="Mail" />
                    </div>
                    <div>
                      <div className="text-xs tracking-widest uppercase text-muted-foreground mb-1">{c.label}</div>
                      <div className="text-sm text-foreground/80">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-12 border-t border-border/40">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg tracking-widest text-gold/60"
            style={{ fontFamily: "Cormorant, serif", letterSpacing: "0.2em" }}>
            SOUNDSCAPE
          </span>
          <p className="text-xs text-muted-foreground">© 2024 Все права защищены</p>
          <div className="flex gap-6">
            {channels.slice(0, 4).map(ch => (
              <a key={ch.name} href={ch.link} className="text-muted-foreground hover:text-gold transition-colors">
                <Icon name={ch.icon} size={16} fallback="Radio" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;