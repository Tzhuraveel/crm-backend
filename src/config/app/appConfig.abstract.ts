export abstract class AbstractAppConfigService {
  abstract get port(): number;
  abstract get host(): string;
  abstract get secretToken(): string;
  abstract get secretForgotToken(): string;
  abstract get secretActivateToken(): string;
}
