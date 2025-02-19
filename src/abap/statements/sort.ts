import {Statement} from "./_statement";
import {str, seq, alt, per, opt, plus, IStatementRunnable, optPrio} from "../combi";
import {FieldSymbol, Target, Dynamic, FieldChain} from "../expressions";

export class Sort extends Statement {

  public getMatcher(): IStatementRunnable {
    const order = alt(str("ASCENDING"), str("DESCENDING"));

    const sel = alt(new FieldChain(),
                    new FieldSymbol(),
                    new Dynamic());

    const text = str("AS TEXT");

    const fields = plus(seq(sel, optPrio(text), optPrio(order), optPrio(text)));

    const by = seq(str("BY"), fields);

    const normal = seq(new Target(), opt(per(order, by, str("STABLE"), text)));

    const target = alt(normal, text);

    return seq(str("SORT"), target);
  }

}