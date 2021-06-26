import {
  boolean,
  constant,
  either,
  flow,
  identity,
  pipe,
  thrower,
} from "fp-tk";
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
    constant(thrower(TypeError)("Value cannot be encrypted")),
    identity
  )
);

const GraphQLEncryptedConfig: GraphQLScalarTypeConfig<Encrypted, string> = {
  name: "Encrypted",
  description:
    "The `Encrypted` type represents a value that is meant to be stored in a bcrypt encrypted form",
  serialize: EncryptedCodec.encode,
  parseValue: parseEncrypted,

  parseLiteral: (ast) =>
    pipe(
      ast.kind !== Kind.STRING,
      boolean.fold(
        constant(
          thrower(GraphQLError)(
            `Can only validate string as encrypted but got a : ${ast.kind}`
          )
        ),
        flow(ast.value, parseEncrypted)
      )
    ),

  specifiedByUrl: "https://en.wikipedia.org/wiki/Bcrypt",
};

export const EncryptedGraphQL = new GraphQLScalarType(GraphQLEncryptedConfig);
