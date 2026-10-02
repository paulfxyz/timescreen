# Security

Time is a static, client-side application. It does not need a user account, location permission, an API key, or access to personal files.

Do not include passwords, tokens, or private server information in public issues. Use GitHub's private vulnerability reporting when available; otherwise open a minimal issue requesting a private contact without disclosing sensitive details.

The production deployment workflow is manual, restricted to `main`, and receives its FTP password only through GitHub Actions secrets. TLS certificate validation must not be disabled to work around a hosting mismatch.

Third-party source assets have pinned SHA-256 checks. Fonts and textures are acquired during setup and are not part of the public source history.
