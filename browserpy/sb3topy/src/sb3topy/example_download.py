from .api import download_and_decompile

# Example call to download and decompile the project
project_url = "https://scratch.mit.edu/projects/1049220990/"
output_directory = "./"

decompiled_zip = download_and_decompile(project_url, output_directory)

if decompiled_zip:
    # Save the in-memory zip file to the filesystem
    with open("decompiled_project.zip", "wb") as f:
        f.write(decompiled_zip.read())
    print("Decompilation completed and saved to 'decompiled_project.zip'.")
else:
    print("Failed to download and decompile the project.")