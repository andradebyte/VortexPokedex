from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from PIL import Image
import io

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

class Item(BaseModel):
    item: int

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents))
    width, height = img.size
    return {
        "size_bytes": len(contents),
        "width": width,
        "height": height
    }






# import torch
# import torch.nn as nn
# from torchvision import transforms
# from torchvision.models import resnet18, ResNet18_Weights

# # 1) Device fallback
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# # 2) Classes e mapeamento invertido
# classes = ['cat','cow','goat','horse','iguana','lizard','ostrich','peacock','pigeon','possum','undefined']
# num_classes = len(classes)
# idx2label = {i: label for i, label in enumerate(classes)}

# # 3) Carrega e ajusta o modelo
# model = resnet18(weights=ResNet18_Weights.DEFAULT)
# # Troca a camada final pra o teu num_classes
# in_feats = model.fc.in_features
# model.fc = nn.Linear(in_feats, num_classes)
# model.to(device)

# # Se tu tiver checkpoint treinado:
# checkpoint = torch.load("../model/best_resnet.pth", map_location=device)
# model.load_state_dict(checkpoint)

# model.eval()

# # 4) Preprocess da imagem
# preprocess = transforms.Compose([
#     transforms.Resize(256),
#     transforms.CenterCrop(224),
#     transforms.ToTensor(),
#     transforms.Normalize(
#         mean=[0.485, 0.456, 0.406],
#         std=[0.229, 0.224, 0.225]
#     ),
# ])

# img = Image.open("ostrich.jpg").convert("RGB")
# x = preprocess(img).unsqueeze(0).to(device)

# # 5) Inferência
# with torch.no_grad():
#     logits = model(x)
#     probs  = torch.softmax(logits, dim=1)
#     conf, idx = probs.max(1)

# label = idx2label[idx.item()]
# print(f"Pred: {label}  |  Confiança: {conf.item()*100:.1f}%")