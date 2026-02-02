# 🎵 Music Groove - Frontend

A modern, responsive music streaming web application built with React and Vite. Enjoy seamless music playback with an intuitive user interface.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-06B6D4?style=flat&logo=tailwindcss)

## ✨ Features

- 🎧 **Audio Playback** - Full-featured audio player with play, pause, skip, and repeat functionality
- 📚 **Music Library** - Browse and organize your music collection
- 👤 **Artist Profiles** - Explore artist details and discographies
- ❤️ **Favorites** - Like and save your favorite tracks
- 🎨 **Modern UI** - Clean, responsive design with TailwindCSS
- 🔐 **User Authentication** - Secure login system

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** TailwindCSS 3
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **Linting:** ESLint 9 + Stylelint

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AudioPlayer/    # Music player controls
│   │   ├── ArtistProfile/  # Artist pages
│   │   ├── Home/           # Home page components
│   │   ├── Library/        # Music library views
│   │   ├── login/          # Authentication UI
│   │   └── reusable/       # Shared components
│   ├── context/            # React Context (AudioContext)
│   ├── audio/              # Audio engine & queue management
│   ├── lib/                # Utilities & axios config
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── public/                 # Public static files
├── Music/                  # Local music files
└── images/                 # Image assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/blessings32/music-groove-web.git
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview production build locally  |
| `npm run lint`    | Run ESLint for code quality       |

## 🔧 Configuration

### API Proxy

The app proxies API requests to `http://localhost:5411`. Update the `proxy` field in `package.json` or configure in `vite.config.js` if your backend runs on a different port.

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5411
```

## 🎨 Styling

This project uses **TailwindCSS** for styling. Configuration can be found in:

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS plugins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

**Happy Listening! 🎶**
