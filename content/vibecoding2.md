---
title: "Vibe Coding (Part 2)"
description: "Proof of Concept"
date: "2026-01-29"
categories: ["AI"]
image: "/assets/images/chatgpt-logo.svg"
tags: "ai"
hidden: true
slug: "vibecoding2"
---



## User

```markdown
Please generate me a step-by-step implementation, testing and deployment plan for a proof of concept based on Python and NiceGUI.
```

## Agent

```markdown
## PoC Limitations (MVP)
- Single user at a time (no concurrency)
- Max image size: 5MB, 1080p resolution
- Basic UI with upload/download functionality
- Local deployment only (no cloud)
- No user accounts/auth
- Simple model (balanced speed/quality)

## Tech Stack for PoC
**Frontend/Backend**: NiceGUI (Python framework)
**AI Model**: DeOldify (pre-trained, good balance)
**Image Processing**: OpenCV, PIL
**Testing**: pytest, unittest
**Deployment**: Docker (optional), local Python

## Step 1.1: Development Environment
# Create project structure
ai-colorizer-poc/
├── src/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # NiceGUI app
│   │   ├── colorizer.py     # AI model wrapper
│   │   └── utils.py         # Image utilities
│   ├── models/              # Downloaded models
│   └── tests/
│       ├── __init__.py
│       ├── test_colorizer.py
│       └── test_utils.py
├── static/                  # Uploaded/processed images
├── requirements.txt
├── Dockerfile
└── README.md

## Step 1.2: Dependencies Setup
# requirements.txt
nicegui>=1.4.0
opencv-python>=4.8.0
pillow>=10.0.0
numpy>=1.24.0
torch>=2.0.0
torchvision>=0.15.0
fastai>=2.7.0  # For DeOldify
pytest>=7.4.0
pytest-asyncio>=0.21.0
python-multipart>=0.0.6

## Step 1.3: Virtual Environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or venv\Scripts\activate  # Windows

pip install -r requirements.txt

## Step 2.1: Colorizer Module
# src/app/colorizer.py
import torch
from fastai.vision.all import *
import cv2
import numpy as np
from pathlib import Path
import tempfile

class ImageColorizer:
    def __init__(self, model_path=None):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = self._load_model(model_path)
        
    def _load_model(self, model_path):
        """Load pre-trained DeOldify model"""
        # Simplified model loading - in practice would download/load actual model
        # For PoC, we'll use a placeholder that demonstrates the flow
        print(f"Loading model on {self.device}")
        return None  # Placeholder
        
    def colorize(self, image_path, output_path=None):
        """
        Colorize a single image
        Returns: Path to colorized image
        """
        # Read image
        img = cv2.imread(str(image_path))
        if img is None:
            raise ValueError("Could not read image")
            
        # Convert to RGB if needed
        if len(img.shape) == 2:  # Grayscale
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
            
        # For PoC: Simulate colorization with a simple transformation
        # In production: Replace with actual model inference
        colorized = self._simulate_colorization(img)
        
        # Save result
        if output_path is None:
            output_path = Path(tempfile.mktemp(suffix='_colorized.jpg'))
        
        cv2.imwrite(str(output_path), colorized)
        return output_path
    
    def _simulate_colorization(self, img):
        """PoC placeholder - enhances contrast/saturation instead of AI"""
        # Convert to LAB color space for manipulation
        lab = cv2.cvtColor(img, cv2.COLOR_RGB2LAB)
        
        # Enhance contrast in L channel
        l, a, b = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        l = clahe.apply(l)
        
        # Boost color channels
        a = cv2.add(a, 10)
        b = cv2.add(b, 10)
        
        lab = cv2.merge([l, a, b])
        return cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)

## Step 2.2: Image Utilities
# src/app/utils.py
from PIL import Image
import io
import base64
from pathlib import Path

def validate_image(file_bytes, max_size_mb=5, max_resolution=(1920, 1080)):
    """Validate uploaded image"""
    try:
        img = Image.open(io.BytesIO(file_bytes))
        
        # Check file size
        if len(file_bytes) > max_size_mb * 1024 * 1024:
            return False, f"Image exceeds {max_size_mb}MB limit"
            
        # Check resolution
        if img.size[0] > max_resolution[0] or img.size[1] > max_resolution[1]:
            return False, f"Image exceeds {max_resolution} resolution limit"
            
        # Check if grayscale
        if img.mode not in ['L', 'LA', 'P', 'RGB', 'RGBA']:
            return False, "Unsupported image mode"
            
        return True, "Valid image"
        
    except Exception as e:
        return False, f"Invalid image: {str(e)}"

def image_to_base64(image_path):
    """Convert image to base64 for NiceGUI display"""
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

## Step 2.3: NiceGUI Application
# src/app/main.py
from nicegui import ui, app
from pathlib import Path
import tempfile
import asyncio
from .colorizer import ImageColorizer
from .utils import validate_image, image_to_base64
import io

class ColorizationApp:
    def __init__(self):
        self.colorizer = ImageColorizer()
        self.uploaded_image_path = None
        self.colorized_image_path = None
        self.setup_ui()
        
    def setup_ui(self):
        """Setup the NiceGUI interface"""
        # Header
        with ui.header().classes('bg-blue-800 text-white'):
            ui.label('🖼️ AI Image Colorizer - Proof of Concept').classes('text-2xl font-bold')
            
        # Main content
        with ui.row().classes('w-full justify-center mt-8'):
            with ui.column().classes('w-full max-w-4xl gap-8'):
                # Upload section
                ui.label('Upload Black & White Image').classes('text-xl font-semibold')
                
                # File upload
                self.upload = ui.upload(
                    label='Choose Image',
                    on_upload=self.handle_upload,
                    auto_upload=True
                ).props('accept=".jpg,.jpeg,.png,.bmp"').classes('w-full')
                
                # Image preview area
                with ui.row().classes('w-full justify-center gap-8 mt-8'):
                    self.original_container = ui.column().classes('w-96')
                    self.result_container = ui.column().classes('w-96')
                    
                # Process button
                self.process_btn = ui.button(
                    '🎨 Colorize Image',
                    on_click=self.process_image,
                    color='primary'
                ).props('icon=color_lens').classes('mt-8').bind_enabled_from(
                    self, 'uploaded_image_path'
                )
                
                # Status
                self.status = ui.label('Ready to upload').classes('mt-4 text-gray-600')
                
                # Download section (hidden initially)
                with ui.row().classes('w-full justify-center mt-8 hidden') as self.download_row:
                    ui.button(
                        '⬇️ Download Colorized Image',
                        on_click=self.download_image,
                        color='positive'
                    ).props('icon=download')
                    
    async def handle_upload(self, e):
        """Handle file upload"""
        self.status.text = 'Validating image...'
        
        # Validate
        is_valid, message = validate_image(e.content.read())
        if not is_valid:
            ui.notify(message, type='negative')
            self.status.text = 'Upload failed'
            return
            
        # Save uploaded file
        self.uploaded_image_path = Path(tempfile.mktemp(suffix='_uploaded.jpg'))
        e.content.seek(0)
        with open(self.uploaded_image_path, 'wb') as f:
            f.write(e.content.read())
            
        # Display preview
        self.display_image_preview(self.uploaded_image_path, self.original_container, "Original")
        self.status.text = 'Image uploaded successfully! Click "Colorize Image" to process.'
        
    def display_image_preview(self, image_path, container, title):
        """Display image in a container"""
        container.clear()
        with container:
            ui.label(title).classes('text-lg font-medium mb-2')
            # Convert to base64 for display
            b64 = image_to_base64(image_path)
            ui.image(f'data:image/jpeg;base64,{b64}').classes('w-96 h-96 object-contain border rounded-lg')
            
    async def process_image(self):
        """Process image with AI"""
        self.status.text = 'Colorizing...'
        self.process_btn.disable()
        
        try:
            # Colorize image
            self.colorized_image_path = self.colorizer.colorize(self.uploaded_image_path)
            
            # Display result
            self.display_image_preview(self.colorized_image_path, self.result_container, "Colorized")
            
            # Show download button
            self.download_row.set_visibility(True)
            
            self.status.text = 'Colorization complete!'
            ui.notify('Image colorized successfully!', type='positive')
            
        except Exception as e:
            self.status.text = f'Error: {str(e)}'
            ui.notify(f'Colorization failed: {str(e)}', type='negative')
        finally:
            self.process_btn.enable()
            
    async def download_image(self):
        """Trigger download of colorized image"""
        if self.colorized_image_path and self.colorized_image_path.exists():
            # In NiceGUI, we can serve the file for download
            app.add_static_file(
                '/download/colorized.jpg',
                str(self.colorized_image_path)
            )
            ui.open('/download/colorized.jpg')
            
def create_app():
    """Create and configure the NiceGUI app"""
    # Configure app
    app.add_static_files('/static', 'static')
    
    # Create main app instance
    colorization_app = ColorizationApp()
    
    return app

# For running directly
if __name__ in {"__main__", "__mp_main__"}:
    app = create_app()
    ui.run(title="AI Colorizer PoC", port=8080)

## Step 3.1: Unit Tests
# src/tests/test_colorizer.py
import pytest
import cv2
import numpy as np
from pathlib import Path
from app.colorizer import ImageColorizer
from app.utils import validate_image
import tempfile

class TestImageColorizer:
    @pytest.fixture
    def colorizer(self):
        return ImageColorizer()
        
    @pytest.fixture
    def sample_image(self):
        """Create a sample grayscale image for testing"""
        img = np.random.randint(0, 255, (100, 100), dtype=np.uint8)
        path = Path(tempfile.mktemp(suffix='_test.jpg'))
        cv2.imwrite(str(path), img)
        yield path
        path.unlink(missing_ok=True)
        
    def test_colorizer_initialization(self, colorizer):
        assert colorizer.device is not None
        assert colorizer.model is None  # Placeholder for PoC
        
    def test_colorize_creates_output(self, colorizer, sample_image):
        output = colorizer.colorize(sample_image)
        assert output.exists()
        assert output.suffix in ['.jpg', '.jpeg', '.png']
        
        # Verify output is different from input
        input_img = cv2.imread(str(sample_image))
        output_img = cv2.imread(str(output))
        assert not np.array_equal(input_img, output_img)
        
class TestImageUtils:
    def test_validate_image_valid(self):
        # Create a valid small image in memory
        from PIL import Image
        import io
        
        img = Image.new('L', (100, 100), color='white')
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        is_valid, message = validate_image(img_byte_arr, max_size_mb=1)
        assert is_valid
        assert "Valid image" in message
        
    def test_validate_image_too_large(self):
        # Create a large dummy byte array
        large_data = b'x' * (6 * 1024 * 1024)  # 6MB
        
        is_valid, message = validate_image(large_data, max_size_mb=5)
        assert not is_valid
        assert "exceeds" in message

## Step 3.2: Integration Test
# src/tests/test_integration.py
import pytest
from nicegui.testing import TestClient
from app.main import create_app
import asyncio

class TestAppIntegration:
    @pytest.fixture
    def client(self):
        app = create_app()
        return TestClient(app)
        
    @pytest.mark.asyncio
    async def test_app_starts(self, client):
        """Test that the app starts successfully"""
        async with client:
            # Check initial page load
            html = await client.get('/')
            assert 'AI Image Colorizer' in html
            
    @pytest.mark.asyncio
    async def test_ui_elements_present(self, client):
        """Test that all UI elements are present"""
        async with client:
            html = await client.get('/')
            assert 'Upload Black & White Image' in html
            assert 'Colorize Image' in html
            
    # Note: Testing file upload requires more complex setup
    # For PoC, we focus on unit tests

## Step 3.3: Test Runner Script
# run_tests.py
import pytest
import sys

if __name__ == "__main__":
    # Run tests with coverage
    args = [
        "src/tests/",
        "-v",
        "--tb=short",
        "--cov=app",
        "--cov-report=term-missing",
        "--cov-report=html"
    ]
    
    exit_code = pytest.main(args)
    sys.exit(exit_code)

## Step 4.1: Docker Configuration
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY src/ ./src/
COPY static/ ./static/

# Create directories for uploads
RUN mkdir -p /app/uploads /app/processed

# Expose port
EXPOSE 8080

# Run the application
CMD ["python", "-m", "src.app.main"]

## Step 4.2: Docker Compose (Optional)
# docker-compose.yml
version: '3.8'

services:
  colorizer-app:
    build: .
    ports:
      - "8080:8080"
    volumes:
      - ./uploads:/app/uploads
      - ./processed:/app/processed
    environment:
      - PYTHONUNBUFFERED=1
      - MAX_IMAGE_SIZE=5242880  # 5MB
    restart: unless-stopped

## Step 4.3: Run Scripts
# run_local.sh
#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
pip install -r requirements.txt

# Run the app
python -m src.app.main

# Or with specific port
# python -m src.app.main --port 8080 --reload

## Step 4.4: Complete README

# AI Image Colorizer - Proof of Concept

## Quick Start

### Local Development
```bash
# 1. Clone and setup
git clone <repository>
cd ai-colorizer-poc
python -m venv venv
source venv/bin/activate  # (Linux/Mac) or venv\Scripts\activate (Windows)

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the application
python -m src.app.main

# 4. Open browser
http://localhost:8080

## Docker Deployment

# Build and run
docker build -t colorizer-poc .
docker run -p 8080:8080 colorizer-poc

## Project Structure
ai-colorizer-poc/
├── src/app/           # Application source
├── src/tests/         # Test files
├── static/            # Static files
├── uploads/           # Uploaded images (created at runtime)
└── processed/         # Colorized images (created at runtime)

## Testing
# Run all tests
python run_tests.py

# Run specific test
pytest src/tests/test_colorizer.py -v

## Limitations (PoC)

### No actual AI model - uses image enhancement
### Single user only
### Local storage only
### No user authentication


---

### **Step 5.1: Demo Checklist**
```markdown
## Demo Preparation
- [ ] Test with sample B&W images
- [ ] Prepare 3-5 test images
- [ ] Verify upload/download flow
- [ ] Test on different browsers
- [ ] Prepare demo script

## PoC Success Criteria
- [x] Upload B&W image
- [x] Process image (simulated colorization)
- [x] Display before/after comparison
- [x] Download colorized version
- [x] Handle invalid inputs gracefully
- [x] Basic error messages

```

## Summary timeline

```gantt
    title PoC Implementation Timeline
    dateFormat  YYYY-MM-DD
    section Setup
    Environment Setup          :2024-01-01, 2d
    Project Structure          :2024-01-02, 1d
    
    section Implementation
    Core Colorizer Module      :2024-01-03, 2d
    NiceGUI Interface          :2024-01-04, 2d
    Image Utilities            :2024-01-05, 1d
    
    section Testing
    Unit Tests                 :2024-01-06, 1d
    Integration Tests          :2024-01-07, 1d
    
    section Deployment
    Docker Configuration       :2024-01-08, 1d
    Documentation              :2024-01-08, 1d
    Demo Preparation           :2024-01-09, 1d
    Final Validation           :2024-01-10, 1d
```


## References

- [Learn to Code with ChatGPT](https://offers.hubspot.com/code-with-chatgpt)