# Use an official Nginx image as the base image
FROM nginx:alpine

COPY nginx.conf /etc/nginx/

# Copy the build output from your local machine to the NGINX web server directory
COPY build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX web server
CMD ["nginx", "-g", "daemon off;"]