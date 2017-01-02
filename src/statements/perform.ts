import {Statement} from "./statement";
import * as Combi from "../combi";
import * as Reuse from "./reuse";
import {ParenLeft, ParenRightW, ParenRight} from "../tokens/";

let str = Combi.str;
let seq = Combi.seq;
let opt = Combi.opt;
let alt = Combi.alt;
let tok = Combi.tok;
let plus = Combi.plus;

export class Perform extends Statement {

  public static get_matcher(): Combi.IRunnable {
    let programName = new Reuse.Field();
    let using = seq(str("USING"), plus(new Reuse.Source()));
    let tables = seq(str("TABLES"), plus(new Reuse.Source()));
    let changing = seq(str("CHANGING"), plus(new Reuse.Source()));
    let level = seq(str("LEVEL"), new Reuse.Source());
    let commit = alt(seq(str("ON COMMIT"), opt(level)),
                     str("ON ROLLBACK"));

    let short = seq(new Reuse.FormName(),
                    tok(ParenLeft),
                    programName,
                    alt(tok(ParenRightW), tok(ParenRight)));

    let program = seq(str("IN PROGRAM"), opt(alt(new Reuse.Dynamic(), programName)));

    let full = seq(alt(new Reuse.FormName(), new Reuse.Dynamic()),
                   opt(seq(program,
                           opt(str("IF FOUND")))));

    return seq(str("PERFORM"),
               alt(short, full),
               opt(tables),
               opt(using),
               opt(changing),
               opt(str("IF FOUND")),
               opt(commit));
  }

}