-- Index for session token lookup (most critical for auth performance)
CREATE INDEX IF NOT EXISTS idx_session_token ON session(token);

-- Composite index for session validation (token + userId + expiresAt)
CREATE INDEX IF NOT EXISTS idx_session_validation ON session(token, userId, expiresAt);

-- Index for user ID lookups
CREATE INDEX IF NOT EXISTS idx_user_id ON user(id);

-- Index for email lookups (useful for signin/signup)
CREATE INDEX IF NOT EXISTS idx_user_email ON user(email);

-- Index for expired session cleanup
CREATE INDEX IF NOT EXISTS idx_session_expires_at ON session(expiresAt);