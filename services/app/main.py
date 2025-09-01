
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import io
from app.classifier import classify_image

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents))
    label, confidence = classify_image(img)
    return {
        "filename": file.filename,
        "label": label,
        "confidence": confidence
    }