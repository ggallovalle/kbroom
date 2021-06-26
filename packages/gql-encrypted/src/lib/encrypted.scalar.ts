import { either, flow, pipe } from "fp-tk";
import { Encrypted, EncryptedCodec } from "@kbroom/io-encrypted";
import {
  GraphQLError,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  Kind,
} from "graphql";

const parseEncrypted = flow(
  EncryptedCodec.decode,
  either.fold(
    () => {
      throw new TypeError("Value cannot be encrypted");
    },
    (ok) => ok
  )
);

const GraphQLEncryptedConfig: GraphQLScalarTypeConfig<Encrypted, string> = {
  name: "Encrypted",
  description:
    "The `Encrypted` type represents a value that is meant to be stored in a bcrypt encrypted form",
  serialize: EncryptedCodec.encode,
  parseValue: parseEncrypted,
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate string as encrypted but got a : ${ast.kind}`
      );
    }
    return pipe(ast.value, parseEncrypted);
  },
  specifiedByUrl: "https://en.wikipedia.org/wiki/Bcrypt",
};

export const EncryptedGraphQL = new GraphQLScalarType(GraphQLEncryptedConfig);
