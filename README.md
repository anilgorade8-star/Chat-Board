# Chat-Board

## Secure configuration

This app uses environment variables for sensitive settings.

1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI` to your MongoDB connection string.
3. Set `OPENAI_API_KEY` or other API keys in `.env` if you use external services.
4. Keep `.env` private and do not commit it to version control.

The repository already ignores `.env` via `.gitignore`.

## Notes on API key security

- API keys must be stored on the server, not in client-side code.
- Use HTTPS for transport.
- Rotate keys regularly.
- Limit API key permissions when possible.
