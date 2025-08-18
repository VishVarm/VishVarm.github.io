# Personal Website - HTML/CSS/JavaScript Version

This is a converted version of the original Next.js/TypeScript website to plain HTML, CSS, and JavaScript, organized with a clean directory structure.

## What Changed

- **Removed**: Next.js framework, React, TypeScript, Tailwind CSS
- **Added**: Plain HTML files, custom CSS, vanilla JavaScript
- **Benefits**: No build process needed, can be hosted anywhere, smaller file size
- **Structure**: Organized with subdirectories for each section and centralized resources

## New Directory Structure

```
personal-website/
├── index.html                    # Main About/Home page
├── projects/
│   └── index.html               # Projects showcase
├── blog/
│   └── index.html               # Blog page
├── games/
│   ├── index.html               # Games overview
│   ├── memory-match/
│   │   ├── index.html          # Memory Match game
│   │   └── memory-match.js     # Game logic
│   └── ten-queens-puzzle/
│       ├── index.html          # 10 Queens Puzzle game
│       └── ten-queens-puzzle.js # Game logic
└── resources/                    # All assets and resources
    ├── styles.css               # Main stylesheet
    ├── script.js                # Main JavaScript
    ├── images/                  # All website images
    ├── favicon.svg              # Website icon
    ├── *.svg                    # Other SVG icons
    ├── VishnuVarmaResume.pdf   # Resume file
    └── 10-queens-solutions.json # Game data
```

## How to Use

1. **Open in Browser**: Simply open `index.html` in any modern web browser
2. **Local Development**: Use a local server (like Live Server in VS Code) for best experience
3. **Hosting**: Upload all files to any web hosting service (GitHub Pages, Netlify, Vercel, etc.)

## URL Structure

- **Home/About**: `/` (root index.html)
- **Projects**: `/projects/`
- **Blog**: `/blog/`
- **Games**: `/games/`
- **Memory Match**: `/games/memory-match/`
- **10 Queens Puzzle**: `/games/ten-queens-puzzle/`

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Games**: Memory Match and 10 Queens Puzzle
- **Modern UI**: Clean, professional design
- **Fast Loading**: No framework overhead
- **Cross-browser Compatible**: Works in all modern browsers
- **Clean URLs**: SEO-friendly directory structure

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

- **Colors**: Edit CSS variables in `resources/styles.css`
- **Content**: Modify HTML files directly
- **Styling**: Update CSS classes and properties
- **Functionality**: Modify JavaScript files

## Performance

- **Bundle Size**: ~50KB (vs 419MB for Next.js)
- **Load Time**: Instant (no JavaScript compilation)
- **Dependencies**: None (pure HTML/CSS/JS)

## Deployment

1. **GitHub Pages**: Push to a repository and enable GitHub Pages
2. **Netlify**: Drag and drop the folder to Netlify
3. **Vercel**: Upload the folder to Vercel
4. **Traditional Hosting**: Upload via FTP to any web server

## Maintenance

- **Updates**: Edit HTML/CSS/JS files directly
- **No Build Process**: Changes are immediate
- **Version Control**: Track changes with Git
- **Backup**: Keep copies of your files
- **Organization**: Each section is in its own directory

## Troubleshooting

- **Images not loading**: Check file paths in HTML (should be `../resources/images/`)
- **Games not working**: Ensure JavaScript is enabled
- **Styling issues**: Check CSS file paths (should be `../resources/styles.css`)
- **Mobile issues**: Test responsive design
- **Navigation broken**: Verify relative paths in navigation links

## Future Enhancements

- Add more games
- Implement dark mode
- Add contact form
- Include analytics
- Add more interactive elements
- Create additional content sections

---

**Note**: This version maintains all the functionality of the original Next.js website while being much simpler to deploy and maintain. The new directory structure makes it easier to organize content and manage resources.
