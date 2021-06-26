import {
  Kind,
  GraphQLError,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { Email, EmailCodec } from "@kbroom/io-email";
import {
  boolean,
  constant,
  either,
  flow,
  identity,
  pipe,
  thrower,
} from "fp-tk";

const parseEmail = flow(
  EmailCodec.decode,
  either.fold(
    (reason) =>
      thrower(TypeError)(
        `Cron cannot represent non-email value '${reason.value.actual}'`
      ),
    identity
  )
);

const GraphQEmailConfig: GraphQLScalarTypeConfig<Email, string> = {
  name: "Email",

  description:
    "A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.",

  serialize: Email.unwrap,

  parseValue: parseEmail,

  parseLiteral: (ast) =>
    pipe(
      ast.kind !== Kind.STRING,
      boolean.fold(
        constant(
          thrower(GraphQLError)(
            `Can only validate strings as email but got a: ${ast.kind}`
          )
        ),
        flow(ast.value, parseEmail)
      )
    ),

  specifiedByUrl: "https://www.w3.org/Protocols/rfc822/",
};

export const EmailGraphQL = new GraphQLScalarType(GraphQEmailConfig);
