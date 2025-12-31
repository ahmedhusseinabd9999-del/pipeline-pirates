# Dockerfile في فولدر المشروع الرئيسي
FROM python:3.12-slim AS builder

# مجلد العمل مؤقت
WORKDIR /app

# نسخ متطلبات البايثون وتثبيتها
COPY app/requirements.txt .
RUN pip install --user -r requirements.txt

# المرحلة النهائية للصورة
FROM python:3.12-slim

WORKDIR /app

# نسخ الباكيجات المثبتة من مرحلة البناء
COPY --from=builder /root/.local /root/.local

# نسخ ملفات التطبيق
COPY app/ ./app

# إعداد PATH للـ pip local
ENV PATH=/root/.local/bin:$PATH

# تعريف البورت اللي هيشتغل عليه التطبيق
EXPOSE 8000

# أمر تشغيل التطبيق
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

