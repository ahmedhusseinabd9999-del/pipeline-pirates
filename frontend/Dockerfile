FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend files
COPY src/ /usr/share/nginx/html/

# Create a non-root user
RUN adduser -D -u 1001 -g 'nginx' nginx-user && \
    chown -R nginx-user:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

USER nginx-user

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
