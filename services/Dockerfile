FROM python:3.11-slim
WORKDIR /usr/src/app

# depende do requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copia o pacote app/
COPY app ./app

EXPOSE 8000

# IMPORTANTE: host 0.0.0.0, e aponta pro módulo correto
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
