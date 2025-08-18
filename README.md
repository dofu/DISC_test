# DISC Personality Assessment

A web-based DISC personality assessment tool that helps users understand their personality style and work preferences.

## Features

- 24-question dual-mapping assessment
- Real-time progress tracking
- Detailed personality profile results
- PDF report generation
- Responsive design for mobile and desktop
- Clean, modern UI with smooth animations

## DISC Types

- **D (Dominance)**: Direct, decisive, and results-focused
- **I (Influence)**: Outgoing, optimistic, and persuasive  
- **S (Steadiness)**: Calm, reliable, and supportive
- **C (Conscientiousness)**: Precise, analytical, and quality-driven

## File Structure

```
disc-assessment/
├── index.html          # Main HTML structure
├── css/
│   └── styles.css      # All styles and responsive design
├── js/
│   ├── questions.js    # Questions, mappings, and descriptions
│   └── app.js          # Main application logic
└── README.md           # This file
```

## Setup

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No additional setup required - runs entirely in the browser

## Usage

1. **Fill in Details**: Enter your full name and organization
2. **Take Assessment**: Answer 24 questions by selecting what describes you MOST and LEAST
3. **View Results**: Get your dominant personality style with detailed description
4. **Download PDF**: Generate a PDF report of your results
5. **Retake**: Clear all data and start over if needed

## Dependencies

- **Fonts**: Inter from Google Fonts
- **PDF Generation**: html2pdf.js from CDN
- **No build process required**: Pure HTML/CSS/JavaScript

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- No IE support required

## Customization

- **Styling**: Modify `css/styles.css` for visual changes
- **Questions**: Update `js/questions.js` to change assessment content
- **Logic**: Modify `js/app.js` for functionality changes
- **Colors**: Update CSS custom properties in `:root` selector

## License

Open source - feel free to modify and use for your projects.

## Credits

Made by Shin