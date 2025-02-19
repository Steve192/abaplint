import {Issue} from "../issue";
import {BasicRuleConfig} from "./_basic_rule_config";
import {Registry} from "../registry";
import {IObject} from "../objects/_iobject";
import * as Objects from "../objects";
import {ABAPObject} from "../objects/_abap_object";
import {IRule} from "./_irule";
import * as Statements from "../abap/statements";
import * as Expressions from "../abap/expressions";
import {Position} from "../position";
import {Comment} from "../abap/statements/_statement";

/** Checks related to report declarations. */
export class MainFileContentsConf extends BasicRuleConfig {
}

export class MainFileContents implements IRule {
  private conf = new MainFileContentsConf();

  public getKey(): string {
    return "main_file_contents";
  }

  private getDescription(details: string): string {
    return "Main file must have specific contents: " + details;
  }

  public getConfig() {
    return this.conf;
  }

  public setConfig(conf: MainFileContentsConf) {
    this.conf = conf;
  }

  public run(obj: IObject, _reg: Registry): Issue[] {
    if (!(obj instanceof ABAPObject)) {
      return [];
    }

    const main = obj.getMainABAPFile();
    if (main === undefined) {
      return [];
    }
    const stru = main.getStructure();
    if (stru === undefined) {
      return [];
    }

    if (obj instanceof Objects.Program && obj.isInclude() === false) {
      let count = 0;
      let first = main.getStatements()[count];
      while (first !== undefined && first.get() instanceof Comment) {
        count = count + 1;
        first = main.getStatements()[count];
      }
      if (first === undefined || !(first.get() instanceof Statements.Report
          || first.get() instanceof Statements.Program)) {
        const position = new Position(1, 1);
        const issue = Issue.atPosition(main, position, this.getDescription("Report must begin with REPORT or PROGRAM"), this.getKey());
        return [issue];
      }
      const name = first.findFirstExpression(Expressions.ReportName);
      if (name === undefined) {
        const position = new Position(1, 1);
        const issue = Issue.atPosition(
          main, position, this.getDescription("Add report name to REPORT or PROGRAM statement"), this.getKey());
        return [issue];
      } else if (name.getFirstToken().getStr().toUpperCase() !== obj.getName()) {
        const position = new Position(1, 1);
        const issue = Issue.atPosition(main, position, this.getDescription("REPORT or PROGRAM name should match filename"), this.getKey());
        return [issue];
      }
    }

    return [];
  }
}