export abstract class AbstractAuthConfigService {
  abstract get accessSecretToken(): string;
  abstract get accessSecretTokenExpiration(): string;
  abstract get refreshSecretToken(): string;
  abstract get refreshSecretTokenExpiration(): string;
  abstract get activateSecretToken(): string;
  abstract get activateSecretTokenExpiration(): string;
  abstract get forgotSecretToken(): string;
  abstract get forgotSecretTokenExpiration(): string;
}
