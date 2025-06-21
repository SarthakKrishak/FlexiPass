# 🔐 FlexiPass - Secure Password Generator

A modern, feature-rich password generator built with React and Vite, designed to create secure, customizable passwords with enterprise-grade encryption standards.

![FlexiPass](https://img.shields.io/badge/FlexiPass-Password%20Generator-blue?style=for-the-badge&logo=shield)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🔒 Secure Password Generation**: Generate cryptographically secure passwords with customizable length (6-50 characters)
- **🎛️ Customizable Options**: Choose from uppercase, lowercase, numbers, and special characters
- **📊 Real-time Strength Analysis**: Visual password strength indicator with color-coded feedback
- **📋 One-click Copy**: Copy passwords to clipboard with a single click
- **📚 Password History**: Access recently generated passwords (stored locally for 6 months)
- **🎨 Modern UI**: Beautiful gradient design with smooth animations and responsive layout
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🔐 Local Storage**: Passwords are stored locally in your browser for convenience
- **⚡ Fast & Lightweight**: Built with Vite for optimal performance

## 🚀 Live Demo

[Try FlexiPass Online](https://flexipassword.vercel.app/)

## 🛠️ Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/SarthakKrishak/FlexiPass.git
   cd flexipass
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage

### Basic Password Generation

1. **Adjust Password Length**: Use the slider to set your desired password length (6-50 characters)
2. **Select Character Types**: Toggle the checkboxes for:
   - Uppercase letters (A-Z)
   - Lowercase letters (a-z)
   - Numbers (0-9)
   - Special symbols (!@#$%^&\*)
3. **Generate Password**: Click the "Generate New Password" button
4. **Copy Password**: Click the copy icon to copy the password to your clipboard

### Password History

- Click the "History" button in the header to view recently generated passwords
- Passwords are automatically saved and accessible for 6 months
- Click "Copy" next to any historical password to copy it

### Password Strength Indicator

The application provides real-time feedback on password strength:

- **Weak** (Red): Basic password with limited character variety
- **Medium** (Yellow): Moderate security with mixed character types
- **Strong** (Green): High-security password with all character types

## 🏗️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Styling**: Tailwind CSS 3.4.14
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS, Autoprefixer

## 📁 Project Structure

```
flexipass/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md           # Project documentation
```

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The application runs entirely in the browser.

### Customization

You can customize the application by modifying:

- `src/App.jsx` - Main application logic and UI
- `src/index.css` - Global styles and Tailwind imports
- `tailwind.config.js` - Tailwind CSS configuration

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `dist/` folder to Netlify's deploy area
3. Or connect your GitHub repository for automatic deployments

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Sarthak Krishak**

- Portfolio: [Linktree](https://linktr.ee/SarthakKrishak)
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/flexipass)
![GitHub issues](https://img.shields.io/github/issues/yourusername/flexipass)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/flexipass)
![GitHub license](https://img.shields.io/github/license/yourusername/flexipass)

---

⭐ **Star this repository if you find it helpful!**
