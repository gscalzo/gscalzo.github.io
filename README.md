# Gio Scalzo's Blog Website

![Hugo](https://img.shields.io/badge/Hugo-FF4088?style=for-the-badge&logo=hugo&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub&logoColor=white)

This is a personal blog website built with [Hugo](https://gohugo.io/), a fast and modern static site generator, and hosted on GitHub Pages.

## 🚀 Technologies

- **Static Site Generator**: [Hugo](https://gohugo.io/)
- **Theme**: [Paper](https://github.com/nanxiaobei/hugo-paper) - A simple and clean Hugo theme
- **Hosting**: GitHub Pages


## 📁 Project Structure

```
.
├── archetypes/           # Template files for new content
├── content/              # All content for the website
│   ├── blog/             # Blog section content
│   ├── posts/            # Individual blog posts
│   └── projects/         # Projects section content
├── layouts/              # Custom layout templates
│   └── partials/         # Partial templates
├── static/               # Static files (images, CNAME, etc.)
│   └── images/           # Image files
└── themes/               # Hugo themes
    └── paper/            # Paper theme files
```

## 🛠️ Setup and Development

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/) (Extended version recommended)
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/gscalzo/gscalzo.github.io.git
   cd gscalzo.github.io
   ```

2. Start the Hugo development server:
   ```bash
   hugo server -D
   ```

3. Open your browser and visit [http://localhost:1313](http://localhost:1313)

### Building for Production

To build the site for production:

```bash
hugo --minify
```

This will generate the static site in the `public/` directory.

## 🔄 Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## 📝 Creating New Content

To create a new blog post:

```bash
hugo new posts/my-new-post.md
```

## 📄 License

All rights reserved. The code structure is open-sourced, but content and images are copyrighted.

---

Built with ❤️ using Hugo
