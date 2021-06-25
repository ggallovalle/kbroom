import { either, flow, pipe } from "fp-tk";
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
    (reason: any) => {
      throw new TypeError(
        `Cron cannot represent non-cron value '${reason.value.actual}'`
      );
    },
    (ok) => ok
  )
);

const GraphQLCronConfig: GraphQLScalarTypeConfig<Cron, string> = {
  name: "Cron",
  description:
    "The `Cron` type represents a cronjob that is a timed based scheduler, see https://crontab.guru/",
  serialize: CronCodec.encode,
  parseValue: parseCron,
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate string as cron but got a : ${ast.kind}`
      );
    }
    return pipe(ast.value, parseCron);
  },
  specifiedByUrl: "https://en.wikipedia.org/wiki/Cron",
};

export const CronGraphQL = new GraphQLScalarType(GraphQLCronConfig);
