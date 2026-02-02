from fpdf import FPDF
import os

class PDF(FPDF):
    def header(self):
        # Name
        self.set_font('Arial', 'B', 24)
        self.cell(0, 10, 'RAGUL S', 0, 1, 'C')
        # Title
        self.set_font('Arial', 'I', 14)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, 'Computer Science Engineer | Full Stack Developer', 0, 1, 'C')
        # Line break
        self.ln(5)
        # Line separator
        self.set_draw_color(2, 132, 199) # Main Blue Color
        self.set_line_width(1)
        self.line(10, 35, 200, 35)
        self.ln(10)

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 16)
        self.set_text_color(2, 132, 199) # Main Blue
        self.cell(0, 10, title.upper(), 0, 1, 'L')
        self.set_draw_color(200, 200, 200)
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(5)

    def chapter_body(self, body):
        self.set_font('Arial', '', 12)
        self.set_text_color(0, 0, 0)
        self.multi_cell(0, 7, body)
        self.ln(5)

    def entry_title(self, title, subtitle):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 6, title, 0, 1)
        self.set_font('Arial', 'I', 11)
        self.cell(0, 6, subtitle, 0, 1)
    
    def entry_list(self, items):
        self.set_font('Arial', '', 11)
        for item in items:
            self.cell(5)
            self.cell(0, 6, chr(149) + ' ' + item, 0, 1)
        self.ln(3)

def create_resume():
    pdf = PDF()
    pdf.add_page()
    
    # -- Contact Info --
    pdf.set_font('Arial', '', 10)
    pdf.set_text_color(50, 50, 50)
    pdf.cell(0, 5, 'Email: ragul.s@example.com | Phone: +91 9876543210', 0, 1, 'C')
    pdf.cell(0, 5, 'LinkedIn: linkedin.com/in/ragul-s | GitHub: github.com/raguls', 0, 1, 'C')
    pdf.ln(10)

    # -- Summary --
    pdf.chapter_title('Professional Summary')
    pdf.chapter_body(
        "Passionate Computer Science Engineering student with expertise in Full Stack Development "
        "and Python programming. Proven track record of building scalable web applications and AI-integrated "
        "solutions. Eager to leverage skills in a challenging role to drive organizational success."
    )

    # -- Education --
    pdf.chapter_title('Education')
    pdf.entry_title('Bachelor of Engineering in Computer Science', 'Excel Engineering College | 2023 - 2027')
    pdf.entry_list(['CGPA: 8.5/10 (Current)', 'Active member of the Coding Club and Tech Society'])

    # -- Skills --
    pdf.chapter_title('Technical Skills')
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(40, 7, 'Languages:', 0, 0)
    pdf.set_font('Arial', '', 11)
    pdf.cell(0, 7, 'Python, JavaScript, HTML5, CSS3, SQL, Java', 0, 1)
    
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(40, 7, 'Frameworks:', 0, 0)
    pdf.set_font('Arial', '', 11)
    pdf.cell(0, 7, 'Flask, Django, React, Bootstrap, Tailwind CSS', 0, 1)
    
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(40, 7, 'Tools & Others:', 0, 0)
    pdf.set_font('Arial', '', 11)
    pdf.cell(0, 7, 'Git, GitHub, VS Code, MySQL, MongoDB, Postman', 0, 1)
    pdf.ln(5)

    # -- Projects --
    pdf.chapter_title('Key Projects')
    
    pdf.entry_title('Advanced Portfolio Website', 'Tech Stack: Flask, HTML, CSS, JavaScript')
    pdf.chapter_body(
        "Designed and developed a professional personal portfolio with dark/light themes, "
        "interactive animations, and a backend-integrated contact form."
    )
    
    pdf.entry_title('AI Chatbot Assistant', 'Tech Stack: Python, TensorFlow, NLTK')
    pdf.chapter_body(
        "Built an intelligent chatbot capable of understanding natural language queries "
        "and providing context-aware responses for customer support scenarios."
    )
    
    pdf.entry_title('Social Linker App', 'Tech Stack: Node.js, React, MongoDB')
    pdf.chapter_body(
        "Created a centralized social media verification platform allowing professionals "
        "to link and showcase their verified profiles in a single bio link."
    )

    # -- Certifications --
    pdf.chapter_title('Certifications')
    pdf.entry_list([
        'Full Stack Web Development Bootcamp - Udemy',
        'Python for Data Science - Coursera',
        'Responsive Web Design - freeCodeCamp'
    ])

    # -- Languages --
    pdf.chapter_title('Languages')
    pdf.entry_list(['English (Professional)', 'Tamil (Native)'])

    # Save
    directory = os.path.join(os.getcwd(), 'static', 'files')
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    output_path = os.path.join(directory, 'Ragul_S_Resume.pdf')
    pdf.output(output_path)
    print(f"Resume generated at: {output_path}")

if __name__ == '__main__':
    create_resume()
