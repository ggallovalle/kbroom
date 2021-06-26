import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import { AuthModuleAsyncOptions } from "@nestjs/passport";
import { taskO } from "fp-tk";
import { FactoryProvider, ModuleMetadata, Type } from "@nestjs/common";
import { StrategyOptions as JWT_StrategyOptions } from "passport-jwt";
import { IStrategyOptions as Local_StrategyOptions } from "passport-local";

export type JWTStrategyOptions = Omit<JWT_StrategyOptions, "jwtFromRequest">;
export type LocalStrategyOptions = Omit<Local_StrategyOptions, "session">;

export type ShieldLocalStrategyAuthService<TUser> = {
  validate(username: string, password: string): taskO.TaskOption<TUser>;
};

type Factory<T> = Pick<FactoryProvider<T>, "inject" | "useFactory">;

export type ShieldModuleAsyncOptions<TLocalUser> = {
  imports: ModuleMetadata["imports"];
  providers: ModuleMetadata["providers"];
  passport?: AuthModuleAsyncOptions;
  strategies: {
    local: {
      authService: Type<ShieldLocalStrategyAuthService<TLocalUser>>;
      options?: Factory<LocalStrategyOptions>;
    };
    jwt: {
      options: Factory<JWTStrategyOptions>;
      serviceOptions: Omit<
        JwtModuleAsyncOptions,
        "imports" | "useClass" | "useExisting"
      >;
    };
  };
};
