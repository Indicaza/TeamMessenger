#!/bin/bash

# Log start
echo "Starting deploy script..."

# Navigate to the dist folder
cd dist

# Create a zip of the build files
echo "Zipping the build files..."
zip -r ../build.zip *

# Log that zipping is done
echo "Build files zipped successfully."

# Navigate back to the root directory
cd ..

# Chrome Web Store Upload Process (optional)
# Uncomment and configure this section if you want to upload automatically to Chrome Web Store
# Ensure you have your Google API credentials ready for this
# Example: 
# chrome-webstore-upload-cli --source build.zip \
#     --extension-id <your-extension-id> \
#     --client-id <your-client-id> \
#     --client-secret <your-client-secret> \
#     --refresh-token <your-refresh-token>

# Log completion
echo "Deployment completed."
