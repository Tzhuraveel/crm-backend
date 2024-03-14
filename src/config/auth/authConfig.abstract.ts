export abstract class AbstractAuthConfigService {
  abstract get secretToken(): string;
  abstract get secretTokenExpiration(): string;
  abstract get secretActivateToken(): string;
  abstract get secretActivateTokenExpiration(): string;
  abstract get secretForgotToken(): string;
  abstract get secretForgotTokenExpiration(): string;
}
