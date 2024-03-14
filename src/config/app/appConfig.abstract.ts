export abstract class AbstractAppConfigService {
  abstract get port(): number;
  abstract get host(): string;
}
