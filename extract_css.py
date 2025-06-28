#!/usr/bin/env python3
import re

def extract_css_from_html(file_path):
    """Extract all embedded CSS from HTML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all style blocks with their IDs and content
    style_pattern = r'<style([^>]*)>(.*?)</style>'
    matches = re.findall(style_pattern, content, re.DOTALL)
    
    css_files = []
    
    for i, (attributes, css_content) in enumerate(matches):
        # Clean up the content
        css_content = css_content.strip()
        
        # Try to identify the type of CSS based on id attribute
        if 'id="fa-v4-font-face"' in attributes:
            filename = 'fontawesome-v4-font-face.css'
        elif 'id="fa-v4-shims"' in attributes:
            filename = 'fontawesome-v4-shims.css'
        elif 'id="fa-main"' in attributes:
            filename = 'fontawesome-main.css'
        elif 'MathJax_Hover_Frame' in css_content:
            filename = 'mathjax-hover.css'
        elif 'MathJax_About' in css_content:
            filename = 'mathjax-menu.css'
        elif 'MJX_Assistive_MathML' in css_content:
            filename = 'mathjax-assistive.css'
        elif 'MathJax_Zoom' in css_content:
            filename = 'mathjax-zoom.css'
        elif 'MathJax_Preview' in css_content:
            filename = 'mathjax-preview.css'
        elif 'MJXp-script' in css_content:
            filename = 'mathjax-output.css'
        else:
            filename = f'embedded-styles-{i+1}.css'
        
        css_files.append((filename, css_content))
    
    return css_files

# Extract CSS
css_files = extract_css_from_html('/home/sapan-alienware/projects/sapan-ostic.github.io/index.html')

for filename, content in css_files:
    print(f"=== {filename} ===")
    print(content[:200] + "...")
    print()
