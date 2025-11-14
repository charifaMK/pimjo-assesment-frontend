-- index for session token lookup (critical for auth performance)
CREATE INDEX IF NOT EXISTS idx_session_token ON session(token);

-- composite index for session validation (token + userId + expiresAt)
CREATE INDEX IF NOT EXISTS idx_session_validation ON session(token, userId, expiresAt);

-- index for user id lookups
CREATE INDEX IF NOT EXISTS idx_user_id ON user(id);

-- index for email lookups (used in signin/signup operations)
CREATE INDEX IF NOT EXISTS idx_user_email ON user(email);

-- index for expired session cleanup operations
CREATE INDEX IF NOT EXISTS idx_session_expires_at ON session(expiresAt);