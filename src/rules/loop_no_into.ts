import { StatementNode } from './../abap/nodes/statement_node';
import * as Statements from "../abap/statements/";
import { Issue } from "../issue";
import { ABAPRule } from "./_abap_rule";
import { ABAPFile } from "../files";
import { BasicRuleConfig } from "./_basic_rule_config";
import { Token } from "../abap/tokens/_token";

/** Detects usage of certain statements. */
export class NoLoopIntoConf extends BasicRuleConfig {
}

export class NoLoopInto extends ABAPRule {

  private conf = new NoLoopIntoConf();

  public getKey(): string {
    return "loop_no_into";
  }

  private getDescription(): string {
    return "Avoid use of loop at ... into ...";
  }

  public getConfig() {
    return this.conf;
  }

  public setConfig(conf: NoLoopIntoConf) {
    this.conf = conf;
  }

  public runParsed(file: ABAPFile) {
    const issues: Issue[] = [];

    for (const statement of file.getStatements()) {
      if (!(statement.get() instanceof Statements.Loop)) {
        continue;
      }

      if (this.containsInto(statement)) {
        const issue = Issue.atStatement(file, statement, this.getDescription(), this.getKey());
        issues.push(issue);
      }
    }
    return issues;
  }

  private containsInto(statement: StatementNode): boolean {
    return statement.getTokens().map((token: Token) => {
      return token.getStr();
    }).includes("INTO");
  }
}