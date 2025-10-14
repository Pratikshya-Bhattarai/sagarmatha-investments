# Sagarmatha Investments - Next.js Application

A modern, responsive web application for Sagarmatha Investments, a brokerage and investment advisory firm in Nepal. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with React 19 and TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **NEPSE Integration**: Real-time stock market data from Nepal Stock Exchange
- **PWA Support**: Progressive Web App capabilities
- **SEO Optimized**: Built-in SEO with Next.js metadata API
- **Analytics**: Google Analytics integration
- **Theme Support**: Dark/Light mode toggle
- **Charts**: Interactive charts for market data visualization

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4
- **Frontend**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: Supabase
- **Charts**: Chart.js with React Chart.js 2
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sagarmatha-investments
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── charts/            # Charts page
│   ├── contact/           # Contact page
│   ├── nepse/             # NEPSE data pages
│   └── ...
├── components/            # React components
│   ├── charts/            # Chart components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   └── ui/                # UI components
└── lib/                   # Utility functions
    ├── nepse-data.ts      # NEPSE data handling
    ├── supabase.ts        # Supabase client
    └── utils.ts           # General utilities
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run sync-nepse` - Sync NEPSE data
- `npm run fetch-nepse` - Fetch NEPSE data

## 🌐 API Endpoints

- `/api/nepse` - Get NEPSE market data
- `/api/nepse/sync` - Sync NEPSE data
- `/api/nepse/fetch` - Fetch NEPSE data
- `/api/cron/nepse-sync` - Cron job for data sync

## 📊 NEPSE Integration

The application integrates with Nepal Stock Exchange (NEPSE) to provide:

- Real-time stock prices
- Market indices
- Trading volume and turnover
- Historical data
- Company information

## 🎨 Styling

The project uses Tailwind CSS for styling with:

- Custom color scheme
- Responsive design
- Dark/Light theme support
- Component-based styling

## 🔒 Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 PWA Features

- Offline support
- Installable on mobile devices
- Service worker for caching
- Manifest for app-like experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Sagarmatha Investments**
- Website: [sagarmatha-investments.vercel.app](https://sagarmatha-investments.vercel.app)
- Email: info@sagarmathainvestments.com
- Phone: +977-9876543211

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- React team for the UI library
- Tailwind CSS for the utility-first CSS framework
- Chart.js for the charting capabilities
- Supabase for the backend services