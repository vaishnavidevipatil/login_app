# Use official Python base image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirement.txt .
RUN pip install --no-cache-dir -r requirement.txt

# Copy the rest of your backend code
COPY . .

# Expose Flask port
EXPOSE 5000

# Run your 3 scripts sequentially (or in background if needed)
CMD ["bash", "-c", "python app.py && python appl.py && python planmytrip.py"]
