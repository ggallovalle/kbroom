// import stamp from "stampit";
const stamp = require("stampit");
const InstanceOf = require("@stamp/instanceof");
// const stamp = require("stampit");

const Logger = stamp({
  init({ one }: { one: string }) {
    this.one = one ?? 1;
  },
  methods: {
    log() {
      console.log(this.one);
    },
  },
  statics: {
    logStatic() {
      console.log("bomba");
    },
  },
}).compose(InstanceOf);

const logger = Logger();
logger.log();
