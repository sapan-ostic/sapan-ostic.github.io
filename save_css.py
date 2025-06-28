#!/usr/bin/env python3
import re
import os

def extract_and_save_css(file_path, output_dir):
    """Extract all embedded CSS from HTML file and save to external files"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all style blocks with their IDs and content
        style_pattern = r'<style([^>]*)>(.*?)</style>'
        matches = re.findall(style_pattern, content, re.DOTALL)
        
        print(f"Found {len(matches)} style blocks")
        
        css_files = []
        
        for i, (attributes, css_content) in enumerate(matches):
            # Clean up the content
            css_content = css_content.strip()
            print(f"Processing style block {i+1}: {attributes[:50]}...")
            
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
            elif 'MathJax_Preview' in css_content and '#MathJax_Message' in css_content:
                filename = 'mathjax-preview.css'
            elif 'MJXp-script' in css_content:
                filename = 'mathjax-output.css'
            else:
                filename = f'embedded-styles-{i+1}.css'
            
            css_files.append((filename, css_content))
        
        # Save each CSS file
        for filename, css_content in css_files:
            file_path = os.path.join(output_dir, filename)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(css_content)
            print(f"Created: {file_path}")
        
        return css_files
    
    except Exception as e:
        print(f"Error: {e}")
        return []

# Extract and save CSS files
output_dir = '/home/sapan-alienware/projects/sapan-ostic.github.io/css'
os.makedirs(output_dir, exist_ok=True)

css_files = extract_and_save_css(
    '/home/sapan-alienware/projects/sapan-ostic.github.io/index.html',
    output_dir
)

print(f"\nExtracted {len(css_files)} CSS files to {output_dir}")
