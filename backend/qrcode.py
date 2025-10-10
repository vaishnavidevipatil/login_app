import qrcode

    # Data to be encoded
data = "https://www.example.com"

# Create QR code instance
qr = qrcode.QRCode(
    version=1,  # Controls the size of the QR code (1-40)
    error_correction=qrcode.constants.ERROR_CORRECT_L, # Error correction level (L, M, Q, H)
    box_size=10, # Size of each box (pixel)
    border=4, # Size of the white border
)

# Add data to the QR code
qr.add_data(data)
qr.make(fit=True)

# Create an image from the QR code and save it
img = qr.make_image(fill_color="black", back_color="white")
img.save("my_qrcode.png")
