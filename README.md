# Twilio AI Annotator Demo

This repository is a companion project to the Twilio AI Annotator Integration Guide.  

![Annotator Demo Screenshot](/public/img/screenshot.png)

It scaffolds two basic types of integration:
1. **Embedded Annotator**: This demonstrates how you might embed the annotator into your webapp via iframe.
2. **Standalone Annotator**: This is another basic integration that redirects the user into a new window for to complete their annotation task.

## Quick Start

### Step 1: Populate the environment with your account credentials
This project uses the `dotenv` library to load environment variables. It expects a `.env` to be populated with relevant credentials at the root of the repository directory. A sample to be filled out has been provided at `.env.sample`.

1. Login to your Twilio Account and access your account credentials.
2. Get your EIP Service Sid from the Twilio Console or your relevant contact at Twilio.
3. Copy the `.env.sample` to `.env`
4. Open and edit the file with the values above.

### Step 2: Install and Start
```bash
# Clone the repository
git clone https://github.com/jtgi/demo-annotator

# Go inside the directory
cd demo-annotator

# Install dependencies
yarn install (or npm install)

# Start development server
yarn start (or npm start)
```

### Step 3: Load the Annotator

To view the embedded implementation:
```
http://localhost:8080/annotator/embedded
```

To view the standalone implementation:
```
http://localhost:8080/annotator/standalone
```
