import tkinter as tk
from tkinter import filedialog, messagebox
import shutil
import os

def main():
    root = tk.Tk()
    root.withdraw()
    root.attributes('-topmost', True) # Bring to front
    
    # Show an alert first so they know to look for the file picker
    messagebox.showinfo("Portfolio Image Setup", "Please select the photo you want to use for your portfolio from your computer. (The one you uploaded in the chat).", parent=root)
    
    # Open file dialog
    file_path = filedialog.askopenfilename(
        title='Select the profile image you want to use',
        filetypes=[("Image files", "*.png *.jpg *.jpeg")]
    )
    
    if file_path:
        dest_dir = r"c:\Users\sifo-shabeer\.gemini\antigravity\scratch\portfolio_website\assets"
        os.makedirs(dest_dir, exist_ok=True)
        dest_file = os.path.join(dest_dir, "profile.png")
        
        # Copy the file
        shutil.copy(file_path, dest_file)
        print(f"SUCCESS: Image copied to {dest_file}")
    else:
        print("CANCELED: No image was selected.")

if __name__ == "__main__":
    main()
