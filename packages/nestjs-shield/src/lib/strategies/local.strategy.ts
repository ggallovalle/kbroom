import { Inject, Injectable, Optional } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import {
  SHIELD_PASSPORT_LOCAL_AUTH_SERVICE,
  SHIELD_PASSPORT_LOCAL_OPTIONS,
} from "../shield.constants";
import {
  ShieldLocalStrategyAuthService,
  LocalStrategyOptions,
} from "../interfaces/shield-options.interface";
import { pipe, taskO } from "fp-tk";

@Injectable()
export class LocalStrategy<TUser> extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SHIELD_PASSPORT_LOCAL_AUTH_SERVICE)
    private readonly _authSrv: ShieldLocalStrategyAuthService<TUser>,
    @Optional()
    @Inject(SHIELD_PASSPORT_LOCAL_OPTIONS)
    private readonly _options?: LocalStrategyOptions,
  ) {
    super(
      _options || {
        usernameField: "username",
        passwordField: "password",
      },
    );
  }

  validate(
    username: string,
    password: string,
  ): Promise<TUser | null | undefined> {
    return pipe(
      this._authSrv.validate(username, password),
      taskO.match(
        () => null,
        (ok) => ok,
      ),
    )();
  }
}
