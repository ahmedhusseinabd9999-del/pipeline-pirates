FROM nginx:alpine

# نسخ ملفات البناء
COPY build/ /usr/share/nginx/html

# نسخ تكوين nginx المخصص
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
