# Dockerfile داخل app/
FROM python:3.12-slim

# تعيين مجلد العمل
WORKDIR /app

# نسخ متطلبات البايثون وتثبيتها
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# نسخ باقي ملفات التطبيق
COPY . .

# إعداد PATH للـ pip local
ENV PATH=/root/.local/bin:$PATH

# تعريف البورت اللي هيشتغل عليه التطبيق
EXPOSE 8000

# أمر تشغيل التطبيق
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
