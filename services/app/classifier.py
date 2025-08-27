import os
import torch
import torch.nn as nn
from torchvision import transforms
from torchvision.models import resnet18, ResNet18_Weights
from PIL import Image

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

classes = ['cat','cow','goat','horse','iguana','lizard','ostrich','peacock','pigeon','possum','undefined']
num_classes = len(classes)
idx2label = {i: label for i, label in enumerate(classes)}

model = resnet18(weights=ResNet18_Weights.DEFAULT)
in_feats = model.fc.in_features
model.fc = nn.Linear(in_feats, num_classes)
model.to(device)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "best_resnet.pth")
checkpoint = torch.load(MODEL_PATH, map_location=device)

# checkpoint = torch.load("../../services/model/best_resnet.pth", map_location=device)
model.load_state_dict(checkpoint)

model.eval()

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])

def classify_image(image_file):
    img = image_file.convert("RGB")
    x = preprocess(img).unsqueeze(0).to(device)

    with torch.no_grad():
        logits = model(x)
        probs  = torch.softmax(logits, dim=1)
        conf, idx = probs.max(1)

    label = idx2label[idx.item()]
    print(f"Pred: {label}  |  Confiança: {conf.item()*100:.1f}%")
    return label, conf.item()*100