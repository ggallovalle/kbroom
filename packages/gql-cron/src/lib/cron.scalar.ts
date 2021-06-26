import {
  either,
  flow,
  pipe,
  boolean,
  thrower,
  identity,
  constant,
} from "fp-tk";
import { Cron, CronCodec } from "@kbroom/io-cron";
import {
  GraphQLError,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  Kind,
} from "graphql";

const parseCron = flow(
  CronCodec.decode,
  either.fold(
    (reason) =>
      thrower(TypeError)(
        `Cron cannot represent non-cron value '${reason.value.actual}'`
      ),
    identity
  )
);

const GraphQLCronConfig: GraphQLScalarTypeConfig<Cron, string> = {
  name: "Cron",
  description:
    "The `Cron` type represents a cronjob that is a timed based scheduler, see https://crontab.guru/",
  serialize: CronCodec.encode,
  parseValue: parseCron,
  parseLiteral: (ast) =>
    pipe(
      ast.kind !== Kind.STRING,
      boolean.fold(
        constant(
          thrower(GraphQLError)(
            `Can only validate string as cron but got a : ${ast.kind}`
          )
        ),
        flow(ast.value, parseCron)
      )
    ),
  specifiedByUrl: "https://en.wikipedia.org/wiki/Cron",
};

export const CronGraphQL = new GraphQLScalarType(GraphQLCronConfig);
