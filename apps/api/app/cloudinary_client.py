from urllib.parse import urlparse

import cloudinary
import cloudinary.uploader

from app.config import settings


class CloudinaryNotConfiguredError(RuntimeError):
    pass


_PLACEHOLDER_HOSTS = {None, "<cloud_name>"}

_configured = False

if settings.cloudinary_url:
    # cloudinary.config(cloudinary_url=...) does NOT parse the URL in this SDK
    # version -- it only auto-parses CLOUDINARY_URL from the raw OS environment
    # at import time. We load config via pydantic-settings/.env instead, so we
    # parse the URL ourselves and pass the individual fields explicitly.
    parsed = urlparse(settings.cloudinary_url)
    if parsed.hostname not in _PLACEHOLDER_HOSTS:
        cloudinary.config(
            cloud_name=parsed.hostname,
            api_key=parsed.username,
            api_secret=parsed.password,
            secure=True,
        )
        _configured = True


def upload_dress_image(file_bytes: bytes, *, folder: str = "egzona-abazi/dresses") -> str:
    """Uploads image bytes to Cloudinary and returns the resulting secure URL."""
    if not _configured:
        raise CloudinaryNotConfiguredError(
            "Cloudinary is not configured: set a real CLOUDINARY_URL in apps/api/.env"
        )
    result = cloudinary.uploader.upload(file_bytes, folder=folder)
    return result["secure_url"]
