install mkcert

Step 1: Install mkcert
        Install mkcert globally (if you haven't already):

        bash
        Copy
        # On macOS/Linux
        brew install mkcert

        # On Windows (using Chocolatey)
        hoco install mkcert
        Initialize the Certificate Authority (CA):

        bash
        Copy
        mkcert -install
        This creates a local CA trusted by your system.

Step 2: Generate SSL Certificates
        Navigate to your project folder:

        bash
        Copy
        cd path/to/your/project
        Create a folder for certificates (optional but recommended):

        bash
        Copy
        mkdir certs
        cd certs
Generate certificates for localhost:

bash
Copy
mkcert localhost
This creates two files:

localhost.pem (certificate)

localhost-key.pem (private key)