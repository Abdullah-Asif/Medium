export interface RefreshTokenModel {
    refreshToken: string,
    expiresAt: Date,
    valid: boolean
}