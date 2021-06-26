import {
  Kind,
  GraphQLError,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { Email, EmailCodec } from "@kbroom/io-email";
import { either, flow, pipe } from "fp-tk";

const parseEmail = flow(
  EmailCodec.decode,
  either.fold(
    (reason: any) => {
      throw new TypeError(
        `Email cannot represent non-email value '${reason.value.actual}'`
      );
    },
    (ok) => ok
  )
);

const GraphQEmailConfig: GraphQLScalarTypeConfig<Email, string> = {
  name: "Email",

  description:
    "A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.",

  serialize: Email.unwrap,

  parseValue: parseEmail,

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as email but got a: ${ast.kind}`
      );
    }

    return pipe(ast.value, parseEmail);
  },

  specifiedByUrl: "https://www.w3.org/Protocols/rfc822/",
};

export const EmailGraphQL = new GraphQLScalarType(GraphQEmailConfig);
