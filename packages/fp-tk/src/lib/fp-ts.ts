// see guides https://marcel.is/fp-ts/
// https://andywhite.xyz/posts/2021-01-28-rte-react/
// fundamentals
import * as either from "fp-ts/Either";
import * as these from "fp-ts/These";

// that represents states
import * as task from "fp-ts/Task";
import * as taskO from "fp-ts/TaskOption";
import * as taskE from "fp-ts/TaskEither";
import * as taskT from "fp-ts/TaskThese";
import * as io from "fp-ts/IO";
import * as ioE from "fp-ts/IOEither";

// primitives
import * as boolean from "fp-ts/boolean";
import * as number from "fp-ts/number";
import * as func from "fp-ts/function";
import {
  pipe,
  flow,
  flip,
  identity,
  constant,
  Lazy,
  Predicate,
  Refinement,
} from "fp-ts/function";

// data structures
import * as array from "fp-ts/Array";
import * as arrayR from "fp-ts/ReadonlyArray";
import * as arrayNE from "fp-ts/NonEmptyArray";
import * as arrayNER from "fp-ts/ReadonlyNonEmptyArray";
import * as map from "fp-ts/Map";
import * as mapR from "fp-ts/ReadonlyMap";
import * as record from "fp-ts/Record";
import * as recordR from "fp-ts/ReadonlyRecord";
import * as set from "fp-ts/Set";
import * as setR from "fp-ts/ReadonlySet";
import * as tuple from "fp-ts/Tuple";
import * as tupleR from "fp-ts/ReadonlyTuple";
import * as tree from "fp-ts/Tree";

// utils
import * as random from "fp-ts/Random";

// advanced
// https://andywhite.xyz/posts/2021-01-28-rte-react/
// is basically a dependency injection stuff
import * as reader from "fp-ts/Reader";
import * as readerE from "fp-ts/ReaderEither";
import * as readerT from "fp-ts/ReaderTask";
import * as readerTE from "fp-ts/ReaderTaskEither";
// state machine
// https://paulgray.net/the-state-monad/
import * as state from "fp-ts/State";
import * as stateReaderTE from "fp-ts/StateReaderTaskEither";
// carry a "logger" around Writer<W, A> where W is a "log" and A is a "value"
// https://medium.com/@dtipson/functional-types-in-js-writing-a-writer-3bcd7eee2cb4
import * as writer from "fp-ts/Writer";

export {
  either,
  these,
  task,
  taskO,
  taskE,
  taskT,
  io,
  ioE,
  boolean,
  number,
  func,
  //#region func stuff, top level
  pipe,
  flow,
  flip,
  identity,
  constant,
  Lazy,
  Predicate,
  Refinement,
  //#endregion
  array,
  arrayR,
  arrayNE,
  arrayNER,
  map,
  mapR,
  record,
  recordR,
  set,
  setR,
  tuple,
  tupleR,
  tree,
  random,
  reader,
  readerE,
  readerT,
  readerTE,
  state,
  stateReaderTE,
  writer,
};
