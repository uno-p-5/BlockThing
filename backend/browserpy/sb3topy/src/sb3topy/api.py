import os
import logging
import zipfile
import io
from . import unpacker, project, parser, packer

logger = logging.getLogger(__name__)

# def download_project(file_url_or_path, output_dir):
#     """
#     Downloads or extracts a project based on the provided file URL or path.

#     :param file_url_or_path: The URL or local path of the project file.
#     :param output_dir: The directory where the extracted project files will be saved.
#     :return: The project object if successful, None otherwise.
#     """

#     # Ensure the output directory exists
#     os.makedirs(output_dir, exist_ok=True)

#     # Initialize the manifest
#     manifest = project.Manifest(output_dir)

#     # Check if the input is a URL (download the project) or a local file path (extract the project)
#     if file_url_or_path.startswith("http://") or file_url_or_path.startswith("https://"):
#         logger.info(f"Downloading project from {file_url_or_path}...")
#         sb3 = unpacker.download_project(manifest, file_url_or_path)
#     else:
#         logger.info(f"Extracting project from {file_url_or_path}...")
#         sb3 = unpacker.extract_project(manifest, file_url_or_path)

#     # Verify the project was unpacked correctly
#     if sb3 is None or not sb3.is_sb3():
#         logger.error("Failed to unpack or verify the project.")
#         return None

#     return sb3


# def transpile_project(sb3, manifest):
#     """
#     Transpiles the given sb3 project and returns a zip of the transpiled assets and code.

#     :param sb3: The sb3 project object (already loaded).
#     :param manifest: The Manifest object that holds project-related information.
#     :return: An in-memory zip file containing transpiled code and assets.
#     """
#     try:
#         # Convert project assets if necessary
#         unpacker.convert_assets(manifest)
#         logger.info("Converted project assets.")

#         # Parse the project code (this is returned as a single string)
#         code = parser.parse_project(sb3, manifest)
#         logger.info("Parsed project code.")

#         # Create an in-memory ZIP file to store the transpiled project
#         zip_buffer = io.BytesIO()

#         with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
#             # Add the transpiled code as a single Python file (project.py)
#             zip_file.writestr("project.py", code)
#             logger.info("Added project.py to the zip.")

#             # Optionally, add assets to the zip as well
#             # Assuming manifest.list_assets() returns a list of asset names
#             # and manifest.get_asset_content(asset_name) retrieves the content of the asset
#             for asset_name in manifest.list_assets():
#                 asset_content = manifest.get_asset_content(asset_name)
#                 zip_file.writestr(asset_name, asset_content)
#                 logger.info(f"Added asset {asset_name} to the zip.")

#         # Move the pointer to the beginning of the buffer
#         zip_buffer.seek(0)
#         logger.info("Transpilation completed and zip buffer is ready.")

#         return zip_buffer

#     except Exception as e:
#         logger.error(f"Error during transpilation: {e}")
#         return None


# def download_and_transpile(file_url_or_path, output_dir):
#     """
#     Downloads and transpiles a project, returning the transpiled code and assets as a zip.

#     :param file_url_or_path: The URL or local path of the project file.
#     :param output_dir: The directory where intermediate project files will be saved.
#     :return: An in-memory zip file containing the transpiled code and assets.
#     """

#     # Step 1: Download or extract the project
#     sb3 = download_project(file_url_or_path, output_dir)
#     if sb3 is None:
#         logger.error("Project download/extraction failed.")
#         return None

#     # Step 2: transpile the project and get a zip file
#     return transpile_project(sb3, output_dir)
