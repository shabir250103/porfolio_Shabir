import tkinter as tk
from tkinter import filedialog, messagebox
import shutil
import os

def main():
    root = tk.Tk()
    root.withdraw()
    root.attributes('-topmost', True) # Bring to front
    
    # Show an alert first so they know to look for the file picker
    messagebox.showinfo("Portfolio Resume Setup", "Please select your Resume PDF from your computer.", parent=root)
    
    # Open file dialog
    file_path = filedialog.askopenfilename(
        title='Select your Resume PDF',
        filetypes=[("PDF files", "*.pdf")]
    )
    
    if file_path:
        dest_dir = r"c:\Users\sifo-shabeer\.gemini\antigravity\scratch\portfolio_website\assets"
        os.makedirs(dest_dir, exist_ok=True)
        dest_file = os.path.join(dest_dir, "resume.pdf")
        
        # Copy the file
        shutil.copy(file_path, dest_file)
        print(f"SUCCESS: Resume copied to {dest_file}")
    else:
        print("CANCELED: No file was selected.")

if __name__ == "__main__":
    main()
