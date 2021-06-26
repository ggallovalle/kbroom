import {
  ClassProvider,
  DynamicModule,
  FactoryProvider,
  Module,
  Provider,
} from "@nestjs/common";
import {
  ShieldModuleAsyncOptions,
  JWTStrategyOptions,
} from "./interfaces/shield-options.interface";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {
  SHIELD_PASSPORT_JWT_OPTIONS,
  SHIELD_PASSPORT_LOCAL_AUTH_SERVICE,
  SHIELD_PASSPORT_LOCAL_OPTIONS,
} from "./shield.constants";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({})
export class ShieldModule {
  static forRootAsync<TLocalUser>(
    options: ShieldModuleAsyncOptions<TLocalUser>,
  ): DynamicModule {
    const optionalP: Array<Provider> = [];
    const jwtM = JwtModule.registerAsync({
      imports: options.imports,
      useFactory: options.strategies.jwt.serviceOptions.useFactory,
      inject: options.strategies.jwt.serviceOptions.inject,
    });
    const passportM = options.passport
      ? PassportModule.registerAsync(options.passport)
      : PassportModule;
    const passportLocalAuthServiceP: ClassProvider = {
      provide: SHIELD_PASSPORT_LOCAL_AUTH_SERVICE,
      useClass: options.strategies.local.authService,
    };
    const jwtOptionsP: FactoryProvider<JWTStrategyOptions> = {
      provide: SHIELD_PASSPORT_JWT_OPTIONS,
      ...options.strategies.jwt.options,
    };
    if (options.strategies.local.options) {
      optionalP.push({
        provide: SHIELD_PASSPORT_LOCAL_OPTIONS,
        useValue: options.strategies.local.options,
      });
    }
    return {
      module: ShieldModule,
      providers: [
        passportLocalAuthServiceP,
        jwtOptionsP,
        LocalStrategy,
        JwtStrategy,
        ...optionalP,
        ...options.providers,
      ],
      imports: [jwtM, passportM, ...options.imports],
      exports: [jwtM, passportM],
    };
  }
}
