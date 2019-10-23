import * as Expressions from "../expressions";
import * as Statements from "../statements";
import {StatementNode} from "../nodes";
import {ABAPObject} from "../../objects/_abap_object";
import {FormDefinition} from "../types";
import {Scope} from "./_scope";
import {FunctionGroup} from "../../objects";
import {ABAPFile} from "../../files";
import {Registry} from "../../registry";
import {BasicTypes} from "./basic_types";

export class Procedural {
  private readonly scope: Scope;
  private readonly reg: Registry;

  constructor(reg: Registry, scope: Scope) {
    this.scope = scope;
    this.reg = reg;
  }

  public addAllFormDefinitions(file: ABAPFile) {
    this.scope.addFormDefinitions(file.getFormDefinitions());

    const stru = file.getStructure();
    if (stru === undefined) {
      return;
    }

    const includes = stru.findAllStatements(Statements.Include);
    for (const node of includes) {
      const found = this.findInclude(node);
      if (found) {
        this.addAllFormDefinitions(found);
      }
    }
  }

  public findInclude(node: StatementNode): ABAPFile | undefined {
// assumption: no cyclic includes, includes not found are reported by rule "check_include"
    const expr = node.findFirstExpression(Expressions.IncludeName);
    if (expr === undefined) {
      return undefined;
    }
    const name = expr.getFirstToken().getStr();
    const prog = this.reg.getObject("PROG", name) as ABAPObject | undefined;
    if (prog !== undefined) {
      return prog.getABAPFiles()[0];
    }
    return undefined;
  }

  public addDefinitions(node: StatementNode, filename: string) {
    const s = node.get();
    if (s instanceof Statements.Type) {
      s.runSyntax(node, this.scope, filename);
    } else {
      new BasicTypes(filename, this.scope).buildVariables(node);
    }
  }

  public findFunctionScope(obj: ABAPObject, node: StatementNode) {
    this.scope.pushScope("function");

    const name = node.findFirstExpression(Expressions.FunctionName)!.getFirstToken().getStr();
    const definition = (obj as FunctionGroup).getModule(name);
    if (definition === undefined) {
      throw new Error("Function group definition \"" + name + "\" not found");
    }

    for (const param of definition.getParameters()) {
      this.scope.addName(param); // todo, add real type
    }
  }

  public findFormScope(node: StatementNode, filename: string) {
    this.scope.pushScope("form");
    this.scope.addList(new FormDefinition(node, filename).getParameters());
  }

}