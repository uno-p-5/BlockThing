import os
import logging
import zipfile
import io
from . import unpacker, project, parser

logger = logging.getLogger(__name__)

def download_project(file_url_or_path, output_dir):
    """
    Downloads or extracts a project based on the provided file URL or path.

    :param file_url_or_path: The URL or local path of the project file.
    :param output_dir: The directory where the extracted project files will be saved.
    :return: The project object if successful, None otherwise.
    """

    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Initialize the manifest
    manifest = project.Manifest(output_dir)

    # Check if the input is a URL (download the project) or a local file path (extract the project)
    if file_url_or_path.startswith("http://") or file_url_or_path.startswith("https://"):
        logger.info(f"Downloading project from {file_url_or_path}...")
        sb3 = unpacker.download_project(manifest, file_url_or_path)
    else:
        logger.info(f"Extracting project from {file_url_or_path}...")
        sb3 = unpacker.extract_project(manifest, file_url_or_path)

    # Verify the project was unpacked correctly
    if sb3 is None or not sb3.is_sb3():
        logger.error("Failed to unpack or verify the project.")
        return None

    return sb3


def decompile_project(sb3, output_dir):
    """
    Decompiles the project and returns the code as a compressed zip.

    :param sb3: The project object to be decompiled.
    :param output_dir: The directory where the decompiled project assets will be stored temporarily.
    :return: An in-memory zip file containing the decompiled code and assets.
    """

    # Initialize the manifest
    manifest = project.Manifest(output_dir)

    # Convert project assets
    unpacker.convert_assets(manifest)
    logger.info("Converted project assets.")

    # Parse the project code
    logger.info("Parsing the project...")
    code = parser.parse_project(sb3, manifest)

    # Create an in-memory ZIP file to store the decompiled code
    zip_buffer = io.BytesIO()
    
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        # Add parsed code files to the zip
        for file_name, file_content in code.items():
            zip_file.writestr(file_name, file_content)

        # Optionally, add other files like converted assets (if required)
        # In this example, you would typically iterate over assets and include them in the zip as well

    zip_buffer.seek(0)  # Reset the buffer to the beginning

    logger.info("Decompiled project has been compressed into a zip.")
    return zip_buffer


def download_and_decompile(file_url_or_path, output_dir):
    """
    Downloads and decompiles a project, returning the decompiled code and assets as a zip.

    :param file_url_or_path: The URL or local path of the project file.
    :param output_dir: The directory where intermediate project files will be saved.
    :return: An in-memory zip file containing the decompiled code and assets.
    """

    # Step 1: Download or extract the project
    sb3 = download_project(file_url_or_path, output_dir)
    if sb3 is None:
        logger.error("Project download/extraction failed.")
        return None

    # Step 2: Decompile the project and get a zip file
    return decompile_project(sb3, output_dir)
