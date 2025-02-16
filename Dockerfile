# # Dockerfile - this is a comment. Delete me if you want.
# FROM python:3.7-alpine

# ADD . /app

# WORKDIR /app

# RUN apk --update --upgrade add --no-cache  gcc musl-dev jpeg-dev zlib-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev
# RUN echo "http://dl-cdn.alpinelinux.org/alpine/latest-stable/main" > /etc/apk/repositories
# RUN apk update && apk add --no-cache gcc musl-dev jpeg-dev zlib-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev


# COPY requirements.txt requirements.txt

# RUN pip install -r requirements.txt
# EXPOSE 5000

# COPY . .
# CMD [ "python", "app.py" ]


# Use a lightweight Python image
FROM python:3.7-alpine

# Set working directory
WORKDIR /app

# Copy application files
ADD . /app

# Install dependencies
RUN apk add --no-cache gcc musl-dev jpeg-dev zlib-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt

# Expose Flask port
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
