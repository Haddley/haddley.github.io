---
title: "Vibe Coding (Part 3)"
description: "Unit Tests and Integration Tests"
date: "2026-01-30"
categories: ["AI"]
image: "/assets/images/chatgpt-logo.svg"
tags: "ai"
hidden: true
slug: "vibecoding3"
---

![](/assets/images/vibecoding3/Screenshot 2026-01-30 at 8.07.22 AM.png)
*TestImageColorizer and TestImageUtils*

## User

```markdown
Please explain this testing code.

import pytest
import cv2
...
```

## Agent

```markdown
# Testing Code Explanation

## Overview
This Python code uses `pytest` to test an image colorization application. The tests cover two main components:
1. `ImageColorizer` class - for colorizing grayscale images
2. `validate_image` utility function - for validating image data
```

## Fixtures

```python
@pytest.fixture
def colorizer(self):
    return ImageColorizer()
```

- Creates a fresh ImageColorizer instance for each test
- Ensures tests don't interfere with each other

```python
@pytest.fixture  
def sample_image(self):
```

- Creates a temporary grayscale image file (100×100 random pixels)
- Uses tempfile.mkstemp() for safe temporary file creation
- yield path provides the file path to tests
- path.unlink() cleans up after tests (deletes temp file)


## Tests

```python
def test_colorizer_initialization(self, colorizer):
```

- Tests that the colorizer initializes properly
- Checks device is set and model placeholder exists

```python
def test_colorize_creates_output(self, colorizer, sample_image):
```

### Tests the main colorization functionality:

- Calls colorize() with the sample image
- Verifies output file exists
- Checks file has valid image extension
- Confirms output differs from input (actual colorization happened)

```python
def test_validate_image_valid(self):
```

### Tests validation with a valid small image:

- Creates 100×100 grayscale JPEG in memory
- Validates it with 1MB size limit
- Expects success ("Valid image" message)

```python
def test_validate_image_too_large(self):
```

### Tests validation with an oversized image:

- Creates 2000×2000 RGB BMP (large uncompressed) 
- Validates with tiny 0.001MB limit 
- Expects failure with "exceeds" or "size" in error message 

## What's Being Tested:

- Colorizer: Can it process images and produce different output?
- Image Validation: Does it properly check image size limits?
- Integration: Do components work together correctly?


User

```markdown
How do I ensure that test_colorize_creates_output unit test is run in GitHub Action to ensure that broken code is not pushed to GitHub repository?
```

Agent
```markdown
To ensure your test_colorize_creates_output unit test runs automatically in GitHub Actions and blocks broken code, you need to create a workflow YAML file in your repository. This file defines the steps to set up Python, install dependencies, run your tests, and, most importantly, prevents merges if tests fail.

Create a file named .github/workflows/python-tests.yml in your project's root directory. You can use this template, which is based on GitHub's official Python testing guide
```

```yaml
name: Python Tests

on:
  push:
    branches: [ main, master ]  # Runs on pushes to main branches
  pull_request:
    branches: [ main, master ]  # Runs on PRs targeting main branches

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.9'  # Match your project's Python version

      - name: Install dependencies
        run: |
          pip install --upgrade pip
          pip install pytest opencv-python numpy Pillow
          pip install -e .  # Install your package in development mode

      - name: Run tests with pytest
        run: |
          pytest tests/ -v  # The '-v' flag gives detailed output
```

![](/assets/images/vibecoding3/Screenshot 2026-01-30 at 9.49.03 AM.png)
*python -m src.tests.run_tests*

![](/assets/images/vibecoding3/Screenshot 2026-01-30 at 9.51.46 AM.png)
*GitHub Actions*

## Branch Protection

To guarantee that broken code cannot be merged, you must enable a protected branch rule or *newer* ruleset in your GitHub repository settings.


Your protected branch rules won't be enforced until you move to a GitHub Team or Enterprise organization account

Your ruleset won't be enforced until you move to GitHub Team organization account.

## References

- [Vibe Coding Fundamentals In 33 minutes](https://www.youtube.com/watch?v=iLCDSY2XX7E)