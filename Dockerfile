
# Use the official nginx image as the base image
FROM nginx:alpine

# Copy the contents of the dist directory to the default nginx html directory
COPY dist /usr/share/nginx/html

# Expose port 80 to allow incoming traffic
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
